"""Builds Part 4 assets: the two manga panels (from the Part 2 video) and the QR code.
Run: python build_assets.py   (needs Pillow + qrcode)"""
import base64, io, re, sys
from pathlib import Path
from PIL import Image, ImageOps, ImageEnhance
import qrcode

HERE = Path(__file__).parent
VIDEO = HERE.parent / "Part2-Video" / "TripDNA_Video_Old.html"
QR_URL = "https://japan-cultural-and-tourism-exchange.vercel.app/"

src = VIDEO.read_text(encoding="utf-8")
uris = re.findall(r'"data:image/jpeg;base64,([^"]+)"', re.search(r"const IM=\[(.*?)\];", src, re.S).group(1))
img = lambda i: Image.open(io.BytesIO(base64.b64decode(uris[i - 1]))).convert("L")

def crop(im, box, w=420):
    im = im.crop(box)
    return im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)

# Before: frame 1, worried at Tokyo Station, kept grey
before = crop(img(1), (178, 0, 478, 370))
ImageEnhance.Contrast(before).enhance(1.05).convert("RGB").save(HERE / "assets/her-before.jpg", quality=80, optimize=True)

# After: frame 7, at the festival, gradient-mapped to the deck palette (ink -> shu red -> sakura -> gold -> cream)
after = crop(img(7), (205, 0, 580, 460))
def gmap(gray, stops):
    lut = []
    for v in range(256):
        t = v / 255
        for (a, ca), (b, cb) in zip(stops, stops[1:]):
            if a <= t <= b:
                k = (t - a) / (b - a)
                lut.append(tuple(round(ca[j] + (cb[j] - ca[j]) * k) for j in range(3)))
                break
    return Image.merge("RGB", [Image.eval(gray, lambda v, j=j: lut[v][j]) for j in range(3)])

warm = gmap(after, [(0, (40, 14, 30)), (.32, (150, 20, 58)), (.55, (232, 52, 88)), (.74, (255, 150, 170)), (.88, (255, 214, 160)), (1, (255, 251, 240))])
cool = gmap(after, [(0, (16, 18, 52)), (.35, (52, 50, 130)), (.58, (120, 96, 200)), (.76, (255, 140, 190)), (.9, (255, 220, 170)), (1, (255, 250, 236))])
# warm on her (face/kimono), cool night sky towards the edges
W, H = after.size
mask = Image.new("L", (W, H))
mask.putdata([max(0, min(255, round(255 * (1 - (((x - W * .5) / (W * .62)) ** 2 + ((y - H * .52) / (H * .72)) ** 2) ** .5 * 1.15)))) for y in range(H) for x in range(W)])
out = Image.composite(warm, cool, mask)
out = ImageEnhance.Color(out).enhance(1.12)
out.save(HERE / "assets/her-after.jpg", quality=82, optimize=True)

# QR code as one SVG path (crisp at any size, works offline)
q = qrcode.QRCode(error_correction=qrcode.constants.ERROR_CORRECT_M, border=0)
q.add_data(QR_URL); q.make(fit=True)
m = q.get_matrix(); n = len(m)
d = "".join(f"M{x} {y}h1v1h-1z" for y, row in enumerate(m) for x, on in enumerate(row) if on)
(HERE / "assets/qr.svg").write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {n} {n}" shape-rendering="crispEdges"><path d="{d}"/></svg>', encoding="utf-8")
print("ok", before.size, after.size, "qr", n, "modules")
