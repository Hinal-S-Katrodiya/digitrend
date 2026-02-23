import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { useState, useEffect, useRef } from "react";
import DiGiLogo from "../assets/DiGiLogo.png";

const Logo = () => (
  <img
    src={DiGiLogo}
    alt="DiGi Trend"
    className="h-8 sm:h-10 md:h-12 lg:h-16 xl:h-20 w-auto object-contain transition-all"
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
      className={`fixed top-0 left-0 w-full bg-white border-b z-50 transition-transform duration-300 ${showHeader ? "translate-y-0" : "-translate-y-full"
        }`}
    >
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-2 md:py-3">

        {/* Logo */}
        <ScrollLink to="hero" smooth={true} duration={1500} easing="easeInOutQuint" className="cursor-pointer">
          <Logo />
        </ScrollLink>

        {/* Menu */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen(!open)}
            className="bg-blue-900 text-white px-4 py-2 rounded-xl font-medium transition-all duration-300 cursor-pointer"
          >
            Menu
          </button>

          <div
            className={`absolute right-0 mt-3 w-60 bg-white rounded-lg shadow-xl border py-3 transition-all duration-300 ${open
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
              }`}
          >
            <ScrollLink
              to="features"
              smooth={true}
              duration={1500}
              easing="easeInOutQuint"
              offset={-70}
              className="block px-5 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => setOpen(false)}
            >
              Benefits
            </ScrollLink>
            <ScrollLink
              to="partners"
              smooth={true}
              duration={1500}
              easing="easeInOutQuint"
              offset={-70}
              className="block px-5 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => setOpen(false)}
            >
              Trusted Partners
            </ScrollLink>

            <ScrollLink
              to="design"
              smooth={true}
              duration={1500}
              easing="easeInOutQuint"
              offset={-70}
              className="block px-5 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => setOpen(false)}
            >
              Our Design
            </ScrollLink>

            <ScrollLink
              to="services"
              smooth={true}
              duration={1500}
              easing="easeInOutQuint"
              offset={-70}
              className="block px-5 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => setOpen(false)}
            >
              Services
            </ScrollLink>
            <ScrollLink
              to="work"
              smooth={true}
              duration={1500}
              easing="easeInOutQuint"
              offset={-70}
              className="block px-5 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => setOpen(false)}
            >
              Our Best Work
            </ScrollLink>

            <ScrollLink
              to="review"
              smooth={true}
              duration={1500}
              easing="easeInOutQuint"
              offset={-70}
              className="block px-5 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => setOpen(false)}
            >
              Customer Review
            </ScrollLink>

            <ScrollLink
              to="contact"
              smooth={true}
              duration={1500}
              easing="easeInOutQuint"
              offset={-70}
              className="block px-5 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => setOpen(false)}
            >
              Contact Us
            </ScrollLink>



            <ScrollLink
              to="faqs"
              smooth={true}
              duration={1500}
              easing="easeInOutQuint"
              offset={-70}
              className="block px-5 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => setOpen(false)}
            >
              FAQs
            </ScrollLink>
          </div>
        </div>

      </div>
    </header>

  );
};

export default Header;
