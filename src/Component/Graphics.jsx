import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const MEDIA = [
  { type: "image", url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=800&fit=crop" },
  { type: "video", url: "https://vjs.zencdn.net/v/oceans.mp4" },
  { type: "image", url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=800&fit=crop" },
  { type: "video", url: "https://vjs.zencdn.net/v/oceans.mp4" },
  { type: "image", url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&h=800&fit=crop" },
  { type: "video", url: "https://vjs.zencdn.net/v/oceans.mp4" },
  { type: "image", url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=800&fit=crop" },
  { type: "video", url: "https://vjs.zencdn.net/v/oceans.mp4" },
  { type: "image", url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=800&fit=crop" },
  { type: "video", url: "https://vjs.zencdn.net/v/oceans.mp4" },
];

const getCardDimensions = () => {
  if (typeof window === "undefined")
    return { width: 220, gap: 18, height: 320, containerHeight: 460 };

  const w = window.innerWidth;
  if (w < 640) return { width: 140, gap: 12, height: 200, containerHeight: 250 };
  if (w < 1024) return { width: 180, gap: 15, height: 260, containerHeight: 380 };
  return { width: 220, gap: 18, height: 320, containerHeight: 460 };
};

const AUTO_SCROLL_SPEED = 1.5;

function CurvedImageScroll() {
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [dims, setDims] = useState(getCardDimensions());

  const { width: CARD_WIDTH, gap: CARD_GAP, height: CARD_HEIGHT, containerHeight: CONTAINER_HEIGHT } = dims;
  const CARD_TOTAL = CARD_WIDTH + CARD_GAP;

  useEffect(() => {
    const update = () => {
      setDims(getCardDimensions());
    };
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const scrollX = useMotionValue(0);

  const allMedia = [...MEDIA, ...MEDIA, ...MEDIA];
  const singleSetWidth = MEDIA.length * CARD_TOTAL;

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

  // Continuous Auto Scroll (Seamless Infinite)
  useEffect(() => {
    let raf;
    const tick = () => {
      // Linear increment for perfect smoothness
      let next = scrollX.get() + AUTO_SCROLL_SPEED;

      // Jump back seamlessly when we've scrolled past the second set
      // This ensures the middle set is always the "active" one, providing seamless looping.
      if (next >= 2 * singleSetWidth) {
        next -= singleSetWidth; // Jump back by one full set
      }

      scrollX.set(next);
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [scrollX, singleSetWidth]);

  return (
    <>
      <div className="mt-30">
        <h1 className="text-5xl md:text-7xl font-semibold text-gray-900 text-center mb-6">
          Design to Stare
        </h1>

        <p className="text-gray-500 text-center max-w-3xl mx-auto mb-10 text-lg">
          We create the most stunning graphic designs for your social media,
          websites, branding, or literally anything.
        </p>
      </div>

      <div className="w-full overflow-hidden pb-16 select-none">
        <div
          ref={containerRef}
          className="relative w-full overflow-hidden"
          style={{ height: CONTAINER_HEIGHT, perspective: "1000px" }}
        >
          <motion.div
            className="flex items-center absolute left-0 top-0 h-full"
            style={{
              x: useTransform(scrollX, (v) => -v),
              transformStyle: "preserve-3d",
            }}
          >
            {allMedia.map((item, i) => (
              <MediaCard
                key={i}
                item={item}
                index={i}
                scrollX={scrollX}
                containerWidth={containerWidth}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </>
  );
}

function MediaCard({ item, index, scrollX, containerWidth }) {
  const CARD_WIDTH = getCardDimensions().width;
  const CARD_GAP = getCardDimensions().gap;
  const CARD_TOTAL = CARD_WIDTH + CARD_GAP;
  const cardCenter = index * CARD_TOTAL + CARD_WIDTH / 2;

  const getNormalizedX = (sv) => {
    const viewCenter = sv + containerWidth / 2;
    return (cardCenter - viewCenter) / (containerWidth / 2);
  };

  const rotateY = useTransform(scrollX, (sv) => {
    const nx = getNormalizedX(sv);
    return nx * -25;
  });

  const translateZ = useTransform(scrollX, (sv) => {
    const nx = getNormalizedX(sv);
    return (1 - Math.abs(nx)) * -350;
  });

  const scale = useTransform(scrollX, (sv) => {
    const nx = getNormalizedX(sv);
    return 0.85 + Math.abs(nx) * 0.15;
  });

  const opacity = useTransform(scrollX, (sv) => {
    const nx = getNormalizedX(sv);
    return 1 - Math.min(Math.abs(nx) * 0.4, 0.4);
  });

  const borderRadius = useTransform(scrollX, (sv) => {
    const nx = getNormalizedX(sv);
    const radius = 12 + (1 - Math.abs(nx)) * 16;
    return `${radius}px`;
  });

  return (
    <motion.div
      className="flex-shrink-0 overflow-hidden shadow-2xl relative"
      style={{
        width: getCardDimensions().width,
        height: getCardDimensions().height,
        rotateY,
        translateZ,
        scale,
        opacity,
        borderRadius,
        marginRight: getCardDimensions().gap,
        transformStyle: "preserve-3d",
      }}
    >
      {item.type === "video" ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover pointer-events-none"
        >
          <source src={item.url} type="video/mp4" />
        </video>
      ) : (
        <img
          src={item.url}
          alt=""
          className="w-full h-full object-cover pointer-events-none"
          draggable={false}
        />
      )}
    </motion.div>
  );
}

export default CurvedImageScroll;