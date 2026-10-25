"""Generate every spoken line in script.json with Microsoft Edge neural TTS (free, no key).

Output: build/voice/<scene>_<n>.wav (48 kHz mono). mix.py picks these up.
Run:  python gen_voice_edge.py
"""
import asyncio, json, os, subprocess, sys
sys.stdout.reconfigure(encoding="utf-8")
import edge_tts

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "voice")


async def one(text, v, path):
    mp3 = path[:-4] + ".mp3"
    for attempt in range(4):
        try:
            await edge_tts.Communicate(text, v["edge"], rate=v.get("rate", "+0%"), pitch=v.get("pitch", "+0Hz")).save(mp3)
            break
        except Exception as e:
            if attempt == 3:
                raise
            print("retry", os.path.basename(path), type(e).__name__)
            await asyncio.sleep(2 + attempt * 3)
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", mp3, "-ac", "1", "-ar", "48000", path], check=True)
    os.remove(mp3)


async def main():
    spec = json.load(open(os.path.join(HERE, "script.json"), encoding="utf-8"))
    os.makedirs(OUT, exist_ok=True)
    only = set(sys.argv[1:])
    for s in spec["scenes"]:
        for n, ln in enumerate(s["lines"]):
            key = f"{s['id']}_{n}"
            if only and key not in only:
                continue
            await one(ln["text"], spec["voices"][ln["who"]], os.path.join(OUT, key + ".wav"))
            print("ok", key, ln["text"])


asyncio.run(main())
