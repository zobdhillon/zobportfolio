export default function PillButton({ label, onClick, href, target }) {
  const content = (
    <>
      {/* White pill */}
      <span
        className="flex items-center px-16 py-3"
        style={{
          borderRadius: "999px",
          background: "white",
          color: "#090909",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "15px",
          fontStyle: "italic",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </span>

      {/* Dark circle arrow */}
      <span
        className="flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
        style={{
          width: "46px",
          height: "46px",
          borderRadius: "50%",
          background: "#1a1a1a",
          border: "1px solid rgba(255,255,255,0.15)",
          color: "white",
          fontSize: "16px",
        }}
      >
        →
      </span>
    </>
  );

  const className =
    "group flex items-center gap-2 transition-all duration-200 hover:opacity-80";
  const style = {
    background: "transparent",
    border: "none",
    padding: 0,
    cursor: "pointer",
  };

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel="noreferrer"
        className={className}
        style={style}
      >
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
