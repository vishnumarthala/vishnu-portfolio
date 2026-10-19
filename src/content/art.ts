import type { TitleId } from "./types";

export type Motif =
  | "threads"
  | "lattice"
  | "route"
  | "dots"
  | "tally"
  | "signal"
  | "script"
  | "matrix"
  | "strata"
  | "toolpath"
  | "wave"
  | "perspective"
  | "circuit"
  | "seal"
  | "flights";

export type Face = "cond" | "wide" | "serif";

export interface ArtSpec {
  motif: Motif;
  bg: string;
  ink: string;
  accent: string;
  face: Face;
}

export const art: Record<TitleId, ArtSpec> = {
  vishnu: { motif: "threads", bg: "#171213", ink: "#f3eeea", accent: "#e8442c", face: "cond" },
  "enterprise-ai": { motif: "lattice", bg: "#0f2733", ink: "#e6f0f1", accent: "#ff7a45", face: "cond" },
  "talent-india": { motif: "route", bg: "#3a1707", ink: "#fde9cf", accent: "#ffa21f", face: "cond" },
  indofachkraft: { motif: "route", bg: "#eea21e", ink: "#211305", accent: "#0f5a47", face: "wide" },
  "ausbildung-assist": { motif: "dots", bg: "#ebe5d6", ink: "#1f2a44", accent: "#d8301c", face: "wide" },
  "marthala-solutions": { motif: "tally", bg: "#4a1020", ink: "#f6dfc8", accent: "#f4b63a", face: "serif" },
  "remote-talent": { motif: "signal", bg: "#1a1e2a", ink: "#d3dbf2", accent: "#8fb0ff", face: "wide" },
  "telugu-rag": { motif: "script", bg: "#f3eee3", ink: "#151414", accent: "#ffd23f", face: "cond" },
  "overseas-scholar": { motif: "flights", bg: "#0f3b4c", ink: "#e8f4f4", accent: "#ffc857", face: "wide" },
  "transformers-course": { motif: "matrix", bg: "#121119", ink: "#f1ecf7", accent: "#ffb547", face: "wide" },
  roche: { motif: "lattice", bg: "#1d2c36", ink: "#e9f1f5", accent: "#ff7a45", face: "wide" },
  festo: { motif: "strata", bg: "#263428", ink: "#e6efe4", accent: "#b9e46e", face: "cond" },
  "dmg-mori": { motif: "toolpath", bg: "#28282d", ink: "#ededed", accent: "#ff9f1c", face: "cond" },
  keb: { motif: "wave", bg: "#0e3838", ink: "#dff6f2", accent: "#4fe3c1", face: "cond" },
  "msc-stuttgart": { motif: "perspective", bg: "#e7e2d6", ink: "#1e2a3a", accent: "#d8301c", face: "serif" },
  "btech-vit": { motif: "circuit", bg: "#0d2b1f", ink: "#e2f5e8", accent: "#f2c14e", face: "serif" },
  cpsa: { motif: "seal", bg: "#f1cf63", ink: "#2a1a06", accent: "#8a3b12", face: "wide" },
};
