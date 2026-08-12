import Image from 'next/image';
import Navbar from './Navbar';
import heroBg from '@/public/img/herobg.svg';
import logoHeader from '@/public/img/logo-2.svg';

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden bg-slate-50/50 md:bg-transparent">
      {/* Navigation */}
      <Navbar />
      {/* Background Image Container */}
      <div className="absolute inset-0 w-full h-full z-0 select-none pointer-events-none">
        <Image
          src={heroBg}
          alt="Oceanagara Hero Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-bottom md:object-right-bottom opacity-40 md:opacity-100 transition-opacity duration-300"
        />
        {/* Soft white gradient overlay on mobile to keep text and logo 100% legible */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/85 to-transparent md:hidden" />
      </div>

      {/* Hero content */}
      <div className="relative z-10 flex-1 max-w-7xl mx-auto px-6 sm:px-10 md:px-16 lg:px-20 w-full flex items-center pt-28 sm:pt-32 md:pt-36 lg:pt-40 pb-16 md:pb-24">
        <div className="max-w-xl md:max-w-2xl select-text">
          {/* Title Logo (Explicit ES Import) */}
          <div className="mb-4 sm:mb-6">
            <Image
              src={logoHeader}
              alt="OCEANAGARA"
              width={400}
              height={67}
              priority
              className="w-[210px] sm:w-[280px] md:w-[340px] lg:w-[400px] h-auto"
            />
          </div>

          {/* Tagline */}
          <p className="text-xl sm:text-2xl md:text-3xl font-normal italic tracking-wide text-[#001A45] leading-snug mb-8 sm:mb-10">
            Cerdas Memantau, Aman<br />
            Berlayar, Mutu Terjaga.
          </p>

          {/* Action buttons (CTAs) */}
          <div className="flex flex-col sm:flex-row gap-3.5 sm:gap-4 w-full sm:w-auto">
            <a
              href="#maps"
              className="px-7 py-3.5 bg-[#001A45] text-white text-xs sm:text-sm font-extrabold uppercase tracking-wider rounded-xl hover:bg-[#001A45]/90 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-center"
            >
              Mulai Memantau
            </a>
            <a
              href="#feature"
              className="px-7 py-3.5 border-2 border-[#001A45] text-[#001A45] text-xs sm:text-sm font-extrabold uppercase tracking-wider rounded-xl hover:bg-[#001A45] hover:text-white transition-all duration-200 flex items-center justify-center text-center bg-white/60 md:bg-transparent"
            >
              Pelajari Fitur
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
