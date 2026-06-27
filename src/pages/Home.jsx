import Marquee from "../components/Marquee";
import { useEffect, useRef } from "react";

export default function Home() {
  const heroRef = useRef(null);

  useEffect(() => {
    const els = heroRef.current?.querySelectorAll(".reveal");
    if (!els) return;
    els.forEach((el, i) => {
      setTimeout(() => {
        el.classList.add("show");
      }, i * 120);
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <section
        ref={heroRef}
        className="flex-1 flex flex-col justify-center px-8 pt-32 pb-16 max-w-7xl mx-auto w-full relative overflow-hidden"
      >
        {/* Hero SVG — unchanged */}
        <div
          style={{
            position: "absolute",
            right: "-2%",
            top: "50%",
            transform: "translateY(-50%)",
            width: "480px",
            height: "480px",
            pointerEvents: "none",
          }}
        >
          <svg
            width="100%"
            viewBox="0 0 480 480"
            xmlns="http://www.w3.org/2000/svg"
          >
            <style>{`
              @keyframes float {
                0%, 100% { transform: translateY(0px) rotate(-8deg); }
                50% { transform: translateY(-18px) rotate(-8deg); }
              }
              .symbol-group {
                animation: float 6s ease-in-out infinite;
                transform-origin: 240px 240px;
              }
            `}</style>
            <g className="symbol-group">
              <polygon
                points="240,80 360,148 360,284 240,352 120,284 120,148"
                fill="none"
                stroke="#2DD4BF"
                strokeWidth="1"
                opacity="0.25"
              />
              <polygon
                points="240,112 332,163 332,265 240,316 148,265 148,163"
                fill="none"
                stroke="#2DD4BF"
                strokeWidth="0.6"
                opacity="0.12"
              />
              <path
                d="M195 185 L162 216 L195 247"
                fill="none"
                stroke="#2DD4BF"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.9"
              />
              <path
                d="M285 185 L318 216 L285 247"
                fill="none"
                stroke="#2DD4BF"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.9"
              />
              <line
                x1="255"
                y1="183"
                x2="225"
                y2="249"
                stroke="#ffffff"
                strokeWidth="2.5"
                strokeLinecap="round"
                opacity="0.7"
              />
              <circle cx="120" cy="148" r="3" fill="#2DD4BF" opacity="0.5" />
              <circle cx="360" cy="148" r="3" fill="#2DD4BF" opacity="0.5" />
              <circle cx="360" cy="284" r="3" fill="#2DD4BF" opacity="0.5" />
              <circle cx="120" cy="284" r="3" fill="#2DD4BF" opacity="0.5" />
              <circle cx="240" cy="80" r="3" fill="#2DD4BF" opacity="0.3" />
              <circle cx="240" cy="352" r="3" fill="#2DD4BF" opacity="0.3" />
              <circle cx="90" cy="200" r="2" fill="#2DD4BF" opacity="0.4" />
              <circle cx="390" cy="170" r="1.5" fill="#2DD4BF" opacity="0.3" />
              <circle cx="380" cy="300" r="2" fill="#2DD4BF" opacity="0.25" />
              <circle cx="100" cy="310" r="1.5" fill="#2DD4BF" opacity="0.3" />
            </g>
          </svg>
        </div>

        <div className="reveal flex items-center gap-3 mb-12">
          <span
            className="text-xs tracking-[0.3em] uppercase"
            style={{
              color: "#2DD4BF",
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            // Available for work
          </span>
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ backgroundColor: "#2DD4BF" }}
          />
        </div>

        <div className="reveal overflow-hidden">
          <h1
            className="text-[clamp(5rem,15vw,14rem)] leading-none tracking-tight text-white"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            FULL STACK
          </h1>
        </div>

        <div className="reveal overflow-hidden flex items-end gap-6">
          <h1
            className="text-[clamp(5rem,15vw,14rem)] leading-none tracking-tight"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              color: "transparent",
              WebkitTextStroke: "2px rgba(255,255,255,0.2)",
            }}
          >
            DEVELOPER
          </h1>
          <span
            className="text-[clamp(5rem,15vw,14rem)] leading-none"
            style={{ fontFamily: "'Bebas Neue', sans-serif", color: "#2DD4BF" }}
          >
            .
          </span>
        </div>

        <div className="reveal mt-12 flex items-end justify-between flex-wrap gap-8">
          <div className="max-w-md">
            <p
              className="text-white/50 text-base leading-relaxed"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Full Stack Developer. I turn ideas into web applications using
              Laravel, PHP, React and Vue.
            </p>
            <div className="flex gap-4 mt-8">
              <button
                onClick={() =>
                  document
                    .getElementById("projects")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="px-6 py-3 text-sm tracking-widest uppercase font-medium transition-all duration-200 hover:opacity-80"
                style={{
                  backgroundColor: "#2DD4BF",
                  color: "#090909",
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                View Projects
              </button>
              <button
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="px-6 py-3 text-sm tracking-widest uppercase font-medium border transition-all duration-200 hover:border-white/40"
                style={{
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "rgba(255,255,255,0.6)",
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                Contact
              </button>
            </div>
          </div>

          <div className="text-right">
            <p
              className="text-white/20 text-xs tracking-[0.3em] uppercase mb-2"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Zob Dhillon
            </p>
            <a
              href="https://github.com/zobdhillon"
              target="_blank"
              rel="noreferrer"
              className="text-white/30 text-xs tracking-widest hover:text-white/70 transition-colors"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              github.com/zobdhillon ↗
            </a>
          </div>
        </div>
      </section>

      <Marquee />

      <div className="px-8 py-5 flex items-center justify-between">
        <span
          className="text-white/15 text-xs tracking-widest"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          © 2025 Zob Dhillon
        </span>
        <span
          className="text-white/15 text-xs tracking-widest"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          Laravel · React · Vue · PHP
        </span>
      </div>
    </div>
  );
}
