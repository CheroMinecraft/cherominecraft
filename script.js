const mouseLight = document.getElementById("mouse-light");
const cursorTrail = document.getElementById("cursor-trail");
const particleContainer = document.getElementById("particles");
const moreProducts = document.getElementById("more-products");
const toggleProducts = document.getElementById("toggle-products");
const parallaxLayers = document.querySelectorAll(".parallax-layer");

let audioLevel = 0.18;

// 🔥 PARTICLES
function createParticles() {
  for (let i = 0; i < 54; i++) {
    const particle = document.createElement("span");
    particle.className = "particle";

    const size = (i % 4) + 3 + audioLevel * 3;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${(i * 9 + 7) % 100}%`;
    particle.style.top = `${(i * 11 + 13) % 100}%`;
    particle.style.animationDuration = `${8 + (i % 6) - audioLevel * 2}s`;
    particle.style.animationDelay = `${(i % 7) * 0.6}s`;
    particle.style.opacity = `${0.22 + (i % 5) * 0.07 + audioLevel * 0.15}`;
    particle.style.boxShadow =
      i % 2 === 0
        ? `0 0 ${24 + audioLevel * 26}px rgba(204,122,255,${0.32 + audioLevel * 0.25})`
        : `0 0 ${20 + audioLevel * 22}px rgba(128,0,255,${0.28 + audioLevel * 0.22})`;

    particleContainer.appendChild(particle);
  }
}

// 🎯 MOUSE LIGHT
function updateMouseLight(x, y) {
  const xPercent = (x / window.innerWidth) * 100;
  const yPercent = (y / window.innerHeight) * 100;
  mouseLight.style.background = `radial-gradient(circle at ${xPercent}% ${yPercent}%, rgba(204,122,255,0.18), transparent 16%)`;
}

// ✨ CURSOR TRAIL
function addTrailDot(x, y) {
  const dot = document.createElement("span");
  dot.className = "trail-dot";
  dot.style.left = `${x}px`;
  dot.style.top = `${y}px`;
  dot.style.width = `16px`;
  dot.style.height = `16px`;
  dot.style.boxShadow = `0 0 22px rgba(204,122,255,0.45)`;

  cursorTrail.appendChild(dot);

  setTimeout(() => {
    dot.remove();
  }, 700);
}

// 🧠 PARALLAX SCROLL
function handleScroll() {
  const scrollY = window.scrollY;
  parallaxLayers.forEach(layer => {
    const speed = parseFloat(layer.dataset.speed || "0");
    layer.style.transform = `translateY(${scrollY * speed}px)`;
  });
}

// 🎧 AUDIO REACTIVE (mic based)
async function startAudioReactive() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaStreamSource(stream);

    analyser.fftSize = 64;
    source.connect(analyser);

    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    function updateAudio() {
      analyser.getByteFrequencyData(dataArray);
      const avg = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
      audioLevel = avg / 255;
      requestAnimationFrame(updateAudio);
    }

    updateAudio();
  } catch (error) {
    audioLevel = 0.18;
  }
}

// 🛍️ SHOW MORE PRODUCTS
toggleProducts.addEventListener("click", () => {
  moreProducts.classList.toggle("show");
  toggleProducts.textContent = moreProducts.classList.contains("show")
    ? "Show Less Products"
    : "View More Products";
});

// 🖱️ EVENTS
window.addEventListener("mousemove", (e) => {
  updateMouseLight(e.clientX, e.clientY);
  addTrailDot(e.clientX, e.clientY);
});

window.addEventListener("scroll", handleScroll);

// 🚀 INIT
createParticles();
startAudioReactive();
handleScroll();