"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/profile";
import { IconPause, IconPlay } from "./icons";

export type Palette = [string, string, string];

const VERT = `#version 300 es
in vec2 p;
void main(){ gl_Position = vec4(p, 0.0, 1.0); }`;

// Threads stream from the left edge, pinch into one knot right of centre, and fan out again:
// two tracks bound into one structure. Pulses travel along each thread, left to right.
const FRAG = `#version 300 es
precision highp float;
uniform vec2 uRes;
uniform float uT;
uniform vec3 uA;
uniform vec3 uB;
uniform vec3 uC;
out vec4 o;
float hash(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float noise(vec2 p){ vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1,0)), f.x), mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), f.x), f.y); }
float fbm(vec2 p){ float s = 0.0, a = 0.5; for (int i = 0; i < 4; i++){ s += a * noise(p); p *= 2.03; a *= 0.5; } return s; }
void main(){
  vec2 uv = gl_FragCoord.xy / uRes;
  float asp = uRes.x / uRes.y;
  vec2 p = vec2((uv.x - 0.5) * asp, uv.y - 0.5);
  vec2 f = vec2(0.16 * asp, 0.05);
  float dx = p.x - f.x;
  float pinch = 0.07 + 0.93 * smoothstep(0.0, 0.95, abs(dx));
  float warp = (fbm(vec2(p.x * 1.2 - uT * 0.035, p.y * 0.9 + uT * 0.018)) - 0.5) * 0.55;
  float y = (p.y - f.y + warp * pinch) / pinch;
  float k = y * 34.0;
  float aa = fwidth(k);
  float id = floor(k);
  float d = abs(fract(k) - 0.5);
  float w = 0.03 + 0.03 * hash(vec2(id, 1.0));
  float thread = smoothstep(w + aa, max(w - aa, 0.0), d) / (1.0 + aa * 6.0);
  float speed = 0.05 + 0.07 * hash(vec2(id, 7.0));
  float pulse = pow(fract(p.x * 0.32 - uT * speed + hash(vec2(id, 3.0))), 22.0);
  float bright = 0.16 + 0.42 * hash(vec2(id, 5.0));
  float hot = step(0.84, hash(vec2(id, 11.0)));
  vec3 tint = mix(uA, uB, smoothstep(-0.9, 0.9, p.x));
  vec3 col = thread * (bright * mix(uC, tint, 0.45) * 0.55 + pulse * tint * 1.9 + hot * tint * 0.55);
  float g = exp(-length((p - f) * vec2(1.0, 2.4)) * 5.5);
  col += uA * g * 0.32;
  col *= smoothstep(1.35, 0.15, length(p * vec2(0.75, 1.15)));
  col *= mix(0.28, 1.0, smoothstep(0.02, 0.6, uv.x));
  col *= mix(0.25, 1.0, smoothstep(0.0, 0.35, uv.y));
  col += (hash(gl_FragCoord.xy + fract(uT) * 91.0) - 0.5) * 0.03;
  o = vec4(vec3(0.082, 0.068, 0.071) + col, 1.0);
}`;

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

function compile(gl: WebGL2RenderingContext, type: number, src: string) {
  const s = gl.createShader(type);
  if (!s) return null;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    gl.deleteShader(s);
    return null;
  }
  return s;
}

interface Props {
  palette: Palette;
  labels: { pause: string; play: string };
}

export default function Trailer({ palette, labels }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const paletteRef = useRef(palette);
  const [ready, setReady] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(false);
  const reducedRef = useRef(false);
  const redrawRef = useRef<() => void>(() => {});

  useEffect(() => {
    paletteRef.current = palette;
    redrawRef.current();
  }, [palette]);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    reducedRef.current = prefersReducedMotion();
    let raf = 0;
    let visible = true;
    let disposed = false;
    let gl: WebGL2RenderingContext | null = null;
    let cleanupGl = () => {};

    const start = () => {
      if (disposed) return;
      gl = canvas.getContext("webgl2", { antialias: false, alpha: false, powerPreference: "low-power" });
      if (!gl) return;
      const vs = compile(gl, gl.VERTEX_SHADER, VERT);
      const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
      if (!vs || !fs) return;
      const prog = gl.createProgram()!;
      gl.attachShader(prog, vs);
      gl.attachShader(prog, fs);
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
      gl.useProgram(prog);
      const buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
      const loc = gl.getAttribLocation(prog, "p");
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
      const uRes = gl.getUniformLocation(prog, "uRes");
      const uT = gl.getUniformLocation(prog, "uT");
      const uA = gl.getUniformLocation(prog, "uA");
      const uB = gl.getUniformLocation(prog, "uB");
      const uC = gl.getUniformLocation(prog, "uC");

      const resize = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
        const w = Math.max(1, Math.round(canvas.clientWidth * dpr));
        const h = Math.max(1, Math.round(canvas.clientHeight * dpr));
        if (canvas.width !== w || canvas.height !== h) {
          canvas.width = w;
          canvas.height = h;
        }
        gl!.viewport(0, 0, w, h);
      };

      const t0 = performance.now();
      let tPaused = 0;
      let last = t0;
      const draw = (now: number) => {
        if (!gl) return;
        if (pausedRef.current || reducedRef.current) tPaused += now - last;
        last = now;
        resize();
        const [a, b, c] = paletteRef.current.map(hexToRgb);
        gl.uniform2f(uRes, canvas.width, canvas.height);
        gl.uniform1f(uT, 12 + (now - t0 - tPaused) / 1000);
        gl.uniform3f(uA, ...a);
        gl.uniform3f(uB, ...b);
        gl.uniform3f(uC, ...c);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
      };

      const loop = (now: number) => {
        draw(now);
        if (reducedRef.current) {
          raf = 0;
          return;
        }
        raf = visible && !document.hidden ? requestAnimationFrame(loop) : 0;
      };

      const io = new IntersectionObserver(([e]) => {
        visible = e.isIntersecting;
        if (visible && !raf && !reducedRef.current) raf = requestAnimationFrame(loop);
      });
      io.observe(canvas);
      const onVis = () => {
        if (!document.hidden && visible && !raf && !reducedRef.current) raf = requestAnimationFrame(loop);
      };
      document.addEventListener("visibilitychange", onVis);
      redrawRef.current = () => {
        if (!raf) raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
      setReduced(reducedRef.current);
      setReady(true);

      cleanupGl = () => {
        redrawRef.current = () => {};
        io.disconnect();
        document.removeEventListener("visibilitychange", onVis);
        gl?.getExtension("WEBGL_lose_context")?.loseContext();
      };
    };

    const idle = window.requestIdleCallback
      ? window.requestIdleCallback(start, { timeout: 1200 })
      : window.setTimeout(start, 300);

    return () => {
      disposed = true;
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle as number);
      else clearTimeout(idle as number);
      cancelAnimationFrame(raf);
      cleanupGl();
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className={`trailer ${ready ? "is-ready" : ""}`} aria-hidden="true" />
      {ready && !reduced ? (
        <button
          type="button"
          className="round-btn trailer-toggle"
          onClick={() => setPaused((v) => !v)}
          aria-label={paused ? labels.play : labels.pause}
          aria-pressed={paused}
        >
          {paused ? <IconPlay /> : <IconPause />}
        </button>
      ) : null}
    </>
  );
}
