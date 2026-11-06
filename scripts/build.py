"""Assemble the approved homepage; all other files are excluded from Netlify."""
import re
import shutil
from pathlib import Path

root = Path(__file__).resolve().parents[1]
out = root / "dist"
page_files = ("index.html", "center.css", "center.js")
assets = (
    "assets/brand/biomotion-horizontal-color.svg",
    "assets/brand/biomotion-horizontal-dark.svg",
    "assets/brand/biomotion-symbol.svg",
    "assets/baseball-center-hero-desktop-20261106.mp4",
    "assets/baseball-center-hero-desktop-poster-20261106.jpg",
    "assets/baseball-center-hero-mobile-20261106.mp4",
    "assets/baseball-center-hero-mobile-poster-20261106.jpg",
    "assets/coach-jo-measurement-20261106.mp4",
    "assets/coach-jo-lab-mound.jpg",
    "assets/prof-lee-3d-skeleton.jpg",
    "assets/facility-tour-ko-20261106.mp4",
    "assets/facility-interior-wide.jpg",
    "assets/pitch-3d-ko-20261106.mp4",
    "assets/pitch-3d-ko-poster.jpg",
    "assets/swing-3d-ko-20261106.mp4",
    "assets/swing-3d-ko-poster.jpg",
)
files = page_files + assets
for filename in files:
    candidate = root / filename
    if not candidate.is_file() or not candidate.stat().st_size:
        raise SystemExit(f"Missing or empty publish file: {filename}")
references = set()
for filename in page_files:
    references.update(re.findall(r"assets/[A-Za-z0-9_/.-]+\.(?:svg|jpg|png|mp4|webp|woff2)", (root / filename).read_text(encoding="utf-8")))
if references != set(assets):
    raise SystemExit(f"Publish asset mismatch: missing {sorted(references - set(assets))}; unused {sorted(set(assets) - references)}")
if out.exists():
    shutil.rmtree(out)
for filename in files:
    target = out / filename
    target.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(root / filename, target)
print(f"Prepared {len(files)} homepage files in dist/")
