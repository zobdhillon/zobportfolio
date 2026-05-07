const items = [
  "FULL STACK DEVELOPER",
  "LARAVEL",
  "REACT",
  "VUE",
  "PHP",
  "TAILWIND CSS",
  "JAVASCRIPT",
  "WEB DEVELOPMENT",
];

export default function Marquee() {
  const repeated = [...items, ...items];
  return (
    <div className="marquee-wrap border-t border-b py-4" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
      <div className="marquee-track">
        {repeated.map((item, i) => (
          <span
            key={i}
            className="mx-8 text-xs tracking-[0.3em] uppercase flex items-center gap-8"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              color: i % 2 === 0 ? "rgba(255,255,255,0.25)" : "#2DD4BF",
            }}
          >
            {item}
            <span style={{ color: "#2DD4BF", opacity: 0.5 }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
