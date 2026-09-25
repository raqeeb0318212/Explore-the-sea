import React, { useEffect } from 'react';
import { X, Volume2, Shield, Heart, Compass, MapPin, Maximize2, Scale, Clock, Award, Info, AlertTriangle } from 'lucide-react';
import { MarineSpecies } from '../data/speciesData';
import { MarineVisual } from './MarineVisual';
import { playMarineAcoustic } from '../utils/audioSynthesizer';

interface SpeciesDetailModalProps {
  species: MarineSpecies | null;
  onClose: () => void;
  onSelectAnother: (species: MarineSpecies) => void;
  allSpecies: MarineSpecies[];
}

export const SpeciesDetailModal: React.FC<SpeciesDetailModalProps> = ({
  species,
  onClose,
  onSelectAnother,
  allSpecies
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!species) return null;

  const handlePlaySound = () => {
    playMarineAcoustic(species.soundType || 'whale-song');
  };

  const relatedCreatures = allSpecies
    .filter((s) => s.category === species.category && s.id !== species.id)
    .slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      {/* Click outside to close */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      {/* Modal Dialog Content Container */}
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#031326] border border-cyan-500/30 text-slate-100 shadow-[0_25px_60px_rgba(0,0,0,0.85)] z-10 flex flex-col no-scrollbar">
        {/* Top Header Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#031326]/90 backdrop-blur-md border-b border-cyan-500/20">
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-widest text-cyan-400 font-bold">
              Species Dossier
            </span>
            <span className="text-slate-500">·</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800">
              {species.category}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-700/80 transition-all focus:outline-none"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Main Hero Header Banner */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Creature Image */}
            <div className="md:col-span-6 rounded-2xl overflow-hidden aspect-[4/3] border border-cyan-500/25 relative shadow-xl">
              <MarineVisual
                src={species.imageUrl}
                alt={species.name}
                speciesType={species.name}
                priority={true}
                sizeVariant="showcase"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 px-3 py-1 rounded-md bg-[#020b18]/85 backdrop-blur-md border border-cyan-400/40 text-xs font-semibold text-cyan-300">
                {species.oceanLayer}
              </div>
            </div>

            {/* Title & Quick Info */}
            <div className="md:col-span-6 space-y-4">
              <div>
                <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
                  {species.name}
                </h2>
                <p className="text-base text-cyan-300 italic mt-1 font-medium">
                  {species.scientificName}
                </p>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                {species.shortIntro}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={handlePlaySound}
                  className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/25 transition-all"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Synthesize Creature Call</span>
                </button>

                <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-300">
                  <Shield className="w-4 h-4 text-emerald-400" />
                  <span>IUCN: <strong className="text-white">{species.conservationStatus}</strong></span>
                </div>
              </div>
            </div>
          </div>

          {/* Biological Specifications Metric Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-[#041933] border border-cyan-500/20">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-cyan-400 font-semibold block">
                Typical Size
              </span>
              <span className="text-sm font-bold text-white mt-1 block">
                {species.length}
              </span>
            </div>

            <div>
              <span className="text-[11px] uppercase tracking-wider text-cyan-400 font-semibold block">
                Average Weight
              </span>
              <span className="text-sm font-bold text-white mt-1 block">
                {species.weight}
              </span>
            </div>

            <div>
              <span className="text-[11px] uppercase tracking-wider text-cyan-400 font-semibold block">
                Estimated Lifespan
              </span>
              <span className="text-sm font-bold text-white mt-1 block">
                {species.lifespan}
              </span>
            </div>

            <div>
              <span className="text-[11px] uppercase tracking-wider text-cyan-400 font-semibold block">
                Depth Zone
              </span>
              <span className="text-sm font-bold text-white mt-1 block">
                {species.depthRange}
              </span>
            </div>
          </div>

          {/* Scientific Biology & Ecology Details */}
          <div className="space-y-6">
            <div>
              <h3 className="font-display text-xl font-bold text-white mb-2 flex items-center gap-2">
                <Info className="w-5 h-5 text-cyan-400" />
                <span>Biological Overview & Adaptations</span>
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {species.description}
              </p>
            </div>

            <div>
              <h3 className="font-display text-xl font-bold text-white mb-2 flex items-center gap-2">
                <Compass className="w-5 h-5 text-cyan-400" />
                <span>Behavior, Hunting & Social Pods</span>
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {species.behavior}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
              <span className="text-xs uppercase tracking-wider text-cyan-400 font-semibold">
                Dietary Regimen
              </span>
              <p className="text-sm text-slate-200">
                {species.diet}
              </p>
            </div>

            {/* Fun Fact Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-cyan-950/60 via-[#052244] to-cyan-950/40 border border-cyan-500/40 shadow-[0_0_20px_rgba(6,182,212,0.15)] flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-cyan-400/20 text-cyan-300 shrink-0">
                <Award className="w-6 h-6 text-cyan-300" />
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-widest text-cyan-300 font-bold">
                  Curiosity & Marine Lore
                </h4>
                <p className="text-sm text-slate-200 mt-1 leading-relaxed">
                  {species.funFact}
                </p>
              </div>
            </div>
          </div>

          {/* Related Organisms */}
          {relatedCreatures.length > 0 && (
            <div className="pt-4 border-t border-slate-800/80">
              <h4 className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-4">
                Other Species in the {species.category} Category
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {relatedCreatures.map((rel) => (
                  <button
                    key={rel.id}
                    onClick={() => onSelectAnother(rel)}
                    className="flex items-center gap-3 p-2.5 rounded-xl bg-[#04172f] hover:bg-[#07244a] border border-cyan-500/20 text-left transition-all group"
                  >
                    <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-cyan-500/30">
                      <MarineVisual
                        src={rel.imageUrl}
                        alt={rel.name}
                        speciesType={rel.name}
                        sizeVariant="thumb"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-white group-hover:text-cyan-300 truncate">
                        {rel.name}
                      </div>
                      <div className="text-[10px] text-slate-400 italic truncate">
                        {rel.scientificName}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
