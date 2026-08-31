import { beforeEach, describe, expect, it } from "vitest";
import "../src/index";
import { V2cTrydanCard } from "../src/card/v2c-trydan-card";
import { getDictionary, SUPPORTED_LANGUAGES, type Language } from "../src/localization";
import { getLcdCopy, type LcdState } from "../src/localization/lcd-copy";
import { VISUAL_STATE_KEYS, type HomeAssistant, type V2cTrydanCardConfig } from "../src/models/types";
import { resolveRegistryRoles } from "../src/services/discovery";
import { formatLcdKw, formatPower } from "../src/services/format";
import { resolveSnapshot, resolveVisualState } from "../src/services/state";
import { EXPECTED_STATUS_COPY } from "./fixtures/expected-state-copy";
import {
  ENTITY_IDS,
  EXTERNAL_OVERRIDES,
  PROVIDED_NATIVE_IDS,
  PROVIDED_V2C_ROLES,
  V2C_DEVICE_ID,
  createV2cHass,
  withStates,
} from "./fixtures/v2c-ha-2026-7";

const STATUS_ENTITY = "sensor.v2c_visual_status";
const DISPLAY_STATES: LcdState[] = [...VISUAL_STATE_KEYS, "unavailable"];

const baseConfig = (
  language: Language = "es",
  extra: Partial<V2cTrydanCardConfig> = {},
): V2cTrydanCardConfig => ({
  type: "custom:v2c-trydan-card",
  entity: ENTITY_IDS.connected,
  language,
  entities: { ...EXTERNAL_OVERRIDES },
  ...extra,
});

async function renderCard(
  hass: HomeAssistant,
  config: V2cTrydanCardConfig = baseConfig(),
): Promise<V2cTrydanCard> {
  const card = document.createElement("v2c-trydan-card") as V2cTrydanCard;
  card.setConfig(config);
  card.hass = hass;
  document.body.append(card);
  await card.updateComplete;
  await new Promise((resolve) => setTimeout(resolve, 0));
  await card.updateComplete;
  return card;
}

function withExternalStatus(hass: HomeAssistant, state: string): HomeAssistant {
  return {
    ...withStates(hass, { [STATUS_ENTITY]: state }),
    entities: {
      ...hass.entities,
      [STATUS_ENTITY]: {
        entity_id: STATUS_ENTITY,
        platform: "template",
      },
    },
  };
}

function statusText(card: V2cTrydanCard): string {
  return card.shadowRoot?.querySelector(".charger-status")?.textContent?.trim() ?? "";
}

function lcdLines(card: V2cTrydanCard): string[] {
  // The LCD renders as dot-matrix paths, so the text lives on data-lcd.
  const lcd = card.shadowRoot?.querySelector(".charger-display");
  const raw = lcd?.getAttribute("data-lcd");
  return raw === null || raw === undefined ? [] : raw.split("|")
}

describe("Home Assistant 2026.7 V2C fixture", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("models exactly the 22 supplied entity ids", () => {
    expect(Object.keys(ENTITY_IDS)).toHaveLength(22);
    const hass = createV2cHass();
    expect(Object.keys(hass.states)).toHaveLength(22);
    expect(hass.states[ENTITY_IDS.update]?.attributes.latest_version).toBe("v0.4.2");
  });

  it("resolves every native role by official translation_key and ignores global entities", () => {
    const hass = createV2cHass();
    const result = resolveRegistryRoles(
      hass.entities ?? {},
      ENTITY_IDS.connected,
      {},
      hass.states,
    );
    for (const [role, entityId] of Object.entries(PROVIDED_V2C_ROLES)) {
      expect(result.entities[role as keyof typeof PROVIDED_V2C_ROLES]).toBe(entityId);
      expect(result.statuses[role as keyof typeof PROVIDED_V2C_ROLES]).toBe("automatic");
    }
    expect(result.entities.battery_power).toBeUndefined();
    expect(result.entities.grid_power).toBeUndefined();
    expect(result.entities.voltage).toBeUndefined();
    expect(Object.values(result.entities)).not.toContain(ENTITY_IDS.update);
    expect(Object.values(result.entities)).not.toContain(ENTITY_IDS.sunPower);
  });

  it("keeps real English entity-id fallbacks when translation metadata is absent", () => {
    const hass = createV2cHass();
    const entities = Object.fromEntries(
      Object.entries(hass.entities ?? {}).map(([entityId, entry]) => [
        entityId,
        entry.device_id === V2C_DEVICE_ID ? { ...entry, translation_key: null } : entry,
      ]),
    );
    const result = resolveRegistryRoles(entities, ENTITY_IDS.connected, {}, hass.states);
    expect(result.entities.fv_power).toBe(ENTITY_IDS.photovoltaicPower);
    expect(result.entities.paused).toBe(ENTITY_IDS.paused);
    expect(result.entities.locked).toBe(ENTITY_IDS.locked);
    expect(result.entities.dynamic).toBe(ENTITY_IDS.dynamic);
    expect(result.entities.pause_dynamic).toBe(ENTITY_IDS.pauseDynamic);
    expect(result.legacyRoles).toEqual(expect.arrayContaining([
      "fv_power",
      "paused",
      "locked",
      "dynamic",
      "pause_dynamic",
    ]));
  });

  it("accepts only typed manual external measurements", () => {
    for (const voltageState of ["235.5", "unknown", "unavailable"]) {
      const hass = createV2cHass({ overrides: { [ENTITY_IDS.voltage]: voltageState } });
      const result = resolveRegistryRoles(
        hass.entities ?? {},
        ENTITY_IDS.connected,
        EXTERNAL_OVERRIDES,
        hass.states,
      );
      expect(result.entities.voltage).toBe(ENTITY_IDS.voltage);
      expect(result.entities.battery_power).toBe(ENTITY_IDS.batteryPower);
      expect(result.entities.grid_power).toBe(ENTITY_IDS.gridPower);
      expect(result.entities.fv_power).toBe(ENTITY_IDS.sunPower);
    }

    for (const mutation of [
      { state: "not-a-number", unit: "V", deviceClass: "voltage" },
      { state: "235.5", unit: "W", deviceClass: "voltage" },
      { state: "235.5", unit: "V", deviceClass: "power" },
    ]) {
      const hass = createV2cHass();
      const voltage = hass.states[ENTITY_IDS.voltage]!;
      voltage.state = mutation.state;
      voltage.attributes.unit_of_measurement = mutation.unit;
      voltage.attributes.device_class = mutation.deviceClass;
      const result = resolveRegistryRoles(
        hass.entities ?? {},
        ENTITY_IDS.connected,
        { voltage: ENTITY_IDS.voltage },
        hass.states,
      );
      expect(result.entities.voltage).toBeUndefined();
      expect(result.statuses.voltage).toBe("invalid");
    }
  });

  it("renders unavailable consistently and disables every V2C control", async () => {
    const hass = createV2cHass({ nativeState: "unavailable" });
    const card = await renderCard(hass, baseConfig("es", {
      show_controls: true,
      show_advanced: true,
      advanced_open: true,
      show_energy_flow: true,
      metrics: ["power", "energy", "time"],
      energy_sources: ["solar", "grid", "home", "battery", "charger"],
    }));
    const dictionary = getDictionary("es");
    expect(statusText(card)).toBe(dictionary.states.unavailable);
    // house_power is native, so its state goes "unavailable" along with everything else on
    // the V2C device; T: falls back to the third-party grid_power reading (0 W here), and
    // FV: is untouched since the solar sensor belongs to a separate integration.
    expect(lcdLines(card)).toEqual([
      dictionary.lcd.unavailable,
      "T:0.0 FV:2.8",
    ]);
    expect(lcdLines(card)).not.toContain(dictionary.lcd.disconnected);
    expect(Array.from(card.shadowRoot?.querySelectorAll(".metric-value") ?? [])
      .map((element) => element.textContent?.trim())).toEqual(["—", "—", "—"]);

    const controls = Array.from(
      card.shadowRoot?.querySelectorAll<HTMLButtonElement | HTMLInputElement | HTMLSelectElement>(
        "button[data-role], input[data-role], select[data-role]",
      ) ?? [],
    );
    expect(controls.length).toBeGreaterThan(0);
    expect(controls.every((control) => control.disabled)).toBe(true);
    for (const control of controls) control.click();
    expect(hass.callService).not.toHaveBeenCalled();

    expect(card.shadowRoot?.querySelector('.energy-summary[data-kind="active"]')).toBeTruthy();
    expect(card.shadowRoot?.querySelector(".energy-note")).toBeTruthy();
    expect(card.shadowRoot?.textContent).toContain("235.5 V");
    expect(card.shadowRoot?.querySelector('[data-role="min_intensity"]')).toBeNull();
    expect(card.shadowRoot?.querySelector('[data-role="max_intensity"]')).toBeNull();
  });

  it("renders all 120 language and visual-state combinations without encoding damage", async () => {
    for (const language of SUPPORTED_LANGUAGES) {
      const dictionary = getDictionary(language);
      for (const displayState of DISPLAY_STATES) {
        document.body.innerHTML = "";
        let hass = createV2cHass({
          language,
          nativeState: displayState === "unavailable" ? "unavailable" : "live",
        });
        const config = baseConfig(language, {
          show_controls: false,
          show_advanced: false,
          show_energy_flow: false,
          status_entity: displayState === "unavailable" ? undefined : STATUS_ENTITY,
        });
        if (displayState !== "unavailable") {
          hass = withExternalStatus(hass, displayState);
        }
        const card = await renderCard(hass, config);
        expect(dictionary.states[displayState]).toBe(EXPECTED_STATUS_COPY[language][displayState]);
        expect(statusText(card)).toBe(EXPECTED_STATUS_COPY[language][displayState]);

        // house_power (native) mirrors the seed's own availability; fv_power and grid_power
        // (both external, per EXTERNAL_OVERRIDES) keep reporting regardless, so T: falls
        // back to the grid reading exactly when the state under test is "unavailable".
        const values = {
          evKw: formatLcdKw(displayState === "unavailable" ? null : 4200),
          totalKw: formatLcdKw(displayState === "unavailable" ? null : 1200) ?? formatLcdKw(0),
          solarKw: formatLcdKw(2770),
        };
        const expectedLcd = getLcdCopy(language, displayState, values);
        expect(lcdLines(card)).toEqual([expectedLcd.primary, expectedLcd.secondary]);

        const text = card.shadowRoot?.textContent ?? "";
        expect(text).not.toMatch(/states\.|details\.|�|Ã|Â|â/);
      }
    }
  }, 30_000);

  it("survives 1,200 live DOM transitions across all languages", async () => {
    const cycles = [
      { states: ["unavailable", "unavailable", "unavailable"], expected: "unavailable" },
      { states: ["off", "off", "off"], expected: "disconnected" },
      { states: ["on", "off", "off"], expected: "waiting_power" },
      { states: ["on", "on", "off"], expected: "charging" },
      { states: ["on", "off", "on"], expected: "complete" },
      { states: ["off", "off", "off"], expected: "disconnected" },
    ] as const;

    for (const language of SUPPORTED_LANGUAGES) {
      document.body.innerHTML = "";
      let hass = createV2cHass({ language });
      const card = await renderCard(hass, baseConfig(language, {
        show_controls: false,
        show_advanced: false,
        show_energy_flow: false,
      }));
      for (let repetition = 0; repetition < 20; repetition += 1) {
        for (const cycle of cycles) {
          hass = withStates(hass, {
            [ENTITY_IDS.connected]: cycle.states[0],
            [ENTITY_IDS.charging]: cycle.states[1],
            [ENTITY_IDS.ready]: cycle.states[2],
          });
          card.hass = hass;
          await card.updateComplete;
          expect(statusText(card)).toBe(EXPECTED_STATUS_COPY[language][cycle.expected]);
        }
      }
    }
  }, 30_000);

  it("localizes badges, controls and active external flows in every language", async () => {
    for (const language of SUPPORTED_LANGUAGES) {
      document.body.innerHTML = "";
      const hass = createV2cHass({
        language,
        overrides: {
          [ENTITY_IDS.ready]: "on",
          [ENTITY_IDS.paused]: "on",
          [ENTITY_IDS.locked]: "on",
          [ENTITY_IDS.timer]: "on",
        },
      });
      const card = await renderCard(hass, baseConfig(language, {
        show_controls: true,
        show_advanced: true,
        advanced_open: true,
        show_energy_flow: true,
        energy_sources: ["solar", "grid", "home", "battery", "charger"],
      }));
      const dictionary = getDictionary(language);
      const text = card.shadowRoot?.textContent ?? "";
      expect(statusText(card)).toBe(EXPECTED_STATUS_COPY[language].complete);
      expect(text).toContain(dictionary.badges.paused);
      expect(text).toContain(dictionary.badges.locked);
      expect(text).toContain(dictionary.badges.timer);
      expect(text).toContain(dictionary.labels.chargingControls);
      expect(card.shadowRoot?.querySelector(".energy-section")?.getAttribute("aria-label")).toBe(dictionary.labels.energyFlow);
      expect(text).toContain(dictionary.flows.solar);
      expect(text).toContain(dictionary.flows.battery);
      expect(text).toContain(dictionary.flows.produce);
      expect(text).toContain(dictionary.flows.charge);
      expect(text).toContain(formatPower(2770, language));
      expect(text).toContain(formatPower(-219, language));
      expect(card.shadowRoot?.querySelector('.energy-summary[data-kind="active"]')).toBeTruthy();
      expect(Array.from(card.shadowRoot?.querySelectorAll(".flow-node") ?? [])
        .some((node) => node.textContent?.includes(dictionary.flows.grid))).toBe(false);
      expect(text).not.toMatch(/�|Ã|Â|â/);
    }
  }, 30_000);

  it("calls exact services for supplied writable entities and blocks duplicate work", async () => {
    let hass = createV2cHass();
    const card = await renderCard(hass, baseConfig("es", {
      show_controls: true,
      show_advanced: true,
      advanced_open: true,
      confirm_lock: false,
      intensity_control: "both",
    }));

    const slider = card.shadowRoot?.querySelector<HTMLInputElement>('input[data-role="intensity"]')!;
    slider.value = "18";
    slider.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
    const pause = card.shadowRoot?.querySelector<HTMLButtonElement>('button[data-role="paused"]')!;
    pause.click();
    pause.click();
    card.shadowRoot?.querySelector<HTMLButtonElement>('button[data-role="locked"]')?.click();
    card.shadowRoot?.querySelector<HTMLButtonElement>('button[data-role="timer"]')?.click();
    card.shadowRoot?.querySelector<HTMLButtonElement>('button[data-role="dynamic"]')?.click();
    card.shadowRoot?.querySelector<HTMLButtonElement>('button[data-role="pause_dynamic"]')?.click();
    card.shadowRoot?.querySelector<HTMLButtonElement>('button[data-role="logo_led"]')?.click();
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(hass.callService).toHaveBeenCalledWith("number", "set_value", {
      entity_id: ENTITY_IDS.intensity,
      value: 18,
    });
    for (const entityId of [
      ENTITY_IDS.paused,
      ENTITY_IDS.locked,
      ENTITY_IDS.timer,
      ENTITY_IDS.dynamic,
      ENTITY_IDS.pauseDynamic,
    ]) {
      expect(hass.callService).toHaveBeenCalledWith("switch", "turn_on", { entity_id: entityId });
    }
    expect(hass.callService).toHaveBeenCalledWith("light", "turn_on", {
      entity_id: ENTITY_IDS.logoLed,
    });
    const pauseCalls = (hass.callService as ReturnType<typeof import("vitest").vi.fn>).mock.calls
      .filter((call) => call[2]?.entity_id === ENTITY_IDS.paused);
    expect(pauseCalls).toHaveLength(1);

    hass = withStates(hass, { [ENTITY_IDS.logoLed]: "on" });
    card.hass = hass;
    await card.updateComplete;
    await card.updateComplete;
    const brightness = card.shadowRoot?.querySelector<HTMLInputElement>("#v2c-logo-brightness")!;
    brightness.value = "200";
    brightness.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(hass.callService).toHaveBeenCalledWith("light", "turn_on", {
      entity_id: ENTITY_IDS.logoLed,
      brightness: 200,
    });
  });

  it("ignores unrelated state updates and recovers every supplied native entity", async () => {
    let hass = createV2cHass();
    const card = await renderCard(hass, baseConfig("es"));
    const originalStatus = card.shadowRoot?.querySelector(".charger-status");
    hass = withStates(hass, { [ENTITY_IDS.update]: "on" });
    card.hass = hass;
    await card.updateComplete;
    expect(card.shadowRoot?.querySelector(".charger-status")).toBe(originalStatus);

    for (const entityId of PROVIDED_NATIVE_IDS) {
      hass = withStates(hass, { [entityId]: undefined });
      card.hass = hass;
      await card.updateComplete;
      expect(card.shadowRoot?.querySelector(".charger-status")).toBeTruthy();
      hass = withStates(hass, { [entityId]: entityId === ENTITY_IDS.intensity ? "16" : "off" });
      card.hass = hass;
      await card.updateComplete;
      expect(card.shadowRoot?.querySelector(".charger-status")).toBeTruthy();
    }
    expect(hass.callService).not.toHaveBeenCalled();
  });

  it("keeps deterministic state priority through repeated contradictory evidence", () => {
    for (let repetition = 0; repetition < 100; repetition += 1) {
      expect(resolveVisualState(resolveSnapshot({
        connected: true,
        charging: true,
        ready: true,
        timer: true,
      })).key).toBe("charging");
      expect(resolveVisualState(resolveSnapshot({
        connected: true,
        charging: false,
        ready: true,
        paused: true,
        locked: true,
      })).key).toBe("complete");
      expect(resolveVisualState(resolveSnapshot({
        connected: true,
        dynamic: true,
        meterError: "crc_error",
      })).key).toBe("error");
      expect(resolveVisualState(resolveSnapshot({
        connected: true,
        dynamic: true,
        meterError: "waiting_wifi",
      })).key).toBe("wifi_connecting");
      expect(resolveVisualState(resolveSnapshot({
        externalStatus: "updating",
        charging: true,
      })).key).toBe("updating");
    }
  });
});
