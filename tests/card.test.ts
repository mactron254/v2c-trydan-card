import { beforeEach, describe, expect, it, vi } from "vitest";
import "../src/index";
import type { HomeAssistant, V2cTrydanCardConfig } from "../src/models/types";
import { V2cTrydanCard } from "../src/card/v2c-trydan-card";

const config: V2cTrydanCardConfig = {
  type: "custom:v2c-trydan-card",
  entity: "binary_sensor.trydan_connected",
  entities: {
    connected: "binary_sensor.trydan_connected",
    charging: "binary_sensor.trydan_charging",
    ready: "binary_sensor.trydan_ready",
    charge_power: "sensor.trydan_charge_power",
    charge_energy: "sensor.trydan_charge_energy",
    charge_time: "sensor.trydan_charge_time",
    intensity: "number.trydan_intensity",
    paused: "switch.trydan_paused",
    locked: "switch.trydan_locked",
    timer: "switch.trydan_timer",
  },
};

function mockHass(overrides: Record<string, string> = {}): HomeAssistant {
  const raw = {
    "binary_sensor.trydan_connected": "on",
    "binary_sensor.trydan_charging": "on",
    "binary_sensor.trydan_ready": "off",
    "sensor.trydan_charge_power": "4200",
    "sensor.trydan_charge_energy": "8.6",
    "sensor.trydan_charge_time": "5640",
    "number.trydan_intensity": "18",
    "switch.trydan_paused": "off",
    "switch.trydan_locked": "off",
    "switch.trydan_timer": "off",
    ...overrides,
  };
  return {
    language: "es",
    states: Object.fromEntries(
      Object.entries(raw).map(([entity_id, state]) => [
        entity_id,
        {
          entity_id,
          state,
          attributes: entity_id.startsWith("number.")
            ? { friendly_name: "Intensidad", unit_of_measurement: "A", min: 6, max: 32, step: 1 }
            : entity_id.includes("charge_power")
              ? { unit_of_measurement: "W" }
              : entity_id.includes("charge_energy")
                ? { unit_of_measurement: "kWh" }
                : entity_id.includes("charge_time")
                  ? { unit_of_measurement: "s" }
                  : {},
        },
      ]),
    ),
    callService: vi.fn().mockResolvedValue(undefined),
  };
}

async function renderCard(hass = mockHass(), cardConfig = config): Promise<V2cTrydanCard> {
  const card = document.createElement("v2c-trydan-card") as V2cTrydanCard;
  card.setConfig(cardConfig);
  card.hass = hass;
  document.body.append(card);
  await card.updateComplete;
  await new Promise((resolve) => setTimeout(resolve, 0));
  await card.updateComplete;
  return card;
}

describe("v2c-trydan-card", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("renders textual charging state, metrics and decorative artwork", async () => {
    const card = await renderCard();
    expect(card.shadowRoot?.textContent).toContain("Cargando");
    expect(card.shadowRoot?.textContent).toContain("4,2 kW");
    expect(card.shadowRoot?.textContent).toContain("8,6 kWh");
    expect(card.shadowRoot?.querySelector(".charger-art")?.getAttribute("aria-hidden")).toBe("true");
  });

  it("renders without optional energy or control entities", async () => {
    const minimal: V2cTrydanCardConfig = {
      type: "custom:v2c-trydan-card",
      entity: "binary_sensor.trydan_connected",
      entities: { connected: "binary_sensor.trydan_connected" },
    };
    const card = await renderCard(mockHass({ "binary_sensor.trydan_connected": "off" }), minimal);
    expect(card.shadowRoot?.textContent).toContain("Sin vehículo");
    expect(card.shadowRoot?.querySelector(".energy-rail")).toBeNull();
  });

  it("applies explicit theme and density without duplicating the card", async () => {
    const card = await renderCard(mockHass(), {
      ...config,
      language: "de",
      theme: "light",
      display_mode: "ultra_compact",
    });
    const surface = card.shadowRoot?.querySelector("ha-card");
    expect(surface?.getAttribute("data-theme")).toBe("light");
    expect(surface?.getAttribute("data-mode")).toBe("ultra_compact");
    expect(card.shadowRoot?.textContent).toContain("Laden");
    expect(String(V2cTrydanCard.styles)).toContain('data-mode="compact"');
    expect(String(V2cTrydanCard.styles)).toContain('data-theme="dark"');
  });
  it("sends intensity once on committed change", async () => {
    const hass = mockHass();
    const card = await renderCard(hass);
    const slider = card.shadowRoot?.querySelector<HTMLInputElement>('input[type="range"][data-role="intensity"]');
    expect(slider).toBeTruthy();
    if (!slider) return;
    slider.value = "20";
    slider.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(hass.callService).toHaveBeenCalledTimes(1);
    expect(hass.callService).toHaveBeenCalledWith("number", "set_value", {
      entity_id: "number.trydan_intensity",
      value: 20,
    });
  });

  it("pauses a session once and exposes busy state", async () => {
    const hass = mockHass();
    const card = await renderCard(hass);
    const button = card.shadowRoot?.querySelector<HTMLButtonElement>('button[data-role="paused"]');
    button?.click();
    button?.click();
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(hass.callService).toHaveBeenCalledTimes(1);
    expect(hass.callService).toHaveBeenCalledWith("switch", "turn_on", {
      entity_id: "switch.trydan_paused",
    });
  });

  it("requires confirmation before locking", async () => {
    const confirm = vi.spyOn(window, "confirm").mockReturnValue(false);
    const hass = mockHass();
    const card = await renderCard(hass);
    const button = card.shadowRoot?.querySelector<HTMLButtonElement>('button[data-role="locked"]');
    button?.click();
    expect(confirm).toHaveBeenCalledOnce();
    expect(hass.callService).not.toHaveBeenCalled();
  });
});
