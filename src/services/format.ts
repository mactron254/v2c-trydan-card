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
  if (value === null || value === "") return "—";
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return "—";
  return `${new Intl.NumberFormat(localeFor(language), { maximumFractionDigits: 2 }).format(numeric)} kWh`;
}

export function formatDuration(value: string | number | null): string {
  if (value === null || value === "") return "—";
  const seconds = Number(value);
  if (!Number.isFinite(seconds) || seconds < 0) return "—";
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

export function formatMeasure(value: string | number | null, unit: string, language = "es"): string | undefined {
  if (value === null || value === "") return undefined;
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return undefined;
  return `${new Intl.NumberFormat(localeFor(language), { maximumFractionDigits:1 }).format(numeric)} ${unit}`;
}

/**
 * Power reading for the LCD replica, in kW with one decimal and no unit suffix - "3.7", not
 * "3.7 kW" or, in most of this file's other locales, "3,7 kW". The real display always uses
 * a period for the decimal separator no matter what language the unit is set to: a
 * photograph of a unit set to Catalan reads "T:3.7 FV:1.7", not "T:3,7". So this ignores
 * `language` on purpose, unlike every other formatter here. Magnitude only - the screen has
 * no room for a sign, and direction is already implied by which of EV/T/FV labels it.
 */
export function formatLcdKw(watts: number | null): string | undefined {
  if (watts === null || !Number.isFinite(watts)) return undefined;
  return (Math.abs(watts) / 1000).toFixed(1);
}
