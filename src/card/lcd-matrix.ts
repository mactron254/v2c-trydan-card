/**
 * Dot-matrix renderer for the Trydan's 16x2 character LCD.
 *
 * The device fits a 5x7 glyph in each cell with a one-dot gap, so a line is eight dot
 * rows tall. Measured from the display captures embedded in V2C's installation manual:
 * dot pitch 2.65 px in a 255 px capture of a 65 mm glass, i.e. 0.64 mm.
 *
 * Polarity: the manual's captures are *positive* (pale cyan backlight, dark characters)
 * but real hardware is *negative* - deep blue backlight with light characters. Sampled
 * from a photograph of a running unit: background #240FBE, characters ~#DCE4FF. Follow
 * the hardware, not the manual.
 *
 * Output is two path strings rather than one rect per dot: a 16x2 screen is 96x16 dots,
 * and 1536 elements per render is not something to hand Lit sixty times a minute.
 */

/** 5 columns per glyph, bit 0 = top row, bit 6 = bottom row. */
const FONT_5X7: Record<string, readonly number[]> = {
  " ": [0, 0, 0, 0, 0],
  "0": [0x3e, 0x51, 0x49, 0x45, 0x3e], "1": [0x00, 0x42, 0x7f, 0x40, 0x00],
  "2": [0x42, 0x61, 0x51, 0x49, 0x46], "3": [0x21, 0x41, 0x45, 0x4b, 0x31],
  "4": [0x18, 0x14, 0x12, 0x7f, 0x10], "5": [0x27, 0x45, 0x45, 0x45, 0x39],
  "6": [0x3c, 0x4a, 0x49, 0x49, 0x30], "7": [0x01, 0x71, 0x09, 0x05, 0x03],
  "8": [0x36, 0x49, 0x49, 0x49, 0x36], "9": [0x06, 0x49, 0x49, 0x29, 0x1e],
  A: [0x7e, 0x11, 0x11, 0x11, 0x7e], B: [0x7f, 0x49, 0x49, 0x49, 0x36],
  C: [0x3e, 0x41, 0x41, 0x41, 0x22], D: [0x7f, 0x41, 0x41, 0x22, 0x1c],
  E: [0x7f, 0x49, 0x49, 0x49, 0x41], F: [0x7f, 0x09, 0x09, 0x09, 0x01],
  G: [0x3e, 0x41, 0x49, 0x49, 0x7a], H: [0x7f, 0x08, 0x08, 0x08, 0x7f],
  I: [0x00, 0x41, 0x7f, 0x41, 0x00], J: [0x20, 0x40, 0x41, 0x3f, 0x01],
  K: [0x7f, 0x08, 0x14, 0x22, 0x41], L: [0x7f, 0x40, 0x40, 0x40, 0x40],
  M: [0x7f, 0x02, 0x0c, 0x02, 0x7f], N: [0x7f, 0x04, 0x08, 0x10, 0x7f],
  O: [0x3e, 0x41, 0x41, 0x41, 0x3e], P: [0x7f, 0x09, 0x09, 0x09, 0x06],
  Q: [0x3e, 0x41, 0x51, 0x21, 0x5e], R: [0x7f, 0x09, 0x19, 0x29, 0x46],
  S: [0x46, 0x49, 0x49, 0x49, 0x31], T: [0x01, 0x01, 0x7f, 0x01, 0x01],
  U: [0x3f, 0x40, 0x40, 0x40, 0x3f], V: [0x1f, 0x20, 0x40, 0x20, 0x1f],
  W: [0x7f, 0x20, 0x18, 0x20, 0x7f], X: [0x63, 0x14, 0x08, 0x14, 0x63],
  Y: [0x03, 0x04, 0x78, 0x04, 0x03], Z: [0x61, 0x51, 0x49, 0x45, 0x43],
  ".": [0x00, 0x00, 0x40, 0x00, 0x00], ",": [0x00, 0x00, 0x60, 0x00, 0x00],
  ":": [0x00, 0x00, 0x14, 0x00, 0x00], "-": [0x08, 0x08, 0x08, 0x08, 0x08],
  "/": [0x20, 0x10, 0x08, 0x04, 0x02], ">": [0x00, 0x41, 0x22, 0x14, 0x08],
  "%": [0x63, 0x13, 0x08, 0x64, 0x63], "+": [0x08, 0x08, 0x3e, 0x08, 0x08],
  "*": [0x14, 0x08, 0x3e, 0x08, 0x14],
};

/** Cell pitch in dots: a 5x7 glyph plus a one-dot gap on the right and below. */
const CELL_COLUMNS = 6;
const CELL_ROWS = 8;

/**
 * How many character cells to draw. `authentic` is the hardware's real 16x2, which at
 * card size gives four pixels per character and is legible to nobody. The other two
 * trade character count for dot size; the material stays identical.
 */
export const LCD_GRIDS = {
  authentic: { columns: 16, rows: 2 },
  mid: { columns: 12, rows: 2 },
  big: { columns: 7, rows: 1 },
} as const;

export type LcdGrid = keyof typeof LCD_GRIDS;

export interface LcdGeometry {
  /** Dot pitch, in the same units as `glassWidth`/`glassHeight`. */
  pitch: number;
  /** Side of one dot. */
  dot: number;
  /** Offset of the dot grid inside the glass, to keep it centred. */
  offsetX: number;
  offsetY: number;
}

export interface LcdPaths extends LcdGeometry {
  /** Lit dots. */
  on: string;
  /** Unlit dots, drawn faintly - a real LCD shows its whole grid. */
  off: string;
}

/**
 * Fit the dot grid inside the glass. Square dots and a fixed row count mean the column
 * count is what gives: the pitch is whichever of the two axes runs out first.
 */
export function lcdGeometry(
  grid: LcdGrid,
  glassWidth: number,
  glassHeight: number,
  bezel = { x: 3.6, y: 2.6 },
): LcdGeometry {
  const { columns, rows } = LCD_GRIDS[grid];
  const pitch = Math.min(
    (glassWidth - bezel.x) / (columns * CELL_COLUMNS),
    (glassHeight - bezel.y) / (rows * CELL_ROWS),
  );
  const gridWidth = columns * CELL_COLUMNS * pitch;
  const gridHeight = rows * CELL_ROWS * pitch;
  return {
    pitch,
    dot: pitch * 0.78,
    offsetX: (glassWidth - gridWidth) / 2,
    offsetY: (glassHeight - gridHeight) / 2,
  };
}

/**
 * Fold accents away, the way the hardware does.
 *
 * A character LCD of this class has no accented glyphs, and V2C's own screens show that:
 * the language menu in the installation manual reads "ESPANOL", not "ESPAÑOL". Passing a
 * translated string straight through would punch holes in every accented word, so the
 * card strips the marks instead of rendering gaps. Decomposing and dropping the combining
 * marks handles most vowels (a, a, a, a, a with various accents: Unicode gives every one of
 * those a canonical decomposition into a base letter plus a combining mark, which the strip
 * below removes). A handful of letters are not a base plus a mark - Unicode treats them as
 * atomic - so they survive that step untouched and are mapped by hand instead: n-tilde/
 * c-cedilla (Spanish/French), ae/oe-ligature (Danish/Norwegian, spelled out AE/OE the way
 * those languages' own passports do) and the Romanian comma-below s/t forms (their older
 * cedilla-shaped lookalikes do decompose, and are already handled by the strip).
 */
export function foldForLcd(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ñ/g, "n")
    .replace(/Ñ/g, "N")
    .replace(/ç/g, "c")
    .replace(/Ç/g, "C")
    .replace(/æ/g, "ae")
    .replace(/Æ/g, "AE")
    .replace(/ø/g, "oe")
    .replace(/Ø/g, "OE")
    .replace(/ș/g, "s")
    .replace(/Ș/g, "S")
    .replace(/ț/g, "t")
    .replace(/Ț/g, "T")
    .replace(/º|ª/g, "")
    .toUpperCase();
}

/**
 * Render `lines` as two SVG path strings. Text is upper-cased because the device only ever
 * shows caps, and accents are folded because it has no glyphs for them. Anything still
 * unmapped falls back to a blank cell rather than throwing, so one stray symbol costs a
 * gap and not the whole screen.
 */
export function lcdPaths(
  lines: readonly string[],
  grid: LcdGrid,
  glassWidth: number,
  glassHeight: number,
): LcdPaths {
  const { columns, rows } = LCD_GRIDS[grid];
  const geometry = lcdGeometry(grid, glassWidth, glassHeight);
  const { pitch, dot } = geometry;
  const inset = (pitch - dot) / 2;
  const lit = new Set<string>();

  for (let line = 0; line < Math.min(lines.length, rows); line += 1) {
    const text = foldForLcd(String(lines[line] ?? ""));
    for (let cell = 0; cell < columns; cell += 1) {
      const glyph = FONT_5X7[text[cell] ?? " "] ?? FONT_5X7[" "]!;
      for (let gx = 0; gx < 5; gx += 1) {
        for (let gy = 0; gy < 7; gy += 1) {
          if ((glyph[gx]! >> gy) & 1) lit.add(`${cell * CELL_COLUMNS + gx},${line * CELL_ROWS + gy}`);
        }
      }
    }
  }

  const square = (column: number, row: number) =>
    `M${(column * pitch + inset).toFixed(2)} ${(row * pitch + inset).toFixed(2)}` +
    `h${dot.toFixed(2)}v${dot.toFixed(2)}h-${dot.toFixed(2)}z`;

  const on: string[] = [];
  const off: string[] = [];
  // The trailing gap column and row of the last cell are not part of the screen.
  for (let column = 0; column < columns * CELL_COLUMNS - 1; column += 1) {
    for (let row = 0; row < rows * CELL_ROWS - 1; row += 1) {
      (lit.has(`${column},${row}`) ? on : off).push(square(column, row));
    }
  }
  return { ...geometry, on: on.join(""), off: off.join("") };
}
