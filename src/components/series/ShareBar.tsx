"use client";

import { useEffect, useState } from "react";
import { copyText } from "../catalog";
import { IconChat, IconCheck, IconCopy, IconLinkedIn } from "../icons";

interface Props {
  url: string;
  text: string;
  labels: { share: string; shareLinkedIn: string; shareX: string; shareWhatsApp: string; copyLink: string; copied: string };
}

export default function ShareBar({ url, text, labels }: Props) {
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!copied) return;
    const t = window.setTimeout(() => setCopied(false), 2400);
    return () => window.clearTimeout(t);
  }, [copied]);

  const u = encodeURIComponent(url);
  const links = [
    { href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`, label: labels.shareLinkedIn, icon: <IconLinkedIn /> },
    { href: `https://x.com/intent/post?text=${encodeURIComponent(text)}&url=${u}`, label: labels.shareX, icon: <span className="share__x" aria-hidden="true">X</span> },
    { href: `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`, label: labels.shareWhatsApp, icon: <IconChat /> },
  ];

  return (
    <section className="share" aria-label={labels.share}>
      <h2 className="share__title">{labels.share}</h2>
      <div className="share__row">
        {links.map((l) => (
          <a key={l.label} className="btn btn--grey btn--sm" href={l.href} target="_blank" rel="noopener noreferrer">
            {l.icon}
            {l.label}
          </a>
        ))}
        <button type="button" className="btn btn--ghost btn--sm" onClick={async () => setCopied(await copyText(url))}>
          {copied ? <IconCheck /> : <IconCopy />}
          <span aria-live="polite">{copied ? labels.copied : labels.copyLink}</span>
        </button>
      </div>
    </section>
  );
}
