import type { CSSProperties } from "react";

interface CurtainBackgroundProps {
  color?: string;
  accentColor?: string;
  className?: string;
  style?: CSSProperties;
}

/** A refined silk-curtain background featuring wider, organically irregular draping folds. */
export default function CurtainBackground({
  color = "#08080a",
  accentColor = "#2d2d35",
  className = "",
  style,
}: CurtainBackgroundProps) {
  return (
    <div
      aria-hidden="true"
      className={`curtain-background ${className}`.trim()}
      style={
        {
          "--curtain-color": color,
          "--curtain-accent": accentColor,
          ...style,
        } as CSSProperties
      }
    >
      <div className="curtain-background__folds" />
      <div className="curtain-background__curves" />
      <div className="curtain-background__glow" />
    </div>
  );
}