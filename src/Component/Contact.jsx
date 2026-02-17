import React from "react";
import { Send, ArrowRight } from "lucide-react";

export default function Contact() {
  return (
    <section className="min-h-screen bg-[#f9fafb] text-gray-900 px-8 lg:px-24 py-24">
      <div className="grid lg:grid-cols-2 gap-20 max-w-[1400px] mx-auto items-start">

        {/* ================= LEFT SIDE ================= */}
        <div className="pt-6">

          {/* Top Small Button */}
          <div className="inline-flex items-center gap-3 bg-[#f4d96f] text-white px-5 py-3 rounded-xl font-medium mb-12">
            <Send size={18} />
            Contact Now
          </div>

          {/* Main Heading */}
          <h1 className="text-[64px] leading-[72px] font-bold mb-8 tracking-tight">
            Contact Us!
          </h1>

          {/* Subtext */}
          <p className="text-gray-500 text-lg leading-relaxed max-w-md mb-12">
            Let’s create something amazing together! Reach out —
            I’d love to hear about your project and ideas.
          </p>

          {/* Divider */}
          <div className="w-full h-px bg-gray-300 mb-10"></div>

          {/* Feature List */}
          <div className="space-y-6 mb-14">

            <div className="flex items-center gap-5">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#f4d96f] text-white text-xl">
                +
              </div>
              <span className="text-lg font-semibold">
                24/7 Full Time Support
              </span>
            </div>

            <div className="flex items-center gap-5">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#f4d96f] text-white text-xl">
                +
              </div>
              <span className="text-lg font-semibold">
                Available Worldwide
              </span>
            </div>

          </div>

          {/* WhatsApp Button */}
          <button className="group relative flex items-center bg-white px-8 py-4 rounded-full text-lg font-medium shadow-md overflow-hidden">

  {/* Expanding Teal Background (Arrow container itself) */}
  <span className="absolute left-4 top-0 h-12 mt-4.5 w-12 bg-[#f4d96f] rounded-full transition-all duration-500 ease-in-out group-hover:w-56"></span>

  {/* Arrow (fixed position) */}
  <span className="relative z-10 flex items-center  w-12 h-12 text-white">
    →
  </span>

  {/* Text */}
  <span className="relative z-10 ml-4 transition-colors duration-500 group-hover:text-white">
    WhatsApp Now
  </span>

</button>



        </div>

        {/* ================= RIGHT SIDE FORM ================= */}
        <div className="relative">

          {/* Top Corner Accent */}
          <div className="absolute -top-6 -right-6 w-12 h-12 border-t-4 border-r-4 border-amber-300"></div>

          <form className="space-y-8">

            <input
              type="text"
              placeholder="Name*"
              className="w-full bg-[#e5e7eb] rounded-xl px-8 py-6 text-lg focus:outline-none focus:ring-2 focus:ring-[#f4d96f]"
            />

            <input
              type="email"
              placeholder="Email*"
              className="w-full bg-[#e5e7eb] rounded-xl px-8 py-6 text-lg focus:outline-none focus:ring-2 focus:ring-[#f4d96f]"
            />

            <input
              type="text"
              placeholder="Contact Number"
              className="w-full bg-[#e5e7eb] rounded-xl px-8 py-6 text-lg focus:outline-none focus:ring-2 focus:ring-[#f4d96f]"
            />

            <textarea
              rows="6"
              placeholder="Message*"
              className="w-full bg-[#e5e7eb] rounded-xl px-8 py-6 text-lg focus:outline-none focus:ring-2 focus:ring-[#f4d96f]"
            ></textarea>

            <button
              type="submit"
              className="w-full bg-[#f4d96f] hover:bg-black text-white py-6 rounded-xl text-xl font-semibold transition"
            >
              Submit Now
            </button>

          </form>

        </div>

      </div>
    </section>
  );
}
