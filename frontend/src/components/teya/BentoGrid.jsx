import React from "react";
import { useLang } from "../../context/LanguageContext";
import { BentoCard } from "./BentoCard";
import CashflowStack from "./bento/CashflowStack";
import InvestChat from "./bento/InvestChat";
import PartnerGrid from "./bento/PartnerGrid";
import RulesPanel from "./bento/RulesPanel";
import GoalsCards from "./bento/GoalsCards";
import MortgageCompare from "./bento/MortgageCompare";
import AdvisorFlow from "./bento/AdvisorFlow";
import ProtectMock from "./bento/ProtectMock";
import ConsultMock from "./bento/ConsultMock";
import ReserveMock from "./bento/ReserveMock";

// part="top": first bento row (like Teya: MONEY / ECOMMERCE / EPOS). part="bottom": the rest, starting
// with the panel where the 3D card lands (Teya: CARD panel).
export default function BentoGrid({ part = "top" }) {
  const { t } = useLang();
  const b = t.bento;
  if (part === "top") {
    return (
      <section id="sluzby" className="bg-white py-4 md:py-6" data-testid="bento-grid">
        <div className="container-x grid gap-4 md:grid-cols-3">
          <BentoCard id="cashflow" data={b.cashflow}><CashflowStack rows={b.cashflow.rows} /></BentoCard>
          <BentoCard id="invest" data={b.invest} delay={0.08}><InvestChat chat={b.invest.chat} typing={b.invest.typing} /></BentoCard>
          <BentoCard id="partners" data={b.partners} delay={0.16}><PartnerGrid /></BentoCard>
        </div>
      </section>
    );
  }
  return (
    <section className="bg-white pb-6 md:pb-10" data-testid="bento-grid-bottom">
      <div className="container-x grid gap-4 md:grid-cols-3">
        <BentoCard id="rules" data={b.rules} className="md:col-span-3" descBottom><RulesPanel /></BentoCard>

        <BentoCard id="mortgage" data={b.mortgage} className="md:col-span-2"><MortgageCompare data={b.mortgage} /></BentoCard>
        <BentoCard id="advisor" data={b.advisor} delay={0.08}><AdvisorFlow data={b.advisor} /></BentoCard>

        <BentoCard id="protect" data={b.protect}><ProtectMock data={b.protect} /></BentoCard>
        <BentoCard id="consult" data={b.consult} delay={0.08}><ConsultMock data={b.consult} /></BentoCard>
        <BentoCard id="reserve" data={b.reserve} delay={0.16} badge={b.reserve.badge}><ReserveMock data={b.reserve} /></BentoCard>

        <BentoCard id="goals" data={b.goals} className="md:col-span-3" wide><GoalsCards data={b.goals} /></BentoCard>
      </div>
    </section>
  );
}
