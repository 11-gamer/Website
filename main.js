/* ===================================================
   11-GAMING.COM — main.js
   This is the file to edit to make the site your own.
   Look for the sections marked EDIT ME below.
   =================================================== */

/* ---------------------------------------------------
   EDIT ME #0: Your videos
   Paste any YouTube link (regular, youtu.be, or Shorts).
   Unlisted videos work fine — they just won't show up
   in YouTube search, only to people with the link.
--------------------------------------------------- */
const VIDEOS = [
  { url: "", title: "Add a video link here" },
];

/* ---------------------------------------------------
   EDIT ME #1: Your games
   Add, remove, or change any game in this list.
   rating: use 1-5 stars, written as a string of ★ and ☆
--------------------------------------------------- */
const GAMES = [
  { title: "Geometry Dash — Stereo Madness", note: "The level that started it all. Rhythm, spikes, no mercy.", rating: "★★★★★" },
  { title: "My Singing Monsters", note: "Building islands and breeding new monsters for the choir.", rating: "★★★★★" },
  { title: "Add another game", note: "Say what you like about it.", rating: "★★★☆☆" },
];

/* ---------------------------------------------------
   EDIT ME #2: Space facts
   The terminal picks a random one each time the planet is tapped.
--------------------------------------------------- */
const SPACE_FACTS = [
  "A day on Venus is longer than its year.",
  "Neutron stars can spin 600 times per second.",
  "There are more stars in the universe than grains of sand on every beach on Earth.",
  "Jupiter has at least 95 known moons.",
  "The footprints on the Moon will likely stay there for millions of years — there's no wind to erase them.",
  "One teaspoon of a neutron star would weigh about 6 billion tons.",
  "Saturn could float in water because it's mostly gas.",
  "Space is completely silent — sound needs air to travel, and there isn't any.",
];

/* ---------------------------------------------------
   EDIT ME #3: Art gallery
   Put image files in the /art folder, then list their
   filenames here. Leave a slot as "" for an empty frame
   he can fill in later.
--------------------------------------------------- */
const ART = [
  { file: "", caption: "Drop a drawing here" },
  { file: "", caption: "Drop a drawing here" },
  { file: "", caption: "Drop a drawing here" },
];

/* =====================================================
   Below this line: site mechanics. Safe to leave alone.
   ===================================================== */

// ---- Boot screen ----
function runBoot() {
  const boot = document.getElementById("bootScreen");
  const bootText = document.getElementById("bootText");
  const lines = ["INITIALIZING 11-GAMING.COM...", "LOADING MISSION CONTROL..."];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion) {
    boot.classList.add("hidden");
    return;
  }

  let i = 0;
  bootText.textContent = lines[0];
  const swap = setInterval(() => {
    i++;
    if (i < lines.length) {
      bootText.textContent = lines[i];
    } else {
      clearInterval(swap);
      setTimeout(() => boot.classList.add("hidden"), 350);
    }
  }, 500);
}

// ---- Starfield background ----
function runStarfield() {
  const canvas = document.getElementById("starfield");
  const ctx = canvas.getContext("2d");
  let stars = [];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const count = Math.floor((canvas.width * canvas.height) / 9000);
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.4 + 0.3,
      speed: Math.random() * 0.15 + 0.02,
      twinkle: Math.random() * Math.PI * 2,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#0B0F2E";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (const s of stars) {
      const alpha = 0.5 + 0.5 * Math.sin(s.twinkle);
      ctx.beginPath();
      ctx.fillStyle = `rgba(234,240,255,${alpha.toFixed(2)})`;
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
      if (!reduceMotion) {
        s.y += s.speed;
        s.twinkle += 0.02;
        if (s.y > canvas.height) s.y = 0;
      }
    }
    requestAnimationFrame(draw);
  }

  window.addEventListener("resize", resize);
  resize();
  draw();
}

// ---- Render videos ----
function getYouTubeId(url) {
  if (!url) return null;
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) {
      return u.pathname.slice(1);
    }
    if (u.pathname.startsWith("/shorts/")) {
      return u.pathname.split("/shorts/")[1];
    }
    if (u.searchParams.get("v")) {
      return u.searchParams.get("v");
    }
  } catch (e) {
    return null;
  }
  return null;
}

function renderVideos() {
  const grid = document.getElementById("videoGrid");
  const cards = VIDEOS.map(v => {
    const id = getYouTubeId(v.url);
    if (!id) {
      return `
        <div class="video-card">
          <div class="video-frame" style="display:flex;align-items:center;justify-content:center;color:var(--text-dim);font-size:0.9rem;padding:1rem;text-align:center;">
            Paste a YouTube link in main.js
          </div>
          <h3 class="video-title">${escapeHTML(v.title)}</h3>
        </div>
      `;
    }
    return `
      <div class="video-card">
        <div class="video-frame">
          <iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}"
            title="${escapeHTML(v.title)}"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen></iframe>
        </div>
        <h3 class="video-title">${escapeHTML(v.title)}</h3>
      </div>
    `;
  });
  grid.innerHTML = cards.join("");
}

// ---- Render games ----
function renderGames() {
  const grid = document.getElementById("gameGrid");
  grid.innerHTML = GAMES.map(g => `
    <article class="cart">
      <h3 class="cart-title">${escapeHTML(g.title)}</h3>
      <p class="cart-note">${escapeHTML(g.note)}</p>
      <p class="cart-rating" aria-label="Rating">${escapeHTML(g.rating)}</p>
    </article>
  `).join("");
}

// ---- Render art gallery ----
function renderArt() {
  const grid = document.getElementById("artGrid");
  grid.innerHTML = ART.map(a => {
    if (a.file) {
      return `<div class="frame"><img src="art/${escapeHTML(a.file)}" alt="${escapeHTML(a.caption)}"></div>`;
    }
    return `<div class="frame">${escapeHTML(a.caption)}</div>`;
  }).join("");
}

// ---- Space fact terminal ----
function runSpaceTerminal() {
  const btn = document.getElementById("planetBtn");
  const factText = document.getElementById("factText");
  let lastIndex = -1;

  btn.addEventListener("click", () => {
    let index;
    do {
      index = Math.floor(Math.random() * SPACE_FACTS.length);
    } while (index === lastIndex && SPACE_FACTS.length > 1);
    lastIndex = index;
    factText.textContent = SPACE_FACTS[index];
  });
}

// ---- Footer date ----
function renderFooterDate() {
  const el = document.getElementById("lastUpdated");
  el.textContent = new Date().toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
}

// ---- utility ----
function escapeHTML(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

// ---- init ----
document.addEventListener("DOMContentLoaded", () => {
  runBoot();
  runStarfield();
  renderVideos();
  renderGames();
  renderArt();
  runSpaceTerminal();
  renderFooterDate();
});
