import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

describe("Trydan source SVGs", () => {
  it("keeps all eleven editable sources on the Hero XL canvas", () => {
    const directory = join(process.cwd(), "SVG");
    const names = readdirSync(directory).filter((name) => name.endsWith(".svg"));
    expect(names).toHaveLength(11);
    for (const name of names) {
      const source = readFileSync(join(directory, name), "utf8");
      expect(source).toContain('viewBox="24 0 312 480"');
      expect(source).not.toContain('viewBox="0 0 360 500"');
    }
  });
});
