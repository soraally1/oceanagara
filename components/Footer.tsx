import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-zinc-900 text-zinc-400 py-16 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">

          {/* Logo & Platform Info */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="text-2xl font-extrabold tracking-widest text-white hover:text-sky-300 transition-colors">
              OCEANAGARA
            </Link>
            <p className="text-xs leading-relaxed text-zinc-400 font-light">
              Platform teknologi maritim komprehensif &amp; Sistem Peringatan Dini (Early Warning System) Eco-Health Laut untuk keselamatan pelayaran, pemantauan kualitas perairan, dan kesejahteraan masyarakat pesisir Indonesia.
            </p>
          </div>

          {/* Column 1: Navigasi Halaman */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">
              Navigasi Halaman
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#maps" className="hover:text-sky-400 transition-colors">
                  Peta &amp; Analisis Laut
                </a>
              </li>
              <li>
                <a href="#feature" className="hover:text-sky-400 transition-colors">
                  Fitur &amp; Layanan Utama
                </a>
              </li>
              <li>
                <a href="#about-us" className="hover:text-sky-400 transition-colors">
                  Tentang Oceanagara
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Akses Akun */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">
              Akses Akun
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/login" className="hover:text-sky-400 transition-colors">
                  Masuk Akun (Login)
                </Link>
              </li>
              <li>
                <Link href="/signup" className="hover:text-sky-400 transition-colors">
                  Daftar Akun Baru (Register)
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="h-px bg-zinc-800 my-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-500">
            &copy; {new Date().getFullYear()} Oceanagara. Seluruh Hak Cipta Dilindungi Undang-Undang.
          </p>

          <div className="flex items-center gap-6 text-xs text-zinc-500">
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Sistem Aktif &amp; Terkoneksi BMKG
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
