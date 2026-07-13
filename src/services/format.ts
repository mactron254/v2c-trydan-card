const LOCALES: Record<string, string> = {
  en: "en-US", it: "it-IT", de: "de-DE", fr: "fr-FR", nl: "nl-NL",
  sv: "sv-SE", da: "da-DK", no: "no-NO", ro: "ro-RO", es: "es-ES",
};

function localeFor(language?: string): string { return LOCALES[language ?? "es"] ?? "en-US"; }

export function formatPower(watts: number | null, language = "es"): string {
  if (watts === null || !Number.isFinite(watts)) return "—";
  const absolute = Math.abs(watts);
  if (absolute >= 1000) return `${new Intl.NumberFormat(localeFor(language), { maximumFractionDigits: 1 }).format(absolute / 1000)} kW`;
  return `${new Intl.NumberFormat(localeFor(language), { maximumFractionDigits: 0 }).format(absolute)} W`;
}

export function formatEnergy(value: string | number | null, language = "es"): string {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return "—";
  return `${new Intl.NumberFormat(localeFor(language), { maximumFractionDigits: 2 }).format(numeric)} kWh`;
}

export function formatDuration(value: string | number | null): string {
  const seconds = Number(value);
  if (!Number.isFinite(seconds) || seconds < 0) return "—";
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}
