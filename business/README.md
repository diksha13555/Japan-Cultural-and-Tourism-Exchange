# ws_3: Business & Research (WS3)

| File | What | Use it for |
|---|---|---|
| `google_form_format.md` | 14 questions (12 core + 2 optional) + 7 extras, settings, branching, distribution, analysis plan | building the Google Form now |
| `survey.html` | survey planner (keep/drop, time estimate, hypothesis map) + **results → charts** builder | at 07:00: upload the Sheets CSV → charts + JSON for the slide |
| `research.md` | **master file:** market data, TAM/SAM/SOM, 16 competitors, sources [S#/C#/B#] | Q&A prep; every deck number traces here |
| `business_model.md` | BMC (9 blocks), pricing, ranked revenue, unit economics, sensitivity, GTM, sponsors, risks | business slides + Q&A |
| `qa_bank.md` | 20 rehearsed answers: ChatGPT/Google, legal one-liner, CAC, China, basket, sponsors, survey | Q&A drill |
| `impact_metrics.md` | 6 cultural-exchange metrics with baselines and pilot targets | impact slide; WS2 passport counters |
| `model.py` | all calculations; edit an assumption [A#] → `python model.py` | changing any number |
| `data/` | `survey_simulated.json` (n = 407, simulated), `market.json`, `unit_economics.json`, `assumptions.json`, `revenue_streams.csv`, `competitors.csv`, `math_lines.txt` | figures and the deck |
| `ws3_slides.html` | **9 deck-ready slides** (market, TAM/SAM/SOM, competitor table, positioning map, BMC, money, GTM, impact, survey) in the deck's style | copy the `<section>`s + "WS3 additions" CSS + script into `index.html` |

**If real responses arrive later:** survey.html → Results → upload the CSV → "Copy JSON for slides" → replace `const SURVEY = {...}` in `ws3_slides.html`. If Q12 changes the price, update `A8`/`A9` in `model.py`, rerun it, and update the money slide numbers.

## Status (25 Oct)
- Survey: **simulated responses (n = 407)**, labelled as such on the slide, in survey.html tab 5 and in research.md §8. Screenshots in `Form_responses/`.
- Q&A bank, legal one-liner, ¥15k basket check (two experiences = ¥14.5–21k), concrete sponsor asks (business_model.md §7 + GTM slide): done.
