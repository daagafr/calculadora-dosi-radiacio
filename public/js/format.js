const LOCALE = "ca-ES";

// A partir de mil milions, notació científica perquè el número càpiga: "1,8 × 10²⁴"
const BIG = 1e9;
const SUPERSCRIPT = { "-": "⁻", 0: "⁰", 1: "¹", 2: "²", 3: "³", 4: "⁴", 5: "⁵", 6: "⁶", 7: "⁷", 8: "⁸", 9: "⁹" };

function formatScientific(n) {
  if (!Number.isFinite(n)) return "∞";
  const exponent = Math.floor(Math.log10(Math.abs(n)));
  const mantissa = n / 10 ** exponent;
  const sup = String(exponent).replace(/[-\d]/g, (c) => SUPERSCRIPT[c]);
  return `${new Intl.NumberFormat(LOCALE, { maximumFractionDigits: 1 }).format(mantissa)} × 10${sup}`;
}

// Dosi en mSv amb decimals adaptats a la magnitud (0,0004 → "0,0004"; 3,4217 → "3,42").
export function formatDose(mSv, { min = 2 } = {}) {
  if (!mSv) return "0";
  if (Math.abs(mSv) >= BIG) return formatScientific(mSv);
  const abs = Math.abs(mSv);
  let digits = min;
  if (abs < 0.01) digits = Math.max(min, 1 - Math.floor(Math.log10(abs)));
  if (abs >= 100) digits = 0;
  return new Intl.NumberFormat(LOCALE, {
    minimumFractionDigits: Math.min(digits, 2),
    maximumFractionDigits: Math.min(digits, 6),
    useGrouping: "always",
  }).format(mSv);
}

// Dosi petita expressada en µSv quan és més llegible (0,005 mSv → "5 µSv").
export function formatDoseAuto(mSv) {
  if (mSv > 0 && mSv < 0.1) {
    const uSv = mSv * 1000;
    const digits = uSv < 1 ? 2 : uSv < 10 ? 1 : 0;
    return `${new Intl.NumberFormat(LOCALE, { maximumFractionDigits: digits }).format(uSv)} µSv`;
  }
  return `${formatDose(mSv)} mSv`;
}

// Format compacte per a l'escala: "4,3 mSv", "1.000 mSv", "40 µSv"
export function formatDoseCompact(mSv) {
  if (mSv < 0.1) return formatDoseAuto(mSv);
  return `${new Intl.NumberFormat(LOCALE, { maximumFractionDigits: mSv >= 10 ? 0 : 1, useGrouping: "always" }).format(mSv)} mSv`;
}

export function formatNumber(n, digits = 0) {
  if (Math.abs(n) >= BIG) return formatScientific(n);
  return new Intl.NumberFormat(LOCALE, {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
    useGrouping: "always",
  }).format(n);
}

export function formatPercent(fraction) {
  const digits = fraction < 0.1 ? 1 : 0;
  return new Intl.NumberFormat(LOCALE, {
    style: "percent",
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(fraction);
}
