"""Re-letter story text baked into the panels (Japan's trains run on time, so panel 3 says "Departed", not "Delayed").

Reads the untouched originals from panels_orig/ (+ panels_hd_orig/) and writes panels/ and panels_hd/.
With --colour it also patches colour_src/p<n>.png so the edited spots get the right colour
(bubble paper stays white, the board label is red on white).
Run:  python retouch.py            (before colorize/build_panels)
      python retouch.py --colour   (after choosing colour_src)
"""
import os, shutil, sys
import numpy as np
from PIL import Image, ImageDraw, ImageFont
from scipy import ndimage

HERE = os.path.dirname(os.path.abspath(__file__))
FONT_BUBBLE = os.path.join(HERE, "fonts", "ComicNeue-BoldItalic.ttf")
FONT_SIGN = "C:/Windows/Fonts/arial.ttf" if os.path.exists("C:/Windows/Fonts/arial.ttf") else FONT_BUBBLE

# Coordinates are in HD space (Real-ESRGAN x4 of the 550x300 original).
EDITS = {
    3: {
        "bubble": {"seed": (990, 535), "centre": (985, 668), "lines": ["AND MY TRAIN", "DEPARTED", "ALREADY?!"],
                   "size": 53, "pitch": 74},
        "plate": {"box": (1848, 282, 2104, 370), "text": "Departed", "size": 58, "ink": (178, 22, 34)},
    }
}


def bubble_mask(grey, seed):
    """Interior of the speech bubble: the white region connected to `seed`, with the letters (holes) filled in."""
    paper = grey > 175
    lab, _ = ndimage.label(paper)
    region = lab == lab[seed[1], seed[0]]
    filled = ndimage.binary_fill_holes(region)
    return ndimage.binary_erosion(filled, iterations=6)      # keep well clear of the inked outline


def letter(img, e, scale=1.0, colour_pass=False):
    d = ImageDraw.Draw(img)
    b, p = e["bubble"], e["plate"]
    if not colour_pass:
        f = ImageFont.truetype(FONT_BUBBLE, round(b["size"] * scale))
        cx, cy = b["centre"][0] * scale, b["centre"][1] * scale
        n = len(b["lines"])
        for i, line in enumerate(b["lines"]):
            y = cy + (i - (n - 1) / 2) * b["pitch"] * scale
            d.text((cx, y), line, font=f, fill=(18, 18, 18), anchor="mm", stroke_width=max(1, round(0.7 * scale)), stroke_fill=(18, 18, 18))
    x0, y0, x1, y1 = [v * scale for v in p["box"]]
    d.rounded_rectangle((x0, y0, x1, y1), radius=4 * scale, fill=(246, 244, 240))
    f = ImageFont.truetype(FONT_SIGN, round(p["size"] * scale))
    d.text(((x0 + x1) / 2, (y0 + y1) / 2 + 2 * scale), p["text"], font=f, fill=p["ink"], anchor="mm")


def grey_pass():
    for src_dir, dst_dir, scale in (("panels_hd_orig", "panels_hd", 1.0), ("panels_orig", "panels", 0.25)):
        os.makedirs(os.path.join(HERE, src_dir), exist_ok=True)
        for n, e in EDITS.items():
            ext = "png" if "hd" in src_dir else "jpg"
            src, dst = os.path.join(HERE, src_dir, f"p{n}.{ext}"), os.path.join(HERE, dst_dir, f"p{n}.{ext}")
            if not os.path.exists(src):                       # first run: keep the untouched original
                shutil.copy(dst, src)
            img = Image.open(src).convert("RGB")
            hd = Image.open(os.path.join(HERE, "panels_hd_orig", f"p{n}.png")).convert("L")
            m = bubble_mask(np.asarray(hd), e["bubble"]["seed"])
            m = np.asarray(Image.fromarray(m).resize(img.size, Image.NEAREST))
            a = np.asarray(img).copy()
            a[m] = (250, 250, 248)
            img = Image.fromarray(a)
            letter(img, e, scale)
            img.save(dst, quality=95) if ext == "jpg" else img.save(dst)
            print("retouched", dst_dir, f"p{n}")


def colour_pass():
    for n, e in EDITS.items():
        path = os.path.join(HERE, "colour_src", f"p{n}.png")
        img = Image.open(path).convert("RGB")
        hd = Image.open(os.path.join(HERE, "panels_hd_orig", f"p{n}.png")).convert("L")
        scale = img.width / hd.width
        m = bubble_mask(np.asarray(hd), e["bubble"]["seed"])
        m = ndimage.binary_dilation(m, iterations=8)          # neutral paper right up to the outline
        m = np.asarray(Image.fromarray(m).resize(img.size, Image.NEAREST))
        a = np.asarray(img).copy()
        a[m] = (250, 250, 250)
        img = Image.fromarray(a)
        letter(img, e, scale, colour_pass=True)
        img.save(path)
        print("colour patched", path)


if __name__ == "__main__":
    colour_pass() if "--colour" in sys.argv else grey_pass()
