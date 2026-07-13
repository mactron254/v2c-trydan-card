import { html, nothing, type TemplateResult } from "lit";
import type { Dictionary } from "../localization";
import { translate } from "../localization";
import type { EntityMap, EntityRole, HassEntity, HomeAssistant } from "../models/types";

export interface AdvancedControlOptions {
  hass: HomeAssistant;
  entities: EntityMap;
  dictionary: Dictionary;
  pending: string[];
  onToggle: (role: EntityRole) => void;
  onSelect: (option: string) => void;
  onBrightness: (value: number) => void;
}

const SWITCHES: Array<{ role: EntityRole; label: string }> = [
  { role: "locked", label: "actions.lock" },
  { role: "timer", label: "actions.timer" },
  { role: "dynamic", label: "actions.dynamic" },
  { role: "pause_dynamic", label: "actions.pauseDynamic" },
];

function valid(entity?: HassEntity): boolean {
  return Boolean(entity && entity.state !== "unknown" && entity.state !== "unavailable");
}

function toggleRow(options: AdvancedControlOptions, role: EntityRole, labelKey: string) {
  const id = options.entities[role];
  if (!id) return nothing;
  const entity = options.hass.states[id];
  const on = entity?.state === "on";
  const label =
    role === "locked" && on
      ? translate(options.dictionary, "actions.unlock")
      : translate(options.dictionary, labelKey);
  return html`
    <div class="toggle-row">
      <span>${label}</span>
      <button
        data-role=${role}
        role="switch"
        aria-checked=${String(on)}
        aria-pressed=${String(on)}
        aria-busy=${String(options.pending.includes(role))}
        ?disabled=${!valid(entity) || options.pending.includes(role)}
        @click=${() => options.onToggle(role)}
      >${on ? "ON" : "OFF"}</button>
    </div>
  `;
}

export function renderAdvancedControls(options: AdvancedControlOptions): TemplateResult | typeof nothing {
  const switchRows = SWITCHES.map(({ role, label }) => toggleRow(options, role, label));
  const modeId = options.entities.charge_mode;
  const mode = modeId ? options.hass.states[modeId] : undefined;
  const logoId = options.entities.logo_led;
  const logo = logoId ? options.hass.states[logoId] : undefined;
  const lightId = options.entities.light_led;
  if (!switchRows.some((row) => row !== nothing) && !modeId && !logoId && !lightId) return nothing;

  return html`
    <details>
      <summary>${translate(options.dictionary, "labels.advanced")}</summary>
      <div class="advanced-grid">
        <section class="control-group">
          <h3>${translate(options.dictionary, "labels.chargingControls")}</h3>
          ${switchRows.slice(0, 2)}
          ${modeId
            ? html`
                <label class="select-row">
                  <span>${translate(options.dictionary, "actions.chargeMode")}</span>
                  <select
                    data-role="charge_mode"
                    .value=${mode?.state ?? ""}
                    ?disabled=${!valid(mode) || options.pending.includes("charge_mode")}
                    @change=${(event: Event) => options.onSelect((event.target as HTMLSelectElement).value)}
                  >
                    ${(mode?.attributes.options ?? []).map(
                      (option) => html`<option .value=${String(option)}>${String(option)}</option>`,
                    )}
                  </select>
                </label>
              `
            : nothing}
        </section>
        <section class="control-group">
          <h3>${translate(options.dictionary, "labels.energyControls")}</h3>
          ${switchRows.slice(2)}
        </section>
        ${logoId || lightId
          ? html`
              <section class="control-group">
                <h3>${translate(options.dictionary, "labels.lightControls")}</h3>
                ${toggleRow(options, "logo_led", "actions.logoLed")}
                ${logoId && valid(logo)
                  ? html`
                      <label class="range-head" for="v2c-logo-brightness">
                        <span>${translate(options.dictionary, "actions.logoLed")}</span>
                        <output>${Math.round(((Number(logo?.attributes.brightness ?? 0) || 0) / 255) * 100)}%</output>
                      </label>
                      <input
                        id="v2c-logo-brightness"
                        type="range"
                        min="1"
                        max="255"
                        .value=${String(logo?.attributes.brightness ?? 128)}
                        @change=${(event: Event) => options.onBrightness(Number((event.target as HTMLInputElement).value))}
                      />
                    `
                  : nothing}
                ${toggleRow(options, "light_led", "actions.lightLed")}
              </section>
            `
          : nothing}
      </div>
    </details>
  `;
}
