import { html, nothing, type TemplateResult } from "lit";
import type { Dictionary } from "../localization";
import { translate } from "../localization";
import type { EntityMap, HassEntity, HomeAssistant } from "../models/types";

export interface SessionControlOptions {
  hass: HomeAssistant;
  entities: EntityMap;
  dictionary: Dictionary;
  presets: number[];
  pending: string[];
  sliderValue?: number;
  onSliderInput: (value: number) => void;
  onIntensity: (value: number) => void;
  onPause: () => void;
}

function available(entity?: HassEntity): boolean {
  return Boolean(entity && entity.state !== "unknown" && entity.state !== "unavailable");
}

export function renderSessionControls(options: SessionControlOptions): TemplateResult | typeof nothing {
  const intensityId = options.entities.intensity;
  const pauseId = options.entities.paused;
  const intensity = intensityId ? options.hass.states[intensityId] : undefined;
  const pause = pauseId ? options.hass.states[pauseId] : undefined;
  if (!intensityId && !pauseId) return nothing;

  const min = Number(intensity?.attributes.min ?? 6);
  const max = Number(intensity?.attributes.max ?? 32);
  const step = Number(intensity?.attributes.step ?? 1);
  const current = Number(intensity?.state);
  const value = options.sliderValue ?? (Number.isFinite(current) ? current : min);
  const presets = options.presets.filter((preset) => preset >= min && preset <= max);
  const paused = pause?.state === "on";

  return html`
    <section class="session-controls" aria-label=${translate(options.dictionary, "labels.chargingControls")}>
      ${intensityId
        ? html`
            <div class="range-control">
              <label class="range-head" for="v2c-intensity">
                <span>${translate(options.dictionary, "labels.intensity")}</span>
                <output>${Math.round(value)} A</output>
              </label>
              <input
                id="v2c-intensity"
                data-role="intensity"
                type="range"
                .min=${String(min)}
                .max=${String(max)}
                .step=${String(step)}
                .value=${String(value)}
                ?disabled=${!available(intensity) || options.pending.includes("intensity")}
                aria-busy=${String(options.pending.includes("intensity"))}
                @input=${(event: Event) => options.onSliderInput(Number((event.target as HTMLInputElement).value))}
                @change=${(event: Event) => options.onIntensity(Number((event.target as HTMLInputElement).value))}
              />
              <div class="presets" aria-label=${translate(options.dictionary, "labels.intensity")}>
                ${presets.map(
                  (preset) => html`
                    <button
                      class="preset"
                      aria-pressed=${String(Math.round(value) === preset)}
                      ?disabled=${!available(intensity) || options.pending.includes("intensity")}
                      @click=${() => options.onIntensity(preset)}
                    >${preset} A</button>
                  `,
                )}
              </div>
            </div>
          `
        : nothing}
      ${pauseId
        ? html`
            <button
              class="primary-action"
              data-role="paused"
              aria-busy=${String(options.pending.includes("paused"))}
              ?disabled=${!available(pause) || options.pending.includes("paused")}
              title=${available(pause) ? "" : translate(options.dictionary, "labels.unavailableEntity")}
              @click=${options.onPause}
            >
              ${translate(options.dictionary, paused ? "actions.resume" : "actions.pause")}
            </button>
          `
        : nothing}
    </section>
  `;
}
