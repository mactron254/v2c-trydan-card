import { LitElement, html, nothing, type PropertyValues } from "lit";
import { property, state } from "lit/decorators.js";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";
import { TRYDAN_ASSETS } from "../assets/trydan";
import { normalizeConfig, stubConfig } from "../config";
import { getDictionary, getLanguage, translate, type Language } from "../localization";
import type {
  EntityMap,
  EntityRole,
  HassEntity,
  HomeAssistant,
  V2cTrydanCardConfig,
} from "../models/types";
import { setLight, setNumber, setSelect, setSwitch } from "../services/actions";
import { EntityDiscovery } from "../services/discovery";
import { normalizeEnergyFlow } from "../services/energy";
import { formatDuration, formatEnergy, formatPower } from "../services/format";
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

export class V2cTrydanCard extends LitElement {
  static override styles = cardStyles;

  @property({ attribute: false }) hass?: HomeAssistant;
  @state() private config?: V2cTrydanCardConfig;
  @state() private resolvedEntities: EntityMap = {};
  @state() private ambiguities: Partial<Record<EntityRole, string[]>> = {};
  @state() private sliderValue?: number;
  @state() private pendingRoles: EntityRole[] = [];
  @state() private actionMessage = "";

  readonly #discovery = new EntityDiscovery();
  readonly #pending = new Map<EntityRole, PendingExpectation>();
  #discoveryKey = "";

  static getConfigElement(): HTMLElement {
    return document.createElement("v2c-trydan-card-editor");
  }

  static getStubConfig(hass?: HomeAssistant): V2cTrydanCardConfig {
    return stubConfig(hass);
  }

  setConfig(config: V2cTrydanCardConfig): void {
    const previousSeed = this.config?.entity;
    this.config = normalizeConfig(config);
    this.resolvedEntities = { ...(this.config.entities ?? {}) };
    this.sliderValue = undefined;
    this.#discoveryKey = "";
    if (previousSeed && previousSeed !== this.config.entity) this.#discovery.invalidate();
  }

  getCardSize(): number {
    if (this.config?.display_mode === "ultra_compact") return 2;
    if (this.config?.display_mode === "compact") return this.config.show_advanced === false ? 4 : 5;
    return this.config?.show_advanced === false ? 5 : 7;
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    for (const expectation of this.#pending.values()) {
      if (expectation.timer) clearTimeout(expectation.timer);
    }
    this.#pending.clear();
  }

  protected override updated(changed: PropertyValues<this>): void {
    if (changed.has("hass") || this.#discoveryKey === "") {
      void this.#ensureDiscovery();
      this.#confirmPending();
    }
  }

  async #ensureDiscovery(): Promise<void> {
    if (!this.hass || !this.config) return;
    const metadataCount = Object.keys(this.hass.entities ?? {}).length;
    const key = `${this.config.entity}|${JSON.stringify(this.config.entities ?? {})}|${metadataCount}`;
    if (key === this.#discoveryKey) return;
    this.#discoveryKey = key;
    const result = await this.#discovery.discover(
      this.hass,
      this.config.entity,
      this.config.entities,
    );
    if (!result || !this.isConnected || key !== this.#discoveryKey) return;
    this.resolvedEntities = result.entities;
    this.ambiguities = result.ambiguities;
  }

  #entity(role: EntityRole): HassEntity | undefined {
    const entityId = this.resolvedEntities[role];
    return entityId && this.hass ? this.hass.states[entityId] : undefined;
  }

  #language(): Language {
    return getLanguage(this.config?.language ?? this.hass?.locale?.language ?? this.hass?.language);
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
    this.actionMessage = translate(
      dictionary,
      success ? "labels.actionDone" : "labels.actionFailed",
    );
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
    const clamped = Math.min(max, Math.max(min, Math.round(value / step) * step));
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
    ) {
      return;
    }
    void this.#runAction(
      role,
      entityId,
      (state) => state?.state === (desired ? "on" : "off"),
      () => setSwitch(this.hass!, entityId, desired),
    );
  }

  #setMode(option: string): void {
    const entityId = this.resolvedEntities.charge_mode;
    if (!this.hass || !entityId) return;
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
    if (!this.hass || !entityId) return;
    void this.#runAction(
      "logo_led",
      entityId,
      (state) => Number(state?.attributes.brightness) === value,
      () => setLight(this.hass!, entityId, true, value),
    );
  }

  protected override render() {
    if (!this.config || !this.hass) {
      return html`<ha-card><div class="empty">V2C Trydan Card · configuración pendiente</div></ha-card>`;
    }

    const language = this.#language();
    const dictionary = getDictionary(language);
    const seed = this.hass.states[this.config.entity];
    const chargePower = normalizeEnergyFlow("charger", this.#entity("charge_power"), {
      thresholdW: this.config.flow_threshold_w,
    });
    const visual = resolveVisualState(
      resolveSnapshot({
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
      }),
    );

    const title = this.config.name ?? "V2C Trydan";
    const energy = this.#entity("charge_energy");
    const time = this.#entity("charge_time");
    const flows = [
      ["solar", "fv_power", this.config.invert_solar_power],
      ["grid", "grid_power", this.config.invert_grid_power],
      ["home", "house_power", false],
      ["battery", "battery_power", this.config.invert_battery_power],
      ["charger", "charge_power", false],
    ] as const;
    const normalizedFlows = flows
      .filter(([, role]) => Boolean(this.resolvedEntities[role]))
      .map(([flowRole, role, invert]) =>
        normalizeEnergyFlow(flowRole, this.#entity(role), {
          invert,
          thresholdW: this.config?.flow_threshold_w,
        }),
      );
    const ambiguityRoles = Object.keys(this.ambiguities);

    return html`
      <ha-card
        data-theme=${this.config.theme ?? "auto"}
        data-mode=${this.config.display_mode ?? "standard"}
      >
        <div class="shell">
          <header class="topline">
            <div>
              <p class="eyebrow">${translate(dictionary, "labels.brand")}</p>
              <h2>${title}</h2>
              ${this.config.location ? html`<span class="location">${this.config.location}</span>` : nothing}
            </div>
            <div class="status" data-severity=${visual.severity} role="status">
              <span class="status-dot" aria-hidden="true"></span>
              <span>${translate(dictionary, visual.labelKey)}</span>
            </div>
          </header>

          <section class="hero">
            <div class="hero-copy">
              <p class="hero-value">${formatPower(chargePower.watts, language)}</p>
              <p class="state-detail">${translate(dictionary, visual.detailKey ?? visual.labelKey)}</p>
              ${visual.badges.length
                ? html`
                    <div class="badges" aria-label=${translate(dictionary, "labels.additionalStatus")}>
                      ${visual.badges.map(
                        (badge) => html`<span class="badge">${translate(dictionary, `badges.${badge}`)}</span>`,
                      )}
                    </div>
                  `
                : nothing}
              <div class="session-stats">
                <div class="stat">
                  <span class="stat-label">${translate(dictionary, "labels.energy")}</span>
                  <span class="stat-value">${formatEnergy(energy?.state ?? null, language)}</span>
                </div>
                <div class="stat">
                  <span class="stat-label">${translate(dictionary, "labels.time")}</span>
                  <span class="stat-value">${formatDuration(time?.state ?? null)}</span>
                </div>
                ${this.#entity("voltage")
                  ? html`
                      <div class="stat">
                        <span class="stat-label">VOLT</span>
                        <span class="stat-value">${this.#entity("voltage")?.state} V</span>
                      </div>
                    `
                  : nothing}
              </div>
            </div>
            ${this.config.show_charger
              ? html`
                  <div class="charger-stage">
                    <div class="charger-art" aria-hidden="true">${unsafeSVG(TRYDAN_ASSETS[visual.key])}</div>
                  </div>
                `
              : nothing}
          </section>

          ${visual.diagnostic && visual.diagnostic !== "no_error"
            ? html`<p class="diagnostic">${visual.diagnostic.replaceAll("_", " ")}</p>`
            : nothing}
          ${ambiguityRoles.length
            ? html`<p class="config-warning">YAML | ${ambiguityRoles.join(", ")}</p>`
            : nothing}

          ${this.config.show_energy_flow
            ? renderEnergyFlow(normalizedFlows, dictionary, language)
            : nothing}
          ${this.config.show_controls
            ? renderSessionControls({
                hass: this.hass,
                entities: this.resolvedEntities,
                dictionary,
                presets: this.config.current_presets ?? [],
                pending: this.pendingRoles,
                sliderValue: this.sliderValue,
                onSliderInput: (value) => (this.sliderValue = value),
                onIntensity: (value) => this.#setIntensity(value),
                onPause: () => this.#toggleSwitch("paused"),
              })
            : nothing}
          ${this.config.show_advanced
            ? renderAdvancedControls({
                hass: this.hass,
                entities: this.resolvedEntities,
                dictionary,
                pending: this.pendingRoles,
                onToggle: (role) =>
                  role === "logo_led" || role === "light_led"
                    ? this.#toggleLight(role)
                    : this.#toggleSwitch(role),
                onSelect: (option) => this.#setMode(option),
                onBrightness: (value) => this.#setLogoBrightness(value),
              })
            : nothing}
          <p class="live-region" aria-live="polite">${this.actionMessage}</p>
        </div>
      </ha-card>
    `;
  }
}
