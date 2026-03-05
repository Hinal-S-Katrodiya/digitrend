import { useRef, useState, useEffect } from "react";

// ─── Brand data ─────────────────────────────────────────────
// Changed all text colors to Deep Navy (#0F172A) for the Enterprise Trust theme
const BRANDS = [
  { id: "inkspire", label: "Inkspire\nTattoo", emoji: "🌹", textColor: "#0F172A" },
  { id: "ancestral", label: "Ancestral\nHouse", emoji: "🏠", textColor: "#0F172A" },
  { id: "greenden", label: "Greenden\nGym", emoji: "💪", textColor: "#0F172A" },
  { id: "kinography", label: "Kinography", emoji: "🎥", textColor: "#0F172A" },
  { id: "beast", label: "Beast\nMode", emoji: "🐉", textColor: "#0F172A" },
  { id: "studio", label: "Studio\nBloom", emoji: "🌸", textColor: "#0F172A" },
  { id: "apexlabs", label: "Apex\nLabs", emoji: "⚡", textColor: "#0F172A" },
  { id: "terra", label: "Terra\nRoots", emoji: "🌿", textColor: "#0F172A" },
  { id: "nova", label: "Nova\nWorks", emoji: "🚀", textColor: "#0F172A" },
];

const SPEED = .8;        // Snake speed
const AMPLITUDE = 60;   // Wave height
const WAVELENGTH = 600; // Wave density

export default function SpiralBrands({ id }) {
  const containerRef = useRef(null);
  const offsetRef = useRef(0);
  const rafRef = useRef(null);

  // Increased default card size for desktop
  const [dims, setDims] = useState({
    cardW: 200, 
    cardH: 100, 
  });

  // ─── Responsive sizing ────────────────────────────────────
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      // Increased base sizes
      let cardW = 200; 
      let cardH = 100;

      if (w < 640) {
        cardW = 140; // Increased mobile width
        cardH = 75;  // Increased mobile height
      } else if (w < 1024) {
        cardW = 170; // Increased tablet width
        cardH = 85;  // Increased tablet height
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
      className="w-full relative overflow-hidden py-16 select-none bg-white"
    >
      {/* Background Pattern - Changed dots to a cool slate gray for tech vibe */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.5]"
        style={{
          backgroundImage: `
            radial-gradient(circle, #E2E8F0 1.5px, transparent 1.5px),
            radial-gradient(circle, #E2E8F0 1.5px, transparent 1.5px)
          `,
          backgroundPosition: "0 0, 10px 10px",
          backgroundSize: "20px 20px",
        }}
      />

      <div className="text-center mb-10 relative z-10 px-4">
        {/* Changed heading text color to Deep Navy */}
        <p className="text-[24px] md:text-[30px] tracking-[0.4em] uppercase text-[#0F172A] font-bold mb-2">
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
      className="sarpakar-item absolute top-0 left-0 flex items-center justify-center bg-white shadow-md border border-gray-100"
      data-index={index}
      style={{
        width: dims.cardW,
        height: dims.cardH,
        borderRadius: dims.cardH,
        boxSizing: "border-box",
        willChange: "transform",
      }}
    >
      <div className="flex items-center gap-3">
        {brand.emoji && (
          <span className="text-2xl md:text-3xl">{brand.emoji}</span>
        )}
        <span
          className="text-[10px] md:text-[12px] font-bold uppercase tracking-widest leading-snug whitespace-pre-line"
          style={{ color: brand.textColor }}
        >
          {brand.label}
        </span>
      </div>
    </div>
  );
}