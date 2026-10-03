const LOCALE = "ca-ES";

// Dosi en mSv amb decimals adaptats a la magnitud (0,0004 → "0,0004"; 3,4217 → "3,42").
export function formatDose(mSv, { min = 2 } = {}) {
  if (!mSv) return "0";
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
