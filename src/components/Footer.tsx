import React from 'react';
import { ArrowUp, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Species', href: '#species' },
    { name: 'Layers', href: '#layers' },
    { name: 'About', href: '#about' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' }
  ];

  const handleNavClick = (href: string) => {
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative z-10 bg-[#020813] border-t border-cyan-500/20 text-slate-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col space-y-8">
        {/* Main Footer Row Matching Reference Image */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left Brand Identity */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#031326] border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                <path
                  d="M3 15C5.5 15 7.5 13 10 13C12.5 13 14.5 15 17 15C19.5 15 21 14 21 14"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
                <path
                  d="M3 10C5.5 10 7.5 8 10 8C12.5 8 14.5 10 17 10C19.5 10 21 9 21 9"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeOpacity="0.8"
                />
                <path
                  d="M3 20C5.5 20 7.5 18 10 18C12.5 18 14.5 20 17 20C19.5 20 21 19 21 19"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeOpacity="0.5"
                />
              </svg>
            </div>

            <div>
              <span className="font-display tracking-[0.16em] text-lg font-bold text-white block">
                DEEP SEA
              </span>
              <span className="text-[10px] tracking-widest uppercase text-cyan-400/80 -mt-0.5 block font-medium">
                Explore · Discover · Protect
              </span>
            </div>
          </div>

          {/* Center Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm font-medium text-slate-300">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="hover:text-cyan-300 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Socials & Back to Top */}
          <div className="flex items-center gap-4">
            <span className="text-xs text-slate-400 hidden sm:inline-block">
              © {new Date().getFullYear()} Deep Sea. All rights reserved.
            </span>

            {/* Back to Top Circular Button */}
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-full bg-[#04162e] hover:bg-cyan-500 text-slate-300 hover:text-slate-950 border border-cyan-500/30 hover:border-cyan-400 transition-all duration-300 active:scale-95 shadow-md"
              aria-label="Back to top of page"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Small Bottom Disclaimer & Image Credits */}
        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400 text-center sm:text-left">
          <p>
            Educational marine life exhibition platform. Designed with scientific accuracy for biodiversity awareness.
          </p>
          <div className="flex items-center gap-3">
            <span>Powered by WebGL & Modern Marine Science</span>
            <span>·</span>
            <span>Zero Slop Anti-Pill Design</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
