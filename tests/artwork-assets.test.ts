import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { V2C_LOGO_PATH } from "../src/assets/trydan/logo";

const ASSET_DIR = join(process.cwd(), "src", "assets", "trydan");

/**
 * Replaces the old svg-sources test, which asserted that exactly eleven near-identical
 * SVG files existed. That check locked in the duplication it was meant to guard: the
 * eleven files differed only in the logo's fill colour and animation class, which is
 * why a colour transition between states was impossible. The artwork is now two bitmap
 * layers plus vectors, so what needs guarding is the byte budget and the absence of
 * anything that reaches off-device.
 */
describe("charger artwork assets", () => {
  const bitmaps = readdirSync(ASSET_DIR).filter((name) => name.endsWith(".webp"));

  it("ships exactly the two layers the card composes", () => {
    expect(bitmaps.sort()).toEqual(["body.webp", "plug.webp"]);
  });

  it("keeps every layer a real WebP", () => {
    for (const name of bitmaps) {
      const bytes = readFileSync(join(ASSET_DIR, name));
      expect(bytes.subarray(0, 4).toString("ascii")).toBe("RIFF");
      expect(bytes.subarray(8, 12).toString("ascii")).toBe("WEBP");
    }
  });

  it("stays inside the inlining budget", () => {
    // Vite inlines these as data URIs, which costs a third more than the raw bytes, and
    // scripts/smoke.mjs fails the build past 307200 bytes.
    const raw = bitmaps.reduce((total, name) => total + statSync(join(ASSET_DIR, name)).size, 0);
    expect(raw).toBeLessThan(24 * 1024);
    expect(Math.ceil((raw * 4) / 3)).toBeLessThan(32 * 1024);
  });

  it("leaves no stale per-state SVG sources behind", () => {
    // The eleven duplicated illustrations are gone; nothing should reintroduce them.
    expect(readdirSync(ASSET_DIR).filter((name) => name.endsWith(".svg"))).toEqual([]);
  });

  it("keeps the traced wordmark inert and self-contained", () => {
    expect(V2C_LOGO_PATH).not.toMatch(/<|>|script|foreignObject/i);
    expect(V2C_LOGO_PATH).not.toMatch(/https?:|\/\//);
    // Path data only: commands and numbers.
    expect(V2C_LOGO_PATH).toMatch(/^[MZLHVmzlhv0-9.\s-]+$/);
  });
});
