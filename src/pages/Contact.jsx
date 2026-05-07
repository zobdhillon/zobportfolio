import { useEffect, useRef } from "react";

const contactLinks = [
  {
    label: "Email",
    value: "zobbdhillon@gmail.com",
    href: "mailto:zobbdhillon@gmail.com",
  },
  {
    label: "GitHub",
    value: "github.com/zobdhillon",
    href: "https://github.com/zobdhillon",
  },
];

export default function Contact() {
  const ref = useRef(null);

  useEffect(() => {
    const els = ref.current?.querySelectorAll(".reveal");
    els?.forEach((el, i) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(24px)";
      setTimeout(() => {
        el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, i * 120);
    });
  }, []);

  return (
    <div ref={ref} className="min-h-screen pt-32 pb-20 px-8 max-w-7xl mx-auto w-full">
      {/* Section label */}
      <div className="reveal flex items-center gap-3 mb-16">
        <span
          className="text-xs tracking-[0.3em] uppercase"
          style={{ color: "#2DD4BF", fontFamily: "'JetBrains Mono', monospace" }}
        >
          04/ Contact
        </span>
        <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
      </div>

      {/* Heading */}
      <h2
        className="reveal text-[clamp(3rem,8vw,6rem)] leading-none mb-6"
        style={{ fontFamily: "'Bebas Neue', sans-serif", color: "white" }}
      >
        LET'S
        <br />
        <span style={{ color: "transparent", WebkitTextStroke: "1px rgba(255,255,255,0.2)" }}>
          WORK
        </span>
        <span style={{ color: "#2DD4BF" }}>.</span>
      </h2>

      <p
        className="reveal text-white/40 max-w-md mb-16 leading-relaxed"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        I'm open to full-time roles and freelance projects. If you have something in mind, reach out — I'd love to hear about it.
      </p>

      {/* Contact cards */}
      <div className="reveal grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mb-20">
        {contactLinks.map((item) => (
          <a
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center justify-between p-5 border transition-all duration-200 hover:border-teal-300/30"
            style={{
              borderColor: "rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.02)",
            }}
          >
            <div>
              <p
                className="text-xs tracking-[0.2em] uppercase mb-1"
                style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'JetBrains Mono', monospace" }}
              >
                {item.label}
              </p>
              <p
                className="text-sm text-white/60 group-hover:text-white/90 transition-colors"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {item.value}
              </p>
            </div>
            <span
              className="text-lg transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
              style={{ color: "#2DD4BF" }}
            >
              ↗
            </span>
          </a>
        ))}
      </div>

      {/* Footer */}
      <div
        className="reveal border-t pt-8 flex items-center justify-between"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <span
          className="text-xs tracking-widest"
          style={{ color: "rgba(255,255,255,0.15)", fontFamily: "'JetBrains Mono', monospace" }}
        >
          © 2025 Zob Dhillon
        </span>
        <span
          className="text-xs tracking-widest"
          style={{ color: "rgba(255,255,255,0.15)", fontFamily: "'JetBrains Mono', monospace" }}
        >
          I was my Own Client
        </span>
      </div>
    </div>
  );
}
