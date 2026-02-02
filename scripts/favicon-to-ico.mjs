#!/usr/bin/env node
/**
 * Converts public/favicon.png to ICO and writes to public/favicon.ico and dist/favicon.ico.
 * Removes light/white background by making those pixels transparent, then makes image square.
 */
import pngToIco from "png-to-ico";
import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const pngPath = path.join(root, "public", "favicon.png");
const publicIcoPath = path.join(root, "public", "favicon.ico");
const distIcoPath = path.join(root, "dist", "favicon.ico");

/** Threshold: pixels with R,G,B all >= this are treated as background and made transparent */
const LIGHT_THRESHOLD = 235;
/** Scale factor for the icon so it appears a bit larger in the favicon (e.g. 1.15 = 15% bigger) */
const ICON_SCALE = 1.15;

if (!fs.existsSync(pngPath)) {
  console.error("public/favicon.png not found");
  process.exit(1);
}

// Load image and get raw RGBA
const image = sharp(pngPath).ensureAlpha();
const { data, info } = await image
  .raw()
  .toBuffer({ resolveWithObject: true });

// Remove background: make light pixels (white/off-white/beige) transparent
const channels = info.channels;
for (let i = 0; i < data.length; i += channels) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  if (r >= LIGHT_THRESHOLD && g >= LIGHT_THRESHOLD && b >= LIGHT_THRESHOLD) {
    data[i + 3] = 0; // set alpha to 0
  }
}

// Rebuild image from modified pixels, scale up the icon, then make square with transparent padding
const rw = info.width;
const rh = info.height;
const scaledW = Math.round(rw * ICON_SCALE);
const scaledH = Math.round(rh * ICON_SCALE);
const transparent = { r: 0, g: 0, b: 0, alpha: 0 };

const squarePngBuffer = await sharp(data, {
  raw: { width: rw, height: rh, channels },
})
  .png()
  .resize(scaledW, scaledH, { fit: "fill" })
  .extend({
    top: Math.floor((Math.max(scaledW, scaledH) - scaledH) / 2),
    bottom: Math.ceil((Math.max(scaledW, scaledH) - scaledH) / 2),
    left: Math.floor((Math.max(scaledW, scaledH) - scaledW) / 2),
    right: Math.ceil((Math.max(scaledW, scaledH) - scaledW) / 2),
    background: transparent,
  })
  .png({ compressionLevel: 6 })
  .toBuffer();

const icoBuffer = await pngToIco(squarePngBuffer);
fs.writeFileSync(publicIcoPath, icoBuffer);
console.log("Wrote public/favicon.ico");

if (fs.existsSync(path.join(root, "dist"))) {
  fs.writeFileSync(distIcoPath, icoBuffer);
  console.log("Wrote dist/favicon.ico");
}
