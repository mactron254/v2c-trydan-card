import { html, svg, type TemplateResult } from "lit";
import bodyLayer from "../assets/trydan/body.webp";
import connectorLayer from "../assets/trydan/plug.webp";
import { ARTWORK_PX, chargerArtFrame, type ArtworkCrop } from "../assets/trydan/geometry";
import { V2C_LOGO_PATH, V2C_LOGO_VIEWBOX } from "../assets/trydan/logo";
import { LCD_GRIDS, foldForLcd, lcdPaths, type LcdGrid } from "./lcd-matrix";

export interface ChargerArtOptions {
  crop: ArtworkCrop;
  showConnector: boolean;
  /** Whether the connector is in its holster. False while the car has it. */
  connectorHoldered: boolean;
  /** Two lines for the LCD. Anything past the grid is dropped, not wrapped. */
  lcdLines: readonly string[];
  /** Blink period for the logo, in seconds. The device ties this to charge intensity. */
  flashSeconds?: number;
  /** True when the logo LED is off, so the wordmark disappears into the black glass. */
  logoOff?: boolean;
  /** Visual state key; CSS maps it to the documented LED colour. */
  state: string;
  /** Whether this state blinks. Only charging and wifi reconnection do. */
  flash: boolean;
}

/**
 * Pick the coarsest grid the copy actually fits in.
 *
 * Coarser means bigger dots and a readable screen, but fewer cells. `lcd-copy.ts` now
 * builds device-shaped strings ("EV:4.2", "T:3.7 FV:1.7", the twelve short `lcd.*` status
 * words) with a stated 12-character budget instead of the old translated prose ("Trydan
 * preparado", "Cargando 4,2 kW"), so `mid` fits the common case and is tried first. The
 * hardware's real 16-cell grid stays as the fallback for the rare line that still overflows
 * it (a very large three-digit kW reading, or a language whose word runs long).
 *
 * `big` - single line, 7 cells, the largest dots of the three - is now reachable: whenever
 * only one of the two lines actually has content (no power sensor configured at all, so the
 * measurement line is empty, or a fault with no code to show), a short status word gets the
 * whole glass to itself instead of sharing it with a blank second row. Length is measured
 * after `foldForLcd`, not before: a couple of languages' words expand under folding (e.g.
 * Danish "FÆRDIG" becomes seven-letter "FAERDIG"), and the grid choice has to agree with
 * what actually gets rendered.
 */
export function gridFor(lines: readonly string[]): LcdGrid {
  const folded = lines.map((line) => foldForLcd(line));
  const nonEmpty = folded.filter((line) => line.length > 0);
  const longest = folded.reduce((max, line) => Math.max(max, line.length), 0);
  if (nonEmpty.length <= 1 && longest <= LCD_GRIDS.big.columns) return "big";
  return longest <= LCD_GRIDS.mid.columns ? "mid" : "authentic";
}

/**
 * Composite the charger: two bitmap layers for the hardware, vectors for everything that
 * lights up.
 *
 * The logo and the display are drawn rather than baked into the bitmap because they have
 * to change colour and blink. `fill="currentColor"` is what makes that work inside a
 * Home Assistant card: an `@property`-registered custom property is ignored inside a
 * shadow root's adopted stylesheet, so registered-property transitions hard-cut, while
 * `color` interpolates normally and the fill follows it.
 *
 * Cropped frames are faded out along their bottom edge, but that is done in CSS rather
 * than here: fading to transparency makes no assumption about what is behind, so the same
 * rule works on a light card and a dark one, and the ramp stays tunable without touching
 * the artwork.
 *
 * The rendered lines are mirrored onto `data-lcd` on the display group. The dots are
 * paths, so the text is no longer readable from the DOM, and the 120-combination
 * encoding coverage in the test suite needs somewhere to look.
 */
export function renderChargerArt(options: ChargerArtOptions): TemplateResult {
  const { crop, showConnector, connectorHoldered, lcdLines, flashSeconds, logoOff, state, flash } = options;
  const frame = chargerArtFrame(crop, showConnector);
  const { canvasWidth, canvasHeight, logo, display } = ARTWORK_PX;
  const logoScale = logo.width / V2C_LOGO_VIEWBOX.width;
  const displayScale = display.width / 65;
  const lcd = lcdPaths(lcdLines, gridFor(lcdLines), 65, 13.7);
  const style = flashSeconds ? `--v2c-flash:${flashSeconds.toFixed(2)}s` : undefined;

  return html`<div
    class="charger-art"
    style=${style ?? ""}
    data-crop=${crop}
    data-state=${state}
    ?data-flash=${flash}
    data-connector=${showConnector ? (connectorHoldered ? "in" : "out") : "hidden"}
    aria-hidden="true"
  >
    ${svg`<svg
      viewBox="${frame.x} ${frame.y} ${frame.width} ${frame.height}"
      preserveAspectRatio="xMidYMin meet"
    >
      <defs>
        <filter id="v2c-glow-wide" x="-260%" y="-420%" width="640%" height="960%">
          <feGaussianBlur stdDeviation="15" />
        </filter>
        <filter id="v2c-glow-mid" x="-220%" y="-360%" width="560%" height="820%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
        <filter id="v2c-glow-tight" x="-220%" y="-360%" width="560%" height="820%">
          <feGaussianBlur stdDeviation="1.9" />
        </filter>
        <radialGradient id="v2c-backlight" cx=".5" cy=".5" r=".78">
          <stop offset="0" stop-color="#4a56ff" stop-opacity=".5" />
          <stop offset="1" stop-color="#0d1180" stop-opacity=".32" />
        </radialGradient>
      </defs>
      <image href=${bodyLayer} x="0" y="0" width=${canvasWidth} height=${canvasHeight} />
      ${showConnector
        ? svg`<image class="charger-connector" href=${connectorLayer} x="0" y="0"
            width=${canvasWidth} height=${canvasHeight} />`
        : ""}
      ${logoOff
        ? ""
        : svg`<g class="charger-logo-glow">
            <g filter="url(#v2c-glow-wide)" opacity=".3">
              <g transform="translate(${logo.x} ${logo.y}) scale(${logoScale})">
                <path d=${V2C_LOGO_PATH} fill="currentColor" fill-rule="evenodd" />
              </g>
            </g>
            <g filter="url(#v2c-glow-mid)" opacity=".55">
              <g transform="translate(${logo.x} ${logo.y}) scale(${logoScale})">
                <path d=${V2C_LOGO_PATH} fill="currentColor" fill-rule="evenodd" />
              </g>
            </g>
            <g filter="url(#v2c-glow-tight)" opacity=".5">
              <g transform="translate(${logo.x} ${logo.y}) scale(${logoScale})">
                <path d=${V2C_LOGO_PATH} fill="currentColor" fill-rule="evenodd" />
              </g>
            </g>
          </g>
          <g class="charger-logo" transform="translate(${logo.x} ${logo.y}) scale(${logoScale})">
            <path d=${V2C_LOGO_PATH} fill="currentColor" fill-rule="evenodd" />
          </g>`}
      <g class="charger-display" data-lcd=${lcdLines.join("|")}
        transform="translate(${display.x} ${display.y}) scale(${displayScale})">
        <rect x="-1" y="-1" width="67" height="15.7" rx="2.8" fill="#0a0c14" />
        <rect width="65" height="13.7" rx="2" fill="#1b22b4" />
        <rect width="65" height="13.7" rx="2" fill="url(#v2c-backlight)" />
        <g transform="translate(${lcd.offsetX} ${lcd.offsetY})">
          <path d=${lcd.off} fill="#000" opacity=".16" />
          <path d=${lcd.on} fill="#dce4ff" opacity=".95" />
        </g>
        <rect width="65" height="13.7" rx="2" fill="none" stroke="#000" stroke-opacity=".45"
          stroke-width=".5" />
      </g>
    </svg>`}
  </div>`;
}

/**
 * Aspect ratio of the visible frame, for the CSS box that holds the artwork. Kept next to
 * the renderer so the two can never disagree about what shape the art is.
 */
export function chargerArtRatio(crop: ArtworkCrop, showConnector: boolean): number {
  const frame = chargerArtFrame(crop, showConnector);
  return frame.width / frame.height;
}
