:root{
  --bg:#050505;
  --bg-soft:#0a0712;
  --text:#ffffff;
  --muted:rgba(255,255,255,.7);
  --muted-2:rgba(255,255,255,.5);
  --border:rgba(255,255,255,.1);
  --purple:#cc7aff;
  --purple-dark:#8000ff;
  --green:#4ade80;
  --shadow:0 0 30px rgba(204,122,255,.12);
}

*{box-sizing:border-box}
html{scroll-behavior:smooth}
body{
  margin:0;
  font-family:"Inter",system-ui,sans-serif;
  background:#000;
  color:var(--text);
  overflow-x:hidden;
}
body::before{
  content:"";
  position:fixed;
  inset:0;
  pointer-events:none;
  opacity:.08;
  background-image:
    radial-gradient(circle at 20% 20%, rgba(255,255,255,.22) 0 1px, transparent 1px),
    radial-gradient(circle at 80% 30%, rgba(255,255,255,.18) 0 1px, transparent 1px),
    radial-gradient(circle at 50% 80%, rgba(255,255,255,.14) 0 1px, transparent 1px);
  background-size:120px 120px, 180px 180px, 140px 140px;
  mix-blend-mode:soft-light;
  animation:noiseShift 14s linear infinite;
}
body::after{
  content:"";
  position:fixed;
  inset:0;
  pointer-events:none;
  opacity:.06;
  background:repeating-linear-gradient(
    0deg,
    rgba(255,255,255,.03) 0px,
    rgba(255,255,255,.03) 1px,
    transparent 1px,
    transparent 3px
  );
  mix-blend-mode:overlay;
}
a{text-decoration:none;color:inherit}
button{font:inherit}
.container{width:min(1120px, calc(100% - 48px)); margin:0 auto}
.center{text-align:center}
.hidden{display:none !important}

.noise{
  position:fixed;
  inset:0;
  pointer-events:none;
  z-index:2;
  opacity:.05;
  background-image:repeating-radial-gradient(circle at 0 0, rgba(255,255,255,.08), rgba(255,255,255,.08) 1px, transparent 1px, transparent 4px);
  background-size:12px 12px;
  animation:noiseShift 9s linear infinite;
  mix-blend-mode:soft-light;
}

.navbar{
  position:fixed;
  top:0; left:0; right:0;
  z-index:50;
  border-bottom:1px solid var(--border);
  background:rgba(0,0,0,.72);
  backdrop-filter:blur(14px);
  transition:transform .7s ease, opacity .7s ease;
}
.navbar.hidden-nav{
  transform:translateY(-16px);
  opacity:0;
}
.nav-inner{
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding:16px 0;
}
.brand{
  display:flex;
  align-items:center;
  justify-content:center;
  min-width:112px;
  height:32px;
  padding:0 12px;
  border:1px solid var(--border);
  background:rgba(255,255,255,.05);
  border-radius:8px;
  font-size:12px;
  letter-spacing:.3em;
  font-weight:700;
  color:rgba(255,255,255,.82);
  box-shadow:0 0 18px rgba(204,122,255,.12);
}
.nav-links{
  display:flex;
  gap:24px;
  font-size:14px;
  color:rgba(255,255,255,.7);
}
.nav-links a{
  position:relative;
  transition:color .4s ease, text-shadow .4s ease;
}
.nav-links a:hover{
  color:var(--purple);
  text-shadow:0 0 10px rgba(204,122,255,.4);
}
.nav-links a::after{
  content:"";
  position:absolute;
  left:0;
  bottom:-4px;
  width:0%;
  height:2px;
  background:linear-gradient(90deg, var(--purple), var(--purple-dark));
  transition:width .4s cubic-bezier(.22,1,.36,1);
}
.nav-links a:hover::after{width:100%}

.hero{
  position:relative;
  overflow:hidden;
  padding:120px 0 56px;
  border-bottom:1px solid var(--border);
  background:linear-gradient(135deg, #050505 0%, #0a0712 45%, #050505 100%);
}
.hero-bg{
  position:absolute;
  border-radius:999px;
  filter:blur(72px);
  animation:pulseGlow 4s ease-in-out infinite;
}
.layer-one{
  width:380px;height:380px;left:40px;top:-90px;
  background:rgba(204,122,255,.32);
}
.layer-two{
  width:380px;height:380px;right:-40px;bottom:-60px;
  background:rgba(128,0,255,.25);
}
.layer-three{
  width:280px;height:280px;left:34%;top:28%;
  background:rgba(204,122,255,.16);
}
.hero-grid{
  position:relative;
  z-index:1;
  display:grid;
  grid-template-columns:1.05fr .95fr;
  gap:48px;
  align-items:center;
}
.pill{
  display:inline-flex;
  align-items:center;
  padding:6px 16px;
  border-radius:999px;
  border:1px solid var(--border);
  background:rgba(255,255,255,.05);
  font-size:12px;
  letter-spacing:.22em;
  text-transform:uppercase;
  color:rgba(255,255,255,.6);
  backdrop-filter:blur(8px);
}
.hero h1{
  margin:20px 0 0;
  font-size:clamp(42px, 7vw, 72px);
  line-height:1.05;
  font-weight:900;
}
.hero-sub{
  margin:22px 0 0;
  font-size:18px;
  color:var(--muted);
}
.hero-actions{
  margin-top:30px;
  display:flex;
  gap:16px;
  flex-wrap:wrap;
}
.btn{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  padding:14px 24px;
  border-radius:10px;
  border:1px solid rgba(255,255,255,.2);
  transition:transform .5s cubic-bezier(.22,1,.36,1), box-shadow .5s cubic-bezier(.22,1,.36,1), filter .5s;
  cursor:none;
}
.btn:hover{
  transform:translateY(-3px) scale(1.02);
  filter:brightness(1.06);
  box-shadow:0 0 24px rgba(204,122,255,.18);
}
.btn-primary{
  border:none;
  background:linear-gradient(90deg, var(--purple), var(--purple-dark));
  color:#fff;
}
.btn-secondary{
  background:rgba(255,255,255,.04);
  color:#fff;
}
.btn-small{
  margin-top:20px;
  padding:10px 16px;
  border-radius:8px;
  font-size:14px;
}
.hero-media{
  position:relative;
  aspect-ratio:16 / 9;
  overflow:hidden;
  border:1px solid var(--border);
  border-radius:10px;
  background:rgba(255,255,255,.05);
  backdrop-filter:blur(8px);
  box-shadow:0 0 60px rgba(128,0,255,.1);
}
.media-label{
  position:absolute;
  top:16px;
  left:16px;
  right:16px;
  z-index:2;
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding:6px 12px;
  border-radius:999px;
  border:1px solid var(--border);
  background:rgba(0,0,0,.35);
  font-size:10px;
  letter-spacing:.28em;
  text-transform:uppercase;
  color:rgba(255,255,255,.6);
  backdrop-filter:blur(8px);
}
.ui-plus{color:var(--purple)}
.hero-media iframe{
  width:100%;
  height:100%;
  border:0;
}

.section{
  padding:72px 0;
  position:relative;
}
.section h2{
  margin:0;
  font-size:clamp(28px, 4vw, 40px);
  font-weight:800;
}
.section-text{
  max-width:700px;
  margin-top:16px;
  color:var(--muted);
  line-height:1.7;
}
.section-head{
  display:flex;
  align-items:flex-end;
  justify-content:space-between;
  gap:20px;
  flex-wrap:wrap;
}

.card-grid{
  margin-top:32px;
  display:grid;
  grid-template-columns:repeat(3, minmax(0,1fr));
  gap:24px;
}
.card{
  --mx:50%;
  --my:50%;
  --px:0px;
  --py:0px;
  --px2:0px;
  --py2:0px;
  position:relative;
  overflow:hidden;
  padding:24px;
  border-radius:14px;
  border:1px solid var(--border);
  background:rgba(255,255,255,.05);
  transition:transform .7s cubic-bezier(.22,1,.36,1), box-shadow .7s cubic-bezier(.22,1,.36,1), border-color .7s ease;
}
.card::before{
  content:"";
  position:absolute;
  inset:0;
  background:radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,.12), transparent 45%);
  opacity:0;
  transition:opacity .4s ease;
  pointer-events:none;
}
.card:not(.no-light):hover::before,
.card.force-light:hover::before{
  opacity:1;
}
.card:hover{
  transform:translateY(-4px) scale(1.01);
  border-color:rgba(204,122,255,.25);
  box-shadow:var(--shadow);
}
.content-layer{
  position:relative;
  z-index:2;
}
.parallax{
  position:absolute;
  pointer-events:none;
  border-radius:999px;
  filter:blur(18px);
  opacity:.16;
  transition:transform .7s cubic-bezier(.22,1,.36,1), opacity .5s ease;
}
.parallax.one{
  width:96px;height:96px;right:-12px;top:-10px;
  background:radial-gradient(circle, rgba(204,122,255,.45), transparent 70%);
  transform:translate3d(var(--px), var(--py), 0);
}
.parallax.two{
  width:72px;height:72px;left:-10px;bottom:-10px;
  background:radial-gradient(circle, rgba(128,0,255,.34), transparent 70%);
  transform:translate3d(var(--px2), var(--py2), 0);
}
.card:hover .parallax{opacity:.24}
.card h3{
  margin:12px 0 0;
  font-size:24px;
}
.card p{
  margin:12px 0 0;
  color:var(--muted);
  line-height:1.7;
}
.tag{
  font-size:12px;
  font-weight:700;
}
.success{color:var(--green)}
.preview-box{
  margin-bottom:20px;
  aspect-ratio:1 / 1;
  display:flex;
  align-items:center;
  justify-content:center;
  border-radius:12px;
  border:1px solid var(--border);
  background:linear-gradient(135deg, rgba(255,255,255,.1), rgba(255,255,255,.05));
  color:rgba(255,255,255,.4);
}
.title-row{
  display:flex;
  justify-content:space-between;
  gap:16px;
  align-items:flex-start;
}
.price{
  color:var(--purple);
  font-size:14px;
  font-weight:700;
  white-space:nowrap;
}
.muted{
  font-size:14px;
  color:var(--muted-2) !important;
}
.social-card{
  text-align:center;
}
.footer{
  padding:40px 24px;
  border-top:1px solid var(--border);
  text-align:center;
  color:rgba(255,255,255,.6);
}

.reveal{
  opacity:0;
  transform:translateY(40px);
  filter:blur(8px);
  transition:opacity 1s ease, transform 1s ease, filter 1s ease;
}
.reveal.visible{
  opacity:1;
  transform:translateY(0);
  filter:blur(0);
}

.intro{
  position:fixed;
  inset:0;
  z-index:120;
  display:flex;
  align-items:center;
  justify-content:center;
  background:#000;
  transition:opacity .7s ease, visibility .7s ease;
}
.intro.hide{
  opacity:0;
  visibility:hidden;
}
.intro-bg{
  position:absolute;
  inset:0;
  background:
    radial-gradient(circle at center, rgba(204,122,255,.2), transparent 30%),
    linear-gradient(135deg, #040404 0%, #0d0716 45%, #040404 100%);
}
.intro-glow{
  position:absolute;
  width:18rem;height:18rem;
  border-radius:24px;
  background:rgba(204,122,255,.25);
  filter:blur(48px);
  animation:introPulse 2s ease-in-out infinite;
}
.intro-content{
  position:relative;
  z-index:1;
  display:flex;
  flex-direction:column;
  align-items:center;
  padding:0 24px;
  text-align:center;
}
.intro-content h1{
  margin:0;
  font-size:clamp(42px, 7vw, 72px);
  font-weight:900;
  letter-spacing:.18em;
  animation:introReveal .95s cubic-bezier(.22,1,.36,1) .15s both;
}
.intro-top{
  margin:0 0 12px;
  font-size:12px;
  text-transform:uppercase;
  letter-spacing:.45em;
  color:rgba(255,255,255,.45);
}
.intro-sub{
  margin:16px 0 0;
  font-size:16px;
  color:rgba(255,255,255,.6);
  animation:introReveal .9s ease-out .45s both;
}
.intro-line{
  width:180px;
  height:1px;
  margin-bottom:20px;
  background:linear-gradient(90deg, transparent, var(--purple), transparent);
  animation:introLine .8s ease-out .25s both;
}
.intro-line-bottom{
  margin:24px 0 0;
  background:linear-gradient(90deg, transparent, var(--purple-dark), transparent);
  animation-delay:.55s;
}

.custom-cursor{
  position:fixed;
  top:0; left:0;
  width:28px;height:28px;
  pointer-events:none;
  transform:translate(-50%, -50%);
  z-index:9999;
  transition:transform .16s ease, filter .16s ease;
}
.custom-cursor::before{
  content:"";
  position:absolute;
  left:1px; top:1px;
  width:0; height:0;
  border-left:10px solid #fff;
  border-top:15px solid transparent;
  border-bottom:7px solid transparent;
  filter:drop-shadow(0 0 6px rgba(204,122,255,.6)) drop-shadow(0 0 12px rgba(128,0,255,.4));
}
.custom-cursor::after{
  content:"";
  position:absolute;
  left:8px; top:12px;
  width:8px; height:2px;
  background:rgba(255,255,255,.92);
  transform:rotate(40deg);
  border-radius:2px;
  box-shadow:0 0 8px rgba(204,122,255,.4);
}
.custom-cursor.active{
  transform:translate(-50%, -50%) scale(1.15);
}
.cursor-trail{
  position:fixed;
  width:6px;height:6px;
  border-radius:50%;
  background:var(--purple);
  pointer-events:none;
  transform:translate(-50%, -50%);
  opacity:.6;
  z-index:9998;
}
.audio-orb{
  position:fixed;
  left:50%;
  top:32%;
  transform:translate(-50%, -50%);
  width:220px;height:220px;
  border-radius:50%;
  z-index:30;
  pointer-events:none;
  background:radial-gradient(circle, rgba(204,122,255,.10), rgba(128,0,255,.04) 50%, transparent 72%);
  filter:blur(18px);
  opacity:.18;
  transition:width .14s ease-out, height .14s ease-out, opacity .14s ease-out;
}
.audio-ring{
  position:fixed;
  left:50%;
  top:32%;
  transform:translate(-50%, -50%);
  width:180px;height:180px;
  border-radius:20px;
  z-index:35;
  pointer-events:none;
  border:1px solid rgba(204,122,255,.3);
  opacity:0;
  box-shadow:0 0 18px rgba(204,122,255,.12);
  transition:width .14s ease-out, height .14s ease-out, opacity .14s ease-out;
}
.eq-panel{
  position:fixed;
  left:24px; bottom:24px;
  z-index:100;
  display:flex;
  align-items:flex-end;
  gap:10px;
  padding:12px 16px;
  border-radius:14px;
  border:1px solid var(--border);
  background:rgba(0,0,0,.4);
  backdrop-filter:blur(12px);
  box-shadow:0 0 30px rgba(128,0,255,.14);
  animation:panelFloat 4s ease-in-out infinite;
}
.eq-panel span{
  width:6px;
  height:18px;
  border-radius:999px;
  transform-origin:bottom;
  background:linear-gradient(to top, var(--purple-dark), var(--purple));
  opacity:.55;
  animation:equalizerJump 1s ease-in-out infinite;
}
.eq-panel span:nth-child(2){height:28px; animation-duration:1.07s}
.eq-panel span:nth-child(3){height:38px; animation-duration:1.14s}
.eq-panel span:nth-child(4){height:48px; animation-duration:1.21s}
.eq-panel span:nth-child(5){height:18px; animation-duration:1.28s}
.eq-panel span:nth-child(6){height:28px; animation-duration:1.35s}
.eq-panel span:nth-child(7){height:38px; animation-duration:1.42s}
.eq-panel span:nth-child(8){height:48px; animation-duration:1.49s}
.sound-toggle{
  position:fixed;
  right:24px; bottom:24px;
  z-index:100;
  padding:10px 16px;
  border-radius:12px;
  border:1px solid rgba(255,255,255,.2);
  color:#fff;
  background:rgba(255,255,255,.05);
  backdrop-filter:blur(12px);
  transition:transform .5s cubic-bezier(.22,1,.36,1), box-shadow .5s cubic-bezier(.22,1,.36,1), filter .5s;
  cursor:none;
}
.sound-toggle:hover{
  transform:translateY(-3px) scale(1.02);
  filter:brightness(1.06);
  box-shadow:0 0 24px rgba(204,122,255,.18);
}

@keyframes noiseShift{
  0%{transform:translate3d(0,0,0)}
  25%{transform:translate3d(-1.5%,1%,0)}
  50%{transform:translate3d(1%,-1.5%,0)}
  75%{transform:translate3d(1.5%,1%,0)}
  100%{transform:translate3d(0,0,0)}
}
@keyframes pulseGlow{
  0%,100%{transform:scale(.98)}
  50%{transform:scale(1.04)}
}
@keyframes introPulse{
  0%,100%{transform:scale(.96); opacity:.7}
  50%{transform:scale(1.05); opacity:1}
}
@keyframes introReveal{
  0%{opacity:0; transform:translateY(18px) scale(.96); letter-spacing:.4em}
  35%{opacity:1}
  100%{opacity:1; transform:translateY(0) scale(1); letter-spacing:.18em}
}
@keyframes introLine{
  0%{width:0; opacity:0}
  100%{width:180px; opacity:1}
}
@keyframes equalizerJump{
  0%,100%{transform:scaleY(.35); opacity:.45}
  50%{transform:scaleY(1); opacity:1}
}
@keyframes panelFloat{
  0%,100%{transform:translateY(0)}
  50%{transform:translateY(-4px)}
}

@media (max-width: 960px){
  .hero-grid,
  .card-grid{
    grid-template-columns:1fr;
  }
}
@media (max-width: 768px){
  .container{width:min(1120px, calc(100% - 32px))}
  .nav-inner{flex-direction:column; gap:14px}
  .nav-links{gap:16px; flex-wrap:wrap; justify-content:center}
  .eq-panel{display:none}
  .custom-cursor, .cursor-trail{display:none}
  .btn, .sound-toggle{cursor:pointer}
  body *{cursor:auto !important}
}
