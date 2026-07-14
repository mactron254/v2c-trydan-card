import type { HomeAssistant, V2cTrydanCardConfig } from "./models/types";

export const DEFAULT_PRESETS = [6, 10, 13, 16, 20, 25, 32];
const MODES = ["xxl", "standard", "compact", "ultra_compact"] as const;
const LAYOUTS = ["auto", "centered", "split", "inline"] as const;
const METRICS = ["power", "energy", "time"] as const;
const SOURCES = ["solar", "grid", "home", "battery", "charger"] as const;
const SECTIONS = ["hero", "metrics", "controls", "energy", "advanced"] as const;
function pick<T extends string>(value: unknown, values: readonly T[], fallback: T): T { return typeof value === "string" && values.includes(value as T) ? value as T : fallback; }
function list<T extends string>(value: unknown, values: readonly T[]): T[] { return [...new Set(Array.isArray(value) ? value.filter((v): v is T => typeof v === "string" && values.includes(v as T)) : values)]; }
function completeList<T extends string>(value: unknown, values: readonly T[]): T[] { const selected = list(value, values); return [...selected, ...values.filter((item) => !selected.includes(item))]; }

export function normalizeConfig(config: V2cTrydanCardConfig): V2cTrydanCardConfig {
  if (!config || typeof config !== "object") throw new Error("V2C Trydan Card: configuración no válida");
  if (!config.entity || typeof config.entity !== "string") {
    throw new Error("V2C Trydan Card: debes indicar una entidad V2C principal");
  }
  const presetSource = Array.isArray(config.current_presets) ? config.current_presets : DEFAULT_PRESETS;
  const presets = [...new Set(presetSource)]
    .map(Number)
    .filter((value) => Number.isFinite(value) && value > 0)
    .sort((a, b) => a - b);
  const mode = pick(config.display_mode, MODES, "standard");
  const accent = typeof config.accent_color === "string" && /^#[0-9a-fA-F]{6}$/.test(config.accent_color) ? config.accent_color.toUpperCase() : undefined;
  return {
    ...config,
    type: "custom:v2c-trydan-card",
    theme: pick(config.theme, ["auto", "light", "dark"] as const, "auto"),
    display_mode: mode,
    language: config.language ?? "auto",
    layout: pick(config.layout, LAYOUTS, "auto"),
    color_scheme: config.color_scheme === "custom" && !accent ? "monochrome" : pick(config.color_scheme, ["monochrome", "v2c_blue", "teal", "green", "violet", "custom"] as const, "monochrome"),
    accent_color: accent,
    surface_style: pick(config.surface_style, ["solid", "tinted", "transparent"] as const, "solid"),
    hero_scale: Math.min(1.25, Math.max(0.75, Number(config.hero_scale) || 1)),
    card_radius: Number.isFinite(config.card_radius) ? Math.min(40, Math.max(0, Number(config.card_radius))) : undefined,
    metrics: list(config.metrics, METRICS),
    energy_sources: list(config.energy_sources, SOURCES),
    intensity_control: pick(config.intensity_control, ["slider", "presets", "both"] as const, "both"),
    section_order: completeList(config.section_order, SECTIONS),
    show_header: config.show_header ?? true,
    show_badges: config.show_badges ?? true,
    show_presets: config.show_presets ?? mode !== "ultra_compact",
    advanced_open: config.advanced_open ?? false,
    show_energy_flow: config.show_energy_flow ?? false,
    show_controls: config.show_controls ?? true,
    show_advanced: config.show_advanced ?? true,
    show_charger: config.show_charger ?? true,
    confirm_lock: config.confirm_lock ?? true,
    flow_threshold_w: Number.isFinite(config.flow_threshold_w) ? Math.max(0, Number(config.flow_threshold_w)) : 50,
    current_presets: presets,
    entities: config.entities && typeof config.entities === "object" && !Array.isArray(config.entities) ? { ...config.entities } : {},
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
