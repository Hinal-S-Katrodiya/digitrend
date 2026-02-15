import { Link } from "react-router-dom";
import { useState } from 'react';

// FIX: Go up one folder (../), into assets, and use .png
import DigiLogo from '../assets/DiGi-Logo.png';

const navItems = [
  { label: 'Services', hasDropdown: true },
  { label: 'Benefits', hasDropdown: false },
  { label: 'Portfolio', hasDropdown: true },
  { label: 'Process', hasDropdown: false },
  { label: 'Testimonials', hasDropdown: false },
  { label: 'Pricing', hasDropdown: false },
  { label: 'FAQs', hasDropdown: false },
]

const Header = () => {
  const [hoveredItem, setHoveredItem] = useState(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="w-full sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="w-full md:px-8 lg:px-12 relative">
        <div className="flex items-center justify-between">

          <Link to="/" className="flex-shrink-0">
            <img
              src={DigiLogo}
              alt="DigiTrend Logo"
              className="h-24 w-auto object-contain"
            />
          </Link>

          {/* Toggle Button */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="group flex items-center gap-3 bg-white hover:bg-gray-100 text-black px-5 py-2.5 rounded-full transition-all duration-300 font-bold uppercase tracking-wide border border-gray-200 shadow-sm"
            >
              <span className="hidden sm:block">Menu</span>
              <div className="flex flex-col gap-1.5 relative w-6 h-4 justify-center">
                <span className={`w-6 h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-[1px]' : ''}`} />
                <span className={`w-6 h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-[5px]' : ''}`} />
              </div>
            </button>
          </div>
        </div>

        {/* MENU CARD */}
        <div
          className={`
               absolute top-full mt-2 right-4 md:right-12
                w-[90vw] sm:w-[350px] 
                bg-white 
                rounded-[2.5rem] 
                p-8 
                shadow-2xl 
                origin-top-right transition-all duration-300 ease-in-out z-50
                ${isMenuOpen ? 'opacity-100 scale-100 translate-y-0 visible' : 'opacity-0 scale-95 -translate-y-4 invisible'}
            `}
        >
          <nav className="flex flex-col">
            {navItems.map((item) => (
              <a
                key={item.label}
                href="#"
                className="group flex items-center justify-between text-3xl font-[900] text-black uppercase tracking-tight py-3 border-b-2 border-black transition-all duration-200"
                onMouseEnter={() => setHoveredItem(item.label)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div className="flex items-center gap-2 transition-transform duration-300 group-hover:translate-x-2">
                  {hoveredItem === item.label && (
                    <span className="text-2xl text-[#3B1F8E]">»</span>
                  )}
                  {item.label}
                </div>
              </a>
            ))}
          </nav>

          <div className="mt-8 pt-4 border-t-2 border-black flex justify-between items-center text-sm font-bold uppercase">
            <span>© 2026 Digitrend</span>
            <Link to="/contact" className="underline hover:text-gray-600 transition-colors">Contact Us</Link>
          </div>
        </div>

        {/* Overlay Background */}
        {isMenuOpen && (
          <div
            onClick={() => setIsMenuOpen(false)}
            className="fixed inset-0 bg-black/50 z-40"
            style={{ top: '80px' }}
          />
        )}
      </div>
    </header>
  )
}

export default Header