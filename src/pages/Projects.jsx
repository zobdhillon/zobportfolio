import { useEffect, useRef } from "react";

const projects = [
  {
    num: "00",
    title: "DevLogs — Developer Social Platform",
    description:
      "A full stack developer-focused social platform built with Laravel. Users can create posts, track learning progress, set goals, explore resources, and interact with other developers. Includes authentication, profiles, dashboard, and a modern UI built with Blade and Tailwind.",
    tags: ["Laravel", "PHP", "MySQL", "Blade", "Tailwind CSS"],
    live: "https://devlogs.42web.io",
    github: "https://github.com/zobdhillon/devlogs",
    featured: true,
  },
  {
    num: "01",
    title: "Task Tracker",
    description:
      "A full stack task management app built with Laravel. Features user authentication, CRUD operations, dark mode, and a clean Tailwind UI. Built with Laravel Breeze, Blade templates, and Vite.",
    tags: ["Laravel", "PHP", "Tailwind CSS", "MySQL", "Blade"],
    github: "https://github.com/zobdhillon/TaskTracker",
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
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );

    // scope to THIS section only
    const reveals = ref.current?.querySelectorAll(".reveal");
    reveals?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="min-h-screen pt-32 pb-20 px-8 max-w-7xl mx-auto w-full"
    >
      <div className="reveal flex items-center gap-3 mb-16">
        <span
          className="text-xs tracking-[0.3em] uppercase"
          style={{
            color: "#2DD4BF",
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          03/ Projects
        </span>
        <div
          className="flex-1 h-px"
          style={{ background: "rgba(255,255,255,0.06)" }}
        />
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

      <div className="space-y-1">
        {projects.map((project) => (
          <div
            key={project.num}
            className="reveal group border-t py-8 flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-12 cursor-default transform transition-transform duration-300 ease-out hover:translate-x-3"
            style={{ borderColor: "rgba(255,255,255,0.07)" }}
          >
            <span
              className="text-xs flex-shrink-0"
              style={{
                color: "#2DD4BF",
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              {project.num}
            </span>

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

            <p
              className="flex-1 text-sm leading-relaxed"
              style={{
                color: "rgba(255,255,255,0.35)",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {project.description}
            </p>

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

            <div className="flex gap-4 flex-shrink-0">
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs tracking-widest uppercase transition-colors hover:text-white"
                  style={{
                    color: "#2DD4BF",
                    fontFamily: "'JetBrains Mono', monospace",
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
                  className="text-xs tracking-widest uppercase transition-colors hover:text-white"
                  style={{
                    color: "rgba(255,255,255,0.3)",
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  GitHub ↗
                </a>
              )}
            </div>
          </div>
        ))}

        <div
          className="border-t"
          style={{ borderColor: "rgba(255,255,255,0.07)" }}
        />
      </div>

      <p
        className="reveal mt-12 text-xs tracking-[0.3em] uppercase"
        style={{
          color: "rgba(255,255,255,0.2)",
          fontFamily: "'JetBrains Mono', monospace",
        }}
      >
        // More projects coming soon — React & Vue apps in progress
      </p>
    </div>
  );
}
