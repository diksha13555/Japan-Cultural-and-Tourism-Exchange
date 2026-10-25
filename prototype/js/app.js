/* Trip DNA prototype · flow and state for the scripted 60-second demo (see SPEC.md §2). */

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
// TD_SPEED < 1 is set by the presenter while it fast-replays steps behind the shoji doors
const sleep = ms => new Promise(r => setTimeout(r, ms * (window.TD_SPEED || 1)));
const yen = n => '¥' + Math.round(n).toLocaleString('en-US');
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

const S = {
  lang: 'en', mode: 'leisure', arrival: 'airport', dest: null, locked: false,
  landing: null, time: '08:20', answers: {},
  interests: new Set(), pace: 'balanced', diet: 'No preference', budget: 15000,
  plan: null, woven: false, lunch: null, cuisine: null, pending: null, slot: '12:15', party: 1, pay: 'restaurant',
  now: null, detected: false, option: null, rebooked: null,
  feed: FEED.map(p => ({ ...p, comments: p.comments.slice(), liked: false, open: false, connected: false })),
  localsOn: new Set(), posted: false,
  coupons: [{ title: '10% off', where: 'Sato family homestay · partner' }],
  busy: false, auto: false, mapReady: false
};

/* ─────────── i18n + icons ─────────── */
function t(key) { return (I18N[S.lang] || I18N.en)[key] ?? I18N.en[key] ?? key; }
function hydrate(root = document) { $$('.ico[data-ic]', root).forEach(n => { if (!n.firstChild) n.innerHTML = icon(n.dataset.ic); }); }
function applyI18n() {
  $$('[data-i18n]').forEach(n => { n.textContent = t(n.dataset.i18n); });
  $$('[data-i18n-ph]').forEach(n => { n.placeholder = t(n.dataset.i18nPh); });
  $('#tagline').textContent = t('tag.' + S.mode);
  $('#langCode').textContent = S.lang.toUpperCase();
  document.documentElement.lang = S.lang;
  requestAnimationFrame(updatePill);
}

/* ─────────── Toasts ─────────── */
function toast({ type = 'info', ic = 'sparkle', title, text = '', actions = [], timeout = 3200 }) {
  const n = document.createElement('div');
  n.className = 'toast ' + type;
  n.innerHTML = `<span class="ti">${icon(ic)}</span><b>${title}</b>${text ? `<p>${text}</p>` : ''}${actions.length ? `<div class="acts">${actions.map((a, i) => `<button data-i="${i}" class="${a.sec ? 'sec' : ''}">${a.label}</button>`).join('')}</div>` : ''}`;
  $('#toasts').appendChild(n);
  $$('.acts button', n).forEach(b => b.onclick = () => { dismiss(n); actions[+b.dataset.i].fn?.(); });
  if (timeout) setTimeout(() => dismiss(n), timeout);
  return n;
}
function dismiss(n) { if (!n.isConnected) return; n.classList.add('out'); setTimeout(() => n.remove(), 350); }

/* ─────────── Sakura petals (ambient on splash, bursts on success) ─────────── */
const Petals = (() => {
  const c = $('#petals'), ctx = c.getContext('2d');
  const COLORS = ['#F7B8C6', '#F4A3B5', '#FBD3DC', '#E87A95', '#FFFFFF'];
  let W = 0, H = 0, parts = [], ambientOn = false, raf = 0;
  function resize() { const d = devicePixelRatio || 1; W = innerWidth; H = innerHeight; c.width = W * d; c.height = H * d; ctx.setTransform(d, 0, 0, d, 0, 0); }
  function petal(p) {
    ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.a); ctx.scale(1, Math.abs(Math.cos(p.flip)) * .7 + .3);
    ctx.globalAlpha = p.alpha ?? .9; ctx.fillStyle = p.c; ctx.beginPath();
    ctx.moveTo(0, -p.r); ctx.bezierCurveTo(p.r * .9, -p.r * 1.1, p.r, p.r * .5, 0, p.r);
    ctx.bezierCurveTo(-p.r, p.r * .5, -p.r * .9, -p.r * 1.1, 0, -p.r); ctx.fill(); ctx.restore();
  }
  function tick() {
    ctx.clearRect(0, 0, W, H);
    if (ambientOn && parts.length < 42 && Math.random() < .25) parts.push({ x: Math.random() * W * 1.1 - W * .1, y: -20, vx: .4 + Math.random() * .7, vy: .7 + Math.random() * .9, r: 5 + Math.random() * 6, a: Math.random() * 6, va: (Math.random() - .5) * .05, flip: Math.random() * 6, sway: Math.random() * 6, c: COLORS[Math.random() * 4 | 0], amb: true });
    parts.forEach(p => {
      if (p.amb) { p.sway += .02; p.x += p.vx + Math.sin(p.sway) * .5; p.y += p.vy; }
      else { p.vy += .14; p.vx *= .985; p.x += p.vx; p.y += p.vy; p.life--; p.alpha = Math.min(1, p.life / 40); }
      p.a += p.va; p.flip += .05; petal(p);
    });
    parts = parts.filter(p => p.amb ? p.y < H + 30 : p.life > 0);
    raf = (parts.length || ambientOn) ? requestAnimationFrame(tick) : 0;
    if (!raf) ctx.clearRect(0, 0, W, H);
  }
  function run() { if (!raf) raf = requestAnimationFrame(tick); }
  addEventListener('resize', resize); resize();
  return {
    ambient(on) { ambientOn = on && !reduced; if (on) run(); },
    burst(x, y, n = 36) {
      if (reduced) return;
      for (let i = 0; i < n; i++) { const a = Math.random() * Math.PI * 2, s = 2 + Math.random() * 6; parts.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s - 4, r: 5 + Math.random() * 6, a: Math.random() * 6, va: (Math.random() - .5) * .3, flip: Math.random() * 6, c: COLORS[Math.random() * 5 | 0], life: 70 + Math.random() * 40 }); }
      run();
    },
    burstAt(el, n) { const r = el.getBoundingClientRect(); this.burst(r.left + r.width / 2, r.top + r.height / 2, n); }
  };
})();

/* ─────────── Splash / language ─────────── */
let greetTimer = 0;
function initSplash() {
  $('#splashScene').innerHTML = splashScene();
  $('#langGrid').innerHTML = LANGS.map((l, i) => `<button class="lang-tile" role="listitem" data-lang="${l.code}" style="animation-delay:${350 + i * 70}ms"><b lang="${l.code}">${l.native}</b><small>${l.name}</small></button>`).join('');
  $$('.lang-tile').forEach(b => b.onclick = () => chooseLang(b.dataset.lang, b));
  let gi = 0;
  clearInterval(greetTimer);
  greetTimer = setInterval(() => {
    const g = $('#greet'); g.classList.add('out');
    setTimeout(() => { gi = (gi + 1) % LANGS.length; g.textContent = LANGS[gi].hello; g.lang = LANGS[gi].code; g.classList.remove('out'); }, 430);
  }, 1900);
  Petals.ambient(true);
}

function openSplash() {
  $$('.lang-tile').forEach(b => b.classList.remove('picked'));
  $('#splash').hidden = false;
  Petals.ambient(true);
}

async function chooseLang(code, tile) {
  if (S.busy) return;
  S.busy = true;
  const first = !S.mapReady;
  S.lang = code;
  tile?.classList.add('picked');
  applyI18n();
  await sleep(260);
  if (!window.TD_REPLAY) $('#shoji').classList.add('close');
  await sleep(540);
  $('#splash').hidden = true;
  Petals.ambient(false);
  $('#app').hidden = false;
  if (first) { TokyoMap.init($('#map')); S.mapReady = true; renderForYou(); }
  rerenderDynamic();
  updatePill();
  await sleep(160);
  if (!window.TD_REPLAY) $('#shoji').classList.remove('close');
  S.busy = false;
  const L = LANGS.find(l => l.code === code);
  toast({ ic: 'volume', title: `${L.hello} · Tokyo`, text: `Signs, menus and announcements will be read to you in ${L.name}.`, timeout: 2800 });
}

function rerenderDynamic() {
  if (S.woven) renderTimeline(); else Wizard.refresh();
  if ($('#foodDrawer').classList.contains('open')) renderFood();
  if ($('#disPanel').classList.contains('open')) renderGantt();
  renderForYou();
  renderFeed();
}

/* ─────────── Mode switch (Part 2) ─────────── */
function updatePill() {
  const on = $('#modeSwitch button.on'), pill = $('#modeSwitch .pill');
  if (!on || !on.offsetWidth) return;
  pill.style.left = on.offsetLeft + 'px'; pill.style.width = on.offsetWidth + 'px';
}

function setMode(mode, ev) {
  if (mode === S.mode) return;
  const origin = ev && ev.clientX ? ev : (() => { const r = $(`#modeSwitch [data-mode="${mode}"]`).getBoundingClientRect(); return { clientX: r.left + r.width / 2, clientY: r.top + r.height / 2 }; })();
  const apply = () => {
    document.documentElement.classList.add('vt');
    document.body.classList.replace('mode-' + S.mode, 'mode-' + mode);
    S.mode = mode;
    syncMode();
  };
  if (document.startViewTransition && !reduced && !window.TD_REPLAY) {
    const vt = document.startViewTransition(apply);
    vt.ready.then(() => {
      const { clientX: x, clientY: y } = origin, r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
      document.documentElement.animate({ clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] }, { duration: 800, easing: 'cubic-bezier(.7,0,.2,1)', pseudoElement: '::view-transition-new(root)' });
    }).catch(() => {});
    vt.finished.finally(() => document.documentElement.classList.remove('vt'));
  } else { apply(); document.documentElement.classList.remove('vt'); }
}

function syncMode() {
  $$('#modeSwitch button').forEach(b => { const on = b.dataset.mode === S.mode; b.classList.toggle('on', on); b.setAttribute('aria-checked', on); });
  $('#tagline').textContent = t('tag.' + S.mode);
  updatePill();
  renderForYou();
  if (S.mapReady) TokyoMap.modePins(S.mode);
  if (S.woven) renderTimeline();
}

function renderForYou() {
  $('#fyMode').textContent = '· ' + t('mode.' + S.mode);
  $('#fyRail').innerHTML = MODES[S.mode].cards.map((c, i) => `
    <article class="fy-card" style="--d:${i * 70}ms">
      <span class="fi">${icon(c.icon)}</span>
      <span class="k">${c.kicker}</span><b>${c.title}</b><span class="m">${c.meta}</span>
      <span class="bd">${c.badge}</span><span class="f">${c.foot}</span>
    </article>`).join('');
}

/* ─────────── Plan form ─────────── */
function bindSeg(sel, fn) {
  $$(sel + ' button').forEach(b => b.addEventListener('click', () => {
    $$(sel + ' button').forEach(x => x.classList.toggle('on', x === b));
    fn(b.dataset.v, b);
  }));
}

/* One question at a time. Each step: q = i18n key, type = how it is answered,
   opts() = [value, label, icon, sub], suggest = the demo answer, set() = side effect, show() = text in the answer pill. */
const WZ = [
  { key: 'arrival', q: 'f.arrival', type: 'cards', ic: 'plane', suggest: 'airport',
    opts: () => [['airport', t('f.airport'), 'plane', 'Haneda · Narita'], ['rail', t('f.rail'), 'train', 'Shinkansen · JR'], ['port', t('f.port'), 'globe', 'Cruise terminals'], ['bus', t('f.bus'), 'bus', 'Busta Shinjuku']],
    set: v => { if (S.arrival !== v) delete S.answers.landing; S.arrival = v; }, show: v => t('f.' + v) },
  { key: 'landing', q: 'q.landing', type: 'list', ic: 'pin', suggest: () => ARRIVALS[S.arrival][0],
    opts: () => ARRIVALS[S.arrival].map(o => [o, o, 'pin', '']), set: v => { S.landing = v; }, show: v => v.replace(/\s*\(.*\)/, '') },
  { key: 'time', q: 'q.time', type: 'chips', ic: 'clock', suggest: '08:20', mono: true,
    opts: () => ['06:40', '08:20', '10:15', '13:30'].map(v => [v, v]), set: v => { S.time = v; }, show: v => v,
    note: 'We plan from 09:00, after immigration and baggage.' },
  { key: 'dest', q: 'q.dest', type: 'dest', ic: 'lock', show: () => `${S.dest.name} · 14:00` },
  { key: 'interests', q: 'f.prefs', type: 'multi', ic: 'heart', suggest: ['Culture', 'Food', 'Markets'],
    opts: () => INTERESTS.map(v => [v, v]), show: () => [...S.interests].join(', ') },
  { key: 'pace', q: 'q.pace', type: 'cards', ic: 'walk', suggest: 'balanced', three: true,
    opts: () => [['relaxed', t('pace.relaxed'), 'leaf', 'Long breaks, fewer stops'], ['balanced', t('pace.balanced'), 'clock', '20-minute buffers'], ['packed', t('pace.packed'), 'sparkle', 'See as much as possible']],
    set: v => { S.pace = v; }, show: v => t('pace.' + v) },
  { key: 'budget', q: 'q.budget', type: 'budget', ic: 'yen', show: () => yen(S.budget) },
  { key: 'diet', q: 'q.diet', type: 'chips', ic: 'bowl', suggest: 'No preference',
    opts: () => DIETS.map(d => [d, d]), set: v => { S.diet = v; }, show: v => v },
  { key: 'why', q: 'f.why', type: 'cards', ic: 'globe', suggest: 'leisure', three: true,
    opts: () => [['leisure', t('mode.leisure'), 'torii', 'Culture, food, sights'], ['business', t('mode.business'), 'handshake', 'Meetups, spaces, visits'], ['study', t('mode.study'), 'cap', 'Campuses, labs, discounts']],
    set: (v, ev) => setMode(v, ev), show: v => t('mode.' + v) }
];

const Wizard = {
  cur: 0, lock: false,
  step() { return WZ[this.cur]; },
  firstOpen() { const i = WZ.findIndex(s => !(s.key in S.answers)); return i < 0 ? WZ.length : i; },

  optHtml(s, [v, label, ic, sub], i) {
    const sug = typeof s.suggest === 'function' ? s.suggest() : s.suggest;
    const on = s.type === 'multi' ? S.interests.has(v) : S.answers[s.key] === v;
    const isSug = !(s.key in S.answers) && (Array.isArray(sug) ? sug.includes(v) : sug === v);
    const tick = `<span class="wz-tick">${icon('check')}</span>`;
    const base = `class="wz-opt %C ${on ? 'on' : ''} ${isSug ? 'sug' : ''}" data-v="${v}" ${isSug ? `data-sug="${t('wz.sug')}"` : ''} style="--d:${i * 55}ms"`;
    if (s.type === 'cards') return `<button ${base.replace('%C', 'wz-card')}><span class="ico">${icon(ic)}</span><b>${label}</b><small>${sub}</small>${tick}</button>`;
    if (s.type === 'list') return `<button ${base.replace('%C', 'wz-row')}><span class="ico">${icon(ic)}</span><span>${label}</span>${tick}</button>`;
    return `<button ${base.replace('%C', 'wz-chip' + (s.mono ? ' mono' : ''))}>${label}</button>`;
  },

  html(i) {
    if (i >= WZ.length) {
      return `<section class="wz-q wz-ready"><p class="wz-kicker">${icon('check')} ${WZ.length} / ${WZ.length}</p><h3>${t('q.ready')}</h3>
        <p class="wz-note">Starting 09:00 at ${(S.landing || '').replace(/\s*\(.*\)/, '')} · ${S.dest?.name} locked for 14:00 · ${yen(S.budget)}</p>
        <button class="btn primary big wz-weave" id="weaveBtn"><span class="ico">${icon('sparkle')}</span><span>${t('f.weave')}</span></button></section>`;
    }
    const s = WZ[i];
    let body = '';
    if (s.type === 'cards') body = `<div class="wz-cards ${s.three ? 'three' : ''}">${s.opts().map((o, k) => this.optHtml(s, o, k)).join('')}</div>`;
    else if (s.type === 'list') body = `<div class="wz-list">${s.opts().map((o, k) => this.optHtml(s, o, k)).join('')}</div>`;
    else if (s.type === 'chips' || s.type === 'multi') body = `<div class="wz-chips">${s.opts().map((o, k) => this.optHtml(s, o, k)).join('')}</div>`;
    else if (s.type === 'dest') body = `<div class="wz-dest"><button class="pick-btn wz-opt" id="pickBtn" style="--d:0ms"><span class="ico">${icon('pin')}</span><span>${t('f.pick')}</span></button></div>`;
    else if (s.type === 'budget') body = `<div class="wz-budget"><output class="wz-big" id="wzBudgetOut">${yen(S.budget)}</output>
        <p class="wz-conv" id="wzConv">${this.conv(S.budget)}</p>
        <input id="wzBudget" type="range" min="4000" max="30000" step="1000" value="${S.budget}" aria-label="${t('q.budget')}"></div>`;
    if (s.note) body += `<p class="wz-note">${s.note}</p>`;
    if (s.type === 'dest') body += `<p class="wz-note">Search the map, then lock it with a hanko stamp.</p>`;
    const next = s.type === 'multi' || s.type === 'budget'
      ? `<div class="wz-foot"><span class="wz-note" id="wzSel">${s.type === 'multi' ? this.selText() : ''}</span><button class="btn primary wz-next" ${s.type === 'multi' && !S.interests.size ? 'disabled' : ''}>${t('wz.next')} ${icon('chevron')}</button></div>` : '';
    return `<section class="wz-q" data-key="${s.key}"><p class="wz-kicker">${t('wz.step')} ${i + 1} / ${WZ.length}</p><h3>${t(s.q)}</h3>${body}${next}</section>`;
  },

  conv(v) { return `≈ $${Math.round(v * 0.0066)} · ₹${Math.round(v * 0.56).toLocaleString('en-IN')} · approx.`; },
  selText() { return S.interests.size ? `${S.interests.size} selected` : 'Pick one or more'; },

  async render(animate = true) {
    const stage = $('#wzStage'), old = stage.firstElementChild;
    if (old && animate) { old.classList.add('leaving'); await sleep(260); }
    stage.innerHTML = this.html(this.cur);
    this.bind(stage);
    this.progress();
    this.lock = false;
  },
  refresh() { this.renderAnswers(); this.render(false); },

  bind(stage) {
    const s = WZ[this.cur];
    $('#weaveBtn', stage)?.addEventListener('click', weave);
    $('#pickBtn', stage)?.addEventListener('click', () => { S.locked = false; openPicker(); });
    if (!s) return;
    if (s.type === 'multi') {
      $$('.wz-opt', stage).forEach(b => b.onclick = () => {
        const v = b.dataset.v;
        S.interests.has(v) ? S.interests.delete(v) : S.interests.add(v);
        b.classList.toggle('on', S.interests.has(v)); b.classList.remove('sug');
        $('#wzSel').textContent = this.selText();
        $('.wz-next', stage).disabled = !S.interests.size;
      });
      $('.wz-next', stage).onclick = () => this.answer('interests', [...S.interests]);
    } else if (s.type === 'budget') {
      const r = $('#wzBudget', stage), out = $('#wzBudgetOut', stage);
      r.oninput = () => {
        S.budget = +r.value; out.textContent = yen(S.budget); $('#wzConv').textContent = this.conv(S.budget);
        out.classList.remove('tick'); out.offsetWidth; out.classList.add('tick');
      };
      $('.wz-next', stage).onclick = () => this.answer('budget', S.budget);
    } else if (s.type !== 'dest') {
      $$('.wz-opt', stage).forEach(b => b.onclick = e => this.pick(b, e));
    }
  },

  /* Single choice: the picked option pops with a tick, the rest fade, then the answer folds into a pill. */
  async pick(btn, ev) {
    if (this.lock) return;
    this.lock = true;
    const q = btn.closest('.wz-q');
    btn.classList.add('picked');
    $$('.wz-opt', q).forEach(o => { if (o !== btn) o.classList.add('dim'); });
    await sleep(430);
    this.answer(WZ[this.cur].key, btn.dataset.v, ev);
  },

  answer(key, v, ev) {
    const s = WZ.find(x => x.key === key);
    s.set?.(v, ev);
    S.answers[key] = v;
    this.renderAnswers(key);
    this.cur = this.firstOpen();
    this.render();
  },

  renderAnswers(just) {
    $('#wzAnswers').innerHTML = WZ.filter(s => s.key in S.answers).map(s => {
      const i = WZ.indexOf(s);
      return `<li class="wz-a ${s.key === just ? 'just' : ''}"><button data-i="${i}" title="${t(s.q)}"><span class="ico">${icon(s.ic)}</span>${s.show(S.answers[s.key])}</button></li>`;
    }).join('');
    $$('#wzAnswers button').forEach(b => b.onclick = () => { if (S.woven || this.lock) return; this.cur = +b.dataset.i; this.render(); });
  },

  progress() {
    const n = WZ.filter(s => s.key in S.answers).length;
    $('#wzBar').style.width = (n / WZ.length * 100) + '%';
    $('#wzCount').textContent = n >= WZ.length ? '✓' : `${this.cur + 1} / ${WZ.length}`;
  }
};

function initForm() {
  Wizard.render(false);
  $$('#modeSwitch button').forEach(b => b.onclick = e => setMode(b.dataset.mode, e));
  $('#lockBtn').onclick = lockDestination;
  const inp = $('#searchInput');
  inp.oninput = () => { typeToken++; renderSuggest(inp.value); };
  inp.onkeydown = e => { if (e.key === 'Enter') { const first = $('#suggest li button'); first?.click(); } if (e.key === 'Escape') closePicker(); };
}

/* ─────────── Map picker ─────────── */
let typeToken = 0;
async function openPicker() {
  if (S.woven) return;
  const wrap = $('#mapWrap');
  wrap.classList.add('picking');
  if (innerWidth <= 900) wrap.scrollIntoView({ behavior: 'smooth', block: 'start' });
  $('#destCard').hidden = true;
  TokyoMap.flyTo(['asakusa', 'shibuya', 'skytree', 'shinagawa'], 90, 800);
  const inp = $('#searchInput'); inp.value = ''; renderSuggest('');
  const my = ++typeToken;
  await sleep(500);
  for (const ch of 'Shibuya') {
    if (my !== typeToken || !wrap.classList.contains('picking')) return;
    inp.value += ch; renderSuggest(inp.value); await sleep(75);
  }
  if (my === typeToken) inp.focus({ preventScroll: true });
}
function closePicker() { $('#mapWrap').classList.remove('picking'); $('#suggest').classList.remove('show'); typeToken++; }

function renderSuggest(q) {
  const s = q.trim().toLowerCase();
  const list = DESTINATIONS.filter(d => !s || (d.name + ' ' + d.area + ' ' + d.ja).toLowerCase().includes(s));
  const ul = $('#suggest');
  ul.innerHTML = list.map((d, i) => `<li><button class="${i === 0 && s ? 'hl' : ''}" data-id="${d.id}" role="option">
      <span class="ico">${icon('pin')}</span><span><b>${d.name}</b><small>${d.ja} · ${d.area}</small></span>
      <em>${LINES[d.leg.line].code} · ${d.leg.mins} min</em></button></li>`).join('') || `<li style="padding:12px;color:var(--ink-2);font-size:13px">No match. Try “Shibuya”, “Skytree” or “Ginza”.</li>`;
  ul.classList.add('show');
  $$('button', ul).forEach(b => b.onclick = () => selectDest(DESTINATIONS.find(d => d.id === b.dataset.id)));
}

function selectDest(d) {
  typeToken++;
  S.dest = d; S.locked = false;
  $('#suggest').classList.remove('show');
  $('#searchInput').value = d.name;
  TokyoMap.flyTo([d.pt], 230, 900);
  TokyoMap.showDest(d);
  $('#dcArea').textContent = d.area + ' · ' + LINES[d.leg.line].name;
  $('#dcName').textContent = d.name;
  $('#dcJa').textContent = d.ja;
  $('#dcNote').textContent = d.note;
  const card = $('#destCard');
  card.hidden = true; card.offsetWidth; card.hidden = false; card.classList.remove('shake');
  $('#hanko').classList.remove('on');
  const lb = $('#lockBtn'); lb.disabled = false;
  lb.innerHTML = `<span class="ico">${icon('lock')}</span><span>${t('map.lock')}</span>`;
}

async function lockDestination() {
  if (!S.dest || S.locked) return;
  S.locked = true;
  $('#hanko').classList.add('on');
  $('#destCard').classList.add('shake');
  TokyoMap.lockDest();
  const lb = $('#lockBtn'); lb.disabled = true;
  lb.innerHTML = `<span class="ico">${icon('check')}</span><span>${t('map.locked')}</span>`;
  setTimeout(() => Petals.burstAt($('#hanko'), 18), 300);
  await sleep(1000);
  closePicker();
  $('#destCard').hidden = true;
  const d = S.dest;
  Wizard.answer('dest', d.id);
  if (innerWidth <= 900) $('#planForm').scrollIntoView({ behavior: 'smooth', block: 'start' });
  TokyoMap.flyTo(['haneda', 'asakusa', d.pt], 120, 900);
}

/* ─────────── Weave the day ─────────── */
async function weave() {
  if (!S.locked || S.busy || S.woven) return;
  S.busy = true;
  const d = S.dest, landing = (S.landing || ARRIVALS[S.arrival][0]).replace(/\s*\(.*\)/, '');
  $('#planForm').hidden = true;
  const loader = $('#loader'); loader.hidden = false;
  $('#helix').innerHTML = Array.from({ length: 10 }, (_, i) => `<i style="--d:${-i * .16}s"><span></span></i>`).join('');
  const lines = [`Reading Keikyu timetable from ${landing}`, 'Finding a homestay with a hot shower in Asakusa', 'Senso-ji is open 06:00–17:00, adding it', `Keeping a buffer before ${d.name} at 14:00`, 'Holding your 18:30 Romancecar seat to Hakone'];
  const ul = $('#loadLines'); ul.innerHTML = '';
  $('#colLeft').scrollTop = 0;
  for (const l of lines) { const li = document.createElement('li'); li.textContent = l; ul.appendChild(li); await sleep(reduced ? 0 : 320); }
  await sleep(250);
  S.plan = buildPlan(d); S.woven = true;
  loader.hidden = true;
  $('#timeline').hidden = false;
  renderTimeline({ reveal: true });
  setClock('09:00', true);
  $('#ffBtn').disabled = false; $('#ffBtn').title = 'Jump to 18:34 (T)';
  TokyoMap.drawRoute(S.plan, 300);
  S.busy = false;
}

function setClock(time, roll) {
  S.now = time;
  $('#clockTime').textContent = time;
  if (roll) { const c = $('#clock'); c.classList.remove('roll'); c.offsetWidth; c.classList.add('roll'); }
}

/* ─────────── Timeline (signature) ─────────── */
function planCost() {
  let sum = 0;
  S.plan.forEach(s => { if (!s.missed) sum += (s.cost || 0) + (s.leg?.fare || 0); });
  if (S.lunch) sum += S.lunch.total;
  return sum;
}
function cultureMins() { return S.plan.reduce((a, s) => a + (s.culture || 0), 0) + (S.lunch?.culture || 0); }
function fmtDur(m) { return `${Math.floor(m / 60)}h ${String(m % 60).padStart(2, '0')}m`; }

function renderStats() {
  const box = $('#tlStats'); if (!box) return;
  const dest = S.plan.find(s => s.id === 'dest');
  const buffer = toMin('14:00') - toMin(dest.arrive), cost = planCost(), pct = cost / S.budget * 100, over = pct > 100;
  box.innerHTML = `
    <div class="stat ok"><b>${buffer} min</b><small>${t('tl.buffer')} · ${dest.title} 14:00</small></div>
    <div class="stat ${over ? 'over' : ''}"><b>${yen(cost)}</b><div class="bar"><i style="--w:${Math.min(100, pct)}%"></i></div><small>${Math.round(pct)}% ${t('tl.budget')} · ${yen(S.budget)}</small></div>
    <div class="stat"><b>${fmtDur(cultureMins())}</b><small>${t('tl.culture')}</small></div>`;
}

function lineBadge(key) {
  const L = LINES[key];
  if (key === 'walk') return `<span class="line-badge walk">${icon('walk')}</span>`;
  return `<span class="line-badge" style="--lc:${L.color}" title="${L.name}">${L.code}</span>`;
}

function legRow(s) {
  const L = s.leg; if (!L) return '';
  const badges = lineBadge(L.line) + (L.then ? lineBadge(L.then) : '');
  const pre = L.walkBefore ? `Walk ${L.walkBefore} min, then ` : '';
  const meta = L.line === 'walk' ? '' : ` · <b>${L.mins} min</b>${L.fare ? ` · <b>${yen(L.fare)}</b>` : ''}`;
  return `<div class="leg-row">${badges}<span>${pre}${L.label}${meta}</span></div>`;
}

function stopCard(s, i) {
  if (s.slot && !S.lunch) {
    return `<div class="card lunch-slot"><span class="ico big">${icon('bowl')}</span><div><h4>${t('tl.lunch')}</h4><p class="d">${t('tl.lunchsub')}</p></div>
      <button class="btn primary" id="lunchBtn">${icon('search')}<span>${t('tl.lunch')}</span></button></div>${legRow(s)}`;
  }
  if (s.slot && S.lunch) {
    const L = S.lunch;
    return `<div class="card"><div class="lunch-booked"><div class="thumb">${ART.food(L.art, L.id)}</div><div>
      <h4><span class="ico">${icon('bowl')}</span>${L.name}</h4><p class="ja">${L.ja} · ${L.sub}</p>
      <div class="tags-row"><span class="booking-code">${L.code}</span><span class="tg">${L.slot} · ${L.party} ${L.party > 1 ? 'guests' : 'guest'}</span><span class="tg mode">${L.pay === 'now' ? 'Paid · 5% off' : t('book.payat')}</span>${L.partner ? `<span class="tg partner">Partner −${L.partner}%</span>` : ''}</div>
      </div></div>${legRow(s)}</div>`;
  }
  const chips = (s.chipsFixed || s.chips?.[S.mode] || []).map(c => `<span class="tg mode">${c}</span>`).join('') + (s.partner ? `<span class="tg partner">Partner −${s.partner}%</span>` : '');
  const title = `<span class="title">${s.title}</span>`;
  let extra = '';
  if (s.tip) extra += `<div class="tip"><b>Etiquette:</b> ${s.tip}</div>`;
  if (s.id === 'dest') extra += `<div class="arrive-note">${icon('check')} Arrive ${s.arrive} · ${toMin('14:00') - toMin(s.arrive)} min before your slot</div>`;
  if (s.hostNote) extra += `<div class="host-note">${icon('check')}<span>${s.hostNote}</span></div>`;
  if (s.id === 'romance' && S.woven && !s.missed) extra += `<button class="miss-btn" id="missBtn">${icon('alert')} ${t('tl.missed')}</button>`;
  const badge = s.rebooked ? ` <span class="badge-new">${icon('check')} Rebooked</span>` : '';
  const warn = s.warn ? `<div class="host-note" style="background:color-mix(in srgb,var(--bad) 12%,transparent)">${icon('alert')}<span>Departed 18:30 without you. You are 600 m from the platform.</span></div>` : '';
  return `<div class="card">${s.missed ? '<span class="stamp-missed">MISSED</span>' : ''}
    <h4><span class="ico">${icon(s.icon)}</span>${title}${badge}</h4><p class="ja">${s.ja}</p>
    <p class="d">${s.desc}</p>${warn}${extra}<div class="tags-row">${chips}</div>${s.missed ? '' : legRow(s)}</div>`;
}

function renderTimeline(fx = {}) {
  const p = S.plan, tl = $('#timeline');
  const nowMin = S.now === DISRUPTION.detectedAt ? toMin(S.now) : null;
  let nowPlaced = false, html = '';
  p.forEach((s, i) => {
    if (nowMin != null && !nowPlaced && toMin(s.time) > nowMin && !s.missed) {
      nowPlaced = true;
      html += `<div class="now-line"><span class="t">${S.now}</span><span class="rail"><i></i></span><span class="lbl"><span>Now</span></span></div>`;
    }
    const legColor = s.leg ? (s.leg.line === 'walk' ? 'var(--ink-2)' : LINES[s.leg.line].color) : 'transparent';
    const prev = p[i - 1];
    const inColor = prev?.leg ? (prev.leg.line === 'walk' ? 'var(--ink)' : LINES[prev.leg.line].color) : 'var(--accent)';
    const done = nowMin != null && toMin(s.time) < nowMin && !s.missed && !s.warn;
    const cls = ['stop', s.locked && 'locked', s.leg?.line === 'walk' && 'walk-leg', done && 'done', s.missed && 'missed', s.rebooked && 'rebooked',
      fx.reveal && 'reveal', fx.flash === s.id && 'flash', fx.slideIn === s.id && 'slide-in'].filter(Boolean).join(' ');
    const time = fx.roll === s.id ? `<span class="roll-in">${s.time}</span>` : s.time;
    html += `<div class="${cls}" data-i="${i}" data-id="${s.id}" style="--d:${i * 170}ms;--leg:${legColor};--leg-in:${inColor}${s.missed ? ';--leg:transparent' : ''}">
      <div class="t">${time}${s.id === 'dest' ? `<small>arr ${s.arrive}</small>` : ''}</div>
      <div class="rail"><span class="stn-mark"><i>TD</i><b>${done ? '✓' : String(i + 1).padStart(2, '0')}</b></span></div>
      <div class="body">${stopCard(s, i)}</div></div>`;
  });
  tl.innerHTML = `<div class="tl-head"><p class="eyebrow">${S.dest.name} 14:00 · ${S.landing || ARRIVALS[S.arrival][0]}</p>
      <h2>${t('tl.title')} <small>${p.length} STOPS · SAMPLE</small></h2><div class="tl-stats" id="tlStats"></div></div>
    <div class="tl-list">${html}</div>`;
  renderStats();
  $('#lunchBtn')?.addEventListener('click', openFood);
  $('#missBtn')?.addEventListener('click', reportMissed);
  $$('.stop', tl).forEach(n => {
    n.addEventListener('mouseenter', () => TokyoMap.focusStop(+n.dataset.i));
    n.addEventListener('mouseleave', () => TokyoMap.focusStop(null));
  });
}

function scrollToStop(id) {
  const n = $(`.stop[data-id="${id}"]`); if (!n) return;
  const col = $('#colLeft');
  col.scrollTo({ top: n.offsetTop - col.clientHeight / 3, behavior: reduced ? 'auto' : 'smooth' });
}

/* ─────────── Food (lunch) ─────────── */
function openFood() {
  closeDrawer('#disPanel');
  renderFood();
  const d = $('#foodDrawer'); d.classList.add('open'); d.inert = false;
}
function closeDrawer(sel) { const d = $(sel); if (d.contains(document.activeElement)) document.activeElement.blur(); d.classList.remove('open'); d.inert = true; }

function renderFood() {
  $('#cuisines').innerHTML = CUISINES.map(c => `<button class="cuisine ${S.cuisine === c.id ? 'on' : ''}" data-c="${c.id}">${c.label} <small>${c.ja}</small></button>`).join('');
  $$('#cuisines .cuisine').forEach(b => b.onclick = () => { S.cuisine = b.dataset.c; renderFood(); });
  const list = S.cuisine ? RESTAURANTS[S.cuisine] : [];
  $('#foodGrid').innerHTML = list.map((r, i) => `
    <article class="food-card" style="--d:${i * 80}ms">
      <div class="art-wrap">${ART.food(r.art, r.id)}${r.partner ? `<span class="partner-flag">Partner −${r.partner}%</span>` : ''}<span class="walk-flag">${icon('walk')} ${r.walk} ${t('food.walk')}</span></div>
      <div class="fb">
        <h4>${r.name}</h4><span class="ja">${r.ja} · <span class="rt">${icon('star')} ${r.rating} <span>(${r.reviews})</span></span></span>
        <span class="sub">${r.sub}</span><span class="price">${r.price}</span>
        <div class="tags-row">${r.tags.map(x => `<span class="tg">${x}</span>`).join('')}</div>
        <button class="btn primary" data-r="${r.id}">${icon('ticket')}<span>${t('food.add')}</span></button>
      </div></article>`).join('');
  $$('#foodGrid .btn').forEach(b => b.onclick = () => openBooking(list.find(r => r.id === b.dataset.r)));
}

function openBooking(r) {
  S.pending = r; S.slot = '12:15'; S.party = 1; S.pay = 'restaurant';
  $('#bookHead').innerHTML = `<div class="thumb">${ART.food(r.art, r.id)}</div><div><h3>${r.name}</h3><p>${r.ja} · ${r.sub}</p><p>${r.price} · ${r.walk} ${t('food.walk')} from Nakamise</p></div>`;
  $$('#slotSeg button').forEach(b => b.classList.toggle('on', b.dataset.v === '12:15'));
  $$('#payOpts button').forEach(b => b.classList.toggle('on', b.dataset.v === 'restaurant'));
  $('#party').textContent = '1';
  $('#bookBody').hidden = false; $('#bookDone').hidden = true;
  $('#bookModal').hidden = false;
  setTimeout(() => $('#bookConfirm').focus({ preventScroll: true }), 50);
}

async function confirmBooking() {
  const r = S.pending; if (!r || S.busy) return;
  S.busy = true;
  const code = 'TD-' + (4800 + r.id.length * 7 + r.walk);
  const off = (r.partner || 0) / 100 + (S.pay === 'now' ? .05 : 0);
  S.lunch = { ...r, slot: S.slot, party: S.party, pay: S.pay, code, total: r.cost * S.party * (1 - off), culture: r.id === 'hanakago' ? 20 : 0 };
  $('#bookDoneText').textContent = `${r.name} · ${S.slot} · ${S.party} ${S.party > 1 ? 'guests' : 'guest'} · ${S.pay === 'now' ? 'Paid now, 5% off' : 'Pay at restaurant'} · ${code}`;
  $('#bookBody').hidden = true; $('#bookDone').hidden = false;
  Petals.burstAt($('.done-check'), 30);
  await sleep(1300);
  $('#bookModal').hidden = true;
  closeDrawer('#foodDrawer');
  renderTimeline({ flash: 'lunch' });
  scrollToStop('lunch');
  S.busy = false;
}

/* ─────────── Disruption ─────────── */
async function jumpTime() {
  if (!S.woven || S.busy) return;
  closeDrawer('#foodDrawer');
  if (S.now !== DISRUPTION.detectedAt) {
    setClock(DISRUPTION.detectedAt, true);
    const r = S.plan.find(s => s.id === 'romance');
    if (!S.rebooked) r.warn = true;
    renderTimeline();
    TokyoMap.setNow('omoide');
    TokyoMap.flyTo(['harajuku', 'shinjuku', 'hakoneEdge'], 120, 1000);
  }
  scrollToStop(S.rebooked ? 'rebook' : 'romance');
  if (S.rebooked) return;
  await sleep(650);
  if (!S.detected || !$('#toasts .toast.alert')) {
    S.detected = true;
    toast({ type: 'alert', ic: 'alert', title: t('dis.toast'), text: `${DISRUPTION.detectedAt} · You are 600 m from the Odakyu platforms. Every way to still reach Hakone is ready.`, timeout: 0,
      actions: [{ label: t('dis.show'), fn: openDisruption }, { label: 'Not now', sec: true }] });
  }
}

function reportMissed() {
  if (S.now !== DISRUPTION.detectedAt) { setClock(DISRUPTION.detectedAt, true); S.plan.find(s => s.id === 'romance').warn = true; renderTimeline(); TokyoMap.setNow('omoide'); }
  S.detected = true;
  $$('#toasts .toast.alert').forEach(dismiss);
  openDisruption();
}

function openDisruption() {
  if (S.rebooked) return;
  closeDrawer('#foodDrawer');
  S.option = null;
  renderGantt();
  $('#rebookBtn').disabled = true;
  $('#disSummary').innerHTML = 'Pick an option to see what changes.';
  const d = $('#disPanel'); d.classList.add('open'); d.inert = false;
  TokyoMap.flyTo(['shinjuku', 'hakoneEdge', 'harajuku'], 140, 900);
}

function renderGantt() {
  const A0 = toMin('18:30'), SPAN = 180, pos = tm => ((toMin(tm) - A0) / SPAN * 100).toFixed(2) + '%';
  const ticks = ['18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30'];
  const label = { odakyu: 'Odakyu', tozan: 'Tozan', bus: 'Bus', taxi: 'Taxi' };
  const rows = DISRUPTION.options.map((o, i) => `
    <button class="g-row ${S.option === o.id ? 'sel' : ''}" data-id="${o.id}" style="--d:${i * 90}ms">
      <span class="g-info"><span class="letter">${o.id}</span><b>${o.title}${o.best ? ` <span class="best-tag">${t('dis.best')}</span>` : ''}</b><small>${o.sub}</small><small>${o.facts.join(' · ')}</small></span>
      <span class="g-track"><span class="g-deadline" style="left:${pos(DISRUPTION.deadline)}"></span>${o.segs.map(([a, b, k], j) => {
        const cls = k === 'walk' || k === 'wait' ? k : '';
        const w = (toMin(b) - toMin(a)) / SPAN * 100;
        return `<span class="g-seg ${cls}" style="left:${pos(a)};width:${w.toFixed(2)}%;--sc:${LINES[k]?.color || 'transparent'};--d:${i * 90 + j * 80 + 200}ms">${!cls && w > 12 ? `<span>${label[k]}</span>` : ''}</span>`;
      }).join('')}</span>
      <span class="g-res"><span class="arr">${o.arrive}</span><span class="cost">${o.cost}</span><span class="verdict ${o.verdict}">${o.verdictText}</span></span>
    </button>`).join('');
  $('#gantt').innerHTML = `<div class="g-axis"><span>Option</span><span class="ticks">${ticks.map(x => `<span style="left:${pos(x)}">${x}</span>`).join('')}</span><span style="text-align:right">Arrive · cost</span></div>
    ${rows}
    <div class="g-legend"><span><i style="background:${LINES.odakyu.color}"></i>Odakyu</span><span><i style="background:${LINES.tozan.color}"></i>Hakone Tozan</span><span><i style="background:${LINES.bus.color}"></i>Bus</span><span><i style="background:${LINES.taxi.color}"></i>Taxi</span><span><i style="background:repeating-linear-gradient(90deg,var(--ink-2) 0 3px,transparent 3px 6px);height:3px"></i>Walk</span><span><i style="background:repeating-linear-gradient(45deg,var(--line) 0 3px,transparent 3px 6px);border:1px solid var(--line)"></i>Wait</span><span><i style="border-left:2px dashed var(--bad);width:2px;border-radius:0"></i>Dinner 20:30</span></div>`;
  $$('#gantt .g-row').forEach(b => b.onclick = () => selectOption(b.dataset.id));
}

function selectOption(id) {
  const o = DISRUPTION.options.find(x => x.id === id);
  S.option = id;
  $$('#gantt .g-row').forEach(b => b.classList.toggle('sel', b.dataset.id === id));
  $('#rebookBtn').disabled = false;
  $('#disSummary').innerHTML = `<b>${o.title}</b> · arrive ${o.arrive} · ${o.cost} (${o.costNote})<br>${o.ryokan.note}`;
  TokyoMap.showAlt(o);
}

async function rebook() {
  const o = DISRUPTION.options.find(x => x.id === S.option);
  if (!o || S.rebooked || S.busy) return;
  S.busy = true;
  S.rebooked = o;
  closeDrawer('#disPanel');
  const idx = S.plan.findIndex(s => s.id === 'romance');
  const romance = S.plan[idx]; romance.missed = true; romance.warn = false;
  const extra = { A: 1200, B: 0, C: 2330, D: 36000 }[o.id];
  const ns = o.newStop;
  S.plan.splice(idx + 1, 0, {
    id: 'rebook', time: ns.time, title: ns.title, ja: ns.ja, icon: ns.line === 'bus' ? 'bus' : ns.line === 'taxi' ? 'taxi' : 'train', pt: 'shinjuku',
    kind: 'train', desc: ns.desc, chipsFixed: ns.chips, rebooked: true, cost: extra,
    leg: { line: ns.line, mins: ns.mins, label: ns.label, path: ['shinjuku', 'hakoneEdge'] }
  });
  const ryokan = S.plan.find(s => s.id === 'ryokan');
  ryokan.time = o.ryokan.time; ryokan.hostNote = o.ryokan.note;
  await sleep(350);
  renderTimeline({ slideIn: 'rebook', roll: 'ryokan', flash: 'ryokan' });
  TokyoMap.markMissed();
  scrollToStop('rebook');
  toast({ type: 'ok', ic: 'check', title: `Rebooked · ${ns.title.replace(/ to .*/, '')} ${ns.time}`, text: o.ryokan.note, timeout: 3600 });
  setTimeout(() => { const n = $('.stop[data-id="rebook"] .card'); if (n) Petals.burstAt(n, 24); }, 500);
  S.busy = false;
}

/* ─────────── Feed (Part 3) ─────────── */
function avatar(p, small) { return `<span class="avatar ${p.you ? 'you' : ''}" style="--hue:${p.hue || 'var(--accent)'}">${p.you ? 'You' : p.initials}</span>`; }

function renderFeed() {
  const lunchArt = S.lunch ? ART.food(S.lunch.art, S.lunch.id) : ART.food(RESTAURANTS.ramen[0].art, 'kaminari');
  $('#compMedia').innerHTML = `<div class="thumb">${lunchArt}<small>${S.lunch ? S.lunch.name : 'Your photo'}</small></div>`;
  $('#posts').innerHTML = S.feed.map((p, i) => `
    <article class="post ${p.fresh ? 'fresh' : ''}" data-id="${p.id}" style="--d:${i * 70}ms">
      <header class="post-head">${avatar(p)}<div><b>${p.who}${p.local ? ' <span class="local-badge">Local</span>' : ''}</b><small>${p.local ? 'Lives in ' : p.you ? '' : 'From '}${p.from} · ${p.time}</small></div>
        ${p.you ? '' : `<button class="connect ${p.connected ? 'on' : ''}" data-act="connect">${icon(p.connected ? 'check' : 'userplus')} ${p.connected ? 'つながった' : 'つながる'} <small>${p.connected ? 'Connected' : 'Tsunagaru'}</small></button>`}</header>
      <p class="post-text">${p.text}</p>
      <div class="post-media">${p.art === 'lunch' ? lunchArt : ART[p.art]()}</div>
      <div class="post-acts">
        <button data-act="like" class="${p.liked ? 'liked' : ''}">${icon('heart')} <span class="count">${p.likes + (p.liked ? 1 : 0)}</span></button>
        <button data-act="comment">${icon('comment')} <span class="count">${p.comments.length}</span> ${t('feed.comment')}</button>
      </div>
      ${p.open || p.comments.length ? `<div class="comments">${p.comments.map(c => `<div class="cmt">${avatar({ initials: c.who.slice(0, 2).toUpperCase(), hue: c.local ? '#D9123D' : '#6A5A50', you: c.who === 'You' })}<div><b>${c.who}${c.local ? ` <span class="local-badge">Local · ${c.local}</span>` : ''}</b>${c.text}</div></div>`).join('')}
        ${p.open ? `<div class="cmt-form"><input type="text" value="ありがとう! Can I visit on Thursday?" aria-label="Write a comment"><button data-act="send">${t('feed.post')}</button></div>` : ''}</div>` : ''}
    </article>`).join('');
  S.feed.forEach(p => { p.fresh = false; });
  $$('#posts .post').forEach(n => {
    const p = S.feed.find(x => x.id === n.dataset.id);
    $$('[data-act]', n).forEach(b => b.onclick = e => feedAct(p, b.dataset.act, b, n, e));
  });
  $('#locals').innerHTML = LOCALS.map((l, i) => `<li>${avatar(l)}<b>${l.name}</b><small>${l.role}</small><span class="offer">Exchange: ${l.offer}</span>
    <button class="connect ${S.localsOn.has(i) ? 'on' : ''}" data-l="${i}">${icon(S.localsOn.has(i) ? 'check' : 'userplus')} ${S.localsOn.has(i) ? 'つながった' : 'つながる'}</button></li>`).join('');
  $$('#locals .connect').forEach(b => b.onclick = () => {
    const i = +b.dataset.l;
    if (!S.localsOn.has(i)) { S.localsOn.add(i); toast({ ic: 'userplus', title: `Request sent to ${LOCALS[i].name}`, text: 'Contact details stay private until you both agree.', timeout: 2600 }); }
    else S.localsOn.delete(i);
    renderFeed();
  });
  $('#couponCount').textContent = S.coupons.length;
  $('#couponList').innerHTML = S.coupons.map(c => `<li><b>${c.title}</b>${c.where}</li>`).join('');
}

function feedAct(p, act, btn, node, e) {
  if (act === 'like') {
    p.liked = !p.liked;
    if (p.liked) heartBurst(btn);
    const c = $('.count', btn); c.textContent = p.likes + (p.liked ? 1 : 0); btn.classList.toggle('liked', p.liked);
    if (p.liked) { btn.querySelector('.ic').style.animation = 'none'; btn.offsetWidth; btn.querySelector('.ic').style.animation = ''; }
  } else if (act === 'comment') { p.open = !p.open; renderFeed(); $(`.post[data-id="${p.id}"] .cmt-form input`)?.focus({ preventScroll: true }); }
  else if (act === 'send') {
    const v = $('.cmt-form input', node).value.trim(); if (!v) return;
    p.comments.push({ who: 'You', text: v }); p.open = false; renderFeed();
  } else if (act === 'connect') {
    p.connected = !p.connected;
    if (p.connected) toast({ ic: 'userplus', title: `つながった · Connected with ${p.who}`, text: p.local ? 'Locals answer questions in your language through Trip DNA.' : 'You can now message each other.', timeout: 2400 });
    renderFeed();
  }
}

function heartBurst(btn) {
  const b = document.createElement('span'); b.className = 'heart-burst';
  b.innerHTML = Array.from({ length: 8 }, (_, i) => { const a = i / 8 * Math.PI * 2; return `<i style="--x:${Math.cos(a) * 26}px;--y:${Math.sin(a) * 26}px"></i>`; }).join('');
  btn.appendChild(b); setTimeout(() => b.remove(), 700);
}

async function post() {
  const text = $('#compText').value.trim();
  if (!text || S.busy) return;
  S.feed.unshift({ id: 'me' + Date.now(), who: 'You', you: true, from: 'Day 1 · Asakusa', time: 'now', art: 'lunch', text, likes: 0, comments: [], fresh: true });
  $('#compText').value = '';
  renderFeed();
  $('#view-feed').scrollTo({ top: 0, behavior: 'smooth' });
  if (S.posted) return;
  S.posted = true;
  await sleep(700);
  openEnvelope();
}

function openEnvelope() {
  const env = $('#envelope'); env.classList.remove('open');
  $('#envTap').hidden = false; $('#envSave').hidden = true;
  $('#envModal').hidden = false;
}
function crackEnvelope() {
  const env = $('#envelope'); if (env.classList.contains('open')) return;
  env.classList.add('open');
  $('#envTap').hidden = true;
  setTimeout(() => Petals.burstAt(env, 70), 300);
  setTimeout(() => { $('#envSave').hidden = false; $('#envSave').focus({ preventScroll: true }); }, 1000);
}
function saveCoupon() {
  $('#envModal').hidden = true;
  S.coupons.unshift({ title: '¥500 off', where: 'Sumida river cruise or any partner café · TDNA-500' });
  renderFeed();
  const n = $('#couponCount'); n.classList.remove('bump'); n.offsetWidth; n.classList.add('bump');
  toast({ type: 'ok', ic: 'gift', title: 'Saved to wallet', text: '¥500 off at partner cafés and the Sumida river cruise.', timeout: 2400 });
}

/* ─────────── Views, dock, keys ─────────── */
function switchView(v) {
  $$('.tab').forEach(b => b.classList.toggle('on', b.dataset.view === v));
  $$('.view').forEach(n => n.classList.toggle('on', n.id === 'view-' + v));
  if (v === 'feed') renderFeed();
}

function bindGlobal() {
  $$('.tab').forEach(b => b.onclick = () => switchView(b.dataset.view));
  $('#ffBtn').onclick = jumpTime;
  $('#langBtn').onclick = openSplash;
  $('#foodClose').onclick = () => closeDrawer('#foodDrawer');
  $('#disClose').onclick = () => closeDrawer('#disPanel');
  $('#rebookBtn').onclick = rebook;
  bindSeg('#slotSeg', v => { S.slot = v; });
  $$('#payOpts button').forEach(b => b.onclick = () => { S.pay = b.dataset.v; $$('#payOpts button').forEach(x => x.classList.toggle('on', x === b)); });
  $('#pMinus').onclick = () => { S.party = Math.max(1, S.party - 1); $('#party').textContent = S.party; };
  $('#pPlus').onclick = () => { S.party = Math.min(8, S.party + 1); $('#party').textContent = S.party; };
  $('#bookCancel').onclick = () => { $('#bookModal').hidden = true; };
  $('#bookConfirm').onclick = confirmBooking;
  $('#postBtn').onclick = post;
  $('#envelope').onclick = crackEnvelope;
  $('#envSave').onclick = saveCoupon;
  $('#dockReset').onclick = () => location.reload();
  $('#dockAuto').onclick = () => Presenter.autoplay();
  addEventListener('resize', () => { updatePill(); TokyoMap.refit?.(); });

  addEventListener('keydown', e => {
    if (Presenter.click) return; // index_click.html: the presenter owns the keyboard
    if (e.target.matches('input, textarea, select') && e.key !== 'Escape') return;
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    const k = e.key.toLowerCase();
    if (k === 'escape') {
      if (!$('#envModal').hidden && $('#envelope').classList.contains('open')) saveCoupon();
      $('#bookModal').hidden = true; closeDrawer('#foodDrawer'); closeDrawer('#disPanel'); closePicker(); return;
    }
    if ($('#app').hidden && k !== 'r' && k !== 'a') return;
    if (k === 'r') location.reload();
    else if (k === 't') jumpTime();
    else if (k === '1') setMode('leisure');
    else if (k === '2') setMode('business');
    else if (k === '3') setMode('study');
    else if (k === 'i') switchView('itin');
    else if (k === 'f') switchView('feed');
    else if (k === 'a') Presenter.autoplay();
  });
}

/* ─────────── Boot ─────────── */
hydrate();
initSplash();
initForm();
bindGlobal();
applyI18n();
