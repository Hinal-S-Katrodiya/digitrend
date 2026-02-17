import React from "react";

export default function ReviewSection() {
  const reviews = [
    {
      name: "Aarav Patel",
      role: "Product Manager",
      review:
        "Amazing service! The team delivered beyond expectations and the UI quality is outstanding.",
    },
    {
      name: "Riya Shah",
      role: "Startup Founder",
      review:
        "Professional and creative team. They transformed our idea into a beautiful product.",
    },
    {
      name: "Vikram Mehta",
      role: "CEO",
      review:
        "Their attention to detail and performance optimization impressed us a lot.",
    },
    {
      name: "Sneha Kapoor",
      role: "Marketing Head",
      review:
        "Smooth communication and excellent design sense. Highly recommended!",
    },
  ];

  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          What Our Customers Say
        </h2>
        <p className="text-gray-500 mt-3">Trusted by businesses worldwide</p>
      </div>

      {/* Top Row (Left Direction) */}
      <div className="overflow-hidden">
        <div className="flex marquee">
          {[...reviews, ...reviews].map((item, index) => (
            <ReviewCard key={index} {...item} />
          ))}
        </div>
      </div>

      {/* Bottom Row (Right Direction) */}
      <div className="overflow-hidden mt-10">
        <div className="flex marquee-reverse">
          {[...reviews, ...reviews].map((item, index) => (
            <ReviewCard key={index} {...item} />
          ))}
        </div>
      </div>

      {/* Animation Styles */}
      <style>
        {`
          .marquee {
            animation: scroll-left 35s linear infinite;
          }

          .marquee-reverse {
            animation: scroll-right 35s linear infinite;
          }

          @keyframes scroll-left {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }

          @keyframes scroll-right {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0%); }
          }
        `}
      </style>
    </section>
  );
}

function Star() {
  return (
    <svg
      className="w-4 h-4 text-yellow-400"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.963a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.45a1 1 0 00-.364 1.118l1.287 3.962c.3.922-.755 1.688-1.54 1.118l-3.37-2.45a1 1 0 00-1.175 0l-3.37 2.45c-.784.57-1.838-.196-1.539-1.118l1.287-3.962a1 1 0 00-.364-1.118l-3.37-2.45c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.963z" />
    </svg>
  );
}

function ReviewCard({ name, role, review }) {
  return (
    <div className="w-80 mx-3 bg-white rounded-xl p-3 flex-shrink-0 hover:shadow-lg transition">
      <div className="flex">
        <Star />
        <Star />
        <Star />
        <Star />
        <Star />
      </div>

      <p className="text-gray-600 text-sm leading-relaxed">“{review}”</p>

      <div className="mt-4">
        <h4 className="font-semibold text-gray-800">@{name}</h4>
        <p className="text-xs text-gray-500">{role}</p>
      </div>
    </div>
  );
}
