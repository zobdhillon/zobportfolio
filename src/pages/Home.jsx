import { useEffect, useRef, useState } from "react";
import { Github, Linkedin } from "lucide-react";
import PillButton from "../components/PillButton";
import SideCircle from "../components/SideCircle";

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

// ── Projects pill ──────────────────────────────────────────────────────────────
function ProjectsPill({ onClick }) {
  return (
    <button
      type="button"
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
          background: "white",
          border: "1px solid rgba(255,255,255,0.15)",
          color: "#090909",
          fontSize: "clamp(12px, 1.5vw, 16px)",
        }}
      >
        →
      </span>
    </button>
  );
}

// ── Carousel ───────────────────────────────────────────────────────────────────
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

  const isMobile = containerWidth < 560;
  const isTablet = containerWidth >= 560 && containerWidth < 900;

  const cardWidth = isMobile
    ? Math.min(340, containerWidth * 0.84)
    : isTablet
      ? Math.min(420, containerWidth * 0.55)
      : Math.min(520, Math.max(360, containerWidth * 0.42));

  const cardHeight = isMobile ? 200 : isTablet ? 220 : 240;
  const peek = isMobile ? cardWidth * 0.72 : cardWidth * 0.58;
  const arrowSize = isMobile ? 36 : 48;

  // Fixed: properly use useState, removed broken [setHoveredCenter] destructure
  const go = (dir) => setActive((prev) => (prev + dir + count) % count);

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: cardHeight + 40 }}
    >
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        {projects.map((project, i) => {
          let offset = (((i - active) % count) + count) % count;
          if (offset > count / 2) offset -= count;

          const isCenter = offset === 0;
          const isVisible = Math.abs(offset) <= 1;
          const scale = isCenter ? 1 : 0.86;
          const opacity = isCenter ? 1 : isVisible ? 0.4 : 0;
          const translateX = offset * peek;

          return (
            <article
              key={project.num}
              className={`${isCenter ? "group" : ""} absolute transition-all duration-500 ease-out`}
              style={{
                width: cardWidth,
                height: cardHeight,
                transform: `translateX(${translateX}px) scale(${scale})`,
                opacity,
                zIndex: isCenter ? 20 : 10,
                pointerEvents: isCenter ? "auto" : "none",
              }}
            >
              <div
                className="relative h-full w-full overflow-hidden"
                style={{
                  borderRadius: "12px",
                  background: "#0e0e0e",
                  border: "1px solid rgba(255,255,255,0.13)",
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
                            ? "rgba(255,255,255,0.97)"
                            : "rgba(255,255,255,0.46)",
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
                    background: "rgba(15,15,20,0.75)",
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
                        color: "rgba(255,255,255,0.67)",
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
              </div>
            </article>
          );
        })}
      </div>

      {/* Left arrow — outside overflow-hidden so never clipped */}
      <button
        type="button"
        onClick={() => go(-1)}
        aria-label="Previous project"
        className="absolute top-1/2 z-30 flex -translate-y-1/2 items-center justify-center transition-all duration-200 hover:border-teal-400/50 hover:text-white"
        style={{
          width: arrowSize,
          height: arrowSize,
          left: isMobile ? 8 : "max(8px, calc(50% - 50vw + 24px))",
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.74)",
          background: "rgba(9,9,9,0.85)",
          color: "rgba(255,255,255,0.74)",
          fontSize: isMobile ? "12px" : "14px",
        }}
      >
        ←
      </button>

      {/* Right arrow */}
      <button
        type="button"
        onClick={() => go(1)}
        aria-label="Next project"
        className="absolute top-1/2 z-30 flex -translate-y-1/2 items-center justify-center transition-all duration-200 hover:border-teal-400/50 hover:text-white"
        style={{
          width: arrowSize,
          height: arrowSize,
          right: isMobile ? 8 : "max(8px, calc(50% - 50vw + 24px))",
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.74)",
          background: "rgba(9,9,9,0.85)",
          color: "rgba(255,255,255,0.74)",
          fontSize: isMobile ? "12px" : "14px",
        }}
      >
        →
      </button>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────
export default function Home() {
  const heroRef = useRef(null);

  useEffect(() => {
    const els = heroRef.current?.querySelectorAll(".reveal");
    if (!els) return;
    const timeouts = [];
    els.forEach((el, i) => {
      const t = setTimeout(() => el.classList.add("show"), 100 + i * 120);
      timeouts.push(t);
    });
    return () => timeouts.forEach(clearTimeout);
  }, []);

  const scrollToProjects = () =>
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });

  return (
    <main
      ref={heroRef}
      className="relative w-full"
      style={{
        background: "#090909",
        minHeight: "100vh",
        paddingTop: "72px",
        overflow: "hidden",
      }}
    >
      {/* Half circle — right side, starts below navbar */}
      <SideCircle side="right" align="center" size="80vh" showAmount={50} />

      <div
        className="relative mx-auto flex w-full max-w-7xl flex-col px-4 sm:px-6 md:px-8 pb-10"
        style={{ minHeight: "calc(100vh - 72px)", zIndex: 1 }}
      >
        {/* ── DESKTOP layout (md+) ───────────────────────────────────────── */}
        <div className="hidden md:block">
          <div className="reveal flex items-start justify-between gap-6 mt-12">
            <h1
              className="leading-none text-white"
              style={{
                fontFamily: "'Fira Code', monospace",
                fontWeight: 700,
                fontSize: "clamp(2rem, 6.5vw, 7rem)",
              }}
            >
              Full-stack
            </h1>
            <div className="mt-4 shrink-0">
              <ProjectsPill onClick={scrollToProjects} />
            </div>
          </div>

          <div className="reveal mt-2 flex items-end justify-between gap-8">
            <p
              className="max-w-xs leading-relaxed"
              style={{
                color: "rgba(255,255,255,0.5)",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 300,
                fontSize: "clamp(13px, 1.4vw, 18px)",
              }}
            >
              My goal is to{" "}
              <em
                style={{
                  fontStyle: "italic",
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.85)",
                }}
              >
                write functional, clean
              </em>{" "}
              and{" "}
              <em
                style={{
                  fontStyle: "italic",
                  fontWeight: 500,
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
                fontWeight: 700,
                fontSize: "clamp(2rem, 6.5vw, 7rem)",
              }}
            >
              Developer<span style={{ color: "#2DD4BF" }}>.</span>
            </h2>
          </div>
        </div>

        {/* ── MOBILE layout (<md) ───────────────────────────────────────── */}
        <div className="md:hidden mt-10">
          <h1
            className="reveal leading-tight text-white text-center"
            style={{
              fontFamily: "'Fira Code', monospace",
              fontWeight: 700,
              fontSize: "clamp(2.4rem, 12vw, 3.5rem)",
            }}
          >
            Full-stack
            <br />
            Developer<span style={{ color: "#2DD4BF" }}>.</span>
          </h1>

          <p
            className="reveal mt-5 text-center leading-relaxed"
            style={{
              color: "rgba(255,255,255,0.5)",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 300,
              fontSize: "14px",
            }}
          >
            My goal is to{" "}
            <em
              style={{
                fontStyle: "italic",
                fontWeight: 500,
                color: "rgba(255,255,255,0.85)",
              }}
            >
              write functional, clean
            </em>{" "}
            and{" "}
            <em
              style={{
                fontStyle: "italic",
                fontWeight: 500,
                color: "rgba(255,255,255,0.85)",
              }}
            >
              maintainable code
            </em>{" "}
            that makes every project enjoyable to build.
          </p>

          <div className="reveal mt-6 flex justify-center">
            <ProjectsPill onClick={scrollToProjects} />
          </div>
        </div>

        {/* ── Social pills ──────────────────────────────────────────────── */}
        <div className="reveal mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {socials.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-4 sm:px-5 py-2 transition-colors duration-200"
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
            <span className="relative flex h-2 w-2">
              <span
                className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                style={{ background: "#2DD4BF" }}
              />
              <span
                className="relative inline-flex h-2 w-2 rounded-full"
                style={{ background: "#2DD4BF" }}
              />
            </span>
            Available for work
          </div>
        </div>

        {/* ── Carousel ──────────────────────────────────────────────────── */}
        <div className="reveal mt-8 flex-1 flex items-center justify-center min-h-0">
          <div className="relative w-full" style={{ zIndex: 1 }}>
            <ProjectCarousel />
          </div>
        </div>
      </div>
    </main>
  );
}
