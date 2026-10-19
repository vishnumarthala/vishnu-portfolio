import type { ProfileId } from "@/content/types";

const palettes: Record<ProfileId | "add", { bg: string; ink: string; accent: string }> = {
  ai: { bg: "#0f2733", ink: "#e6f0f1", accent: "#ff7a45" },
  hiring: { bg: "#eea21e", ink: "#211305", accent: "#0f5a47" },
  browse: { bg: "#3a1414", ink: "#f3eeea", accent: "#e8442c" },
  add: { bg: "#26211f", ink: "#b9b0ab", accent: "#f3eeea" },
};

export default function Avatar({ id, className }: { id: ProfileId | "add"; className?: string }) {
  const p = palettes[id];
  return (
    <svg className={`avatar ${className ?? ""}`} viewBox="0 0 100 100" aria-hidden="true" focusable="false">
      <rect width="100" height="100" rx="6" fill={p.bg} />
      {id === "ai" ? (
        <g>
          {Array.from({ length: 6 }, (_, i) =>
            Array.from({ length: i + 1 }, (_, j) => (
              <rect
                key={`${i}-${j}`}
                x={22 + j * 10}
                y={20 + i * 10}
                width="8"
                height="8"
                fill={i === j ? p.accent : p.ink}
                fillOpacity={i === j ? 1 : 0.25 + ((i * 7 + j * 3) % 5) * 0.12}
              />
            )),
          )}
        </g>
      ) : null}
      {id === "hiring" ? (
        <g fill="none">
          <path d="M22 74 Q30 18 78 28" stroke={p.accent} strokeWidth="5" strokeDasharray="7 6" strokeLinecap="round" />
          <circle cx="22" cy="74" r="7" fill={p.ink} />
          <circle cx="78" cy="28" r="7" fill={p.ink} />
        </g>
      ) : null}
      {id === "browse" ? (
        <g fill="none" strokeLinecap="round">
          {[18, 30, 42, 58, 70, 82].map((y, i) => (
            <path key={y} d={`M-2 ${y} C30 ${y} 40 50 62 50 S84 ${100 - y} 102 ${100 - y}`} stroke={i === 2 ? p.accent : p.ink} strokeOpacity={i === 2 ? 1 : 0.5} strokeWidth="3" />
          ))}
        </g>
      ) : null}
      {id === "add" ? (
        <path d="M50 30v40M30 50h40" stroke={p.accent} strokeWidth="6" strokeLinecap="round" fill="none" />
      ) : null}
    </svg>
  );
}
