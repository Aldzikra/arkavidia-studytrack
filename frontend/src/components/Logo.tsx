// Tanda centang yang sama dengan ikon aplikasi (assets/icon/icon.png).
function AppMark({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 1024 1024" fill="none" aria-hidden="true">
      <path d="M298 527 455 674 740 364" stroke="currentColor" strokeWidth="80" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

interface LogoProps {
  // "light" = kotak putih di atas panel biru (halaman masuk).
  tone?: "brand" | "light";
  size?: "sm" | "md";
}

export function Logo({ tone = "brand", size = "md" }: LogoProps) {
  const light = tone === "light";
  const sm = size === "sm";

  return (
    <div className={`flex items-center ${sm ? "gap-2" : "gap-2.5"}`}>
      <div
        className={`flex items-center justify-center ${
          sm ? "size-8 rounded-[9px]" : "size-9 rounded-control"
        } ${light ? "bg-white text-brand-500" : "bg-brand-500 text-white"}`}
      >
        <AppMark size={sm ? 30 : 34} />
      </div>
      <span
        className={`font-extrabold tracking-tight ${sm ? "text-[17px]" : "text-[19px]"} ${
          light ? "text-white" : "text-ink"
        }`}
      >
        StudyTrack
      </span>
    </div>
  );
}
