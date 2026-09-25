import React from 'react';
import { BookOpen, Compass, Cpu, Layers, Sparkles } from 'lucide-react';
import { MarineVisual } from './MarineVisual';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Visual Column */}
        <div className="lg:col-span-5 relative rounded-3xl overflow-hidden aspect-[4/3] sm:aspect-[1/1] border border-cyan-500/25 shadow-2xl">
          <MarineVisual
            src="https://images.unsplash.com/photo-1544551763-8dd44758c2dd?auto=format&fit=crop&w=1200&q=80"
            alt="Manta ray soaring through deep marine blue ocean waters"
            speciesType="manta ray"
            sizeVariant="showcase"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020b18] via-transparent to-transparent opacity-85" />

          <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#031326]/85 backdrop-blur-md border border-cyan-500/30">
            <div className="text-xs uppercase tracking-widest text-cyan-300 font-bold">
              Educational Mission
            </div>
            <p className="text-xs text-slate-200 mt-1 leading-relaxed">
              Bridging marine biological research, interactive digital storytelling, and WebGL visualization to inspire ocean literacy worldwide.
            </p>
          </div>
        </div>

        {/* Right Content Column */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-cyan-400 font-semibold block mb-2">
              About The Project
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Illuminating the Deep Sea
            </h2>
          </div>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            More than 80% of our planet’s oceans remain unmapped, unobserved, and unexplored. <em>Explore the Deep Sea</em> was engineered as an open interactive platform designed to introduce audiences of all ages to the extraordinary creatures inhabiting the world’s waters.
          </p>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            By coupling real scientific taxonomies, authentic biological measurements, and high-performance WebGL graphics, the platform transforms dry scientific data into a cinematic underwater exploration museum right inside the browser.
          </p>

          {/* Pillars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-[#04162e]/70 border border-slate-800">
              <div className="w-8 h-8 rounded-lg bg-cyan-950 flex items-center justify-center text-cyan-400 mb-2">
                <BookOpen className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-white">
                Taxonomic Accuracy
              </h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Species dossiers compiled from peer-reviewed marine biology journals and IUCN Red List data.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#04162e]/70 border border-slate-800">
              <div className="w-8 h-8 rounded-lg bg-cyan-950 flex items-center justify-center text-cyan-400 mb-2">
                <Cpu className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-white">
                Interactive Technology
              </h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Three.js particulate physics, Web Audio acoustic synthesis, and touch-first responsive design.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
