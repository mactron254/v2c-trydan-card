import { beforeEach, describe, expect, it, vi } from "vitest";
import "../src/index";
import { V2cTrydanCard } from "../src/card/v2c-trydan-card";
import { normalizeConfig } from "../src/config";
import { formatDuration, formatEnergy, formatLcdKw, formatMeasure } from "../src/services/format";
import { SUPPORTED_LANGUAGES } from "../src/localization";
import { formatLcdErrorCode, getLcdCopy } from "../src/localization/lcd-copy";
import { VISUAL_STATE_KEYS, type HomeAssistant } from "../src/models/types";

describe("v0.4.2 localization and defaults", () => {
  beforeEach(() => { document.body.innerHTML = ""; });

  it("defaults energy flow off while preserving explicit opt-in and artwork config", () => {
    const base = { type:"custom:v2c-trydan-card" as const, entity:"binary_sensor.trydan" };
    expect(normalizeConfig(base).show_energy_flow).toBe(false);
    expect(normalizeConfig({ ...base, show_energy_flow:true }).show_energy_flow).toBe(true);
    expect(normalizeConfig({ ...base, display_mode:"ultra_compact", show_charger:true }).show_charger).toBe(true);
  });

  it("keeps missing values unknown and hardens malformed runtime config", () => {
    expect(formatEnergy(null,"en")).toBe("—");
    expect(formatDuration(null)).toBe("—");
    expect(formatMeasure(null,"A","en")).toBeUndefined();
    const normalized=normalizeConfig({ type:"custom:v2c-trydan-card", entity:"binary_sensor.trydan", current_presets:"6" as unknown as number[], flow_threshold_w:Number.NaN, theme:"pink" as "auto" });
    expect(normalized.current_presets).toEqual([6,10,13,16,20,25,32]);
    expect(normalized.flow_threshold_w).toBe(50);
    expect(normalized.theme).toBe("auto");
  });

  it("contains a non-empty localized LCD status word for every state and language", () => {
    for (const language of SUPPORTED_LANGUAGES) for (const state of VISUAL_STATE_KEYS) {
      const copy = getLcdCopy(language, state);
      expect(copy.primary.trim()).not.toBe("");
      // No power sensors were supplied: the measurement line has nothing honest to show,
      // so it stays empty rather than printing a label next to nothing.
      expect(copy.secondary).toBe("");
    }
    expect(getLcdCopy("de","complete").primary).toBe("Fertig");
    // Three states print the firmware's own words, read out of trydanpro_v2.5.0.bin,
    // so the replica says what the charger on the wall says. Slot order in that binary
    // is EN ES PT FR IT DE NL DK VAL RO.
    expect(getLcdCopy("es","charging").primary).toBe("VE CARGANDO");
    expect(getLcdCopy("en","charging").primary).toBe("CHARGING EV");
    expect(getLcdCopy("ca","disconnected").primary).toBe("ESPERANT EV");
    expect(getLcdCopy("it","disconnected").primary).toBe("IN ATTESA DI EV");
    expect(getLcdCopy("da","waiting_power").primary).toBe("EV TILSLUTTET");
    // Swedish and Norwegian have no firmware slot, so they keep our own wording.
    expect(getLcdCopy("sv","charging").primary).not.toBe("CHARGING EV");
    expect(getLcdCopy("no","charging").primary).not.toBe("CHARGING EV");
  });

  it("prefers the device's own EV/T/FV format over the translated status word once the readings exist", () => {
    expect(getLcdCopy("es","charging",{ evKw:"4.2" }).primary).toBe("EV:4.2");
    expect(getLcdCopy("es","disconnected",{ totalKw:"1.2", solarKw:"2.8" }).secondary).toBe("T:1.2 FV:2.8");
    // No solar sensor configured: FV: is omitted entirely, not printed as "FV:—".
    expect(getLcdCopy("es","disconnected",{ totalKw:"1.2" }).secondary).toBe("T:1.2");
    // No house/grid sensor either: same rule applies to T:.
    expect(getLcdCopy("es","disconnected",{ solarKw:"2.8" }).secondary).toBe("FV:2.8");
  });

  it("shows the device's XX YYY fault code when one exists, and just the fault word when it doesn't", () => {
    for (const state of ["control_pilot","load_balancing","error"] as const) {
      expect(getLcdCopy("en",state,{ errorCode:"02 015" }).secondary).toBe("02 015");
      expect(getLcdCopy("en",state).secondary).toBe("");
    }
    // The three fault states share one generic word - the real screen has no room to spell
    // out which fault this is, only the code does that.
    expect(getLcdCopy("en","control_pilot").primary).toBe(getLcdCopy("en","error").primary);
    expect(getLcdCopy("en","load_balancing").primary).toBe(getLcdCopy("en","error").primary);
  });

  it("folds a raw fault diagnostic into the device's XX YYY code shape", () => {
    expect(formatLcdErrorCode("02015")).toBe("02 015");
    // Only the digits matter: separators and a leading source letter are stripped first.
    expect(formatLcdErrorCode("E-02-015")).toBe("02 015");
    // A named Home Assistant state has no such code to show.
    expect(formatLcdErrorCode("crc_error")).toBeUndefined();
    expect(formatLcdErrorCode("waiting_wifi")).toBeUndefined();
    expect(formatLcdErrorCode(undefined)).toBeUndefined();
    expect(formatLcdErrorCode(null)).toBeUndefined();
    expect(formatLcdErrorCode("")).toBeUndefined();
  });

  it("formats LCD power as unsigned kW with a period decimal, ignoring the card's language", () => {
    expect(formatLcdKw(3700)).toBe("3.7");
    expect(formatLcdKw(1700)).toBe("1.7");
    // Direction is implied by the EV/T/FV label, not by a sign the tiny screen has no room for.
    expect(formatLcdKw(-219)).toBe("0.2");
    expect(formatLcdKw(0)).toBe("0.0");
    expect(formatLcdKw(null)).toBeUndefined();
    expect(formatLcdKw(Number.NaN)).toBeUndefined();
  });

  it("renders real LCD measurements and never renders artwork in ultra compact", async () => {
    const hass = {
      language:"en",
      states:{
        "binary_sensor.trydan":{ entity_id:"binary_sensor.trydan", state:"on", attributes:{} },
        "binary_sensor.charging":{ entity_id:"binary_sensor.charging", state:"on", attributes:{} },
        "sensor.power":{ entity_id:"sensor.power", state:"4200", attributes:{ unit_of_measurement:"W" } },
        "sensor.energy":{ entity_id:"sensor.energy", state:"8.6", attributes:{ unit_of_measurement:"kWh" } },
        "sensor.voltage":{ entity_id:"sensor.voltage", state:"236.7", attributes:{ unit_of_measurement:"V" } },
        "number.intensity":{ entity_id:"number.intensity", state:"18", attributes:{ unit_of_measurement:"A" } },
        // 3.7 kW total, 1.7 kW solar - the exact pair from V2C's own documented display.
        "sensor.house":{ entity_id:"sensor.house", state:"3700", attributes:{ unit_of_measurement:"W" } },
        "sensor.fv":{ entity_id:"sensor.fv", state:"1700", attributes:{ unit_of_measurement:"W" } },
      },
      callService:vi.fn(),
    } as unknown as HomeAssistant;
    const card=document.createElement("v2c-trydan-card") as V2cTrydanCard;
    card.setConfig({ type:"custom:v2c-trydan-card", entity:"binary_sensor.trydan", language:"en", entities:{ connected:"binary_sensor.trydan", charging:"binary_sensor.charging", charge_power:"sensor.power", charge_energy:"sensor.energy", voltage:"sensor.voltage", intensity:"number.intensity", house_power:"sensor.house", fv_power:"sensor.fv" } });
    card.hass=hass;document.body.append(card);await card.updateComplete;await new Promise((resolve)=>setTimeout(resolve,0));await card.updateComplete;
    const art=card.shadowRoot?.querySelector(".charger-art");
    // Decorative: the status text and the metric tiles carry this for a screen reader.
    expect(art?.getAttribute("aria-hidden")).toBe("true");
    // No live text in the artwork - the LCD is dot-matrix paths.
    expect(art?.querySelectorAll("text").length).toBe(0);
    const lcd=art?.querySelector(".charger-display")?.getAttribute("data-lcd") ?? "";
    expect(lcd).toContain("EV:4.2");
    expect(lcd).toContain("T:3.7 FV:1.7");
    // Amps, voltage and session energy are shown elsewhere in the card now (advanced panel,
    // metric tiles); the real display never showed them, so the replica no longer does either.
    expect(lcd).not.toMatch(/18 A|236\.7 V|8\.6 kWh/);
    // The product photo the body layer came from had its own screen lit, reading
    // "WAITING EV / INTENSITY 8 A". It must have been erased, not merely covered.
    expect(lcd).not.toMatch(/WAITING EV|INTENSITY 8/i);
    card.setConfig({ type:"custom:v2c-trydan-card", entity:"binary_sensor.trydan", display_mode:"ultra_compact", show_charger:true });
    card.hass=hass;await card.updateComplete;
    expect(card.shadowRoot?.querySelector(".charger-stage")).toBeNull();
  });

  it("degrades the LCD honestly when power sensors are absent", async () => {
    const hass = {
      language:"en",
      states:{
        "binary_sensor.trydan":{ entity_id:"binary_sensor.trydan", state:"on", attributes:{} },
        "binary_sensor.charging":{ entity_id:"binary_sensor.charging", state:"off", attributes:{} },
      },
      callService:vi.fn(),
    } as unknown as HomeAssistant;
    const card=document.createElement("v2c-trydan-card") as V2cTrydanCard;
    // Only connectivity is configured: no charge_power, house_power, fv_power or grid_power.
    card.setConfig({ type:"custom:v2c-trydan-card", entity:"binary_sensor.trydan", language:"en", entities:{ connected:"binary_sensor.trydan", charging:"binary_sensor.charging" } });
    card.hass=hass;document.body.append(card);await card.updateComplete;await new Promise((resolve)=>setTimeout(resolve,0));await card.updateComplete;
    const lcd=card.shadowRoot?.querySelector(".charger-display")?.getAttribute("data-lcd") ?? "";
    // "waiting_power": the connected-but-idle state, shown as a bare status word with no
    // measurement line to pair it with - and no stray "T:"/"FV:" printed for a reading the
    // card never received.
    expect(lcd).toBe("CONNECTED EV|");
  });

  it("falls back to the localized charging word when there is no charge_power sensor to read", async () => {
    const hass = {
      language:"en",
      states:{
        "binary_sensor.trydan":{ entity_id:"binary_sensor.trydan", state:"on", attributes:{} },
        "binary_sensor.charging":{ entity_id:"binary_sensor.charging", state:"on", attributes:{} },
      },
      callService:vi.fn(),
    } as unknown as HomeAssistant;
    const card=document.createElement("v2c-trydan-card") as V2cTrydanCard;
    card.setConfig({ type:"custom:v2c-trydan-card", entity:"binary_sensor.trydan", language:"en", entities:{ connected:"binary_sensor.trydan", charging:"binary_sensor.charging" } });
    card.hass=hass;document.body.append(card);await card.updateComplete;await new Promise((resolve)=>setTimeout(resolve,0));await card.updateComplete;
    const lcd=card.shadowRoot?.querySelector(".charger-display")?.getAttribute("data-lcd") ?? "";
    expect(lcd).toBe("CHARGING EV|");
  });

  it("shows a fault's real XX YYY code end to end once the meter reports one", async () => {
    const hass = {
      language:"en",
      states:{
        "binary_sensor.trydan":{ entity_id:"binary_sensor.trydan", state:"on", attributes:{} },
        "switch.dynamic":{ entity_id:"switch.dynamic", state:"on", attributes:{} },
        "sensor.meter_error":{ entity_id:"sensor.meter_error", state:"02015", attributes:{} },
      },
      callService:vi.fn(),
    } as unknown as HomeAssistant;
    const card=document.createElement("v2c-trydan-card") as V2cTrydanCard;
    card.setConfig({ type:"custom:v2c-trydan-card", entity:"binary_sensor.trydan", language:"en", entities:{ connected:"binary_sensor.trydan", dynamic:"switch.dynamic", meter_error:"sensor.meter_error" } });
    card.hass=hass;document.body.append(card);await card.updateComplete;await new Promise((resolve)=>setTimeout(resolve,0));await card.updateComplete;
    const art=card.shadowRoot?.querySelector(".charger-art");
    expect(art?.getAttribute("data-state")).toBe("error");
    const lcd=art?.querySelector(".charger-display")?.getAttribute("data-lcd") ?? "";
    expect(lcd).toBe("Error|02 015");
  });

  it("holsters the connector whenever the card says there is no vehicle", async () => {
    const hass = {
      language: "en",
      states: {
        "binary_sensor.trydan": { entity_id: "binary_sensor.trydan", state: "off", attributes: {} },
      },
      callService: vi.fn(),
    } as unknown as HomeAssistant;
    const card = document.createElement("v2c-trydan-card") as V2cTrydanCard;
    card.setConfig({
      type: "custom:v2c-trydan-card",
      entity: "binary_sensor.trydan",
      language: "en",
      show_connector: true,
      charger_art: "full",
      entities: { connected: "binary_sensor.trydan" },
    });
    card.hass = hass;
    document.body.append(card);
    await card.updateComplete;
    await new Promise((resolve) => setTimeout(resolve, 0));
    await card.updateComplete;
    const art = card.shadowRoot?.querySelector(".charger-art");
    expect(art?.getAttribute("data-state")).toBe("disconnected");
    // Nothing is plugged in, so the connector hangs in its holster.
    expect(art?.getAttribute("data-connector")).toBe("in");
    expect(art?.querySelectorAll("image").length).toBe(2);
  });
});
