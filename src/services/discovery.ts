import {
  ENTITY_ROLES,
  type DiscoveryResult,
  type EntityMap,
  type EntityRole,
  type HassEntityRegistryEntry,
  type HomeAssistant,
  type ResolutionStatus,
} from "../models/types";

const KEY_TO_ROLE: Record<string, EntityRole> = {
  connected: "connected",
  charging: "charging",
  ready: "ready",
  charge_power: "charge_power",
  charge_energy: "charge_energy",
  charge_time: "charge_time",
  house_power: "house_power",
  fv_power: "fv_power",
  battery_power: "battery_power",
  voltage_installation: "voltage",
  intensity: "intensity",
  min_intensity: "min_intensity",
  max_intensity: "max_intensity",
  meter_error: "meter_error",
  ssid: "ssid",
  ip_address: "ip_address",
  signal_status: "signal_status",
  paused: "paused",
  locked: "locked",
  timer: "timer",
  dynamic: "dynamic",
  pause_dynamic: "pause_dynamic",
  logo_led: "logo_led",
  light_led: "light_led",
  charge_mode: "charge_mode",
};

const SUFFIXES: Partial<Record<EntityRole, string[]>> = {
  connected: ["_connected", "_conectado"],
  charging: ["_charging", "_cargando"],
  ready: ["_ready", "_listo"],
  charge_power: ["_charge_power", "_potencia_de_carga"],
  charge_energy: ["_charge_energy", "_energia_de_carga"],
  charge_time: ["_charge_time", "_tiempo_de_carga"],
  house_power: ["_house_power", "_energia_de_la_casa"],
  fv_power: ["_fv_power", "_energia_fotovoltaica", "_sun_power"],
  battery_power: ["_battery_power", "_energia_de_la_bateria"],
  grid_power: ["_grid_power", "_potencia_de_red"],
  voltage: ["_voltage", "_tension_de_instalacion"],
  intensity: ["_intensity", "_intensidad"],
  min_intensity: ["_min_intensity", "_intensidad_minima"],
  max_intensity: ["_max_intensity", "_intensidad_maxima"],
  meter_error: ["_meter_error", "_error_del_medidor"],
  ssid: ["_ssid"],
  ip_address: ["_ip_address", "_ip"],
  signal_status: ["_signal_status", "_signal"],
  paused: ["_paused", "_pausar_sesion"],
  locked: ["_locked", "_bloquear_evse"],
  timer: ["_timer", "_temporizador_de_punto_de_recarga"],
  dynamic: ["_dynamic", "_modulacion_de_intensidad_dinamica"],
  pause_dynamic: ["_pause_dynamic", "_pausar_la_modulacion_de_control_dinamico"],
  logo_led: ["_logo_led"],
  light_led: ["_light_led", "_luz_led"],
  charge_mode: ["_charge_mode", "_modo_de_carga"],
};

const ROLE_DOMAINS: Partial<Record<EntityRole, string[]>> = {
  connected: ["binary_sensor"], charging: ["binary_sensor"], ready: ["binary_sensor"],
  charge_power: ["sensor"], charge_energy: ["sensor"], charge_time: ["sensor"], house_power: ["sensor"], fv_power: ["sensor"], battery_power: ["sensor"], grid_power: ["sensor"], voltage: ["sensor"],
  intensity: ["number"], min_intensity: ["number"], max_intensity: ["number"], meter_error: ["sensor", "binary_sensor"], ssid: ["sensor"], ip_address: ["sensor"], signal_status: ["sensor"],
  paused: ["switch"], locked: ["switch"], timer: ["switch"], dynamic: ["switch"], pause_dynamic: ["switch"], logo_led: ["light"], light_led: ["light"], charge_mode: ["select"],
};
function domainMatches(role: EntityRole, entityId: string): boolean { const domain = entityId.split(".", 1)[0] ?? ""; return ROLE_DOMAINS[role]?.includes(domain) ?? true; }

function matchingSuffix(entityId: string, role: EntityRole): boolean {
  return SUFFIXES[role]?.some((suffix) => entityId.endsWith(suffix)) ?? false;
}

function preferCandidate(role: EntityRole, candidates: string[]): string | undefined {
  if (candidates.length === 1) return candidates[0];
  if (role === "voltage") {
    const sensor = candidates.filter((id) => id.startsWith("sensor."));
    if (sensor.length === 1) return sensor[0];
  }
  return undefined;
}

export function resolveRegistryRoles(
  entries: HassEntityRegistryEntry[],
  seedEntityId: string,
  overrides: EntityMap = {},
): DiscoveryResult {
  const entities: EntityMap = {};
  const statuses: Partial<Record<EntityRole, ResolutionStatus>> = {};
  const ambiguities: DiscoveryResult["ambiguities"] = {};
  const seedEntry = entries.find((entry) => entry.entity_id === seedEntityId);
  const deviceId = seedEntry?.device_id ?? undefined;
  const scoped = deviceId
    ? entries.filter((entry) => entry.device_id === deviceId && entry.disabled_by == null)
    : entries.filter((entry) => entry.disabled_by == null);

  for (const role of ENTITY_ROLES) {
    const override = overrides[role];
    if (!override) continue;
    if (domainMatches(role, override) && (!deviceId || scoped.some((entry) => entry.entity_id === override) || !entries.some((entry) => entry.entity_id === override))) {
      entities[role] = override; statuses[role] = "manual";
    } else statuses[role] = "invalid";
  }

  for (const role of ENTITY_ROLES) {
    if (entities[role]) continue;
    const translated = scoped
      .filter((entry) => KEY_TO_ROLE[entry.translation_key ?? ""] === role)
      .map((entry) => entry.entity_id);
    const translationPick = preferCandidate(role, translated);
    if (translationPick) {
      entities[role] = translationPick;
      statuses[role] = "automatic";
      continue;
    }
    if (translated.length > 1) {
      ambiguities[role] = translated;
      statuses[role] = "ambiguous";
      continue;
    }

    const suffixed = scoped.filter((entry) => matchingSuffix(entry.entity_id, role)).map((entry) => entry.entity_id);
    const suffixPick = preferCandidate(role, suffixed);
    if (suffixPick) { entities[role] = suffixPick; statuses[role] = "automatic"; }
    else if (suffixed.length > 1) { ambiguities[role] = suffixed; statuses[role] = "ambiguous"; }
  }

  if (seedEntry?.translation_key) {
    const seedRole = KEY_TO_ROLE[seedEntry.translation_key];
    if (seedRole && !entities[seedRole]) { entities[seedRole] = seedEntityId; statuses[seedRole] = "automatic"; }
  }

  return {
    entities,
    ambiguities,
    missing: ENTITY_ROLES.filter((role) => !entities[role]),
    deviceId,
    statuses: Object.fromEntries(ENTITY_ROLES.map((role) => [role, statuses[role] ?? "missing"])) as Partial<Record<EntityRole, ResolutionStatus>>,
  };
}

export class EntityDiscovery {
  #revision = 0;
  readonly #cache = new Map<string, HassEntityRegistryEntry[]>();

  invalidate(): void {
    this.#revision += 1;
    this.#cache.clear();
  }

  async discover(
    hass: HomeAssistant,
    seedEntityId: string,
    overrides: EntityMap = {},
  ): Promise<DiscoveryResult | null> {
    const revision = ++this.#revision;
    let entries = this.#cache.get(seedEntityId);
    if (!entries) {
      entries = Object.values(hass.entities ?? {});
      if (entries.length === 0 && hass.callWS) {
        entries = await hass.callWS<HassEntityRegistryEntry[]>({
          type: "config/entity_registry/list",
        });
      }
      this.#cache.set(seedEntityId, entries);
    }
    if (revision !== this.#revision) return null;
    return resolveRegistryRoles(entries, seedEntityId, overrides);
  }
}
