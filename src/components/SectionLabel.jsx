export default function SectionLabel({
  children,
  className = "",
  style = {},
  ...props
}) {
  return (
    <span
      className={className}
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "clamp(13px, 1.5vw, 18px)",
        color: "rgba(255,255,255,0.75)",
        letterSpacing: "0.1em",
        ...style,
      }}
      {...props}
    >
      {children}
    </span>
  );
}
