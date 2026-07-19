import { describe, expect, it } from "vitest";
import "../src/index";
import { V2cTrydanCard } from "../src/card/v2c-trydan-card";
import type { HomeAssistant } from "../src/models/types";

describe("Home Assistant platform contract", () => {
  it("declares full-width grid placement", () => {
    expect(new V2cTrydanCard().getGridOptions()).toEqual({ columns: "full", min_columns: 6 });
  });

  it("suggests only V2C entities with a device", () => {
    const suggest = window.customCards?.find((entry) => entry.type === "v2c-trydan-card")?.getEntitySuggestion;
    const hass = { states: {}, callService: async () => undefined, entities: { "binary_sensor.v2c": { entity_id: "binary_sensor.v2c", device_id: "dev1", platform: "v2c" }, "sensor.other": { entity_id: "sensor.other", device_id: "dev2", platform: "template" } } } as HomeAssistant;
    expect(suggest?.(hass, "binary_sensor.v2c")).toEqual({ config: { type: "custom:v2c-trydan-card", entity: "binary_sensor.v2c" } });
    expect(suggest?.(hass, "sensor.other")).toBeNull();
  });
});