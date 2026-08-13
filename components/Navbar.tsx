'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logoBlue from '@/public/img/logoblue.svg';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background body scrolling when mobile drawer is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/80 py-3 sm:py-3.5 shadow-sm'
          : 'bg-transparent py-5 sm:py-6'
          }`}
      >
        <div className="w-full px-6 sm:px-10 md:px-16 lg:px-20 flex items-center justify-between">

          {/* ── Brand Logo ── */}
          <Link
            href="/"
            className="flex items-center gap-3 group transition-transform duration-200 active:scale-95"
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 flex-shrink-0">
              <Image
                src={logoBlue}
                alt="OCEANAGARA Logo"
                fill
                priority
                className="object-contain"
              />
            </div>
            <span className="font-black text-lg tracking-widest text-[#0c2d52] uppercase">
              OCEANAGARA
            </span>
          </Link>

          {/* ── Desktop Navigation Links ── */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#ocean-analysis"
              className="text-xs font-extrabold uppercase tracking-wider text-[#0c2d52] hover:text-sky-600 transition-colors duration-200 relative group py-1"
            >
              Peta Analisis
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-sky-600 group-hover:w-full transition-all duration-300" />
            </a>

            <a
              href="#feature"
              className="text-xs font-extrabold uppercase tracking-wider text-[#0c2d52] hover:text-sky-600 transition-colors duration-200 relative group py-1"
            >
              Fitur Utama
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-sky-600 group-hover:w-full transition-all duration-300" />
            </a>

            <a
              href="#about-us"
              className="text-xs font-extrabold uppercase tracking-wider text-[#0c2d52] hover:text-sky-600 transition-colors duration-200 relative group py-1"
            >
              Tentang Kami
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-sky-600 group-hover:w-full transition-all duration-300" />
            </a>

            {/* Login CTA Button */}
            <Link
              href="/login"
              className="px-5 py-2.5 bg-[#0c2d52] hover:bg-[#163e6e] text-white text-xs font-extrabold uppercase tracking-wider rounded-xl transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-2"
            >
              <span>Masuk</span>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>

          {/* ── Mobile Hamburger Button ── */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden p-2 rounded-xl text-[#0c2d52] hover:bg-slate-100/80 transition-colors focus:outline-none"
            aria-label="Open menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* ── Mobile Fullscreen Drawer Overlay (Outside <nav> to prevent backdrop-blur containing block clipping) ── */}
      <div
        className={`md:hidden fixed inset-0 z-[100] bg-[#0c2d52] text-white transform transition-transform duration-300 ease-in-out flex flex-col justify-between p-6 sm:p-8 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full pointer-events-none'
          }`}
      >
        {/* Top Header inside Drawer */}
        <div className="flex items-center justify-between border-b border-white/15 pb-5 shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8">
              <Image
                src={logoBlue}
                alt="OCEANAGARA Logo"
                fill
                className="object-contain brightness-0 invert"
              />
            </div>
            <span className="font-extrabold tracking-widest text-lg text-white uppercase">
              OCEANAGARA
            </span>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2.5 text-white/80 hover:text-white rounded-xl bg-white/10 hover:bg-white/20 transition-colors focus:outline-none"
            aria-label="Close menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Nav Links List */}
        <div className="flex flex-col items-center justify-center gap-8 my-auto py-8">
          <a
            href="#ocean-analysis"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-lg font-extrabold uppercase tracking-widest text-white hover:text-sky-300 transition-colors py-2"
          >
            Peta Analisis
          </a>
          <a
            href="#feature"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-lg font-extrabold uppercase tracking-widest text-white hover:text-sky-300 transition-colors py-2"
          >
            Fitur Utama
          </a>
          <a
            href="#about-us"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-lg font-extrabold uppercase tracking-widest text-white hover:text-sky-300 transition-colors py-2"
          >
            Tentang Kami
          </a>
        </div>

        {/* Drawer CTA */}
        <div className="pt-6 border-t border-white/15 shrink-0">
          <Link
            href="/login"
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-full py-4 bg-white text-[#0c2d52] font-black text-xs uppercase tracking-wider rounded-xl hover:bg-sky-50 transition-all flex items-center justify-center gap-2 shadow-lg active:scale-98"
          >
            <span>Masuk ke Akun</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </>
  );
}


