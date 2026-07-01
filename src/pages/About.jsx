import { useEffect, useRef } from "react";
import CircleIconButton from "../components/CircleIconButton";
import SideCircle from "../components/SideCircle";

// ── Skill card data ────────────────────────────────────────────────────────────
const frontEnd = {
  title: "Front-end",
  techs: [
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Redux",
    "Tailwind CSS",
    "HTML",
    "CSS",
  ],
};
const styles = {
  title: "Styles",
  techs: [
    "Tailwind CSS",
    "SCSS",
    "CSS Modules",
    "Styled Components",
    "Framer Motion",
  ],
};
const backEnd = {
  title: "Back-end",
  techs: [
    "Laravel",
    "PHP",
    "Node.js",
    "MySQL",
    "PostgreSQL",
    "MongoDB",
    "REST APIs",
    "Groq API",
  ],
};
const devOps = {
  title: "Tools & More",
  techs: ["Git", "GitHub", "Vite", "Figma", "Vercel", "Netlify"],
};

function GithubFilled({ size = 16, color = "rgba(255,255,255,0.9)" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

// ── Reusable skill card ────────────────────────────────────────────────────────
function SkillCard({
  title,
  techs,
  style = {},
  titleStyle = {},
  techStyle = {},
}) {
  return (
    <div
      style={{
        background: "#0e0e0e",
        border: "1px solid rgba(0,210,163,0.2)",
        borderRadius: "12px",
        padding: "24px",
        ...style,
      }}
    >
      <h3
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "22px",
          letterSpacing: "0.08em",
          color: "rgba(255,255,255,0.97)",
          marginBottom: "12px",
          ...titleStyle,
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "12px",
          lineHeight: "2",
          color: "rgba(255, 255, 255, 0.86)",
          ...techStyle,
        }}
      >
        {techs.join(" / ")}
      </p>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────
export default function About() {
  const sectionRef = useRef(null);

  // Reveal animation — same pattern as Home.jsx
  useEffect(() => {
    const elements = sectionRef.current?.querySelectorAll(".reveal");
    if (!elements) return;
    const timeouts = [];
    elements.forEach((el, i) => {
      const t = setTimeout(() => el.classList.add("show"), 120 * i);
      timeouts.push(t);
    });
    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        background: "#090909",
        minHeight: "100vh",
        paddingTop: "72px",
        paddingBottom: "60px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative corner arc — mirrors navbar quarter-circle language */}
      <SideCircle
        side="left"
        align="top"
        size="600px"
        showAmount={70}
        nudgeY="120px"
      />

      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "40px 32px 0",
        }}
      >
        {/* ── Top row: breadcrumb + intro ──────────────────────────────────── */}
        <div
          className="reveal"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.4fr 1fr",
            gap: "24px",
            alignItems: "start",
            marginBottom: "56px",
          }}
        >
          {/* Breadcrumb */}
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "11px",
              color: "rgba(255, 255, 255, 0.88)",
              letterSpacing: "0.1em",
              paddingTop: "4px",
            }}
          >
            ... /About me ...
          </p>

          {/* Intro text */}
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "15px",
              lineHeight: "1.85",
              color: "rgba(255, 255, 255, 0.68)",
            }}
          >
            Hello! I&apos;m Zobia, I&apos;m a{" "}
            <em style={{ fontStyle: "italic", color: "#f0f5f4" }}>
              full-stack developer
            </em>
            .<br />
            Building thoughtful web experiences,{" "}
            <em style={{ fontStyle: "italic", color: "#f0f5f4" }}>
              one layer at a time
            </em>
            .
          </p>

          {/* Spacer */}
          <div />
        </div>

        {/* ── Body: cards + portrait ───────────────────────────────────────── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.25fr 1fr",
            gap: "48px",
            alignItems: "start",
          }}
        >
          {/* LEFT — skill cards */}
          <div
            className="reveal"
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            {/* Front-end */}
            <SkillCard
              {...frontEnd}
              style={{
                maxWidth: "520px",
                background: "rgba(255,255,255,0.97)",
                border: "1px solid rgba(255,255,255,0.97)",
              }}
              titleStyle={{ color: "#090909" }}
              techStyle={{ color: "rgba(0, 0, 0, 0.85)" }}
            />

            {/* Styles row + arrow button */}
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <SkillCard {...styles} style={{ width: "300px" }} />

              {/* Circular arrow button */}
              <CircleIconButton
                leftIcon={GithubFilled}
                href="https://github.com/zobdhillon"
                label="GitHub"
              />
            </div>

            {/* Back-end */}
            <SkillCard {...backEnd} style={{ maxWidth: "520px" }} />

            {/* Caption + DevOps */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                gap: "32px",
                paddingTop: "8px",
              }}
            >
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontStyle: "italic",
                  fontSize: "12px",
                  lineHeight: "1.6",
                  color: "rgba(255, 255, 255, 0.57)",
                  maxWidth: "180px",
                }}
              >
                Some of my{" "}
                <em style={{ color: "#f0f5f4" }}>
                  favorite technologies, topics, or tools
                </em>{" "}
                that I worked with
              </p>
              <SkillCard {...devOps} style={{ width: "260px" }} />
            </div>
          </div>

          {/* RIGHT — portrait */}
          <div
            className="reveal"
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <div
              style={{
                width: "340px",
                height: "440px",
                borderRadius: "18px",
                border: "1px solid rgba(0,210,163,0.2)",
                background: "#0e0e0e",
                overflow: "hidden",
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=680&q=80"
                alt="Portrait of Zobia"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  filter: "grayscale(100%) contrast(1.1)",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile layout overrides ─────────────────────────────────────────── */}
      <style>{`
        /* Reveal animation — same pattern as Home.jsx */
        .reveal {
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 0.55s ease, transform 0.55s ease;
        }
        .reveal.show {
          opacity: 1;
          transform: translateY(0);
        }

        @media (max-width: 767px) {
          #about > div {
            padding: 24px 20px 0 !important;
          }

          /* Top row: stack vertically */
          #about .reveal:first-child {
            grid-template-columns: 1fr !important;
          }

          /* Body grid: single column */
          #about > div > div:last-child {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }

          /* Cards: full width */
          #about [style*="maxWidth: 520"] {
            max-width: 100% !important;
          }
          #about [style*="width: 300"] {
            width: 100% !important;
          }
          #about [style*="width: 260"] {
            width: 100% !important;
          }

          /* Portrait: centered, smaller */
          #about > div > div:last-child > div:last-child {
            justify-content: center !important;
          }
          #about > div > div:last-child > div:last-child > div {
            width: 100% !important;
            height: 300px !important;
          }

          /* Caption + DevOps: stack */
          #about [style*="alignItems: flex-end"] {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
        }
      `}</style>
    </section>
  );
}
