# ZADÁNÍ PROJEKTU — Web Pan Čung (Teya.com klon pro finančního poradce)

> Export zadání a stavu projektu. Vytvořeno: červen 2026.
> Dokument slouží k přenesení projektu jinam (jiný tým / jiný nástroj / archiv).

---

## 1. Původní zadání (problem statement)

Vytvořit **klon webu teya.com/cz** — pixel-perfect co do struktury, layoutu, typografie
a animací — adaptovaný na osobní brand **Pana Čunga**, poradce v oblasti životního
pojištění a wealth managementu pro vietnamskou komunitu v ČR.

Web má působit jako **prémiový wealth-management brand**, ne jako „obchod s kalkulačkami“.

### Klíčové požadavky

1. **Homepage = 1:1 zrcadlo anglické verze Teya.com** — stejné pořadí sekcí, stejné chování
   při scrollu, stejné animace.
2. **Bento grid** na homepage — karty se musí dát rozkliknout a otevřít **detail modal
   přesně jako Teya „Automate your bills“** (modal s obsahem, kroky, FAQ a CTA; žádné
   přesměrování na jinou stránku).
3. **3D scrollovací karta**: přední strana **celá zlatá**, pouze s textem
   **„ZLATÁ PRAVIDLA FINANČNÍ SVOBODY“** (+ logo / podpis). Pravidla se odhalí **teprve
   při scrollu dolů** — karta „letí“ do svého slotu v bento panelu a otočí se o 180°.
   Animace musí být **frame-perfect podle teya.com** (proměřené CSS transform matice,
   nikoliv odhad).
4. **Kalkulačky přímo na webu** — integrované v sekci, **žádné přesměrování** na externí
   weby (kvíz/kalkulačky se už neodkazují ven).
5. **Barvy: khaki zelená + zlatá.**
6. **Font zachovat jako na Teyi** (Figtree + script/display doplňky).
7. **Dvojjazyčnost CS / VI** (čeština + vietnamština, včetně diakritiky a vhodných fontů).
8. Obsah **lidský a osobní** (Pan Čung v první osobě, chat s poradcem, papírový finanční
   plán, sekce O mně) — ne korporátní.
9. Rezervace schůzky přes **pancungradi.simplybook.it**, poptávky se ukládají na backend
   (`POST /api/leads`).
10. **Komunikace s agentem probíhá v češtině.**

---

## 2. Design systém

### Barevná paleta (khaki green + gold)

| Role | HEX |
|---|---|
| Tmavá khaki / ink (hero, CTA, FAQ, footer) | `#1C2418` |
| Karty na tmavém | `#242D1F` |
| Zlatá akcent (script nadpisy, ikony) | `#D9B44A` |
| Zlatá tlačítka | `#CFAA3D` |
| Zlatá tmavší (hover) | `#B3953A` |
| Papír / světlé pozadí | `#F4F2EA` |
| Krémové gradienty | `#E5CE8A → #F1E6C4`, `#F3E9C8` |
| Khaki zelená doplňková | `#5C6B3C`, `#8A9A5B` |

### Typografie

- **Body:** Figtree Variable (stejný font jako Teya) — požadavek: font Teya zachovat.
- **Script nadpisy (CS):** Caveat · **Display (CS):** Instrument Serif
- **VI varianta:** Dancing Script + Playfair Display (kvůli vietnamské diakritice)

### Hierarchie textu

- H1: `text-4xl sm:text-5xl lg:text-6xl`
- H2: `text-base md:text-lg`
- Body: `text-base` (mobil `text-sm`) · Small: `text-sm` / `text-xs`

---

## 3. Struktura webu

### Homepage `/` (pořadí sekcí dle teya.com EN)

1. **Hero** — stock video `/videos/hero.mp4` (+ foto fallback), script nadpis
   „Finance, jednoduše.“, osobní podtitul „Jsem Čung…“, scroll shrink + dashboard sloupce,
   karty 8 let / 500+ klientů
2. **GoldIntro** — zlatá sekce „Plán na papíře, srozumitelně.“ (papírový finanční plán
   s podpisem a razítkem)
3. **Bento řada 1** — CASHFLOW (stohující transakce) · INVESTICE (chat s Panem Čungem) ·
   PARTNEŘI (loga)
4. **NumbersStrip** — 8 let / 500+
5. **CardIntro** — „letící“ zlatá karta (přední strana celá zlatá jen s titulem,
   zadní strana = 7 zlatých pravidel)
6. **Bento spodek** — ZLATÁ PRAVIDLA (přistávací slot karty) · HYPOTÉKA (porovnání) ·
   PORADCE (flow) · OCHRANA (checklist pojištění) · KONZULTACE · REZERVA · CÍLE
7. **O mně** — portrét, příběh
8. **AppSection** „Poradce, který je na dosah“ — telefon = chat s Panem Čungem,
   3 mini karty: Mluvíme vaší řečí (Xin chào / Dobrý den / Hello), Rodina, Osobně/Online
9. **Kalkulačky** — kompaktní pill taby („Kolik vám plán může přinést?“ + odkaz
   Všechny kalkulačky)
10. **Případová studie** → **Účtenkové recenze** → **CTA** → **FAQ**

### Bento detail modaly (jako Teya „Automate your bills“)

Klik kamkoliv na kartu / ikona rozbalení / Enter otevře `BentoDetailDialog`
(Radix, scrollovatelný overlay, sticky zavírací tlačítko):

- hlavička: label, titul, intro, CTA „Domluvit konzultaci“ (→ SimplyBook), „Jak pracuji“,
  3 bullets, vizuál karty
- 3 kroky s ilustrací
- FAQ akordeon (4 otázky)
- zlatý CTA blok: „Domluvit konzultaci“ + „Napsat zprávu“ (→ `/kontakt` se `state.interest`)

Obsah CS/VI pro všech 10 karet v `/src/data/bentoDetails.js`.

### Podstránky

- `/jak-pracuji` — ServiceCards (`#sluzby`), Majetek (`#majetek`), 5 kroků,
  Systém (`#system`), Dashboard, Obsah (`#obsah`), CTA
- `/kalkulacky?k=…` — 4 velké karty-taby + kalkulačky
- `/zivotni-pojisteni` · `/investicni-pojisteni` · `/balicky` · `/kontakt`

---

## 4. Kalkulačky (frontend, `/src/components/calculators/`)

`math.js`: `investSeries`, `annuity/amortization`, `fireSim`, `healthScore`

| Kalkulačka | Vstupy | Výstupy |
|---|---|---|
| **Investiční** | vklad, měsíčně, roky, výnos | hodnota, vloženo, výnos, násobek, graf |
| **Hypoteční** | cena, vlastní zdroje %, sazba, doba | splátka, úvěr, LTV, úroky celkem, donut, zbývající dluh, doporučený příjem |
| **FIRE** | věk, portfolio, měsíčně, výdaje, výnos, míra výběru | FIRE číslo, věk FI, progress ring, graf s cílovou linkou |
| **Finanční zdraví** | příjem, výdaje, splátky, rezerva, investice, ochrana (toggle) | skóre 0–100, úroveň, 5 dílčích tipů |

**Ověřené referenční hodnoty (regresní test):**
invest 3 008 507 Kč · hypotéka 25 475 Kč/měs, úroky 4 370 958 Kč ·
FIRE 12 M Kč / věk ≈ 61 · zdraví 58 → 68 s ochranou

---

## 5. Technický stack a architektura

- **Frontend:** React + Tailwind CSS + Framer Motion 13 + Radix (shadcn/ui), React Router
- **Backend:** FastAPI (Python) — všechny routy prefix `/api`
- **DB:** MongoDB (přes `MONGO_URL` z `.env`)
- **Konfigurace:** frontend volá API přes `process.env.REACT_APP_BACKEND_URL`

### Struktura souborů (klíčové)

```
/app/frontend/src/
  components/teya/           Teya klon UI (BentoGrid, BentoCard, CardIntro,
                             GoldRulesCard, BentoDetailDialog)
  components/teya/bento/     sub-komponenty (RulesPanel, …)
  components/calculators/    4 kalkulačky + math.js
  data/                      bentoDetails.js, teya.js, cs.js, vi.js, finance.js
  hooks/useScrollMap.js      vlastní hook pro sticky scroll animace
/app/backend/                FastAPI + MongoDB
```

### API endpointy

- `POST /api/leads` — vytvoření poptávky
  (`source`: `contact` | `chat` | `package` | `calculator`; `calc.type`, `calc.summary`)
- `GET /api/leads` · `GET /api/leads/{id}` · `PATCH /api/leads/{id}` · `DELETE /api/leads/{id}`
- `GET /api/leads/stats` · `GET /api/health`

### DB schéma

```
leads: { client_name, email, message, timestamp, source, calc: { type, summary } }
```

---

## 6. Technické poznámky / pasti (DŮLEŽITÉ pro přenos)

- **framer-motion 13:** `useScroll` + `useTransform` používá nativní ViewTimeline →
  ve sticky sekci nefunguje. Řešeno vlastním hookem **`useScrollMap`** (JS mapování).
  Pro sticky scroll animace vždy používat tento hook.
- **Animace zlaté karty jsou proměřené:** transform matice v `CardIntro.jsx` byly odečteny
  po 50 px scrollu přímo z teya.com (1920×800). Timeline: script texty ±150/+40 px →
  0/−40 px (horní hrana sekce 20 vh → dolní hrana 0); karta po překročení středu 53 vh
  během 1 vh scrollu sjede po naměřené křivce do slotu `#gold-card-landing`
  v `RulesPanel.jsx` a otočí se o 180° (naměřená ease křivka, hrana v polovině).
  **Tyto hodnoty neměnit**, pokud si zadavatel nestěžuje na animaci.
- **LineChart:** při změně počtu bodů se path remountuje (`key=n`, `initial=false`) →
  zabraňuje „undefined path“ warningům; `refLine` pro cílovou linku.
- **Navbar** mění téma podle sekce pod ním (`data-nav="dark"`, `elementFromPoint`).
- **Animace celkově:** WordReveal (nadpisy), TiltCard (karty), ScrollProgress, shine na
  tlačítkách, animované bary/grafy, AnimatePresence pro přepínání kalkulaček, page fade.
- **data-testid** na všech interaktivních prvcích (kebab-case, unikátní).

---

## 7. Externí odkazy a integrace

- Rezervace: **pancungradi.simplybook.it**
- Kvíz: kviz.pancung.cz (kalkulačky už NEODKAZUJÍ ven — vše běží na webu)
- Žádná integrace nevyžaduje API klíče (SimplyBook je použit jen jako externí odkaz)

---

## 8. Zástupné / k doplnění (placeholdery)

Telefon, e-mail, adresa · YouTube ID videí · hero video `.mp4` (zatím fotka) ·
fotky klientů (Unsplash) · reference (ukázkové) · odkazy na sociální sítě.

---

## 9. Changelog (co je hotové)

- **2026-06 (4)** — Bento detail modaly pro všech 10 karet (`BentoDetailDialog` +
  `bentoDetails.js`; klik na kartu / ikonu / Enter). Zlatá karta = 3D flip (přední strana
  jen titul, zadní pravidla) + „letící“ animace proměřená po 50 px na teya.com
  (keyframy pozice/rotace v `CardIntro.jsx`, přistávací slot `#gold-card-landing`
  v `RulesPanel.jsx`). Frontend testy: 100 %, desktop + mobil + VI.
- **2026-06 (3)** — Karta nahrazena „Zlatá pravidla finanční svobody“ s Teya-identickou
  scroll animací (CardIntro → RulesPanel); pořadí sekcí dle teya.com; web humanizován
  (chat, ochrana, papírový plán, O mně na homepage, kompaktní kalkulačky). 0 chyb.
- **2026-06 (2)** — Homepage přestavěna podle teya.com EN (hero video + script, 3D karta,
  zlatá sekce, bento 9 karet, app sekce, účtenkové recenze); staré sekce → `/jak-pracuji`.
- **2026-06 (1)** — 20-bodový redesign; hero karty 8 let / 500+; 4 interaktivní kalkulačky
  přímo na webu + `/kalkulacky`; více animací; backend 4/4 testy.

---

## 10. Backlog (nedokončené)

**P1**
- Lead capture přímo z bento modalů (`POST /api/leads`) místo odkazu na SimplyBook
- Skutečné kontakty (telefon, e-mail, adresa), YouTube videa, reálné reference klientů,
  odkazy na sociální sítě
- Sdílení výsledku kalkulačky (URL s parametry / export PDF)

**P2**
- AI poradce (CS/VI) · Admin zóna poptávek · E-mailové notifikace ·
  Online sjednání ve 3 krocích · Reálné hero video

**Ověření uživatelem (čeká)**
- Potvrzení, že celkový dojem webu je dostatečně „prémiový“ a už nepůsobí jako
  „obchod s kalkulačkami“.
