# Trip DNA: Final Round Plan
**Team Out of Bounds** · Thapar Japan Hackathon · Tourism & Culture · Problem statement by Hakuhodo
**Present by:** 10:00 AM, 25 Oct · **Format:** 4 min pitch (with live demo) + 2 min Q&A

---

## 1. What we walk in with
- **Pitch:** a 4-min story → live demo → business. Each slide answers one judge question.
- **App:** the existing Trip DNA prototype (base) + **2 features built in depth**. Not a full app.
- **Video:** 60–90 s film: the girl lost in Japan (grey) → the app → colour and sakura.
- **Proof:** deep competitor and market research, BMC with numbers, survey results.

## 2. Checkpoint 1 feedback: fix these first
| # | Judges said | Our answer | Where |
|---|---|---|---|
| 1 | Research competitors and market more | 10+ competitors with features, pricing and weaknesses; positioning map; TAM/SAM/SOM from JNTO data | WS3 |
| 2 | How does it *promote* tourism and cultural exchange? | **"Less worry, more culture."** Remove trip stress, then turn the freed time into **two-way** local experiences, and measure it | `00_story.md`, WS2 |

## 3. Scope: base + 2 deep features
| | What | Status |
|---|---|---|
| **Base** | Onboarding (language + UI style), home "What do you want to do?", explore map, SOS | Mostly exists; polish |
| **Deep feature 1: Trip DNA Planner** | AI itinerary from real Tokyo places → stress-test (delay/rain/closure) → domino map → minimal-change repair | Stress-test exists; add AI + scenarios |
| **Deep feature 2: Culture Exchange** | Culture companion at every stop + book local hosts (with student discount) + Culture Passport + two-way exchange meetups | New; answers feedback #2 |
| **Video / deck only** | Camera translation, guide booking, business/study sections, dashboards, ticketing | Shown as vision, not built |

## 4. Workstreams (you assign the owners)
| WS | Workstream | Bundles together | File | Owner |
|---|---|---|---|---|
| **WS1** | App: Base + Trip DNA Planner | data, AI itinerary, stress-test scenarios, onboarding, UI modes, SOS, deploy | `ws1_app_base_planner.md` | |
| **WS2** | App: Culture Exchange | culture companion, local host booking + discount, Culture Passport, exchange meetups, culture metric | `ws2_app_culture_exchange.md` | |
| **WS3** | Business & Research | competitors, market sizing, BMC, revenue + finance, survey, impact metrics | `ws3_business_research.md` | |
| **WS4** | Video | script, shoot, Japan footage, app screen recordings, edit | `ws4_video.md` | |
| **WS5** | Pitch & Delivery | deck update, 4-min script, demo script, Q&A bank, rehearsal, backups | `ws5_pitch.md` | |

> WS5 needs input from all the others; it's a natural fit for whoever finishes first, or it can be shared.

## 5. Timeline
| Time | Milestone |
|---|---|
| **19:45–20:15** | Kickoff: everyone reads `plan.md` + `00_story.md`; pick owners; repo branches; Gemini API key |
| **20:15–23:30** | **Sprint 1:** survey live by 20:45 · data JSON by 21:30 · video script locked by 21:00 |
| **23:30** | **Sync 1 (15 min):** show progress, cut scope if needed |
| **23:45–03:00** | **Sprint 2:** both deep features working · app screen recordings to WS4 by **02:00** · research + BMC final |
| **03:00–07:00** | Sleep (at least 3.5 h) |
| **07:00–08:30** | **Sprint 3:** polish · survey results into deck · video final · deck final |
| **08:30** | **Code freeze**, prod deploy, test on 2 phones |
| **08:30–09:30** | Rehearse ×3 with a timer · Q&A drill · offline backups |
| **09:45** | Ready: laptop charged, all files local, hotspot on |

## 6. Decisions (resolves the ⚠️ items in `Interview.md`)
- **Build on the existing prototype.** No rewrite, no separate mobile app. A responsive web app is enough.
- **AI:** Gemini free API through a Vercel serverless function; key kept in an env var. **Always** fall back to a pre-built itinerary.
- **The AI never invents places:** it picks only from our verified Tokyo places JSON (our anti-hallucination answer).
- **Maps:** Leaflet + OpenStreetMap (free, no key). Google Maps in the real version.
- **Data:** static JSON + localStorage. No backend database tonight.
- **Hosting:** Vercel now; Azure student credits later.
- **Location:** only while the app is in use; background location is opt-in for SOS/alerts.
- **Bookings & payments:** simulated and labelled "Sample". Real version: affiliate links first, then our own checkout; the partner pays commission on confirmed bookings.
- **Legal position:** a discovery and booking marketplace, not a travel agency. Partner/guide terms are out of scope for the build.
- **Languages:** EN / 日本語 / हिन्दी (exist). 한국어 / 中文 on onboarding + home only.
- **Markets:** India, China, Korea first · Tokyo → big cities → all of Japan.
- **Pricing:** core app free · Trip Pass ¥500–1,000 (7/14 days) · paid guides and meetups · partner commission or subscription · SOS always free.

## 7. Demo flow (about 75 s)
1. Onboarding → pick a language + **Vibrant / Simple** UI.
2. "Plan my Tokyo day" → AI itinerary from real places.
3. **Stress-test:** 40-min delay → domino effect → one-tap repair that keeps the must-dos.
4. At Senso-ji → **culture card** (etiquette) → book a **local tea ceremony host** with a **student discount**.
5. **Culture Passport** stamp → "3 h of your day was local culture".
6. (5 s) **SOS** button → 110/119 + share location.

## 8. Rules
- **Git:** one repo · a branch per workstream (`ws1-planner`, `ws2-culture`, `ws5-deck`) · PRs merged by the lead · pull before you push.
- **`main` always works.** After 08:30, bug fixes only.
- **Shared data** lives in `/data/*.json`. WS1 owns the schema; WS2 adds fields, never renames them.
- **Label anything fake** as "Sample". Never present invented numbers as real.
- **Stuck more than 30 min?** Tell the group, then cut it or mock it.
- **Spellings:** Trip DNA, Senso-ji, Mottainai, Chanoyu, Otoshidama.

## 9. Final deliverables
- [ ] Pitch deck `index.html`, works offline (video file local)
- [ ] Live app URL + local backup + screen recording of the demo flow
- [ ] Video: 60 s pitch cut + 90 s full cut (MP4, 1080p)
- [ ] `research.md`: competitors, market sizing, sources
- [ ] BMC with numbers, revenue model, cultural-exchange metrics
- [ ] Survey: response count + 3 key charts
- [ ] Q&A bank, rehearsed
