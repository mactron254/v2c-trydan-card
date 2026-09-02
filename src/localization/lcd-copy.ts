import type { VisualStateKey } from "../models/types";
import { getDictionary, translate, type Language } from "./index";

export interface LcdCopy { primary: string; secondary: string; }
export type LcdState = VisualStateKey | "unavailable";

/**
 * The numbers the card has already converted to kW strings (see `formatLcdKw` in
 * services/format.ts), plus a fault code. Every field is optional because every source is
 * optional: a bare charger with no clamp meter, no solar inverter integration and no third-
 * party grid meter is a completely normal setup, and the copy below has to degrade to it
 * honestly rather than printing a label next to nothing.
 */
export interface LcdValues {
  /** Car draw - the device's "EV" reading. Only meaningful while charging. */
  evKw?: string;
  /** House + car consumption - the device's "T:" / "GRID" reading. */
  totalKw?: string;
  /** Solar production - the device's "FV:" reading. Omitted without a solar sensor. */
  solarKw?: string;
  /** Fault code already folded into the device's "XX YYY" shape, or undefined. */
  errorCode?: string;
}

/**
 * The three visual states a hardware fault collapses into. The Trydan's screen has no room
 * to spell out *which* fault this is - it shows a generic fault word and the numeric code a
 * technician looks up. The full distinction (Control Pilot vs. load balancing vs. a meter
 * fault) still drives the accessible `.charger-status` text and the diagnostics panel; only
 * the tiny LCD replica flattens it, because that is what the real screen does too.
 */
const FAULT_STATES: ReadonlySet<LcdState> = new Set(["control_pilot", "load_balancing", "error"]);

/**
 * Fold a raw fault/meter diagnostic into the device's own "XX YYY" shape - a two-digit
 * source and a three-digit condition, per V2C's documentation of the display. Only a
 * diagnostic that actually carries five digits produces a code; a named Home Assistant
 * state such as "crc_error" (or nothing at all) has no such code to show, so it degrades to
 * the localized fault word instead of fabricating a code the hardware never reported.
 */
export function formatLcdErrorCode(raw?: string | null): string | undefined {
  if (!raw) return undefined;
  const digits = raw.replace(/\D/g, "");
  if (digits.length !== 5) return undefined;
  return `${digits.slice(0, 2)} ${digits.slice(2)}`;
}

/**
 * Build the two lines the real Trydan LCD would show for this state.
 *
 * Length budget: `charger-art.ts`'s `gridFor()` picks a 7-column grid for a single short
 * line, 12 for the common two-line case and falls back to the hardware's cramped 16 only
 * once a line overflows that. At single-digit kW - the overwhelmingly common case for a
 * home charger - every string this function returns fits the 12-column budget: the twelve
 * `lcd.*` status words below (see their lengths per language in tests/v042.test.ts), "EV:
 * 4.2" (7 characters) and the ground-truth pair "T:3.7 FV:1.7" (12 exactly, both at one
 * decimal). Double-digit kW ("T:12.3 FV:45.6", 14 characters) or an unusually long status
 * word both still fit the 16-column fallback - see the "never cuts a word" test - so nothing
 * is ever truncated, it just renders smaller on the rare install that needs it.
 *
 * This intentionally throws away the old prose-plus-measurement design ("Cargando 4,2 kW",
 * "18 A · 236,7 V"): the real screen never shows amps or session energy at all, only the
 * three power readings (EV/T·GRID/FV) it was built for and, on a fault, a code. Amps,
 * voltage and session energy remain visible elsewhere in the card (advanced panel and
 * metric tiles); they are simply no longer duplicated onto the dot-matrix replica.
 */
export function getLcdCopy(language: Language, state: LcdState, values: LcdValues = {}): LcdCopy {
  const dictionary = getDictionary(language);
  const statusWord = translate(dictionary, `lcd.${state}`);
  const powerLine = [
    values.totalKw ? `T:${values.totalKw}` : undefined,
    values.solarKw ? `FV:${values.solarKw}` : undefined,
  ].filter((part): part is string => Boolean(part)).join(" ");

  if (FAULT_STATES.has(state)) {
    return { primary: statusWord, secondary: values.errorCode ?? "" };
  }
  if (state === "charging") {
    // No charge_power sensor configured: fall back to the localized word rather than
    // printing "EV:" next to nothing.
    return { primary: values.evKw ? `EV:${values.evKw}` : statusWord, secondary: powerLine };
  }
  return { primary: statusWord, secondary: powerLine };
}
