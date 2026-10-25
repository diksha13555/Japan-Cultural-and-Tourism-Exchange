# WS5 · Pitch & Delivery
**Needs:** WS3 numbers (02:00 draft, 07:30 final) · WS4 video (08:00) · WS1/WS2 live URL (08:30)
**Deck:** `index.html` (current 10-slide deck, red/cream/ink theme). Reference for cinematic feel: unifiersofjapan.framer.website

## 1. Deck changes
- [ ] **Cut to 8 slides** (4 min = about 30 s per slide):
  1. Hook: the video pitch cut (≤ 45 s) or the hero → "Less worry. More culture."
  2. Problem: planning overload + cultural disconnect · insight "stress kills curiosity" · **survey stat**
  3. Solution: Trip DNA = a guide, not a map · the 2 deep features
  4. **Live demo** (75 s): switch to the app
  5. **How we promote cultural exchange** (new): free time → culture → two-way → measured (passport counters screenshot)
  6. **Market + competitors** (new depth): TAM/SAM/SOM + positioning map
  7. Business model: revenue streams + unit economics + go-to-market (airlines, stations, Hakuhodo-style partners)
  8. What we built + roadmap + "Arigatō · Questions?"
- [ ] Embed the video as a local file (`<video src="video/pitch.mp4">`), not YouTube
- [ ] Update the "What we built" slide with real screenshots of both deep features
- [ ] Offline check: open with Wi-Fi off; fonts fall back cleanly; the video plays
- [ ] Clicker: arrow keys already move between slides

## 2. 4-minute script (split between speakers; each part rehearsed)
| Time | Part | Content |
|---|---|---|
| 0:00–0:40 | Hook | Video cut → "This is every first-time visitor to Japan." |
| 0:40–1:10 | Problem | 2 problems + insight + survey number |
| 1:10–1:25 | Solution | "A guide, not a map. Two things nobody else does." |
| 1:25–2:40 | Demo | Demo flow from `plan.md §7` |
| 2:40–3:10 | Exchange | Answer to feedback #2, with the passport numbers |
| 3:10–3:45 | Market + business | Positioning map → TAM/SAM/SOM → how we earn |
| 3:45–4:00 | Close | "Less worry. More culture. Arigatō." |

## 3. Demo safety
- [ ] Demo browser profile: logged in, onboarding reset, zoom 110%, notifications off
- [ ] Screen recording of the full demo as a backup (play it if the Wi-Fi dies)
- [ ] Hotspot ready · the app also runs from a local copy

## 4. Q&A bank (prepare a 20-second answer each)
- What's your USP / why not Google Maps + Klook? → stress-test + repair, plus culture in one guide
- How does it promote cultural exchange? → `00_story.md` 5-step answer + metrics
- How do you make money? → commission + Trip Pass + partners; unit economics
- Why would businesses join with no users? → start with affiliate links + sponsor partners (JAL, JETRO), free listings first, airline distribution
- AI hallucination? → it picks only from verified places; the fallback is pre-validated
- Is it legal to sell bookings in Japan? → marketplace model, not a travel agency; check the Travel Agency Act before packages
- Privacy? → location only while in use; APPI / DPDP / GDPR; no ID documents stored after verification
- How is this different from your Checkpoint 1? → added the cultural exchange loop + market research (show that we listened)
- What's built vs vision? → be honest: the 2 deep features work; translation and guides are roadmap

## 5. Rehearsal (08:30–09:30)
- [ ] 3 full runs with a timer; every run ≤ 4:00
- [ ] One Q&A drill: teammates fire 6 random questions
- [ ] Decide who answers which question type (business / tech / culture)

## Prompts
**Slide rewrite**
```
In index.html (Trip DNA pitch deck), restructure into 8 slides following plan/ws5_pitch.md §1. Keep the
existing red/cream/ink style, fonts, wipe transitions, notched frames and keyboard navigation. Add a new
slide "How we promote cultural exchange" (4 steps: free the time → aim it at culture → make it two-way →
measure it, plus a metrics row) and a "Market & competitors" slide with a TAM/SAM/SOM stack and a 2×2
positioning map (x: single-purpose ↔ all-in-one, y: logistics ↔ culture) drawn in inline SVG. Use the
numbers from plan/research.md only. Embed video/pitch.mp4 as a local video on slide 1.
```
**Q&A practice**
```
You are a hackathon judge from Hakuhodo (a creative/communications agency) judging a Tourism & Cultural
Exchange track. Here is our pitch summary: [paste 00_story.md]. Ask me 10 tough questions one at a time,
wait for my answer, then score it 1–5 and suggest a sharper 20-second answer.
```
