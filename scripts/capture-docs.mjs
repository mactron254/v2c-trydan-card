import { mkdir } from "node:fs/promises";
import { spawn, spawnSync } from "node:child_process";
import { join, resolve } from "node:path";

const port = 4178;
const base = `http://127.0.0.1:${port}/demo/index.html`;
const output = resolve("docs/screenshots/v041");
const browserCandidates = [
  process.env.EDGE_PATH,
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
].filter(Boolean);
const { existsSync } = await import("node:fs");
const browser = browserCandidates.find((candidate) => existsSync(candidate));
if (!browser) throw new Error("Edge/Chrome not found. Set EDGE_PATH.");

const cases = [
  ...["xxl","standard","compact","ultra_compact"].flatMap((density) => ["light","dark"].map((theme) => ({ name:`density-${density}-${theme}`, query:{ density,theme,layout:"centered",width:"520",state:"charging" }, size:"560,1400" }))),
  ...["auto","centered","split","inline"].map((layout) => ({ name:`layout-${layout}-dark`, query:{ density:"standard",theme:"dark",layout,width:"640",state:"charging" }, size:"680,1100" })),
  ...["es","en"].map((language) => ({ name:`editor-${language}`, query:{ view:"editor",language,theme:"dark",width:"720" }, size:"800,1400" })),
];

await mkdir(output,{ recursive:true });
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

try {
  await waitForServer();
  for (const item of cases) {
    const params = new URLSearchParams({ capture:"1",...item.query });
    const target = join(output,`${item.name}.png`);
    const result = spawnSync(browser,["--headless=new","--disable-gpu","--hide-scrollbars","--run-all-compositor-stages-before-draw","--virtual-time-budget=1800",`--window-size=${item.size}`,`--screenshot=${target}`,`${base}?${params}`],{ stdio:"pipe",encoding:"utf8" });
    if (result.status !== 0) throw new Error(`Capture failed for ${item.name}: ${result.stderr}`);
    console.log(`captured ${item.name}.png`);
  }
  console.log(`captured ${cases.length} documentation images`);
} finally {
  if (process.platform === "win32" && server.pid) spawnSync("taskkill",["/pid",String(server.pid),"/t","/f"],{ stdio:"ignore" });
  else server.kill("SIGTERM");
}