// ===== 設定 =====
// リンクの URL はここを書き換える。copy を指定したものはクリックでその文字をコピーする。
// url も copy も無いものは「準備中」と表示される。
const LINKS = [
  { name: "X",       id: "@boku_murder", url: "https://x.com/boku_murder", icon: "x" },
  { name: "GitHub",  id: "@boku224",  url: "https://github.com/boku224", icon: "github" },
  { name: "Discord", id: "boku0317",  copy: "boku0317", icon: "discord" },
];

// アイコン画像を置いたらパスを書く (例: "assets/avatar.png")。空ならイニシャル表示。
const AVATAR = "assets/avatar.png";

// メールアドレス (自動収集を避けるため分割して組み立てる)
const MAIL = ["bokulylack", "gmail.com"];

// 作品。上から順に並ぶ。
//   title: 名前 / desc: ひとこと説明 / tags: 使った技術など
//   image: サムネイル画像のパス (例: "assets/works/tool.png")。空なら模様の背景
//   url:   リンク先。空ならクリックできないカードになる
//   soon:  true にすると「準備中」のカードになる
const WORKS = [
  { title: "Coming soon", desc: "作品を準備しています。", tags: [], soon: true },
  { title: "Coming soon", desc: "作品を準備しています。", tags: [], soon: true },
  { title: "Coming soon", desc: "作品を準備しています。", tags: [], soon: true },
];

// ===== ここから下は通常いじらなくてよい =====
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

const ICONS = {
  x: '<path d="M18.9 2H22l-6.8 7.8L23 22h-6.3l-4.9-6.4L6.2 22H3l7.3-8.4L1 2h6.4l4.4 5.9L18.9 2zm-1.1 18h1.7L6.3 3.9H4.5L17.8 20z"/>',
  github: '<path d="M12 .5a11.5 11.5 0 0 0-3.6 22.4c.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0C17.3 4.8 18.3 5 18.3 5c.6 1.6.2 2.8.1 3.1.7.8 1.2 1.9 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.2c0 .3.2.7.8.6A11.5 11.5 0 0 0 12 .5z"/>',
  discord: '<path d="M20.3 4.4A19.8 19.8 0 0 0 15.4 3l-.6 1.3a18.4 18.4 0 0 0-5.6 0L8.6 3a19.7 19.7 0 0 0-4.9 1.5C.6 9.1-.3 13.7.1 18.2a19.9 19.9 0 0 0 6 3l1.3-2.1c-.7-.3-1.4-.6-2-1l.5-.4a14.2 14.2 0 0 0 12.2 0l.5.4c-.6.4-1.3.7-2 1l1.3 2.1a19.8 19.8 0 0 0 6-3c.5-5.2-.9-9.8-3.6-13.8zM8 15.4c-1.2 0-2.2-1.1-2.2-2.4S6.8 10.6 8 10.6s2.2 1.1 2.2 2.4-1 2.4-2.2 2.4zm8 0c-1.2 0-2.2-1.1-2.2-2.4s1-2.4 2.2-2.4 2.2 1.1 2.2 2.4-1 2.4-2.2 2.4z"/>',
};

// ---- リンク ----
const linksEl = document.getElementById("links");
for (const l of LINKS) {
  const li = document.createElement("li");
  const a = document.createElement("a");
  if (l.url) {
    a.href = l.url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
  } else if (l.copy) {
    a.href = "#";
    a.title = "クリックでユーザー名をコピー";
    a.addEventListener("click", async (e) => {
      e.preventDefault();
      const idEl = a.querySelector(".id");
      try {
        await navigator.clipboard.writeText(l.copy);
        idEl.textContent = "コピーしました";
      } catch {
        idEl.textContent = l.copy;
      }
      setTimeout(() => { idEl.textContent = l.id || l.copy; }, 1500);
    });
  } else {
    a.className = "disabled";
    a.setAttribute("aria-disabled", "true");
  }
  a.innerHTML =
    `<svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[l.icon] || ""}</svg>` +
    `<span class="name"></span><span class="id"></span>` +
    `<span class="arrow" aria-hidden="true">${l.copy ? "⧉" : "↗"}</span>`;
  a.querySelector(".name").textContent = l.name;
  a.querySelector(".id").textContent = (l.url || l.copy) ? (l.id || "") : "準備中";
  li.appendChild(a);
  linksEl.appendChild(li);
}

// ---- 作品 ----
const worksEl = document.getElementById("works-grid");
for (const w of WORKS) {
  const card = document.createElement(w.url ? "a" : "article");
  card.className = "tile work reveal" + (w.soon ? " soon" : "");
  if (w.url) {
    card.href = w.url;
    card.target = "_blank";
    card.rel = "noopener noreferrer";
  }
  card.innerHTML =
    `<div class="work-thumb"></div>` +
    `<div class="work-body">` +
    `<p class="work-title"><span class="t"></span>${w.url ? '<span class="arrow" aria-hidden="true">↗</span>' : ""}</p>` +
    `<p class="work-desc"></p><ul class="tags"></ul></div>`;
  const thumb = card.querySelector(".work-thumb");
  if (w.image) {
    const img = new Image();
    img.src = w.image;
    img.alt = "";
    img.loading = "lazy";
    thumb.appendChild(img);
  } else {
    thumb.innerHTML = `<span class="ph">${w.soon ? "// coming soon" : "// no image"}</span>`;
  }
  card.querySelector(".t").textContent = w.title;
  card.querySelector(".work-desc").textContent = w.desc || "";
  const tags = card.querySelector(".tags");
  for (const t of w.tags || []) {
    const li = document.createElement("li");
    li.textContent = t;
    tags.appendChild(li);
  }
  worksEl.appendChild(card);
}

// ---- アイコン ----
if (AVATAR) {
  const av = document.getElementById("avatar");
  const img = new Image();
  img.src = AVATAR;
  img.alt = "";
  img.onload = () => { av.querySelector("span")?.remove(); av.appendChild(img); };
}

// ---- メール ----
const mailEl = document.getElementById("mail");
mailEl.addEventListener("click", (e) => {
  if (mailEl.dataset.shown) return; // 2 回目以降は普通の mailto リンク
  e.preventDefault();
  const addr = MAIL.join("@");
  mailEl.dataset.shown = "1";
  mailEl.querySelector("span").textContent = addr;
  mailEl.href = "mailto:" + addr;
});

document.getElementById("year").textContent = new Date().getFullYear();

// ---- 時計 (JST) ----
const clockEl = document.getElementById("clock");
const fmt = new Intl.DateTimeFormat("ja-JP", {
  timeZone: "Asia/Tokyo", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false,
});
const tickClock = () => {
  const [h, m, s] = fmt.format(new Date()).split(":");
  clockEl.innerHTML = `${h}:${m}<span>:${s}</span>`;
};
tickClock();
setInterval(tickClock, 1000);

// ---- 名前の解読演出 ----
const GLYPHS = "!<>-_/[]{}=+*^?#01アイウエオカキクケコ";
const decode = (el, delay) => {
  const text = el.dataset.text;
  let frame = 0;
  const total = 26;
  const run = () => {
    let html = "";
    for (let i = 0; i < text.length; i++) {
      const settle = Math.floor((i / text.length) * total * 0.7) + 8;
      if (frame >= settle) html += text[i];
      else html += `<span class="sc">${GLYPHS[(Math.random() * GLYPHS.length) | 0]}</span>`;
    }
    el.innerHTML = html;
    if (++frame <= total) setTimeout(run, 45);
    else el.textContent = text;
  };
  setTimeout(run, delay);
};

// ---- タイピング ----
const typed = document.getElementById("typed");
const startTyping = () => {
  const cmd = "whoami";
  let i = 0;
  const tick = () => {
    typed.textContent = cmd.slice(0, ++i);
    if (i < cmd.length) setTimeout(tick, 90 + Math.random() * 80);
  };
  setTimeout(tick, 300);
};

// ---- 表示アニメーション ----
const startReveal = () => {
  const reveals = document.querySelectorAll(".reveal");
  document.querySelectorAll(".hero .reveal").forEach((el, i) => el.style.setProperty("--d", `${i * 0.09}s`));
  document.querySelectorAll(".bento .reveal, .works .reveal").forEach((el, i) => el.style.setProperty("--d", `${(i % 4) * 0.07}s`));
  // 画面に入ったものから表示する (スクロールのたびに位置を見る)
  let pending = [...reveals];
  let queued = false;
  const check = () => {
    queued = false;
    const limit = window.innerHeight - 8;
    pending = pending.filter((el) => {
      if (el.getBoundingClientRect().top < limit) { el.classList.add("in"); return false; }
      return true;
    });
    if (!pending.length) {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    }
  };
  const onScroll = () => {
    if (!queued) { queued = true; requestAnimationFrame(check); }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  check();
};

const startPage = () => {
  startReveal();
  startTyping();
  // 起動画面・解読・タイピングは数秒で終わる短い演出なので「動きを減らす」設定でも出す
  document.querySelectorAll("h1 .name").forEach((el, i) => decode(el, 250 + i * 220));
};

// ---- 起動画面 (1 セッションに 1 回) ----
(() => {
  const boot = document.getElementById("boot");
  let seen = false;
  try { seen = sessionStorage.getItem("booted") === "1"; } catch {}
  if (seen) {
    boot.remove();
    startPage();
    return;
  }
  try { sessionStorage.setItem("booted", "1"); } catch {}

  const log = document.getElementById("boot-log");
  const bar = document.getElementById("boot-bar");
  const lines = [
    '<span class="hi">lylack-os</span> v1.0',
    '<span class="ok">[ ok ]</span> loading profile ........ boku lylack',
    '<span class="ok">[ ok ]</span> mounting skills ........ js, python',
    '<span class="ok">[ ok ]</span> linking accounts ....... x, github, discord',
    '<span class="ok">[ ok ]</span> rendering works ........ done',
    '<span class="hi">&gt; ready</span>',
  ];
  let i = 0;
  let finished = false;
  const finish = () => {
    if (finished) return;
    finished = true;
    boot.classList.add("done");
    startPage();
    setTimeout(() => boot.remove(), 600);
  };
  const step = () => {
    if (finished) return;
    log.innerHTML += (i ? "\n" : "") + lines[i];
    i++;
    bar.style.width = `${(i / lines.length) * 100}%`;
    if (i < lines.length) setTimeout(step, 180 + Math.random() * 120);
    else setTimeout(finish, 350);
  };
  setTimeout(step, 150);
  boot.addEventListener("click", finish);
  window.addEventListener("keydown", finish, { once: true });
})();

// ---- タイルのマウス追従ライト ----
document.querySelectorAll(".tile").forEach((t) => {
  t.addEventListener("pointermove", (e) => {
    const r = t.getBoundingClientRect();
    t.style.setProperty("--mx", `${e.clientX - r.left}px`);
    t.style.setProperty("--my", `${e.clientY - r.top}px`);
  });
});

// ---- 背景のドット (マウスに反応) ----
(() => {
  const cv = document.getElementById("field");
  const ctx = cv.getContext("2d");
  const GAP = 30;
  let w, h, dpr, dots = [];
  const mouse = { x: -9999, y: -9999 };

  const resize = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth;
    h = window.innerHeight;
    cv.width = w * dpr;
    cv.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    dots = [];
    for (let y = GAP / 2; y < h; y += GAP) {
      for (let x = GAP / 2; x < w; x += GAP) dots.push({ x, y });
    }
    if (reduceMotion) draw(0);
  };

  const draw = (t) => {
    ctx.clearRect(0, 0, w, h);
    const R = 140;
    for (const d of dots) {
      const dx = d.x - mouse.x;
      const dy = d.y - mouse.y;
      const dist = Math.hypot(dx, dy);
      const near = Math.max(0, 1 - dist / R);
      const wave = 0.5 + 0.5 * Math.sin(d.x * 0.012 + d.y * 0.008 + t * 0.0008);
      const push = near * 10;
      const x = d.x + (dist ? (dx / dist) * push : 0);
      const y = d.y + (dist ? (dy / dist) * push : 0);
      const a = 0.06 + wave * 0.06 + near * 0.6;
      ctx.fillStyle = near > 0.01 ? `rgba(94,230,195,${a})` : `rgba(255,255,255,${a})`;
      ctx.beginPath();
      ctx.arc(x, y, 1 + near * 1.2, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  let raf = 0;
  const loop = (t) => {
    draw(t);
    raf = requestAnimationFrame(loop);
  };

  window.addEventListener("resize", resize);
  window.addEventListener("pointermove", (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });
  window.addEventListener("pointerleave", () => { mouse.x = mouse.y = -9999; });
  resize();

  if (!reduceMotion) {
    raf = requestAnimationFrame(loop);
    document.addEventListener("visibilitychange", () => {
      cancelAnimationFrame(raf);
      if (!document.hidden) raf = requestAnimationFrame(loop);
    });
  }
})();

// ---- 専用カーソル (マウス操作のときだけ) ----
(() => {
  if (!matchMedia("(pointer: fine)").matches) return;
  const dot = document.querySelector(".cursor-dot");
  const ring = document.querySelector(".cursor-ring");
  const root = document.documentElement;
  let mx = -100, my = -100, rx = -100, ry = -100;
  let started = false;

  window.addEventListener("pointermove", (e) => {
    if (e.pointerType !== "mouse") return;
    mx = e.clientX;
    my = e.clientY;
    dot.style.transform = `translate(${mx}px, ${my}px)`;
    if (!started) {
      started = true;
      rx = mx; ry = my;
      root.classList.add("has-cursor");
      requestAnimationFrame(follow);
    }
    root.classList.remove("cursor-hidden");
  });
  document.addEventListener("pointerleave", () => root.classList.add("cursor-hidden"));
  window.addEventListener("pointerdown", () => ring.classList.add("down"));
  window.addEventListener("pointerup", () => ring.classList.remove("down"));
  document.addEventListener("pointerover", (e) => {
    ring.classList.toggle("hover", !!e.target.closest("a, button"));
  });

  const follow = () => {
    const k = reduceMotion ? 1 : 0.18;
    rx += (mx - rx) * k;
    ry += (my - ry) * k;
    ring.style.transform = `translate(${rx}px, ${ry}px)`;
    requestAnimationFrame(follow);
  };
})();
