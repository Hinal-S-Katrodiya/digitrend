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
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center  px-6">

      {/* Top Text Section */}
      <h1 className="text-5xl md:text-7xl font-semibold text-gray-900 text-center mb-6">
        Design to Stare
      </h1>

      <p className="text-gray-500 text-center max-w-3xl mb-20 text-lg">
        We create the most stunning graphic designs for your social media,
        websites, branding, or literally anything. They are just mind-blowing.
      </p>

      {/* 3D Container */}
      <div
        className="flex items-center justify-center w-full"
        style={{ perspective: "1400px" }}
      >
        <div className="flex items-center relative">

          {/* LEFT BIG */}
          <Card
            img={images[0]}
            transform="rotateY(-50deg) translateX(-220px) scale(1.3)"
            z="40"
          />

          {/* LEFT MID */}
          <Card
            img={images[1]}
            transform="rotateY(-35deg) translateX(-140px) scale(1.15)"
            z="30"
          />

          {/* LEFT SMALL */}
          <Card
            img={images[2]}
            transform="rotateY(-15deg) translateX(-60px) scale(0.95)"
            z="20"
          />

          {/* CENTER SMALLEST */}
          <Card
            img={images[3]}
            transform="rotateY(0deg) scale(0.85)"
            z="10"
          />

          {/* RIGHT SMALL */}
          <Card
            img={images[4]}
            transform="rotateY(15deg) translateX(60px) scale(0.95)"
            z="20"
          />

          {/* RIGHT MID */}
          <Card
            img={images[5]}
            transform="rotateY(35deg) translateX(140px) scale(1.15)"
            z="30"
          />

          {/* RIGHT BIG */}
          <Card
            img={images[6]}
            transform="rotateY(50deg) translateX(220px) scale(1.3)"
            z="40"
          />

        </div>
      </div>
    </div>
  );
}

function Card({ img, transform, z }) {
  return (
    <div
      className="w-30 h-40 rounded-3xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.15)] transition-all duration-500"
      style={{
        transform: transform,
        zIndex: z,
      }}
    >
      <img
        src={`${img}?auto=format&fit=crop&w=800&q=80`}
        alt="design"
        className="w-full h-full object-cover"
      />
    </div>
  );
}
