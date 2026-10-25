# Q&A bank: Trip DNA final (2-min Q&A)
Answer in **≤ 20 seconds**: claim → one number → back to the story. Tags = sources in `research.md`, [A#] = assumption in `model.py`.

---

## Competition
**1. "Why wouldn't I just use ChatGPT?"**
> ChatGPT writes a plan. It can't check it. It can invent a place or an opening time, it has no live delays, and it can't book a host. Our AI only picks from verified places, then we stress-test the plan against delays, rain and closures, and repair it in one tap. And it books a real local host who keeps 88%.

**2. "Google Maps does all this."**
> Google Maps is great at one journey; 2 billion people use it [C1], and so do we. But when your train is 40 minutes late, Maps reroutes that trip. It doesn't tell you to swap the tea ceremony and the shrine so you keep both. It also won't tell you not to tip, or book you into a calligraphy class. We sit on top of maps; we're the plan and the culture layer.

**3. "Klook / GetYourGuide already sell experiences."**
> They sell a catalogue, one ticket at a time, and take 20–35% from hosts [C6, C7]. We put the experience *inside* a plan that survives the day, brief the guest on etiquette, and take 10–15%. Hosts keep ¥88 of every ¥100.

**4. "What stops Google or Klook copying you?"**
> The data and the network: verified Japan places, etiquette content written with locals, and a host network that's cheaper to join than any marketplace. Copying one feature is easy; copying a two-sided network in three neighbourhoods isn't. And we measure cultural exchange, which nobody else does.

## Market
**5. "How big is this?"**
> Inbound visitors spent ¥9.45 trillion in 2025 [S3]. Food and experiences, our TAM, is ¥2.49 trillion [S4]. Korea, India and China travellers who plan on their phones are ¥565B. Year 3 we aim for 1% of those trips: ¥849M in bookings.

**6. "China visitors just collapsed. Doesn't that hurt you?"**
> Yes, −56% in the first half of 2026 [S8], so China is our upside, not our base. Korea is #1 and still growing (+18.6%), and India is the fastest-growing at +35% [S8, S10]. We stress-tested our own market: with China at half, SAM is still ¥380B.

**7. "Why India? It's only 315,000 visitors."**
> It's small and growing 35% a year [S10]. We're Indian, the app speaks Hindi, and JAL is moving Narita–Bengaluru to daily flights. India is our home advantage; Korea is our scale.

## Business
**8. "How do you make money? When are you profitable?"**
> Hosts pay 10–15% commission on bookings, which is about 70% of revenue. Partners pay ¥5,000 a month to be featured, and travellers can buy an ¥800 Trip Pass. SOS is always free. Break-even is around 380,000 trip-users a year, about 2% of focus-market trips, so Year 4–5. Klook, with $541M revenue, still isn't profitable [C5], so that's normal for a marketplace.

**9. "What's your CAC? Tourists are one-time users."**
> That's exactly why we don't depend on ads. On paid ads alone, LTV/CAC is 1.4×, which doesn't work. Through airlines, airport QR codes and universities it's 4.3×. That's why JAL, Hakuhodo and JETRO matter to us. 70% of NAVITIME's foreign users install before they land [C4], so the boarding pass is the moment.

**10. "Is a ¥15,000 booking per trip realistic?"**
> Yes, it's conservative. A Tokyo tea ceremony costs about ¥3,500–8,000 and a cooking class ¥8,500–12,000. A kintsugi workshop is ¥12,500–16,500. Two experiences come to ¥14,500–21,000 [P1–P4]. *(Same answer as A6 in `model.py`.)*

**11. "Would anyone pay for a Trip Pass?"**
> The Trip Pass is our smallest revenue stream (5%) on purpose. We modelled 5% conversion; the freemium median is 2.2% [B1], but travellers with a trip booked have strong intent. If nobody pays, we lose 5% of revenue, not the business.

## Legal, trust, safety
**12. "Do you need a travel agency licence?" (one-liner)**
> Japan's Travel Agency Act covers arranging **transport or accommodation** for a fee [L1, L2]. We book experiences, guides and meetups, and link out for trains and hotels. Before we ever bundle transport or stays, we'll register or partner with a registered agency, and we'll confirm it with the JTA first.
>
> *Background (don't volunteer it):* selling only non-transport/lodging services isn't "travel business" unless it's bundled with transport or lodging [L2]. Since the 2018 amendment, paid guiding no longer needs a national licence; only the title "National Government Licensed Guide" is protected (to verify). Japanese-language booking sites must follow the JTA OTA display guidelines [L3].

**13. "How do you stop the AI making things up?"**
> It can only choose from our verified places database, and every place shows when it was last verified. If it isn't in the database, it can't be in your plan.

**14. "What about privacy and location?"**
> Location is used only while the app is open. SOS sharing is opt-in, we comply with APPI, and data is stored in a Japan region.

**15. "Won't you make overtourism worse?"**
> The opposite. One of our core metrics is the share of visits outside the top-20 hotspots. Today 69.4% of foreign guests stay in the three big metro areas [S11]. We suggest "nearby, more local", which matches the government's goal of 100 regions with overtourism measures by 2030 [S9].

## Culture (judge feedback #2)
**16. "How exactly does this promote cultural exchange?"**
> Four steps: free the time (the stress-test removes planning panic), aim it at culture (every day has a local slot plus etiquette at each stop), make it two-way (hosts set an exchange offer, like teaching 5 words of Hindi), and measure it: culture hours, yen to local small businesses, visits outside hotspots, host earnings. Today experiences are just 4.5% of visitor spend [S4]. That's what we want to move.

**17. "What's in it for the host besides money?"**
> Respectful guests who arrive briefed on etiquette, off-peak bookings when someone's plan changes, and actual exchange: they meet the world instead of just selling to it.

## Survey (answer honestly)
**18. "Did you validate this with users?"**
> Our survey slide is simulated: 407 modelled responses based on our expected audience, to design the questions and the analysis. It's labelled on the slide. For real-world evidence, the Japan Tourism Agency's own exit survey shows the problems: communicating with staff (15%), crowding (13%) and transport confusion (12%) are top complaints [S12]. And 42.7M visitors spend only 4.5% on experiences [S4].

**18b. "Why simulated, not real?"**
> We had one night. We built the form and modelled the answers we expect so the analysis is ready, and the live form keeps collecting. The first thing the pilot measures is real booking rates, not stated intent.

## Team / feasibility
**19. "Can you actually build this?"**
> The planner and stress-test are working in the demo now. The real version uses Google Maps and payment APIs we already know. The hard part is hosts, so the pilot is 30 hosts in three Tokyo neighbourhoods.

**20. "What would you do with support from the sponsors?"**
> One 3-month pilot each, with a number attached (see the sponsor slide). For example, JAL: one QR in the Narita–Bengaluru booking email for 3 months, and we report installs and bookings.
