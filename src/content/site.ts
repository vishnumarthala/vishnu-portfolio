export const EMAIL = "vishnu.marthala@indofachkraft.de";
export const PHONE_DISPLAY = "+49 176 41791626";
export const PHONE_HREF = "tel:+4917641791626";
/** WhatsApp runs on the same mobile number; digits only, as wa.me expects. */
export const WHATSAPP_NUMBER = "4917641791626";
/**
 * LinkedIn profile URL, e.g. "https://www.linkedin.com/in/<handle>/". The link supplied was the
 * LinkedIn feed, not a profile, so LinkedIn links stay hidden until this is set.
 */
export const LINKEDIN_URL: string | null = null;
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://vishnu-portfolio.vercel.app";
