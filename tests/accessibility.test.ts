import { beforeEach, describe, expect, it, vi } from "vitest";
import "../src/index";
import { V2cTrydanCard } from "../src/card/v2c-trydan-card";
import type { HomeAssistant } from "../src/models/types";

describe("accessible Carbon Flow contract", () => {
  beforeEach(() => (document.body.innerHTML = ""));

  it("keeps state, flow, range and disclosure semantics without relying on motion", async () => {
    const hass = {
      states: {
        "binary_sensor.connected": { entity_id: "binary_sensor.connected", state: "on", attributes: {} },
        "sensor.power": { entity_id: "sensor.power", state: "1200", attributes: { unit_of_measurement: "W" } },
        "sensor.solar": { entity_id: "sensor.solar", state: "1800", attributes: { unit_of_measurement: "W" } },
        "number.intensity": { entity_id: "number.intensity", state: "16", attributes: { min: 6, max: 32, step: 1 } },
        "switch.pause": { entity_id: "switch.pause", state: "off", attributes: {} },
        "switch.lock": { entity_id: "switch.lock", state: "off", attributes: {} },
      },
      callService: vi.fn().mockResolvedValue(undefined),
    } as unknown as HomeAssistant;
    const card = document.createElement("v2c-trydan-card") as V2cTrydanCard;
    card.setConfig({
      type: "custom:v2c-trydan-card",
      entity: "binary_sensor.connected",
      entities: {
        connected: "binary_sensor.connected",
        charge_power: "sensor.power",
        fv_power: "sensor.solar",
        intensity: "number.intensity",
        paused: "switch.pause",
        locked: "switch.lock",
      },
    });
    card.hass = hass;
    document.body.append(card);
    await card.updateComplete;
    expect(card.shadowRoot?.querySelector('[role="status"]')).toBeTruthy();
    expect(card.shadowRoot?.querySelector('.flow-node[aria-label*="Solar"]')).toBeTruthy();
    expect(card.shadowRoot?.querySelector('label[for="v2c-intensity"]')).toBeTruthy();
    expect(card.shadowRoot?.querySelector("details > summary")).toBeTruthy();
    expect(card.shadowRoot?.querySelector('.charger-art[aria-hidden="true"]')).toBeTruthy();
    expect(String(V2cTrydanCard.styles)).toContain("prefers-reduced-motion");
    expect(String(V2cTrydanCard.styles)).toContain("@container (min-width: 650px)");
    expect(String(V2cTrydanCard.styles)).toContain("light-dark(");
  });
});
