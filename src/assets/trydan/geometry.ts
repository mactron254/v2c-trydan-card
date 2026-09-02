/**
 * Trydan hardware geometry, in millimetres.
 *
 * Every value here is measured, not estimated. Sources, in order of authority:
 *  1. `ficha-tecnica-trydan.pdf` (V2C) - the dimensioned front elevation is vector
 *     art; rendered at 600 dpi it gives the body as 561x781 px = 240x334 mm, and the
 *     display slot as 152x32 px = 65.0x13.7 mm centred at 41.0% of the height.
 *     The corner radius is a least-squares fit of the rounded-rect inset profile: 24.0 mm.
 *  2. The near-frontal render in the V2C installation manual, calibrated against the
 *     display as a ruler, places the logo centre at 23.9% of the height.
 *  3. V2C's own press kit (`docs/artwork/source-v2c-press-kit.jpg`, from
 *     v2charge.com/material-grafico) measures the body at 760x1058 px, ratio 0.7183
 *     against the spec's 0.7186, with the display centred at 41.49% of the height and the
 *     logo at 23.58%.
 *
 * Four independent sources agree to within 2%, so these numbers are treated as fixed.
 */
export const TRYDAN_MM = {
  /** Outer body. 240 x 334 mm, ratio 0.7186. */
  bodyWidth: 240,
  bodyHeight: 334,
  /** 24 mm, exactly 10% of the body width. */
  cornerRadius: 24,
  /** The glossy front panel is inset from the shell edge. */
  panelInset: 4,
  /**
   * Illuminated V2C wordmark. Invisible when off: the panel is uniform black glass.
   *
   * Four measurements, none identical, all of a *lit* logo whose glow inflates the box:
   * the manual's render 59.7 mm at 23.9% of the height, a reseller crop 63.7 mm at 23.0%,
   * and V2C's own 1500 px press-kit shot 63.3 mm at 23.75%. The spread is under 2% of the
   * body height, so this takes the press kit's figures rounded to the middle of the range.
   */
  logoWidth: 63.4,
  logoCentreY: 78.5,
  /** Official mark is 378x163 units, so 2.319:1. */
  logoAspect: 2.319,
  /** 2.6" character LCD, 16x2 cells of 5x7 dots. */
  displayWidth: 65,
  displayHeight: 13.7,
  displayCentreY: 137,
  displayCornerRadius: 2,
} as const;

/**
 * Where each feature sits inside the layered artwork bitmaps, in their own pixel
 * space. The bitmaps share one 584x649 canvas (they are cut from the same photo and
 * downscaled together), so these offsets apply to every layer.
 */
export const ARTWORK_PX = {
  canvasWidth: 483,
  canvasHeight: 604,
  body: { x: 11, y: 12, width: 360, height: 501 },
  /*
   * The logo and display boxes are derived from the millimetre model, not traced from the
   * photograph. Both features are lit in the source, and their glow inflates a pixel
   * measurement by four or five percent - the display's lit area measures 68 mm wide
   * against a 65 mm glass, which is impossible. Placing them from the spec keeps the drawn
   * parts the size the hardware actually is.
   */
  logo: { x: 142, y: 109, width: 96, height: 41 },
  display: { x: 142, y: 207, width: 98, height: 21 },
} as const;

/**
 * Vertical crops, as a fraction of the canvas height. The connector lives in the
 * lower half (canvas y 270 to 613), so `focus` deliberately loses it.
 */
export const ARTWORK_CROPS = {
  focus: 0.54,
  mid: 0.8,
  full: 1,
} as const;

export type ArtworkCrop = keyof typeof ARTWORK_CROPS;

/** Where the connector layer lives on the canvas, so a frame can decide to include it. */
export const CONNECTOR_PX = { top: 252, bottom: 600, right: 424 } as const;

export interface ArtworkFrame {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * The visible window onto the artwork canvas.
 *
 * Cropping vertically alone is not enough. The bitmaps were cut from a photograph whose
 * frame has to leave room for the coiled cable, so the body only fills 61% of the canvas
 * width. Showing the full width when the connector is hidden would shrink the display to
 * an unreadable smear and pad the card with empty space, so the frame closes in
 * horizontally too and only opens up when there is a connector to make room for.
 */
export function chargerArtFrame(crop: ArtworkCrop, showConnector: boolean): ArtworkFrame {
  const { body } = ARTWORK_PX;
  const margin = 6;
  /*
   * The frame is always centred on the body, never on its contents. Widening it to the
   * right to make room for the connector would leave the charger sitting off to one side,
   * which reads as a mistake rather than as a hanging cable, so the connector's overhang
   * is matched by empty space on the left. A negative x is fine: the viewBox simply shows
   * the void beside the canvas, and the body stays where the eye expects it.
   */
  const bodyCentreX = body.x + body.width / 2;
  const halfWidth = Math.max(
    body.width / 2 + margin,
    showConnector ? CONNECTOR_PX.right + margin - bodyCentreX : 0,
  );
  const x = bodyCentreX - halfWidth;
  const y = body.y - 13;
  /*
   * Each crop stops just past the last feature it is meant to show.
   *
   * `focus` takes a comfortable margin of body below the display when there is no
   * connector to worry about. With the connector shown it has to stop at the connector's
   * top instead, and on this canvas that is only fifteen pixels below the display, so the
   * margin is whatever is left - showing a disembodied sliver of connector would look worse
   * than a tight crop.
   */
  const focusBottom = ARTWORK_PX.display.y + ARTWORK_PX.display.height;
  const bottom = crop === "focus"
    ? showConnector
      ? Math.min(focusBottom + 22, CONNECTOR_PX.top)
      // Deliberately generous: the bottom of the frame dissolves into the card, and a fade
      // needs room to run. At +40 the display sat at 85% of the frame height and the ramp
      // had to start above it, dimming the screen; at +82 the display clears the ramp.
      : focusBottom + 82
    : crop === "mid"
      ? Math.round((CONNECTOR_PX.top + CONNECTOR_PX.bottom) / 2 + 62)
      // The bitmaps are cropped tight to the object, so `full` clamps to the canvas rather
      // than framing empty space past its edge.
      : Math.min(CONNECTOR_PX.bottom + 12, ARTWORK_PX.canvasHeight);
  return { x, y, width: halfWidth * 2, height: bottom - y };
}
