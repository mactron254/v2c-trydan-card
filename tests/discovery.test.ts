import { describe, expect, it, vi } from "vitest";
import type { HassEntityRegistryEntry, HomeAssistant } from "../src/models/types";
import { isActionTargetValid, matchesWritableRole, resolveRegistryRoles } from "../src/services/discovery";

const entries: HassEntityRegistryEntry[] = [
  { entity_id: "binary_sensor.trydan_connected", device_id: "dev1", platform: "v2c", translation_key: "connected" },
  { entity_id: "binary_sensor.renamed_charge", device_id: "dev1", platform: "v2c", translation_key: "charging" },
  { entity_id: "sensor.trydan_power", device_id: "dev1", platform: "v2c", translation_key: "charge_power" },
  { entity_id: "number.trydan_voltage", device_id: "dev1", platform: "v2c", translation_key: "voltage_installation" },
  { entity_id: "sensor.trydan_voltage_legacy", device_id: "dev1", platform: "v2c", translation_key: "voltage_installation" },
  { entity_id: "number.trydan_intensity", device_id: "dev1", platform: "v2c", translation_key: "intensity" },
  { entity_id: "switch.trydan_paused", device_id: "dev1", platform: "v2c", translation_key: "paused" },
  { entity_id: "switch.trydan_locked", device_id: "dev1", platform: "v2c", translation_key: "locked" },
  { entity_id: "sensor.other_power", device_id: "dev2", platform: "v2c", translation_key: "charge_power" },
  { entity_id: "sensor.grid_import", device_id: "meter", platform: "template" },
];

const states = Object.fromEntries(entries.map((entry) => [
  entry.entity_id,
  { entity_id: entry.entity_id, state: entry.entity_id.startsWith("number.") ? "230" : "1200", attributes: { unit_of_measurement: entry.entity_id.includes("power") || entry.entity_id.includes("grid") ? "W" : "V" } },
]));

describe("entity discovery", () => {
  it("uses translation keys only inside seed V2C device", () => {
    const result = resolveRegistryRoles(entries, "binary_sensor.trydan_connected", {}, states);
    expect(result.entities.charging).toBe("binary_sensor.renamed_charge");
    expect(result.entities.charge_power).toBe("sensor.trydan_power");
    expect(result.entities.voltage).toBe("number.trydan_voltage");
  });

  it("never scans globally when seed is absent or not V2C", () => {
    const result = resolveRegistryRoles(entries, "sensor.unknown", {}, states);
    expect(result.entities.charge_power).toBeUndefined();
    expect(result.statuses.charge_power).toBe("missing");
  });

  it("accepts explicit external power overrides but rejects external action targets", () => {
    const external = resolveRegistryRoles(entries, "binary_sensor.trydan_connected", { grid_power: "sensor.grid_import" }, states);
    expect(external.entities.grid_power).toBe("sensor.grid_import");
    expect(external.statuses.grid_power).toBe("manual");

    const invalid = resolveRegistryRoles(entries, "binary_sensor.trydan_connected", { intensity: "sensor.grid_import" }, states);
    expect(invalid.entities.intensity).toBe("number.trydan_intensity");
    expect(invalid.statuses.intensity).toBe("automatic");
  });

  it("reports ambiguity instead of silently choosing a legacy suffix", () => {
    const result = resolveRegistryRoles([
      { entity_id: "binary_sensor.seed", device_id: "dev1", platform: "v2c", translation_key: "connected" },
      { entity_id: "sensor.a_charge_power", device_id: "dev1", platform: "v2c" },
      { entity_id: "sensor.b_charge_power", device_id: "dev1", platform: "v2c" },
    ], "binary_sensor.seed");
    expect(result.entities.charge_power).toBeUndefined();
    expect(result.ambiguities.charge_power).toHaveLength(2);
  });

  it("validates writable targets at click time", () => {
    const hass = { states, entities: Object.fromEntries(entries.map((entry) => [entry.entity_id, { ...entry }])), callService: vi.fn() } as unknown as HomeAssistant;
    expect(isActionTargetValid(hass, "intensity", "number.trydan_intensity", "dev1")).toBe(true);
    expect(isActionTargetValid(hass, "intensity", "sensor.grid_import", "dev1")).toBe(false);
    expect(isActionTargetValid(hass, "paused", "switch.trydan_locked", "dev1")).toBe(false);

    hass.entities!["switch.trydan_paused"]!.translation_key = "locked";
    expect(isActionTargetValid(hass, "paused", "switch.trydan_paused", "dev1")).toBe(false);
  });

  it("binds manual controls to their exact role and rejects duplicate overrides", () => {
    const crossed = resolveRegistryRoles(entries, "binary_sensor.trydan_connected", {
      paused: "switch.trydan_locked",
      locked: "switch.trydan_locked",
    }, states);
    expect(crossed.statuses.paused).not.toBe("manual");
    expect(crossed.statuses.locked).not.toBe("manual");
    expect(crossed.entities.paused).toBe("switch.trydan_paused");
    expect(crossed.entities.locked).toBe("switch.trydan_locked");

    const noRegistry = resolveRegistryRoles([], "binary_sensor.trydan_connected", {
      paused: "switch.trydan_paused",
    }, states);
    expect(noRegistry.entities.paused).toBeUndefined();
    expect(noRegistry.statuses.paused).toBe("invalid");
  });

  it("accepts exact translation and legacy roles but never trusts a deceptive suffix", () => {
    expect(matchesWritableRole("paused", {
      entity_id: "switch.renamed_control",
      device_id: "dev1",
      platform: "v2c",
      translation_key: "paused",
    })).toBe(true);
    expect(matchesWritableRole("pause_dynamic", {
      entity_id: "switch.trydan_pause_dynamic",
      device_id: "dev1",
      platform: "v2c",
    })).toBe(true);
    expect(matchesWritableRole("dynamic", {
      entity_id: "switch.trydan_pause_dynamic",
      device_id: "dev1",
      platform: "v2c",
    })).toBe(false);
    expect(matchesWritableRole("paused", {
      entity_id: "switch.trydan_paused",
      device_id: "dev1",
      platform: "v2c",
      translation_key: "locked",
    })).toBe(false);
  });

  it("rejects missing external entities and reports registry diagnostics", () => {
    const missing = resolveRegistryRoles(entries, "binary_sensor.trydan_connected", { grid_power: "sensor.missing" }, states);
    expect(missing.statuses.grid_power).toBe("invalid");
    expect(resolveRegistryRoles([], "binary_sensor.trydan_connected", {}, states).diagnostic).toBe("loading");
    expect(resolveRegistryRoles(entries, "sensor.grid_import", {}, states).diagnostic).toBe("seed_not_v2c");
  });

  it("marks legacy resolution and excludes entities absent from live states", () => {
    const legacyEntries = [{ entity_id: "binary_sensor.seed", device_id: "dev1", platform: "v2c", translation_key: "connected" }, { entity_id: "sensor.legacy_charge_power", device_id: "dev1", platform: "v2c" }];
    const legacy = resolveRegistryRoles(legacyEntries, "binary_sensor.seed", {}, { "binary_sensor.seed": { entity_id: "binary_sensor.seed", state: "on", attributes: {} }, "sensor.legacy_charge_power": { entity_id: "sensor.legacy_charge_power", state: "1200", attributes: {} } });
    expect(legacy.legacyRoles).toContain("charge_power");
    const absent = resolveRegistryRoles(legacyEntries, "binary_sensor.seed", {}, { "binary_sensor.seed": { entity_id: "binary_sensor.seed", state: "on", attributes: {} } });
    expect(absent.entities.charge_power).toBeUndefined();
  });});
