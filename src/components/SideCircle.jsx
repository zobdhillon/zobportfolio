export default function SideCircle({
  side = "right",
  align = "center",
  size = "80vh",
  nudgeX = "0px",
  nudgeY = "0px",
  showAmount = 50,
  color = "rgba(255, 255, 255, 0.18)",
}) {
  // How far off-screen: 100 - showAmount pushes it off, showAmount pulls it in
  const offscreen = 100 - showAmount;
  const translateX =
    side === "right"
      ? `calc(${offscreen}% + ${nudgeX})`
      : `calc(-${offscreen}% + ${nudgeX})`;

  const translateY =
    align === "top"
      ? `calc(0% + ${nudgeY})`
      : align === "bottom"
        ? `calc(-100% + ${nudgeY})`
        : `calc(-50% + ${nudgeY})`;

  const verticalAnchor =
    align === "top"
      ? { top: 0 }
      : align === "bottom"
        ? { bottom: 0 }
        : { top: "50%" };

  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        [side]: 0,
        ...verticalAnchor,
        transform: `translateX(${translateX}) translateY(${translateY})`,
        width: size,
        height: size,
        borderRadius: "50%",
        border: `1px solid ${color}`,
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}
