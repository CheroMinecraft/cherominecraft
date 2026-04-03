const intro = document.getElementById("intro");
const siteNav = document.getElementById("siteNav");
const heroContent = document.getElementById("heroContent");
const heroGradient = document.getElementById("heroGradient");
const blob1 = document.getElementById("blob1");
const blob2 = document.getElementById("blob2");
const bgParticles = document.getElementById("bgParticles");
const toggleProducts = document.getElementById("toggleProducts");
const moreProducts = document.getElementById("moreProducts");
const audioToggle = document.getElementById("audioToggle");
const audioStatus = document.getElementById("audioStatus");

let ambientOn = false;
let ambientCtx = null;
let ambientNodes = null;

siteNav.classList.add("nav-hidden");
heroContent.classList.add("hero-hidden");

setTimeout(() => {
  intro.classList.add("hidden-intro");
  siteNav.classList.remove("nav-hidden");
  heroContent.classList.remove("hero-hidden");
}, 2400);

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  heroGradient.style.transform = `translateY(${scrollY * 0.12}px)`;
  blob1.style.transform = `translateY(${scrollY * 0.1}px)`;
  blob2.style.transform = `translateY(${scrollY * -0.08}px)`;
});

const revealSections = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.remove("reveal-hidden");
      entry.target.classList.add("reveal-visible");
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -10% 0px" });

  revealSections.forEach((section) => {
    section.classList.add("reveal-hidden");
    observer.observe(section);
  });
} else {
  revealSections.forEach((section) => {
    section.classList.add("reveal-visible");
  });
}

function generateParticles() {
  bgParticles.innerHTML = "";
  const count = window.innerWidth < 768 ? 28 : 56;

  for (let i = 0; i < count; i += 1) {
    const particle = document.createElement("span");
    const size = Math.random() * 6 + 3;
    const left = Math.random() * 100;
    const delay = Math.random() * 8;
    const duration = Math.random() * 8 + 10;
    const drift = (Math.random() - 0.5) * 180;

    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${left}%`;
    particle.style.animationDelay = `${delay}s`;
    particle.style.animationDuration = `${duration}s`;
    particle.style.setProperty("--drift-x", `${drift}px`);
    particle.style.opacity = `${0.16 + Math.random() * 0.28}`;

    bgParticles.appendChild(particle);
  }
}

generateParticles();
window.addEventListener("resize", generateParticles);

document.querySelectorAll(".box-hover").forEach((card) => {
  card.addEventListener("mousemove", (event) => {
    const rect = card.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;

    card.style.setProperty("--mx", `${((event.clientX - rect.left) / rect.width) * 100}%`);
    card.style.setProperty("--my", `${((event.clientY - rect.left) / rect.width) * 100}%`);
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

toggleProducts.addEventListener("click", () => {
  moreProducts.classList.toggle("hidden");
  toggleProducts.textContent = moreProducts.classList.contains("hidden")
    ? "View More Products"
    : "Show Less Products";
});

function enableAmbient() {
  const AudioCtor = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtor) return;

  ambientCtx = new AudioCtor();
  const osc = ambientCtx.createOscillator();
  const gain = ambientCtx.createGain();
  const filter = ambientCtx.createBiquadFilter();

  osc.type = "sine";
  osc.frequency.setValueAtTime(60, ambientCtx.currentTime);
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(400, ambientCtx.currentTime);
  gain.gain.setValueAtTime(0.0001, ambientCtx.currentTime);
  gain.gain.linearRampToValueAtTime(0.02, ambientCtx.currentTime + 1);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(ambientCtx.destination);
  osc.start();

  ambientNodes = { osc, gain };
}

function disableAmbient() {
  if (!ambientNodes || !ambientCtx) return;
  const { osc, gain } = ambientNodes;
  const now = ambientCtx.currentTime;

  gain.gain.cancelScheduledValues(now);
  gain.gain.setValueAtTime(gain.gain.value || 0.02, now);
  gain.gain.linearRampToValueAtTime(0.0001, now + 0.5);

  try {
    osc.stop(now + 0.55);
  } catch (e) {}

  ambientNodes = null;
}

audioToggle.addEventListener("click", () => {
  ambientOn = !ambientOn;

  if (ambientOn) {
    enableAmbient();
    audioToggle.classList.add("active");
    audioStatus.textContent = "Sound ON";
  } else {
    disableAmbient();
    audioToggle.classList.remove("active");
    audioStatus.textContent = "Enable Sound";
  }
  const reveals = document.querySelectorAll('.reveal');

window.addEventListener('scroll', () => {
  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (top < windowHeight - 100) {
      el.classList.add('active');
    }
  });
});
});
