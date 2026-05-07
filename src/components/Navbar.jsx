import { NavLink } from "react-router-dom";
import { useState } from "react";

const links = [
  { to: "/", label: "Home", num: "01" },
  { to: "/about", label: "About", num: "02" },
  { to: "/projects", label: "Projects", num: "03" },
  { to: "/contact", label: "Contact", num: "04" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 px-6 py-5 flex items-center justify-between"
      style={{ background: "rgba(9,9,9,0.85)", backdropFilter: "blur(12px)" }}
    >
      {/* Logo */}
      <span
        className="text-white text-2xl"
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          letterSpacing: "0.1em",
        }}
      >
        ZOB<span style={{ color: "#2DD4BF" }}>.</span>
      </span>

      {/* Desktop links */}
      <ul className="hidden md:flex items-center gap-10">
        {links.map((link) => (
          <li key={link.to}>
            <NavLink
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `flex items-center gap-1.5 text-sm tracking-widest uppercase transition-colors duration-200 ${
                  isActive ? "text-white" : "text-white/40 hover:text-white/80"
                }`
              }
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {({ isActive }) => (
                <>
                  <span style={{ color: "#2DD4BF", fontSize: "10px" }}>
                    {link.num}/
                  </span>
                  <span>{link.label}</span>
                  {isActive && (
                    <span
                      className="ml-1 w-1 h-1 rounded-full inline-block"
                      style={{ backgroundColor: "#2DD4BF" }}
                    />
                  )}
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Hamburger button */}
      <button
        className="md:hidden flex flex-col gap-1.5 p-2"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        <span
          className="block w-6 h-px transition-all duration-300"
          style={{
            backgroundColor: "#2DD4BF",
            transform: open ? "rotate(45deg) translateY(8px)" : "none",
          }}
        />
        <span
          className="block w-6 h-px transition-all duration-300"
          style={{
            backgroundColor: "#2DD4BF",
            opacity: open ? 0 : 1,
          }}
        />
        <span
          className="block w-6 h-px transition-all duration-300"
          style={{
            backgroundColor: "#2DD4BF",
            transform: open ? "rotate(-45deg) translateY(-8px)" : "none",
          }}
        />
      </button>

      {/* Mobile menu */}
      {open && (
        <div
          className="absolute top-full left-0 right-0 md:hidden py-6 px-6 flex flex-col gap-6"
          style={{
            background: "rgba(9,9,9,0.97)",
            borderTop: "1px solid rgba(45,212,191,0.1)",
          }}
        >
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-2 text-sm tracking-widest uppercase ${
                  isActive ? "text-white" : "text-white/40"
                }`
              }
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              <span style={{ color: "#2DD4BF", fontSize: "10px" }}>
                {link.num}/
              </span>
              {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
}
