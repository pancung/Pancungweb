// Funnel measurement. Every event lands in window.dataLayer (no third party involved);
// the Meta Pixel is loaded only when REACT_APP_META_PIXEL_ID is set AND the visitor
// accepted all cookies in the banner. Funnel steps:
//   ViewContent (topic page) → CalculatorStart → Lead (form sent) → Schedule (booking opened)

const PIXEL_ID = process.env.REACT_APP_META_PIXEL_ID;
const CONSENT_KEY = "tcat_cookie_consent";
const STANDARD = new Set(["PageView", "ViewContent", "Lead", "Schedule"]);

const hasConsent = () => {
  try {
    return localStorage.getItem(CONSENT_KEY) === "all";
  } catch {
    return false;
  }
};

let pixelLoaded = false;
function loadPixel() {
  if (pixelLoaded || !PIXEL_ID || !hasConsent()) return;
  pixelLoaded = true;
  /* eslint-disable */
  !(function (f, b, e, v, n, t, s) {
    if (f.fbq) return;
    n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
    if (!f._fbq) f._fbq = n;
    n.push = n; n.loaded = !0; n.version = "2.0"; n.queue = [];
    t = b.createElement(e); t.async = !0; t.src = v;
    s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
  })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
  /* eslint-enable */
  window.fbq("init", PIXEL_ID);
  window.fbq("track", "PageView");
}

if (typeof window !== "undefined") {
  loadPixel();
  // The cookie banner fires this after the visitor decides.
  window.addEventListener("tcat-consent", loadPixel);
}

export function track(event, params = {}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
  if (window.fbq && pixelLoaded) {
    window.fbq(STANDARD.has(event) ? "track" : "trackCustom", event, params);
  }
}
