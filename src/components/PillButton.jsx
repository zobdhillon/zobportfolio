export default function PillButton({ label, onClick, href, target }) {
  const content = (
    <>
      {/* White pill — responsive padding/font */}
      <span
        className="flex items-center transition-all duration-300"
        style={{
          borderRadius: "999px",
          background: "white",
          color: "#090909",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "clamp(12px, 1.4vw, 15px)",
          fontStyle: "italic",
          whiteSpace: "nowrap",
          paddingTop: "clamp(8px, 1vw, 12px)",
          paddingBottom: "clamp(8px, 1vw, 12px)",
          paddingLeft: "clamp(20px, 4vw, 64px)",
          paddingRight: "clamp(20px, 4vw, 64px)",
        }}
      >
        {label}
      </span>

      {/* Arrow circle — moves away from pill on hover, scales up slightly */}
      <span
        className="
          flex items-center justify-center flex-shrink-0
          transition-all duration-300
          group-hover:translate-x-1.5
          group-hover:scale-110
        "
        style={{
          width:  "clamp(34px, 3.5vw, 46px)",
          height: "clamp(34px, 3.5vw, 46px)",
          borderRadius: "50%",
          background: "white",
          border: "1px solid rgba(255,255,255,0.15)",
          color: "#090909",
          fontSize: "clamp(13px, 1.4vw, 16px)",
          fontWeight: 800,
        }}
      >
        →
      </span>
    </>
  );

  const className =
    "group flex items-center gap-2 transition-all duration-300 hover:gap-3";
  const style = {
    background: "transparent",
    border: "none",
    padding: 0,
    cursor: "pointer",
  };

  if (href) {
    return (
      <a href={href} target={target} rel="noreferrer" className={className} style={style}>
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={className} style={style}>
      {content}
    </button>
  );
}