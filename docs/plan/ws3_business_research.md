# WS3 · Business & Research
**Answers judge feedback #1:** *research competitors and the market more.*
**Feeds:** WS5 deck slides (draft by 02:00, final by 07:30) · **Output:** `research.md` + numbers for the deck

## 1. Survey (start first; it needs time to collect)
- Google Form, ≤ 10 questions, live by **20:45**; share in college, family and WhatsApp groups and Reddit (r/JapanTravel)
- Questions: been to / planning Japan? · biggest worry (language / planning / culture / safety / cost) · how many apps do you use · did a plan ever break · would you try local cultural experiences · would you pay for a Trip Pass (₹/¥ range) · preferred UI style · age range · home country
- **07:00:** freeze results → 3 charts (top worries, willingness to pay, interest in local culture) + response count

## 2. Competitor research (deep)
- 10+ apps: Google Maps · Google Translate/Lens · Japan Official Travel App (JNTO) · NAVITIME Japan Travel · Klook · GetYourGuide/Viator · Tripadvisor · Wanderlog · Airbnb Experiences · VoiceTra · Japan Travel by Rakuten/others you find
- For each: what it does · pricing/revenue model · scale (downloads/users, sourced) · **the gap we fill**
- Deck outputs: comparison table (✓/◐/—) + **positioning map** (x: single-purpose ↔ all-in-one, y: logistics ↔ culture), with Trip DNA alone in the top-right
- Rule: every claim has a source link in `research.md`

## 3. Market sizing
- From JNTO / Japan Tourism Agency (2024–2025): total visitors, spend, top origin countries (Korea, China, India growth), average spend per visitor
- **TAM:** all inbound visitor spend on activities, food and experiences · **SAM:** digital-planning travellers from India, China and Korea · **SOM:** realistic Year-3 share
- Show the math in one line per number; label assumptions

## 4. Business model
- BMC: finalise the 9 blocks (draft already in `index.html`); add the **cultural exchange** value for local hosts
- Revenue streams, ranked: booking commission (10–15%) · partner subscription / featured listings · Trip Pass ¥500–1,000 · guide and meetup fees · ads (airlines, brands)
- Unit economics (illustrative, labelled): CAC · ARPU per trip · LTV · take rate · break-even point
- Go-to-market: airlines (QR on boarding pass, welcome email) · station/airport QR posters · universities · Hakuhodo-style brand partnerships
- Sponsors as potential partners: JETRO · Japan Airlines · Mitsui & Co · Hakuhodo · ValueCreate · Geek Pictures India

## 5. Impact metrics (feedback #2, with WS2)
- Culture hours per trip · ¥ to local small businesses · % of visits outside the top-20 hotspots · host earnings · passport stamps

## Done when
- [ ] `research.md` with sources · competitor table + positioning map · TAM/SAM/SOM · BMC · revenue + unit economics · survey charts
- [ ] Every number in the deck traces back to a source or a labelled assumption

## Prompts
**Competitor research** (Claude / Gemini with web search)
```
Research the competitive landscape for an all-in-one Japan travel app for foreign tourists (itinerary
planning with disruption stress-testing, translation, navigation, bookings, cultural experiences, SOS).
For each of: Google Maps, Google Translate/Lens, JNTO Japan Official Travel App, NAVITIME Japan Travel,
Klook, GetYourGuide, Viator, Tripadvisor, Wanderlog, Airbnb Experiences, VoiceTra, plus 2–3 others you
find, give: core features, revenue model/pricing, scale (downloads/users with source and date), key
weakness for a first-time visitor to Japan, and whether it handles itinerary disruption or cultural
etiquette. Output a markdown table plus a source list. Mark anything you couldn't verify.
```
**Market sizing**
```
Using official JNTO and Japan Tourism Agency data (cite each figure with a link and year), give:
inbound visitors to Japan for 2024 and the latest 2025 figures, total inbound spend, spend per visitor,
visitor counts from South Korea, China and India with growth rates, and the share of spend on
entertainment/experiences/food. Then build a TAM/SAM/SOM for a tourist app that monetises via a 12%
booking commission and a ¥800 Trip Pass, targeting India, China and Korea. Show the formula and
assumptions for each step.
```
**BMC + unit economics**
```
Draft a Business Model Canvas (9 blocks, max 5 bullets each) for Trip DNA: an all-in-one Japan travel
guide that stress-tests itineraries and connects tourists with local cultural hosts. Revenue: 10–15%
booking commission, partner subscriptions, a ¥500–1,000 Trip Pass, guide/meetup fees, ads. Then give
illustrative unit economics (CAC, ARPU per trip, LTV, take rate, break-even users), clearly labelled as
assumptions, in a compact table suitable for one slide.
```
**Survey**
```
Write a 10-question Google Form survey (under 2 minutes) to validate: the biggest pain points for foreign
tourists in Japan (language, planning, culture, safety, cost), how often plans break, the number of apps
used, interest in local cultural experiences and hosts, willingness to pay for a 7/14-day Trip Pass, and
UI preference (vibrant vs simple). Use multiple choice/scales, with one optional open question. Include
age range and home country.
```
