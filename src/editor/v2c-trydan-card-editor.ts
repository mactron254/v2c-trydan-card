import { LitElement, css, html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { getDictionary, getLanguage, SUPPORTED_LANGUAGES, translate } from "../localization";
import { ENTITY_ROLES, type EntityRole, type HomeAssistant, type V2cTrydanCardConfig } from "../models/types";
import { resolveRegistryRoles } from "../services/discovery";

const LANGUAGE_NAMES: Record<(typeof SUPPORTED_LANGUAGES)[number], string> = {
  en: "English",
  it: "Italiano",
  de: "Deutsch",
  fr: "Français",
  nl: "Nederlands",
  sv: "Svenska",
  da: "Dansk",
  no: "Norsk",
  ro: "Română",
  es: "Español",
};

const VISIBILITY_FIELDS = [
  ["show_energy_flow", "editor.showEnergyFlow"],
  ["show_controls", "editor.showControls"],
  ["show_advanced", "editor.showAdvanced"],
  ["show_charger", "editor.showCharger"],
  ["show_header", "Header"],
  ["show_badges", "Badges"],
  ["show_presets", "Presets"],
] as const;

export class V2cTrydanCardEditor extends LitElement {
  static override styles = css`
    :host { display: block; color: var(--primary-text-color); }
    .editor { display: grid; gap: 14px; padding: 8px 0; }
    h3 { margin: 0; font-size: 1rem; }
    label { display: grid; gap: 5px; color: var(--secondary-text-color); font-size: 0.8rem; }
    input, select {
      width: 100%; min-height: 40px; padding: 8px 10px; box-sizing: border-box;
      border: 1px solid var(--divider-color, #7775); border-radius: 8px;
      color: var(--primary-text-color); background: var(--card-background-color);
    }
    input:focus-visible, select:focus-visible { outline: 3px solid var(--primary-color, #0067d9); outline-offset: 2px; }
    .grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
    .checks { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px 12px; }
    .checks label { display: flex; align-items: center; gap: 7px; min-height: 32px; }
    .checks input { width: auto; min-height: auto; accent-color: var(--primary-text-color, #202326); }
    .entity-status { font-size: 0.72rem; text-transform: capitalize; color: var(--secondary-text-color); }
    .yaml-note {
      margin: 0; padding: 9px 11px; border-left: 3px solid var(--primary-text-color, #202326);
      color: var(--secondary-text-color); background: var(--secondary-background-color, #f4f5f6);
      font-size: 0.73rem; line-height: 1.4;
    }
    @media (max-width: 500px) { .grid, .checks { grid-template-columns: 1fr; } }
  `;

  @property({ attribute: false }) hass?: HomeAssistant;
  @state() private config?: V2cTrydanCardConfig;

  setConfig(config: V2cTrydanCardConfig): void {
    this.config = { ...config, entities: { ...(config.entities ?? {}) } };
  }

  #emit(config: V2cTrydanCardConfig): void {
    this.config = config;
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config },
        bubbles: true,
        composed: true,
      }),
    );
  }

  #updateField(field: keyof V2cTrydanCardConfig, value: string | boolean): void {
    if (!this.config) return;
    const next = { ...this.config };
    if (typeof value === "string" && value.trim() === "" && field !== "entity") delete next[field];
    else Object.assign(next, { [field]: value });
    this.#emit(next);
  }

  #updateList(field: "metrics" | "energy_sources" | "section_order" | "current_presets", value: string): void {
    if (!this.config) return;
    const values = value.split(",").map((item) => item.trim()).filter(Boolean);
    const next = { ...this.config };
    if (field === "current_presets") next.current_presets = values.map(Number).filter(Number.isFinite);
    else Object.assign(next, { [field]: values });
    this.#emit(next);
  }

  #updateNumber(field: "hero_scale" | "card_radius" | "flow_threshold_w", value: string): void {
    if (!this.config) return;
    const number = Number(value);
    const next = { ...this.config };
    if (Number.isFinite(number)) Object.assign(next, { [field]: number }); else delete next[field];
    this.#emit(next);
  }
  #updateEntity(role: EntityRole, value: string): void {
    if (!this.config) return;
    const entities = { ...(this.config.entities ?? {}) };
    if (value.trim()) entities[role] = value; else delete entities[role];
    this.#emit({ ...this.config, entities });
  }

  protected override render() {
    if (!this.config) return nothing;
    const language = getLanguage(
      this.config.language ?? this.hass?.locale?.language ?? this.hass?.language,
    );
    const dictionary = getDictionary(language);
    const entities = Object.keys(this.hass?.states ?? {});
    const discovery = this.hass ? resolveRegistryRoles(Object.values(this.hass.entities ?? {}), this.config.entity, this.config.entities) : undefined;
    return html`
      <div class="editor">
        <h3>${translate(dictionary, "editor.title")}</h3>
        <label>
          <span>${translate(dictionary, "editor.entity")}</span>
          <input
            data-field="entity"
            list="v2c-entities"
            .value=${this.config.entity}
            @change=${(event: Event) => this.#updateField("entity", (event.target as HTMLInputElement).value)}
          />
        </label>
        <div class="grid">
          ${(["name", "location"] as const).map(
            (field) => html`
              <label>
                <span>${translate(dictionary, `editor.${field}`)}</span>
                <input
                  data-field=${field}
                  .value=${this.config?.[field] ?? ""}
                  @change=${(event: Event) => this.#updateField(field, (event.target as HTMLInputElement).value)}
                />
              </label>
            `,
          )}
          <label>
            <span>${translate(dictionary, "editor.language")}</span>
            <select
              data-field="language"
              .value=${this.config.language ?? "auto"}
              @change=${(event: Event) => this.#updateField("language", (event.target as HTMLSelectElement).value)}
            >
              <option value="auto">Automatic</option>${SUPPORTED_LANGUAGES.map(
                (code) => html`<option .value=${code}>${LANGUAGE_NAMES[code]}</option>`,
              )}
            </select>
          </label>
          <label>
            <span>${translate(dictionary, "editor.theme")}</span>
            <select
              data-field="theme"
              .value=${this.config.theme ?? "auto"}
              @change=${(event: Event) => this.#updateField("theme", (event.target as HTMLSelectElement).value)}
            >
              <option value="auto">${translate(dictionary, "editor.themeAuto")}</option>
              <option value="light">${translate(dictionary, "editor.themeLight")}</option>
              <option value="dark">${translate(dictionary, "editor.themeDark")}</option>
            </select>
          </label>
          <label>
            <span>${translate(dictionary, "editor.displayMode")}</span>
            <select
              data-field="display_mode"
              .value=${this.config.display_mode ?? "standard"}
              @change=${(event: Event) => this.#updateField("display_mode", (event.target as HTMLSelectElement).value)}
            >
              <option value="xxl">XXL</option>
              <option value="standard">${translate(dictionary, "editor.modeStandard")}</option>
              <option value="compact">${translate(dictionary, "editor.modeCompact")}</option>
              <option value="ultra_compact">${translate(dictionary, "editor.modeUltra")}</option>
            </select>
          </label>
        </div>
        <h3>Appearance</h3>
        <div class="grid">
          <label><span>Layout</span><select data-field="layout" .value=${this.config.layout ?? "auto"} @change=${(event: Event) => this.#updateField("layout", (event.target as HTMLSelectElement).value)}><option value="auto">Auto</option><option value="centered">Centered</option><option value="split">Split</option><option value="inline">Inline</option></select></label>
          <label><span>Color scheme</span><select data-field="color_scheme" .value=${this.config.color_scheme ?? "monochrome"} @change=${(event: Event) => this.#updateField("color_scheme", (event.target as HTMLSelectElement).value)}><option value="monochrome">Monochrome</option><option value="v2c_blue">V2C blue</option><option value="teal">Teal</option><option value="green">Green</option><option value="violet">Violet</option><option value="custom">Custom</option></select></label>
          <label><span>Accent color</span><input data-field="accent_color" .value=${this.config.accent_color ?? ""} @change=${(event: Event) => this.#updateField("accent_color", (event.target as HTMLInputElement).value)} /></label>
          <label><span>Surface</span><select data-field="surface_style" .value=${this.config.surface_style ?? "solid"} @change=${(event: Event) => this.#updateField("surface_style", (event.target as HTMLSelectElement).value)}><option value="solid">Solid</option><option value="tinted">Tinted</option><option value="transparent">Transparent</option></select></label>
        </div>
        <h3>Content and order</h3>
        <div class="grid">
          <label><span>Metrics</span><input data-field="metrics" .value=${(this.config.metrics ?? []).join(", ")} @change=${(event: Event) => this.#updateList("metrics", (event.target as HTMLInputElement).value)} /></label>
          <label><span>Energy sources</span><input data-field="energy_sources" .value=${(this.config.energy_sources ?? []).join(", ")} @change=${(event: Event) => this.#updateList("energy_sources", (event.target as HTMLInputElement).value)} /></label>
          <label><span>Section order</span><input data-field="section_order" .value=${(this.config.section_order ?? []).join(", ")} @change=${(event: Event) => this.#updateList("section_order", (event.target as HTMLInputElement).value)} /></label>
          <label><span>Hero scale</span><input data-field="hero_scale" type="number" min="0.75" max="1.25" step="0.05" .value=${String(this.config.hero_scale ?? 1)} @change=${(event: Event) => this.#updateNumber("hero_scale", (event.target as HTMLInputElement).value)} /></label>
          <label><span>Card radius</span><input data-field="card_radius" type="number" min="0" max="40" step="1" .value=${String(this.config.card_radius ?? "")} @change=${(event: Event) => this.#updateNumber("card_radius", (event.target as HTMLInputElement).value)} /></label>
        </div>        <div class="checks">
          ${VISIBILITY_FIELDS.map(
            ([field, label]) => html`
              <label>
                <input
                  data-field=${field}
                  type="checkbox"
                  .checked=${this.config?.[field] !== false}
                  @change=${(event: Event) => this.#updateField(field, (event.target as HTMLInputElement).checked)}
                />
                ${label.includes(".") ? translate(dictionary, label) : label}
              </label>
            `,
          )}
        </div>
        <h3>Advanced</h3>
        <div class="grid">
          <label><span>Intensity control</span><select data-field="intensity_control" .value=${this.config.intensity_control ?? "both"} @change=${(event: Event) => this.#updateField("intensity_control", (event.target as HTMLSelectElement).value)}><option value="slider">Slider</option><option value="presets">Presets</option><option value="both">Both</option></select></label>
          <label><span>Flow threshold (W)</span><input data-field="flow_threshold_w" type="number" min="0" .value=${String(this.config.flow_threshold_w ?? 50)} @change=${(event: Event) => this.#updateNumber("flow_threshold_w", (event.target as HTMLInputElement).value)} /></label>
          <label><span>Current presets</span><input data-field="current_presets" .value=${(this.config.current_presets ?? []).join(", ")} @change=${(event: Event) => this.#updateList("current_presets", (event.target as HTMLInputElement).value)} /></label>
        </div>
        <div class="checks">
          <label><input data-field="advanced_open" type="checkbox" .checked=${this.config.advanced_open === true} @change=${(event: Event) => this.#updateField("advanced_open", (event.target as HTMLInputElement).checked)} />Open advanced</label>
          <label><input data-field="confirm_lock" type="checkbox" .checked=${this.config.confirm_lock !== false} @change=${(event: Event) => this.#updateField("confirm_lock", (event.target as HTMLInputElement).checked)} />Confirm lock</label>
          <label><input data-field="invert_grid_power" type="checkbox" .checked=${this.config.invert_grid_power === true} @change=${(event: Event) => this.#updateField("invert_grid_power", (event.target as HTMLInputElement).checked)} />Invert grid power</label>
          <label><input data-field="invert_battery_power" type="checkbox" .checked=${this.config.invert_battery_power === true} @change=${(event: Event) => this.#updateField("invert_battery_power", (event.target as HTMLInputElement).checked)} />Invert battery power</label>
          <label><input data-field="invert_solar_power" type="checkbox" .checked=${this.config.invert_solar_power === true} @change=${(event: Event) => this.#updateField("invert_solar_power", (event.target as HTMLInputElement).checked)} />Invert solar power</label>
        </div>
        <h3>Entities</h3>
        <details><summary>Entities (manual overrides)</summary><div class="grid">${ENTITY_ROLES.map((role) => html`<label><span>${role.replaceAll("_", " ")}</span><input data-role=${role} list="v2c-entities" .value=${this.config?.entities?.[role] ?? ""} @change=${(event: Event) => this.#updateEntity(role, (event.target as HTMLInputElement).value)} /><small class="entity-status" data-status=${discovery?.statuses[role] ?? "missing"}>${discovery?.statuses[role] ?? "missing"}</small></label>`)}</div></details>        <p class="yaml-note"><code>YAML | status_entity | entities | invert_*_power | current_presets | flow_threshold_w</code></p>
        <datalist id="v2c-entities">${entities.map((entity) => html`<option value=${entity}></option>`)}</datalist>
      </div>
    `;
  }
}
