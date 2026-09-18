import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Check } from "lucide-react";
import { useLang } from "../context/LanguageContext";
import { createLead } from "../lib/api";
import { toast } from "sonner";

const COOKIE_KEY = "tcat_cookie_consent";

export function CookieBanner() {
  const { t } = useLang();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(COOKIE_KEY)) setTimeout(() => setVisible(true), 1200);
    } catch {
      setVisible(true);
    }
  }, []);

  const decide = (v) => {
    try { localStorage.setItem(COOKIE_KEY, v); } catch { /* ignore */ }
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 30 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-4 left-4 right-4 z-[70] rounded-[20px] bg-white p-5 text-[#1C2418] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.45)] md:left-auto md:right-6 md:bottom-6 md:w-[440px]"
          data-testid="cookie-banner"
        >
          <h4 className="text-[16px] font-semibold">{t.cookie.title}</h4>
          <p className="mt-2 text-[13px] leading-relaxed text-[#1C2418]/65">{t.cookie.text} <a href="#" className="underline">{t.cookie.link}</a>.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button onClick={() => decide("all")} className="btn-ink h-10 rounded-full px-5 text-[13px]" data-testid="cookie-accept">{t.cookie.accept}</button>
            <button onClick={() => decide("none")} className="btn-ink h-10 rounded-full px-5 text-[13px]" data-testid="cookie-reject">{t.cookie.reject}</button>
            <button onClick={() => decide("prefs")} className="h-10 rounded-full border border-black/15 px-5 text-[13px] font-medium transition-colors hover:bg-black/5" data-testid="cookie-prefs">{t.cookie.prefs}</button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function FloatingChat() {
  const { t, lang } = useLang();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setSending(true);
    try {
      await createLead({ source: "chat", name, phone, lang });
      setSent(true);
      toast.success(t.chat.sent);
      setTimeout(() => { setOpen(false); setSent(false); setName(""); setPhone(""); }, 1800);
    } catch {
      toast.error(t.contact.errorSubmit);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[65] flex flex-col items-end gap-3" data-testid="floating-chat">
      <AnimatePresence>
        {open && (
          <motion.form
            onSubmit={submit}
            initial={{ opacity: 0, y: 16, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 16, scale: 0.96 }} transition={{ duration: 0.25 }}
            className="w-[300px] rounded-[20px] bg-white p-5 text-[#1C2418] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.45)] ring-1 ring-black/5"
            data-testid="chat-form"
          >
            <div className="text-[16px] font-semibold">{t.chat.title}</div>
            <p className="mt-1 text-[12.5px] text-[#1C2418]/60">{t.chat.subtitle}</p>
            {sent ? (
              <div className="mt-5 flex items-center gap-2 rounded-[12px] bg-[#F3E9C8] p-3 text-[13px] font-medium"><Check size={16} />{t.chat.sent}</div>
            ) : (
              <>
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder={t.chat.name} className="mt-4 h-11 w-full rounded-[12px] border border-black/10 bg-[#F4F2EA] px-3 text-[14px] outline-none focus:ring-2 focus:ring-[#D9B44A]" data-testid="chat-name" />
                <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={t.chat.phone} className="mt-2 h-11 w-full rounded-[12px] border border-black/10 bg-[#F4F2EA] px-3 text-[14px] outline-none focus:ring-2 focus:ring-[#D9B44A]" data-testid="chat-phone" />
                <button type="submit" disabled={sending} className="btn-ink mt-3 inline-flex h-11 w-full items-center justify-center gap-2 text-[14px] disabled:opacity-60" data-testid="chat-send"><Send size={15} />{t.chat.send}</button>
              </>
            )}
          </motion.form>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#CFAA3D] text-[#1C2418] shadow-[0_20px_40px_-10px_rgba(217,180,74,0.5)] transition-transform hover:scale-105"
        aria-label="chat"
        data-testid="chat-toggle"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </div>
  );
}
