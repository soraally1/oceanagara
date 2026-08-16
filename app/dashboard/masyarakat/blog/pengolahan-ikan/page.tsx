'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { onAuthChange, getUserProfile } from '@/app/service/authentication';
import heroImg from '@/public/img/MasyarakatPengolahanIkan.webp';
import articleImg from '@/public/img/fish_processing.webp';
import relatedImg1 from '@/public/img/MasyarakatKualitasIkan.webp';
import relatedImg2 from '@/public/img/MasyarakatAirLaut.webp';
import ProcessingStepTimeline from '@/components/blog/ProcessingStepTimeline';

function LoadingScreen() {
  return (
    <div className="min-h-screen bg-[#162e52] flex items-center justify-center">
      <div className="w-6 h-6 border-2 border-blue-200 border-t-white rounded-full animate-spin" />
    </div>
  );
}

export default function PengolahanIkanBlogPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthChange(async (user) => {
      if (!user) {
        router.push('/login');
        return;
      }
      const uProfile = await getUserProfile(user.uid);
      if (!uProfile) {
        router.push('/fill-form');
        return;
      }
      if (uProfile.role !== 'masyarakat') {
        const paths: Record<string, string> = {
          nelayan: '/dashboard/nelayan',
          'nelayan-modern': '/dashboard/peneliti',
          peneliti: '/dashboard/peneliti',
        };
        router.push(paths[uProfile.role ?? ''] || '/dashboard/masyarakat');
        return;
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  if (loading) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-[#204473] selection:text-white">
      {/* ── Sticky Header ─────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-[#162e52] border-b border-white/10 px-6 md:px-12 py-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-2 text-white min-w-0">
          <Link
            href="/"
            className="font-extrabold tracking-widest text-sm text-white hover:text-sky-200 transition-colors flex-shrink-0"
          >
            OCEANAGARA
          </Link>
          <span className="text-white/30 flex-shrink-0">/</span>
          <Link
            href="/dashboard/masyarakat"
            className="text-xs text-white/60 hover:text-white transition-colors flex-shrink-0 hidden sm:inline"
          >
            Masyarakat
          </Link>
          <span className="text-white/30 flex-shrink-0 hidden sm:inline">/</span>
          <span className="text-xs text-sky-200 font-semibold truncate">Pengolahan Ikan</span>
        </div>
        <Link
          href="/dashboard/masyarakat"
          className="flex-shrink-0 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-4 py-2 border border-white/30 text-white hover:bg-white hover:text-[#162e52] rounded-lg transition-all duration-200"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          <span className="hidden sm:inline">Kembali</span>
        </Link>
      </header>

      {/* ── Hero Section ──────────────────────────────────────────── */}
      <section className="relative h-[62vh] min-h-[420px] flex items-end overflow-hidden">
        <img
          src={heroImg.src}
          alt="Cara Pengolahan Ikan yang Benar"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1a2e]/92 via-[#0a1a2e]/45 to-transparent" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 w-full pb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-white/15 border border-white/25 text-sky-200 rounded backdrop-blur-sm">
                <svg className="w-3.5 h-3.5 text-teal-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5" />
                </svg>
                Keamanan Pangan Dapur
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight mb-4 max-w-2xl">
              Cara Pengolahan & Penyimpanan Ikan yang Benar
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-xs text-white/70">
              <div className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-sky-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <span>4 menit panduan bertahap</span>
              </div>
              <span className="w-1 h-1 rounded-full bg-white/40" />
              <span>Timeline Animasi 6 Langkah</span>
              <span className="w-1 h-1 rounded-full bg-white/40" />
              <span>Kalkulator Suhu & Masa Simpan</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Article Body & Interactive Timeline ─────────────────── */}
      <article className="max-w-5xl mx-auto px-6 md:px-12 py-14">
        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-6 md:p-8 rounded-3xl bg-slate-50 border border-slate-200 mb-12 shadow-sm"
        >
          <div className="w-12 h-1 bg-[#162e52] rounded-full mb-4" />
          <h2 className="text-xl md:text-2xl font-extrabold text-[#162e52] mb-3">
            Mencegah Keracunan Makanan dengan Penanganan Higienis
          </h2>
          <p className="text-sm sm:text-base text-zinc-700 leading-relaxed font-light mb-4">
            Indonesia merupakan salah satu negara konsumen hasil laut terbesar. Namun, kesalahan penanganan ikan mentah di rumah tangga masih sering memicu kontaminasi silang dan pembusukan daging.
          </p>
          <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
            Ikuti modul animasi interaktif 6 langkah di bawah ini untuk mempraktikkan cara mencuci, membersihkan isi perut, mengatur rak kulkas, serta memasak hingga suhu aman.
          </p>
        </motion.div>

        {/* PROCESSING STEP TIMELINE INTERACTIVE COMPONENT */}
        <div className="mb-16">
          <ProcessingStepTimeline />
        </div>

        {/* Article Image Banner */}
        <figure className="rounded-2xl overflow-hidden mb-16 shadow-md border border-slate-200">
          <img
            src={articleImg.src}
            alt="Proses Pengolahan Ikan Higienis"
            className="w-full object-cover max-h-80 md:max-h-96"
          />
          <figcaption className="px-6 py-4 bg-slate-50 border-t border-slate-200">
            <p className="text-xs text-zinc-600 italic leading-relaxed">
              Memasak bagian paling tebal daging ikan hingga mencapai suhu minimal 70°C selama 15 detik akan memusnahkan sebagian besar bakteri patogen seperti Salmonella dan Listeria.
            </p>
          </figcaption>
        </figure>

        {/* Safety Rules Section */}
        <div className="mb-16 p-6 md:p-8 rounded-3xl bg-[#162e52]/5 border border-[#162e52]/15 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-[#162e52] text-white flex-shrink-0 shadow-md">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-extrabold text-[#162e52] uppercase tracking-wide mb-2">
                Aturan Emas Keamanan Pangan Ikan di Rumah
              </h3>
              <ul className="space-y-2.5 text-xs md:text-sm text-zinc-700 font-normal">
                <li className="flex items-start gap-2">
                  <span className="text-[#162e52] font-black">1.</span>
                  <span>Selalu simpan ikan mentah di RAK PALING BAWAH kulkas untuk mencegah tetesan air mencemari makanan lain.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#162e52] font-black">2.</span>
                  <span>Cuci tangan dengan sabun sebelum dan sesudah memegang ikan mentah.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#162e52] font-black">3.</span>
                  <span>Jangan biarkan ikan yang sudah dimasak di suhu ruangan terbuka lebih dari 2 jam.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </article>

      {/* ── Related Articles Section ──────────────────────────────── */}
      <section className="border-t border-slate-200 bg-slate-50/50 py-14 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 mb-8">
            Modul Pembelajaran Edukasi Lainnya
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            <Link
              href="/dashboard/masyarakat/blog/kualitas-ikan"
              className="group flex gap-4 p-4 border border-slate-200 rounded-2xl bg-white hover:border-[#162e52]/40 hover:shadow-md transition-all duration-300"
            >
              <div className="flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden">
                <img
                  src={relatedImg1.src}
                  alt="Kualitas Ikan"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#162e52]/60">Diagram Anatomi Interaktif</span>
                <h4 className="text-sm font-bold text-zinc-900 mt-1 leading-snug group-hover:text-[#162e52] transition-colors line-clamp-2">
                  Cara Membedakan Kualitas Ikan Segar vs Busuk
                </h4>
                <p className="text-xs text-zinc-400 mt-2">8 Indikator Visual + Quiz</p>
              </div>
            </Link>

            <Link
              href="/dashboard/masyarakat/blog/kondisi-air-laut"
              className="group flex gap-4 p-4 border border-slate-200 rounded-2xl bg-white hover:border-[#162e52]/40 hover:shadow-md transition-all duration-300"
            >
              <div className="flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden">
                <img
                  src={relatedImg2.src}
                  alt="Air Laut"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#162e52]/60">Simulator Air Laut</span>
                <h4 className="text-sm font-bold text-zinc-900 mt-1 leading-snug group-hover:text-[#162e52] transition-colors line-clamp-2">
                  Edukasi Parameter Kualitas Air Laut
                </h4>
                <p className="text-xs text-zinc-400 mt-2">5 Parameter Ekosistem</p>
              </div>
            </Link>
          </div>

          <div className="text-center">
            <Link
              href="/dashboard/masyarakat"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-[#162e52] hover:bg-[#1f4275] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-200 shadow-md"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              <span>Kembali ke Dashboard Utama</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
