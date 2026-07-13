import { LitElement, css, html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { getDictionary, getLanguage, SUPPORTED_LANGUAGES, translate } from "../localization";
import type { HomeAssistant, V2cTrydanCardConfig } from "../models/types";

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

  protected override render() {
    if (!this.config) return nothing;
    const language = getLanguage(
      this.config.language ?? this.hass?.locale?.language ?? this.hass?.language,
    );
    const dictionary = getDictionary(language);
    const entities = Object.keys(this.hass?.states ?? {});
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
              .value=${this.config.language ?? language}
              @change=${(event: Event) => this.#updateField("language", (event.target as HTMLSelectElement).value)}
            >
              ${SUPPORTED_LANGUAGES.map(
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
              <option value="standard">${translate(dictionary, "editor.modeStandard")}</option>
              <option value="compact">${translate(dictionary, "editor.modeCompact")}</option>
              <option value="ultra_compact">${translate(dictionary, "editor.modeUltra")}</option>
            </select>
          </label>
        </div>
        <div class="checks">
          ${VISIBILITY_FIELDS.map(
            ([field, label]) => html`
              <label>
                <input
                  data-field=${field}
                  type="checkbox"
                  .checked=${this.config?.[field] !== false}
                  @change=${(event: Event) => this.#updateField(field, (event.target as HTMLInputElement).checked)}
                />
                ${translate(dictionary, label)}
              </label>
            `,
          )}
        </div>
        <p class="yaml-note"><code>YAML | status_entity | entities | invert_*_power | current_presets | flow_threshold_w</code></p>
        <datalist id="v2c-entities">${entities.map((entity) => html`<option value=${entity}></option>`)}</datalist>
      </div>
    `;
  }
}
