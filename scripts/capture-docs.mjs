import { existsSync } from "node:fs";
import { mkdir, mkdtemp, readFile, rename, rm, stat, writeFile } from "node:fs/promises";
import { spawn, spawnSync } from "node:child_process";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { findContentBottom, pngDimensions, trimHeight } from "./media-utils.mjs";

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
const tempDirectory = await mkdtemp(join(tmpdir(),"v2c-docs-"));
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
const run = (command,args,label,options={}) => {
  const result=spawnSync(command,args,{ stdio:"pipe",encoding:"utf8",maxBuffer:128*1024*1024,...options });
  if(result.status !== 0) throw new Error(`${label} failed: ${result.stderr || result.stdout}`);
  return result;
};
const ffmpeg = process.env.FFMPEG_PATH ?? "ffmpeg";
const captureImage = (target,size,query,label) => {
  const params = new URLSearchParams({ capture:"1",...query });
  run(browser,["--headless=new","--disable-gpu","--hide-scrollbars","--run-all-compositor-stages-before-draw","--force-device-scale-factor=1","--virtual-time-budget=1800",`--window-size=${size}`,`--screenshot=${target}`,`${base}?${params}`],label);
};
const trimBottom = async (target) => {
  const source = await readFile(target);
  const { width,height:rawHeight } = pngDimensions(source);
  const decoded = run(ffmpeg,["-v","error","-i",target,"-f","rawvideo","-pix_fmt","rgb24","pipe:1"],`decode ${target}`,{ encoding:null });
  const contentBottom = findContentBottom(decoded.stdout,width,rawHeight);
  const height = trimHeight(contentBottom,rawHeight,16);
  if(height < rawHeight) {
    const cropped=join(tempDirectory,`crop-${Date.now()}-${Math.random().toString(16).slice(2)}.png`);
    run(ffmpeg,["-y","-v","error","-i",target,"-vf",`crop=iw:${height}:0:0`,"-frames:v","1",cropped],`crop ${target}`);
    await rename(cropped,target);
  }
  const dimensions=pngDimensions(await readFile(target));
  if(dimensions.width !== width || dimensions.height !== height) throw new Error(`Unexpected crop dimensions for ${target}`);
  return { width,rawHeight,height,contentBottom,bottomMargin:height-contentBottom-1 };
};
const makeGif = async (name,frames) => {
  const width=720;
  const dimensions=await Promise.all(frames.map(async ({ path }) => pngDimensions(await readFile(path))));
  const height=Math.min(1000,Math.max(...dimensions.map(({ width:imageWidth,height:imageHeight }) => Math.ceil(imageHeight*width/imageWidth))));
  const normalized=[];
  for(let index=0;index<frames.length;index++) {
    const target=join(tempDirectory,`${name}-${String(index).padStart(2,"0")}.png`);
    run(ffmpeg,["-y","-v","error","-i",frames[index].path,"-vf",`scale=${width}:${height}:force_original_aspect_ratio=decrease:flags=lanczos,pad=${width}:${height}:(ow-iw)/2:(oh-ih)/2:color=0x101214`,"-frames:v","1",target],`normalize ${name}`);
    normalized.push(target);
  }
  const listPath=join(tempDirectory,`${name}.txt`);
  const entries=normalized.flatMap((path,index) => [`file '${path.replaceAll("\\","/")}'`,`duration ${frames[index].duration ?? 1.15}`]);
  entries.push(`file '${normalized.at(-1).replaceAll("\\","/")}'`);
  await writeFile(listPath,entries.join("\n"),"utf8");
  const target=join(mediaOutput,`${name}.gif`);
  const render=(renderWidth,renderHeight,fps,colors) => run(ffmpeg,["-y","-v","error","-f","concat","-safe","0","-i",listPath,"-filter_complex",`[0:v]fps=${fps},scale=${renderWidth}:${renderHeight}:flags=lanczos,split[a][b];[a]palettegen=max_colors=${colors}:stats_mode=diff[p];[b][p]paletteuse=dither=bayer:bayer_scale=3`,"-loop","0",target],name);
  render(width,height,8,96);
  if((await stat(target)).size > 6*1024*1024) render(600,Math.round(height*600/width),8,64);
  if((await stat(target)).size > 6*1024*1024) throw new Error(`${name}.gif exceeds 6 MiB`);
};

try {
  await waitForServer();
  const manifest=[];
  for (const item of cases) {
    const target = join(output,`${item.name}.png`);
    captureImage(target,item.size,item.query,`capture ${item.name}`);
    const crop=await trimBottom(target);
    manifest.push({ name:`${item.name}.png`,...crop });
    console.log(`captured ${item.name}.png (${crop.rawHeight} -> ${crop.height}px)`);
  }
  manifest.sort((a,b) => a.name.localeCompare(b.name));
  await writeFile(join(output,"capture-manifest.json"),`${JSON.stringify({ version:1,paddingBottom:16,captures:manifest },null,2)}\n`,"utf8");

  for (const width of responsiveWidths) {
    const target=join(tempDirectory,`responsive-${width}.png`);
    captureImage(target,`${width+40},1400`,{ width:String(width),density:"standard",layout:"auto",language:"en",state:"charging" },`responsive ${width}`);
    if((await stat(target)).size < 1000) throw new Error(`Responsive render ${width}px is empty`);
  }
  const zoomTarget=join(tempDirectory,"zoom-200.png");
  const zoomParams=new URLSearchParams({ capture:"1",width:"400",density:"standard",layout:"auto",language:"de",state:"complete" });
  run(browser,["--headless=new","--disable-gpu","--hide-scrollbars","--run-all-compositor-stages-before-draw","--force-device-scale-factor=2","--virtual-time-budget=1800","--window-size=440,1400",`--screenshot=${zoomTarget}`,`${base}?${zoomParams}`],"zoom 200%");
  if((await stat(zoomTarget)).size < 1000) throw new Error("Zoom 200% render is empty");
  console.log(`validated responsive widths ${responsiveWidths.join(", ")} and zoom 200%`);

  const fromOutput=(name,duration=1.15) => ({ path:join(output,name),duration });
  await makeGif("trydan-card-tour",["density-xxl-dark.png","density-standard-dark.png","density-compact-dark.png","density-ultra_compact-dark.png","layout-split-dark.png","layout-inline-dark.png","editor-en-appearance.png","editor-es-content.png"].map((name) => fromOutput(name)));
  await makeGif("charger-states",states.map((state) => fromOutput(`state-${state}-dark.png`,1.15)));

  const vehicleStates=["disconnected","waiting_power","charging"];
  await makeGif("vehicle-connection-en",vehicleStates.map((state,index) => fromOutput(`state-${state}-dark.png`,[1.6,1.6,2.2][index])));
  const spanishFrames=[];
  for(let index=0;index<vehicleStates.length;index++) {
    const state=vehicleStates[index];
    const target=join(tempDirectory,`vehicle-es-${state}.png`);
    captureImage(target,"560,1300",{ density:"standard",theme:"dark",layout:"centered",language:"es",width:"520",state },`vehicle es ${state}`);
    await trimBottom(target);
    spanishFrames.push({ path:target,duration:[1.6,1.6,2.2][index] });
  }
  await makeGif("vehicle-connection-es",spanishFrames);

  run(ffmpeg,["-y","-v","error","-i",join(output,"layout-split-dark.png"),"-vf","scale=1280:640:force_original_aspect_ratio=decrease:flags=lanczos,pad=1280:640:(ow-iw)/2:(oh-ih)/2:color=0x101214","-frames:v","1",join(mediaOutput,"social-preview.png")],"social preview");
  console.log(`captured ${cases.length} images, 4 GIFs and social preview`);
} finally {
  if (process.platform === "win32" && server.pid) spawnSync("taskkill",["/pid",String(server.pid),"/t","/f"],{ stdio:"ignore" });
  else server.kill("SIGTERM");
  await rm(tempDirectory,{ recursive:true,force:true });
}