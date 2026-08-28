import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { V2cTrydanCard } from "../src/card/v2c-trydan-card";
import { VISUAL_STATE_KEYS, type VisualStateKey } from "../src/models/types";

const DIRECTORY = join(process.cwd(), "src", "assets", "trydan");
const artwork = () => readFileSync(join(DIRECTORY, "trydan.svg"), "utf8");
const stylesheet = () => String(V2cTrydanCard.styles);

/** The colour each state lit the wordmark with, when it was one file per state. */
const LED: Record<VisualStateKey, string> = {
  disconnected: "#f4f6f8",
  charging: "#123cc9",
  complete: "#3fce6b",
  timer: "#43dbe7",
  updating: "#f050bd",
  control_pilot: "#ffd43b",
  load_balancing: "#ff9dd8",
  error: "#ef3340",
  waiting_power: "#f28c28",
  wifi_connected: "#3fce6b",
  wifi_connecting: "#f4f6f8",
};

/** The only three states that blinked, and exactly how. */
const BLINK: Partial<Record<VisualStateKey, string>> = {
  charging: "v2c-blink-current .65s steps(1, end) infinite",
  wifi_connecting: "v2c-blink-slow 1.35s steps(1, end) infinite",
  wifi_connected: "v2c-blink-once 1s ease-out 1",
};

const KEYFRAMES = [
  "@keyframes v2c-blink-slow { 0%, 46% { opacity: 1; } 50%, 100% { opacity: .18; } }",
  "@keyframes v2c-blink-current { 0%, 38% { opacity: 1; } 45%, 100% { opacity: .18; } }",
  "@keyframes v2c-blink-once { 0%, 20% { opacity: .15; } 45%, 72% { opacity: 1; } 100% { opacity: .45; } }",
];

describe("Trydan source SVG", () => {
  it("keeps exactly one editable source on the Hero XL canvas", () => {
    expect(readdirSync(DIRECTORY).filter((name) => name.endsWith(".svg"))).toEqual(["trydan.svg"]);
  });

  it("stays decorative, local and free of embedded copy", () => {
    const source = artwork();
    expect(source).toContain('viewBox="24 0 312 480"');
    expect(source).not.toContain('viewBox="0 0 360 500"');
    expect(source).not.toMatch(/<text|role="img"|aria-label=/i);
    expect(source).not.toMatch(/<(script|foreignObject)\b/i);
    expect(source).not.toMatch(/(?:href|xlink:href)\s*=\s*["'](?:https?:|\/\/)/i);
  });

  it("paints the wordmark from the host stylesheet, never from the document", () => {
    const source = artwork();
    // The fill must be on the wordmark group itself. Matching the string anywhere in the
    // file would also be satisfied by the comment that explains it.
    expect(source).toMatch(/<g class="charger-logo"[^>]*\bfill="currentColor"/);
    expect(source).not.toMatch(/<g class="charger-logo"[^>]*\bfill="#/);
    // Every LED colour, including the white shared by disconnected and wifi_connecting.
    // Any of them present as a literal would freeze the wordmark for the other states.
    for (const colour of new Set(Object.values(LED))) {
      expect(source, `${colour} must not be hardcoded in the artwork`).not.toContain(colour);
    }
  });

  it("carries every state's LED colour across to the stylesheet unchanged", () => {
    const styles = stylesheet();
    expect(styles).toContain("color: var(--v2c-led, #f4f6f8);");
    for (const key of VISUAL_STATE_KEYS) {
      expect(styles).toContain(`.charger-art[data-state="${key}"] { --v2c-led: ${LED[key]}; }`);
    }
  });

  it("blinks in exactly the three states that blinked before, and no others", () => {
    const styles = stylesheet();
    for (const [key, animation] of Object.entries(BLINK)) {
      expect(styles).toContain(`.charger-art[data-state="${key}"] .charger-logo { animation: ${animation}; }`);
    }
    for (const key of VISUAL_STATE_KEYS) {
      if (key in BLINK) continue;
      expect(styles, `${key} did not blink and must not start`)
        .not.toContain(`.charger-art[data-state="${key}"] .charger-logo`);
    }
    const declared = styles.match(/\.charger-art\[data-state="\w+"\] \.charger-logo \{ animation:/g) ?? [];
    expect(declared).toHaveLength(Object.keys(BLINK).length);
  });

  it("keeps the blink keyframes identical to the ones the artwork carried", () => {
    const styles = stylesheet();
    for (const frames of KEYFRAMES) expect(styles).toContain(frames);
  });
});
