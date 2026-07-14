import { readdir, readFile, stat } from "node:fs/promises";
import { dirname, extname, resolve } from "node:path";

const root = resolve(".");

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if ([".git", "node_modules", "dist"].includes(entry.name)) continue;
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(path));
    else files.push(path);
  }
  return files;
}

const files = await walk(root);
const markdown = files.filter((file) => extname(file) === ".md");
const missing = [];
for (const file of markdown) {
  const content = await readFile(file, "utf8");
  for (const match of content.matchAll(/!?\[[^\]]*\]\(([^)]+)\)/g)) {
    const raw = match[1].trim().replace(/^<|>$/g, "").split(/\s+\"/)[0];
    if (!raw || raw.startsWith("#") || /^(?:https?:|mailto:)/i.test(raw)) continue;
    const pathname = decodeURIComponent(raw.split("#")[0]);
    const target = pathname.startsWith("/") ? resolve(root, `.${pathname}`) : resolve(dirname(file), pathname);
    try { await stat(target); } catch { missing.push(`${file.slice(root.length + 1)} -> ${raw}`); }
  }
}
if (missing.length) throw new Error(`Missing documentation targets:\n${missing.join("\n")}`);

const screenshots = files.filter((file) => file.startsWith(resolve("docs/screenshots/v042")) && extname(file) === ".png");
const gifs = files.filter((file) => file.startsWith(resolve("docs/media")) && extname(file) === ".gif");
if (screenshots.length !== 33) throw new Error(`Expected 33 v0.4.2 screenshots, found ${screenshots.length}`);
if (gifs.length !== 2) throw new Error(`Expected 2 documentation GIFs, found ${gifs.length}`);
await stat(resolve("docs/media/social-preview.png"));
console.log(`docs ok: ${markdown.length} Markdown files, ${screenshots.length} screenshots, ${gifs.length} GIFs`);