'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { onAuthChange, getUserProfile } from '@/app/service/authentication';
import heroImg from '@/public/img/MasyarakatKualitasIkan.webp';
import articleImg from '@/public/img/fresh_vs_spoiled_fish.webp';
import relatedImg1 from '@/public/img/MasyarakatPengolahanIkan.webp';
import relatedImg2 from '@/public/img/MasyarakatAirLaut.webp';
import FishAnatomyViewer from '@/components/blog/FishAnatomyViewer';
import FishFreshnessQuiz from '@/components/blog/FishFreshnessQuiz';

const TIPS = [
  'Belanja ikan di pagi hari, idealnya sebelum pukul 09.00, ketika pasokan dari pelelangan masih segar.',
  'Pilih lapak penjual yang memiliki tempat pendingin atau es balok yang cukup dan bersih untuk menyimpan ikan.',
  'Perhatikan lingkungan sekitar tempat penjualan — lapak yang bersih dan tidak berbau busuk biasanya menjual ikan lebih segar.',
  'Jangan ragu untuk meminta pedagang membuka insang ikan agar bisa memeriksa warnanya secara langsung.',
  'Bawa tas berpendingin (cooler bag) saat berbelanja agar ikan tetap terjaga suhunya selama perjalanan pulang.',
];

function LoadingScreen() {
  return (
    <div className="min-h-screen bg-[#162e52] flex items-center justify-center">
      <div className="w-6 h-6 border-2 border-blue-200 border-t-white rounded-full animate-spin" />
    </div>
  );
}

export default function KualitasIkanBlogPage() {
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
          <span className="text-xs text-sky-200 font-semibold truncate">Kualitas Ikan</span>
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
          alt="Cara Membedakan Kualitas Ikan"
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
                <svg className="w-3.5 h-3.5 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                </svg>
                Panduan Konsumen Sehat
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight mb-4 max-w-2xl">
              Panduan Inspeksi Visual Kualitas Ikan Segar vs Busuk
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-xs text-white/70">
              <div className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-sky-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <span>5 menit panduan</span>
              </div>
              <span className="w-1 h-1 rounded-full bg-white/40" />
              <span>Diagram Anatomi 2D Interaktif</span>
              <span className="w-1 h-1 rounded-full bg-white/40" />
              <span>Latihan Quiz Visual</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Article Body & Interactive Fish Anatomy ──────────────────────── */}
      <article className="max-w-5xl mx-auto px-6 md:px-12 py-14">

        {/* FISH ANATOMY INTERACTIVE COMPONENT */}
        <div className="mb-16">
          <FishAnatomyViewer />
        </div>

        {/* Fish Freshness Quiz Mini Game */}
        <div className="mb-16">
          <FishFreshnessQuiz />
        </div>

        {/* Article Image Figure */}
        <figure className="rounded-2xl overflow-hidden mb-16 shadow-md border border-slate-200">
          <img
            src={articleImg.src}
            alt="Perbandingan Ikan Segar dan Ikan Busuk"
            className="w-full object-cover max-h-80 md:max-h-96"
          />
          <figcaption className="px-6 py-4 bg-slate-50 border-t border-slate-200">
            <p className="text-xs text-zinc-600 italic leading-relaxed">
              Memeriksa mata yang cembung jernih, insang merah segar, serta daging yang membal kembali saat ditekan adalah protokol standar konsumen cerdas.
            </p>
          </figcaption>
        </figure>

        {/* Shopping Tips Section */}
        <div className="mb-16">
          <div className="mb-6">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              Tips Pasar Tradisional
            </span>
            <h2 className="text-2xl font-extrabold text-[#162e52] tracking-tight mt-1.5">
              5 Tips Praktis Saat Belanja Ikan di Pasar
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {TIPS.map((tip, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-start gap-3.5 hover:border-[#162e52]/40 transition-all shadow-sm"
              >
                <span className="w-7 h-7 rounded-xl bg-[#162e52] text-white flex items-center justify-center font-black text-xs flex-shrink-0 mt-0.5 shadow-sm">
                  {idx + 1}
                </span>
                <p className="text-xs text-zinc-700 leading-relaxed">{tip}</p>
              </motion.div>
            ))}
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
              href="/dashboard/masyarakat/blog/pengolahan-ikan"
              className="group flex gap-4 p-4 border border-slate-200 rounded-2xl bg-white hover:border-[#162e52]/40 hover:shadow-md transition-all duration-300"
            >
              <div className="flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden">
                <img
                  src={relatedImg1.src}
                  alt="Pengolahan Ikan"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#162e52]/60">Timeline 6 Langkah</span>
                <h4 className="text-sm font-bold text-zinc-900 mt-1 leading-snug group-hover:text-[#162e52] transition-colors line-clamp-2">
                  Cara Pengolahan Ikan yang Benar
                </h4>
                <p className="text-xs text-zinc-400 mt-2">Simpan & Masak Suhu 70°C+</p>
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
