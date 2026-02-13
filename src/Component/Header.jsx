import { Link } from "react-router-dom";

import { useState } from 'react'

const WiproLogo = () => (
  <svg viewBox="0 0 200 60" className="h-12 w-auto" xmlns="http://www.w3.org/2000/svg">
    {/* Colorful dots pattern */}
    {/* Top row */}
    <circle cx="155" cy="5" r="3" fill="#1E3A8A" />
    <circle cx="163" cy="5" r="3" fill="#3B82F6" />
    {/* Second row */}
    <circle cx="151" cy="13" r="3" fill="#F59E0B" />
    <circle cx="159" cy="13" r="3" fill="#6366F1" />
    <circle cx="167" cy="13" r="3" fill="#06B6D4" />
    {/* Third row */}
    <circle cx="155" cy="21" r="3" fill="#EF4444" />
    <circle cx="163" cy="21" r="3" fill="#10B981" />
    {/* Bottom dots */}
    <circle cx="159" cy="29" r="3" fill="#F97316" />
    <circle cx="159" cy="37" r="3" fill="#EAB308" />
    <circle cx="159" cy="45" r="3" fill="#22C55E" />

    {/* WIPRO text */}
    <text x="0" y="42" fontFamily="'Inter', sans-serif" fontSize="38" fontWeight="700" fill="#3B1F8E" letterSpacing="-1">
      DiGiTrend
    </text>
  </svg>
)

const ChevronDown = ({ className = '' }) => (
  <svg
    className={`w-3.5 h-3.5 ${className}`}
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const GlobeIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
    <path d="M2 12h20" stroke="currentColor" strokeWidth="1.5" />
    <path d="M12 2c2.5 3 4 6.5 4 10s-1.5 7-4 10" stroke="currentColor" strokeWidth="1.5" />
    <path d="M12 2c-2.5 3-4 6.5-4 10s1.5 7 4 10" stroke="currentColor" strokeWidth="1.5" />
    <path d="M4 7h16" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    <path d="M4 17h16" stroke="currentColor" strokeWidth="1" opacity="0.5" />
  </svg>
)

const navItems = [
  { label: 'What We Do', hasDropdown: true },
  { label: 'What We Think', hasDropdown: false },
  { label: 'About Wipro', hasDropdown: true },
  { label: 'Careers', hasDropdown: false },
  { label: 'Contact Us', hasDropdown: false },
]

const Header = () => {
  const [hoveredItem, setHoveredItem] = useState(null)

  return (
    <header className="w-full sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-full mx-auto flex items-center justify-between px-8 lg:px-12 py-4">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <WiproLogo />
        </Link>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center gap-10 xl:gap-12">
          {navItems.map((item) => (
            <a
              key={item.label}
              href="#"
              className="flex items-center gap-1.5 text-[15px] font-medium text-gray-800 hover:text-[#3B1F8E] transition-colors duration-200 whitespace-nowrap"
              onMouseEnter={() => setHoveredItem(item.label)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {item.label}
              {item.hasDropdown && (
                <ChevronDown
                  className={`transition-transform duration-200 ${
                    hoveredItem === item.label ? 'rotate-180' : ''
                  }`}
                />
              )}
            </a>
          ))}
        </nav>

        {/* Language Selector */}
        <div className="hidden lg:flex items-center gap-1.5 text-gray-700 cursor-pointer hover:text-[#3B1F8E] transition-colors duration-200">
          <GlobeIcon />
          <span className="text-[15px] font-medium">EN</span>
          <ChevronDown />
        </div>

        {/* Mobile Menu Button */}
        <button className="lg:hidden flex flex-col gap-1.5 p-2">
          <span className="w-6 h-0.5 bg-gray-800"></span>
          <span className="w-6 h-0.5 bg-gray-800"></span>
          <span className="w-6 h-0.5 bg-gray-800"></span>
        </button>
      </div>
    </header>
  )
}

export default Header
