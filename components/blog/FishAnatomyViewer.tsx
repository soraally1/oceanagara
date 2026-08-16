'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AnatomyPart {
  id: string;
  name: string;
  hotspotPos: { top: string; left: string };
  freshTitle: string;
  freshDesc: string;
  freshBadge: string;
  spoiledTitle: string;
  spoiledDesc: string;
  spoiledBadge: string;
  icon: React.ReactNode;
}

const ANATOMY_PARTS: AnatomyPart[] = [
  {
    id: 'mata',
    name: '1. Kondisi Mata',
    hotspotPos: { top: '32%', left: '22%' },
    freshTitle: 'Jernih, Cembung & Kornea Transparan',
    freshDesc: 'Mata ikan segar menonjol cembung ke luar, hitam pekat bening seperti kaca, tanpa selaput keruh.',
    freshBadge: 'Mata Jernih',
    spoiledTitle: 'Keruh, Cekung & Kornea Buram',
    spoiledDesc: 'Mata ikan melesak ke dalam (cekung), berwarna abu-abu buram, menandakan penurunan kesegaran drastis.',
    spoiledBadge: 'Mata Cekung',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      </svg>
    ),
  },
  {
    id: 'insang',
    name: '2. Warna Insang',
    hotspotPos: { top: '48%', left: '32%' },
    freshTitle: 'Merah Cerah & Bebas Lendir Pekat',
    freshDesc: 'Insang berwarna merah darah segar alami, bersih, dan lembap tanpa gumpalan lendir cokelat.',
    freshBadge: 'Merah Cerah',
    spoiledTitle: 'Pucat, Kecokelatan & Berlendir',
    spoiledDesc: 'Insang berubah kusam kelabu atau cokelat gelap, tertutup lendir tebal akibat kontaminasi bakteri.',
    spoiledBadge: 'Pucat Cokelat',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
      </svg>
    ),
  },
  {
    id: 'aroma',
    name: '3. Aroma / Bau',
    hotspotPos: { top: '25%', left: '45%' },
    freshTitle: 'Amis Laut Segar Alami',
    freshDesc: 'Aroma khas air laut yang segar dan menenangkan. Tidak menusuk hidung dan tidak berbau tengik.',
    freshBadge: 'Aroma Segar',
    spoiledTitle: 'Amonia Tajam & Bau Busuk',
    spoiledDesc: 'Bau asam menyengat, busuk, atau amonia tajam akibat penguraian protein oleh bakteri pembusuk.',
    spoiledBadge: 'Amonia Busuk',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3" />
      </svg>
    ),
  },
  {
    id: 'tekstur',
    name: '4. Tekstur Daging',
    hotspotPos: { top: '40%', left: '55%' },
    freshTitle: 'Kenyal, Padat & Membal Kembali',
    freshDesc: 'Saat ditekan dengan jari selama 2 detik, daging segera kembali ke bentuk semula tanpa bekas lekukan.',
    freshBadge: 'Kenyal Membal',
    spoiledTitle: 'Lembek & Meninggalkan Bekas Tekan',
    spoiledDesc: 'Daging terasa lembek, berair, dan lekukan jari tidak kembali ke bentuk awal.',
    spoiledBadge: 'Lembek Rusak',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5" />
      </svg>
    ),
  },
  {
    id: 'sisik',
    name: '5. Kondisi Sisik',
    hotspotPos: { top: '30%', left: '68%' },
    freshTitle: 'Melekat Kuat & Mengkilap Rapat',
    freshDesc: 'Sisik menempel sangat rapat pada kulit, berkilau alami, dan tidak mudah lepas saat digosok.',
    freshBadge: 'Sisik Rapat',
    spoiledTitle: 'Kusam & Mudah Lepas / Rontok',
    spoiledDesc: 'Sisik tampak kusam, banyak yang terkelupas atau rontok saat disentuh dengan lembut.',
    spoiledBadge: 'Mudah Rontok',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
      </svg>
    ),
  },
  {
    id: 'kulit',
    name: '6. Warna Kulit',
    hotspotPos: { top: '55%', left: '68%' },
    freshTitle: 'Cerah, Mengkilap & Warna Asli',
    freshDesc: 'Warna kulit terang berkilau sesuai spesiesnya (misal perak mengkilap atau merah muda cerah).',
    freshBadge: 'Kulit Cerah',
    spoiledTitle: 'Kusam, Pucat & Pudar',
    spoiledDesc: 'Warna asli kulit pudar menjadi abu-abu kusam atau kekuningan akibat proses oksidasi.',
    spoiledBadge: 'Kulit Kusam',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 0 0 5.304 0l6.401-6.402M6.75 21A3.75 3.75 0 0 1 3 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 0 0 3.75-3.75V8.197" />
      </svg>
    ),
  },
  {
    id: 'lendir',
    name: '7. Kondisi Lendir',
    hotspotPos: { top: '65%', left: '48%' },
    freshTitle: 'Lapisan Lendir Tipis & Bening',
    freshDesc: 'Lendir alami di permukaan kulit tipis, transparan, licin, dan tidak berbau busuk.',
    freshBadge: 'Lendir Jernih',
    spoiledTitle: 'Lendir Tebal, Keruh & Lengket',
    spoiledDesc: 'Lendir menebal, menjadi keruh berbusa kekuningan dan terasa lekat di tangan.',
    spoiledBadge: 'Lendir Keruh',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 0 0 9-9c0-4.97-4.03-9-9-9s-9 4.03-9 9a9 9 0 0 0 9 9Z" />
      </svg>
    ),
  },
  {
    id: 'perut',
    name: '8. Rongga Perut',
    hotspotPos: { top: '65%', left: '38%' },
    freshTitle: 'Padat, Utuh & Tidak Kembung',
    freshDesc: 'Dinding perut terasa padat elastis, tidak ada pembengkakan gas atau cairan keluar.',
    freshBadge: 'Perut Padat',
    spoiledTitle: 'Kembung, Lembek & Bergas',
    spoiledDesc: 'Perut bengkak kembung berisi gas hasil dekomposisi internal organ dalam.',
    spoiledBadge: 'Perut Kembung',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
  },
];

export default function FishAnatomyViewer() {
  const [selectedPartId, setSelectedPartId] = useState<string>('mata');
  const [viewState, setViewState] = useState<'fresh' | 'spoiled'>('fresh');
  const [isPressingFlesh, setIsPressingFlesh] = useState(false);

  const selectedPart = ANATOMY_PARTS.find((p) => p.id === selectedPartId) || ANATOMY_PARTS[0];

  const handleSimulatePress = () => {
    setIsPressingFlesh(true);
    setTimeout(() => setIsPressingFlesh(false), 1200);
  };

  return (
    <div className="w-full bg-white border border-slate-200 rounded-3xl p-5 md:p-8 text-slate-900 shadow-xl relative overflow-hidden">
      {/* Header */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-50 border border-sky-200 text-[#162e52] text-xs font-bold mb-2">
            <svg className="w-4 h-4 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            <span>Diagram Anatomi Visual 2D</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#162e52] tracking-tight">
            Inspeksi Visual Ciri Kesegaran Ikan
          </h2>
          <p className="text-slate-600 text-xs md:text-sm mt-1">
            Klik titik interaktif pada fisik ikan di bawah untuk melihat perbedaan visual instan.
          </p>
        </div>

        {/* Global Toggle: Fresh vs Spoiled */}
        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 self-start md:self-auto shadow-inner">
          <button
            onClick={() => setViewState('fresh')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 ${
              viewState === 'fresh'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 scale-105'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            <span>IKAN SEGAR</span>
          </button>
          <button
            onClick={() => setViewState('spoiled')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 ${
              viewState === 'spoiled'
                ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30 scale-105'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span>IKAN BUSUK</span>
          </button>
        </div>
      </div>

      {/* 2D Interactive Fish Illustration Canvas */}
      <div className="my-6 relative z-10 bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-inner min-h-[300px] flex flex-col justify-center items-center overflow-hidden text-white">
        <div className="relative w-full max-w-2xl h-64 flex items-center justify-center">
          <svg className="w-full h-full drop-shadow-2xl" viewBox="0 0 600 240" fill="none">
            <motion.path
              d="M 120 120 C 180 50, 420 50, 480 120 C 420 190, 180 190, 120 120 Z"
              fill={viewState === 'fresh' ? 'url(#freshGradLight)' : 'url(#spoiledGradLight)'}
              stroke={viewState === 'fresh' ? '#2dd4bf' : '#fb7185'}
              strokeWidth="3"
              animate={{
                d: isPressingFlesh
                  ? 'M 120 120 C 180 50, 420 75, 480 120 C 420 190, 180 190, 120 120 Z'
                  : 'M 120 120 C 180 50, 420 50, 480 120 C 420 190, 180 190, 120 120 Z',
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            />

            <path
              d="M 480 120 L 560 60 L 535 120 L 560 180 Z"
              fill={viewState === 'fresh' ? '#0f766e' : '#881337'}
              stroke={viewState === 'fresh' ? '#2dd4bf' : '#f43f5e'}
              strokeWidth="2"
            />

            <path
              d="M 260 68 C 300 20, 360 20, 390 68 Z"
              fill={viewState === 'fresh' ? '#14b8a6' : '#9f1239'}
              stroke={viewState === 'fresh' ? '#5eead4' : '#fb7185'}
              strokeWidth="2"
            />

            <path
              d="M 230 130 C 260 140, 270 170, 240 165 Z"
              fill={viewState === 'fresh' ? '#0d9488' : '#be123c'}
              stroke="#ffffff"
              strokeWidth="1.5"
            />

            <path
              d="M 190 85 C 210 110, 210 130, 190 155"
              stroke={viewState === 'fresh' ? '#ef4444' : '#7f1d1d'}
              strokeWidth="5"
              strokeLinecap="round"
            />

            <circle
              cx="160"
              cy="100"
              r="16"
              fill={viewState === 'fresh' ? '#ffffff' : '#94a3b8'}
              stroke={viewState === 'fresh' ? '#0284c7' : '#475569'}
              strokeWidth="2"
            />
            <circle
              cx="160"
              cy="100"
              r={viewState === 'fresh' ? '8' : '11'}
              fill={viewState === 'fresh' ? '#0284c7' : '#334155'}
            />
            {viewState === 'fresh' && <circle cx="157" cy="97" r="3" fill="#ffffff" />}

            <defs>
              <linearGradient id="freshGradLight" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0d9488" />
                <stop offset="50%" stopColor="#0284c7" />
                <stop offset="100%" stopColor="#0f766e" />
              </linearGradient>
              <linearGradient id="spoiledGradLight" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#881337" />
                <stop offset="50%" stopColor="#450a0a" />
                <stop offset="100%" stopColor="#701a75" />
              </linearGradient>
            </defs>
          </svg>

          {/* Interactive Hotspot Buttons */}
          {ANATOMY_PARTS.map((part) => {
            const isSelected = part.id === selectedPartId;
            return (
              <button
                key={part.id}
                onClick={() => setSelectedPartId(part.id)}
                style={{ top: part.hotspotPos.top, left: part.hotspotPos.left }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 group z-20 flex items-center justify-center transition-all duration-300 ${
                  isSelected ? 'scale-125 z-30' : 'hover:scale-110'
                }`}
              >
                <span
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shadow-lg transition-all duration-300 ${
                    isSelected
                      ? viewState === 'fresh'
                        ? 'bg-emerald-500 text-white shadow-emerald-500/50 animate-pulse ring-4 ring-emerald-300'
                        : 'bg-rose-500 text-white shadow-rose-500/50 animate-pulse ring-4 ring-rose-300'
                      : 'bg-white text-[#162e52] border border-slate-300 hover:bg-[#162e52] hover:text-white'
                  }`}
                >
                  {part.icon}
                </span>

                <span
                  className={`absolute top-full mt-1.5 whitespace-nowrap text-[10px] font-bold px-2.5 py-0.5 rounded-full backdrop-blur-md shadow-md border transition-all duration-200 ${
                    isSelected
                      ? 'bg-[#162e52] text-white border-sky-400'
                      : 'bg-white text-slate-800 border-slate-300 group-hover:bg-slate-100'
                  }`}
                >
                  {part.name.split('. ')[1]}
                </span>
              </button>
            );
          })}
        </div>

        {selectedPartId === 'tekstur' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 flex items-center gap-3 bg-slate-800 px-4 py-2 rounded-xl border border-slate-700"
          >
            <span className="text-xs text-slate-300">Uji Tekan Jari pada Daging:</span>
            <button
              onClick={handleSimulatePress}
              disabled={isPressingFlesh}
              className="px-3.5 py-1.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-extrabold text-xs rounded-lg transition-all shadow-md active:scale-95 disabled:opacity-50 flex items-center gap-1.5"
            >
              <span>👉</span>
              <span>{isPressingFlesh ? 'Membal Kembali...' : 'Tekan Daging (2 Detik)'}</span>
            </button>
          </motion.div>
        )}
      </div>

      {/* Parts Selector Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none relative z-10">
        {ANATOMY_PARTS.map((part) => (
          <button
            key={part.id}
            onClick={() => setSelectedPartId(part.id)}
            className={`flex-shrink-0 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all duration-200 flex items-center gap-2 ${
              selectedPartId === part.id
                ? 'bg-[#162e52] text-white border-[#162e52] shadow-md font-extrabold'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-sky-300'
            }`}
          >
            <span className={selectedPartId === part.id ? 'text-sky-300' : 'text-[#162e52]'}>{part.icon}</span>
            <span>{part.name}</span>
          </button>
        ))}
      </div>

      {/* Selected Indicator Comparative Card */}
      <div className="mt-6 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedPart.id}-${viewState}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className={`p-6 rounded-2xl border ${
              viewState === 'fresh'
                ? 'bg-emerald-50/80 border-emerald-200'
                : 'bg-rose-50/80 border-rose-200'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <span className={`p-2.5 rounded-xl ${viewState === 'fresh' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                  {selectedPart.icon}
                </span>
                <div>
                  <h3 className="text-lg font-black text-[#162e52]">{selectedPart.name}</h3>
                  <p className="text-xs text-slate-500">Panduan Pemeriksaan Kesegaran Organ</p>
                </div>
              </div>
              <span
                className={`text-xs font-extrabold px-3.5 py-1.5 rounded-full border self-start sm:self-auto ${
                  viewState === 'fresh'
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                    : 'bg-rose-100 text-rose-800 border-rose-300'
                }`}
              >
                {viewState === 'fresh' ? selectedPart.freshBadge : selectedPart.spoiledBadge}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
              <div
                onClick={() => setViewState('fresh')}
                className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                  viewState === 'fresh'
                    ? 'bg-white border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
                    : 'bg-slate-50 border-slate-200 opacity-60 hover:opacity-100'
                }`}
              >
                <div className="flex items-center gap-1.5 text-emerald-700 font-extrabold text-xs mb-1.5">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <span>CIRI IKAN SEGAR</span>
                </div>
                <h4 className="text-sm font-extrabold text-slate-900 mb-1">{selectedPart.freshTitle}</h4>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {selectedPart.freshDesc}
                </p>
              </div>

              <div
                onClick={() => setViewState('spoiled')}
                className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                  viewState === 'spoiled'
                    ? 'bg-white border-rose-500 shadow-md ring-2 ring-rose-500/20'
                    : 'bg-slate-50 border-slate-200 opacity-60 hover:opacity-100'
                }`}
              >
                <div className="flex items-center gap-1.5 text-rose-700 font-extrabold text-xs mb-1.5">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span>CIRI IKAN BUSUK</span>
                </div>
                <h4 className="text-sm font-extrabold text-slate-900 mb-1">{selectedPart.spoiledTitle}</h4>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {selectedPart.spoiledDesc}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
