import { describe, expect, it } from "vitest";
import { LCD_GRIDS, foldForLcd, lcdGeometry, lcdPaths } from "../src/card/lcd-matrix";
import { gridFor } from "../src/card/charger-art";
import { TRYDAN_MM } from "../src/assets/trydan/geometry";

const GLASS_W = TRYDAN_MM.displayWidth;
const GLASS_H = TRYDAN_MM.displayHeight;

const countSquares = (path: string) => (path.match(/M/g) ?? []).length;

describe("LCD dot matrix", () => {
  it("keeps the dots square and inside the glass", () => {
    for (const grid of Object.keys(LCD_GRIDS) as (keyof typeof LCD_GRIDS)[]) {
      const { pitch, dot, offsetX, offsetY } = lcdGeometry(grid, GLASS_W, GLASS_H);
      const { columns, rows } = LCD_GRIDS[grid];
      expect(dot).toBeGreaterThan(0);
      expect(dot).toBeLessThan(pitch);
      expect(offsetX).toBeGreaterThanOrEqual(0);
      expect(offsetY).toBeGreaterThanOrEqual(0);
      expect(offsetX * 2 + columns * 6 * pitch).toBeLessThanOrEqual(GLASS_W + 1e-9);
      expect(offsetY * 2 + rows * 8 * pitch).toBeLessThanOrEqual(GLASS_H + 1e-9);
    }
  });

  it("gives the authentic 16x2 grid the hardware's 0.64 mm pitch", () => {
    // Measured from the display captures in V2C's installation manual.
    expect(lcdGeometry("authentic", GLASS_W, GLASS_H).pitch).toBeCloseTo(0.64, 2);
  });

  it("trades character count for dot size without changing the glass", () => {
    const authentic = lcdGeometry("authentic", GLASS_W, GLASS_H).pitch;
    const big = lcdGeometry("big", GLASS_W, GLASS_H).pitch;
    expect(big).toBeGreaterThan(authentic * 2);
  });

  it("splits every grid position into exactly one of on or off", () => {
    const { columns, rows } = LCD_GRIDS.mid;
    const { on, off } = lcdPaths(["ESPERANT EV", "T:0.1 FV:1.7"], "mid", GLASS_W, GLASS_H);
    expect(countSquares(on) + countSquares(off)).toBe((columns * 6 - 1) * (rows * 8 - 1));
    expect(countSquares(on)).toBeGreaterThan(0);
  });

  it("lights nothing for blank lines and everything stays on the off grid", () => {
    const { on, off } = lcdPaths(["", ""], "mid", GLASS_W, GLASS_H);
    expect(on).toBe("");
    expect(countSquares(off)).toBeGreaterThan(0);
  });

  it("upper-cases input and falls back to a blank cell for unknown characters", () => {
    const lower = lcdPaths(["kw"], "big", GLASS_W, GLASS_H);
    const upper = lcdPaths(["KW"], "big", GLASS_W, GLASS_H);
    expect(lower.on).toBe(upper.on);
    // An accented character has no glyph; it must degrade to a gap, not throw.
    expect(() => lcdPaths(["POTÈNCIA"], "mid", GLASS_W, GLASS_H)).not.toThrow();
  });

  it("ignores lines beyond the grid instead of overflowing", () => {
    const oneLine = lcdPaths(["4.2 KW"], "big", GLASS_W, GLASS_H);
    const withExtra = lcdPaths(["4.2 KW", "IGNORED"], "big", GLASS_W, GLASS_H);
    expect(withExtra.on).toBe(oneLine.on);
  });

  it("stays cheap enough to rebuild on every render", () => {
    const { on, off } = lcdPaths(["EV      4.2KW", "T/GRID  5.1KW"], "authentic", GLASS_W, GLASS_H);
    // Two path strings, not 1536 elements.
    expect(on.length + off.length).toBeLessThan(80_000);
  });
});

describe("grid choice", () => {
  it("never cuts a word: long copy falls back to the hardware's own 16 cells", () => {
    // "Trydan preparado" is 16 characters and must survive whole.
    const long = lcdPaths(["Trydan preparado", "Sin vehiculo"], "authentic", GLASS_W, GLASS_H);
    const cut = lcdPaths(["Trydan prepa", "Sin vehiculo"], "mid", GLASS_W, GLASS_H);
    expect(countSquares(long.on)).toBeGreaterThan(countSquares(cut.on));
  });

  it("picks the 12-column grid for the device's own short two-line readouts", () => {
    // The exact pair from V2C's documented display, at its full 12-character width.
    expect(gridFor(["ESPERANT EV", "T:3.7 FV:1.7"])).toBe("mid");
    expect(gridFor(["EV:4.2", "T:1.2 FV:2.8"])).toBe("mid");
  });

  it("reaches the large single-line grid once a short status has nothing to share the glass with", () => {
    // No power sensors configured: the measurement line is empty, so the status word gets
    // the whole screen at the biggest available dot size instead of sharing it with a blank
    // second row.
    expect(gridFor(["Ready", ""])).toBe("big");
    expect(gridFor(["Error", ""])).toBe("big");
    // A pair still beats a lone line, even a short one: two rows of real content still
    // needs the finer grid.
    expect(gridFor(["Klar", "T:1.2"])).toBe("mid");
  });

  it("falls back to mid, not big, once the lone line is too long for seven cells", () => {
    // Italian's "Connessione" (wifi_connecting) is 11 characters - past the 7-cell budget
    // but still comfortably inside 12.
    expect(gridFor(["Connessione", ""])).toBe("mid");
  });

  it("measures the folded length, not the raw one, so an expanded letter can still overflow", () => {
    // "Færdig" is 6 raw characters but folds to 7 ("FAERDIG"); pair it with a line that
    // pushes the folded length just past the 7-cell budget to prove the choice reacts to
    // what actually gets rendered.
    expect(gridFor(["Færdig", ""])).toBe("big");
    expect(gridFor(["Færdigg", ""])).toBe("mid");
  });
});

describe("accent folding", () => {
  it("strips accents the way the hardware does", () => {
    // V2C's own language menu, photographed in the installation manual, reads "ESPANOL".
    expect(foldForLcd("Español")).toBe("ESPANOL");
    expect(foldForLcd("Sin vehículo")).toBe("SIN VEHICULO");
    expect(foldForLcd("Potència")).toBe("POTENCIA");
    expect(foldForLcd("Carga programada")).toBe("CARGA PROGRAMADA");
  });

  it("renders folded text as fully lit glyphs, not gaps", () => {
    const accented = lcdPaths(["Sin vehículo"], "mid", GLASS_W, GLASS_H);
    const plain = lcdPaths(["Sin vehiculo"], "mid", GLASS_W, GLASS_H);
    expect(accented.on).toBe(plain.on);
  });

  it("spells out the Nordic and Romanian letters that have no combining-mark decomposition", () => {
    // æ/ø and Romanian's comma-below ș/ț are atomic Unicode letters, not a base plus a
    // combining mark, so NFD stripping alone (which handles à/ä/å/ă/â/ç/ñ fine) leaves them
    // untouched. Without the hand-mapped fallback they would render as blank gaps.
    expect(foldForLcd("Færdig")).toBe("FAERDIG");
    // å decomposes fine on its own (a + combining ring, stripped by NFD); only æ needs the
    // hand mapping, so this word folds one letter at a time, not uniformly to "aa".
    expect(foldForLcd("Blåbær")).toBe("BLABAER");
    expect(foldForLcd("Købe")).toBe("KOEBE");
    expect(foldForLcd("Poți")).toBe("POTI");
    expect(foldForLcd("Fără")).toBe("FARA");
    // The cedilla-shaped lookalikes already decompose under NFD - both spellings agree.
    expect(foldForLcd("Poţi")).toBe(foldForLcd("Poți"));
  });
});
