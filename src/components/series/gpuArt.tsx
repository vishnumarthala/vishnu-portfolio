import type { ReactNode } from "react";

/**
 * Key art for "Zero to GPU": a GPU die whose compute units light up as the series progresses
 * (episode 1 lights a few, the finale lights them all). Plain SVG primitives only, so the same
 * drawing renders in the page and inside next/og share images.
 */
export const GPU_ART = { bg: "#141112", ink: "#f3eeea", accent: "#e8442c", ember: "#f2a33a" };

function seeded(key: string) {
  let a = 2166136261;
  for (let i = 0; i < key.length; i++) a = Math.imul(a ^ key.charCodeAt(i), 16777619);
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const r1 = (n: number) => Math.round(n * 10) / 10;

interface Options {
  w: number;
  h: number;
  /** Share of compute units lit, 0 to 1. */
  progress: number;
  /** Centre of the die as a share of the width and height. */
  cx?: number;
  cy?: number;
  /** Die size relative to the default (half the height). */
  scale?: number;
  /** Fill for the memory chips, matching whatever the drawing sits on. */
  ground?: string;
}

export function gpuArt({ w, h, progress, cx = 0.7, cy = 0.47, scale = 1, ground = GPU_ART.bg }: Options): ReactNode[] {
  const { ink, accent, ember } = GPU_ART;
  const rnd = seeded("zero-to-gpu");
  const out: ReactNode[] = [];
  const s = h * 0.5 * scale;
  const x0 = w * cx - s / 2;
  const y0 = h * cy - s / 2;
  const n = 8;
  const gap = s * 0.018;
  const pad = s * 0.07;
  const cell = (s - pad * 2 - gap * (n - 1)) / n;

  // Board traces running out to the memory chips
  const chip = { w: s * 0.2, h: s * 0.13 };
  const chips: [number, number][] = [];
  for (let k = 0; k < 4; k++) {
    const x = x0 + pad + k * ((s - pad * 2 - chip.w) / 3);
    chips.push([x, y0 - s * 0.36], [x, y0 + s + s * 0.23]);
  }
  for (let k = 0; k < 3; k++) {
    const y = y0 + pad + k * ((s - pad * 2 - chip.w) / 2);
    chips.push([x0 - s * 0.36, y], [x0 + s + s * 0.16, y]);
  }
  chips.forEach(([x, y], i) => {
    const vertical = i < 8;
    const cw = vertical ? chip.w : chip.h;
    const ch = vertical ? chip.h : chip.w;
    const mx = x + cw / 2;
    const my = y + ch / 2;
    for (let t = -2; t <= 2; t++) {
      const off = t * (vertical ? cw : ch) * 0.16;
      const [ax, ay, bx, by] = vertical
        ? [mx + off, my, mx + off, my < y0 ? y0 : y0 + s]
        : [mx, my + off, mx < x0 ? x0 : x0 + s, my + off];
      out.push(<line key={`t${i}${t}`} x1={r1(ax)} y1={r1(ay)} x2={r1(bx)} y2={r1(by)} stroke={ink} strokeOpacity={0.16} strokeWidth={1} />);
    }
    out.push(<rect key={`m${i}`} x={r1(x)} y={r1(y)} width={r1(cw)} height={r1(ch)} rx={2} fill={ground} stroke={ink} strokeOpacity={0.55} strokeWidth={1.2} />);
  });

  // The die
  out.push(<rect key="sub" x={r1(x0 - s * 0.04)} y={r1(y0 - s * 0.04)} width={r1(s * 1.08)} height={r1(s * 1.08)} rx={4} fill="none" stroke={ink} strokeOpacity={0.25} strokeWidth={1} />);
  out.push(<rect key="die" x={r1(x0)} y={r1(y0)} width={r1(s)} height={r1(s)} rx={3} fill="#201b1c" stroke={ink} strokeOpacity={0.7} strokeWidth={1.5} />);

  const order = Array.from({ length: n * n }, (_, i) => i);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  const lit = new Set(order.slice(0, Math.round(progress * n * n)));
  for (let i = 0; i < n * n; i++) {
    const x = x0 + pad + (i % n) * (cell + gap);
    const y = y0 + pad + Math.floor(i / n) * (cell + gap);
    const on = lit.has(i);
    out.push(
      <rect
        key={`c${i}`}
        x={r1(x)}
        y={r1(y)}
        width={r1(cell)}
        height={r1(cell)}
        rx={1}
        fill={on ? (i % 7 === 3 ? ember : accent) : ink}
        fillOpacity={on ? 0.92 : 0.07}
      />,
    );
  }
  return out;
}

interface Props {
  progress: number;
  className?: string;
  cx?: number;
}

export default function GpuArt({ progress, className, cx }: Props) {
  const w = 1200;
  const h = 630;
  return (
    <svg className={className} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <rect width={w} height={h} fill={GPU_ART.bg} />
      {gpuArt({ w, h, progress, cx })}
    </svg>
  );
}
