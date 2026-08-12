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

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-md py-3.5'
          : 'bg-transparent py-5'
        }`}
    >
      <div className="w-full px-6 sm:px-10 md:px-16 lg:px-20 flex items-center justify-between">

        {/* ── Brand Logo ── */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group transition-transform duration-200 active:scale-95"
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
        </Link>

        {/* ── Desktop Navigation Links ── */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#maps"
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
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 rounded-xl text-[#0c2d52] hover:bg-slate-100/80 transition-colors focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* ── Mobile Slide-Over Menu Drawer ── */}
      <div
        className={`md:hidden fixed inset-0 z-50 bg-[#0c2d52]/95 backdrop-blur-lg transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="flex flex-col h-full justify-between p-8">
          {/* Top Bar inside Drawer */}
          <div className="flex items-center justify-between border-b border-white/10 pb-6">
            <div className="flex items-center gap-2.5">
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
              className="p-2 text-white/80 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Nav Links List */}
          <div className="flex flex-col gap-6 text-center my-auto">
            <a
              href="#maps"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base font-extrabold uppercase tracking-widest text-white/90 hover:text-sky-300 transition-colors"
            >
              Peta Analisis
            </a>
            <a
              href="#feature"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base font-extrabold uppercase tracking-widest text-white/90 hover:text-sky-300 transition-colors"
            >
              Fitur Utama
            </a>
            <a
              href="#about-us"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base font-extrabold uppercase tracking-widest text-white/90 hover:text-sky-300 transition-colors"
            >
              Tentang Kami
            </a>
          </div>

          {/* Drawer CTA */}
          <div className="pt-6 border-t border-white/10 space-y-3">
            <Link
              href="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full py-3.5 bg-white text-[#0c2d52] font-extrabold text-xs uppercase tracking-wider rounded-xl hover:bg-sky-50 transition-all flex items-center justify-center gap-2 shadow-md"
            >
              <span>Masuk ke Akun</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
