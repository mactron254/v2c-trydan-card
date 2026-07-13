export function formatPower(watts: number | null, language = "es"): string {
  if (watts === null || !Number.isFinite(watts)) return "—";
  const locale = language === "en" ? "en-GB" : "es-ES";
  const absolute = Math.abs(watts);
  if (absolute >= 1000) {
    return `${new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(absolute / 1000)} kW`;
  }
  return `${new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(absolute)} W`;
}

export function formatEnergy(value: string | number | null, language = "es"): string {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return "—";
  return `${new Intl.NumberFormat(language === "en" ? "en-GB" : "es-ES", {
    maximumFractionDigits: 2,
  }).format(numeric)} kWh`;
}

export function formatDuration(value: string | number | null): string {
  const seconds = Number(value);
  if (!Number.isFinite(seconds) || seconds < 0) return "—";
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}
