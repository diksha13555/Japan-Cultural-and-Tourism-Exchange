"""Render TripDNA_Film.html to an MP4 (backup for the pitch laptop / USB).

Frame-exact: every frame is drawn with TripDNAFilm.renderAt(t) in real Chrome, then muxed with out/master.mp3.
Needs: pip install playwright   (uses your installed Google Chrome, no browser download)
Run:   python export_mp4.py [fps=30] [width=1920]
"""
import os, subprocess, sys, pathlib
from playwright.sync_api import sync_playwright

HERE = os.path.dirname(os.path.abspath(__file__))
FPS = int(sys.argv[1]) if len(sys.argv) > 1 else 30
W = int(sys.argv[2]) if len(sys.argv) > 2 else 1920
H = W * 9 // 16
SRC = pathlib.Path(HERE, "..", "TripDNA_Film.html").resolve().as_uri()
DST = os.path.join(HERE, "..", "TripDNA_Film.mp4")

with sync_playwright() as p:
    b = p.chromium.launch(channel="chrome", args=["--force-device-scale-factor=1", "--hide-scrollbars"])
    pg = b.new_page(viewport={"width": W, "height": H})
    pg.goto(SRC)
    pg.wait_for_function("window.TripDNAFilm && document.querySelector('.tf-loading').classList.contains('tf-off')", timeout=60000)
    pg.wait_for_timeout(1500)  # web fonts
    pg.add_style_tag(content="#tdnaFilm .tf-ui{display:none!important}")
    dur = pg.evaluate("TripDNAFilm.duration")
    n = int(dur * FPS)
    ff = subprocess.Popen(["ffmpeg", "-v", "error", "-y", "-f", "image2pipe", "-framerate", str(FPS), "-c:v", "mjpeg", "-i", "-",
                           "-i", os.path.join(HERE, "out", "master.mp3"), "-c:v", "libx264", "-preset", "slow", "-crf", "18",
                           "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "192k", "-shortest", "-movflags", "+faststart", DST],
                          stdin=subprocess.PIPE)
    for i in range(n):
        pg.evaluate(f"TripDNAFilm.renderAt({i / FPS:.4f})")  # async: evaluate awaits the promise
        ff.stdin.write(pg.screenshot(type="jpeg", quality=94))
        if i % (FPS * 5) == 0:
            print(f"{i / FPS:5.1f}s / {dur:.1f}s", flush=True)
    ff.stdin.close(); ff.wait(); b.close()
print("wrote", os.path.normpath(DST))
