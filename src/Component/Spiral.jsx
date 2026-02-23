import { useRef, useState, useEffect } from "react";

// ─── Brand data ─────────────────────────────────────────────
const BRANDS = [
  { id: "inkspire", label: "Inkspire\nTattoo", emoji: "🌹", textColor: "black" },
  { id: "ancestral", label: "Ancestral\nHouse", emoji: "🏠", textColor: "#5c3d11" },
  { id: "greenden", label: "Greenden\nGym", emoji: "💪", textColor: "#1b5e20" },
  { id: "kinography", label: "Kinography", emoji: "🎥", textColor: "#888" },
  { id: "beast", label: "Beast\nMode", emoji: "🐉", textColor: "#4c1d95" },
  { id: "studio", label: "Studio\nBloom", emoji: "🌸", textColor: "#9b1a52" },
  { id: "apexlabs", label: "Apex\nLabs", emoji: "⚡", textColor: "#1e3a8a" },
  { id: "terra", label: "Terra\nRoots", emoji: "🌿", textColor: "#78350f" },
  { id: "nova", label: "Nova\nWorks", emoji: "🚀", textColor: "#f97316" },
];

const SPEED = 1;        // Snake speed
const AMPLITUDE = 60;   // Wave height
const WAVELENGTH = 600; // Wave density

export default function SpiralBrands({ id }) {
  const containerRef = useRef(null);
  const offsetRef = useRef(0);
  const rafRef = useRef(null);

  const [dims, setDims] = useState({
    cardW: 160,
    cardH: 90,
  });

  // ─── Responsive sizing ────────────────────────────────────
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      let cardW = 160;
      let cardH = 90;

      if (w < 640) {
        cardW = 110;
        cardH = 65;
      } else if (w < 1024) {
        cardW = 140;
        cardH = 80;
      }

      setDims({ cardW, cardH });
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // ─── Perfect Infinite Animation ───────────────────────────
  useEffect(() => {
    const totalItems = BRANDS.length * 3; // 🔥 3 sets
    const totalW = totalItems * dims.cardW;
    const centerY = (dims.cardH * 3) / 2;

    function tick() {
      offsetRef.current += SPEED;

      const el = containerRef.current;
      if (!el) return;

      const items = el.querySelectorAll(".sarpakar-item");

      items.forEach((node) => {
        const index = parseFloat(node.dataset.index);

        let x = index * dims.cardW - offsetRef.current;

        // 🔥 Perfect seamless wrap
        while (x < -dims.cardW) x += totalW;
        while (x >= totalW - dims.cardW) x -= totalW;

        const rad = (x / WAVELENGTH) * Math.PI * 2;
        const y = centerY + Math.sin(rad) * AMPLITUDE;

        const slope =
          (Math.cos(rad) * AMPLITUDE * (Math.PI * 2)) /
          WAVELENGTH;
        const angle = Math.atan(slope) * (180 / Math.PI);

        node.style.transform = `translate(${x}px, ${
          y - dims.cardH / 2
        }px) rotate(${angle}deg)`;
      });

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [dims]);

  return (
    <div
      id={id}
      className="w-full relative overflow-hidden py-16 select-none"
      style={{ backgroundColor: "white" }}
    >
      {/* Background Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.5]"
        style={{
          backgroundImage: `
            radial-gradient(circle, #e8e1d5 1.5px, transparent 1.5px),
            radial-gradient(circle, #e8e1d5 1.5px, transparent 1.5px)
          `,
          backgroundPosition: "0 0, 10px 10px",
          backgroundSize: "20px 20px",
        }}
      />

      <div className="text-center mb-10 relative z-10 px-4">
        <p className="text-[24px] md:text-[30px] tracking-[0.4em] uppercase text-gray-400 mb-2">
          Trusted Partners
        </p>
      </div>

      <div
        ref={containerRef}
        className="relative w-full"
        style={{ height: dims.cardH * 3 }}
      >
        {/* 🔥 3 Sets Rendered */}
        {[...BRANDS, ...BRANDS, ...BRANDS].map((brand, i) => (
          <BrandCard
            key={`${brand.id}-${i}`}
            brand={brand}
            index={i}
            dims={dims}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Brand Card ─────────────────────────────────────────────
function BrandCard({ brand, index, dims }) {
  return (
    <div
      className="sarpakar-item absolute top-0 left-0 flex items-center justify-center bg-white shadow-sm"
      data-index={index}
      style={{
        width: dims.cardW,
        height: dims.cardH,
        borderRadius: dims.cardH,
        boxSizing: "border-box",
        willChange: "transform",
      }}
    >
      <div className="flex items-center gap-2">
        {brand.emoji && (
          <span className="text-xl md:text-2xl">{brand.emoji}</span>
        )}
        <span
          className="text-[9px] md:text-[11px] font-bold uppercase tracking-widest leading-none"
          style={{ color: brand.textColor }}
        >
          {brand.label}
        </span>
      </div>
    </div>
  );
}