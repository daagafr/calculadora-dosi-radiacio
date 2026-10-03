"""Genera public/images/og.png (imatge per compartir a xarxes) a partir de tools/og-image.html.

Fa servir Chrome o Edge en mode sense finestra. Ús:  python tools/make-og-image.py
"""
import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
TEMPLATE = ROOT / "tools" / "og-image.html"
OUTPUT = ROOT / "public" / "images" / "og.png"

CANDIDATES = [
    r"C:\Program Files\Google\Chrome\Application\chrome.exe",
    r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
    "google-chrome",
    "chromium",
    "msedge",
]
browser = next((c for c in CANDIDATES if Path(c).exists() or shutil.which(c)), None)
if not browser:
    sys.exit("No he trobat Chrome ni Edge.")

subprocess.run(
    [
        browser,
        "--headless=new",
        "--disable-gpu",
        "--hide-scrollbars",
        "--force-device-scale-factor=1",
        "--window-size=1200,630",
        "--virtual-time-budget=3000",
        f"--screenshot={OUTPUT}",
        TEMPLATE.as_uri(),
    ],
    check=True,
    capture_output=True,
)
print(f"Imatge creada: {OUTPUT}")
