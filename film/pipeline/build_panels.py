"""Turn the manga panels + their colourised versions into the film's image assets.

Inputs : panels_hd/p<n>.png    upscaled grey originals (Real-ESRGAN x4 anime; falls back to panels/p<n>.jpg)
         colour_src/p<n>.png   any colourised version of the same panel (Stable Diffusion, Gemini app, hand-painted...)
Output : assets/p<n>.webp      original line art & tones (luminance) + colour taken from colour_src (chroma only)
         assets/p<n>_bg.webp   tiny blurred copy used as the backdrop

Why chroma-only: AI colourisers redraw details (signs, text, faces drift). Keeping the original luminance means
the panel stays pixel-faithful to the manga and only gains colour, so grey -> colour is a pure saturation change.
"""
import os, sys
import numpy as np
from PIL import Image, ImageFilter, ImageEnhance

HERE = os.path.dirname(os.path.abspath(__file__))
MAXW = {7: 2400}          # the wide festival panel gets a little more resolution
VIBRANCE = {1: 1.25, 2: 1.25, 3: 1.25, 4: 1.3, 5: 1.35, 6: 1.35, 7: 1.45}


def load_grey(n):
    for p in (os.path.join(HERE, "panels_hd", f"p{n}.png"), os.path.join(HERE, "panels", f"p{n}.jpg")):
        if os.path.exists(p):
            return Image.open(p).convert("L")
    raise FileNotFoundError(f"panel {n}")


def build(n):
    grey = load_grey(n)
    w = min(grey.width, MAXW.get(n, 2000))
    grey = grey.resize((w, round(grey.height * w / grey.width)), Image.LANCZOS)
    src = Image.open(os.path.join(HERE, "colour_src", f"p{n}.png")).convert("RGB").resize(grey.size, Image.LANCZOS)
    # chroma from the colourised image, softened a touch so tiny misalignments don't fringe
    ycc = np.asarray(src.convert("YCbCr"), np.float32)
    cb = Image.fromarray(ycc[..., 1].astype(np.uint8)).filter(ImageFilter.GaussianBlur(1.2))
    cr = Image.fromarray(ycc[..., 2].astype(np.uint8)).filter(ImageFilter.GaussianBlur(1.2))
    k = VIBRANCE.get(n, 1.3)
    cb = np.clip((np.asarray(cb, np.float32) - 128) * k + 128, 0, 255)
    cr = np.clip((np.asarray(cr, np.float32) - 128) * k + 128, 0, 255)
    y = np.asarray(grey, np.float32)
    # paper stays paper: fade colour out on near-white (speech bubbles, sign plates)
    u = np.clip((y - 222) / 26, 0, 1); keep = 1 - u * u * (3 - 2 * u)
    cb = 128 + (cb - 128) * keep
    cr = 128 + (cr - 128) * keep
    # lift the deepest blacks very slightly so colour can live in the shadows, keep line art crisp
    y = np.clip(y * 0.97 + 6, 0, 255)
    out = Image.fromarray(np.stack([y, cb, cr], -1).astype(np.uint8), "YCbCr").convert("RGB")
    out = ImageEnhance.Contrast(out).enhance(1.04)
    os.makedirs(os.path.join(HERE, "assets"), exist_ok=True)
    out.save(os.path.join(HERE, "assets", f"p{n}.webp"), "WEBP", quality=84, method=6)
    bg = out.resize((240, round(240 * out.height / out.width)), Image.LANCZOS).filter(ImageFilter.GaussianBlur(6))
    bg.save(os.path.join(HERE, "assets", f"p{n}_bg.webp"), "WEBP", quality=70)
    # palette check: the colour must be spread across hues (no one-colour wash)
    hsv = np.asarray(out.convert("HSV"), np.float32)
    m = hsv[..., 1] > 60
    hist = np.bincount((hsv[..., 0][m] / 256 * 6).astype(int), minlength=6) / max(m.sum(), 1)
    names = ["red", "yellow", "green", "cyan", "blue", "magenta"]
    spread = " ".join(f"{k}:{v:.0%}" for k, v in zip(names, hist))
    warn = "  <-- one hue dominates" if hist.max() > .7 else ""
    print(f"p{n}: hues {spread}{warn}")
    print(f"p{n}: {out.size}  {os.path.getsize(os.path.join(HERE, 'assets', f'p{n}.webp')) // 1024} KB")


if __name__ == "__main__":
    for n in (map(int, sys.argv[1:]) if len(sys.argv) > 1 else range(1, 8)):
        build(n)
