import { useEffect, useRef } from "react";

const projects = [
  {
    num: "01",
    title: "Task Tracker",
    description:
      "A full stack task management app built with Laravel. Features user authentication, CRUD operations, dark mode, and a clean Tailwind UI. Built with Laravel Breeze, Blade templates, and Vite.",
    tags: ["Laravel", "PHP", "Tailwind CSS", "MySQL", "Blade"],
    live: "https://github.com/zobdhillon",
    github: "https://github.com/zobdhillon",
    featured: true,
  },
  {
    num: "02",
    title: "Saba — Copywriter Portfolio",
    description:
      "A portfolio site designed and built for a professional copywriter. Clean layout, responsive design, and smooth interactions. A real client project.",
    tags: ["HTML", "CSS", "JavaScript"],
    live: "https://sabach.netlify.app/",
    github: null,
    featured: true,
  },
  {
    num: "03",
    title: "Netflix Clone",
    description:
      "A pixel-perfect static clone of the Netflix landing page. Focused on replicating layout, responsive design, and UI details accurately.",
    tags: ["HTML", "CSS"],
    live: "https://netzobflix.netlify.app/",
    github: "https://github.com/zobdhillon",
    featured: false,
  },
];

export default function Projects() {
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
          03/ Projects
        </span>
        <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
      </div>

      <h2
        className="reveal text-[clamp(3rem,8vw,6rem)] leading-none mb-16"
        style={{ fontFamily: "'Bebas Neue', sans-serif", color: "white" }}
      >
        SELECTED
        <br />
        <span
          style={{
            color: "transparent",
            WebkitTextStroke: "1px rgba(255,255,255,0.2)",
          }}
        >
          WORK
        </span>
        <span style={{ color: "#2DD4BF" }}>.</span>
      </h2>

      {/* Projects list */}
      <div className="space-y-1">
        {projects.map((project) => (
          <div
            key={project.num}
            className="reveal group border-t py-8 flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-12 cursor-default transition-all duration-300 hover:pl-4"
            style={{ borderColor: "rgba(255,255,255,0.07)" }}
          >
            {/* Number */}
            <span
              className="text-xs flex-shrink-0"
              style={{ color: "#2DD4BF", fontFamily: "'JetBrains Mono', monospace" }}
            >
              {project.num}
            </span>

            {/* Title */}
            <h3
              className="text-2xl lg:text-3xl font-display flex-shrink-0 w-full lg:w-64 group-hover:text-white transition-colors"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                color: "rgba(255,255,255,0.7)",
                letterSpacing: "0.05em",
              }}
            >
              {project.title}
              {project.featured && (
                <span
                  className="ml-3 text-xs align-middle px-2 py-0.5"
                  style={{
                    color: "#2DD4BF",
                    border: "1px solid rgba(45,212,191,0.3)",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "9px",
                    letterSpacing: "0.2em",
                  }}
                >
                  FEATURED
                </span>
              )}
            </h3>

            {/* Description */}
            <p
              className="flex-1 text-sm leading-relaxed"
              style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'DM Sans', sans-serif" }}
            >
              {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 lg:w-64 flex-shrink-0">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1"
                  style={{
                    color: "rgba(255,255,255,0.3)",
                    background: "rgba(255,255,255,0.04)",
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Links */}
            <div className="flex gap-4 flex-shrink-0">
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs tracking-widest uppercase transition-colors hover:text-white"
                  style={{ color: "#2DD4BF", fontFamily: "'JetBrains Mono', monospace" }}
                >
                  Live ↗
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs tracking-widest uppercase transition-colors hover:text-white"
                  style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'JetBrains Mono', monospace" }}
                >
                  GitHub ↗
                </a>
              )}
            </div>
          </div>
        ))}

        {/* Bottom border */}
        <div className="border-t" style={{ borderColor: "rgba(255,255,255,0.07)" }} />
      </div>

      {/* More coming */}
      <p
        className="reveal mt-12 text-xs tracking-[0.3em] uppercase"
        style={{ color: "rgba(255,255,255,0.2)", fontFamily: "'JetBrains Mono', monospace" }}
      >
        // More projects coming soon — React & Vue apps in progress
      </p>
    </div>
  );
}
