/* Trip DNA prototype · inline SVG icons and illustrations (no external images). */

const ICONS = {
  plane: 'M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z',
  home: 'M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z',
  torii: 'M2 4.5c5 1.5 15 1.5 20 0M4 9h16M6 5.5V21M18 5.5V21M12 6v3',
  lantern: 'M9 3h6M9 21h6M12 3v1M12 20v1M7 8c0-2 2-4 5-4s5 2 5 4v8c0 2-2 4-5 4s-5-2-5-4zM7 10h10M7 14h10',
  bowl: 'M3 11h18a9 9 0 0 1-18 0zM8 21h8M9 8c0-2 1.5-2 1.5-4M13 8c0-2 1.5-2 1.5-4',
  lock: 'M6 11h12v10H6zM8 11V7a4 4 0 0 1 8 0v4M12 15v2',
  leaf: 'M5 19C5 10 11 5 20 4c-1 9-6 15-15 15zM5 19l8-8',
  train: 'M6 4h12a2 2 0 0 1 2 2v9a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V6a2 2 0 0 1 2-2zM4 11h16M8 15h.01M16 15h.01M7 21l2-3M17 21l-2-3',
  onsen: 'M5 14c-2 2 0 7 7 7s9-5 7-7M8 11c-1-2 1-3 0-5s1-3 0-4M12 11c-1-2 1-3 0-5s1-3 0-4M16 11c-1-2 1-3 0-5s1-3 0-4',
  walk: 'M13 5.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM10 21l2-6 3 3v3M8 12l3-4 3 1 2 3M12 15l-1-5',
  bus: 'M5 4h14a1 1 0 0 1 1 1v12H4V5a1 1 0 0 1 1-1zM4 11h16M7 20v-3M17 20v-3M7 14h.01M17 14h.01',
  taxi: 'M5 11l2-5h10l2 5M3 11h18v6H3zM6 20v-3M18 20v-3M10 3h4M7 14h.01M17 14h.01',
  tea: 'M3 10h18c0 5-4 9-9 9s-9-4-9-9zM7 21h10M9 7c1-1 1-2 0-3M13 7c1-1 1-2 0-3',
  kimono: 'M8 3l4 5 4-5 5 3-2 4-3-1v12H8V9l-3 1-2-4zM12 8v13M8 13h8',
  kintsugi: 'M3 9h18c0 6-4 10-9 10S3 15 3 9zM10 9l2 3-1 3 2 4',
  doll: 'M12 3a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM6 21c0-6 2-10 6-10s6 4 6 10zM9 2l3 1 3-1',
  handshake: 'M2 12l4-4 4 1 3-2 3 2 6 3M2 12l6 6 2-1 2 2 2-1 2 1 3-3M10 14l2 2M12 12l3 3',
  room: 'M3 7h18v13H3zM9 7V4h6v3M3 12h18',
  factory: 'M3 21V10l6 4v-4l6 4V6l6 3v12zM3 21h18',
  card: 'M3 6h18v12H3zM7 10h6M7 14h10',
  phone: 'M5 3h4l2 5-3 2a12 12 0 0 0 6 6l2-3 5 2v4a2 2 0 0 1-2 2A18 18 0 0 1 3 5a2 2 0 0 1 2-2z',
  cap: 'M2 9l10-5 10 5-10 5zM6 11v5c3 3 9 3 12 0v-5M22 9v6',
  scroll: 'M6 4h12v14a3 3 0 0 1-3 3H6a3 3 0 0 1 0-6h9M9 8h6M9 11h6',
  ticket: 'M3 7h18v3a2 2 0 0 0 0 4v3H3v-3a2 2 0 0 0 0-4zM14 7v10',
  flask: 'M9 3h6M10 3v6L4 19a1 1 0 0 0 1 2h14a1 1 0 0 0 1-2l-6-10V3M7 15h10',
  ikigai: 'M4 9a5 5 0 1 0 10 0 5 5 0 1 0-10 0M10 9a5 5 0 1 0 10 0 5 5 0 1 0-10 0M4 15a5 5 0 1 0 10 0 5 5 0 1 0-10 0M10 15a5 5 0 1 0 10 0 5 5 0 1 0-10 0',
  heart: 'M12 20s-8-5-8-11a4.5 4.5 0 0 1 8-3 4.5 4.5 0 0 1 8 3c0 6-8 11-8 11z',
  comment: 'M4 5h16v11H9l-5 4z',
  search: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM21 21l-5-5',
  globe: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18',
  clock: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7v5l3 2',
  ff: 'M4 6l8 6-8 6zM12 6l8 6-8 6z',
  reset: 'M4 12a8 8 0 1 0 3-6.2M4 4v5h5',
  play: 'M7 5l12 7-12 7z',
  check: 'M5 12l5 5 9-10',
  x: 'M6 6l12 12M18 6L6 18',
  pin: 'M12 21s-7-6-7-12a7 7 0 0 1 14 0c0 6-7 12-7 12zM12 7a2 2 0 1 0 0 4 2 2 0 0 0 0-4z',
  sparkle: 'M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z',
  send: 'M3 11l18-8-8 18-2-8z',
  image: 'M3 5h18v14H3zM3 16l5-5 4 4 3-3 6 6M15 9h.01',
  gift: 'M3 9h18v4H3zM5 13h14v8H5zM12 9v12M12 9c-2 0-5-1-5-3s3-2 5 3c2-5 5-5 5-3s-3 3-5 3',
  chevron: 'M9 6l6 6-6 6',
  alert: 'M12 3l10 18H2zM12 10v4M12 17h.01',
  star: 'M12 3l2.6 5.8 6.4.6-4.8 4.3 1.4 6.3L12 16.8 6.4 20l1.4-6.3L3 9.4l6.4-.6z',
  userplus: 'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM2 21c0-4 3-7 7-7s7 3 7 7M19 8v6M16 11h6',
  volume: 'M4 9h4l5-4v14l-5-4H4zM16 9c1 1 1 5 0 6M19 6c3 3 3 9 0 12',
  yen: 'M6 4l6 8 6-8M12 12v8M8 13h8M8 16h8',
  bell: 'M6 16V11a6 6 0 0 1 12 0v5l2 2H4zM10 21h4'
};

function icon(name, cls = '') {
  return `<svg class="ic ${cls}" viewBox="0 0 24 24" aria-hidden="true"><path d="${ICONS[name] || ICONS.sparkle}"/></svg>`;
}

/* Small seeded random so every illustration is stable between renders. */
function rng(seed) { let s = 0; for (const c of String(seed)) s = (s * 31 + c.charCodeAt(0)) >>> 0; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); }

const ART = {
  ramen(a, seed) {
    const r = rng(seed); const cx = 150, cy = 104;
    let noodles = '';
    for (let i = 0; i < 9; i++) {
      const y = cy - 40 + i * 10 + r() * 4; const x0 = cx - 62 + r() * 10;
      noodles += `<path d="M${x0} ${y} q12 -7 24 0 t24 0 t24 0 t24 0 t20 0" stroke="#F4D483" stroke-width="5" fill="none" stroke-linecap="round" opacity=".95"/>`;
    }
    let chashu = '';
    for (let i = 0; i < a.chashu; i++) {
      const x = cx + 18 + i * 20, y = cy - 30 + i * 18;
      chashu += `<g transform="rotate(${-20 + i * 15} ${x} ${y})"><ellipse cx="${x}" cy="${y}" rx="26" ry="20" fill="#E9B18F"/><ellipse cx="${x}" cy="${y}" rx="26" ry="20" fill="none" stroke="#B5674A" stroke-width="5"/><path d="M${x - 14} ${y - 4} q14 10 26 -2" stroke="#F6D7C3" stroke-width="3" fill="none"/></g>`;
    }
    const egg = a.egg ? `<g transform="rotate(-25 ${cx - 40} ${cy + 34})"><ellipse cx="${cx - 40}" cy="${cy + 34}" rx="22" ry="16" fill="#FFF8EC"/><ellipse cx="${cx - 40}" cy="${cy + 35}" rx="12" ry="9" fill="#F2A93B"/><ellipse cx="${cx - 40}" cy="${cy + 35}" rx="6" ry="4.5" fill="#E07B22"/></g>` : '';
    const corn = a.corn ? Array.from({ length: 22 }, (_, i) => `<circle cx="${cx - 48 + (i % 6) * 8 + r() * 3}" cy="${cy + 22 + Math.floor(i / 6) * 8 + r() * 3}" r="4" fill="#F7C948" stroke="#E0A92E"/>`).join('') + `<rect x="${cx + 10}" y="${cy + 18}" width="30" height="22" rx="3" fill="#FFE9A8" transform="rotate(12 ${cx + 25} ${cy + 29})"/>` : '';
    const greens = a.greens ? `<path d="M${cx + 10} ${cy - 50} q40 10 30 60 q-40 -10 -30 -60z" fill="#7BAE4B"/><path d="M${cx + 10} ${cy - 50} q20 20 30 60" stroke="#CFE6A8" stroke-width="3" fill="none"/><path d="M${cx - 60} ${cy + 20} q30 -20 50 10 q-30 20 -50 -10z" fill="#5E9A3C"/>` : '';
    let scallion = '';
    for (let i = 0; i < 18; i++) scallion += `<circle cx="${cx - 30 + r() * 60}" cy="${cy - 8 + r() * 30}" r="3.2" fill="#8CC152" stroke="#5E9A3C" stroke-width="1"/>`;
    return `<svg viewBox="0 0 320 200" class="art" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="320" height="200" fill="#F1E4CC"/>
      <g opacity=".18" stroke="#8A5A2B" stroke-width="1.2" fill="none">${Array.from({ length: 8 }, (_, i) => `<path d="M0 ${i * 28 + 8} H320"/>`).join('')}</g>
      <circle cx="${cx + 6}" cy="${cy + 8}" r="94" fill="#000" opacity=".12"/>
      <circle cx="${cx}" cy="${cy}" r="94" fill="${a.rim}"/>
      <circle cx="${cx}" cy="${cy}" r="94" fill="none" stroke="#fff" stroke-width="2" stroke-dasharray="2 10" opacity=".5"/>
      <circle cx="${cx}" cy="${cy}" r="80" fill="${a.broth}"/>
      <circle cx="${cx - 24}" cy="${cy - 28}" r="38" fill="#fff" opacity=".12"/>
      ${noodles}${greens}${chashu}${egg}${corn}
      <rect x="${cx - 74}" y="${cy - 66}" width="30" height="48" rx="2" fill="#24301F" transform="rotate(-18 ${cx - 59} ${cy - 42})"/>
      <g transform="translate(${cx - 6} ${cy + 46})"><circle r="13" fill="#FFF8EC"/><path d="M-6 0a6 6 0 1 0 6-6 3 3 0 1 1-3 3" stroke="#E8577E" stroke-width="2.5" fill="none"/></g>
      ${scallion}
      <g stroke-linecap="round"><path d="M236 18 L300 176" stroke="#5B3A1E" stroke-width="7"/><path d="M252 14 L312 168" stroke="#7A4E2A" stroke-width="7"/></g>
    </svg>`;
  },

  sushi(a, seed) {
    const r = rng(seed);
    const piece = (x, y, fish, rot) => `<g transform="translate(${x} ${y}) rotate(${rot})">
      <ellipse cx="2" cy="6" rx="30" ry="15" fill="#000" opacity=".25"/>
      <ellipse rx="28" ry="14" fill="#FBF7EF"/>
      ${Array.from({ length: 7 }, () => `<ellipse cx="${-20 + r() * 40}" cy="${-8 + r() * 16}" rx="3" ry="1.6" fill="#EDE5D6"/>`).join('')}
      <path d="M-32 -6 q32 -18 64 0 q-4 14 -32 16 q-28 -2 -32 -16z" fill="${fish}"/>
      <path d="M-18 -10 q4 8 2 16 M-4 -13 q4 9 2 19 M10 -12 q4 9 2 17" stroke="#fff" stroke-width="2.4" fill="none" opacity=".55"/>
    </g>`;
    return `<svg viewBox="0 0 320 200" class="art" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="320" height="200" fill="#2B2F36"/>
      <g opacity=".08" fill="#fff">${Array.from({ length: 40 }, () => `<circle cx="${r() * 320}" cy="${r() * 200}" r="${r() * 2 + .5}"/>`).join('')}</g>
      <rect x="22" y="44" width="276" height="118" rx="10" fill="#C99A62"/>
      <g stroke="#A97A44" stroke-width="1.5" opacity=".6">${Array.from({ length: 6 }, (_, i) => `<path d="M30 ${60 + i * 17} q120 ${r() * 6 - 3} 260 0" fill="none"/>`).join('')}</g>
      <rect x="22" y="152" width="276" height="10" rx="4" fill="#8E6534"/>
      ${piece(78, 92, a.fish[0], -8)}${piece(150, 120, a.fish[1], 6)}${piece(222, 90, a.fish[2], -4)}${piece(248, 132, a.fish[3], 10)}
      <path d="M54 136 q10 -14 22 -2 q-4 12 -22 2z" fill="#9BC53D"/>
      <g fill="#F4B6B0">${[0, 1, 2].map(i => `<ellipse cx="${104 + i * 8}" cy="${142 + i * 2}" rx="9" ry="5" transform="rotate(${i * 20 - 20} ${104 + i * 8} ${142})"/>`).join('')}</g>
    </svg>`;
  },

  veg(a, seed) {
    const r = rng(seed);
    const b = (x, y, rad, rim, fill, extra = '') => `<g><circle cx="${x + 3}" cy="${y + 4}" r="${rad}" fill="#000" opacity=".2"/><circle cx="${x}" cy="${y}" r="${rad}" fill="${rim}"/><circle cx="${x}" cy="${y}" r="${rad - 6}" fill="${fill}"/>${extra}</g>`;
    const tofu = [0, 1, 2, 3].map(i => `<rect x="${212 + (i % 2) * 16}" y="${56 + Math.floor(i / 2) * 16}" width="13" height="13" rx="2" fill="#FFF8EC" stroke="#E6DCC6"/>`).join('');
    const rice = Array.from({ length: 30 }, () => `<ellipse cx="${80 + r() * 40 - 20}" cy="${128 + r() * 40 - 20}" rx="2.6" ry="1.4" fill="#F1EADB" transform="rotate(${r() * 180} 80 128)"/>`).join('');
    return `<svg viewBox="0 0 320 200" class="art" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="320" height="200" fill="#C7C08A"/>
      <g stroke="#ADA56C" stroke-width="2">${Array.from({ length: 18 }, (_, i) => `<path d="M${i * 19} 0 V200"/>`).join('')}</g>
      <path d="M0 0 H320 V12 H0z M0 188 H320 V200 H0z" fill="#3B5B3A"/>
      <rect x="28" y="22" width="264" height="158" rx="12" fill="${a.tray}"/>
      <rect x="36" y="30" width="248" height="142" rx="8" fill="none" stroke="#fff" stroke-opacity=".15" stroke-width="2"/>
      ${b(80, 128, 34, '#F7F2E8', '#FFFFFF', rice)}
      ${b(156, 132, 32, '#3A2016', '#9B5B2E', '<ellipse cx="150" cy="126" rx="10" ry="4" fill="#4E7A3A"/><rect x="160" y="132" width="8" height="8" fill="#FFF8EC"/>')}
      ${b(228, 72, 30, '#1E3A5F', '#E8DEC8', tofu)}
      ${b(96, 62, 26, '#F7F2E8', '#E9C46A', '<path d="M84 60 q12 -10 24 0 M84 66 q12 -10 24 0" stroke="#D08B2E" stroke-width="3" fill="none"/>')}
      ${b(236, 140, 26, '#7A2E1F', '#5E9A3C', '<path d="M226 136 q10 -12 20 0 q-10 10 -20 0z" fill="#8CC152"/><circle cx="240" cy="146" r="4" fill="#E9604A"/>')}
      ${b(164, 62, 20, '#F7F2E8', '#E06C75', '<path d="M154 58h20M154 64h20M154 70h20" stroke="#F4B6B0" stroke-width="2"/>')}
      <g stroke-linecap="round"><path d="M40 182 L150 168" stroke="#E6D4B0" stroke-width="5"/><path d="M44 190 L152 174" stroke="#E6D4B0" stroke-width="5"/></g>
    </svg>`;
  },

  tempura(a, seed) {
    const r = rng(seed); const cx = 150, cy = 102;
    const prawn = (x, y, rot) => `<g transform="translate(${x} ${y}) rotate(${rot})">
      <path d="M-46 0 q0 -16 20 -18 h44 q16 0 20 14 q-4 16 -20 16 h-44 q-20 0 -20 -12z" fill="#E8B64C"/>
      ${Array.from({ length: 9 }, () => `<circle cx="${-36 + r() * 66}" cy="${-12 + r() * 20}" r="${2 + r() * 3}" fill="#F6D27A"/>`).join('')}
      <path d="M38 -8 q16 -6 18 -16 q4 12 -8 22z" fill="#E9604A"/>
    </g>`;
    return `<svg viewBox="0 0 320 200" class="art" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="320" height="200" fill="#F2ECDD"/>
      <g fill="none" stroke="#1E3A5F" stroke-opacity=".12" stroke-width="2">${Array.from({ length: 7 }, (_, row) => Array.from({ length: 9 }, (_, col) => `<path d="M${col * 40 - (row % 2) * 20 - 20} ${row * 30 + 30} a20 20 0 0 1 40 0"/>`).join('')).join('')}</g>
      <circle cx="${cx + 6}" cy="${cy + 8}" r="92" fill="#000" opacity=".12"/>
      <circle cx="${cx}" cy="${cy}" r="92" fill="${a.bowl}"/>
      <circle cx="${cx}" cy="${cy}" r="80" fill="#FBF7EF"/>
      <circle cx="${cx}" cy="${cy}" r="80" fill="#C98A3A" opacity=".25"/>
      <path d="M${cx - 50} ${cy + 30} q30 -40 60 -60 q20 30 -10 70 q-30 10 -50 -10z" fill="#4E8F3A"/>
      <path d="M${cx - 44} ${cy + 26} q30 -30 56 -52" stroke="#8CC152" stroke-width="2" fill="none"/>
      ${prawn(cx + 4, cy - 26, -24)}${prawn(cx + 14, cy + 18, 12)}
      <circle cx="${cx - 34}" cy="${cy - 10}" r="20" fill="#E3A23B"/><circle cx="${cx - 34}" cy="${cy - 10}" r="12" fill="#7B4A2B" opacity=".5"/>
      <path d="M${cx - 70} ${cy} q40 -10 70 14 q30 18 60 0" stroke="#6B3A1E" stroke-width="4" fill="none" opacity=".55" stroke-linecap="round"/>
      <g stroke-linecap="round"><path d="M244 22 L296 180" stroke="#231815" stroke-width="6"/><path d="M262 18 L308 172" stroke="#231815" stroke-width="6"/></g>
    </svg>`;
  },

  food(a, seed) { return ART[a.type](a, seed); },

  fuji() {
    return `<svg viewBox="0 0 480 300" class="art" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs><linearGradient id="fjSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8DB7D9"/><stop offset=".6" stop-color="#F4C8B8"/><stop offset="1" stop-color="#F7E2C4"/></linearGradient></defs>
      <rect width="480" height="300" fill="url(#fjSky)"/>
      <circle cx="330" cy="104" r="40" fill="#D9123D" opacity=".9"/>
      <path d="M40 250 L200 92 Q240 60 280 92 L440 250z" fill="#4A6C8F"/>
      <path d="M172 120 L200 92 Q240 60 280 92 L308 120 Q292 112 280 126 Q266 110 252 128 Q240 112 226 126 Q212 110 196 128 Q186 114 172 120z" fill="#FBF7EF"/>
      <path d="M0 230 Q120 200 240 236 T480 222 V300 H0z" fill="#3D5A3C"/>
      <path d="M0 260 Q140 240 260 266 T480 256 V300 H0z" fill="#2E4730"/>
      <rect x="0" y="0" width="480" height="300" fill="none" stroke="#1E2A38" stroke-width="34" rx="40"/>
      <rect x="14" y="14" width="452" height="272" fill="none" stroke="#3A4A5C" stroke-width="4" rx="30"/>
    </svg>`;
  },

  kintsugi() {
    return `<svg viewBox="0 0 480 300" class="art" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs><linearGradient id="kgGold" x1="0" x2="1"><stop offset="0" stop-color="#B8860B"/><stop offset=".5" stop-color="#FFE08A"/><stop offset="1" stop-color="#C9A227"/></linearGradient></defs>
      <rect width="480" height="300" fill="#1C1A1F"/>
      <ellipse cx="240" cy="250" rx="150" ry="18" fill="#000" opacity=".5"/>
      <path d="M100 120 Q100 250 240 250 Q380 250 380 120z" fill="#2F3B4A"/>
      <ellipse cx="240" cy="120" rx="140" ry="26" fill="#3E4E61"/>
      <ellipse cx="240" cy="122" rx="122" ry="18" fill="#1E2833"/>
      <path class="gold" d="M170 128 L196 162 L184 196 L214 240 M196 162 L236 176 L262 160 L300 208 M262 160 L282 132" stroke="url(#kgGold)" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <text x="40" y="60" fill="#C9A227" font-size="30" font-family="'Dela Gothic One', sans-serif">金継ぎ</text>
    </svg>`;
  },

  hina() {
    const doll = (x, y, robe) => `<g transform="translate(${x} ${y})"><path d="M-12 18 L0 -6 L12 18z" fill="${robe}"/><circle cy="-10" r="6" fill="#FBF0E4"/><path d="M-6 -14 h12 v-3 h-12z" fill="#231815"/></g>`;
    let tiers = '';
    for (let i = 0; i < 5; i++) {
      const w = 160 + i * 60, y = 70 + i * 40;
      tiers += `<rect x="${240 - w / 2}" y="${y + 22}" width="${w}" height="40" fill="${i % 2 ? '#C8102E' : '#D9123D'}"/>`;
      const n = [2, 3, 5, 3, 4][i];
      for (let j = 0; j < n; j++) tiers += doll(240 - w / 2 + (j + .5) * (w / n), y + 18, ['#1E3A5F', '#F2C14E', '#6B8F47', '#E85298', '#FBF7EF'][(i + j) % 5]);
    }
    return `<svg viewBox="0 0 480 300" class="art" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="480" height="300" fill="#F3E3C3"/>
      <g fill="#E8C766">${[0, 1, 2, 3, 4, 5].map(i => `<rect x="${60 + i * 60}" y="16" width="58" height="80" stroke="#C9A227"/>`).join('')}</g>
      ${tiers}
      <g fill="#F4B6C2">${[[40, 40], [440, 60], [420, 200], [30, 230]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="8"/>`).join('')}</g>
    </svg>`;
  },

  othello() {
    const layout = '..........WB....BWB.....WBW......BB....W..'.split('');
    let cells = '';
    for (let r = 0; r < 6; r++) for (let c = 0; c < 8; c++) {
      const v = layout[(r * 8 + c) % layout.length];
      if (v !== '.') cells += `<circle cx="${72 + c * 48}" cy="${42 + r * 46}" r="18" fill="${v === 'B' ? '#1A1A1A' : '#FBF7EF'}" stroke="#0E4D2A" stroke-width="2"/>`;
    }
    return `<svg viewBox="0 0 480 300" class="art" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="480" height="300" fill="#6B4A2B"/>
      <rect x="40" y="16" width="400" height="276" rx="8" fill="#15803D"/>
      <g stroke="#0E4D2A" stroke-width="2">${Array.from({ length: 9 }, (_, i) => `<path d="M${48 + i * 48} 16 V292"/>`).join('')}${Array.from({ length: 7 }, (_, i) => `<path d="M40 ${19 + i * 46} H440"/>`).join('')}</g>
      ${cells}
    </svg>`;
  }
};

/* Splash landscape: red sun, Fuji, layered hills, seigaiha sea. */
function splashScene() {
  let waves = '';
  for (let row = 0; row < 6; row++) for (let col = -1; col < 26; col++) {
    const x = col * 64 + (row % 2) * 32, y = 640 + row * 26;
    waves += `<g transform="translate(${x} ${y})"><circle r="32" fill="#1E3A5F"/><circle r="24" fill="none" stroke="#F2ECDD" stroke-opacity=".5" stroke-width="2"/><circle r="16" fill="none" stroke="#F2ECDD" stroke-opacity=".5" stroke-width="2"/><circle r="8" fill="none" stroke="#F2ECDD" stroke-opacity=".5" stroke-width="2"/></g>`;
  }
  return `<svg class="splash-art" viewBox="0 0 1600 800" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
    <circle class="sun" cx="1120" cy="300" r="190" fill="#D9123D"/>
    <path class="fuji" d="M520 640 L900 250 Q960 205 1020 250 L1420 640z" fill="#2E4A6B"/>
    <path class="fuji" d="M836 316 L900 250 Q960 205 1020 250 L1086 318 Q1060 304 1040 330 Q1018 302 996 334 Q974 306 952 334 Q930 302 906 332 Q884 306 862 330 Q850 314 836 316z" fill="#FBF7EF"/>
    <path d="M0 600 Q260 520 520 590 T1040 580 T1600 560 V800 H0z" fill="#6B8F47" opacity=".9"/>
    <path d="M0 640 Q300 590 640 640 T1600 620 V800 H0z" fill="#3D5A3C"/>
    <g class="waves">${waves}</g>
    <g transform="translate(1610 -10) scale(-1 1)"><g class="branch" fill="none" stroke="#231815" stroke-width="7" stroke-linecap="round"><path d="M-10 120 Q160 150 300 110 T520 60"/><path d="M180 136 Q220 190 280 210"/><path d="M360 100 Q390 40 440 20"/></g>
    <g class="blossoms">${[[300, 110], [520, 60], [280, 210], [440, 20], [200, 140], [400, 90], [120, 128], [230, 180], [470, 46]].map(([x, y], i) => `<g transform="translate(${x} ${y}) scale(${0.8 + (i % 3) * .25})">${[0, 72, 144, 216, 288].map(a => `<ellipse rx="9" ry="14" cy="-12" fill="#F7B8C6" transform="rotate(${a})"/>`).join('')}<circle r="5" fill="#D9123D"/></g>`).join('')}</g></g>
  </svg>`;
}
