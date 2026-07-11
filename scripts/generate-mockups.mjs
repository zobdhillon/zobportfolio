import { chromium } from "playwright";
import sharp from "sharp";
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const TMP = path.join(ROOT, "scripts", ".tmp-mockups");
const OUT = path.join(ROOT, "public", "images", "projects");

const CANVAS_W = 3200;
const CANVAS_H = 2000; // 16:10

const projects = [
  {
    id: "rehearse",
    url: "https://rehearse-ai.up.railway.app",
    bg: "#0f6e56",
    viewports: {
      laptop: { width: 1440, height: 900 },
      tablet: { width: 1024, height: 768 },
      phone: { width: 390, height: 844 },
    },
  },
  {
    id: "devlogs",
    url: "https://devlogs.42web.io",
    bg: "#1a2c4a",
    viewports: {
      laptop: { width: 1440, height: 900 },
      tablet: { width: 1024, height: 768 },
      phone: { width: 390, height: 844 },
    },
  },
  {
    id: "saba",
    url: "https://sabach.netlify.app/",
    bg: "#4a3c2c",
    viewports: {
      laptop: { width: 1440, height: 900 },
      tablet: { width: 1024, height: 768 },
      phone: { width: 390, height: 844 },
    },
  },
];

async function captureScreenshots(browser, project) {
  const dir = path.join(TMP, project.id);
  await mkdir(dir, { recursive: true });

  const shots = {};
  for (const [kind, vp] of Object.entries(project.viewports)) {
    const page = await browser.newPage();
    await page.setViewportSize({ width: vp.width, height: vp.height });
    try {
      await page.goto(project.url, { waitUntil: "networkidle", timeout: 90000 });
      await page.waitForTimeout(2500);
    } catch {
      await page.goto(project.url, { waitUntil: "domcontentloaded", timeout: 90000 });
      await page.waitForTimeout(4000);
    }
    const file = path.join(dir, `${kind}.png`);
    await page.screenshot({ path: file, fullPage: false });
    shots[kind] = file;
    await page.close();
  }
  return shots;
}

function compositionHtml(project, shotsBase64) {
  const { bg } = project;
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body {
    width: ${CANVAS_W}px;
    height: ${CANVAS_H}px;
    overflow: hidden;
    background: transparent;
    font-family: system-ui, sans-serif;
  }
  .stage {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    perspective: 2800px;
  }
  .vignette {
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 88% 78% at 50% 52%, ${bg} 0%, ${bg} 62%, transparent 100%);
    pointer-events: none;
    z-index: 0;
  }
  .cluster {
    position: relative;
    width: 2680px;
    height: 1680px;
    transform-style: preserve-3d;
    z-index: 1;
  }

  .device {
    position: absolute;
    transform-style: preserve-3d;
  }
  .shell {
    position: relative;
    background: linear-gradient(145deg, #2a2a2a 0%, #111 45%, #0a0a0a 100%);
    border: 1px solid rgba(255,255,255,0.06);
    box-shadow:
      0 40px 80px rgba(0,0,0,0.55),
      0 12px 24px rgba(0,0,0,0.35),
      inset 0 1px 0 rgba(255,255,255,0.08);
  }
  .screen {
    position: relative;
    overflow: hidden;
    background: #000;
  }
  .screen img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
  }
  .glass {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      125deg,
      rgba(255,255,255,0.14) 0%,
      rgba(255,255,255,0.04) 18%,
      transparent 42%,
      transparent 100%
    );
    pointer-events: none;
    z-index: 2;
  }
  .ao {
    position: absolute;
    inset: 0;
    box-shadow: inset 0 0 40px rgba(0,0,0,0.25);
    pointer-events: none;
    z-index: 3;
    border-radius: inherit;
  }

  /* Laptop — largest, back layer */
  .laptop {
    left: 80px;
    top: 120px;
    width: 1980px;
    z-index: 1;
    transform: rotateY(-12deg) rotateX(6deg) translateZ(-40px);
  }
  .laptop .shell {
    border-radius: 14px;
    padding: 6px 6px 22px;
  }
  .laptop .screen {
    border-radius: 8px;
    aspect-ratio: 1440 / 900;
  }
  .laptop .base {
    position: absolute;
    left: 8%;
    right: 8%;
    bottom: 4px;
    height: 10px;
    border-radius: 0 0 10px 10px;
    background: linear-gradient(180deg, #1c1c1c, #080808);
    box-shadow: 0 6px 18px rgba(0,0,0,0.4);
  }
  .laptop .hinge {
    position: absolute;
    left: 12%;
    right: 12%;
    bottom: 14px;
    height: 4px;
    border-radius: 2px;
    background: #050505;
  }

  /* Tablet — mid layer, behind-right */
  .tablet {
    left: 1280px;
    top: 520px;
    width: 920px;
    z-index: 2;
    transform: rotateY(-10deg) rotateX(4deg) translateZ(20px);
  }
  .tablet .shell {
    border-radius: 22px;
    padding: 8px;
  }
  .tablet .screen {
    border-radius: 16px;
    aspect-ratio: 1024 / 768;
  }

  /* Phone — frontmost, bottom-right */
  .phone {
    left: 1980px;
    top: 820px;
    width: 420px;
    z-index: 4;
    transform: rotateY(-8deg) rotateX(3deg) rotateZ(2deg) translateZ(80px);
  }
  .phone .shell {
    border-radius: 28px;
    padding: 7px;
  }
  .phone .screen {
    border-radius: 22px;
    aspect-ratio: 390 / 844;
  }
  .phone .island {
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    width: 88px;
    height: 22px;
    background: #000;
    border-radius: 14px;
    z-index: 5;
    box-shadow: 0 1px 2px rgba(0,0,0,0.6);
  }

  /* Ambient occlusion between overlapping devices */
  .tablet .shell::after,
  .phone .shell::after {
    content: "";
    position: absolute;
    inset: -2px;
    border-radius: inherit;
    box-shadow: -8px 0 24px rgba(0,0,0,0.35);
    pointer-events: none;
  }
</style>
</head>
<body>
  <div class="stage">
    <div class="vignette"></div>
    <div class="cluster">
      <div class="device laptop">
        <div class="shell">
          <div class="screen">
            <img src="data:image/png;base64,${shotsBase64.laptop}" alt="" />
            <div class="glass"></div>
            <div class="ao"></div>
          </div>
          <div class="hinge"></div>
          <div class="base"></div>
        </div>
      </div>

      <div class="device tablet">
        <div class="shell">
          <div class="screen">
            <img src="data:image/png;base64,${shotsBase64.tablet}" alt="" />
            <div class="glass"></div>
            <div class="ao"></div>
          </div>
        </div>
      </div>

      <div class="device phone">
        <div class="shell">
          <div class="screen">
            <img src="data:image/png;base64,${shotsBase64.phone}" alt="" />
            <div class="glass"></div>
            <div class="ao"></div>
          </div>
          <div class="island"></div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;
}

async function renderComposition(browser, project, shots) {
  const shotsBase64 = {};
  for (const [kind, file] of Object.entries(shots)) {
    const buf = await readFile(file);
    shotsBase64[kind] = buf.toString("base64");
  }

  const html = compositionHtml(project, shotsBase64);
  const htmlPath = path.join(TMP, project.id, "composition.html");
  await writeFile(htmlPath, html);

  const page = await browser.newPage();
  await page.setViewportSize({ width: CANVAS_W, height: CANVAS_H });
  await page.goto(`file://${htmlPath}`, { waitUntil: "load" });
  await page.waitForTimeout(500);

  const rawPath = path.join(TMP, project.id, "raw.png");
  await page.screenshot({
    path: rawPath,
    omitBackground: true,
    type: "png",
  });
  await page.close();
  return rawPath;
}

async function postProcess(rawPath, outPath, bg) {
  // Composite onto transparent canvas with soft edge fade for seamless #090909 placement
  const raw = sharp(rawPath);
  const { width, height } = await raw.metadata();

  const fadeMask = Buffer.from(
    `<svg width="${width}" height="${height}">
      <defs>
        <radialGradient id="g" cx="50%" cy="50%" r="72%">
          <stop offset="0%" stop-color="white" stop-opacity="1"/>
          <stop offset="78%" stop-color="white" stop-opacity="1"/>
          <stop offset="100%" stop-color="white" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#g)"/>
    </svg>`,
  );

  await sharp({
    create: {
      width,
      height,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([{ input: rawPath, blend: "over" }])
    .png()
    .toBuffer()
    .then((buf) =>
      sharp(buf)
        .composite([{ input: fadeMask, blend: "dest-in" }])
        .png({ compressionLevel: 6, quality: 95 })
        .toFile(outPath),
    );
}

async function main() {
  await mkdir(TMP, { recursive: true });
  await mkdir(OUT, { recursive: true });

  console.log("Launching browser…");
  const browser = await chromium.launch({ headless: true });

  for (const project of projects) {
    console.log(`\n▸ ${project.id}`);
    console.log("  Capturing live pages…");
    const shots = await captureScreenshots(browser, project);

    console.log("  Composing mockup…");
    const raw = await renderComposition(browser, project, shots);

    const outFile = path.join(OUT, `${project.id}-mockup.png`);
    console.log("  Post-processing…");
    await postProcess(raw, outFile, project.bg);
    console.log(`  ✓ ${outFile}`);
  }

  await browser.close();
  console.log("\nDone — mockups saved to public/images/projects/");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
