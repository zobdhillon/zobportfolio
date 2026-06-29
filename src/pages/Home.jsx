import { useEffect, useRef, useState } from "react";
import { Github, Linkedin } from "lucide-react";
import Marquee from "../components/Marquee";
import PillButton from "../components/PillButton";

const projects = [
  {
    num: "00",
    title: "Rehearse",
    description:
      "AI-powered interview practice platform with real-time feedback, scoring, and session tracking.",
    tags: ["Laravel", "PHP", "MySQL", "Groq API"],
    live: "https://devlogs.42web.io",
    github: null,
    terminal: [
      { prompt: true, text: "project --open rehearse" },
      { prompt: false, text: "→ AI interview practice app" },
      { prompt: false, text: "→ laravel · mysql · groq api" },
      { prompt: true, text: "status --check" },
      { prompt: false, text: "→ live ✓" },
    ],
  },
  {
    num: "01",
    title: "DevLogs",
    description:
      "A full stack developer social platform. Create posts, track learning progress and interact with other developers.",
    tags: ["Laravel", "PHP", "MySQL", "Tailwind"],
    live: "https://devlogs.42web.io",
    github: "https://github.com/zobdhillon/devlogs",
    terminal: [
      { prompt: true, text: "project --open devlogs" },
      { prompt: false, text: "→ developer social platform" },
      { prompt: false, text: "→ laravel · php · mysql" },
      { prompt: true, text: "status --check" },
      { prompt: false, text: "→ live ✓  devlogs.42web.io" },
    ],
  },
  {
    num: "02",
    title: "Saba — Copywriter Portfolio",
    description:
      "A portfolio site designed and built for a professional copywriter. Clean layout, responsive design, real client project.",
    tags: ["HTML", "CSS", "JavaScript"],
    live: "https://sabach.netlify.app/",
    github: null,
    terminal: [
      { prompt: true, text: "project --open saba" },
      { prompt: false, text: "→ copywriter portfolio" },
      { prompt: false, text: "→ html · css · javascript" },
      { prompt: true, text: "status --check" },
      { prompt: false, text: "→ live ✓  sabach.netlify.app" },
    ],
  },
];

const socials = [
  { label: "GitHub", href: "https://github.com/zobdhillon", icon: Github },
  { label: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
];

function ProjectCarousel() {
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(900);
  const [active, setActive] = useState(0);
  const count = projects.length;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => setContainerWidth(el.clientWidth);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const isMobile = containerWidth < 480;
  const isTablet = containerWidth >= 480 && containerWidth < 768;

  const cardWidth = isMobile
    ? containerWidth * 0.82
    : isTablet
      ? Math.min(400, containerWidth * 0.6)
      : Math.min(500, Math.max(280, containerWidth * 0.44));

  const cardHeight = isMobile ? 190 : 220;

  const step = isMobile
    ? containerWidth * 0.86
    : isTablet
      ? containerWidth * 0.68
      : Math.min(cardWidth * 0.65, containerWidth / 2);

  const go = (dir) => setActive((prev) => (prev + dir + count) % count);

  const leftArrowLeft = isMobile
    ? "10px"
    : `calc(50% - ${cardWidth / 2 + step * 0.55}px)`;

  const rightArrowStyle = isMobile
    ? { right: "10px", left: "auto" }
    : { left: `calc(50% + ${cardWidth / 2 + step * 0.55 - 36}px)` };

  return (
    <div className="w-full">
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden"
        style={{ height: `${cardHeight + 40}px` }}
      >
        {projects.map((project, i) => {
          let offset = (((i - active) % count) + count) % count;
          if (offset > count / 2) offset -= count;

          const isCenter = offset === 0;
          const isVisible = Math.abs(offset) <= 1;
          const scale = isCenter ? 1 : 0.87;
          const opacity = isCenter ? 1 : isVisible ? 0.4 : 0;

          return (
            <article
              key={project.num}
              className="group absolute top-1/2 left-1/2 overflow-hidden transition-all duration-500 ease-out"
              style={{
                width: cardWidth,
                height: cardHeight,
                borderRadius: "12px",
                transform: `translate(-50%, -50%) translateX(${offset * step}px) scale(${scale})`,
                opacity,
                zIndex: isCenter ? 20 : 10 - Math.abs(offset),
                pointerEvents: isCenter ? "auto" : "none",
                background: "#0e0e0e",
                border: "1px solid rgba(255, 255, 255, 0.13)",
              }}
            >
              {/* Terminal header */}
              <div
                className="flex items-center gap-2 px-4 py-2.5"
                style={{
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                  background: "rgba(255,255,255,0.02)",
                }}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ background: "#ff5f57" }}
                />
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ background: "#febc2e" }}
                />
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ background: "#28c840" }}
                />
                <span
                  className="ml-3"
                  style={{
                    color: "rgba(255,255,255,0.2)",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "10px",
                  }}
                >
                  zob@portfolio ~ %
                </span>
              </div>

              {/* Terminal body */}
              <div
                className="p-4 transition-opacity duration-300 group-hover:opacity-0"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: isMobile ? "11px" : "12.5px",
                  lineHeight: "2",
                }}
              >
                {project.terminal.map((line, idx) => (
                  <div key={idx} className="flex gap-2">
                    <span style={{ color: "#2DD4BF", flexShrink: 0 }}>
                      {line.prompt ? "~" : " "}
                    </span>
                    <span
                      style={{
                        color: line.prompt
                          ? "rgba(255, 255, 255, 0.97)"
                          : "rgba(255, 255, 255, 0.46)",
                      }}
                    >
                      {line.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* Hover overlay */}
              <div
                className="absolute top-0 right-0 h-full translate-x-full transition-transform duration-500 ease-out group-hover:translate-x-0 flex flex-col justify-between p-4"
                style={{
                  width: isMobile ? "75%" : "65%",
                  background: "rgba(15, 15, 20, 0.75)",
                  backdropFilter: "blur(20px)",
                  borderLeft: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div>
                  <h3
                    className="text-white leading-tight mb-1"
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: isMobile ? "17px" : "20px",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {project.title}
                  </h3>
                  <p
                    className="leading-relaxed mb-3"
                    style={{
                      color: "rgba(255, 255, 255, 0.67)",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: isMobile ? "10px" : "12px",
                    }}
                  >
                    {project.description}
                  </p>
                  <div className="flex gap-1.5 flex-wrap">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          color: "#2DD4BF",
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: "9px",
                          opacity: 0.6,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-2">
                  {project.live ? (
                    <PillButton
                      label="View Live"
                      href={project.live}
                      target="_blank"
                    />
                  ) : project.github ? (
                    <PillButton
                      label="View Code"
                      href={project.github}
                      target="_blank"
                    />
                  ) : null}
                </div>
              </div>
            </article>
          );
        })}

        {/* Left arrow */}
        <button
          onClick={() => go(-1)}
          aria-label="Previous project"
          className="absolute top-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-200 z-30 hover:border-teal-400/50 hover:text-white"
          style={{
            left: leftArrowLeft,
            width: isMobile ? "36px" : "50px",
            height: isMobile ? "36px" : "50px",
            borderRadius: "50%",
            border: "1px solid rgba(255, 255, 255, 0.74)",
            background: "rgba(9,9,9,0.85)",
            color: "rgba(255, 255, 255, 0.74)",
            fontSize: isMobile ? "12px" : "14px",
          }}
        >
          ←
        </button>

        {/* Right arrow */}
        <button
          onClick={() => go(1)}
          aria-label="Next project"
          className="absolute top-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-200 z-30 hover:border-teal-400/50 hover:text-white"
          style={{
            ...rightArrowStyle,
            width: isMobile ? "36px" : "50px",
            height: isMobile ? "36px" : "50px",
            borderRadius: "50%",
            border: "1px solid rgba(255, 255, 255, 0.74)",
            background: "rgba(9,9,9,0.85)",
            color: "rgba(255, 255, 255, 0.74)",
            fontSize: isMobile ? "12px" : "14px",
          }}
        >
          →
        </button>
      </div>
    </div>
  );
}

// Projects pill — reusable so we can place it in two spots
function ProjectsPill({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 transition-all duration-200 hover:opacity-80"
      style={{
        background: "transparent",
        border: "none",
        padding: 0,
        cursor: "pointer",
      }}
    >
      <span
        className="flex items-center py-2.5 sm:py-3"
        style={{
          borderRadius: "999px",
          background: "white",
          color: "#090909",
          fontFamily: "Georgia, serif",
          fontSize: "clamp(12px, 1.5vw, 16px)",
          fontStyle: "italic",
          paddingLeft: "clamp(20px, 5vw, 80px)",
          paddingRight: "clamp(20px, 5vw, 80px)",
        }}
      >
        Projects
      </span>
      <span
        className="flex items-center justify-center flex-shrink-0"
        style={{
          width: "clamp(36px, 4vw, 48px)",
          height: "clamp(36px, 4vw, 48px)",
          borderRadius: "50%",
          background: "#1a1a1a",
          border: "1px solid rgba(255,255,255,0.15)",
          color: "white",
          fontSize: "clamp(12px, 1.5vw, 16px)",
        }}
      >
        →
      </span>
    </button>
  );
}

export default function Home() {
  const heroRef = useRef(null);

  useEffect(() => {
    const els = heroRef.current?.querySelectorAll(".reveal");
    if (!els) return;
    els.forEach((el, i) => {
      setTimeout(() => el.classList.add("show"), i * 120);
    });
  }, []);

  const scrollToProjects = () =>
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });

  return (
    <div ref={heroRef} className="flex flex-col sm:h-screen sm:overflow-hidden">
      <div
        className="flex flex-col px-4 sm:px-6 md:px-8 max-w-7xl mx-auto w-full sm:h-full"
        style={{ paddingTop: "72px" }}
      >
        {/* ── DESKTOP layout (sm+): heading row + desc+Developer row ── */}
        <div className="hidden sm:block">
          {/* Row 1 — Full-stack + Projects pill */}
          <div className="reveal flex items-center justify-between gap-3 mt-12 md:mt-16 mb-1">
            <h1
              className="leading-none text-white"
              style={{
                fontFamily: "'Fira Code', monospace",
                fontWeight: "700",
                fontSize: "clamp(2rem, 6.5vw, 7rem)",
              }}
            >
              Full-stack
            </h1>
            <ProjectsPill onClick={scrollToProjects} />
          </div>

          {/* Row 2 — description + Developer */}
          <div className="reveal flex items-center justify-between gap-8 mb-6">
            <p
              className="max-w-xs leading-relaxed"
              style={{
                color: "rgba(255,255,255,0.5)",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: "300",
                fontSize: "clamp(13px, 1.4vw, 18px)",
              }}
            >
              My goal is to{" "}
              <em
                style={{
                  fontStyle: "italic",
                  fontWeight: "500",
                  color: "rgba(255,255,255,0.85)",
                }}
              >
                write functional, clean
              </em>{" "}
              and{" "}
              <em
                style={{
                  fontStyle: "italic",
                  fontWeight: "500",
                  color: "rgba(255,255,255,0.85)",
                }}
              >
                maintainable code
              </em>{" "}
              that makes every project enjoyable to build.
            </p>
            <h2
              className="leading-none text-white"
              style={{
                fontFamily: "'Fira Code', monospace",
                fontWeight: "700",
                fontSize: "clamp(2rem, 6.5vw, 7rem)",
              }}
            >
              Developer<span style={{ color: "#2DD4BF" }}>.</span>
            </h2>
          </div>
        </div>

        {/* ── MOBILE layout (<sm): stacked, heading centered, pill below desc ── */}
        <div className="block sm:hidden mt-10 mb-4">
          {/* Heading — stacked, centered like the reference */}
          <div className="reveal text-center mb-4">
            <h1
              className="leading-tight text-white"
              style={{
                fontFamily: "'Fira Code', monospace",
                fontWeight: "700",
                fontSize: "clamp(2.4rem, 12vw, 3.5rem)",
              }}
            >
              Full-stack
              <br />
              Developer<span style={{ color: "#2DD4BF" }}>.</span>
            </h1>
          </div>

          {/* Description */}
          <div className="reveal mb-4 text-center">
            <p
              className="leading-relaxed"
              style={{
                color: "rgba(255,255,255,0.5)",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: "300",
                fontSize: "14px",
              }}
            >
              My goal is to{" "}
              <em
                style={{
                  fontStyle: "italic",
                  fontWeight: "500",
                  color: "rgba(255,255,255,0.85)",
                }}
              >
                write functional, clean
              </em>{" "}
              and{" "}
              <em
                style={{
                  fontStyle: "italic",
                  fontWeight: "500",
                  color: "rgba(255,255,255,0.85)",
                }}
              >
                maintainable code
              </em>{" "}
              that makes every project enjoyable to build.
            </p>
          </div>

          {/* Projects pill — below description on mobile */}
          <div className="reveal mb-4 flex justify-center">
            <ProjectsPill onClick={scrollToProjects} />
          </div>
        </div>

        {/* Row 3 — Social pills (both layouts) */}
        <div className="reveal flex flex-wrap justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
          {socials.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-4 sm:px-5 py-2 transition-colors duration-200 hover:border-teal-400/50"
              style={{
                borderRadius: "999px",
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.03)",
                color: "rgba(255,255,255,0.6)",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "11px",
                letterSpacing: "0.05em",
              }}
            >
              <Icon size={13} strokeWidth={1.8} />
              {label} ↗
            </a>
          ))}
          <div
            className="flex items-center gap-2 px-4 sm:px-5 py-2"
            style={{
              borderRadius: "999px",
              border: "1px solid rgba(45,212,191,0.2)",
              background: "rgba(45,212,191,0.04)",
              color: "#2DD4BF",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "11px",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: "#2DD4BF" }}
            />
            Available for work
          </div>
        </div>

        {/* Carousel */}
        <div
          className="reveal sm:flex-1 sm:min-h-0"
          style={{ minHeight: "260px" }}
        >
          <ProjectCarousel />
        </div>
      </div>

      {/* Marquee */}
      <Marquee />
    </div>
  );
}
