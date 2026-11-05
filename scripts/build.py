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
    "assets/baseball-center-intro-20261106.mp4",
    "assets/baseball-center-intro-poster.jpg",
    "assets/coach-jo-measurement-20261106.mp4",
    "assets/coach-jo-lab-mound.jpg",
    "assets/prof-lee-3d-skeleton.jpg",
    "assets/facility-tour-20261106.mp4",
    "assets/facility-interior-wide.jpg",
    "assets/pitch-3d-orbit.mp4",
    "assets/pitch-3d-poster.jpg",
    "assets/swing-3d-orbit.mp4",
    "assets/swing-3d-poster.jpg",
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
