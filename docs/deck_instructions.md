# Final pitch deck: instructions

**Goal:** one scrollable, clickable pitch deck (`Final_Html/index.html`) that runs about 4:45. It merges every part we built: hero, film, problem, solution, live demo, cultural exchange, market, competition, business, and the Arigatō finale.

**Constraint:** the film (Part 2) is still being finished. The deck is **assembled by a build script** (`Final_Html/build.py`), so when the film changes you just rerun the script. Nothing gets hand-copied.

---

## Part A · For you (the human)

### If Claude Code finishes the job
1. When the film is final, run `python Final_Html/build.py`.
2. Open `Final_Html/index.html` in Chrome (double-clicking works, no server needed).
3. Rehearse with the keys below. Press **N** to see the speaker notes and timer.

### If Claude's tokens run out: hand the task to Antigravity CLI
1. Open a terminal in `D:\Japan_Hackathon_Final`.
2. Start the Antigravity CLI there, with the agent in a mode that can read, write and run files.
3. Paste **everything inside the "PROMPT" block in Part B** as your first message.
4. If Claude already started, tell the agent: *"`Final_Html/build.py` and the partial deck already exist. Read them first and continue from where they stop. Don't start over."*
5. When it says it's done, check it yourself:
   - Run `python Final_Html/build.py`. It should finish with no errors.
   - Open `Final_Html/index.html`. Press → through the whole deck: the film plays, the demo steps through all its beats, and the finale steps play.
   - Open DevTools (F12) → Console. It should show **0 red errors**.
   - Turn Wi-Fi off and reload. Everything should still work, with fonts falling back.
6. If something is broken, send the agent the exact symptom, e.g. *"On the demo slide, → does nothing after beat 12."*

### Presenter keys (in the finished deck)
| Key | What it does |
|---|---|
| → / Space / PageDown / clicker | plays the next step on this slide; if there are none left, goes to the next slide |
| ← / PageUp | previous slide (inside the demo: one beat back) |
| Home / End | first / last slide |
| N | speaker notes + per-slide target time + total timer |
| O or Esc | overview grid of all slides (click one to jump) |
| F | fullscreen |
| Q (last slide) | Q&A drawer |

---

## Part B · The prompt for Antigravity (paste everything inside the block)

````text
You are finishing the final pitch deck for Team "Out of Bounds" (Madhav Arora (lead), Diksha Mahajan,
Paridhi Thareja, Bhagya Vardhan) at the Thapar Japan Hackathon, Tourism & Cultural Exchange track
(problem statement by Hakuhodo). Product: TRIP DNA. Tagline: "Less worry. More culture."
Working directory: D:\Japan_Hackathon_Final (Windows; Chrome is the presentation browser).

## TASK
Build Final_Html/index.html: ONE scroll-and-click pitch deck, about 4:45 long, that merges the existing
parts SMOOTHLY into a single visual system. Most of the content is already built and polished, so your
job is to MERGE and lightly bridge it, not to redesign it. Quality bar: it is the face of the whole
project. Smooth transitions, no layout jumps, no console errors, works offline from file://.

Do it with a rerunnable build script, Final_Html/build.py (Python 3, stdlib only). It reads the
source files below and writes Final_Html/index.html + Final_Html/demo/. The film is still being
finalised, so rerunning the script must pick up the newest film automatically.
If build.py or index.html already exist, read them first and continue. Don't start over.

## READ FIRST (sources of truth; read these, skim the rest)
- plan/00_story.md                         story, positioning, words to use and avoid
- plan/ws5_pitch.md                        4-min script structure, Q&A
- Part1-Protoype_Itinerary/SPEC.md         the 60 s scripted demo (30 beats, presenter mode)
- Part2-Video/SPEC.md §6                   how to embed the film (scoped #tdnaFilm, API TripDNAFilm.*)
- Part4-Arigato/SPEC.md §6                 how to merge the finale (5 slides, step engine)
- Part3-BMC/ws_3/README.md, research.md §0, business_model.md §4–5, impact_metrics.md §2
- Part3-BMC/ws_3/ws3_slides.html           9 deck-ready business slides + "WS3 additions" CSS + script
- Japan-Cultural-and-Tourism-Exchange_git_NewContext/index_checkpoint1.html  original deck:
  hero scene (sky/sun/Fuji/torii/pagoda parallax, marquee, petals), problem story, root causes,
  "One app, three faces" UI modes. Reuse its hero + problem + idea markup and CSS.
Do NOT read the 4.9 MB Part2-Video/TripDNA_Film.html whole: line 158 is one 4.8 MB data line
(const FILM = {...}). Use grep, or read lines 1–157 and 159–end only.

## DESIGN SYSTEM (already shared by every part; keep it exactly)
- Colours: torii red #D9123D, washi cream #F2ECDD, sumi ink #231815, sakura #F4A6B8, pink #FF5B7E,
  gold #E8B33E, matcha #3F7A3A, indigo #1E3A5F.
- Fonts (Google Fonts, with fallbacks): Archivo Black (display, uppercase, tight tracking; add
  'Arial Black' fallback), DM Sans (body), Noto Sans JP, Shippori Mincho (kanji accents).
- Components: .sec.red/.cream/.ink full-height sections, .in (max 1060px), .kick eyebrow,
  .vl vertical side labels (English left, Japanese right), .fr notched frames (.n.tl/.tr/.br/.bl),
  .rv reveal-on-scroll, red #wipe transition between slides, fixed ink header + #cnt counter.
- Take the "Deck base" CSS/JS from Part4-Arigato/index.html (lines 16–57 and 579–616) as the
  deck's base. Then add, in this order, the WS3 additions CSS (ws3_slides.html lines 14–125, de-duplicated
  against the base), the checkpoint hero/problem/modes CSS, the film CSS (scoped), and the
  Part 4 additions CSS. Watch for clashes: ws3 and a4 both define a .tip tooltip, and ws3's
  `.big`/`.src` vs the a4 Q&A `.big`/`.src` (scope under .a4-qa). Prefix any new CSS with `d-`.
- The deck structure is 起承転結 (kishōtenketsu). The header nav shows four chapters:
  起 Problem · 承 Product · 転 Business · 結 Close. Each links to its first slide and highlights
  while you're inside it. A thin progress bar runs under the header.

## SLIDE ORDER + TIMING (target total ≈ 4:45; show the targets in the notes overlay)
| # | id | Chapter | Content (source) | Steps | Time |
|---|----|---------|------------------|-------|------|
| 1 | d-hero | 起 | Checkpoint hero scene. Title "Trip DNA", line "Less worry. More culture.", sub "Thapar Japan Hackathon · Tourism & Cultural Exchange · Hakuhodo", team "Out of Bounds", marquee. Greeting cycles in 6 languages (Welcome/ようこそ/स्वागत है/환영합니다/欢迎/Bienvenida). | 0 | 0:10 |
| 2 | d-film | 起 | The film, INLINED (see FILM). Kicker "起 · Meet her". 16:9 frame fitted to the viewport. | 1 (→ = play) | 1:05 |
| 3 | d-problem | 起 | "Getting to Japan is easy. Being in Japan isn't." Two root causes (Planning overload: 7+ apps, one delay breaks the day · Cultural disconnect: invisible etiquette, hidden local places). Insight: STRESS KILLS CURIOSITY. Evidence row: JTA exit survey: communication 15.2%, crowding 13.1%, transit 12.3% [S12] · 69.4% stay in 3 metro areas [S11] · experiences only 4.5% of spend [S4] · simulated survey (n=407, LABEL IT "simulated"): planning 75%, language 73%. Step 1: the 7 jittering app chips (Maps, Translator, Transit, Booking sites, Ticketing, Blogs, Spreadsheets) collapse into one red "Trip DNA" block. | 1 | 0:20 |
| 4 | d-solution | 承 | "A guide, not a map." Loop: Plan → Stress-test → Repair → Live the culture. 2 deep features (Trip DNA Planner, Culture Exchange). "For everyone" strip: 3 UI faces (Vibrant/Simple/Colourblind-safe, from the checkpoint .modes), 3 modes (Leisure "Less worry. More culture." / Business "Less hassle. More handshakes." / Study "Less confusion. More curiosity."), 6 languages, SOS always free, AI picks only verified places. | 0 | 0:12 |
| 5 | d-demo | 承 | LIVE DEMO in an iframe (see DEMO). Full-bleed frame under the header, a small "Live demo · Sample data" tag, beat progress "12 / 30", buttons Restart + Fullscreen. | 30 (beats) | 1:15 |
| 6 | s-impact | 承→転 | From ws3 "We measure cultural exchange". Add a tag "Checkpoint feedback #2: how do you promote exchange?" Chain: free the time → aim it at culture → make it two-way → spread it out → measure it. 6 metric tiles (labelled Pilot target). | 0 | 0:20 |
| 7 | s-market | 転 | MERGE ws3 s-market + s-size into one slide: 4 KPIs (42.7M, ¥9.45T, ¥229k, 60M target), spend bar chart (TAM highlighted), TAM ¥2.49T / SAM ¥565B (¥380B China-stress) / SOM ¥849M nest. Tag "Checkpoint feedback #1: research the market". | 0 | 0:15 |
| 8 | s-map | 転 | ws3 positioning map ("Alone in the top-right", 16 apps, hover gaps) + a "Show feature table" toggle that reveals the ws3 s-compete ✓/◐ table in place. | 0 | 0:12 |
| 9 | s-money | 転 | ws3 s-money (Y3 revenue chart ¥142.5M, unit economics, "Distribution decides it"), plus one line "Hosts keep ¥88 of every ¥100 (vs 65–80% on Klook/GYG)" and a "Business Model Canvas" button that opens the ws3 s-business BMC grid in a drawer/overlay. GTM phases 0–3 as a compact strip at the bottom. | 0 | 0:18 |
| 10–14 | a4-othello, a4-ikigai, a4-bonsai, a4-ask, a4-arigato | 結 | Part 4 finale, copied verbatim from Part4-Arigato/arigato.inline.html (images already inlined). Keep its step engine and Q&A drawer. | 1/5/0/1/0 | 0:40 |
Drop ws3's separate s-size, s-compete, s-business, s-gtm and s-survey slides (their content is folded in above).
Keep every source tag ([S#], [C#], [A#]) in small .src lines. Never present a modelled or simulated
number as real: keep "model", "simulated", "Pilot target" and "Sample" labels.

## ONE STEP ENGINE FOR THE WHOLE DECK
Generalise the Part 4 engine (Part4-Arigato/index.html lines 695–722 and 888–915) so EVERY slide can
have data-steps: while a step is pending, → / Space / PageDown play it instead of moving on (capture-phase
listener + stopImmediatePropagation); ← always goes back a slide (except in the demo, below). Entering
forward resets a slide; entering backward shows it finished. The film and the demo register custom
controllers in the same Map. Also add these keys: N (notes overlay: slide title, 2–3 line script, target
time, elapsed total vs 4:45, red when over), O/Esc (overview grid of all slides by chapter, click to jump),
F (fullscreen on document.documentElement). Mouse wheel/trackpad scrolling stays native. The header chapter
links and overview tiles use the same go(i) wipe transition. Respect prefers-reduced-motion.

## FILM (inline, no iframe, so key presses count as user activation for audio)
build.py reads Part2-Video/TripDNA_Film.html and extracts:
  (a) the <style> block, minus its first two rules (html,body{…} and body{display:grid…}),
  (b) the <div id="tdnaFilm"> … </div> markup (from line ~123 up to the line before "<script>"),
  (c) the whole <script> … </script> (it holds the 4.8 MB FILM data line; stream it, don't load it into a prompt).
Find these by markers, not fixed line numbers, because the film is still changing.
Override the size inside the deck: #d-film #tdnaFilm{width:min(100%,calc((100vh - 170px)*16/9));max-height:none;margin:0 auto}
Controller: steps=1, so the first → calls TripDNAFilm.play(). While it's playing, → pauses it and goes
to the next slide; Space toggles play/pause. leave() → TripDNAFilm.pause(). When it ends, show a pulsing
"→ continue" hint. The film's own keys only fire while it has focus. Keep that.

## DEMO (iframe + postMessage bridge; the prototype has global CSS, so it can't be inlined)
build.py copies Part1-Protoype_Itinerary/{index.html,css,js} into Final_Html/demo/ and appends ONE
bridge <script> to demo/index.html right after js/presenter.js. `Presenter` is a global const
(it exposes next(), back(), restart(), beats, index):
  - on message {tdna:'next'|'back'|'restart'} → Presenter.next()/back()/restart()
  - after every beat and on load, post {tdna:'state', idx:Presenter.index, total:Presenter.beats.length}
    to parent (poll every 250 ms, post only when it changes)
  - if the iframe itself has focus: Escape posts {tdna:'exit'}; → when idx===total posts {tdna:'nextSlide'};
    ← when idx===0 posts {tdna:'prevSlide'} (add a capture listener on window AFTER presenter.js)
Use postMessage(msg,'*') and check e.data.tdna. file:// iframes are cross-origin, so never touch contentWindow internals.
iframe: src="demo/index.html#click", loaded when the deck is within 1 slide of it (then kept), allow="fullscreen".
Deck controller: steps = total beats; → sends 'next' until idx===total, then the deck moves on;
← sends 'back' while idx>0 (Presenter.back() reloads the frame and replays, which is expected), else previous slide.
Keep focus on the deck (call window.focus() after clicks on the demo chrome). Restart button → 'restart'.
The demo is designed for ≥1366×768: give the iframe the full slide (100vw × (100vh − header − 44px chrome)).

## SMOOTHNESS CHECKLIST
- Slide-to-slide: the existing red wipe (#wipe) everywhere, plus .rv reveals. Use one easing per motion family.
- Colour rhythm: alternate red / cream / ink so neighbouring slides never share a background, except where a
  source slide's own colour requires it. Film slide = ink (#07070a frame).
- No horizontal scroll at 390, 1366 and 1920 widths; each slide fits one screen at 1366×768 (the a4 slides already do).
- Every font has a fallback; works with Wi-Fi off (the film and the demo are fully local).
- IDs must be unique across the merged file (ws3 uses #tip; Part 4 creates .a4-tip; the checkpoint uses #petals/#mq;
  rename collisions with the d- prefix).
- Lazy-start heavy things: start hero petals and the arigato greet interval only while visible.

## VERIFY (required before you say "done")
1. python Final_Html/build.py runs clean and prints the output size (should be ≈ 5.3 MB, plus demo/).
2. Headless or real Chrome: open Final_Html/index.html, press → through the WHOLE deck (film: play then skip;
   demo: all 30 beats; a4: all steps). Zero console errors. Check ← back across the demo and the finale.
3. Screenshots at 1366×768 and 1920×1080 of every slide; fix overflow or clipping.
4. Write Final_Html/README.md: how to run, keys, slide list with times, and how to rebuild after a film update.
Report what you verified, and anything you could not verify, plainly.
````

---

## Part C · Notes for whoever finishes this
- **Do not edit the source parts** (Part1–Part4). `build.py` copies and patches them into `Final_Html/`, so the originals stay safe.
- **The film is the largest file** (~4.9 MB, one data line). Never paste it into a chat. Let the script stream it.
- **Honesty labels** (Sample / simulated / model / Pilot target) are on purpose. The judges asked for rigour.
- **Live app QR** on the last slide points to `https://japan-cultural-and-tourism-exchange.vercel.app/`.
