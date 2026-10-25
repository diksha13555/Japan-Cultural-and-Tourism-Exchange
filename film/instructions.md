# Trip DNA Film: optional upgrades you can do with your Google account

The film (`TripDNA_Film.html`) is **already complete** and works offline. Everything below is optional polish
that uses **your** Google account. No paid credits are needed for either.

Everything lives in `Part2-Video/build/`. Run the commands from that folder (in a terminal: `cd D:\Japan_Hackathon_Final\Part2-Video\build`).

---

## Upgrade 1: a more emotional anime-girl voice with Gemini TTS (about 5 minutes)

**Will it work with a Jio Google Pro plan and no credits?** Yes. The Gemini API has a **free tier**, and
the text-to-speech preview models are included in it (a few requests per minute and a small daily limit;
the film needs 9 lines). Your Pro plan is not used or charged.

1. Open **https://aistudio.google.com/apikey** and sign in with your Google account.
2. Click **Create API key**, and choose *Create API key in new project* if it asks.
3. Copy the key (it starts with `AIza…`). Treat it like a password and never commit it to git.
4. In a terminal inside `Part2-Video/build`:
   ```powershell
   $env:GEMINI_API_KEY = "AIza...your key..."
   python gen_voice_gemini.py
   python mix.py voice_gemini
   python build_html.py
   ```
   *(Or just paste the key to Claude and ask it to run the upgrade.)*
5. Open `Part2-Video/TripDNA_Film.html` and listen. To go back to the free voice: `python mix.py` and then `python build_html.py`.

**What it does:** each line is sent with a voice direction and an emotion taken from `build/script.json`, e.g.
*"a young anime heroine on her first trip to Japan; light, bright, expressive" + "sudden panic, voice cracking upward"*.
The girl uses the Gemini voice **Leda** (youthful) and the app uses **Kore** (calm). To try other voices, change
`"gemini"` in `script.json` (for example `Aoede`, `Zephyr`, `Puck`, `Callirrhoe`), then delete `build/voice_gemini/` and run step 4 again.

**If it fails:**
- `429` means the per-minute limit. The script waits and retries automatically.
- `404` means Google renamed the model. Set `$env:GEMINI_TTS_MODEL = "<new model name from AI Studio>"` and run it again.

---

## Upgrade 2: hand-picked colour from Gemini (Nano Banana) in the Gemini app (about 10 minutes)

The panels are already colourised on your GPU. If you want even richer colour for any panel, use the Gemini
**app** (your Pro plan includes image editing):

1. Open **https://gemini.google.com** and choose the image model (🍌 *Create images*).
2. Upload a panel from `Part2-Video/build/panels/` (`p1.jpg` … `p7.jpg`).
3. Use this prompt:
   > Colorize this manga panel in vibrant, high-quality anime colors (like a modern anime key visual).
   > Keep every line, face, speech bubble and all the text exactly the same; only add color.
   > Girl: chestnut-brown hair, peach skin, cream hoodie, black backpack. Bright, cheerful, saturated palette.
4. Download the result and save it as `Part2-Video/build/colour_src/p<N>.png`, overwriting the old file
   (for example `p7.png` for the festival).
5. Run:
   ```powershell
   python build_panels.py 7      # the panel number(s) you replaced
   python build_html.py
   ```
   Only the **colour** of your image is used. The original line art and text are always kept, so it's fine if
   Gemini changes a small detail.

---

## Changing the script

Edit `build/script.json` (the words, timing offsets and emotions), then:
```powershell
python gen_voice_edge.py        # or gen_voice_gemini.py --force
python mix.py                   # or: python mix.py voice_gemini
python build_html.py
```
Scene lengths re-flow automatically to fit the new voice lines.

## Music credit (required, already shown on the end card)
"Ishikari Lore" and "Kawai Kitsune" by Kevin MacLeod (incompetech.com), licensed under CC BY 4.0.
