import React from "react";

export default function OurWork() {
  const orbitImages = [
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-black overflow-hidden">
      <div className="relative w-[500px] h-[500px] flex items-center justify-center">

        {/* Rotating Orbit Ring */}
        <div className="absolute w-[400px] h-[400px] rounded-full border border-white/20 animate-spin-slow" />

        {/* Orbit Images Container */}
        <div className="absolute w-[400px] h-[400px] animate-spin-slow">

          {orbitImages.map((img, index) => {
            const angle = (360 / orbitImages.length) * index;
            return (
              <img
                key={index}
                src={img}
                alt="orbit"
                className="absolute w-20 h-20 rounded-full object-cover border-2 border-white shadow-xl"
                style={{
                  transform: `rotate(${angle}deg) translate(180px) rotate(-${angle}deg)`
                }}
              />
            );
          })}

        </div>

        {/* Center Image */}
        <img
          src="https://images.unsplash.com/photo-1518779578993-ec3579fee39f"
          alt="center"
          className="w-40 h-40 rounded-full object-cover z-10 border-4 border-white shadow-2xl"
        />
      </div>

      {/* Custom Style */}
      <style>
        {`
          .animate-spin-slow {
            animation: spin 20s linear infinite;
          }

          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}
