'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProcessingStep {
  number: string;
  title: string;
  subtitle: string;
  tempTarget: string;
  durationTarget: string;
  detail: string;
  proTip: string;
  icon: React.ReactNode;
}

const STEPS: ProcessingStep[] = [
  {
    number: '01',
    title: 'Pendinginan Segera',
    subtitle: 'Lakukan dalam 30 menit setelah ikan ditangkap / dibeli',
    tempTarget: '0°C – 4°C (Suhu Es)',
    durationTarget: 'Maks. 2 hari di kulkas',
    detail:
      'Bakteri pembusuk berkembang biak 2x lebih cepat pada suhu 4°C–60°C. Segera benamkan ikan ke dalam wadah berisi es batu berselang-seling (perbandingan 1:1 es dan ikan).',
    proTip: 'Letakkan es batu di ATAS dan di SEKELILING ikan agar lelehan es dingin terus mengalir ke bawah.',
    icon: (
      <svg className="w-6 h-6 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18m9-9H3m14.828-5.828L6.172 17.828m11.656 0L6.172 6.172" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Pencucian Air Mengalir',
    subtitle: 'Cuci sebelum dan sesudah membuang isi perut',
    tempTarget: 'Air Mengalir Bersih',
    durationTarget: '30 – 60 detik / ekor',
    detail:
      'Alirkan air dingin bersih untuk membilas lendir kotor dan kotoran permukaan. HINDARI merendam ikan dalam baskom air diam karena akan menyebarkan bakteri silang.',
    proTip: 'Gunakan air mengalir bersuhu dingin. Air hangat akan mulai mematangkan daging ikan secara prematur.',
    icon: (
      <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Z" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Pembersihan Isi Perut',
    subtitle: 'Keluarkan organ dalam penyebab pembusukan autolisis',
    tempTarget: 'Sesegera Mungkin',
    durationTarget: '< 5 menit proses',
    detail:
      'Isi perut mengandung enzim pencernaan aktif. Sayat perut bawah ikan, keluarkan seluruh jeroan, dan kerok selaput darah hitam di dekat tulang belakang hingga bersih.',
    proTip: 'Bungkus organ dalam dengan kantong plastik tertutup rapat sebelum dibuang ke tempat sampah.',
    icon: (
      <svg className="w-6 h-6 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Pemisahan Wadah Kulkas',
    subtitle: 'Cegah kontaminasi silang dengan makanan lain',
    tempTarget: '0°C – 4°C (Rak Bawah)',
    durationTarget: 'Maks. 1–2 hari',
    detail:
      'Ikan mentah tidak boleh menyentuh makanan matang atau sayuran. Simpan dalam wadah kedap udara dan letakkan di RAK PALING BAWAH kulkas agar tetesan air tidak mencemari makanan lain.',
    proTip: 'Tempelkan stiker label tanggal pembelian pada wadah agar mengetahui batas aman konsumsi.',
    icon: (
      <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
      </svg>
    ),
  },
  {
    number: '05',
    title: 'Pemasakan Suhu Tepat',
    subtitle: 'Membunuh patogen Salmonella, Vibrio & Listeria',
    tempTarget: 'Min. 70°C Bagian Dalam',
    durationTarget: '15 detik konsisten',
    detail:
      'Masak ikan hingga bagian dalam yang paling tebal mencapai suhu minimal 70°C. Ciri fisik matang: daging berubah putih seragam (opak) dan mudah terkelupas dengan garpu.',
    proTip: 'Periksa bagian daging paling tebal di dekat tulang belakang untuk memastikan tingkat kematangan sempurna.',
    icon: (
      <svg className="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 1 3 2.48Z" />
      </svg>
    ),
  },
  {
    number: '06',
    title: 'Penyimpanan Sisa Masakan',
    subtitle: 'Penanganan higienis ikan matang',
    tempTarget: '-18°C (Freezer) / 0–4°C (Kulkas)',
    durationTarget: '1–2 Hari Kulkas | 1–3 Bulan Freezer',
    detail:
      'Jangan biarkan ikan matang di suhu ruang lebih dari 2 jam. Masukkan ke dalam kulkas atau bekukan di freezer per porsi jika ingin disimpan jangka panjang.',
    proTip: 'Panaskan kembali sisa ikan hingga benar-benar panas merata sebelum dikonsumsi ulang.',
    icon: (
      <svg className="w-6 h-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5" />
      </svg>
    ),
  },
];

const STORAGE_MODES = [
  { mode: 'Es Batu (Mentah)', temp: '0°C – 4°C', duration: '1–2 Hari', note: 'Ganti es setiap 8 jam' },
  { mode: 'Kulkas (Mentah)', temp: '0°C – 4°C', duration: '1–2 Hari', note: 'Simpan di rak terbawah wadah tertutup' },
  { mode: 'Freezer (Mentah)', temp: '-18°C', duration: '2–6 Bulan', note: 'Bungkus plastik kedap udara (vacuum)' },
  { mode: 'Kulkas (Masakan)', temp: '0°C – 4°C', duration: '1–2 Hari', note: 'Dinginkan dulu sebelum masuk kulkas' },
  { mode: 'Freezer (Masakan)', temp: '-18°C', duration: '1–3 Bulan', note: 'Bagi per porsi sekali makan' },
];

export default function ProcessingStepTimeline() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [selectedStorageIdx, setSelectedStorageIdx] = useState(0);

  const step = STEPS[activeStepIndex];
  const storage = STORAGE_MODES[selectedStorageIdx];

  return (
    <div className="w-full bg-white border border-slate-200 rounded-3xl p-5 md:p-8 text-slate-900 shadow-xl relative overflow-hidden">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#162e52] bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
            Timeline Animasi 6 Langkah
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#162e52] tracking-tight mt-1.5">
            Protokol Pengolahan Ikan Higienis
          </h2>
          <p className="text-slate-600 text-xs md:text-sm mt-1">
            Klik nomor langkah untuk mempelajari alur kerja pengolahan dari pasar hingga meja makan.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
            disabled={activeStepIndex === 0}
            className="px-3 py-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 disabled:opacity-40 hover:bg-[#162e52] hover:text-white transition-all text-xs font-bold"
          >
            ← Prev
          </button>
          <span className="text-xs font-extrabold text-[#162e52] px-3.5 py-2 bg-sky-50 rounded-xl border border-sky-200">
            {activeStepIndex + 1} / {STEPS.length}
          </span>
          <button
            onClick={() => setActiveStepIndex((prev) => Math.min(STEPS.length - 1, prev + 1))}
            disabled={activeStepIndex === STEPS.length - 1}
            className="px-3 py-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 disabled:opacity-40 hover:bg-[#162e52] hover:text-white transition-all text-xs font-bold"
          >
            Next →
          </button>
        </div>
      </div>

      {/* Step Numbers Bar */}
      <div className="my-6 relative">
        <div className="grid grid-cols-6 gap-2">
          {STEPS.map((s, idx) => {
            const isActive = idx === activeStepIndex;
            return (
              <button
                key={s.number}
                onClick={() => setActiveStepIndex(idx)}
                className={`p-3 rounded-2xl border transition-all duration-300 text-center flex flex-col items-center justify-center gap-1.5 ${
                  isActive
                    ? 'bg-[#162e52] text-white border-[#162e52] font-extrabold shadow-md scale-105'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-sky-300 hover:bg-sky-50/50'
                }`}
              >
                <span className={`p-1.5 rounded-lg ${isActive ? 'bg-white/10 text-sky-300' : 'bg-slate-200/80 text-[#162e52]'}`}>
                  {s.icon}
                </span>
                <span className="text-[10px] font-black uppercase tracking-wider">
                  Step {idx + 1}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Active Step View */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step.number}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-50 rounded-2xl border border-slate-200 p-6 shadow-inner"
        >
          {/* Animated Visual Canvas Box */}
          <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-6 flex flex-col items-center justify-center text-center relative overflow-hidden min-h-[240px] shadow-sm">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="p-4 rounded-2xl bg-sky-50 text-[#162e52] mb-3 relative z-10 shadow-sm border border-sky-100"
            >
              {step.icon}
            </motion.div>

            <span className="text-[10px] font-black uppercase tracking-widest text-[#162e52] px-3 py-1 bg-sky-100 rounded-full border border-sky-200 relative z-10">
              Langkah {step.number}
            </span>
            <h3 className="text-xl font-black text-[#162e52] mt-2 relative z-10">{step.title}</h3>
            <p className="text-xs text-slate-500 mt-1 relative z-10">{step.subtitle}</p>

            <div className="flex flex-wrap items-center justify-center gap-2 mt-4 relative z-10">
              <span className="px-3 py-1 bg-blue-50 text-blue-800 border border-blue-200 text-[11px] font-bold rounded-lg">
                Suhu: {step.tempTarget}
              </span>
              <span className="px-3 py-1 bg-teal-50 text-teal-800 border border-teal-200 text-[11px] font-bold rounded-lg">
                Durasi: {step.durationTarget}
              </span>
            </div>
          </div>

          {/* Step Detail Explanation */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
            <div>
              <h4 className="text-xs font-extrabold uppercase tracking-wide text-[#162e52] mb-2">
                Detail Prosedur Higienis:
              </h4>
              <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-normal mb-4">
                {step.detail}
              </p>

              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-3">
                <svg className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.516 0c.85.493 1.508 1.333 1.508 2.316V18" />
                </svg>
                <div className="text-xs text-emerald-950 leading-relaxed">
                  <strong className="font-bold text-emerald-900 block mb-0.5">Tips Ahli Keamanan Pangan:</strong>
                  {step.proTip}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-xs text-slate-500">
              <span>Oceanagara Food Safety Protocol</span>
              <span className="font-bold text-[#162e52]">Langkah {activeStepIndex + 1} dari 6</span>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Interactive Storage Calculator */}
      <div className="mt-8 pt-6 border-t border-slate-200">
        <div className="mb-4">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#162e52] bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
            Kalkulator Visual Panduan Simpan
          </span>
          <h3 className="text-lg font-extrabold text-[#162e52] mt-1.5">
            Cek Batas Aman & Suhu Penyimpanan Ikan
          </h3>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-none">
          {STORAGE_MODES.map((item, i) => (
            <button
              key={i}
              onClick={() => setSelectedStorageIdx(i)}
              className={`flex-shrink-0 px-4 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                selectedStorageIdx === i
                  ? 'bg-[#162e52] text-white border-[#162e52] shadow-md'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-sky-300'
              }`}
            >
              {item.mode}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedStorageIdx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 bg-slate-50 rounded-2xl border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-sm">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Metode Simpan</span>
              <span className="text-sm font-extrabold text-[#162e52]">{storage.mode}</span>
            </div>
            <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-sm">
              <span className="text-[10px] text-sky-600 uppercase font-bold block">Target Suhu Optimal</span>
              <span className="text-sm font-extrabold text-sky-700">{storage.temp}</span>
            </div>
            <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-sm">
              <span className="text-[10px] text-amber-600 uppercase font-bold block">Batas Maksimal Simpan</span>
              <span className="text-sm font-extrabold text-amber-700">{storage.duration}</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
