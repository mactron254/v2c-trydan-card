import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

describe("responsive demo harness", () => {
  it("allows the preview and card to shrink to 280 px", () => {
    const source = readFileSync(join(process.cwd(), "demo", "index.html"), "utf8");
    expect(source).toContain(".stage { min-width: 0;");
    expect(source).toContain(".preview { width: 520px; min-width: 0;");
    expect(source).toContain("v2c-trydan-card { display: block; width: 100%; min-width: 0; }");
  });

  it("exposes XXL, layouts, translated editor view and capture matrix", () => {
    const html = readFileSync(join(process.cwd(), "demo", "index.html"), "utf8");
    const mock = readFileSync(join(process.cwd(), "demo", "mock-hass.ts"), "utf8");
    const capture = readFileSync(join(process.cwd(), "scripts", "capture-docs.mjs"), "utf8");
    expect(html).toContain('<option value="xxl">XXL</option>');
    expect(html).toContain('<select id="layout">');
    expect(mock).toContain('params.get("view") === "editor"');
    expect(capture).toContain("captured ${cases.length} images, 2 GIFs and social preview");
    expect(capture).toContain('["auto","centered","split","inline"]');
  });
});