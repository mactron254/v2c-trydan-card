export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, unknown> & {
    friendly_name?: string;
    unit_of_measurement?: string;
    device_class?: string;
    min?: number;
    max?: number;
    step?: number;
    brightness?: number;
    options?: string[];
  };
}

export interface HassEntityRegistryEntry {
  entity_id: string;
  device_id?: string | null;
  platform?: string;
  translation_key?: string | null;
  unique_id?: string;
  original_device_class?: string | null;
  disabled_by?: string | null;
}

export interface HassDeviceRegistryEntry {
  id: string;
  name?: string;
  name_by_user?: string | null;
  manufacturer?: string;
  model?: string;
}

export interface HomeAssistant {
  states: Record<string, HassEntity>;
  entities?: Record<string, HassEntityRegistryEntry>;
  devices?: Record<string, HassDeviceRegistryEntry>;
  language?: string;
  locale?: { language?: string };
  callService(
    domain: string,
    service: string,
    serviceData?: Record<string, unknown>,
    target?: Record<string, unknown>,
  ): Promise<unknown>;
  callWS?<T>(message: Record<string, unknown>): Promise<T>;
}

export type TriState = true | false | "unknown";

export const ENTITY_ROLES = [
  "connected",
  "charging",
  "ready",
  "charge_power",
  "charge_energy",
  "charge_time",
  "house_power",
  "fv_power",
  "battery_power",
  "grid_power",
  "voltage",
  "intensity",
  "min_intensity",
  "max_intensity",
  "meter_error",
  "paused",
  "locked",
  "timer",
  "dynamic",
  "pause_dynamic",
  "logo_led",
  "light_led",
  "charge_mode",
] as const;

export type EntityRole = (typeof ENTITY_ROLES)[number];
export type EntityMap = Partial<Record<EntityRole, string>>;

export const VISUAL_STATE_KEYS = [
  "disconnected",
  "charging",
  "complete",
  "timer",
  "updating",
  "control_pilot",
  "load_balancing",
  "error",
  "waiting_power",
  "wifi_connected",
  "wifi_connecting",
] as const;

export type VisualStateKey = (typeof VISUAL_STATE_KEYS)[number];
export type ChargerPhase =
  | "unavailable"
  | "disconnected"
  | "connected"
  | "charging"
  | "complete";
export type ChargerInhibitor = "paused" | "locked" | "timer" | "waiting_power";
export type ConnectivityState =
  | "normal"
  | "wifi_connecting"
  | "wifi_connected"
  | "degraded";
export type FaultState = "none" | "control_pilot" | "load_balancing" | "meter" | "generic";

export interface ChargerEvidence {
  seedAvailable?: boolean;
  connected?: TriState;
  charging?: TriState;
  ready?: TriState;
  paused?: TriState;
  locked?: TriState;
  timer?: TriState;
  dynamic?: TriState;
  meterError?: string | null;
  externalStatus?: string | null;
  chargePowerW?: number | null;
}

export interface ChargerSnapshot {
  phase: ChargerPhase;
  inhibitors: ChargerInhibitor[];
  connectivity: ConnectivityState;
  fault: FaultState;
  maintenance: "normal" | "updating";
  externalStatus?: VisualStateKey;
  diagnostic?: string;
}

export interface ResolvedVisualState {
  key: VisualStateKey;
  labelKey: string;
  detailKey?: string;
  severity: "neutral" | "info" | "success" | "warning" | "error";
  badges: ChargerInhibitor[];
  diagnostic?: string;
  unavailable: boolean;
}

export interface V2cTrydanCardConfig {
  type: "custom:v2c-trydan-card";
  entity: string;
  name?: string;
  location?: string;
  language?: "es" | "en" | "it" | "de" | "fr" | "nl" | "sv" | "da" | "no" | "ro";
  theme?: "auto" | "light" | "dark";
  display_mode?: "standard" | "compact" | "ultra_compact";
  status_entity?: string;
  entities?: EntityMap;
  show_energy_flow?: boolean;
  show_controls?: boolean;
  show_advanced?: boolean;
  show_charger?: boolean;
  confirm_lock?: boolean;
  current_presets?: number[];
  flow_threshold_w?: number;
  invert_grid_power?: boolean;
  invert_battery_power?: boolean;
  invert_solar_power?: boolean;
}

export type EnergyRole = "solar" | "grid" | "home" | "battery" | "charger";
export type EnergyDirection =
  | "import"
  | "export"
  | "charge"
  | "discharge"
  | "consume"
  | "produce"
  | "idle"
  | "unknown";

export interface EnergyFlow {
  role: EnergyRole;
  watts: number | null;
  direction: EnergyDirection;
  available: boolean;
}

export interface DiscoveryResult {
  entities: EntityMap;
  ambiguities: Partial<Record<EntityRole, string[]>>;
  missing: EntityRole[];
  deviceId?: string;
}

declare global {
  interface Window {
    customCards?: Array<{
      type: string;
      name: string;
      description: string;
      preview?: boolean;
    }>;
  }
}
