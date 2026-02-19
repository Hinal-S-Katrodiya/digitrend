import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "Do you really give a free homepage first?",
    answer:
      "Yes, 100%. We deliver a homepage design in 48 hours—no payments, no commitments. You only pay if you're vibing with it.",
  },
  {
    question: "How long does the full project take?",
    answer:
      "Most sites go live in 2-3 weeks, depending on feedback and revisions. We're fast, but we don't rush greatness.",
  },
  {
    question: "What if I want changes after the design?",
    answer:
      "We offer unlimited revisions during the design phase to ensure everything is perfect.",
  },
  {
    question: "Do you provide hosting and domain?",
    answer:
      "We can help you set up hosting and domain registration, ensuring full ownership.",
  },
];

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="w-175 ml-30">
      {/* QUESTION */}
      <motion.button
        onClick={onClick}
        className="w-full flex items-center justify-between px-8 py-6
                   rounded-full bg-white border-2 border-black
                   hover:bg-gray-50 transition-all"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <span className="text-xl md:text-2xl font-bold text-black">
          {question}
        </span>

        <div
          className={`bg-black rounded-lg p-2 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <ChevronUp
            className={`w-6 h-6 ${
              isOpen ? "text-yellow-100" : "text-white"
            }`}
          />
        </div>
      </motion.button>

      {/* ANSWER */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="mt-6"
          >
            <div
              className="
                bg-amber-100 text-black
                w-full md:w-[75%]
                ml-auto
                px-10 py-8
                rounded-[3rem]
                md:mr-[-120px]
                
              "
            >
              <p className="text-lg md:text-xl font-medium leading-relaxed">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    


     <div className="min-h-screen w-full bg-white flex flex-col items-center py-20 px-4 md:px-8 font-sans">
      <div className="relative mb-24 text-center">
        <h1 className="text-7xl md:text-9xl font-bold tracking-tighter text-black leading-[0.9]">
          You ask,<br />
          we answer.
        </h1>
        
        <div className="absolute top-[40%] left-1/2 -translate-x-1/2 md:translate-x-[-10%] z-20 pointer-events-none">
            <svg width="180" height="120" viewBox="0 0 180 120" className="rotate-[-10deg] drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                <polygon 
                  points="90,10 100,30 120,25 125,45 145,50 135,70 150,85 130,95 135,115 115,105 100,120 85,100 65,110 60,90 40,95 50,75 30,65 50,55 45,35 65,40 70,20"
                  fill="#FFD700" 
                />
                <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fontSize="24" fontWeight="900" fill="black">FAQs</text>
            </svg>
        </div>
      </div>

      <div className="w-full max-w-4xl space-y-6">
        {faqs.map((faq, index) => (
          <FAQItem
            key={index}
            question={faq.question}
            answer={faq.answer}
            isOpen={openIndex === index}
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          />
        ))}
      </div>
    </div>
  );
   
}
