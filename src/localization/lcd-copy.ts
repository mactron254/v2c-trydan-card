import type { VisualStateKey } from "../models/types";
import { getDictionary, translate, type Language } from "./index";

export interface LcdCopy { primary: string; secondary: string; }
export interface LcdValues { power?: string; current?: string; voltage?: string; energy?: string; }

export function getLcdCopy(language: Language, state: VisualStateKey, values: LcdValues = {}): LcdCopy {
  const dictionary = getDictionary(language);
  const base: LcdCopy = state === "disconnected"
    ? { primary:translate(dictionary,"details.disconnected"), secondary:translate(dictionary,"states.disconnected") }
    : { primary:translate(dictionary,`states.${state}`), secondary:translate(dictionary,`details.${state}`) };
  if (state === "charging") return {
    primary: values.power && values.power !== "—" ? `${base.primary} ${values.power}` : base.primary,
    secondary: [values.current, values.voltage].filter(Boolean).join(" · ") || base.secondary,
  };
  if (state === "complete" && values.energy && values.energy !== "—") return { ...base, secondary:values.energy };
  return base;
}