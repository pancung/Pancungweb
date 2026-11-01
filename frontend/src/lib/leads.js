import { createLead } from "./api";

// Funnel leads go to whichever backend is available:
//  1. Netlify Forms – the static site on Netlify (form "lead" is declared in public/index.html;
//     "Form detection" must be enabled in the Netlify site settings).
//  2. The FastAPI /api/leads endpoint, when REACT_APP_BACKEND_URL points at a running backend.
// In local development neither exists, so the lead is logged and treated as sent.

const encode = (data) =>
  Object.entries(data)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v ?? "")}`)
    .join("&");

// Dev server (also when shared through a tunnel) or a local host: no real lead backend.
const isLocal = () =>
  process.env.NODE_ENV !== "production" || /^(localhost|127\.0\.0\.1|\[::1\])$/.test(window.location.hostname);

async function toNetlify(lead) {
  const res = await fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: encode({ "form-name": "lead", ...lead }),
  });
  if (!res.ok) throw new Error(`Netlify form ${res.status}`);
}

async function toBackend(lead) {
  if (!process.env.REACT_APP_BACKEND_URL) throw new Error("no backend");
  await createLead({
    name: lead.name,
    phone: lead.phone,
    email: lead.email || null,
    interest: lead.topic,
    langPref: lead.channel,
    lang: lead.lang,
    message: lead.summary,
  });
}

export async function submitLead(lead) {
  if (isLocal()) {
    try {
      await toBackend(lead);
    } catch {
      // eslint-disable-next-line no-console
      console.info("[lead – dev, nikam neodesláno]", lead);
    }
    return;
  }
  try {
    await toNetlify(lead);
  } catch (e) {
    await toBackend(lead); // throws if this fails too – the form shows the error
  }
}
