'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ParameterData {
  id: string;
  number: string;
  title: string;
  unit: string;
  optimalRange: string;
  currentValueHealthy: string;
  currentValueDanger: string;
  healthyDesc: string;
  dangerDesc: string;
  healthyIndicators: string[];
  dangerWarning: string;
  icon: React.ReactNode;
}

const PARAMETERS: ParameterData[] = [
  {
    id: 'kejernihan',
    number: '01',
    title: 'Kejernihan & Warna Air',
    unit: 'Visibilitas (Meter)',
    optimalRange: 'Visibilitas ≥ 10 meter',
    currentValueHealthy: '12 Meter (Biru Jernih Alami)',
    currentValueDanger: '2 Meter (Keruh Berbusa/HAB)',
    healthyDesc:
      'Air jernih menembus sinar matahari hingga kedalaman dasar, memungkinkan fotosintesis fitoplankton dan terumbu karang berkembang biak secara sehat.',
    dangerDesc:
      'Penurunan kejernihan dipicu blooming alga (HAB) atau penumpukan limbah. Penutupan cahaya matahari mematikan biota karang.',
    healthyIndicators: [
      'Warna air biru/biru-hijau transparan',
      'Permukaan air bersih tanpa lapisan minyak',
      'Visibilitas jarak pandang bawah air > 10m',
      'Tidak ada buih limbah berlebih',
    ],
    dangerWarning:
      'Perubahan warna menjadi cokelat atau merah pekat menandakan Red Tide (Blooming Alga Beracun) yang berbahaya bagi biota & manusia.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 0 0 9-9c0-4.97-4.03-9-9-9s-9 4.03-9 9a9 9 0 0 0 9 9Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 3" />
      </svg>
    ),
  },
  {
    id: 'salinitas',
    number: '02',
    title: 'Salinitas (Kadar Garam)',
    unit: 'PSU (Practical Salinity Unit)',
    optimalRange: '30 – 35 PSU (Laut Tropis)',
    currentValueHealthy: '33 PSU (Normal Seimbang)',
    currentValueDanger: '22 PSU (Hiposalinitas Hujan/Limbah)',
    healthyDesc:
      'Salinitas stabil menjaga tekanan osmotik sel ikan dan karang tetap seimbang sehingga biota tidak dehidrasi maupun menyerap air berlebih.',
    dangerDesc:
      'Limpasan air tawar berlebih mendadak menurunkan kadar garam, memicu stres osmotik massal pada organisme pesisir.',
    healthyIndicators: [
      'Kadar garam konstan 30–35 PSU',
      'Dapat diukur cepat dengan refraktometer',
      'Pertumbuhan karang & krustasea optimal',
      'Sirkulasi massa air laut lancar',
    ],
    dangerWarning:
      'Perubahan salinitas mendadak di bawah 28 PSU dapat membunuh burayak ikan dan benih udang dalam hitungan jam.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.037-.502.082-.75.136M9.75 3.104a48.517 48.517 0 0 1 4.5 0M14.25 3.104v5.714c0 .597.237 1.17.659 1.591L19 14.5M14.25 3.104c.251.037.502.082.75.136M5 14.5a3.75 3.75 0 0 0 3.75 3.75h6.5A3.75 3.75 0 0 0 19 14.5" />
      </svg>
    ),
  },
  {
    id: 'ph',
    number: '03',
    title: 'Derajat Keasaman (pH)',
    unit: 'Skala pH (0–14)',
    optimalRange: '7.8 – 8.3 (Basa Optimal)',
    currentValueHealthy: 'pH 8.1 (Basa Sehat)',
    currentValueDanger: 'pH 7.4 (Pengasaman Laut)',
    healthyDesc:
      'Air laut alami bersifat sedikit basa, memberikan konsentrasi ion karbonat yang melimpah bagi kerang dan karang untuk membentuk cangkang keras.',
    dangerDesc:
      'Penyerapan emisi CO2 atmosfer secara masif memicu pengasaman laut, melarutkan cangkang kerang dan memicu pemutihan karang (bleaching).',
    healthyIndicators: [
      'pH stabil pada rentang 7.8–8.3',
      'Struktur terumbu karang keras & kokoh',
      'Pembentukan cangkang moluska lancar',
      'Daya tahan biota terhadap penyakit tinggi',
    ],
    dangerWarning:
      'Penurunan 0.1 unit pH setara dengan peningkatan keasaman 26% — merusak rantai makanan pesisir secara permanen.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 0 0 9-9" />
      </svg>
    ),
  },
  {
    id: 'oksigen',
    number: '04',
    title: 'Oksigen Terlarut (DO)',
    unit: 'mg/L (Miligram per Liter)',
    optimalRange: '≥ 6.0 mg/L (Kelimpahan Oksigen)',
    currentValueHealthy: '7.5 mg/L (Sangat Sehat)',
    currentValueDanger: '1.8 mg/L (Zona Mati / Hypoxia)',
    healthyDesc:
      'Dissolved Oxygen melimpah menyuplai insang ikan dan organisme bentik untuk bernapas dan beraktivitas secara aktif.',
    dangerDesc:
      'Eutrofikasi limbah pupuk memicu pembusukan alga masif yang menguras oksigen di air, menciptakan "Dead Zone" tanpa kehidupan.',
    healthyIndicators: [
      'DO minimal 6 mg/L untuk respirasi aktif',
      'Ikan berenang bebas di berbagai kedalaman',
      'Kehidupan bentik & cacing laut aktif',
      'Bebas dari penumpukan busa limbah',
    ],
    dangerWarning:
      'Kadar DO di bawah 2 mg/L (hipoksia) menyebabkan kematian massal (fish kill) secara mendadak di kawasan pesisir.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18m9-9H3" />
      </svg>
    ),
  },
  {
    id: 'biota',
    number: '05',
    title: 'Biota Indikator Ekosistem',
    unit: 'Indeks Biodiversitas',
    optimalRange: 'Karang Hidup & Keanekaragaman Tinggi',
    currentValueHealthy: 'Biodiversitas Tinggi (Reef Sehat)',
    currentValueDanger: 'Karang Mati / Pemutihan (Bleached)',
    healthyDesc:
      'Kehadiran padang lamun subur, penyu, dan beragam spesies ikan karang menandakan ekosistem laut dalam kondisi keseimbangan alami prima.',
    dangerDesc:
      'Dominasi alga parasit atau karang yang berubah memutih tandus menandakan rusaknya habitat pendukung kehidupan pesisir.',
    healthyIndicators: [
      'Tutupan terumbu karang hidup > 50%',
      'Padang lamun lebat penghasil oksigen',
      'Keragaman ikan karang beragam warna',
      'Keseimbangan predator dan mangsa',
    ],
    dangerWarning:
      'Pemutihan karang (bleaching) terjadi saat suhu air laut naik 1–2°C dari ambang batas normal secara berkepanjangan.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      </svg>
    ),
  },
];

export default function OceanWaterSimulator() {
  const [selectedParamIndex, setSelectedParamIndex] = useState(0);
  const [isHealthyMode, setIsHealthyMode] = useState(true);

  const currentParam = PARAMETERS[selectedParamIndex];

  return (
    <div className="w-full bg-white border border-slate-200 rounded-3xl p-5 md:p-8 text-slate-900 shadow-xl overflow-hidden relative">
      {/* Header Section */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-bold mb-2">
            <span className="w-2 h-2 rounded-full bg-sky-500 animate-ping" />
            Simulator Interaktif Ekosistem Laut
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#162e52] tracking-tight">
            Edukasi Visual Parameter Air Laut
          </h2>
          <p className="text-slate-600 text-xs md:text-sm mt-1 max-w-xl">
            Geser sakelar simulasi untuk melihat perbedaan langsung antara kondisi laut yang{' '}
            <strong className="text-emerald-700 font-bold">SEHAT</strong> vs{' '}
            <strong className="text-rose-700 font-bold">TERCEMAR / KRITIS</strong>.
          </p>
        </div>

        {/* Interactive Mode Toggle */}
        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 shadow-inner self-start lg:self-auto">
          <button
            onClick={() => setIsHealthyMode(true)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 ${
              isHealthyMode
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 scale-105'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <svg className="w-4 h-4 text-emerald-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            <span>Kondisi Sehat</span>
          </button>
          <button
            onClick={() => setIsHealthyMode(false)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 ${
              !isHealthyMode
                ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30 scale-105'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <svg className="w-4 h-4 text-rose-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
            <span>Kondisi Kritis / Tercemar</span>
          </button>
        </div>
      </div>

      {/* Parameter Tabs Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 my-6 relative z-10">
        {PARAMETERS.map((param, idx) => {
          const isActive = idx === selectedParamIndex;
          return (
            <button
              key={param.id}
              onClick={() => setSelectedParamIndex(idx)}
              className={`relative text-left p-3.5 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                isActive
                  ? 'bg-[#162e52] text-white border-[#162e52] shadow-lg shadow-[#162e52]/20 scale-[1.02]'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-sky-300 hover:bg-sky-50/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`p-2 rounded-xl ${isActive ? 'bg-white/10 text-sky-200' : 'bg-slate-200/80 text-[#162e52]'}`}>
                  {param.icon}
                </span>
                <span
                  className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                    isActive ? 'bg-sky-400 text-slate-950' : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {param.number}
                </span>
              </div>
              <div className="mt-3">
                <h4 className="text-xs font-bold leading-snug line-clamp-2">{param.title}</h4>
                <p className={`text-[10px] mt-0.5 ${isActive ? 'text-sky-200' : 'text-slate-400'}`}>
                  {param.unit.split(' ')[0]}
                </p>
              </div>
              {isActive && (
                <motion.div
                  layoutId="activeTabGlow"
                  className="absolute -bottom-1 left-4 right-4 h-1 bg-sky-400 rounded-full"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Main Interactive Canvas & Details Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
        {/* Animated Ocean Canvas */}
        <div className="lg:col-span-6 rounded-2xl overflow-hidden border border-slate-200 relative min-h-[320px] flex flex-col justify-between p-6 shadow-inner bg-slate-900 text-white">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${currentParam.id}-${isHealthyMode ? 'healthy' : 'danger'}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 pointer-events-none"
            >
              {isHealthyMode ? (
                <div className="w-full h-full bg-gradient-to-b from-sky-600/40 via-teal-700/40 to-blue-950/90">
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute rounded-full bg-white/20 border border-white/30 backdrop-blur-[1px]"
                      style={{
                        width: Math.random() * 16 + 8,
                        height: Math.random() * 16 + 8,
                        left: `${i * 12 + 5}%`,
                        bottom: '-10%',
                      }}
                      animate={{
                        y: [-20, -320],
                        x: [0, i % 2 === 0 ? 20 : -20],
                        opacity: [0, 0.8, 0],
                      }}
                      transition={{
                        duration: 4 + i * 0.8,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: i * 0.4,
                      }}
                    />
                  ))}
                  {/* Floating SVG Icons */}
                  <motion.div
                    className="absolute top-1/4 left-0 text-sky-200"
                    animate={{ x: [-50, 420] }}
                    transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                  >
                    <svg className="w-8 h-8 opacity-80" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                    </svg>
                  </motion.div>
                </div>
              ) : (
                <div className="w-full h-full bg-gradient-to-b from-amber-900/50 via-stone-900/80 to-slate-950">
                  {[...Array(10)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute rounded-full bg-amber-600/30 blur-[2px]"
                      style={{
                        width: Math.random() * 24 + 12,
                        height: Math.random() * 24 + 12,
                        left: `${i * 8 + 4}%`,
                        top: `${i * 7 + 10}%`,
                      }}
                      animate={{
                        scale: [1, 1.4, 1],
                        opacity: [0.3, 0.7, 0.3],
                      }}
                      transition={{
                        duration: 3 + i * 0.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                  ))}
                  <div className="absolute top-10 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-rose-950/90 border border-rose-500/60 rounded-full text-rose-200 text-xs font-bold animate-bounce shadow-lg flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                    </svg>
                    <span>TERJADI DEGRADASI EKOSISTEM</span>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Top Status Badge */}
          <div className="relative z-10 flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-lg bg-slate-900/80 border border-sky-700/40 text-sky-200">
              {currentParam.title}
            </span>
            <span
              className={`text-xs font-black px-3 py-1 rounded-lg border ${
                isHealthyMode
                  ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300'
                  : 'bg-rose-950/80 border-rose-500/50 text-rose-300'
              }`}
            >
              {isHealthyMode ? 'STATUS: OPTIMAL' : 'STATUS: BAHAYA'}
            </span>
          </div>

          {/* Center Visual Gauge */}
          <div className="relative z-10 my-auto text-center py-6">
            <motion.div
              key={`${currentParam.id}-gauge-${isHealthyMode}`}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="inline-block"
            >
              <div
                className={`text-3xl sm:text-4xl md:text-5xl font-black tracking-tight ${
                  isHealthyMode ? 'text-emerald-300 drop-shadow-[0_0_20px_#10b981]' : 'text-rose-400 drop-shadow-[0_0_20px_#f43f5e]'
                }`}
              >
                {isHealthyMode ? currentParam.currentValueHealthy : currentParam.currentValueDanger}
              </div>
              <p className="text-xs text-sky-200/80 mt-2 font-medium">
                Rentang Acuan Sehat: <span className="text-white font-bold">{currentParam.optimalRange}</span>
              </p>
            </motion.div>
          </div>

          {/* Bottom Live Meter Bar */}
          <div className="relative z-10 bg-slate-950/90 p-4 rounded-xl border border-sky-900/50 backdrop-blur-md">
            <div className="flex items-center justify-between text-xs mb-1.5 font-bold">
              <span className="text-sky-300">Indikator Kualitas Air</span>
              <span className={isHealthyMode ? 'text-emerald-400' : 'text-rose-400'}>
                {isHealthyMode ? '95 / 100 (Optimal)' : '25 / 100 (Sangat Rendah)'}
              </span>
            </div>
            <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-sky-900/50">
              <motion.div
                className={`h-full rounded-full ${
                  isHealthyMode
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                    : 'bg-gradient-to-r from-rose-600 to-amber-500'
                }`}
                initial={{ width: 0 }}
                animate={{ width: isHealthyMode ? '95%' : '25%' }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
            </div>
          </div>
        </div>

        {/* Detailed Explanation Side Panel */}
        <div className="lg:col-span-6 flex flex-col justify-between gap-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${currentParam.id}-detail-${isHealthyMode}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {/* Description Card */}
              <div
                className={`p-5 rounded-2xl border ${
                  isHealthyMode
                    ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                    : 'bg-rose-50/70 border-rose-200 text-rose-950'
                }`}
              >
                <h4
                  className={`text-xs font-black uppercase tracking-wide mb-2 ${
                    isHealthyMode ? 'text-emerald-800' : 'text-rose-800'
                  }`}
                >
                  {isHealthyMode ? 'Penjelasan Kondisi Sehat:' : 'Dampak Penurunan Kualitas:'}
                </h4>
                <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-normal">
                  {isHealthyMode ? currentParam.healthyDesc : currentParam.dangerDesc}
                </p>
              </div>

              {/* Key Indicators Checklist */}
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200">
                <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#162e52] mb-3">
                  Ciri & Indikator Fisik di Lapangan
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {currentParam.healthyIndicators.map((ind, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2.5 p-2.5 bg-white rounded-xl border border-slate-200 shadow-sm"
                    >
                      <svg className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      <span className="text-xs text-slate-700 leading-tight">{ind}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Warning Alert Callout */}
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3">
                <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                </svg>
                <div className="text-xs text-amber-900 leading-relaxed">
                  <strong className="font-bold text-amber-950 block mb-0.5">Peringatan Penting:</strong>
                  {currentParam.dangerWarning}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
