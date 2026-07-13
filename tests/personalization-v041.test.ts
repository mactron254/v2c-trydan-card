import { beforeEach, describe, expect, it, vi } from "vitest";
import "../src/index";
import { V2cTrydanCard } from "../src/card/v2c-trydan-card";
import type { HomeAssistant, V2cTrydanCardConfig } from "../src/models/types";

const hass = {
  language:"es",
  states:{
    "binary_sensor.connected":{ entity_id:"binary_sensor.connected", state:"off", attributes:{} },
    "sensor.power":{ entity_id:"sensor.power", state:"0", attributes:{ unit_of_measurement:"W" } },
  },
  callService:vi.fn(),
} as unknown as HomeAssistant;

async function render(config: Partial<V2cTrydanCardConfig> = {}) {
  const card=document.createElement("v2c-trydan-card") as V2cTrydanCard;
  card.setConfig({ type:"custom:v2c-trydan-card", entity:"binary_sensor.connected", entities:{ connected:"binary_sensor.connected", charge_power:"sensor.power" }, ...config });
  card.hass=hass; document.body.append(card); await card.updateComplete; return card;
}

describe("v0.4.1 visual personalization", () => {
  beforeEach(() => { document.body.innerHTML=""; });

  it("applies visible radius, XXL and split contracts", async () => {
    const card=await render({ display_mode:"xxl", layout:"split", card_radius:0 });
    const surface=card.shadowRoot?.querySelector<HTMLElement>("ha-card");
    expect(surface?.dataset.mode).toBe("xxl");
    expect(surface?.dataset.layout).toBe("split");
    expect(surface?.getAttribute("style")).toContain("--v2c-radius:0px");
    expect(card.shadowRoot?.querySelector(".hero > .charger-stage + .hero-copy")).toBeTruthy();
    const styles=String(V2cTrydanCard.styles);
    expect(styles).toContain('ha-card[data-mode="xxl"] .charger-stage');
    expect(styles).toContain('ha-card[data-layout="split"] .hero');
    expect(styles).toContain("@container (min-width: 400px)");
  });

  it("keeps centered fallback and brings status next to artwork", async () => {
    const card=await render({ layout:"centered", display_mode:"standard" });
    const art=card.shadowRoot?.querySelector(".charger-stage");
    const copy=card.shadowRoot?.querySelector(".hero-copy");
    expect(art).toBeTruthy(); expect(copy).toBeTruthy();
    if (!art || !copy) return;
    expect(Boolean(art.compareDocumentPosition(copy) & Node.DOCUMENT_POSITION_FOLLOWING)).toBe(true);
    expect(String(V2cTrydanCard.styles)).toContain("margin-top: -18px");
  });
});