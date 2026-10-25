  # Google Form: Trip DNA traveller survey

  > Copy this into Google Forms top to bottom. **12 core questions, about 2 minutes.** Everything marked *(optional extra)* can be dropped if you want it shorter.
  > Each question lists: **type**, **required?**, **options** (in order), and **why we ask** (the claim it proves in the deck).

  ---

  ## 0. Form setup (do this first)

  | Setting | Value | Why |
  |---|---|---|
  | **Title** | Travelling to Japan? Help us build a better travel guide (2 min) | "2 min" in the title roughly doubles completion |
  | **Description** | see box below | |
  | Settings → Responses → Collect email addresses | **Off** | anonymous = more honest answers, no consent issues |
  | Limit to 1 response | **Off** | it forces a Google sign-in and loses people on WhatsApp |
  | Presentation → Show progress bar | **On** | |
  | Presentation → Confirmation message | see end of this file | |
  | Questions → Default all questions required | **Off** (set required one by one, as marked below) | |
  | Theme | Header image: a Tokyo street / sakura photo · colour: red `#C0392B` or the deck red · font: Basic | matches the deck |
  | Responses tab → Link to Sheets | **On, create a new sheet** | we chart straight from the sheet at 07:00 |

  **Description text (paste as is):**

  > We're Team Out of Bounds, building **Trip DNA**, an all-in-one guide for visitors to Japan, for the Thapar Japan Hackathon.
  > Whether you've been to Japan, are planning a trip, or just travel abroad, your answers help. **12 quick questions · about 2 minutes · anonymous.**
  > We use the answers only for this project. ありがとう!

  ---

  ## Section 1 of 4: About you and Japan

  ### Q1. Have you been to Japan, or are you planning to go? *(required)*
  - **Type:** Multiple choice
  - **Options:**
    1. Yes, I've visited Japan
    2. I'm planning a trip in the next 12 months
    3. I'd like to go someday
    4. Not really, but I travel abroad
    5. I don't travel abroad
  - **Branching** (three-dot menu → "Go to section based on answer"): options 1–4 → *Continue to next section* · option 5 → *Section 4* (only demographics, so we still count them but they don't skew the pain-point data)
  - **Why:** segments everyone. Our strongest evidence is from options 1–2; we report them separately on the chart.

  ### Q2. Where is home? *(required)*
  - **Type:** Dropdown
  - **Options:** India · China · South Korea · Taiwan · Hong Kong · Southeast Asia (Thailand, Vietnam, Indonesia, Philippines, Malaysia, Singapore) · USA / Canada · UK / Europe · Australia / New Zealand · Middle East · Japan · Other
  - **Why:** proves our India/China/Korea focus markets are in the sample. (Japan is kept so Japanese friends can answer the host questions honestly; filter them out of the tourist charts.)

  ### Q3. Your age *(required)*
  - **Type:** Multiple choice
  - **Options:** Under 18 · 18–24 · 25–34 · 35–44 · 45–54 · 55+
  - **Why:** links to UI preference (Q11) and student discount. The bands match JNTO survey bands, so we can compare.

  ### Q4. Main reason for your (planned) trip *(required)*
  - **Type:** Multiple choice
  - **Options:** Holiday / sightseeing · Study or exchange programme · Business / work · Visiting friends or family · Events (anime, concerts, sports, festivals) · Other
  - **Why:** validates our 3 user groups (leisure, students, business).

  ---

  ## Section 2 of 4: Planning and pain points

  > Section description: *"If you haven't been to Japan, think about your last trip abroad, or how you imagine a Japan trip."*

  ### Q5. What worries you most about travelling in Japan? Pick up to 3. *(required)*
  - **Type:** Checkboxes · Response validation → **Select at most 3**
  - **Settings:** three-dot menu → **Shuffle option order: On** (removes order bias; keep "Other" last automatically)
  - **Options:**
    1. Language: reading signs, menus, talking to people
    2. Planning: too many apps, too much research
    3. Getting around: trains, transfers, IC cards
    4. Plans going wrong: delays, weather, closures, crowds
    5. Not knowing the etiquette / offending someone by mistake
    6. Safety and emergencies (getting lost, earthquakes, medical help)
    7. Cost / budget
    8. Food: vegetarian, halal, allergies
    9. Only seeing the touristy places, missing real local life
    10. Other (enable "Other" text)
  - **Why:** **Chart 1 (top worries).** Options 1, 2, 4, 5 and 9 map to our two problems: planning overload and cultural disconnect.

  ### Q6. On a trip abroad, how often do your plans break (a delay, rain, closed place, sold out, too crowded)? *(required)*
  - **Type:** Multiple choice
  - **Options:** Never · Once per trip · A few times per trip · Almost every day · I don't usually plan
  - **Why:** proves the stress-test feature solves a real, frequent problem. Deck line: "X% say plans break at least a few times per trip".

  ### Q7. How many apps do you use to plan and get around on one trip? *(required)*
  - **Type:** Multiple choice
  - **Options:** 1–2 · 3–4 · 5–6 · 7 or more · Not sure
  - **Tip:** add the help text *"Count maps, translation, booking, train, notes, messaging, payments..."*
  - **Why:** validates the "7+ apps" claim in our story. If the real median is 3–4, we change the slide to the real number.

  ---

  ## Section 3 of 4: Culture, features and price

  ### Q8. How interested are you in experiencing local culture **with a local host**? (e.g. tea ceremony at someone's home, a craft workshop, homestay dinner, a local festival) *(required)*
  - **Type:** Linear scale **1–5**
  - **Labels:** 1 = Not interested · 5 = Very interested
  - **Why:** **Chart 3 (interest in local culture).** Answers judge feedback #2. Report "top-2 box" (% who chose 4 or 5).

  ### Q9. Would you also like to share **your own** culture with locals? (e.g. cook a dish from home, teach a few words of your language, join a language-exchange café) *(required)*
  - **Type:** Multiple choice
  - **Options:** Yes, I'd love that · Maybe, if it's easy to join · Probably not · No
  - **Why:** proves cultural exchange is **two-way**, not just consumption. This is our Hakuhodo-track differentiator, and no competitor measures it.

  ### Q10. Which would help you most? Pick up to 3. *(required)*
  - **Type:** Checkboxes · Response validation → **Select at most 3** · **Shuffle option order: On**
  - **Options:**
    1. A plan that **fixes itself** when something goes wrong (delay, rain, closure)
    2. Everything in one app: maps, translation, bookings
    3. Etiquette tips and the story behind each place I visit
    4. Booking verified local hosts and guides
    5. Hidden local spots beyond the famous hotspots
    6. One-tap SOS / emergency help in my language
    7. Student or disability discounts
    8. Meeting locals and other travellers (meetups, language exchange)
  - **Why:** feature priority. If option 1 is in the top 3, it backs our USP. If option 2 tops the list, it backs "all-in-one".

  ### Q11. Which app style would you prefer? *(required)*
  - **Type:** Multiple choice **with images** (click the image icon on each option; use 3 screenshots from our prototype)
  - **Options:**
    1. **Vibrant**: colourful, illustrations, animations
    2. **Simple**: clean, large text, fewer buttons
    3. **Colour-blind safe**: high contrast, patterns as well as colour
    4. No preference
  - **Why:** validates the 3 UI modes. Cross it with Q3 (age) for a neat chart: "younger users want Vibrant, 45+ want Simple" (if the data says so).

  ### Q12. The core app is free. Would you pay for a **Trip Pass** (offline maps and translation, auto-fix for plans, partner discounts, priority host booking)? *(required)*
  - **Type:** Multiple choice
  - **Options:**
    1. No, I'd only use the free version
    2. Yes, up to ¥500 for 7 days (≈ ₹300)
    3. Yes, ¥500–1,000 for 7 days (≈ ₹300–600)
    4. Yes, ¥1,000–1,500 for 14 days (≈ ₹600–900)
    5. Yes, more than ¥1,500 if it saves me real money and time
  - **Note:** ¥1 ≈ ₹0.58–0.62 (OFX, Jul 2026; BookMyForex, Sep 2026), so ¥500 ≈ ₹300. Check the rate on the day and round.
  - **Why:** **Chart 2 (willingness to pay).** It sets our Trip Pass price and the conversion assumption in the unit economics (the % who pick options 2–5).

  ---

  ## Section 4 of 4: Last bit (all optional)

  ### Q13. What is the ONE thing that would make your trip to Japan easier? *(optional)*
  - **Type:** Paragraph
  - **Why:** quotes for the deck ("In their words..."). Pick the 2–3 best.

  ### Q14. Want early access to Trip DNA? Leave your email. *(optional)*
  - **Type:** Short answer · Response validation → **Text → Email**
  - **Help text:** "Only used to send you the beta. Never shared."
  - **Why:** gives a **waitlist count**, which is real traction we can show on the deck ("N people signed up in 12 hours").

  ---

  ## Optional extras (add only if you want a longer form)

  | # | Question | Type | Use |
  |---|---|---|---|
  | E1 | How long is/was your trip? *1–4 days · 5–7 · 8–14 · 15+* | MC | ARPU per trip (longer trip = more bookings) |
  | E2 | Rough total budget per person, excluding flights? *< ₹50k · 50k–1L · 1–2L · 2L+* (or ¥ ranges) | MC | spend per visitor vs JNTO figure |
  | E3 | Rate how stressful each was (1–5): language · navigation · planning · etiquette · safety | Multiple-choice grid | a heatmap chart instead of a bar chart |
  | E4 | Which apps did you use? *Google Maps · Google Translate · Klook · Tripadvisor · Japan Travel (NAVITIME) · JNTO app · Wanderlog · Airbnb · Booking.com · Other* | Checkboxes | confirms who our real competitors are |
  | E5 | **Van Westendorp pricing** (4 short answers, in ¥ or ₹): At what price is a 7-day Trip Pass... *too cheap to trust? · a bargain? · getting expensive? · too expensive?* | Short answer ×4, number validation | a proper price-sensitivity curve (looks very professional, but adds ~40 s) |
  | E6 | How did you find this survey? *WhatsApp · Instagram · Reddit · College group · Friend · Other* | MC | channel data for go-to-market |
  | E7 | Would you prefer to book experiences in the app or on the spot? *App · On the spot · Depends* | MC | backs booking commission revenue |

  ---

  ## Confirmation message

  > Thank you! 🙏 You just helped shape Trip DNA. **Less worry, more culture.**
  > Know someone who's been to Japan? Please share this link with them.

  ---

  ## Distribution plan (to reach 50–100+ responses by 07:00)

  | Channel | Message | Note |
  |---|---|---|
  | College WhatsApp groups and class groups | short message below + link | biggest volume |
  | Family groups / relatives who have visited Japan | "Have you been to Japan? 2 min" | high-quality answers (Q1 = visited) |
  | Instagram story with a link sticker | Tokyo photo + "2 min survey" | |
  | Reddit r/JapanTravel, r/travel, r/india | check each sub's rules first; many ban surveys, so use the weekly thread if there is one | international responses |
  | Korean / Chinese friends or international students | ask them to forward | covers our focus markets |
  | LinkedIn post | "We're building..." | professionals and business travellers |

  **WhatsApp message (copy):**
  > Hi! 👋 Our team is in the final of the Thapar Japan Hackathon. We're building **Trip DNA**, an app that makes travel in Japan easy. Could you fill this **2-minute** survey? Even if you haven't been to Japan 🙏 [LINK]

  ---

  ## Analysis plan (07:00 freeze → deck)

  | Chart | From | Shows | Format |
  |---|---|---|---|
  | **Response count + who answered** | Q1, Q2, Q3 | "n = __ · __ countries · __% have visited or are planning" | one KPI line on the slide |
  | **Chart 1: Top worries** | Q5 | % of respondents choosing each worry | horizontal bar, sorted |
  | **Chart 2: Willingness to pay** | Q12 | % per price band; headline = % willing to pay anything | stacked single bar or column |
  | **Chart 3: Interest in local culture** | Q8 (+ Q9) | % rating 4–5 · % who want to share their own culture | big number + small bar |
  | Support stats | Q6, Q7, Q10, Q11 | "__% say plans break a few times per trip" · "median __ apps" · top feature · UI split by age | one-liners on the problem/solution slides |
  | Quotes | Q13 | 2–3 real voices | quote cards |
  | Traction | Q14 | waitlist count | one number |

  **Honesty rules for the deck:** always show **n**, note that it is a convenience sample (friends, college and online groups, not random), and never round a small sample into a big claim ("7 out of 10" is fine; "70% of tourists" is not).
