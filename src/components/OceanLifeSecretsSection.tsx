import React, { useState } from 'react';
import { Sparkles, ChevronRight, Zap, Eye, Compass, ShieldCheck } from 'lucide-react';
import { OCEAN_SECRETS, OceanSecret } from '../data/oceanLifeSecretsData';
import { MarineVisual } from './MarineVisual';

export const OceanLifeSecretsSection: React.FC = () => {
  const [activeSecret, setActiveSecret] = useState<OceanSecret>(OCEAN_SECRETS[0]);

  return (
    <section id="ocean-life" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <span className="text-xs uppercase tracking-[0.2em] text-cyan-400 font-semibold block mb-2">
          Biological Marvels
        </span>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
          The Secrets of Marine Life
        </h2>
        <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
          Peer into the evolutionary innovations that allow ocean creatures to communicate across hemispheres, vanish into thin water, and thrive beneath immense hydrostatic pressures.
        </p>
      </div>

      {/* Main Interactive Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Interactive Secret Selector Cards */}
        <div className="lg:col-span-5 space-y-3">
          {OCEAN_SECRETS.map((secret) => {
            const isActive = activeSecret.id === secret.id;
            return (
              <button
                key={secret.id}
                onClick={() => setActiveSecret(secret)}
                className={`w-full p-4 rounded-2xl text-left transition-all duration-300 flex items-start justify-between gap-4 ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-950/90 to-[#06203d] border-2 border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.25)] scale-[1.01]'
                    : 'ocean-card-glass hover:bg-[#071f3c]/70 hover:border-cyan-500/30 text-slate-300'
                }`}
              >
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-cyan-400 font-semibold">
                    {secret.topic}
                  </span>
                  <h3 className="font-display text-base font-bold text-white mt-1 leading-snug">
                    {secret.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 line-clamp-2 leading-relaxed">
                    {secret.summary}
                  </p>
                </div>

                <div
                  className={`p-2 rounded-xl mt-1 shrink-0 transition-colors ${
                    isActive ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  <ChevronRight className="w-4 h-4" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Deep Dive Visual Feature Panel */}
        <div className="lg:col-span-7 rounded-3xl ocean-card-glass border border-cyan-500/30 p-6 sm:p-8 relative overflow-hidden shadow-2xl">
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-6 border border-cyan-500/20 shadow-lg">
            <MarineVisual
              src={activeSecret.imageUrl}
              alt={activeSecret.title}
              speciesType={activeSecret.organism}
              sizeVariant="showcase"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#031326] via-transparent to-transparent opacity-80" />

            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs">
              <span className="px-3 py-1 rounded-full bg-[#020b18]/80 backdrop-blur-md border border-cyan-400/30 text-cyan-300 font-semibold">
                Studied In: {activeSecret.organism}
              </span>
              <span className="px-3 py-1 rounded-full bg-cyan-950/80 backdrop-blur-md border border-cyan-500/50 text-cyan-200 font-bold">
                {activeSecret.keyMetric} · {activeSecret.metricLabel}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-cyan-400 font-bold">
                Biological Deep Dive
              </span>
              <h3 className="font-display text-2xl font-bold text-white mt-1">
                {activeSecret.title}
              </h3>
            </div>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
              {activeSecret.deepDive}
            </p>

            <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/20 flex items-center gap-3">
              <Zap className="w-5 h-5 text-cyan-400 shrink-0" />
              <p className="text-xs text-cyan-200">
                Marine researchers continuously use these biological mechanisms to pioneer biomimetic submarines, high-efficiency vortex pumps, and cellular cryoprotectants.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
