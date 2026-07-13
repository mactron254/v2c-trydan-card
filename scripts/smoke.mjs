import { readdir, readFile, stat } from "node:fs/promises";
import { resolve } from "node:path";

const dist = resolve("dist");
const files = await readdir(dist, { withFileTypes: true });
const artifacts = files.filter((entry) => entry.isFile()).map((entry) => entry.name);
if (artifacts.length !== 1 || artifacts[0] !== "v2c-trydan-card.js") {
  throw new Error(`Expected one dist/v2c-trydan-card.js artifact; found: ${artifacts.join(", ")}`);
}

const file = resolve(dist, artifacts[0]);
const size = (await stat(file)).size;
if (size > 300 * 1024) throw new Error(`Bundle is ${size} bytes; limit is 307200 bytes`);
const content = await readFile(file, "utf8");
if (!content.includes("v2c-trydan-card")) throw new Error("Card registration missing from bundle");
if (!content.includes("<svg")) throw new Error("Trydan SVG assets are not embedded");
if (/\bimport\s+[^;(]*\s+from\s+["']/.test(content)) throw new Error("Bundle contains external imports");
console.log(`smoke ok: ${artifacts[0]} (${size} bytes)`);
