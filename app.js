// --- CSS Meter Scroll Tracker -----------------------------------------------
// Spec-exact conversion: 1 CSS px = 0.0254 / 96 meters
const CSS_M_PER_PX = 0.0254 / 96;

const nf = new Intl.NumberFormat("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

function createHud() {
  const el = document.createElement("div");
  el.id = "scroll-meter";
  Object.assign(el.style, {
    all: "initial",
    position: "fixed",
    bottom: "30px",
    left: "50%",
    transform: "translateX(-50%)",
    padding: "10px 20px",
    backgroundColor: "#000",
    borderRadius: "20px",
    color: "#fff",
    fontFamily: "Arial, Helvetica, sans-serif",
    fontSize: "16px",
    boxShadow:
      "rgba(0,0,0,.07) 0 1px 1px, rgba(0,0,0,.07) 0 2px 2px, rgba(0,0,0,.07) 0 4px 4px, rgba(0,0,0,.07) 0 8px 8px, rgba(0,0,0,.07) 0 16px 16px",
    zIndex: "2147483647",
    whiteSpace: "nowrap",
    width: "fit-content",
    pointerEvents: "none",     // don't block clicks
    opacity: "0",              // fade-in on first render
    transition: "opacity .25s ease"
  });
  el.textContent = "0,00 m";
  document.body.appendChild(el);
  return el;
}

const hud = createHud();

// --- State -------------------------------------------------------------------
let lastY = window.scrollY;
let totalM = 0; 
let rafPending = false;
let fadeTimer = null;

// --- Render ------------------------------------------------------------------
function render() {
  const val = totalM;
  hud.textContent = `${nf.format(val)} m`;
  hud.style.opacity = "1";
  // auto fade after inactivity
  clearTimeout(fadeTimer);
  fadeTimer = setTimeout(() => (hud.style.opacity = "0.3"), 1500);
}

// --- Scroll handling (accumulate absolute pixel deltas) ----------------------
function onScroll() {
  if (rafPending) return;
  rafPending = true;
  requestAnimationFrame(() => { // requestAnimationFrame = run before next repaint, smoother UI
    const y = window.scrollY;
    const dyPx = Math.abs(y - lastY); // count both directions as distance
    lastY = y;

    if (dyPx > 0) {
      totalM += dyPx * CSS_M_PER_PX;
      render();
    }
    rafPending = false;
  });
}

// passive:true = hint: this handler will not call preventDefault, improves scroll perf
window.addEventListener("scroll", onScroll, { passive: true });
render();
