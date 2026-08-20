'use client';

import { useState, useEffect } from 'react';
import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { onAuthChange, logout, getUserProfile, UserProfile } from '@/app/service/authentication';
import pemeliharaanIkan from '@/public/img/NelayanPemeliharaanIkan.webp';
import pemasaranIkan from '@/public/img/NelayanPemasaranIkan.webp';
import zonaTangkap from '@/public/img/NelayanZonaTangkap.webp';
import peringatanDini from '@/public/img/ews-nelayan.webp';

const WaveMap = dynamic(() => import('@/components/dashboard/WaveMap'), { ssr: false });

interface FeatureCard {
  id: string;
  title: string;
  description: string;
  tag: string;
  imagePlaceholderColor?: string;
  imageSrc?: string;
  icon: React.ReactNode;
  route: string;
}

const FEATURE_CARDS: FeatureCard[] = [
  {
    id: 'zona-tangkap-ikan-tradisional',
    title: 'Peta & Zona Tangkap Ikan',
    description:
      'Cari lokasi kumpul ikan terdekat (< 12 mil laut) dari pelabuhan Anda. Dilengkapi perkiraan posisi kawanan ikan dan rute hemat bahan bakar.',
    tag: 'Fitur Utama Pesisir',
    imagePlaceholderColor: 'from-[#122842]/85 via-[#162f4e]/90 to-[#0a1626]',
    imageSrc: zonaTangkap.src,
    route: '/dashboard/nelayan/feature/zona-tangkap-ikan-tradisional',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-10 h-10">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" />
      </svg>
    ),
  },
  {
    id: 'lapor-limbah-nelayan',
    title: 'Lapor Limbah di Tengah Laut',
    description:
      'Laporkan temuan limbah/minyak di perairan saat melaut lengkap dengan foto & GPS. Data divalidasi 3-lapis AI & dikirim ke peneliti.',
    tag: 'Laporan Limbah Nelayan',
    imagePlaceholderColor: 'from-[#142d4a]/85 via-[#1a385c]/90 to-[#0c1c30]',
    imageSrc: peringatanDini.src,
    route: '/dashboard/nelayan/feature/peringatan-dini-ecohealth',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-10 h-10">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008v-.008z" />
      </svg>
    ),
  },
  {
    id: 'edukasi-pemeliharaan-ikan',
    title: 'Edukasi Pemeliharaan Ikan',
    description:
      'Panduan praktis menjaga ikan tangkapan agar tetap segar dan tidak mudah busuk di atas kapal hingga sampai di darat.',
    tag: 'Panduan Praktis',
    imagePlaceholderColor: 'from-[#1c383e]/85 via-[#182b3a]/90 to-[#0d1822]',
    imageSrc: pemeliharaanIkan.src,
    route: '/dashboard/nelayan/feature/edukasi-pemeliharaan-ikan',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-10 h-10">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c-4.97 0-9 3.185-9 7.115 0 2.557 1.522 4.82 3.889 6.115.024.507-.14 1.475-.889 2.77 1.889-.4 3.25-1.125 3.889-1.607A10.716 10.716 0 0 0 12 17.5c4.97 0 9-3.184 9-7.115C21 6.185 16.97 3 12 3Z" />
      </svg>
    ),
  },
  {
    id: 'pemasaran-ikan',
    title: 'Strategi Pemasaran Ikan',
    description:
      'Cara menjual hasil tangkapan dengan harga terbaik di pelelangan (TPI) maupun langsung ke pembeli dan pasar digital.',
    tag: 'Tips Penjualan',
    imagePlaceholderColor: 'from-[#14375a]/85 via-[#192f4c]/90 to-[#0b1728]',
    imageSrc: pemasaranIkan.src,
    route: '/dashboard/nelayan/feature/pemasaran-ikan',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-10 h-10">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
      </svg>
    ),
  },
];

export default function DashboardNelayanPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedFeature, setSelectedFeature] = useState<FeatureCard | null>(null);

  // Checklist state
  const [checklist, setChecklist] = useState({
    fuel: true,
    lifeJacket: true,
    lights: false,
    ice: true,
    appChecked: true,
  });

  useEffect(() => {
    const unsubscribe = onAuthChange(async (user) => {
      if (!user) {
        router.push('/login');
      } else {
        const uProfile = await getUserProfile(user.uid);
        if (uProfile && uProfile.role === 'nelayan') {
          setProfile(uProfile);
        } else if (uProfile) {
          const paths: Record<string, string> = {
            nelayan: '/dashboard/nelayan',
            'nelayan-modern': '/dashboard/peneliti',
            masyarakat: '/dashboard/masyarakat',
            peneliti: '/dashboard/peneliti',
          };
          router.push(uProfile.role ? paths[uProfile.role] : '/fill-form');
        } else {
          router.push('/fill-form');
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1b365d] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-blue-200 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  const displayName = profile?.displayName || 'Bapak Nelayan';

  return (
    <div className="min-h-screen w-full min-w-max bg-white text-zinc-900 font-sans flex flex-col selection:bg-[#204473] selection:text-white">

      {/* ── Hero wrapper: background.webp + navbar + greeting + cards ── */}
      <div className="relative w-full">

        {/* Background image */}
        <div className="absolute top-0 inset-x-0 h-[560px] md:h-[600px] z-0 select-none pointer-events-none overflow-hidden">
          <img
            src="/img/background.webp"
            alt="Oceanagara background header"
            className="w-full h-full object-cover object-top"
          />
          {/* Gradient overlay for smooth transition at the bottom edge */}
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-white via-white/80 to-transparent" />
        </div>

        {/* ── Transparent Navbar ── */}
        <header className="relative z-40 bg-transparent px-6 md:px-12 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="font-extrabold tracking-widest text-sm text-white uppercase hover:text-sky-200 transition-colors">
              OCEANAGARA
            </Link>
            <span className="text-white/40">/</span>
            <span className="text-xs font-semibold text-white/80 uppercase tracking-wider">
              Dashboard Nelayan
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleLogout}
              className="text-xs font-bold uppercase tracking-wider px-4 py-2 bg-transparent text-white border border-white/40 hover:bg-white hover:text-zinc-900 rounded transition-all duration-200 backdrop-blur-sm"
            >
              Keluar
            </button>
          </div>
        </header>

        {/* ── Greeting + Profile pill + Feature cards ── */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pt-8 pb-16">

          {/* Greeting */}
          <div className="space-y-2 max-w-3xl mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-normal text-white tracking-tight drop-shadow">
              Halo! Selamat datang <span className="font-bold">{displayName}</span>
            </h1>
            <p className="text-sm sm:text-base italic text-sky-100/90 font-light tracking-wide drop-shadow">
              yuk jelajahi berbagai macam fitur dan panduan praktis nelayan tradisional
            </p>
          </div>

          {/* Profile pill (Glassmorphism) */}
          <div className="inline-flex flex-wrap items-center gap-6 p-4 bg-[#162e52]/75 border border-white/20 backdrop-blur-md rounded-xl text-white shadow-xl mb-12">
            <div className="flex items-center gap-3">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-sky-200/80 font-bold block">Peran</span>
                <span className="text-xs font-bold text-white uppercase">Nelayan Tradisional</span>
              </div>
            </div>

            <div className="h-8 w-px bg-white/20 hidden sm:block" />

            <div>
              <span className="text-[10px] uppercase tracking-widest text-sky-200/80 font-bold block">Nama Kapal / Perahu</span>
              <span className="text-xs font-semibold text-white">{String(profile?.namaKapal || '-')}</span>
            </div>

            <div className="h-8 w-px bg-white/20 hidden md:block" />

            <div>
              <span className="text-[10px] uppercase tracking-widest text-sky-200/80 font-bold block">Pangkalan / Wilayah Operasi</span>
              <span className="text-xs font-semibold text-white">{String(profile?.wilayahOperasi || '-')}</span>
            </div>
          </div>

          {/* ── 4 Feature Cards (Identical grid & responsiveness to Peneliti dashboard) ── */}
          <div className="grid grid-cols-4 gap-3 md:gap-6">
            {FEATURE_CARDS.map((card) => (
              <div
                key={card.id}
                onClick={() => router.push(card.route)}
                className="group cursor-pointer"
              >
                {/* MOBILE (< md): compact square icon tile */}
                <div className="md:hidden flex flex-col items-center gap-2">
                  <div className={`relative w-full aspect-square rounded-2xl overflow-hidden bg-gradient-to-br ${card.imagePlaceholderColor} flex items-center justify-center shadow-lg border border-white/20 transition-all duration-300 group-hover:shadow-xl group-hover:scale-105 group-hover:border-sky-300/60`}>
                    <div className="text-white/70 group-hover:text-white transition-colors">
                      {card.icon}
                    </div>
                  </div>
                  <p className="text-center text-[10px] font-semibold text-white leading-tight line-clamp-2 drop-shadow">
                    {card.title}
                  </p>
                </div>

                {/* DESKTOP (md+): tall image card */}
                <div className="hidden md:flex relative h-80 rounded-[22px] p-6 flex-col justify-between overflow-hidden shadow-xl transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-2xl bg-[#152740] border border-white/20 text-white group-hover:border-sky-300/80">
                  {card.imageSrc && (
                    <img
                      src={card.imageSrc}
                      alt={card.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90 group-hover:opacity-80 transition-opacity" />

                  <div className="relative z-10">
                    <span className="inline-block px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded bg-white/15 text-sky-100 border border-white/25 backdrop-blur-sm">
                      {card.tag}
                    </span>
                  </div>

                  <div className="relative z-10 space-y-2">
                    <h3 className="text-lg font-bold leading-snug tracking-tight text-white group-hover:text-sky-100">
                      {card.title}
                    </h3>
                    <p className="text-xs line-clamp-2 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sky-200/90">
                      {card.description}
                    </p>
                    <div className="pt-1 flex items-center gap-1.5 text-xs font-semibold group-hover:translate-x-1 transition-transform text-sky-300">
                      <span>Lihat Fitur</span>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── BMKG Wave Map Widget (Full Container Width - Identical to Peneliti dashboard) ── */}
          <div className="mt-12 space-y-6">
            <WaveMap />

            {/* Supplementary Widgets Grid (2-column responsive grid below map) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Safety Checklist */}
              <div className="p-6 bg-white border border-slate-200 rounded-2xl space-y-4 shadow-sm text-slate-900">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#0c2d52]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-base font-extrabold text-[#0c2d52]">Checklist Perahu Kayu / Motor</h3>
                </div>

                <div className="space-y-3 text-xs">
                  <label className="flex items-center gap-3 cursor-pointer p-2.5 rounded-lg bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all">
                    <input
                      type="checkbox"
                      checked={checklist.fuel}
                      onChange={(e) => setChecklist({ ...checklist, fuel: e.target.checked })}
                      className="w-4 h-4 rounded text-[#0c2d52] focus:ring-0 accent-[#0c2d52]"
                    />
                    <span className="text-slate-800 font-medium">Cek Kecukupan BBM &amp; Oli Mesin</span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer p-2.5 rounded-lg bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all">
                    <input
                      type="checkbox"
                      checked={checklist.lifeJacket}
                      onChange={(e) => setChecklist({ ...checklist, lifeJacket: e.target.checked })}
                      className="w-4 h-4 rounded text-[#0c2d52] focus:ring-0 accent-[#0c2d52]"
                    />
                    <span className="text-slate-800 font-medium">Bawa Pelampung / Life Jacket</span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer p-2.5 rounded-lg bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all">
                    <input
                      type="checkbox"
                      checked={checklist.lights}
                      onChange={(e) => setChecklist({ ...checklist, lights: e.target.checked })}
                      className="w-4 h-4 rounded text-[#0c2d52] focus:ring-0 accent-[#0c2d52]"
                    />
                    <span className="text-slate-800 font-medium">Lampu Navigasi &amp; Senter Kapal</span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer p-2.5 rounded-lg bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all">
                    <input
                      type="checkbox"
                      checked={checklist.ice}
                      onChange={(e) => setChecklist({ ...checklist, ice: e.target.checked })}
                      className="w-4 h-4 rounded text-[#0c2d52] focus:ring-0 accent-[#0c2d52]"
                    />
                    <span className="text-slate-800 font-medium">Es Batu Cukup (Rasio 1:1)</span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer p-2.5 rounded-lg bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all">
                    <input
                      type="checkbox"
                      checked={checklist.appChecked}
                      onChange={(e) => setChecklist({ ...checklist, appChecked: e.target.checked })}
                      className="w-4 h-4 rounded text-[#0c2d52] focus:ring-0 accent-[#0c2d52]"
                    />
                    <span className="text-slate-800 font-medium">Pantau Status Oceanagara Live</span>
                  </label>
                </div>
              </div>

              {/* Emergency Contacts (Solid Rose Light Theme) */}
              <div className="p-6 bg-rose-50 border border-rose-200 rounded-2xl space-y-4 shadow-sm text-rose-950">
                <div className="flex items-center gap-2.5 text-rose-800">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.002A11.959 11.959 0 0112 2.714z" />
                  </svg>
                  <h3 className="text-base font-extrabold text-rose-950">Panggilan Darurat Laut (SOS)</h3>
                </div>
                <p className="text-xs text-rose-800 leading-relaxed">
                  Segera hubungi kontak berikut jika mengalami gangguan cuaca ekstrem, kebocoran kapal, atau menemukan tumpahan limbah berbahaya.
                </p>
                <div className="space-y-2 pt-1">
                  <a
                    href="tel:115"
                    className="flex items-center justify-between p-3 rounded-lg bg-rose-600 text-white font-bold text-xs hover:bg-rose-700 transition-all shadow-sm"
                  >
                    <span>Call Center SAR Laut (BASARNAS)</span>
                    <span className="text-sm font-extrabold">115</span>
                  </a>
                  <div className="p-3 rounded-lg bg-white border border-rose-200 text-rose-950 font-semibold text-xs flex items-center justify-between">
                    <span>Radio VHF Syahbandar Pelabuhan</span>
                    <span className="font-extrabold text-rose-800">Channel 16</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Info & Guide Section ── */}
          <div className="mt-14 p-6 sm:p-10 bg-slate-50 border border-slate-200 rounded-2xl space-y-8 text-slate-900 shadow-sm">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#0c2d52] block">
                Bantuan &amp; Panduan Layanan
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0c2d52] tracking-tight">
                Panduan Lengkap Nelayan Tradisional
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                Empat langkah praktis untuk mengoptimalkan hasil tangkapan, pelaporan limbah pesisir, dan pemasaran ikan.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-3 text-slate-900 shadow-sm hover:border-[#0c2d52]/40 transition-all">
                <div className="w-9 h-9 rounded-xl bg-[#0c2d52]/10 text-[#0c2d52] border border-[#0c2d52]/20 flex items-center justify-center font-extrabold text-base">
                  1
                </div>
                <h4 className="text-base font-extrabold text-[#0c2d52]">Cek Zona Tangkap</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Gunakan peta interaktif untuk melihat titik kumpul ikan terdekat dari pelabuhan Anda (&lt; 12 mil laut).
                </p>
              </div>

              <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-3 text-slate-900 shadow-sm hover:border-[#0c2d52]/40 transition-all">
                <div className="w-9 h-9 rounded-xl bg-[#0c2d52]/10 text-[#0c2d52] border border-[#0c2d52]/20 flex items-center justify-center font-extrabold text-base">
                  2
                </div>
                <h4 className="text-base font-extrabold text-[#0c2d52]">Lapor Limbah Laut</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Kirim foto &amp; koordinat temuan limbah/minyak di perairan untuk divalidasi 3-lapis AI &amp; dikirim ke peneliti.
                </p>
              </div>

              <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-3 text-slate-900 shadow-sm hover:border-[#0c2d52]/40 transition-all">
                <div className="w-9 h-9 rounded-xl bg-[#0c2d52]/10 text-[#0c2d52] border border-[#0c2d52]/20 flex items-center justify-center font-extrabold text-base">
                  3
                </div>
                <h4 className="text-base font-extrabold text-[#0c2d52]">Jaga Kesegaran Ikan</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Pelajari teknik es dan penanganan ikan di kapal agar mutu tetap tinggi saat dijual di darat.
                </p>
              </div>

              <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-3 text-slate-900 shadow-sm hover:border-[#0c2d52]/40 transition-all">
                <div className="w-9 h-9 rounded-xl bg-[#0c2d52]/10 text-[#0c2d52] border border-[#0c2d52]/20 flex items-center justify-center font-extrabold text-base">
                  4
                </div>
                <h4 className="text-base font-extrabold text-[#0c2d52]">Jual Harga Terbaik</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Manfaatkan tips pemasaran ke pelelangan (TPI) dan pasar digital untuk keuntungan maksimal.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── Feature Detail Modal ── */}
      {selectedFeature && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-zinc-200 rounded-2xl max-w-lg w-full p-6 relative space-y-4 shadow-2xl text-zinc-900">
            <button
              onClick={() => setSelectedFeature(null)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-900 p-2 rounded-lg hover:bg-zinc-100 transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>

            <span className="inline-block px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-zinc-700 bg-zinc-100 border border-zinc-200 rounded">
              {selectedFeature.tag}
            </span>

            <h3 className="text-xl font-extrabold text-[#162e52]">
              {selectedFeature.title}
            </h3>

            <p className="text-sm text-zinc-600 leading-relaxed">
              {selectedFeature.description}
            </p>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                onClick={() => {
                  router.push(selectedFeature.route);
                  setSelectedFeature(null);
                }}
                className="px-5 py-2.5 bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold uppercase tracking-wider rounded transition-all duration-200 shadow-sm flex items-center gap-2"
              >
                <span>Buka Fitur</span>
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </button>
              <button
                onClick={() => setSelectedFeature(null)}
                className="px-5 py-2.5 bg-[#162e52] hover:bg-[#1f4275] text-white text-xs font-bold uppercase tracking-wider rounded transition-all duration-200 shadow-sm"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
