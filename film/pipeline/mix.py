"""Mix voice + music + ambience + SFX into one master track, and write the film timeline.

Reads  : script.json, voice/<scene>_<n>.wav (from gen_voice_edge.py or gen_voice_gemini.py), music/*.mp3
Writes : out/master.mp3, out/timeline.json
Run    : python mix.py            (uses ./voice)
         python mix.py voice_gemini
"""
import asyncio, json, os, subprocess, sys
import numpy as np
from scipy import signal

sys.stdout.reconfigure(encoding="utf-8")
HERE = os.path.dirname(os.path.abspath(__file__))
SR = 48000
VOICE_DIR = os.path.join(HERE, sys.argv[1] if len(sys.argv) > 1 else "voice")
OUT = os.path.join(HERE, "out")
SFX = os.path.join(HERE, "sfx")
rng = np.random.default_rng(7)

MUSIC_SAD = ("Ishikari Lore.mp3", 0.0)     # (file, start offset in the track)
MUSIC_HAPPY = ("Kawai Kitsune.mp3", 0.0)
CREDIT = "Music: “Ishikari Lore” & “Kawai Kitsune” by Kevin MacLeod (incompetech.com) · CC BY 4.0"


# ---------- helpers ----------
def load(path, sr=SR, ch=1):
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", path, "-ac", str(ch), "-ar", str(sr), "-f", "f32le", "-"],
                         capture_output=True, check=True).stdout
    x = np.frombuffer(raw, np.float32).copy()
    return x.reshape(-1, ch) if ch > 1 else x


def db(x):
    return 10 ** (x / 20)


def trim(x, thr=-46):
    env = np.abs(x) > db(thr)
    idx = np.flatnonzero(env)
    if not len(idx):
        return x
    a, b = max(idx[0] - int(.02 * SR), 0), min(idx[-1] + int(.08 * SR), len(x))
    y = x[a:b].copy()
    f = int(.012 * SR)
    y[:f] *= np.linspace(0, 1, f)
    y[-f:] *= np.linspace(1, 0, f)
    return y


def bp(x, lo, hi, order=4):
    sos = signal.butter(order, [lo, hi], "bandpass", fs=SR, output="sos")
    return signal.sosfilt(sos, x, axis=0)


def hp(x, f, order=2):
    return signal.sosfilt(signal.butter(order, f, "highpass", fs=SR, output="sos"), x, axis=0)


def lp(x, f, order=2):
    return signal.sosfilt(signal.butter(order, f, "lowpass", fs=SR, output="sos"), x, axis=0)


def ir(seconds, decay, bright=6000, predelay=0.012):
    """Synthetic stereo hall impulse response: decorrelated noise with an exponential tail."""
    n = int(seconds * SR)
    t = np.arange(n) / SR
    out = np.zeros((n + int(predelay * SR), 2))
    for c in range(2):
        noise = rng.standard_normal(n) * np.exp(-t * 6.9 / decay)
        noise = lp(noise, bright)
        out[int(predelay * SR):, c] = noise
    return out / np.sqrt((out ** 2).sum() / 2)


IR_ROOM = ir(0.6, 0.35, 7000)
IR_HALL = ir(3.2, 2.6, 4500, 0.03)
IR_SOFT = ir(2.2, 1.6, 6000, 0.02)


def verb(mono, impulse, wet):
    w = np.stack([signal.fftconvolve(mono, impulse[:, c])[:len(mono) + len(impulse) - 1] for c in range(2)], 1)
    dry = np.zeros_like(w)
    dry[:len(mono)] = mono[:, None]
    return dry * (1 - wet) + w * wet


def pan(st, p):  # p in [-1, 1]
    return st * np.array([np.sqrt((1 - p) / 2), np.sqrt((1 + p) / 2)]) * np.sqrt(2)


def comp(x, thr=-20, ratio=3.0):
    env = np.abs(x)
    env = signal.lfilter([1 - np.exp(-1 / (.008 * SR))], [1, -np.exp(-1 / (.008 * SR))], env)
    level = 20 * np.log10(env + 1e-9)
    over = np.maximum(level - thr, 0)
    return x * db(-over * (1 - 1 / ratio))


class Bus:
    def __init__(self, seconds):
        self.x = np.zeros((int(seconds * SR) + SR, 2))

    def add(self, st, t, gain=1.0):
        if st.ndim == 1:
            st = np.stack([st, st], 1)
        a = int(t * SR)
        if a < 0:
            st, a = st[-a:], 0
        b = min(a + len(st), len(self.x))
        if b > a:
            self.x[a:b] += st[:b - a] * gain


# ---------- synthesized SFX ----------
def tone(f, dur, amp=1.0, attack=.004, decay=None):
    t = np.arange(int(dur * SR)) / SR
    env = np.minimum(t / attack, 1) * np.exp(-t / (decay or dur / 4))
    return amp * np.sin(2 * np.pi * f * t) * env


def bell(f, dur=3.0, amp=.3):
    return sum(tone(f * r, dur, amp * a, decay=dur / (2.5 * r ** .5)) for r, a in [(1, 1), (2.0, .45), (2.76, .25), (5.4, .1)])


def pa_chime():  # the classic two-tone station chime
    x = np.zeros(int(2.4 * SR))
    for i, f in enumerate([659.3, 523.3, 587.3, 392.0]):
        b = bell(f, 1.6, .22)
        x[int(i * .32 * SR):int(i * .32 * SR) + len(b)] += b[:len(x) - int(i * .32 * SR)]
    return x


def sparkle(n=9, base=1046.5, step=.07, amp=.12):  # rising pentatonic glints for the colour moments
    scale = [0, 2, 4, 7, 9]
    x = np.zeros(int((n * step + 2.5) * SR))
    for k in range(n):
        f = base * 2 ** ((12 * (k // 5) + scale[k % 5]) / 12)
        b = bell(f, 1.8, amp * (0.6 + 0.4 * k / n))
        a = int(k * step * SR)
        x[a:a + len(b)] += b
    return x


def sting():  # low dissonant hit for the delay shock
    t = np.arange(int(1.6 * SR)) / SR
    x = sum(np.sin(2 * np.pi * f * t) for f in (73.4, 77.8, 146.8, 155.6)) * np.exp(-t / .45) * .18
    noise = lp(rng.standard_normal(len(t)), 900) * np.exp(-t / .12) * .25
    return x + noise


def pop():  # earbud click-in
    t = np.arange(int(.12 * SR)) / SR
    return (np.sin(2 * np.pi * 180 * t * (1 - t * 3)) * np.exp(-t / .02) * .5 +
            hp(rng.standard_normal(len(t)), 3000) * np.exp(-t / .004) * .25)


def whoosh(dur=1.1, amp=.18):
    t = np.arange(int(dur * SR)) / SR
    env = np.sin(np.pi * t / dur) ** 2
    n = rng.standard_normal(len(t))
    lo = lp(n, 1800) * env * amp
    return np.stack([lo * np.linspace(1.2, .4, len(t)), lo * np.linspace(.4, 1.2, len(t))], 1)


def chimes(dur=8.0, amp=.06):  # furin wind chimes for the festival
    x = np.zeros(int(dur * SR))
    for _ in range(14):
        a = int(rng.uniform(0, dur - 2) * SR)
        b = bell(rng.choice([2093, 2349.3, 2637, 3136, 3520]), 2.0, amp * rng.uniform(.5, 1))
        x[a:a + len(b)] += b[:len(x) - a]
    return x


# ---------- crowd babble (station ambience) from Japanese neural voices ----------
BABBLE = ["すみません、ちょっと通ります。", "えっと、山手線はどっちだっけ？", "今日めっちゃ混んでるね。", "お弁当買っていこうか。",
          "はい、もしもし、今駅に着きました。", "次の電車何分？", "出口は東口のほうです。", "ありがとうございました。",
          "あ、こっちこっち！", "新幹線、間に合うかな。"]
BABBLE_V = ["ja-JP-NanamiNeural", "ja-JP-KeitaNeural"]


def crowd(seconds):
    os.makedirs(SFX, exist_ok=True)
    clips = []
    for i, txt in enumerate(BABBLE):
        p = os.path.join(SFX, f"babble_{i}.wav")
        if not os.path.exists(p):
            import edge_tts
            mp3 = p[:-4] + ".mp3"
            r = f"{rng.integers(-10, 25):+d}%"
            ph = f"{rng.integers(-30, 30):+d}Hz"
            asyncio.run(edge_tts.Communicate(txt, BABBLE_V[i % 2], rate=r, pitch=ph).save(mp3))
            subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", mp3, "-ac", "1", "-ar", str(SR), p], check=True)
            os.remove(mp3)
        clips.append(trim(load(p)))
    bus = Bus(seconds)
    t = 0.0
    while t < seconds:  # ~5 overlapping talkers at any time, spread around the stereo field
        c = clips[rng.integers(len(clips))]
        st = pan(np.stack([c, c], 1) * .5, rng.uniform(-.9, .9))
        bus.add(st, t, rng.uniform(.4, 1.0))
        t += rng.uniform(.25, .7)
    x = lp(bus.x, 2600)
    x = hp(x, 160)
    wet = np.stack([signal.fftconvolve(x[:, c], IR_HALL[:, c])[:len(x)] for c in range(2)], 1)
    footsteps = np.zeros(len(x))
    for k in np.arange(0, seconds, .21):
        a = int((k + rng.uniform(-.06, .06)) * SR)
        if 0 <= a < len(x) - 2000:
            footsteps[a:a + 2000] += hp(rng.standard_normal(2000), 1500) * np.exp(-np.arange(2000) / 180) * rng.uniform(.02, .08)
    return x * .45 + wet * .55 + np.stack([footsteps, footsteps], 1) * .6


# ---------- voice processing ----------
def girl_fx(x):
    x = hp(x, 110)
    x = comp(x, -22, 2.5)
    return verb(x, IR_ROOM, .14)


def app_fx(x):  # through earphones: slightly narrow, intimate, gentle shimmer
    x = bp(x, 180, 7500, 2)
    x = comp(x, -24, 3)
    st = verb(x, IR_SOFT, .18)
    return st * .92


def pa_fx(x):  # station PA: band-limited, a bit of grit, big hall
    x = bp(x, 350, 3600, 4)
    x = np.tanh(x * 2.2) / 2.2
    return verb(x, IR_HALL, .55)


FX = {"girl": girl_fx, "app": app_fx, "pa": pa_fx}


def envelope(points, n):
    """points: [(t, value), ...] -> per-sample curve with smoothstep easing between points."""
    t = np.arange(n) / SR
    pts = sorted(points)
    out = np.full(n, pts[0][1], float)
    for (t0, v0), (t1, v1) in zip(pts, pts[1:]):
        m = (t >= t0) & (t < t1)
        u = (t[m] - t0) / max(t1 - t0, 1e-6)
        out[m] = v0 + (v1 - v0) * (u * u * (3 - 2 * u))
    out[t >= pts[-1][0]] = pts[-1][1]
    return out


# ---------- main ----------
def main():
    spec = json.load(open(os.path.join(HERE, "script.json"), encoding="utf-8"))
    os.makedirs(OUT, exist_ok=True)

    # 1) lay out scenes from the real voice durations
    t, scenes, placed = 0.0, [], []
    for s in spec["scenes"]:
        cursor, last_end, lines = 0.0, 0.0, []
        for n, ln in enumerate(s["lines"]):
            v = trim(load(os.path.join(VOICE_DIR, f"{s['id']}_{n}.wav")))
            at = (last_end + ln["after"]) if "after" in ln else ln["at"]
            end = at + len(v) / SR
            lines.append({**ln, "key": f"{s['id']}_{n}", "start": round(t + at, 3), "end": round(t + end, 3), "_v": v})
            last_end = max(last_end, end)
        tail = 1.3 if s["lines"] else 0
        dur = max(s["min"], last_end + tail)
        scenes.append({k: v for k, v in s.items() if k != "lines"} | {"start": round(t, 3), "end": round(t + dur, 3)})
        placed += lines
        t += dur
    total = t
    S = {s["id"]: s for s in scenes}
    print(f"film length {total:.2f}s")
    for s in scenes:
        print(f"  {s['id']:9s} {s['start']:6.2f} → {s['end']:6.2f}")

    n = int(total * SR) + SR
    voice, sfx, amb = Bus(total), Bus(total), Bus(total)

    # 2) voices
    for ln in placed:
        kind = "pa" if ln.get("fx") == "pa" else ("app" if ln["who"] == "app" else "girl")
        st = FX[kind](ln["_v"])
        g = {"girl": db(0), "app": db(-2.5), "pa": db(-13)}[kind]
        if kind == "pa":
            st = pan(st, -.35)
            sfx.add(pan(verb(pa_chime(), IR_HALL, .5), -.35), ln["start"] - 1.25, db(-16))
        voice.add(st, ln["start"], g)

    # 3) ambience: station crowd, loud in the grey world, fading away as she finds the app
    a0, a1 = S["app"]["start"], S["language"]["start"] + 2
    crowd_x = crowd(a1 + 1)
    cenv = envelope([(0, 0), (1.2, db(-11)), (S["delay"]["start"], db(-9)), (S["delay"]["start"] + 1, db(-7)),
                     (a0, db(-9)), (a1, 0)], len(crowd_x))
    amb.add(crowd_x * cenv[:, None], 0)

    # 4) SFX on the story beats
    sfx.add(sting(), S["delay"]["start"] + 0.95, db(-6))
    sfx.add(verb(sparkle(), IR_SOFT, .45), a0 + 0.15, db(-7))                  # colour bursts from the phone
    sfx.add(whoosh(1.3), S["language"]["start"] - 0.6, db(-8))
    for ln in placed:
        if ln["who"] == "app":
            sfx.add(pop(), ln["start"] - 0.28, db(-10))
    sfx.add(verb(sparkle(7, 1318.5, .06, .1), IR_SOFT, .45), S["route"]["start"] + 0.05, db(-11))
    sfx.add(whoosh(1.3), S["route"]["start"] - 0.6, db(-10))
    sfx.add(whoosh(1.6, .22), S["festival"]["start"] - 0.8, db(-8))
    sfx.add(verb(sparkle(12, 1046.5, .05, .12), IR_SOFT, .5), S["festival"]["start"] + 0.05, db(-8))
    sfx.add(verb(chimes(S["festival"]["end"] - S["festival"]["start"]), IR_SOFT, .4), S["festival"]["start"] + 1, db(-12))
    sfx.add(verb(bell(523.3, 5, .25) + bell(784, 5, .15), IR_HALL, .5), S["title"]["start"] + .1, db(-10))

    # 5) music: melancholy until the app, then the bright track filling in like the colour
    sad = load(os.path.join(HERE, "music", MUSIC_SAD[0]), ch=2)[int(MUSIC_SAD[1] * SR):]
    sad = sad[:int((a0 + 3) * SR)]
    senv = envelope([(0, 0), (1.5, db(-3)), (S["delay"]["start"], db(-3)), (S["delay"]["start"] + 1, db(-8)),
                     (a0 - .3, db(-10)), (a0 + 1.8, 0)], len(sad))
    happy_start = a0 + 0.2
    happy = load(os.path.join(HERE, "music", MUSIC_HAPPY[0]), ch=2)[int(MUSIC_HAPPY[1] * SR):]
    happy = happy[:int((total - happy_start + .5) * SR)]
    # colour level of the picture, mirrored as music openness (0 = muffled & quiet, 1 = full & bright)
    lvl_pts = [(0, 0)]
    for s in scenes:
        if s["id"] in ("app", "language", "route", "festival"):
            lvl_pts += [(s["start"] - happy_start, s["colour"][0]), (s["end"] - happy_start, s["colour"][1])]
    lvl = np.clip(envelope([(max(a, 0), b) for a, b in lvl_pts], len(happy)), 0, 1)
    muff = lp(happy, 900, 2)
    open_mix = np.clip(lvl * 1.25, 0, 1)[:, None]
    happy = muff * (1 - open_mix) + happy * open_mix
    hg = envelope([(0, 0), (1.2, db(-9)), (S["route"]["start"] - happy_start, db(-3)),
                   (S["festival"]["start"] - happy_start, db(0)),
                   (total - happy_start - 3.2, db(0)), (total - happy_start, 0)], len(happy))
    happy *= hg[:, None]

    music = Bus(total)
    music.add(sad, 0, db(-4))
    music.add(happy, happy_start, db(-4))

    # 6) duck music + ambience under the dialogue
    vlev = np.abs(voice.x).max(1)
    att, rel = np.exp(-1 / (.03 * SR)), np.exp(-1 / (.45 * SR))
    env = np.zeros_like(vlev)
    e = 0.0
    for i in range(0, len(vlev), 64):  # block-rate envelope follower, then upsample
        blk = vlev[i:i + 64].max()
        e = blk + (e - blk) * (att ** 64 if blk > e else rel ** 64)
        env[i:i + 64] = e
    duck = db(-7 * np.clip(env / .08, 0, 1))[:, None]

    # the tagline is the money line: the music nearly drops out under it, then swells into the end card
    for ln in placed:
        if ln.get("tagline"):
            pts = [(0, 1), (ln["start"] - .5, 1), (ln["start"] - .05, db(-16)), (ln["end"] + .1, db(-16)), (ln["end"] + 1.2, 1)]
            duck = duck * envelope(pts, len(duck))[:, None]
    mix = voice.x * db(0) + (music.x + amb.x) * duck + sfx.x
    # gentle master: soft-knee limiter to -1 dBFS, loudness to ~-15 LUFS-ish (RMS proxy)
    rms = np.sqrt(np.mean(mix[: int(total * SR)] ** 2))
    mix *= db(-17) / (rms + 1e-9)
    peak = db(-1.5)
    mix = np.where(np.abs(mix) > peak * .8, np.sign(mix) * (peak * .8 + (peak * .2) * np.tanh((np.abs(mix) - peak * .8) / (peak * .2))), mix)
    mix = mix[: int((total + .2) * SR)]
    tail = int(1.2 * SR)
    mix[-tail:] *= np.linspace(1, 0, tail)[:, None]

    wav = os.path.join(OUT, "master.wav")
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-f", "f32le", "-ar", str(SR), "-ac", "2", "-i", "-",
                    wav], input=mix.astype(np.float32).tobytes(), check=True)
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", wav, "-c:a", "libmp3lame", "-b:a", "128k",
                    os.path.join(OUT, "master.mp3")], check=True)

    tl = {"duration": round(total, 3), "credit": CREDIT, "scenes": scenes,
          "lines": [{k: v for k, v in ln.items() if not k.startswith("_")} for ln in placed]}
    json.dump(tl, open(os.path.join(OUT, "timeline.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print("wrote out/master.mp3 and out/timeline.json")


if __name__ == "__main__":
    main()
