"""
BMI Housing — Convert document images to PDF
============================================
Save your 5 document photos with these exact filenames in the same folder as this script,
then run:  python convert-docs-to-pdf.py

Required input filenames  →  Output PDF in public/documents/
─────────────────────────────────────────────────────────────
1_site_advance_receipt.jpg/.png   →  site-advance-receipt.pdf
2_booking_confirmation.jpg/.png   →  site-booking-confirmation.pdf
3_booking_receipt.jpg/.png        →  booking-receipt.pdf
4_terms_conditions.jpg/.png       →  terms-conditions.pdf
5_affidavit_estamp.jpg/.png       →  affidavit-estamp.pdf

Install dependency once:  pip install Pillow
"""

from pathlib import Path
from PIL import Image

# ── Config ──────────────────────────────────────────────────
SCRIPT_DIR  = Path(__file__).parent
OUTPUT_DIR  = SCRIPT_DIR.parent / "public" / "documents"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

# Map: list of input filenames (any matching one used) → output PDF name
DOCUMENT_MAP = [
    (["1_site_advance_receipt.jpg",  "1_site_advance_receipt.png"],  "site-advance-receipt.pdf"),
    (["2_booking_confirmation.jpg",  "2_booking_confirmation.png"],   "site-booking-confirmation.pdf"),
    (["3_booking_receipt.jpg",       "3_booking_receipt.png"],        "booking-receipt.pdf"),
    (["4_terms_conditions.jpg",      "4_terms_conditions.png"],       "terms-conditions.pdf"),
    (["5_affidavit_estamp.jpg",      "5_affidavit_estamp.png"],       "affidavit-estamp.pdf"),
]

# ── Conversion ──────────────────────────────────────────────
def to_pdf(input_path: Path, output_path: Path):
    img = Image.open(input_path).convert("RGB")
    img.save(output_path, "PDF", resolution=150)
    print(f"  Created: {output_path.name}")

converted = 0
for input_names, output_name in DOCUMENT_MAP:
    found = None
    for name in input_names:
        candidate = SCRIPT_DIR / name
        if candidate.exists():
            found = candidate
            break
    if found:
        to_pdf(found, OUTPUT_DIR / output_name)
        converted += 1
    else:
        print(f"  MISSING: {input_names[0]} (or .png variant) — skipped")

print(f"\nDone: {converted}/{len(DOCUMENT_MAP)} PDFs created in public/documents/")
