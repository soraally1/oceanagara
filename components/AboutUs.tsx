'use client';

import React, { useEffect, useRef, useState } from 'react';

function useCountUp(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;

        const startTime = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.round(eased * target));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.1 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, sectionRef };
}

export default function AboutUs() {
  const { count: zoneCount, sectionRef } = useCountUp(54);

  return (
    <section
      id="about-us"
      ref={sectionRef}
      className="py-12 sm:py-16 md:py-20 bg-white border-b border-zinc-150 selection:bg-[#204473] selection:text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start">

          {/* Column 1: Core System Data Sources (Compact Table Layout) */}
          <div className="border border-zinc-200 bg-slate-50/50 p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-sm">
            <div className="mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-zinc-200">
              <h3 className="text-xs sm:text-sm font-extrabold text-[#0c2d52] uppercase tracking-widest">
                Integrasi Data Maritim Asli
              </h3>
            </div>

            <div className="divide-y divide-zinc-200 text-xs text-zinc-700">
              <div className="py-2.5 sm:py-3.5 flex flex-col sm:flex-row justify-between sm:items-center gap-1 sm:gap-2">
                <span className="font-bold text-zinc-900 text-[11px] sm:text-xs uppercase tracking-wider">
                  Telemetri Gelombang &amp; Angin
                </span>
                <span className="font-semibold text-[#0c2d52] text-[11px] sm:text-xs">
                  BMKG Peta Maritim API
                </span>
              </div>

              <div className="py-2.5 sm:py-3.5 flex flex-col sm:flex-row justify-between sm:items-center gap-1 sm:gap-2">
                <span className="font-bold text-zinc-900 text-[11px] sm:text-xs uppercase tracking-wider">
                  Suhu &amp; Klorofil-a Laut
                </span>
                <span className="font-semibold text-[#0c2d52] text-[11px] sm:text-xs">
                  NASA GIBS Satelit
                </span>
              </div>

              <div className="py-2.5 sm:py-3.5 flex flex-col sm:flex-row justify-between sm:items-center gap-1 sm:gap-2">
                <span className="font-bold text-zinc-900 text-[11px] sm:text-xs uppercase tracking-wider">
                  Deteksi Kekeruhan &amp; Limbah
                </span>
                <span className="font-semibold text-[#0c2d52] text-[11px] sm:text-xs">
                  Sentinel-2 ESA Satelit
                </span>
              </div>

              <div className="py-2.5 sm:py-3.5 flex flex-col sm:flex-row justify-between sm:items-center gap-1 sm:gap-2">
                <span className="font-bold text-zinc-900 text-[11px] sm:text-xs uppercase tracking-wider">
                  Kepadatan Kapal AIS
                </span>
                <span className="font-semibold text-[#0c2d52] text-[11px] sm:text-xs">
                  Global Fishing Watch (GFW)
                </span>
              </div>

              <div className="py-2.5 sm:py-3.5 flex flex-col sm:flex-row justify-between sm:items-center gap-1 sm:gap-2">
                <span className="font-bold text-zinc-900 text-[11px] sm:text-xs uppercase tracking-wider">
                  Validasi Laporan Limbah
                </span>
                <span className="font-semibold text-[#0c2d52] text-[11px] sm:text-xs">
                  3-Lapis AI (EXIF, GPS, Vision)
                </span>
              </div>

              <div className="py-2.5 sm:py-3.5 flex flex-col sm:flex-row justify-between sm:items-center gap-1 sm:gap-2">
                <span className="font-bold text-zinc-900 text-[11px] sm:text-xs uppercase tracking-wider">
                  Penyimpanan &amp; Sync
                </span>
                <span className="font-semibold text-[#0c2d52] text-[11px] sm:text-xs">
                  Firebase Cloud Firestore
                </span>
              </div>
            </div>

            {/* Quick Metrics Bar with Real Platform Metrics */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-6 pt-5 border-t border-zinc-200 text-center">
              <div>
                <span className="block text-base sm:text-xl font-extrabold text-[#0c2d52] tabular-nums">
                  {zoneCount} Wilayah
                </span>
                <span className="text-[9px] sm:text-[10px] text-zinc-500 uppercase font-bold tracking-wider block mt-0.5 sm:mt-1">
                  Stasiun BMKG
                </span>
              </div>
              <div>
                <span className="block text-base sm:text-xl font-extrabold text-[#0c2d52]">
                  3 Peran
                </span>
                <span className="text-[9px] sm:text-[10px] text-zinc-500 uppercase font-bold tracking-wider block mt-0.5 sm:mt-1">
                  Nelayan, Peneliti, Warga
                </span>
              </div>
              <div>
                <span className="block text-base sm:text-xl font-extrabold text-[#0c2d52]">
                  Real-Time
                </span>
                <span className="text-[9px] sm:text-[10px] text-zinc-500 uppercase font-bold tracking-wider block mt-0.5 sm:mt-1">
                  Peringatan Dini
                </span>
              </div>
            </div>
          </div>

          {/* Column 2: Text Narrative (Compact & Legible) */}
          <div className="flex flex-col justify-center">
            <span className="text-[#0c2d52] text-xs font-extrabold uppercase tracking-widest">
              Tentang Oceanagara
            </span>
            <h2 className="mt-1.5 sm:mt-2 text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-zinc-900 leading-tight">
              Sistem Peringatan Dini Eco-Health &amp; Navigasi Maritim Terpadu
            </h2>
            <div className="mt-3 sm:mt-4 h-1 w-12 sm:w-16 bg-[#0c2d52] rounded-full" />

            <p className="mt-4 sm:mt-6 text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
              Oceanagara menghadirkan ekosistem digital maritim berbasis data asli satelit dan BMKG. Kami menghubungkan nelayan tradisional, peneliti bahari, dan masyarakat pesisir dalam satu platform peringatan dini untuk menjaga kesehatan perairan dan keselamatan laut Indonesia.
            </p>

            <div className="mt-6 sm:mt-8 space-y-3.5 sm:space-y-4">
              <div className="flex items-start gap-3 sm:gap-3.5">
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-md bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-[11px] sm:text-xs font-extrabold text-zinc-900 uppercase tracking-wide">
                    Navigasi Zona Tangkap Pesisir (&lt; 12 Mil)
                  </h4>
                  <p className="text-[11px] sm:text-xs text-zinc-500 mt-0.5 leading-relaxed">
                    Membantu nelayan menemukan lokasi kumpul ikan terdekat dilengkapi estimasi rute hemat BBM dan indikator tinggi ombak BMKG.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-3.5">
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-md bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-[11px] sm:text-xs font-extrabold text-zinc-900 uppercase tracking-wide">
                    Lapor Limbah &amp; Minyak dengan GPS Terverifikasi
                  </h4>
                  <p className="text-[11px] sm:text-xs text-zinc-500 mt-0.5 leading-relaxed">
                    Nelayan di laut dan warga pesisir dapat mengirim bukti foto limbah yang tervalidasi 3-lapis AI &amp; tersinkronisasi otomatis ke dashboard peneliti.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-3.5">
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-md bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-[11px] sm:text-xs font-extrabold text-zinc-900 uppercase tracking-wide">
                    Pemetaan Risiko &amp; Arus Pencemaran Spasial
                  </h4>
                  <p className="text-[11px] sm:text-xs text-zinc-500 mt-0.5 leading-relaxed">
                    Peneliti dapat memantau peta risiko eco-health laut, mensimulasikan pergerakan lintasan partikel limbah, serta mengevaluasi kualitas ikan secara ilmiah.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
