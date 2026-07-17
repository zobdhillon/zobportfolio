import { Github, Linkedin, Mail, Send } from "lucide-react";
import SectionLabel from "../components/SectionLabel";
import SideCircle from "../components/SideCircle";
import SocialPill from "../components/SocialPill";
import useReveal from "../hooks/useReveal";

const socials = [
  { label: "GitHub", href: "https://github.com/zobdhillon", icon: Github },
  { label: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
  { label: "E-mail", href: "mailto:zobbdhillon@gmail.com", icon: Mail },
  { label: "Telegram", href: "https://t.me/zobdhillon", icon: Send },
];

const navLinks = [
  { label: "Main", id: "home" },
  { label: "About", id: "about" },
  { label: "Projects", id: "projects" },
  { label: "Contact", id: "contact" },
];

const scrollTo = (id) => {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  return document.getElementById(id)?.scrollIntoView({
    behavior: prefersReducedMotion ? "auto" : "smooth",
  });
};

// ── Code block (developer.js) ─────────────────────────────────────────────
function CodeBlock() {
  const lines = [
    {
      num: 1,
      content: (
        <>
          <span style={{ color: "#2DD4BF" }}>const</span>
          <span style={{ color: "rgba(255,255,255,0.9)" }}> developer </span>
          <span style={{ color: "rgba(255,255,255,0.4)" }}>=</span>
          <span style={{ color: "rgba(255,255,255,0.9)" }}> {"{"}</span>
        </>
      ),
    },
    {
      num: 2,
      indent: true,
      content: (
        <>
          <span style={{ color: "rgba(255,255,255,0.5)" }}>name</span>
          <span style={{ color: "rgba(255,255,255,0.3)" }}>: </span>
          <span style={{ color: "#2DD4BF", opacity: 0.85 }}>"Zob Dhillon"</span>
          <span style={{ color: "rgba(255,255,255,0.3)" }}>,</span>
        </>
      ),
    },
    {
      num: 3,
      indent: true,
      content: (
        <>
          <span style={{ color: "rgba(255,255,255,0.5)" }}>role</span>
          <span style={{ color: "rgba(255,255,255,0.3)" }}>: </span>
          <span style={{ color: "#2DD4BF", opacity: 0.85 }}>
            "Full Stack Developer"
          </span>
          <span style={{ color: "rgba(255,255,255,0.3)" }}>,</span>
        </>
      ),
    },
    {
      num: 4,
      indent: true,
      content: (
        <>
          <span style={{ color: "rgba(255,255,255,0.5)" }}>email</span>
          <span style={{ color: "rgba(255,255,255,0.3)" }}>: </span>
          <span style={{ color: "#2DD4BF", opacity: 0.85 }}>
            "zobbdhillon@gmail.com"
          </span>
          <span style={{ color: "rgba(255,255,255,0.3)" }}>,</span>
        </>
      ),
    },
    {
      num: 5,
      indent: true,
      content: (
        <>
          <span style={{ color: "rgba(255,255,255,0.5)" }}>github</span>
          <span style={{ color: "rgba(255,255,255,0.3)" }}>: </span>
          <span style={{ color: "#2DD4BF", opacity: 0.85 }}>"zobdhillon"</span>
          <span style={{ color: "rgba(255,255,255,0.3)" }}>,</span>
        </>
      ),
    },
    {
      num: 6,
      indent: true,
      content: (
        <>
          <span style={{ color: "rgba(255,255,255,0.5)" }}>available</span>
          <span style={{ color: "rgba(255,255,255,0.3)" }}>: </span>
          <span style={{ color: "#2DD4BF" }}>true</span>
          <span style={{ color: "rgba(255,255,255,0.3)" }}>,</span>
        </>
      ),
    },
    {
      num: 7,
      content: <span style={{ color: "rgba(255,255,255,0.9)" }}>{"}"}</span>,
    },
  ];

  return (
    <div
      style={{
        borderRadius: "16px",
        border: "1px solid rgba(255,255,255,0.08)",
        background: "rgba(15,15,15,0.92)",
        backdropFilter: "blur(12px)",
        overflow: "hidden",
        position: "relative",
        zIndex: 1,
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
          developer.js
        </span>
      </div>

      {/* Code */}
      <div
        className="p-5"
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "13px",
          lineHeight: "2",
        }}
      >
        {lines.map((line) => (
          <div key={line.num} className="flex gap-4">
            <span
              style={{
                color: "rgba(255,255,255,0.15)",
                minWidth: "20px",
                userSelect: "none",
              }}
            >
              {line.num}
            </span>
            <span className={line.indent ? "pl-6" : ""}>{line.content}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────
export default function Contact() {
  const ref = useReveal({ threshold: 0.1 });

  return (
    <section
      ref={ref}
      id="contact"
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

      {/* Content - on top of everything */}
      <div
        className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-8"
        style={{
          position: "relative",
          paddingTop: "clamp(80px, 10vw, 140px)",
          paddingBottom: "clamp(60px, 8vw, 100px)",
        }}
      >
        {/* ── DESKTOP layout (lg+) ──────────────────────────────────────── */}
        <div className="hidden lg:grid lg:grid-cols-2 lg:gap-20 lg:items-start">
          {/* Left — huge name + subtitle */}
          <div
            className="reveal relative flex flex-col justify-between"
            style={{ minHeight: "520px", position: "relative", zIndex: 1 }}
          >
            <div style={{ position: "relative" }}>
              <h2
                style={{
                  fontFamily: "'Fira Code', monospace",
                  fontWeight: 700,
                  fontSize: "clamp(4rem, 10vw, 9rem)",
                  color: "white",
                  lineHeight: 0.95,
                  letterSpacing: "-0.02em",
                  marginBottom: "24px",
                }}
              >
                Zob
                <br />
                Dhillon
              </h2>

              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 300,
                  fontSize: "15px",
                  color: "rgba(255,255,255,0.4)",
                  lineHeight: 1.5,
                  maxWidth: "160px",
                }}
              >
                Full-stack
                <br />
                developer
              </p>
            </div>

            {/* Social pills — desktop 2 column grid */}
            <div
              className="reveal grid grid-cols-2 gap-2"
              style={{ position: "relative", marginTop: "48px", zIndex: 1 }}
            >
              {socials.map((s) => (
                <SocialPill key={s.label} {...s} />
              ))}
            </div>
          </div>

          {/* Right — heading + nav links + code block */}
          <div className="reveal flex flex-col gap-6">
            {/* ... /Contacts ... */}
            <SectionLabel
              style={{
                fontSize: "clamp(13px, 1.5vw, 18px)",
                color: "rgba(255,255,255,0.7)",
              }}
            >
              ... /Contacts ...
            </SectionLabel>

            {/* Nav links */}
            <div className="flex items-center gap-6 flex-wrap">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => scrollTo(link.id)}
                  aria-label={`Go to ${link.label} section`}
                  className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DD4BF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#090909]"
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 400,
                    fontSize: "15px",
                    color: "rgba(255,255,255,0.45)",
                    padding: 0,
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(255,255,255,0.45)")
                  }
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Code block card */}
            <CodeBlock />

            {/* Footer */}
            <div
              className="reveal flex items-center justify-between pt-4"
              style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
            >
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "11px",
                  color: "rgba(255,255,255,0.15)",
                  letterSpacing: "0.1em",
                }}
              >
                © 2025 Zob Dhillon
              </span>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "11px",
                  color: "rgba(255,255,255,0.15)",
                  letterSpacing: "0.1em",
                }}
              >
                // I was my own client.
              </span>
            </div>
          </div>
        </div>

        {/* ── MOBILE layout (<lg) ───────────────────────────────────────── */}
        <div className="lg:hidden flex flex-col gap-8">
          {/* ... /Contacts ... */}
          <div className="reveal">
            <SectionLabel
              style={{
                fontSize: "14px",
                color: "rgba(255,255,255,0.7)",
              }}
            >
              ... /Contacts ...
            </SectionLabel>
          </div>

          {/* Nav links */}
          <div className="reveal flex items-center gap-5 flex-wrap">
            {navLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => scrollTo(link.id)}
                aria-label={`Go to ${link.label} section`}
                className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DD4BF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#090909]"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "14px",
                  color: "rgba(255,255,255,0.45)",
                  padding: 0,
                }}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Code block */}
          <div className="reveal">
            <CodeBlock />
          </div>

          {/* Name */}
          <div className="reveal relative" style={{ minHeight: "200px" }}>
            <div style={{ position: "relative" }}>
              <h2
                style={{
                  fontFamily: "'Fira Code', monospace",
                  fontWeight: 700,
                  fontSize: "clamp(3.5rem, 18vw, 6rem)",
                  color: "white",
                  lineHeight: 0.95,
                  letterSpacing: "-0.02em",
                  marginBottom: "16px",
                }}
              >
                Zob
                <br />
                <span style={{ paddingLeft: "clamp(40px, 15vw, 80px)" }}>
                  Dhillon
                </span>
              </h2>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 300,
                  fontSize: "14px",
                  color: "rgba(255,255,255,0.4)",
                }}
              >
                Full-stack developer
              </p>
            </div>
          </div>

          {/* Social pills — 2 column grid on mobile */}
          <div className="reveal grid grid-cols-2 gap-2">
            {socials.map((s) => (
              <SocialPill key={s.label} {...s} />
            ))}
          </div>

          {/* Footer */}
          <div
            className="reveal flex items-center justify-between pt-4"
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
          >
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "10px",
                color: "rgba(255,255,255,0.15)",
              }}
            >
              © 2025 Zob Dhillon
            </span>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "10px",
                color: "rgba(255,255,255,0.15)",
              }}
            >
              // I was my own client.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
