import React, { useState } from 'react';
import { ArrowRight, ChevronDown, Compass, Ruler, MapPin, Grid, Layers } from 'lucide-react';
import { MarineSpecies, CATEGORIES, CategoryFilter } from '../data/speciesData';
import { MarineVisual } from './MarineVisual';

interface FeaturedSpeciesSectionProps {
  speciesList: MarineSpecies[];
  onSelectSpecies: (species: MarineSpecies) => void;
  selectedSpeciesId?: string;
}

export const FeaturedSpeciesSection: React.FC<FeaturedSpeciesSectionProps> = ({
  speciesList,
  onSelectSpecies,
  selectedSpeciesId
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All');
  const [visibleCount, setVisibleCount] = useState<number>(8);

  const filteredSpecies = speciesList.filter((sp) => {
    if (selectedCategory === 'All') return true;
    return sp.category === selectedCategory;
  });

  const displayedSpecies = filteredSpecies.slice(0, visibleCount);

  return (
    <section id="species" className="relative py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full overflow-hidden">
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-10">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] text-cyan-400 font-semibold block mb-2">
            Featured Species
          </span>
          <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Amazing Creatures of the Deep
          </h2>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 lg:max-w-md">
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            From the largest animals on Earth to the smallest glowing creatures, explore extraordinary life forms beneath the waves.
          </p>
        </div>
      </div>

      {/* Category Filter Tabs - Wrapping naturally on mobile, NO horizontal scroll */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setVisibleCount(8);
            }}
            className={`min-h-[40px] px-3.5 sm:px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 ${
              selectedCategory === cat
                ? 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.4)] font-bold'
                : 'bg-[#06152a]/80 text-slate-300 hover:text-white hover:bg-slate-800/80 border border-slate-700/60 active:scale-95'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Species Count Indicator */}
      <div className="text-xs text-slate-400 mb-6 flex items-center justify-between">
        <span>
          Showing <strong className="text-cyan-300">{displayedSpecies.length}</strong> of{' '}
          <strong className="text-cyan-300">{filteredSpecies.length}</strong> marine species
        </span>
        {selectedCategory !== 'All' && (
          <button
            onClick={() => setSelectedCategory('All')}
            className="text-cyan-400 hover:underline text-xs"
          >
            Reset filter
          </button>
        )}
      </div>

      {/* Species Vertical Grid: 1 column on mobile, 2 on tablet, 3-4 on PC */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 w-full">
        {displayedSpecies.map((species) => {
          const isSelected = selectedSpeciesId === species.id;
          return (
            <div
              key={species.id}
              onClick={() => onSelectSpecies(species)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectSpecies(species);
                }
              }}
              className={`group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 flex flex-col w-full ${
                isSelected
                  ? 'ocean-card-active ring-2 ring-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.3)]'
                  : 'ocean-card-glass hover:-translate-y-1'
              }`}
            >
              {/* Species Image Container with Aspect Ratio */}
              <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden bg-slate-900">
                <MarineVisual
                  src={species.imageUrl}
                  alt={species.name}
                  speciesType={species.name}
                  sizeVariant="card"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                />

                {/* Layer Tag Badge */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#020b18]/85 backdrop-blur-md border border-cyan-500/20 text-[10px] tracking-wide font-medium text-cyan-300">
                  {species.oceanLayer}
                </div>

                {/* Conservation Badge */}
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-[#020b18]/85 backdrop-blur-md border border-slate-700/50 text-[10px] tracking-wide font-medium text-slate-300">
                  {species.conservationStatus}
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-[#041224] via-transparent to-transparent opacity-90 pointer-events-none" />
              </div>

              {/* Card Meta Content */}
              <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 bg-gradient-to-b from-[#041224] to-[#030e1d]">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="font-display text-lg font-bold text-white group-hover:text-cyan-300 transition-colors truncate">
                        {species.name}
                      </h3>
                      <p className="text-xs text-cyan-400/80 italic -mt-0.5 truncate">
                        {species.scientificName}
                      </p>
                    </div>

                    {/* Circular Action Arrow Button */}
                    <div className="min-w-[36px] min-h-[36px] w-9 h-9 rounded-full bg-cyan-950/80 group-hover:bg-cyan-500 border border-cyan-500/30 group-hover:border-cyan-400 text-cyan-300 group-hover:text-slate-950 flex items-center justify-center transition-all duration-300 shrink-0">
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 line-clamp-2 mt-2 leading-relaxed">
                    {species.shortIntro}
                  </p>
                </div>

                {/* Key Spec Badges */}
                <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-1.5 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <Ruler className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span className="text-slate-400">Length:</span>
                    <span className="font-semibold text-slate-200 truncate">{species.length}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span className="text-slate-400">Habitat:</span>
                    <span className="font-medium text-slate-200 truncate">{species.habitat}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Show More / Show Less Button for Smooth Vertical Scrolling */}
      {filteredSpecies.length > 8 && (
        <div className="mt-8 text-center">
          <button
            onClick={() =>
              setVisibleCount((prev) => (prev >= filteredSpecies.length ? 8 : prev + 8))
            }
            className="min-h-[44px] px-6 py-2.5 rounded-xl bg-[#051830] hover:bg-cyan-950 text-cyan-300 border border-cyan-500/40 text-xs sm:text-sm font-semibold inline-flex items-center gap-2 transition-all shadow-lg active:scale-95"
          >
            <span>
              {visibleCount >= filteredSpecies.length
                ? 'Show Fewer Species'
                : `Load More Marine Species (${filteredSpecies.length - visibleCount} remaining)`}
            </span>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-300 ${
                visibleCount >= filteredSpecies.length ? 'rotate-180' : ''
              }`}
            />
          </button>
        </div>
      )}
    </section>
  );
};
