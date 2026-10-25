# Interview — Japan Tourism & Culture App (Thapar Japan Hackathon)

**How to use this file:** Answer each question in the `> **A:**` line under it. Short answers are fine. Write "skip", "unsure", or "decide later" where that's the honest answer. The full spec (`SPEC.md`) will be written once these are answered.

**Priority:** 🔴 must answer before building · 🟡 needed for the spec · 🟢 nice to have

---

## 0. Hackathon Logistics

**Q0.1** 🔴 What is the submission deadline, and how many days or hours do we realistically have to build?
> **A:** We have to present till 10Am tomorrow. So we have to plan accordingly.

**Q0.2** 🔴 What are the judging criteria and their weights (innovation, feasibility, design, business, impact, technical depth)?
> **A:**

**Q0.3** 🔴 What exactly must be submitted: a working app, a clickable prototype, a deck/HTML, a video, a code repo, a BMC document? Is there a format or length limit for each?
> **A:**

**Q0.4** 🔴 How many people are on the team? List each person's name, skills, and the role they'll own (frontend, backend, design, video, business, presentation).
> **A:** 4. Two will work on the app, one on the business models and surveys and everything, and one on the video. Everybody may work on the final presentation.

**Q0.5** 🔴 How long is the final pitch, and is there a Q&A? Does a live demo happen in front of the judges?
> **A:** 6mins - 4mins presentation + 2 mins QNA . yes - the live demo happens in front of judges

**Q0.6** 🟡 Are there rules on using AI tools, paid APIs, templates, or pre-built code?
> **A:** no

**Q0.7** 🟡 Is the hackathon sponsored or partnered by any Japanese organisations or companies whose tools or values we should showcase?
> **A:** Hakuhodo - the problem statement is theirs.

**Q0.8** 🟢 Are there hardware or venue constraints (projector, internet reliability, a laptop to present from)?
> **A:** no

---

## 1. Vision & Scope

**Q1.1** 🔴 In one sentence, what is the app? (e.g. "A personal AI guide that makes Japan understandable and bookable for foreigners.")
> **A:** An all in one hub that makes tourism in Japan easy and more approachable to anybody.

**Q1.2** 🔴 If the judges remember only ONE problem we solve, which is it: language barrier, planning overload, cultural disconnect, or safety?
> **A:** planning overload and cultural disconnect

**Q1.3** 🔴 What is the MVP for the hackathon? List the 3–5 features that MUST work in the demo. Everything else is a mockup or a "roadmap" slide.
> **A:** The iteration I went through in the prompt.md

**Q1.4** 🔴 What is explicitly OUT of scope for the hackathon build?
> **A:** NA

**Q1.5** 🟡 What is the app called? Do we have a logo, colour palette, or mascot idea (e.g. a Japanese-inspired character)?
> **A:** I have attached a sample prototype of one type of UI.

**Q1.6** 🟡 Is this only a hackathon project, or do you intend to actually continue it as a startup afterwards? (This changes how realistic the business model must be.)
> **A:** We'll see - but we want to make it hackathon-perfect first.

**Q1.7** 🟡 Is it Japan-only forever, or Japan first and then other countries? Should the pitch mention expansion?
> **A:** No - Japan for now

**Q1.8** 🟡 Does the MVP launch in one city (e.g. Tokyo only) or all of Japan?
> **A:** A few big cities and tourist attractions at first - then all of Japan

**Q1.9** 🟢 Why now? Is there a trend we can cite (record tourist numbers, India–Japan ties, the weak yen, Expo, and so on)?
> **A:**

---

## 2. Target Users & Personas

**Q2.1** 🔴 Who is the primary user: leisure tourist, student, business traveller, or all three? If all three, who comes first?
> **A:** All three - leisure tourist comes first.

**Q2.2** 🔴 Which origin countries and languages do we target first? (India? English speakers in general? Hindi?) How many languages does the MVP support?
> **A:** English, Hindi, korean, chinese, and japanese

**Q2.3** 🟡 What age range is each of the 3 UI modes for? (e.g. flashy = 16–30, simple = 50+)
> **A:** flashy = 16–30, simple = 45+  -  toggleable

**Q2.4** 🟡 First-time visitors only, or also repeat visitors and expats living in Japan?
> **A:** both   

**Q2.5** 🟡 Budget tiers: backpacker, mid-range, luxury? Do we serve all of them?
> **A:** all

**Q2.6** 🟡 Solo travellers vs. families vs. groups: does the app support group itineraries or shared trips?
> **A:** all

**Q2.7** 🟡 Should we write 2–3 named personas (e.g. "Priya, 24, student from Delhi") to use in the pitch and video?
> **A:** probably

**Q2.8** 🟢 Do we serve Japanese locals in any way (as hosts, guides, or businesses), or are they only on the supply side?
> **A:**

---

## 3. Core User Journey

**Q3.1** 🔴 Walk through the first 60 seconds after opening the app. What screens appear, and in what order (language → UI mode → permissions → questions → home)?
> **A:** A home page and options to whatever the user needs - run through the walkthrough in prompt.md

**Q3.2** 🔴 Login is optional. What does a guest user lose (saved itineraries, bookings, payments, discounts)? Which login methods (Google, Apple, email, phone OTP)?
> **A:** Everything - every progress is with associated with the account. Google and phone/gmail OTP can work.

**Q3.3** 🔴 The "app is like a guide that asks what you want to do": is this a chatbot, a voice assistant, a set of big tap-cards ("Eat / Go / Relax / Meet / Explore"), or a mix?
> **A:** a mix

**Q3.4** 🟡 What does "just hang out in the app / what's happening around me" look like? A map feed? A card feed like Instagram? A live events list?
> **A:** a card feed and a live events list

**Q3.5** 🟡 What onboarding questions do we ask? (language, interests, diet, budget, travel dates, pace, accessibility needs, trip purpose)
> **A:** language, interests, diet, budget, travel dates, pace, accessibility needs, trip purpose

**Q3.6** 🟡 How much of the app must work offline? (Tourists often have no SIM or data when they land.)
> **A:** The tourists can plan when online and download the itinerary and booking details and use them offline.

**Q3.7** 🟡 Is there an "I just landed at the airport" mode, like in the video (SIM/WiFi, currency exchange, getting to the city, IC card)?
> **A:** probably

**Q3.8** 🟢 Pre-trip mode: can users plan from home before flying (visa info, packing, budget)?
> **A:** yes, can add in the later versions

**Q3.9** 🟢 Post-trip: memories, a photo journal, reviews, a souvenir checklist ("carry back memories and gifts")?
> **A:** yes, can add in the later versions

---

## 4. The Three UI Modes

**Q4.1** 🔴 How does a user get a mode: asked at onboarding, inferred from age, or a toggle in settings? Can they switch any time?
> **A:** asked at onboarding, inferred from age, and a toggle in settings

**Q4.2** 🔴 For the hackathon, do we build all 3 modes or only 1 plus mockups of the others?
> **A:** the 2 - flashy and simple

**Q4.3** 🟡 What concretely differs between "flashy & colourful" and "simple": layout, number of features shown, font size, animation, icons, or everything?
> **A:**  everything listed above

**Q4.4** 🟡 Colourblind mode: which types (protanopia, deuteranopia, tritanopia)? Is it a separate UI, or a colour-palette swap that works on top of the other two?
*Why this matters: an older user can also be colourblind. Treating "colourblind" as a palette layer, not a third UI, avoids combinations we can't support.*
> **A:** whatever is the most suitable

**Q4.5** 🟡 Other accessibility needs: large text, screen-reader support, voice-only use, wheelchair-accessible routes, low vision?
> **A:** large text, screen-reader support, voice-only use, wheelchair-accessible routes, low vision - yes, can be added.

**Q4.6** 🟢 Should the flashy mode have anime/manga styling, characters, or seasonal themes (sakura in spring, momiji in autumn)?
> **A:** yes

---

## 5. Navigation & Maps

**Q5.1** 🔴 Which map provider: Google Maps Platform, Mapbox, OpenStreetMap/Leaflet? Do we have API keys and billing set up?
*Why this matters: Google Maps costs money past the free credit and has strict display and caching rules.*
> **A:** Which is the most suitable?

**Q5.2** 🔴 "Better than Google Maps": name the 3 concrete things we do better. (Culture context? Live translation? Partner deals? Itinerary? Accessibility?)
> **A:** Culture context? Live translation? Partner deals? Itinerary? Accessibility? - All of them

**Q5.3** 🟡 Japanese transit routing (trains, metro, buses, shinkansen): which source? Google Directions, Navitime API, Jorudan, ODPT open data, or GTFS feeds?
> **A:** 

**Q5.4** 🟡 Do we help with IC cards (Suica/Pasmo), the JR Pass, taxi apps (GO), or bike rentals?
> **A:**

**Q5.5** 🟡 How are partner businesses shown on the map? Highlighted pins, ranked first, a "Sponsored" label?
*Why this matters: if partners always win, users stop trusting recommendations.*
> **A:**

**Q5.6** 🟡 Example: a partner restaurant has a 3.1★ rating and a non-partner has a 4.6★ rating. Which ranks first?
> **A:**

**Q5.7** 🟢 Station navigation (Shinjuku has 200+ exits): do we attempt indoor or station-exit guidance?
> **A:**

**Q5.8** 🟢 Voice turn-by-turn through earphones, as in the video?
> **A:**

---

## 6. Translation & "Read the Billboard"

**Q6.1** 🔴 Camera translation (point at a sign and hear what it says): which engine? Google Cloud Vision + Translate, Google Lens deep-link, an on-device model, or an LLM vision model?
> **A:**

**Q6.2** 🔴 Is camera translation part of the live MVP demo? It's the hero moment of the video.
> **A:**

**Q6.3** 🟡 Voice conversation translation (tourist ↔ shopkeeper, two-way): needed? Which API (Google, DeepL, Whisper + TTS)?
> **A:**

**Q6.4** 🟡 Which languages are supported at launch?
> **A:**

**Q6.5** 🟡 Does translation work offline? If not, what happens with no internet?
> **A:**

**Q6.6** 🟡 What's the per-use cost of translation and vision APIs, and who pays for it (free tier, premium only)?
> **A:**

**Q6.7** 🟡 "Japanese guide in small parts while travelling": is this micro-lessons (a phrase of the day, contextual phrases like "how to order at a ramen shop"), a phrasebook, or both?
> **A:**

**Q6.8** 🟢 A menu translator with allergen and halal/veg detection?
> **A:**

---

## 7. Itinerary Engine (Main Feature)

**Q7.1** 🔴 Inputs: which fields does the user fill in (city, dates, start/end time, interests, budget, pace, diet, must-visit places, hotel location)?
> **A:**

**Q7.2** 🔴 How is the itinerary generated: an LLM (which one?), a rule-based algorithm, or an LLM plus real place data for verification?
*Why this matters: a pure LLM will invent places and wrong opening hours. That is the #1 credibility risk in a demo.*
> **A:**

**Q7.3** 🔴 Where does place data come from (Google Places, our own curated database, partner listings, open data)?
> **A:**

**Q7.4** 🟡 Do we account for opening hours, travel time between stops, crowd levels, weather, and closures?
> **A:**

**Q7.5** 🟡 "Change anything to everything along the way": drag-and-drop reorder? Swap a stop? "I'm tired, re-plan the rest of my day" auto-replan?
> **A:**

**Q7.6** 🟡 Single-day only, or multi-day and multi-city (Tokyo → Kyoto → Osaka)?
> **A:**

**Q7.7** 🟡 Can an itinerary be shared with travel companions or exported (PDF, calendar)?
> **A:**

**Q7.8** 🟡 Do we offer pre-made itineraries ("Tokyo in 1 day — Anime lover", "Kyoto — Temples & Tea") as well as custom ones?
> **A:**

**Q7.9** 🟢 Budget tracking inside the itinerary (estimated total cost, a spend tracker)?
> **A:**

---

## 8. Recommendations & Discovery

**Q8.1** 🟡 Restaurants "by taste and budget": how do we learn taste? Onboarding answers, history, ratings?
> **A:**

**Q8.2** 🟡 Dietary filters: halal, vegetarian, vegan, Jain, allergies? (Very relevant for Indian tourists.)
> **A:**

**Q8.3** 🟡 "Sit in peace" spots: parks, temples, cafés, onsen? Is the data curated by us or pulled from an API?
> **A:**

**Q8.4** 🟡 Events data (festivals, concerts, matsuri): where does it come from? Manual curation, scraping, partner uploads, an API?
> **A:**

**Q8.5** 🟡 Reviews: our own review system, Google reviews, Tabelog-style ratings, or none in the MVP?
> **A:**

**Q8.6** 🟡 "Meet people / have fun": social features (meet other travellers)? This raises safety and moderation concerns. In or out?
> **A:**

**Q8.7** 🟢 How do we keep data fresh (closed shops, changed prices)?
> **A:**

---

## 9. Bookings & Payments

**Q9.1** 🔴 What can actually be booked in the MVP demo: restaurants, attractions, stays, transport, guides, events? Real bookings, or simulated?
> **A:**

**Q9.2** 🟡 Do we process bookings ourselves, or redirect to Booking.com, Klook, Agoda, TableCheck (affiliate commission model)?
*Why this matters: self-processing means inventory, refunds, and possibly Japan Travel Agency Act registration. Affiliate links are far easier.*
> **A:**

**Q9.3** 🟡 Payment gateway: Stripe, Razorpay, PayPay, Komoju? Currencies (JPY, INR, USD)?
> **A:**

**Q9.4** 🟡 "Pay through the app for a discount": who funds the discount, the partner or us? What % is typical?
> **A:**

**Q9.5** 🟡 Refunds, cancellations, no-shows: who handles them?
> **A:**

**Q9.6** 🟢 In-app wallet, loyalty points, or cashback?
> **A:**

---

## 10. Partner Businesses

**Q10.1** 🔴 Partner categories at launch: cafés, attractions, market shops, souvenir shops, stays, rentals, transport, homestays, educational institutions, companies. Which matter most?
> **A:**

**Q10.2** 🟡 What does a partner get: visibility boost, a booking channel, analytics dashboard, promotions, translated listings, foreign customers?
> **A:**

**Q10.3** 🟡 How do partners pay us: commission per booking, monthly subscription, pay-per-lead, featured-listing fee, or a mix?
> **A:**

**Q10.4** 🟡 Partner onboarding: self-signup portal or manual? How do we verify a business is real?
> **A:**

**Q10.5** 🟡 The language barrier on the supply side: will the partner portal be in Japanese? Who sells to Japanese shop owners?
> **A:**

**Q10.6** 🟡 Chicken-and-egg: how do we get the first 50 partners with zero users, and the first users with zero partners?
> **A:**

**Q10.7** 🟢 Do we have any real contacts in Japan (alumni, embassy, Japan Foundation, JETRO, Indian community)?
> **A:**

---

## 11. Study & Business Verticals

**Q11.1** 🔴 Are the education and business sections in the hackathon MVP, or a roadmap slide?
> **A:**

**Q11.2** 🟡 Education: what's listed? Universities, language schools, scholarships (MEXT), campus visits, exchange programs, part-time job rules?
> **A:**

**Q11.3** 🟡 Business: company visits, trade fairs, coworking spaces, meeting venues, networking events, investor contacts?
> **A:**

**Q11.4** 🟡 "Contacts of people interested in meetings": where do these contacts come from? Opt-in profiles? How is consent handled?
> **A:**

**Q11.5** 🟡 Arranging meetups for a fee: how do we prevent spam, scams, or misuse (it could turn into a dating app)? Do we verify identities?
> **A:**

**Q11.6** 🟢 Is this LinkedIn-like (profiles, matching) or concierge-like (we arrange it manually)?
> **A:**

---

## 12. Premium Features

**Q12.1** 🔴 Final list of premium features and which are free. Current list: guide booking, event info and ticketing, attraction education, business meetups, discounts, SOS?, Japanese guide?
> **A:**

**Q12.2** 🟡 Pricing model: subscription (monthly or per-trip pass), pay-per-feature, freemium? Price points in JPY and INR?
> **A:**

**Q12.3** 🟡 Is a "trip pass" (e.g. ₹499 or ¥1,500 for 14 days of premium) better than a monthly subscription, since tourists stay a short time?
> **A:**

**Q12.4** 🟡 Guide booking: how do we verify guides (Japan's licensed guide-interpreter system, background check, training)? How are they paid? What's our cut? How are ratings and disputes handled?
> **A:**

**Q12.5** 🟡 Event ticketing: are we a real ticketing partner (taking payment) or do we refer users? What's the event organiser's incentive?
> **A:**

**Q12.6** 🟢 Should SOS and safety ever be premium? (Probably not. Paywalling safety looks bad to judges.)
> **A:**

---

## 13. Discounts (Students, PwD, Specially Abled)

**Q13.1** 🟡 Who is eligible exactly: students, persons with disabilities, seniors, others?
> **A:** Students, persons with disabilities, and senior citizens will be eligible for applicable discounts.

**Q13.2** 🟡 How do we verify eligibility: ID upload, ISIC card, India's UDID card, university email, manual review?
> **A:** Verify eligibility through student IDs, ISIC cards, university email, disability certificates, or other valid documents, with manual verification when needed.

**Q13.3** 🟡 Who funds the discount: partners (as a marketing cost) or us?
> **A:** Discounts will primarily be funded by partner businesses as promotional offers, with optional platform-funded discounts during special campaigns.

**Q13.4** 🟡 How do we stop abuse (fake IDs, account sharing)?
> **A:**  Prevent misuse through account verification, one verified account per person, limited discount usage, and checks for suspicious activity.

**Q13.5** 🟢 Storing ID documents means sensitive data. Do we store them at all, or verify and then delete?
> **A:** Avoid storing ID documents wherever possible. Verify eligibility securely, retain only the necessary verification status, and delete uploaded documents promptly after verification.

---

## 14. SOS & Safety

**Q14.1** 🔴 What does the SOS button do: call 110 (police) / 119 (ambulance/fire), share live location, alert emergency contacts, contact the embassy, show a medical phrase card?
> **A:** The SOS button will provide quick access to emergency numbers, share the user's location with emergency contacts, send alerts, show useful Japanese emergency phrases, and provide embassy contact details. In Japan, police is 110 and ambulance/fire is 119. <Cite refs={["turn790809search0","turn790809search6"]}/>

**Q14.2** 🟡 Natural disasters: earthquake and tsunami alerts (JMA, J-Alert), evacuation-shelter maps, the "Safety Tips" app as a reference?
> **A:** Provide earthquake and tsunami alerts using reliable official sources, along with evacuation instructions, nearby shelters, and links to Japan's Safety Tips app. <Cite refs={["turn790809search3","turn790809search7"]}/>

**Q14.3** 🟡 Lost passport, lost wallet, lost-and-found (koban), hospital finder with English-speaking doctors?
> **A:** Include a help section for lost passports and wallets, nearby police boxes (koban), lost-and-found services, and hospitals that can assist foreign tourists. <Cite refs={["turn790809search11","turn790809search6"]}/>

**Q14.4** 🟡 Does SOS work offline or without a SIM?
> **A:** Basic emergency information and saved contacts should be accessible offline, but live location sharing and emergency alerts may require network access and a working phone connection.

**Q14.5** 🟢 Liability: what if the app gives wrong safety info? Disclaimer strategy?
> **A:** Use verified official information, display the source and last-updated date, and clearly state that the app supplements rather than replaces emergency services. Encourage users to call official emergency numbers directly in an emergency.

---

## 15. Culture Layer

**Q15.1** 🔴 How does culture appear in the app: content cards, a "Culture" tab, tips tied to locations ("You're near a tea house — here's what Chanoyu is"), seasonal festival alerts, gamified badges, or homestays?
> **A:** Integrate culture through a dedicated Culture section, location-based cultural tips, festival alerts, informative cards, badges, and authentic local experiences.

**Q15.2** 🟡 Which traditions are in the MVP? Current list: Anime, Bonsai, Mt Fuji, Ikigai, Othello, Mottainai (repair rather than replace), Chanoyu (tea ceremony), Hina Matsuri (doll festival), Otoshidama (New Year money gift), Kimono, technology. What else? (Onsen etiquette, Omotenashi, Kintsugi, Sakura/Hanami, Shinto/Buddhist etiquette, Wabi-sabi.)
> **A:**  Include anime, bonsai, Mount Fuji, ikigai, mottainai, chanoyu (tea ceremony), Hina Matsuri, otoshidama, kimono, Japanese technology, onsen etiquette, omotenashi, kintsugi, sakura and hanami, Shinto and Buddhist traditions, and wabi-sabi.

**Q15.3** 🟡 **Mount Abu is in India (Rajasthan), not Japan.** Is that intentional, as an India–Japan connection theme? If so, should we lean into an "India ↔ Japan cultural bridge" angle?
> **A:** Yes, Mount Abu is in India, not Japan. We can use it to highlight India–Japan cultural connections, but the main focus will remain Japanese tourism and culture.

**Q15.4** 🟡 Spelling check for the deck and video: Mottainai (not Mohainai), Chanoyu (not Chanoyou), Otoshidama (not Otoshitama). OK to correct these?
> **A:**  Yes, correct the spellings to mottainai, chanoyu, and otoshidama throughout the presentation, video, and app.

**Q15.5** 🟡 Othello was created in Japan (1970s, based on Reversi). Do we want to include it, and how (a mini-game)?
> **A:**  Include Othello as an optional mini-game or cultural fact explaining its Japanese connection, but prioritize the main tourism features for the MVP.

**Q15.6** 🟡 Who writes and fact-checks the cultural content? Do we have a reviewer with Japanese cultural knowledge, to avoid stereotypes or errors?
> **A:**  Cultural content will be researched by the team, fact-checked using reliable sources, and reviewed by someone knowledgeable about Japanese culture to avoid inaccuracies and stereotypes.

**Q15.7** 🟡 Local homestays "sharing culture and tradition": is this a listing feature? Note that Japan's minpaku law requires registered hosts.
> **A:**  Yes, include local homestays as a listing feature, but only onboard verified hosts who meet applicable Japanese accommodation registration and legal requirements.

**Q15.8** 🟢 Souvenir and gift guide ("carry back memories and gifts"): curated by region? Linked to partner shops?
> **A:** Create a regional souvenir and gift guide featuring traditional crafts, local specialties, and authentic products, with links to partner shops and options to discover or purchase gifts.

---

## 16. Dashboards

**Q16.1** 🔴 Which dashboards do we build: Admin, IT/Ops, Partner, Guide? Which are in the demo?
> **A:** We will build four dashboards: Admin, IT/Ops, Partner, and Guide. All four will be included in the demo with basic functionality, but the Admin Dashboard will be the main priority.

**Q16.2** 🟡 Admin dashboard: which metrics and graphs (users, DAU, bookings, revenue, top places, languages, funnel)?
> **A:**  Show how many people use the app, how many bookings are made, how much money is earned, which places are most popular, which languages users speak, and how many users proceed from exploring places to making bookings. Use simple graphs to show these trends.

**Q16.3** 🟡 Which "tasks" can admins run: approve partners, moderate reviews, push notifications, edit content, manage events, issue refunds?
> **A:**  Admins can approve business partners and guides, manage users, edit tourist information, organize events, send notifications, review complaints, moderate reviews, and handle booking cancellations and refunds.

**Q16.4** 🟡 "Manages context for the app to work properly": does this mean editing the AI's prompts and knowledge base, curated places, and cultural content? Clarify.
> **A:** Yes, admins can update AI prompts, manage its knowledge base, verify recommended places, and update Japanese cultural information to ensure accurate and relevant recommendations.

**Q16.5** 🟡 Role-based access: who sees what?
> **A:** Admins can access everything, IT/Ops can monitor technical systems, partners can manage their businesses and bookings, guides can manage their profiles and tours, and tourists can access travel planning, translation, itineraries, and bookings.

**Q16.6** 🟢 For the demo, should the dashboards show realistic seeded or fake data?
> **A:** Use realistic sample data for the demo, including users, bookings, partner businesses, and revenue. Clearly label it as demo data, and use real API data wherever integrations are available.

---

## 17. Tech Stack & Architecture

**Q17.1** 🔴 Mobile app approach: React Native (Expo), Flutter, native, or a PWA (one codebase for web and app)?
*Why this matters: with limited time, a responsive web app/PWA plus an Expo build is the fastest path to "app + web".*
> **A:** Build a responsive PWA first so it works on both mobile and desktop through one codebase. Add a mobile app later if time permits.

**Q17.2** 🔴 Web frontend: Next.js, React + Vite, other? What does the team already know best?
> **A:** Use React + Vite with Tailwind CSS and shadcn/ui for a fast, responsive, and modern interface.

**Q17.3** 🔴 Backend: Node/Express, Python/FastAPI, Firebase, Supabase? Database: Postgres, MongoDB, Firestore?
> **A:**  Use Supabase for the database, authentication, and storage, with PostgreSQL for structured data. Use server-side functions for AI calls and sensitive operations.

**Q17.4** 🔴 LLM provider for the guide, itinerary, and chat (Claude, Gemini, OpenAI)? Do we have API credits?
> **A:** Use Gemini or OpenAI for the AI travel guide, itinerary generation, and chatbot. Choose the provider for which API access or free credits are available, with a fallback for demo purposes.

**Q17.5** 🟡 Hosting: Vercel, Render, Railway, Firebase Hosting, AWS? Budget: ₹0?
> **A:** Host the frontend on Vercel and use Supabase's free tier for the backend and database. Keep the initial deployment within the free budget.

**Q17.6** 🟡 Which APIs do we already have keys for? List them: Maps, Places, Translate, Vision, TTS, weather, events, payments.
> **A:** Prioritize Google Maps Platform for maps and routes, Places API for nearby locations, Gemini/OpenAI for AI recommendations, and a translation API for language support. Check existing API keys first; simulate unavailable integrations during the demo.

**Q17.7** 🟡 Push notifications, analytics (PostHog, GA), error tracking (Sentry)?
> **A:** Add push notifications for travel alerts and events if time permits. Use Firebase Cloud Messaging, with PostHog for analytics and Sentry for error tracking as optional additions.

**Q17.8** 🟡 Code repo: GitHub? Monorepo? Who reviews merges?
> **A:**  Use GitHub with one shared repository. Assign separate branches to team members, review changes through pull requests, and let the team lead approve and merge them.

**Q17.9** 🟢 Design tool: Figma? Is there a design system or component library (shadcn, MUI, Tailwind)?
> **A:**  Use Figma for UI design and Tailwind CSS with shadcn/ui for reusable components. Maintain consistent colors, typography, buttons, and layouts across the website and mobile interface.

---

## 18. Data, Privacy & Legal

**Q18.1** 🟡 Location tracking: always-on or only while the app is in use? How is consent shown?
> **A:** Track location only while using the app, with clear permission requests. Allow users to disable location access anytime.

**Q18.2** 🟡 Which privacy laws do we mention: Japan's APPI, India's DPDP Act 2023, GDPR for EU tourists?
> **A:**  Follow Japan's APPI, India's DPDP Act 2023, and GDPR where applicable to EU users. Provide a clear privacy policy and obtain required consent.

**Q18.3** 🟡 Legal status: if we sell travel packages or bookings in Japan, we may need Travel Agency Act registration. Do we position as a platform or marketplace to avoid it?
> **A:** Position the app as a tourism discovery and booking marketplace connecting tourists with independent service providers. Verify applicable Japanese travel regulations before offering bundled travel packages or acting as a travel agent.

**Q18.4** 🟢 Map and place data licensing: Google forbids caching most Places data. Is that a problem for offline mode?
> **A:** Yes, offline mode needs special handling. Store our own curated tourism and cultural content for offline access, but follow Google Maps licensing rules for map and place data.

**Q18.5** 🟢 Terms of service for partners and guides: needed for the pitch, or out of scope?
> **A:** Include basic partner and guide terms, covering verification, commissions, cancellations, refunds, responsibilities, privacy, and safety. Detailed legal documents can be finalized before launch.

---

## 19. Business Model & BMC

**Q19.1** 🔴 Rank the revenue streams by importance: booking commission, partner subscriptions, premium user plans, ads/featured listings, guide-booking cut, event-ticket fees, meetup fees, affiliate links, B2B data insights.
> **A:**

**Q19.2** 🟡 Fill all 9 BMC blocks, or should we draft them for you to edit? (Customer Segments, Value Propositions, Channels, Customer Relationships, Revenue Streams, Key Resources, Key Activities, Key Partners, Cost Structure)
> **A:**

**Q19.3** 🟡 Which finance terms do we include: TAM/SAM/SOM, CAC, LTV, LTV:CAC, ARPU, GMV, take rate, gross margin, burn rate, runway, break-even, unit economics, MRR/ARR? How deep do the judges expect it?
> **A:**

**Q19.4** 🟡 Market-size numbers: Japan had ~36.9M visitors in 2024 (JNTO), and Indian visitors to Japan are growing. Should we research and cite exact figures?
> **A:**

**Q19.5** 🟡 Cost structure: what are our biggest costs (APIs, LLM, servers, sales team, marketing, guide vetting)?
> **A:**

**Q19.6** 🟢 Are we asking for funding in the pitch? How much, and for what?
> **A:**

**Q19.7** 🟢 3-year projection: do we need one?
> **A:**

---

## 20. Competition

**Q20.1** 🔴 Which competitors do we compare against? Suggested: Google Maps, Google Translate/Lens, Japan Official Travel App (JNTO), Japan Travel by NAVITIME, Klook, GetYourGuide, Viator, Tripadvisor, Wanderlog, Airbnb Experiences, VoiceTra, Papago. Add or remove.
> **A:**

**Q20.2** 🔴 What is our honest moat? Why would a tourist use us instead of Google Maps + Google Translate + Klook?
> **A:**

**Q20.3** 🟡 Do we want a comparison table (features ✓/✗) in the deck?
> **A:**

**Q20.4** 🟢 Are any competitors weak in a specific area we can exploit (e.g. Indian dietary needs, Hindi, senior-friendly UI, culture)?
> **A:**

---

## 21. Marketing & Ads

**Q21.1** 🟡 Airline partnerships: which airlines (Air India, ANA, JAL)? What's the deal: an in-flight ad, a QR code on the boarding pass, a welcome email?
> **A:**

**Q21.2** 🟡 Station billboards and posters in Japan: realistic for a startup? Or airports in India before departure?
> **A:**

**Q21.3** 🟡 Social media and influencer strategy: travel vloggers, Instagram reels, YouTube?
> **A:**

**Q21.4** 🟡 Launch market: which origin country do we market to first?
> **A:**

**Q21.5** 🟢 Partnerships with visa agencies, travel agents, universities (for students), or the Japan National Tourism Organization?
> **A:**

---

## 22. Pre-launch Surveys

**Q22.1** 🟡 Will we actually run a survey before the hackathon? How many responses can we realistically get, and from whom?
> **A:**

**Q22.2** 🟡 Channel: Google Forms, WhatsApp groups, Reddit (r/JapanTravel), college groups?
> **A:**

**Q22.3** 🟡 Should I draft the survey questions (pain points, willingness to pay, features wanted)?
> **A:**

**Q22.4** 🟢 Can we interview people who've actually been to Japan (seniors, professors, alumni)?
> **A:**

---

## 23. Animated HTML Presentation

**Q23.1** 🔴 Section order. Proposed: Intro → Problem (with video) → Solution → Features → Prototype demo → Business model/BMC → Competition → Market & finance → Roadmap → Team → Thank you. OK?
> **A:**

**Q23.2** 🟡 Animation style: smooth scroll-driven (GSAP ScrollTrigger), slide-based (Reveal.js), or cinematic transitions? Any reference websites you like?
> **A:**

**Q23.3** 🟡 Visual theme: Japanese aesthetic (washi paper, ink brush, sakura, torii), modern tech/neon Tokyo, or anime-inspired? Should it match the app's look?
> **A:**

**Q23.4** 🟡 Navigation: keyboard arrows, a clicker, auto-play? Must it run offline at the venue (no CDN dependency)?
> **A:**

**Q23.5** 🟡 Prototype section: embed a live app iframe, screen recordings, or interactive mockups?
> **A:**

**Q23.6** 🟢 Bilingual slide text (English + Japanese)?
> **A:**

---

## 24. Promo Video

**Q24.1** 🔴 Target length? (Typically 60–120 seconds for a pitch.)
> **A:**

**Q24.2** 🔴 Production style: live action, 2D animation, anime-style, AI-generated video, stock footage + motion graphics, or a mix?
*Why this matters: filming "landing in Japan" from India is hard. Animation or AI video may be the only realistic option.*
> **A:**

**Q24.3** 🟡 Who plays or voices the girl? Does she have a name and a home country?
> **A:**

**Q24.4** 🟡 The theme line is unfinished: "When she was worried, the world…". Finish it. (e.g. the world turns grey and blurred, noise gets louder; when the app appears, colour and sakura return?)
> **A:**

**Q24.5** 🟡 Voiceover language and subtitles? Music: royalty-free, licensed, or original? A Japanese instrumental style (koto, shamisen)?
> **A:**

**Q24.6** 🟡 App screens in the video need a working UI. Does the video wait for the prototype, or use mockups?
> **A:**

**Q24.7** 🟡 Which culture elements appear on screen (Fuji, kimono, tea ceremony, bonsai, anime, festival)?
> **A:**

**Q24.8** 🟢 Tools: Premiere, DaVinci, CapCut, After Effects, Remotion (code-based video)?
> **A:**

**Q24.9** 🟢 Deadline for the video relative to the deck?
> **A:**

---

## 25. Prototype Demo Specifics

**Q25.1** 🔴 Which 3–5 flows do we demo live? (e.g. onboarding + UI mode → camera translate a sign → generate a Tokyo itinerary → book a partner café with a student discount → SOS)
> **A:**

**Q25.2** 🔴 Real data or seeded demo data? Which city or area do we seed (e.g. Shibuya/Asakusa)?
> **A:**

**Q25.3** 🟡 What's the backup if the venue internet or an API fails mid-demo (a recorded video fallback)?
> **A:**

**Q25.4** 🟡 Which screens are fully functional vs. clickable mockups?
> **A:**

---

## 26. Risks & Hard Parts

**Q26.1** 🔴 Scope: this is realistically 5+ startups in one (maps, translation, booking marketplace, LinkedIn-style networking, guide marketplace, ticketing). Which story do we tell so it doesn't look unfocused?
> **A:**

**Q26.2** 🟡 Cold-start marketplace: how do we answer "why would businesses join an app with no users?"
> **A:**

**Q26.3** 🟡 AI hallucination: how do we guarantee recommended places exist and are open?
> **A:**

**Q26.4** 🟡 Translation errors on safety-critical content (medicine, allergies, emergencies): how do we mitigate them?
> **A:**

**Q26.5** 🟡 Team bandwidth: who owns what if someone drops out?
> **A:**

**Q26.6** 🟢 What question are you most afraid a judge will ask?
> **A:**

---

## 27. Success Metrics & After

**Q27.1** 🟡 What counts as a win for the hackathon (top 3, a specific award, learning)?
> **A:**

**Q27.2** 🟡 Product KPIs we'd show: downloads, itineraries created, bookings, partner count, retention?
> **A:**

**Q27.3** 🟢 Post-hackathon plan: continue, open-source, apply to an incubator?
> **A:**

---

## 28. Anything We Missed?

Free space: ideas, constraints, links, references, inspirations.
> **A:**
