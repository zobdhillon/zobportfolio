import { useEffect, useRef, useState } from "react";
import { Github, Linkedin } from "lucide-react";
import PillButton from "../components/PillButton";
import SideCircle from "../components/SideCircle";
import rehearseImg from "../assets/rehearse.png";
import devlogsImg from "../assets/devlogs.png";
import resumeImg from "../assets/resume.png";
import useReveal from "../hooks/useReveal";

const projects = [
  {
    num: "00",
    title: "Rehearse",
    description:
      "AI-powered interview practice platform with real-time feedback, scoring, and session tracking.",
    tags: ["Laravel", "PHP", "MySQL", "Groq API"],
    live: "https://rehearse-aicoach.up.railway.app",
    github: "https://github.com/zobdhillon/Rehearse",
    image: rehearseImg,
  },
  {
    num: "01",
    title: "DevLogs",
    description:
      "A full stack developer social platform. Create posts, track learning progress and interact with other developers.",
    tags: ["Laravel", "PHP", "MySQL", "Tailwind"],
    live: "https://devlogs-zobdhillon.up.railway.app/",
    github: "https://github.com/zobdhillon/devlogs",
    image: devlogsImg,
  },
  {
    num: "02",
    title: "Resume",
    description:
      "A dynamic resume generator that renders your entire resume from a single JSON data file, keeping content and presentation cleanly separated",
    tags: ["HTML", "Tailwind", "Laravel"],
    live: "https://sabach.netlify.app/",
    github: "https://github.com/zobdhillon/SabaCh",
    image: resumeImg,
  },
  {
    num: "03",
    title: "Resume",
    description:
      "Dynamic resume generator that renders your entire resume from a single JSON data file, keeping content and presentation cleanly separated.",
    tags: ["JavaScript", "JSON", "Railway"],
    live: "https://zob-resume.up.railway.app/",
    github: "https://github.com/zobdhillon/Resume",
    image: resumeImg,
  },
];

const socials = [
  { label: "GitHub", href: "https://github.com/zobdhillon", icon: Github },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/zobdhillon/",
    icon: Linkedin,
  },
];

function ProjectsPill({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Go to projects"
      className="group flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DD4BF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#090909]"
      style={{
        background: "transparent",
        border: "none",
        padding: 0,
        cursor: "pointer",
      }}
    >
      <span
        className="flex items-center py-2.5 sm:py-3 transition-opacity duration-300 group-hover:opacity-80"
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
        className="flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:translate-x-1 group-hover:-rotate-45"
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

function Tagline({ className = "", fontSize }) {
  const emphasisStyle = {
    fontStyle: "italic",
    fontWeight: 500,
    color: "rgba(255,255,255,0.85)",
  };

  return (
    <p
      className={className}
      style={{
        color: "rgba(255,255,255,0.5)",
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 300,
        fontSize,
      }}
    >
      My goal is to <em style={emphasisStyle}>write functional, clean</em> and{" "}
      <em style={emphasisStyle}>maintainable code</em> that makes every project
      enjoyable to build.
    </p>
  );
}

// Carousel prev/next buttons — identical apart from direction, label, arrow
// glyph, and which side they sit on.
function CarouselArrow({ direction, onClick, arrowSize, isMobile }) {
  const isPrev = direction === -1;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isPrev ? "Previous project" : "Next project"}
      className="absolute top-1/2 z-30 flex -translate-y-1/2 items-center justify-center transition-transform duration-200 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DD4BF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#090909]"
      style={{
        width: arrowSize,
        height: arrowSize,
        [isPrev ? "left" : "right"]: isMobile
          ? 8
          : "max(8px, calc(50% - 50vw + 24px))",
        borderRadius: "50%",
        border: "1px solid rgba(255,255,255,0.74)",
        background: "rgba(9,9,9,0.85)",
        color: "rgba(255,255,255,0.74)",
        fontSize: isMobile ? "12px" : "14px",
      }}
    >
      {isPrev ? "←" : "→"}
    </button>
  );
}

function ProjectCarousel() {
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(900);
  const [active, setActive] = useState(0);
  const count = projects.length;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });

    resizeObserver.observe(el);

    return () => resizeObserver.disconnect();
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
          // Dim via an internal overlay instead of element opacity, so the
          // card stays fully opaque and blocks SideCircle behind it.
          const dimAmount = isCenter ? 0 : isVisible ? 0.65 : 1; // 1 = fully hidden
          const translateX = offset * peek;

          return (
            <article
              key={project.num}
              className={`${isCenter ? "group" : ""} absolute transition-all duration-500 ease-out`}
              style={{
                width: cardWidth,
                height: cardHeight,
                // translateZ(0) forces this card onto its own GPU compositing
                // layer, so the browser scales/animates it with the GPU's
                // sub-pixel-accurate transform instead of re-rasterizing at
                // low-precision CPU-scaled coordinates on every frame — this
                // is what keeps the image crisp during the scale/slide
                // transition instead of it going soft mid-animation.
                transform: `translateX(${translateX}px) translateZ(0) scale(${scale})`,
                opacity: isVisible ? 1 : 0,
                zIndex: isCenter ? 20 : 10,
                pointerEvents: isCenter ? "auto" : "none",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                willChange: "transform",
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
                <div
                  className="p-4"
                  style={{ position: "relative", zIndex: 1, height: "100%" }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      position: "absolute",
                      top: 0,
                      left: 0,
                      filter: "grayscale(100%)",
                      // Explicit "auto" keeps the browser's default
                      // high-quality resampling — some browsers fall back to
                      // a cheaper/blurrier algorithm on transformed images
                      // unless this is stated explicitly.
                      imageRendering: "auto",
                      // Own compositing layer for the image too, so it isn't
                      // re-rasterized as part of its ancestor's transform.
                      transform: "translateZ(0)",
                      backfaceVisibility: "hidden",
                    }}
                  />
                </div>

                {/* Dim overlay — replaces element opacity so side cards stay
                    solid (blocking SideCircle) while still reading as faded */}
                {dimAmount > 0 && (
                  <div
                    className="absolute inset-0 transition-opacity duration-500 ease-out"
                    style={{
                      background: "#090909",
                      opacity: dimAmount,
                      zIndex: 4,
                      pointerEvents: "none",
                      borderRadius: "12px",
                    }}
                  />
                )}

                <div
                  className="absolute top-0 right-0 h-full transition-transform duration-500 ease-out flex flex-col justify-between p-4"
                  style={{
                    width: isMobile ? "75%" : "65%",
                    background: "rgba(10, 10, 10, 0.95)",
                    borderLeft: "1px solid rgba(255,255,255,0.06)",
                    zIndex: 3,
                    transform: isCenter ? undefined : "translateX(100%)",
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
                        color: "rgba(255, 255, 255, 0.88)",
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
                            opacity: 0.9,
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

      <CarouselArrow
        direction={-1}
        onClick={() => go(-1)}
        arrowSize={arrowSize}
        isMobile={isMobile}
      />
      <CarouselArrow
        direction={1}
        onClick={() => go(1)}
        arrowSize={arrowSize}
        isMobile={isMobile}
      />
    </div>
  );
}

export default function Home() {
  const heroRef = useReveal();

  const scrollToProjects = () => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    return document.getElementById("projects")?.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

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
      <SideCircle
        side="right"
        align="center"
        size="clamp(300px, 60vw, 800px)"
        showAmount={50}
      />

      <div
        className="relative mx-auto flex w-full max-w-7xl flex-col px-4 sm:px-6 md:px-8 pb-10"
        style={{ minHeight: "calc(100vh - 72px)", zIndex: 1 }}
      >
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
            <Tagline
              className="max-w-xs leading-relaxed"
              fontSize="clamp(13px, 1.4vw, 18px)"
            />
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

          <Tagline
            className="reveal mt-5 text-center leading-relaxed"
            fontSize="14px"
          />

          <div className="reveal mt-6 flex justify-center">
            <ProjectsPill onClick={scrollToProjects} />
          </div>
        </div>

        <div className="reveal mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {socials.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={`${label} external link`}
              className="flex items-center gap-2 px-4 sm:px-5 py-2 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DD4BF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#090909]"
              style={{
                borderRadius: "999px",
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(15,15,15,0.92)",
                color: "rgba(255,255,255,0.6)",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "11px",
                letterSpacing: "0.05em",
                position: "relative",
                zIndex: 1,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.border = "1px solid rgba(45,212,191,0.4)";
                e.currentTarget.style.color = "rgba(255,255,255,0.9)";
                e.currentTarget.style.background = "rgba(20,30,29,0.92)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.border =
                  "1px solid rgba(255,255,255,0.12)";
                e.currentTarget.style.color = "rgba(255,255,255,0.6)";
                e.currentTarget.style.background = "rgba(15,15,15,0.92)";
              }}
            >
              <Icon size={13} strokeWidth={1.8} />
              {label} ↗
            </a>
          ))}

          <button
            type="button"
            onClick={() => {
              const prefersReducedMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)",
              ).matches;
              document.getElementById("contact")?.scrollIntoView({
                behavior: prefersReducedMotion ? "auto" : "smooth",
              });
            }}
            aria-label="Go to contact section"
            className="flex items-center gap-2 px-4 sm:px-5 py-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DD4BF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#090909]"
            style={{
              borderRadius: "999px",
              border: "1px solid rgba(45,212,191,0.2)",
              background: "rgba(15,25,24,0.92)",
              color: "#2DD4BF",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "11px",
              position: "relative",
              zIndex: 1,
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
          </button>
        </div>

        <div className="reveal mt-8 flex-1 flex items-center justify-center min-h-0">
          <div className="relative w-full" style={{ zIndex: 1 }}>
            <ProjectCarousel />
          </div>
        </div>
      </div>
    </main>
  );
}
