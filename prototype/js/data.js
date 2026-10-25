/* Trip DNA prototype · all sample data and UI strings.
   Everything here is scripted for the one demo scenario in SPEC.md. Prices and timetables are samples. */

const LINES = {
  keikyu:   { name: 'Keikyu Airport Line', ja: '京急空港線', color: '#E5171F', code: 'KK' },
  asakusa:  { name: 'Toei Asakusa Line',   ja: '都営浅草線', color: '#E85298', code: 'A' },
  ginza:    { name: 'Ginza Line',          ja: '銀座線',     color: '#F39700', code: 'G' },
  yamanote: { name: 'JR Yamanote Line',    ja: '山手線',     color: '#80C241', code: 'JY' },
  odakyu:   { name: 'Odakyu Romancecar',   ja: 'ロマンスカー', color: '#1E7BC4', code: 'OH' },
  tozan:    { name: 'Hakone Tozan Line',   ja: '箱根登山線', color: '#C8102E', code: 'OH' },
  hibiya:   { name: 'Hibiya Line',         ja: '日比谷線',   color: '#9CAEB7', code: 'H' },
  tobu:     { name: 'Tobu Skytree Line',   ja: '東武スカイツリーライン', color: '#0F6CC3', code: 'TS' },
  yuri:     { name: 'Yurikamome',          ja: 'ゆりかもめ', color: '#1BA3C6', code: 'U' },
  bus:      { name: 'Highway bus',         ja: '高速バス',   color: '#7A6A58', code: 'BUS' },
  taxi:     { name: 'Taxi',                ja: 'タクシー',   color: '#E3B505', code: 'TAXI' },
  walk:     { name: 'Walk',                ja: '徒歩',       color: '#231815', code: '' }
};

/* Real coordinates [lat, lng] used to project the illustrated map. */
const PTS = {
  haneda: [35.5446, 139.7686], tenkubashi: [35.5490, 139.7550], otorii: [35.5530, 139.7460], kamata: [35.5613, 139.7235],
  heiwajima: [35.5790, 139.7350], aomono: [35.6090, 139.7430], shinagawa: [35.6285, 139.7387], sengakuji: [35.6383, 139.7400],
  mita: [35.6480, 139.7470], daimon: [35.6560, 139.7550], shimbashi: [35.6660, 139.7580], higashiginza: [35.6690, 139.7670],
  nihombashi: [35.6820, 139.7750], asakusabashi: [35.6970, 139.7860], kuramae: [35.7030, 139.7910], asakusa: [35.7110, 139.7975],
  homestay: [35.7128, 139.7935], sensoji: [35.7148, 139.7967], nakamise: [35.7118, 139.7963], lunch: [35.7100, 139.7945],
  tawaramachi: [35.7100, 139.7900], inaricho: [35.7110, 139.7820], ueno: [35.7120, 139.7760], uenohirokoji: [35.7070, 139.7730],
  suehirocho: [35.7030, 139.7720], kanda: [35.6930, 139.7710], mitsukoshimae: [35.6860, 139.7730], kyobashi: [35.6770, 139.7700],
  ginza: [35.6720, 139.7640], toranomon: [35.6700, 139.7500], tameike: [35.6740, 139.7410], akasaka: [35.6770, 139.7370],
  aoyama: [35.6730, 139.7240], gaienmae: [35.6700, 139.7170], omotesando: [35.6650, 139.7120], shibuya: [35.6590, 139.7020],
  shibuyasky: [35.6585, 139.7022], harajuku: [35.6702, 139.7027], meiji: [35.6764, 139.6993], shinjuku: [35.6900, 139.7000],
  omoide: [35.6930, 139.6990], hakoneEdge: [35.6000, 139.6250],
  skytree: [35.7101, 139.8107], tokyotower: [35.6586, 139.7454], teamlab: [35.6491, 139.7898], akihabara: [35.6984, 139.7731],
  gyoen: [35.6852, 139.7101], ginzaSt: [35.6717, 139.7650], tsukiji: [35.6654, 139.7707], crossing: [35.6595, 139.7005]
};

/* Searchable "must reach by 14:00" destinations. `leg` is the final hop from Asakusa (after lunch). */
const DESTINATIONS = [
  { id: 'shibuyasky', name: 'Shibuya Sky', ja: '渋谷スカイ', area: 'Shibuya', note: 'Open-air rooftop, 229 m · timed ticket', pt: 'shibuyasky',
    leg: { line: 'ginza', mins: 32, fare: 210, from: 'Asakusa', to: 'Shibuya', path: ['asakusa','tawaramachi','inaricho','ueno','uenohirokoji','suehirocho','kanda','mitsukoshimae','nihombashi','kyobashi','ginza','shimbashi','toranomon','tameike','akasaka','aoyama','gaienmae','omotesando','shibuya'] } },
  { id: 'crossing', name: 'Shibuya Scramble Crossing', ja: '渋谷スクランブル交差点', area: 'Shibuya', note: 'Up to 3,000 people per green light', pt: 'crossing',
    leg: { line: 'ginza', mins: 32, fare: 210, from: 'Asakusa', to: 'Shibuya', path: ['asakusa','tawaramachi','inaricho','ueno','uenohirokoji','suehirocho','kanda','mitsukoshimae','nihombashi','kyobashi','ginza','shimbashi','toranomon','tameike','akasaka','aoyama','gaienmae','omotesando','shibuya'] } },
  { id: 'skytree', name: 'Tokyo Skytree', ja: '東京スカイツリー', area: 'Oshiage', note: '634 m · tallest tower in Japan', pt: 'skytree',
    leg: { line: 'tobu', mins: 3, fare: 160, from: 'Asakusa', to: 'Tokyo Skytree', path: ['asakusa','skytree'] } },
  { id: 'tokyotower', name: 'Tokyo Tower', ja: '東京タワー', area: 'Shibakoen', note: 'Main deck at 150 m', pt: 'tokyotower',
    leg: { line: 'asakusa', mins: 16, fare: 220, from: 'Asakusa', to: 'Daimon', path: ['asakusa','kuramae','asakusabashi','nihombashi','higashiginza','shimbashi','daimon','tokyotower'] } },
  { id: 'meiji', name: 'Meiji Jingu', ja: '明治神宮', area: 'Harajuku', note: 'Forest shrine, 100,000 trees', pt: 'meiji',
    leg: { line: 'ginza', mins: 29, fare: 210, from: 'Asakusa', to: 'Omotesando', path: ['asakusa','tawaramachi','inaricho','ueno','uenohirokoji','suehirocho','kanda','mitsukoshimae','nihombashi','kyobashi','ginza','shimbashi','toranomon','tameike','akasaka','aoyama','gaienmae','omotesando','meiji'] } },
  { id: 'teamlab', name: 'teamLab Planets', ja: 'チームラボプラネッツ', area: 'Toyosu', note: 'Walk-through digital art', pt: 'teamlab',
    leg: { line: 'yuri', mins: 28, fare: 400, from: 'Asakusa', to: 'Shin-Toyosu', path: ['asakusa','kuramae','asakusabashi','nihombashi','higashiginza','shimbashi','teamlab'] } },
  { id: 'akihabara', name: 'Akihabara Electric Town', ja: '秋葉原電気街', area: 'Akihabara', note: 'Anime, retro games, maid cafés', pt: 'akihabara',
    leg: { line: 'ginza', mins: 7, fare: 180, from: 'Asakusa', to: 'Suehirocho', path: ['asakusa','tawaramachi','inaricho','ueno','uenohirokoji','suehirocho','akihabara'] } },
  { id: 'gyoen', name: 'Shinjuku Gyoen', ja: '新宿御苑', area: 'Shinjuku', note: 'Garden with 1,000 cherry trees', pt: 'gyoen',
    leg: { line: 'ginza', mins: 30, fare: 210, from: 'Asakusa', to: 'Aoyama-itchome', path: ['asakusa','tawaramachi','inaricho','ueno','uenohirokoji','suehirocho','kanda','mitsukoshimae','nihombashi','kyobashi','ginza','shimbashi','toranomon','tameike','akasaka','aoyama','gyoen'] } },
  { id: 'ginzaSt', name: 'Ginza', ja: '銀座', area: 'Ginza', note: 'Flagship stores, Kabuki-za', pt: 'ginzaSt',
    leg: { line: 'ginza', mins: 18, fare: 180, from: 'Asakusa', to: 'Ginza', path: ['asakusa','tawaramachi','inaricho','ueno','uenohirokoji','suehirocho','kanda','mitsukoshimae','nihombashi','kyobashi','ginza'] } },
  { id: 'tsukiji', name: 'Tsukiji Outer Market', ja: '築地場外市場', area: 'Tsukiji', note: '400 stalls of street food', pt: 'tsukiji',
    leg: { line: 'hibiya', mins: 20, fare: 180, from: 'Asakusa', to: 'Tsukiji', path: ['asakusa','tawaramachi','inaricho','ueno','uenohirokoji','suehirocho','kanda','mitsukoshimae','nihombashi','tsukiji'] } }
];

const ARRIVALS = {
  airport: ['Haneda Airport T3 (HND)', 'Narita Airport T1 (NRT)', 'Narita Airport T2 (NRT)'],
  rail:    ['Tokyo Station (Shinkansen)', 'Shinagawa Station', 'Ueno Station'],
  port:    ['Tokyo International Cruise Terminal', 'Harumi Pier'],
  bus:     ['Busta Shinjuku', 'Tokyo Station Yaesu Bus Terminal']
};

const INTERESTS = ['Culture', 'Food', 'Markets', 'Anime', 'Nature', 'Nightlife'];
const DIETS = ['No preference', 'Vegetarian', 'Vegan', 'Halal', 'Jain'];

/* The morning-to-night plan. `leg` = how you get to the NEXT stop.
   `kind` drives the station marker icon. `culture` minutes feed the culture-time chip. */
function buildPlan(dest) {
  const d = dest || DESTINATIONS[0];
  const legMins = d.leg.mins;
  const arriveMin = toMin('13:05') + legMins + 8;            // walk to station + ride + exit
  const arrive = toHHMM(arriveMin);
  return [
    { id: 'haneda', time: '09:00', title: 'Exit Haneda Terminal 3', ja: '羽田空港 第3ターミナル', icon: 'plane', pt: 'haneda', kind: 'start',
      desc: 'Suica card and eSIM are ready at the counter. Point your camera at any sign and Trip DNA reads it aloud.',
      chips: { leisure: ['Signs read aloud'], business: ['Fast-track lane', 'Lounge Wi-Fi'], study: ['Student SIM ¥1,980'] }, cost: 0,
      leg: { line: 'keikyu', then: 'asakusa', mins: 42, fare: 610, label: 'Keikyu → Toei Asakusa Line · direct, no change',
             path: ['haneda','tenkubashi','otorii','kamata','heiwajima','aomono','shinagawa','sengakuji','mita','daimon','shimbashi','higashiginza','nihombashi','asakusabashi','kuramae','asakusa'] } },
    { id: 'homestay', time: '10:00', title: 'Freshen up at the Sato family homestay', ja: '佐藤家の町家', icon: 'home', pt: 'homestay', kind: 'stay', partner: 10,
      desc: 'Hot shower, a bowl of matcha, and your suitcase leaves for tonight’s ryokan by takkyubin. Travel light all day.',
      chips: { leisure: ['Local host', 'Luggage sent ahead'], business: ['Desk + power', 'Iron & steamer'], study: ['学割 −15%'] }, cost: 2100, culture: 25,
      leg: { line: 'walk', mins: 6, label: 'Walk 6 min · through Kaminarimon', path: ['homestay','sensoji'] } },
    { id: 'sensoji', time: '10:50', title: 'Walk around Senso-ji', ja: '浅草寺・雷門', icon: 'torii', pt: 'sensoji', kind: 'culture',
      desc: 'Tokyo’s oldest temple, founded in 645. Wash hands at the chozuya, then draw an omikuji fortune for ¥100.',
      tip: 'Bow once at the gate. Photos are fine outside, not inside the main hall.',
      chips: { leisure: ['Since 645', 'Etiquette card'], business: ['30 min version'], study: ['History notes'] }, cost: 100, culture: 50,
      leg: { line: 'walk', mins: 2, label: 'Walk 2 min', path: ['sensoji','nakamise'] } },
    { id: 'nakamise', time: '11:40', title: 'Nakamise-dori market', ja: '仲見世通り', icon: 'lantern', pt: 'nakamise', kind: 'market',
      desc: '89 stalls of ningyo-yaki, kibi dango and hand-painted fans. Pick up souvenirs for home here.',
      chips: { leisure: ['Souvenirs', 'Street snacks'], business: ['Gift-wrapped omiyage'], study: ['Snacks under ¥300'] }, cost: 800, culture: 30,
      leg: { line: 'walk', mins: 4, label: 'Walk 4 min', path: ['nakamise','lunch'] } },
    { id: 'lunch', time: '12:15', title: null, ja: null, icon: 'bowl', pt: 'lunch', kind: 'lunch', slot: true, cost: 0,
      leg: { line: d.leg.line, mins: legMins, fare: d.leg.fare, label: `${LINES[d.leg.line].name} · ${d.leg.from} → ${d.leg.to}`, path: d.leg.path, walkBefore: 4 } },
    { id: 'dest', time: '14:00', arrive, title: d.name, ja: d.ja, icon: 'lock', pt: d.pt, kind: 'locked', locked: true,
      desc: `${d.note}. You arrive at ${arrive}, so there is time to breathe before your slot.`,
      chips: { leisure: ['Ticket in wallet'], business: ['Quiet floor nearby'], study: ['Student ticket'] }, cost: 2200,
      leg: ['shibuyasky', 'crossing', 'meiji'].includes(d.id)
        ? { line: 'walk', mins: 15, label: 'Walk 15 min · Cat Street', path: [d.pt, 'harajuku'] }
        : { line: 'ginza', mins: 25, fare: 210, label: 'Ginza Line → Omotesando, walk to Harajuku', path: [d.pt, 'ueno', 'kanda', 'ginza', 'toranomon', 'akasaka', 'aoyama', 'omotesando', 'harajuku'] } },
    { id: 'harajuku', time: '15:30', title: 'Harajuku and Meiji Jingu', ja: '原宿・明治神宮', icon: 'leaf', pt: 'harajuku', kind: 'culture',
      desc: 'Takeshita-dori for crepes and anime goods, then the quiet forest path to Meiji Jingu.',
      chips: { leisure: ['Anime goods', 'Forest walk'], business: ['Skip if late'], study: ['Free entry'] }, cost: 600, culture: 40,
      leg: { line: 'yamanote', mins: 4, fare: 160, label: 'JR Yamanote Line · Harajuku → Shinjuku', path: ['harajuku','shinjuku'] } },
    { id: 'omoide', time: '17:40', title: 'Omoide Yokocho', ja: '思い出横丁', icon: 'lantern', pt: 'omoide', kind: 'food',
      desc: 'A lane of tiny yakitori bars from the 1940s. One skewer, one photo, then on to the train.',
      chips: { leisure: ['Since 1946'], business: ['Cash only'], study: ['¥150 skewers'] }, cost: 700,
      leg: { line: 'walk', mins: 8, label: 'Walk 8 min · to Odakyu platforms', path: ['omoide','shinjuku'] } },
    { id: 'romance', time: '18:30', title: 'Romancecar to Hakone-Yumoto', ja: 'ロマンスカー 箱根湯本行き', icon: 'train', pt: 'shinjuku', kind: 'train',
      desc: 'Reserved seat, Car 3 · 8A. Window side: look for Mount Fuji after Odawara.', train: true,
      chips: { leisure: ['Seat 3-8A'], business: ['Power outlet'], study: ['Rail pass OK'] }, cost: 2470,
      leg: { line: 'odakyu', mins: 85, label: 'Odakyu Romancecar · 85 min', path: ['shinjuku','hakoneEdge'] } },
    { id: 'ryokan', time: '20:30', title: 'Ryokan, kaiseki dinner and onsen', ja: '箱根の旅館', icon: 'onsen', pt: null, kind: 'stay', partner: 12,
      desc: 'Okami-san serves a nine-course kaiseki dinner, then the outdoor onsen is open until midnight.',
      chips: { leisure: ['Kaiseki 20:30', 'Onsen'], business: ['Late check-out'], study: ['Shared room ¥8,800'] }, cost: 0, culture: 45 }
  ];
}

const CUISINES = [
  { id: 'ramen', label: 'Ramen', ja: 'ラーメン' },
  { id: 'sushi', label: 'Sushi', ja: '寿司' },
  { id: 'veg', label: 'Vegetarian', ja: '精進料理' },
  { id: 'tempura', label: 'Tempura', ja: '天ぷら' }
];

const RESTAURANTS = {
  ramen: [
    { id: 'kaminari', name: 'Menya Kaminari', ja: '麺屋 雷', sub: 'Tonkotsu · rich pork broth', rating: 4.6, reviews: '1.2k', price: '¥1,100–1,400', cost: 1250, walk: 4, partner: 10, tags: ['English ticket machine', 'Solo booths'], art: { type: 'ramen', broth: '#EBD9B4', rim: '#C8102E', egg: true, chashu: 3 } },
    { id: 'sumida', name: 'Sumida Shoyu', ja: '隅田醤油', sub: 'Tokyo shoyu · clear chicken broth', rating: 4.4, reviews: '860', price: '¥900–1,200', cost: 1050, walk: 6, tags: ['Since 1962', 'Counter seats'], art: { type: 'ramen', broth: '#B9773A', rim: '#231815', egg: true, chashu: 2 } },
    { id: 'hokkai', name: 'Hokkai Miso-ya', ja: '北海味噌屋', sub: 'Sapporo miso · butter and corn', rating: 4.3, reviews: '540', price: '¥1,200–1,500', cost: 1350, walk: 8, tags: ['Big portions'], art: { type: 'ramen', broth: '#D39A4F', rim: '#1E3A5F', corn: true, chashu: 2 } },
    { id: 'midori', name: 'Midori Vegan Ramen', ja: '緑', sub: 'Plant-based tantanmen', rating: 4.5, reviews: '710', price: '¥1,300–1,600', cost: 1450, walk: 5, partner: 15, tags: ['Vegan', 'Jain on request'], art: { type: 'ramen', broth: '#C9783A', rim: '#6B8F47', greens: true, chashu: 0 } }
  ],
  sushi: [
    { id: 'ichi', name: 'Kaminarimon Sushi Ichi', ja: '雷門鮨 一', sub: 'Counter omakase lunch · 10 pieces', rating: 4.7, reviews: '930', price: '¥3,500–5,000', cost: 4200, walk: 7, partner: 10, tags: ['Chef speaks English'], art: { type: 'sushi', fish: ['#E9604A', '#F3A27A', '#F6E3C9', '#C8102E'] } },
    { id: 'kaiten', name: 'Kaiten Asakusa', ja: '回転あさくさ', sub: 'Conveyor belt · tablet in 6 languages', rating: 4.2, reviews: '2.1k', price: '¥1,500–2,500', cost: 2000, walk: 3, tags: ['Kid friendly', 'Fast'], art: { type: 'sushi', fish: ['#F3A27A', '#F2C14E', '#E9604A', '#F6E3C9'] } },
    { id: 'tamago', name: 'Tamago-ya Sasa', ja: '玉子屋 笹', sub: 'Tamagoyaki and vegetable rolls', rating: 4.4, reviews: '410', price: '¥1,200–2,000', cost: 1600, walk: 9, tags: ['Veg options'], art: { type: 'sushi', fish: ['#F2C14E', '#F2C14E', '#6B8F47', '#F2C14E'] } }
  ],
  veg: [
    { id: 'hanakago', name: 'Shojin Hanakago', ja: '精進 花かご', sub: 'Buddhist temple cuisine · 7 small dishes', rating: 4.8, reviews: '620', price: '¥2,800–3,500', cost: 3100, walk: 6, partner: 12, tags: ['Vegan', 'No onion or garlic'], art: { type: 'veg', tray: '#7A2E1F' } },
    { id: 'bento', name: 'Asakusa Veg Bento', ja: '浅草ベジ弁当', sub: 'Seasonal bento to eat by the river', rating: 4.3, reviews: '380', price: '¥1,000–1,400', cost: 1200, walk: 4, tags: ['Takeaway', 'Halal-friendly'], art: { type: 'veg', tray: '#231815' } },
    { id: 'komorebi', name: 'Café Komorebi', ja: '木漏れ日', sub: 'Tofu set and matcha', rating: 4.5, reviews: '510', price: '¥1,400–1,900', cost: 1650, walk: 5, tags: ['Quiet', 'Garden view'], art: { type: 'veg', tray: '#6B4A2B' } }
  ],
  tempura: [
    { id: 'sanja', name: 'Tendon Sanja', ja: '天丼 三社', sub: 'Sesame-oil tendon, Asakusa style', rating: 4.6, reviews: '1.4k', price: '¥1,500–2,200', cost: 1800, walk: 3, partner: 10, tags: ['Since 1948'], art: { type: 'tempura', bowl: '#1E3A5F' } },
    { id: 'kikuya', name: 'Kakiage Kikuya', ja: '菊屋', sub: 'Vegetable kakiage over rice', rating: 4.3, reviews: '470', price: '¥1,100–1,500', cost: 1300, walk: 6, tags: ['Veg option'], art: { type: 'tempura', bowl: '#7A2E1F' } },
    { id: 'shin', name: 'Edomae Tempura Shin', ja: '天ぷら 新', sub: 'Counter tempura course', rating: 4.7, reviews: '350', price: '¥4,000–6,000', cost: 5000, walk: 8, tags: ['Reservation only'], art: { type: 'tempura', bowl: '#231815' } }
  ]
};

/* Disruption: options to reach the ryokan after missing the 18:30 Romancecar. Axis 18:30–21:30. */
const DISRUPTION = {
  detectedAt: '18:34',
  deadline: '20:30',
  options: [
    { id: 'A', title: 'Next Romancecar', sub: 'Shinjuku 19:00 → Hakone-Yumoto 20:27', best: true, arrive: '20:40', cost: '+¥1,200', costNote: 'new seat fee, fare still valid',
      facts: ['3 seats left', 'No transfers', 'Window seat 4-12C'], verdict: 'ok', verdictText: 'Dinner moved to 20:45',
      segs: [['18:34','18:45','walk'], ['18:45','19:00','wait'], ['19:00','20:27','odakyu'], ['20:27','20:40','walk']],
      newStop: { time: '19:00', title: 'Romancecar to Hakone-Yumoto', ja: 'ロマンスカー 19:00発', desc: 'Rebooked: Car 4 · Seat 12C. Your base fare ticket is still valid.', chips: ['Seat 4-12C', 'Rebooked'], line: 'odakyu', mins: 87, label: 'Odakyu Romancecar · 87 min' },
      ryokan: { time: '20:40', note: 'Okami-san moved your kaiseki dinner to 20:45.' } },
    { id: 'B', title: 'Rapid Express + change', sub: 'Shinjuku 18:42 → Odawara → Hakone-Yumoto 20:24', arrive: '20:50', cost: '+¥0', costNote: 'covered by your fare',
      facts: ['1 transfer at Odawara', 'May stand 40 min'], verdict: 'ok', verdictText: 'Dinner at 21:00, last serving',
      segs: [['18:34','18:42','walk'], ['18:42','19:58','odakyu'], ['19:58','20:08','wait'], ['20:08','20:24','tozan'], ['20:24','20:50','walk']],
      newStop: { time: '18:42', title: 'Rapid Express, change at Odawara', ja: '快速急行 18:42発', desc: 'Platform 4. Change at Odawara to the Hakone Tozan Line, platform 11.', chips: ['No extra cost', '1 transfer'], line: 'odakyu', mins: 102, label: 'Odakyu Rapid Express + Hakone Tozan Line' },
      ryokan: { time: '20:50', note: 'Okami-san will serve dinner at 21:00, the last seating.' } },
    { id: 'C', title: 'Highway bus', sub: 'Busta Shinjuku 19:05 → Hakone-Yumoto', arrive: '21:10', cost: '¥2,330', costNote: 'new ticket',
      facts: ['Traffic risk on Tomei', 'Reclining seats'], verdict: 'late', verdictText: 'Misses dinner, bento in room',
      segs: [['18:34','18:55','walk'], ['18:55','19:05','wait'], ['19:05','21:00','bus'], ['21:00','21:10','walk']],
      newStop: { time: '19:05', title: 'Highway bus to Hakone', ja: '高速バス 19:05発', desc: 'Busta Shinjuku, 4th floor, gate C6.', chips: ['Seat 7D'], line: 'bus', mins: 115, label: 'Odakyu Hakone highway bus' },
      ryokan: { time: '21:10', note: 'Dinner missed. Okami-san will leave a bento in your room.' } },
    { id: 'D', title: 'Taxi all the way', sub: 'From Shinjuku West Exit, 85 km', arrive: '21:00', cost: '¥36,000', costNote: 'tolls included',
      facts: ['Door to door', '30× the cost of option A'], verdict: 'bad', verdictText: 'Not worth it',
      segs: [['18:34','18:40','wait'], ['18:40','21:00','taxi']],
      newStop: { time: '18:40', title: 'Taxi to Hakone', ja: 'タクシー', desc: 'Shinjuku West Exit taxi rank. Driver has the ryokan address in Japanese.', chips: ['¥36,000'], line: 'taxi', mins: 140, label: 'Taxi via Tomei Expressway' },
      ryokan: { time: '21:00', note: 'Okami-san will keep dinner warm until 21:15.' } }
  ]
};

const MODES = {
  leisure: {
    cards: [
      { icon: 'tea', kicker: '茶の湯 · Chanoyu', title: 'Tea ceremony with Haruko', meta: 'Asakusa · 16:30 · ¥3,500', badge: '−15%', foot: 'Exchange: teach her 5 words of your language' },
      { icon: 'kimono', kicker: '着物 · Kimono', title: 'Kimono walk with Aiko', meta: 'Asakusa · 2 h · ¥5,500', badge: '−15%', foot: 'She shows you how to walk and sit in it' },
      { icon: 'kintsugi', kicker: 'もったいない · Mottainai', title: 'Kintsugi with Kenji', meta: 'Ueno · 15:00 · ¥6,000', badge: '−10%', foot: 'Repair a plate with gold, take it home' },
      { icon: 'doll', kicker: '雛祭り · Hina Matsuri', title: 'Seven-tier doll display', meta: 'Asakusa · free', badge: 'Free', foot: 'Ask the shop owner about the emperor and empress dolls' }
    ],
    pins: []
  },
  business: {
    cards: [
      { icon: 'handshake', kicker: 'Meetup · tonight', title: 'Tokyo Founders Night', meta: 'Shibuya · 19:00 · 120 going', badge: '¥1,000', foot: 'Request an intro to 3 attendees in your industry' },
      { icon: 'room', kicker: 'Book a space', title: 'Meeting room, 15th floor', meta: 'Shibuya · Wi-Fi, screen · ¥1,500/h', badge: 'Book 1 h', foot: 'Next free slot 16:00' },
      { icon: 'factory', kicker: 'Company visit', title: 'Robotics showroom tour', meta: 'Odaiba · Thu 10:00', badge: 'Free', foot: 'Registration closes tomorrow' },
      { icon: 'card', kicker: '名刺 · Meishi', title: 'Business card etiquette', meta: '30-second guide', badge: 'Guide', foot: 'Give and receive with both hands, read it before you put it away' },
      { icon: 'phone', kicker: 'Business numbers', title: 'Trade office · interpreter 24/7', meta: 'One tap, in your language', badge: 'Call', foot: 'Chamber of commerce · legal help line' }
    ],
    pins: [
      { pt: [35.6585, 139.7022], label: 'Meeting room' }, { pt: [35.6812, 139.7671], label: 'Marunouchi coworking' },
      { pt: [35.6250, 139.7756], label: 'Robotics showroom' }, { pt: [35.6604, 139.7292], label: 'Founders Night' }
    ]
  },
  study: {
    cards: [
      { icon: 'cap', kicker: 'University', title: 'UTokyo campus walk', meta: 'Hongo · Sat 11:00 · Akamon gate', badge: 'Free', foot: 'Led by a current international student' },
      { icon: 'scroll', kicker: 'Opportunity', title: 'MEXT scholarship session', meta: 'Online · 2 Nov · in 6 languages', badge: 'Join', foot: 'Covers tuition and a monthly stipend' },
      { icon: 'ticket', kicker: '学割 · Gakuwari', title: 'Student prices, everywhere', meta: '140 museums and venues', badge: '−20%', foot: 'Show your student ID in the app' },
      { icon: 'flask', kicker: 'Research lab', title: 'Open lab day at Miraikan', meta: 'Odaiba · robotics and space', badge: '¥320', foot: 'Talk to researchers after the demo' },
      { icon: 'ikigai', kicker: '生き甲斐 · Ikigai', title: 'Find your ikigai in Japan', meta: '4-question exercise', badge: '3 min', foot: 'What you love, what you are good at, what the world needs, what pays' }
    ],
    pins: [
      { pt: [35.7128, 139.7620], label: 'UTokyo' }, { pt: [35.7090, 139.7197], label: 'Waseda' },
      { pt: [35.6493, 139.7425], label: 'Keio' }, { pt: [35.6194, 139.7764], label: 'Miraikan' }
    ]
  }
};

const FEED = [
  { id: 'p1', who: 'Ananya', from: 'Jaipur', initials: 'AN', hue: '#E9604A', time: '12 min', art: 'fuji',
    text: 'From Mount Abu to Mount Fuji. Saw her from the Romancecar window and the whole carriage went quiet.',
    likes: 214, comments: [{ who: 'Yuki', local: 'Odawara', text: 'Best view is from the left side after Odawara. ようこそ!' }] },
  { id: 'p2', who: 'Kenji Ito', from: 'Ueno', local: true, initials: 'KI', hue: '#C9A227', time: '40 min', art: 'kintsugi',
    text: 'Mottainai: repair, don’t replace. Bring a chipped cup to my studio this week and we will mend it with gold together.',
    likes: 388, comments: [{ who: 'Lucía', text: 'Booked for Thursday!' }] },
  { id: 'p3', who: 'Min-jun', from: 'Seoul', initials: 'MJ', hue: '#1E7BC4', time: '1 h', art: 'hina',
    text: 'Seven tiers of Hina Matsuri dolls in a tiny Asakusa shop. The owner explained every single one.',
    likes: 156, comments: [{ who: 'Aiko Mori', local: 'Asakusa', text: 'Come back on 3 March for the festival. I will lend you a kimono.' }] },
  { id: 'p4', who: 'Lucía', from: 'Madrid', initials: 'LU', hue: '#6B8F47', time: '3 h', art: 'othello',
    text: 'Lost three games of Othello to a retired engineer in an Akihabara café. Did you know Othello was invented in Japan?',
    likes: 97, comments: [] }
];

const LOCALS = [
  { name: 'Haruko Sato', role: 'Tea ceremony host · Asakusa', initials: 'HS', hue: '#D9123D', offer: 'Teach her 5 words of your language' },
  { name: 'Kenji Ito', role: 'Kintsugi studio · Ueno', initials: 'KI', hue: '#C9A227', offer: 'Share a story of something you repaired' },
  { name: 'Aiko Mori', role: 'Kimono rental · Asakusa', initials: 'AM', hue: '#1E7BC4', offer: 'Show her a photo of clothes from home' }
];

const LANGS = [
  { code: 'en', native: 'English', name: 'English', hello: 'Welcome' },
  { code: 'ja', native: '日本語', name: 'Japanese', hello: 'ようこそ' },
  { code: 'hi', native: 'हिन्दी', name: 'Hindi', hello: 'स्वागत है' },
  { code: 'ko', native: '한국어', name: 'Korean', hello: '환영합니다' },
  { code: 'zh', native: '中文', name: 'Chinese', hello: '欢迎' },
  { code: 'es', native: 'Español', name: 'Spanish', hello: 'Bienvenida' }
];

const I18N = {
  en: {
    'tab.itinerary': 'Itinerary', 'tab.feed': 'Tabi Feed', 'mode.leisure': 'Leisure', 'mode.business': 'Business', 'mode.study': 'Study',
    'tag.leisure': 'Less worry. More culture.', 'tag.business': 'Less hassle. More handshakes.', 'tag.study': 'Less confusion. More curiosity.',
    'form.title': 'Plan your first day', 'form.sub': 'A few quick questions, one at a time. Tap an answer to move on.',
    'f.arrival': 'How are you arriving?', 'f.airport': 'Airport', 'f.rail': 'Railway', 'f.port': 'Port', 'f.bus': 'Highway bus',
    'f.landing': 'Landing at', 'f.time': 'Arrival time', 'f.dest': 'Must reach by 14:00', 'f.pick': 'Pick on map', 'f.change': 'Change',
    'f.prefs': 'What do you enjoy?', 'f.pace': 'Pace', 'pace.relaxed': 'Relaxed', 'pace.balanced': 'Balanced', 'pace.packed': 'Packed',
    'f.budget': 'Budget for today', 'f.diet': 'Food', 'f.why': 'Why are you in Japan?', 'f.weave': 'Weave my day', 'f.needdest': 'Lock a destination to continue',
    'map.search': 'Search a place in Tokyo', 'map.lock': 'Lock for 14:00', 'map.locked': 'Locked',
    'load.title': 'Weaving your Trip DNA', 'tl.title': 'Day 1 · Tokyo', 'tl.buffer': 'early', 'tl.budget': 'of budget', 'tl.culture': 'culture time',
    'tl.lunch': 'Choose lunch', 'tl.lunchsub': 'Near Senso-ji, ready by 12:15', 'tl.missed': 'I missed this train',
    'food.title': 'What are you craving?', 'food.add': 'Add to itinerary', 'food.walk': 'min walk',
    'book.title': 'Book a table', 'book.time': 'Time', 'book.party': 'Guests', 'book.pay': 'Payment', 'book.payat': 'Pay at restaurant', 'book.paynow': 'Pay now · 5% off', 'book.confirm': 'Confirm booking',
    'dis.toast': 'Looks like you missed the 18:30 Romancecar.', 'dis.show': 'Show options', 'dis.title': 'Get to your ryokan for dinner', 'dis.rebook': 'Rebook', 'dis.best': 'Recommended',
    'foryou': 'For you', 'feed.compose': 'Share a moment', 'feed.post': 'Post', 'feed.like': 'Like', 'feed.comment': 'Comment',
    'feed.wallet': 'Your coupons', 'feed.locals': 'Locals open to exchange', 'feed.trending': 'Trending',
    'env.title': 'You unlocked an otoshidama', 'env.tap': 'Tap to open', 'env.done': 'Save to wallet', 'dock.reset': 'Reset', 'dock.auto': 'Autoplay',
    'q.landing': 'Where do you land?', 'q.time': 'When do you land?', 'q.dest': 'Where must you be by 14:00?', 'q.pace': 'How do you like to travel?', 'q.budget': 'What\'s your budget for today?', 'q.diet': 'Anything we should know about food?', 'q.ready': 'Ready. Here is what we know.', 'wz.next': 'Next', 'wz.step': 'Question', 'wz.sug': 'Suggested'
  },
  ja: {
    'tab.itinerary': '旅程', 'tab.feed': '旅フィード', 'mode.leisure': '観光', 'mode.business': 'ビジネス', 'mode.study': '留学',
    'tag.leisure': '心配は少なく、文化はもっと。', 'tag.business': '手間は少なく、握手はもっと。', 'tag.study': '迷いは少なく、好奇心はもっと。',
    'form.title': '初日の計画', 'form.sub': 'いくつか簡単な質問をひとつずつ。答えをタップすると次へ進みます。',
    'f.arrival': '到着方法', 'f.airport': '空港', 'f.rail': '鉄道', 'f.port': '港', 'f.bus': '高速バス',
    'f.landing': '到着地', 'f.time': '到着時刻', 'f.dest': '14:00までに行く場所', 'f.pick': '地図で選ぶ', 'f.change': '変更',
    'f.prefs': '好きなこと', 'f.pace': 'ペース', 'pace.relaxed': 'ゆったり', 'pace.balanced': 'ふつう', 'pace.packed': 'ぎっしり',
    'f.budget': '今日の予算', 'f.diet': '食事', 'f.why': '来日の目的', 'f.weave': '一日を組み立てる', 'f.needdest': '続けるには行き先を固定してください',
    'map.search': '東京の場所を検索', 'map.lock': '14:00に固定', 'map.locked': '決定',
    'load.title': 'あなたのTrip DNAを編んでいます', 'tl.title': '1日目・東京', 'tl.buffer': '早めに到着', 'tl.budget': '予算使用', 'tl.culture': '文化体験',
    'tl.lunch': 'ランチを選ぶ', 'tl.lunchsub': '浅草寺の近く・12:15から', 'tl.missed': 'この電車に乗り遅れた',
    'food.title': '何が食べたい？', 'food.add': '旅程に追加', 'food.walk': '分（徒歩）',
    'book.title': '席を予約', 'book.time': '時間', 'book.party': '人数', 'book.pay': '支払い', 'book.payat': '店で支払う', 'book.paynow': '今すぐ支払う・5%オフ', 'book.confirm': '予約を確定',
    'dis.toast': '18:30のロマンスカーに乗り遅れたようです。', 'dis.show': '代わりを見る', 'dis.title': '夕食までに旅館へ', 'dis.rebook': '予約し直す', 'dis.best': 'おすすめ',
    'foryou': 'あなたへ', 'feed.compose': '瞬間をシェア', 'feed.post': '投稿', 'feed.like': 'いいね', 'feed.comment': 'コメント',
    'feed.wallet': 'クーポン', 'feed.locals': '交流できる地元の人', 'feed.trending': 'トレンド',
    'env.title': 'お年玉をもらいました', 'env.tap': 'タップして開く', 'env.done': 'ウォレットに保存', 'dock.reset': 'リセット', 'dock.auto': '自動再生',
    'q.landing': 'どこに到着しますか？', 'q.time': '何時に到着しますか？', 'q.dest': '14:00までにどこへ行きますか？', 'q.pace': 'どんなペースで旅しますか？', 'q.budget': '今日の予算は？', 'q.diet': '食事で気をつけることは？', 'q.ready': '準備完了。わかったことはこちら。', 'wz.next': '次へ', 'wz.step': '質問', 'wz.sug': 'おすすめ'
  },
  hi: {
    'tab.itinerary': 'यात्रा योजना', 'tab.feed': 'ताबी फ़ीड', 'mode.leisure': 'घूमना', 'mode.business': 'व्यापार', 'mode.study': 'पढ़ाई',
    'tag.leisure': 'चिंता कम, संस्कृति ज़्यादा।', 'tag.business': 'झंझट कम, मुलाक़ातें ज़्यादा।', 'tag.study': 'उलझन कम, जिज्ञासा ज़्यादा।',
    'form.title': 'पहले दिन की योजना', 'form.sub': 'कुछ आसान सवाल, एक-एक करके। जवाब पर टैप करें और आगे बढ़ें।',
    'f.arrival': 'आप कैसे पहुँच रहे हैं?', 'f.airport': 'हवाई अड्डा', 'f.rail': 'रेल', 'f.port': 'बंदरगाह', 'f.bus': 'हाईवे बस',
    'f.landing': 'उतरने की जगह', 'f.time': 'पहुँचने का समय', 'f.dest': '14:00 तक पहुँचना है', 'f.pick': 'नक्शे पर चुनें', 'f.change': 'बदलें',
    'f.prefs': 'आपको क्या पसंद है?', 'f.pace': 'रफ़्तार', 'pace.relaxed': 'आराम से', 'pace.balanced': 'संतुलित', 'pace.packed': 'भरपूर',
    'f.budget': 'आज का बजट', 'f.diet': 'खाना', 'f.why': 'आप जापान क्यों आए हैं?', 'f.weave': 'मेरा दिन बुनें', 'f.needdest': 'आगे बढ़ने के लिए गंतव्य तय करें',
    'map.search': 'टोक्यो में जगह खोजें', 'map.lock': '14:00 के लिए तय करें', 'map.locked': 'तय',
    'load.title': 'आपका Trip DNA बुना जा रहा है', 'tl.title': 'दिन 1 · टोक्यो', 'tl.buffer': 'पहले', 'tl.budget': 'बजट इस्तेमाल', 'tl.culture': 'संस्कृति का समय',
    'tl.lunch': 'दोपहर का खाना चुनें', 'tl.lunchsub': 'सेंसो-जी के पास, 12:15 से', 'tl.missed': 'यह ट्रेन छूट गई',
    'food.title': 'क्या खाने का मन है?', 'food.add': 'योजना में जोड़ें', 'food.walk': 'मिनट पैदल',
    'book.title': 'टेबल बुक करें', 'book.time': 'समय', 'book.party': 'लोग', 'book.pay': 'भुगतान', 'book.payat': 'रेस्टोरेंट में भुगतान', 'book.paynow': 'अभी भुगतान · 5% छूट', 'book.confirm': 'बुकिंग पक्की करें',
    'dis.toast': 'लगता है आपकी 18:30 की रोमांसकार छूट गई।', 'dis.show': 'विकल्प देखें', 'dis.title': 'खाने से पहले र्योकान पहुँचें', 'dis.rebook': 'फिर से बुक करें', 'dis.best': 'सुझाया गया',
    'foryou': 'आपके लिए', 'feed.compose': 'एक पल साझा करें', 'feed.post': 'पोस्ट करें', 'feed.like': 'पसंद', 'feed.comment': 'टिप्पणी',
    'feed.wallet': 'आपके कूपन', 'feed.locals': 'आदान-प्रदान के लिए स्थानीय लोग', 'feed.trending': 'ट्रेंडिंग',
    'env.title': 'आपको ओतोशिदामा मिला', 'env.tap': 'खोलने के लिए टैप करें', 'env.done': 'वॉलेट में सहेजें', 'dock.reset': 'रीसेट', 'dock.auto': 'ऑटोप्ले',
    'q.landing': 'आप कहाँ उतर रहे हैं?', 'q.time': 'आप कब पहुँचेंगे?', 'q.dest': '14:00 तक आपको कहाँ पहुँचना है?', 'q.pace': 'आप किस रफ़्तार से घूमना पसंद करते हैं?', 'q.budget': 'आज का बजट कितना है?', 'q.diet': 'खाने के बारे में कुछ बताना है?', 'q.ready': 'तैयार। हमें यह पता है।', 'wz.next': 'आगे', 'wz.step': 'सवाल', 'wz.sug': 'सुझाव'
  },
  ko: {
    'tab.itinerary': '일정', 'tab.feed': '타비 피드', 'mode.leisure': '여행', 'mode.business': '비즈니스', 'mode.study': '유학',
    'tag.leisure': '걱정은 적게, 문화는 더 많이.', 'tag.business': '번거로움은 적게, 만남은 더 많이.', 'tag.study': '혼란은 적게, 호기심은 더 많이.',
    'form.title': '첫날 계획', 'form.sub': '간단한 질문을 하나씩 드릴게요. 답을 누르면 다음으로 넘어가요.',
    'f.arrival': '어떻게 도착하나요?', 'f.airport': '공항', 'f.rail': '철도', 'f.port': '항구', 'f.bus': '고속버스',
    'f.landing': '도착지', 'f.time': '도착 시간', 'f.dest': '14:00까지 도착할 곳', 'f.pick': '지도에서 선택', 'f.change': '변경',
    'f.prefs': '좋아하는 것', 'f.pace': '속도', 'pace.relaxed': '여유롭게', 'pace.balanced': '적당히', 'pace.packed': '알차게',
    'f.budget': '오늘 예산', 'f.diet': '식사', 'f.why': '일본에 온 목적', 'f.weave': '하루 일정 만들기', 'f.needdest': '계속하려면 목적지를 고정하세요',
    'map.search': '도쿄에서 장소 검색', 'map.lock': '14:00으로 고정', 'map.locked': '확정',
    'load.title': '당신의 Trip DNA를 엮는 중', 'tl.title': '1일차 · 도쿄', 'tl.buffer': '일찍 도착', 'tl.budget': '예산 사용', 'tl.culture': '문화 시간',
    'tl.lunch': '점심 고르기', 'tl.lunchsub': '센소지 근처 · 12:15부터', 'tl.missed': '이 열차를 놓쳤어요',
    'food.title': '무엇이 먹고 싶나요?', 'food.add': '일정에 추가', 'food.walk': '분 도보',
    'book.title': '테이블 예약', 'book.time': '시간', 'book.party': '인원', 'book.pay': '결제', 'book.payat': '식당에서 결제', 'book.paynow': '지금 결제 · 5% 할인', 'book.confirm': '예약 확정',
    'dis.toast': '18:30 로망스카를 놓치신 것 같아요.', 'dis.show': '대안 보기', 'dis.title': '저녁 식사 전에 료칸 도착', 'dis.rebook': '다시 예약', 'dis.best': '추천',
    'foryou': '추천', 'feed.compose': '순간을 공유하세요', 'feed.post': '게시', 'feed.like': '좋아요', 'feed.comment': '댓글',
    'feed.wallet': '내 쿠폰', 'feed.locals': '교류할 현지인', 'feed.trending': '인기',
    'env.title': '오토시다마를 받았어요', 'env.tap': '눌러서 열기', 'env.done': '지갑에 저장', 'dock.reset': '초기화', 'dock.auto': '자동 재생',
    'q.landing': '어디에 도착하나요?', 'q.time': '몇 시에 도착하나요?', 'q.dest': '14:00까지 어디에 가야 하나요?', 'q.pace': '어떤 속도로 여행하나요?', 'q.budget': '오늘 예산은 얼마인가요?', 'q.diet': '음식 관련해서 알려 줄 것이 있나요?', 'q.ready': '준비 완료. 지금까지 알게 된 내용이에요.', 'wz.next': '다음', 'wz.step': '질문', 'wz.sug': '추천'
  },
  zh: {
    'tab.itinerary': '行程', 'tab.feed': '旅途动态', 'mode.leisure': '观光', 'mode.business': '商务', 'mode.study': '留学',
    'tag.leisure': '少些担忧，多些文化。', 'tag.business': '少些麻烦，多些握手。', 'tag.study': '少些困惑，多些好奇。',
    'form.title': '规划第一天', 'form.sub': '几个简单问题，一次一个。点选答案即可继续。',
    'f.arrival': '你如何抵达？', 'f.airport': '机场', 'f.rail': '铁路', 'f.port': '港口', 'f.bus': '高速巴士',
    'f.landing': '抵达地点', 'f.time': '抵达时间', 'f.dest': '14:00 前要到达', 'f.pick': '在地图上选择', 'f.change': '更改',
    'f.prefs': '你喜欢什么？', 'f.pace': '节奏', 'pace.relaxed': '轻松', 'pace.balanced': '适中', 'pace.packed': '紧凑',
    'f.budget': '今日预算', 'f.diet': '饮食', 'f.why': '来日本的目的', 'f.weave': '编排我的一天', 'f.needdest': '请先锁定目的地',
    'map.search': '搜索东京的地点', 'map.lock': '锁定 14:00', 'map.locked': '决定',
    'load.title': '正在编织你的 Trip DNA', 'tl.title': '第1天 · 东京', 'tl.buffer': '提前到达', 'tl.budget': '预算已用', 'tl.culture': '文化时间',
    'tl.lunch': '选择午餐', 'tl.lunchsub': '浅草寺附近 · 12:15 起', 'tl.missed': '我错过了这班车',
    'food.title': '想吃什么？', 'food.add': '加入行程', 'food.walk': '分钟步行',
    'book.title': '预订座位', 'book.time': '时间', 'book.party': '人数', 'book.pay': '付款', 'book.payat': '到店付款', 'book.paynow': '立即付款 · 95折', 'book.confirm': '确认预订',
    'dis.toast': '你似乎错过了 18:30 的浪漫特快。', 'dis.show': '查看方案', 'dis.title': '晚餐前赶到旅馆', 'dis.rebook': '重新预订', 'dis.best': '推荐',
    'foryou': '为你推荐', 'feed.compose': '分享此刻', 'feed.post': '发布', 'feed.like': '赞', 'feed.comment': '评论',
    'feed.wallet': '我的优惠券', 'feed.locals': '愿意交流的当地人', 'feed.trending': '热门',
    'env.title': '你获得了一份压岁钱', 'env.tap': '点击打开', 'env.done': '存入钱包', 'dock.reset': '重置', 'dock.auto': '自动播放',
    'q.landing': '你在哪里抵达？', 'q.time': '几点抵达？', 'q.dest': '14:00 前必须到哪里？', 'q.pace': '你喜欢什么旅行节奏？', 'q.budget': '今天的预算是多少？', 'q.diet': '饮食方面有什么要求？', 'q.ready': '准备好了。以下是你的信息。', 'wz.next': '下一步', 'wz.step': '问题', 'wz.sug': '推荐'
  },
  es: {
    'tab.itinerary': 'Itinerario', 'tab.feed': 'Tabi Feed', 'mode.leisure': 'Turismo', 'mode.business': 'Negocios', 'mode.study': 'Estudios',
    'tag.leisure': 'Menos preocupación. Más cultura.', 'tag.business': 'Menos trámites. Más apretones de manos.', 'tag.study': 'Menos confusión. Más curiosidad.',
    'form.title': 'Planifica tu primer día', 'form.sub': 'Unas preguntas rápidas, una a la vez. Toca una respuesta para seguir.',
    'f.arrival': '¿Cómo llegas?', 'f.airport': 'Aeropuerto', 'f.rail': 'Tren', 'f.port': 'Puerto', 'f.bus': 'Autobús',
    'f.landing': 'Llegada a', 'f.time': 'Hora de llegada', 'f.dest': 'Llegar antes de las 14:00', 'f.pick': 'Elegir en el mapa', 'f.change': 'Cambiar',
    'f.prefs': '¿Qué te gusta?', 'f.pace': 'Ritmo', 'pace.relaxed': 'Tranquilo', 'pace.balanced': 'Equilibrado', 'pace.packed': 'Intenso',
    'f.budget': 'Presupuesto de hoy', 'f.diet': 'Comida', 'f.why': '¿Por qué vienes a Japón?', 'f.weave': 'Tejer mi día', 'f.needdest': 'Fija un destino para continuar',
    'map.search': 'Busca un lugar en Tokio', 'map.lock': 'Fijar a las 14:00', 'map.locked': 'Fijado',
    'load.title': 'Tejiendo tu Trip DNA', 'tl.title': 'Día 1 · Tokio', 'tl.buffer': 'antes', 'tl.budget': 'del presupuesto', 'tl.culture': 'de cultura',
    'tl.lunch': 'Elegir almuerzo', 'tl.lunchsub': 'Cerca de Senso-ji, desde las 12:15', 'tl.missed': 'Perdí este tren',
    'food.title': '¿Qué se te antoja?', 'food.add': 'Añadir al itinerario', 'food.walk': 'min a pie',
    'book.title': 'Reservar mesa', 'book.time': 'Hora', 'book.party': 'Personas', 'book.pay': 'Pago', 'book.payat': 'Pagar en el restaurante', 'book.paynow': 'Pagar ahora · 5% menos', 'book.confirm': 'Confirmar reserva',
    'dis.toast': 'Parece que perdiste el Romancecar de las 18:30.', 'dis.show': 'Ver opciones', 'dis.title': 'Llega al ryokan para cenar', 'dis.rebook': 'Reservar de nuevo', 'dis.best': 'Recomendado',
    'foryou': 'Para ti', 'feed.compose': 'Comparte un momento', 'feed.post': 'Publicar', 'feed.like': 'Me gusta', 'feed.comment': 'Comentar',
    'feed.wallet': 'Tus cupones', 'feed.locals': 'Locales abiertos al intercambio', 'feed.trending': 'Tendencias',
    'env.title': 'Desbloqueaste un otoshidama', 'env.tap': 'Toca para abrir', 'env.done': 'Guardar en la cartera', 'dock.reset': 'Reiniciar', 'dock.auto': 'Reproducción automática',
    'q.landing': '¿Dónde aterrizas?', 'q.time': '¿A qué hora llegas?', 'q.dest': '¿Dónde tienes que estar a las 14:00?', 'q.pace': '¿A qué ritmo te gusta viajar?', 'q.budget': '¿Cuál es tu presupuesto para hoy?', 'q.diet': '¿Algo que debamos saber sobre la comida?', 'q.ready': 'Listo. Esto es lo que sabemos.', 'wz.next': 'Siguiente', 'wz.step': 'Pregunta', 'wz.sug': 'Sugerido'
  }
};

function toMin(hhmm) { const [h, m] = hhmm.split(':').map(Number); return h * 60 + m; }
function toHHMM(min) { return String(Math.floor(min / 60)).padStart(2, '0') + ':' + String(min % 60).padStart(2, '0'); }
