import { describe, expect, it } from "vitest";
import { normalizeConfig } from "../src/config";

describe("v0.4 configuration", () => {
  it("normalizes presentation options and preserves declared order", () => {
    const config = normalizeConfig({
      type: "custom:v2c-trydan-card",
      entity: "binary_sensor.trydan_connected",
      display_mode: "xxl",
      layout: "split",
      color_scheme: "custom",
      accent_color: "#0067d9",
      hero_scale: 4,
      card_radius: -2,
      metrics: ["time", "power", "time"],
      energy_sources: ["battery", "solar", "battery"],
      section_order: ["advanced", "hero", "advanced"],
    });
    expect(config).toMatchObject({
      display_mode: "xxl", layout: "split", accent_color: "#0067D9",
      hero_scale: 1.25, card_radius: 0,
      metrics: ["time", "power"], energy_sources: ["battery", "solar"],
      section_order: ["advanced", "hero", "metrics", "controls", "energy"],
    });
  });

  it("falls back safely for invalid custom color and ultra presets", () => {
    const config = normalizeConfig({
      type: "custom:v2c-trydan-card", entity: "binary_sensor.trydan_connected",
      display_mode: "ultra_compact", color_scheme: "custom", accent_color: "blue",
    });
    expect(config.color_scheme).toBe("monochrome");
    expect(config.show_presets).toBe(false);
  });
});
