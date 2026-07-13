import type { EnergyDirection, EnergyFlow, EnergyRole, HassEntity } from "../models/types";

export interface EnergyOptions {
  invert?: boolean;
  thresholdW?: number;
}

function parseWatts(entity?: HassEntity): number | null {
  if (!entity || entity.state === "unknown" || entity.state === "unavailable") return null;
  const value = Number(entity.state);
  if (!Number.isFinite(value)) return null;
  const unit = entity.attributes.unit_of_measurement?.toLowerCase();
  if (unit === "kw") return value * 1000;
  if (unit === "mw") return value * 1_000_000;
  return value;
}

function directionFor(role: EnergyRole, watts: number, threshold: number): EnergyDirection {
  if (Math.abs(watts) < threshold) return "idle";
  if (role === "grid") return watts > 0 ? "import" : "export";
  if (role === "battery") return watts > 0 ? "discharge" : "charge";
  if (role === "solar") return watts > 0 ? "produce" : "unknown";
  if (role === "home") return watts > 0 ? "consume" : "export";
  return watts > 0 ? "consume" : "export";
}

export function normalizeEnergyFlow(
  role: EnergyRole,
  entity?: HassEntity,
  options: EnergyOptions = {},
): EnergyFlow {
  const parsed = parseWatts(entity);
  if (parsed === null) return { role, watts: null, direction: "unknown", available: false };
  const watts = options.invert ? -parsed : parsed;
  return {
    role,
    watts,
    direction: directionFor(role, watts, options.thresholdW ?? 50),
    available: true,
  };
}
