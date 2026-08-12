'use client';

import React from 'react';

const SUPPORT_LOGOS = [
  {
    name: 'BMKG - Badan Meteorologi, Klimatologi, dan Geofisika',
    src: '/logo/LogoBMKG.svg',
  },
  {
    name: 'Copernicus - European Space Agency (ESA)',
    src: '/logo/Coppernicus.svg',
  },
  {
    name: 'Global Fishing Watch (GFW)',
    src: '/logo/GFWlogo.svg',
  },
];

export default function SupportLogos() {
  // Duplicate logos for smooth, infinite marquee scrolling
  const marqueeLogos = [
    ...SUPPORT_LOGOS,
    ...SUPPORT_LOGOS,
    ...SUPPORT_LOGOS,
    ...SUPPORT_LOGOS,
    ...SUPPORT_LOGOS,
    ...SUPPORT_LOGOS,
  ];

  return (
    <section className="w-full bg-slate-50/90 border-y border-slate-200/80 py-8 overflow-hidden relative selection:bg-[#204473] selection:text-white">
      {/* Title Header */}
      <div className="max-w-7xl mx-auto px-6 mb-5 text-center">
        <p className="text-[11px] font-extrabold uppercase tracking-widest text-[#0c2d52]/80">
          Dukungan Integrasi Data Satelit &amp; Telemetri Resmi
        </p>
      </div>

      {/* Left & Right Gradient Fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-40 bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-40 bg-gradient-to-l from-slate-50 via-slate-50/80 to-transparent z-10" />

      {/* Infinite Horizontal Marquee Track (Right to Left) */}
      <div className="flex w-full overflow-hidden select-none">
        <div className="flex items-center gap-12 sm:gap-24 animate-marquee whitespace-nowrap min-w-full flex-shrink-0">
          {marqueeLogos.map((logo, idx) => (
            <div
              key={`logo-1-${idx}`}
              className="flex items-center justify-center h-12 sm:h-16 px-4 grayscale hover:grayscale-0 opacity-75 hover:opacity-100 transition-all duration-300 transform hover:scale-105 cursor-pointer"
              title={logo.name}
            >
              <img
                src={logo.src}
                alt={logo.name}
                className="h-10 sm:h-14 w-auto object-contain max-w-[150px] sm:max-w-[220px]"
              />
            </div>
          ))}
        </div>

        <div
          aria-hidden="true"
          className="flex items-center gap-12 sm:gap-24 animate-marquee whitespace-nowrap min-w-full flex-shrink-0"
        >
          {marqueeLogos.map((logo, idx) => (
            <div
              key={`logo-2-${idx}`}
              className="flex items-center justify-center h-12 sm:h-16 px-4 grayscale hover:grayscale-0 opacity-75 hover:opacity-100 transition-all duration-300 transform hover:scale-105 cursor-pointer"
              title={logo.name}
            >
              <img
                src={logo.src}
                alt={logo.name}
                className="h-10 sm:h-14 w-auto object-contain max-w-[150px] sm:max-w-[220px]"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
