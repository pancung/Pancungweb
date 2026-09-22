import React from "react";
import { useLang } from "../../context/LanguageContext";
import { BentoCard } from "./BentoCard";
import CashflowStack from "./bento/CashflowStack";
import InvestForm from "./bento/InvestForm";
import PartnerGrid from "./bento/PartnerGrid";
import GoalsCards from "./bento/GoalsCards";
import MortgageCompare from "./bento/MortgageCompare";
import AdvisorFlow from "./bento/AdvisorFlow";
import FundingMock from "./bento/FundingMock";
import ConsultMock from "./bento/ConsultMock";
import ReserveMock from "./bento/ReserveMock";

export default function BentoGrid() {
  const { t } = useLang();
  const b = t.bento;
  return (
    <section id="sluzby" className="bg-white py-4 md:py-6" data-testid="bento-grid">
      <div className="container-x grid gap-4 md:grid-cols-3">
        <BentoCard id="cashflow" data={b.cashflow}><CashflowStack rows={b.cashflow.rows} /></BentoCard>
        <BentoCard id="invest" data={b.invest} delay={0.08}><InvestForm form={b.invest.form} /></BentoCard>
        <BentoCard id="partners" data={b.partners} delay={0.16}><PartnerGrid /></BentoCard>

        <BentoCard id="goals" data={b.goals} className="md:col-span-3" wide><GoalsCards data={b.goals} /></BentoCard>

        <BentoCard id="mortgage" data={b.mortgage} className="md:col-span-2"><MortgageCompare data={b.mortgage} /></BentoCard>
        <BentoCard id="advisor" data={b.advisor} delay={0.08}><AdvisorFlow data={b.advisor} /></BentoCard>

        <BentoCard id="funding" data={b.funding}><FundingMock data={b.funding} /></BentoCard>
        <BentoCard id="consult" data={b.consult} delay={0.08}><ConsultMock data={b.consult} /></BentoCard>
        <BentoCard id="reserve" data={b.reserve} delay={0.16} badge={b.reserve.badge}><ReserveMock data={b.reserve} /></BentoCard>
      </div>
    </section>
  );
}
