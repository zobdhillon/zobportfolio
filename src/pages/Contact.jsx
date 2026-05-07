import { useEffect, useRef } from "react";

const contactLinks = [
  {
    label: "Email",
    value: "zobbdhillon@gmail.com",
    href: "mailto:zobbdhillon@gmail.com",
  },
  {
    label: "GitHub",
    value: "github.com/zobdhillon",
    href: "https://github.com/zobdhillon",
  },
];

export default function Contact() {
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
          04/ Contact
        </span>
        <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
      </div>

      {/* Two column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

        {/* Left side */}
        <div>
          <h2
            className="reveal text-[clamp(3rem,8vw,6rem)] leading-none mb-6"
            style={{ fontFamily: "'Bebas Neue', sans-serif", color: "white" }}
          >
            LET'S
            <br />
            <span style={{ color: "transparent", WebkitTextStroke: "1px rgba(255,255,255,0.2)" }}>
              WORK
            </span>
            <span style={{ color: "#2DD4BF" }}>.</span>
          </h2>

          <p
            className="reveal text-white/40 max-w-md mb-12 leading-relaxed"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            I'm open to full-time roles and freelance projects. If you have something in mind, reach out — I'd love to hear about it.
          </p>

          {/* Contact cards */}
          <div className="reveal grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mb-20">
            {contactLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between p-5 border transition-all duration-200 hover:border-teal-300/30"
                style={{
                  borderColor: "rgba(255,255,255,0.08)",
                  background: "rgba(255,255,255,0.02)",
                }}
              >
                <div>
                  <p
                    className="text-xs tracking-[0.2em] uppercase mb-1"
                    style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {item.label}
                  </p>
                  <p
                    className="text-sm text-white/60 group-hover:text-white/90 transition-colors"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {item.value}
                  </p>
                </div>
                <span
                  className="text-lg transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
                  style={{ color: "#2DD4BF" }}
                >
                  ↗
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Right side — code block */}
        <div className="reveal">
          <div
            className="rounded-sm overflow-hidden"
            style={{ border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)" }}
          >
            {/* Editor top bar */}
            <div
              className="flex items-center gap-2 px-4 py-3"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.03)" }}
            >
              <span className="w-3 h-3 rounded-full" style={{ background: "rgba(255,255,255,0.1)" }} />
              <span className="w-3 h-3 rounded-full" style={{ background: "rgba(255,255,255,0.1)" }} />
              <span className="w-3 h-3 rounded-full" style={{ background: "rgba(255,255,255,0.1)" }} />
              <span
                className="ml-4 text-xs"
                style={{ color: "rgba(255,255,255,0.2)", fontFamily: "'JetBrains Mono', monospace" }}
              >
                developer.js
              </span>
            </div>

            {/* Code content */}
            <div className="p-6" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "13px", lineHeight: "2" }}>
              {/* Line 1 */}
              <div className="flex gap-4">
                <span style={{ color: "rgba(255,255,255,0.15)", minWidth: "20px" }}>1</span>
                <span>
                  <span style={{ color: "#2DD4BF" }}>const</span>
                  <span style={{ color: "rgba(255,255,255,0.9)" }}> developer </span>
                  <span style={{ color: "rgba(255,255,255,0.4)" }}>=</span>
                  <span style={{ color: "rgba(255,255,255,0.9)" }}> {"{"}</span>
                </span>
              </div>
              {/* Line 2 */}
              <div className="flex gap-4">
                <span style={{ color: "rgba(255,255,255,0.15)", minWidth: "20px" }}>2</span>
                <span className="pl-6">
                  <span style={{ color: "rgba(255,255,255,0.5)" }}>name</span>
                  <span style={{ color: "rgba(255,255,255,0.3)" }}>: </span>
                  <span style={{ color: "#2DD4BF", opacity: 0.8 }}>"Zob Dhillon"</span>
                  <span style={{ color: "rgba(255,255,255,0.3)" }}>,</span>
                </span>
              </div>
              {/* Line 3 */}
              <div className="flex gap-4">
                <span style={{ color: "rgba(255,255,255,0.15)", minWidth: "20px" }}>3</span>
                <span className="pl-6">
                  <span style={{ color: "rgba(255,255,255,0.5)" }}>role</span>
                  <span style={{ color: "rgba(255,255,255,0.3)" }}>: </span>
                  <span style={{ color: "#2DD4BF", opacity: 0.8 }}>"Full Stack Developer"</span>
                  <span style={{ color: "rgba(255,255,255,0.3)" }}>,</span>
                </span>
              </div>
              {/* Line 4 */}
              <div className="flex gap-4">
                <span style={{ color: "rgba(255,255,255,0.15)", minWidth: "20px" }}>4</span>
                <span className="pl-6">
                  <span style={{ color: "rgba(255,255,255,0.5)" }}>email</span>
                  <span style={{ color: "rgba(255,255,255,0.3)" }}>: </span>
                  <span style={{ color: "#2DD4BF", opacity: 0.8 }}>"zobbdhillon@gmail.com"</span>
                  <span style={{ color: "rgba(255,255,255,0.3)" }}>,</span>
                </span>
              </div>
              {/* Line 5 */}
              <div className="flex gap-4">
                <span style={{ color: "rgba(255,255,255,0.15)", minWidth: "20px" }}>5</span>
                <span className="pl-6">
                  <span style={{ color: "rgba(255,255,255,0.5)" }}>github</span>
                  <span style={{ color: "rgba(255,255,255,0.3)" }}>: </span>
                  <span style={{ color: "#2DD4BF", opacity: 0.8 }}>"zobdhillon"</span>
                  <span style={{ color: "rgba(255,255,255,0.3)" }}>,</span>
                </span>
              </div>
              {/* Line 6 */}
              <div className="flex gap-4">
                <span style={{ color: "rgba(255,255,255,0.15)", minWidth: "20px" }}>6</span>
                <span className="pl-6">
                  <span style={{ color: "rgba(255,255,255,0.5)" }}>available</span>
                  <span style={{ color: "rgba(255,255,255,0.3)" }}>: </span>
                  <span style={{ color: "#2DD4BF" }}>true</span>
                  <span style={{ color: "rgba(255,255,255,0.3)" }}>,</span>
                </span>
              </div>
              {/* Line 7 */}
              <div className="flex gap-4">
                <span style={{ color: "rgba(255,255,255,0.15)", minWidth: "20px" }}>7</span>
                <span style={{ color: "rgba(255,255,255,0.9)" }}>{"}"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        className="reveal border-t pt-8 flex items-center justify-between"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <span
          className="text-xs tracking-widest"
          style={{ color: "rgba(255,255,255,0.15)", fontFamily: "'JetBrains Mono', monospace" }}
        >
          © 2025 Zob Dhillon
        </span>
        <span
          className="text-xs tracking-widest"
          style={{ color: "rgba(255,255,255,0.15)", fontFamily: "'JetBrains Mono', monospace" }}
        >
          // I was my own client.
        </span>
      </div>
    </div>
  );
}