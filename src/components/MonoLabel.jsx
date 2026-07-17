export default function MonoLabel({
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
        ...style,
      }}
      {...props}
    >
      {children}
    </span>
  );
}
