import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Check, ArrowRight, Loader2, CalendarCheck } from "lucide-react";
import { toast } from "sonner";
import { useLang } from "../context/LanguageContext";
import { Reveal } from "../components/IntroSection";
import { ScribbleWord } from "../components/CalculatorSection";
import { formatCzk, links } from "../mock";
import { createLead } from "../lib/api";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";

const icons = { Phone, Mail, MapPin, Clock };

export default function ContactPage() {
  const { t, lang } = useLang();
  const c = t.contact;
  const { state } = useLocation();

  const [form, setForm] = useState({
    name: "", phone: "", email: "", city: "",
    interest: state?.interest || "",
    langPref: lang === "vi" ? c.langs[0] : c.langs[1],
    message: state?.monthly ? `${c.interests[1]} · ${formatCzk(state.monthly)}/m, ${state.years} y, ${state.age}` : "",
  });
  const [done, setDone] = useState(false);
  const [sending, setSending] = useState(false);
  const set = (k) => (v) => setForm((f) => ({ ...f, [k]: v }));

  useEffect(() => {
    setForm((f) => (c.langs.includes(f.langPref) ? f : { ...f, langPref: lang === "vi" ? c.langs[0] : c.langs[1] }));
  }, [lang, c.langs]);

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      toast.error(c.error);
      return;
    }
    setSending(true);
    try {
      await createLead({
        source: state?.packageId ? "package" : "contact",
        lang,
        ...form,
        packageId: state?.packageId || null,
        calc: state?.monthly ? { age: state.age, monthly: state.monthly, years: state.years } : null,
      });
      toast.success(c.success);
      setDone(true);
    } catch (err) {
      const detail = err?.response?.data?.detail;
      toast.error(typeof detail === "string" ? detail : c.errorSubmit);
    } finally {
      setSending(false);
    }
  };

  const inputCls = "h-12 rounded-[12px] border-black/10 bg-[#F4F2EA] px-4 text-[15px] focus-visible:ring-[#D9B44A]";

  return (
    <div data-testid="contact-page">
      <section className="bg-[linear-gradient(180deg,#ffffff_0%,#F1E6C4_100%)] pb-24 pt-32 md:pb-32 md:pt-40">
        <div className="container-x grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <Reveal>
            <span className="section-label">{c.label}</span>
            <h1 className="font-display mt-4 text-[44px] leading-[1.02] text-[#232B1E] md:text-[64px]">
              {c.title} <ScribbleWord>{c.accent}</ScribbleWord>
            </h1>
            <p className="mt-6 max-w-[480px] text-[16px] leading-relaxed text-[#1C2418]/65">{c.subtitle}</p>
            <a href={links.booking} target="_blank" rel="noreferrer" className="btn-lime mt-8 inline-flex h-12 items-center gap-2 px-6 text-[15px]" data-testid="contact-booking">
              <CalendarCheck size={17} />{c.book}
            </a>

            <h3 className="mt-14 text-[18px] font-medium">{c.infoTitle}</h3>
            <ul className="mt-5 space-y-4">
              {c.info.map((it) => {
                const Icon = icons[it.icon] || Phone;
                return (
                  <li key={it.label} className="flex items-center gap-4">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-[12px] bg-white ring-1 ring-black/5"><Icon size={18} /></span>
                    <span><span className="block text-[12px] text-[#1C2418]/50">{it.label}</span><span className="text-[15px] font-medium">{it.value}</span></span>
                  </li>
                );
              })}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-[28px] bg-white p-7 shadow-[0_40px_100px_-40px_rgba(0,0,0,0.25)] ring-1 ring-black/5 md:p-9">
              <AnimatePresence mode="wait">
                {done ? (
                  <motion.div key="done" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex min-h-[420px] flex-col items-center justify-center text-center" data-testid="contact-success">
                    <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#D9B44A]"><Check size={28} /></span>
                    <h3 className="mt-6 text-[26px] font-medium">{c.success}</h3>
                    <p className="mt-3 max-w-[380px] text-[15px] text-[#1C2418]/65">{c.successDesc}</p>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={submit} className="grid gap-5" data-testid="contact-form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <div className="grid gap-5 md:grid-cols-2">
                      <div className="grid gap-2"><Label className="text-[13px] text-[#1C2418]/70">{c.name} *</Label><Input value={form.name} onChange={(e) => set("name")(e.target.value)} className={inputCls} data-testid="contact-name" /></div>
                      <div className="grid gap-2"><Label className="text-[13px] text-[#1C2418]/70">{c.phone} *</Label><Input value={form.phone} onChange={(e) => set("phone")(e.target.value)} className={inputCls} data-testid="contact-phone" /></div>
                    </div>
                    <div className="grid gap-5 md:grid-cols-2">
                      <div className="grid gap-2"><Label className="text-[13px] text-[#1C2418]/70">{c.email}</Label><Input type="email" value={form.email} onChange={(e) => set("email")(e.target.value)} className={inputCls} data-testid="contact-email" /></div>
                      <div className="grid gap-2"><Label className="text-[13px] text-[#1C2418]/70">{c.city}</Label><Input value={form.city} onChange={(e) => set("city")(e.target.value)} className={inputCls} data-testid="contact-city" /></div>
                    </div>
                    <div className="grid gap-5 md:grid-cols-2">
                      <div className="grid gap-2">
                        <Label className="text-[13px] text-[#1C2418]/70">{c.interest}</Label>
                        <Select value={form.interest} onValueChange={set("interest")}>
                          <SelectTrigger className={inputCls} data-testid="contact-interest"><SelectValue placeholder="—" /></SelectTrigger>
                          <SelectContent className="rounded-[14px]">{[...new Set([...c.interests, ...(form.interest ? [form.interest] : [])])].map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label className="text-[13px] text-[#1C2418]/70">{c.langPref}</Label>
                        <Select value={form.langPref} onValueChange={set("langPref")}>
                          <SelectTrigger className={inputCls} data-testid="contact-lang"><SelectValue /></SelectTrigger>
                          <SelectContent className="rounded-[14px]">{c.langs.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid gap-2"><Label className="text-[13px] text-[#1C2418]/70">{c.message}</Label><Textarea value={form.message} onChange={(e) => set("message")(e.target.value)} rows={4} className="rounded-[12px] border-black/10 bg-[#F4F2EA] px-4 py-3 text-[15px] focus-visible:ring-[#D9B44A]" data-testid="contact-message" /></div>
                    <button type="submit" disabled={sending} className="btn-ink mt-2 inline-flex h-12 items-center justify-center gap-2 text-[15px] disabled:opacity-60" data-testid="contact-submit">
                      {sending ? <Loader2 size={16} className="animate-spin" /> : <ArrowRight size={16} />}{c.submit}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
