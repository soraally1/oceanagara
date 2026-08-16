'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { onAuthChange, getUserProfile } from '@/app/service/authentication';
import heroImg from '@/public/img/MasyarakatAirLaut.webp';
import articleImg from '@/public/img/ocean_water_quality.png';
import relatedImg1 from '@/public/img/MasyarakatKualitasIkan.webp';
import relatedImg2 from '@/public/img/MasyarakatPengolahanIkan.webp';
import OceanWaterSimulator from '@/components/blog/OceanWaterSimulator';

const THREATS = [
  {
    title: 'Pencemaran Plastik',
    desc: 'Mikroplastik tertelan biota laut, masuk rantai makanan, dan akhirnya dapat dikonsumsi manusia melalui seafood.',
    icon: (
      <svg className="w-5 h-5 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
      </svg>
    ),
  },
  {
    title: 'Limpasan Pertanian',
    desc: 'Pupuk nitrogen dan fosfor dari lahan pertanian memicu eutrofikasi yang mengurangi oksigen terlarut secara drastis.',
    icon: (
      <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18m9-9H3" />
      </svg>
    ),
  },
  {
    title: 'Limbah Industri',
    desc: 'Logam berat seperti merkuri, timbal, dan kadmium terakumulasi dalam jaringan ikan dan berbahaya bila dikonsumsi.',
    icon: (
      <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
      </svg>
    ),
  },
  {
    title: 'Pengasaman Laut',
    desc: 'Penyerapan CO2 dari emisi fosil menurunkan pH laut, mengancam karang, moluska, dan ekosistem pesisir secara keseluruhan.',
    icon: (
      <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5" />
      </svg>
    ),
  },
];

function LoadingScreen() {
  return (
    <div className="min-h-screen bg-[#162e52] flex items-center justify-center">
      <div className="w-6 h-6 border-2 border-blue-200 border-t-white rounded-full animate-spin" />
    </div>
  );
}

export default function KondisiAirLautBlogPage() {
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
          <span className="text-xs text-sky-200 font-semibold truncate">Kondisi Air Laut</span>
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
          alt="Edukasi Kondisi Air Laut"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#06111e]/93 via-[#06111e]/45 to-transparent" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 w-full pb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-white/15 border border-white/25 text-sky-200 rounded backdrop-blur-sm">
                <svg className="w-3.5 h-3.5 text-sky-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 0 0 9-9c0-4.97-4.03-9-9-9s-9 4.03-9 9a9 9 0 0 0 9 9Z" />
                </svg>
                Ekosistem Laut
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight mb-4 max-w-2xl">
              Edukasi Parameter & Kesehatan Air Laut
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-xs text-white/70">
              <div className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-sky-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <span>5 menit panduan visual</span>
              </div>
              <span className="w-1 h-1 rounded-full bg-white/40" />
              <span>5 Parameter Interaktif</span>
              <span className="w-1 h-1 rounded-full bg-white/40" />
              <span>Sains Kelautan</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Article Body & Interactive Simulator ────────────────── */}
      <article className="max-w-5xl mx-auto px-6 md:px-12 py-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-6 md:p-8 rounded-3xl bg-slate-50 border border-slate-200 mb-12 shadow-sm"
        >
          <div className="w-12 h-1 bg-[#162e52] rounded-full mb-4" />
          <h2 className="text-xl md:text-2xl font-extrabold text-[#162e52] mb-3">
            Mengapa Kesehatan Air Laut Penting Bagi Masyarakat?
          </h2>
          <p className="text-sm sm:text-base text-zinc-700 leading-relaxed font-light mb-4">
            Laut menutupi lebih dari 70% bumi dan menopang mata pencaharian jutaan nelayan Indonesia. Namun, perubahan iklim, pencemaran limbah, dan pembuangan pupuk dapat merusak kualitas air secara dramatis.
          </p>
          <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
            Gunakan simulator interaktif di bawah ini untuk melihat perbandingan fisik air laut sehat versus tercemar secara langsung.
          </p>
        </motion.div>

        {/* INTERACTIVE OCEAN WATER SIMULATOR COMPONENT */}
        <div className="mb-16">
          <OceanWaterSimulator />
        </div>

        {/* Article Image Banner */}
        <figure className="rounded-2xl overflow-hidden mb-16 shadow-md border border-slate-200">
          <img
            src={articleImg.src}
            alt="Kondisi dan kualitas air laut yang sehat"
            className="w-full object-cover max-h-80 md:max-h-96"
          />
          <figcaption className="px-6 py-4 bg-slate-50 border-t border-slate-200">
            <p className="text-xs text-zinc-600 italic leading-relaxed">
              Perairan laut yang sehat ditandai dengan visibilitas jernih tinggi, keanekaragaman biota pesisir yang subur, dan parameter kimia-fisika yang berada dalam rentang aman.
            </p>
          </figcaption>
        </figure>

        {/* Threats Section */}
        <div className="mb-16">
          <div className="mb-8">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
              Ancaman Ekosistem
            </span>
            <h2 className="text-2xl font-extrabold text-[#162e52] tracking-tight mt-1.5">
              4 Faktor Utama Perusak Kualitas Air Laut
            </h2>
            <p className="text-xs text-zinc-500 mt-1">
              Memahami ancaman ini membantu masyarakat bertindak bijak dalam menjaga kebersihan pesisir.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {THREATS.map((threat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.01 }}
                className="p-5 border border-slate-200 rounded-2xl bg-white hover:border-[#162e52]/40 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-slate-100 border border-slate-200 flex-shrink-0">
                    {threat.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-zinc-900 mb-1">{threat.title}</h4>
                    <p className="text-xs text-zinc-600 leading-relaxed font-normal">{threat.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Action Callout Section */}
        <motion.div
          whileInView={{ opacity: 1, scale: 1 }}
          initial={{ opacity: 0, scale: 0.98 }}
          viewport={{ once: true }}
          className="p-6 md:p-8 rounded-3xl bg-[#162e52]/5 border border-[#162e52]/15 shadow-sm"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#162e52] text-white flex items-center justify-center flex-shrink-0 shadow-md">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 0 0 9-9c0-4.97-4.03-9-9-9s-9 4.03-9 9a9 9 0 0 0 9 9Z" />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-extrabold text-[#162e52] uppercase tracking-wide mb-2">
                Aksi Nyata Masyarakat untuk Mengatasi Pencemaran
              </h3>
              <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed font-normal mb-4">
                Kurangi penggunaan plastik sekali pakai, pastikan limbah rumah tangga tidak langsung dialirkan ke muara laut, dan dukung gerakan konservasi terumbu karang lokal.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-white border border-[#162e52]/20 text-[#162e52]">
                  ✓ Bebas Sampah Plastik
                </span>
                <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-white border border-[#162e52]/20 text-[#162e52]">
                  ✓ Olah Limbah Rumah Tangga
                </span>
                <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-white border border-[#162e52]/20 text-[#162e52]">
                  ✓ Lindungi Terumbu Karang
                </span>
              </div>
            </div>
          </div>
        </motion.div>
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
              href="/dashboard/masyarakat/blog/pengolahan-ikan"
              className="group flex gap-4 p-4 border border-slate-200 rounded-2xl bg-white hover:border-[#162e52]/40 hover:shadow-md transition-all duration-300"
            >
              <div className="flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden">
                <img
                  src={relatedImg2.src}
                  alt="Pengolahan Ikan"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#162e52]/60">Timeline 6 Langkah</span>
                <h4 className="text-sm font-bold text-zinc-900 mt-1 leading-snug group-hover:text-[#162e52] transition-colors line-clamp-2">
                  Protokol Cara Pengolahan Ikan yang Benar
                </h4>
                <p className="text-xs text-zinc-400 mt-2">Kalkulator Suhu & Simpan</p>
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
