"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Hero = () => {
  const [stage, setStage] = useState(0);
  const [pillText, setPillText] = useState("");
  const [subText, setSubText] = useState("");

  const stages = [
    { id: "logo", duration: 2000 },
    { id: "empowering", duration: 2000 },
    { id: "with", duration: 800 },
    { id: "pill-1", duration: 1500, pill: "AI platforms", sub: "adapt." },
    { id: "pill-2", duration: 1500, pill: "AI platforms", sub: "accelerate." },
    { id: "pill-3", duration: 1500, pill: "AI platforms", sub: "scale." },
    { id: "pill-4", duration: 1500, pill: "AI solutions", sub: "consulting-led." },
    { id: "pill-5", duration: 1500, pill: "AI solutions", sub: "industry-focused." },
    { id: "pill-6", duration: 1500, pill: "DiGi-Trend: innovation network", sub: "co-innovate." },
    { id: "pill-7", duration: 1500, pill: "DiGi-Trend: innovation network", sub: "reimagine." },
    { id: "lead", duration: 2000 },
    { id: "final", duration: 3000 }
  ];

  useEffect(() => {
    const currentStage = stages[stage];

    if (currentStage.pill) {
      setPillText(currentStage.pill);
      setSubText(currentStage.sub);
    }

    const timer = setTimeout(() => {
      setStage((prev) => (prev + 1) % stages.length);
    }, currentStage.duration);

    return () => clearTimeout(timer);
  }, [stage]);

  const current = stages[stage].id;

  const Dots = ({ size = "w-6 h-6 sm:w-10 sm:h-10 md:w-16 md:h-16 lg:w-20 lg:h-20" }) => (
    <div className={`relative ${size}`}>
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="absolute w-[15%] h-[15%] rounded-full"
          style={{
            backgroundColor: ["#2E1A47", "#5CB85C", "#3498DB", "#2C3E50", "#E91E63", "#FF9800", "#FFC107"][i],
            top: "50%",
            left: "50%",
            transform: `rotate(${i * 51.4}deg) translate(250%) rotate(-${i * 51.4}deg)`,
          }}
        />
      ))}
    </div>
  );

  return (
    <div id="hero" className="relative w-full min-h-screen flex items-center justify-center  overflow-x-hidden px- sm:px-3 text-center">

      <AnimatePresence mode="wait">

        {/* Logo Intro */}
        {current === "logo" && (
          <motion.div
            key="logo"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            <span className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-[#2E1A47] tracking-tight">
              DiGi Trend
            </span>
            <Dots />
            <span
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #5CB85C, #3498DB, #2C3E50, #E91E63, #FF9800, #FFC107)",
              }}
            >
              intelligence
            </span>
          </motion.div>
        )}

        {/* Empowering */}
        {current === "empowering" && (
          <motion.h1
            key="empowering"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-2xl sm:text-4xl md:text-6xl font-light break-words"
          >
            empowering enterprises
          </motion.h1>
        )}

        {/* With */}
        {current === "with" && (
          <motion.span
            key="with"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-2xl sm:text-4xl text-gray-400 italic"
          >
            with
          </motion.span>
        )}

        {/* Pill Section */}
        {current.startsWith("pill-") && (
          <motion.div
            key="pill"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-6 w-full max-w-3xl"
          >
            <span className="text-2xl sm:text-4xl text-gray-400 italic">
              with
            </span>

            <div
              className="relative px-6 sm:px-10 md:px-14 lg:px-20 py-4 sm:py-8 md:py-10 rounded-full w-full max-w-[90vw] mx-auto"
              style={{
                background:
                  "linear-gradient(white, white) padding-box, linear-gradient(90deg, #5CB85C, #3498DB, #E91E63, #FF9800) border-box",
                border: "3px solid transparent",
              }}
            >
              <motion.div
                key={pillText}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-lg sm:text-2xl md:text-4xl lg:text-5xl font-bold break-words leading-tight"
              >
                {pillText}
              </motion.div>
            </div>

            <motion.div
              key={subText}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-lg sm:text-2xl text-gray-500"
            >
              {subText}
            </motion.div>
          </motion.div>
        )}

        {/* Lead */}
        {current === "lead" && (
          <motion.h1
            key="lead"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-2xl sm:text-4xl md:text-6xl font-bold break-words"
          >
            to lead in an AI-first world.
          </motion.h1>
        )}

        {/* Final */}
        {current === "final" && (
          <motion.div
            key="final"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col md:flex-row items-center justify-center gap-4 px-2"
          >
            <span className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-[#2E1A47]">
              DiGi Trend
            </span>
            <Dots size="w-10 h-10 sm:w-14 sm:h-14 md:w-20 md:h-20" />
            <span className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-light text-[#2E1A47]">
              intelligence
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Blur */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-50/40 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-purple-50/40 rounded-full blur-[120px] -z-10" />
    </div>
  );
};

export default Hero;
