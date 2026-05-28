/**
 * Extract PDF pages as JPEG images using pdfjs-dist + node-canvas.
 * Run: node scripts/extract-amenity-images.mjs
 */
import { createCanvas } from "canvas";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { resolve } from "path";

// ── patch globalThis so pdfjs can create sub-canvases for transparency groups ──
globalThis.document = {
  createElement(tag) {
    if (tag === "canvas") return createCanvas(1, 1);
    return {};
  },
};

const pdfjsLib = await import("pdfjs-dist/legacy/build/pdf.mjs");

const PDF_PATH = resolve("public/amenities-source.pdf");
const OUT_DIR = resolve("public/amenities");

if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

class NodeCanvasFactory {
  create(width, height) {
    const canvas = createCanvas(width, height);
    return { canvas, context: canvas.getContext("2d") };
  }
  reset({ canvas }, width, height) {
    canvas.width = width;
    canvas.height = height;
  }
  destroy(obj) {
    obj.canvas.width = 0;
    obj.canvas.height = 0;
    obj.canvas = null;
    obj.context = null;
  }
}

const raw = readFileSync(PDF_PATH);
const data = new Uint8Array(raw.buffer, raw.byteOffset, raw.byteLength);

const loadingTask = pdfjsLib.getDocument({
  data,
  useSystemFonts: true,
  disableFontFace: true,
  isEvalSupported: false,
});
const pdfDoc = await loadingTask.promise;
const total = pdfDoc.numPages;
console.log(`PDF loaded — ${total} pages`);

const factory = new NodeCanvasFactory();
const SCALE = 1.8;

for (let p = 1; p <= total; p++) {
  try {
    const page = await pdfDoc.getPage(p);
    const vp = page.getViewport({ scale: SCALE });
    const { canvas, context } = factory.create(Math.ceil(vp.width), Math.ceil(vp.height));

    context.fillStyle = "#fff";
    context.fillRect(0, 0, canvas.width, canvas.height);

    await page.render({ canvasContext: context, viewport: vp, canvasFactory: factory }).promise;

    const buf = canvas.toBuffer("image/jpeg", { quality: 0.88 });
    const name = `amenity-${String(p).padStart(3, "0")}.jpg`;
    writeFileSync(resolve(OUT_DIR, name), buf);
    console.log(`  ✓ ${p}/${total}  →  ${name}  (${(buf.length / 1024).toFixed(0)} KB)`);
    page.cleanup();
  } catch (e) {
    console.warn(`  ✗ page ${p}: ${e.message}`);
  }
}

console.log("\n✔  Done — images saved to public/amenities/");
