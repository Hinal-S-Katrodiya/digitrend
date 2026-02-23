import React from "react";

export default function Client({ id }) {
  return (
    <section id={id} className="bg-white py-20 px-6 md:px-16">
      {/* ================== BIG HEADING ================== */}
      <div className="relative max-w-6xl mx-auto mb-20 md:mb-28">
        <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-[120px] leading-[0.9] font-bold text-black tracking-tight text-center">
          Clients talk <br /> & we blush
        </h1>

        {/* Transparent Yellow Sticker */}
        <div className="absolute top-[-30px] right-[10%] md:top-0 md:right-[20%] lg:right-[30%] rotate-[-15deg] z-10 pointer-events-none">
          <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 opacity-90">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <polygon
                points="
                100,5 115,40 150,15 130,55 180,50
                145,85 195,100 145,115 180,150
                130,145 150,185 115,160 100,195
                85,160 50,185 70,145 20,150
                55,115 5,100 55,85 20,50
                70,55 50,15 85,40
                "
                fill="#f4d94f"
              />
              <text
                x="50%"
                y="52%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="font-bold text-[20px] fill-black"
              >
                Testimonials
              </text>
            </svg>
          </div>
        </div>
      </div>

      {/* ================== TESTIMONIAL CARD ================== */}

      <div className="max-w-2xl mx-auto relative">
        {/* Yellow Card (Smaller Now) */}
        <div className="bg-[#f4d96f] border-t-2 border-l-2 border-r-2 border-b-1  border-black rounded-t-3xl p-8">
          <p className="text-black font-bold text-lg md:text-[22px] leading-[1.6]">
            “Boundaryz didn’t just build us a website — they built an
            experience. Every scroll, every click felt like it belonged to our
            brand. No boring templates, no fluff — just clean, bold, custom work
            that actually converts. From the first wireframe to the final
            launch, the process was fast, chill, and sharp. Couldn’t have asked
            for a better team to bring Vanta Wolf online.”
          </p>

          {/* Author */}
        </div>
        <div>
          <div className="mt-0 flex items-center bg-[#e7e5dd] gap-4 rounded-b-2xl border-l-2 border-r-2 border-b-2">
            <div className="w-14 h-14 rounded-full  flex items-center justify-center bg-">
              <span className="text-xl">🦁</span>
            </div>

            <p className="font-semibold text-black text-base">
              Co-Founder, Vanta Wolf
            </p>
          </div>
        </div>

        {/* Speech Bubble Label (Top Left Corner) */}
        <div className="absolute -top-12 left-4 md:left-6 bg-[#e7e5dd] px-4 md:px-6 py-2 md:py-3 rounded-full font-semibold text-black text-sm md:text-base shadow-sm">
          Suchitra Puthran Says...
          <div className="absolute left-6 -bottom-2 w-4 h-4 bg-[#e7e5dd] rotate-45"></div>
        </div>
      </div>
    </section>
  );
}
