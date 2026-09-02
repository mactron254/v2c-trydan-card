import { describe, expect, it } from "vitest";
import {
  ARTWORK_CROPS,
  ARTWORK_PX,
  CONNECTOR_PX,
  TRYDAN_MM,
  chargerArtFrame,
} from "../src/assets/trydan/geometry";
import { V2C_LOGO_PATH, V2C_LOGO_VIEWBOX } from "../src/assets/trydan/logo";

describe("Trydan artwork geometry", () => {
  it("matches the dimensioned drawing in V2C's spec sheet", () => {
    expect(TRYDAN_MM.bodyWidth / TRYDAN_MM.bodyHeight).toBeCloseTo(240 / 334, 4);
    // The corner radius is exactly a tenth of the width.
    expect(TRYDAN_MM.cornerRadius / TRYDAN_MM.bodyWidth).toBeCloseTo(0.1, 3);
  });

  it("places the display where all three sources agree", () => {
    expect(TRYDAN_MM.displayCentreY / TRYDAN_MM.bodyHeight).toBeCloseTo(0.41, 2);
    expect(TRYDAN_MM.displayWidth / TRYDAN_MM.displayHeight).toBeCloseTo(4.74, 1);
  });

  it("keeps the millimetre model and the bitmap telling the same story", () => {
    // Same feature, two representations: they must not drift apart.
    const fromMm = TRYDAN_MM.logoWidth / TRYDAN_MM.bodyWidth;
    const fromPx = ARTWORK_PX.logo.width / ARTWORK_PX.body.width;
    expect(Math.abs(fromMm - fromPx)).toBeLessThan(0.01);
  });

  it("places the logo above the display, not overlapping it", () => {
    const logoHeight = TRYDAN_MM.logoWidth / TRYDAN_MM.logoAspect;
    const logoBottom = TRYDAN_MM.logoCentreY + logoHeight / 2;
    const displayTop = TRYDAN_MM.displayCentreY - TRYDAN_MM.displayHeight / 2;
    expect(logoBottom).toBeLessThan(displayTop);
    expect(TRYDAN_MM.logoCentreY / TRYDAN_MM.bodyHeight).toBeCloseTo(0.235, 2);
  });

  it("keeps the bitmap anchors consistent with the millimetre model", () => {
    const { body, logo, display, canvasWidth, canvasHeight } = ARTWORK_PX;
    expect(body.width / body.height).toBeCloseTo(TRYDAN_MM.bodyWidth / TRYDAN_MM.bodyHeight, 2);
    // Both features are horizontally centred on the body, within a pixel of rounding.
    expect(Math.abs(logo.x + logo.width / 2 - (body.x + body.width / 2))).toBeLessThan(3);
    expect(Math.abs(display.x + display.width / 2 - (body.x + body.width / 2))).toBeLessThan(3);
    // And they sit at the measured heights.
    expect((logo.y + logo.height / 2 - body.y) / body.height).toBeCloseTo(0.235, 2);
    expect((display.y + display.height / 2 - body.y) / body.height).toBeCloseTo(0.41, 2);
    expect(body.x + body.width).toBeLessThanOrEqual(canvasWidth);
    expect(body.y + body.height).toBeLessThanOrEqual(canvasHeight);
  });

  it("orders the crops and frames each one around what it is meant to show", () => {
    expect(ARTWORK_CROPS.focus).toBeLessThan(ARTWORK_CROPS.mid);
    expect(ARTWORK_CROPS.mid).toBeLessThan(ARTWORK_CROPS.full);

    // Expressed against the connector's own position rather than pixel thresholds, so
    // re-cutting the bitmaps from a different source cannot quietly invalidate it.
    const bottom = (crop: "focus" | "mid" | "full") => {
      const frame = chargerArtFrame(crop, true);
      return frame.y + frame.height;
    };
    const connectorMiddle = (CONNECTOR_PX.top + CONNECTOR_PX.bottom) / 2;
    // With the connector shown, focus must not clip it mid-body.
    expect(bottom("focus")).toBeLessThanOrEqual(CONNECTOR_PX.top);
    // With it hidden there is nothing below to avoid, so focus takes more body.
    const focusNoConnector = chargerArtFrame("focus", false);
    expect(focusNoConnector.y + focusNoConnector.height).toBeGreaterThan(CONNECTOR_PX.top);
    expect(focusNoConnector.width).toBeLessThan(chargerArtFrame("focus", true).width);
    expect(bottom("mid")).toBeGreaterThan(connectorMiddle);
    expect(bottom("mid")).toBeLessThan(CONNECTOR_PX.bottom);
    expect(bottom("full")).toBeGreaterThanOrEqual(CONNECTOR_PX.bottom);
    expect(bottom("full")).toBeLessThanOrEqual(ARTWORK_PX.canvasHeight);
  });
});

describe("traced V2C wordmark", () => {
  it("is a closed even-odd polygon path in its own 378x163 box", () => {
    expect(V2C_LOGO_VIEWBOX).toEqual({ width: 378, height: 163 });
    expect(V2C_LOGO_PATH.startsWith("M")).toBe(true);
    expect(V2C_LOGO_PATH.endsWith("Z")).toBe(true);
    // Several contours: the letterforms, the C's counter and the seven dots.
    expect((V2C_LOGO_PATH.match(/Z/g) ?? []).length).toBeGreaterThanOrEqual(8);
    // Polygon only - curves would cost more than they buy at card size.
    expect(V2C_LOGO_PATH).not.toMatch(/[CcSsQqTtAa]/);
  });

  it("stays small enough to inline", () => {
    expect(V2C_LOGO_PATH.length).toBeLessThan(4000);
  });

  it("fills the box it declares", () => {
    const numbers = V2C_LOGO_PATH.match(/-?\d+(\.\d+)?/g)!.map(Number);
    const xs = numbers.filter((_, i) => i % 2 === 0);
    const ys = numbers.filter((_, i) => i % 2 === 1);
    expect(Math.max(...xs)).toBeLessThanOrEqual(V2C_LOGO_VIEWBOX.width + 1);
    expect(Math.max(...ys)).toBeLessThanOrEqual(V2C_LOGO_VIEWBOX.height + 1);
    expect(Math.min(...xs)).toBeGreaterThanOrEqual(-1);
    expect(Math.min(...ys)).toBeGreaterThanOrEqual(-1);
  });
});

describe("frame centring", () => {
  it("keeps the charger centred whether or not the connector is shown", () => {
    const bodyCentre = ARTWORK_PX.body.x + ARTWORK_PX.body.width / 2;
    for (const crop of ["focus", "mid", "full"] as const) {
      for (const showConnector of [false, true]) {
        const frame = chargerArtFrame(crop, showConnector);
        // An off-centre charger reads as a layout mistake rather than as a hanging cable.
        expect(frame.x + frame.width / 2).toBeCloseTo(bodyCentre, 6);
      }
    }
  });

  it("makes room for the connector by widening both sides, not one", () => {
    const withConnector = chargerArtFrame("full", true);
    const without = chargerArtFrame("full", false);
    expect(withConnector.width).toBeGreaterThan(without.width);
    // The extra width is split evenly, so the left edge moves out as far as the right.
    const leftGrowth = without.x - withConnector.x;
    const rightGrowth =
      withConnector.x + withConnector.width - (without.x + without.width);
    expect(leftGrowth).toBeCloseTo(rightGrowth, 6);
    // And the connector actually fits.
    expect(withConnector.x + withConnector.width).toBeGreaterThanOrEqual(CONNECTOR_PX.right);
  });
});
