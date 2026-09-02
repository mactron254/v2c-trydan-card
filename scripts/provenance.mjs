import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const [tag, commit] = process.argv.slice(2);
if (!/^v\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/.test(tag ?? "")) throw new Error("Expected a semantic release tag");
if (!/^[0-9a-f]{40}$/.test(commit ?? "")) throw new Error("Expected a full Git commit SHA");

const checksumPath = resolve("dist/v2c-trydan-card.js.sha256");
const checksum = (await readFile(checksumPath, "utf8")).trim().split(/\s+/, 1)[0];
if (!/^[0-9a-f]{64}$/.test(checksum ?? "")) throw new Error("Invalid release checksum");

const provenance = {
  schema: "v2c-trydan-card-release-provenance/v1",
  tag,
  commit,
  artifact: "v2c-trydan-card.js",
  sha256: checksum,
  builder: "github-actions",
};

await writeFile(
  resolve("dist/v2c-trydan-card.js.provenance.json"),
  `${JSON.stringify(provenance, null, 2)}\n`,
  "utf8",
);
