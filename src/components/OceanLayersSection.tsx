import React, { useState } from 'react';
import { ArrowRight, Compass, Thermometer, ShieldAlert, Sparkles, ChevronDown } from 'lucide-react';
import { OCEAN_LAYERS, OceanLayer } from '../data/oceanLayersData';
import { MarineSpecies } from '../data/speciesData';
import { MarineVisual } from './MarineVisual';

interface OceanLayersSectionProps {
  speciesList: MarineSpecies[];
  onSelectSpecies: (species: MarineSpecies) => void;
}

export const OceanLayersSection: React.FC<OceanLayersSectionProps> = ({
  speciesList,
  onSelectSpecies
}) => {
  const [activeLayer, setActiveLayer] = useState<OceanLayer>(OCEAN_LAYERS[0]);
  const [isExpanded, setIsExpanded] = useState(false);

  // Creatures that belong to this layer
  const creaturesInLayer = speciesList.filter(
    (s) => s.oceanLayer.toLowerCase() === activeLayer.name.toLowerCase()
  );

  return (
    <section id="layers" className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Top Banner Matching Reference Image */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#031326] via-[#051c38] to-[#020b18] border border-cyan-500/25 p-6 sm:p-8 lg:p-10 shadow-2xl">
        {/* Ambient Glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-8">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-cyan-400 font-semibold block mb-2">
              The Ocean Layers
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Journey Through the Ocean Depths
            </h2>
            <p className="text-sm text-slate-300 max-w-xl mt-2 leading-relaxed">
              Explore how marine biology shifts dramatically as you descend from sun-drenched surface waters into the crushing darkness of the hadal trenches.
            </p>
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="self-start lg:self-auto px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm tracking-wide flex items-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.35)] transition-all shrink-0"
          >
            <span>{isExpanded ? 'Hide Depth Analysis' : 'Explore Layers'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 5 Layer Cards (Matching User's Reference Image Layout) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {OCEAN_LAYERS.map((layer) => {
            const isActive = activeLayer.id === layer.id;
            return (
              <button
                key={layer.id}
                onClick={() => {
                  setActiveLayer(layer);
                  setIsExpanded(true);
                }}
                className={`relative rounded-2xl p-4 text-left transition-all duration-300 overflow-hidden flex flex-col justify-between min-h-[140px] group ${
                  isActive
                    ? 'bg-gradient-to-b from-cyan-950/80 to-[#041a35] border-2 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)] scale-[1.02]'
                    : 'bg-[#041528]/80 hover:bg-[#071f3c] border border-slate-800 hover:border-cyan-500/30'
                }`}
              >
                {/* Background Depth Tint */}
                <div className={`absolute inset-0 bg-gradient-to-br ${layer.bannerGradient} opacity-30`} />

                <div className="relative z-10">
                  <div className="text-[11px] font-medium text-cyan-400/90 uppercase tracking-wider">
                    {layer.scientificName}
                  </div>
                  <h3 className="font-display text-base font-bold text-white group-hover:text-cyan-200 transition-colors mt-0.5">
                    {layer.name}
                  </h3>
                </div>

                <div className="relative z-10 flex items-center justify-between mt-4 pt-2 border-t border-slate-700/40">
                  <span className="text-xs font-semibold text-slate-300">
                    {layer.depthRange}
                  </span>
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                      isActive
                        ? 'bg-cyan-400 text-slate-950'
                        : 'bg-slate-800 text-slate-300 group-hover:bg-cyan-950 group-hover:text-cyan-300'
                    }`}
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Expanded Depth Detail View */}
        {isExpanded && (
          <div className="mt-8 pt-8 border-t border-cyan-500/20 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-500/40 text-xs font-bold text-cyan-300">
                    {activeLayer.name} ({activeLayer.scientificName})
                  </span>
                  <span className="text-xs text-slate-400">
                    Depth: <strong className="text-white">{activeLayer.depthRange}</strong>
                  </span>
                </div>

                <p className="text-sm text-slate-200 leading-relaxed font-normal">
                  {activeLayer.description}
                </p>

                <div className="grid grid-cols-3 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                    <span className="text-[10px] uppercase text-cyan-400/80 font-semibold block">
                      Temperature
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-white mt-0.5 block">
                      {activeLayer.temperature}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                    <span className="text-[10px] uppercase text-cyan-400/80 font-semibold block">
                      Hydrostatic Pressure
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-white mt-0.5 block">
                      {activeLayer.pressure}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                    <span className="text-[10px] uppercase text-cyan-400/80 font-semibold block">
                      Sunlight Penetration
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-white mt-0.5 block truncate" title={activeLayer.lightLevel}>
                      {activeLayer.lightLevel}
                    </span>
                  </div>
                </div>
              </div>

              {/* Creatures living in this layer */}
              <div className="lg:col-span-5 bg-[#020b18]/80 rounded-2xl p-5 border border-cyan-500/20">
                <h4 className="text-xs uppercase tracking-widest text-cyan-300 font-bold mb-3 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Creatures at This Depth ({creaturesInLayer.length})</span>
                </h4>

                {creaturesInLayer.length === 0 ? (
                  <div className="text-xs text-slate-400 italic py-4">
                    Specialized abyssopelagic fauna (Giant amphipods, snailfish, and deep barophiles).
                  </div>
                ) : (
                  <div className="space-y-2">
                    {creaturesInLayer.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => onSelectSpecies(c)}
                        className="w-full flex items-center justify-between p-2 rounded-xl bg-[#04162e] hover:bg-cyan-950/60 border border-slate-800/80 hover:border-cyan-500/40 text-left transition-all group"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg overflow-hidden shrink-0 border border-cyan-900">
                            <MarineVisual
                              src={c.imageUrl}
                              alt={c.name}
                              speciesType={c.name}
                              sizeVariant="thumb"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="text-xs font-semibold text-slate-100 group-hover:text-cyan-300">
                              {c.name}
                            </div>
                            <div className="text-[10px] text-slate-400 italic">
                              {c.length}
                            </div>
                          </div>
                        </div>
                        <span className="text-[10px] text-cyan-400 group-hover:translate-x-0.5 transition-transform">
                          Inspect →
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
