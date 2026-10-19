"use client";

import { useEffect, type CSSProperties } from "react";

/** One authored moment per profile pick: the monogram ignites and the camera flies through it. */
export default function Intro({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = window.setTimeout(onDone, 1900);
    return () => window.clearTimeout(t);
  }, [onDone]);

  return (
    <div className="intro" aria-hidden="true" onClick={onDone}>
      <div className="intro__mark">
        <span className="intro__v">V</span>
        <span className="intro__m">M</span>
      </div>
      <div className="intro__threads">
        {Array.from({ length: 14 }, (_, i) => (
          <span key={i} style={{ "--i": i } as CSSProperties} />
        ))}
      </div>
    </div>
  );
}
