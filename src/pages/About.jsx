import { useEffect, useRef } from "react";

const skills = [
  { category: "Frontend", items: ["HTML", "CSS", "JavaScript", "React", "Vue 3", "Tailwind CSS", "TypeScript"] },
  { category: "Backend", items: ["PHP", "Laravel", "MySQL"] },
  { category: "Tools", items: ["Git", "GitHub", "Vite", "Figma", "VS Code"] },
];

export default function About() {
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
      }, i * 100);
    });
  }, []);

  return (
    <div ref={ref} className="min-h-screen pt-32 pb-20 px-8 max-w-7xl mx-auto w-full">
      {/* Section label */}
      <div className="reveal flex items-center gap-3 mb-16">
        <span className="text-xs tracking-[0.3em] uppercase" style={{ color: "#2DD4BF", fontFamily: "'JetBrains Mono', monospace" }}>
          02/ About
        </span>
        <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        {/* Left — text */}
        <div>
          <h2
            className="reveal text-[clamp(3rem,8vw,6rem)] leading-none mb-10"
            style={{ fontFamily: "'Bebas Neue', sans-serif", color: "white" }}
          >
            WHO I<br />
            <span style={{ color: "transparent", WebkitTextStroke: "1px rgba(255,255,255,0.2)" }}>AM</span>
            <span style={{ color: "#2DD4BF" }}>.</span>
          </h2>

          <p className="reveal text-white/50 leading-relaxed mb-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            I'm a self-taught full stack developer with a passion for building clean, functional web applications. I started learning web development on my own — from HTML and CSS all the way to building full stack apps with Laravel.
          </p>
          <p className="reveal text-white/50 leading-relaxed mb-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            My background is in English Literature, which taught me how to communicate clearly — something I bring to my code and my work with clients.
          </p>
          <p className="reveal text-white/50 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            I've built real projects — from a Laravel task tracker with authentication to a client portfolio site. Currently focused on deepening my React and Vue skills while continuing to build.
          </p>

          {/* Status */}
          <div
            className="reveal mt-10 p-5 border flex items-center gap-4"
            style={{ borderColor: "rgba(45,212,191,0.15)", background: "rgba(45,212,191,0.03)" }}
          >
            <span className="w-2 h-2 rounded-full animate-pulse flex-shrink-0" style={{ backgroundColor: "#2DD4BF" }} />
            <span className="text-sm" style={{ color: "#2DD4BF", fontFamily: "'JetBrains Mono', monospace" }}>
              Open to full-time & freelance opportunities
            </span>
          </div>
        </div>

        {/* Right — skills */}
        <div className="space-y-10">
          {skills.map((group) => (
            <div key={group.category} className="reveal">
              <p
                className="text-xs tracking-[0.3em] uppercase mb-4"
                style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'JetBrains Mono', monospace" }}
              >
                {group.category}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-xs tracking-wider border transition-colors duration-200 hover:border-teal-400/40 cursor-default"
                    style={{
                      borderColor: "rgba(255,255,255,0.1)",
                      color: "rgba(255,255,255,0.6)",
                      fontFamily: "'JetBrains Mono', monospace",
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}

          {/* Education */}
          <div className="reveal pt-4 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
            <p
              className="text-xs tracking-[0.3em] uppercase mb-4"
              style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'JetBrains Mono', monospace" }}
            >
              Education
            </p>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-white/70 text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  BS English Literature
                </p>
                <p className="text-white/30 text-xs mt-1" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  Islamia University of Bahawalpur
                </p>
              </div>
              <span className="text-xs" style={{ color: "#2DD4BF", fontFamily: "'JetBrains Mono', monospace" }}>
                2020–2024
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
