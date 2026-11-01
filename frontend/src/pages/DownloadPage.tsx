import { Link } from "@tanstack/react-router";
import { Logo } from "../components/Logo";
import { AlarmIcon, AlertIcon, CheckIcon, DownloadIcon, PhoneIcon } from "../components/icons";
import { APK_URL, APK_VERSION } from "../lib/links";
import { useAuthStore } from "../stores/auth.store";

const fitur = [
  {
    icon: AlarmIcon,
    tone: "bg-mendekati-bg text-mendekati",
    judul: "Deadline < 24 jam naik ke atas",
    isi: "Tugas yang hampir habis waktunya ditandai oranye dan selalu tampil paling atas.",
  },
  {
    icon: AlertIcon,
    tone: "bg-overdue-bg text-overdue",
    judul: "Yang terlambat tetap terlihat",
    isi: "Tugas lewat deadline ditandai berbeda, jadi tidak hilang dari daftar.",
  },
  {
    icon: CheckIcon,
    tone: "bg-selesai-bg text-selesai-fg",
    judul: "Satu akun, web & HP",
    isi: "Masuk dengan akun yang sama; data tugasmu sinkron di web dan aplikasi.",
  },
];

const langkah = [
  "Ketuk tombol Unduh APK, lalu unduh file dari Google Drive.",
  "Buka file app-release.apk dari folder Unduhan.",
  "Jika diminta, izinkan pemasangan dari sumber ini (Install unknown apps).",
  "Buka StudyTrack dan masuk dengan akun yang sama seperti di web.",
];

export function DownloadPage() {
  const tersedia = APK_URL.length > 0;
  const loggedIn = useAuthStore((s) => s.token !== null);
  const appLink = loggedIn ? "/tugas" : "/login";

  return (
    <div className="min-h-screen bg-page text-ink">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-5 py-5 md:px-8">
        <Logo />
        <Link
          to={appLink}
          className="inline-flex min-h-11 items-center rounded-control px-4 text-sm font-bold text-brand-600 hover:bg-brand-50"
        >
          {loggedIn ? "Buka aplikasi" : "Masuk di web"}
        </Link>
      </header>

      <main className="mx-auto flex max-w-5xl flex-col gap-12 px-5 pb-16 md:px-8">
        {/* Hero */}
        <section className="relative overflow-hidden rounded-[28px] bg-brand-500 px-6 py-10 text-white md:px-12 md:py-14">
          <div aria-hidden="true" className="absolute -top-16 -right-16 size-56 rounded-full bg-brand-400" />
          <div
            aria-hidden="true"
            className="absolute right-8 bottom-8 hidden size-24 rotate-12 rounded-[24px] bg-brand-cyan-400 md:block"
          />
          <div aria-hidden="true" className="absolute right-40 bottom-4 hidden size-12 rounded-full bg-brand-lemon-200 md:block" />

          <div className="relative flex max-w-xl flex-col gap-6">
            <span className="inline-flex w-fit items-center gap-2 rounded-pill bg-white/15 px-3 py-1 text-sm font-semibold">
              <PhoneIcon width={16} height={16} /> Aplikasi Android
            </span>
            <h1 className="text-[34px] leading-[1.1] font-extrabold tracking-tight md:text-5xl">
              StudyTrack sekarang ada di HP-mu.
            </h1>
            <p className="text-base leading-relaxed md:text-lg">
              Semua tugas kuliah dalam satu daftar. Deadline yang tinggal kurang dari 24 jam langsung naik ke
              paling atas, jadi tidak ada yang terlewat.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              {tersedia ? (
                <a
                  href={APK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-13 items-center justify-center gap-2 rounded-[14px] bg-white px-6 text-base font-bold text-brand-600 transition-transform hover:bg-brand-50 active:scale-[0.97]"
                >
                  <DownloadIcon /> Unduh APK
                </a>
              ) : (
                <span className="inline-flex min-h-13 items-center justify-center rounded-[14px] bg-white/20 px-6 text-base font-bold">
                  Segera tersedia
                </span>
              )}
              <span className="text-sm">
                Versi {APK_VERSION} · Android · lewat Google Drive
              </span>
            </div>
          </div>
        </section>

        {/* Fitur */}
        <section aria-labelledby="fitur" className="flex flex-col gap-5">
          <h2 id="fitur" className="text-2xl font-extrabold tracking-tight">
            Kenapa pakai StudyTrack
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {fitur.map(({ icon: Icon, tone, judul, isi }) => (
              <article key={judul} className="flex flex-col gap-3 rounded-card border border-line bg-surface p-6">
                <div className={`flex size-11 items-center justify-center rounded-control ${tone}`}>
                  <Icon width={22} height={22} />
                </div>
                <h3 className="text-lg font-bold">{judul}</h3>
                <p className="text-[15px] leading-relaxed text-muted">{isi}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Cara pasang */}
        <section aria-labelledby="pasang" className="grid gap-6 rounded-card border border-line bg-surface p-6 md:grid-cols-[1fr_1.4fr] md:p-10">
          <div className="flex flex-col gap-3">
            <h2 id="pasang" className="text-2xl font-extrabold tracking-tight">
              Cara memasang
            </h2>
            <p className="text-[15px] leading-relaxed text-muted">
              APK dibagikan langsung lewat Google Drive, belum melalui Play Store. Android akan meminta izin sekali
              sebelum memasang.
            </p>
          </div>
          <ol className="flex flex-col gap-4">
            {langkah.map((teks, i) => (
              <li key={teks} className="flex gap-4">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-pill bg-brand-50 text-sm font-extrabold text-brand-600">
                  {i + 1}
                </span>
                <p className="pt-1.5 text-[15px] leading-relaxed">{teks}</p>
              </li>
            ))}
          </ol>
        </section>

        <p className="text-center text-sm text-muted">
          Pakai laptop?{" "}
          <Link to={appLink} className="font-bold">
            Buka StudyTrack versi web
          </Link>
        </p>
      </main>
    </div>
  );
}
