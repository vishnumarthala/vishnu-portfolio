/**
 * Sends contact requests to the shared Marthala contacts CRM (Supabase). Insert-only for this key;
 * the database stamps the site from the request origin. Schema: marthalasolutions repo, supabase/migrations.
 */

const CRM_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const CRM_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "";

export interface Lead {
  name: string;
  /** At least one of email or phone is required. */
  email?: string | null;
  phone?: string | null;
  organisation?: string | null;
  topic?: string | null;
  message?: string | null;
}

/** Splits an "email or phone" field into the matching lead fields. */
export function reachFields(reach: string): Pick<Lead, "email" | "phone"> {
  return reach.includes("@") ? { email: reach, phone: null } : { email: null, phone: reach };
}

/**
 * Fire-and-forget: keepalive lets the request finish while the page navigates to WhatsApp or the email app.
 * Failures are ignored because the visitor still sends the message themselves.
 */
export function saveLead(lead: Lead): void {
  if (!CRM_URL || !CRM_KEY) return;
  fetch(`${CRM_URL}/rest/v1/leads`, {
    method: "POST",
    keepalive: true,
    headers: { apikey: CRM_KEY, "Content-Type": "application/json", Prefer: "return=minimal" },
    body: JSON.stringify({ source: "vishnumarthala.com", page: window.location.pathname, ...lead }),
  }).catch(() => {});
}
