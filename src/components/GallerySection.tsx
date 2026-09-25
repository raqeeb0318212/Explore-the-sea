import React, { useState } from 'react';
import { Maximize2, X, MapPin, Camera, Compass, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { GALLERY_ITEMS, GalleryItem } from '../data/galleryData';
import { MarineVisual } from './MarineVisual';

export const GallerySection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activePhoto, setActivePhoto] = useState<GalleryItem | null>(null);

  const categories = [
    'All',
    'Whales & Giants',
    'Predators',
    'Reefs & Corals',
    'Deep Bioluminescence',
    'Invertebrates'
  ];

  const filteredItems = selectedCategory === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  const handleNextPhoto = () => {
    if (!activePhoto) return;
    const currentIndex = GALLERY_ITEMS.findIndex((item) => item.id === activePhoto.id);
    const nextIndex = (currentIndex + 1) % GALLERY_ITEMS.length;
    setActivePhoto(GALLERY_ITEMS[nextIndex]);
  };

  const handlePrevPhoto = () => {
    if (!activePhoto) return;
    const currentIndex = GALLERY_ITEMS.findIndex((item) => item.id === activePhoto.id);
    const prevIndex = (currentIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length;
    setActivePhoto(GALLERY_ITEMS[prevIndex]);
  };

  return (
    <section id="gallery" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] text-cyan-400 font-semibold block mb-2">
            Curated Exhibition
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Beauty Beneath the Waves
          </h2>
          <p className="text-sm text-slate-300 mt-2 max-w-xl">
            A visual retrospective of pelagic giants, abyssal bioluminescence, and ancient reef ecosystems captured across the world’s oceans.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`min-h-[38px] px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                  : 'bg-[#05162c] text-slate-300 hover:text-white border border-slate-700/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredItems.map((item, idx) => (
          <div
            key={item.id}
            onClick={() => setActivePhoto(item)}
            className={`group relative rounded-2xl overflow-hidden cursor-pointer ocean-card-glass border border-cyan-500/20 hover:border-cyan-400/50 shadow-xl transition-all duration-300 hover:-translate-y-1 ${
              idx === 0 || idx === 3 ? 'sm:col-span-2 aspect-[16/9]' : 'aspect-square'
            }`}
          >
            <MarineVisual
              src={item.imageUrl}
              alt={item.title}
              speciesType={item.title}
              sizeVariant="card"
              className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
            />

            {/* Gradient Scrim & Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#020b18] via-[#020b18]/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

            {/* Badge */}
            <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#020b18]/80 backdrop-blur-md border border-cyan-500/20 text-[10px] tracking-wide font-medium text-cyan-300">
              {item.category}
            </div>

            {/* Enlarge Affordance */}
            <div className="absolute top-3 right-3 p-2 rounded-full bg-[#020b18]/80 text-white/80 group-hover:text-cyan-300 group-hover:scale-110 transition-all">
              <Maximize2 className="w-3.5 h-3.5" />
            </div>

            {/* Bottom Caption Meta */}
            <div className="absolute bottom-0 inset-x-0 p-4">
              <h3 className="font-display text-sm sm:text-base font-bold text-white group-hover:text-cyan-200 transition-colors truncate">
                {item.title}
              </h3>
              <div className="flex items-center gap-3 text-[11px] text-slate-300 mt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-cyan-400" />
                  <span className="truncate max-w-[140px]">{item.location}</span>
                </span>
                <span>·</span>
                <span>{item.depth}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {activePhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-2xl p-4 sm:p-8 animate-in fade-in duration-200">
          <div className="fixed inset-0" onClick={() => setActivePhoto(null)} aria-hidden="true" />

          <div className="relative max-w-5xl w-full max-h-[92vh] overflow-y-auto bg-[#031326] border border-cyan-500/40 rounded-3xl p-4 sm:p-6 z-10 shadow-2xl flex flex-col no-scrollbar">
            {/* Top Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-cyan-500/20 mb-4">
              <div>
                <span className="text-xs uppercase tracking-widest text-cyan-400 font-bold">
                  {activePhoto.category}
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
                  {activePhoto.title}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevPhoto}
                  className="p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white"
                  title="Previous image"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNextPhoto}
                  className="p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white"
                  title="Next image"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActivePhoto(null)}
                  className="p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white ml-2"
                  aria-label="Close lightbox"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Photo Container */}
            <div className="relative rounded-2xl overflow-hidden aspect-[16/9] w-full border border-cyan-500/20 bg-black">
              <MarineVisual
                src={activePhoto.imageUrl}
                alt={activePhoto.title}
                speciesType={activePhoto.title}
                priority={true}
                sizeVariant="showcase"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Metadata and Caption */}
            <div className="mt-4 pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-slate-300">
              <p className="text-sm text-slate-200 italic max-w-xl">
                &ldquo;{activePhoto.caption}&rdquo;
              </p>
              <div className="flex items-center gap-4 text-slate-400 shrink-0">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{activePhoto.location}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Camera className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{activePhoto.photographer}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
