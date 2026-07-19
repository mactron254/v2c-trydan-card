import { describe, expect, it, vi } from "vitest";
import type { HassEntityRegistryEntry, HomeAssistant } from "../src/models/types";
import { isActionTargetValid, resolveRegistryRoles } from "../src/services/discovery";

const entries: HassEntityRegistryEntry[] = [
  { entity_id: "binary_sensor.trydan_connected", device_id: "dev1", platform: "v2c", translation_key: "connected" },
  { entity_id: "binary_sensor.renamed_charge", device_id: "dev1", platform: "v2c", translation_key: "charging" },
  { entity_id: "sensor.trydan_power", device_id: "dev1", platform: "v2c", translation_key: "charge_power" },
  { entity_id: "number.trydan_voltage", device_id: "dev1", platform: "v2c", translation_key: "voltage_installation" },
  { entity_id: "sensor.trydan_voltage_legacy", device_id: "dev1", platform: "v2c", translation_key: "voltage_installation" },
  { entity_id: "number.trydan_intensity", device_id: "dev1", platform: "v2c", translation_key: "intensity" },
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
    const hass = { states, entities: Object.fromEntries(entries.map((entry) => [entry.entity_id, entry])), callService: vi.fn() } as unknown as HomeAssistant;
    expect(isActionTargetValid(hass, "intensity", "number.trydan_intensity", "dev1")).toBe(true);
    expect(isActionTargetValid(hass, "intensity", "sensor.grid_import", "dev1")).toBe(false);
  });
});