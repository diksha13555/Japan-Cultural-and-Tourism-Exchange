/* Trip DNA prototype · the scripted demo, driven by a lifelike mouse pointer.
   One list of BEATS powers both drivers:
   - index.html: Autoplay (A key or the dock) runs every beat on its own.
   - index_click.html (→ index.html#click): each →, PageDown, Space, Enter or swipe runs the next beat.
     ← / PageUp replays to the previous beat behind the shoji doors. R starts over. */

const Presenter = (() => {
  const click = location.hash === '#click';
  const KEY = 'tdna-beat';
  const ptr = $('#fakePointer');
  const speed = () => window.TD_SPEED || 1;
  const wait = ms => new Promise(r => setTimeout(r, ms * speed()));
  const frame = () => new Promise(r => requestAnimationFrame(r));
  let x = innerWidth * .64, y = innerHeight * .8, idx = 0, running = false, queue = 0, autoOn = false, hovered = null;

  /* ─────────── Pointer ─────────── */
  function place() { ptr.style.transform = `translate(${x}px, ${y}px)`; }
  function show(on) { ptr.classList.toggle('on', on); }

  function hover(el) {
    unhover();
    hovered = el;
    for (let n = el; n && n !== document.body; n = n.parentElement) n.classList.add('fake-hover');
    ptr.classList.toggle('hand', !!el.closest('button, a, input[type=range], [role=button]'));
  }
  function unhover() {
    $$('.fake-hover').forEach(n => n.classList.remove('fake-hover'));
    hovered = null;
    ptr.classList.remove('hand');
  }

  /* Curved, eased path like a real hand on a trackpad: a quadratic arc with a small random bend. */
  async function glide(tx, ty) {
    unhover();
    const sx = x, sy = y, d = Math.hypot(tx - sx, ty - sy);
    const dur = Math.min(950, 280 + d * .5) * speed();
    if (dur < 20) { x = tx; y = ty; place(); return; }
    const bend = Math.min(70, d * .14) * (Math.random() < .5 ? 1 : -1);
    const cx = (sx + tx) / 2 - (ty - sy) / (d || 1) * bend, cy = (sy + ty) / 2 + (tx - sx) / (d || 1) * bend;
    const t0 = performance.now();
    await new Promise(done => {
      const step = now => {
        const t = Math.min(1, (now - t0) / dur), e = t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2, u = 1 - e;
        x = u * u * sx + 2 * u * e * cx + e * e * tx; y = u * u * sy + 2 * u * e * cy + e * e * ty; place();
        t < 1 ? requestAnimationFrame(step) : done();
      };
      requestAnimationFrame(step);
    });
  }

  function ripple() {
    if (speed() < 1) return;
    const r = document.createElement('span'); r.className = 'click-ripple';
    r.style.left = x + 'px'; r.style.top = y + 'px';
    document.body.appendChild(r); setTimeout(() => r.remove(), 600);
  }

  /* ─────────── Finding and reaching targets ─────────── */
  function usable(el) {
    if (!el || !el.isConnected || el.disabled || el.closest('[hidden], [inert], .leaving')) return false;
    const r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0;
  }
  async function find(sel, ms = 9000) {
    const t0 = performance.now();
    while (performance.now() - t0 < ms) {
      const el = $(sel);
      if (usable(el) && !S.busy) return el; // a click while the app is busy would be silently ignored
      await new Promise(r => setTimeout(r, speed() < 1 ? 8 : 40));
    }
    throw new Error('Presenter could not find ' + sel);
  }
  // Wait until the element stops moving (drawers sliding, cards animating in).
  async function settle(el) {
    if (speed() < 1) return el.getBoundingClientRect(); // replay runs with animations off, nothing is moving
    let prev = el.getBoundingClientRect();
    for (let i = 0; i < 45; i++) {
      await frame();
      const r = el.getBoundingClientRect();
      if (Math.abs(r.left - prev.left) < .5 && Math.abs(r.top - prev.top) < .5) return r;
      prev = r;
    }
    return prev;
  }
  async function reach(el) {
    const r = el.getBoundingClientRect();
    if (r.top < 70 || r.bottom > innerHeight - 10 || r.left < 0 || r.right > innerWidth) {
      el.scrollIntoView({ block: r.height > innerHeight * .6 ? 'start' : 'center', behavior: speed() < 1 ? 'auto' : 'smooth' });
      await wait(320);
    }
    return settle(el);
  }
  const aim = r => [r.left + r.width * (.42 + Math.random() * .16), r.top + r.height * (.42 + Math.random() * .16)];

  async function tap(sel, { pause = 170 } = {}) {
    const el = typeof sel === 'string' ? await find(sel) : sel;
    const r = await reach(el);
    await glide(...aim(r));
    hover(el);
    await wait(pause);
    ptr.classList.add('down'); ripple();
    await wait(95);
    ptr.classList.remove('down');
    el.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window, clientX: x, clientY: y }));
  }

  async function drag(sel, value) {
    const el = await find(sel), r = await reach(el);
    const min = +el.min, max = +el.max, stepV = +el.step || 1;
    const at = v => r.left + 9 + (r.width - 18) * (v - min) / (max - min), cy = r.top + r.height / 2;
    await glide(at(+el.value), cy);
    hover(el);
    await wait(160);
    ptr.classList.add('down');
    const from = +el.value, n = 22;
    for (let i = 1; i <= n; i++) {
      const raw = from + (value - from) * (1 - Math.pow(1 - i / n, 2));
      x = at(raw); place();
      el.value = Math.round(raw / stepV) * stepV;
      el.dispatchEvent(new Event('input', { bubbles: true }));
      await wait(26);
    }
    ptr.classList.remove('down');
  }

  /* ─────────── The script (SPEC.md §2) ─────────── */
  const answered = k => () => k in S.answers || S.woven;
  const BEATS = [
    { name: 'Choose English', skip: () => $('#splash').hidden, run: () => tap('.lang-tile[data-lang="en"]'), pause: 1300 },
    { name: 'Arriving by air', skip: answered('arrival'), run: () => tap('.wz-q .wz-opt[data-v="airport"]') },
    { name: 'Land at Haneda T3', skip: answered('landing'), run: () => tap('.wz-q .wz-opt[data-v="Haneda Airport T3 (HND)"]') },
    { name: 'Land at 08:20', skip: answered('time'), run: () => tap('.wz-q .wz-opt[data-v="08:20"]') },
    { name: 'Open the map', skip: () => S.locked || S.woven, run: () => tap('#pickBtn'), pause: 1300 },
    { name: 'Choose Shibuya Sky', skip: () => S.locked || S.woven, run: () => tap('#suggest button[data-id="shibuyasky"]') },
    { name: 'Lock it for 14:00', skip: () => S.locked || S.woven, run: () => tap('#lockBtn'), pause: 1300 },
    { name: 'Pick interests', skip: answered('interests'), run: async () => {
        for (const v of ['Culture', 'Food', 'Markets']) await tap(`.wz-q .wz-opt[data-v="${v}"]`, { pause: 90 });
        await tap('.wz-q .wz-next');
      } },
    { name: 'Balanced pace', skip: answered('pace'), run: () => tap('.wz-q .wz-opt[data-v="balanced"]') },
    { name: 'Set the budget', skip: answered('budget'), run: async () => { await drag('#wzBudget', 20000); await tap('.wz-q .wz-next'); } },
    { name: 'No food preference', skip: answered('diet'), run: () => tap('.wz-q .wz-opt[data-v="No preference"]') },
    { name: 'Here for leisure', skip: answered('why'), run: () => tap('.wz-q .wz-opt[data-v="leisure"]') },
    { name: 'Weave the day', skip: () => S.woven, run: () => tap('#weaveBtn'), pause: 3600 },
    { name: 'Choose lunch', skip: () => !!S.lunch, run: () => tap('#lunchBtn') },
    { name: 'Ramen', skip: () => !!S.lunch, run: () => tap('.cuisine[data-c="ramen"]') },
    { name: 'Add Menya Kaminari', skip: () => !!S.lunch, run: () => tap('#foodGrid .food-card:first-child .btn') },
    { name: 'Confirm booking', skip: () => !!S.lunch, run: () => tap('#bookConfirm'), pause: 1800 },
    { name: 'Jump to 18:34', skip: () => !!S.rebooked, run: () => tap('#ffBtn'), pause: 1200 },
    { name: 'Show options', skip: () => !!S.rebooked, run: () => tap('#toasts .toast.alert .acts button') },
    { name: 'Next Romancecar', skip: () => !!S.rebooked, run: () => tap('.g-row[data-id="A"]') },
    { name: 'Rebook', skip: () => !!S.rebooked, run: () => tap('#rebookBtn'), pause: 1600 },
    { name: 'Business mode', run: () => tap('#modeSwitch [data-mode="business"]'), pause: 1800 },
    { name: 'Study mode', run: () => tap('#modeSwitch [data-mode="study"]'), pause: 1800 },
    { name: 'Back to leisure', run: () => tap('#modeSwitch [data-mode="leisure"]'), pause: 1200 },
    { name: 'Open Tabi Feed', run: () => tap('.tab[data-view="feed"]') },
    { name: 'Post', skip: () => S.posted, run: async () => { await tap('#postBtn'); await find('#envelope'); }, pause: 1100 },
    { name: 'Open the otoshidama', skip: () => S.coupons.length > 1, run: () => tap('#envelope'), pause: 1300 },
    { name: 'Save the coupon', skip: () => S.coupons.length > 1, run: () => tap('#envSave') },
    { name: 'Like a post', run: () => tap('#posts .post:nth-child(2) [data-act="like"]') },
    { name: 'Connect with a local', run: () => tap('#locals li:first-child .connect') }
  ];

  function bar() { $('#beatBar i').style.width = (idx / BEATS.length * 100) + '%'; }

  async function runBeat(i) {
    const b = BEATS[i];
    if (!b.skip?.()) await b.run();
    idx = i + 1; bar();
  }

  /* ─────────── Driver 1: Autoplay ─────────── */
  async function autoplay() {
    if (autoOn) { autoOn = false; return; }
    autoOn = true; $('#dockAuto').classList.add('on'); show(true); place();
    try {
      while (autoOn && idx < BEATS.length) {
        const b = BEATS[idx], skipped = !!b.skip?.();
        try { await runBeat(idx); } catch (e) { console.warn(e.message); idx++; }
        if (!skipped) await wait(b.pause ?? 650);
      }
    } finally { autoOn = false; $('#dockAuto').classList.remove('on'); unhover(); setTimeout(() => show(false), 900); }
  }

  /* ─────────── Driver 2: click mode ─────────── */
  async function pump() {
    if (running) return;
    running = true;
    try {
      while (queue > 0 && idx < BEATS.length) {
        queue--;
        try { await runBeat(idx); } catch (e) { console.warn(e.message); idx++; queue = 0; bar(); }
      }
    } finally { running = false; queue = 0; }
  }
  function next() { if (idx + queue < BEATS.length) { queue++; pump(); } }
  function back() {
    const target = Math.max(0, running ? idx : idx - 1);
    try { sessionStorage.setItem(KEY, String(target)); } catch (e) { return; }
    location.reload();
  }
  function restart() { try { sessionStorage.removeItem(KEY); } catch (e) {} location.reload(); }

  /* Back = reload, then replay beats 1…n at ~50× speed with the shoji doors shut and animations off. */
  async function replay(n) {
    const doors = $('#shoji');
    doors.classList.add('close', 'instant');
    document.documentElement.classList.add('instant');
    window.TD_SPEED = .02; window.TD_REPLAY = true;
    try { for (let i = 0; i < n; i++) await runBeat(i); }
    catch (e) { console.warn(e.message); }
    window.TD_SPEED = 1; window.TD_REPLAY = false;
    unhover();
    $$('#toasts .toast:not(.alert)').forEach(t => t.remove());
    await frame(); await frame();
    document.documentElement.classList.remove('instant');
    doors.classList.remove('instant');
    await wait(120);
    doors.classList.remove('close');
  }

  function initClickMode() {
    document.documentElement.classList.add('click-mode');
    place(); show(true);
    addEventListener('keydown', e => {
      const k = e.key;
      if (['ArrowRight', 'ArrowDown', 'PageDown', ' ', 'Enter'].includes(k)) { e.preventDefault(); e.stopPropagation(); next(); }
      else if (['ArrowLeft', 'ArrowUp', 'PageUp', 'Backspace'].includes(k)) { e.preventDefault(); e.stopPropagation(); back(); }
      else if (k === 'r' || k === 'R') { e.preventDefault(); restart(); }
      else if (k === 'Escape') { e.preventDefault(); }
    }, true);
    // Touchscreen swipe
    let tx = null, ty = null;
    addEventListener('touchstart', e => { tx = e.touches[0].clientX; ty = e.touches[0].clientY; }, { passive: true });
    addEventListener('touchend', e => {
      if (tx == null) return;
      const dx = e.changedTouches[0].clientX - tx, dy = e.changedTouches[0].clientY - ty; tx = null;
      if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) dx < 0 ? next() : back();
    }, { passive: true });
    // Two-finger trackpad swipe (horizontal wheel)
    let acc = 0, quietUntil = 0, reset = 0;
    addEventListener('wheel', e => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      const now = performance.now();
      if (now < quietUntil) return;
      clearTimeout(reset); reset = setTimeout(() => { acc = 0; }, 220);
      acc += e.deltaX;
      if (Math.abs(acc) > 90) { acc > 0 ? next() : back(); acc = 0; quietUntil = now + 800; }
    }, { passive: false });
    let target = null;
    try { const v = sessionStorage.getItem(KEY); sessionStorage.removeItem(KEY); target = v == null ? null : +v; } catch (e) {}
    if (target > 0) replay(target);
    bar();
  }

  if (click) initClickMode();
  return { click, autoplay, next, back, restart, beats: BEATS, get index() { return idx; } };
})();
