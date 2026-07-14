import { existsSync } from "node:fs";
import { mkdir, stat, unlink, writeFile } from "node:fs/promises";
import { spawn, spawnSync } from "node:child_process";
import { join, resolve } from "node:path";

const port = 4178;
const base = `http://127.0.0.1:${port}/demo/index.html`;
const output = resolve("docs/screenshots/v042");
const mediaOutput = resolve("docs/media");
const browserCandidates = [process.env.EDGE_PATH,"C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe","C:/Program Files/Microsoft/Edge/Application/msedge.exe","C:/Program Files/Google/Chrome/Application/chrome.exe"].filter(Boolean);
const browser = browserCandidates.find((candidate) => existsSync(candidate));
if (!browser) throw new Error("Edge/Chrome not found. Set EDGE_PATH.");

const densities = ["xxl","standard","compact","ultra_compact"];
const layouts = ["auto","centered","split","inline"];
const editorSections = ["general","appearance","content","advanced","entities"];
const states = ["disconnected","charging","complete","timer","updating","control_pilot","load_balancing","error","waiting_power","wifi_connected","wifi_connecting"];
const responsiveWidths = [280,320,400,520,768];
const cases = [
  ...densities.flatMap((density) => ["light","dark"].map((theme) => ({ name:`density-${density}-${theme}`, query:{ density,theme,layout:"centered",language:theme === "light" ? "es" : "en",width:"520",state:"charging" }, size:"560,1400" }))),
  ...layouts.map((layout) => ({ name:`layout-${layout}-dark`, query:{ density:"standard",theme:"dark",layout,language:"en",width:"640",state:"charging" }, size:"680,1200" })),
  ...["es","en"].flatMap((language) => editorSections.map((section) => ({ name:`editor-${language}-${section}`, query:{ view:"editor",section,language,theme:"dark",width:"720" }, size:"800,1400" }))),
  ...states.map((state) => ({ name:`state-${state}-dark`, query:{ density:"standard",theme:"dark",layout:"centered",language:"en",width:"520",state }, size:"560,1300" })),
];
if (cases.length !== 33) throw new Error(`Expected 33 capture cases, got ${cases.length}`);

await mkdir(output,{ recursive:true });
await mkdir(mediaOutput,{ recursive:true });
const server = process.platform === "win32"
  ? spawn(process.env.ComSpec ?? "cmd.exe",["/d","/s","/c",`corepack pnpm@11.5.1 exec vite --host 127.0.0.1 --port ${port} --strictPort`],{ stdio:"ignore",windowsHide:true })
  : spawn("corepack",["pnpm@11.5.1","exec","vite","--host","127.0.0.1","--port",String(port),"--strictPort"],{ stdio:"ignore" });
const waitForServer = async () => {
  for (let attempt=0; attempt<50; attempt++) {
    try { const response=await fetch(base); if(response.ok) return; } catch {}
    await new Promise((resolveWait) => setTimeout(resolveWait,200));
  }
  throw new Error("Demo server did not start.");
};
const run = (command,args,label) => {
  const result=spawnSync(command,args,{ stdio:"pipe",encoding:"utf8" });
  if(result.status !== 0) throw new Error(`${label} failed: ${result.stderr || result.stdout}`);
};
const ffmpeg = process.env.FFMPEG_PATH ?? "ffmpeg";
const makeGif = async (name,images) => {
  const listPath=join(mediaOutput,`${name}.txt`);
  const entries=images.flatMap((image) => [`file '${join(output,image).replaceAll("\\","/")}'`,`duration 1.15`]);
  entries.push(`file '${join(output,images.at(-1)).replaceAll("\\","/")}'`);
  await writeFile(listPath,entries.join("\n"),"utf8");
  const target=join(mediaOutput,`${name}.gif`);
  const render=(width,height,fps,colors) => run(ffmpeg,["-y","-f","concat","-safe","0","-i",listPath,"-filter_complex",`[0:v]fps=${fps},scale=${width}:${height}:force_original_aspect_ratio=decrease:flags=lanczos,pad=${width}:${height}:(ow-iw)/2:(oh-ih)/2:color=0x101214,split[a][b];[a]palettegen=max_colors=${colors}:stats_mode=diff[p];[b][p]paletteuse=dither=bayer:bayer_scale=3`,"-loop","0",target],name);
  render(720,1000,8,96);
  if((await stat(target)).size > 6*1024*1024) render(600,834,6,64);
  if((await stat(target)).size > 6*1024*1024) throw new Error(`${name}.gif exceeds 6 MiB`);
  await unlink(listPath);
};

try {
  await waitForServer();
  for (const item of cases) {
    const params = new URLSearchParams({ capture:"1",...item.query });
    const target = join(output,`${item.name}.png`);
    run(browser,["--headless=new","--disable-gpu","--hide-scrollbars","--run-all-compositor-stages-before-draw","--force-device-scale-factor=1","--virtual-time-budget=1800",`--window-size=${item.size}`,`--screenshot=${target}`,`${base}?${params}`],`capture ${item.name}`);
    console.log(`captured ${item.name}.png`);
  }
  for (const width of responsiveWidths) {
    const target=join(mediaOutput,`.responsive-${width}.png`);
    const params=new URLSearchParams({ capture:"1",width:String(width),density:"standard",layout:"auto",language:"en",state:"charging" });
    run(browser,["--headless=new","--disable-gpu","--hide-scrollbars","--run-all-compositor-stages-before-draw","--virtual-time-budget=1800",`--window-size=${width+40},1400`,`--screenshot=${target}`,`${base}?${params}`],`responsive ${width}`);
    if((await stat(target)).size < 1000) throw new Error(`Responsive render ${width}px is empty`);
    await unlink(target);
  }
  const zoomTarget=join(mediaOutput,".zoom-200.png");
  const zoomParams=new URLSearchParams({ capture:"1",width:"400",density:"standard",layout:"auto",language:"de",state:"complete" });
  run(browser,["--headless=new","--disable-gpu","--hide-scrollbars","--run-all-compositor-stages-before-draw","--force-device-scale-factor=2","--virtual-time-budget=1800","--window-size=440,1400",`--screenshot=${zoomTarget}`,`${base}?${zoomParams}`],"zoom 200%");
  if((await stat(zoomTarget)).size < 1000) throw new Error("Zoom 200% render is empty");
  await unlink(zoomTarget);
  console.log(`validated responsive widths ${responsiveWidths.join(", ")} and zoom 200%`);
  await makeGif("trydan-card-tour",["density-xxl-dark.png","density-standard-dark.png","density-compact-dark.png","density-ultra_compact-dark.png","layout-split-dark.png","layout-inline-dark.png","editor-en-appearance.png","editor-es-content.png"]);
  await makeGif("charger-states",states.map((state) => `state-${state}-dark.png`));
  run(ffmpeg,["-y","-i",join(output,"layout-split-dark.png"),"-vf","scale=1280:640:force_original_aspect_ratio=decrease:flags=lanczos,pad=1280:640:(ow-iw)/2:(oh-ih)/2:color=0x101214","-frames:v","1",join(mediaOutput,"social-preview.png")],"social preview");
  console.log(`captured ${cases.length} images, 2 GIFs and social preview`);
} finally {
  if (process.platform === "win32" && server.pid) spawnSync("taskkill",["/pid",String(server.pid),"/t","/f"],{ stdio:"ignore" });
  else server.kill("SIGTERM");
}