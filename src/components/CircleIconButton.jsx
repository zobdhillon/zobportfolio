import { ArrowUpRight } from "lucide-react";

export default function DualCircleButton({
  leftIcon: LeftIcon,
  rightIcon: RightIcon = ArrowUpRight,
  href,
  target = "_blank",
  rel = "noreferrer",
  onClick,
  size = 52,
  iconSize = 20,
  label = "button",
}) {
  const overlap = size * 0.35; // how much the circles overlap

  const circleBase = {
    width: size,
    height: size,
    borderRadius: "50%",
    background: "#111",
    border: "1px solid rgba(255,255,255,0.15)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  };

  const handleMouseEnter = (e) => {
    e.currentTarget.style.borderColor = "rgba(0,210,163,0.4)";
  };
  const handleMouseLeave = (e) => {
    e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
  };

  const rightCircleStyle = {
    ...circleBase,
    background: "white",
    border: "1px solid white",
    marginLeft: `-${overlap}px`,
    position: "relative",
    zIndex: 2,
    cursor: "pointer",
    transition: "border-color 0.2s ease, transform 0.2s ease",
    textDecoration: "none",
  };

  const content = (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        position: "relative",
      }}
    >
      {/* Left circle — secondary/social icon */}
      <div style={{ ...circleBase, position: "relative", zIndex: 1 }}>
        <LeftIcon
          size={iconSize}
          color="rgba(255, 255, 255, 0.95)"
          strokeWidth={1.6}
        />
      </div>

      {/* Right circle — action icon (arrow), sits on top */}
      {href ? (
        <a
          href={href}
          target={target}
          rel={rel}
          aria-label={label}
          style={rightCircleStyle}
          onMouseEnter={(e) => {
            handleMouseEnter(e);
            e.currentTarget.style.transform = "scale(1.06)";
          }}
          onMouseLeave={(e) => {
            handleMouseLeave(e);
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          <RightIcon size={iconSize} color="#090909" strokeWidth={2} />
        </a>
      ) : (
        <button
          type="button"
          aria-label={label}
          onClick={onClick}
          style={rightCircleStyle}
          onMouseEnter={(e) => {
            handleMouseEnter(e);
            e.currentTarget.style.transform = "scale(1.06)";
          }}
          onMouseLeave={(e) => {
            handleMouseLeave(e);
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          <RightIcon size={iconSize} color="#090909" strokeWidth={2} />
        </button>
      )}
    </div>
  );

  return content;
}
