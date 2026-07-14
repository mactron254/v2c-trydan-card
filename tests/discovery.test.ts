import { describe, expect, it, vi } from "vitest";
import type { HassEntityRegistryEntry, HomeAssistant } from "../src/models/types";
import { EntityDiscovery, resolveRegistryRoles } from "../src/services/discovery";

const entries: HassEntityRegistryEntry[] = [
  { entity_id: "binary_sensor.trydan_connected", device_id: "dev1", platform: "v2c", translation_key: "connected" },
  { entity_id: "binary_sensor.renamed_charge", device_id: "dev1", platform: "v2c", translation_key: "charging" },
  { entity_id: "sensor.trydan_power", device_id: "dev1", platform: "v2c", translation_key: "charge_power" },
  { entity_id: "sensor.other_power", device_id: "dev2", platform: "v2c", translation_key: "charge_power" },
];

describe("entity discovery", () => {
  it("uses stable translation keys inside seed device", () => {
    const result = resolveRegistryRoles(entries, "binary_sensor.trydan_connected");
    expect(result.entities.charging).toBe("binary_sensor.renamed_charge");
    expect(result.entities.charge_power).toBe("sensor.trydan_power");
  });

  it("lets manual overrides win", () => {
    const result = resolveRegistryRoles(entries, "binary_sensor.trydan_connected", {
      charge_power: "sensor.manual",
    });
    expect(result.entities.charge_power).toBe("sensor.manual");
  });

  it("rejects manual overrides with an incompatible Home Assistant domain", () => {
    const result = resolveRegistryRoles(entries, "binary_sensor.trydan_connected", { charge_power: "switch.not_a_power_sensor" });
    expect(result.entities.charge_power).toBe("sensor.trydan_power");
    expect(result.statuses.charge_power).toBe("automatic");
  });

  it("rejects known manual entities from another device", () => {
    const result = resolveRegistryRoles(entries, "binary_sensor.trydan_connected", { charge_power: "sensor.other_power" });
    expect(result.entities.charge_power).toBe("sensor.trydan_power");
    expect(result.statuses.charge_power).toBe("automatic");
  });
  it("reports ambiguity instead of silently selecting a suffix", () => {
    const result = resolveRegistryRoles(
      [
        { entity_id: "sensor.a_charge_power" },
        { entity_id: "sensor.b_charge_power" },
      ],
      "binary_sensor.seed",
    );
    expect(result.entities.charge_power).toBeUndefined();
    expect(result.ambiguities.charge_power).toHaveLength(2);
  });

  it("drops stale asynchronous registry responses", async () => {
    let firstResolve: ((value: HassEntityRegistryEntry[]) => void) | undefined;
    const callWS = vi
      .fn()
      .mockImplementationOnce(() => new Promise((resolve) => (firstResolve = resolve)))
      .mockResolvedValueOnce(entries);
    const hass = { states: {}, callService: vi.fn(), callWS } as unknown as HomeAssistant;
    const discovery = new EntityDiscovery();
    const first = discovery.discover(hass, "binary_sensor.old");
    const second = discovery.discover(hass, "binary_sensor.trydan_connected");
    await expect(second).resolves.not.toBeNull();
    firstResolve?.(entries);
    await expect(first).resolves.toBeNull();
  });
});
