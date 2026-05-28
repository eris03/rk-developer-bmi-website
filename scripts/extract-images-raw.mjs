/**
 * Extract embedded FlateDecode images from PDF binary.
 * Run: node scripts/extract-images-raw.mjs
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { resolve } from "path";
import { inflateSync } from "zlib";
import { createCanvas } from "canvas";

const PDF_PATH = resolve("public/amenities-source.pdf");
const OUT_DIR  = resolve("public/amenities");
if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

const raw = readFileSync(PDF_PATH);
const text = raw.toString("latin1");

// ── find all obj blocks that contain /Subtype /Image ──────────────────────────
const OBJ_RE = /(\d+)\s+\d+\s+obj([\s\S]*?)endobj/g;
let m;
let saved = 0;

while ((m = OBJ_RE.exec(text)) !== null) {
  const objNum  = parseInt(m[1]);
  const objBody = m[2];

  if (!/\/Subtype\s*\/Image/.test(objBody)) continue;

  // Parse dictionary fields
  const widthM  = objBody.match(/\/Width\s+(\d+)/);
  const heightM = objBody.match(/\/Height\s+(\d+)/);
  const bpcM    = objBody.match(/\/BitsPerComponent\s+(\d+)/);
  const csM     = objBody.match(/\/ColorSpace\s*(?:\/(\w+)|\[([^\]]+)\])/);
  const lenM    = objBody.match(/\/Length\s+(\d+)/);

  if (!widthM || !heightM || !lenM) continue;

  const W   = parseInt(widthM[1]);
  const H   = parseInt(heightM[1]);
  const bpc = bpcM ? parseInt(bpcM[1]) : 8;
  const cs  = csM ? (csM[1] || csM[2] || "").trim() : "DeviceRGB";
  const len = parseInt(lenM[1]);

  // The filter must be FlateDecode for our approach
  if (!/FlateDecode/.test(objBody)) {
    console.log(`  obj ${objNum}: skipping (not FlateDecode)`);
    continue;
  }

  // Find "stream\r\n" or "stream\n" in the binary at this object's location
  const objStart = m.index;
  const streamTagOffset = raw.indexOf(Buffer.from("stream"), objStart);
  if (streamTagOffset === -1) { console.log(`  obj ${objNum}: no stream tag`); continue; }

  // Skip past "stream" + optional \r + \n
  let dataStart = streamTagOffset + 6;
  if (raw[dataStart] === 0x0D) dataStart++; // \r
  if (raw[dataStart] === 0x0A) dataStart++; // \n

  const compressedData = raw.slice(dataStart, dataStart + len);

  let pixels;
  try {
    pixels = inflateSync(compressedData);
  } catch (e) {
    console.warn(`  obj ${objNum}: inflate failed — ${e.message}`);
    continue;
  }

  // Build a canvas from raw pixel data
  const canvas = createCanvas(W, H);
  const ctx    = canvas.getContext("2d");
  const imgData = ctx.createImageData(W, H);

  const isGray = /Gray/.test(cs) || cs === "DeviceGray";
  const isCMYK = /CMYK/.test(cs) || cs === "DeviceCMYK";

  const expectedRGB = W * H * 3;
  const expectedGray = W * H;
  const expectedCMYK = W * H * 4;

  let ok = true;

  if (isGray && pixels.length >= expectedGray) {
    for (let i = 0; i < W * H; i++) {
      const g = pixels[i];
      imgData.data[i * 4 + 0] = g;
      imgData.data[i * 4 + 1] = g;
      imgData.data[i * 4 + 2] = g;
      imgData.data[i * 4 + 3] = 255;
    }
  } else if (isCMYK && pixels.length >= expectedCMYK) {
    for (let i = 0; i < W * H; i++) {
      const C = pixels[i * 4 + 0] / 255;
      const M = pixels[i * 4 + 1] / 255;
      const Y = pixels[i * 4 + 2] / 255;
      const K = pixels[i * 4 + 3] / 255;
      imgData.data[i * 4 + 0] = Math.round(255 * (1 - C) * (1 - K));
      imgData.data[i * 4 + 1] = Math.round(255 * (1 - M) * (1 - K));
      imgData.data[i * 4 + 2] = Math.round(255 * (1 - Y) * (1 - K));
      imgData.data[i * 4 + 3] = 255;
    }
  } else if (pixels.length >= expectedRGB) {
    // DeviceRGB or similar
    for (let i = 0; i < W * H; i++) {
      imgData.data[i * 4 + 0] = pixels[i * 3 + 0];
      imgData.data[i * 4 + 1] = pixels[i * 3 + 1];
      imgData.data[i * 4 + 2] = pixels[i * 3 + 2];
      imgData.data[i * 4 + 3] = 255;
    }
  } else {
    console.warn(`  obj ${objNum}: pixel buffer too small (${pixels.length} vs expected ~${expectedRGB} RGB). ColorSpace: ${cs}`);
    ok = false;
  }

  if (!ok) continue;

  ctx.putImageData(imgData, 0, 0);
  const buf = canvas.toBuffer("image/jpeg", { quality: 0.9 });
  const outName = `amenity-${String(++saved).padStart(2, "0")}-obj${objNum}-${W}x${H}.jpg`;
  writeFileSync(resolve(OUT_DIR, outName), buf);
  console.log(`  ✓  ${outName}  (${W}×${H}, ${cs}, ${(buf.length / 1024).toFixed(0)} KB)`);
}

if (saved === 0) {
  console.log("\nNo images extracted. Trying mask-less extraction...");
} else {
  console.log(`\n✔  Extracted ${saved} images → public/amenities/`);
}
