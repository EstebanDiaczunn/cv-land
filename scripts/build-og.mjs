/**
 * scripts/build-og.mjs
 *
 * One-shot rasterizer for the social card. Reads `public/og.svg` and writes
 * `public/og.png` at 1200×630 (the canonical OG / Twitter summary_large_image
 * size). The SVG is the source of truth — re-edit it and re-run this script.
 *
 *   node scripts/build-og.mjs
 *
 * Sharp is pulled in via the pnpm store path because it is not a direct
 * dependency of cv-land — it is hoisted from astro's own image pipeline.
 * If sharp ever falls out of the dep tree we add it as a devDependency.
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const srcSvg = join(root, "public", "og.svg");
const outPng = join(root, "public", "og.png");

if (!existsSync(srcSvg)) {
  console.error(`[og] source not found: ${srcSvg}`);
  process.exit(1);
}

// Resolve sharp wherever pnpm hoisted it.
const require = createRequire(import.meta.url);
let sharp;
try {
  sharp = require("sharp");
} catch {
  // pnpm hoists sharp under .pnpm/sharp@*/node_modules/sharp.
  const { globSync } = require("node:fs");
  const candidates = [
    join(root, "node_modules", ".pnpm"),
  ].flatMap((dir) => {
    try {
      return require("node:fs").readdirSync(dir)
        .filter((d) => d.startsWith("sharp@"))
        .map((d) => join(dir, d, "node_modules", "sharp"));
    } catch { return []; }
  });
  const found = candidates.find((p) => existsSync(p));
  if (!found) {
    console.error("[og] sharp not found; install it or run `pnpm install`");
    process.exit(1);
  }
  sharp = require(found);
}

const svg = readFileSync(srcSvg);

await sharp(svg, { density: 144 })
  .resize(1200, 630, { fit: "contain" })
  .png({ compressionLevel: 9, quality: 90 })
  .toFile(outPng);

const { size } = require("node:fs").statSync(outPng);
console.log(`[og] wrote ${outPng} (${(size / 1024).toFixed(1)} KB)`);
