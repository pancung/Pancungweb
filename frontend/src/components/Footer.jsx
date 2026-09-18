import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, MessageCircle, Phone, Mail, Linkedin, Instagram, Facebook, Youtube, ChevronUp } from "lucide-react";
import Logo from "./Logo";
import { useLang } from "../context/LanguageContext";
import { FlagCZ, FlagVN } from "./Navbar";

const LimeLink = ({ icon: Icon, children, href = "#" }) => (
  <a href={href} className="inline-flex items-center gap-2 text-[14px] text-[#D9B44A] transition-opacity hover:opacity-80">
    <Icon size={15} />{children}
  </a>
);

export default function Footer() {
  const { t, lang, setLang } = useLang();
  const f = t.footer;
  return (
    <footer className="bg-[#1C2418] pb-10 pt-24 text-white" data-testid="footer" data-nav="dark">
      <div className="container-x">
        <Logo size={30} />

        <div className="mt-14 grid gap-10 md:grid-cols-3 lg:grid-cols-5">
          {f.cols.map((col) => (
            <div key={col.title}>
              <h4 className="text-[15px] font-semibold">{col.title}</h4>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.t}>
                    {l.to.startsWith("http") ? (
                      <a href={l.to} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[14px] text-white/60 transition-colors hover:text-white">{l.t}{l.ext && <ArrowUpRight size={13} />}</a>
                    ) : l.to.startsWith("/#") || l.to === "#" ? (
                      <a href={l.to} className="inline-flex items-center gap-1 text-[14px] text-white/60 transition-colors hover:text-white">{l.t}{l.ext && <ArrowUpRight size={13} />}</a>
                    ) : (
                      <Link to={l.to} className="inline-flex items-center gap-1 text-[14px] text-white/60 transition-colors hover:text-white">{l.t}{l.ext && <ArrowUpRight size={13} />}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <div className="flex items-center justify-between"><h4 className="text-[15px] font-semibold">{f.support.title}</h4><span className="text-[13px] text-white/70">{f.support.hours}</span></div>
            <ul className="mt-5 space-y-3">
              <li><LimeLink icon={MessageCircle}>{f.support.chat}</LimeLink></li>
              <li><LimeLink icon={MessageCircle}>{f.support.zalo}</LimeLink></li>
              <li><LimeLink icon={Phone}>{f.support.whatsapp}</LimeLink></li>
              <li><LimeLink icon={Mail} href={`mailto:${f.support.email}`}>{f.support.email}</LimeLink></li>
            </ul>
            <div className="mt-6 space-y-1.5 text-[12.5px] text-white/60">
              {f.support.rows.map(([d, h]) => <div key={d} className="flex justify-between"><span>{d}</span><span>{h}</span></div>)}
            </div>
            <div className="mt-4"><LimeLink icon={Phone} href={`tel:${f.support.phone}`}>{f.support.phone}</LimeLink></div>
          </div>

          <div>
            <h4 className="text-[15px] font-semibold">{f.sales.title}</h4>
            <div className="mt-2 space-y-1.5 text-[12.5px] text-white/60">
              {f.sales.rows.map(([d, h]) => <div key={d} className="flex justify-between"><span>{d}</span><span>{h}</span></div>)}
            </div>
            <ul className="mt-5 space-y-3">
              <li><LimeLink icon={Mail} href={`mailto:${f.sales.email}`}>{f.sales.email}</LimeLink></li>
              <li><LimeLink icon={Phone} href={`tel:${f.sales.phone}`}>{f.sales.phone}</LimeLink></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-8">
          <p className="max-w-[1000px] text-[12.5px] leading-relaxed text-white/45">{f.legal}</p>
        </div>

        <div className="mt-8 flex flex-col gap-6 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <div className="flex items-center gap-4 text-white/70">
              <a href="#" aria-label="LinkedIn" className="hover:text-white"><Linkedin size={18} /></a>
              <a href="#" aria-label="Instagram" className="hover:text-white"><Instagram size={18} /></a>
              <a href="#" aria-label="Facebook" className="hover:text-white"><Facebook size={18} /></a>
              <a href="#" aria-label="YouTube" className="hover:text-white"><Youtube size={18} /></a>
            </div>
            {f.bottom.map((b) => <a key={b} href="#" className="text-[12.5px] text-white/60 hover:text-white">{b}</a>)}
          </div>
          <div className="flex items-center gap-5">
            <button onClick={() => setLang(lang === "cs" ? "vi" : "cs")} className="inline-flex items-center gap-1.5 text-white/80 hover:text-white" data-testid="footer-lang">
              {lang === "cs" ? <FlagCZ size={20} /> : <FlagVN size={20} />}<ChevronUp size={12} />
            </button>
            <span className="text-[12.5px] text-white/60">{f.copy}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
