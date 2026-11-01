# Strategie webu Pan Čung — konverzní trychtýř pro vietnamské klienty v ČR

*Stav k 26. 10. 2026. Kontext pro marketingové skilly: [`/.agents/product-marketing.md`](../.agents/product-marketing.md).*

## Cíl
Placená návštěvnost → kontakt → schůzka. Dnes **5 kontaktů z 1 000 návštěv (0,5 %)**, protože web nabízí jen „domluvte si konzultaci". Cíl: **8–20 %** návštěv nechá kontakt výměnou za hodnotu zdarma (kalkulačka + osobní plán).

| Krok | Benchmark (orientační, nutno změřit) | Na 1 000 návštěv |
|---|---|---|
| Návštěva → kontakt | 8–20 % (kalkulačka/magnet) | ~100 |
| Kontakt → rezervace | 5–15 % (pravidlo praxe) | ~10 |
| Rezervace → účast | 55–75 % | ~7 |

Nejde jen o +2 schůzky: zbylých ~90 lidí je v databázi a ohřívá se follow-upem („v databázi jsou peníze", Konverzky).

## Principy (Hormozi + Konverzky)
1. **Jedna stránka = jeden problém = jeden cíl.** Žádný katalog služeb.
2. **Tajemství zdarma, provedení za peníze.** Magnet úplně vyřeší jeden úzký problém. Kalkulačka ukáže mezeru, dá osobní výsledek a je to 1. krok plánu.
3. **Nejdřív hodnota, pak kontakt.** Kalkulačka se spustí bez e-mailu; plný plán je za jméno + telefon/Zalo (každé pole navíc −5–10 % konverzí).
4. **Scénář VSL = mini-webinář Konverzek:** nadpis „Jak získat X, aniž Y" → velké WOW → 3 vhledy (nebourají řešení) → vysněná budoucnost → nabídka → urgence → opakovaná výzva.
5. **Peníze jsou ve follow-upu.** 6denní ohřívací sekvence (skill `sedmidenni-vyzva`, den 6) přes Zalo/SMS/e-mail.
6. **Landing page bez navigace** — logo + jazyk, žádné únikové odkazy.

## Šablona tematické stránky (`/tema/<téma>`)
1. Nadpis „Jak získat X, aniž Y" (VI) 2. VSL 2–4 min 3. Kalkulačka (start bez kontaktu) 4. Zamčený osobní plán + šablona 5. 3 tipy zdarma 6. Důvěra (EFA, 12 let, ČNB) 7. Nabídka schůzky (30 min, plán na 1 stránce, VI/CS, Praha/online/Zalo) 8. Kalendář 9. FAQ / námitky 10. Děkovací stránka s domácím úkolem (`/tema/<téma>/dekujeme`).

## Témata (priorita podle komunity)
| # | Téma | Magnet | Stav |
|---|---|---|---|
| 1 | Příjmy a výdaje / rezerva | Kalkulačka rezervy + plán 50/30/20 + šablona rozpočtu | ✅ **pilot hotový** `/tema/prijmy-a-vydaje` |
| 2 | Hypotéka pro OSVČ / paušalisty / cizince | „Kolik mi banka půjčí?" + checklist dokumentů | ⏳ (pozor § 91 zák. 257/2016 — reprezentativní příklad) |
| 3 | Budoucnost dětí | Kalkulačka fondu na studium | ⏳ |
| 4 | Důchod / renta | Kalkulačka mezery v důchodu („milion = 3 000 Kč renty") | ⏳ |
| 5 | Kontrola pojistky / IŽP | Kontrola smlouvy zdarma (nejteplejší kontakty) | ⏳ |

## Komunita (rešerše)
~70 000 Vietnamců v ČR (ČSÚ 2025), ~31 000 OSVČ, Praha ~16 000 + Cheb, Brno, Ostrava, Plzeň. Rozhoduje 1. generace (vietnamsky), 2. generace mluví česky a ovlivňuje rodiče. Důvěra = osobní kontakt, doporučení, rodina u stolu. Kanály: Meta (jazyk VI + lokalita CZ — malé publikum, rotovat kreativy), vietnamské FB skupiny, TamdaMedia.eu (advertoriály), spolky, účetní kanceláře. **Zalo — neověřeno**: udělat ~10 rozhovorů v Sapě. Konkurence: MetLife (pobočka v Sapě od 06/2025), nnmm.cz, účetní kanceláře. **Nikdo nemá VSL + kalkulačka trychtýř.**

## Co je hotové (v kódu)
- Pilotní trychtýř `/tema/prijmy-a-vydaje` + děkovací stránka, VI i CS, vlastní layout bez navigace.
- Kalkulačka rezervy s částečným zamčením, formulář (jméno, telefon, kanál Zalo/telefon/Messenger/e-mail, souhlas GDPR, honeypot proti botům), plán 50/30/20, stažení šablony rozpočtu (CSV pro Excel), uložení plánu do PDF.
- Odesílání kontaktů: Netlify Forms (formulář `lead`), záložně FastAPI backend.
- Měření: `ViewContent → CalculatorStart → Lead → Schedule` do `dataLayer`; Meta Pixel se načte jen s `REACT_APP_META_PIXEL_ID` **a** souhlasem s cookies.
- Jazyk: `?lang=vi` v odkazu z reklamy, jinak uložená volba / jazyk prohlížeče.
- Homepage = rozcestník „Co vás trápí?" (6 sekcí místo 14; mobil 29 → 10,7 obrazovky). Hero na mobilu bez „mrtvého" scrollu.
- Odstraněna neověřená čísla (8 let, 500+ klientů) → 12 let, EFA, 600 mil. Kč.
- **Odstraněna analytika Emergentu (PostHog s nahráváním relací na ap.emergent.sh bez souhlasu)** a skript emergent-main.js.
- Scénář VSL: [`docs/vsl/prijmy-a-vydaje.vi.md`](vsl/prijmy-a-vydaje.vi.md), [`.cs.md`](vsl/prijmy-a-vydaje.cs.md).

## Co musíš doplnit ty (před reklamou)
- [ ] **Číslo registrace ČNB** — `data/funnels.js` (`cnb`) a skript VSL.
- [ ] **Natočit VSL** podle scénáře → nahrát do `frontend/public/videos/` → `funnelMedia` v `src/mock.js`.
- [ ] Nechat **vietnamské texty zkontrolovat rodilým mluvčím** (`data/funnels.js`, `vi`).
- [ ] Potvrdit doporučení „rezerva 3 měsíce, OSVČ 6 měsíců" jako vlastní.
- [ ] **Patička webu má smyšlené kontakty** (+420 000 000 000, info@taichinhantam.cz) — doplnit skutečné.
- [ ] **Stránka Zásady ochrany osobních údajů** (GDPR) — formulář sbírá telefon.
- [ ] Netlify: *Site settings → Forms → Enable form detection*, pak znovu nasadit; nastavit e-mailové upozornění na nový kontakt.
- [ ] Meta Pixel ID → proměnná `REACT_APP_META_PIXEL_ID` při buildu.
- [ ] Follow-up sekvence 6 zpráv (Zalo/SMS/e-mail) — skill `sedmidenni-vyzva` den 6 / skill `emails`, `sms`.

## Další kroky
1. Malý test reklamy (Meta, VI, Praha + 4 města) na pilot → změřit kontakt → rezervace → účast.
2. Teprve pak klonovat šablonu na téma 2 (hypotéka OSVČ).
3. Zbylé staré stránky (`/sluzby/*`, `/investicni-pojisteni`, `/jak-pracuji`) postupně nahradit tematickými trychtýři; obsahují ještě fotky z fotobanky.

## Nástroje
**Skilly (nainstalované v `~/.claude/skills`):** cro, copywriting, copy-editing, lead-magnets, free-tools, offers, emails, sms, conversion-tracking, ab-testing, ads, ad-creative, product-marketing, site-architecture, marketing-psychology, video (coreyhaines31/marketingskills @ e85f3cb) + frontend-design, webapp-testing (anthropics/skills @ dbd4588). Vlastní: sedmidenni-vyzva (Konverzky), lead-magnet, grand-slam-offer, value-equation, core-four, pan-cung-content.
**Doporučené služby:** SimplyBook (stávající, vložený na stránce) nebo Cal.com; Meta Pixel + Conversions API; PostHog (vlastní účet, se souhlasem) pro analýzu trychtýře.
