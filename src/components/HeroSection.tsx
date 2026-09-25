import React, { useState } from 'react';
import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react';
import { MarineVisual } from './MarineVisual';

interface HeroSectionProps {
  onExploreSpecies: () => void;
  onDiscoverOcean: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreSpecies,
  onDiscoverOcean
}) => {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { clientWidth, clientHeight } = currentTarget;
    const x = (clientX / clientWidth - 0.5) * 16;
    const y = (clientY / clientHeight - 0.5) * 12;
    setMouseOffset({ x, y });
  };

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      className="relative min-h-[90vh] lg:min-h-screen w-full flex items-center justify-center overflow-hidden pt-20 pb-12 sm:pt-24 sm:pb-16 px-4 sm:px-6 lg:px-8"
    >
      {/* Cinematic Underwater Whale Backdrop with Parallax */}
      <div
        className="absolute inset-0 z-0 pointer-events-none transition-transform duration-300 ease-out scale-105"
        style={{
          transform: `translate3d(${mouseOffset.x * -0.5}px, ${mouseOffset.y * -0.5}px, 0)`
        }}
      >
        <MarineVisual
          src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=2000&q=85"
          alt="Majestic Blue Whale gliding through deep sunlit ocean waters"
          speciesType="whale"
          priority={true}
          sizeVariant="hero"
          className="w-full h-full object-cover"
        />

        {/* Ambient Oceanic Gradient Scrims & Sunbeam Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#030b17] via-[#030e20]/60 to-[#020b18]/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#030b17]/90 via-[#030b17]/40 to-[#030b17]/85" />
        <div className="absolute top-0 inset-x-0 h-96 bg-[radial-gradient(ellipse_at_top,_rgba(56,189,248,0.25)_0%,_transparent_70%)]" />

        {/* Floating Bubble Accents */}
        <div className="absolute bottom-10 left-[15%] w-3 h-3 rounded-full bg-cyan-300/40 blur-[1px] animate-float-slow" />
        <div className="absolute bottom-32 left-[28%] w-2 h-2 rounded-full bg-cyan-200/50 blur-[0.5px] animate-float-slow delay-1000" />
        <div className="absolute top-40 right-[20%] w-4 h-4 rounded-full bg-cyan-400/30 blur-[1px] animate-float-slow delay-700" />
        <div className="absolute bottom-24 right-[35%] w-2.5 h-2.5 rounded-full bg-teal-300/40 blur-[0.5px] animate-float-slow delay-300" />
      </div>

      {/* Main Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Headline & Intro */}
        <div className="lg:col-span-8 flex flex-col items-start text-left space-y-6">
          {/* Eyebrow Kicker */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs sm:text-sm font-semibold tracking-widest uppercase shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>Welcome to the Deep Sea</span>
          </div>

          {/* Main Display Headline */}
          <h1 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.15] text-balance">
            Explore the{' '}
            <span className="bg-gradient-to-r from-cyan-300 via-sky-200 to-teal-200 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(56,189,248,0.3)]">
              Deep Sea
            </span>
          </h1>

          {/* Subtitle Deck */}
          <p className="max-w-2xl text-sm sm:text-lg md:text-xl text-slate-300 leading-relaxed font-normal">
            Dive into a world of mystery and wonder. Discover incredible marine species, explore ocean layers, and learn about the amazing life hidden beneath the waves.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto">
            <button
              onClick={onExploreSpecies}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-400 hover:to-sky-500 text-slate-950 font-bold text-sm sm:text-base tracking-wide flex items-center justify-center gap-2.5 shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:shadow-[0_0_35px_rgba(6,182,212,0.6)] active:scale-[0.98] transition-all duration-200 group"
            >
              <span>Explore Species</span>
              <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onDiscoverOcean}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 text-cyan-200 hover:text-white border border-cyan-500/30 hover:border-cyan-400/60 font-semibold text-sm sm:text-base tracking-wide flex items-center justify-center gap-2 backdrop-blur-sm transition-all duration-200"
            >
              <span>Discover the Ocean</span>
            </button>
          </div>

          {/* Micro Hint */}
          <div className="pt-2 text-xs tracking-wider uppercase text-cyan-400/70 font-medium flex items-center gap-2">
            <span>Discover the wonders beneath the waves</span>
            <ChevronDown className="w-4 h-4 animate-bounce text-cyan-400" />
          </div>
        </div>

        {/* Right Scroll Down Indicator (Matching User Reference Image) */}
        <div className="hidden lg:col-span-4 lg:flex flex-col items-end justify-center pr-4">
          <div className="flex flex-col items-center gap-3">
            <span className="text-xs uppercase tracking-[0.25em] text-cyan-300/80 font-medium">
              Scroll Down
            </span>
            <div className="w-[1px] h-10 bg-gradient-to-b from-cyan-400 to-transparent" />
            <div className="w-6 h-10 rounded-full border-2 border-cyan-400/50 flex items-start justify-center p-1.5 shadow-[0_0_12px_rgba(6,182,212,0.25)]">
              <div className="w-1.5 h-2.5 rounded-full bg-cyan-300 animate-bounce" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
