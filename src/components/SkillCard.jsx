export default function SkillCard({
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
