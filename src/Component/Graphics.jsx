import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

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
    return { width: 220, gap: 18, height: 380, containerHeight: 520 }; // Increased Desktop Height

  const w = window.innerWidth;
  if (w < 640) return { width: 140, gap: 12, height: 260, containerHeight: 330 }; // Increased Mobile Height
  if (w < 1024) return { width: 180, gap: 15, height: 320, containerHeight: 420 }; // Increased Tablet Height
  return { width: 220, gap: 18, height: 380, containerHeight: 520 }; // Increased Desktop Height
};

const AUTO_SCROLL_SPEED = 1.5;

function CurvedImageScroll() {
  const containerRef = useRef(null);
  const isDragging = useRef(false); // Ref to track if the user is currently dragging
  const [containerWidth, setContainerWidth] = useState(0);
  const [dims, setDims] = useState(getCardDimensions());

  const { width: CARD_WIDTH, gap: CARD_GAP, containerHeight: CONTAINER_HEIGHT } = dims;
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
      // Only auto-scroll if the user is not actively dragging
      if (!isDragging.current) {
        let next = scrollX.get() + AUTO_SCROLL_SPEED;

        // Jump back seamlessly when we've scrolled past the second set
        if (next >= 2 * singleSetWidth) {
          next -= singleSetWidth; 
        }

        scrollX.set(next);
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [scrollX, singleSetWidth]);

  // Handle Drag/Swipe functionality
  const handlePanStart = () => {
    isDragging.current = true;
  };

  const handlePanEnd = () => {
    isDragging.current = false;
  };

  const handlePan = (e, info) => {
    let next = scrollX.get() - info.delta.x;

    // Handle seamless looping in both directions when dragging manually
    if (next >= 2 * singleSetWidth) {
      next -= singleSetWidth;
    } else if (next <= 0) {
      next += singleSetWidth;
    }

    scrollX.set(next);
  };

  return (
    <>
      <div className="mt-30 bg-white pt-10">
        {/* Updated heading to Deep Navy to match Enterprise Trust theme */}
        <h1 className="text-5xl md:text-7xl font-bold text-[#0F172A] text-center mb-6 tracking-tight">
          Design to Stare
        </h1>

        {/* Updated paragraph to cool Slate Gray */}
        <p className="text-[#334155] text-center max-w-3xl mx-auto mb-10 text-lg">
          We create the most stunning graphic designs for your social media,
          websites, branding, or literally anything.
        </p>
      </div>

      <div className="w-full overflow-hidden pb-16 select-none bg-white">
        <div
          ref={containerRef}
          className="relative w-full overflow-hidden"
          style={{ height: CONTAINER_HEIGHT, perspective: "1000px" }}
        >
          <motion.div
            className="flex items-center absolute left-0 top-0 h-full cursor-grab active:cursor-grabbing touch-pan-y"
            style={{
              x: useTransform(scrollX, (v) => -v),
              transformStyle: "preserve-3d",
            }}
            onPanStart={handlePanStart}
            onPanEnd={handlePanEnd}
            onPan={handlePan}
          >
            {allMedia.map((item, i) => (
              <MediaCard
                key={i}
                item={item}
                index={i}
                scrollX={scrollX}
                containerWidth={containerWidth}
                dims={dims}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </>
  );
}

function MediaCard({ item, index, scrollX, containerWidth, dims }) {
  const { width: CARD_WIDTH, gap: CARD_GAP, height: CARD_HEIGHT } = dims;
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
      className="flex-shrink-0 overflow-hidden shadow-2xl relative bg-gray-100"
      style={{
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        rotateY,
        translateZ,
        scale,
        opacity,
        borderRadius,
        marginRight: CARD_GAP,
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