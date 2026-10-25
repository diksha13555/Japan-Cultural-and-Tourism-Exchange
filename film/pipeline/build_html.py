"""Assemble the self-contained film: film_template.html + assets + out/master.mp3 + out/timeline.json
-> ../TripDNA_Film.html  (single file, everything inlined, ready to drop into the pitch deck)
"""
import base64, json, os
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
DST = os.path.join(HERE, "..", "TripDNA_Film.html")

# warm light sources per panel, as [x%, y%, size%, colour] in panel space; they bloom only once colour returns
GLOWS = {
    4: [[35, 42, 34, "rgba(255,246,220,.75)"]],
    5: [[18, 30, 26, "rgba(255,225,240,.55)"]],
    6: [[71, 52, 20, "rgba(255,244,214,.9)"], [92, 46, 10, "rgba(255,230,180,.7)"]],
    7: [[6, 19, 13, "rgba(255,170,90,.85)"], [15, 37, 11, "rgba(255,170,90,.8)"], [20, 46, 9, "rgba(255,180,100,.75)"],
        [89, 19, 13, "rgba(255,170,90,.85)"], [83, 34, 9, "rgba(255,180,100,.75)"], [60, 25, 9, "rgba(255,200,140,.6)"],
        [57, 9, 7, "rgba(255,220,180,.5)"]],
}


def b64(path, mime):
    return f"data:{mime};base64," + base64.b64encode(open(path, "rb").read()).decode()


def main():
    tl = json.load(open(os.path.join(HERE, "out", "timeline.json"), encoding="utf-8"))
    panels = []
    for n in range(1, 8):
        p = os.path.join(HERE, "assets", f"p{n}.webp")
        w, h = Image.open(p).size
        panels.append({"src": b64(p, "image/webp"), "bg": b64(os.path.join(HERE, "assets", f"p{n}_bg.webp"), "image/webp"),
                       "w": w, "h": h, "glows": GLOWS.get(n, [])})
    data = {"timeline": tl, "panels": panels, "audio": b64(os.path.join(HERE, "out", "master.mp3"), "audio/mpeg")}
    html = open(os.path.join(HERE, "film_template.html"), encoding="utf-8").read()
    html = html.replace("/*__DATA__*/", "const FILM = " + json.dumps(data, ensure_ascii=False, separators=(",", ":")) + ";")
    open(DST, "w", encoding="utf-8").write(html)
    print(f"wrote {os.path.normpath(DST)}  ({os.path.getsize(DST) / 1e6:.2f} MB)")


if __name__ == "__main__":
    main()
