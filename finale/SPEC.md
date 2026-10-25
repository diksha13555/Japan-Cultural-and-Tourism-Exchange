# Part 4 · Arigatō (結 Ketsu): finale spec

**Files:** `index.html` (source, uses `assets/`) · `arigato.inline.html` (single offline file, built by `python build_inline.py`) · `build_assets.py` (re-crops the manga panels from the Part 2 video and regenerates the QR).
**Style:** the deck's own system (`.sec.red/.cream/.ink`, `.kick`, `.vl`, `.fr`, `.rv`, Archivo Black / DM Sans / Noto Sans JP + Shippori Mincho). Everything new is prefixed `a4-`.

## 1. Idea
The deck follows 起承転結 (kishōtenketsu): problem → product → business → **結 conclusion**. Each finale slide is built around one Japanese concept that does a job:

| # | Slide (`id`) | Concept | What it says | Steps |
|---|---|---|---|---|
| 1 | `a4-othello` (ink) | オセロ Othello | 23 black "worry" discs; place the Trip DNA piece → anime focus lines, discs flip into culture (Chanoyu, Kimono, Bonsai, Fuji, Hina Matsuri, Otoshidama, Ikigai, Mottainai, Anime, Shinkansen, Robots…). Her manga panel from the film flips grey → colour. "Stress kills curiosity" → **"Less worry. More culture."** | 1 |
| 2 | `a4-ikigai` (cream) | 生き甲斐 Ikigai | The whole pitch in one shape: love (film) · good at (demo, Mottainai = repair not rebuild) · Japan needs (market 69.4%, 4.5%) · pays (¥88 of ¥100, ¥142.5M Y3) → hanko stamp | 5 |
| 3 | `a4-bonsai` (ink) | 盆栽 Bonsai + 金継ぎ | Built tonight (5 green pads) vs blooming next (6 blossoms). Kintsugi seam on the pot. Auto-grows | 0 |
| 4 | `a4-ask` (red) | お年玉 Otoshidama | Envelope opens: "Not money. Three small yeses." 1 email (JAL) · 1 campaign (Hakuhodo) · 30 intros (JETRO) | 1 |
| 5 | `a4-arigato` (scene) | 一期一会 · Fuji ↔ Mount Abu · Hina dolls · QR | ARIGATŌ + thanks in 6 app languages, red thread India → Japan, team as dolls on one tier, live-app QR ("QR was invented in Japan"), **Q&A drawer** (`Q`) with 12 sourced answers for the 2-min Q&A | 0 |

## 2. Presenting (≈40 s, then the last slide stays up for Q&A)
- **→ / PageDown / Space / clicker:** plays the slide's next step; when there are no steps left it moves on. **←** always goes back a slide.
- Entering a slide forward resets it; going back shows it finished.
- Click the board or envelope to play steps with the mouse; hover a disc for its meaning.
- Last slide: **Q** opens "Ask us about…", **Esc** closes it; click the sky for a petal burst.
- Timing: Othello 8 s · Ikigai 15 s · Bonsai 6 s · Ask 7 s · Arigatō 4 s. If time is short, skip Bonsai.

## 3. Edit points (top of the Part 4 script)
`TEAM` (names + kimono colours; **confirm the 4th name**), `WORRIES`, `CULTURE`, `GREET`, `QA`. QR URL: `QR_URL` in `build_assets.py`.

## 4. Honesty
Numbers trace to `Part3-BMC/ws_3/research.md` and `model.py`; revenue is labelled "model". The survey answer in Q&A says "simulated".

## 5. Tested (headless Chrome, own profile)
1366×768, 1280×720, 1920×1080, 390×844 · Google Fonts blocked (offline) · reduced motion. Each slide is one screen at 1366×768 and 1920×1080, with no horizontal scroll. At 1280×720 Bonsai is 9 px taller than the screen (bottom padding only). Clicker keys, clicks, back/forward state and Q&A drawer were checked. No console errors (only the standalone page's missing favicon).

## 6. Merging into the combined deck
1. Copy the CSS between `/* ===== Part 4 · Arigatō (結) additions ===== */` and `</style>`.
2. Copy the five `<section class="sec … a4 …">` blocks (from `arigato.inline.html` so the images are inlined).
3. Copy the `<script>` block "Part 4 · Arigatō (結) script" and place it **after** the deck's own script.
4. Skip the "Deck base" CSS/script (the deck has them). Nav keys need no changes: the finale's capture-phase listener runs first and passes keys on when no step is pending.
5. Optional: add `'Arial Black'` after `'Archivo Black'` in the deck's `.h` rule for offline safety.
