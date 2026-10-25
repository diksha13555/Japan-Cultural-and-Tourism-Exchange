# Trip DNA: Business Model (detailed)
**Feeds:** BMC slide + Revenue & unit-economics slide + GTM/partners slide in `ws3_slides.html`
**Numbers:** from `model.py` → `data/unit_economics.json`, `data/revenue_streams.csv`. Tags [S#]/[C#]/[B#] = sources in `research.md`; [A#] = labelled assumptions.

---

## 1. The model in one paragraph
Trip DNA is a **two-sided marketplace with a free consumer app**. Travellers get a free guide that plans, stress-tests and repairs their day, translates, explains etiquette and handles SOS. When they book a local host, a workshop, a guide or a meetup, the **host pays us 10–15%**, half of what global experience marketplaces charge (20–35% [C6, C7]). Local businesses can pay a monthly fee to be featured and to see a dashboard of foreign-visitor demand. Travellers who want more buy a **¥500–1,000 Trip Pass**. Airlines and brands pay to reach travellers at the moment of planning. **SOS is always free.**

> **Why hosts choose us:** we bring them foreign guests they can't reach today (translated listings, etiquette briefing *before* the guest arrives, and guests who come because their itinerary already had a slot for them), and they keep **¥88 of every ¥100**.

---

## 2. Business Model Canvas: final 9 blocks

| Block | Final content |
|---|---|
| **1. Customer segments** | **Travellers:** (1) leisure FITs from **Korea, India, China** (first-time and repeat) · (2) students and exchange programmes · (3) business travellers · accessibility-first and senior travellers (UI modes). **Supply side:** (4) local hosts and small businesses (tea ceremony, crafts, homestays, cafés, guides) · (5) brands and airlines that want to reach inbound travellers |
| **2. Value propositions** | **Travellers:** *"Less worry, more culture."* A plan that survives reality (stress-test + one-tap repair) · everything in one verified app · etiquette and story at every stop · meet locals two-way · in your language and UI style. **Hosts:** foreign guests they can't reach today · translated listings · guests who arrive briefed on etiquette · keep 88–90% of each booking · off-peak demand (the repair engine fills empty slots) · **cultural exchange: guests share their culture back, so hosting means meeting the world, not just selling to it.** **Partners/brands:** reach travellers at the planning moment, with measurable impact data |
| **3. Channels** | **Before the trip:** airline partnerships (QR on boarding pass, welcome email, in-flight Wi-Fi landing page) · university and exchange offices · Korean/Indian travel creators · app stores. **On arrival:** airport and station QR posters · QR stands at partner hosts and shops · eSIM / rail-pass bundles. **After the trip:** shareable Culture Passport → referrals |
| **4. Customer relationships** | AI guide (self-serve, always on) · live disruption alerts · Culture Passport stamps and streaks · human host profiles and reviews · partner dashboard + onboarding support · community meetups (language café, cooking nights) |
| **5. Revenue streams** (ranked by Year-3 value) | ① booking commission 10–15% · ② partner subscriptions and featured listings · ③ ads and affiliate (airlines, eSIM, insurance, brands) · ④ Trip Pass ¥500–1,000 (7/14 days) · ⑤ guide and meetup fees. See §4 |
| **6. Key resources** | Verified places + culture database (the anti-hallucination layer) · stress-test and repair engine · host network · multilingual content (EN/日本語/हिन्दी/한국어/中文) · impact data (culture hours, local ¥) · brand trust |
| **7. Key activities** | Host and partner onboarding + verification · itinerary / repair engine · culture content with local experts · translation QA · partner sales · impact reporting to partners and the government |
| **8. Key partners** | **Distribution:** Japan Airlines, airports, JR/metro station media · **Trust and content:** JNTO, Japan Tourism Agency (Safety tips feed), local DMOs · **Business:** JETRO (market entry, India–Japan), Mitsui & Co (retail, real estate, mobility networks) · **Creative:** Hakuhodo (campaigns, brand partnerships) · **Tech/Media:** ValueCreate, Geek Pictures India (India content and creators) · **Supply:** hosts, byFood/MagicalTrip-style operators, guides · payment (Stripe/PayPay) |
| **9. Cost structure** | Team (product, engineering, partner success in Tokyo) · maps/AI/translation APIs (scale with usage) · payments ~3–4% of GMV · cloud · host verification and content · marketing (partner-led first) · legal and insurance (Travel Agency Act review, APPI privacy). **Year-3 fixed costs ≈ ¥90M [A19]** |

### Cultural exchange value for local hosts (the block judges asked about)
| What the host gets | How Trip DNA delivers it | How we measure it |
|---|---|---|
| **Income** from foreign guests | listings in 5 languages; slots placed *inside* itineraries; 10–15% fee | host earnings ¥/month |
| **Respectful guests** | etiquette card before arrival ("remove shoes, don't touch the scroll") | host rating of guests |
| **Two-way exchange** | each host sets an *exchange offer* ("teach me 5 words of Hindi", "cook a dish from home") | exchange sessions count |
| **Off-peak demand** | when a delay frees a slot, the repair engine suggests nearby hosts | % bookings in off-peak hours |
| **Visibility beyond hotspots** | "nearby, more local" suggestions | % visits outside top-20 hotspots |
| **Pride and story** | host story page; Culture Passport stamps show the craft and name | stamps issued per host |

---

## 3. Pricing

| Who pays | What | Price | Notes |
|---|---|---|---|
| Traveller | Core app | **Free** | planning, map, translation basics, culture cards, **SOS always free** |
| Traveller | **Trip Pass 7-day** | **¥800** (range ¥500–1,000) [A9] | offline maps and translation, unlimited auto-repair, partner discounts, priority host booking |
| Traveller | Trip Pass 14-day | ¥1,300 | same features, for longer trips |
| Traveller | Student / disability discount | −20% on host bookings (host-funded, optional) | backs "for everyone" |
| Host / partner | **Booking commission** | **10–15%** per confirmed booking (12% midpoint [A7]) | vs Klook 15–35%, GYG 20–30% [C6, C7] |
| Host / partner | **Featured listing + dashboard** | **¥5,000/month** [A12] | demand analytics: nationalities, times, languages |
| Guide | Verified-guide booking fee | 15% | guides vetted by us |
| Business traveller | Business meetup arrangement | ¥3,000–5,000 per intro | B2B section (roadmap) |
| Brand / airline | Sponsored culture stops, welcome-email placement | CPM / flat campaign | Hakuhodo-style campaigns |

Survey Q12 (`google_form_format.md`) validates the Trip Pass price band. If most choose ≤ ¥500, we drop it to ¥500 and rely on commission.

---

## 4. Revenue streams, ranked (Year 3, illustrative)

| Rank | Stream | Y3 revenue | Share | Formula |
|---|---|---|---|---|
| 1 | **Booking commission** | **¥101.9M** | 71% | 188,710 users × 30% book × ¥15,000 × 12% |
| 2 | Partner subscriptions & featured | ¥18.0M | 13% | 300 partners × ¥5,000 × 12 months |
| 3 | Ads & affiliate | ¥9.4M | 7% | ¥50 per user (eSIM, rail pass, insurance, airline) |
| 4 | Trip Pass | ¥7.5M | 5% | 188,710 × 5% × ¥800 |
| 5 | Guide & meetup fees | ¥5.7M | 4% | ¥30 net per user |
| | **Total** | **¥142.5M** (≈ US$0.95M) | | on **GMV ¥849M** → blended take rate **16.8%** |

**Expert note on ranking:** the brief ranked the Trip Pass third. The maths puts it fourth. A ¥800 pass at 5% conversion is small money, but it is our **best intent signal** and funds offline features. Commission is the engine, which matches every scaled competitor (Klook, GYG, Viator are all commission-led [C5, C7, C8]). Lead with commission on stage.

---

## 5. Unit economics (illustrative, all inputs labelled)

| Metric | Value | How |
|---|---|---|
| **ARPU per trip** | **¥660** | 30% × ¥15,000 × 12% (¥540) + 5% × ¥800 (¥40) + ¥50 ads + ¥30 guides |
| **CAC (blended)** | **¥330** | 60% partner/QR channels at ¥150 [A14] + 40% paid at ¥600 [A15] |
| **Gross margin** | 80% [A17] | after payment fees, APIs, support |
| **LTV** | **¥845** | ¥660 × 80% × 1.6 trips over 3 years [A18] (Japan's repeater goal: 40M of 60M [S9]) |
| **LTV / CAC** | **2.6×** | target > 3× via partner channels |
| **Take rate** | 12% commission · **16.8% blended** | blended = all revenue ÷ GMV |
| **First-trip contribution** | ¥198 per user | ¥660 × 80% − ¥330 |
| **Break-even** | **~382,000 trip-users / year** | (¥90M fixed − ¥14.4M partner gross profit) ÷ ¥198 |
| ↳ in market terms | ≈ **2% of KR+CN+IN trips**, so Year 4–5 | Year 3 is 1% (188,710 users) |
| Payback | first trip | CAC recovered on the first booking |

### Sensitivity: which assumption matters?
| Scenario | ARPU | CAC | LTV/CAC | Y3 revenue | Break-even users |
|---|---|---|---|---|---|
| **Base** | ¥660 | ¥330 | 2.6× | ¥142.5M | 381,818 |
| Commission 10% | ¥570 | ¥330 | 2.2× | ¥125.6M | 600,000 |
| Commission 15% | ¥795 | ¥330 | 3.1× | ¥168.0M | 247,059 |
| Booking rate 20% | ¥480 | ¥330 | 1.9× | ¥108.6M | 1,400,000 |
| Booking rate 40% | ¥840 | ¥330 | 3.3× | ¥176.5M | 221,053 |
| **Paid-only acquisition (¥600 CAC)** | ¥660 | ¥600 | **1.4×** | ¥142.5M | **never** (contribution < 0) |
| **Partner-led (90% partner channels)** | ¥660 | ¥195 | **4.3×** | ¥142.5M | **227,027** |
| Trip Pass conversion 2% | ¥636 | ¥330 | 2.5× | ¥138.0M | 422,819 |
| Basket ¥25,000 | ¥1,020 | ¥330 | 4.0× | ¥210.5M | 155,556 |

**Two takeaways for Q&A:**
1. **Distribution decides the business.** On paid ads alone a travel app never breaks even. Paid CPIs are high ($7–10 per Facebook install globally in 2025 [B2]), and tourists are one-off users. That is why our GTM is **partner-led** (airlines, QR, universities), and why the sponsors matter.
2. **Culture is the revenue lever.** The booking rate (20% → 40%) halves the break-even point. Every itinerary has a local-host slot, and the culture companion makes people *want* it.

---

## 6. Go-to-market

### Phases
| Phase | When | Where | Who | Goal |
|---|---|---|---|---|
| **0. Pilot** | Months 0–6 | Tokyo (Asakusa, Yanaka, Shimokitazawa) | 30 hosts, 1,000 travellers from India/Korea student and friend networks | prove booking rate ≥ 20%, NPS, culture hours |
| **1. Korea + India launch** | Months 6–18 | Tokyo → Osaka/Kyoto | Korean FITs (Korean UI, KakaoTalk sharing) · Indian leisure + students (Hindi UI) | 300 paying partners, 50k trip-users |
| **2. Scale** | Months 18–36 | 5 big cities + regional routes | + Taiwan, SE Asia; China when the advisory lifts | 1% of focus-market trips (188k) |
| **3. Regional Japan** | Year 3+ | regional prefectures with DMOs | regional tourism funding | regional stays (the government goal is 130M [S9]) |

### Channels: cost and why
| Channel | Mechanism | Est. CAC | Why it works |
|---|---|---|---|
| **Airlines** (JAL first) | QR on the boarding pass / e-ticket, welcome email "Your Tokyo day, stress-tested", in-flight Wi-Fi page | **¥50–150** | 70% of NAVITIME users install before arrival [C4]; JAL carries ~8M international passengers/yr [B4] |
| **Airport + station QR posters** | "Train delayed? Fix your day in one tap" at Narita/Haneda/Shinjuku | ¥150–300 | catches people at the moment of pain |
| **Partner hosts and shops** | QR stand: "Book your next local experience" | ~¥0 (partner incentive) | supply side brings demand |
| **Universities** | Japanese university international offices + Indian/Korean exchange programmes; student discount | ¥50–100 | students = repeat visitors + word of mouth |
| **Hakuhodo-style brand campaigns** | sponsored culture stops ("Matcha moments by ___"), creator trips | campaign-funded | brands pay, so our CAC ≈ 0 |
| **Creators** (India/Korea) | travel YouTubers/Instagrammers, plus Geek Pictures India content | ¥200–400 | trust in home language |
| Paid social/search | retargeting only | ¥600+ | >75% of travel-app conversions come from remarketing [B3], so we use it only for retargeting |

---

## 7. Sponsors as partners: one concrete 3-month ask each
Rule: **small, specific, time-boxed, with a number we report back.** Judges remember an ask they could say yes to tomorrow.

| Sponsor | The ask (3-month pilot) | What they get | We report | Why it's credible |
|---|---|---|---|---|
| **Japan Airlines** | One Trip DNA QR + line in the booking-confirmation email for **Narita–Bengaluru** passengers ("Your Tokyo day, stress-tested") | engagement with India-origin passengers; fewer disruption complaints; a culture story for marketing | installs per 1,000 passengers, host bookings, disruption repairs | JAL is moving Narita–Bengaluru to daily after Sep 2026 [J1]; 70% of NAVITIME users install before arrival [C4] |
| **Hakuhodo** | One co-created "Culture Hours" campaign with **one** brand client: a sponsored culture stop in the app for 3 months | a new, measurable KPI (culture hours created) to sell to clients | culture hours, stamp redemptions, brand recall in a post-trip survey | Hakuhodo set this problem statement; this turns our impact metric into their product |
| **JETRO** | Introductions to **30 Tokyo SMEs/hosts** for the pilot + a slot at a JETRO India–Japan startup event | an India–Japan digital-trade case; Indian demand for Japanese small businesses | yen to local SMEs, partner count | JETRO already runs India startup tie-ups (e.g. MoU with Maruti Suzuki's startup programmes) [J2] |
| **Mitsui & Co** | Mentorship + intro to **one** portfolio company in retail, mobility or payments for a pilot integration | visitor-demand data for their consumer businesses | footfall/bookings routed, conversion | large consumer and India footprint (keep generic; confirm the right portfolio company with them) |
| **ValueCreate** | Tech review of the partner dashboard + help with a 5-host data pilot | early access to inbound demand analytics | dashboard usage by hosts | keep generic until we know their focus |
| **Geek Pictures India** | **3 short films** with Indian creators for launch ("Japan, less worry, more culture") | content IP + an India–Japan story | views → installs (UTM) | India is our growth market (+35%/yr [S10]) |

**Say on stage (10 s):** "We're not asking for money today. We're asking for one email from JAL, one campaign with Hakuhodo, and thirty introductions from JETRO, and we'll come back with numbers."

---

## 8. Risks and mitigations
| Risk | Likelihood | Mitigation |
|---|---|---|
| **China arrivals stay down** (−56% H1 2026 [S8]) | high | base case is Korea + India; SAM shown with China −50% (¥380B) |
| **Google adds itinerary repair** | medium | our moat is the culture + host layer and Japan-verified data; Google Maps becomes infrastructure, not the enemy |
| **Cold start: no hosts → no bookings** | high | start with 30 hosts in 3 neighbourhoods; take operators like byFood/MagicalTrip as supply partners; 0% commission for the first 3 months |
| **Legal: Japan's Travel Agency Act** | medium | the Act covers arranging **transport or accommodation** for a fee [L1, L2]. We book only experiences, guides and meetups and link out for trains and hotels; before bundling transport or stays we register or partner with a registered agency. Japanese-language booking pages follow the JTA OTA guidelines [L3]. Confirm with JTA/the prefecture before launch (interpretation is from legal commentary, not a ruling) |
| **Data privacy (APPI, location)** | medium | location only while in use; SOS sharing opt-in; data stored in Japan region |
| **AI hallucination** | medium | the AI picks only from the verified places DB; every place shows "verified on dd/mm" |
| **Overtourism criticism** | low | we *spread* visits (% outside top-20 is a core metric), in line with the government's 100-region overtourism goal [S9] |

---

## 9. KPIs we'd report (investor + partner view)
GMV · take rate · bookings per trip · booking rate · CAC by channel · LTV/CAC · partner count and retention · Trip Pass conversion · **culture hours per trip · ¥ to local small businesses · % visits outside top-20 hotspots · host earnings · exchange sessions** (see `impact_metrics.md`).
