import type { HomeAssistant, V2cTrydanCardConfig } from "./models/types";

export const DEFAULT_PRESETS = [6, 10, 13, 16, 20, 25, 32];

export function normalizeConfig(config: V2cTrydanCardConfig): V2cTrydanCardConfig {
  if (!config || typeof config !== "object") throw new Error("V2C Trydan Card: configuración no válida");
  if (!config.entity || typeof config.entity !== "string") {
    throw new Error("V2C Trydan Card: debes indicar una entidad V2C principal");
  }
  const presets = [...new Set(config.current_presets ?? DEFAULT_PRESETS)]
    .map(Number)
    .filter((value) => Number.isFinite(value) && value > 0)
    .sort((a, b) => a - b);
  return {
    ...config,
    type: "custom:v2c-trydan-card",
    theme: config.theme ?? "auto",
    display_mode: config.display_mode ?? "standard",
    show_energy_flow: config.show_energy_flow ?? true,
    show_controls: config.show_controls ?? true,
    show_advanced: config.show_advanced ?? true,
    show_charger: config.show_charger ?? true,
    confirm_lock: config.confirm_lock ?? true,
    flow_threshold_w: Math.max(0, config.flow_threshold_w ?? 50),
    current_presets: presets,
    entities: { ...(config.entities ?? {}) },
  };
}

export function stubConfig(hass?: HomeAssistant): V2cTrydanCardConfig {
  const registryMatch = Object.values(hass?.entities ?? {}).find(
    (entry) => entry.platform === "v2c" && entry.translation_key === "connected",
  );
  const stateMatch = Object.keys(hass?.states ?? {}).find(
    (entityId) => entityId.startsWith("binary_sensor.") && entityId.toLowerCase().includes("v2c"),
  );
  return {
    type: "custom:v2c-trydan-card",
    theme: "auto",
    display_mode: "standard",
    entity: registryMatch?.entity_id ?? stateMatch ?? "binary_sensor.v2c_connected",
  };
}
