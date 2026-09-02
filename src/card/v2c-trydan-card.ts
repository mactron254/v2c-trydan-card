import { LitElement, html, nothing, type PropertyValues } from "lit";
import { property, state } from "lit/decorators.js";
import { chargerArtRatio, renderChargerArt } from "./charger-art";
import { normalizeConfig, stubConfig } from "../config";
import { getDictionary, getLanguage, translate, type Language } from "../localization";
import { formatLcdErrorCode, getLcdCopy } from "../localization/lcd-copy";
import type {
  EntityMap,
  EntityRole,
  DiscoveryDiagnostic,
  HassEntity,
  HomeAssistant,
  V2cTrydanCardConfig,
} from "../models/types";
import { setLight, setNumber, setSelect, setSwitch } from "../services/actions";
import { isActionTargetValid, resolveRegistryRoles } from "../services/discovery";
import { normalizeEnergyFlow } from "../services/energy";
import { formatDuration, formatEnergy, formatLcdKw, formatPower } from "../services/format";
import { entityBoolean, resolveSnapshot, resolveVisualState } from "../services/state";
import { renderAdvancedControls } from "./advanced-controls";
import { renderEnergyFlow } from "./energy-flow";
import { renderSessionControls } from "./session-controls";
import { cardStyles } from "./styles";

interface PendingExpectation {
  entityId: string;
  matches: (state: HassEntity | undefined) => boolean;
  timer?: ReturnType<typeof setTimeout>;
}

/**
 * The logo blinks faster the harder it is charging. V2C documents the relationship but
 * not the numbers, so this is a linear ramp across the 6-32 A the charger accepts: slow
 * and calm at the bottom, brisk at full current.
 */
function flashSecondsFor(intensity?: string | null): number {
  const amps = Number(intensity);
  if (!Number.isFinite(amps) || amps <= 0) return 0.9;
  return Math.min(1.45, Math.max(0.5, 1.45 - (Math.min(amps, 32) / 32) * 0.95));
}

export class V2cTrydanCard extends LitElement {
  static override styles = cardStyles;

  @property({ attribute: false }) hass?: HomeAssistant;
  @state() private config?: V2cTrydanCardConfig;
  @state() private resolvedEntities: EntityMap = {};
  @state() private ambiguities: Partial<Record<EntityRole, string[]>> = {};
  @state() private discoveryDiagnostic?: DiscoveryDiagnostic;
  @state() private sliderValue?: number;
  @state() private pendingRoles: EntityRole[] = [];
  @state() private actionMessage = "";

  readonly #pending = new Map<EntityRole, PendingExpectation>();
  #resolvedDeviceId?: string;

  static getConfigElement(): HTMLElement {
    return document.createElement("v2c-trydan-card-editor");
  }

  static getStubConfig(hass?: HomeAssistant): V2cTrydanCardConfig {
    return stubConfig(hass);
  }

  setConfig(config: V2cTrydanCardConfig): void {
    this.config = normalizeConfig(config);
    this.#resolveEntities();
    this.sliderValue = undefined;
  }

  getCardSize(): number {
    if (this.config?.display_mode === "ultra_compact") return 3;
    if (this.config?.display_mode === "compact") return 4;
    if (this.config?.display_mode === "standard") return 6;
    return 8;
  }

  getGridOptions() {
    return { columns: "full" as const, min_columns: 6 };
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    for (const expectation of this.#pending.values()) {
      if (expectation.timer) clearTimeout(expectation.timer);
    }
    this.#pending.clear();
  }

  protected override shouldUpdate(changed: PropertyValues<this>): boolean {
    if (!changed.has("hass") || changed.size > 1) return true;
    const previous = changed.get("hass") as HomeAssistant | undefined;
    if (!previous || !this.hass) return true;
    if (
      previous.entities !== this.hass.entities ||
      previous.language !== this.hass.language ||
      previous.locale?.language !== this.hass.locale?.language
    ) return true;
    return [...this.#watchedEntityIds()].some((entityId) => previous.states[entityId] !== this.hass!.states[entityId]);
  }

  protected override willUpdate(changed: PropertyValues<this>): void {
    if (
      changed.has("config" as never) ||
      (changed.has("hass") && (changed.get("hass") as HomeAssistant | undefined)?.entities !== this.hass?.entities)
    ) this.#resolveEntities();
  }

  protected override updated(changed: PropertyValues<this>): void {
    if (changed.has("hass")) this.#confirmPending();
  }

  #resolveEntities(): void {
    if (!this.hass || !this.config) {
      this.resolvedEntities = {};
      this.ambiguities = {};
      this.#resolvedDeviceId = undefined;
      return;
    }
    const result = resolveRegistryRoles(this.hass.entities ?? {}, this.config.entity, this.config.entities, this.hass.states);
    this.resolvedEntities = result.entities;
    this.ambiguities = result.ambiguities;
    this.#resolvedDeviceId = result.deviceId;
    this.discoveryDiagnostic = result.diagnostic;
  }

  #watchedEntityIds(): Set<string> {
    return new Set([
      this.config?.entity,
      this.config?.status_entity,
      ...Object.values(this.resolvedEntities),
    ].filter((entityId): entityId is string => Boolean(entityId)));
  }

  #entity(role: EntityRole): HassEntity | undefined {
    const entityId = this.resolvedEntities[role];
    return entityId && this.hass ? this.hass.states[entityId] : undefined;
  }

  #styleVariables(): string {
    const palettes: Record<string, string> = { v2c_blue: "#0067D9", teal: "#007F86", green: "#2E7D32", violet: "#6750A4" };
    const accent = this.config?.color_scheme === "custom" ? this.config.accent_color : palettes[this.config?.color_scheme ?? ""];
    const foreground = accent && (parseInt(accent.slice(1, 3), 16) * 0.299 + parseInt(accent.slice(3, 5), 16) * 0.587 + parseInt(accent.slice(5, 7), 16) * 0.114) > 150 ? "#000" : "#fff";
    return (accent ? `--v2c-control:${accent};--v2c-on-control:${foreground};` : "") + (this.config?.card_radius !== undefined ? `--v2c-radius:${this.config.card_radius}px;` : "") + `--v2c-hero-scale:${this.config?.hero_scale ?? 1};`;
  }

  #language(): Language {
    return getLanguage(this.config?.language, this.hass?.locale?.language ?? this.hass?.language);
  }

  #setPending(role: EntityRole, expectation: PendingExpectation): void {
    this.#pending.set(role, expectation);
    this.pendingRoles = [...this.#pending.keys()];
  }

  #finishPending(role: EntityRole, success: boolean): void {
    const expectation = this.#pending.get(role);
    if (expectation?.timer) clearTimeout(expectation.timer);
    this.#pending.delete(role);
    this.pendingRoles = [...this.#pending.keys()];
    const dictionary = getDictionary(this.#language());
    this.actionMessage = translate(dictionary, success ? "labels.actionDone" : "labels.actionFailed");
  }

  #confirmPending(): void {
    if (!this.hass) return;
    for (const [role, expectation] of this.#pending) {
      if (expectation.matches(this.hass.states[expectation.entityId])) this.#finishPending(role, true);
    }
  }

  async #runAction(
    role: EntityRole,
    entityId: string,
    matches: PendingExpectation["matches"],
    action: () => Promise<unknown>,
  ): Promise<void> {
    if (!this.hass || !isActionTargetValid(this.hass, role, entityId, this.#resolvedDeviceId)) {
      this.actionMessage = translate(getDictionary(this.#language()), "labels.actionFailed");
      return;
    }
    if (this.#pending.has(role)) return;
    const dictionary = getDictionary(this.#language());
    this.actionMessage = translate(dictionary, "labels.actionPending");
    const expectation: PendingExpectation = { entityId, matches };
    this.#setPending(role, expectation);
    try {
      await action();
      if (matches(this.hass?.states[entityId])) {
        this.#finishPending(role, true);
        return;
      }
      expectation.timer = setTimeout(() => this.#finishPending(role, false), 6000);
    } catch {
      this.#finishPending(role, false);
    }
  }

  #setIntensity(value: number): void {
    const entityId = this.resolvedEntities.intensity;
    const entity = entityId ? this.hass?.states[entityId] : undefined;
    if (!this.hass || !entityId || !entity) return;
    const min = Number(entity.attributes.min ?? 6);
    const max = Number(entity.attributes.max ?? 32);
    const step = Number(entity.attributes.step ?? 1);
    const safeStep = Number.isFinite(step) && step > 0 ? step : 1;
    const clamped = Math.min(max, Math.max(min, Math.round((value - min) / safeStep) * safeStep + min));
    this.sliderValue = clamped;
    void this.#runAction(
      "intensity",
      entityId,
      (state) => Number(state?.state) === clamped,
      () => setNumber(this.hass!, entityId, clamped),
    );
  }

  #toggleSwitch(role: EntityRole): void {
    const entityId = this.resolvedEntities[role];
    const entity = entityId ? this.hass?.states[entityId] : undefined;
    if (!this.hass || !entityId || !entity) return;
    const desired = entity.state !== "on";
    if (
      role === "locked" &&
      desired &&
      this.config?.confirm_lock !== false &&
      !window.confirm(translate(getDictionary(this.#language()), "actions.confirmLock"))
    ) return;
    void this.#runAction(
      role,
      entityId,
      (state) => state?.state === (desired ? "on" : "off"),
      () => setSwitch(this.hass!, entityId, desired),
    );
  }

  #setMode(option: string): void {
    const entityId = this.resolvedEntities.charge_mode;
    const entity = entityId ? this.hass?.states[entityId] : undefined;
    if (!this.hass || !entityId || !entity || !entity.attributes.options?.includes(option)) return;
    void this.#runAction(
      "charge_mode",
      entityId,
      (state) => state?.state === option,
      () => setSelect(this.hass!, entityId, option),
    );
  }

  #toggleLight(role: "logo_led" | "light_led"): void {
    const entityId = this.resolvedEntities[role];
    const entity = entityId ? this.hass?.states[entityId] : undefined;
    if (!this.hass || !entityId || !entity) return;
    const desired = entity.state !== "on";
    void this.#runAction(
      role,
      entityId,
      (state) => state?.state === (desired ? "on" : "off"),
      () => setLight(this.hass!, entityId, desired),
    );
  }

  #setLogoBrightness(value: number): void {
    const entityId = this.resolvedEntities.logo_led;
    const entity = entityId ? this.hass?.states[entityId] : undefined;
    if (!this.hass || !entityId || !entity || !Number.isFinite(value) || value < 0 || value > 255) return;
    void this.#runAction(
      "logo_led",
      entityId,
      (state) => Number(state?.attributes.brightness) === value,
      () => setLight(this.hass!, entityId, true, value),
    );
  }

  protected override render() {
    if (!this.config || !this.hass) {
      return html`<ha-card><div class="empty">V2C Trydan Card - configuration pending</div></ha-card>`;
    }

    const language = this.#language();
    const dictionary = getDictionary(language);
    const seed = this.hass.states[this.config.entity];
    const chargePower = normalizeEnergyFlow("charger", this.#entity("charge_power"), {
      thresholdW: this.config.flow_threshold_w,
    });
    const snapshot = resolveSnapshot({
      seedAvailable: Boolean(seed && seed.state !== "unknown" && seed.state !== "unavailable"),
      connected: entityBoolean(this.#entity("connected")?.state),
      charging: entityBoolean(this.#entity("charging")?.state),
      ready: entityBoolean(this.#entity("ready")?.state),
      paused: entityBoolean(this.#entity("paused")?.state),
      locked: entityBoolean(this.#entity("locked")?.state),
      timer: entityBoolean(this.#entity("timer")?.state),
      dynamic: entityBoolean(this.#entity("dynamic")?.state),
      meterError: this.#entity("meter_error")?.state,
      externalStatus: this.config.status_entity
        ? this.hass.states[this.config.status_entity]?.state
        : undefined,
      chargePowerW: chargePower.watts,
    });
    const visual = resolveVisualState(snapshot);

    const title = this.config.name ?? "V2C Trydan";
    const energy = this.#entity("charge_energy");
    const time = this.#entity("charge_time");
    const intensity = this.#entity("intensity");
    const voltage = this.#entity("voltage");
    const flows = [
      ["solar", "fv_power", this.config.invert_solar_power],
      ["grid", "grid_power", this.config.invert_grid_power],
      ["home", "house_power", false],
      ["battery", "battery_power", this.config.invert_battery_power],
      ["charger", "charge_power", false],
    ] as const;
    const energySources = this.config.energy_sources ?? [];
    const normalizedFlows = flows
      .filter(([source, role]) => energySources.includes(source) && Boolean(this.resolvedEntities[role]))
      .map(([flowRole, role, invert]) =>
        normalizeEnergyFlow(flowRole, this.#entity(role), {
          invert,
          thresholdW: this.config?.flow_threshold_w,
        }),
      );
    const metricItems = (this.config.metrics ?? []).map((metric) => metric === "power" ? html`<div class="metric metric-power"><span class="metric-label">${translate(dictionary, "labels.power")}</span><strong class="metric-value">${formatPower(chargePower.watts, language)}</strong></div>` : metric === "energy" ? html`<div class="metric"><span class="metric-label">${translate(dictionary, "labels.energy")}</span><strong class="metric-value">${formatEnergy(energy?.state ?? null, language)}</strong></div>` : html`<div class="metric"><span class="metric-label">${translate(dictionary, "labels.time")}</span><strong class="metric-value">${formatDuration(time?.state ?? null)}</strong></div>`);
    const ambiguityRoles = Object.keys(this.ambiguities);
    const diagnostic = visual.diagnostic && visual.diagnostic !== "no_error"
      ? visual.diagnostic.replaceAll("_", " ")
      : undefined;

    const showArtwork = this.config.show_charger !== false && this.config.display_mode !== "ultra_compact";
    // "T:" prefers the native house_power reading (V2C's own ControlBox or a direct solar-
    // inverter integration); a third-party bidirectional meter has no house_power role at
    // all, only grid_power, which is the fallback - V2C's own docs show "T/GRID" as the
    // same slot under either metering setup.
    const totalKw = formatLcdKw(normalizeEnergyFlow("home", this.#entity("house_power")).watts)
      ?? formatLcdKw(normalizeEnergyFlow("grid", this.#entity("grid_power")).watts);
    const solarKw = formatLcdKw(normalizeEnergyFlow("solar", this.#entity("fv_power")).watts);
    const lcd = getLcdCopy(language, visual.unavailable ? "unavailable" : visual.key, {
      evKw: formatLcdKw(chargePower.watts),
      totalKw,
      solarKw,
      errorCode: formatLcdErrorCode(visual.diagnostic),
    });
    const crop = this.config.charger_art ?? "focus";
    /*
     * The connector is in the car from the moment it is plugged in, not only while
     * charging. Read it from the state the card is actually showing rather than from the
     * snapshot alone: a status_entity override can say "no vehicle" while the underlying
     * booleans still read connected, and the artwork has to agree with the text next to it.
     */
    const connectorHoldered =
      visual.key === "disconnected" ||
      visual.unavailable ||
      snapshot.phase === "disconnected" ||
      snapshot.phase === "unavailable";
    const showConnector = this.config.show_connector === true;
    const artRatio = chargerArtRatio(crop, showConnector);
    const chargerArt = renderChargerArt({
      crop,
      showConnector,
      connectorHoldered,
      lcdLines: [lcd.primary, lcd.secondary],
      // The hardware ties its blink rate to charge intensity, so the card does too.
      flashSeconds: flashSecondsFor(intensity?.state),
      logoOff: this.#entity("logo_led")?.state === "off",
      state: visual.key,
      flash: visual.key === "charging" || visual.key === "wifi_connecting",
    });
    const heroSection = html`
      <section class="hero ${showArtwork ? "has-charger" : "without-charger"}" data-section="hero">
        ${showArtwork ? html`<div class="charger-stage" style=${`--v2c-art-ratio:${artRatio.toFixed(3)}`}>${chargerArt}</div>` : nothing}
        <div class="hero-copy">
          <div class="charger-status" data-severity=${visual.severity} role="status">${translate(dictionary, visual.labelKey)}</div>
          ${this.config.show_badges !== false && visual.badges.length ? html`<div class="badges" aria-label=${translate(dictionary, "labels.additionalStatus")}>${visual.badges.map((badge) => html`<span class="badge">${translate(dictionary, `badges.${badge}`)}</span>`)}</div>` : nothing}
        </div>
      </section>`;
    const metricSection = metricItems.length ? html`<section class="metrics-section" data-section="metrics"><div class="primary-metrics">${metricItems}</div></section>` : nothing;
    const controlSection = this.config.show_controls ? html`<div data-section="controls">${renderSessionControls({ hass: this.hass, entities: this.resolvedEntities, dictionary, presets: this.config.current_presets ?? [], intensityControl: this.config.intensity_control, showPresets: this.config.show_presets, pending: this.pendingRoles, sliderValue: this.sliderValue, onSliderInput: (value) => (this.sliderValue = value), onIntensity: (value) => this.#setIntensity(value), onPause: () => this.#toggleSwitch("paused") })}</div>` : nothing;
    const energySection = this.config.show_energy_flow ? html`<div data-section="energy">${renderEnergyFlow(normalizedFlows, dictionary, language)}</div>` : nothing;
    const advancedSection = this.config.show_advanced ? html`<div data-section="advanced">${renderAdvancedControls({ hass: this.hass, entities: this.resolvedEntities, dictionary, pending: this.pendingRoles, voltage: this.#entity("voltage"), diagnostic, ambiguityRoles, advancedOpen: this.config.advanced_open, onToggle: (role) => role === "logo_led" || role === "light_led" ? this.#toggleLight(role) : this.#toggleSwitch(role), onSelect: (option) => this.#setMode(option), onBrightness: (value) => this.#setLogoBrightness(value) })}</div>` : nothing;
    const orderedSection = (section: "hero" | "metrics" | "controls" | "energy" | "advanced") => {
      switch (section) { case "hero": return heroSection; case "metrics": return metricSection; case "controls": return controlSection; case "energy": return energySection; default: return advancedSection; }
    };
    const sectionOrder = this.config.section_order ?? ["hero", "metrics", "controls", "energy", "advanced"];
    const discoveryNotice = this.discoveryDiagnostic ? html`<p class="live-region" data-diagnostic=${this.discoveryDiagnostic} role="status">${this.discoveryDiagnostic.replaceAll("_", " ")}</p>` : nothing;
    return html`
      <ha-card data-theme=${this.config.theme ?? "auto"} data-mode=${this.config.display_mode ?? "standard"} data-layout=${this.config.layout ?? "auto"} data-surface=${this.config.surface_style ?? "solid"} data-show-header=${String(this.config.show_header !== false)} style=${this.#styleVariables()}>
        <div class="shell">
          ${this.config.show_header !== false ? html`<header class="card-heading"><h2>${title}</h2>${this.config.location ? html`<span class="location">${this.config.location}</span>` : nothing}</header>` : nothing}
          <div class="content-sections">${sectionOrder.map(orderedSection)}</div>
          ${discoveryNotice}
          <p class="live-region" aria-live="polite">${this.actionMessage}</p>
        </div>
      </ha-card>`;
  }
}