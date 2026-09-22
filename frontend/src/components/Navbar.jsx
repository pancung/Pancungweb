import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X, ShieldCheck, TrendingUp, Package, MessageCircle, ArrowUpRight } from "lucide-react";
import Logo from "./Logo";
import { useLang } from "../context/LanguageContext";
import { links } from "../mock";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

const icons = { ShieldCheck, TrendingUp, Package, MessageCircle };

export const FlagCZ = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className="rounded-full"><clipPath id="cz"><circle cx="12" cy="12" r="12" /></clipPath><g clipPath="url(#cz)"><rect width="24" height="12" fill="#fff" /><rect y="12" width="24" height="12" fill="#D7141A" /><path d="M0 0 L12 12 L0 24 Z" fill="#11457E" /></g></svg>
);
export const FlagVN = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className="rounded-full"><clipPath id="vn"><circle cx="12" cy="12" r="12" /></clipPath><g clipPath="url(#vn)"><rect width="24" height="24" fill="#DA251D" /><path d="M12 5.5l1.9 5.1 5.4.2-4.3 3.3 1.5 5.2L12 16.2l-4.5 3.1 1.5-5.2-4.3-3.3 5.4-.2z" fill="#FFFF00" /></g></svg>
);

export default function Navbar() {
  const { t, lang, setLang } = useLang();
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [scrollY, setScrollY] = useState(0);
  const [onDark, setOnDark] = useState(isHome);
  const [open, setOpen] = useState(false);
  const [prodOpen, setProdOpen] = useState(false);

  useEffect(() => {
    let raf = 0;
    const probe = () => {
      setScrollY(window.scrollY);
      const el = document.elementFromPoint(Math.round(window.innerWidth / 2), 84);
      if (!el || el.closest("header") || el.closest("[data-testid=products-megamenu]")) return;
      const themed = el.closest("[data-nav]");
      setOnDark(themed?.getAttribute("data-nav") === "dark");
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(probe);
    };
    probe();
    const t = setTimeout(probe, 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); clearTimeout(t); cancelAnimationFrame(raf); };
  }, [location.pathname]);

  useEffect(() => { setOpen(false); setProdOpen(false); }, [location.pathname]);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [open]);

  const dark = onDark; // dark = light text on dark bg
  const scrolled = scrollY > 24;

  const pill = dark ? "glass text-white/85 hover:text-white" : "glass-dark text-[#1C2418]/80 hover:text-[#1C2418]";
  const textCls = dark ? "text-white" : "text-[#1C2418]";
  const Flag = lang === "cs" ? FlagCZ : FlagVN;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 h-20 transition-colors duration-300 ${!dark && scrolled ? "bg-white/80 backdrop-blur-xl border-b border-black/5" : ""}`}
        data-testid="navbar"
      >
        <div className="container-x flex h-full items-center justify-between">
          <Logo dark={!dark} />

          {/* Center nav */}
          <nav className={`hidden items-center rounded-[14px] p-1 lg:flex ${dark ? "glass" : "glass-dark"}`} onMouseLeave={() => setProdOpen(false)}>
            <button
              onMouseEnter={() => setProdOpen(true)}
              onClick={() => setProdOpen((v) => !v)}
              className={`inline-flex h-10 items-center gap-1.5 rounded-[12px] px-4 text-[14px] font-medium transition-colors ${dark ? "text-white/85 hover:bg-white/10" : "text-[#1C2418]/80 hover:bg-black/5"}`}
              data-testid="nav-products"
            >
              {t.nav.products}<ChevronDown size={14} className={`transition-transform ${prodOpen ? "rotate-180" : ""}`} />
            </button>
            <a href="/#system" className={`inline-flex h-10 items-center rounded-[12px] px-4 text-[14px] font-medium transition-colors ${dark ? "text-white/85 hover:bg-white/10" : "text-[#1C2418]/80 hover:bg-black/5"}`} data-testid="nav-packages">{t.nav.packages}</a>
            <Link to="/kalkulacky" className={`inline-flex h-10 items-center rounded-[12px] px-4 text-[14px] font-medium transition-colors ${dark ? "text-white/85 hover:bg-white/10" : "text-[#1C2418]/80 hover:bg-black/5"}`} data-testid="nav-videos">{t.nav.videos}</Link>

            <AnimatePresence>
              {prodOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.18 }}
                  className="absolute left-1/2 top-[64px] w-[620px] -translate-x-1/2 rounded-[20px] border border-black/5 bg-white p-3 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.35)]"
                  data-testid="products-megamenu"
                >
                  <div className="grid grid-cols-2 gap-1">
                    {t.nav.productMenu.map((item) => {
                      const Icon = icons[item.icon] || ShieldCheck;
                      return (
                        <Link key={item.to + item.title} to={item.to} className="group flex items-start gap-3 rounded-[14px] p-3 transition-colors hover:bg-[#F4F2EA]" onClick={() => setProdOpen(false)}>
                          <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-[#D9B44A] text-[#1C2418]"><Icon size={17} /></span>
                          <span>
                            <span className="flex items-center gap-1 text-[14px] font-semibold text-[#1C2418]">{item.title}<ArrowUpRight size={13} className="opacity-0 transition-opacity group-hover:opacity-60" /></span>
                            <span className="block text-[12.5px] leading-snug text-[#1C2418]/60">{item.desc}</span>
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </nav>

          {/* Right */}
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className={`inline-flex h-10 items-center gap-2 rounded-[12px] px-3 text-[13px] font-medium ${pill}`} data-testid="lang-switcher" aria-label={t.nav.language}>
                  <Flag /> <span className="uppercase">{lang}</span><ChevronDown size={13} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-[160px] rounded-[14px] border-black/5 p-1.5 shadow-xl">
                <DropdownMenuItem onClick={() => setLang("cs")} className="gap-2 rounded-[10px] py-2 text-[14px] cursor-pointer" data-testid="lang-cs"><FlagCZ /> Čeština</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLang("vi")} className="gap-2 rounded-[10px] py-2 text-[14px] cursor-pointer" data-testid="lang-vi"><FlagVN /> Tiếng Việt</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <a href={links.booking} target="_blank" rel="noreferrer" className={`hidden h-10 items-center rounded-[12px] px-4 text-[14px] font-medium md:inline-flex ${pill}`} data-testid="nav-login">{t.nav.login}</a>
            <Link to="/kontakt" className="btn-lime hidden h-10 items-center px-4 text-[14px] md:inline-flex" data-testid="nav-cta">{t.nav.cta}</Link>
            <button onClick={() => setOpen(true)} className={`inline-flex h-10 w-10 items-center justify-center rounded-full lg:hidden ${pill}`} aria-label={t.nav.menu} data-testid="mobile-menu-btn">
              <Menu size={20} className={textCls} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] bg-[#1C2418] text-white" data-testid="mobile-menu">
            <div className="container-x flex h-20 items-center justify-between">
              <Logo />
              <button onClick={() => setOpen(false)} className="glass inline-flex h-10 w-10 items-center justify-center rounded-full" aria-label={t.nav.close}><X size={20} /></button>
            </div>
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="container-x mt-6 flex flex-col gap-2">
              <div className="section-label text-white/40">{t.nav.products}</div>
              {t.nav.productMenu.map((item) => {
                const Icon = icons[item.icon] || ShieldCheck;
                return (
                  <Link key={item.title} to={item.to} className="flex items-center gap-3 rounded-[14px] py-3 text-[18px] font-medium">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#D9B44A] text-[#1C2418]"><Icon size={17} /></span>{item.title}
                  </Link>
                );
              })}
              <div className="my-3 h-px bg-white/10" />
              <a href="/#system" onClick={() => setOpen(false)} className="py-2 text-[18px] font-medium">{t.nav.packages}</a>
              <Link to="/kalkulacky" className="py-2 text-[18px] font-medium">{t.nav.videos}</Link>
              <a href={links.booking} target="_blank" rel="noreferrer" className="py-2 text-[18px] font-medium">{t.nav.login}</a>
              <div className="my-3 h-px bg-white/10" />
              <div className="flex gap-2">
                <button onClick={() => setLang("cs")} className={`inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-[12px] text-[14px] font-medium ${lang === "cs" ? "bg-[#D9B44A] text-[#1C2418]" : "glass"}`}><FlagCZ /> Čeština</button>
                <button onClick={() => setLang("vi")} className={`inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-[12px] text-[14px] font-medium ${lang === "vi" ? "bg-[#D9B44A] text-[#1C2418]" : "glass"}`}><FlagVN /> Tiếng Việt</button>
              </div>
              <Link to="/kontakt" className="btn-lime mt-4 inline-flex h-12 items-center justify-center text-[15px]">{t.nav.cta}</Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
