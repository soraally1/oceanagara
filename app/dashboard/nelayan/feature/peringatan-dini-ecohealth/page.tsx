'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { onAuthChange, getUserProfile, UserProfile } from '@/app/service/authentication';
import WasteReportSection from '@/components/lapor-limbah/WasteReportSection';
import MyReportList from '@/components/lapor-limbah/MyReportList';

export default function LaporLimbahNelayanPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [uid, setUid] = useState<string | null>(null);

  useEffect(() => {
    const unsub = onAuthChange(async (user) => {
      if (!user) {
        router.push('/login');
      } else {
        setUid(user.uid);
        const uProfile = await getUserProfile(user.uid).catch(() => null);
        if (uProfile) {
          setProfile(uProfile);
        }
      }
      setAuthLoading(false);
    });
    return () => unsub();
  }, [router]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#0c2d52] flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 border-3 border-sky-200 border-t-white rounded-full animate-spin" />
        <p className="text-white text-sm font-semibold">Memuat Fitur Lapor Limbah Nelayan…</p>
      </div>
    );
  }

  const reporterDisplayName = profile?.displayName || 'Nelayan Tradisional';

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans pb-16 selection:bg-[#204473] selection:text-white">
      {/* ── Solid Header Navigation ── */}
      <header className="bg-[#0c2d52] text-white px-4 sm:px-8 py-4 flex items-center justify-between mb-6 border-b border-zinc-700 shadow-sm">
        <div className="flex items-center gap-3 min-w-0">
          <Link
            href="/"
            className="font-extrabold tracking-widest text-base text-white uppercase hover:text-sky-200 transition-colors flex-shrink-0"
          >
            OCEANAGARA
          </Link>
          <span className="text-zinc-400 font-bold">/</span>
          <Link
            href="/dashboard/nelayan"
            className="text-sm font-bold text-white/80 hover:text-white transition-colors truncate"
          >
            Dashboard Nelayan
          </Link>
          <span className="text-zinc-400 font-bold hidden sm:inline">/</span>
          <span className="text-sm font-bold text-sky-200 truncate hidden sm:inline">
            Lapor Limbah di Tengah Laut
          </span>
        </div>
        <Link
          href="/dashboard/nelayan"
          className="flex-shrink-0 inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider px-4 py-2 bg-white text-[#0c2d52] hover:bg-sky-100 rounded-lg transition-colors shadow-sm"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Kembali ke Dashboard
        </Link>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 space-y-8">
        {/* ── Hero Banner Lapor Limbah Nelayan ── */}
        <div className="bg-[#0c2d52] text-white rounded-2xl p-6 sm:p-8 border border-slate-700 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-[#163e6e] text-sky-200 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008v-.008z" />
                </svg>
              </div>
              <div>
                <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-widest block">
                  Validasi 3-Lapis AI &amp; Sinkronisasi Peneliti
                </span>
                <h1 className="text-xl sm:text-2xl font-extrabold text-white">
                  Lapor Limbah &amp; Tumpahan Minyak di Laut
                </h1>
                <p className="text-xs text-slate-300 mt-1">
                  Pelapor: <strong className="text-white">{reporterDisplayName}</strong> (Kapal: {String(profile?.namaKapal || 'KM Bahari Jaya')})
                </p>
              </div>
            </div>

            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 text-xs font-extrabold uppercase tracking-wider rounded-full flex-shrink-0">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Tersambung ke Peneliti
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-light pt-2 border-t border-slate-700/80">
            Ambil foto temuan limbah plastik, limbah industri, atau tumpahan minyak saat Anda sedang berlayar di tengah laut. 
            Sistem akan secara otomatis memvalidasi koordinat GPS dan keaslian foto menggunakan AI 3-Lapis, lalu mengirimkannya langsung ke database riset Peneliti Oceanagara.
          </p>
        </div>

        {/* ── Waste Report Form Section (AI 3-Lapis Validated) ── */}
        <WasteReportSection uid={uid} reporterName={reporterDisplayName} />

        {/* ── List of Reports Submitted by Nelayan ── */}
        <MyReportList uid={uid} />
      </div>
    </div>
  );
}
