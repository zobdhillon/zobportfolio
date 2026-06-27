import { useEffect, useRef, useState } from "react";
import Marquee from "../components/Marquee";

const projects = [
  {
    num: "00",
    title: "DevLogs",
    description:
      "A full stack developer-focused social platform built with Laravel. Create posts, track learning progress, set goals, and interact with other developers.",
    tags: ["Laravel", "PHP", "MySQL", "Tailwind"],
    live: "https://devlogs.42web.io",
    github: "https://github.com/zobdhillon/devlogs",
    image: null,
  },
  {
    num: "01",
    title: "Task Tracker",
    description:
      "A full stack task management app with authentication, CRUD operations, dark mode, and a clean Tailwind UI built with Laravel Breeze.",
    tags: ["Laravel", "PHP", "MySQL", "Blade"],
    github: "https://github.com/zobdhillon/TaskTracker",
    image: null,
  },
  {
    num: "02",
    title: "Saba — Copywriter Portfolio",
    description:
      "A portfolio site designed and built for a professional copywriter. Clean layout, responsive design, smooth interactions. A real client project.",
    tags: ["HTML", "CSS", "JavaScript"],
    live: "https://sabach.netlify.app/",
    image: null,
  },
];

const socials = [
  { label: "GitHub", href: "https://github.com/zobdhillon" },
  { label: "LinkedIn", href: "https://linkedin.com" },
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

  const cardWidth = Math.min(480, Math.max(260, containerWidth * 0.46));
  const step = Math.min(cardWidth * 0.68, containerWidth / 2);
  const go = (dir) => setActive((prev) => (prev + dir + count) % count);

  return (
    <div className="mt-16 pb-20">
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden"
        style={{ height: "320px" }}
      >
        {projects.map((project, i) => {
          let offset = (((i - active) % count) + count) % count;
          if (offset > count / 2) offset -= count;

          const isCenter = offset === 0;
          const isVisible = Math.abs(offset) <= 1;
          const scale = isCenter ? 1 : 0.85;
          const opacity = isCenter ? 1 : isVisible ? 0.4 : 0;

          return (
            <article
              key={project.num}
              className="group absolute top-1/2 left-1/2 overflow-hidden transition-all duration-500 ease-out"
              style={{
                width: cardWidth,
                height: "300px",
                borderRadius: "16px",
                transform: `translate(-50%, -50%) translateX(${offset * step}px) scale(${scale})`,
                opacity,
                zIndex: isCenter ? 20 : 10 - Math.abs(offset),
                pointerEvents: isCenter ? "auto" : "none",
                background: isCenter
                  ? "rgba(255,255,255,0.06)"
                  : "rgba(255,255,255,0.03)",
                border: `1px solid ${isCenter ? "rgba(45,212,191,0.4)" : "rgba(255,255,255,0.08)"}`,
              }}
            >
              {/* Cover image area */}
              <div
                className="relative w-full flex items-center justify-center"
                style={{
                  height: "150px",
                  background: "rgba(255,255,255,0.02)",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <span
                      style={{
                        color: "rgba(255,255,255,0.15)",
                        fontSize: "11px",
                        fontFamily: "'JetBrains Mono', monospace",
                        letterSpacing: "0.2em",
                      }}
                    >
                      {project.num}
                    </span>
                    <div
                      style={{
                        width: "32px",
                        height: "1px",
                        background: "rgba(45,212,191,0.3)",
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Title — visible by default, fades on hover */}
              <div
                className="absolute px-6 transition-opacity duration-300 group-hover:opacity-0"
                style={{ top: "162px" }}
              >
                <h3
                  className="text-white leading-tight"
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "22px",
                    letterSpacing: "0.05em",
                  }}
                >
                  {project.title}
                </h3>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5"
                      style={{
                        color: "rgba(255,255,255,0.3)",
                        background: "rgba(255,255,255,0.04)",
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "10px",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Description — slides up on hover */}
              <div
                className="absolute inset-x-0 bottom-0 translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0 p-6"
                style={{
                  background: "rgba(9,9,9,0.95)",
                  borderTop: "1px solid rgba(45,212,191,0.15)",
                }}
              >
                <p
                  className="text-sm leading-relaxed mb-4"
                  style={{
                    color: "rgba(255,255,255,0.5)",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  {project.description}
                </p>
                <div className="flex gap-3">
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 text-xs tracking-widest uppercase transition-colors hover:opacity-80"
                      style={{
                        background: "#2DD4BF",
                        color: "#090909",
                        fontFamily: "'JetBrains Mono', monospace",
                        borderRadius: "4px",
                      }}
                    >
                      Live ↗
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 text-xs tracking-widest uppercase transition-colors hover:border-white/40"
                      style={{
                        border: "1px solid rgba(255,255,255,0.15)",
                        color: "rgba(255,255,255,0.5)",
                        fontFamily: "'JetBrains Mono', monospace",
                        borderRadius: "4px",
                      }}
                    >
                      GitHub ↗
                    </a>
                  )}
                </div>
              </div>
            </article>
          );
        })}

        {/* Side arrows — vertically centered on cards */}
        <button
          onClick={() => go(-1)}
          aria-label="Previous project"
          className="absolute top-1/2 -translate-y-1/2 flex items-center justify-center transition-colors duration-200 hover:border-teal-400/50 z-30"
          style={{
            left: "16px",
            width: "44px",
            height: "44px",
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.15)",
            background: "rgba(9,9,9,0.8)",
            color: "rgba(255,255,255,0.6)",
          }}
        >
          ←
        </button>
        <button
          onClick={() => go(1)}
          aria-label="Next project"
          className="absolute top-1/2 -translate-y-1/2 flex items-center justify-center transition-colors duration-200 hover:border-teal-400/50 z-30"
          style={{
            right: "16px",
            width: "44px",
            height: "44px",
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.15)",
            background: "rgba(9,9,9,0.8)",
            color: "rgba(255,255,255,0.6)",
          }}
        >
          →
        </button>
      </div>
    </div>
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

  return (
    <div ref={heroRef} className="min-h-screen flex flex-col">
      <div className="flex-1 px-8 pt-28 max-w-7xl mx-auto w-full">
        {/* Row 1 — "FULL STACK" + Projects pill */}
        <div className="reveal flex items-center justify-between gap-6 mb-2">
          <h1
            className="text-[clamp(4rem,12vw,11rem)] leading-none text-white"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              letterSpacing: "-0.01em",
            }}
          >
            FULL STACK
          </h1>

          {/* Projects pill */}
          <button
            onClick={() =>
              document
                .getElementById("projects")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="flex-shrink-0 flex items-center gap-2 transition-all duration-200 hover:opacity-80"
            style={{
              background: "transparent",
              border: "none",
              padding: 0,
              cursor: "pointer",
            }}
          >
            {/* White pill */}
            <span
              className="flex items-center px-24 py-3"
              style={{
                borderRadius: "999px",
                background: "white",
                color: "#090909",
                fontFamily: "Georgia, serif",
                fontSize: "18px",
                fontStyle: "italic",
              }}
            >
              Projects
            </span>

            {/* Separate dark circle with arrow */}
            <span
              className="flex items-center justify-center flex-shrink-0"
              style={{
                width: "52px",
                height: "52px",
                borderRadius: "50%",
                background: "#1a1a1a",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "white",
                fontSize: "18px",
              }}
            >
              →
            </span>
          </button>
        </div>

        {/* Row 2 — description left + "DEVELOPER." right */}
        <div className="reveal flex items-center justify-between gap-8 mb-12">
          <p
            className="max-w-xs text-base leading-relaxed"
            style={{
              color: "rgba(255,255,255,0.4)",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Full Stack Developer. I build web applications using Laravel, PHP,
            React and Vue — clean code, real results.
          </p>

          <h2
            className="text-[clamp(4rem,12vw,11rem)] leading-none flex-shrink-0"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              color: "transparent",
              WebkitTextStroke: "2px rgba(255,255,255,0.25)",
              letterSpacing: "-0.01em",
            }}
          >
            DEVELOPER
            <span style={{ color: "#2DD4BF", WebkitTextStroke: "0" }}>.</span>
          </h2>
        </div>

        {/* Row 3 — Social pills */}
        <div className="reveal flex flex-wrap justify-center gap-3 mb-4">
          {socials.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 transition-colors duration-200 hover:border-teal-400/50 text-sm"
              style={{
                borderRadius: "999px",
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.03)",
                color: "rgba(255,255,255,0.6)",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "12px",
                letterSpacing: "0.05em",
              }}
            >
              {label} ↗
            </a>
          ))}

          {/* Available for work pill */}
          <div
            className="flex items-center gap-2 px-5 py-2.5 text-sm"
            style={{
              borderRadius: "999px",
              border: "1px solid rgba(45,212,191,0.2)",
              background: "rgba(45,212,191,0.04)",
              color: "#2DD4BF",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "12px",
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
        <div className="reveal">
          <ProjectCarousel />
        </div>
      </div>

      {/* Marquee */}
      <Marquee />

      {/* Footer strip */}
      <div className="px-8 py-5 flex items-center justify-between max-w-7xl mx-auto w-full">
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
