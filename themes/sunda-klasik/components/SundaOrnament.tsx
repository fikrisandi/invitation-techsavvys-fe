"use client";

export function MegaMendung({ flip = false }: { flip?: boolean }) {
  const style = flip
    ? { display: "block", transform: "scaleY(-1)" }
    : { display: "block" };

  return (
    <svg
      width="400"
      height="60"
      viewBox="0 0 400 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
    >
      {/* Mega mendung — traditional Sundanese cloud pattern: layered arcs */}
      {/* Cloud group 1 - leftmost */}
      <path d="M0 55 C0 40 8 30 18 30 C18 20 26 12 36 12 C36 6 42 0 50 0 C58 0 64 6 64 12 C74 12 82 20 82 30 C92 30 100 40 100 55 Z" fill="var(--sunda-gold)" opacity="0.12" />
      <path d="M4 55 C4 42 11 33 20 33 C20 24 27 16 36 16 C36 11 42 5 50 5 C58 5 64 11 64 16 C73 16 80 24 80 33 C89 33 96 42 96 55 Z" fill="none" stroke="var(--sunda-gold)" strokeWidth="0.7" opacity="0.5" />
      <path d="M8 55 C8 44 14 36 22 36 C22 28 28 21 36 21 C36 17 41 11 50 11 C59 11 64 17 64 21 C72 21 78 28 78 36 C86 36 92 44 92 55 Z" fill="none" stroke="var(--sunda-gold)" strokeWidth="0.5" opacity="0.3" />

      {/* Cloud group 2 */}
      <path d="M80 55 C80 40 88 30 98 30 C98 20 106 12 116 12 C116 6 122 0 130 0 C138 0 144 6 144 12 C154 12 162 20 162 30 C172 30 180 40 180 55 Z" fill="var(--sunda-gold)" opacity="0.10" />
      <path d="M84 55 C84 42 91 33 100 33 C100 24 107 16 116 16 C116 11 122 5 130 5 C138 5 144 11 144 16 C153 16 160 24 160 33 C169 33 176 42 176 55 Z" fill="none" stroke="var(--sunda-gold)" strokeWidth="0.7" opacity="0.45" />
      <path d="M88 55 C88 44 94 36 102 36 C102 28 108 21 116 21 C116 17 121 11 130 11 C139 11 144 17 144 21 C152 21 158 28 158 36 C166 36 172 44 172 55 Z" fill="none" stroke="var(--sunda-gold)" strokeWidth="0.5" opacity="0.25" />

      {/* Cloud group 3 - center */}
      <path d="M160 55 C160 40 168 30 178 30 C178 20 186 12 196 12 C196 6 202 0 210 0 C218 0 224 6 224 12 C234 12 242 20 242 30 C252 30 260 40 260 55 Z" fill="var(--sunda-gold)" opacity="0.12" />
      <path d="M164 55 C164 42 171 33 180 33 C180 24 187 16 196 16 C196 11 202 5 210 5 C218 5 224 11 224 16 C233 16 240 24 240 33 C249 33 256 42 256 55 Z" fill="none" stroke="var(--sunda-gold)" strokeWidth="0.7" opacity="0.5" />
      <path d="M168 55 C168 44 174 36 182 36 C182 28 188 21 196 21 C196 17 201 11 210 11 C219 11 224 17 224 21 C232 21 238 28 238 36 C246 36 252 44 252 55 Z" fill="none" stroke="var(--sunda-gold)" strokeWidth="0.5" opacity="0.3" />

      {/* Cloud group 4 */}
      <path d="M240 55 C240 40 248 30 258 30 C258 20 266 12 276 12 C276 6 282 0 290 0 C298 0 304 6 304 12 C314 12 322 20 322 30 C332 30 340 40 340 55 Z" fill="var(--sunda-gold)" opacity="0.10" />
      <path d="M244 55 C244 42 251 33 260 33 C260 24 267 16 276 16 C276 11 282 5 290 5 C298 5 304 11 304 16 C313 16 320 24 320 33 C329 33 336 42 336 55 Z" fill="none" stroke="var(--sunda-gold)" strokeWidth="0.7" opacity="0.45" />
      <path d="M248 55 C248 44 254 36 262 36 C262 28 268 21 276 21 C276 17 281 11 290 11 C299 11 304 17 304 21 C312 21 318 28 318 36 C326 36 332 44 332 55 Z" fill="none" stroke="var(--sunda-gold)" strokeWidth="0.5" opacity="0.25" />

      {/* Cloud group 5 - rightmost */}
      <path d="M320 55 C320 40 328 30 338 30 C338 20 346 12 356 12 C356 6 362 0 370 0 C378 0 384 6 384 12 C394 12 400 20 400 30 L400 55 Z" fill="var(--sunda-gold)" opacity="0.12" />
      <path d="M324 55 C324 42 331 33 340 33 C340 24 347 16 356 16 C356 11 362 5 370 5 C378 5 384 11 384 16 C393 16 399 24 399 33 L400 55 Z" fill="none" stroke="var(--sunda-gold)" strokeWidth="0.7" opacity="0.5" />
    </svg>
  );
}

export function KujangIcon() {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "inline-block" }}
    >
      {/* Simplified kujang silhouette — traditional Sundanese ceremonial weapon */}
      {/* Blade: curved, wider at top, tapering */}
      <path
        d="M8 2 C8 2 22 4 26 10 C28 14 26 18 22 20 C18 22 14 22 12 24 C10 26 10 28 8 28 C6 28 4 26 5 24 C6 22 8 20 8 18 C8 14 6 10 6 6 Z"
        fill="none"
        stroke="var(--sunda-gold)"
        strokeWidth="0.8"
        strokeLinejoin="round"
      />
      {/* Blade inner line */}
      <path
        d="M9 5 C9 5 20 7 23 12 C25 15 23 19 20 20"
        stroke="var(--sunda-gold)"
        strokeWidth="0.5"
        opacity="0.5"
        strokeLinecap="round"
      />
      {/* Handle */}
      <path
        d="M8 28 L6 28 C5 28 4 27 4 26 L4 24 C4 23 5 22 6 22 L8 22"
        stroke="var(--sunda-gold)"
        strokeWidth="0.8"
        fill="none"
        strokeLinejoin="round"
      />
      {/* Decorative hole in blade */}
      <circle cx="14" cy="12" r="2" stroke="var(--sunda-gold)" strokeWidth="0.6" fill="none" />
      {/* Small accent dots */}
      <circle cx="19" cy="9" r="0.8" fill="var(--sunda-gold)" opacity="0.6" />
      <circle cx="10" cy="20" r="0.8" fill="var(--sunda-gold)" opacity="0.6" />
    </svg>
  );
}

export function SundaDivider() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
      <MegaMendung />
      <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "4px 0" }}>
        <div style={{ width: "60px", height: "1px", background: "linear-gradient(to right, transparent, var(--sunda-gold))", opacity: 0.4 }} />
        <KujangIcon />
        <div style={{ width: "60px", height: "1px", background: "linear-gradient(to left, transparent, var(--sunda-gold))", opacity: 0.4 }} />
      </div>
      <MegaMendung flip />
    </div>
  );
}
