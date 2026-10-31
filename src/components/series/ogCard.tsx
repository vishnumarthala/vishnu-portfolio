import { ImageResponse } from "next/og";
import { GPU_ART, gpuArt } from "./gpuArt";

export const OG_SIZE = { width: 1200, height: 630 };

interface Card {
  kicker: string;
  title: string;
  hook: string;
  progress: number;
  byline: string;
}

/** Share image for the series and each episode: copy on the left, the GPU die lighting up on the right. */
export function ogCard({ kicker, title, hook, progress, byline }: Card) {
  const { width: w, height: h } = OG_SIZE;
  const titleSize = title.length > 34 ? 68 : title.length > 22 ? 80 : 104;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: GPU_ART.bg, position: "relative", color: GPU_ART.ink }}>
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ position: "absolute", inset: 0 }}>
          {gpuArt({ w, h, progress, cx: 0.8 })}
        </svg>
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            backgroundImage: "linear-gradient(90deg, rgba(20,17,18,1) 0%, rgba(20,17,18,0.92) 52%, rgba(20,17,18,0) 72%)",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "60px 72px", width: 760, position: "relative" }}>
          <div style={{ display: "flex", fontSize: 24, letterSpacing: 5, color: GPU_ART.accent, fontWeight: 800 }}>{kicker.toUpperCase()}</div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: titleSize, fontWeight: 900, letterSpacing: -2, lineHeight: 1.02 }}>{title}</div>
            <div style={{ display: "flex", fontSize: 32, marginTop: 24, color: "#d8cfca", lineHeight: 1.3 }}>{hook}</div>
          </div>
          <div style={{ display: "flex", fontSize: 24, color: "#a59a95" }}>{byline}</div>
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
