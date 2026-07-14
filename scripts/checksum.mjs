import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";

const bundlePath = new URL("../dist/v2c-trydan-card.js", import.meta.url);
const checksumPath = new URL("../dist/v2c-trydan-card.js.sha256", import.meta.url);
const bundle = await readFile(bundlePath);
const checksum = createHash("sha256").update(bundle).digest("hex");

await writeFile(checksumPath, `${checksum}  v2c-trydan-card.js\n`, "utf8");
console.log(`SHA-256: ${checksum}`);