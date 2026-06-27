import { useState, useEffect } from "react";

const links = [
  { id: "home", label: "Home", num: "01" },
  { id: "about", label: "About", num: "02" },
  { id: "projects", label: "Projects", num: "03" },
  { id: "contact", label: "Contact", num: "04" },
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
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false); // closes mobile menu too
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 px-6 py-5 flex items-center justify-between"
      style={{ background: "rgba(9,9,9,0.85)", backdropFilter: "blur(12px)" }}
    >
      {/* Logo */}
      <span
        className="text-white text-2xl cursor-pointer"
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          letterSpacing: "0.1em",
        }}
        onClick={() => scrollTo("home")}
      >
        ZOB<span style={{ color: "#2DD4BF" }}>.</span>
      </span>

      {/* Desktop links */}
      <ul className="hidden md:flex items-center gap-10">
        {links.map((link) => {
          const isActive = activeSection === link.id;
          return (
            <li key={link.id}>
              <button
                onClick={() => scrollTo(link.id)}
                className={`flex items-center gap-1.5 text-sm tracking-widest uppercase transition-colors duration-200 bg-transparent border-none cursor-pointer ${
                  isActive ? "text-white" : "text-white/40 hover:text-white/80"
                }`}
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                <span style={{ color: "#2DD4BF", fontSize: "10px" }}>/</span>
                <span>{link.label}</span>
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
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={`flex items-center gap-2 text-sm tracking-widest uppercase bg-transparent border-none cursor-pointer ${
                activeSection === link.id ? "text-white" : "text-white/40"
              }`}
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              <span style={{ color: "#2DD4BF", fontSize: "10px" }}>/</span>
              {link.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
