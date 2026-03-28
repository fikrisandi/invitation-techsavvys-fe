// SVG bank logos as data URIs — lightweight, no external requests
// Each logo is a simple text-based representation for clean display

const BANK_LOGOS: Record<string, { color: string; label: string }> = {
  bca: { color: "#003B7B", label: "BCA" },
  bri: { color: "#00529C", label: "BRI" },
  bni: { color: "#F05A22", label: "BNI" },
  mandiri: { color: "#003066", label: "Mandiri" },
  bsi: { color: "#00A651", label: "BSI" },
  cimb: { color: "#EC1C24", label: "CIMB Niaga" },
  permata: { color: "#005BAC", label: "Permata" },
  danamon: { color: "#FDDA24", label: "Danamon" },
  btn: { color: "#F7941D", label: "BTN" },
  mega: { color: "#00518A", label: "Mega" },
  ocbc: { color: "#EC1C24", label: "OCBC" },
  panin: { color: "#014FA1", label: "Panin" },
  muamalat: { color: "#7B2D8E", label: "Muamalat" },
  jago: { color: "#00C2FF", label: "Jago" },
  blu: { color: "#0066FF", label: "blu" },
  jenius: { color: "#00ABE7", label: "Jenius" },
  gopay: { color: "#00AED6", label: "GoPay" },
  ovo: { color: "#4C3494", label: "OVO" },
  dana: { color: "#108EE9", label: "DANA" },
  shopeepay: { color: "#EE4D2D", label: "ShopeePay" },
};

export function getBankInfo(bankName: string): { color: string; label: string } | null {
  const key = bankName.toLowerCase().replace(/[^a-z]/g, "");
  // Try exact match first
  if (BANK_LOGOS[key]) return BANK_LOGOS[key];
  // Try partial match
  for (const [k, v] of Object.entries(BANK_LOGOS)) {
    if (key.includes(k) || k.includes(key)) return v;
  }
  return null;
}
