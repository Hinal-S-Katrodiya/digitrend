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
      "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?q=80&w=1000&auto=format&fit=crop",
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
    damping: 30,
    mass: 1,
  });

  // Rotates the ring 360 degrees as you scroll
  const rotateY = useTransform(smooth, [0, 1], [0, -360]);

  // Radius of the ring (distance from center).
  // Increase this if cards overlap too much.
  const RADIUS = 550;

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-white">
      {/* Sticky container that holds the scene */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

        {/* 3D Scene Wrapper */}
        <div
          className="relative flex items-center justify-center"
          style={{
            perspective: "1200px",
            // Tilted slightly down to see the 3D effect better (optional)
            perspectiveOrigin: "50% -100px"
          }}
        >
          <motion.div
            style={{
              rotateY,
              transformStyle: "preserve-3d",
            }}
            className="relative w-0 h-0 flex items-center justify-center"
          >
            {PROJECTS.map((project, index) => {
              const count = PROJECTS.length;
              const angle = (360 / count) * index;

              return (
                <div
                  key={project.id}
                  className="absolute"
                  style={{
                    // Rotate the card to its angle, then push it out by RADIUS
                    transform: `rotateY(${angle}deg) translateZ(${RADIUS}px)`,
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* Card Content */}
                  {/* -translate-x-1/2 centers the card on its anchor point */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[450px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/20 hover:bg-black/40 transition-colors duration-300 flex flex-col items-center justify-center text-white text-center p-6">
                      <p className="text-xs font-bold tracking-[0.2em] mb-2 uppercase opacity-90">
                        {project.category}
                      </p>
                      <h3 className="text-3xl font-bold tracking-tight">
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