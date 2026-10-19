"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState, type FormEvent, type KeyboardEvent, type ReactNode } from "react";
import type { Dict } from "@/content/types";
import { copyText, mailto, useCatalog, whatsapp, type ContactRequest, type ContactTab } from "./catalog";
import { IconArrowRight, IconChat, IconCheck, IconClose, IconCopy, IconLinkedIn, IconMail, IconPhone } from "./icons";

interface Props {
  request: ContactRequest | null;
  onRequestClose: () => void;
}

export default function ContactSheet({ request, onRequestClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const open = request !== null;

  useLayoutEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      className="dlg dlg--sheet"
      aria-labelledby="sheet-title"
      onCancel={(e) => {
        e.preventDefault();
        onRequestClose();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onRequestClose();
      }}
    >
      {request ? <Sheet key={`${request.tab}-${request.topic ?? ""}`} request={request} onRequestClose={onRequestClose} /> : null}
    </dialog>
  );
}

function Sheet({ request, onRequestClose }: { request: ContactRequest; onRequestClose: () => void }) {
  const { dict } = useCatalog();
  const { sheet } = dict;
  const [tab, setTab] = useState<ContactTab>(request.tab ?? "message");
  const tabs: ContactTab[] = ["message", "hiring"];
  const baseId = useId();
  const tabRefs = useRef<Record<ContactTab, HTMLButtonElement | null>>({ message: null, hiring: null });

  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = tabs[(tabs.indexOf(tab) + 1) % tabs.length];
    setTab(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div className="sheet">
      <header className="sheet__head">
        <div>
          <h2 id="sheet-title" className="sheet__title">
            {sheet.title}
          </h2>
          <p className="sheet__lead">{tab === "message" ? sheet.lead : dict.hiring.intro}</p>
        </div>
        <button type="button" className="round-btn round-btn--dark" onClick={onRequestClose} aria-label={dict.ui.close}>
          <IconClose />
        </button>
      </header>

      <div className="sheet__tabs" role="tablist" aria-label={sheet.title}>
        {tabs.map((t) => (
          <button
            key={t}
            ref={(el) => {
              tabRefs.current[t] = el;
            }}
            type="button"
            role="tab"
            id={`${baseId}-tab-${t}`}
            aria-selected={tab === t}
            aria-controls={`${baseId}-panel-${t}`}
            tabIndex={tab === t ? 0 : -1}
            className="sheet__tab"
            onClick={() => setTab(t)}
            onKeyDown={onTabKey}
          >
            {t === "message" ? sheet.tabMessage : sheet.tabHiring}
          </button>
        ))}
      </div>

      <div role="tabpanel" id={`${baseId}-panel-${tab}`} aria-labelledby={`${baseId}-tab-${tab}`} className="sheet__panel">
        {tab === "message" ? <QuickContact dict={dict} topic={request.topic} /> : <HiringForm dict={dict} topic={request.topic} />}
      </div>
    </div>
  );
}

function useCopied() {
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!copied) return;
    const t = window.setTimeout(() => setCopied(false), 2400);
    return () => window.clearTimeout(t);
  }, [copied]);
  return [copied, setCopied] as const;
}

function QuickContact({ dict, topic }: { dict: Dict; topic?: string }) {
  const { contact: c, sheet } = dict;
  const [copied, setCopied] = useCopied();
  const greeting = topic ? sheet.greetingTopic.replace("{topic}", topic) : sheet.greeting;
  const subject = topic ? `${topic}: ${sheet.emailSubject}` : sheet.emailSubject;

  return (
    <ul className="ways">
      <li>
        <a className="way way--primary" href={whatsapp(c.whatsappNumber, greeting)} target="_blank" rel="noopener noreferrer">
          <IconChat className="way__icon" />
          <span className="way__text">
            <span className="way__label">{sheet.whatsapp}</span>
            <span className="way__detail">{c.phone}</span>
          </span>
          <IconArrowRight className="way__go" />
        </a>
      </li>
      <li className="way way--split">
        <IconMail className="way__icon" />
        <span className="way__text">
          <span className="way__label">{sheet.email}</span>
          <span className="way__detail way__detail--strong">{c.email}</span>
        </span>
        <span className="way__actions">
          <button
            type="button"
            className="btn btn--ghost btn--sm"
            onClick={async () => setCopied(await copyText(c.email))}
            aria-live="polite"
          >
            {copied ? <IconCheck /> : <IconCopy />}
            {copied ? sheet.copied : sheet.copy}
          </button>
          <a className="btn btn--ghost btn--sm" href={mailto(c.email, subject, greeting)}>
            {sheet.writeEmail}
          </a>
        </span>
      </li>
      <li>
        <a className="way" href={c.phoneHref}>
          <IconPhone className="way__icon" />
          <span className="way__text">
            <span className="way__label">{sheet.call}</span>
            <span className="way__detail">{c.phone}</span>
          </span>
          <IconArrowRight className="way__go" />
        </a>
      </li>
      {c.linkedin ? (
        <li>
          <a className="way" href={c.linkedin} target="_blank" rel="noopener noreferrer">
            <IconLinkedIn className="way__icon" />
            <span className="way__text">
              <span className="way__label">{c.linkedinLabel}</span>
            </span>
            <IconArrowRight className="way__go" />
          </a>
        </li>
      ) : null}
    </ul>
  );
}

type Errors = Partial<Record<"company" | "name" | "reach", string>>;

function HiringForm({ dict, topic }: { dict: Dict; topic?: string }) {
  const h = dict.hiring;
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [copied, setCopied] = useCopied();
  const id = useId();

  const compose = (): string | null => {
    const form = formRef.current;
    if (!form) return null;
    const data = new FormData(form);
    const val = (k: string) => String(data.get(k) ?? "").trim();
    const next: Errors = {};
    if (!val("company")) next.company = h.errors.company;
    if (!val("name")) next.name = h.errors.name;
    if (!val("reach")) next.reach = h.errors.reach;
    setErrors(next);
    const firstInvalid = (["company", "name", "reach"] as const).find((k) => next[k]);
    if (firstInvalid) {
      form.querySelector<HTMLInputElement>(`[name="${firstInvalid}"]`)?.focus();
      return null;
    }
    const fields = data.getAll("fields").map(String);
    const lines: [string, string][] = [
      [h.company, val("company")],
      [h.name, val("name")],
      [h.reach, val("reach")],
      [h.location, val("location")],
      [h.fields, fields.join(", ")],
      [h.type, val("type")],
      [h.positions, val("positions")],
      [h.start, val("start")],
    ];
    const body = lines
      .filter(([, v]) => v)
      .map(([k, v]) => `${k.replace(/\?$/, "")}: ${v}`)
      .join("\n");
    const parts = [topic ? `${h.heading} (${topic})` : h.heading, "", body];
    const message = val("message");
    if (message) parts.push("", message);
    return parts.join("\n");
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const text = compose();
    if (!text) return;
    const via = (e.nativeEvent as SubmitEvent).submitter?.getAttribute("value");
    if (via === "email") window.location.href = mailto(dict.contact.email, h.subject, text);
    else window.open(whatsapp(dict.contact.whatsappNumber, text), "_blank", "noopener,noreferrer");
  };

  const err = (k: keyof Errors) =>
    errors[k]
      ? { "aria-invalid": true as const, "aria-describedby": `${id}-${k}-err` }
      : {};

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <form
      ref={formRef}
      className="hire"
      noValidate
      onSubmit={onSubmit}
      onInput={(e) => {
        const t = e.target as HTMLInputElement;
        const k = t.name as keyof Errors;
        if (errors[k] && t.value.trim()) {
          setErrors((prev) => {
            const next = { ...prev };
            delete next[k];
            return next;
          });
        }
      }}
    >
      {hasErrors ? (
        <p className="hire__summary" role="alert">
          {h.errors.summary}
        </p>
      ) : null}
      <div className="hire__grid">
        <Field id={`${id}-company`} label={h.company} error={errors.company} errId={`${id}-company-err`}>
          <input id={`${id}-company`} name="company" type="text" autoComplete="organization" required {...err("company")} />
        </Field>
        <Field id={`${id}-name`} label={h.name} error={errors.name} errId={`${id}-name-err`}>
          <input id={`${id}-name`} name="name" type="text" autoComplete="name" required {...err("name")} />
        </Field>
        <Field id={`${id}-reach`} label={h.reach} hint={h.reachHint} error={errors.reach} errId={`${id}-reach-err`}>
          <input id={`${id}-reach`} name="reach" type="text" autoComplete="email" required {...err("reach")} />
        </Field>
        <Field id={`${id}-location`} label={h.location} optional={h.optional}>
          <input id={`${id}-location`} name="location" type="text" autoComplete="address-level2" />
        </Field>
      </div>

      <fieldset className="hire__set">
        <legend>
          {h.fields} <span className="hire__opt">{h.optional}</span>
        </legend>
        <div className="chips">
          {h.fieldOptions.map((o) => (
            <label key={o} className="chip">
              <input type="checkbox" name="fields" value={o} />
              <span>{o}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="hire__set">
        <legend>
          {h.type} <span className="hire__opt">{h.optional}</span>
        </legend>
        <div className="chips">
          {h.typeOptions.map((o) => (
            <label key={o} className="chip">
              <input type="radio" name="type" value={o} />
              <span>{o}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="hire__grid">
        <Field id={`${id}-positions`} label={h.positions} optional={h.optional}>
          <input id={`${id}-positions`} name="positions" type="number" min={1} inputMode="numeric" />
        </Field>
        <Field id={`${id}-start`} label={h.start} optional={h.optional}>
          <input id={`${id}-start`} name="start" type="text" placeholder={h.startHint} />
        </Field>
      </div>
      <Field id={`${id}-message`} label={h.message} optional={h.optional}>
        <textarea id={`${id}-message`} name="message" rows={3} />
      </Field>

      <div className="hire__actions">
        <button type="submit" name="via" value="whatsapp" className="btn btn--brand">
          <IconChat />
          {h.sendWhatsapp}
        </button>
        <button type="submit" name="via" value="email" className="btn btn--ghost">
          <IconMail />
          {h.sendEmail}
        </button>
        <button
          type="button"
          className="text-btn hire__copy"
          onClick={async () => {
            const text = compose();
            if (text) setCopied(await copyText(text));
          }}
        >
          {copied ? <IconCheck /> : <IconCopy />}
          <span aria-live="polite">{copied ? h.copied : h.copy}</span>
        </button>
      </div>
      <p className="hire__note">{h.note}</p>
    </form>
  );
}

function Field({
  id,
  label,
  hint,
  optional,
  error,
  errId,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  optional?: string;
  error?: string;
  errId?: string;
  children: ReactNode;
}) {
  return (
    <div className={`field ${error ? "field--error" : ""}`}>
      <label htmlFor={id} className="field__label">
        {label} {optional ? <span className="hire__opt">{optional}</span> : null}
      </label>
      {hint ? <span className="field__hint">{hint}</span> : null}
      {children}
      {error ? (
        <span id={errId} className="field__error">
          {error}
        </span>
      ) : null}
    </div>
  );
}
