import { useEffect, useRef, useState } from "react";

// ─── Brand data ──────────────────────────────────────────────────────────────
const BRANDS = [
  {
    id: "inkspire",
    bg: "white",
    border: "#b5411a",
    label: "Inkspire\nTattoo",
    emoji: "🌹",
    textColor: "black",
  },
  {
    id: "ancestral",
    bg: "white",
    border: "#c49a2a",
    label: "Ancestral\nHouse",
    emoji: "🏠",
    textColor: "#5c3d11",
  },
  {
    id: "greenden",
    bg: "white",
    border: "#2e7d32",
    label: "Greenden\nGym",
    emoji: "💪",
    textColor: "#1b5e20",
  },
  {
    id: "kinography",
    bg: "white",
    border: "#aaaaaa",
    label: "Kinography",
    emoji: null,
    textColor: "#888",
    script: true,
  },
  
  {
    id: "beast",
    bg: "white",
    border: "#7c3aed",
    label: null,
    emoji: "🐉",
    textColor: "#4c1d95",
  },
  {
    id: "studio",
   bg: "white",
    border: "#d63384",
    label: "Studio\nBloom",
    emoji: "🌸",
    textColor: "#9b1a52",
  },
  {
    id: "apexlabs",
    bg: "white",
    border: "#1d4ed8",
    label: "Apex\nLabs",
    emoji: "⚡",
    textColor: "#1e3a8a",
  },
  {
    id: "terra",
    bg: "white",
    border: "#92400e",
    label: "Terra\nRoots",
    emoji: "🌿",
    textColor: "#78350f",
  },
  {
    id: "nova",
    bg: "white",
    border: "#f97316",
    label: "Nova\nWorks",
    emoji: "🚀",
    textColor: "#f97316",
  },
];

// ─── Snake / wave parameters ─────────────────────────────────────────────────
// Horizontal cylinder: wide & short (pill lying on its side)
const CARD_W    = 128;   // px – wide  (the cylinder's length)
const CARD_H    = 80;    // px – short (the cylinder's diameter)
const SPACING   = 128; // no gap — spacing == card width
const AMPLITUDE = 100;
const WAVELENGTH = 750;
const SPEED     = 0.9;
const BASE_SIZE = 80;
const PEAK_SIZE = 118;
const HEIGHT    = 300;

export default function SpiralBrands() {
  const containerRef = useRef(null);
  const offsetRef    = useRef(0);
  const rafRef       = useRef(null);
  const [cw, setCw]  = useState(1000);

  // Resize observer
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    setCw(el.offsetWidth);
    const ro = new ResizeObserver(([e]) => setCw(e.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Animation loop
  useEffect(() => {
    const totalW = BRANDS.length * SPACING;
    const centerY = HEIGHT / 2;

    function tick() {
      offsetRef.current = (offsetRef.current + SPEED) % totalW;
      const container = containerRef.current;
      if (!container) { rafRef.current = requestAnimationFrame(tick); return; }

      const nodes = container.querySelectorAll(".snake-item");
      nodes.forEach((node) => {
        const baseX = parseFloat(node.dataset.base);
        const wx = baseX - offsetRef.current;

        // let dx = wx % totalW;
        // if (dx < -SPACING) dx += totalW;
          let dx = wx;

while (dx < -SPACING) dx += totalW;
while (dx > totalW) dx -= totalW;

        const screenX = dx;

        const sineVal = Math.sin((screenX / WAVELENGTH) * Math.PI * 2);
        const y = centerY + sineVal * AMPLITUDE;

        const t = 0.3;
        const size = BASE_SIZE + t * (PEAK_SIZE - BASE_SIZE);
        const scale = size / BASE_SIZE;

        const w = CARD_W * scale;
        const h = CARD_H * scale;

        const dydx = Math.cos((screenX / WAVELENGTH) * Math.PI * 2) * (Math.PI * 2 / WAVELENGTH) * AMPLITUDE;
        const angle = Math.atan(dydx) * (180 / Math.PI) * 0.55;

        const opacity = 0.65 + t * 0.35;
        const zIndex = Math.round(t * 20) + 1;

        if (screenX < -(w + 10) || screenX > cw + w + 10) {
          node.style.visibility = "hidden";
        } else {
          node.style.visibility = "visible";
          node.style.width    = `${w}px`;
          node.style.height   = `${h}px`;
          node.style.transform = `translate(${screenX - w / 2}px, ${y - h / 2}px) rotate(${angle}deg)`;
          node.style.zIndex   = zIndex;
          node.style.opacity  = opacity;
        }
      });

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [cw]);

  const totalW  = BRANDS.length * SPACING;
  const copies  = Math.ceil((cw * 2.5) / totalW) + 2;
  const allItems = [];
  for (let c = 0; c < copies; c++) {
    BRANDS.forEach((b, i) => {
      allItems.push({ ...b, uid: `${c}-${i}`, base: c * totalW + i * SPACING });
    });
  }

  return (
    <div
      style={{
        width: "100%",
        background: "white",
        position: "relative",
        overflow: "hidden",
        userSelect: "none",
      }}
    >
      {/* dot-grid texture */}
      <div
        style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "radial-gradient(#bbb 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          opacity: 0.35,
        }}
      />

      {/* heading */}
      <p style={{
        margin: 0, padding: "28px 0 4px 8px",
        textAlign: "center",
        fontFamily: "Georgia, serif",
        fontSize: 11,
        letterSpacing: 5,
        color: "#a89880",
        textTransform: "uppercase",
        position: "relative", zIndex: 30,
      }}>
        Trusted Partners
      </p>

      {/* ── snake container ── */}
      <div
        ref={containerRef}
        style={{
          position: "relative",
          width: "100%",
          height: HEIGHT,
          overflow: "hidden",
        }}
      >
        {allItems.map((item) => (
          <BrandCard key={item.uid} item={item} />
        ))}
      </div>
    </div>
  );
}

// ── Individual brand card ──────────────────────────────────────────────────────
function BrandCard({ item }) {
  const isScript = item.script;
  const isHighlight = item.highlight;

  const baseBg = isHighlight ? "white" : "white";
  const baseBorder = isHighlight ? "white" :"white";

  return (
    <div
      className="snake-item"
      data-base={item.base}
      style={{
        position: "absolute",
        top: 0, left: 0,
        width: CARD_W,
        height: CARD_H,
        visibility: "hidden",
        // ── Horizontal cylinder: pill shape lying on its side ──
        // Use CARD_H as the borderRadius value — creates perfect semicircle end caps
        borderRadius: `${CARD_H}px`,
       // border: `2.5px solid ${baseBorder}`,
        backgroundColor: baseBg,
        // Top-to-bottom gradient = horizontal cylinder shading
        // Bright top highlight, dark bottom shadow → looks like a tube viewed from the front
        backgroundImage: `linear-gradient(
          to bottom,
          rgba(255,255,255,0.62) 0%,
          rgba(255,255,255,0.18) 5%,
          transparent 0%,
          rgba(0,0,0,0.10) 74%,
          rgba(0,0,0,0.26) 100%
        )`,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 14px",
        boxSizing: "border-box",
        overflow: "hidden",
        gap: 6,
      }}
    >
      {item.emoji && (
        <span style={{ fontSize: 20, lineHeight: 1, display: "block", flexShrink: 0 }}>
          {item.emoji}
        </span>
      )}
      {item.label && (
        <span
          style={{
            fontFamily: isScript
              ? "'Brush Script MT', cursive"
              : "Georgia, serif",
            fontSize: isScript ? 11 : 7.5,
            fontWeight: isScript ? 400 : 700,
            color: isHighlight ? "#000" : item.textColor,
            textAlign: "left",
            lineHeight: 1.3,
            whiteSpace: "pre-line",
            letterSpacing: isScript ? 0.5 : 0.8,
          }}
        >
          {item.label}
        </span>
      )}
    </div>
  );
}
