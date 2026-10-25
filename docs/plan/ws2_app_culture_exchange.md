# WS2 · App: Culture Exchange (deep feature 2)
**Answers judge feedback #2:** *how does the app promote tourism and cultural exchange?*
**Needs:** WS1's `/data/places.json` schema (21:30) · **Feeds:** WS4 recordings (02:00), WS3 metric numbers

## Goal
- Show the full loop in the app: **understand → book a local host → experience → give back → measured.**

## 1. Culture data
- `/data/culture.json`: 12–15 traditions, each with `id, name, nameJa, what, whyItMatters, etiquette[], whereToExperience[placeIds], season`
  - Ikigai, Mottainai, Chanoyu, Hina Matsuri, Otoshidama, Kimono, Bonsai, Kintsugi, Omotenashi, onsen etiquette, Hanami, Shinto/Buddhist shrine manners, anime/tech
- `/data/hosts.json`: 6–8 **local hosts** (tea ceremony, kintsugi workshop, kimono rental, homestay dinner, craft shop, calligraphy)
  - `id, placeId, hostName, type, story, price, discountPct, languages[], slots[], exchangeOffer`

## 2. Culture companion (at every stop)
- On each itinerary stop: a "What it is · etiquette · what to notice" card (extend the existing cards)
- 3 Japanese phrases per stop with romaji + audio (`speechSynthesis`, ja-JP)
- "Nearby, more local" suggestion: a place outside the hotspot list (spreads tourism)

## 3. Book a local host (with discount)
- Host profile: story, photo placeholder, languages, price
- Book → slot → **Student / disability discount** toggle (price updates) → confirm → booking card with QR + "Sample booking: no payment taken"
- Bookings appear in the itinerary as pinned stops (so the stress-test protects them)

## 4. Culture Passport
- "I did this" on a culture card or host booking → red hanko-style stamp
- Passport page: stamps grid · counters: **culture hours**, **local ¥ spent**, **places outside the hotspots**
- Itinerary summary line: **"3 h of your day is local culture"**

## 5. Two-way exchange
- Each host has an `exchangeOffer` (e.g. "Share a recipe from home", "Teach 5 words of your language")
- "Exchange meetups" list: 3–4 sample events (language café, cooking night, festival volunteers)
- A small badge on the profile: "You shared: Hindi · Indian cooking"

## Done when
- [ ] Stop card → book host with discount → stamp → passport counters update, in under 30 s
- [ ] Works in EN/JA/HI · bookings survive a refresh · everything labelled "Sample"
- [ ] Passport counter screenshot sent to WS3/WS5 for the "we measure exchange" slide

## Prompts
**Culture + hosts data**
```
Create /data/culture.json with 14 Japanese traditions (Ikigai, Mottainai, Chanoyu, Hina Matsuri,
Otoshidama, Kimono, Bonsai, Kintsugi, Omotenashi, onsen etiquette, Hanami, shrine manners, temple
manners, anime & tech culture). Schema: {id, name, nameJa, what (1 sentence), whyItMatters (1 sentence),
etiquette[] (2–3 short tips), whereToExperience[] (placeIds from /data/places.json), season}. Then create
/data/hosts.json with 7 sample local hosts in Tokyo (tea ceremony, kintsugi workshop, kimono rental,
homestay dinner, craft shop, calligraphy, wagashi making): {id, placeId, hostName, type, story (2
sentences), priceYen, discountPct, languages[], slots[], exchangeOffer}. Be factually careful and
respectful; avoid stereotypes. JSON only.
```
**Host booking + passport**
```
In the Trip DNA app add: (1) a host profile sheet opened from culture cards and itinerary stops, using
/data/hosts.json; (2) booking: slot select, party size, a "Student / disability discount" toggle applying
discountPct, live price, Confirm → booking card with an inline-SVG QR and "Sample booking: no payment
taken"; save to localStorage and insert the booking into the itinerary as a pinned activity;
(3) a Culture Passport page: "I did this" buttons add red hanko-style SVG stamps (with the kanji); show
counters culture hours, local ¥ spent and places outside the top hotspots; (4) on the itinerary summary
show "X h of your day is local culture". Reuse the existing red/cream/ink style and i18n system (EN/JA/HI).
```
**Phrases + exchange**
```
For each itinerary stop add 3 useful Japanese phrases (kana + romaji + translation in the current UI
language) with a play button using speechSynthesis (lang ja-JP; fall back gracefully if no voice).
Add an "Exchange meetups" section with 4 sample events (language café, cooking night, festival volunteers,
calligraphy swap) and show each host's exchangeOffer on the profile. Label everything as sample data.
```
