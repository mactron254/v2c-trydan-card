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
});
