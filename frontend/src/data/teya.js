// Teya-style homepage sections – content for Pan Čung (merged over cs/vi + finance in LanguageContext)

const cs = {
  heroT: {
    script: ["Finance,", "jednoduše."],
    subtitle: "Jsem Čung – finanční poradce vietnamských rodin a podnikatelů v Česku. Plán, investice, hypotéka i ochrana. Vietnamsky i česky, bez tlaku na produkty.",
    primary: "Domluvit konzultaci",
    overlay: "Jeden poradce. Jeden plán. Peníze pod kontrolou.",
  },
  cardIntro: {
    left: "Zlatá pravidla",
    right: "finanční svobody.",
    card: {
      title: ["ZLATÁ PRAVIDLA", "FINANČNÍ SVOBODY"],
      groups: [
        { age: "30–40 let", rules: [
          { n: "1.", t: "Vytvořte si rezervu (6× nutné výdaje)" },
          { n: "2.", t: "Zbavte se špatných dluhů (kreditky a spotřebitelské úvěry)" },
          { n: "3.", t: "Dobře a levně se pojistěte", sub: ["Rizikové životní pojištění (s klesající pojistnou částkou)", "Pojištění invalidity, nemocí i úrazem", "Pojištění majetku a odpovědnosti"] },
          { n: "4.", t: "Kupte nemovitost, když je hypotéka levnější než nájem" },
          { n: "5.", t: "Investujte do akciových fondů" },
        ] },
        { age: "40–50 let", rules: [{ n: "6.", t: "Nezapomínejte na dluhopisové fondy a nemovitosti – diverzifikujte" }] },
        { age: "50–60 let", rules: [{ n: "7.", t: "Před finanční nezávislostí redukujte akciové fondy", hl: "finanční" }] },
      ],
      footer: "Pan Čung · finanční poradce",
    },
  },
  gold: {
    title: ["Plán na papíře,", "srozumitelně.", "Ne produkty, ale řešení."],
    label: "Odcházíte s plánem v ruce",
    desc: "Na konzultaci projdeme příjmy, výdaje, rezervu, investice i ochranu. Odcházíte s plánem na papíře, kterému rozumíte – a který s vámi každý rok aktualizuji.",
    cta: "Jak pracuji",
    bullets: [
      { icon: "Wallet", text: "Rezerva na 3–6 měsíců do jednoho roku" },
      { icon: "TrendingUp", text: "Pravidelná investice podle vašeho horizontu" },
      { icon: "ShieldCheck", text: "Jen tolik pojištění, kolik dává smysl" },
    ],
    sheet: { title: "FINANČNÍ PLÁN", client: "Rodina Nguyễn", date: "červen 2026", goalsLabel: "Cíle", rows: [["Rezerva", "420 000 Kč", 100], ["Bydlení", "1 240 000 Kč", 72], ["Nezávislost", "3 160 000 Kč", 38]], monthlyLabel: "Měsíčně", monthly: [["Rezerva", "5 000 Kč"], ["Investice", "8 000 Kč"], ["Ochrana", "1 450 Kč"]], signed: "Sestavil", stamp: "PORADCE" },
  },
  bento: {
    expand: "Zobrazit více",
    cta: "Domluvit konzultaci",
    close: "Zavřít",
    cashflow: { label: "CASHFLOW", title: "Přehled o penězích za pár sekund", desc: "Vidíte, co přichází, co odchází a kolik zbývá na cíle.", more: "Na první konzultaci sestavíme přehled příjmů a výdajů. Zjistíte, kolik reálně můžete odkládat, a nastavíme pravidla, která fungují bez tabulek.", rows: [["Výplata", "+62 000 Kč", "Dnes · 8:04", "in"], ["Nájem", "−18 500 Kč", "Dnes · 8:10", "out"], ["Investice ETF", "−8 000 Kč", "Dnes · 9:00", "inv"], ["Rezerva", "−5 000 Kč", "Dnes · 9:00", "inv"], ["Potraviny", "−2 340 Kč", "Včera · 17:22", "out"], ["Pojištění", "−1 450 Kč", "Včera · 6:00", "out"], ["Faktura klient", "+24 000 Kč", "Včera · 12:40", "in"]] },
    invest: { label: "INVESTICE", title: "Investujte pravidelně, bez emocí", desc: "Částku a horizont nastavíme společně. Zbytek běží automaticky – a já hlídám, aby plán držel.", more: "Pravidelné investování do diverzifikovaného portfolia (ETF, fondy) podle vašeho horizontu a rizikového profilu. Bez časování trhu, s disciplínou a s poradcem, který je s vámi i v krizi.", chat: [["you", "Kolik mám investovat, abych měl za 20 let na důchod?"], ["pc", "Začneme s 5 000 Kč měsíčně do globálního ETF. Zbytek jde do rezervy."], ["you", "A když přijde krize?"], ["pc", "Plán s ní počítá. Nic neprodáváme – pokračujeme dál."]], typing: "Pan Čung píše…" },
    rules: { label: "ZLATÁ PRAVIDLA", title: "Sedm pravidel, jeden plán", desc: "Pravidla, kterými se řídí každý plán, který sestavím – od první rezervy až po finanční nezávislost. Kartu dostanete na první konzultaci.", more: "Zlatá pravidla finanční svobody shrnují, co má smysl řešit v jakém věku: rezerva, zbavení se špatných dluhů, levná a správná ochrana, vlastní bydlení, akciové fondy, diverzifikace a postupné snižování rizika před finanční nezávislostí." },
    partners: { label: "PARTNEŘI", title: "Vybírám z celého trhu", desc: "Banky, pojišťovny i investiční společnosti. Ne jednu – všechny, které dávají smysl.", more: "Jako nezávislý zprostředkovatel porovnávám nabídky desítek institucí. Doporučení stavím na vašich číslech, ne na provizi." },
    goals: { label: "CÍLE", title: "Více cílů, jeden plán", desc: "Rozdělte peníze do cílů, nastavte pravidelné částky a sledujte pokrok.", more: "Každý cíl má vlastní horizont, částku a nástroj – rezerva na spořicím účtu, bydlení ve stavebním spoření či fondu, důchod v dlouhodobém portfoliu.", cards: [{ n: "Rezerva", year: "do 2026", icon: "PiggyBank", v: 120000, max: 180000 }, { n: "Bydlení", year: "do 2028", icon: "Home", v: 850000, max: 1200000 }, { n: "Důchod", year: "do 2050", icon: "Sunset", v: 1240000, max: 8000000 }], popup: { title: "Pravidelná investice", sub: "Dnes · 16:07", amount: "−5 000 Kč" }, tag: "+320 Kč výnos" },
    mortgage: { label: "HYPOTÉKA", title: "Financování bez stresu", desc: "Porovnám nabídky bank a nastavím splátku, která vás nezadusí.", more: "Od porovnání sazeb přes nastavení fixace až po refinancování. Zohledníme cashflow, rezervu i budoucí plány rodiny.", head: ["Banka", "Sazba", "Splátka"], best: "Nejvýhodnější", rows: [["Banka A", "4,79 %", "24 118 Kč"], ["Banka B", "4,89 %", "24 402 Kč"], ["Banka C", "5,09 %", "24 976 Kč"], ["Banka D", "5,29 %", "25 556 Kč"]] },
    advisor: { label: "PORADCE", title: "Vše na jednom místě", desc: "Příjem rozdělíme mezi rezervu, investice a ochranu – automaticky.", more: "Metodika Pan Čung System: sedm propojených modulů od příjmu po finanční svobodu. Jeden poradce, jeden plán, žádné protichůdné produkty.", top: "Příjem", topValue: "62 000 Kč", nodes: ["Rezerva", "Investice", "Ochrana"], chip: "5 000 Kč" },
    protect: { label: "OCHRANA", title: "Jen tolik pojištění, kolik dává smysl", desc: "Rizikové životní, invalidita, majetek. Bez zbytečných produktů a přeplácení.", more: "Zlaté pravidlo č. 3: dobře a levně se pojistit. Nastavíme ochranu příjmu s klesající pojistnou částkou, invaliditu i majetek – a zrušíme, co je zbytečné.", items: [["Rizikové životní pojištění", "590 Kč"], ["Invalidita a nemoc", "620 Kč"], ["Majetek a odpovědnost", "240 Kč"]], total: "Celkem měsíčně", totalValue: 1450, badge: "Rodina chráněna" },
    consult: { label: "KONZULTACE", title: "Plán a přehled na jedné schůzce", desc: "Osobně v Praze, online nebo přes Zalo. Vietnamsky, česky, anglicky.", more: "Úvodní 15minutový hovor je zdarma. Následná konzultace trvá 60–90 minut a odcházíte s plánem na papíře.", slot: "Út 14:00 · 15 min zdarma", free: "Volný termín", booked: "Rezervováno", modes: ["Praha", "Online", "Zalo"] },
    reserve: { label: "REZERVA", badge: "Nové", title: "Nechte rezervu vydělávat", desc: "Peníze na horší časy nemusí ležet bez úroku.", more: "Rezerva zůstává dostupná do druhého dne, ale pracuje na spořicím účtu či v konzervativním fondu. Bez rizika, bez výpovědní lhůty.", amountLabel: "Rezerva", amount: "420 000 Kč", perMonth: "měsíčně navíc", value: 1400 },
  },
  appF: {
    phone: { name: "Pan Čung", status: "online · odpovídá do 24 h", msg: "Dobrý den! Napište mi, co právě řešíte – hypotéku, investice nebo pojištění. Ozvu se do 24 hodin.", input: "Napište zprávu…" },
    title: "Poradce, který je na dosah",
    pills: ["Rezervovat hovor", "Napsat zprávu"],
    cards: [
      { title: "Mluvíme vaší řečí", desc: "Vietnamsky, česky i anglicky – i smlouvy vám vysvětlím tak, abyste jim rozuměli.", greetings: [["Xin chào", "VI"], ["Dobrý den", "CS"], ["Hello", "EN"]] },
      { title: "Zapojte celou rodinu", desc: "Partner, děti, rodiče – každý vidí, co má vidět.", mockTitle: "Rodina Nguyễn", people: "4 lidé v plánu", avatars: ["HN", "LN", "MT", "AN"], cursorName: "Linh" },
      { title: "Konzultace, jak vám vyhovuje", desc: "Osobně v Praze nebo online odkudkoliv.", modes: ["Osobně", "Online"] },
    ],
  },
  reviews: { title: ["Nevěřte mým slovům.", "Věřte klientům."], since: "Klient od" },
  jakPracuji: { label: "JAK PRACUJI", title: "Systém,", accent: "ne produkty.", subtitle: "Metodika, kalkulačky a přehled, díky kterým vaše peníze dávají smysl. Od první rezervy po finanční svobodu." },
};

const vi = {
  heroT: {
    script: ["Tài chính,", "thật đơn giản."],
    subtitle: "Tôi là Čung – tư vấn tài chính cho các gia đình và doanh nhân Việt tại Séc. Kế hoạch, đầu tư, vay mua nhà và bảo vệ. Tiếng Việt và tiếng Séc, không ép sản phẩm.",
    primary: "Đặt lịch tư vấn",
    overlay: "Một tư vấn viên. Một kế hoạch. Tiền trong tầm kiểm soát.",
  },
  cardIntro: {
    left: "Quy tắc vàng",
    right: "của tự do tài chính.",
    card: {
      title: ["QUY TẮC VÀNG", "TỰ DO TÀI CHÍNH"],
      groups: [
        { age: "30–40 tuổi", rules: [
          { n: "1.", t: "Lập quỹ dự phòng (6× chi tiêu thiết yếu)" },
          { n: "2.", t: "Thoát nợ xấu (thẻ tín dụng và vay tiêu dùng)" },
          { n: "3.", t: "Bảo hiểm đúng và rẻ", sub: ["Bảo hiểm nhân thọ rủi ro (số tiền bảo hiểm giảm dần)", "Bảo hiểm thương tật, bệnh tật và tai nạn", "Bảo hiểm tài sản và trách nhiệm"] },
          { n: "4.", t: "Mua nhà khi trả vay rẻ hơn tiền thuê" },
          { n: "5.", t: "Đầu tư vào quỹ cổ phiếu" },
        ] },
        { age: "40–50 tuổi", rules: [{ n: "6.", t: "Đừng quên quỹ trái phiếu và bất động sản – đa dạng hóa" }] },
        { age: "50–60 tuổi", rules: [{ n: "7.", t: "Trước khi độc lập tài chính, giảm dần quỹ cổ phiếu", hl: "tài chính" }] },
      ],
      footer: "Pan Čung · tư vấn tài chính",
    },
  },
  gold: {
    title: ["Kế hoạch trên giấy,", "dễ hiểu.", "Không phải sản phẩm, mà là giải pháp."],
    label: "Bạn ra về với kế hoạch trong tay",
    desc: "Trong buổi tư vấn chúng ta xem thu, chi, dự phòng, đầu tư và bảo vệ. Bạn ra về với kế hoạch trên giấy mà bạn hiểu – và tôi cập nhật cùng bạn mỗi năm.",
    cta: "Cách tôi làm việc",
    bullets: [
      { icon: "Wallet", text: "Quỹ dự phòng 3–6 tháng trong vòng một năm" },
      { icon: "TrendingUp", text: "Đầu tư định kỳ theo thời gian của bạn" },
      { icon: "ShieldCheck", text: "Chỉ đủ bảo hiểm cần thiết" },
    ],
    sheet: { title: "KẾ HOẠCH TÀI CHÍNH", client: "Gia đình Nguyễn", date: "tháng 6 2026", goalsLabel: "Mục tiêu", rows: [["Dự phòng", "420 000 Kč", 100], ["Nhà ở", "1 240 000 Kč", 72], ["Tự do", "3 160 000 Kč", 38]], monthlyLabel: "Hàng tháng", monthly: [["Dự phòng", "5 000 Kč"], ["Đầu tư", "8 000 Kč"], ["Bảo vệ", "1 450 Kč"]], signed: "Lập bởi", stamp: "TƯ VẤN" },
  },
  bento: {
    expand: "Xem thêm",
    cta: "Đặt lịch tư vấn",
    close: "Đóng",
    cashflow: { label: "DÒNG TIỀN", title: "Nắm tiền của bạn trong vài giây", desc: "Thấy rõ tiền vào, tiền ra và còn bao nhiêu cho mục tiêu.", more: "Buổi tư vấn đầu chúng ta lập tổng quan thu chi. Bạn biết thực sự có thể để dành bao nhiêu và đặt ra quy tắc hiệu quả không cần bảng tính.", rows: [["Lương", "+62 000 Kč", "Hôm nay · 8:04", "in"], ["Tiền nhà", "−18 500 Kč", "Hôm nay · 8:10", "out"], ["Đầu tư ETF", "−8 000 Kč", "Hôm nay · 9:00", "inv"], ["Dự phòng", "−5 000 Kč", "Hôm nay · 9:00", "inv"], ["Thực phẩm", "−2 340 Kč", "Hôm qua · 17:22", "out"], ["Bảo hiểm", "−1 450 Kč", "Hôm qua · 6:00", "out"], ["Hóa đơn khách", "+24 000 Kč", "Hôm qua · 12:40", "in"]] },
    invest: { label: "ĐẦU TƯ", title: "Đầu tư định kỳ, không cảm tính", desc: "Số tiền và thời gian ta cùng đặt. Phần còn lại chạy tự động – tôi theo dõi để kế hoạch bền vững.", more: "Đầu tư định kỳ vào danh mục đa dạng (ETF, quỹ) theo thời gian và mức chấp nhận rủi ro của bạn. Không đoán thị trường, có kỷ luật, có tư vấn viên bên bạn cả khi khủng hoảng.", chat: [["you", "Tôi nên đầu tư bao nhiêu để 20 năm nữa có tiền hưu?"], ["pc", "Bắt đầu với 5 000 Kč mỗi tháng vào ETF toàn cầu. Phần còn lại vào dự phòng."], ["you", "Nếu khủng hoảng thì sao?"], ["pc", "Kế hoạch đã tính đến. Không bán gì – tiếp tục đi."]], typing: "Pan Čung đang nhập…" },
    rules: { label: "QUY TẮC VÀNG", title: "Bảy quy tắc, một kế hoạch", desc: "Những quy tắc dẫn dắt mọi kế hoạch tôi lập – từ quỹ dự phòng đầu tiên đến tự do tài chính. Bạn nhận thẻ này trong buổi tư vấn đầu.", more: "Quy tắc vàng của tự do tài chính tóm tắt điều cần làm ở từng độ tuổi: dự phòng, thoát nợ xấu, bảo hiểm đúng và rẻ, nhà riêng, quỹ cổ phiếu, đa dạng hóa và giảm dần rủi ro trước khi độc lập tài chính." },
    partners: { label: "ĐỐI TÁC", title: "Tôi chọn từ cả thị trường", desc: "Ngân hàng, công ty bảo hiểm và đầu tư. Không phải một – mà tất cả những nơi hợp lý.", more: "Là đại lý độc lập, tôi so sánh đề xuất của hàng chục tổ chức. Khuyến nghị dựa trên số liệu của bạn, không phải hoa hồng." },
    goals: { label: "MỤC TIÊU", title: "Nhiều mục tiêu, một kế hoạch", desc: "Chia tiền theo mục tiêu, đặt khoản định kỳ và theo dõi tiến độ.", more: "Mỗi mục tiêu có thời gian, số tiền và công cụ riêng – dự phòng trên tài khoản tiết kiệm, nhà ở trong quỹ, hưu trí trong danh mục dài hạn.", cards: [{ n: "Dự phòng", year: "đến 2026", icon: "PiggyBank", v: 120000, max: 180000 }, { n: "Nhà ở", year: "đến 2028", icon: "Home", v: 850000, max: 1200000 }, { n: "Hưu trí", year: "đến 2050", icon: "Sunset", v: 1240000, max: 8000000 }], popup: { title: "Đầu tư định kỳ", sub: "Hôm nay · 16:07", amount: "−5 000 Kč" }, tag: "+320 Kč lợi nhuận" },
    mortgage: { label: "VAY MUA NHÀ", title: "Tài trợ không căng thẳng", desc: "Tôi so sánh ngân hàng và đặt khoản trả phù hợp với bạn.", more: "Từ so sánh lãi suất, đặt kỳ cố định đến tái cấp vốn. Tính đến dòng tiền, dự phòng và kế hoạch gia đình.", head: ["Ngân hàng", "Lãi suất", "Khoản trả"], best: "Tốt nhất", rows: [["Ngân hàng A", "4,79 %", "24 118 Kč"], ["Ngân hàng B", "4,89 %", "24 402 Kč"], ["Ngân hàng C", "5,09 %", "24 976 Kč"], ["Ngân hàng D", "5,29 %", "25 556 Kč"]] },
    advisor: { label: "TƯ VẤN", title: "Tất cả ở một nơi", desc: "Thu nhập được chia cho dự phòng, đầu tư và bảo vệ – tự động.", more: "Phương pháp Pan Čung System: bảy mô-đun kết nối từ thu nhập đến tự do tài chính. Một tư vấn viên, một kế hoạch, không sản phẩm mâu thuẫn.", top: "Thu nhập", topValue: "62 000 Kč", nodes: ["Dự phòng", "Đầu tư", "Bảo vệ"], chip: "5 000 Kč" },
    protect: { label: "BẢO VỆ", title: "Chỉ đủ bảo hiểm cần thiết", desc: "Nhân thọ rủi ro, thương tật, tài sản. Không sản phẩm dư thừa, không trả thừa.", more: "Quy tắc vàng số 3: bảo hiểm đúng và rẻ. Thiết lập bảo vệ thu nhập với số tiền bảo hiểm giảm dần, thương tật và tài sản – và hủy những gì không cần.", items: [["Bảo hiểm nhân thọ rủi ro", "590 Kč"], ["Thương tật và bệnh tật", "620 Kč"], ["Tài sản và trách nhiệm", "240 Kč"]], total: "Tổng mỗi tháng", totalValue: 1450, badge: "Gia đình được bảo vệ" },
    consult: { label: "TƯ VẤN", title: "Kế hoạch và tổng quan trong một buổi", desc: "Trực tiếp tại Praha, online hoặc qua Zalo. Tiếng Việt, Séc, Anh.", more: "Cuộc gọi 15 phút đầu miễn phí. Buổi tư vấn tiếp theo 60–90 phút và bạn ra về với kế hoạch trên giấy.", slot: "Thứ 3 14:00 · 15 phút miễn phí", free: "Còn trống", booked: "Đã đặt", modes: ["Praha", "Online", "Zalo"] },
    reserve: { label: "DỰ PHÒNG", badge: "Mới", title: "Để quỹ dự phòng sinh lời", desc: "Tiền phòng thân không cần nằm im không lãi.", more: "Dự phòng vẫn rút được ngày hôm sau nhưng sinh lời trên tài khoản tiết kiệm hoặc quỹ bảo toàn. Không rủi ro, không kỳ hạn.", amountLabel: "Dự phòng", amount: "420 000 Kč", perMonth: "mỗi tháng thêm", value: 1400 },
  },
  appF: {
    phone: { name: "Pan Čung", status: "online · trả lời trong 24 h", msg: "Xin chào! Hãy nhắn cho tôi điều bạn đang cần – vay mua nhà, đầu tư hay bảo hiểm. Tôi sẽ trả lời trong 24 giờ.", input: "Nhập tin nhắn…" },
    title: "Tư vấn viên luôn trong tầm tay",
    pills: ["Đặt lịch gọi", "Gửi tin nhắn"],
    cards: [
      { title: "Nói ngôn ngữ của bạn", desc: "Tiếng Việt, Séc và Anh – tôi giải thích cả hợp đồng để bạn thật sự hiểu.", greetings: [["Xin chào", "VI"], ["Dobrý den", "CS"], ["Hello", "EN"]] },
      { title: "Cả gia đình cùng tham gia", desc: "Vợ chồng, con, cha mẹ – mỗi người thấy điều cần thấy.", mockTitle: "Gia đình Nguyễn", people: "4 người trong kế hoạch", avatars: ["HN", "LN", "MT", "AN"], cursorName: "Linh" },
      { title: "Tư vấn theo cách bạn muốn", desc: "Trực tiếp tại Praha hoặc online từ bất cứ đâu.", modes: ["Trực tiếp", "Online"] },
    ],
  },
  reviews: { title: ["Đừng tin lời tôi.", "Hãy tin khách hàng."], since: "Khách hàng từ" },
  jakPracuji: { label: "CÁCH TÔI LÀM VIỆC", title: "Hệ thống,", accent: "không phải sản phẩm.", subtitle: "Phương pháp, công cụ tính và tổng quan giúp tiền của bạn có ý nghĩa. Từ quỹ dự phòng đầu tiên đến tự do tài chính." },
};

const teya = { cs, vi };
export default teya;
