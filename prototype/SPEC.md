# Trip DNA · Prototype Spec (Part 1: the 60-second demo)

**Source brief:** `japan-tourism-prototype-prompt.md` (this folder)
**What this is:** one scripted, pre-planned walkthrough of the Trip DNA app, built to be shown live to judges.
It is **not** the full app. Every screen exists to make this one scenario look and feel real.

**Run it:** open `index.html` in Chrome (double-click works, no server needed). Works offline; Google Fonts load
when online and fall back to system Japanese fonts when offline.

---

## 1. Scenario (the one story we tell)

A first-time visitor lands at **Haneda Airport at 08:20**. They have a timed ticket for **Shibuya Sky at 14:00**
and a **ryokan in Hakone** tonight (kaiseki dinner at 20:30).

| Time | Stop | Travel to next |
|---|---|---|
| 09:00 | Exit Haneda T3: Suica + eSIM ready, the app reads signs aloud | Keikyu → Toei Asakusa Line, direct, 42 min, ¥610 |
| 10:00 | Freshen up at the Sato family homestay (Asakusa): shower, matcha, suitcase sent ahead to Hakone by *takkyubin* | walk 6 min |
| 10:50 | Walk around Senso-ji and Kaminarimon (monument) | walk 2 min |
| 11:40 | Nakamise-dori market: street snacks and souvenirs | walk 3 min |
| 12:15 | **Lunch: chosen in the food step** | walk 4 min + Ginza Line 32 min, ¥210 |
| 13:45 | Arrive at Shibuya Sky, 15 min early | |
| 14:00 | **Shibuya Sky (locked destination)** | walk 15 min |
| 15:30 | Harajuku: Takeshita-dori and Meiji Jingu | JR Yamanote Line, 4 min |
| 17:40 | Shinjuku: Omoide Yokocho, a quick yakitori bite | walk 8 min |
| 18:30 | **Romancecar to Hakone-Yumoto (missed in the disruption step)** | 85 min |
| 20:30 | Ryokan check-in, kaiseki dinner, onsen | |

All places, prices and timetables are labelled **Sample**.

---

## 2. Demo script (target 60 s)

| # | Sec | Presenter does | Screen shows |
|---|---|---|---|
| 1 | 0–3 | Clicks **English** on the language picker | Fuji splash with a cycling greeting → shoji doors slide open → dashboard, Itinerary active |
| 2 | 3–8 | Form is pre-filled (Airport · Haneda T3 · 08:20). Clicks **Pick on map** | Map panel focuses; "Shibuya" types itself into the search |
| 3 | 8–12 | Clicks **Shibuya Sky** → **Lock for 14:00** | Map flies to Shibuya, pin drops, red hanko stamp 決定 lands on the card |
| 4 | 12–15 | (Preferences are pre-filled.) Clicks **Weave my day** | DNA-helix loader with live status lines (~1.6 s) |
| 5 | 15–22 | Narrates | Timeline draws itself as a subway line, stops reveal one by one, route draws on the map |
| 6 | 22–30 | Clicks **Choose lunch** → **Ramen** → **Add to itinerary** → **Confirm booking** (pay at restaurant is pre-selected) | Restaurant cards slide in; booking sheet; lunch slot fills with booking code |
| 7 | 30–40 | Clicks the clock **⏩ 18:34** → **Show options** → picks **Next Romancecar** → **Rebook** | "Looks like you missed the 18:30 Romancecar" → Gantt comparison of 4 options vs the 20:30 dinner line → timeline updates live, missed train struck through, host notified |
| 8 | 40–50 | Clicks **Business**, then **Study** in the mode switch | Circular colour wipe; whole UI re-themes; "For you" cards, tagline, map pins and venue chips change |
| 9 | 50–60 | Opens **Tabi Feed** → **Post** (pre-filled) → taps the envelope; likes a post; taps **つながる** on a local | Post appears, otoshidama envelope opens into a ¥500 coupon, sakura burst; connect becomes つながった |

---

## 3. Screens and components

### 3.1 Language picker (splash)
- Illustrated Mount Fuji with a red sun, seigaiha waves, slow sakura petals.
- A greeting cycles: Welcome / ようこそ / स्वागत है / 환영합니다 / 欢迎 / Bienvenida.
- 6 tiles: English, 日本語, हिन्दी, 한국어, 中文, Español (native script large, English name small).
- Choosing a tile sets the UI language (navigation, headings, buttons; place content stays English + Japanese names)
  and plays the shoji-door transition.

### 3.2 Dashboard shell
- Top bar: logo, tabs (**Itinerary**, **Tabi Feed**), mode switch (**Leisure / Business / Study**), trip clock,
  language button (reopens the picker).
- Itinerary view = left column (form → loader → timeline) + right column (illustrated Tokyo map + "For you" rail).

### 3.3 Plan form (pre-filled in demo mode)
- Arrival type: Airport / Railway / Port / Highway bus.
- Landing location: Haneda Airport T3 (options per arrival type).
- Arrival time: 08:20.
- Must reach by: **Pick on map** → locked destination card with a hanko stamp.
- Preferences: interests (chips), pace (Relaxed / Balanced / Packed), budget slider (¥15,000), diet.
- **Why are you in Japan?** Leisure / Business / Study (the Part 2 switch; mirrored in the top bar).
- **Weave my day** (disabled until a destination is locked, with a hint saying so).

### 3.4 Map
- Hand-built SVG projected from real coordinates: Tokyo Bay, Sumida and Tama rivers, parks,
  Yamanote loop, area names in kanji, landmarks (Skytree, Tokyo Tower), off-map arrow to Hakone.
- Search box with suggestions (10 destinations). Selecting one flies the view there and drops a pin.
- After the plan is woven, the route draws in segments coloured by transit line, with numbered station pins.
- Mode layers: business pins (meeting rooms, meetups) and study pins (universities, labs).

### 3.5 Timeline (signature)
- A vertical subway line: each stop is a station marker (`TD 01`…), each leg is coloured by its real line
  (Keikyu, Toei Asakusa, Ginza, Yamanote, Odakyu) and walks are dotted.
- Header: day summary chips: arrival buffer before 14:00, budget used, culture time.
- Lunch slot starts as a dashed "Choose lunch" card.
- After ⏩, past stops dim with a check and a "now" marker sits at 18:34.

### 3.6 Food drawer
- Cuisine chips: Ramen, Sushi, Vegetarian, Tempura.
- 3–4 restaurant cards per cuisine: illustration, name + Japanese name, rating, price range, walking distance,
  tags, partner discount, **Add to itinerary**.
- Booking sheet: time slot, party size, payment (**Pay at restaurant** pre-selected, or Pay now −5%), **Confirm booking**.
- On confirm: the lunch slot fills (name, time, booking code, "Pay at restaurant").

### 3.7 Disruption
- Triggered by ⏩ 18:34 (app detects: "You're still 600 m from the platform") or by **I missed this train** on the 18:30 stop.
- Options sheet, time axis 18:30–21:30 with a red line at the 20:30 dinner:
  - **A. Next Romancecar 19:00** → ryokan 20:40 · +¥1,200 · 3 seats left · dinner moved to 20:45 (recommended)
  - **B. Rapid Express + change at Odawara** 18:42 → 20:50 · +¥0 · 1 transfer, may stand
  - **C. Highway bus from Busta Shinjuku** 19:05 → 21:10 · ¥2,330 · traffic risk, misses dinner
  - **D. Taxi** 18:40 → 21:00 · ¥36,000 · not worth it
- **Rebook** → the missed stop gets a MISSED stamp, the new train slides in, later times roll to new values,
  a toast confirms the host was notified.

### 3.8 Modes (Part 2)
| | Leisure (default) | Business | Study |
|---|---|---|---|
| Palette | washi cream, shu red, sumi ink | night indigo, gold | pale mint, matcha, sun yellow |
| Pattern | seigaiha waves | asanoha grid | shippo circles |
| Tagline | Less worry. More culture. | Less hassle. More handshakes. | Less confusion. More curiosity. |
| For you | tea ceremony host, kimono, kintsugi (Mottainai), Hina Matsuri | meetup tonight, meeting room ¥1,500/h, company visit, meishi etiquette, business numbers | UTokyo campus tour, MEXT scholarship session, gakuwari discounts, open lab, ikigai |
| Venue chips | culture tips | Wi-Fi · power · quiet | student price |

The switch runs a circular colour wipe from the clicked button.

### 3.9 Tabi Feed (Part 3)
- Left: coupon wallet, trending tags (#Mottainai #Chanoyu #HinaMatsuri).
- Centre: composer (pre-filled text + your lunch photo) and posts from tourists and locals, with like (heart burst),
  comment (expands, locals marked **Local**), and **つながる Tsunagaru** (connect) → つながった.
- Right: locals open to exchange (tea host, kintsugi host, kimono host) with their exchange offer.
- Posting → otoshidama envelope → tap → ¥500 coupon + sakura burst; wallet count goes up.

---

## 4. Demo controls
- **Plan form is a one-question-at-a-time wizard** (9 questions; answers fold into pills you can tap to edit).
- **Presenter mode: open `index_click.html`** (redirects to `index.html#click`). Each → / PageDown / Space / Enter / swipe
  performs the next of 30 scripted steps with a lifelike mouse pointer; ← / PageUp goes back one step (fast replay
  behind the shoji doors, ~1–4 s); R starts over. Steps live in `js/presenter.js` and also power Autoplay.

- Presenter dock (bottom-left, fades until hovered): **Reset**, **⏩ 18:34**, **Autoplay** (runs the whole script for screen recording).
- Keys: `R` reset · `T` jump to 18:34 · `1/2/3` Leisure/Business/Study · `F` feed · `I` itinerary · `A` autoplay.
- Reset returns to the language picker with all state cleared. No state persists across reloads on purpose.

## 5. Quality bar
- Optimised for 1366×768 to 1920×1080 laptops; stacks to one column under 900 px.
- No external images; all art is inline SVG. No network calls except fonts.
- Visible keyboard focus; `prefers-reduced-motion` turns off petals and long animations.
- Nothing can error mid-demo: every button is valid in every state or disabled with a reason.

## 6. Acceptance tests
1. Full script runs 3 times in a row (with Reset between) with no console errors.
2. Autoplay completes the whole script unattended.
3. Every language tile changes the UI chrome; reopening the picker works.
4. Each cuisine shows 3–4 cards; booking fills the lunch slot.
5. Each of the 4 disruption options updates the timeline correctly.
6. Mode switch works before and after the plan is woven, and back to Leisure.
7. Feed: post → envelope → coupon; like, comment, connect all respond.
8. Layout holds at 1366×768, 1920×1080 and 390×844.

## 7. Files
- `index.html`: structure · `css/style.css`: theme and components · `js/data.js`: all sample data + strings
- `js/art.js`: SVG illustrations and icons · `js/map.js`: Tokyo map · `js/app.js`: flow and state
