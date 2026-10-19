import { ImageResponse } from "next/og";
import { getDictionary } from "@/content";
import { hasLocale } from "@/content/types";

export const alt = "Vishnu Marthala";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDictionary(hasLocale(lang) ? lang : "en");
  const threads = Array.from({ length: 22 }, (_, i) => {
    const y0 = -40 + i * 34;
    const y1 = 700 - i * 30;
    const hot = i % 5 === 2;
    return (
      <path
        key={i}
        d={`M-20 ${y0} C380 ${y0} 560 ${280 + (y0 - 280) * 0.18} 780 280 S1040 ${y1} 1240 ${y1}`}
        fill="none"
        stroke={hot ? "#e8442c" : "#f3eeea"}
        strokeOpacity={hot ? 0.9 : 0.14}
        strokeWidth={hot ? 3 : 1.6}
      />
    );
  });

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#141112", position: "relative", color: "#f3eeea" }}>
        <svg width="1200" height="630" viewBox="0 0 1200 630" style={{ position: "absolute", inset: 0 }}>
          {threads}
          <circle cx="780" cy="280" r="9" fill="#e8442c" />
        </svg>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "64px 72px", width: "100%" }}>
          <div style={{ display: "flex", fontSize: 26, letterSpacing: 6, color: "#e8442c", fontWeight: 800 }}>VM · {dict.titles.vishnu.format.toUpperCase()}</div>
          <div style={{ display: "flex", fontSize: 108, fontWeight: 900, letterSpacing: -3, lineHeight: 1, marginTop: 18, textTransform: "uppercase" }}>
            {dict.person.name}
          </div>
          <div style={{ display: "flex", fontSize: 34, marginTop: 22, color: "#d8cfca", maxWidth: 900 }}>{dict.person.headline}</div>
          <div style={{ display: "flex", fontSize: 24, marginTop: 28, color: "#a59a95" }}>{dict.person.facts.join("  ·  ")}</div>
        </div>
      </div>
    ),
    size,
  );
}
