export default function SocialPill({
  label,
  href,
  icon: Icon,
  className = "",
  style = {},
  iconSize = 14,
  iconStrokeWidth = 1.8,
  ...props
}) {
  const resolvedStyle = {
    borderRadius: "999px",
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(15,15,15,0.92)",
    color: "rgba(255,255,255,0.6)",
    fontFamily: "'DM Sans', sans-serif",
    fontStyle: "italic",
    fontSize: "13px",
    padding: "10px 20px",
    textDecoration: "none",
    whiteSpace: "nowrap",
    position: "relative",
    zIndex: 1,
    ...style,
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={`${label} external link`}
      className={`flex items-center justify-center gap-2 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DD4BF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#090909] ${className}`.trim()}
      style={resolvedStyle}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(45,212,191,0.4)";
        e.currentTarget.style.color = "#2DD4BF";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
        e.currentTarget.style.color = "rgba(255,255,255,0.6)";
      }}
      {...props}
    >
      <Icon size={iconSize} strokeWidth={iconStrokeWidth} />
      {label}
    </a>
  );
}
