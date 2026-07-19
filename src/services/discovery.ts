import type {
  EntityMap,
  EntityRole,
  HassEntityRegistryEntry,
  HomeAssistant,
  DiscoveryResult,
  DiscoveryDiagnostic,
  ResolutionStatus,
} from "../models/types";

export interface RoleSpec {
  translationKeys: string[];
  domains: string[];
  preferredDomains?: string[];
  legacySuffixes?: string[];
  writable?: boolean;
  allowExternal?: boolean;
  platform?: "v2c";
}

export const ROLE_SPECS: Record<EntityRole, RoleSpec> = {
  connected: { translationKeys: ["connected"], domains: ["binary_sensor"], legacySuffixes: ["_connected", "_conectado"] },
  charging: { translationKeys: ["charging"], domains: ["binary_sensor"], legacySuffixes: ["_charging", "_cargando"] },
  ready: { translationKeys: ["ready"], domains: ["binary_sensor"], legacySuffixes: ["_ready", "_listo"] },
  charge_power: { translationKeys: ["charge_power"], domains: ["sensor"], legacySuffixes: ["_charge_power", "_potencia_de_carga"] },
  charge_energy: { translationKeys: ["charge_energy"], domains: ["sensor"], legacySuffixes: ["_charge_energy", "_energia_de_carga"] },
  charge_time: { translationKeys: ["charge_time"], domains: ["sensor"], legacySuffixes: ["_charge_time", "_tiempo_de_carga"] },
  house_power: { translationKeys: ["house_power"], domains: ["sensor"], legacySuffixes: ["_house_power", "_energia_de_la_casa"], allowExternal: true },
  fv_power: { translationKeys: ["fv_power"], domains: ["sensor"], legacySuffixes: ["_fv_power", "_energia_fotovoltaica", "_sun_power"], allowExternal: true },
  battery_power: { translationKeys: ["battery_power"], domains: ["sensor"], legacySuffixes: ["_battery_power", "_energia_de_la_bateria"], allowExternal: true },
  grid_power: { translationKeys: [], domains: ["sensor"], legacySuffixes: ["_grid_power", "_potencia_de_red"], allowExternal: true },
  voltage: { translationKeys: ["voltage_installation"], domains: ["number", "sensor"], preferredDomains: ["number", "sensor"], legacySuffixes: ["_voltage", "_tension_de_instalacion"] },
  intensity: { translationKeys: ["intensity"], domains: ["number"], legacySuffixes: ["_intensity", "_intensidad"], writable: true },
  min_intensity: { translationKeys: ["min_intensity"], domains: ["number"], legacySuffixes: ["_min_intensity", "_intensidad_minima"] },
  max_intensity: { translationKeys: ["max_intensity"], domains: ["number"], legacySuffixes: ["_max_intensity", "_intensidad_maxima"] },
  meter_error: { translationKeys: ["meter_error"], domains: ["sensor", "binary_sensor"], legacySuffixes: ["_meter_error", "_error_del_medidor"] },
  ssid: { translationKeys: ["ssid"], domains: ["sensor"], legacySuffixes: ["_ssid"] },
  ip_address: { translationKeys: ["ip_address"], domains: ["sensor"], legacySuffixes: ["_ip_address", "_ip"] },
  signal_status: { translationKeys: ["signal_status"], domains: ["sensor"], legacySuffixes: ["_signal_status", "_signal"] },
  paused: { translationKeys: ["paused"], domains: ["switch"], legacySuffixes: ["_paused", "_pausar_sesion"], writable: true },
  locked: { translationKeys: ["locked"], domains: ["switch"], legacySuffixes: ["_locked", "_bloquear_evse"], writable: true },
  timer: { translationKeys: ["timer"], domains: ["switch"], legacySuffixes: ["_timer", "_temporizador_de_punto_de_recarga"], writable: true },
  dynamic: { translationKeys: ["dynamic"], domains: ["switch"], legacySuffixes: ["_dynamic", "_modulacion_de_intensidad_dinamica"], writable: true },
  pause_dynamic: { translationKeys: ["pause_dynamic"], domains: ["switch"], legacySuffixes: ["_pause_dynamic", "_pausar_la_modulacion_de_control_dinamico"], writable: true },
  logo_led: { translationKeys: ["logo_led"], domains: ["light"], legacySuffixes: ["_logo_led"], writable: true },
  light_led: { translationKeys: ["light_led"], domains: ["light"], legacySuffixes: ["_light_led", "_luz_led"], writable: true },
  charge_mode: { translationKeys: ["charge_mode"], domains: ["select"], legacySuffixes: ["_charge_mode", "_modo_de_carga"], writable: true },
};

export const isWritableRole = (role: EntityRole): boolean => ROLE_SPECS[role].writable === true;

function domain(entityId: string): string {
  return entityId.split(".", 1)[0] ?? "";
}

function entriesFrom(source: HassEntityRegistryEntry[] | Record<string, HassEntityRegistryEntry>): HassEntityRegistryEntry[] {
  return Array.isArray(source) ? source : Object.values(source);
}

function hasState(states: HomeAssistant["states"] | undefined, entityId: string): boolean {
  return !states || states[entityId] !== undefined;
}

function isCompatibleDomain(role: EntityRole, entityId: string): boolean {
  return ROLE_SPECS[role].domains.includes(domain(entityId));
}

function isUsableExternalPower(entityId: string, states: HomeAssistant["states"] | undefined): boolean {
  if (domain(entityId) !== "sensor") return false;
  const state = states?.[entityId];
  if (!state) return false;
  if (state.state === "unknown" || state.state === "unavailable") return true;
  if (!Number.isFinite(Number(state.state))) return false;
  const unit = state.attributes.unit_of_measurement?.toLowerCase();
  const deviceClass = state.attributes.device_class;
  return (!unit || ["w", "kw", "mw"].includes(unit)) && (!deviceClass || deviceClass === "power");
}

function pickCandidate(role: EntityRole, candidates: HassEntityRegistryEntry[]): string | undefined {
  if (candidates.length === 0) return undefined;
  const preferredDomains = ROLE_SPECS[role].preferredDomains ?? ROLE_SPECS[role].domains;
  for (const candidateDomain of preferredDomains) {
    const preferred = candidates.filter((entry) => domain(entry.entity_id) === candidateDomain);
    if (preferred.length === 1) return preferred[0]!.entity_id;
    if (preferred.length > 1) return undefined;
  }
  return candidates.length === 1 ? candidates[0]!.entity_id : undefined;
}

export function resolveRegistryRoles(
  source: HassEntityRegistryEntry[] | Record<string, HassEntityRegistryEntry>,
  seedEntityId: string,
  overrides: EntityMap = {},
  states?: HomeAssistant["states"],
): DiscoveryResult {
  const entries = entriesFrom(source);
  const byId = new Map(entries.map((entry) => [entry.entity_id, entry]));
  const seed = byId.get(seedEntityId);
  const diagnostic: DiscoveryDiagnostic | undefined = entries.length === 0 ? "loading" : !seed ? "seed_not_found" : seed.platform !== "v2c" ? "seed_not_v2c" : !seed.device_id ? "seed_missing_device" : undefined;
  const deviceId = diagnostic ? undefined : seed?.device_id;
  const scoped = deviceId
    ? entries.filter((entry) => entry.device_id === deviceId && entry.platform === "v2c" && hasState(states, entry.entity_id))
    : [];
  const entities: EntityMap = {};
  const statuses: Partial<Record<EntityRole, ResolutionStatus>> = {};
  const ambiguities: DiscoveryResult["ambiguities"] = {};
  const legacyRoles: EntityRole[] = [];

  for (const role of Object.keys(ROLE_SPECS) as EntityRole[]) {
    const override = overrides[role];
    if (!override) continue;
    const entry = byId.get(override);
    const spec = ROLE_SPECS[role];
    const validExternal = spec.allowExternal && isUsableExternalPower(override, states);
    const validV2c = Boolean(
      deviceId && entry && entry.device_id === deviceId && entry.platform === "v2c" && isCompatibleDomain(role, override) && hasState(states, override),
    );
    const validConfiguredFallback =
      entries.length === 0 && hasState(states, override) && isCompatibleDomain(role, override);
    if (validExternal || validV2c || validConfiguredFallback) {
      entities[role] = override;
      statuses[role] = "manual";
    } else {
      statuses[role] = "invalid";
    }
  }

  for (const role of Object.keys(ROLE_SPECS) as EntityRole[]) {
    if (entities[role] || !deviceId) continue;
    const spec = ROLE_SPECS[role];
    const translated = scoped.filter((entry) => Boolean(entry.translation_key && spec.translationKeys.includes(entry.translation_key)) && isCompatibleDomain(role, entry.entity_id));
    const translationPick = pickCandidate(role, translated);
    if (translationPick) {
      entities[role] = translationPick;
      statuses[role] = "automatic";
      continue;
    }
    if (translated.length > 1) {
      ambiguities[role] = translated.map((entry) => entry.entity_id);
      statuses[role] = "ambiguous";
      continue;
    }
    const suffixed = scoped.filter((entry) => isCompatibleDomain(role, entry.entity_id) && (spec.legacySuffixes ?? []).some((suffix) => entry.entity_id.endsWith(suffix)));
    const suffixPick = pickCandidate(role, suffixed);
    if (suffixPick) {
      entities[role] = suffixPick;
      statuses[role] = "automatic";
      legacyRoles.push(role);
    } else if (suffixed.length > 1) {
      ambiguities[role] = suffixed.map((entry) => entry.entity_id);
      statuses[role] = "ambiguous";
    }
  }

  return {
    entities,
    ambiguities,
    missing: (Object.keys(ROLE_SPECS) as EntityRole[]).filter((role) => !entities[role]),
    deviceId,
    statuses: Object.fromEntries((Object.keys(ROLE_SPECS) as EntityRole[]).map((role) => [role, statuses[role] ?? "missing"])) as DiscoveryResult["statuses"],
    diagnostic,
    legacyRoles,
  };
}

export function isActionTargetValid(hass: HomeAssistant, role: EntityRole, entityId: string, deviceId: string | undefined): boolean {
  const entry = hass.entities?.[entityId];
  const state = hass.states[entityId];
  return Boolean(
    deviceId &&
      isWritableRole(role) &&
      entry?.device_id === deviceId &&
      entry.platform === "v2c" &&
      isCompatibleDomain(role, entityId) &&
      state &&
      state.state !== "unknown" &&
      state.state !== "unavailable",
  );
}