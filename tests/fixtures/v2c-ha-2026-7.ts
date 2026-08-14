import { vi } from "vitest";
import type {
  EntityRole,
  HassEntity,
  HassEntityRegistryEntry,
  HomeAssistant,
} from "../../src/models/types";

export const V2C_DEVICE_ID = "v2c-garaje";

export const ENTITY_IDS = {
  charging: "binary_sensor.garaje_v2c_cargador_charging",
  connected: "binary_sensor.garaje_v2c_cargador_connected",
  ready: "binary_sensor.garaje_v2c_cargador_ready",
  logoLed: "light.garaje_v2c_cargador_logo_led",
  intensity: "number.garaje_v2c_cargador_intensity",
  maxIntensity: "number.garaje_v2c_cargador_max_intensity",
  minIntensity: "number.garaje_v2c_cargador_min_intensity",
  chargeEnergy: "sensor.garaje_v2c_cargador_charge_energy",
  chargePower: "sensor.garaje_v2c_cargador_charge_power",
  chargeTime: "sensor.garaje_v2c_cargador_charge_time",
  housePower: "sensor.garaje_v2c_cargador_house_power",
  photovoltaicPower: "sensor.garaje_v2c_cargador_photovoltaic_power",
  batteryPower: "sensor.v2c_trydan_battery_power",
  gridPower: "sensor.v2c_trydan_grid_power",
  sunPower: "sensor.v2c_trydan_sun_power",
  voltage: "sensor.v2c_trydan_voltage",
  timer: "switch.garaje_v2c_cargador_charge_point_timer",
  dynamic: "switch.garaje_v2c_cargador_dynamic_intensity_modulation",
  locked: "switch.garaje_v2c_cargador_lock_evse",
  pauseDynamic: "switch.garaje_v2c_cargador_pause_dynamic_control_modulation",
  paused: "switch.garaje_v2c_cargador_pause_session",
  update: "update.v2c_trydan_card_update",
} as const;

export const PROVIDED_V2C_ROLES = {
  connected: ENTITY_IDS.connected,
  charging: ENTITY_IDS.charging,
  ready: ENTITY_IDS.ready,
  logo_led: ENTITY_IDS.logoLed,
  intensity: ENTITY_IDS.intensity,
  max_intensity: ENTITY_IDS.maxIntensity,
  min_intensity: ENTITY_IDS.minIntensity,
  charge_energy: ENTITY_IDS.chargeEnergy,
  charge_power: ENTITY_IDS.chargePower,
  charge_time: ENTITY_IDS.chargeTime,
  house_power: ENTITY_IDS.housePower,
  fv_power: ENTITY_IDS.photovoltaicPower,
  timer: ENTITY_IDS.timer,
  dynamic: ENTITY_IDS.dynamic,
  locked: ENTITY_IDS.locked,
  pause_dynamic: ENTITY_IDS.pauseDynamic,
  paused: ENTITY_IDS.paused,
} satisfies Partial<Record<EntityRole, string>>;

export const EXTERNAL_OVERRIDES = {
  battery_power: ENTITY_IDS.batteryPower,
  grid_power: ENTITY_IDS.gridPower,
  fv_power: ENTITY_IDS.sunPower,
  voltage: ENTITY_IDS.voltage,
} satisfies Partial<Record<EntityRole, string>>;

interface Definition {
  id: string;
  state: string;
  attributes: HassEntity["attributes"];
  translationKey?: string;
  deviceId?: string;
  platform: string;
}

const currentAttributes = {
  min: 6,
  max: 32,
  step: 1,
  mode: "auto",
  device_class: "current",
  unit_of_measurement: "A",
};

const powerAttributes = {
  state_class: "measurement",
  device_class: "power",
  unit_of_measurement: "W",
};

const nativeDefinitions: Definition[] = [
  { id: ENTITY_IDS.charging, state: "off", attributes: { device_class: "battery_charging" }, translationKey: "charging", deviceId: V2C_DEVICE_ID, platform: "v2c" },
  { id: ENTITY_IDS.connected, state: "off", attributes: { device_class: "plug" }, translationKey: "connected", deviceId: V2C_DEVICE_ID, platform: "v2c" },
  { id: ENTITY_IDS.ready, state: "off", attributes: {}, translationKey: "ready", deviceId: V2C_DEVICE_ID, platform: "v2c" },
  { id: ENTITY_IDS.logoLed, state: "off", attributes: { supported_color_modes: ["brightness"], brightness: 128 }, translationKey: "logo_led", deviceId: V2C_DEVICE_ID, platform: "v2c" },
  { id: ENTITY_IDS.intensity, state: "16", attributes: { ...currentAttributes }, translationKey: "intensity", deviceId: V2C_DEVICE_ID, platform: "v2c" },
  { id: ENTITY_IDS.maxIntensity, state: "32", attributes: { ...currentAttributes }, translationKey: "max_intensity", deviceId: V2C_DEVICE_ID, platform: "v2c" },
  { id: ENTITY_IDS.minIntensity, state: "6", attributes: { ...currentAttributes }, translationKey: "min_intensity", deviceId: V2C_DEVICE_ID, platform: "v2c" },
  { id: ENTITY_IDS.chargeEnergy, state: "8.6", attributes: { state_class: "total_increasing", device_class: "energy", unit_of_measurement: "kWh" }, translationKey: "charge_energy", deviceId: V2C_DEVICE_ID, platform: "v2c" },
  { id: ENTITY_IDS.chargePower, state: "4200", attributes: { ...powerAttributes }, translationKey: "charge_power", deviceId: V2C_DEVICE_ID, platform: "v2c" },
  { id: ENTITY_IDS.chargeTime, state: "5640", attributes: { state_class: "total_increasing", device_class: "duration", unit_of_measurement: "s" }, translationKey: "charge_time", deviceId: V2C_DEVICE_ID, platform: "v2c" },
  { id: ENTITY_IDS.housePower, state: "1200", attributes: { ...powerAttributes }, translationKey: "house_power", deviceId: V2C_DEVICE_ID, platform: "v2c" },
  { id: ENTITY_IDS.photovoltaicPower, state: "2770", attributes: { ...powerAttributes }, translationKey: "fv_power", deviceId: V2C_DEVICE_ID, platform: "v2c" },
  { id: ENTITY_IDS.timer, state: "off", attributes: {}, translationKey: "timer", deviceId: V2C_DEVICE_ID, platform: "v2c" },
  { id: ENTITY_IDS.dynamic, state: "off", attributes: {}, translationKey: "dynamic", deviceId: V2C_DEVICE_ID, platform: "v2c" },
  { id: ENTITY_IDS.locked, state: "off", attributes: {}, translationKey: "locked", deviceId: V2C_DEVICE_ID, platform: "v2c" },
  { id: ENTITY_IDS.pauseDynamic, state: "off", attributes: {}, translationKey: "pause_dynamic", deviceId: V2C_DEVICE_ID, platform: "v2c" },
  { id: ENTITY_IDS.paused, state: "off", attributes: {}, translationKey: "paused", deviceId: V2C_DEVICE_ID, platform: "v2c" },
];

const externalDefinitions: Definition[] = [
  { id: ENTITY_IDS.batteryPower, state: "-219", attributes: { ...powerAttributes }, platform: "template" },
  { id: ENTITY_IDS.gridPower, state: "0", attributes: { ...powerAttributes }, platform: "template" },
  { id: ENTITY_IDS.sunPower, state: "2770", attributes: { ...powerAttributes }, platform: "template" },
  { id: ENTITY_IDS.voltage, state: "235.5", attributes: { state_class: "measurement", device_class: "voltage", unit_of_measurement: "V" }, platform: "template" },
  {
    id: ENTITY_IDS.update,
    state: "off",
    attributes: {
      installed_version: "v0.5.0-beta.4",
      latest_version: "v0.4.2",
      release_url: "https://github.com/mactron254/v2c-trydan-card/releases/v0.4.2",
      supported_features: 23,
    },
    platform: "hacs",
  },
];

export const PROVIDED_NATIVE_IDS = nativeDefinitions.map((definition) => definition.id);

export function createV2cHass(options: {
  nativeState?: "live" | "unknown" | "unavailable";
  overrides?: Record<string, string>;
  language?: string;
} = {}): HomeAssistant {
  const nativeState = options.nativeState ?? "live";
  const definitions = [...nativeDefinitions, ...externalDefinitions];
  const states = Object.fromEntries(
    definitions.map((definition) => [
      definition.id,
      {
        entity_id: definition.id,
        state: definition.deviceId && nativeState !== "live" ? nativeState : options.overrides?.[definition.id] ?? definition.state,
        attributes: { ...definition.attributes },
      },
    ]),
  ) as HomeAssistant["states"];
  const entities = Object.fromEntries(
    definitions.map((definition) => [
      definition.id,
      {
        entity_id: definition.id,
        device_id: definition.deviceId,
        platform: definition.platform,
        translation_key: definition.translationKey,
      } satisfies HassEntityRegistryEntry,
    ]),
  );
  return {
    language: options.language ?? "es",
    locale: { language: options.language ?? "es" },
    states,
    entities,
    callService: vi.fn().mockResolvedValue(undefined),
  };
}

export function withStates(
  hass: HomeAssistant,
  overrides: Record<string, string | undefined>,
): HomeAssistant {
  const states = { ...hass.states };
  for (const [entityId, state] of Object.entries(overrides)) {
    if (state === undefined) {
      delete states[entityId];
      continue;
    }
    const previous = states[entityId];
    states[entityId] = {
      entity_id: entityId,
      state,
      attributes: { ...(previous?.attributes ?? {}) },
    };
  }
  return { ...hass, states };
}
