// Mock data & helpers for the frontend-only version.
// Text content lives in /data/cs.js and /data/vi.js. This file holds media, numbers and local storage helpers.

export const images = {
  // Hero background – Pan Čung portrait (wide composite, subject on the right). Replace `heroVideo` with an .mp4 URL to use video instead.
  hero: "/images/pan-cung-hero-wide.jpg",
  heroVideo: "/videos/hero.mp4",
  advisor: "/images/pan-cung-portrait.jpg",
  advisorAvatar: "/images/pan-cung-avatar.jpg",
  family: "https://images.unsplash.com/photo-1586865972793-c07ba4785d85?auto=format&fit=crop&w=1600&q=80",
  elderly: "https://images.unsplash.com/photo-1532329683184-6ffd13057d1c?auto=format&fit=crop&w=1600&q=80",
  motherChild: "https://images.unsplash.com/photo-1559036064-91b4a2446851?auto=format&fit=crop&w=1600&q=80",
  shopOwner: "https://images.unsplash.com/photo-1775217434748-0bd010512413?auto=format&fit=crop&w=1600&q=80",
  testimonials: [
    "https://images.unsplash.com/photo-1600481176431-47ad2ab2745d?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1720501828093-c792c10e3f0b?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1518725522904-4b3939358342?auto=format&fit=crop&w=900&q=80",
  ],
};

// External links of Pan Čung (from pancung.cz)
export const links = {
  booking: "https://pancungradi.simplybook.it/v2/#book",
  quiz: "https://kviz.pancung.cz/",
  calculators: "https://www.pancung.cz",
  plan: "https://form.typeform.com/to/bA4J1ZKX",
};

// YouTube video IDs – placeholders, replace with your own explanation videos.
export const videoIds = ["ScMzIvxBSi4", "ysz5S6PUM-U", "aqz-KE-bpKQ"];

export const videoThumbs = [
  "https://images.unsplash.com/photo-1586865972793-c07ba4785d85?auto=format&fit=crop&w=1200&q=70",
  "https://images.unsplash.com/photo-1532329683184-6ffd13057d1c?auto=format&fit=crop&w=1200&q=70",
  "https://images.unsplash.com/photo-1775217434748-0bd010512413?auto=format&fit=crop&w=1200&q=70",
];

// Hero dashboard mock numbers
export const dashNumbers = {
  protection: 2000000,
  protectionLabel: "2 000 000",
  balance: 1236000,
  savings: 230000,
  bars: [12, 28, 20, 44, 62, 58, 80, 72, 90],
  weekBars: [40, 65, 50, 80, 70, 95, 60],
};

// Calculator (orientation only)
export const calcDefaults = { age: 32, monthly: 1500, years: 25 };
export const calcLimits = { age: [18, 60], monthly: [500, 6000], years: [10, 40] };

export function computeQuote({ age, monthly, years }) {
  const rate = 0.04 / 12;
  const n = years * 12;
  const invested = monthly * 0.6; // 60 % goes into savings
  const fv = invested * ((Math.pow(1 + rate, n) - 1) / rate);
  const ageFactor = Math.max(0.5, 1.6 - (age - 18) * 0.02);
  const protection = Math.min(Math.round((monthly * 1500 * ageFactor) / 100000) * 100000, 10000000);
  return {
    protection,
    pension: Math.round(fv / 1000) * 1000,
    monthlyPension: Math.round(fv / 240 / 100) * 100,
  };
}

export const formatCzk = (n) =>
  new Intl.NumberFormat("cs-CZ", { maximumFractionDigits: 0 }).format(n).replace(/\u00a0/g, " ") + " Kč";

// Leads are stored via backend API – see /src/lib/api.js (createLead).

export const partnerLogos = [
  "Allianz", "Generali", "Kooperativa", "ČSOB", "UNIQA", "MetLife", "NN", "AXA", "Simplea", "Pillow", "Direct", "ČPP",
  "Youplus", "Maxima", "Slavia", "Colonnade", "HVP", "BNP", "Cardif", "Komerční", "Raiffeisen", "ČS", "Moneta", "Air Bank",
];
