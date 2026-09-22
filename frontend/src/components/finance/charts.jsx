import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView, useMotionValue, animate, useReducedMotion } from "framer-motion";

export const GOLD = "#D9B44A";
export const GOLD_DARK = "#B3953A";
export const INK = "#1C2418";
export const KHAKI = "#5C6B3C";
export const KHAKI_LIGHT = "#8A9A5B";
export const CREAM = "#F1E6C4";

export const fmtCzk = (n) => new Intl.NumberFormat("cs-CZ", { maximumFractionDigits: 0 }).format(Math.round(n)).replace(/\u00a0/g, " ") + " Kč";
export const fmtShort = (n) => (n >= 1e6 ? (n / 1e6).toFixed(n >= 1e7 ? 0 : 1).replace(".", ",") + " M" : n >= 1e3 ? Math.round(n / 1e3) + " tis." : String(Math.round(n)));

/** Count-up number, animates once when entering viewport */
export function CountUp({ value, format = (v) => Math.round(v).toLocaleString("cs-CZ"), duration = 1.6, className = "", suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();
  const mv = useMotionValue(0);
  const [text, setText] = useState(format(0));
  useEffect(() => {
    if (!inView) return;
    if (reduce) { setText(format(value)); return; }
    const controls = animate(mv, value, { duration, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setText(format(v)) });
    return () => controls.stop();
  }, [inView, value, reduce]); // eslint-disable-line react-hooks/exhaustive-deps
  return <span ref={ref} className={`tabular-nums ${className}`}>{text}{suffix}</span>;
}

function smoothPath(pts) {
  if (pts.length < 2) return "";
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1];
    const [x1, y1] = pts[i];
    const cx = (x0 + x1) / 2;
    d += ` C${cx},${y0} ${cx},${y1} ${x1},${y1}`;
  }
  return d;
}

/**
 * Minimal premium line chart. data: number[]; labels: string[] (same length or sparse via `labelEvery`).
 */
export function LineChart({
  data, width = 640, height = 280, pad = { top: 24, right: 16, bottom: 30, left: 8 },
  stroke = GOLD, area = true, grid = 4, labels = [], dark = false, strokeWidth = 2.5,
  markers = [], hover = true, tooltip, yMax, refLine, className = "", id = "lc",
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduce = useReducedMotion();
  const [hi, setHi] = useState(null);
  const n = data.length;
  const innerW = width - pad.left - pad.right;
  const innerH = height - pad.top - pad.bottom;
  const max = (yMax || Math.max(...data, 1)) * 1.04;
  const pts = useMemo(() => data.map((v, i) => [pad.left + (i * innerW) / Math.max(n - 1, 1), pad.top + innerH - (v / max) * innerH]), [data, innerW, innerH, max, n, pad.left, pad.top]);
  const d = smoothPath(pts);
  const areaD = `${d} L${pts[n - 1][0]},${pad.top + innerH} L${pts[0][0]},${pad.top + innerH} Z`;
  const gridColor = dark ? "rgba(255,255,255,0.08)" : "rgba(28,36,24,0.08)";
  const textColor = dark ? "rgba(255,255,255,0.45)" : "rgba(28,36,24,0.45)";

  const onMove = (e) => {
    if (!hover) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * width;
    const idx = Math.round(((x - pad.left) / innerW) * (n - 1));
    setHi(Math.max(0, Math.min(n - 1, idx)));
  };

  const drawn = inView || reduce;
  const mountedRef = useRef(false);
  useEffect(() => { mountedRef.current = true; }, []);
  const first = !mountedRef.current;

  return (
    <div ref={ref} className={`relative ${className}`} onMouseMove={onMove} onMouseLeave={() => setHi(null)} onTouchStart={(e) => onMove(e.touches[0] ? { currentTarget: e.currentTarget, clientX: e.touches[0].clientX } : e)}>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full overflow-visible" role="img">
        <defs>
          <linearGradient id={`${id}-fill`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor={stroke} stopOpacity={dark ? 0.35 : 0.28} />
            <stop offset="1" stopColor={stroke} stopOpacity="0" />
          </linearGradient>
        </defs>
        {Array.from({ length: grid + 1 }).map((_, i) => {
          const y = pad.top + (innerH * i) / grid;
          return <line key={i} x1={pad.left} x2={width - pad.right} y1={y} y2={y} stroke={gridColor} strokeWidth="1" />;
        })}
        {refLine && refLine.value <= max && (
          <g>
            <line x1={pad.left} x2={width - pad.right} y1={pad.top + innerH - (refLine.value / max) * innerH} y2={pad.top + innerH - (refLine.value / max) * innerH} stroke={stroke} strokeOpacity="0.7" strokeDasharray="6 5" />
            <text x={pad.left + 4} y={pad.top + innerH - (refLine.value / max) * innerH - 6} textAnchor="start" fontSize="11" fontWeight="600" fill={stroke} fontFamily="Figtree, sans-serif">{refLine.label}</text>
          </g>
        )}
        {area && <motion.path key={`area-${n}`} d={areaD} fill={`url(#${id}-fill)`} initial={first ? { opacity: 0, d: areaD } : false} animate={{ opacity: drawn ? 1 : 0, d: areaD }} transition={{ opacity: { duration: 1, delay: 0.8 }, d: { duration: 0.6, ease: "easeOut" } }} />}
        <motion.path
          key={`line-${n}`}
          d={d} fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
          initial={first ? { pathLength: 0, opacity: 0, d } : false}
          animate={{ pathLength: drawn ? 1 : 0, opacity: drawn ? 1 : 0, d }}
          transition={{ pathLength: { duration: reduce ? 0 : 1.6, ease: "easeInOut" }, opacity: { duration: 0.3 }, d: { duration: 0.6, ease: "easeOut" } }}
        />
        {markers.map((m, k) => {
          const p = pts[Math.min(m.i, n - 1)];
          if (!p) return null;
          return (
            <motion.g key={k} initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: drawn ? 1 : 0, scale: drawn ? 1 : 0.6 }} transition={{ delay: reduce ? 0 : 0.9 + k * 0.15 }} style={{ transformOrigin: `${p[0]}px ${p[1]}px` }}>
              <line x1={p[0]} x2={p[0]} y1={p[1]} y2={pad.top + innerH} stroke={gridColor} strokeDasharray="3 4" />
              <circle cx={p[0]} cy={p[1]} r="5" fill={dark ? INK : "#fff"} stroke={stroke} strokeWidth="2.5" />
              {m.label && <text x={p[0]} y={pad.top + innerH + 20} textAnchor={m.i === 0 ? "start" : m.i >= n - 1 ? "end" : "middle"} fontSize="11" fill={textColor} fontFamily="Figtree, sans-serif" fontWeight="500">{m.label}</text>}
            </motion.g>
          );
        })}
        {labels.map((l, i) => l ? <text key={i} x={pts[i][0]} y={height - 6} textAnchor={i === 0 ? "start" : i === n - 1 ? "end" : "middle"} fontSize="11" fill={textColor} fontFamily="Figtree, sans-serif">{l}</text> : null)}
        {hi !== null && (
          <g>
            <line x1={pts[hi][0]} x2={pts[hi][0]} y1={pad.top} y2={pad.top + innerH} stroke={stroke} strokeOpacity="0.5" strokeDasharray="3 4" />
            <circle cx={pts[hi][0]} cy={pts[hi][1]} r="6" fill={stroke} stroke={dark ? INK : "#fff"} strokeWidth="3" />
          </g>
        )}
      </svg>
      {hi !== null && tooltip && (
        <div
          className={`pointer-events-none absolute -translate-x-1/2 -translate-y-full rounded-[10px] px-3 py-2 text-[12px] shadow-xl ${dark ? "bg-white text-[#1C2418]" : "bg-[#1C2418] text-white"}`}
          style={{ left: `${(pts[hi][0] / width) * 100}%`, top: `${(pts[hi][1] / height) * 100 - 4}%` }}
        >
          {tooltip(hi, data[hi])}
        </div>
      )}
    </div>
  );
}

function arcPath(cx, cy, r, start, end) {
  const a0 = (start - 90) * (Math.PI / 180);
  const a1 = (end - 90) * (Math.PI / 180);
  const x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0);
  const x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
  const large = end - start > 180 ? 1 : 0;
  return `M${x0},${y0} A${r},${r} 0 ${large} 1 ${x1},${y1}`;
}

/** Asset allocation donut. segments: [{n, p}] */
export function Donut({ segments, size = 140, thickness = 16, colors = [GOLD, KHAKI, KHAKI_LIGHT, CREAM], center, dark = false }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();
  const r = size / 2 - thickness / 2;
  let acc = 0;
  return (
    <div ref={ref} className="relative" style={{ width: size, height: size }}>
      <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={dark ? "rgba(255,255,255,0.08)" : "rgba(28,36,24,0.06)"} strokeWidth={thickness} />
        {segments.map((s, i) => {
          const start = acc * 3.6;
          acc += s.p;
          const end = Math.min(acc * 3.6, 359.9) - 2;
          return (
            <motion.path key={s.n} d={arcPath(size / 2, size / 2, r, start, end)} fill="none" stroke={colors[i % colors.length]} strokeWidth={thickness} strokeLinecap="butt"
              initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: inView || reduce ? 1 : 0, opacity: inView || reduce ? 1 : 0 }} transition={{ duration: reduce ? 0 : 1, delay: reduce ? 0 : 0.15 * i, ease: "easeOut" }} />
          );
        })}
      </svg>
      {center && <div className="absolute inset-0 flex flex-col items-center justify-center text-center">{center}</div>}
    </div>
  );
}

/** Progress ring */
export function Ring({ value = 0.68, size = 120, thickness = 12, color = GOLD, track = "rgba(28,36,24,0.08)", children }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();
  const r = size / 2 - thickness / 2;
  return (
    <div ref={ref} className="relative" style={{ width: size, height: size }}>
      <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={track} strokeWidth={thickness} />
        <motion.path d={arcPath(size / 2, size / 2, r, 0, Math.max(1, value * 359.9))} fill="none" stroke={color} strokeWidth={thickness} strokeLinecap="round"
          initial={{ pathLength: 0 }} animate={{ pathLength: inView || reduce ? 1 : 0 }} transition={{ duration: reduce ? 0 : 1.4, ease: "easeOut" }} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">{children}</div>
    </div>
  );
}

/** Semi-circular score gauge, value 0..1 */
export function Gauge({ value = 0.74, width = 160, color = GOLD, track = "rgba(28,36,24,0.08)", children }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();
  const r = width / 2 - 10;
  const cx = width / 2, cy = width / 2;
  const bg = arcPath(cx, cy, r, -90, 90);
  const fg = arcPath(cx, cy, r, -90, -90 + 180 * value);
  return (
    <div ref={ref} className="relative" style={{ width, height: width / 2 + 12 }}>
      <svg viewBox={`0 0 ${width} ${width / 2 + 12}`} width={width} height={width / 2 + 12} className="overflow-visible">
        <path d={bg} fill="none" stroke={track} strokeWidth="12" strokeLinecap="round" />
        <motion.path d={fg} fill="none" stroke={color} strokeWidth="12" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: inView || reduce ? 1 : 0 }} transition={{ duration: reduce ? 0 : 1.4, ease: "easeOut" }} />
      </svg>
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center">{children}</div>
    </div>
  );
}

/** Tiny sparkline for rows */
export function Sparkline({ data = [3, 5, 4, 7, 6, 9, 11], w = 64, h = 20, color = KHAKI_LIGHT }) {
  const max = Math.max(...data), min = Math.min(...data);
  const pts = data.map((v, i) => [(i * w) / (data.length - 1), h - ((v - min) / Math.max(max - min, 1)) * (h - 2) - 1]);
  return <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h} className="overflow-visible"><path d={smoothPath(pts)} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" /></svg>;
}

/** Compound growth series: monthly contribution, years, annual return -> yearly values */
export function growthSeries(monthly, years, annualReturn) {
  const r = annualReturn / 12;
  const out = [0];
  let v = 0;
  for (let m = 1; m <= years * 12; m++) {
    v = v * (1 + r) + monthly;
    if (m % 12 === 0) out.push(v);
  }
  return out;
}
