const bpm = 156;
const beat = 60 / bpm;
const barSec = beat * 4;
const swing = 0.61;

const lyricsText = `夜分に失礼します。

わたくし、
本日付で
影を一枚、
紛失いたしました。

場所はおそらく、
三番ホームと、
昨日の夕飯のあいだです。

拾われた方は、
どうか踏まないでください。
まだ、
少しだけ温かいはずですので。

ピリカ　ピリカラ　シツレイシマス
ナナメノマドカラ　オジャマシマス
トケイノナカデ　オチャヲノミマス
サトウハ　ヒトツデ　ケッコウデス

その晩、
郵便配達の方が
玄関ではなく、
わたくしの胸を
三回ノックしました。

「お届け物です」

そう言って差し出されたのは、
小さな町でした。

箱庭ではありません。
本物の町です。

信号も、
病院も、
泣いているクリーニング屋も、
すべて入っておりました。

わたくしは困りました。

置き場所が
ありませんでしたので。

仕方なく、
口の中に入れました。

すると、
舌の上で
市長選挙が始まりました。

候補者は三名。

「忘れたい記憶」様。
「まだ言っていない謝罪」様。
それから、
「誰ですかあなた」様。

みなさま、
たいへん立派な演説でした。

特に、
誰ですかあなた様は、
何も言わないまま
拍手だけを集めておられました。

わかります。
わかりません。
わかる気がいたします。

この順番で、
朝まで繰り返しております。

奥へ。なお奥へ。
下へ。なお下へ。
礼儀正しく、
壊れていきます。

「ご安心ください」
と、鏡が申しました。

「あなたはまだ、
完全には
あなたではありません」

ありがとうございます。

大変、
助かりません。

その後、
わたくしは
204個のため息を分類し、
37本の歯ブラシに名前をつけ、
冷蔵庫の奥に住む
小さな冬へ
退去勧告を出しました。

しかし冬は、
首を横に振りました。

「契約書があります」

見せていただくと、
そこには確かに、
わたくしの筆跡で
こう書いてありました。

「さびしさ様、
永年無料」

……ああ。

また、
わたくしですか。

ピリカ　ピリカラ　モウシワケ
マブタノウラニ　オハイリクダサイ
ココハ　ヒジョウニ　セマイデス
デモ　ナゼカ　ミナサマ　オスキデス

朝になりました。

窓の外で、
知らない子どもが
わたくしの名前を
逆から読んでいました。

やめてください、
と申し上げました。

すると子どもは
にっこり笑って、
こう言いました。

「では、
表から読みます」

それはもっと困ります。

名前というものは、
正面から呼ばれると
逃げ場がなくなりますので。

手。

手を見ました。

五本ありました。
いつも通りでした。

しかし、
そのうち一本だけが
わたくしに敬語を使っておりました。

「そろそろ、
お別れの時間でございます」

何と、
指に言われるとは
思いませんでした。

わたくしは、
たいへん落ち着いて、
その場で
少しだけ崩れました。

崩れ方にも、
作法があります。

まず、笑います。
次に、謝ります。
最後に、
何もなかった顔で
靴をそろえます。

上へ。なお上へ。
空へ。なお空へ。
天井のさらに上の、
予約席へ。

本日は
お集まりいただき、
誠にありがとうございました。

わたくしの欠席は、
わたくしが責任を持って
出席いたします。

ですので、
どうかみなさま。

拍手は、
まだしないでください。

まだ、
終わりの準備が
整っておりません。

ピリカ　ピリカラ
シツレイシマス。

それでは、
もう一度だけ
始めます。`;

const chords = {
  Cm9: { root: 36, tones: [48, 51, 55, 58, 62, 67] },
  AbMaj9: { root: 32, tones: [44, 48, 51, 55, 58, 63] },
  Eb6: { root: 39, tones: [51, 55, 58, 60, 65, 70] },
  BbAdd: { root: 34, tones: [46, 50, 53, 58, 60, 65] },
  Fm11: { root: 41, tones: [53, 56, 60, 63, 67, 70] },
  DbMaj7: { root: 37, tones: [49, 53, 56, 60, 65, 68] },
  GAlt: { root: 43, tones: [55, 59, 62, 65, 68, 73] },
  COpen: { root: 36, tones: [48, 55, 60, 62, 67, 74] },
  AFlatGhost: { root: 44, tones: [56, 60, 63, 67, 70, 75] },
  DHalf: { root: 38, tones: [50, 53, 56, 60, 65] }
};

const genreCycle = [
  "Cm9", "AbMaj9", "Eb6", "BbAdd",
  "Fm11", "DbMaj7", "GAlt", "COpen",
  "Cm9", "AFlatGhost", "Eb6", "BbAdd",
  "DHalf", "GAlt", "AbMaj9", "COpen"
];

function midiToFreq(note) {
  return 440 * Math.pow(2, (note - 69) / 12);
}

function buildNotes() {
  const notes = [];
  const cycles = 9;
  const bassCells = [
    [0, 7, 10, 12, 10, 7, 3, -2],
    [0, 0, 5, 7, 12, 10, 7, 5],
    [0, 3, 7, 10, 12, 15, 12, 7],
    [0, -2, 3, 7, 10, 7, 5, 3]
  ];
  const topline = [72, 75, 79, 77, 75, 72, 70, 67, 70, 72, 75, 82, 80, 77, 75, 72];
  const hornShape = [0, 7, 10, 14, 12, 10, 7, 3];
  const at = (bar, sixteenth) => {
    const step = beat / 4;
    const off = sixteenth % 4 === 1 || sixteenth % 4 === 3 ? step * (swing - 0.5) : 0;
    return bar * barSec + sixteenth * step + off;
  };

  for (let cycle = 0; cycle < cycles; cycle += 1) {
    for (let bar = 0; bar < genreCycle.length; bar += 1) {
      const songBar = cycle * genreCycle.length + bar;
      const chord = chords[genreCycle[bar]];
      const nextChord = chords[genreCycle[(bar + 1) % genreCycle.length]];
      const lift = cycle > 5 ? 12 : cycle > 2 ? 5 : 0;
      const heat = 0.7 + cycle * 0.045;
      const cell = bassCells[(bar + cycle) % bassCells.length];

      [0, 4, 7, 10, 12, 15].forEach((slot, i) => {
        const pitch = chord.root + cell[i % cell.length];
        notes.push({ t: at(songBar, slot), d: beat * 0.42, pitch, part: "bass", velocity: 0.66 + heat * 0.12, wobble: 18 + cycle * 2 });
      });
      notes.push({ t: at(songBar, 15), d: beat * 0.22, pitch: nextChord.root - 1, part: "bass", velocity: 0.72, wobble: 24 });

      [0, 7, 11].forEach((slot) => notes.push({ t: at(songBar, slot), d: 0.055, pitch: 35, part: "drums", velocity: 0.78, drum: "kick" }));
      [4, 12].forEach((slot) => notes.push({ t: at(songBar, slot), d: 0.08, pitch: 38, part: "drums", velocity: 0.76, drum: "snare" }));
      [1, 3, 6, 8, 10, 14].forEach((slot) => notes.push({ t: at(songBar, slot), d: 0.045, pitch: 42, part: "drums", velocity: 0.34 + heat * 0.08, drum: "hat" }));
      for (let s = 0; s < 16; s += 2) {
        notes.push({ t: at(songBar, s), d: 0.032, pitch: 70, part: "latin", velocity: s % 4 === 0 ? 0.22 : 0.16, drum: "clave" });
      }
      if ((bar + cycle) % 4 === 3) {
        notes.push({ t: at(songBar, 15), d: 0.23, pitch: 42, part: "drums", velocity: 0.82, drum: "crash" });
      }

      [2, 6, 9, 14].forEach((slot, i) => {
        const pitch = chord.tones[(i + cycle) % chord.tones.length] + 12 + lift;
        notes.push({ t: at(songBar, slot), d: beat * 0.52, pitch, part: "organ", velocity: 0.36 + heat * 0.09, wobble: 8 });
      });

      [0.5, 4.5, 8.5, 13.5].forEach((slot, i) => {
        const pitch = chord.tones[(i + 2) % chord.tones.length] + 24 + (cycle > 6 ? 7 : 0);
        notes.push({ t: at(songBar, Math.floor(slot)) + (slot % 1) * beat / 4, d: beat * 0.62, pitch, part: "guitar", velocity: 0.28 + heat * 0.08, wobble: 18 });
      });

      if (cycle > 1 && (bar % 4 === 0 || cycle > 5)) {
        [0, 6, 11].forEach((slot, i) => {
          const pitch = chord.root + 36 + hornShape[(bar + i + cycle) % hornShape.length] + (cycle > 6 ? 7 : 0);
          notes.push({ t: at(songBar, slot), d: beat * 0.36, pitch, part: "horn", velocity: 0.46 + heat * 0.12, wobble: 12 });
        });
      }

      if (cycle > 2) {
        [3, 6, 9, 12, 15].forEach((slot, i) => {
          notes.push({ t: at(songBar, slot), d: 0.048, pitch: 76 + ((i + bar) % 5), part: "latin", velocity: 0.36 + heat * 0.08, drum: "clave" });
        });
      }

      if (cycle > 3 && (bar === 7 || bar === 15 || cycle > 6)) {
        for (let i = 0; i < 8; i += 1) {
          const pitch = topline[(i + bar + cycle) % topline.length] + (cycle > 6 ? 12 : 0);
          notes.push({ t: at(songBar, 8 + i), d: beat * 0.18, pitch, part: "guitar", velocity: 0.72, wobble: 48 });
        }
      }
    }

    const phraseBar = cycle * genreCycle.length + (cycle % 3) * 4;
    for (let i = 0; i < 12; i += 1) {
      notes.push({
        t: at(phraseBar + Math.floor(i / 6), (i % 6) * 2 + (i % 2)),
        d: beat * (i % 5 === 4 ? 0.92 : 0.46),
        pitch: topline[(i + cycle * 2) % topline.length] - 12 + (cycle > 4 ? 7 : 0),
        part: "vocal",
        velocity: 0.54 + cycle * 0.025,
        wobble: 20
      });
    }
  }
  notes.sort((a, b) => a.t - b.t);
  return notes;
}

const notes = buildNotes();
const duration = Math.max(...notes.map((note) => note.t + note.d)) + 1.2;
const lyricLines = lyricsText.split("\n");
const lineTimings = lyricLines.map((text, index) => {
  const denseIndex = lyricLines.slice(0, index + 1).filter((line) => line.trim()).length - 1;
  const denseCount = lyricLines.filter((line) => line.trim()).length;
  const t = text.trim() ? (denseIndex / Math.max(1, denseCount - 1)) * (duration - 3) : null;
  return { text, t };
});

const colors = {
  bass: "#6fb7c6",
  drums: "#f0ebe1",
  organ: "#f2d46f",
  horn: "#ffb25f",
  guitar: "#66df9b",
  vocal: "#ef8a77",
  latin: "#a38be8"
};

const lyricsEl = document.getElementById("lyrics");
const playButton = document.getElementById("playButton");
const playLabel = document.getElementById("playLabel");
const playIcon = document.querySelector(".play-icon");
const canvas = document.getElementById("visualizer");
const ctx = canvas.getContext("2d");
const progress = document.getElementById("progress");
const timeNow = document.getElementById("timeNow");
const timeTotal = document.getElementById("timeTotal");

let audioContext;
let startAt = 0;
let visualStartAt = 0;
let pausedAt = 0;
let playing = false;
let animationId = 0;
let scheduled = [];
let schedulerId = 0;
let scheduleCursor = 0;
let activeLine = -1;
let master;
let masterGain;
let noiseBuffer;

lineTimings.forEach((line, index) => {
  const p = document.createElement("p");
  p.className = "line";
  p.dataset.index = String(index);
  p.textContent = line.text || " ";
  lyricsEl.appendChild(p);
});
const lineEls = [...document.querySelectorAll(".line")];

timeTotal.textContent = formatTime(duration);

function formatTime(seconds) {
  const s = Math.max(0, Math.floor(seconds));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

function ensureAudio() {
  if (!audioContext) {
    audioContext = new AudioContext();
    master = audioContext.createDynamicsCompressor();
    masterGain = audioContext.createGain();
    masterGain.gain.value = 0.9;
    master.threshold.value = -18;
    master.knee.value = 18;
    master.ratio.value = 8;
    master.attack.value = 0.005;
    master.release.value = 0.18;
    master.connect(masterGain);
    masterGain.connect(audioContext.destination);

    noiseBuffer = audioContext.createBuffer(1, audioContext.sampleRate * 1.2, audioContext.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < data.length; i += 1) {
      data[i] = Math.random() * 2 - 1;
    }
  }
  return audioContext;
}

function scheduleNote(note, offset) {
  const ac = ensureAudio();
  const when = ac.currentTime + note.t - offset;
  if (when < ac.currentTime - 0.08) return;

  if (note.part === "drums" || note.part === "latin") {
    scheduleHit(note, when);
    return;
  }

  const osc = ac.createOscillator();
  const osc2 = ac.createOscillator();
  const gain = ac.createGain();
  const filter = ac.createBiquadFilter();
  const drive = ac.createWaveShaper();
  const lfo = ac.createOscillator();
  const lfoGain = ac.createGain();

  osc.frequency.value = midiToFreq(note.pitch);
  osc2.frequency.value = midiToFreq(note.pitch) * (note.part === "guitar" ? 1.005 : 0.997);
  osc.type = note.part === "bass" ? "sawtooth" : note.part === "organ" ? "square" : note.part === "horn" ? "sawtooth" : "triangle";
  osc2.type = note.part === "organ" ? "triangle" : note.part === "bass" ? "sine" : "sawtooth";
  filter.type = note.part === "bass" ? "lowpass" : "bandpass";
  filter.frequency.value = note.part === "bass" ? 520 : note.part === "organ" ? 980 : note.part === "guitar" ? 1450 : note.part === "horn" ? 1220 : 1750;
  filter.Q.value = note.part === "bass" ? 0.8 : 5.5;

  lfo.frequency.value = note.part === "bass" ? 5.6 : note.part === "guitar" ? 7.2 : 4.4;
  lfoGain.gain.value = note.wobble || 10;
  lfo.connect(lfoGain);
  lfoGain.connect(osc.detune);
  lfoGain.connect(osc2.detune);

  drive.curve = makeDriveCurve(note.part === "guitar" ? 70 : note.part === "bass" ? 38 : 22);
  drive.oversample = "2x";

  const level = note.velocity * (note.part === "bass" ? 0.11 : note.part === "organ" ? 0.055 : note.part === "guitar" ? 0.072 : note.part === "horn" ? 0.083 : 0.07);
  gain.gain.setValueAtTime(0.0001, when);
  gain.gain.exponentialRampToValueAtTime(level, when + 0.025);
  gain.gain.exponentialRampToValueAtTime(0.0001, when + note.d + (note.part === "organ" ? 0.22 : 0.08));

  osc.connect(filter);
  osc2.connect(filter);
  filter.connect(drive);
  drive.connect(gain);
  gain.connect(master);
  lfo.start(when);
  osc.start(when);
  osc2.start(when);
  osc.stop(when + note.d + 0.35);
  osc2.stop(when + note.d + 0.35);
  lfo.stop(when + note.d + 0.35);
  scheduled.push(osc, osc2, lfo);
}

function scheduleHit(note, when) {
  const ac = ensureAudio();
  const gain = ac.createGain();
  const filter = ac.createBiquadFilter();
  const source = ac.createBufferSource();
  source.buffer = noiseBuffer;
  filter.type = note.drum === "kick" ? "lowpass" : note.drum === "hat" ? "highpass" : "bandpass";
  filter.frequency.value = note.drum === "kick" ? 130 : note.drum === "hat" ? 8200 : note.drum === "clave" ? 2600 : 1850;
  filter.Q.value = note.drum === "snare" ? 1.5 : note.drum === "clave" ? 9 : 0.9;
  const level = note.velocity * (note.drum === "kick" ? 0.28 : note.drum === "snare" ? 0.18 : note.drum === "clave" ? 0.12 : 0.075);
  gain.gain.setValueAtTime(0.0001, when);
  gain.gain.exponentialRampToValueAtTime(level, when + 0.006);
  gain.gain.exponentialRampToValueAtTime(0.0001, when + (note.drum === "crash" ? 0.55 : note.d));
  source.connect(filter);
  filter.connect(gain);
  gain.connect(master);
  source.start(when);
  source.stop(when + 0.8);
  scheduled.push(source);

  if (note.drum === "kick") {
    const thump = ac.createOscillator();
    const thumpGain = ac.createGain();
    thump.frequency.setValueAtTime(92, when);
    thump.frequency.exponentialRampToValueAtTime(44, when + 0.11);
    thumpGain.gain.setValueAtTime(0.0001, when);
    thumpGain.gain.exponentialRampToValueAtTime(0.22, when + 0.004);
    thumpGain.gain.exponentialRampToValueAtTime(0.0001, when + 0.16);
    thump.connect(thumpGain);
    thumpGain.connect(master);
    thump.start(when);
    thump.stop(when + 0.18);
    scheduled.push(thump);
  }
}

function makeDriveCurve(amount) {
  const samples = 256;
  const curve = new Float32Array(samples);
  const k = amount;
  for (let i = 0; i < samples; i += 1) {
    const x = (i * 2) / samples - 1;
    curve[i] = ((3 + k) * x * 20 * Math.PI / 180) / (Math.PI + k * Math.abs(x));
  }
  return curve;
}

async function play() {
  const ac = ensureAudio();
  await ac.resume();
  playing = true;
  startAt = audioContext.currentTime - pausedAt;
  visualStartAt = performance.now() / 1000 - pausedAt;
  scheduled = [];
  scheduleCursor = Math.max(0, notes.findIndex((note) => note.t + note.d >= pausedAt));
  if (scheduleCursor < 0) scheduleCursor = 0;
  scheduleAhead();
  schedulerId = window.setInterval(scheduleAhead, 80);
  playLabel.textContent = "停止";
  playIcon.textContent = "■";
  drawLoop();
}

function stop(reset = false) {
  playing = false;
  window.clearInterval(schedulerId);
  scheduled.forEach((osc) => {
    try { osc.stop(); } catch (_error) {}
  });
  scheduled = [];
  pausedAt = performance.now() / 1000 - visualStartAt;
  if (reset || pausedAt >= duration) pausedAt = 0;
  playLabel.textContent = "再生";
  playIcon.textContent = "▶";
  cancelAnimationFrame(animationId);
  render(pausedAt);
}

playButton.addEventListener("click", () => {
  if (playing) {
    stop(false);
  } else {
    play();
  }
});

function scheduleAhead() {
  if (!playing) return;
  const now = currentTime();
  const lookAhead = now + 1.4;
  while (scheduleCursor < notes.length && notes[scheduleCursor].t < lookAhead) {
    scheduleNote(notes[scheduleCursor], now);
    scheduleCursor += 1;
  }
}

function currentTime() {
  if (!playing) return pausedAt;
  return performance.now() / 1000 - visualStartAt;
}

function drawLoop() {
  const now = currentTime();
  if (now >= duration) {
    stop(true);
    return;
  }
  render(now);
  animationId = requestAnimationFrame(drawLoop);
}

function setCanvasSize() {
  const rect = canvas.getBoundingClientRect();
  const scale = window.devicePixelRatio || 1;
  canvas.width = Math.max(1, Math.floor(rect.width * scale));
  canvas.height = Math.max(1, Math.floor(rect.height * scale));
  ctx.setTransform(scale, 0, 0, scale, 0, 0);
}

function render(now) {
  setCanvasSize();
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const playheadX = width * 0.3;
  const horizon = 13.2;
  ctx.clearRect(0, 0, width, height);

  const minPitch = 34;
  const maxPitch = 94;
  for (const note of notes) {
    const x = playheadX + (note.t - now) / horizon * width;
    const w = Math.max(8, note.d / horizon * width);
    if (x + w < -20 || x > width + 20) continue;
    const grooveWave = Math.sin((now * 5.2) + note.t * 2.7) * (note.part === "bass" || note.part === "guitar" ? 5 : 2);
    const y = height - 32 - ((note.pitch - minPitch) / (maxPitch - minPitch)) * (height - 72) + grooveWave;
    const h = note.part === "bass" ? 15 : note.part === "drums" ? 8 : note.part === "latin" ? 10 : note.part === "organ" ? 12 : 11;
    const active = now >= note.t && now <= note.t + note.d;
    ctx.globalAlpha = active ? 0.98 : note.part === "drums" ? 0.5 : 0.64;
    ctx.fillStyle = colors[note.part];
    roundRect(ctx, x, y, w, h, note.part === "drums" || note.part === "latin" ? 3 : 6);
    ctx.fill();
    if (active) {
      ctx.globalAlpha = 0.34;
      ctx.fillStyle = note.part === "bass" ? "#8df3ff" : "#ffffff";
      roundRect(ctx, x - 5, y - 5, w + 10, h + 10, 8);
      ctx.fill();
    }
  }
  ctx.globalAlpha = 1;
  updateLyrics(now);
  progress.style.width = `${Math.min(100, (now / duration) * 100)}%`;
  timeNow.textContent = formatTime(now);
}

function updateLyrics(now) {
  let nextActive = 0;
  for (let i = 0; i < lineTimings.length; i += 1) {
    if (lineTimings[i].t !== null && lineTimings[i].t <= now) nextActive = i;
  }
  if (nextActive === activeLine) return;
  activeLine = nextActive;
  lineEls.forEach((el, index) => {
    el.classList.toggle("active", index === activeLine);
    el.classList.toggle("passed", index < activeLine);
  });
  lineEls[activeLine]?.scrollIntoView({ block: "center", behavior: "smooth" });
}

function roundRect(context, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  context.beginPath();
  context.moveTo(x + r, y);
  context.arcTo(x + width, y, x + width, y + height, r);
  context.arcTo(x + width, y + height, x, y + height, r);
  context.arcTo(x, y + height, x, y, r);
  context.arcTo(x, y, x + width, y, r);
  context.closePath();
}

window.addEventListener("resize", () => render(currentTime()));
render(0);
