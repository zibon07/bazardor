export const unitLabel = (u) => UNIT_BN[u] ?? u;
const D = "০১২৩৪৫৬৭৮৯";
export const toBn = (n) => String(n).replace(/\d/g, (d) => D[d]);
export const fmtPrice = (n) => toBn(Number(n).toLocaleString("en-US"));

const UNIT_BN = { kg: "কেজি", litre: "লিটার", dozen: "ডজন", piece: "পিস" };
export const unitBn = (u) => `প্রতি ${UNIT_BN[u] ?? u}`;

export const changeInfo = ({ dir, pct }) => {
  const p = toBn(Math.abs(pct).toFixed(1));
  if (dir === "up") return { text: `▲ ${p}%`, cls: "text-error bg-error/10" };
  if (dir === "down") return { text: `▼ ${p}%`, cls: "text-success bg-success/10" };
  return { text: `— ${p}%`, cls: "text-base-content/60 bg-base-200" };
};