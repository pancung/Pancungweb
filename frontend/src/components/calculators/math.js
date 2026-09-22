export const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

export function investSeries({ initial = 0, monthly, years, rate }) {
  const r = rate / 100 / 12;
  const out = [initial];
  let v = initial;
  for (let m = 1; m <= years * 12; m++) {
    v = v * (1 + r) + monthly;
    if (m % 12 === 0) out.push(v);
  }
  return out;
}

export function annuity(principal, ratePct, years) {
  const r = ratePct / 100 / 12;
  const n = years * 12;
  if (r === 0) return principal / n;
  return (principal * r) / (1 - Math.pow(1 + r, -n));
}

export function amortization(principal, ratePct, years) {
  const r = ratePct / 100 / 12;
  const n = years * 12;
  const payment = annuity(principal, ratePct, years);
  let bal = principal;
  let totalInterest = 0;
  const balances = [principal];
  for (let m = 1; m <= n; m++) {
    const i = bal * r;
    bal = Math.max(0, bal - (payment - i));
    totalInterest += i;
    if (m % 12 === 0) balances.push(bal);
  }
  return { payment, totalInterest, totalPaid: payment * n, balances };
}

export function fireSim({ age, portfolio, monthly, expenses, rate, withdrawal, maxAge = 90 }) {
  const target = (expenses * 12) / (withdrawal / 100);
  const r = rate / 100 / 12;
  const series = [portfolio];
  let v = portfolio;
  let fireAge = portfolio >= target ? age : null;
  for (let m = 1; m <= (maxAge - age) * 12; m++) {
    v = v * (1 + r) + monthly;
    if (m % 12 === 0) {
      series.push(v);
      if (fireAge === null && v >= target) fireAge = age + m / 12;
    }
  }
  return { target, series, fireAge, progress: clamp(portfolio / target, 0, 1) };
}

export function healthScore({ income, expenses, debt, reserve, investing, insured }) {
  const free = income > 0 ? (income - expenses - debt) / income : 0;
  const reserveMonths = expenses + debt > 0 ? reserve / (expenses + debt) : 0;
  const dti = income > 0 ? debt / income : 1;
  const investRate = income > 0 ? investing / income : 0;
  const parts = [
    { id: "savings", max: 25, score: clamp(free / 0.3, 0, 1) * 25, value: free },
    { id: "reserve", max: 25, score: clamp(reserveMonths / 6, 0, 1) * 25, value: reserveMonths },
    { id: "debt", max: 20, score: clamp(1 - dti / 0.4, 0, 1) * 20, value: dti },
    { id: "invest", max: 20, score: clamp(investRate / 0.15, 0, 1) * 20, value: investRate },
    { id: "protect", max: 10, score: insured ? 10 : 0, value: insured },
  ];
  return { total: Math.round(parts.reduce((a, p) => a + p.score, 0)), parts };
}
