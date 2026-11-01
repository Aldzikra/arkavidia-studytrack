import { Link } from "@tanstack/react-router";
import { MotionConfig, motion } from "motion/react";
import type { Variants } from "motion/react";
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

const contohTugas = [
  { matkul: "Analisis Desain Data", judul: "Normalisasi Data", label: "Sisa 20 jam", kind: "mendekati" },
  { matkul: "Basis Data", judul: "Tabel Normalisasi", label: "Terlambat 1 jam", kind: "overdue" },
  { matkul: "Pemrograman Web", judul: "Desain ERD Toko Roti", label: "Kam, 5 Nov", kind: "normal" },
] as const;

const ease = [0.22, 1, 0.36, 1] as const;

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

const reveal = {
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, amount: 0.25 },
} as const;

function PhoneMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotate: 6 }}
      animate={{ opacity: 1, y: 0, rotate: -4 }}
      transition={{ duration: 0.9, delay: 0.35, ease }}
      className="relative mx-auto w-[260px] md:w-[300px]"
    >
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="rounded-[40px] border-[10px] border-ink bg-page p-4 shadow-[0_40px_80px_-20px_rgba(15,27,51,0.55)]"
      >
        <div className="mx-auto mb-4 h-1.5 w-16 rounded-pill bg-ink/20" />
        <p className="mb-3 text-lg font-extrabold text-ink">Tugas</p>
        <div className="flex flex-col gap-3">
          {contohTugas.map((t, i) => (
            <motion.div
              key={t.judul}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.9 + i * 0.18, ease }}
              className={`rounded-2xl bg-surface p-3 text-left ${
                t.kind === "mendekati"
                  ? "border-2 border-mendekati"
                  : t.kind === "overdue"
                    ? "border-2 border-dashed border-overdue/50 bg-overdue-bg"
                    : "border border-line"
              }`}
            >
              <p className="text-[11px] text-muted">{t.matkul}</p>
              <p className="text-sm font-bold text-ink">{t.judul}</p>
              <span
                className={`mt-2 inline-block rounded-pill px-2 py-0.5 text-[11px] font-bold ${
                  t.kind === "mendekati"
                    ? "bg-mendekati text-white"
                    : t.kind === "overdue"
                      ? "bg-overdue text-white"
                      : "bg-brand-50 text-brand-600"
                }`}
              >
                {t.label}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function DownloadPage() {
  const tersedia = APK_URL.length > 0;
  const loggedIn = useAuthStore((s) => s.token !== null);
  const appLink = loggedIn ? "/tugas" : "/login";

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen overflow-x-hidden bg-page text-ink">
        {/* Hero layar penuh */}
        <section className="relative flex min-h-svh flex-col overflow-hidden bg-brand-500 text-white">
          <motion.div
            aria-hidden="true"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.1, ease }}
            className="absolute -top-32 -right-32 size-[420px] rounded-full bg-brand-400"
          />
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0, x: 80, y: 80, rotate: 40 }}
            animate={{ opacity: 1, x: 0, y: 0, rotate: 12 }}
            transition={{ duration: 0.9, delay: 0.3, ease }}
            className="absolute bottom-16 left-[8%] hidden size-28 rounded-[28px] bg-brand-cyan-400 md:block"
          />
          <motion.div
            aria-hidden="true"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, y: [0, -14, 0] }}
            transition={{
              scale: { duration: 0.6, delay: 0.5 },
              opacity: { duration: 0.6, delay: 0.5 },
              y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.2 },
            }}
            className="absolute top-[30%] left-[46%] hidden size-14 rounded-full bg-brand-lemon-200 md:block"
          />

          <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-5 md:px-8">
            <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Logo tone="light" />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
              <Link
                to={appLink}
                className="inline-flex min-h-11 items-center rounded-control bg-white/15 px-4 text-sm font-bold text-white backdrop-blur transition-colors hover:bg-white/25"
              >
                {loggedIn ? "Buka aplikasi" : "Masuk di web"}
              </Link>
            </motion.div>
          </header>

          <div className="relative z-10 mx-auto grid w-full max-w-6xl flex-1 items-center gap-12 px-5 pt-6 pb-16 md:grid-cols-[1.15fr_1fr] md:px-8">
            <motion.div variants={stagger} initial="hidden" animate="visible" className="flex flex-col gap-6">
              <motion.span
                variants={fadeUp}
                className="inline-flex w-fit items-center gap-2 rounded-pill bg-white/15 px-3 py-1 text-sm font-semibold"
              >
                <PhoneIcon width={16} height={16} /> Aplikasi Android
              </motion.span>
              <motion.h1
                variants={fadeUp}
                className="text-[40px] leading-[1.05] font-extrabold tracking-tight md:text-[64px]"
              >
                StudyTrack sekarang ada di HP-mu.
              </motion.h1>
              <motion.p variants={fadeUp} className="max-w-lg text-base leading-relaxed text-white/90 md:text-lg">
                Semua tugas kuliah dalam satu daftar. Deadline yang tinggal kurang dari 24 jam langsung naik ke
                paling atas, jadi tidak ada yang terlewat.
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-col gap-3 sm:flex-row sm:items-center">
                {tersedia ? (
                  <motion.a
                    href={APK_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex min-h-14 items-center justify-center gap-2 rounded-[16px] bg-white px-7 text-base font-bold text-brand-600 shadow-[0_12px_30px_-8px_rgba(15,27,51,0.45)]"
                  >
                    <DownloadIcon /> Unduh APK
                  </motion.a>
                ) : (
                  <span className="inline-flex min-h-14 items-center justify-center rounded-[16px] bg-white/20 px-7 text-base font-bold">
                    Segera tersedia
                  </span>
                )}
                <span className="text-sm text-white/85">Versi {APK_VERSION} · Android · lewat Google Drive</span>
              </motion.div>
            </motion.div>

            <PhoneMockup />
          </div>

          <motion.a
            href="#fitur"
            aria-label="Gulir ke fitur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 8, 0] }}
            transition={{ opacity: { delay: 1.6 }, y: { duration: 1.8, repeat: Infinity, ease: "easeInOut" } }}
            className="relative z-10 mx-auto mb-6 flex size-11 items-center justify-center rounded-full bg-white/15 text-xl"
          >
            ↓
          </motion.a>
        </section>

        <main className="mx-auto flex max-w-6xl flex-col gap-20 px-5 py-20 md:px-8">
          {/* Fitur */}
          <motion.section id="fitur" aria-labelledby="fitur-judul" variants={stagger} {...reveal} className="flex scroll-mt-8 flex-col gap-6">
            <motion.h2 variants={fadeUp} id="fitur-judul" className="text-3xl font-extrabold tracking-tight md:text-4xl">
              Kenapa pakai StudyTrack
            </motion.h2>
            <div className="grid gap-5 md:grid-cols-3">
              {fitur.map(({ icon: Icon, tone, judul, isi }) => (
                <motion.article
                  key={judul}
                  variants={fadeUp}
                  whileHover={{ y: -6 }}
                  className="flex flex-col gap-3 rounded-card border border-line bg-surface p-7 transition-shadow hover:shadow-[0_20px_40px_-20px_rgba(35,115,244,0.35)]"
                >
                  <div className={`flex size-12 items-center justify-center rounded-control ${tone}`}>
                    <Icon width={24} height={24} />
                  </div>
                  <h3 className="text-lg font-bold">{judul}</h3>
                  <p className="text-[15px] leading-relaxed text-muted">{isi}</p>
                </motion.article>
              ))}
            </div>
          </motion.section>

          {/* Cara pasang */}
          <motion.section
            aria-labelledby="pasang"
            variants={stagger}
            {...reveal}
            className="grid gap-8 rounded-card border border-line bg-surface p-7 md:grid-cols-[1fr_1.4fr] md:p-12"
          >
            <motion.div variants={fadeUp} className="flex flex-col gap-3">
              <h2 id="pasang" className="text-3xl font-extrabold tracking-tight">
                Cara memasang
              </h2>
              <p className="text-[15px] leading-relaxed text-muted">
                APK dibagikan langsung lewat Google Drive, belum melalui Play Store. Android akan meminta izin sekali
                sebelum memasang.
              </p>
            </motion.div>
            <ol className="flex flex-col gap-5">
              {langkah.map((teks, i) => (
                <motion.li key={teks} variants={fadeUp} className="flex gap-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-pill bg-brand-500 text-sm font-extrabold text-white">
                    {i + 1}
                  </span>
                  <p className="pt-2 text-[15px] leading-relaxed">{teks}</p>
                </motion.li>
              ))}
            </ol>
          </motion.section>

          {/* CTA penutup */}
          <motion.section
            variants={fadeUp}
            {...reveal}
            className="flex flex-col items-center gap-5 rounded-[28px] bg-ink px-6 py-14 text-center text-white"
          >
            <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">Siap pantau tugasmu?</h2>
            <div className="flex flex-col gap-3 sm:flex-row">
              {tersedia && (
                <motion.a
                  href={APK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex min-h-13 items-center justify-center gap-2 rounded-[14px] bg-brand-500 px-6 font-bold"
                >
                  <DownloadIcon /> Unduh APK
                </motion.a>
              )}
              <Link
                to={appLink}
                className="inline-flex min-h-13 items-center justify-center rounded-[14px] border border-white/30 px-6 font-bold transition-colors hover:bg-white/10"
              >
                Buka versi web
              </Link>
            </div>
          </motion.section>
        </main>
      </div>
    </MotionConfig>
  );
}
