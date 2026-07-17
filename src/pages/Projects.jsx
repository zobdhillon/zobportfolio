import { useEffect, useRef, useState } from "react";
import CircleIconButton from "../components/CircleIconButton";
import SectionLabel from "../components/SectionLabel";
import SideCircle from "../components/SideCircle";
import { Github, Globe } from "lucide-react";
import useReveal from "../hooks/useReveal";
import rehearseImg from "../assets/rehearse.png";
import devlogsCoverImg from "../assets/devlogs-cover.png";
import sabaPreviewImg from "../assets/saba-preview.png";
import resumeImg from "../assets/resume.png";

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
    fallbackImage: rehearseImg,
    useFrame: false,
    devices: {
      laptop: { url: "/demos/rehearse/dashboard.html", w: 1440, h: 900 },
      tablet: { url: "/demos/rehearse/scenarios.html", w: 834, h: 1194 },
      phone: { url: "/demos/rehearse/chat.html", w: 420, h: 820 },
    },
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
    live: "https://devlogs-zobdhillon.up.railway.app/",
    github: "https://github.com/zobdhillon/devlogs",
    fallbackImage: devlogsCoverImg,
    useFrame: false,
    devices: {
      laptop: {
        url: "https://devlogs-zobdhillon.up.railway.app/#demo",
        w: 1440,
        h: 900,
      },
      phone: {
        url: "https://devlogs-zobdhillon.up.railway.app/",
        w: 390,
        h: 844,
      },
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
    github: "https://github.com/zobdhillon/SabaCh",
    fallbackImage: sabaPreviewImg,
    useFrame: false,
    devices: {
      laptop: { url: "https://sabach.netlify.app/", w: 1440, h: 900 },
      phone: { url: "https://sabach.netlify.app/", w: 390, h: 844 },
    },
    flip: false,
  },
  {
    num: "03",
    title: "Resume",
    tags: ["JavaScript", "JSON", "Railway"],
    paragraphs: [
      <>
        <em>Resume</em> — a dynamic resume generator that renders your entire
        resume from a single <em>JSON data file</em>, keeping content and
        presentation cleanly separated.
      </>,
      <>
        Update your experience, skills, or education by editing{" "}
        <em>one JSON file</em> — no touching markup or styling to keep your
        resume current.
      </>,
    ],
    live: "https://zob-resume.up.railway.app/",
    github: "https://github.com/zobdhillon/Resume",
    fallbackImage: resumeImg,
    useFrame: false,
    devices: {
      laptop: { url: "https://zob-resume.up.railway.app/", w: 1440, h: 900 },
      phone: { url: "https://zob-resume.up.railway.app/print", w: 390, h: 844 },
    },
    flip: true,
  },
];

// ── Scaled iframe screen (shared by every device chrome) ──────────────────
function DeviceScreen({ url, w, h, kind, screenRadius, fallbackImage }) {
  const outerRef = useRef(null);
  const [zoom, setZoom] = useState(1);
  const [status, setStatus] = useState("loading");
  const [imageError, setImageError] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;

    const resize = () => {
      setZoom(el.clientWidth / w);
    };

    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(el);

    setStatus("loading");
    setImageError(false);

    const isExternalUrl = /^https?:\/\//i.test(url);
    const isSameOrigin =
      !isExternalUrl ||
      new URL(url, window.location.origin).origin === window.location.origin;

    if (!isSameOrigin) {
      setStatus("error");
      return () => {
        ro.disconnect();
        if (timeoutRef.current) {
          window.clearTimeout(timeoutRef.current);
        }
      };
    }

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      setStatus((current) => (current === "loaded" ? current : "error"));
    }, 4000);

    return () => {
      ro.disconnect();
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, [url, w, h]);

  const handleLoad = () => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }
    setStatus("loaded");
  };

  const handleError = () => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }
    setStatus("error");
  };

  const showIframe = status === "loaded";
  const showFallback = status === "error";
  const showLoading = status === "loading";

  return (
    <div
      ref={outerRef}
      style={{
        width: "100%",
        aspectRatio: `${w}/${h}`,
        overflow: "hidden",
        borderRadius: screenRadius,
        background: "#000",
        position: "relative",
      }}
    >
      {showLoading && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg,#1a1a1a 25%,#252525 50%,#1a1a1a 75%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 1.4s infinite",
            zIndex: 1,
          }}
        />
      )}

      {showFallback && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            background: "#0b0b0b",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
          }}
        >
          {fallbackImage && !imageError ? (
            <img
              src={fallbackImage}
              alt={`${kind} preview unavailable`}
              onError={() => setImageError(true)}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: screenRadius,
                display: "block",
              }}
            />
          ) : (
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "12px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.55)",
                textAlign: "center",
              }}
            >
              Preview unavailable
            </div>
          )}
        </div>
      )}

      <iframe
        src={url}
        title={`${kind}-preview`}
        loading="lazy"
        scrolling="no"
        onLoad={handleLoad}
        onError={handleError}
        style={{
          width: `${w}px`,
          height: `${h}px`,
          border: "none",
          display: "block",
          zoom,
          transformOrigin: "top left",
          pointerEvents: "none",
          opacity: showIframe ? 1 : 0.85,
          position: "relative",
          zIndex: 0,
        }}
      />
    </div>
  );
}

// ── Device chrome — laptop hinge/base, tablet camera bezel, phone notch ───
function DeviceFrame({ kind, url, w, h, fallbackImage }) {
  const screen = (
    <DeviceScreen
      url={url}
      w={w}
      h={h}
      kind={kind}
      fallbackImage={fallbackImage}
      screenRadius={
        kind === "laptop"
          ? "6px 6px 2px 2px"
          : kind === "tablet"
            ? "10px"
            : "16px"
      }
    />
  );

  if (kind === "laptop") {
    return (
      <div className="device-shell" style={{ width: "100%" }}>
        <div
          className="device-glass"
          style={{
            position: "relative",
            background: "linear-gradient(180deg,#2b2b2b,#161616)",
            borderRadius: "14px 14px 5px 5px",
            padding: "8px 8px 6px",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "1.1%",
              left: "50%",
              transform: "translateX(-50%)",
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#000",
              boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.18)",
            }}
          />
          {screen}
        </div>
        {/* keyboard base / hinge */}
        <div
          className="device-base"
          style={{
            position: "relative",
            height: "16px",
            margin: "0 -3.5%",
            background: "linear-gradient(180deg,#2f2f2f,#111 60%)",
            borderRadius: "0 0 9px 9px",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: "14%",
              height: "5px",
              background: "#0a0a0a",
              borderRadius: "0 0 7px 7px",
            }}
          />
        </div>
      </div>
    );
  }

  if (kind === "tablet") {
    return (
      <div
        className="device-standalone"
        style={{
          position: "relative",
          background: "linear-gradient(160deg,#2b2b2b,#141414)",
          borderRadius: "20px",
          padding: "8px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "1.4%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "5px",
            height: "5px",
            borderRadius: "50%",
            background: "#000",
            boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.15)",
          }}
        />
        {screen}
      </div>
    );
  }

  // phone
  return (
    <div
      className="device-standalone"
      style={{
        position: "relative",
        background: "linear-gradient(160deg,#2b2b2b,#141414)",
        borderRadius: "20px",
        padding: "6px",
        boxSizing: "border-box",
      }}
    >
      <div />
      {screen}
      <div
        style={{
          position: "absolute",
          bottom: "5px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "26%",
          height: "3px",
          background: "rgba(255,255,255,0.45)",
          borderRadius: "10px",
          zIndex: 2,
        }}
      />
    </div>
  );
}

// ── Shared device-chrome hover/shadow styles ───────────────────────────────
const DEVICE_HOVER_CSS = `
  @keyframes shimmer {
    0%   { background-position:  200% 0; }
    100% { background-position: -200% 0; }
  }

  @media (prefers-reduced-motion: reduce) {
    @keyframes shimmer {
      from, to { background-position: 0 0; }
    }
  }

  /* Laptop: wrapper handles the lift, screen + base each carry their own shadow */
  .device-shell { transition: transform .35s ease; cursor: pointer; }
  .device-shell:hover { transform: translateY(-8px); }
  .device-glass {
    box-shadow: 0 14px 30px rgba(0,0,0,0.35);
    transition: box-shadow .35s ease;
  }
  .device-shell:hover .device-glass {
    box-shadow: 0 22px 42px rgba(0,0,0,0.5);
  }
  @media (prefers-reduced-motion: reduce) {
    .device-shell,
    .device-glass,
    .device-base,
    .device-standalone {
      transition: none;
    }
    .device-shell:hover,
    .device-shell:hover .device-glass,
    .device-shell:hover .device-base,
    .device-standalone:hover {
      transform: none;
      box-shadow: none;
    }
  }
  .device-base {
    box-shadow: 0 8px 14px rgba(0,0,0,0.3);
    transition: box-shadow .35s ease;
  }
  .device-shell:hover .device-base {
    box-shadow: 0 12px 20px rgba(0,0,0,0.4);
  }

  /* Tablet / phone: single element carries both lift + shadow */
  .device-standalone {
    box-shadow: 0 14px 30px rgba(0,0,0,0.35);
    transition: transform .35s ease, box-shadow .35s ease;
    cursor: pointer;
  }
  .device-standalone:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 38px rgba(0,0,0,0.45);
  }
`;

// ── Visual column — iframes + live button ─────────────────────────────────
function VisualCol({ devices, live, fallbackImage }) {
  const hasLaptop = !!devices?.laptop;
  const hasTablet = !!devices?.tablet;
  const hasPhone = !!devices?.phone;
  const primary = devices?.laptop || devices?.tablet;
  const primaryKind = devices?.laptop ? "laptop" : "tablet";

  if (hasLaptop && hasTablet && hasPhone) {
    return (
      <div className="reveal" style={{ position: "relative", width: "100%" }}>
        <div style={{ position: "relative", width: "58%" }}>
          <DeviceFrame
            kind="laptop"
            url={devices.laptop.url}
            w={devices.laptop.w}
            h={devices.laptop.h}
            fallbackImage={devices.laptop.fallbackImage || fallbackImage}
          />
        </div>

        <div
          style={{
            position: "absolute",
            top: "14%",
            right: "7%",
            width: "34%",
            zIndex: 1,
          }}
        >
          <DeviceFrame
            kind="tablet"
            url={devices.tablet.url}
            w={devices.tablet.w}
            h={devices.tablet.h}
            fallbackImage={devices.tablet.fallbackImage || fallbackImage}
          />
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "5%",
            left: "5%",
            width: "20%",
            zIndex: 3,
          }}
        >
          <DeviceFrame
            kind="phone"
            url={devices.phone.url}
            w={devices.phone.w}
            h={devices.phone.h}
            fallbackImage={devices.phone.fallbackImage || fallbackImage}
          />
        </div>

        {live && (
          <div
            style={{
              position: "absolute",
              bottom: "12%",
              left: "37%",
              zIndex: 5,
            }}
          >
            <CircleIconButton leftIcon={Globe} href={live} label="View live" />
          </div>
        )}

        <div style={{ paddingBottom: "22%" }} />

        <style>{DEVICE_HOVER_CSS}</style>
      </div>
    );
  }

  // ── Two-device (laptop + phone) or single-device layout ──────────────────
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
            fallbackImage={primary.fallbackImage || fallbackImage}
          />
        )}

        {/* Live button — centred on bottom edge */}
        {live && (
          <div
            style={{
              position: "absolute",
              bottom: "-20px",
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
            bottom: "-15%",
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
            fallbackImage={devices.phone.fallbackImage || fallbackImage}
          />
        </div>
      )}

      <div style={{ paddingBottom: hasPhone ? "14%" : "0" }} />

      <style>{DEVICE_HOVER_CSS}</style>
    </div>
  );
}

function StaticVisual({ src, live }) {
  return (
    <div className="reveal" style={{ position: "relative", width: "100%" }}>
      <img
        src={src}
        alt="Project preview"
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
  const { num, title, tags, paragraphs, github } = project;

  return (
    <div
      className="reveal flex flex-col justify-center py-8 lg:py-0"
      style={{ position: "relative" }}
    >
      <div style={{ position: "relative" }}>
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

        {/* Title */}
        <h2
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(1.5rem, 4vw, 2.6rem)",
            color: "white",
            letterSpacing: "-0.01em",
            lineHeight: 1.1,
            margin: "0 0 20px",
          }}
        >
          {title}
        </h2>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 400,
                fontSize: "clamp(11px, 1.1vw, 13px)",
                color: "rgba(255,255,255,0.65)",
                border: "1px solid rgba(255,255,255,0.13)",
                padding: "5px 14px",
                borderRadius: "999px",
                whiteSpace: "nowrap",
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
              fontSize: "clamp(13px, 1.6vw, 15px)",
              color: "rgba(255,255,255,0.42)",
              lineHeight: 1.8,
              maxWidth: "480px",
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
function ProjectBlock({ project }) {
  const { flip, useFrame, devices, live, fallbackImage } = project;

  const visualEl = useFrame ? (
    <StaticVisual src={project.staticSrc} live={live} />
  ) : (
    <VisualCol devices={devices} live={live} fallbackImage={fallbackImage} />
  );

  const showDecor = project.num === "00" || project.num === "03";
  const decorSide = flip ? "left" : "right";

  // Below "lg", text always comes first regardless of flip.
  // At "lg" and up, flip decides the left/right order.
  const visualCol = (
    <div className={`order-2 ${flip ? "lg:order-1" : "lg:order-2"}`}>
      <div className="reveal">{visualEl}</div>
    </div>
  );

  const textCol = (
    <div className={`order-1 ${flip ? "lg:order-2" : "lg:order-1"}`}>
      <TextCol project={project} />
    </div>
  );

  return (
    <div
      style={{
        position: "relative",
        zIndex: 0,
        paddingTop: "clamp(60px, 8vw, 110px)",
        paddingBottom: "clamp(60px, 8vw, 110px)",
      }}
    >
      {showDecor && (
        <SideCircle
          side={decorSide}
          align="center"
          size="clamp(280px, 34vw, 460px)"
          showAmount={45}
        />
      )}

      <div
        className="grid grid-cols-1 md:grid-cols-[1.15fr_1fr] lg:grid-cols-2 gap-10 md:gap-10 lg:gap-20 items-center"
        style={{ position: "relative", zIndex: 1 }}
      >
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
  const ref = useReveal({ threshold: 0.08 });

  return (
    <section
      ref={ref}
      id="projects"
      style={{
        background: "#090909",
        position: "relative",
        overflow: "hidden",
        zIndex: 0,
      }}
    >
      <div
        className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-8"
        style={{
          paddingTop: "clamp(80px, 10vw, 140px)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Heading */}
        <div className="reveal text-center mb-16">
          <SectionLabel>... /Projects ...</SectionLabel>
        </div>

        {projects.map((project, i) => (
          <ProjectBlock key={project.num} project={project} index={i} />
        ))}

        {/* Footer */}
        <div className="reveal py-16">
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
