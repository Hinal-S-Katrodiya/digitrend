import { Fullscreen } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// ─── Brand data ──────────────────────────────────────────────────────────────
const BRANDS = [
  {
    id: "inkspire",
    bg: "#fff",
    border: "#b5411a",
    label: "Inkspire\nTattoo",
    emoji: "🌹",
    textColor: "#1a1a1a",
  },
  {
    id: "ancestral",
    bg: "#fffce8",
    border: "#c49a2a",
    label: "Ancestral\nHouse",
    emoji: "🏠",
    textColor: "#5c3d11",
  },
  {
    id: "greenden",
    bg: "#edf7ee",
    border: "#2e7d32",
    label: "Greenden\nGym",
    emoji: "💪",
    textColor: "#1b5e20",
  },
  {
    id: "kinography",
    bg: "#fafafa",
    border: "#aaaaaa",
    label: "Kinography",
    emoji: null,
    textColor: "#888",
    script: true,
  },
  {
    id: "vartawolf",
    bg: "#fffbe6",
    border: "#e6b800",
    label: "Varta\nWolf",
    emoji: "🐺",
    textColor: "#7a5c00",
    highlight: true,
  },
  {
    id: "beast",
    bg: "#f5f0ff",
    border: "#7c3aed",
    label: null,
    emoji: "🐉",
    textColor: "#4c1d95",
  },
  {
    id: "studio",
    bg: "#fff0f6",
    border: "#d63384",
    label: "Studio\nBloom",
    emoji: "🌸",
    textColor: "#9b1a52",
  },
  {
    id: "apexlabs",
    bg: "#eff6ff",
    border: "#1d4ed8",
    label: "Apex\nLabs",
    emoji: "⚡",
    textColor: "#1e3a8a",
  },
  {
    id: "terra",
    bg: "#fdf6ee",
    border: "#92400e",
    label: "Terra\nRoots",
    emoji: "🌿",
    textColor: "#78350f",
  },
  {
    id: "nova",
    bg: "#111",
    border: "#f97316",
    label: "Nova\nWorks",
    emoji: "🚀",
    textColor: "#f97316",
  },
];

// ─── Snake / wave parameters ─────────────────────────────────────────────────
// The snake path: items are evenly spaced along a sine curve.
// As the whole thing scrolls left, each item's x determines its y via sin(x).
const SPACING   = 148;   // px between item centres along x-axis
const AMPLITUDE = 100;   // px half-height of the snake
const WAVELENGTH = 750;  // px for one full S-curve cycle (lower = tighter snake)
const SPEED     = 0.9;   // px per frame
const BASE_SIZE = 80;    // px – size at the trough
const PEAK_SIZE = 118;   // px – size at the crest (biggest)
const HEIGHT    = 320;   // container height

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
        // world-x scrolls left
        const wx = baseX - offsetRef.current;

        // Wrap x into view: keep items cycling seamlessly
        // The display x is wx mod-shifted so items re-enter from the right
        let dx = wx % totalW;
        if (dx < -SPACING) dx += totalW;

        const screenX = dx;

        // Snake y: sine of screen position
        const sineVal = Math.sin((screenX / WAVELENGTH) * Math.PI * 2);   // -1..1
        const y = centerY + sineVal * AMPLITUDE;

        // Size: biggest at crest (sineVal=1), smallest at trough (sineVal=-1)
        const t    = (sineVal + 1) / 2;   // 0..1
        const size = BASE_SIZE + t * (PEAK_SIZE - BASE_SIZE);

        // Rotation follows the slope of the sine curve (tangent angle)
        const dydx = Math.cos((screenX / WAVELENGTH) * Math.PI * 2) * (Math.PI * 2 / WAVELENGTH) * AMPLITUDE;
        const angle = Math.atan(dydx) * (180 / Math.PI) * 0.55; // soften a bit

        // Opacity: a touch dim at trough
        const opacity = 0.65 + t * 0.35;

        // z-index: items at crest appear in front
        const zIndex = Math.round(t * 20) + 1;

        if (screenX < -(size + 10) || screenX > cw + size + 10) {
          node.style.visibility = "hidden";
        } else {
          node.style.visibility = "visible";
          node.style.width    = `${size}px`;
          node.style.height   = `${size}px`;
          node.style.transform = `translate(${screenX - size / 2}px, ${y - size / 2}px) rotate(${angle}deg)`;
          node.style.zIndex   = zIndex;
          node.style.opacity  = opacity;
        }
      });

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [cw]);

  // Build enough copies to fill screen × 2
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
        width: Fullscreen,
        background: "#f2ede7",
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
          backgroundSize: "24px 24px",
          opacity: 0.35,
        }}
      />

      {/* heading */}
      <p style={{
        margin: 0, padding: "28px 0 4px",
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

        {/* left fade */}
        <div style={{
          position: "absolute", left: 0, top: 0, width: 90, height: "100%",
          background: "linear-gradient(to right, #f2ede7, transparent)",
          zIndex: 25, pointerEvents: "none",
        }} />
        {/* right fade */}
        <div style={{
          position: "absolute", right: 0, top: 0, width: 90, height: "100%",
          background: "linear-gradient(to left, #f2ede7, transparent)",
          zIndex: 25, pointerEvents: "none",
        }} />
      </div>

     
    </div>
  );
}

// ── Individual brand card ──────────────────────────────────────────────────────
function BrandCard({ item }) {
  const isScript = item.script;
  const isHighlight = item.highlight;

  return (
    <div
      className="snake-item"
      data-base={item.base}
      style={{
        position: "absolute",
        top: 0, left: 0,
        width: BASE_SIZE,
        height: BASE_SIZE,
        visibility: "hidden",
        willChange: "transform, width, height",
        // rounded square — like the video
        borderRadius: "18px",
        border: `2.5px solid ${item.border}`,
        background: item.bg,
        boxShadow: "0 4px 18px rgba(0,0,0,0.13), 0 1px 4px rgba(0,0,0,0.08)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 6,
        boxSizing: "border-box",
        overflow: "hidden",
        gap: 2,
        // highlight items get a yellow/glow bg (like in the video)
        ...(isHighlight ? { background: "#ffe740", border: "2.5px solid #d4a000" } : {}),
      }}
    >
      {item.emoji && (
        <span style={{ fontSize: "calc(var(--sz, 30px))", lineHeight: 1, display: "block" }}>
          {item.emoji}
        </span>
      )}
      {item.label && (
        <span
          style={{
            fontFamily: isScript
              ? "'Brush Script MT', cursive"
              : "Georgia, serif",
            fontSize: isScript ? 13 : 8.5,
            fontWeight: isScript ? 400 : 700,
            color: isHighlight ? "#7a5c00" : item.textColor,
            textAlign: "center",
            lineHeight: 1.25,
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
