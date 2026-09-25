/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { SPECIES_LIST, MarineSpecies } from './data/speciesData';
import { ThreeOceanCanvas } from './components/ThreeOceanCanvas';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FeaturedSpeciesSection } from './components/FeaturedSpeciesSection';
import { SpeciesSpotlightSection } from './components/SpeciesSpotlightSection';
import { OceanLayersSection } from './components/OceanLayersSection';
import { OceanLifeSecretsSection } from './components/OceanLifeSecretsSection';
import { GallerySection } from './components/GallerySection';
import { ConservationSection } from './components/ConservationSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { SpeciesDetailModal } from './components/SpeciesDetailModal';

export default function App() {
  const [selectedSpecies, setSelectedSpecies] = useState<MarineSpecies>(SPECIES_LIST[0]);
  const [activeModalSpecies, setActiveModalSpecies] = useState<MarineSpecies | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [themeMode, setThemeMode] = useState<'dark' | 'abyss' | 'light'>('dark');
  const [activeSection, setActiveSection] = useState('home');

  // Cycle theme between Deep Ocean (dark), Abyssal Midnight (abyss), and Sunlit Coastal (light)
  const handleCycleTheme = () => {
    setThemeMode((prev) => {
      if (prev === 'dark') return 'abyss';
      if (prev === 'abyss') return 'light';
      return 'dark';
    });
  };

  // Section observer for sticky navbar active state
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'species', 'layers', 'about', 'gallery', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Dynamic theme background classes
  const themeClass =
    themeMode === 'abyss'
      ? 'bg-[#01040a] text-slate-100'
      : themeMode === 'light'
      ? 'bg-[#091f38] text-slate-100'
      : 'bg-[#030b17] text-slate-100';

  return (
    <div className={`min-h-screen w-full max-w-full overflow-x-hidden relative font-sans ${themeClass} selection:bg-cyan-500/30 selection:text-cyan-200 transition-colors duration-500`}>
      {/* Interactive WebGL Three.js Ambient Particle Background */}
      <ThreeOceanCanvas themeMode={themeMode} />

      {/* Primary Fixed Top Navigation Bar */}
      <Navbar
        speciesList={SPECIES_LIST}
        onSelectSpecies={(sp) => {
          setSelectedSpecies(sp);
          handleScrollTo('species');
        }}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(!soundEnabled)}
        themeMode={themeMode}
        onCycleTheme={handleCycleTheme}
        activeSection={activeSection}
      />

      {/* Main Content Layout */}
      <main className="relative z-10 flex flex-col">
        {/* 1. Hero Section: Welcome to the Deep Sea */}
        <HeroSection
          onExploreSpecies={() => handleScrollTo('species')}
          onDiscoverOcean={() => handleScrollTo('about')}
        />

        {/* 2. Featured Species Section (Carousel & Grid with 16+ species) */}
        <FeaturedSpeciesSection
          speciesList={SPECIES_LIST}
          onSelectSpecies={(sp) => {
            setSelectedSpecies(sp);
            // Scroll smoothly to spotlight view
            const spotlightEl = document.getElementById('species-spotlight');
            if (spotlightEl) {
              spotlightEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          }}
          selectedSpeciesId={selectedSpecies.id}
        />

        {/* 3. Interactive Species Spotlight (Matching User's Reference Image) */}
        <div id="species-spotlight">
          <SpeciesSpotlightSection
            selectedSpecies={selectedSpecies}
            speciesList={SPECIES_LIST}
            onSelectSpecies={setSelectedSpecies}
            onOpenFullModal={setActiveModalSpecies}
            soundEnabled={soundEnabled}
          />
        </div>

        {/* 4. The Ocean Layers Section (Journey Through the Ocean Depths) */}
        <OceanLayersSection
          speciesList={SPECIES_LIST}
          onSelectSpecies={(sp) => {
            setSelectedSpecies(sp);
            setActiveModalSpecies(sp);
          }}
        />

        {/* 5. Secrets of Marine Life (Biology & Adaptations) */}
        <OceanLifeSecretsSection />

        {/* 6. Marine Life Gallery (Beauty Beneath the Waves) */}
        <GallerySection />

        {/* 7. Ocean Conservation Section (Protect the Blue Planet) */}
        <ConservationSection />

        {/* 8. About The Project */}
        <AboutSection />

        {/* 9. Contact / Marine Expedition Inquiry */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Full Species Comprehensive Dossier Modal */}
      <SpeciesDetailModal
        species={activeModalSpecies}
        onClose={() => setActiveModalSpecies(null)}
        onSelectAnother={(sp) => {
          setSelectedSpecies(sp);
          setActiveModalSpecies(sp);
        }}
        allSpecies={SPECIES_LIST}
      />
    </div>
  );
}
