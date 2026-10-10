import SectionLabel from "../components/SectionLabel";
import SideCircle from "../components/SideCircle";
import useReveal from "../hooks/useReveal";

const experience = {
  role: "Full-Stack Web Development Intern",
  company: "Code Cubics",
  headline: ["My", "Journey"],
  type: "Internship",
  period: "Apr 2026 – Sep 2026",
  duration: "6 months",
  points: [
    "Developed backend features for full-stack web applications using Laravel, PHP and MySQL.",
    "Handled database integration and designed queries and relationships for application data.",
    "Integrated third-party and internal APIs into web applications.",
    "Debugged issues and maintained existing web applications, improving stability.",
    "Built responsive interfaces with HTML, CSS, JavaScript and Bootstrap.",
  ],
  tags: ["Laravel", "PHP", "MySQL", "JavaScript", "Bootstrap", "HTML", "CSS"],
};

const pillStyle = {
  borderRadius: "999px",
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(15,15,15,0.92)",
  color: "rgba(255,255,255,0.7)",
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: "12px",
  letterSpacing: "0.05em",
  padding: "10px 22px",
};

export default function Experience() {
  const ref = useReveal({ threshold: 0.1 });
  const job = experience;

  return (
    <div
      ref={ref}
      style={{
        background: "#090909",
        position: "relative",
        overflow: "hidden",
        minHeight: "100vh",
        zIndex: 0,
      }}
    >
      <SideCircle
        side="left"
        align="top"
        size="650px"
        showAmount={70}
        nudgeY="180px"
      />

      <div
        className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-8"
        style={{
          position: "relative",
          paddingTop: "clamp(80px, 10vw, 140px)",
          paddingBottom: "clamp(60px, 8vw, 100px)",
        }}
      >
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 lg:items-start">
          {/* Left: headline, role, date pills */}
          <div
            className="reveal relative flex flex-col justify-between"
            style={{ zIndex: 1, minHeight: "clamp(0px, 40vw, 520px)" }}
          >
            <div>
              <h2
                style={{
                  fontFamily: "'Fira Code', monospace",
                  fontWeight: 700,
                  fontSize: "clamp(2.2rem, 5.5vw, 5rem)",
                  color: "white",
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                  marginBottom: "20px",
                }}
              >
                {job.headline[0]}
                <br />
                {job.headline[1]}
                <span style={{ color: "#2DD4BF" }}>.</span>
              </h2>

              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 300,
                  fontSize: "clamp(15px, 2vw, 20px)",
                  color: "rgba(255,255,255,0.4)",
                  lineHeight: 1.5,
                  maxWidth: "240px",
                }}
              >
                Full-Stack Web Development
                <br />
                at{" "}
                <span
                  style={{
                    color: "rgba(255,255,255,0.85)",
                    fontStyle: "italic",
                  }}
                >
                  {job.company}
                </span>
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-2">
              <span style={pillStyle}>{job.period}</span>
              <span
                style={{
                  ...pillStyle,
                  color: "#2DD4BF",
                  border: "1px solid rgba(45,212,191,0.25)",
                  background: "rgba(15,25,24,0.92)",
                }}
              >
                {job.duration}
              </span>
            </div>
          </div>

          {/* Right: label + terminal-style card */}
          <div className="reveal flex flex-col gap-6" style={{ zIndex: 1 }}>
            <SectionLabel
              style={{
                fontSize: "clamp(13px, 1.5vw, 18px)",
                color: "rgba(255,255,255,0.7)",
              }}
            >
              ... /Experience ...
            </SectionLabel>

            <div
              style={{
                borderRadius: "16px",
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(15,15,15,0.92)",
                backdropFilter: "blur(12px)",
                overflow: "hidden",
              }}
            >
              {/* Terminal header */}
              <div
                className="flex items-center gap-2 px-4 py-3"
                style={{
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                  background: "rgba(10,10,10,0.6)",
                }}
              >
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ background: "#ff5f57" }}
                />
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ background: "#febc2e" }}
                />
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ background: "#28c840" }}
                />
                <span
                  className="ml-4 text-xs"
                  style={{
                    color: "rgba(255,255,255,0.2)",
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  experience.log
                </span>
              </div>

              <div className="p-5 sm:p-6">
                <h3
                  className="text-white leading-tight"
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "24px",
                    letterSpacing: "0.05em",
                  }}
                >
                  {job.role}
                </h3>
                <p
                  className="mt-1"
                  style={{
                    color: "rgba(255,255,255,0.4)",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "11px",
                  }}
                >
                  {job.company} · {job.type}
                </p>

                {/* Timeline-style bullets */}
                <ul
                  className="mt-5 flex flex-col gap-4"
                  style={{
                    borderLeft: "1px solid rgba(45,212,191,0.25)",
                    marginLeft: "4px",
                  }}
                >
                  {job.points.map((point) => (
                    <li
                      key={point}
                      className="relative leading-relaxed"
                      style={{
                        paddingLeft: "20px",
                        color: "rgba(255,255,255,0.85)",
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "12px",
                      }}
                    >
                      <span
                        className="absolute rounded-full"
                        style={{
                          left: "-3px",
                          top: "7px",
                          width: 5,
                          height: 5,
                          background: "#2DD4BF",
                        }}
                      />
                      {point}
                    </li>
                  ))}
                </ul>

                <p
                  className="mt-6"
                  style={{
                    color: "#2DD4BF",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "11px",
                  }}
                >
                  {job.tags.join(" / ")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
