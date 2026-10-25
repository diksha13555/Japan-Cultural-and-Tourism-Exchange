# WS3 Research: Trip DNA
**Team Out of Bounds · Thapar Japan Hackathon · researched 24 Oct 2026**
Answers judge feedback #1 (*research competitors and the market more*) and feeds #2 (*how do you promote tourism and cultural exchange?*).

**Rule:** every number below has a source tag **[S#] / [C#] / [B#]** (list at the bottom) or is an **assumption [A#]** from `model.py`. Anything we couldn't verify is marked **(unverified)**. To change an assumption, edit `model.py` and run `python model.py`; the files in `data/` regenerate.

---

## 0. The five things to say on stage
1. **Japan is the world's hottest inbound market:** 42.7M visitors in 2025 (+15.8%) spent **¥9.45 trillion** [S1, S3]. The government targets **60M and ¥15T by 2030** [S9].
2. **But the money and the people stay in the same places:** 69.4% of foreign guests stay in the three big metro areas [S11]. Only **4.5%** of spend goes on entertainment and experiences [S4]. Visitors buy beds and shopping, not culture.
3. **Competitors each solve one piece.** 16 apps reviewed. None stress-tests a plan, none measures cultural exchange, and the experience marketplaces take **20–35%** from local hosts [C5, C6, C7].
4. **Our wedge market is shifting:** Korea is #1 and still growing (+18.6% H1 2026); India is the fastest-growing at +35% [S8, S10]. China fell about 50% after the late-2025 travel advisory [S7, S8], so we stress-tested our own SAM for it (the slide shows both numbers).
5. **The business is a marketplace with honest maths:** SOM is ¥849M GMV and ¥143M revenue in Year 3 (0.15% of SAM). Break-even is at about 2% of focus-market trips, in Year 4–5 [A4–A19].

---

## 1. Market: official numbers

| Metric | Value | Source |
|---|---|---|
| Visitors 2025 | **42,683,600** (+15.8% vs 2024; about +10M vs 2019) | [S1] |
| Visitors 2024 | 36,869,900 (+47.1%) | [S2] |
| Visitors 2019 (pre-COVID) | ~31.9M | [S1] |
| Visitors Jan–Sep 2026 | 30,730,200 (−2.9% YoY; Sep −5%, second month down) | [S7] |
| Inbound spend 2025 | **¥9.4549T** (confirmed; +16.4%) | [S3] |
| Inbound spend 2024 | ¥8.1257T | [S3] |
| Spend per visitor 2025 | **¥228,782** | [S3] |
| 2030 government target | 60M visitors · ¥15T spend · ¥250k per visitor · 40M repeaters · 130M regional overnight stays | [S9] |

### Spend by category, 2025 (JTA preliminary, ¥9.4559T)
| Category | ¥ | Share |
|---|---|---|
| Accommodation | ¥3.4617T | 36.6% |
| Shopping | ¥2.5490T | 27.0% |
| **Food & drink** | **¥2.0711T** | **21.9%** |
| Transport | ¥0.9465T | 10.0% |
| **Entertainment & services** (tours, experiences, tickets) | **¥0.4218T** | **4.5%** |
Source: [S4]. **Insight for the pitch:** experiences are only 4.5% of spend. That small share is the cultural-exchange opportunity, and moving even one point of spend into local experiences is worth about ¥95B a year.

### Focus markets
| Market | Visitors 2025 | Growth vs 2024 | Total spend 2025 | Per visitor | 2026 trend |
|---|---|---|---|---|---|
| **South Korea** | 9,459,600 (#1) | +8.3% | ¥986.4B | ¥104,606 (short, frequent trips) | **+18.6% H1 2026; Sep +25.6%** [S7, S8] |
| **China** | 9,096,300 (#2) | +30.3% | ¥2,002.6B (#1 spender) | ¥246,154 | **−56.4% H1 2026** (government travel advisory) [S8] |
| **India** | 315,100 | **+35.2%** (fastest) | not published, see [A1] | not published | records continuing in 2026 [S7] |
| Taiwan (context) | 6,763,400 | +11.9% | ¥1,211.0B | — | +13% Sep 2026 |
| USA (context) | 3,306,800 | +21.4% | ¥1,124.1B | — | −3.2% Sep 2026 |
Sources: arrivals [S1, S5, S10]; spend [S6].

**What this means for us (business call):**
- **Korea first** for scale: biggest, growing, frequent repeat visitors (fits LTV). They also already use local super-apps (Naver/Papago) at home, so they will adopt a local-style app [C18].
- **India as the growth story** and our home advantage: +35%/yr, the team is Indian, and we have Hindi UI and Geek Pictures India as a partner.
- **China as upside, not the base case.** We keep it in the TAM but show a stress-tested SAM. This is the same "stress-test" thinking as our product, which judges will remember.

---

## 2. TAM / SAM / SOM (math in one line each)
Run `python model.py`; the output is in `data/math_lines.txt` and `data/market.json`.

| | Formula | Value |
|---|---|---|
| **TAM** | 2025 inbound spend on food & drink (¥2.07T) + entertainment & services (¥0.42T) [S4] | **¥2.49T** (≈ US$16.6B @ ¥150 [A20]) · incl. transport: ¥3.44T |
| Experience share | (2.0711 + 0.4218) / 9.4559 | 26.4% |
| SAM: Korea | ¥986.4B [S6] × 26.4% × 70% self-planning on a phone [A2] | ¥182.0B |
| SAM: China | ¥2,002.6B [S6] × 26.4% × 70% [A2] | ¥369.6B |
| SAM: India | 315,100 [S10] × ¥228,782 (national average, since India's figure isn't published [A1]) × 26.4% × 70% | ¥13.3B |
| **SAM** | sum | **¥565B** · China at −50% stress case [A3]: **¥380B** |
| SOM users (Y3) | 18.87M KR+CN+IN visitors × 1% penetration [A4] | 188,710 trip-users |
| **SOM GMV (Y3)** | 188,710 × 30% book in-app [A5] × ¥15,000 basket [A6] | **¥849M** = 0.15% of SAM |
| **SOM revenue (Y3)** | commission 12% [A7] + partner subs + Trip Pass + ads + guide/meetup fees | **¥142.5M** (≈ US$0.95M) |

**Assumptions to defend in Q&A:**
- **A2 (70% self-plan):** the JTA survey splits package vs individual arrangement, but we couldn't retrieve 2025 figures (unverified). Korea and India are heavily FIT; 70% is conservative for KR, generous for CN groups.
- **A4 (1%):** NAVITIME Japan Travel hit 1.7M MAU in March 2024, a month with about 3M arrivals [C4]. A single Japan-specific travel app can reach a large share of visitors (MAU includes pre-trip users), so 1% of three markets in Year 3 is modest.
- **A6 (¥15k basket):** about two experiences (tea ceremony ¥5–8k, workshop ¥6–10k). Check against live listings on byFood/Klook before the pitch if there's time.

---

## 3. Competitor landscape (16 reviewed)

**Legend:** ✓ core · ◐ partial · — none. Data file: `data/competitors.csv` (with map coordinates).

| | Nav | Translate | Itinerary | **Disruption repair** | Booking | Culture / etiquette | **Hosts + 2-way exchange** | SOS | UI modes | Verified-only AI | **Impact measured** |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Google Maps | ✓ | ◐ | ◐ | ◐ | ◐ | — | — | ◐ | ◐ | — | — |
| Google Translate/Lens | — | ✓ | — | — | — | — | — | — | — | — | — |
| JNTO Official App | ✓ | — | — | — | — | ◐ | — | ◐ | — | ✓ | — |
| NAVITIME Japan Travel | ✓ | ◐ | ◐ | ◐ | ◐ | ◐ | — | ◐ | — | ◐ | — |
| Klook | — | — | ◐ | — | ✓ | ◐ | ◐ | — | — | ◐ | — |
| GetYourGuide | — | — | — | — | ✓ | ◐ | ◐ | — | — | ◐ | — |
| Viator | — | — | — | — | ✓ | ◐ | ◐ | — | — | ◐ | — |
| Tripadvisor | ◐ | — | ◐ | — | ◐ | ◐ | — | — | — | — | — |
| Wanderlog | ◐ | — | ✓ | — | ◐ | — | — | — | — | — | — |
| Airbnb Experiences | — | — | — | — | ✓ | ◐ | ✓ | — | — | — | — |
| VoiceTra | — | ✓ | — | — | — | — | — | — | — | — | — |
| Safety tips (JTA) | — | — | — | — | — | — | — | ✓ | — | ✓ | — |
| Trip.com | — | ◐ | ◐ | — | ✓ | — | — | — | — | — | — |
| byFood | — | — | — | — | ✓ | ◐ | ✓ | — | — | ◐ | ◐ |
| MagicalTrip | — | — | — | — | ✓ | ✓ | ◐ | — | — | — | — |
| ChatGPT / Mindtrip / Layla | — | ◐ | ✓ | ◐ | ◐ | ◐ | — | — | — | — | — |
| **Trip DNA** | **✓** | **✓** | **✓** | **✓** | **✓** | **✓** | **✓** | **✓** | **✓** | **✓** | **✓** |
Ratings are from public feature lists, app-store pages and press, checked 24 Oct 2026. ◐ means the feature exists but is shallow or separate.

### One by one: what it does · money · scale · **the gap we fill**

1. **Google Maps**: maps, transit, reviews, live delays. *Money:* local ads + Maps API. *Scale:* **2B+ monthly users** (Alphabet Q3 2024 call) [C1]. **Gap:** it reroutes one journey, not your day. When a train is 40 min late it doesn't tell you to swap the tea ceremony and the shrine to keep both. It doesn't explain etiquette or connect you to hosts. *We use it as infrastructure in the real version, not as an enemy.*
2. **Google Translate / Lens**: text, voice and camera translation. *Money:* free, ecosystem. *Scale:* **1B+ monthly users**, ~250 languages (Google, Apr 2026) [C2]. **Gap:** it translates words, not meaning. It won't tell you not to tip, or how to bow at a shrine.
3. **Japan Official Travel App (JNTO)**: route search, articles, ATMs/Wi-Fi, safety alerts; EN/中文/한국어 [C3]. *Money:* free (government). *Scale:* not published (unverified). **Gap:** official information but no personal plan, no booking, no hosts. **Potential partner** (content + trust badge).
4. **NAVITIME Japan Travel**: transit-first travel app, travel plans, disaster info; METI award at the Japan Tourism Awards 2024. *Money:* freemium + ads + B2B. *Scale:* **1.7M MAU (Mar 2024)**; 2M+/month claimed in the 2026 media kit (vendor figure); 70% download before arrival [C4]. **Gap:** strongest local rival on logistics, but there's no whole-day repair and no culture/host loop. **Lesson:** most users install before arrival, which backs our airline channel.
5. **Klook**: tickets, passes, tours, eSIM; Asia's leader. *Money:* commission, **15–35% from suppliers** [C6]; implied take rate ≈ 16.7% ($417M revenue ÷ $2.5B GTV, 2024) [C5]. *Scale:* **11M transacting users; $541M revenue (LTM Sep 2025); NYSE IPO filed Nov 2025; still loss-making ($99M)** [C5]. **Gap:** a catalogue, not a plan. No disruption handling, no etiquette, no two-way exchange. **Lesson:** even a $500M marketplace isn't profitable yet, so our honest Year-4/5 break-even is normal.
6. **GetYourGuide**: global experience marketplace. *Money:* **20–30% supplier commission** (its own supplier page) [C7]. *Scale:* **40M+ monthly travellers; ~€1B revenue, adj. EBITDA-profitable (Oct 2025)** [C7]. **Gap:** western-first; a host keeps only €70–80 of every €100. Our 10–15% lets a Kyoto tea master keep ¥88 of every ¥100.
7. **Viator (Tripadvisor)**: tours/activities marketplace. *Money:* commission. *Scale:* **GBV $4.7B (2025); 22.9M bookings; Experiences segment revenue $924M** [C8]. Implied take rate ≈ 20% ($924M ÷ $4.7B, approximate because the segment includes Tripadvisor-branded experiences). **Gap:** same as GYG; one booking at a time, no live-trip help.
8. **Tripadvisor**: reviews + AI trip ideas. *Money:* ads, hotel meta, experiences. *Scale:* **1B+ reviews and contributions; $1.89B revenue 2025 (+3%)** [C9]. **Gap:** reviews are opinions about places, not a plan that survives the day.
9. **Wanderlog**: collaborative itinerary + map. *Money:* freemium, Pro from about **US$39.99/yr** (US App Store) [C10]. *Scale:* not published (unverified). **Gap:** a static plan that breaks on the first delay; not Japan-specific; no culture.
10. **Airbnb Experiences**: relaunched **May 2025 in 650 cities**, plus Services [C11]. *Money:* commission (rate not published, unverified). **Gap:** the closest to our host idea, but it sells one experience, not the trip. No etiquette, and no measurement of exchange.
11. **VoiceTra (NICT)**: government speech translation, **33 languages**, free; **8.2M downloads (Jun 2022, latest figure found)** [C12]. **Gap:** translation only, needs data. **Potential tech partner** (NICT licenses commercially).
12. **Safety tips (Japan Tourism Agency)**: quake/tsunami/heat alerts, hospitals for foreigners [C13]. *Money:* free. *Scale:* not published. **Gap:** it warns you but doesn't re-plan your day or call help in your language. **We'd integrate it**, not compete.
13. **Trip.com**: big OTA, dominant for Chinese travellers. *Money:* commission + ads. *Scale:* **RMB62.4B revenue 2025; ~20M inbound travellers served** [C14]. **Gap:** books logistics (flights, hotels, rail), not culture; no on-the-ground repair.
14. **byFood**: ~300 Japan food experiences; **¥1.34B Series B (Sep 2026)**; JTB invested [C15]. **Gap:** food only. **This proves investors fund Japan local-host marketplaces**, so they're a partner, not a threat.
15. **MagicalTrip**: Tokyo small-group local-guide tours [C16] (scale unverified). **Gap:** single tours; a supply partner for us.
16. **ChatGPT / Mindtrip / Layla (AI planners)**: chat-generated itineraries. A vendor-commissioned study says **54%** of travellers have used AI to plan [C17]. **Gap:** can invent places or opening hours, has no live data, no booking, no hosts. **Our answer:** the AI only picks from verified places, then stress-tests the plan.

**Home-market habits to respect** (not direct competitors): Koreans use Naver Map/Papago at home (56%/48% of foreign visitors to Korea use them, showing how strong local super-apps are) [C18]; Chinese travellers plan on Xiaohongshu and book on Trip.com (unverified for Japan specifically). **Implication:** we offer KR/CN UI and shareable itineraries (KakaoTalk/WeChat) instead of asking them to change habits.

### Positioning map
x = single-purpose → all-in-one · y = logistics → culture. Coordinates are in `data/competitors.csv`.
- **Top-left (culture, single-purpose):** Airbnb Experiences, byFood, MagicalTrip, GYG/Viator/Klook
- **Bottom-left (logistics, single-purpose):** Translate, VoiceTra, Safety tips
- **Bottom/centre-right (logistics, broader):** Google Maps, NAVITIME, Trip.com, JNTO app
- **Middle:** Tripadvisor, AI planners
- **Top-right (all-in-one AND culture):** **Trip DNA alone**

### "Everything verifiable in one place": our moat in one line
Others give you *parts*: a map, a translator, a ticket. Trip DNA gives you a **verified plan that survives reality**, with the meaning (etiquette), the people (hosts) and the proof (impact metrics) built in.

---

## 4. Problem evidence (official, not just our survey)
- **JTA 2024 survey of departing visitors:** top troubles were no public trash bins **21.9%**, communicating with staff **15.2%**, crowding **13.1%** (first time on the list), public transport confusion **12.3%** [S12]. *Language, crowding and transit are all in the top 4, and these are the jobs Trip DNA does.*
- **Concentration:** 69.4% of foreign guests stay in the three big metro areas (2024), up from 62.7% in 2019; regional share fell from 37.3% to 30.6% [S11]. The government now targets 130M regional overnight stays and 100 regions with overtourism measures by 2030 [S9].
- **Our survey** (see `google_form_format.md`) adds n, top worries, willingness to pay and interest in local culture at 07:00.

---

## 5. Benchmarks used in the business model
| Benchmark | Value | Source |
|---|---|---|
| Freemium → paid median conversion | 2.18% (hard paywall 12.11%) | [B1] |
| Facebook app-install CPI, global avg | rose from $7.10 (Jan) to $10.43 (Dec) over 2025; travel slightly below | [B2] |
| Remarketing share of travel-app conversions | >75% | [B3] |
| JAL international passengers | ~4.0M in Apr–Sep 2025 (+10.1%), so ~8M a year is a reachable airline channel | [B4] |
| Experience marketplace commissions | Klook 15–35% · GYG 20–30% · Viator ~20% implied | [C6, C7, C8] |
| Exchange rate | ¥1 ≈ ₹0.58–0.62 (Jul–Sep 2026) | [S13] |

---

## 6. Sources
**Market**
- [S1] JNTO 2025 arrivals via Travel Voice (EN): https://travelvoice.jp/english/international-arrivals-in-japan-exceeded-42-million-in-2025-10-million-more-than-2019 · Jiji/Nippon.com: https://www.nippon.com/en/news/yjj2026012101087
- [S2] JNTO December 2024 release (PDF): https://asset.japan.travel/image/upload/v1737079137/pdf/Number_of_visitor_arrivals_to_Japan_in_December_2024.pdf
- [S3] JTA 2025 confirmed consumption (¥9.4549T, ¥228,782/person) via Honichi: https://honichi.com/news/2026/01/21/inbound-consumption-202510-12/ · JTA release PDF (404 when fetched 24 Oct; listed in search): https://www.mlit.go.jp/kankocho/content/001992584.pdf
- [S4] 2025 category breakdown (JTA preliminary): https://kamotabiplus.jp/tourism/20260122-2/ · https://www.travelvoice.jp/20260122-159119
- [S5] 2025 arrivals by country: same as [S1] · Dec 2025 detail: https://en.hotelbank.jp/?p=1473
- [S6] 2025 spend by country: https://www.travelvoice.jp/20260122-159119 · https://www.nippon.com/en/news/yjj2026012101087
- [S7] JNTO Sep 2026 preliminary (Korea +25.6%, China −44.5%, Jan–Sep 30.73M): https://www.travelvoice.jp/20261021-160712
- [S8] H1 2026 China −56.4%, Korea +18.6%: https://travelmole.com/news/japan-tourism-resilient-despite-china · Aug 2026: https://www.travelvoice.jp/english/international-arrivals-in-japan-in-august-2026-were-down-9-6-to-3-1-million-despite-record-high-in-14-source-markets/print
- [S9] Tourism Nation Promotion Basic Plan FY2026–30 (60M / ¥15T / ¥250k per visitor / 40M repeaters / 130M regional stays / 100 regions overtourism): https://www.nippon.com/en/news/yjj2026032700357/ · https://www.travelvoice.jp/english/what-are-key-points-of-five-years-tourism-nation-promotion-basic-plan-a-goal-of-40-million-international-repeaters-is-included
- [S10] India 2025 (315,100, +35.2%): https://indiaoutbound.info/?p=211713 · https://skift.com/2025/06/25/indian-travel-to-japan-hits-record-highs-in-2025/
- [S11] Regional vs metro share of foreign guests (30.6% / 69.4%, 2024): https://www.travelvoice.jp/english/the-share-of-international-guests-in-local-regions-of-japan-rose-to-34-in-december-2024-higher-than-the-growth-in-urban-areas/print
- [S12] JTA 2024 visitor inconvenience survey: https://www.travelvoice.jp/english/international-visitors-to-japan-with-problems-in-long-time-waiting-for-immigration-increase-by-2-4-times
- [S13] FX: https://www.ofx.com/en-ca/exchange-rates/jpy-to-inr/ · https://www.bookmyforex.com/japanese-yen/rates/kukatpally

**Competitors**
- [C1] Google Maps 2B users: https://9to5google.com/2024/10/29/google-maps-2-billion/
- [C2] Google Translate 1B monthly, 20 years: https://interaksyon.philstar.com/trends-spotlights/2026/05/19/313658/google-translate-marks-20-years-processes-1-trillion-words-monthly/
- [C3] JNTO app launch & features: https://www.travelvoice.jp/english/jnto-releases-an-official-app-for-international-visitors-working-together-with-a-variety-of-private-sectors
- [C4] NAVITIME Japan Travel MAU / award: https://t-expo.jp/_shared/pdf/tej2024_the-japan-tourism-awards-2024-winners.pdf · media kit: https://media-radar.jp/company821.html
- [C5] Klook F-1: https://skift.com/2025/11/10/klook-ipo-global-travel-experiences-future/ · https://www.renaissancecapital.com/IPO-Center/News/114835/ · https://fortune.com/2025/11/11/asian-travel-platform-klook-is-filing-for-a-new-york-ipo/
- [C6] Klook supplier commission 15–35% (Bókun blog; not Klook-published): https://www.bokun.io/?p=7181
- [C7] GetYourGuide commission (own page): https://www.getyourguide.supply/join/how-much-does-getyourguide-charge · revenue/profitability: https://www.venturelab.swiss/GetYourGuide-reaches-profitability-and-nears-1-billion-in-revenue
- [C8] Viator GBV (Tripadvisor ARS, SEC): https://www.sec.gov/Archives/edgar/data/0001526520/000119312526197821/d62561dars.pdf · Q4 2025: https://www.phocuswire.com/tripadvisor-q4-2025-earnings
- [C9] Tripadvisor transparency report: https://www.hospitalitynet.org/news/4126305/tripadvisors-2025-transparency-report-reveals-strong-review-submissions-and-improved-fraud-detection
- [C10] Wanderlog App Store: https://apps.apple.com/us/app/wanderlog/id1476732439
- [C11] Airbnb Experiences relaunch: https://skift.com/2025/05/13/airbnb-relaunches-experiences-adds-hotel-style-services-latest-move-to-go-beyond-rentals/
- [C12] VoiceTra: https://voicetra.nict.go.jp/en/ · downloads: https://gov-online.go.jp/eng/publicity/book/hlj/html/201805/201805_09_en.html
- [C13] Safety tips: https://www.rcsc.co.jp/safety-tips-en
- [C14] Trip.com FY2025: https://seekingalpha.com/pr/20414395
- [C15] byFood Series B: https://thebridge.jp/en/2026/09/food-experience-platform-byfood-for-inbound-tourists-raises-%c2%a51-34-billion-in-series-b · https://www.byfood.com/aboutus
- [C16] MagicalTrip: https://platform.magpie.travel/things-to-do/companies/magicaltrip-inc
- [C17] AI trip planning (Mindtrip-commissioned): https://www.hotelmanagement.net/data-trends/mindtrip-travelers-are-two-years-ahead-travel-industry-ai
- [C18] Korean app usage (visitors to Korea): https://amp.kedglobal.com/newsAmp/ked202410020014

**Benchmarks**
- [B1] Adapty freemium conversion: https://adapty.io/blog/freemium-to-premium-conversion-techniques/
- [B2] Facebook CPI, travel: https://www.superads.ai/facebook-ads-costs/cost-per-app-install/recreation-and-travel
- [B3] AppsFlyer travel 2025: https://www.appsflyer.com/company/newsroom/pr/travel-app-growth-2025/
- [B4] JAL traffic (Aviation Wire): https://www.aviationwire.jp/?p=332951

---

---

## 8. Survey: simulated responses (n = 407)
- The survey dataset is **simulated**: 407 responses generated from the response distributions in `../form-config.json`, modelling our expected audience (98.8% India, 62% aged 24 or under, 10% visited or planning Japan). Counts are in `data/survey_simulated.json`, charts in `survey.html` tab 5, and the deck slide in `ws3_slides.html` (titled "Simulated survey").
- **How to present it:** always say "simulated". It shows our method: the questions, how each one maps to a claim, and how we'd read the result. For real-world problem evidence, use the JTA exit survey [S12].
- **Simulated headlines:** planning/too many apps 75% and language 73% are the top worries · 97% rate local-host culture 4–5 · 94% would share their own culture · 67% would pay for a Trip Pass (the ¥500–1,000/7-day and ¥1,000–1,500/14-day bands are about 21–22% each) · 70% say plans break a few times per trip or more · 47% would book experiences in-app · 66% prefer the Vibrant UI · 56% take 5–7 day trips.
- **Model link:** the simulated results are consistent with A5 (30% book in-app, vs 47% prefer it) and A8/A9 (5% Trip Pass conversion at ¥800, vs 67% stated interest). Assumptions are unchanged, since simulated data doesn't validate them.
- **Note for the real run:** add "select at most 3" validation (Q5/Q10) and the Q1 branch. `survey.html` → Results screens real CSVs for these.

## 9. Checks for Q&A
### Is the ¥15,000 booking basket [A6] realistic? Yes, it's conservative.
| Experience (Tokyo) | Price per person | Source |
|---|---|---|
| Tea ceremony (45–60 min, hands-on) | ¥3,500–6,000 typical; small-group from ¥8,000 | [P1, P2] |
| Kintsugi workshop (90 min) | ¥12,500–16,500 | [P3] |
| Cooking class | ¥8,500–12,000 (sushi ¥12,000); booking platforms US$63–189 | [P4] |
**Two experiences ≈ ¥14,500–21,000** (e.g. tea ¥4,500 + cooking ¥10,000 = ¥14,500), so the ¥15,000 basket sits at the low end. Luxury options (Hotel Chinzanso's tea house costs ¥90,000 per group [P1]) are excluded.

### Legal: Japan's Travel Agency Act
- Registration is required to arrange **transport or accommodation** services for a fee [L1].
- Arranging **only** other services (tickets, guides, experiences) without transport or lodging is generally **not** "travel business" (legal commentary, not an official ruling) [L2]. Land operators working *for travel agencies* are a separate registered category (旅行サービス手配業, since 2018) [L2].
- Japanese-language booking sites follow the JTA's OTA display guidelines [L3].
- **Our line:** experiences, guides and meetups only; link out for trains and hotels; register or partner before bundling. Confirm with JTA/the prefecture.

### Sponsor hooks
- JAL is moving Narita–Bengaluru (and four other routes) to daily service after Sep 2026 [J1]. This gives us a concrete India pilot route.
- JETRO signed an MoU with Maruti Suzuki so that startups in Maruti's India programmes can join JETRO activities [J2]. This shows JETRO works with Indian startups.

### Extra sources
- [P1] Tokyo tea ceremony guide 2026: https://e-housing.jp/post/tokyo-tea-ceremony-guide-2026-where-to-experience-traditional-japanese-tea · Hotel Chinzanso: https://hotel-chinzanso-tokyo.com/activities/tea-ceremony/
- [P2] Small-group tea ceremony from ¥8,000: https://jasumo.com/listing/tea-ceremony-experience-in-a-small-tea-room-in-tokyo
- [P3] Kintsugi: https://kintsugi-kit.com/pages/kintsugi-workshops-in-tokyo · https://www.therealjapan.com/experiences/tokyo/kintsugi-repair-workshop/
- [P4] Cooking classes: https://tokyocheapo.com/food-and-drink/cooking-classes-tokyo/ · https://cookly.me/do/hands-on-japanese-cooking-class/in/tokyo
- [L1] Travel Agency Act (English): https://www.japaneselawtranslation.go.jp/en/laws/view/4490/en · JTA overview: https://www.mlit.go.jp/kankocho/seisaku_seido/ryokogyoho/ryokogyohogaiyo.html
- [L2] Commentary on non-transport/lodging services: https://www.mc-law.jp/kigyohomu/22005/ · land operators (2018): https://yamatogokoro.jp/inboundnews/8439/
- [L3] JTA OTA guidelines: https://www.mlit.go.jp/kankocho/content/810000473.pdf
- [J1] JAL daily routes incl. Narita–Bengaluru: https://www.travelandtourworld.com/news/article/xnsub68fdbbm/ (single trade report; check JAL's newsroom)
- [J2] JETRO–Maruti Suzuki MoU: https://www.marutisuzuki.com/corporate/media/press-releases/2025/may/maruti-suzuki-and-jetro-collaborate-to-facilitate-business-opportunities-for-startups

---

## 7. Done-when checklist
- [x] `research.md` with sources (this file)
- [x] Competitor table + positioning map → `data/competitors.csv`, `ws3_slides.html`
- [x] TAM/SAM/SOM → `model.py`, `data/market.json`, `data/math_lines.txt`
- [x] BMC → `business_model.md`, slide in `ws3_slides.html`
- [x] Revenue + unit economics → `business_model.md`, `data/unit_economics.json`, `data/revenue_streams.csv`
- [x] Impact metrics → `impact_metrics.md`, slide
- [x] **Survey charts:** simulated (n = 407), labelled → `survey.html` tab 5 + survey slide (§8)
- [x] Q&A bank → `qa_bank.md` · legal one-liner · basket check · sponsor asks (§9, business_model.md §7)
- [x] Every deck number traces to [S/C/B#] or [A#]
