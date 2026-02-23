const reviews = [
  { gradient: "grad1", label: "Animals" },
  { gradient: "grad2", label: "Geography" },
  { gradient: "grad3", label: "History" },
  { gradient: "grad4", label: "Entertainment" },
  { gradient: "grad5", label: "Space" },
  { gradient: "grad6", label: "Tech" },
  { gradient: "grad7", label: "Art" }
];

import { useState, useEffect } from "react";

const ROPE_PATH =
  "M 0,60 Q 250,140 500,140 Q 750,140 1000,60";

export default function HangingImages({ id }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const cardW = isMobile ? 220 : 150;
  const cardH = isMobile ? 240 : 160;
  const stringLen = 20;
  return (
    <>
      <section id={id}  >
        <div className="mt-9 mb-7">
          <div className="text-center  ">
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-bold text-gray-800">
              What Our Customers Say
            </h2>
            <p className="text-gray-500 mt-3">Trusted by businesses worldwide</p>
          </div>
          <div
            id={id}
            style={{
              width: "100%",

              overflow: "hidden",
              padding: "0px 0",
            }}
          >
            <svg
              viewBox="0 0 1000 360"
              preserveAspectRatio="xMidYMid meet"
              className="w-full h-auto "
            >
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f093fb" />
                  <stop offset="100%" stopColor="#f5576c" />
                </linearGradient>
                <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#5ee7df" />
                  <stop offset="100%" stopColor="#b490ca" />
                </linearGradient>
                <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#c3cfe2" />
                  <stop offset="100%" stopColor="#c3cfe2" />
                </linearGradient>
                <linearGradient id="grad4" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#667eea" />
                  <stop offset="100%" stopColor="#764ba2" />
                </linearGradient>
                <linearGradient id="grad5" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ff9a9e" />
                  <stop offset="100%" stopColor="#fecfef" />
                </linearGradient>
                <linearGradient id="grad6" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f6d365" />
                  <stop offset="100%" stopColor="#fda085" />
                </linearGradient>
                <linearGradient id="grad7" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#a1c4fd" />
                  <stop offset="100%" stopColor="#c2e9fb" />
                </linearGradient>
              </defs>
              {/* Rope */}
              <path
                id="ropePath"
                d={ROPE_PATH}
                stroke="#8B6914"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />

              {reviews.map((rev, i) => (
                <g key={i}>
                  <g>
                    {/* String */}
                    <line
                      x1="0"
                      y1="0"
                      x2="0"
                      y2={stringLen}
                      stroke="#8B6914"
                      strokeWidth="2"
                    />

                    {/* Green Pin */}
                    <circle cx="0" cy="0" r="6" fill="#22a553" />
                    <circle cx="0" cy="0" r="2.5" fill="#fff" />

                    {/* Card */}
                    <g transform={`translate(${-cardW / 2}, ${stringLen})`}>
                      <rect
                        width={cardW}
                        height={cardH}
                        rx="14"
                        fill="white"
                        stroke="#ddd"
                      />

                      <rect
                        x="8"
                        y="8"
                        width={cardW - 16}
                        height={cardH - 45}
                        rx="8"
                        fill={`url(#${rev.gradient})`}
                        opacity="0.8"
                      />

                      <text
                        x={cardW / 2}
                        y={cardH - 12}
                        textAnchor="middle"
                        fontSize="12"
                        fontWeight="bold"
                        fill="#222"
                      >
                        {rev.label}
                      </text>
                    </g>

                    {/* PERFECT Motion Along Rope */}
                    <animateMotion
                      dur="18s"
                      repeatCount="indefinite"
                      rotate="auto"
                      begin={`${i * 3}s`}
                    >
                      <mpath href="#ropePath" />
                    </animateMotion>
                  </g>
                </g>
              ))}
            </svg>
          </div>
        </div>
      </section>
    </>
  );
}
