# Erzeugt die App-Icons: python3 app/make_icons.py
from pathlib import Path
from PIL import Image, ImageDraw

OUT = Path(__file__).parent / "icons"
BG, GRID, X, O = (15, 23, 42), (71, 85, 105), (56, 189, 248), (244, 114, 182)


def icon(size, pad_ratio):
    s = 1024
    img = Image.new("RGB", (s, s), BG)
    d = ImageDraw.Draw(img)
    pad = int(s * pad_ratio)
    cell = (s - 2 * pad) / 3
    w = int(cell * 0.09)
    for k in (1, 2):
        p = pad + k * cell
        d.line([(p, pad), (p, s - pad)], fill=GRID, width=w)
        d.line([(pad, p), (s - pad, p)], fill=GRID, width=w)

    def box(r, c, m=0.22):
        x0, y0 = pad + c * cell, pad + r * cell
        return x0 + cell * m, y0 + cell * m, x0 + cell * (1 - m), y0 + cell * (1 - m)

    for r, c in [(0, 0), (1, 1), (2, 2)]:
        a, b, e, f = box(r, c)
        d.line([(a, b), (e, f)], fill=X, width=int(w * 1.6))
        d.line([(a, f), (e, b)], fill=X, width=int(w * 1.6))
    for r, c in [(0, 2), (2, 0)]:
        d.ellipse(box(r, c), outline=O, width=int(w * 1.6))
    return img.resize((size, size), Image.LANCZOS)


OUT.mkdir(exist_ok=True)
icon(192, 0.1).save(OUT / "icon-192.png")
icon(512, 0.1).save(OUT / "icon-512.png")
icon(512, 0.2).save(OUT / "icon-maskable-512.png")
icon(180, 0.1).save(OUT / "apple-touch-icon.png")
