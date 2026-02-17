import { useEffect, useRef, useState } from "react";
import {Link} from "react-router-dom"

const navLinks = [
  { name: "Home", href: "#" },
  { name: "Services", href: "#" },
  { name: "Benefits", href: "#" },
  { name: "Portfolio", href: "#" },
  { name: "Reviews", href: "#" },
  { name: "About", href: "#" },
  { name: "Privacy", href: "#" },
  { name: "Terms", href: "#" },
];

const socialLinks = [
  { name: "Linkedin", href: "#" },
  { name: "Facebook", href: "#" },
  { name: "Instagram", href: "#" },
  { name: "Behance", href: "#" },
  { name: "Google", href: "#" },
];

const NavLink = ({ href, children }) => {
  return (
    <Link
      to={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative inline-block overflow-hidden font-oswald text-3xl font-bold tracking-wide"
    >
      {/* Default Text */}
      <span className="block text-[#1a1a1a] transition-colors duration-300 group-hover:text-transparent">
        {children}
      </span>

      {/* Gold Gradient Hover Text */}
      <span
        className="
          absolute
          inset-0
          block
          translate-x-[-100%]
          group-hover:translate-x-0
          transition-transform
          duration-500
          bg-gradient-to-r
          from-[#f5b030]
          via-[#b8700a]
          to-[#4d2d02]
          bg-clip-text
          text-transparent
        "
      >
        {children}
      </span>
    </Link>
  );
};


const ContactLink = ({ href, children }) => {
  return (
    <Link
      to={href}
      className="group relative inline-block overflow-hidden font-oswald text-sm"
    >
      <span className="block text-[#222] transition-colors duration-300 group-hover:text-transparent">
        {children}
      </span>

      <span
        className="
          absolute
          inset-0
          block
          translate-x-[-100%]
          group-hover:translate-x-0
          transition-transform
          duration-500
          bg-gradient-to-r
          from-[#f5b030]
          via-[#b8700a]
          to-[#4d2d02]
          bg-clip-text
          text-transparent
        "
      >
        {children}
      </span>
    </Link>
  );
};


export default function Footer() {
  const textRef = useRef(null);
  const wrapRef = useRef(null);
  const [fontSize, setFontSize] = useState(200);

  useEffect(() => {
    const fit = () => {
      if (!textRef.current || !wrapRef.current) return;
      const maxW = wrapRef.current.offsetWidth;
      let lo = 50,
        hi = 900,
        best = 50;

      while (lo <= hi) {
        const mid = Math.floor((lo + hi) / 2);
        textRef.current.style.fontSize = mid + "px";
        if (textRef.current.scrollWidth <= maxW) {
          best = mid;
          lo = mid + 1;
        } else hi = mid - 1;
      }

      setFontSize(best);
    };

    document.fonts.ready.then(fit);
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  return (
    <footer className="relative w-full flex flex-col overflow-hidden min-h-screen bg-white font-oswald">

      {/* TOP SECTION */}
      <div className="flex justify-between items-start px-20 pt-14 pb-8 flex-wrap gap-10">

        {/* LEFT */}
        <div className="flex flex-col gap-6">

          <div>
            <p className="uppercase text-xl font-bold tracking-wide text-[#b8750a]">
              Phone
            </p>
            <ContactLink href="#">+91 9987726922</ContactLink>
          </div>

          <div>
            <p className="uppercase text-xl font-bold tracking-wide text-[#b8750a]">
              Email
            </p>
            <ContactLink href="#">hello@digitrend.in</ContactLink>
          </div>

          <div>
            <p className="uppercase text-xl font-bold tracking-wide text-[#b8750a]">
              Address
            </p>
            <p className="text-sm leading-loose text-[#222]">
              Deep Darshan Apartment,<br />
              Office No - 205 Karanjade,<br />
              Panvel - 410206
            </p>
          </div>

          <div>
            <p className="uppercase text-xl font-bold tracking-wide text-[#b8750a]">
              Opening Hours
            </p>
            <p className="text-sm leading-loose text-[#222]">
              Mon to Fri: 9.00am - 9.00pm<br />
              Sat & Sun: Closed
            </p>
          </div>

        </div>

        {/* RIGHT */}
        <div className="flex gap-20">

          <div className="flex flex-col">
            {navLinks.map((l) => (
              <NavLink key={l.name} href={l.href}>
                {l.name}
              </NavLink>
            ))}
          </div>

          <div className="flex flex-col">
            {socialLinks.map((l) => (
              <NavLink key={l.name} href={l.href}>
                {l.name}
              </NavLink>
            ))}
          </div>

        </div>
      </div>

      {/* BIG TEXT */}
      <div
        ref={wrapRef}
        className="flex-1 flex items-end overflow-hidden w-full"
      >
        <span
          ref={textRef}
          style={{ fontSize: `${fontSize}px` }}
          className="
            block
            w-full
            uppercase
            font-bold
            leading-[0.83]
            tracking-[-2px]
            whitespace-nowrap
            select-none
            bg-gradient-to-b
            from-[#f5b030]
            via-[#b8700a]
            to-[#4d2d02]
            bg-clip-text
            text-transparent
          "
        >
          DiGi Trend
        </span>
      </div>

      {/* BOTTOM BAR */}
      <div className="
        flex
        justify-between
        items-center
        flex-wrap
        gap-2
        px-20
        py-3
        border-t
        border-[#b8750a]/20
        bg-[#b8750a]/5
      ">
        <p className="text-xs text-gray-500">
          © 2026. DiGi Trend.in. All Rights Reserved
        </p>

        <p className="text-xs text-gray-500">
          Developed by{" "}
          <span className="
            font-bold
            tracking-widest
            text-sm
            bg-gradient-to-r
            from-[#e8a020]
            to-[#b8700a]
            bg-clip-text
            text-transparent
          ">
            DiGi Trend
          </span>
        </p>
      </div>
    </footer>
  );
}
