const mouseLight = document.getElementById("mouse-light");
const cursorTrail = document.getElementById("cursor-trail");
const particleContainer = document.getElementById("particles");
const starsContainer = document.getElementById("stars");
const moreProducts = document.getElementById("more-products");
const toggleProducts = document.getElementById("toggle-products");
const parallaxLayers = document.querySelectorAll(".parallax-layer");
const loader = document.getElementById("loader");
const soundButtons = document.querySelectorAll(".sfx-btn");

let audioLevel = 0.18;

// PARTICLES
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

// STARS
function createStars() {
  for (let i = 0; i < 45; i++) {
    const star = document.createElement("span");
    star.className = "star";
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.animationDuration = `${2 + Math.random() * 4}s`;
    star.style.animationDelay = `${Math.random() * 3}s`;
    star.style.opacity = `${0.2 + Math.random() * 0.8}`;
    starsContainer.appendChild(star);
  }
}

// MOUSE LIGHT
function updateMouseLight(x, y) {
  const xPercent = (x / window.innerWidth) * 100;
  const yPercent = (y / window.innerHeight) * 100;
  mouseLight.style.background = `radial-gradient(circle at ${xPercent}% ${yPercent}%, rgba(204,122,255,0.18), transparent 16%)`;
}

// CURSOR TRAIL
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

// PARALLAX
function handleScroll() {
  const scrollY = window.scrollY;
  parallaxLayers.forEach(layer => {
    const speed = parseFloat(layer.dataset.speed || "0");
    layer.style.transform = `translateY(${scrollY * speed}px)`;
  });
}

// AUDIO REACTIVE
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

// BUTTON SOUND
function playClickSound() {
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(480, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(260, audioContext.currentTime + 0.08);

    gainNode.gain.setValueAtTime(0.001, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.05, audioContext.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.12);

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.12);
  } catch (error) {
    console.log("Sound blocked by browser.");
  }
}

// LOADER
window.addEventListener("load", () => {
  setTimeout(() => {
    loader.classList.add("hidden");
  }, 2200);
});

// SHOW MORE PRODUCTS
toggleProducts.addEventListener("click", () => {
  moreProducts.classList.toggle("show");
  toggleProducts.textContent = moreProducts.classList.contains("show")
    ? "Show Less Products"
    : "View More Products";
});

// SOUND BUTTONS
soundButtons.forEach((btn) => {
  btn.addEventListener("click", playClickSound);
});

// EVENTS
window.addEventListener("mousemove", (e) => {
  updateMouseLight(e.clientX, e.clientY);
  addTrailDot(e.clientX, e.clientY);
});

window.addEventListener("scroll", handleScroll);

// INIT
createParticles();
createStars();
startAudioReactive();
handleScroll();
