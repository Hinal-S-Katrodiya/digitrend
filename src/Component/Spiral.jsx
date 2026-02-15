import { useEffect, useRef, useState, useMemo } from "react";

// ─── Brand data ──────────────────────────────────────────────────────────────
const BRANDS_DATA = [
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
const SPACING = 148;   // px between item centres along x-axis
const AMPLITUDE = 100;   // px half-height of the snake
const WAVELENGTH = 750;  // px for one full S-curve cycle
const SPEED = 0.9;   // px per frame
const BASE_SIZE = 80;    // px – size at the trough
const PEAK_SIZE = 118;   // px – size at the crest
const HEIGHT = 320;   // container height

export default function SpiralBrands() {
  const containerRef = useRef(null);
  const offsetRef = useRef(0);
  const rafRef = useRef(null);
  const [cw, setCw] = useState(1000); // Container width

  // 1. Resize Observer to track screen width
  useEffect(() => {
    const updateWidth = () => {
      // We use innerWidth to ensure we capture the full screen size
      setCw(window.innerWidth);
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // 2. Prepare the Extended List
  // We repeat the brands list until it is definitely wider than the screen.
  // This ensures the "wrap around" point happens off-screen, fixing the gap.
  const extendedBrands = useMemo(() => {
    // If width is 0 (initial load), just return basic list
    if (cw === 0) return BRANDS_DATA;

    let currentList = [...BRANDS_DATA];
    // Calculate total width of one set
    const singleSetWidth = BRANDS_DATA.length * SPACING;

    // We want the total track to be at least (Screen Width + 1 extra set buffer)
    // This guarantees we never see the "seam"
    const minRequiredWidth = cw + singleSetWidth;

    while ((currentList.length * SPACING) < minRequiredWidth) {
      currentList = [...currentList, ...BRANDS_DATA];
    }

    // Assign unique IDs and base positions
    return currentList.map((item, index) => ({
      ...item,
      uniqueId: `${item.id}-${index}`, // Unique key for React
      baseX: index * SPACING             // The "natural" position in the long line
    }));
  }, [cw]);


  // 3. Animation loop
  useEffect(() => {
    // The "Cycle Width" is now the width of our entire extended list
    const totalW = extendedBrands.length * SPACING;
    const centerY = HEIGHT / 2;

    function tick() {
      offsetRef.current = (offsetRef.current + SPEED);

      // Reset the offset to 0 when we've scrolled past the entire length
      // to prevent floating point errors over very long times
      if (offsetRef.current >= totalW) {
        offsetRef.current -= totalW;
      }

      const container = containerRef.current;
      if (!container) { rafRef.current = requestAnimationFrame(tick); return; }

      const nodes = container.querySelectorAll(".snake-item");
      nodes.forEach((node, i) => {
        // We rely on the index to get data, because DOM order matches array order
        const brandData = extendedBrands[i];
        if (!brandData) return;

        const baseX = brandData.baseX;

        // Calculate raw position: (Item Base Position) - (Global Scroll Amount)
        let wx = baseX - offsetRef.current;

        // ─── WRAPPING LOGIC ───
        // If the item has moved too far left (off screen), move it to the end of the line.
        // But since we created a HUGE list, we simply rely on the Modulo logic 
        // relative to the total width to keep them cycling.

        // Actually, with the "Extended List" approach, we just need to wrap 
        // the global position relative to the TOTAL width.
        // We used: `let dx = wx % totalW`.

        let dx = wx % totalW;
        if (dx < -SPACING) {
          dx += totalW;
        }

        // However, because we made the list wider than the screen, 
        // we don't need complex individual wrapping. We just let them slide.
        // The modulo above handles the "infinite" feel.

        const screenX = dx;

        // Optimization: Skip calculations for items well off-screen
        if (screenX < -(PEAK_SIZE + 50) || screenX > cw + (PEAK_SIZE + 50)) {
          node.style.visibility = "hidden";
          return;
        }

        // ─── VISUAL CALCULATIONS (Sine Wave) ───
        const sineVal = Math.sin((screenX / WAVELENGTH) * Math.PI * 2);
        const y = centerY + sineVal * AMPLITUDE;

        const t = (sineVal + 1) / 2;
        const size = BASE_SIZE + t * (PEAK_SIZE - BASE_SIZE);

        const dydx = Math.cos((screenX / WAVELENGTH) * Math.PI * 2) * (Math.PI * 2 / WAVELENGTH) * AMPLITUDE;
        const angle = Math.atan(dydx) * (180 / Math.PI) * 0.55;

        const opacity = 0.65 + t * 0.35;
        const zIndex = Math.round(t * 20) + 1;

        node.style.visibility = "visible";
        node.style.width = `${size}px`;
        node.style.height = `${size}px`;
        node.style.transform = `translate(${screenX - size / 2}px, ${y - size / 2}px) rotate(${angle}deg)`;
        node.style.zIndex = zIndex;
        node.style.opacity = opacity;
      });

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [extendedBrands, cw]); // Re-bind animation when brand list is rebuilt

  return (
    <div
      style={{
        // ─── FULL SCREEN FIX ───
        width: "100vw",          // Force width to be Viewport Width
        position: "relative",    // Needed for positioning context
        left: "50%",             // Move center to middle of parent
        marginLeft: "-50vw",     // Pull back by half viewport width to align with screen edge

        background: "#f2ede7",
        overflow: "hidden",      // Hide anything that spills out
        userSelect: "none",
        boxSizing: "border-box", // Ensure padding doesn't add width
      }}
    >
      {/* Texture Overlay */}
      <div
        style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "radial-gradient(#bbb 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          opacity: 0.35,
        }}
      />

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

      {/* Snake Container */}
      <div
        ref={containerRef}
        style={{
          position: "relative",
          width: "100%",
          height: HEIGHT,
          // Removed overflow:hidden here because parent handles it, 
          // but keeping it doesn't hurt.
        }}
      >
        {extendedBrands.map((item) => (
          <BrandCard key={item.uniqueId} item={item} />
        ))}

        {/* Left Fade Gradient */}
        <div style={{
          position: "absolute", left: 0, top: 0, width: 90, height: "100%",
          background: "linear-gradient(to right, #f2ede7, transparent)",
          zIndex: 25, pointerEvents: "none",
        }} />

        {/* Right Fade Gradient */}
        <div style={{
          position: "absolute", right: 0, top: 0, width: 90, height: "100%",
          background: "linear-gradient(to left, #f2ede7, transparent)",
          zIndex: 25, pointerEvents: "none",
        }} />
      </div>
    </div>
  );
}

// ─── Individual brand card (No Changes) ──────────────────────────────────────
function BrandCard({ item }) {
  const isScript = item.script;
  const isHighlight = item.highlight;

  return (
    <div
      className="snake-item"
      // data-base is critical for the logic to find the initial position
      data-base={item.baseX}
      style={{
        position: "absolute",
        top: 0, left: 0,
        width: BASE_SIZE,
        height: BASE_SIZE,
        visibility: "hidden",
        willChange: "transform, width, height",
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