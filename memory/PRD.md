# PRD – Pan Čung · Tài Chính An Tâm (finanční poradce pro vietnamskou komunitu v ČR)

## Cíl
Pixel-perfect klon designu teya.com/cz (struktura, animace, typografie) adaptovaný na osobní web finančního poradce **Pana Čunga** – prémiový wealth-management brand (finanční plán, investice, hypotéky, ochrana). Bilingvní CS/VI.

## Barevná paleta (požadavek uživatele: khaki green + gold)
- Tmavá khaki/ink: `#1C2418` (hero, CTA, FAQ, footer, texty), karty `#242D1F`
- Zlatá akcent: `#D9B44A` (script nadpisy, ikony), tlačítka `#CFAA3D`, tmavší `#B3953A`
- Světlé tóny: papír `#F4F2EA`, krémové gradienty `#E5CE8A → #F1E6C4`, `#F3E9C8`
- Khaki zelená doplňková: `#5C6B3C`, `#8A9A5B`

## Fonty (dle Teya – Figtree Variable + Denton + TeyaScript)
Figtree (body – stejný font jako Teya), Caveat (script CS), Instrument Serif (display CS); pro VI automaticky Dancing Script + Playfair Display (vietnamská diakritika). **Uživatel: font Teya zachovat.**

## Stránky / sekce
- `/` – Hero (portrét, 2 plovoucí karty: 8 let zkušeností / 500+ klientů, zlatý glow) → ServiceCards (4 pilíře, tilt) → NumbersStrip (8 / 500+) → O mně → Wealth (interaktivní graf) → Journey (5 kroků) → System (7 modulů, sticky status) → Dashboard (finanční plán) → **Kalkulačky (4 taby, plně funkční přímo na webu)** → Případová studie → Obsah/videa → Testimonialy → CTA → FAQ
- `/kalkulacky?k=invest|mortgage|fire|health` – samostatná stránka kalkulaček + CTA + FAQ
- `/zivotni-pojisteni`, `/investicni-pojisteni`, `/balicky`, `/kontakt` (formulář → API; předvyplnění z kalkulaček přes router state `{interest, message, calc}`)
- Cookie lišta, plovoucí chat (lead), přepínač jazyků (vlajky), mobilní menu, scroll-progress lišta

## Kalkulačky (frontend, `/src/components/calculators/`)
- `math.js`: investSeries, annuity/amortization, fireSim, healthScore
- Investiční (vklad, měsíčně, roky, výnos → hodnota, vloženo, výnos, násobek, graf)
- Hypoteční (cena, vlastní zdroje %, sazba, doba → splátka, úvěr, LTV, úroky celkem, donut, zbývající dluh, doporučený příjem)
- FIRE (věk, portfolio, měsíčně, výdaje, výnos, míra výběru → FIRE číslo, věk FI, progress ring, graf s cílovou linkou)
- Finanční zdraví (příjem, výdaje, splátky, rezerva, investice, ochrana toggle → skóre 0–100, úroveň, 5 dílčích tipů)
- Ověřené hodnoty: invest 3 008 507 Kč; hypotéka 25 475 Kč/měs, úroky 4 370 958 Kč; FIRE 12 M Kč / věk ≈ 61; zdraví 58 → 68 s ochranou

## Backend (FastAPI + MongoDB)
`POST/GET /api/leads` (source: contact | chat | package | **calculator**; `calc.type`, `calc.summary`), `GET /api/leads/{id}`, `PATCH`, `DELETE`, `GET /api/leads/stats`, `GET /api/health`.

## Externí odkazy (z pancung.cz)
Rezervace: pancungradi.simplybook.it · Kvíz: kviz.pancung.cz (kalkulačky již NEODKAZUJÍ ven – vše na webu)

## Zástupné / k doplnění
Telefon, e-mail, adresa (placeholder), YouTube ID videí (placeholder), hero video (.mp4 – zatím fotka), fotky klientů (Unsplash), reference (ukázkové), odkazy na sociální sítě.

## Technické poznámky
- framer-motion 13: `useScroll`+`useTransform` používá nativní ViewTimeline → v sticky sekci nefungovalo; řešeno hookem `useScrollMap` (JS mapování).
- LineChart: při změně počtu bodů se path remountuje (`key=n`, `initial=false`) → žádné „undefined“ path warnings; `refLine` pro cílovou linku.
- Navbar mění téma podle `data-nav="dark"` sekce pod ním (elementFromPoint).
- Animace: WordReveal (nadpisy), TiltCard (karty), ScrollProgress, shine na tlačítkách, animované bary/grafy, AnimatePresence přepínání kalkulaček, page fade.

## Changelog
- 2026-06: Kompilace 20-bodového redesignu ověřena; hero karty → 8 let / 500+; pás čísel bez placeholderů; 4 interaktivní kalkulačky přímo na webu + `/kalkulacky`; více animací; testováno testing agentem (backend 4/4, frontend ~100 % po opravách testid + path warnings).

## Backlog (návrhy)
- P1: Skutečné kontakty/telefon, YouTube videa, reference klientů, odkazy na sociální sítě
- P1: Sdílení výsledku kalkulačky (URL s parametry / PDF)
- P2: AI poradce (CS/VI) přes Emergent LLM key · Admin zóna poptávek · E-mail notifikace · Online sjednání ve 3 krocích · Hero video
