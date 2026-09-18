import React from "react";
import { useNavigate } from "react-router-dom";
import { Check, Minus } from "lucide-react";
import { useLang } from "../context/LanguageContext";
import { Reveal } from "../components/IntroSection";
import { ScribbleWord } from "../components/CalculatorSection";
import FaqSection from "../components/FaqSection";
import { formatCzk } from "../mock";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";

export default function PackagesPage() {
  const { t } = useLang();
  const p = t.packages;
  const navigate = useNavigate();

  const choose = (pkg) => navigate("/kontakt", { state: { interest: pkg.name, packageId: pkg.id } });

  return (
    <div data-testid="packages-page">
      <section className="bg-[linear-gradient(180deg,#ffffff_0%,#F1E6C4_100%)] pb-20 pt-32 md:pb-28 md:pt-40">
        <div className="container-x">
          <Reveal className="text-center">
            <span className="section-label">{p.label}</span>
            <h1 className="font-display mx-auto mt-4 text-[44px] leading-[1.02] text-[#232B1E] md:text-[68px]">
              {p.title} <ScribbleWord>{p.accent}</ScribbleWord>
            </h1>
            <p className="mx-auto mt-6 max-w-[560px] text-[16px] text-[#1C2418]/65">{p.subtitle}</p>
          </Reveal>

          <div className="mt-16 grid gap-5 md:grid-cols-3">
            {p.items.map((pkg, i) => {
              const dark = pkg.popular;
              return (
                <Reveal key={pkg.id} delay={i * 0.1}>
                  <div className={`card-hover relative flex h-full flex-col rounded-[28px] p-8 ${dark ? "bg-[#1C2418] text-white" : "bg-white text-[#1C2418] ring-1 ring-black/5"}`} data-testid={`package-card-${pkg.id}`}>
                    {pkg.popular && <span className="absolute right-6 top-6 rounded-full bg-[#D9B44A] px-3 py-1 text-[11px] font-semibold text-[#1C2418]">{p.popular}</span>}
                    <div className="text-[14px] font-medium opacity-70">{pkg.name}</div>
                    <div className="mt-3 flex items-end gap-1">
                      <span className="text-[44px] font-semibold leading-none tracking-tight">{formatCzk(pkg.price)}</span>
                      <span className="pb-1 text-[14px] opacity-60">{p.perMonth}</span>
                    </div>
                    <div className={`mt-4 inline-flex w-fit items-center gap-2 rounded-full px-3 py-1.5 text-[13px] font-semibold ${dark ? "bg-[#D9B44A]/15 text-[#D9B44A]" : "bg-[#F3E9C8] text-[#1C2418]"}`}>{pkg.protection}</div>
                    <p className={`mt-4 text-[14.5px] ${dark ? "text-white/65" : "text-[#1C2418]/65"}`}>{pkg.desc}</p>
                    <ul className="mt-6 space-y-3">
                      {pkg.features.map((f) => (
                        <li key={f} className="flex items-start gap-2.5 text-[14.5px]"><Check size={16} className={`mt-0.5 shrink-0 ${dark ? "text-[#D9B44A]" : "text-[#1C2418]"}`} />{f}</li>
                      ))}
                    </ul>
                    <button onClick={() => choose(pkg)} className={`mt-8 inline-flex h-12 w-full items-center justify-center text-[15px] ${dark ? "btn-lime" : "btn-ink"}`} data-testid={`package-choose-${pkg.id}`}>{p.choose}</button>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28">
        <div className="container-x">
          <Reveal><h2 className="text-[32px] font-normal tracking-tight md:text-[44px]">{p.compareTitle}</h2></Reveal>
          <Reveal delay={0.1} className="mt-10 overflow-hidden rounded-[24px] ring-1 ring-black/5">
            <Table data-testid="compare-table">
              <TableHeader>
                <TableRow className="bg-[#F4F2EA] hover:bg-[#F4F2EA]">
                  <TableHead className="h-14 px-6 text-[14px] font-semibold text-[#1C2418]">{p.featureCol}</TableHead>
                  {p.items.map((pkg) => <TableHead key={pkg.id} className="h-14 px-6 text-center text-[14px] font-semibold text-[#1C2418]">{pkg.name}</TableHead>)}
                </TableRow>
              </TableHeader>
              <TableBody>
                {p.compare.map((row) => (
                  <TableRow key={row.f} className="hover:bg-[#FAF8F0]">
                    <TableCell className="px-6 py-4 text-[14.5px] text-[#1C2418]/80">{row.f}</TableCell>
                    {row.v.map((v, i) => (
                      <TableCell key={i} className="px-6 py-4 text-center text-[14.5px]">
                        {typeof v === "string" ? <span className="font-semibold">{v}</span> : v ? <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#D9B44A]"><Check size={14} /></span> : <Minus size={16} className="inline text-black/25" />}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Reveal>
        </div>
      </section>

      <div className="bg-[#1C2418] pt-20" data-nav="dark"><FaqSection /></div>
    </div>
  );
}
