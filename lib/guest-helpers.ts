export const INVITATION_URL =
  process.env.NEXT_PUBLIC_INVITATION_URL || "https://invitation.techsavvys-official.com";

export const DEFAULT_BCAST_TEMPLATE = `*Undangan Pernikahan*

Assalamu'alaikum Warahmatullahi Wabarakatuh

Kepada Yth.
Bapak/Ibu/Saudara/i *{nama}*
Di Tempat

Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan kami:

*{pasangan}*

🗓 {hari}, {tanggal}
🕐 {waktu}
📍 {lokasi}

Informasi lengkap, peta lokasi, dan konfirmasi kehadiran dapat diakses melalui tautan berikut:
{link}

Merupakan kehormatan besar bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.

Atas perhatian dan kehadirannya, kami ucapkan terima kasih.

Wassalamu'alaikum Warahmatullahi Wabarakatuh

Hormat kami,
Kedua Mempelai`;

const DAYS_ID = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
const MONTHS_ID = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];

export function formatDateId(dateStr: string): { day: string; date: string } {
  if (!dateStr) return { day: "", date: "" };
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return { day: "", date: dateStr };
  return {
    day: DAYS_ID[d.getDay()],
    date: `${d.getDate()} ${MONTHS_ID[d.getMonth()]} ${d.getFullYear()}`,
  };
}

export interface BroadcastCtx {
  groomNickname: string;
  groomFullName: string;
  brideNickname: string;
  brideFullName: string;
  receptions: Array<{
    code: string;
    title?: string;
    date?: string;
    time?: string;
    location?: string;
  }>;
}

export function buildBroadcast(
  template: string,
  guest: { name: string; receptions: string[] },
  link: string,
  ctx: BroadcastCtx
): string {
  const firstCode = guest.receptions[0];
  const reception =
    ctx.receptions.find((r) => r.code === firstCode) || ctx.receptions[0] || null;
  const { day, date } = formatDateId(reception?.date || "");
  return template
    .replaceAll("{nama}", guest.name)
    .replaceAll("{link}", link)
    .replaceAll("{pasangan}", `${ctx.groomNickname} & ${ctx.brideNickname}`)
    .replaceAll("{groom}", ctx.groomFullName)
    .replaceAll("{bride}", ctx.brideFullName)
    .replaceAll("{hari}", day)
    .replaceAll("{tanggal}", date)
    .replaceAll("{waktu}", reception?.time || "")
    .replaceAll("{lokasi}", reception?.location || reception?.title || "");
}

export function normalizePhoneForWa(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("62")) return digits;
  if (digits.startsWith("0")) return "62" + digits.slice(1);
  if (digits.startsWith("8")) return "62" + digits;
  return digits;
}

export function generateInvitationLink(theme: string, slug: string, guestName: string): string {
  return `${INVITATION_URL}/${theme}/${slug}?to=${encodeURIComponent(guestName)}`;
}
