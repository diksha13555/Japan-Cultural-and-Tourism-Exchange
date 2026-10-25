"""OPTIONAL upgrade: regenerate the girl + app lines with Gemini TTS (free-tier API key is enough).

The Japanese station announcements are copied from ./voice (Edge TTS), since they are background texture.
Output goes to ./voice_gemini so the free version is never overwritten. Then:
    python mix.py voice_gemini && python build_html.py

Key:   set GEMINI_API_KEY (free from https://aistudio.google.com/apikey), or pass it as the first argument.
Model: override with GEMINI_TTS_MODEL if Google renames the preview model.
"""
import base64, json, os, shutil, subprocess, sys, time
import requests

sys.stdout.reconfigure(encoding="utf-8")
HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "voice_gemini")
KEY = (sys.argv[1] if len(sys.argv) > 1 else None) or os.environ.get("GEMINI_API_KEY")
MODELS = [os.environ["GEMINI_TTS_MODEL"]] if os.environ.get("GEMINI_TTS_MODEL") else \
    ["gemini-2.5-flash-preview-tts", "gemini-2.5-pro-preview-tts"]
URL = "https://generativelanguage.googleapis.com/v1beta/models/{m}:generateContent"


def tts(prompt, voice):
    body = {"contents": [{"parts": [{"text": prompt}]}],
            "generationConfig": {"responseModalities": ["AUDIO"],
                                 "speechConfig": {"voiceConfig": {"prebuiltVoiceConfig": {"voiceName": voice}}}}}
    last = None
    for m in MODELS:
        for attempt in range(6):
            r = requests.post(URL.format(m=m), params={"key": KEY}, json=body, timeout=120)
            if r.status_code == 429:                       # free tier is a few requests per minute
                wait = 25 + attempt * 10
                print(f"  rate-limited, waiting {wait}s"); time.sleep(wait); continue
            if r.status_code == 404:
                last = r.text; break                       # model renamed -> try the next one
            if not r.ok:
                raise SystemExit(f"Gemini error {r.status_code}: {r.text[:400]}")
            part = r.json()["candidates"][0]["content"]["parts"][0]["inlineData"]
            return base64.b64decode(part["data"])          # 16-bit PCM, 24 kHz, mono
    raise SystemExit(f"No TTS model worked. Last error: {last}")


def main():
    if not KEY:
        raise SystemExit("Set GEMINI_API_KEY or pass the key as an argument.")
    spec = json.load(open(os.path.join(HERE, "script.json"), encoding="utf-8"))
    os.makedirs(OUT, exist_ok=True)
    for s in spec["scenes"]:
        for n, ln in enumerate(s["lines"]):
            key = f"{s['id']}_{n}"
            dst = os.path.join(OUT, key + ".wav")
            v = spec["voices"][ln["who"]]
            if "gemini" not in v:                          # PA announcements: reuse the Edge take
                shutil.copy(os.path.join(HERE, "voice", key + ".wav"), dst); continue
            if os.path.exists(dst) and "--force" not in sys.argv:
                print("skip", key); continue
            prompt = (f"Voice: {v['direction']}. Emotion for this line: {ln.get('emotion', 'natural')}. "
                      f"Speak in English, natural pacing, no extra words. Say exactly:\n{ln['text']}")
            pcm = tts(prompt, v["gemini"])
            subprocess.run(["ffmpeg", "-v", "error", "-y", "-f", "s16le", "-ar", "24000", "-ac", "1", "-i", "-",
                            "-ar", "48000", dst], input=pcm, check=True)
            print("ok", key, ln["text"])
            time.sleep(7)
    print("\nNow run:  python mix.py voice_gemini  &&  python build_html.py")


main()
