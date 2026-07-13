import { da } from "./da";
import { de } from "./de";
import { fr } from "./fr";
import { it } from "./it";
import { nl } from "./nl";
import { no } from "./no";
import { ro } from "./ro";
import { sv } from "./sv";
import { en } from "./en";
import { es } from "./es";

export const SUPPORTED_LANGUAGES = ["en", "it", "de", "fr", "nl", "sv", "da", "no", "ro", "es"] as const;
export type Language = (typeof SUPPORTED_LANGUAGES)[number];
export type Dictionary = { [Section in keyof typeof en]: { [Key in keyof (typeof en)[Section]]: string } };

const dictionaries: Record<Language, Dictionary> = {
  en,
  it,
  de,
  fr,
  nl,
  sv,
  da,
  no,
  ro,
  es,
};

export function getLanguage(value?: string, fallback?: string): Language {
  const raw = (value === "auto" ? fallback : value)?.toLowerCase().split(/[-_]/)[0] ?? "en";
  const normalized = raw === "nb" || raw === "nn" ? "no" : raw;
  return SUPPORTED_LANGUAGES.includes(normalized as Language) ? (normalized as Language) : "en";
}

export function getDictionary(language?: string): Dictionary {
  return dictionaries[getLanguage(language)];
}

export function translate(dictionary: Dictionary, key: string): string {
  const value = key.split(".").reduce<unknown>((current, part) => {
    if (typeof current !== "object" || current === null) return undefined;
    return (current as Record<string, unknown>)[part];
  }, dictionary);
  return typeof value === "string" ? value : key;
}
