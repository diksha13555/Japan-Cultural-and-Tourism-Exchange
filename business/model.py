"""Trip DNA WS3 model: market sizing + unit economics.

Every input is either SOURCED (S#, see research.md) or an ASSUMPTION (A#, labelled).
Run:  python model.py   -> writes data/*.json and data/*.csv used by the slides.
"""
import csv
import json
import os

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "data")
os.makedirs(OUT, exist_ok=True)

# ---------- SOURCED inputs (2025 calendar year unless noted) ----------
S = {
    "visitors_2025": 42_683_600,          # S1 JNTO
    "visitors_2024": 36_869_900,          # S2 JNTO
    "visitors_2019": 31_882_049,          # S1 (≈31.9M)
    "spend_2025_yen": 9.4549e12,          # S3 JTA confirmed
    "spend_2024_yen": 8.1257e12,          # S3
    "spend_per_visitor_2025": 228_782,    # S3
    # spend by category, 2025 (S4, JTA prelim, total ¥9.4559T)
    "cat": {
        "Accommodation": 3.4617e12,
        "Shopping": 2.5490e12,
        "Food & drink": 2.0711e12,
        "Transport": 0.9465e12,
        "Entertainment & services": 0.4218e12,
    },
    "cat_total": 9.4559e12,
    # focus markets (S5 arrivals, S6 spend)
    "markets": {
        "South Korea": {"v2025": 9_459_600, "g": 0.083, "v2024": 8_817_800, "spend": 986.4e9, "pp": 104_606},
        "China":       {"v2025": 9_096_300, "g": 0.303, "v2024": 6_981_200, "spend": 2002.6e9, "pp": 246_154},
        "India":       {"v2025": 315_100,   "g": 0.352, "v2024": 233_061,   "spend": None,     "pp": None},
        "Taiwan":      {"v2025": 6_763_400, "g": 0.119, "v2024": None,      "spend": 1211.0e9, "pp": None},
        "USA":         {"v2025": 3_306_800, "g": 0.214, "v2024": None,      "spend": 1124.1e9, "pp": None},
    },
    "ytd_2026_jan_sep": 30_730_200,       # S7, -2.9% YoY
    "china_h1_2026_change": -0.564,       # S8
    "korea_h1_2026_change": 0.186,        # S8
    "target_2030_visitors": 60_000_000,   # S9
    "target_2030_spend": 15e12,           # S9
}

# ---------- ASSUMPTIONS (labelled; change here, everything recomputes) ----------
A = {
    "A1_india_spend_pp": 228_782,   # India per-person spend not published in sources found -> use national average
    "A2_digital_share": 0.70,       # share of KR/CN/IN visitors who self-plan on a phone (independent, not package tour)
    "A3_china_2026_factor": 0.50,   # China arrivals ~-50% in 2026 (travel advisory) -> stress case
    "A4_y3_penetration": 0.01,      # Year-3: 1% of KR+CN+IN trips use Trip DNA
    "A5_book_rate": 0.30,           # share of app users who book >=1 experience/host in-app
    "A6_basket_yen": 15_000,        # in-app booking value per booking user per trip (~2 experiences)
    "A7_commission": 0.12,          # midpoint of 10-15% booking commission
    "A8_pass_conv": 0.05,           # Trip Pass conversion (freemium median ~2.2%, travel intent higher; validate w/ survey Q12)
    "A9_pass_price": 800,           # ¥ Trip Pass (7-day), midpoint of ¥500-1,000
    "A10_ads_aff_per_user": 50,     # ¥ per user from ads + affiliate (eSIM, rail pass, insurance)
    "A11_partners_y3": 300,         # paying partners in Year 3 (Tokyo -> Osaka/Kyoto)
    "A12_partner_sub_month": 5_000, # ¥/month featured listing + dashboard
    "A13_guides_meetups_per_user": 30,  # ¥ per user from guide/meetup fees (net)
    "A14_cac_partner": 150,         # ¥ CAC via airline/QR/university partner channels
    "A15_cac_paid": 600,            # ¥ CAC via paid social/search (Asia CPIs; western CPIs much higher)
    "A16_partner_mix": 0.60,        # share of users from partner/organic channels
    "A17_gross_margin": 0.80,       # after payment fees (~3.6%), maps/AI API, support
    "A18_trips_per_user_3y": 1.6,   # repeat visits: JP targets 40M repeaters of 60M by 2030 (S9)
    "A19_fixed_cost_y3": 90e6,      # ¥/yr: 8 FTE (India + Tokyo), cloud, legal, content
    "A20_yen_per_usd": 150,         # display only
}


def yen(x):
    if x >= 1e12:
        return f"¥{x/1e12:.2f}T"
    if x >= 1e9:
        return f"¥{x/1e9:.1f}B"
    if x >= 1e6:
        return f"¥{x/1e6:.1f}M"
    return f"¥{x:,.0f}"


def main():
    cat = S["cat"]
    share = {k: v / S["cat_total"] for k, v in cat.items()}
    exp_share = share["Food & drink"] + share["Entertainment & services"]

    # ---- TAM ----
    tam = cat["Food & drink"] + cat["Entertainment & services"]
    tam_wide = tam + cat["Transport"]

    # ---- SAM ----
    sam_rows = []
    for m in ["South Korea", "China", "India"]:
        d = S["markets"][m]
        spend = d["spend"] if d["spend"] else d["v2025"] * A["A1_india_spend_pp"]
        exp = spend * exp_share
        sam_rows.append({"market": m, "visitors_2025": d["v2025"], "growth": d["g"],
                         "total_spend": spend, "exp_spend": exp,
                         "sam": exp * A["A2_digital_share"],
                         "spend_assumed": d["spend"] is None})
    sam = sum(r["sam"] for r in sam_rows)
    sam_china_stress = sum(r["sam"] * (A["A3_china_2026_factor"] if r["market"] == "China" else 1) for r in sam_rows)

    # ---- SOM (bottom-up, Year 3) ----
    focus_visitors = sum(S["markets"][m]["v2025"] for m in ["South Korea", "China", "India"])
    users = focus_visitors * A["A4_y3_penetration"]
    gmv = users * A["A5_book_rate"] * A["A6_basket_yen"]
    rev = {
        "Booking commission": gmv * A["A7_commission"],
        "Partner subscriptions & featured": A["A11_partners_y3"] * A["A12_partner_sub_month"] * 12,
        "Trip Pass": users * A["A8_pass_conv"] * A["A9_pass_price"],
        "Ads & affiliate": users * A["A10_ads_aff_per_user"],
        "Guide & meetup fees": users * A["A13_guides_meetups_per_user"],
    }
    rev_total = sum(rev.values())

    # ---- unit economics (per trip-user, B2C side) ----
    arpu = (A["A5_book_rate"] * A["A6_basket_yen"] * A["A7_commission"]
            + A["A8_pass_conv"] * A["A9_pass_price"]
            + A["A10_ads_aff_per_user"] + A["A13_guides_meetups_per_user"])
    cac = A["A16_partner_mix"] * A["A14_cac_partner"] + (1 - A["A16_partner_mix"]) * A["A15_cac_paid"]
    ltv = arpu * A["A17_gross_margin"] * A["A18_trips_per_user_3y"]
    contrib_first_trip = arpu * A["A17_gross_margin"] - cac
    partner_gp = rev["Partner subscriptions & featured"] * A["A17_gross_margin"]
    breakeven_users = (A["A19_fixed_cost_y3"] - partner_gp) / (arpu * A["A17_gross_margin"] - cac)
    take_rate = rev_total / gmv

    market = {
        "visitors": {"2019": S["visitors_2019"], "2024": S["visitors_2024"], "2025": S["visitors_2025"],
                     "2026_jan_sep": S["ytd_2026_jan_sep"], "2030_target": S["target_2030_visitors"]},
        "spend": {"2024": S["spend_2024_yen"], "2025": S["spend_2025_yen"], "2030_target": S["target_2030_spend"],
                  "per_visitor_2025": S["spend_per_visitor_2025"]},
        "category_2025": {k: {"yen": v, "share": round(share[k], 4)} for k, v in cat.items()},
        "focus_markets": S["markets"],
        "tam": tam, "tam_incl_transport": tam_wide, "experience_share": exp_share,
        "sam": sam, "sam_china_stress": sam_china_stress, "sam_rows": sam_rows,
        "som_gmv": gmv, "som_revenue": rev_total, "som_users": users,
        "som_share_of_sam": gmv / sam,
    }
    unit = {"arpu_per_trip": arpu, "cac_blended": cac, "ltv": ltv, "ltv_cac": ltv / cac,
            "contribution_first_trip": contrib_first_trip, "take_rate_blended": take_rate,
            "breakeven_trip_users_per_year": breakeven_users,
            "revenue_y3": rev, "revenue_y3_total": rev_total, "gmv_y3": gmv, "users_y3": users,
            "fixed_cost_y3": A["A19_fixed_cost_y3"]}

    with open(os.path.join(OUT, "market.json"), "w", encoding="utf-8") as f:
        json.dump(market, f, indent=2, ensure_ascii=False)
    with open(os.path.join(OUT, "unit_economics.json"), "w", encoding="utf-8") as f:
        json.dump(unit, f, indent=2, ensure_ascii=False)
    with open(os.path.join(OUT, "assumptions.json"), "w", encoding="utf-8") as f:
        json.dump(A, f, indent=2)

    with open(os.path.join(OUT, "revenue_streams.csv"), "w", newline="", encoding="utf-8") as f:
        w = csv.writer(f)
        w.writerow(["rank", "stream", "y3_revenue_yen", "share"])
        for i, (k, v) in enumerate(sorted(rev.items(), key=lambda x: -x[1]), 1):
            w.writerow([i, k, round(v), round(v / rev_total, 3)])

    # one-line math, printed for research.md / slides
    lines = [
        f"TAM = food {yen(cat['Food & drink'])} + entertainment/services {yen(cat['Entertainment & services'])} = {yen(tam)}  (incl. transport: {yen(tam_wide)})",
        f"Experience share of spend = {exp_share:.1%}",
    ]
    for r in sam_rows:
        tag = " [A1 assumed per-person]" if r["spend_assumed"] else ""
        lines.append(f"  {r['market']}: {yen(r['total_spend'])}{tag} x {exp_share:.1%} x {A['A2_digital_share']:.0%} digital = {yen(r['sam'])}")
    lines += [
        f"SAM = {yen(sam)}   (China -50% stress case: {yen(sam_china_stress)})",
        f"SOM users = {focus_visitors:,} KR+CN+IN visitors x {A['A4_y3_penetration']:.0%} = {users:,.0f} trip-users",
        f"SOM GMV = {users:,.0f} x {A['A5_book_rate']:.0%} book x ¥{A['A6_basket_yen']:,} = {yen(gmv)}  ({gmv/sam:.2%} of SAM)",
        f"SOM revenue (all streams) = {yen(rev_total)}  (≈ US${rev_total/A['A20_yen_per_usd']/1e6:.2f}M)",
        *[f"   {k}: {yen(v)} ({v/rev_total:.0%})" for k, v in sorted(rev.items(), key=lambda x: -x[1])],
        f"ARPU/trip = {yen(arpu)} · CAC = {yen(cac)} · LTV = {yen(ltv)} · LTV/CAC = {ltv/cac:.1f}x",
        f"Blended take rate = {take_rate:.1%} of GMV · first-trip contribution = {yen(contrib_first_trip)}",
        f"Break-even = ({yen(A['A19_fixed_cost_y3'])} fixed - {yen(partner_gp)} partner GP) / {yen(arpu*A['A17_gross_margin']-cac)} = {breakeven_users:,.0f} trip-users/yr",
    ]
    with open(os.path.join(OUT, "math_lines.txt"), "w", encoding="utf-8") as f:
        f.write("\n".join(lines) + "\n")
    print("\n".join(lines))


if __name__ == "__main__":
    main()
