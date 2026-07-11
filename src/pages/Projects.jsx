import { useEffect, useRef, useState } from "react";
import CircleIconButton from "../components/CircleIconButton";
import { Github, Globe } from "lucide-react";

import rehearseFrameImg from "../assets/rehearse-frame.png";
import devActivityImg from "../assets/dev-activity.png";
import chatBotImg from "../assets/chat-bot.png";

const projects = [
  {
    num: "00",
    title: "Rehearse",
    tags: ["Laravel", "Vue", "MySQL", "Groq API", "Inertia"],
    paragraphs: [
      <>
        <em>Rehearse</em> — an AI-powered platform designed to simulate{" "}
        <em>real interview conversations</em> with instant feedback on clarity,
        confidence, and adaptability.
      </>,
      <>
        The platform comprises{" "}
        <em>session tracking, AI scoring, and PDF export</em>, each contributing
        to a complete end-to-end practice experience.
      </>,
    ],
    live: "https://rehearse-ai.up.railway.app",
    github: "https://github.com/zobdhillon/Rehearse",
    illustration: null, // no inline illustration for Rehearse
    useFrame: true, // use static rehearse-frame.png
    devices: null,
    flip: false,
  },
  {
    num: "01",
    title: "DevLogs",
    tags: ["Laravel", "PHP", "MySQL", "Blade", "Tailwind"],
    paragraphs: [
      <>
        <em>DevLogs</em> — a full stack developer social platform. Create posts,{" "}
        <em>track learning progress</em> and goals, and connect with other
        developers building in public.
      </>,
      <>
        The app features <em>authentication, a personal dashboard,</em> resource
        sharing and an activity feed — all built with Laravel and Tailwind.
      </>,
    ],
    live: "https://devlogs.42web.io",
    github: "https://github.com/zobdhillon/devlogs",
    illustration: devActivityImg,
    useFrame: false,
    devices: {
      laptop: { url: "https://devlogs.42web.io", w: 1440, h: 900 },
      phone: { url: "https://devlogs.42web.io", w: 390, h: 844 },
    },
    flip: true,
  },
  {
    num: "02",
    title: "Saba — Copywriter Portfolio",
    tags: ["HTML", "CSS", "JavaScript"],
    paragraphs: [
      <>
        <em>Saba</em> — a portfolio site designed and built for a professional
        copywriter. Clean layout, <em>smooth scroll interactions</em>, and fully
        responsive.
      </>,
      <>
        A real client project — shipped and <em>live in production</em>, built
        from scratch without any framework.
      </>,
    ],
    live: "https://sabach.netlify.app/",
    github: null,
    illustration: chatBotImg,
    useFrame: false,
    devices: {
      laptop: { url: "https://sabach.netlify.app/", w: 1440, h: 900 },
      phone: { url: "https://sabach.netlify.app/", w: 390, h: 844 },
    },
    flip: false,
  },
];

// ── Sharp scaled iframe ───────────────────────────────────────────────────
function DeviceFrame({ kind, url, w, h, extraStyle = {} }) {
  const outerRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;
    const apply = () => setScale(el.getBoundingClientRect().width / w);
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(el);
    return () => ro.disconnect();
  }, [w]);

  const radius =
    kind === "phone" ? "28px" : kind === "tablet" ? "16px" : "10px";
  const pad = kind === "phone" ? "5px" : "4px";

  return (
    <div
      ref={outerRef}
      style={{
        width: "100%",
        aspectRatio: `${w} / ${h}`,
        background: "#1c1c1c",
        borderRadius: radius,
        padding: pad,
        boxSizing: "border-box",
        boxShadow: "0 24px 64px rgba(0,0,0,0.6)",
        ...extraStyle,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: `calc(${radius} - 3px)`,
          overflow: "hidden",
          position: "relative",
          background: "#fff",
        }}
      >
        {!loaded && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(90deg,#1a1a1a 25%,#252525 50%,#1a1a1a 75%)",
              backgroundSize: "200% 100%",
              animation: "shimmer 1.4s infinite",
            }}
          />
        )}
        <div
          style={{
            width: w,
            height: h,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          <iframe
            src={url}
            title={`${kind}-preview`}
            loading="lazy"
            scrolling="no"
            onLoad={() => setLoaded(true)}
            style={{
              width: w,
              height: h,
              border: "none",
              pointerEvents: "none",
              display: "block",
            }}
          />
        </div>
      </div>
    </div>
  );
}

// ── Visual column — iframes + live button ─────────────────────────────────
function VisualCol({ devices, live }) {
  const hasPhone = !!devices?.phone;
  const primary = devices?.laptop || devices?.tablet;
  const primaryKind = devices?.laptop ? "laptop" : "tablet";

  return (
    <div className="reveal" style={{ position: "relative", width: "100%" }}>
      {/* Primary device */}
      <div style={{ position: "relative", width: hasPhone ? "80%" : "95%" }}>
        {primary && (
          <DeviceFrame
            kind={primaryKind}
            url={primary.url}
            w={primary.w}
            h={primary.h}
          />
        )}

        {/* Live button — centred on bottom edge */}
        {live && (
          <div
            style={{
              position: "absolute",
              bottom: "-22px",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 4,
            }}
          >
            <CircleIconButton leftIcon={Globe} href={live} label="View live" />
          </div>
        )}
      </div>

      {/* Phone overlay */}
      {hasPhone && (
        <div
          style={{
            position: "absolute",
            bottom: "-8%",
            right: "0",
            width: "32%",
            zIndex: 2,
          }}
        >
          <DeviceFrame
            kind="phone"
            url={devices.phone.url}
            w={devices.phone.w}
            h={devices.phone.h}
          />
        </div>
      )}

      <div style={{ paddingBottom: hasPhone ? "14%" : "0" }} />

      <style>{`
        @keyframes shimmer {
          0%   { background-position:  200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}

// ── Static frame visual (for Rehearse) ───────────────────────────────────
function StaticVisual({ src, live }) {
  return (
    <div className="reveal" style={{ position: "relative", width: "100%" }}>
      <img
        src={src}
        alt="Rehearse app preview"
        style={{
          width: "100%",
          display: "block",
          borderRadius: "12px",
          boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
        }}
      />

      {live && (
        <div
          style={{
            position: "absolute",
            bottom: "-22px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 4,
          }}
        >
          <CircleIconButton leftIcon={Globe} href={live} label="View live" />
        </div>
      )}

      <div style={{ paddingBottom: "28px" }} />
    </div>
  );
}

// ── Text column ───────────────────────────────────────────────────────────
function TextCol({ project }) {
  const { num, title, tags, paragraphs, github, illustration, flip } = project;
  const circSide = flip ? "right" : "left";

  return (
    <div
      className="reveal flex flex-col justify-center py-8 lg:py-0"
      style={{ position: "relative" }}
    >
      {/* SideCircle — always on text column side, half visible */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          [circSide]: 0,
          transform: `translateY(-50%) ${circSide === "right" ? "translateX(50%)" : "translateX(-50%)"}`,
          width: "clamp(220px, 38vw, 520px)",
          height: "clamp(220px, 38vw, 520px)",
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.06)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div style={{ position: "relative", zIndex: 2 }}>
        {/* Number */}
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "11px",
            color: "#2DD4BF",
            letterSpacing: "0.25em",
            display: "block",
            marginBottom: "14px",
            opacity: 0.8,
          }}
        >
          {num} /
        </span>

        {/* Title row — heading + illustration side by side */}
        <div className="flex items-center gap-4 mb-5">
          <h2
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(1.6rem, 3vw, 2.6rem)",
              color: "white",
              letterSpacing: "-0.01em",
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            {title}
          </h2>

          {illustration && (
            <img
              src={illustration}
              alt=""
              aria-hidden
              style={{
                width: "clamp(48px, 7vw, 72px)",
                objectFit: "contain",
                opacity: 1,
                flexShrink: 0,
                filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.4))",
              }}
            />
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 400,
                fontSize: "13px",
                color: "rgba(255,255,255,0.65)",
                border: "1px solid rgba(255,255,255,0.13)",
                padding: "5px 14px",
                borderRadius: "999px",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Paragraphs */}
        {paragraphs.map((para, i) => (
          <p
            key={i}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 300,
              fontSize: "clamp(13px, 1.3vw, 15px)",
              color: "rgba(255,255,255,0.42)",
              lineHeight: 1.8,
              maxWidth: "400px",
              marginBottom: i < paragraphs.length - 1 ? "14px" : "32px",
            }}
          >
            {para}
          </p>
        ))}

        {/* GitHub — text column only */}
        {github && (
          <CircleIconButton
            leftIcon={Github}
            href={github}
            label="View source code"
          />
        )}
      </div>
    </div>
  );
}

// ── Project block ─────────────────────────────────────────────────────────
function ProjectBlock({ project, index }) {
  const { flip, useFrame, devices, live } = project;

  const visualEl = useFrame ? (
    <StaticVisual src={rehearseFrameImg} live={live} />
  ) : (
    <VisualCol devices={devices} live={live} />
  );

  const visualCol = (
    <div className={flip ? "order-2 lg:order-1" : "order-1 lg:order-2"}>
      <div className="reveal">{visualEl}</div>
    </div>
  );

  const textCol = (
    <div className={flip ? "order-1 lg:order-2" : "order-2 lg:order-1"}>
      <TextCol project={project} />
    </div>
  );

  return (
    <div
      style={{
        paddingTop: "clamp(60px, 8vw, 110px)",
        paddingBottom: "clamp(60px, 8vw, 110px)",
        borderTop: index === 0 ? "none" : "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {flip ? (
          <>
            {visualCol}
            {textCol}
          </>
        ) : (
          <>
            {textCol}
            {visualCol}
          </>
        )}
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────
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
      { threshold: 0.08 },
    );
    const reveals = ref.current?.querySelectorAll(".reveal");
    reveals?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="projects"
      style={{
        background: "#090909",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-8"
        style={{ paddingTop: "clamp(80px, 10vw, 140px)" }}
      >
        {/* Heading */}
        <div className="reveal text-center mb-16">
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "clamp(13px, 1.5vw, 18px)",
              color: "rgba(255,255,255,0.75)",
              letterSpacing: "0.1em",
            }}
          >
            ... /Projects ...
          </span>
        </div>

        {projects.map((project, i) => (
          <ProjectBlock key={project.num} project={project} index={i} />
        ))}

        {/* Footer */}
        <div
          className="reveal py-16"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "11px",
              color: "rgba(255,255,255,0.18)",
              letterSpacing: "0.2em",
            }}
          >
            // More projects coming soon — React &amp; Vue apps in progress
          </span>
        </div>
      </div>
    </section>
  );
}
