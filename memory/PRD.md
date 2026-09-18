# PRD – Pan Čung · Tài Chính An Tâm (životní pojištění pro vietnamskou komunitu v ČR)

## Cíl
Pixel-perfect klon designu teya.com/cz (struktura, animace, typografie) adaptovaný na osobní web finančního poradce **Pana Čunga** – prodej životního a investičního životního pojištění vietnamské komunitě v Česku. Bilingvní CS/VI.

## Barevná paleta (požadavek uživatele: khaki green + gold)
- Tmavá khaki/ink: `#1C2418` (hero, CTA, FAQ, footer, texty), karty `#242D1F`
- Zlatá akcent: `#D9B44A` (script nadpisy, ikony), tlačítka `#CFAA3D`, tmavší `#B3953A`
- Světlé tóny: papír `#F4F2EA`, krémové gradienty `#E5CE8A → #F1E6C4`, `#F3E9C8`
- Khaki zelená doplňková: `#5C6B3C`, `#8A9A5B`

## Fonty
Figtree (body), Caveat (script CS), Instrument Serif (display CS); pro VI automaticky Dancing Script + Playfair Display (podpora vietnamské diakritiky).

## Stránky / sekce
- `/` – scroll-driven hero (fotka Pana Čunga, zmenšení do karty, dashboard karty s rolujícími čísly), zlatá intro sekce s nakloněným zařízením, 3 feature karty, **O mně** (foto + 500+ klientů, 8 let, 15 min zdarma, rezervace hovoru, kvíz), kalkulačka (slidery), videa (YouTube modal), „aplikace", testimonialy (účtenka), CTA s rotujícími městy, FAQ
- `/zivotni-pojisteni`, `/investicni-pojisteni`, `/balicky` (3 balíčky + srovnání), `/kontakt` (formulář → API, rezervace hovoru)
- Cookie lišta, plovoucí chat (lead), přepínač jazyků (vlajky), mobilní menu

## Backend (FastAPI + MongoDB)
`POST/GET /api/leads`, `GET /api/leads/{id}`, `PATCH`, `DELETE`, `GET /api/leads/stats`, `GET /api/health` – otestováno 11/11.

## Externí odkazy (z pancung.cz)
Rezervace: pancungradi.simplybook.it · Kvíz: kviz.pancung.cz · Kalkulačky: pancung.cz

## Zástupné / k doplnění
Telefon, e-mail, adresa (placeholder), YouTube ID videí (placeholder), hero video (.mp4 – zatím fotka), fotky klientů (Unsplash).

## Technické poznámky
- framer-motion 13: `useScroll`+`useTransform` používá nativní ViewTimeline → v sticky sekci nefungovalo; řešeno hookem `useScrollMap` (JS mapování).
- Navbar mění téma podle `data-nav="dark"` sekce pod ním (elementFromPoint).

## Backlog (návrhy)
AI poradce (CS/VI) přes Emergent LLM key · Admin zóna poptávek · E-mail notifikace · Online sjednání ve 3 krocích · Vlastní videa/hero video
