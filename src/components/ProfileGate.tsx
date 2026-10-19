"use client";

import { useEffect, useRef } from "react";
import type { ProfileId } from "@/content/types";
import Avatar from "./Avatar";
import LangSwitch from "./LangSwitch";
import { useCatalog } from "./catalog";
import { useGateOpen } from "@/lib/profile";

interface Props {
  onChoose: (id: ProfileId) => void;
  onAddYourself: () => void;
}

export default function ProfileGate({ onChoose, onAddYourself }: Props) {
  const { dict } = useCatalog();
  const open = useGateOpen();
  const firstRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const shell = document.getElementById("shell");
    if (shell) shell.inert = open;
    if (open) firstRef.current?.focus();
  }, [open]);

  return (
    <div
      className="gate"
      role="dialog"
      aria-modal="true"
      aria-labelledby="gate-title"
      onKeyDown={(e) => {
        if (e.key === "Escape") onChoose("browse");
      }}
    >
      <div className="gate__bar">
        <span className="wordmark" aria-hidden="true">
          Vishnu Marthala
        </span>
        <LangSwitch />
      </div>
      <div className="gate__center">
        <h2 id="gate-title" className="gate__title">
          {dict.gate.title}
        </h2>
        <p className="gate__lead">{dict.gate.lead}</p>
        <ul className="gate__list">
          {dict.profiles.map((p, i) => (
            <li key={p.id}>
              <button type="button" className="gate__profile" onClick={() => onChoose(p.id)} ref={i === 0 ? firstRef : undefined}>
                <Avatar id={p.id} />
                <span className="gate__name">{p.name}</span>
                <span className="gate__hint">{p.hint}</span>
              </button>
            </li>
          ))}
          <li>
            <button type="button" className="gate__profile" onClick={onAddYourself}>
              <Avatar id="add" />
              <span className="gate__name">{dict.gate.addName}</span>
              <span className="gate__hint">{dict.gate.addHint}</span>
            </button>
          </li>
        </ul>
        <p className="gate__note">{dict.gate.note}</p>
      </div>
    </div>
  );
}
