import { useState, useEffect } from "react";
import MonoLabel from "./MonoLabel";

const links = [
  { id: "home", label: "Home", num: "01" },
  { id: "about", label: "About", num: "02" },
  { id: "projects", label: "Projects", num: "03" },
  { id: "experience", label: "Experience", num: "04" },
  { id: "contact", label: "Contact", num: "05" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    links.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    document.getElementById(id)?.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
    setOpen(false);
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 px-8 py-5"
      style={{ background: "rgba(9,9,9,0.85)", backdropFilter: "blur(12px)" }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <button
          type="button"
          className="cursor-pointer flex-shrink-0 leading-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DD4BF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#090909]"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            letterSpacing: "0.1em",
            background: "transparent",
            border: "none",
            padding: 0,
          }}
          onClick={() => scrollTo("home")}
          aria-label="Go to home"
        >
          <div className="text-white" style={{ fontSize: "18px" }}>
            ZOBIA
          </div>
          <div className="text-white" style={{ fontSize: "18px" }}>
            DHILLON
          </div>
        </button>

        <ul className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
          {links.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <li key={link.id}>
                <button
                  type="button"
                  onClick={() => scrollTo(link.id)}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex items-center gap-1.5 text-sm tracking-widest uppercase transition-colors duration-200 bg-transparent border-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DD4BF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#090909] ${
                    isActive
                      ? "text-white"
                      : "text-white/40 hover:text-white/80"
                  }`}
                >
                  <MonoLabel style={{ color: "#2DD4BF", fontSize: "10px" }}>
                    /
                  </MonoLabel>
                  <MonoLabel>{link.label}</MonoLabel>
                  {isActive && (
                    <span
                      className="ml-1 w-1 h-1 rounded-full inline-block"
                      style={{ backgroundColor: "#2DD4BF" }}
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        <div
          className="hidden md:flex items-center gap-2 flex-shrink-0"
          style={{
            position: "relative",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "11px",
            color: "rgba(255,255,255,0.25)",
            letterSpacing: "0.05em",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: "#2DD4BF" }}
          />
          <span>Available</span>
        </div>

        <button
          type="button"
          className="md:hidden flex flex-col gap-1.5 p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DD4BF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#090909]"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
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
      </div>

      {open && (
        <div
          id="mobile-menu"
          className="absolute top-full left-0 right-0 md:hidden py-6 px-6 flex flex-col gap-6"
          style={{
            background: "rgba(9,9,9,0.97)",
            borderTop: "1px solid rgba(45,212,191,0.1)",
          }}
          aria-label="Mobile navigation"
        >
          {links.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => scrollTo(link.id)}
              aria-current={activeSection === link.id ? "page" : undefined}
              className={`flex items-center gap-2 text-sm tracking-widest uppercase bg-transparent border-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DD4BF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#090909] ${
                activeSection === link.id ? "text-white" : "text-white/40"
              }`}
            >
              <MonoLabel style={{ color: "#2DD4BF", fontSize: "10px" }}>
                /
              </MonoLabel>
              <MonoLabel>{link.label}</MonoLabel>
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
