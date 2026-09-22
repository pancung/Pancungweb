// Expanded "placeholder" detail content for every bento card (mirrors teya.com modal structure)
// { label, intro, bullets[3], steps[3]{n,title,desc,checks[3],stat[label,value]}, faq[4]{q,a}, cta{title,sub} }

const cs = {
  common: { primary: "Domluvit konzultaci", secondary: "Jak pracuji", faqTitle: "Časté otázky", faqSub: "Co se klienti ptají nejčastěji.", ctaPrimary: "Domluvit konzultaci", ctaSecondary: "Napsat zprávu", close: "Zavřít" },
  cashflow: {
    intro: "Na první konzultaci sestavíme přehled příjmů a výdajů. Zjistíte, kolik reálně můžete odkládat, a nastavíme pravidla, která fungují bez tabulek.",
    bullets: ["Přehled příjmů a výdajů za 30 minut", "Automatické rozdělení peněz na cíle hned po výplatě", "Bez složitých tabulek a aplikací"],
    steps: [
      { n: "01", title: "Zjistíme, kam peníze tečou", desc: "Projdeme výpisy za poslední tři měsíce a rozdělíme výdaje na nutné, zbytné a splátky.", checks: ["Výpisy z účtů a karet", "Fixní vs. proměnlivé výdaje", "Skryté poplatky a zbytečné smlouvy"], stat: ["Volné cashflow", "12 400 Kč / měs."] },
      { n: "02", title: "Nastavíme pravidla po výplatě", desc: "V den výplaty odchází pevné částky na rezervu, investice a ochranu. Zbytek je na život – bez pocitu viny.", checks: ["Trvalé příkazy den po výplatě", "Oddělený účet na rezervu", "Jedna částka na běžný život"], stat: ["Odkládáte", "20 % příjmu"] },
      { n: "03", title: "Kontrola jednou za rok", desc: "Každý rok plán zaktualizujeme podle změn příjmů, rodiny a cílů.", checks: ["Roční revize zdarma", "Úprava částek při změně příjmu", "Přehled na jedné stránce"], stat: ["Revize", "1× ročně"] },
    ],
    faq: [
      { q: "Musím posílat výpisy z účtu?", a: "Stačí orientační čísla. Přesné výpisy pomohou, ale nejsou nutné – vše zůstává mezi nami." },
      { q: "Kolik bych měl odkládat?", a: "Ideálně 20–30 % čistého příjmu. Začneme ale tam, kde jste dnes, a částku postupně zvyšujeme." },
      { q: "Potřebuji aplikaci nebo tabulku?", a: "Ne. Systém stojí na trvalých příkazech a odděleném účtu. Funguje sám." },
      { q: "Co když mám nepravidelný příjem?", a: "Nastavíme rezervu na výkyvy a procentní pravidlo místo pevných částek." },
    ],
    cta: { title: "Přestaňte hádat, kam mizí peníze", sub: "Jedna konzultace a máte přehled, který drží." },
  },
  invest: {
    intro: "Pravidelné investování do diverzifikovaného portfolia podle vašeho horizontu a rizikového profilu. Bez časování trhu, s disciplínou – a s poradcem, který je s vámi i v krizi.",
    bullets: ["Globální ETF a fondy, ne jednotlivé akcie", "Částka a horizont podle vašeho plánu", "Roční rebalancování a kontrola nákladů"],
    steps: [
      { n: "01", title: "Určíme horizont a riziko", desc: "Na co investujete a kdy peníze potřebujete? Podle toho nastavíme poměr akcií a dluhopisů.", checks: ["Investiční dotazník", "Horizont 5, 10, 20+ let", "Poměr akcie / dluhopisy"], stat: ["Doporučeno", "80 / 20"] },
      { n: "02", title: "Nastavíme pravidelnou investici", desc: "Trvalý příkaz den po výplatě. Nakupujete každý měsíc bez ohledu na náladu trhu.", checks: ["Od 1 000 Kč měsíčně", "Nízkonákladové ETF (TER < 0,3 %)", "Daňový test 3 roky"], stat: ["Měsíčně", "5 000 Kč"] },
      { n: "03", title: "Držíme kurz i v krizi", desc: "Když trh spadne, nic neprodáváme. Plán s poklesy počítá – a já jsem na telefonu.", checks: ["Rebalancování 1× ročně", "Žádné časování trhu", "Poradce na telefonu"], stat: ["Modelově za 20 let", "3,0 M Kč"] },
    ],
    faq: [
      { q: "Kolik můžu ztratit?", a: "Krátkodobě může portfolio kolísat i o desítky procent. Proto investujeme jen peníze s horizontem 5+ let a držíme rezervu." },
      { q: "Jsou výnosy garantované?", a: "Ne. Uvádíme modelové výpočty. Historicky akciové trhy rostly v průměru 7–9 % ročně, budoucnost nikdo nezná." },
      { q: "Jaké jsou poplatky?", a: "Preferuji nízkonákladová ETF a fondy s TER pod 0,3 %. Vždy vidíte všechny náklady černé na bílém." },
      { q: "Můžu kdykoliv vybrat?", a: "Ano, peníze máte do několika dnů. Po třech letech držení je výnos v ČR osvobozen od daně." },
    ],
    cta: { title: "Nechte peníze pracovat pravidelně", sub: "Nastavíme částku, portfolio a datum. Zbytek běží sám." },
  },
  partners: {
    intro: "Jako nezávislý zprostředkovatel porovnávám nabídky desítek bank, pojišťoven a investičních společností. Doporučení stavím na vašich číslech, ne na provizi.",
    bullets: ["Přes 20 partnerů na jednom místě", "Porovnání nabídek černé na bílém", "Nezávislost – žádná preferovaná instituce"],
    steps: [
      { n: "01", title: "Zadání podle vašich čísel", desc: "Nejdřív plán, potom produkt. Zjistíme, co přesně potřebujete, a teprve pak hledáme řešení.", checks: ["Cíl, částka, horizont", "Požadavky na flexibilitu", "Co vám nevyhovuje dnes"], stat: ["Partnerů", "20+"] },
      { n: "02", title: "Porovnání trhu", desc: "Oslovím relevantní instituce a připravím přehled: sazby, poplatky, podmínky – vedle sebe.", checks: ["Banky, pojišťovny, investiční společnosti", "Celkové náklady, ne jen sazba", "Podmínky výpovědi a změn"], stat: ["Porovnání", "do 48 h"] },
      { n: "03", title: "Sjednání a servis", desc: "Vyřídím papírování a zůstávám s vámi i po podpisu – při změnách, škodách i refinancování.", checks: ["Online i osobní podpis", "Pomoc při pojistné události", "Roční kontrola smluv"], stat: ["Servis", "po celou dobu"] },
    ],
    faq: [
      { q: "Kdo vás platí?", a: "Odměnu dostávám od instituce, u které smlouvu sjednáte. Vy neplatíte nic navíc – a vidíte, kolik odměna činí." },
      { q: "Nedoporučujete jen to, co má vyšší provizi?", a: "Ne. Doporučení vždy vychází z plánu a porovnání. Rád vám ukážu i varianty, kde nemám odměnu žádnou." },
      { q: "Můžu si vybrat vlastní banku?", a: "Samozřejmě. Porovnání slouží vám – rozhodnutí je vždy vaše." },
      { q: "S kým spolupracujete?", a: "S většinou českých bank, pojišťoven a investičních společností. Seznam vám rád pošlu." },
    ],
    cta: { title: "Jeden poradce, celý trh", sub: "Porovnám za vás a vysvětlím rozdíly – vietnamsky i česky." },
  },
  rules: {
    intro: "Sedm pravidel shrnuje, co má smysl řešit v jakém věku: rezerva, zbavení se špatných dluhů, levná a správná ochrana, vlastní bydlení, akciové fondy, diverzifikace a snižování rizika před finanční nezávislostí.",
    bullets: ["Kartu dostanete na první konzultaci", "Každé pravidlo má konkrétní krok ve vašem plánu", "Ověřeno u stovek rodin"],
    steps: [
      { n: "01", title: "30–40 let: základy", desc: "Rezerva 6× nutné výdaje, konec špatných dluhů, správná ochrana a první pravidelná investice.", checks: ["Rezerva 6 měsíců", "Kreditky a spotřebitelské úvěry pryč", "Rizikové životní pojištění s klesající částkou"], stat: ["Pravidla", "1–5"] },
      { n: "02", title: "40–50 let: diverzifikace", desc: "K akciím přidáváme dluhopisové fondy a nemovitosti. Portfolio se rozkládá.", checks: ["Dluhopisové fondy", "Nemovitost jako část majetku", "Kontrola poměru rizika"], stat: ["Pravidlo", "6"] },
      { n: "03", title: "50–60 let: bezpečí", desc: "Před finanční nezávislostí postupně snižujeme podíl akcií, aby výkyvy trhu neohrozily plán.", checks: ["Postupné snižování akcií", "Rentový plán", "Ochrana majetku pro rodinu"], stat: ["Pravidlo", "7"] },
    ],
    faq: [
      { q: "Platí pravidla pro každého?", a: "Jsou to principy, ne dogma. Pořadí a částky přizpůsobíme vaší situaci." },
      { q: "Co když jsem starší a začínám od nuly?", a: "Začneme rezervou a ochranou, investiční horizont zkrátíme a zvolíme konzervativnější mix." },
      { q: "Můžu kartu dostat i bez konzultace?", a: "Kartu předávám osobně na první schůzce – patří k ní vysvětlení, jak ji použít." },
      { q: "Jak dlouho trvá projít všech sedm pravidel?", a: "Základy (1–5) zvládneme nastavit do jednoho roku. Zbytek je otázka disciplíny a času." },
    ],
    cta: { title: "Sedm pravidel, jeden plán", sub: "Zjistěte, u kterého pravidla právě jste – a co je další krok." },
  },
  mortgage: {
    intro: "Od porovnání sazeb přes nastavení fixace až po refinancování. Zohledníme cashflow, rezervu i budoucí plány rodiny – aby splátka nezadusila zbytek plánu.",
    bullets: ["Porovnání nabídek bank vedle sebe", "Splátka do 35 % čistého příjmu", "Pomoc s refinancováním při konci fixace"],
    steps: [
      { n: "01", title: "Kolik si můžete dovolit", desc: "Spočítáme bezpečnou výši úvěru podle příjmů, výdajů a rezervy – ne podle maxima banky.", checks: ["Splátka max. 35 % příjmu", "Rezerva 6 splátek", "Prostor na investice"], stat: ["Bezpečná splátka", "24 100 Kč"] },
      { n: "02", title: "Porovnání bank", desc: "Oslovím banky a připravím přehled sazeb, poplatků a podmínek. Vyjednám lepší nabídku.", checks: ["Sazba a RPSN", "Poplatky za odhad a vedení", "Podmínky mimořádných splátek"], stat: ["Úspora", "až 1 200 Kč / měs."] },
      { n: "03", title: "Podpis a servis", desc: "Zajistím odhad, dokumenty a podpis. Před koncem fixace se ozvu s novým porovnáním.", checks: ["Kompletní papírování", "Pojištění nemovitosti", "Hlídání konce fixace"], stat: ["Fixace", "hlídám za vás"] },
    ],
    faq: [
      { q: "Kolik potřebuji vlastních zdrojů?", a: "Zpravidla 10–20 % ceny nemovitosti. Čím více, tím lepší sazba." },
      { q: "Je lepší kratší nebo delší fixace?", a: "Záleží na vývoji sazeb a vašich plánech. Projdeme scénáře a vybereme společně." },
      { q: "Můžu hypotéku splatit dřív?", a: "Ano, ze zákona můžete ročně splatit až 25 % bez poplatku a při výročí fixace celou." },
      { q: "Pomůžete i s refinancováním?", a: "Ano. Před koncem fixace porovnám trh a přenesu hypotéku, pokud se to vyplatí." },
    ],
    cta: { title: "Bydlení bez stresu ze splátky", sub: "Porovnám banky a nastavím splátku, která sedí do plánu." },
  },
  advisor: {
    intro: "Pan Čung System je sedm propojených modulů od příjmu po finanční svobodu. Jeden poradce, jeden plán – žádné protichůdné produkty od různých prodejců.",
    bullets: ["Příjem se automaticky dělí mezi rezervu, investice a ochranu", "Jeden přehled pro celou rodinu", "Roční aktualizace zdarma"],
    steps: [
      { n: "01", title: "Analýza", desc: "Zmapujeme příjmy, výdaje, majetek, dluhy a smlouvy. Vše na jedné stránce.", checks: ["Přehled majetku a dluhů", "Kontrola stávajících smluv", "Cíle a horizonty"], stat: ["Modulů", "7"] },
      { n: "02", title: "Plán", desc: "Navrhneme rozdělení příjmu, nástroje pro každý cíl a časový harmonogram.", checks: ["Rezerva → investice → ochrana", "Nástroj pro každý cíl", "Harmonogram na 12 měsíců"], stat: ["Plán", "na 1 stránce"] },
      { n: "03", title: "Realizace a servis", desc: "Sjednáme smlouvy, nastavíme příkazy a každý rok plán zkontrolujeme.", checks: ["Nastavení trvalých příkazů", "Sjednání smluv", "Roční revize"], stat: ["Servis", "dlouhodobě"] },
    ],
    faq: [
      { q: "Co když už mám smlouvy odjinud?", a: "Projdeme je. Co dává smysl, necháme. Co ne, změníme nebo zrušíme." },
      { q: "Musím dělat všechno najednou?", a: "Ne. Plán má pořadí – začínáme rezervou a ochranou, investice přidáváme postupně." },
      { q: "Jak často se potkáváme?", a: "První plán ve dvou schůzkách, poté roční revize. Mezi tím jsem na telefonu či Zalo." },
      { q: "Kolik konzultace stojí?", a: "Úvodní hovor je zdarma. Odměnu dostávám od institucí, u kterých smlouvy sjednáte." },
    ],
    cta: { title: "Vše na jednom místě", sub: "Jeden plán, který propojí rezervu, investice i ochranu." },
  },
  protect: {
    intro: "Zlaté pravidlo č. 3: dobře a levně se pojistit. Nastavíme ochranu příjmu s klesající pojistnou částkou, invaliditu i majetek – a zrušíme, co je zbytečné.",
    bullets: ["Rizikové životní pojištění bez spořicí složky", "Invalidita a vážné nemoci jako priorita", "Zrušení zbytečných a drahých smluv"],
    steps: [
      { n: "01", title: "Co skutečně potřebujete krýt", desc: "Výpadek příjmu, invalidita, smrt živitele, škody na majetku. Ostatní rizika zvládne rezerva.", checks: ["Ochrana příjmu", "Invalidita 2. a 3. stupně", "Odpovědnost a majetek"], stat: ["Priorit", "4"] },
      { n: "02", title: "Správná částka a cena", desc: "Pojistnou částku odvodíme z dluhů a příjmu. Klesající částka = nižší cena.", checks: ["Částka podle hypotéky a příjmu", "Klesající pojistná částka", "Porovnání 8+ pojišťoven"], stat: ["Rodina", "od 1 450 Kč / měs."] },
      { n: "03", title: "Servis při události", desc: "Když se něco stane, řeším hlášení a komunikaci s pojišťovnou za vás.", checks: ["Hlášení události", "Komunikace s pojišťovnou", "Roční kontrola krytí"], stat: ["Pomoc", "24 h"] },
    ],
    faq: [
      { q: "Mám investiční životní pojištění. Je to dobře?", a: "Většinou ne. Spořicí složka bývá drahá. Ochranu a investice řešíme zvlášť – levněji a průhledně." },
      { q: "Kolik má stát pojištění?", a: "Pro rodinu obvykle 1–3 % příjmu. Záleží na dluzích, věku a zdravotním stavu." },
      { q: "Proč klesající pojistná částka?", a: "Protože s každou splátkou hypotéky dluh klesá. Platíte jen za to, co potřebujete." },
      { q: "Co úrazové pojištění?", a: "Úraz je jen zlomek rizik. Přednost má invalidita z jakékoliv příčiny." },
    ],
    cta: { title: "Jen tolik pojištění, kolik dává smysl", sub: "Zkontroluji vaše smlouvy a navrhnu levnější a lepší krytí." },
  },
  consult: {
    intro: "Úvodní 15minutový hovor je zdarma. Následná konzultace trvá 60–90 minut – osobně v Praze, online nebo přes Zalo – a odcházíte s plánem na papíře.",
    bullets: ["Vietnamsky, česky, anglicky", "Osobně v Praze nebo online", "Plán na papíře hned po schůzce"],
    steps: [
      { n: "01", title: "Úvodní hovor (15 min)", desc: "Zjistíme, co řešíte, a domluvíme termín. Bez závazků.", checks: ["Telefon, Zalo nebo WhatsApp", "Zdarma", "Termín do týdne"], stat: ["Zdarma", "15 min"] },
      { n: "02", title: "Konzultace (60–90 min)", desc: "Projdeme čísla, cíle a smlouvy. Navrhneme plán a další kroky.", checks: ["Osobně v Praze / online", "Analýza + návrh", "Plán na papíře"], stat: ["Schůzka", "60–90 min"] },
      { n: "03", title: "Realizace a roční revize", desc: "Sjednáme, co bylo dohodnuto, a každý rok plán zkontrolujeme.", checks: ["Sjednání smluv", "Nastavení příkazů", "Roční revize zdarma"], stat: ["Revize", "1× ročně"] },
    ],
    faq: [
      { q: "Kde se scházíme?", a: "V Praze osobně (Sapa i centrum), jinak online přes Google Meet, Zoom nebo Zalo." },
      { q: "Můžu přijít s partnerem?", a: "Určitě – finance rodiny řešíme společně. Ideálně přijďte oba." },
      { q: "Co si mám připravit?", a: "Orientační příjmy a výdaje, stávající smlouvy a představu o cílech. Vše ostatní doplníme." },
      { q: "Kolik to stojí?", a: "Konzultace i roční revize jsou zdarma. Odměnu dostávám od institucí, u kterých smlouvy sjednáte." },
    ],
    cta: { title: "Domluvme si první hovor", sub: "15 minut zdarma – zjistíme, jestli si sedneme." },
  },
  reserve: {
    intro: "Rezerva zůstává dostupná do druhého dne, ale pracuje na spořicím účtu či v konzervativním fondu. Bez rizika, bez výpovědní lhůty.",
    bullets: ["Peníze dostupné do 24 hodin", "Úrok místo nuly na běžném účtu", "Oddělený účet – nesáhnete na ně omylem"],
    steps: [
      { n: "01", title: "Správná výše rezervy", desc: "3–6 měsíců nutných výdajů. Pro podnikatele a rodiny s jedním příjmem raději více.", checks: ["3–6 měsíců výdajů", "Více pro OSVČ", "Krátkodobá vs. dlouhodobá rezerva"], stat: ["Cíl", "6 měsíců"] },
      { n: "02", title: "Kde ji držet", desc: "Spořicí účet s bonusovou sazbou nebo konzervativní fond peněžního trhu. Porovnám nabídky.", checks: ["Spořicí účty bank", "Fondy peněžního trhu", "Bez výpovědní lhůty"], stat: ["Úrok", "~4 % p.a."] },
      { n: "03", title: "Automatické doplňování", desc: "Po každém čerpání rezervu doplníme trvalým příkazem. Bez přemýšlení.", checks: ["Trvalý příkaz", "Pravidlo čerpání", "Kontrola 1× ročně"], stat: ["Navíc", "+1 400 Kč / měs."] },
    ],
    faq: [
      { q: "Není lepší rezervu investovat?", a: "Ne. Rezerva musí být kdykoliv dostupná a bez výkyvů. Investujeme až peníze nad rezervu." },
      { q: "Jaký spořicí účet je nejlepší?", a: "Ten s nejvyšší reálnou sazbou bez zbytečných podmínek. Nabídky se mění, porovnám aktuální." },
      { q: "Co když rezervu nemám?", a: "Začneme s ní. Je to první krok plánu – před investicemi i pojištěním." },
      { q: "Zdaňuje se úrok?", a: "Ano, banka strhne 15 % srážkovou daň automaticky. Nic nepřiznáváte." },
    ],
    cta: { title: "Nechte rezervu vydělávat", sub: "Vyberu účet nebo fond, kde peníze pracují a zůstanou dostupné." },
  },
  goals: {
    intro: "Každý cíl má vlastní horizont, částku a nástroj – rezerva na spořicím účtu, bydlení ve stavebním spoření či fondu, důchod v dlouhodobém portfoliu.",
    bullets: ["Oddělené cíle, oddělené nástroje", "Pravidelné částky podle priority", "Přehled pokroku na jedné stránce"],
    steps: [
      { n: "01", title: "Pojmenujeme cíle", desc: "Rezerva, bydlení, děti, důchod. Ke každému částka a rok.", checks: ["Priorita cílů", "Cílová částka", "Termín"], stat: ["Cíle", "3–5"] },
      { n: "02", title: "Přiřadíme nástroje", desc: "Krátké cíle konzervativně, dlouhé dynamicky. Každý cíl má svůj účet.", checks: ["Do 3 let: spořicí účet", "3–10 let: smíšené fondy", "10+ let: akciové ETF"], stat: ["Nástroj", "podle horizontu"] },
      { n: "03", title: "Sledujeme pokrok", desc: "Jednou za rok projdeme, jak si každý cíl vede, a upravíme částky.", checks: ["Roční přehled", "Úprava částek", "Oslava splněných cílů"], stat: ["Splněno", "72 %"] },
    ],
    faq: [
      { q: "Můžu mít víc cílů najednou?", a: "Ano, ale s prioritou. Rezerva vždy první, potom ochrana, pak dlouhodobé cíle." },
      { q: "Co když se cíl změní?", a: "Plán je živý. Přesuneme částky nebo změníme nástroj." },
      { q: "Jak sleduji pokrok?", a: "Na roční revizi dostanete přehled na jedné stránce. Mezitím vidíte zůstatky na účtech." },
      { q: "Kolik dávat na který cíl?", a: "Podle priority a termínu. Spočítáme společně – kalkulačky jsou na webu." },
    ],
    cta: { title: "Více cílů, jeden plán", sub: "Rozdělíme peníze tak, aby každý cíl měl svou cestu." },
  },
};

const vi = {
  common: { primary: "Đặt lịch tư vấn", secondary: "Cách tôi làm việc", faqTitle: "Câu hỏi thường gặp", faqSub: "Điều khách hàng hay hỏi nhất.", ctaPrimary: "Đặt lịch tư vấn", ctaSecondary: "Gửi tin nhắn", close: "Đóng" },
  cashflow: {
    intro: "Buổi tư vấn đầu chúng ta lập tổng quan thu chi. Bạn biết thực sự để dành được bao nhiêu và đặt quy tắc hiệu quả không cần bảng tính.",
    bullets: ["Tổng quan thu chi trong 30 phút", "Tự động chia tiền cho mục tiêu ngay sau lương", "Không bảng tính, không ứng dụng phức tạp"],
    steps: [
      { n: "01", title: "Xem tiền chảy đi đâu", desc: "Xem sao kê 3 tháng gần nhất và chia chi tiêu thành thiết yếu, không thiết yếu và trả nợ.", checks: ["Sao kê tài khoản và thẻ", "Chi cố định vs. biến đổi", "Phí ẩn và hợp đồng dư thừa"], stat: ["Dòng tiền tự do", "12 400 Kč / tháng"] },
      { n: "02", title: "Đặt quy tắc sau lương", desc: "Ngày nhận lương, khoản cố định đi vào dự phòng, đầu tư và bảo vệ. Phần còn lại để sống – không áy náy.", checks: ["Lệnh chuyển định kỳ sau lương", "Tài khoản dự phòng riêng", "Một khoản cho sinh hoạt"], stat: ["Để dành", "20 % thu nhập"] },
      { n: "03", title: "Kiểm tra mỗi năm", desc: "Mỗi năm cập nhật kế hoạch theo thay đổi thu nhập, gia đình và mục tiêu.", checks: ["Rà soát hàng năm miễn phí", "Điều chỉnh khi thu nhập đổi", "Tổng quan trên một trang"], stat: ["Rà soát", "1× / năm"] },
    ],
    faq: [
      { q: "Tôi phải gửi sao kê không?", a: "Chỉ cần con số ước lượng. Sao kê giúp chính xác hơn nhưng không bắt buộc – mọi thứ được giữ kín." },
      { q: "Nên để dành bao nhiêu?", a: "Lý tưởng 20–30 % thu nhập ròng. Nhưng ta bắt đầu từ chỗ bạn đang đứng và tăng dần." },
      { q: "Cần ứng dụng hay bảng tính?", a: "Không. Hệ thống dựa trên lệnh định kỳ và tài khoản riêng. Nó tự chạy." },
      { q: "Thu nhập không đều thì sao?", a: "Ta lập dự phòng cho biến động và dùng quy tắc theo phần trăm thay vì số cố định." },
    ],
    cta: { title: "Đừng đoán tiền đi đâu nữa", sub: "Một buổi tư vấn và bạn có tổng quan bền vững." },
  },
  invest: {
    intro: "Đầu tư định kỳ vào danh mục đa dạng theo thời gian và mức rủi ro của bạn. Không đoán thị trường, có kỷ luật – và có tư vấn viên bên bạn khi khủng hoảng.",
    bullets: ["ETF và quỹ toàn cầu, không cổ phiếu lẻ", "Số tiền và thời gian theo kế hoạch của bạn", "Tái cân bằng hàng năm và kiểm soát chi phí"],
    steps: [
      { n: "01", title: "Xác định thời gian và rủi ro", desc: "Bạn đầu tư cho gì và khi nào cần tiền? Từ đó đặt tỷ lệ cổ phiếu / trái phiếu.", checks: ["Bảng câu hỏi đầu tư", "Thời gian 5, 10, 20+ năm", "Tỷ lệ cổ phiếu / trái phiếu"], stat: ["Đề xuất", "80 / 20"] },
      { n: "02", title: "Thiết lập đầu tư định kỳ", desc: "Lệnh định kỳ sau lương. Mua mỗi tháng bất kể tâm lý thị trường.", checks: ["Từ 1 000 Kč / tháng", "ETF chi phí thấp (TER < 0,3 %)", "Miễn thuế sau 3 năm"], stat: ["Hàng tháng", "5 000 Kč"] },
      { n: "03", title: "Giữ vững khi khủng hoảng", desc: "Thị trường giảm, ta không bán. Kế hoạch đã tính đến – và tôi luôn nghe máy.", checks: ["Tái cân bằng 1× / năm", "Không đoán thị trường", "Tư vấn viên trên điện thoại"], stat: ["Mô phỏng 20 năm", "3,0 M Kč"] },
    ],
    faq: [
      { q: "Tôi có thể mất bao nhiêu?", a: "Ngắn hạn danh mục có thể dao động hàng chục phần trăm. Vì thế chỉ đầu tư tiền có thời gian 5+ năm và giữ dự phòng." },
      { q: "Lợi nhuận có đảm bảo không?", a: "Không. Đây là mô phỏng. Lịch sử thị trường cổ phiếu tăng trung bình 7–9 %/năm, tương lai không ai biết." },
      { q: "Phí thế nào?", a: "Tôi ưu tiên ETF và quỹ chi phí thấp TER dưới 0,3 %. Bạn luôn thấy rõ mọi chi phí." },
      { q: "Rút được bất cứ lúc nào?", a: "Có, tiền về trong vài ngày. Giữ trên 3 năm thì lợi nhuận được miễn thuế tại Séc." },
    ],
    cta: { title: "Để tiền làm việc đều đặn", sub: "Đặt số tiền, danh mục và ngày. Phần còn lại tự chạy." },
  },
  partners: {
    intro: "Là đại lý độc lập, tôi so sánh đề xuất của hàng chục ngân hàng, công ty bảo hiểm và đầu tư. Khuyến nghị dựa trên số liệu của bạn, không phải hoa hồng.",
    bullets: ["Hơn 20 đối tác ở một nơi", "So sánh rõ ràng trên giấy", "Độc lập – không ưu tiên tổ chức nào"],
    steps: [
      { n: "01", title: "Yêu cầu theo số liệu của bạn", desc: "Kế hoạch trước, sản phẩm sau. Xác định chính xác nhu cầu rồi mới tìm giải pháp.", checks: ["Mục tiêu, số tiền, thời gian", "Yêu cầu linh hoạt", "Điều gì chưa phù hợp hôm nay"], stat: ["Đối tác", "20+"] },
      { n: "02", title: "So sánh thị trường", desc: "Liên hệ các tổ chức phù hợp và lập bảng: lãi suất, phí, điều kiện – cạnh nhau.", checks: ["Ngân hàng, bảo hiểm, đầu tư", "Tổng chi phí, không chỉ lãi suất", "Điều kiện chấm dứt và thay đổi"], stat: ["So sánh", "trong 48 h"] },
      { n: "03", title: "Ký kết và chăm sóc", desc: "Tôi lo giấy tờ và ở bên bạn sau ký – khi thay đổi, sự cố hay tái cấp vốn.", checks: ["Ký online hoặc trực tiếp", "Hỗ trợ khi có sự kiện bảo hiểm", "Kiểm tra hợp đồng hàng năm"], stat: ["Chăm sóc", "lâu dài"] },
    ],
    faq: [
      { q: "Ai trả tiền cho bạn?", a: "Tôi nhận thù lao từ tổ chức bạn ký hợp đồng. Bạn không trả thêm – và biết thù lao là bao nhiêu." },
      { q: "Bạn có chỉ đề xuất sản phẩm hoa hồng cao?", a: "Không. Khuyến nghị luôn dựa trên kế hoạch và so sánh. Tôi sẵn sàng chỉ cả phương án tôi không có thù lao." },
      { q: "Tôi tự chọn ngân hàng được không?", a: "Dĩ nhiên. So sánh là để phục vụ bạn – quyết định luôn là của bạn." },
      { q: "Bạn hợp tác với ai?", a: "Với hầu hết ngân hàng, công ty bảo hiểm và đầu tư tại Séc. Tôi sẽ gửi danh sách." },
    ],
    cta: { title: "Một tư vấn viên, cả thị trường", sub: "Tôi so sánh và giải thích khác biệt – bằng tiếng Việt và Séc." },
  },
  rules: {
    intro: "Bảy quy tắc tóm tắt điều cần làm ở từng độ tuổi: dự phòng, thoát nợ xấu, bảo hiểm đúng và rẻ, nhà riêng, quỹ cổ phiếu, đa dạng hóa và giảm rủi ro trước tự do tài chính.",
    bullets: ["Nhận thẻ trong buổi tư vấn đầu", "Mỗi quy tắc là một bước cụ thể trong kế hoạch", "Đã kiểm chứng với hàng trăm gia đình"],
    steps: [
      { n: "01", title: "30–40 tuổi: nền tảng", desc: "Dự phòng 6× chi tiêu thiết yếu, hết nợ xấu, bảo vệ đúng và khoản đầu tư định kỳ đầu tiên.", checks: ["Dự phòng 6 tháng", "Hết thẻ tín dụng và vay tiêu dùng", "Bảo hiểm nhân thọ rủi ro giảm dần"], stat: ["Quy tắc", "1–5"] },
      { n: "02", title: "40–50 tuổi: đa dạng hóa", desc: "Thêm quỹ trái phiếu và bất động sản bên cạnh cổ phiếu. Danh mục được phân bổ.", checks: ["Quỹ trái phiếu", "Bất động sản trong tài sản", "Kiểm tra tỷ lệ rủi ro"], stat: ["Quy tắc", "6"] },
      { n: "03", title: "50–60 tuổi: an toàn", desc: "Trước tự do tài chính, giảm dần tỷ lệ cổ phiếu để biến động không đe dọa kế hoạch.", checks: ["Giảm dần cổ phiếu", "Kế hoạch thu nhập hưu", "Bảo vệ tài sản cho gia đình"], stat: ["Quy tắc", "7"] },
    ],
    faq: [
      { q: "Quy tắc áp dụng cho mọi người?", a: "Đây là nguyên tắc, không phải giáo điều. Thứ tự và số tiền điều chỉnh theo hoàn cảnh của bạn." },
      { q: "Tôi lớn tuổi và bắt đầu từ đầu?", a: "Bắt đầu với dự phòng và bảo vệ, rút ngắn thời gian đầu tư và chọn danh mục thận trọng hơn." },
      { q: "Nhận thẻ không cần tư vấn được không?", a: "Tôi trao thẻ trực tiếp trong buổi đầu – kèm giải thích cách dùng." },
      { q: "Mất bao lâu để đi qua bảy quy tắc?", a: "Nền tảng (1–5) có thể thiết lập trong một năm. Phần còn lại là kỷ luật và thời gian." },
    ],
    cta: { title: "Bảy quy tắc, một kế hoạch", sub: "Xem bạn đang ở quy tắc nào – và bước tiếp theo là gì." },
  },
  mortgage: {
    intro: "Từ so sánh lãi suất, đặt kỳ cố định đến tái cấp vốn. Tính đến dòng tiền, dự phòng và kế hoạch gia đình – để khoản trả không bóp nghẹt phần còn lại.",
    bullets: ["So sánh ngân hàng cạnh nhau", "Khoản trả tối đa 35 % thu nhập ròng", "Hỗ trợ tái cấp vốn khi hết kỳ cố định"],
    steps: [
      { n: "01", title: "Bạn có thể vay bao nhiêu", desc: "Tính mức vay an toàn theo thu nhập, chi tiêu và dự phòng – không theo mức tối đa của ngân hàng.", checks: ["Khoản trả tối đa 35 % thu nhập", "Dự phòng 6 kỳ trả", "Còn chỗ cho đầu tư"], stat: ["Khoản trả an toàn", "24 100 Kč"] },
      { n: "02", title: "So sánh ngân hàng", desc: "Liên hệ ngân hàng và lập bảng lãi suất, phí, điều kiện. Đàm phán đề xuất tốt hơn.", checks: ["Lãi suất và RPSN", "Phí thẩm định và quản lý", "Điều kiện trả trước"], stat: ["Tiết kiệm", "đến 1 200 Kč / tháng"] },
      { n: "03", title: "Ký và chăm sóc", desc: "Lo thẩm định, hồ sơ và ký. Trước hết kỳ cố định tôi liên hệ với so sánh mới.", checks: ["Toàn bộ giấy tờ", "Bảo hiểm nhà", "Theo dõi kỳ cố định"], stat: ["Kỳ cố định", "tôi theo dõi"] },
    ],
    faq: [
      { q: "Cần bao nhiêu vốn tự có?", a: "Thường 10–20 % giá nhà. Càng nhiều, lãi suất càng tốt." },
      { q: "Kỳ cố định ngắn hay dài tốt hơn?", a: "Tùy diễn biến lãi suất và kế hoạch của bạn. Ta xem các kịch bản và chọn cùng nhau." },
      { q: "Trả sớm được không?", a: "Có, theo luật mỗi năm được trả trước 25 % miễn phí và toàn bộ khi hết kỳ cố định." },
      { q: "Có hỗ trợ tái cấp vốn?", a: "Có. Trước hết kỳ cố định tôi so sánh thị trường và chuyển khoản vay nếu có lợi." },
    ],
    cta: { title: "Nhà riêng không lo khoản trả", sub: "Tôi so sánh ngân hàng và đặt khoản trả vừa với kế hoạch." },
  },
  advisor: {
    intro: "Pan Čung System là bảy mô-đun kết nối từ thu nhập đến tự do tài chính. Một tư vấn viên, một kế hoạch – không sản phẩm mâu thuẫn từ nhiều người bán.",
    bullets: ["Thu nhập tự động chia cho dự phòng, đầu tư và bảo vệ", "Một tổng quan cho cả gia đình", "Cập nhật hàng năm miễn phí"],
    steps: [
      { n: "01", title: "Phân tích", desc: "Lập bản đồ thu, chi, tài sản, nợ và hợp đồng. Tất cả trên một trang.", checks: ["Tổng quan tài sản và nợ", "Kiểm tra hợp đồng hiện có", "Mục tiêu và thời gian"], stat: ["Mô-đun", "7"] },
      { n: "02", title: "Kế hoạch", desc: "Đề xuất phân bổ thu nhập, công cụ cho từng mục tiêu và lộ trình.", checks: ["Dự phòng → đầu tư → bảo vệ", "Công cụ cho mỗi mục tiêu", "Lộ trình 12 tháng"], stat: ["Kế hoạch", "trên 1 trang"] },
      { n: "03", title: "Thực hiện và chăm sóc", desc: "Ký hợp đồng, thiết lập lệnh và kiểm tra kế hoạch mỗi năm.", checks: ["Lệnh chuyển định kỳ", "Ký hợp đồng", "Rà soát hàng năm"], stat: ["Chăm sóc", "dài hạn"] },
    ],
    faq: [
      { q: "Tôi đã có hợp đồng nơi khác?", a: "Ta xem lại. Cái hợp lý giữ lại. Cái không thì đổi hoặc hủy." },
      { q: "Phải làm mọi thứ cùng lúc?", a: "Không. Kế hoạch có thứ tự – bắt đầu dự phòng và bảo vệ, đầu tư thêm dần." },
      { q: "Gặp nhau bao lâu một lần?", a: "Kế hoạch đầu trong hai buổi, sau đó rà soát hàng năm. Giữa đó tôi luôn trên điện thoại hoặc Zalo." },
      { q: "Tư vấn giá bao nhiêu?", a: "Cuộc gọi đầu miễn phí. Tôi nhận thù lao từ tổ chức bạn ký hợp đồng." },
    ],
    cta: { title: "Tất cả ở một nơi", sub: "Một kế hoạch kết nối dự phòng, đầu tư và bảo vệ." },
  },
  protect: {
    intro: "Quy tắc vàng số 3: bảo hiểm đúng và rẻ. Thiết lập bảo vệ thu nhập với số tiền bảo hiểm giảm dần, thương tật và tài sản – hủy những gì không cần.",
    bullets: ["Bảo hiểm nhân thọ rủi ro không kèm tích lũy", "Ưu tiên thương tật và bệnh nặng", "Hủy hợp đồng dư thừa và đắt đỏ"],
    steps: [
      { n: "01", title: "Thật sự cần bảo vệ gì", desc: "Mất thu nhập, thương tật, mất người trụ cột, thiệt hại tài sản. Rủi ro khác dự phòng lo được.", checks: ["Bảo vệ thu nhập", "Thương tật cấp 2 và 3", "Trách nhiệm và tài sản"], stat: ["Ưu tiên", "4"] },
      { n: "02", title: "Số tiền và giá đúng", desc: "Số tiền bảo hiểm tính từ nợ và thu nhập. Giảm dần = giá rẻ hơn.", checks: ["Theo khoản vay và thu nhập", "Số tiền bảo hiểm giảm dần", "So sánh 8+ công ty"], stat: ["Gia đình", "từ 1 450 Kč / tháng"] },
      { n: "03", title: "Hỗ trợ khi có sự kiện", desc: "Khi xảy ra chuyện, tôi lo khai báo và liên hệ công ty bảo hiểm thay bạn.", checks: ["Khai báo sự kiện", "Liên hệ công ty bảo hiểm", "Kiểm tra phạm vi hàng năm"], stat: ["Hỗ trợ", "24 h"] },
    ],
    faq: [
      { q: "Tôi có bảo hiểm nhân thọ đầu tư. Tốt không?", a: "Thường là không. Phần tích lũy đắt. Bảo vệ và đầu tư nên tách riêng – rẻ và minh bạch hơn." },
      { q: "Bảo hiểm nên tốn bao nhiêu?", a: "Cho gia đình thường 1–3 % thu nhập. Tùy nợ, tuổi và sức khỏe." },
      { q: "Vì sao số tiền bảo hiểm giảm dần?", a: "Vì mỗi kỳ trả vay, nợ giảm. Bạn chỉ trả cho điều thật sự cần." },
      { q: "Bảo hiểm tai nạn thì sao?", a: "Tai nạn chỉ là phần nhỏ rủi ro. Ưu tiên thương tật do mọi nguyên nhân." },
    ],
    cta: { title: "Chỉ đủ bảo hiểm cần thiết", sub: "Tôi kiểm tra hợp đồng của bạn và đề xuất bảo vệ tốt hơn, rẻ hơn." },
  },
  consult: {
    intro: "Cuộc gọi 15 phút đầu miễn phí. Buổi tư vấn tiếp theo 60–90 phút – trực tiếp tại Praha, online hoặc qua Zalo – bạn ra về với kế hoạch trên giấy.",
    bullets: ["Tiếng Việt, Séc, Anh", "Trực tiếp tại Praha hoặc online", "Kế hoạch trên giấy ngay sau buổi gặp"],
    steps: [
      { n: "01", title: "Cuộc gọi đầu (15 phút)", desc: "Xem bạn đang cần gì và hẹn lịch. Không ràng buộc.", checks: ["Điện thoại, Zalo hoặc WhatsApp", "Miễn phí", "Lịch trong tuần"], stat: ["Miễn phí", "15 phút"] },
      { n: "02", title: "Tư vấn (60–90 phút)", desc: "Xem số liệu, mục tiêu và hợp đồng. Đề xuất kế hoạch và bước tiếp theo.", checks: ["Trực tiếp tại Praha / online", "Phân tích + đề xuất", "Kế hoạch trên giấy"], stat: ["Buổi gặp", "60–90 phút"] },
      { n: "03", title: "Thực hiện và rà soát hàng năm", desc: "Ký những gì đã thống nhất và kiểm tra kế hoạch mỗi năm.", checks: ["Ký hợp đồng", "Thiết lập lệnh", "Rà soát hàng năm miễn phí"], stat: ["Rà soát", "1× / năm"] },
    ],
    faq: [
      { q: "Gặp ở đâu?", a: "Tại Praha trực tiếp (Sapa và trung tâm), hoặc online qua Google Meet, Zoom hay Zalo." },
      { q: "Đi cùng vợ/chồng được không?", a: "Rất nên – tài chính gia đình giải quyết cùng nhau. Tốt nhất cả hai cùng đến." },
      { q: "Cần chuẩn bị gì?", a: "Thu chi ước lượng, hợp đồng hiện có và hình dung về mục tiêu. Phần còn lại ta bổ sung." },
      { q: "Giá bao nhiêu?", a: "Tư vấn và rà soát hàng năm miễn phí. Tôi nhận thù lao từ tổ chức bạn ký hợp đồng." },
    ],
    cta: { title: "Hẹn cuộc gọi đầu tiên", sub: "15 phút miễn phí – xem chúng ta có hợp không." },
  },
  reserve: {
    intro: "Dự phòng vẫn rút được ngày hôm sau nhưng sinh lời trên tài khoản tiết kiệm hoặc quỹ bảo toàn. Không rủi ro, không kỳ hạn.",
    bullets: ["Tiền có sẵn trong 24 giờ", "Có lãi thay vì 0 trên tài khoản thường", "Tài khoản riêng – không tiêu nhầm"],
    steps: [
      { n: "01", title: "Mức dự phòng đúng", desc: "3–6 tháng chi tiêu thiết yếu. Doanh nhân và gia đình một thu nhập nên nhiều hơn.", checks: ["3–6 tháng chi tiêu", "Nhiều hơn cho tự doanh", "Dự phòng ngắn vs. dài hạn"], stat: ["Mục tiêu", "6 tháng"] },
      { n: "02", title: "Giữ ở đâu", desc: "Tài khoản tiết kiệm lãi thưởng hoặc quỹ thị trường tiền tệ bảo toàn. Tôi so sánh.", checks: ["Tài khoản tiết kiệm ngân hàng", "Quỹ thị trường tiền tệ", "Không kỳ hạn"], stat: ["Lãi", "~4 % / năm"] },
      { n: "03", title: "Tự động bổ sung", desc: "Sau mỗi lần dùng, bổ sung bằng lệnh định kỳ. Không cần nghĩ.", checks: ["Lệnh định kỳ", "Quy tắc sử dụng", "Kiểm tra 1× / năm"], stat: ["Thêm", "+1 400 Kč / tháng"] },
    ],
    faq: [
      { q: "Đầu tư dự phòng không tốt hơn?", a: "Không. Dự phòng phải luôn sẵn và không biến động. Chỉ đầu tư phần vượt dự phòng." },
      { q: "Tài khoản tiết kiệm nào tốt nhất?", a: "Tài khoản có lãi thực cao nhất không điều kiện rườm rà. Đề xuất thay đổi, tôi so sánh hiện tại." },
      { q: "Tôi chưa có dự phòng?", a: "Ta bắt đầu từ đó. Đây là bước đầu của kế hoạch – trước đầu tư và bảo hiểm." },
      { q: "Lãi có bị thuế?", a: "Có, ngân hàng tự khấu trừ 15 %. Bạn không phải khai." },
    ],
    cta: { title: "Để dự phòng sinh lời", sub: "Tôi chọn tài khoản hoặc quỹ để tiền làm việc mà vẫn sẵn có." },
  },
  goals: {
    intro: "Mỗi mục tiêu có thời gian, số tiền và công cụ riêng – dự phòng trên tài khoản tiết kiệm, nhà ở trong quỹ, hưu trí trong danh mục dài hạn.",
    bullets: ["Mục tiêu riêng, công cụ riêng", "Khoản định kỳ theo ưu tiên", "Tiến độ trên một trang"],
    steps: [
      { n: "01", title: "Đặt tên mục tiêu", desc: "Dự phòng, nhà ở, con cái, hưu trí. Mỗi mục tiêu có số tiền và năm.", checks: ["Ưu tiên mục tiêu", "Số tiền mục tiêu", "Thời hạn"], stat: ["Mục tiêu", "3–5"] },
      { n: "02", title: "Gán công cụ", desc: "Mục tiêu ngắn thận trọng, dài năng động. Mỗi mục tiêu một tài khoản.", checks: ["Đến 3 năm: tiết kiệm", "3–10 năm: quỹ hỗn hợp", "10+ năm: ETF cổ phiếu"], stat: ["Công cụ", "theo thời gian"] },
      { n: "03", title: "Theo dõi tiến độ", desc: "Mỗi năm xem từng mục tiêu tiến thế nào và điều chỉnh số tiền.", checks: ["Tổng quan hàng năm", "Điều chỉnh số tiền", "Ăn mừng mục tiêu đạt"], stat: ["Đã đạt", "72 %"] },
    ],
    faq: [
      { q: "Có thể nhiều mục tiêu cùng lúc?", a: "Có, nhưng theo ưu tiên. Dự phòng luôn trước, rồi bảo vệ, rồi mục tiêu dài hạn." },
      { q: "Mục tiêu thay đổi thì sao?", a: "Kế hoạch là sống. Ta chuyển số tiền hoặc đổi công cụ." },
      { q: "Theo dõi tiến độ thế nào?", a: "Trong rà soát hàng năm bạn nhận tổng quan một trang. Giữa đó xem số dư tài khoản." },
      { q: "Bao nhiêu cho mỗi mục tiêu?", a: "Theo ưu tiên và thời hạn. Ta tính cùng nhau – công cụ tính có trên web." },
    ],
    cta: { title: "Nhiều mục tiêu, một kế hoạch", sub: "Chia tiền để mỗi mục tiêu có con đường riêng." },
  },
};

const bentoDetails = { cs, vi };
export default bentoDetails;
