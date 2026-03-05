"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function Third() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const line1 = "Websites that Sells & ";
  const line2 = "Ads that Convert";

  const itemVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const dotPattern = {
    backgroundImage:
      "radial-gradient(circle, rgba(0,0,0,1) 0.5px, transparent 0.5px)",
    backgroundSize: "15px 15px",
  };

  return (
    <div className="relative min-h-screen w-full bg-white flex items-center justify-center overflow-hidden font-sans">
      {/* Background */}
      <div className="absolute inset-0 opacity-30" style={dotPattern} />

      {/* =================== BUBBLES =================== */}

      {/* Bubble 1 - Timeless */}
      <motion.div
        animate={{ y: [0, -30, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{    
          clipPath:
            "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
        }}
        className="absolute top-10 left-10 sm:top-84 md:top-64 md:left-46 w-24 h-24 md:w-38 md:h-38 bg-gradient-to-br from-indigo-500/60 to-blue-400/40 backdrop-blur-3xl border border-white/40 shadow-2xl flex items-center justify-center text-white font-semibold md:text-2xl "
      >
        Timeless
      </motion.div>

      {/* Bubble 2 - Creative */}
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 6, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 right-10 md:bottom-50 md:right-120 w-24 h-24 md:w-38 md:h-38
        bg-gradient-to-br from-pink-500/60 to-purple-500/40
        backdrop-blur-3xl border border-white/40 shadow-2xl
        flex items-center justify-center text-white font-semibold text-lg md:text-2xl
        rounded-[40%_60%_45%_55%/50%_40%_60%_50%]"
      >
        Creative
      </motion.div>

      {/* Bubble 3 - Edgy */}
      <motion.div
        animate={{ y: [0, -15, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 -translate-y-1/2 right-10 sm:top-24 md:top-1/3 md:right-40 w-20 h-20  md:w-32 md:h-32 flex items-center justify-center"
      >
        <svg viewBox="0 0 200 200" className="w-full h-full">
          {(() => {
            const cx = 100,
              cy = 100;
            const outerR = 95,
              innerR = 55;
            const spikes = 18;
            let points = "";
            for (let i = 0; i < spikes; i++) {
              const outerAngle = (Math.PI * 2 * i) / spikes - Math.PI / 2;
              const innerAngle =
                (Math.PI * 2 * (i + 0.5)) / spikes - Math.PI / 2;
              points += `${cx + outerR * Math.cos(outerAngle)},${cy + outerR * Math.sin(outerAngle)} `;
              points += `${cx + innerR * Math.cos(innerAngle)},${cy + innerR * Math.sin(innerAngle)} `;
            }
            return (
              <polygon
                points={points.trim()}
                fill="#F4E6C8"
                stroke="#F2C94C"
                strokeWidth="5"
                strokeLinejoin="miter"
              />
            );
          })()}
          <text
            x="50%"
            y="52%"
            textAnchor="middle"
            dominantBaseline="middle"
            transform="rotate(-12 100 100)"
            className="fill-black font-bold text-[18px]"
          >
            Edgy
          </text>
        </svg>
      </motion.div>

      {/* =================== CONTENT =================== */}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center text-center px-4 w-full max-w-7xl"
      >
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-black/20 bg-black/5 backdrop-blur-md mb-12"
        >
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-sm text-black font-medium ">
            Get ready to level up your digital presence 🚀
          </span>
        </motion.div>

        <motion.h1 variants={itemVariants}>
          <div
            className="font-oswald
  font-normal
  uppercase
  text-center md:text-left
  leading-[100%]
  tracking-tight md:tracking-[-13px]
  text-6xl sm:text-8xl md:text-9xl lg:text-[130px]
  scale-y-110 md:scale-y-140
  
   text-blue-900"
          >
            We Create
          </div>

        </motion.h1>



        <motion.h1 className="text-gray-800 md:ml-8 mt-5 mb-5 text-center pt-1.5 text-3xl sm:text-5xl md:text-6xl font-semibold leading-[95%] px-4">
          {[line1, line2].map((line, lineIndex) => (
            <div key={lineIndex}>
              {line.split("").map((letter, index) => (
                <span key={index} className="inline-block">
                  {letter === " " ? "\u00A0" : letter}
                </span>
              ))}
            </div>
          ))}
        </motion.h1>

        <motion.button
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group relative flex items-center gap-2 px-8 py-4 border border-black/20 rounded-xl text-black font-medium overflow-hidden transition-all hover:border-blue-500"
        >
          <div className="absolute inset-0 bg-black/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          <span className="relative z-10">Let's Talk</span>
          <ArrowUpRight className="size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </motion.button>
      </motion.div>
    </div>
  );
}
