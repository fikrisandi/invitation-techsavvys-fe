const BULAN: Record<string, number> = {
  januari: 0, februari: 1, maret: 2, april: 3, mei: 4, juni: 5,
  juli: 6, agustus: 7, september: 8, oktober: 9, november: 10, desember: 11,
};

export function parseEventDate(dateStr: string): Date | null {
  if (!dateStr) return null;

  // Try ISO format first (2029-07-20)
  const iso = new Date(dateStr);
  if (!isNaN(iso.getTime())) return iso;

  // Parse Indonesian: "Sabtu, 20 Juli 2029" or "20 Juli 2029"
  const match = dateStr.match(/(\d{1,2})\s+(\w+)\s+(\d{4})/);
  if (match) {
    const day = parseInt(match[1], 10);
    const month = BULAN[match[2].toLowerCase()];
    const year = parseInt(match[3], 10);
    if (month !== undefined) {
      return new Date(year, month, day);
    }
  }

  return null;
}
