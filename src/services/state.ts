import type {
  ChargerEvidence,
  ChargerInhibitor,
  ChargerSnapshot,
  ResolvedVisualState,
  VisualStateKey,
} from "../models/types";
import { VISUAL_STATE_KEYS } from "../models/types";

const STATUS_ALIASES: Record<string, VisualStateKey> = {
  sin_vehiculo: "disconnected",
  desconectado: "disconnected",
  cargando: "charging",
  carga_completa: "complete",
  completa: "complete",
  temporizador: "timer",
  carga_programada: "timer",
  actualizando: "updating",
  control_pilot: "control_pilot",
  error_control_pilot: "control_pilot",
  load_balancing: "load_balancing",
  error_load_balancing: "load_balancing",
  error: "error",
  esperando_potencia: "waiting_power",
  wifi_conectado: "wifi_connected",
  conectando_wifi: "wifi_connecting",
};

const SEVERITY: Record<VisualStateKey, ResolvedVisualState["severity"]> = {
  disconnected: "neutral",
  charging: "info",
  complete: "success",
  timer: "info",
  updating: "warning",
  control_pilot: "warning",
  load_balancing: "error",
  error: "error",
  waiting_power: "warning",
  wifi_connected: "success",
  wifi_connecting: "info",
};

function normalizeText(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

export function normalizeVisualState(value?: string | null): VisualStateKey | undefined {
  if (!value) return undefined;
  const normalized = normalizeText(value);
  if ((VISUAL_STATE_KEYS as readonly string[]).includes(normalized)) {
    return normalized as VisualStateKey;
  }
  return STATUS_ALIASES[normalized];
}

export function resolveSnapshot(evidence: ChargerEvidence): ChargerSnapshot {
  const externalStatus = normalizeVisualState(evidence.externalStatus);
  const coreUnknown =
    evidence.connected === undefined || evidence.connected === "unknown"
      ? evidence.charging === undefined || evidence.charging === "unknown"
        ? evidence.ready === undefined || evidence.ready === "unknown"
        : false
      : false;

  let phase: ChargerSnapshot["phase"];
  if (evidence.charging === true) phase = "charging";
  else if (evidence.ready === true) phase = "complete";
  else if (evidence.connected === true) phase = "connected";
  else if (coreUnknown || evidence.seedAvailable === false) phase = "unavailable";
  else phase = "disconnected";

  const inhibitors: ChargerInhibitor[] = [];
  if (evidence.paused === true) inhibitors.push("paused");
  if (evidence.locked === true) inhibitors.push("locked");
  if (evidence.timer === true) inhibitors.push("timer");

  let connectivity: ChargerSnapshot["connectivity"] = "normal";
  let fault: ChargerSnapshot["fault"] = "none";
  let maintenance: ChargerSnapshot["maintenance"] = "normal";

  if (externalStatus === "wifi_connecting") connectivity = "wifi_connecting";
  if (externalStatus === "wifi_connected") connectivity = "wifi_connected";
  if (externalStatus === "updating") maintenance = "updating";
  if (externalStatus === "control_pilot") fault = "control_pilot";
  if (externalStatus === "load_balancing") fault = "load_balancing";
  if (externalStatus === "error") fault = "generic";

  const meterError = evidence.meterError?.trim().toLowerCase();
  const hasMeterError = Boolean(meterError && meterError !== "no_error");
  if (evidence.dynamic === true && hasMeterError) {
    if (meterError === "waiting_wifi") connectivity = "wifi_connecting";
    else fault = "meter";
  }

  return {
    phase,
    inhibitors,
    connectivity,
    fault,
    maintenance,
    externalStatus,
    diagnostic: hasMeterError ? meterError : undefined,
  };
}

function visual(
  key: VisualStateKey,
  snapshot: ChargerSnapshot,
  unavailable = false,
): ResolvedVisualState {
  return {
    key,
    labelKey: unavailable ? "states.unavailable" : `states.${key}`,
    detailKey: unavailable ? "details.unavailable" : `details.${key}`,
    severity: SEVERITY[key],
    badges: snapshot.inhibitors,
    diagnostic: snapshot.diagnostic,
    unavailable,
  };
}

export function resolveVisualState(snapshot: ChargerSnapshot): ResolvedVisualState {
  if (snapshot.externalStatus) return visual(snapshot.externalStatus, snapshot);
  if (snapshot.fault === "control_pilot") return visual("control_pilot", snapshot);
  if (snapshot.fault === "load_balancing") return visual("load_balancing", snapshot);
  if (snapshot.fault === "meter" || snapshot.fault === "generic") {
    return visual("error", snapshot);
  }
  if (snapshot.maintenance === "updating") return visual("updating", snapshot);
  if (snapshot.phase === "charging") return visual("charging", snapshot);
  if (snapshot.phase === "complete") return visual("complete", snapshot);
  if (snapshot.inhibitors.includes("timer")) return visual("timer", snapshot);
  if (snapshot.connectivity === "wifi_connecting") return visual("wifi_connecting", snapshot);
  if (snapshot.connectivity === "wifi_connected") return visual("wifi_connected", snapshot);
  if (snapshot.phase === "connected") return visual("waiting_power", snapshot);
  if (snapshot.inhibitors.includes("paused")) return visual("waiting_power", snapshot);
  return visual("disconnected", snapshot, snapshot.phase === "unavailable");
}

export function entityBoolean(state?: string): true | false | "unknown" {
  if (state === "on" || state === "true") return true;
  if (state === "off" || state === "false") return false;
  return "unknown";
}
