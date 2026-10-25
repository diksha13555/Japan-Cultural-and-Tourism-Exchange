# Trip DNA Film v2: Spec

**Deliverable:** `Part2-Video/TripDNA_Film.html`. One self-contained file (~5 MB) with images, audio and code
inlined, so it works offline on the pitch laptop. Optional backup: `TripDNA_Film.mp4` (run `build/export_mp4.py`).

## 1. Story and corrected script (≈ 62 s)

Every spoken line matches the manga speech bubble on screen (v1's lines didn't). Lines that are *not* in a
bubble get an on-screen subtitle.

| # | Scene (panel) | Colour | Audio | Spoken (✱ = exact bubble text) |
|---|---|---|---|---|
| 1 | Tokyo Station crowd | 0% (grey) | Ishikari Lore · crowd babble · station chime + Japanese PA (subtitled, untranslated) | ✱ "So many people... Where do I go?" |
| 2 | Signs she can't read | 0% | PA: 新幹線のりばは… | ✱ "I can't understand anything..." |
| 3 | Departure board: *Departed* (re-lettered, Japan's trains run on time) | 0% | low "shock" sting + camera shake | ✱ "Oh, and my train departed already?!" · "What do I do now?" |
| 4 | Phone: Trip DNA | 0 → 22%, **radial bloom from the phone** | sparkle; crowd fades; Kawai Kitsune enters *muffled* | ✱ "Wait... this could help!" · caption **"色 As the worry fades, Japan fills with colour."** |
| 5 | Language picker | 22 → 50% | earbud "pop" | ✱ "My language! Finally." · App 🎧: "Welcome to Japan. Let's find your way." |
| 6 | Platform 14 | 50 → 78% (first petals) | music opens up | App 🎧: "Your route is ready. Platform fourteen, in five minutes." · ✱ "I've got this!" |
| 7 | Night festival | 78 → 100% vibrant · lantern glows · petal flurry · white bloom | music at full, wind chimes | "Sugoi... Lanterns, sakura, takoyaki... This is the Japan I dreamed of!" · "Trip DNA. Less worry... more culture!" |
| 8 | End card | full theme | temple bell | TRIP DNA · Less worry. **More culture.** · 心配は少なく、文化はもっと。 · music credit |

Scene lengths are **computed from the real voice durations** (`mix.py`), so audio and picture can't drift.

## 2. Colour journey (requirement 1)
- Each panel is pre-baked once in full colour. **Luminance comes from the original manga** (Real-ESRGAN anime x4
  upscale) and only the **chroma** comes from the AI colourisation, so line art and sign text stay pixel-faithful.
- Grey = the same image under a *static* `grayscale(1)`. The colour level is just the opacity of the colour
  layer, a pure saturation fade from 0 → 100%, eased within each scene and continuous across cuts.
- The palette is matched to the deck and app theme: torii red `#D9123D`, sakura `#F4A6B8`/`#FF5B7E`, gold `#E8B33E`,
  leaf `#7DB765`, sky `#7FA8D8`, washi cream `#F2ECDD`, night ink `#231815`. `build_panels.py` prints each
  panel's hue spread and warns if one hue dominates.
- Reinforcing cues: a thin **colour meter** along the bottom fills from grey to the theme gradient; grain and vignette
  weaken as colour returns; the **music filter opens** in step with the colour (audio "colour fill").

## 3. Audio (requirement 2)
- **Voice:** Microsoft Edge neural TTS (free). The girl is `en-US-AnaNeural` (Microsoft's "Cartoon / Cute" voice),
  the app is `en-GB-SoniaNeural`, the PA is `ja-JP-Nanami/Keita`. **Upgrade:** Gemini TTS with a free API key
  (`gen_voice_gemini.py`; per-line emotion direction from `script.json`). See `instructions.md`.
- **Music** (CC BY 4.0, credited on the end card): *Ishikari Lore* (melancholic, grey half) → *Kawai Kitsune*
  (bright, playful), which enters low-passed at the app moment and opens up as the colour fills.
- **Mix:** voices compressed with a light room reverb; PA band-limited with a hall reverb; app voice "in-ear";
  music and ambience ducked under the dialogue; soft limiter at −1.5 dBFS; one 128 kbps MP3 master.
- **Ambience and SFX:** crowd babble built from Japanese neural voices; footsteps; station chime; shock sting;
  sparkles on the colour beats; earbud pop; whooshes; festival wind chimes; end bell.

## 4. Player (requirement 3)
- Poster with play button → click/Space starts the film, with sound.
- Control bar (auto-hides while playing): play/pause, restart, **scrubber with scene ticks** (drag to seek),
  time, mute, fullscreen.
- Click anywhere on the picture to toggle play/pause. Keys (when focused): Space/K, M, F, ←/→ on the scrubber.
- Pauses automatically if the film scrolls or slides out of view or the tab is hidden.

## 5. Performance (requirement 4)
- Per-frame work is **only `transform` and `opacity`** (GPU compositor). No animated filters, no SVG turbulence,
  no animated blend modes (v1's lag sources).
- Deterministic `render(t)` driven by the audio clock (smoothed), and styles are written only when they change.
- All images are decoded before the first frame; each scene is pre-rasterised 2.5 s before its cut.
- Petals: one canvas, 70 bezier petals, drawn only while visible.
- **Measured (Chrome, 1280×720):** ~165 fps average across scene cuts, p99 6.5 ms, worst 24.5 ms, **0 frames
  over 33 ms**.

## 6. Embedding in the combined pitch deck
- All CSS is scoped under `#tdnaFilm` with `tf-` class names; the JS is one IIFE. Either paste the `<div id="tdnaFilm">…</div>`,
  the `<style>` and the `<script>` into the deck, or use `<iframe src="TripDNA_Film.html">`.
- API: `TripDNAFilm.play() / pause() / toggle() / seek(sec) / renderAt(sec) / ready / duration`. Call
  `TripDNAFilm.pause()` when the deck leaves the slide (it also auto-pauses when out of view).
- Keyboard handling only applies while the film has focus, so the deck keeps its arrow keys.

## 7. Rebuild pipeline (`Part2-Video/build/`)
```
script.json ──► gen_voice_edge.py / gen_voice_gemini.py ──► voice*/      ─┐
music/*.mp3 ──────────────────────────────────────────────────────────────┼─► mix.py ──► out/master.mp3 + out/timeline.json ─┐
panels/ ─► Real-ESRGAN ─► panels_hd/ ─┐                                    │                                                  ├─► build_html.py ─► ../TripDNA_Film.html ─► export_mp4.py ─► ../TripDNA_Film.mp4
panels/ ─► colorize_sd.py (GPU) or Gemini app ─► colour_src/ ─► build_panels.py ─► assets/ ─────────────────────────────────────┘
```

## 8. Test log (final build)
- **Audio intelligibility:** Whisper (small.en) transcribed the final mix. Every English line was recognised at its timeline slot, and
  no English lines overlap. Found and fixed: "Finally" masked by the app voice (lines now chained); the tagline heard as
  "Let's worry" (re-voiced; the music dips −16 dB under it), now heard as "Trip DNA, less worry, more culture."
- **Colour:** grey 0–21 s → radial bloom from the phone at ~22 s → 22/50/78% → 100% at the festival. Hue spread per panel
  (no hue > 53%): every panel mixes red/sakura, cyan/sky and magenta, with no one-colour wash. Speech bubbles stay paper-white.
- **Performance (Chrome):** ~165 fps across scene cuts and the festival; worst frame 20–25 ms; 0 frames > 33 ms.
- **Bugs found and fixed in testing:** an init/seek race (a `ready` promise now guards it); hitches at the first appearance of a scene
  (2.5 s pre-rasterisation); subtitle pill stretching; a poster ghost in exported frames; the credit overlapping the controls.
- **Re-lettering:** panel 3's bubble and board were edited in the grey source (`retouch.py`), and the originals are kept in `panels_orig/`.
