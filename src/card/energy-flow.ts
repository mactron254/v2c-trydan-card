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
  return html`
    <section class="energy-section" aria-label=${translate(dictionary, "labels.energy")}>
      <div class="energy-rail">
        ${flows.map((flow) => {
          const name = translate(dictionary, `flows.${flow.role}`);
          const direction = translate(dictionary, `flows.${flow.direction}`);
          const value = formatPower(flow.watts, language);
          const active = flow.available && !["idle", "unknown"].includes(flow.direction);
          return html`
            <div
              class="flow-node"
              data-active=${String(active)}
              aria-label=${`${name}: ${value}, ${direction}`}
            >
              <span class="flow-name"><ha-icon icon=${ICONS[flow.role]}></ha-icon>${name}</span>
              <strong class="flow-value">${value}</strong>
              <span class="flow-direction">${direction}</span>
            </div>
          `;
        })}
      </div>
    </section>
  `;
}
