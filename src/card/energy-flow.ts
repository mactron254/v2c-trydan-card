import { html, nothing, type TemplateResult } from "lit";
import type { Dictionary } from "../localization";
import { translate } from "../localization";
import type { EnergyFlow } from "../models/types";
import { formatPower } from "../services/format";

const ICONS: Record<EnergyFlow["role"], string> = {
  solar: "mdi:solar-power",
  grid: "mdi:transmission-tower",
  home: "mdi:home-lightning-bolt",
  battery: "mdi:home-battery",
  charger: "mdi:ev-station",
};

export function renderEnergyFlow(
  flows: EnergyFlow[],
  dictionary: Dictionary,
  language: string,
): TemplateResult | typeof nothing {
  if (flows.length === 0) return nothing;

  const available = flows.filter((flow) => flow.available);
  const unavailable = flows.length - available.length;
  const active = available.filter((flow) => !["idle", "unknown"].includes(flow.direction));
  const kind = active.length > 0
    ? "active"
    : available.length === 0
      ? "unavailable"
      : unavailable > 0
        ? "partial"
        : "idle";
  const titleKey = kind === "active"
    ? "flows.activeFlow"
    : kind === "partial"
      ? "flows.partialData"
      : kind === "unavailable"
        ? "flows.noData"
        : "flows.noFlow";
  const title = `${translate(dictionary, titleKey)}${kind === "idle" ? " · 0 W" : ""}`;

  return html`
    <section class="energy-section" aria-label=${translate(dictionary, "labels.energyFlow")}>
      <div class="energy-summary" data-kind=${kind}>
        <p class="energy-summary-title">
          <ha-icon icon="mdi:lightning-bolt-outline" aria-hidden="true"></ha-icon>
          <span>${title}</span>
        </p>
        ${active.length
          ? html`
              <div class="energy-nodes">
                ${active.map((flow) => {
                  const name = translate(dictionary, `flows.${flow.role}`);
                  const direction = translate(dictionary, `flows.${flow.direction}`);
                  const value = formatPower(flow.watts, language);
                  return html`
                    <div class="flow-node" aria-label=${`${name}: ${value}, ${direction}`}>
                      <span class="flow-name" aria-hidden="true"><ha-icon icon=${ICONS[flow.role]}></ha-icon></span>
                      <span class="flow-name-text">${name}</span>
                      <strong class="flow-value">${value}</strong>
                      <span class="flow-direction">${direction}</span>
                    </div>
                  `;
                })}
              </div>
            `
          : nothing}
        ${active.length && unavailable
          ? html`<p class="energy-note">${translate(dictionary, "flows.partialData")}</p>`
          : nothing}
      </div>
    </section>
  `;
}
