#!/usr/bin/env node
/**
 * Generates PWA and favicon PNGs from public/icon.svg using sharp.
 * Writes: icon-192.png, icon-512.png, apple-touch-icon.png, favicon.png.
 * Then runs favicon-to-ico.mjs to produce favicon.ico.
 */
import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const publicDir = path.join(root, "public");
const svgPath = path.join(publicDir, "icon.svg");

if (!fs.existsSync(svgPath)) {
  console.error("public/icon.svg not found");
  process.exit(1);
}

const sizes = [
  { name: "icon-192.png", w: 192, h: 192 },
  { name: "icon-512.png", w: 512, h: 512 },
  { name: "apple-touch-icon.png", w: 180, h: 180 },
  { name: "favicon.png", w: 48, h: 48 },
];

const pipeline = sharp(svgPath);

for (const { name, w, h } of sizes) {
  const outPath = path.join(publicDir, name);
  await pipeline.clone().resize(w, h).png().toFile(outPath);
  console.log("Wrote", name);
}

// Run existing favicon-to-ico script to produce favicon.ico from favicon.png
try {
  execSync("node scripts/favicon-to-ico.mjs", { cwd: root, stdio: "inherit" });
} catch (e) {
  console.warn("favicon-to-ico.mjs failed (favicon.png was written):", e.message);
}
