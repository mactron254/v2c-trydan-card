import { createHash } from "node:crypto";
import { readdir, readFile, stat } from "node:fs/promises";
import { resolve } from "node:path";

const dist = resolve("dist");
const files = await readdir(dist, { withFileTypes: true });
const artifacts = files.filter((entry) => entry.isFile()).map((entry) => entry.name);
const expectedArtifacts = ["v2c-trydan-card.js", "v2c-trydan-card.js.sha256"];
if (artifacts.length !== expectedArtifacts.length || expectedArtifacts.some((name) => !artifacts.includes(name))) {
  throw new Error(`Expected JS and SHA-256 artifacts; found: ${artifacts.join(", ")}`);
}

const file = resolve(dist, "v2c-trydan-card.js");
const size = (await stat(file)).size;
if (size > 300 * 1024) throw new Error(`Bundle is ${size} bytes; limit is 307200 bytes`);
const content = await readFile(file, "utf8");
if (!content.includes("v2c-trydan-card")) throw new Error("Card registration missing from bundle");
if (!content.includes("<svg")) throw new Error("Trydan SVG assets are not embedded");
if (/\bimport\s+[^;(]*\s+from\s+["']/.test(content)) throw new Error("Bundle contains external imports");
const expectedChecksum = createHash("sha256").update(await readFile(file)).digest("hex");
const checksum = await readFile(resolve(dist, "v2c-trydan-card.js.sha256"), "utf8");
if (checksum.trim() !== `${expectedChecksum}  v2c-trydan-card.js`) throw new Error("SHA-256 checksum mismatch");
console.log(`smoke ok: v2c-trydan-card.js (${size} bytes, SHA-256 verified)`);