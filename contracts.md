# API Contracts – Tài Chính An Tâm

## Scope
Backend stores **leads** (poptávky) from: contact form (`/kontakt`), floating chat widget, package selection.
All texts/packages/testimonials stay static in frontend (`/src/data/cs.js`, `/src/data/vi.js`) – they are content, not data.

## Mocked today (frontend/src/mock.js)
- `saveLead()` / `getLeads()` → localStorage (`tcat_leads`). **Replace with API.**
- `computeQuote()` → stays client-side (instant slider feedback). Values are sent with the lead.
- images / videoIds / dashNumbers → static, keep.

## Endpoints (prefix `/api`)
| Method | Path | Body / Query | Response |
|---|---|---|---|
| POST | `/leads` | `{ source, name*, phone*, email?, city?, interest?, langPref?, message?, lang?, packageId?, calc?: {age, monthly, years} }` | `201` Lead |
| GET | `/leads` | `?source=&status=&limit=` | `Lead[]` (newest first) |
| GET | `/leads/{id}` | – | Lead / 404 |
| PATCH | `/leads/{id}` | `{ status: "new"\|"contacted"\|"closed", note? }` | Lead / 404 |
| GET | `/leads/stats` | – | `{ total, bySource, byStatus }` |
| GET | `/health` | – | `{ status: "ok" }` |

Lead = `{ id (uuid), source, name, phone, email, city, interest, langPref, message, lang, packageId, calc, status, note, createdAt (ISO) }`

Validation: `name` & `phone` required (min 2 chars), `source` in `contact|chat|package`, `lang` in `cs|vi`.

## Frontend integration
- New `src/lib/api.js` → axios instance `${REACT_APP_BACKEND_URL}/api`, `createLead(payload)`.
- `ContactPage.jsx`: `saveLead` → `await createLead(...)`, loading state on submit, error toast on failure.
- `Overlays.jsx` (FloatingChat): same.
- `PackagesPage.jsx`: unchanged (navigates to contact with state → lead gets `packageId`).
- Remove `saveLead/getLeads` from `mock.js`.
