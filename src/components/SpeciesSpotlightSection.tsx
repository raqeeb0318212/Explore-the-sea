import React, { useState } from 'react';
import { Volume2, Lightbulb, Compass, Maximize2, Sparkles, Scale, Clock, Globe, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { MarineSpecies } from '../data/speciesData';
import { MarineVisual } from './MarineVisual';
import { playMarineAcoustic } from '../utils/audioSynthesizer';

interface SpeciesSpotlightSectionProps {
  selectedSpecies: MarineSpecies;
  speciesList: MarineSpecies[];
  onSelectSpecies: (species: MarineSpecies) => void;
  onOpenFullModal: (species: MarineSpecies) => void;
  soundEnabled: boolean;
}

export const SpeciesSpotlightSection: React.FC<SpeciesSpotlightSectionProps> = ({
  selectedSpecies,
  speciesList,
  onSelectSpecies,
  onOpenFullModal,
  soundEnabled
}) => {
  const [isMobilePickerOpen, setIsMobilePickerOpen] = useState(false);
  const spotlightSpecies = speciesList.slice(0, 8);

  const currentIndex = speciesList.findIndex((s) => s.id === selectedSpecies.id);

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + speciesList.length) % speciesList.length;
    onSelectSpecies(speciesList[prevIndex]);
    if (soundEnabled) {
      playMarineAcoustic(speciesList[prevIndex].soundType || 'whale-song');
    }
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % speciesList.length;
    onSelectSpecies(speciesList[nextIndex]);
    if (soundEnabled) {
      playMarineAcoustic(speciesList[nextIndex].soundType || 'whale-song');
    }
  };

  const handlePlaySound = () => {
    playMarineAcoustic(selectedSpecies.soundType || 'whale-song');
  };

  return (
    <section className="relative py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full overflow-hidden">
      {/* Outer Glow Container */}
      <div className="relative rounded-2xl sm:rounded-3xl ocean-card-glass border border-cyan-500/25 p-4 sm:p-6 lg:p-8 overflow-hidden shadow-[0_15px_50px_rgba(0,0,0,0.6)] w-full">
        {/* Subtle Ambient Background Light */}
        <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />

        {/* MOBILE-ONLY Top Navigation Bar: Previous / Species Picker / Next */}
        <div className="lg:hidden mb-5 flex items-center justify-between gap-2 p-2 rounded-xl bg-[#04162e] border border-cyan-500/20">
          <button
            onClick={handlePrev}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg bg-slate-900/80 text-cyan-300 border border-slate-700 active:scale-95 transition-all"
            aria-label="Previous creature"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={() => setIsMobilePickerOpen(!isMobilePickerOpen)}
            className="min-h-[44px] flex-1 flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg bg-[#061d3a] border border-cyan-500/40 text-center"
          >
            <div className="w-6 h-6 rounded-full overflow-hidden shrink-0 border border-cyan-400">
              <MarineVisual
                src={selectedSpecies.imageUrl}
                alt={selectedSpecies.name}
                speciesType={selectedSpecies.name}
                sizeVariant="thumb"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-left min-w-0">
              <div className="text-xs font-bold text-white truncate">{selectedSpecies.name}</div>
              <div className="text-[10px] text-cyan-300/70 truncate">Tap to change ({currentIndex + 1}/16)</div>
            </div>
          </button>

          <button
            onClick={handleNext}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg bg-slate-900/80 text-cyan-300 border border-slate-700 active:scale-95 transition-all"
            aria-label="Next creature"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* MOBILE-ONLY Expandable Vertical Species Selector List */}
        {isMobilePickerOpen && (
          <div className="lg:hidden mb-6 p-3 rounded-2xl bg-[#031326] border border-cyan-500/30 max-h-60 overflow-y-auto space-y-1.5 animate-in fade-in duration-150">
            <div className="text-[11px] uppercase tracking-wider text-cyan-400 font-semibold px-2 py-1">
              Select Marine Species
            </div>
            {speciesList.map((sp) => {
              const isActive = sp.id === selectedSpecies.id;
              return (
                <button
                  key={sp.id}
                  onClick={() => {
                    onSelectSpecies(sp);
                    setIsMobilePickerOpen(false);
                    if (soundEnabled) {
                      playMarineAcoustic(sp.soundType || 'whale-song');
                    }
                  }}
                  className={`w-full min-h-[44px] flex items-center justify-between p-2 rounded-xl text-left transition-all ${
                    isActive
                      ? 'bg-cyan-950/80 border border-cyan-400 text-white font-bold'
                      : 'hover:bg-slate-800/60 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-7 h-7 rounded-full overflow-hidden shrink-0 border border-cyan-500/30">
                      <MarineVisual
                        src={sp.imageUrl}
                        alt={sp.name}
                        speciesType={sp.name}
                        sizeVariant="thumb"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-xs truncate">{sp.name}</div>
                  </div>
                  {isActive && <Check className="w-4 h-4 text-cyan-400 shrink-0" />}
                </button>
              );
            })}
          </div>
        )}

        {/* Main Grid: On PC it matches the 3-column reference image, on mobile it stacks cleanly top to bottom */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch w-full">
          {/* DESKTOP-ONLY Left Column: Vertical Species Selector List (Matching User Reference Image) */}
          <div className="hidden lg:flex lg:col-span-3 lg:flex-col gap-2.5 overflow-y-auto max-h-[460px] pr-1 no-scrollbar">
            {spotlightSpecies.map((sp) => {
              const isActive = sp.id === selectedSpecies.id;
              return (
                <button
                  key={sp.id}
                  onClick={() => {
                    onSelectSpecies(sp);
                    if (soundEnabled) {
                      playMarineAcoustic(sp.soundType || 'whale-song');
                    }
                  }}
                  className={`flex items-center gap-3 p-3 rounded-2xl text-left transition-all duration-200 w-full ${
                    isActive
                      ? 'bg-cyan-950/80 border-2 border-cyan-400 text-white shadow-[0_0_20px_rgba(6,182,212,0.3)] scale-[1.02]'
                      : 'bg-[#05162c]/60 border border-slate-800/80 text-slate-300 hover:bg-[#071d38] hover:text-white'
                  }`}
                >
                  {/* Circular Avatar Thumbnail */}
                  <div
                    className={`relative w-11 h-11 rounded-full overflow-hidden shrink-0 border-2 ${
                      isActive ? 'border-cyan-300 ring-2 ring-cyan-500/50' : 'border-cyan-900/60'
                    }`}
                  >
                    <MarineVisual
                      src={sp.imageUrl}
                      alt={sp.name}
                      speciesType={sp.name}
                      sizeVariant="thumb"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Species Name */}
                  <div className="min-w-0 pr-2">
                    <div
                      className={`text-sm font-semibold truncate ${
                        isActive ? 'text-cyan-200' : 'text-slate-200'
                      }`}
                    >
                      {sp.name}
                    </div>
                    <div className="text-[11px] text-cyan-400/70 italic truncate">
                      {sp.scientificName}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Center Column: Featured Creature Showcase Photo */}
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden aspect-[16/10] sm:aspect-[4/3] lg:aspect-auto lg:min-h-[460px] border border-cyan-500/20 shadow-xl group w-full">
            <MarineVisual
              src={selectedSpecies.imageUrl}
              alt={selectedSpecies.name}
              speciesType={selectedSpecies.name}
              sizeVariant="showcase"
              className="w-full h-full object-cover"
            />

            {/* Depth & Category Overlays */}
            <div className="absolute top-3 sm:top-4 left-3 sm:left-4 flex flex-wrap gap-2">
              <span className="px-2.5 sm:px-3 py-1 rounded-full bg-[#020b18]/85 backdrop-blur-md border border-cyan-400/40 text-[11px] sm:text-xs font-semibold text-cyan-300 flex items-center gap-1.5 shadow-lg">
                <Compass className="w-3.5 h-3.5 text-cyan-400" />
                {selectedSpecies.oceanLayer}
              </span>
              <span className="px-2.5 sm:px-3 py-1 rounded-full bg-[#020b18]/85 backdrop-blur-md border border-slate-700 text-[11px] sm:text-xs font-medium text-slate-300">
                {selectedSpecies.depthRange}
              </span>
            </div>

            {/* Quick Acoustic Play Button & Enlarge */}
            <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 flex items-center gap-2">
              <button
                onClick={handlePlaySound}
                title="Play creature acoustic frequency"
                className="min-h-[40px] px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-cyan-950/90 hover:bg-cyan-500 text-cyan-300 hover:text-slate-950 border border-cyan-400/40 text-xs font-semibold flex items-center gap-1.5 backdrop-blur-md shadow-lg transition-all active:scale-95"
              >
                <Volume2 className="w-4 h-4" />
                <span>Hear Call</span>
              </button>

              <button
                onClick={() => onOpenFullModal(selectedSpecies)}
                title="Enlarge details"
                className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-xl bg-[#031326]/85 hover:bg-slate-800 text-slate-200 border border-slate-700/60 backdrop-blur-md transition-all active:scale-95"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Detailed Scientific Metrics & Fun Fact */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-5 w-full">
            <div>
              {/* Header Title */}
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight truncate">
                    {selectedSpecies.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-cyan-400 italic mt-0.5 truncate">
                    {selectedSpecies.scientificName}
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-emerald-950/70 text-emerald-300 border border-emerald-500/30 shrink-0">
                  {selectedSpecies.conservationStatus}
                </span>
              </div>

              {/* Informative Description */}
              <p className="text-xs sm:text-sm text-slate-300 mt-3 sm:mt-4 leading-relaxed font-normal">
                {selectedSpecies.description}
              </p>

              {/* Key Metrics Grid (Length, Weight, Lifespan, Habitat) */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-4 sm:mt-6 pt-4 border-t border-slate-800/80">
                <div className="flex items-start gap-2.5">
                  <div className="p-2 rounded-xl bg-cyan-950/60 border border-cyan-500/20 text-cyan-400 shrink-0">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
                      Length
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-slate-100 truncate">
                      {selectedSpecies.length}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="p-2 rounded-xl bg-cyan-950/60 border border-cyan-500/20 text-cyan-400 shrink-0">
                    <Scale className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
                      Weight
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-slate-100 truncate">
                      {selectedSpecies.weight}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="p-2 rounded-xl bg-cyan-950/60 border border-cyan-500/20 text-cyan-400 shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
                      Lifespan
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-slate-100 truncate">
                      {selectedSpecies.lifespan}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="p-2 rounded-xl bg-cyan-950/60 border border-cyan-500/20 text-cyan-400 shrink-0">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
                      Habitat
                    </div>
                    <div className="text-xs font-semibold text-slate-100 truncate" title={selectedSpecies.habitat}>
                      {selectedSpecies.habitat}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Glowing Fun Fact Callout Box */}
            <div className="rounded-2xl p-3.5 sm:p-4 bg-gradient-to-r from-cyan-950/40 via-[#041d38]/60 to-cyan-950/30 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.15)] flex items-start gap-3">
              <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-300 shrink-0">
                <Lightbulb className="w-4 sm:w-5 h-4 sm:h-5 text-cyan-300 animate-pulse" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                  Fun Fact
                </div>
                <p className="text-xs text-slate-200 mt-1 leading-relaxed">
                  {selectedSpecies.funFact}
                </p>
              </div>
            </div>

            {/* Open Comprehensive Dossier Button */}
            <button
              onClick={() => onOpenFullModal(selectedSpecies)}
              className="min-h-[46px] w-full py-3 rounded-xl bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-600 hover:from-cyan-500 hover:to-sky-500 text-white font-semibold text-xs sm:text-sm tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-cyan-900/30 active:scale-[0.99] transition-all"
            >
              <span>Explore Full Biology & Conservation</span>
              <Sparkles className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
