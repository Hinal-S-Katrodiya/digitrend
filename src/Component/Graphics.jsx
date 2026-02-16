//fixing this part right now

import React from "react";

export default function DesignShowcase() {
  const images = [
    "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9",
    "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
    "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
    "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2",
    "https://images.unsplash.com/photo-1556228720-195a672e8a03",
    "https://images.unsplash.com/photo-1542831371-29b0f74f9713",
    "https://images.unsplash.com/photo-1511920170033-f8396924c348",
  ];

  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col items-center justify-center py-20 overflow-hidden relative">

      {/* Background Decorative Blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[500px] bg-teal-200/20 blur-[120px] rounded-full pointer-events-none" />

      {/* Pill Badge */}
      <div className="mb-8 px-4 py-1.5 rounded-full bg-white border border-teal-100 shadow-sm flex items-center gap-2 z-10">
        <span className="text-teal-500 text-sm">✨</span>
        <span className="text-teal-600 text-sm font-semibold tracking-wide uppercase">Graphics</span>
      </div>

      {/* Heading */}
      <h1 className="text-5xl md:text-7xl font-bold text-gray-900 text-center mb-6 tracking-tight z-10 font-magic">
        Design to Stare
      </h1>

      <p className="text-gray-500 text-center max-w-2xl mb-20 text-lg md:text-xl px-4 z-10 leading-relaxed">
        We create the most stunning graphic designs for your social media,
        websites, branding, or literally anything. They are just mind-blowing.
      </p>

      {/* 3D Container - Panoramic Curve */}
      <div
        className="flex items-center justify-center w-full z-10 h-[500px]" // Added specific height to container
        style={{ perspective: "1000px" }}
      >
        <div
          className="flex items-center justify-center relative w-full h-full"
          style={{ transformStyle: "preserve-3d" }} // CRITICAL FIX for 3D effect
        >

          {/* LOGIC FIXED:
             - Increased translateX spacing (e.g., 380px instead of 260px) to stop overlapping.
             - Added 'isCenter' logic to highlight the middle card.
          */}

          {/* LEFT OUTER */}
          <Card
            img={images[0]}
            transform="translateX(-700px) translateZ(50px) rotateY(80deg)"
            z="10"
          />

          {/* LEFT INNER */}
          <Card
            img={images[1]}
            transform="translateX(-510px) translateZ(0px) rotateY(50deg)"
            z="20"
          />
          <Card
            img={images[2]}
            transform="translateX(-300px) translateZ(-50px) rotateY(30deg)"
            z="10"
          />

          <Card
            img={images[3]}
            transform=" translateX(-70px) translateZ(-50px) scale(1.1) rotateY(20deg)"
            z="30"
            isCenter={true}
          />

          {/* CENTER */}
          <Card
            img={images[4]}
            transform=" translateX(160px) translateZ(-50px) scale(1.1) rotateY(-30deg)"
            z="30"
            isCenter={true}
          />


          {/* RIGHT INNER */}

          {/* RIGHT OUTER */}
          <Card
            img={images[5]}
            transform="translateX(490px) translateZ(50px) rotateY(-50deg)"
            z="10"
          />

          <Card
            img={images[6]}
            transform="translateX(700px) translateZ(50px) rotateY(-80deg)"
            z="10"
          />

        </div>
      </div>
    </div>
  );
}

function Card({ img, transform, z, isCenter }) {
  return (
    <div
      className={`absolute transition-all duration-700 ease-out origin-center ${isCenter ? 'shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)]' : 'shadow-xl'}`}
      style={{
        transform: transform,
        zIndex: z,
        width: '200px', // Wider cards
        height: '280px', // Taller cards
        borderRadius: '1.5rem',
        overflow: 'hidden',
        backgroundColor: 'white',
        border: '6px solid black', // Thicker white border like reference
      }}
    >
      <img
        src={`${img}?auto=format&fit=crop&w=600&q=80`}
        alt="design"
        className="w-full h-full object-cover"
      />

      {/* Shine effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/30 to-transparent pointer-events-none" />
    </div>
  );
}