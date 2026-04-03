const intro = document.getElementById("intro");
const navbar = document.getElementById("navbar");
const customCursor = document.getElementById("customCursor");
const trails = Array.from({ length: 6 }, (_, i) => document.getElementById(`trail${i}`));
const revealEls = document.querySelectorAll(".reveal");
const parallaxCards = document.querySelectorAll(".card");
const toggleProductsBtn = document.getElementById("toggleProducts");
const moreProducts = document.getElementById("moreProducts");
const soundToggle = document.getElementById("soundToggle");
const audioOrb = document.getElementById("audioOrb");
const audioRing = document.getElementById("audioRing");

let ambientOn = false;
let audioCtx = null;
let ambientOsc = null;
let ambientGain = null;
let analyser = null;
let micData = null;
let animationFrame = null;

setTimeout(() => {
  intro.classList.add("hide");
  navbar.classList.remove("hidden-nav");
}, 2600);

navbar.classList.add("hidden-nav");

const trailPoints = Array.from({ length: 6 }, () => ({ x: 0, y: 0 }));

window.addEventListener("mousemove", (e) => {
  if (customCursor) {
    customCursor.style.left = `${e.clientX}px`;
    customCursor.style.top = `${e.clientY}px`;
  }

  trailPoints[0].x = e.clientX;
  trailPoints[0].y = e.clientY;

  for (let i = 1; i < trailPoints.length; i++) {
    trailPoints[i].x += (trailPoints[i - 1].x - trailPoints[i].x) * 0.4;
    trailPoints[i].y += (trailPoints[i - 1].y - trailPoints[i].y) * 0.4;
  }

  trails.forEach((el, i) => {
    if (!el) return;
    el.style.left = `${trailPoints[i].x}px`;
    el.style.top = `${trailPoints[i].y}px`;
    el.style.opacity = `${0.6 - i * 0.1}`;
  });
});

document.addEventListener("mouseover", (e) => {
  const interactive = e.target.closest("a, button");
  if (customCursor) {
    customCursor.classList.toggle("active", Boolean(interactive));
  }
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.15, rootMargin: "0px 0px -10% 0px" });

revealEls.forEach((el) => observer.observe(el));

parallaxCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const mx = ((e.clientX - rect.left) / rect.width) * 100;
    const my = ((e.clientY - rect.top) / rect.height) * 100;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;

    card.style.setProperty("--mx", `${mx}%`);
    card.style.setProperty("--my", `${my}%`);
    card.style.setProperty("--px", `${px * 16}px`);
    card.style.setProperty("--py", `${py * 12}px`);
    card.style.setProperty("--px2", `${px * -10}px`);
    card.style.setProperty("--py2", `${py * -8}px`);
  });

  card.addEventListener("mouseleave", () => {
    card.style.setProperty("--mx", "50%");
    card.style.setProperty("--my", "50%");
    card.style.setProperty("--px", "0px");
    card.style.setProperty("--py", "0px");
    card.style.setProperty("--px2", "0px");
    card.style.setProperty("--py2", "0px");
  });
});

toggleProductsBtn?.addEventListener("click", () => {
  moreProducts.classList.toggle("hidden");
  toggleProductsBtn.textContent = moreProducts.classList.contains("hidden")
    ? "View More Products"
    : "Show Less Products";
});

function ensureAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === "suspended") audioCtx.resume();
  return audioCtx;
}

function startAmbientSound() {
  const ctx = ensureAudioContext();
  ambientOsc = ctx.createOscillator();
  ambientGain = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  ambientOsc.type = "sine";
  ambientOsc.frequency.setValueAtTime(60, ctx.currentTime);
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(400, ctx.currentTime);
  ambientGain.gain.setValueAtTime(0.0001, ctx.currentTime);
  ambientGain.gain.linearRampToValueAtTime(0.02, ctx.currentTime + 1);

  ambientOsc.connect(filter);
  filter.connect(ambientGain);
  ambientGain.connect(ctx.destination);
  ambientOsc.start();
}

function stopAmbientSound() {
  if (!audioCtx || !ambientGain || !ambientOsc) return;
  const now = audioCtx.currentTime;
  ambientGain.gain.cancelScheduledValues(now);
  ambientGain.gain.setValueAtTime(ambientGain.gain.value || 0.02, now);
  ambientGain.gain.linearRampToValueAtTime(0.0001, now + 0.5);
  try { ambientOsc.stop(now + 0.55); } catch (e) {}
  ambientOsc = null;
  ambientGain = null;
}

soundToggle?.addEventListener("click", async () => {
  ambientOn = !ambientOn;
  soundToggle.textContent = ambientOn ? "Sound ON" : "Enable Sound";
  if (ambientOn) startAmbientSound();
  else stopAmbientSound();
});

async function startMicReactiveVisual() {
  if (!navigator.mediaDevices?.getUserMedia) return;

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const ctx = ensureAudioContext();
    analyser = ctx.createAnalyser();
    analyser.fftSize = 64;
    const source = ctx.createMediaStreamSource(stream);
    source.connect(analyser);
    micData = new Uint8Array(analyser.frequencyBinCount);

    const tick = () => {
      analyser.getByteFrequencyData(micData);
      const avg = micData.reduce((a, b) => a + b, 0) / micData.length;
      const bass = micData.slice(0, 6).reduce((a, b) => a + b, 0) / 6;
      const level = Math.max(0.18, avg / 255);
      const beat = bass / 255;

      const orbSize = 220 + beat * 120;
      const ringSize = 180 + beat * 120;

      audioOrb.style.width = `${orbSize}px`;
      audioOrb.style.height = `${orbSize}px`;
      audioOrb.style.opacity = `${0.18 + beat * 0.35}`;

      audioRing.style.width = `${ringSize}px`;
      audioRing.style.height = `${ringSize}px`;
      audioRing.style.opacity = `${beat * 0.42}`;
      audioRing.style.boxShadow = `0 0 ${18 + beat * 28}px rgba(204,122,255,${0.12 + beat * 0.18})`;

      document.documentElement.style.setProperty("--live-brightness", `${1 + level * 0.3}`);

      animationFrame = requestAnimationFrame(tick);
    };

    tick();
  } catch (err) {
    // Silent fallback if mic permission is denied
  }
}

startMicReactiveVisual();
