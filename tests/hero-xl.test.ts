import { beforeEach, describe, expect, it, vi } from "vitest";
import "../src/index";
import { TRYDAN_ASSETS } from "../src/assets/trydan";
import { V2cTrydanCard } from "../src/card/v2c-trydan-card";
import type { HomeAssistant, V2cTrydanCardConfig } from "../src/models/types";

const baseConfig: V2cTrydanCardConfig = {
  type: "custom:v2c-trydan-card",
  entity: "binary_sensor.trydan_connected",
  entities: {
    connected: "binary_sensor.trydan_connected",
    charging: "binary_sensor.trydan_charging",
    charge_power: "sensor.trydan_power",
    charge_energy: "sensor.trydan_energy",
    charge_time: "sensor.trydan_time",
    intensity: "number.trydan_intensity",
    paused: "switch.trydan_paused",
  },
};

const hass = {
  language: "es",
  states: {
    "binary_sensor.trydan_connected": { entity_id: "binary_sensor.trydan_connected", state: "on", attributes: {} },
    "binary_sensor.trydan_charging": { entity_id: "binary_sensor.trydan_charging", state: "on", attributes: {} },
    "sensor.trydan_power": { entity_id: "sensor.trydan_power", state: "4200", attributes: { unit_of_measurement: "W" } },
    "sensor.trydan_energy": { entity_id: "sensor.trydan_energy", state: "8.6", attributes: { unit_of_measurement: "kWh" } },
    "sensor.trydan_time": { entity_id: "sensor.trydan_time", state: "5640", attributes: { unit_of_measurement: "s" } },
    "number.trydan_intensity": { entity_id: "number.trydan_intensity", state: "18", attributes: { min: 6, max: 32, step: 1 } },
    "switch.trydan_paused": { entity_id: "switch.trydan_paused", state: "off", attributes: {} },
  },
  callService: vi.fn().mockResolvedValue(undefined),
} as unknown as HomeAssistant;

async function renderCard(config: V2cTrydanCardConfig = baseConfig): Promise<V2cTrydanCard> {
  const card = document.createElement("v2c-trydan-card") as V2cTrydanCard;
  card.setConfig(config);
  card.hass = hass;
  document.body.append(card);
  await card.updateComplete;
  await new Promise((resolve) => setTimeout(resolve, 0));
  await card.updateComplete;
  return card;
}

describe("Trydan Hero XL contracts", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("crops all eleven SVG canvases without retaining the old viewBox", () => {
    const assets = Object.values(TRYDAN_ASSETS);
    expect(assets).toHaveLength(11);
    for (const asset of assets) {
      expect(asset).toContain('viewBox="24 0 312 480"');
      expect(asset).not.toContain('viewBox="0 0 360 500"');
    }
  });

  it("uses centered overflow-safe Hero XL bounds in every density", () => {
    const styles = String(V2cTrydanCard.styles);
    expect(styles).toContain("width: min(100%, clamp(260px, 68cqw, 360px))");
    expect(styles).toContain("width: min(100%, clamp(210px, 62cqw, 280px))");
    expect(styles).toContain("width: min(100%, clamp(170px, 56cqw, 220px))");
    expect(styles).toContain("font-size: clamp(2rem, 7cqw, 2.5rem)");
    expect(styles).not.toContain("minmax(180px, 0.44fr)");
  });

  it("keeps SVG, state, metrics and controls in reading order", async () => {
    const card = await renderCard();
    const art = card.shadowRoot?.querySelector(".charger-art");
    const status = card.shadowRoot?.querySelector(".charger-status");
    const metrics = card.shadowRoot?.querySelector(".primary-metrics");
    const controls = card.shadowRoot?.querySelector(".session-controls");
    expect(art).toBeTruthy();
    expect(status).toBeTruthy();
    expect(metrics).toBeTruthy();
    expect(controls).toBeTruthy();
    if (!art || !status || !metrics || !controls) return;
    expect(Boolean(art.compareDocumentPosition(status) & Node.DOCUMENT_POSITION_FOLLOWING)).toBe(true);
    expect(Boolean(status.compareDocumentPosition(metrics) & Node.DOCUMENT_POSITION_FOLLOWING)).toBe(true);
    expect(Boolean(metrics.compareDocumentPosition(controls) & Node.DOCUMENT_POSITION_FOLLOWING)).toBe(true);
  });

  it("removes the charger stage when the artwork is disabled", async () => {
    const card = await renderCard({ ...baseConfig, show_charger: false });
    expect(card.shadowRoot?.querySelector(".charger-stage")).toBeNull();
    expect(card.shadowRoot?.querySelector(".charger-status")?.textContent).toContain("Cargando");
    expect(card.shadowRoot?.querySelector(".primary-metrics")).toBeTruthy();
  });

  it("reports stable 8, 6 and 4 row estimates", () => {
    const card = document.createElement("v2c-trydan-card") as V2cTrydanCard;
    card.setConfig({ ...baseConfig, display_mode: "standard", show_advanced: false });
    expect(card.getCardSize()).toBe(8);
    card.setConfig({ ...baseConfig, display_mode: "compact", show_advanced: false });
    expect(card.getCardSize()).toBe(6);
    card.setConfig({ ...baseConfig, display_mode: "ultra_compact", show_advanced: false });
    expect(card.getCardSize()).toBe(4);
  });
});
