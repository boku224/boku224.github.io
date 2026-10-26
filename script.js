// ===== 設定 =====
// リンクの URL はここを書き換える。copy を指定したものはクリックでその文字をコピーする。
// url も copy も無いものは「準備中」と表示される。
const LINKS = [
  { name: "X",       id: "@boku_murder", url: "https://x.com/boku_murder", icon: "x" },
  { name: "GitHub",  id: "@boku224",  url: "https://github.com/boku224", icon: "github" },
  { name: "Discord", id: "boku0317",  copy: "boku0317", icon: "discord" },
];

// アイコン画像を置いたらパスを書く (例: "assets/avatar.png")。空ならイニシャル表示。
const AVATAR = "";

// メールアドレス (自動収集を避けるため分割して組み立てる)
const MAIL = ["bokulylack", "gmail.com"];

// ===== ここから下は通常いじらなくてよい =====
const ICONS = {
  x: '<path d="M18.9 2H22l-6.8 7.8L23 22h-6.3l-4.9-6.4L6.2 22H3l7.3-8.4L1 2h6.4l4.4 5.9L18.9 2zm-1.1 18h1.7L6.3 3.9H4.5L17.8 20z"/>',
  github: '<path d="M12 .5a11.5 11.5 0 0 0-3.6 22.4c.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0C17.3 4.8 18.3 5 18.3 5c.6 1.6.2 2.8.1 3.1.7.8 1.2 1.9 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.2c0 .3.2.7.8.6A11.5 11.5 0 0 0 12 .5z"/>',
  discord: '<path d="M20.3 4.4A19.8 19.8 0 0 0 15.4 3l-.6 1.3a18.4 18.4 0 0 0-5.6 0L8.6 3a19.7 19.7 0 0 0-4.9 1.5C.6 9.1-.3 13.7.1 18.2a19.9 19.9 0 0 0 6 3l1.3-2.1c-.7-.3-1.4-.6-2-1l.5-.4a14.2 14.2 0 0 0 12.2 0l.5.4c-.6.4-1.3.7-2 1l1.3 2.1a19.8 19.8 0 0 0 6-3c.5-5.2-.9-9.8-3.6-13.8zM8 15.4c-1.2 0-2.2-1.1-2.2-2.4S6.8 10.6 8 10.6s2.2 1.1 2.2 2.4-1 2.4-2.2 2.4zm8 0c-1.2 0-2.2-1.1-2.2-2.4s1-2.4 2.2-2.4 2.2 1.1 2.2 2.4-1 2.4-2.2 2.4z"/>',
};

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
    `<span><span class="name"></span><span class="id"></span></span>`;
  a.querySelector(".name").textContent = l.name;
  a.querySelector(".id").textContent = (l.url || l.copy) ? (l.id || "") : "準備中";
  li.appendChild(a);
  linksEl.appendChild(li);
}

if (AVATAR) {
  const av = document.getElementById("avatar");
  const img = new Image();
  img.src = AVATAR;
  img.alt = "";
  img.onload = () => { av.textContent = ""; av.appendChild(img); };
}

const mailEl = document.getElementById("mail");
mailEl.addEventListener("click", (e) => {
  const addr = MAIL.join("@");
  if (mailEl.dataset.shown) return; // 2 回目以降は普通の mailto リンク
  e.preventDefault();
  mailEl.dataset.shown = "1";
  mailEl.textContent = addr;
  mailEl.href = "mailto:" + addr;
});

document.getElementById("year").textContent = new Date().getFullYear();

// プロンプトのタイピング演出
const typed = document.getElementById("typed");
const cmd = "whoami";
if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
  typed.textContent = cmd;
} else {
  let i = 0;
  const tick = () => {
    typed.textContent = cmd.slice(0, ++i);
    if (i < cmd.length) setTimeout(tick, 90 + Math.random() * 80);
  };
  setTimeout(tick, 500);
}
