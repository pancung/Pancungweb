// Teya-style homepage sections – content for Pan Čung (merged over cs/vi + finance in LanguageContext)

const cs = {
  heroT: {
    script: ["Finance,", "jednoduše."],
    subtitle: "Finanční plán, investice, hypotéka a ochrana rodiny – vše na jednom místě. Vietnamsky i česky.",
    primary: "Domluvit konzultaci",
    overlay: "Jedno místo, kde máte peníze pod kontrolou",
  },
  cardIntro: {
    left: "Seznamte se s plánem",
    right: "pro váš život.",
    card: { brand: "Pan Čung", label: "FINANČNÍ PLÁN", name: "RODINA NGUYỄN", since: "KLIENT OD 2026", tier: "Premium" },
  },
  gold: {
    title: ["Peníze pod kontrolou", "rychle.", "Plán, který drží."],
    label: "Seznamte se s finančním plánem",
    desc: "Jeden přehled o příjmech, výdajích, rezervě, investicích a ochraně. Aktualizovaný při každé konzultaci – v mobilu i na papíře.",
    cta: "Jak pracuji",
    bullets: [
      { icon: "Wallet", text: "Rezerva na 3–6 měsíců do jednoho roku" },
      { icon: "TrendingUp", text: "Pravidelná investice podle vašeho horizontu" },
      { icon: "ShieldCheck", text: "Jen tolik pojištění, kolik dává smysl" },
    ],
    phone: { title: "Finanční plán", netWorth: "Čisté jmění", value: "4 820 000 Kč", delta: "+8,2 % za rok", rows: [["Rezerva", "420 000 Kč", 100], ["Bydlení", "1 240 000 Kč", 72], ["Nezávislost", "3 160 000 Kč", 38]], btn: "Přidat investici" },
  },
  bento: {
    expand: "Zobrazit více",
    cta: "Domluvit konzultaci",
    close: "Zavřít",
    cashflow: { label: "CASHFLOW", title: "Přehled o penězích za pár sekund", desc: "Vidíte, co přichází, co odchází a kolik zbývá na cíle.", more: "Na první konzultaci sestavíme přehled příjmů a výdajů. Zjistíte, kolik reálně můžete odkládat, a nastavíme pravidla, která fungují bez tabulek.", rows: [["Výplata", "+62 000 Kč", "Dnes · 8:04", "in"], ["Nájem", "−18 500 Kč", "Dnes · 8:10", "out"], ["Investice ETF", "−8 000 Kč", "Dnes · 9:00", "inv"], ["Rezerva", "−5 000 Kč", "Dnes · 9:00", "inv"], ["Potraviny", "−2 340 Kč", "Včera · 17:22", "out"], ["Pojištění", "−1 450 Kč", "Včera · 6:00", "out"], ["Faktura klient", "+24 000 Kč", "Včera · 12:40", "in"]] },
    invest: { label: "INVESTICE", title: "Investujte pravidelně, bez emocí", desc: "Nastavíme částku, portfolio a datum. Zbytek běží automaticky.", more: "Pravidelné investování do diverzifikovaného portfolia (ETF, fondy) podle vašeho horizontu a rizikového profilu. Bez časování trhu, s disciplínou.", form: { title: "Pravidelná investice", amount: "Částka", amountValue: "5 000 Kč", fund: "Portfolio", fundValue: "Globální ETF · 80/20", day: "Den", dayValue: "15. každý měsíc", btn: "Potvrdit investici", done: "Investice nastavena", powered: "Nastavil" } },
    partners: { label: "PARTNEŘI", title: "Vybírám z celého trhu", desc: "Banky, pojišťovny i investiční společnosti. Ne jednu – všechny, které dávají smysl.", more: "Jako nezávislý zprostředkovatel porovnávám nabídky desítek institucí. Doporučení stavím na vašich číslech, ne na provizi." },
    goals: { label: "CÍLE", title: "Více cílů, jeden plán", desc: "Rozdělte peníze do cílů, nastavte pravidelné částky a sledujte pokrok.", more: "Každý cíl má vlastní horizont, částku a nástroj – rezerva na spořicím účtu, bydlení ve stavebním spoření či fondu, důchod v dlouhodobém portfoliu.", cards: [{ n: "REZERVA", v: 120000, max: 180000 }, { n: "BYDLENÍ", v: 850000, max: 1200000 }, { n: "DŮCHOD", v: 1240000, max: 8000000 }], popup: { title: "Pravidelná investice", sub: "Dnes · 16:07", amount: "−5 000 Kč" }, tag: "+320 Kč výnos" },
    mortgage: { label: "HYPOTÉKA", title: "Financování bez stresu", desc: "Porovnám nabídky bank a nastavím splátku, která vás nezadusí.", more: "Od porovnání sazeb přes nastavení fixace až po refinancování. Zohledníme cashflow, rezervu i budoucí plány rodiny.", head: ["Banka", "Sazba", "Splátka"], best: "Nejvýhodnější", rows: [["Banka A", "4,79 %", "24 118 Kč"], ["Banka B", "4,89 %", "24 402 Kč"], ["Banka C", "5,09 %", "24 976 Kč"], ["Banka D", "5,29 %", "25 556 Kč"]] },
    advisor: { label: "PORADCE", title: "Vše na jednom místě", desc: "Příjem rozdělíme mezi rezervu, investice a ochranu – automaticky.", more: "Metodika Pan Čung System: sedm propojených modulů od příjmu po finanční svobodu. Jeden poradce, jeden plán, žádné protichůdné produkty.", top: "Příjem", topValue: "62 000 Kč", nodes: ["Rezerva", "Investice", "Ochrana"], chip: "5 000 Kč" },
    funding: { label: "FINANCOVÁNÍ", title: "Rychlá a férová hypotéka", desc: "Předběžné posouzení podle vašich čísel – bez závazků.", more: "Do 24 hodin víte, na jakou výši úvěru dosáhnete a s jakou splátkou. Bez dopadu na vaši bonitu.", mock: { tag: "Předběžná nabídka", label: "Výše úvěru", value: 4800000, btn: "Chci nabídku", alt: "Upravit" }, chips: ["Odpověď do 24 hodin", "Bez závazků"] },
    consult: { label: "KONZULTACE", title: "Plán a přehled na jedné schůzce", desc: "Osobně v Praze, online nebo přes Zalo. Vietnamsky, česky, anglicky.", more: "Úvodní 15minutový hovor je zdarma. Následná konzultace trvá 60–90 minut a odcházíte s plánem na papíře.", slot: "Út 14:00 · 15 min zdarma", free: "Volný termín", booked: "Rezervováno", modes: ["Praha", "Online", "Zalo"] },
    reserve: { label: "REZERVA", badge: "Nové", title: "Nechte rezervu vydělávat", desc: "Peníze na horší časy nemusí ležet bez úroku.", more: "Rezerva zůstává dostupná do druhého dne, ale pracuje na spořicím účtu či v konzervativním fondu. Bez rizika, bez výpovědní lhůty.", amountLabel: "Rezerva", amount: "420 000 Kč", perMonth: "měsíčně navíc", value: 1400 },
  },
  appF: {
    phoneHint: "Zeptejte se na cokoliv",
    title: "Udělejte s plánem víc",
    pills: ["Rezervovat hovor", "Napsat zprávu"],
    cards: [
      { title: "Porovnejte své cíle v reálném čase", desc: "Vidíte, jak si vede každý cíl. Vedle sebe, tak jak se to děje.", mockTitle: "POKROK CÍLŮ", rows: [["Rezerva", "6 měsíců", 100], ["Bydlení", "Hypotéka 2026", 72], ["Investice dětem", "Do 18 let", 54], ["Nezávislost", "Cíl: 55 let", 38]] },
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
    subtitle: "Kế hoạch tài chính, đầu tư, vay mua nhà và bảo vệ gia đình – tất cả ở một nơi. Bằng tiếng Việt và tiếng Séc.",
    primary: "Đặt lịch tư vấn",
    overlay: "Một nơi để bạn kiểm soát toàn bộ tiền của mình",
  },
  cardIntro: {
    left: "Gặp kế hoạch",
    right: "cho cuộc sống của bạn.",
    card: { brand: "Pan Čung", label: "KẾ HOẠCH TÀI CHÍNH", name: "GIA ĐÌNH NGUYỄN", since: "KHÁCH HÀNG TỪ 2026", tier: "Premium" },
  },
  gold: {
    title: ["Kiểm soát tiền", "nhanh.", "Kế hoạch bền vững."],
    label: "Gặp kế hoạch tài chính của bạn",
    desc: "Một bảng tổng quan về thu, chi, dự phòng, đầu tư và bảo vệ. Cập nhật mỗi buổi tư vấn – trên điện thoại và trên giấy.",
    cta: "Cách tôi làm việc",
    bullets: [
      { icon: "Wallet", text: "Quỹ dự phòng 3–6 tháng trong vòng một năm" },
      { icon: "TrendingUp", text: "Đầu tư định kỳ theo thời gian của bạn" },
      { icon: "ShieldCheck", text: "Chỉ đủ bảo hiểm cần thiết" },
    ],
    phone: { title: "Kế hoạch tài chính", netWorth: "Tài sản ròng", value: "4 820 000 Kč", delta: "+8,2 % / năm", rows: [["Dự phòng", "420 000 Kč", 100], ["Nhà ở", "1 240 000 Kč", 72], ["Tự do", "3 160 000 Kč", 38]], btn: "Thêm khoản đầu tư" },
  },
  bento: {
    expand: "Xem thêm",
    cta: "Đặt lịch tư vấn",
    close: "Đóng",
    cashflow: { label: "DÒNG TIỀN", title: "Nắm tiền của bạn trong vài giây", desc: "Thấy rõ tiền vào, tiền ra và còn bao nhiêu cho mục tiêu.", more: "Buổi tư vấn đầu chúng ta lập tổng quan thu chi. Bạn biết thực sự có thể để dành bao nhiêu và đặt ra quy tắc hiệu quả không cần bảng tính.", rows: [["Lương", "+62 000 Kč", "Hôm nay · 8:04", "in"], ["Tiền nhà", "−18 500 Kč", "Hôm nay · 8:10", "out"], ["Đầu tư ETF", "−8 000 Kč", "Hôm nay · 9:00", "inv"], ["Dự phòng", "−5 000 Kč", "Hôm nay · 9:00", "inv"], ["Thực phẩm", "−2 340 Kč", "Hôm qua · 17:22", "out"], ["Bảo hiểm", "−1 450 Kč", "Hôm qua · 6:00", "out"], ["Hóa đơn khách", "+24 000 Kč", "Hôm qua · 12:40", "in"]] },
    invest: { label: "ĐẦU TƯ", title: "Đầu tư định kỳ, không cảm tính", desc: "Đặt số tiền, danh mục và ngày. Phần còn lại chạy tự động.", more: "Đầu tư định kỳ vào danh mục đa dạng (ETF, quỹ) theo thời gian và mức chấp nhận rủi ro của bạn. Không đoán thị trường, có kỷ luật.", form: { title: "Đầu tư định kỳ", amount: "Số tiền", amountValue: "5 000 Kč", fund: "Danh mục", fundValue: "ETF toàn cầu · 80/20", day: "Ngày", dayValue: "Ngày 15 hàng tháng", btn: "Xác nhận đầu tư", done: "Đã thiết lập", powered: "Thiết lập bởi" } },
    partners: { label: "ĐỐI TÁC", title: "Tôi chọn từ cả thị trường", desc: "Ngân hàng, công ty bảo hiểm và đầu tư. Không phải một – mà tất cả những nơi hợp lý.", more: "Là đại lý độc lập, tôi so sánh đề xuất của hàng chục tổ chức. Khuyến nghị dựa trên số liệu của bạn, không phải hoa hồng." },
    goals: { label: "MỤC TIÊU", title: "Nhiều mục tiêu, một kế hoạch", desc: "Chia tiền theo mục tiêu, đặt khoản định kỳ và theo dõi tiến độ.", more: "Mỗi mục tiêu có thời gian, số tiền và công cụ riêng – dự phòng trên tài khoản tiết kiệm, nhà ở trong quỹ, hưu trí trong danh mục dài hạn.", cards: [{ n: "DỰ PHÒNG", v: 120000, max: 180000 }, { n: "NHÀ Ở", v: 850000, max: 1200000 }, { n: "HƯU TRÍ", v: 1240000, max: 8000000 }], popup: { title: "Đầu tư định kỳ", sub: "Hôm nay · 16:07", amount: "−5 000 Kč" }, tag: "+320 Kč lợi nhuận" },
    mortgage: { label: "VAY MUA NHÀ", title: "Tài trợ không căng thẳng", desc: "Tôi so sánh ngân hàng và đặt khoản trả phù hợp với bạn.", more: "Từ so sánh lãi suất, đặt kỳ cố định đến tái cấp vốn. Tính đến dòng tiền, dự phòng và kế hoạch gia đình.", head: ["Ngân hàng", "Lãi suất", "Khoản trả"], best: "Tốt nhất", rows: [["Ngân hàng A", "4,79 %", "24 118 Kč"], ["Ngân hàng B", "4,89 %", "24 402 Kč"], ["Ngân hàng C", "5,09 %", "24 976 Kč"], ["Ngân hàng D", "5,29 %", "25 556 Kč"]] },
    advisor: { label: "TƯ VẤN", title: "Tất cả ở một nơi", desc: "Thu nhập được chia cho dự phòng, đầu tư và bảo vệ – tự động.", more: "Phương pháp Pan Čung System: bảy mô-đun kết nối từ thu nhập đến tự do tài chính. Một tư vấn viên, một kế hoạch, không sản phẩm mâu thuẫn.", top: "Thu nhập", topValue: "62 000 Kč", nodes: ["Dự phòng", "Đầu tư", "Bảo vệ"], chip: "5 000 Kč" },
    funding: { label: "TÀI TRỢ", title: "Vay mua nhà nhanh và công bằng", desc: "Đánh giá sơ bộ theo số liệu của bạn – không ràng buộc.", more: "Trong 24 giờ bạn biết được vay bao nhiêu và khoản trả thế nào. Không ảnh hưởng điểm tín dụng.", mock: { tag: "Đề xuất sơ bộ", label: "Số tiền vay", value: 4800000, btn: "Nhận đề xuất", alt: "Điều chỉnh" }, chips: ["Trả lời trong 24 giờ", "Không ràng buộc"] },
    consult: { label: "TƯ VẤN", title: "Kế hoạch và tổng quan trong một buổi", desc: "Trực tiếp tại Praha, online hoặc qua Zalo. Tiếng Việt, Séc, Anh.", more: "Cuộc gọi 15 phút đầu miễn phí. Buổi tư vấn tiếp theo 60–90 phút và bạn ra về với kế hoạch trên giấy.", slot: "Thứ 3 14:00 · 15 phút miễn phí", free: "Còn trống", booked: "Đã đặt", modes: ["Praha", "Online", "Zalo"] },
    reserve: { label: "DỰ PHÒNG", badge: "Mới", title: "Để quỹ dự phòng sinh lời", desc: "Tiền phòng thân không cần nằm im không lãi.", more: "Dự phòng vẫn rút được ngày hôm sau nhưng sinh lời trên tài khoản tiết kiệm hoặc quỹ bảo toàn. Không rủi ro, không kỳ hạn.", amountLabel: "Dự phòng", amount: "420 000 Kč", perMonth: "mỗi tháng thêm", value: 1400 },
  },
  appF: {
    phoneHint: "Hỏi bất cứ điều gì",
    title: "Làm nhiều hơn với kế hoạch",
    pills: ["Đặt lịch gọi", "Gửi tin nhắn"],
    cards: [
      { title: "So sánh mục tiêu theo thời gian thực", desc: "Thấy mỗi mục tiêu đang tiến triển thế nào. Cạnh nhau, ngay khi diễn ra.", mockTitle: "TIẾN ĐỘ MỤC TIÊU", rows: [["Dự phòng", "6 tháng", 100], ["Nhà ở", "Vay 2026", 72], ["Đầu tư cho con", "Đến 18 tuổi", 54], ["Tự do", "Mục tiêu: 55", 38]] },
      { title: "Cả gia đình cùng tham gia", desc: "Vợ chồng, con, cha mẹ – mỗi người thấy điều cần thấy.", mockTitle: "Gia đình Nguyễn", people: "4 người trong kế hoạch", avatars: ["HN", "LN", "MT", "AN"], cursorName: "Linh" },
      { title: "Tư vấn theo cách bạn muốn", desc: "Trực tiếp tại Praha hoặc online từ bất cứ đâu.", modes: ["Trực tiếp", "Online"] },
    ],
  },
  reviews: { title: ["Đừng tin lời tôi.", "Hãy tin khách hàng."], since: "Khách hàng từ" },
  jakPracuji: { label: "CÁCH TÔI LÀM VIỆC", title: "Hệ thống,", accent: "không phải sản phẩm.", subtitle: "Phương pháp, công cụ tính và tổng quan giúp tiền của bạn có ý nghĩa. Từ quỹ dự phòng đầu tiên đến tự do tài chính." },
};

const teya = { cs, vi };
export default teya;
