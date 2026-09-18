import React from "react";
import { Link } from "react-router-dom";

// Brand mark: lime rounded tile with a dark lotus/shield mark, followed by lowercase wordmark (Teya-like style)
export default function Logo({ dark = false, className = "", size = 28 }) {
  return (
    <Link to="/" className={`inline-flex items-center gap-2 select-none ${className}`} data-testid="brand-logo" aria-label="Pan Čung">
      <span
        className="inline-flex items-center justify-center rounded-[8px] bg-[#D9B44A]"
        style={{ width: size, height: size }}
      >
        <svg viewBox="0 0 24 24" width={size * 0.68} height={size * 0.68} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 3.5c1.8 2.2 2.7 4.5 2.7 7 0 3.6-1.2 6.5-2.7 8.6-1.5-2.1-2.7-5-2.7-8.6 0-2.5.9-4.8 2.7-7Z" fill="#1C2418" />
          <path d="M5.2 9.2c2.6.6 4.6 2.1 5.7 4.3.4 1 .7 2.2.7 3.5-2.9-.3-5.2-1.8-6.3-4.2-.4-1-.5-2.3-.1-3.6Z" fill="#1C2418" opacity=".85" />
          <path d="M18.8 9.2c.4 1.3.3 2.6-.1 3.6-1.1 2.4-3.4 3.9-6.3 4.2 0-1.3.3-2.5.7-3.5 1.1-2.2 3.1-3.7 5.7-4.3Z" fill="#1C2418" opacity=".85" />
        </svg>
      </span>
      <span className={`font-semibold tracking-tight leading-none ${dark ? "text-[#1C2418]" : "text-white"}`} style={{ fontSize: size * 0.72 }}>
        Pan Čung
      </span>
    </Link>
  );
}
