import { useEffect, useRef } from "react";
import CircleIconButton from "../components/CircleIconButton";
import SideCircle from "../components/SideCircle";
import profilePic from "../assets/profile-pic.png";

// ── Skill card data ────────────────────────────────────────────────────────────
const frontEnd = {
  title: "Front-end",
  techs: [
    "React",
    "Vue",
    "TypeScript",
    "JavaScript",
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
    "REST APIs",
    "Groq API",
  ],
};
const devOps = {
  title: "Tools & More",
  techs: ["Git", "GitHub", "Vite", "Figma", "Vercel", "Netlify", "Railway"],
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
  className = "",
}) {
  return (
    <div
      className={className}
      style={{
        background: "#0e0e0e",
        border: "1px solid rgba(255,255,255,0.15)",
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

  // Reveal animation — triggers when each element scrolls further into view
  useEffect(() => {
    const elements = sectionRef.current?.querySelectorAll(".reveal");
    if (!elements) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          } else {
            entry.target.classList.remove("show");
          }
        });
      },
      { threshold: 0.25, rootMargin: "0px 0px -15% 0px" },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
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
        zIndex: 0,
        overflow: "hidden",
      }}
    >
      {/* Decorative corner arc — mirrors navbar quarter-circle language.
          Section above has position: relative + zIndex: 0, which forms its
          own stacking context — that's what makes SideCircle's internal
          zIndex: -1 land just above this section's own background, and
          still behind every other element inside the section. */}
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
              className="skill-card-wide"
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
              <SkillCard
                {...styles}
                className="skill-card-styles"
                style={{ width: "300px" }}
              />

              {/* Circular arrow button */}
              <CircleIconButton
                leftIcon={GithubFilled}
                href="https://github.com/zobdhillon"
                label="GitHub"
              />
            </div>

            {/* Back-end */}
            <SkillCard
              {...backEnd}
              className="skill-card-wide"
              style={{ maxWidth: "520px" }}
            />

            {/* Caption + DevOps */}
            <div
              className="about-caption-row"
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
              <SkillCard
                {...devOps}
                className="skill-card-devops"
                style={{ width: "260px" }}
              />
            </div>
          </div>

          {/* RIGHT — portrait */}
          <div
            className="reveal"
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <div
              className="portrait-box"
              style={{
                borderRadius: "18px",
                border: "1px solid rgba(0,210,163,0.2)",
                background: "#0e0e0e",
                overflow: "hidden",
              }}
            >
              <img
                src={profilePic}
                alt="Portrait of Zobia"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  filter: "grayscale(100%)",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Responsive overrides ─────────────────────────────────────────── */}
      <style>{`
                /* Reveal animation — same pattern as Home.jsx */
        .reveal {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .reveal.show {
          opacity: 1;
          transform: translateY(0);
        }

        .portrait-box {
          width: 340px;
          height: 440px;
        }

        /* Tablet */
        @media (max-width: 1024px) {
          #about > div {
            padding: 32px 24px 0 !important;
          }
          #about .reveal:first-child {
            grid-template-columns: 1fr 1.2fr !important;
            gap: 16px !important;
          }
          #about .reveal:first-child > div:last-child {
            display: none;
          }
          #about > div > div:last-child {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .portrait-box {
            width: 100%;
            max-width: 340px;
            height: auto;
            aspect-ratio: 340 / 440;
            margin: 0 auto;
          }
        }

        /* Mobile */
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
          .skill-card-wide,
          .skill-card-styles,
          .skill-card-devops {
            max-width: 100% !important;
            width: 100% !important;
          }

          /* Caption + DevOps: stack */
          .about-caption-row {
            flex-direction: column !important;
            align-items: flex-start !important;
          }

          /* Portrait: centered, scales with width */
          #about > div > div:last-child > div:last-child {
            justify-content: center !important;
          }
          .portrait-box {
            width: 100%;
            max-width: 100%;
            height: auto;
            aspect-ratio: 4 / 3;
          }
        }
      `}</style>
    </section>
  );
}
