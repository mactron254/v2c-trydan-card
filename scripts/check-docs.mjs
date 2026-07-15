import { readdir, readFile, stat } from "node:fs/promises";
import { dirname, extname, resolve } from "node:path";
import { findContentBottom, pngDimensions, trimHeight } from "./media-utils.mjs";

const root = resolve(".");
const expectedGifs = ["charger-states.gif","trydan-card-tour.gif","vehicle-connection-en.gif","vehicle-connection-es.gif"];

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
const fillRgb = (width,height,color) => {
  const buffer=Buffer.alloc(width*height*3);
  for(let index=0;index<buffer.length;index+=3) {
    buffer[index]=color[0]; buffer[index+1]=color[1]; buffer[index+2]=color[2];
  }
  return buffer;
};
const paint=(buffer,width,x0,y0,x1,y1,color) => {
  for(let y=y0;y<=y1;y++) for(let x=x0;x<=x1;x++) {
    const offset=(y*width+x)*3;
    buffer[offset]=color[0]; buffer[offset+1]=color[1]; buffer[offset+2]=color[2];
  }
};
const exerciseCropAlgorithm=() => {
  const dark=fillRgb(100,100,[9,10,11]);
  paint(dark,100,10,10,89,60,[40,42,44]);
  paint(dark,100,15,61,84,64,[22,23,24]);
  paint(dark,100,50,92,50,92,[255,255,255]);
  if(findContentBottom(dark,100,100)!==64) throw new Error("Crop test failed for dark background, shadow or isolated pixel");
  if(trimHeight(64,100)!==81) throw new Error("Crop padding test failed");

  const light=fillRgb(120,90,[240,242,244]);
  paint(light,120,12,8,107,52,[190,192,194]);
  paint(light,120,20,53,99,55,[225,226,227]);
  if(findContentBottom(light,120,90)!==55) throw new Error("Crop test failed for light background and shadow");
};
exerciseCropAlgorithm();

const files = await walk(root);
const markdown = files.filter((file) => extname(file) === ".md");
const missing = [];
const emptyAlt = [];
for (const file of markdown) {
  const content = await readFile(file, "utf8");
  for (const match of content.matchAll(/(!?)\[([^\]]*)\]\(([^)]+)\)/g)) {
    const raw = match[3].trim().replace(/^<|>$/g, "").split(/\s+"/)[0];
    if (match[1] === "!" && !match[2].trim()) emptyAlt.push(file.slice(root.length + 1));
    if (!raw || raw.startsWith("#") || /^(?:https?:|mailto:)/i.test(raw)) continue;
    const pathname = decodeURIComponent(raw.split("#")[0]);
    const target = pathname.startsWith("/") ? resolve(root, `.${pathname}`) : resolve(dirname(file), pathname);
    try { await stat(target); } catch { missing.push(`${file.slice(root.length + 1)} -> ${raw}`); }
  }
  for (const match of content.matchAll(/<(?:img|a)\b[^>]*(?:src|href)=["']([^"']+)["'][^>]*>/gi)) {
    const raw=match[1].trim();
    if (match[0].toLowerCase().startsWith("<img") && !/\balt=["'][^"']+["']/i.test(match[0])) emptyAlt.push(file.slice(root.length + 1));
    if (!raw || raw.startsWith("#") || /^(?:https?:|mailto:)/i.test(raw)) continue;
    const target=resolve(dirname(file),decodeURIComponent(raw.split("#")[0]));
    try { await stat(target); } catch { missing.push(`${file.slice(root.length + 1)} -> ${raw}`); }
  }
}
if (missing.length) throw new Error(`Missing documentation targets:\n${missing.join("\n")}`);
if (emptyAlt.length) throw new Error(`Documentation images need descriptive alt text:\n${[...new Set(emptyAlt)].join("\n")}`);

const screenshotRoot=resolve("docs/screenshots/v042");
const screenshots = files.filter((file) => file.startsWith(screenshotRoot) && extname(file) === ".png");
if (screenshots.length !== 33) throw new Error(`Expected 33 v0.4.2 screenshots, found ${screenshots.length}`);
const manifest=JSON.parse(await readFile(resolve(screenshotRoot,"capture-manifest.json"),"utf8"));
if(manifest.version!==1 || manifest.paddingBottom!==16 || manifest.captures.length!==33) throw new Error("Invalid capture manifest");
const manifestNames=manifest.captures.map(({ name }) => name).sort();
const screenshotNames=screenshots.map((file) => file.slice(screenshotRoot.length+1)).sort();
if(JSON.stringify(manifestNames)!==JSON.stringify(screenshotNames)) throw new Error("Capture manifest does not match the 33 PNG files");
let cropped=0;
for(const entry of manifest.captures) {
  const dimensions=pngDimensions(await readFile(resolve(screenshotRoot,entry.name)));
  if(dimensions.width!==entry.width || dimensions.height!==entry.height) throw new Error(`Manifest dimensions mismatch: ${entry.name}`);
  if(entry.bottomMargin<0 || entry.bottomMargin>16) throw new Error(`Bottom margin exceeds 16 px: ${entry.name}`);
  if(entry.height>entry.rawHeight) throw new Error(`Capture grew unexpectedly: ${entry.name}`);
  if(entry.rawHeight-entry.contentBottom-1>16 && entry.height===entry.rawHeight) throw new Error(`Unnecessary fixed-height background remains: ${entry.name}`);
  if(entry.height<entry.rawHeight) cropped++;
}
if(cropped===0) throw new Error("No screenshots were cropped");

const gifs = files.filter((file) => file.startsWith(resolve("docs/media")) && extname(file) === ".gif");
const gifNames=gifs.map((file) => file.slice(resolve("docs/media").length+1)).sort();
if(JSON.stringify(gifNames)!==JSON.stringify(expectedGifs)) throw new Error(`Expected GIFs ${expectedGifs.join(", ")}, found ${gifNames.join(", ")}`);
for(const gif of gifs) {
  const data=await readFile(gif);
  const width=data.readUInt16LE(6);
  if(width>720) throw new Error(`GIF exceeds 720 px: ${gif}`);
  if((await stat(gif)).size>=6*1024*1024) throw new Error(`GIF exceeds 6 MiB: ${gif}`);
}
const captureSource=await readFile(resolve("scripts/capture-docs.mjs"),"utf8");
if(!captureSource.includes('["disconnected","waiting_power","charging"]') || !captureSource.includes('language:"es"')) throw new Error("Localized vehicle GIF sequence is not reproducible");
await stat(resolve("docs/media/social-preview.png"));
console.log(`docs ok: ${markdown.length} Markdown files, ${screenshots.length} screenshots (${cropped} cropped), ${gifs.length} GIFs`);