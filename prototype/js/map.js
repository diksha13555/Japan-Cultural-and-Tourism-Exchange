/* Trip DNA prototype · illustrated Tokyo map.
   Real coordinates are projected onto a 1000 × 1088 SVG; the "camera" is the animated viewBox. */

const TokyoMap = (() => {
  const LNG0 = 139.62, LAT1 = 35.75, K = 4732, COS = Math.cos(35.63 * Math.PI / 180);
  const W = 1000, H = 1088, FULL = [0, 0, W, H];
  const NS = 'http://www.w3.org/2000/svg';
  let svg, gRoute, gPins, gDest, gMode, gAlt, gNow, view = FULL.slice(), anim = null, last = null;

  const P = ([lat, lng]) => [(lng - LNG0) * K * COS, (LAT1 - lat) * K];
  const pt = k => P(typeof k === 'string' ? PTS[k] : k);
  const poly = list => list.map(p => P(p).map(n => n.toFixed(1)).join(',')).join(' ');

  /* Catmull-Rom → cubic Bézier, so rail lines curve like a real map. */
  function smooth(points) {
    if (points.length < 3) return 'M' + points.map(p => p.map(n => n.toFixed(1)).join(' ')).join(' L');
    let d = `M${points[0][0].toFixed(1)} ${points[0][1].toFixed(1)}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i - 1] || points[i], p1 = points[i], p2 = points[i + 1], p3 = points[i + 2] || p2;
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      d += ` C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
    }
    return d;
  }

  function el(tag, attrs = {}, parent) {
    const n = document.createElementNS(NS, tag);
    for (const k in attrs) n.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(n);
    return n;
  }

  function base() {
    const water = [[35.40,139.70],[35.52,139.735],[35.54,139.79],[35.556,139.80],[35.57,139.772],[35.585,139.758],[35.605,139.754],[35.622,139.752],[35.636,139.758],[35.648,139.764],[35.656,139.769],[35.662,139.779],[35.656,139.792],[35.646,139.802],[35.642,139.822],[35.648,139.842],[35.645,139.868],[35.652,139.895],[35.668,139.925],[35.672,139.96],[35.66,140.0],[35.63,140.04],[35.58,140.08],[35.40,140.10]];
    const haneda = [[35.533,139.758],[35.552,139.762],[35.566,139.770],[35.566,139.800],[35.548,139.812],[35.530,139.806]];
    const odaiba = [[35.622,139.766],[35.636,139.768],[35.640,139.784],[35.628,139.792],[35.616,139.786]];
    const toyosu = [[35.642,139.782],[35.656,139.786],[35.650,139.800],[35.640,139.800]];
    const yamanote = ['tokyo','kanda2','akiba2','ueno','nippori','tabata','komagome','sugamo','otsuka','ikebukuro','mejiro','baba','okubo','shinjuku','yoyogi','harajuku','shibuya','ebisu','meguro','gotanda','osaki','shinagawa','tamachi','hamamatsucho','shimbashi','yurakucho'];
    const Y = { tokyo:[35.681,139.767], kanda2:[35.692,139.771], akiba2:[35.698,139.773], ueno:[35.714,139.777], nippori:[35.728,139.771], tabata:[35.738,139.761], komagome:[35.736,139.747], sugamo:[35.733,139.739], otsuka:[35.731,139.728], ikebukuro:[35.729,139.711], mejiro:[35.721,139.706], baba:[35.712,139.704], okubo:[35.701,139.700], shinjuku:[35.690,139.700], yoyogi:[35.683,139.702], harajuku:[35.670,139.703], shibuya:[35.658,139.702], ebisu:[35.647,139.710], meguro:[35.634,139.716], gotanda:[35.626,139.724], osaki:[35.620,139.728], shinagawa:[35.629,139.739], tamachi:[35.646,139.748], hamamatsucho:[35.655,139.757], shimbashi:[35.666,139.758], yurakucho:[35.675,139.763] };
    const loopPts = yamanote.map(k => P(Y[k])); loopPts.push(loopPts[0], loopPts[1]);

    const g = el('g', { class: 'm-base' }, svg);
    el('rect', { x: -3000, y: -3000, width: W + 6000, height: H + 6000, class: 'm-land' }, g);
    // faint street grid gives the land texture without real data
    const grid = el('g', { class: 'm-grid' }, g);
    for (let i = -40; i < 60; i++) { el('path', { d: `M${i * 50} -1500 L${i * 50 + 260} ${H + 1500}` }, grid); el('path', { d: `M-1500 ${i * 50} L${W + 1500} ${i * 50 - 140}` }, grid); }
    el('polygon', { points: poly(water), class: 'm-water' }, g);
    const waves = el('g', { class: 'm-waves' }, g);
    for (let r = 0; r < 9; r++) for (let c = 0; c < 6; c++) { const [x, y] = P([35.62 - r * 0.012, 139.80 + c * 0.016 + (r % 2) * 0.008]); el('path', { d: `M${x - 14} ${y} a14 14 0 0 1 28 0` }, waves); }
    [haneda, odaiba, toyosu].forEach(p => el('polygon', { points: poly(p), class: 'm-landfill' }, g));
    const rivers = [
      [[35.76,139.79],[35.735,139.80],[35.72,139.805],[35.711,139.801],[35.70,139.795],[35.69,139.791],[35.68,139.788],[35.67,139.783],[35.66,139.779]],
      [[35.76,139.815],[35.73,139.835],[35.70,139.846],[35.68,139.851],[35.646,139.856]],
      [[35.63,139.60],[35.605,139.655],[35.588,139.688],[35.572,139.708],[35.556,139.728],[35.542,139.748],[35.53,139.765]]
    ];
    rivers.forEach((r, i) => el('path', { d: smooth(r.map(P)), class: 'm-river' + (i === 1 ? ' wide' : '') }, g));
    el('path', { d: smooth([[35.712,139.69],[35.706,139.725],[35.701,139.755],[35.698,139.79]].map(P)), class: 'm-river thin' }, g);
    [[35.685,139.752,46,34],[35.716,139.773,24,20],[35.672,139.697,38,40],[35.685,139.710,22,16],[35.660,139.763,14,11],[35.656,139.748,12,12],[35.733,139.746,12,10]]
      .forEach(([la, ln, rx, ry]) => { const [x, y] = P([la, ln]); el('ellipse', { cx: x, cy: y, rx, ry, class: 'm-park' }, g); });
    el('path', { d: smooth(loopPts).replace(/^M[^C]+/, m => m), class: 'm-loop' }, g);

    const labels = [['浅草','Asakusa',[35.7175,139.8005]],['上野','Ueno',[35.7175,139.7665]],['渋谷','Shibuya',[35.6545,139.6905]],['新宿','Shinjuku',[35.6935,139.6855]],['銀座','Ginza',[35.6705,139.7735]],['品川','Shinagawa',[35.6265,139.7255]],['羽田','Haneda',[35.5585,139.7835]],['池袋','Ikebukuro',[35.7335,139.7135]],['秋葉原','Akihabara',[35.6995,139.7615]],['六本木','Roppongi',[35.6625,139.7315]],['お台場','Odaiba',[35.6245,139.7905]]];
    const gl = el('g', { class: 'm-labels' }, g);
    labels.forEach(([ja, en, ll]) => { const [x, y] = P(ll); const t = el('g', { transform: `translate(${x} ${y})` }, gl); el('text', { class: 'm-ja', 'text-anchor': 'middle' }, t).textContent = ja; el('text', { class: 'm-en', y: 15, 'text-anchor': 'middle' }, t).textContent = en.toUpperCase(); });
    const [bx, by] = P([35.585, 139.845]); el('text', { x: bx, y: by, class: 'm-bay', 'text-anchor': 'middle' }, gl).textContent = '東京湾 TOKYO BAY';

    // landmarks
    const [sx, sy] = P(PTS.skytree); el('path', { d: `M${sx} ${sy - 44} L${sx + 5} ${sy} L${sx - 5} ${sy}z M${sx - 8} ${sy - 22} h16`, class: 'm-mark' }, g);
    const [tx, ty] = P(PTS.tokyotower); el('path', { d: `M${tx} ${ty - 40} L${tx + 11} ${ty} L${tx + 5} ${ty} L${tx} ${ty - 10} L${tx - 5} ${ty} L${tx - 11} ${ty}z`, class: 'm-tower' }, g); el('path', { d: `M${tx - 6} ${ty - 18} h12 M${tx - 3} ${ty - 30} h6`, class: 'm-mark' }, g);

    // off-map pointer to Hakone
    const [hx, hy] = P(PTS.hakoneEdge);
    const hk = el('g', { class: 'm-hakone', transform: `translate(${hx + 14} ${hy})` }, g);
    el('path', { d: 'M0 0 l16 -10 v6 h40 v8 h-40 v6z' }, hk);
    el('text', { x: 64, y: 5 }, hk).textContent = '箱根 Hakone · 80 km';
  }

  function init(target) {
    svg = target;
    svg.setAttribute('viewBox', FULL.join(' '));
    base();
    gMode = el('g', { class: 'm-mode' }, svg);
    gRoute = el('g', { class: 'm-route' }, svg);
    gAlt = el('g', { class: 'm-alt' }, svg);
    gPins = el('g', { class: 'm-pins' }, svg);
    gDest = el('g', { class: 'm-dest' }, svg);
    gNow = el('g', { class: 'm-now' }, svg);
    flyTo(['haneda', 'asakusa', 'shinjuku'], 140, 0);
  }

  const ease = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  function setView(v) { view = v; svg.setAttribute('viewBox', v.map(n => n.toFixed(1)).join(' ')); }

  /* Fit the camera around a set of points, keeping the panel's aspect ratio. */
  function flyTo(keys, pad = 120, dur = 900) {
    last = [keys, pad];
    const ps = keys.map(pt);
    let x0 = Math.min(...ps.map(p => p[0])) - pad, x1 = Math.max(...ps.map(p => p[0])) + pad;
    let y0 = Math.min(...ps.map(p => p[1])) - pad, y1 = Math.max(...ps.map(p => p[1])) + pad;
    const box = svg.getBoundingClientRect(); const ar = (box.width || 4) / (box.height || 3);
    let w = x1 - x0, h = y1 - y0;
    if (w / h < ar) { const nw = h * ar; x0 -= (nw - w) / 2; w = nw; } else { const nh = w / ar; y0 -= (nh - h) / 2; h = nh; }
    const target = [x0, y0, w, h];
    cancelAnimationFrame(anim);
    if (!dur || (window.TD_SPEED || 1) < 1 || matchMedia('(prefers-reduced-motion: reduce)').matches) return setView(target);
    const from = view.slice(), t0 = performance.now();
    const step = now => { const t = Math.min(1, (now - t0) / dur), e = ease(t); setView(from.map((f, i) => f + (target[i] - f) * e)); if (t < 1) anim = requestAnimationFrame(step); };
    anim = requestAnimationFrame(step);
  }

  function clear() { [gRoute, gPins, gDest, gAlt, gNow].forEach(g => g.innerHTML = ''); }

  function showDest(d) {
    gDest.innerHTML = '';
    const [x, y] = pt(d.pt);
    const g = el('g', { class: 'dest-pin drop', transform: `translate(${x} ${y})` }, gDest);
    el('ellipse', { cx: 0, cy: 2, rx: 12, ry: 4, class: 'shadow' }, g);
    el('path', { d: 'M0 0 C-6 -14 -20 -22 -20 -38 a20 20 0 0 1 40 0 C20 -22 6 -14 0 0z', class: 'body' }, g);
    el('circle', { cy: -38, r: 8, class: 'eye' }, g);
    el('circle', { r: 26, class: 'pulse' }, g);
  }

  function lockDest() { gDest.querySelector('.dest-pin')?.classList.add('locked'); }

  /* Draw the woven route leg by leg; resolves when done. */
  function drawRoute(plan, stepMs = 380) {
    gRoute.innerHTML = ''; gPins.innerHTML = '';
    const legs = [];
    plan.forEach((s, i) => {
      if (!s.leg || !plan[i + 1]) return;
      const keys = s.leg.path || [];
      if (!keys.length) return;
      const pts = keys.map(pt);
      const line = LINES[s.leg.line];
      const path = el('path', { d: smooth(pts), class: 'leg ' + (s.leg.line === 'walk' ? 'walk' : 'rail'), stroke: line.color, 'data-i': i }, gRoute);
      if (s.leg.line !== 'walk') el('path', { d: smooth(pts), class: 'leg-core', 'data-i': i }, gRoute);
      legs.push(path);
    });
    plan.forEach((s, i) => {
      if (!s.pt) return;
      const [x, y] = pt(s.pt);
      const g = el('g', { class: 'stn', transform: `translate(${x} ${y})`, 'data-i': i, style: `--d:${i * stepMs}ms` }, gPins);
      el('circle', { r: 14 }, g);
      const t = el('text', { 'text-anchor': 'middle', y: 4.5 }, g); t.textContent = String(i + 1).padStart(2, '0');
    });
    legs.forEach((p, k) => {
      const len = p.getTotalLength(); p.style.strokeDasharray = p.classList.contains('walk') ? '' : len; p.style.strokeDashoffset = p.classList.contains('walk') ? 0 : len;
      p.style.setProperty('--len', len); p.style.animationDelay = (k * stepMs) + 'ms'; p.classList.add('draw');
    });
    flyTo(plan.filter(s => s.pt && s.id !== 'romance' && s.id !== 'omoide').map(s => s.pt), 90, 1100);
    return new Promise(r => setTimeout(r, legs.length * stepMs + 400));
  }

  function focusStop(i) {
    gPins.querySelectorAll('.stn').forEach(n => n.classList.toggle('on', +n.dataset.i === i));
    gRoute.querySelectorAll('.leg').forEach(n => n.classList.toggle('dim', i != null && +n.dataset.i !== i));
  }

  function setNow(key) {
    gNow.innerHTML = '';
    if (!key) return;
    const [x, y] = pt(key);
    const g = el('g', { transform: `translate(${x} ${y})`, class: 'now-dot' }, gNow);
    el('circle', { r: 30, class: 'ring' }, g); el('circle', { r: 9, class: 'core' }, g);
  }

  function showAlt(opt) {
    gAlt.innerHTML = '';
    if (!opt) return;
    const color = LINES[opt.newStop.line].color;
    const pts = [pt('shinjuku'), P([35.66, 139.66]), pt('hakoneEdge')];
    const p = el('path', { d: smooth(pts), class: 'alt-leg', stroke: color }, gAlt);
    const len = p.getTotalLength(); p.style.strokeDasharray = `${len}`; p.style.strokeDashoffset = len; p.getBoundingClientRect(); p.style.strokeDashoffset = 0;
  }

  function markMissed() { gRoute.querySelectorAll('.leg').forEach(n => { if (n.getAttribute('stroke') === LINES.odakyu.color) n.classList.add('missed'); }); }

  function modePins(mode) {
    gMode.innerHTML = '';
    (MODES[mode].pins || []).forEach((p, i) => {
      const [x, y] = P(p.pt);
      const g = el('g', { class: 'mode-pin', transform: `translate(${x} ${y})`, style: `--d:${i * 90}ms` }, gMode);
      el('rect', { x: -9, y: -9, width: 18, height: 18, rx: mode === 'study' ? 9 : 3 }, g);
      const t = el('text', { x: 14, y: 4 }, g); t.textContent = p.label;
    });
  }

  function refit() { if (last) flyTo(last[0], last[1], 0); }

  return { init, flyTo, refit, clear, showDest, lockDest, drawRoute, focusStop, setNow, showAlt, markMissed, modePins, pt };
})();
