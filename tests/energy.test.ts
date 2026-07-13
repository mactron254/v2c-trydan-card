import { describe, expect, it } from "vitest";
import type { HassEntity } from "../src/models/types";
import { normalizeEnergyFlow } from "../src/services/energy";

const entity = (state: string, unit = "W"): HassEntity => ({
  entity_id: "sensor.test",
  state,
  attributes: { unit_of_measurement: unit },
});

describe("energy normalization", () => {
  it("converts kW to W", () => {
    expect(normalizeEnergyFlow("solar", entity("2.5", "kW")).watts).toBe(2500);
  });

  it("never converts unknown or unavailable to zero", () => {
    expect(normalizeEnergyFlow("grid", entity("unknown")).watts).toBeNull();
    expect(normalizeEnergyFlow("grid", entity("unavailable")).direction).toBe("unknown");
  });

  it("uses explicit default direction conventions", () => {
    expect(normalizeEnergyFlow("grid", entity("500")).direction).toBe("import");
    expect(normalizeEnergyFlow("grid", entity("-500")).direction).toBe("export");
    expect(normalizeEnergyFlow("battery", entity("500")).direction).toBe("discharge");
    expect(normalizeEnergyFlow("battery", entity("-500")).direction).toBe("charge");
    expect(normalizeEnergyFlow("solar", entity("500")).direction).toBe("produce");
    expect(normalizeEnergyFlow("home", entity("500")).direction).toBe("consume");
  });

  it("inverts external conventions when configured", () => {
    expect(normalizeEnergyFlow("grid", entity("500"), { invert: true }).direction).toBe(
      "export",
    );
  });

  it("uses a threshold only for idle flow", () => {
    expect(normalizeEnergyFlow("charger", entity("30"), { thresholdW: 50 }).direction).toBe(
      "idle",
    );
  });
});
