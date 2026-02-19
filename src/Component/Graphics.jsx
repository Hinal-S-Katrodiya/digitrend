import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const IMAGES = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=800&fit=crop",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=800&fit=crop",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&h=800&fit=crop",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=800&fit=crop",
  "https://images.unsplash.com/photo-1518173946687-a1e0e2a4e99c?w=600&h=800&fit=crop",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=800&fit=crop",
  "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&h=800&fit=crop",
  "https://images.unsplash.com/photo-1494500764479-0c8f2919a3d8?w=600&h=800&fit=crop",
  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=600&h=800&fit=crop",
  "https://images.unsplash.com/photo-1465056836900-8f1e4e0c1307?w=600&h=800&fit=crop",
  "https://images.unsplash.com/photo-1500534314263-e9a743e3b76a?w=600&h=800&fit=crop",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&h=800&fit=crop",
];

const CARD_WIDTH = 220;
const CARD_GAP = 18;
const CARD_TOTAL = CARD_WIDTH + CARD_GAP;
const SETS = 5; // repeat images this many times for infinite feel

function CurvedImageScroll() {
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const scrollX = useMotionValue(0);
  const springX = useSpring(scrollX, { damping: 30, stiffness: 200, mass: 0.5 });
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startScroll = useRef(0);

  const allImages = Array.from({ length: SETS }, () => IMAGES).flat();
  const singleSetWidth = IMAGES.length * CARD_TOTAL;

  useEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Start in the middle set so we can scroll both directions
  useEffect(() => {
    if (containerWidth > 0) {
      const middleSet = Math.floor(SETS / 2);
      scrollX.set(middleSet * singleSetWidth);
    }
  }, [containerWidth, singleSetWidth, scrollX]);

  // Infinite loop: when we scroll too far left or right, jump to the middle set
  useEffect(() => {
    const unsubscribe = scrollX.on("change", (v) => {
      const minBound = singleSetWidth * 0.5;
      const maxBound = singleSetWidth * (SETS - 1.5);
      const middleOffset = Math.floor(SETS / 2) * singleSetWidth;

      if (v < minBound) {
        const diff = v - minBound;
        scrollX.jump(middleOffset + diff);
      } else if (v > maxBound) {
        const diff = v - maxBound;
        scrollX.jump(middleOffset + diff);
      }
    });
    return unsubscribe;
  }, [scrollX, singleSetWidth]);

  const handleWheel = useCallback(
    (e) => {
      e.preventDefault();
      const delta = e.deltaX || e.deltaY;
      if (delta <= 0) return;
      const current = scrollX.get();
      scrollX.set(current + delta);
    },
    [scrollX]
  );

  const handlePointerDown = useCallback(
    (e) => {
      isDragging.current = true;
      startX.current = e.clientX;
      startScroll.current = scrollX.get();
      e.currentTarget.setPointerCapture(e.pointerId);
    },
    [scrollX]
  );

  const handlePointerMove = useCallback(
    (e) => {
      if (!isDragging.current) return;
      const diff = startX.current - e.clientX;
      if (diff <= 0) return;
      scrollX.set(startScroll.current + diff);
    },
    [scrollX]
  );

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  return (
    <>
      <div className="mt-30">
          <h1 className="text-5xl md:text-7xl font-semibold text-gray-900 text-center mb-6">
        Design to Stare
      </h1>

      <p className="text-gray-500 text-center max-w-3xl ml-70 mb-10 text-lg">
        We create the most stunning graphic designs for your social media,
        websites, branding, or literally anything. They are just mind-blowing.
      </p>
      </div>
    <div className="w-full overflow-hidden pb-16 select-none" style={{ touchAction: "none" }}>
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden cursor-grab active:cursor-grabbing"
        onWheel={handleWheel}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{ height: 460 }}
      >
        <motion.div
          className="flex items-center absolute left-0 top-0 h-full"
          style={{
            x: useTransform(springX, (v) => -v),
            gap: CARD_GAP,
          }}
        >
          {allImages.map((src, i) => (
            <ImageCard
              key={i}
              src={src}
              index={i}
              scrollX={springX}
              containerWidth={containerWidth}
            />
          ))}
        </motion.div>
      </div>
      </div>
      </>
  );
}

function ImageCard({ src, index, scrollX, containerWidth }) {
  const cardCenter = index * CARD_TOTAL + CARD_WIDTH / 2;

  // Side images are big (1.1), center image is small (0.75)
  const scale = useTransform(scrollX, (sv) => {
    const viewCenter = sv + containerWidth / 2;
    const dist = Math.abs(cardCenter - viewCenter);
    const maxDist = containerWidth / 2;
    const normalized = Math.min(dist / maxDist, 1);
    return 0.75 + normalized * 0.35;
  });

  const y = useTransform(scrollX, () => 0);

  // Depth effect: center has less opacity, sides are fully visible
  const opacity = useTransform(scrollX, (sv) => {
    const viewCenter = sv + containerWidth / 2;
    const dist = Math.abs(cardCenter - viewCenter);
    const maxDist = containerWidth / 2;
    const normalized = Math.min(dist / maxDist, 1);
    return 0.6 + normalized * 0.4;
  });

  const borderRadius = useTransform(scrollX, (sv) => {
    const viewCenter = sv + containerWidth / 2;
    const dist = Math.abs(cardCenter - viewCenter);
    const maxDist = containerWidth / 2;
    const normalized = Math.min(dist / maxDist, 1);
    const radius = 12 + (1 - normalized) * 16;
    return `${radius}px`;
  });

  return (
    <motion.div
      className="flex-shrink-0 overflow-hidden shadow-lg"
      style={{
        width: CARD_WIDTH,
        height: 320,
        scale,
        y,
        opacity,
        borderRadius,
        transformOrigin: "center center",
      }}
    >
      <img
        src={src}
        alt=""
        className="w-full h-full object-cover pointer-events-none"
        draggable={false}
      />
    </motion.div>
  );
}

export default CurvedImageScroll;
