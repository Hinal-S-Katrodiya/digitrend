import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import DiGiLogo from "../assets/DiGiLogo.png";

const Logo = () => (
  <img
    src={DiGiLogo}
    alt="DiGi Trend"
    className="h-8 
    sm:h-12 
    md:h-14 
    lg:h-22
    w-auto 
    object-contain"
  />
);

const Header = () => {
  const [open, setOpen] = useState(false);

  // 🔥 Scroll hide/show states
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🔥 Scroll logic
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 50) {
        setShowHeader(true);
      } else if (window.scrollY > lastScrollY) {
        setShowHeader(false); // scrolling down → hide
      } else {
        setShowHeader(true); // scrolling up → show
      }

      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`fixed top-0 left-0 w-full bg-white border-b z-50 transition-transform duration-300 ${
        showHeader ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-auto mx-auto flex items-center justify-between px-3 sm:px-1 md:px-6 py-1 pt-0.5">
        {/* Logo */}
        <Link to="/" reloadDocument>
          <Logo />
        </Link>

        {/* Services Button */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen(!open)}
            className="bg-blue-900  text-white px-2 py-2 rounded-xl font-medium transform transition-all duration-500 ease-out"
          >
            Menu
          </button>

          {/* Dropdown */}
          <div
            className={`absolute right-0 mt-3 w-60 bg-white rounded-lg shadow-xl border border-gray-200 py-3 transform transition-all duration-300 ease-out ${
              open
                ? "opacity-100 scale-100 translate-y-0"
                : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
            }`}
          >
            <Link to="/benefits" className="block px-5 py-2 hover:bg-gray-100">
              Benefits
            </Link>
            <Link to="#" className="block px-5 py-2 hover:bg-gray-100">
              Trusted Partners
            </Link>
            <Link to="#" className="block px-5 py-2 hover:bg-gray-100">
              Our Design
            </Link>
            <Link to="#" className="block px-5 py-2 hover:bg-gray-100">
              Services
            </Link>
            <Link to="/" className="block px-5 py-2 hover:bg-gray-100">
              Our Best Work
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
