"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";

const PROJECTS = [
  {
    id: 1,
    title: "BlackBox",
    category: "WORDPRESS",
    image:
      "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "RxGStudios",
    category: "FRAMER",
    image:
      "https://images.unsplash.com/photo-1542744094-24638eff58bb?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "MyPlayful",
    category: "SHOPIFY",
    image:
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "HoonNaturals",
    category: "WORDPRESS",
    image:
      "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Probize",
    category: "UI/UX",
    image:
      "https://images.unsplash.com/photo-1542744094-24638eff58bb?q=80&w=1000&auto=format&fit=crop",
  },
];

export default function OurWork() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 50,
  });

  const rotateY = useTransform(smooth, [0, 1], [0, -280]);

  const yMove = useTransform(smooth, [0, 1], [0, -180]);

  return (
    <div
      ref={containerRef}
      className="relative h-[120vh] bg-white"
    >
      <div className=" sticky text-5xl md:text-7xl font-semibold text-gray-900 text-center ">Our Best Work</div>
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        <div
          className="relative w-full h-full flex items-center justify-center"
          style={{ perspective: "1200px" }}
        >
          <motion.div
            style={{
              rotateY,
              y: yMove,
              transformStyle: "preserve-3d",
            }}
            className="relative w-0 h-0"
          >
            {PROJECTS.map((project, index) => {
              const angle =
                (360 / PROJECTS.length) * index;

              // Smaller vertical spacing
              const totalHeight =
                (PROJECTS.length - 1) * 80;

              const vertical =
                index * 80 - totalHeight / 2;

              return (
                <div
                  key={project.id}
                  className="absolute"
                  style={{
                    transform: `
                      rotateY(${angle}deg)
                      translateY(${vertical}px)
                    `,
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div
                    className="w-[260px] h-[260px] rounded-xl overflow-hidden shadow-xl"
                    style={{
                      transform: "translateZ(360px)", // 🔥 reduced radius
                      backfaceVisibility: "hidden",
                    }}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />

                    <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-white text-center p-4">
                      <p className="text-[10px] tracking-widest mb-1 opacity-80">
                        {project.category}
                      </p>
                      <h3 className="text-lg font-bold">
                        {project.title}
                      </h3>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </div>
  );
}