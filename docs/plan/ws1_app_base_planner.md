# WS1 · App: Base + Trip DNA Planner (deep feature 1)
**Base code:** the existing Trip DNA prototype (live: `japan-cultural-and-tourism-exchange.vercel.app`, local copy `index_old.html`). **Extend it; don't rewrite.**
**Feeds:** WS2 (data schema), WS4 (screen recordings by 02:00), WS5 (final URL by 08:30)

## Goal
- A planner that feels real: **AI builds the day from real places → you break it → it repairs itself.**

## 1. Shared data (first, by 21:30; WS2 depends on it)
- `/data/places.json`: 30–40 real Tokyo places (Asakusa, Ueno, Shibuya, Harajuku, Akihabara, Shinjuku, Tsukishima)
  - Fields: `id, name, nameJa, area, lat, lng, category, tags[], diet[], priceLevel, openFrom, openTo, durationMin, outdoor, indoorAlt, access[], partner, discountPct, source`
  - Check opening hours on Google Maps → `"source": "Google Maps, checked 24 Oct"`
- `/data/fallback_itinerary.json`: one complete Tokyo day (the demo's safety net)

## 2. AI itinerary
- `api/itinerary.js` (Vercel function) · key in env var `GEMINI_API_KEY`
  - Input: onboarding answers (interests, diet, budget, pace, access, must-visits)
  - Send Gemini a **filtered place list** + the rule "use ONLY these ids", respect opening hours and pace buffers, include ≥ 1 culture slot, return JSON
  - Validate: drop unknown ids, fix overlaps · on error or after 7 s → return the fallback
- Front end: a "Plan my Tokyo day" button → "Building your Trip DNA…" → existing itinerary view

## 3. Deepen the stress-test (the USP)
- Scenarios: **40-min train delay** (exists) · **rain** (exists) · **place closed** (new) · **"I'm tired, slow down"** (new)
- Rain → swap outdoor stops for their `indoorAlt` · Closed → suggest the nearest same-category place
- Repair options A/B with clear trade-offs · show "changed 1 stop vs 4 if rebuilt" · pinned must-dos are never touched
- Before/after timeline view (exists) works with the AI itinerary

## 4. Base polish
- **Onboarding (≤ 3 screens):** language (EN/JA/HI + KO/ZH strings for onboarding + home) → age range → suggested UI style → trip questions (existing wizard)
- **UI styles:** `body.simple` (≥ 20 px text, 4 big buttons, less motion) · `body.cb` colourblind-safe palette + icons · header toggle, saved in localStorage
- **Home:** "What do you want to do?" cards (Eat · Go · Relax · Culture · Help)
- **SOS page:** `tel:110`, `tel:119`, share location (geolocation → Maps link → share/copy), Japanese phrase cards, disclaimer
- **Deploy** to Vercel · test on Chrome + one phone

## Done when
- [ ] Onboarding → AI plan → delay → repair runs 3× in a row with no errors
- [ ] The network-off fallback still gives a full day
- [ ] No API key in the repo · "Sample data" labels visible

## Prompts (Claude Code / Cursor, inside the prototype repo)
**Seed data**
```
Create /data/places.json with 35 real Tokyo tourist places across Asakusa, Ueno, Shibuya, Harajuku,
Akihabara, Shinjuku and Tsukishima. Schema: {id, name, nameJa, area, lat, lng, category
(culture|food|nature|pop|crafts|homestay|relax), tags[], diet[] (veg|vegan|jain|halal), priceLevel 1-3,
openFrom "HH:MM", openTo, durationMin, outdoor, indoorAlt (id of a nearby indoor place or null),
access[] (stepFree|seats|toilet), partner, discountPct, source}. Include temples, gardens, a tea
ceremony, craft workshops, veg/Jain-friendly food, quiet relax spots and an onsen. Mark 8 as partner:true
with discountPct 10–15. Only include places you're confident exist; I'll verify the hours. JSON only.
```
**Itinerary API**
```
Write api/itinerary.js as a Vercel serverless function (Node 18, no framework). POST {lang, interests,
diet, budget, pace, access, mustVisit, date}. Load /data/places.json, filter by diet/access/interests,
then call the Gemini API (env GEMINI_API_KEY, current free Flash model) asking it to use ONLY the given
ids, fit 08:30–20:00, respect openFrom/openTo, keep buffers (slow 30, balanced 20, packed 10 min),
include ≥1 culture|crafts|homestay stop, and return JSON {activities:[{placeId,start,end,travel,outdoor,
pinned}], notes}. Validate (drop unknown ids, fix overlaps, sort). On any error or after 7 s, return
/data/fallback_itinerary.json with fallback:true. Then wire a "Plan my Tokyo day" button in the
front end that posts the onboarding answers and renders the result in the existing itinerary view.
```
**Stress-test scenarios**
```
Extend the existing stress-test lab (analyze/simulate/repair functions) with two scenarios:
"closed" (a chosen stop is closed → suggest the nearest same-category place from places.json by lat/lng)
and "tired" (increase every buffer by 15 min and drop the lowest-priority unpinned stop). For rain, swap
outdoor stops for their indoorAlt. Each scenario must produce: domino nodes, a risk report with
assumptions + uncertainty (existing format), two repair options with trade-offs, and the counter
"changed N vs M if rebuilt". Pinned activities must never change. Add i18n keys for EN/JA/HI.
```
**Onboarding + UI styles**
```
Add a first-visit onboarding: (1) language EN/JA/HI (existing) + KO/ZH (onboarding + home strings only);
(2) age range → suggests "Vibrant" (16–30) or "Simple" (45+), user can override; (3) the existing plan
wizard. UI styles are body classes: .simple (min font 20px, max 4 big home buttons, reduced motion) and
.cb (colourblind-safe #0072B2/#E69F00/#111, icon next to every coloured status). A header toggle; persist
in localStorage inside try/catch. Keep the red/cream/ink theme and fonts.
```
