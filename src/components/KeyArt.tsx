import type { CSSProperties, ReactNode } from "react";
import { art, type ArtSpec, type Motif } from "@/content/art";
import type { TitleId } from "@/content/types";
import { gpuArt } from "./series/gpuArt";

type Shape = "tile" | "poster" | "hero";

interface Props {
  id: TitleId;
  name: string;
  shape?: Shape;
  /** Hide the title treatment, e.g. when the surrounding UI sets the name itself. */
  bare?: boolean;
  badge?: string;
  band?: { text: string; tone: "current" | "soon" };
  className?: string;
  style?: CSSProperties;
}

const SIZES: Record<Shape, [number, number]> = {
  tile: [320, 180],
  hero: [320, 180],
  poster: [200, 300],
};

function seeded(key: string) {
  let h = 1779033703 ^ key.length;
  for (let i = 0; i < key.length; i++) {
    h = Math.imul(h ^ key.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  let a = h >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const r1 = (n: number) => Math.round(n * 10) / 10;

type Draw = (w: number, h: number, s: ArtSpec, rnd: () => number) => ReactNode;

const motifs: Record<Motif, Draw> = {
  threads(w, h, s, rnd) {
    const out: ReactNode[] = [];
    const fx = w * 0.64;
    const fy = h * 0.42;
    for (let i = 0; i < 34; i++) {
      const y0 = h * (-0.1 + 1.2 * (i / 33)) + (rnd() - 0.5) * 10;
      const y1 = h * (-0.2 + 1.4 * rnd());
      const hot = i % 5 === 2;
      out.push(
        <path
          key={i}
          d={`M-10 ${r1(y0)} C${r1(w * 0.32)} ${r1(y0)} ${r1(w * 0.46)} ${r1(fy + (y0 - fy) * 0.18)} ${r1(fx)} ${r1(fy)} S${r1(w * 0.86)} ${r1(y1)} ${w + 10} ${r1(y1)}`}
          fill="none"
          stroke={hot ? s.accent : s.ink}
          strokeOpacity={hot ? 0.85 : 0.1 + rnd() * 0.14}
          strokeWidth={hot ? 1.2 : 0.7}
        />,
      );
    }
    out.push(<circle key="f" cx={fx} cy={fy} r={3.2} fill={s.accent} />);
    out.push(<circle key="g" cx={fx} cy={fy} r={10} fill="none" stroke={s.accent} strokeOpacity={0.5} />);
    return out;
  },

  lattice(w, h, s, rnd) {
    const out: ReactNode[] = [];
    const cx = w * 0.7;
    const a = h * 0.44;
    const b = h * 0.13;
    const planes: [number, number][][] = [];
    for (let k = 0; k < 3; k++) {
      const cy = h * (0.22 + 0.2 * k);
      out.push(
        <polygon
          key={`p${k}`}
          points={`${r1(cx - a)},${r1(cy)} ${r1(cx)},${r1(cy - b)} ${r1(cx + a)},${r1(cy)} ${r1(cx)},${r1(cy + b)}`}
          fill={s.ink}
          fillOpacity={0.05}
          stroke={s.ink}
          strokeOpacity={0.45}
          strokeWidth={0.8}
        />,
      );
      const nodes: [number, number][] = [];
      for (let n = 0; n < 5; n++) {
        const u = 0.15 + rnd() * 0.7;
        const v = 0.15 + rnd() * 0.7;
        nodes.push([cx - a + u * a + v * a, cy + (-u * b + v * b)]);
      }
      planes.push(nodes);
    }
    for (let k = 0; k < 2; k++) {
      planes[k].forEach(([x, y], i) => {
        const [x2, y2] = planes[k + 1][(i * 2 + 1) % 5];
        out.push(
          <line key={`l${k}${i}`} x1={r1(x)} y1={r1(y)} x2={r1(x2)} y2={r1(y2)} stroke={i === 0 ? s.accent : s.ink} strokeOpacity={i === 0 ? 0.9 : 0.25} strokeWidth={i === 0 ? 1.2 : 0.6} />,
        );
      });
    }
    planes.flat().forEach(([x, y], i) =>
      out.push(<circle key={`n${i}`} cx={r1(x)} cy={r1(y)} r={i % 5 === 0 ? 3 : 1.8} fill={i % 5 === 0 ? s.accent : s.ink} />),
    );
    return out;
  },

  route(w, h, s) {
    const out: ReactNode[] = [];
    for (let i = 0; i < 7; i++) {
      const y = h * (0.08 + 0.14 * i);
      out.push(<path key={`lat${i}`} d={`M-10 ${r1(y + 14)} Q${w / 2} ${r1(y - 10)} ${w + 10} ${r1(y + 14)}`} fill="none" stroke={s.ink} strokeOpacity={0.12} strokeWidth={0.6} />);
    }
    const A = [w * 0.66, h * 0.17];
    const B = [w * 0.9, h * 0.44];
    out.push(
      <path key="arc" d={`M${r1(B[0])} ${r1(B[1])} Q${r1(w * 0.98)} ${r1(h * 0.06)} ${r1(A[0])} ${r1(A[1])}`} fill="none" stroke={s.accent} strokeWidth={2} strokeDasharray="5 4" strokeLinecap="round" />,
    );
    [A, B].forEach(([x, y], i) => {
      out.push(<circle key={`d${i}`} cx={r1(x)} cy={r1(y)} r={3.6} fill={s.accent} />);
      out.push(<circle key={`r${i}`} cx={r1(x)} cy={r1(y)} r={9} fill="none" stroke={s.accent} strokeOpacity={0.6} />);
    });
    out.push(
      <text key="ta" x={r1(A[0] + 6)} y={r1(A[1] + 22)} textAnchor="end" fontSize={8} fill={s.ink} fillOpacity={0.75} className="art-label">
        BACKNANG 48.95°N
      </text>,
      <text key="tb" x={r1(B[0] - 14)} y={r1(B[1] + 3)} textAnchor="end" fontSize={8} fill={s.ink} fillOpacity={0.75} className="art-label">
        GUNTUR 16.31°N
      </text>,
    );
    return out;
  },

  dots(w, h, s, rnd) {
    const out: ReactNode[] = [];
    const cols = 20;
    const rows = 10;
    const x0 = w * 0.07;
    const x1 = w * 0.93;
    const y0 = h * 0.28;
    const y1 = h * 0.6;
    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        const hot = rnd() < 0.1;
        out.push(
          <circle key={`${i}-${j}`} cx={r1(x0 + ((x1 - x0) * i) / (cols - 1))} cy={r1(y0 + ((y1 - y0) * j) / (rows - 1))} r={hot ? 2.2 : 1.7} fill={hot ? s.accent : s.ink} fillOpacity={hot ? 1 : 0.42} />,
        );
      }
    }
    out.push(
      <text key="c" x={r1(x1)} y={r1(y1 + 16)} textAnchor="end" fontSize={8} fill={s.ink} fillOpacity={0.7} className="art-label">
        200 · B2
      </text>,
    );
    return out;
  },

  tally(w, h, s) {
    const out: ReactNode[] = [];
    const top = h * 0.14;
    const len = h * 0.34;
    const gap = w * 0.026;
    let x = w * 0.46;
    for (let g = 0; g < 4; g++) {
      for (let i = 0; i < 4; i++) {
        out.push(<line key={`${g}-${i}`} x1={r1(x + i * gap)} y1={r1(top)} x2={r1(x + i * gap)} y2={r1(top + len)} stroke={s.ink} strokeWidth={2.4} strokeLinecap="round" strokeOpacity={0.85} />);
      }
      out.push(<line key={`${g}-s`} x1={r1(x - gap * 0.6)} y1={r1(top + len * 0.82)} x2={r1(x + gap * 3.6)} y2={r1(top + len * 0.18)} stroke={s.accent} strokeWidth={2.4} strokeLinecap="round" />);
      x += gap * 4 + w * 0.034;
    }
    out.push(
      <text key="y" x={r1(w * 0.93)} y={r1(top + len + 16)} textAnchor="end" fontSize={8} fill={s.ink} fillOpacity={0.7} className="art-label">
        ~20 · 2023–2025
      </text>,
    );
    return out;
  },

  signal(w, h, s) {
    const out: ReactNode[] = [];
    const cx = w * 0.86;
    const cy = h * 0.16;
    for (let i = 1; i < 8; i++) {
      out.push(<circle key={i} cx={cx} cy={cy} r={i * 17} fill="none" stroke={s.ink} strokeOpacity={0.5 - i * 0.04} strokeDasharray={`${2 + i} ${4 + i}`} />);
    }
    out.push(<circle key="c" cx={cx} cy={cy} r={4} fill={s.accent} />);
    return out;
  },

  script(w, h, s, rnd) {
    const words = ["పత్రిక", "తెలుగు", "వార్తలు", "ప్రశ్న", "సమాధానం", "ఆర్కైవ్"];
    const out: ReactNode[] = [];
    const cols = 4;
    const cw = (w * 0.9) / cols;
    for (let c = 0; c < cols; c++) {
      const x = w * 0.05 + c * cw;
      if (c > 0) out.push(<line key={`rule${c}`} x1={r1(x - 4)} y1={h * 0.24} x2={r1(x - 4)} y2={h * 0.6} stroke={s.ink} strokeOpacity={0.25} strokeWidth={0.5} />);
      for (let r = 0; r < 5; r++) {
        const y = h * 0.31 + r * h * 0.068;
        const word = words[Math.floor(rnd() * words.length)];
        const hit = c === 2 && r === 1;
        if (hit) out.push(<rect key="hl" x={r1(x - 2)} y={r1(y - 10)} width={r1(cw - 8)} height={14} fill={s.accent} />);
        out.push(
          <text key={`${c}-${r}`} x={r1(x)} y={r1(y)} fontSize={10} fill={s.ink} fillOpacity={hit ? 1 : 0.32} className="art-telugu">
            {word}
          </text>,
        );
      }
    }
    return out;
  },

  matrix(w, h, s, rnd) {
    const out: ReactNode[] = [];
    const n = 8;
    const size = h * 0.055;
    const x0 = w - n * size - w * 0.06;
    const y0 = h * 0.08;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (j > i) continue;
        const d = i - j;
        const v = Math.min(1, (d === 0 ? 0.85 : 0.1) + rnd() * (d < 3 ? 0.6 : 0.35));
        out.push(<rect key={`${i}-${j}`} x={r1(x0 + j * size)} y={r1(y0 + i * size)} width={r1(size - 1)} height={r1(size - 1)} fill={s.accent} fillOpacity={r1(v)} />);
      }
    }
    return out;
  },

  strata(w, h, s, rnd) {
    const out: ReactNode[] = [];
    for (let i = 0; i < 10; i++) {
      const y = h * 0.27 + i * h * 0.034;
      let x = -5;
      let k = 0;
      while (x < w) {
        const len = 20 + rnd() * 90;
        const hot = rnd() < 0.06;
        out.push(<line key={`${i}-${k++}`} x1={r1(x)} y1={r1(y)} x2={r1(Math.min(w + 5, x + len))} y2={r1(y)} stroke={hot ? s.accent : s.ink} strokeOpacity={hot ? 1 : 0.32} strokeWidth={hot ? 2 : 1.2} strokeLinecap="round" />);
        x += len + 6 + rnd() * 14;
      }
    }
    return out;
  },

  toolpath(w, h, s) {
    const out: ReactNode[] = [];
    const cx = w * 0.72;
    const cy = h * 0.34;
    for (let i = 0; i < 9; i++) {
      const rw = w * 0.34 - i * w * 0.034;
      const rh = h * 0.3 - i * h * 0.03;
      out.push(<rect key={i} x={r1(cx - rw / 2)} y={r1(cy - rh / 2)} width={r1(rw)} height={r1(rh)} rx={r1(Math.min(rw, rh) * 0.35)} fill="none" stroke={i === 8 ? s.accent : s.ink} strokeOpacity={i === 8 ? 1 : 0.45 - i * 0.03} strokeWidth={i === 8 ? 2 : 1} />);
    }
    return out;
  },

  wave(w, h, s) {
    const out: ReactNode[] = [];
    for (let k = 0; k < 5; k++) {
      let d = "";
      for (let x = -5; x <= w + 5; x += 4) {
        const y = h * 0.42 + Math.sin(x / 22 + k * 1.25) * h * 0.12 * (1 - k * 0.12);
        d += `${x === -5 ? "M" : "L"}${x} ${r1(y)} `;
      }
      out.push(<path key={k} d={d} fill="none" stroke={k === 0 ? s.accent : s.ink} strokeOpacity={k === 0 ? 1 : 0.32} strokeWidth={k === 0 ? 1.8 : 1} />);
    }
    return out;
  },

  perspective(w, h, s) {
    const out: ReactNode[] = [];
    const vx = w * 0.74;
    const vy = h * 0.04;
    for (let i = -8; i <= 8; i++) {
      out.push(<line key={`v${i}`} x1={vx} y1={vy} x2={r1(vx + i * w * 0.09)} y2={h} stroke={s.ink} strokeOpacity={0.22} strokeWidth={0.7} />);
    }
    for (let i = 3; i < 9; i++) {
      const y = vy + (h - vy) * Math.pow(i / 8, 1.8);
      out.push(<line key={`h${i}`} x1={0} y1={r1(y)} x2={w} y2={r1(y)} stroke={s.ink} strokeOpacity={0.18} strokeWidth={0.7} />);
    }
    out.push(<rect key="r" x={r1(w * 0.6)} y={r1(h * 0.2)} width={r1(w * 0.12)} height={r1(h * 0.2)} fill="none" stroke={s.accent} strokeWidth={1.6} />);
    return out;
  },

  circuit(w, h, s, rnd) {
    const out: ReactNode[] = [];
    for (let i = 0; i < 9; i++) {
      let x = w * (0.42 + rnd() * 0.12);
      let y = h * (0.24 + i * 0.042);
      let d = `M${r1(x)} ${r1(y)}`;
      for (let k = 0; k < 4; k++) {
        x += w * (0.05 + rnd() * 0.12);
        d += ` H${r1(x)}`;
        const dy = (rnd() - 0.5) * h * 0.12;
        x += Math.abs(dy);
        y += dy;
        d += ` L${r1(x)} ${r1(y)}`;
      }
      out.push(<path key={`t${i}`} d={d} fill="none" stroke={s.ink} strokeOpacity={0.45} strokeWidth={1.2} strokeLinejoin="round" />);
      out.push(<circle key={`p${i}`} cx={r1(x)} cy={r1(y)} r={2.6} fill={s.accent} />);
    }
    return out;
  },

  flights(w, h, s) {
    const out: ReactNode[] = [];
    const ox = w * 0.9;
    const oy = h * 0.56;
    const dests: [number, number][] = [
      [w * 0.5, h * 0.3],
      [w * 0.6, h * 0.14],
      [w * 0.74, h * 0.08],
      [w * 0.86, h * 0.12],
    ];
    dests.forEach(([x, y], i) => {
      const cx = (ox + x) / 2 - w * 0.06;
      const cy = Math.min(oy, y) - h * 0.12;
      out.push(
        <path key={`a${i}`} d={`M${r1(ox)} ${r1(oy)} Q${r1(cx)} ${r1(cy)} ${r1(x)} ${r1(y)}`} fill="none" stroke={i === 1 ? s.accent : s.ink} strokeOpacity={i === 1 ? 1 : 0.45} strokeWidth={i === 1 ? 1.8 : 1} strokeDasharray="4 4" strokeLinecap="round" />,
      );
      out.push(<circle key={`d${i}`} cx={r1(x)} cy={r1(y)} r={i === 1 ? 4.5 : 3} fill="none" stroke={i === 1 ? s.accent : s.ink} strokeWidth={1.4} />);
    });
    out.push(<circle key="o" cx={r1(ox)} cy={r1(oy)} r={4.2} fill={s.accent} />);
    out.push(<circle key="og" cx={r1(ox)} cy={r1(oy)} r={10} fill="none" stroke={s.accent} strokeOpacity={0.5} />);
    return out;
  },

  die(w, h) {
    return gpuArt({ w, h, progress: 0.55, cx: 0.72 });
  },

  seal(w, h, s) {
    const out: ReactNode[] = [];
    const cx = w * 0.74;
    const cy = h * 0.38;
    const R = h * 0.3;
    out.push(<circle key="o" cx={cx} cy={cy} r={R} fill="none" stroke={s.accent} strokeWidth={2} />);
    out.push(<circle key="i" cx={cx} cy={cy} r={R * 0.78} fill="none" stroke={s.ink} strokeOpacity={0.6} strokeWidth={0.8} />);
    for (let i = 0; i < 60; i++) {
      const a = (i / 60) * Math.PI * 2;
      const r0 = R * 0.82;
      const rr = R * (i % 5 === 0 ? 0.95 : 0.89);
      out.push(<line key={`k${i}`} x1={r1(cx + Math.cos(a) * r0)} y1={r1(cy + Math.sin(a) * r0)} x2={r1(cx + Math.cos(a) * rr)} y2={r1(cy + Math.sin(a) * rr)} stroke={s.ink} strokeOpacity={0.6} strokeWidth={0.8} />);
    }
    out.push(
      <text key="t" x={cx} y={r1(cy + 4)} textAnchor="middle" fontSize={11} fill={s.ink} className="art-label art-label--strong">
        CPSA
      </text>,
    );
    return out;
  },
};

export default function KeyArt({ id, name, shape = "tile", bare, badge, band, className, style }: Props) {
  const spec = art[id];
  const [w, h] = SIZES[shape];
  const rnd = seeded(`${id}:${shape}`);
  const long = name.length > 22 ? "xl" : name.length > 14 ? "l" : name.length > 9 ? "m" : "s";
  return (
    <div
      className={`art art--${shape} ${className ?? ""}`}
      style={{ "--art-bg": spec.bg, "--art-ink": spec.ink, "--art-accent": spec.accent, ...style } as CSSProperties}
      data-art={id}
    >
      <svg className="art__svg" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
        {motifs[spec.motif](w, h, spec, rnd)}
      </svg>
      {badge ? (
        <span className="art__badge" aria-hidden="true">
          <span className="art__mono">VM</span>
          {badge}
        </span>
      ) : null}
      {bare ? null : (
        <span className={`art__title art__title--${spec.face} art__title--${long}`} aria-hidden="true">
          {name}
        </span>
      )}
      {band ? (
        <span className={`art__band art__band--${band.tone}`} aria-hidden="true">
          {band.text}
        </span>
      ) : null}
    </div>
  );
}
