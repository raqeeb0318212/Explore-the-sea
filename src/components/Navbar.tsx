import React, { useState, useEffect } from 'react';
import { Search, Moon, Sun, Volume2, VolumeX, Menu, X, Compass, ArrowRight } from 'lucide-react';
import { MarineSpecies } from '../data/speciesData';
import { MarineVisual } from './MarineVisual';

interface NavbarProps {
  speciesList: MarineSpecies[];
  onSelectSpecies: (species: MarineSpecies) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  themeMode: 'dark' | 'abyss' | 'light';
  onCycleTheme: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  speciesList,
  onSelectSpecies,
  soundEnabled,
  onToggleSound,
  themeMode,
  onCycleTheme,
  activeSection
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const searchResults = searchQuery.trim() === ''
    ? []
    : speciesList.filter(s =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.scientificName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Species', href: '#species' },
    { name: 'Layers', href: '#layers' },
    { name: 'About', href: '#about' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' }
  ];

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#030d1d]/85 backdrop-blur-md border-b border-cyan-500/15 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
          : 'bg-gradient-to-b from-[#020b18]/80 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Brand Logo with Wave Swirl Icon */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#home');
            }}
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg p-1"
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 via-blue-600 to-teal-400 p-[1px] shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-400/30 transition-all duration-300">
              <div className="w-full h-full rounded-xl bg-[#031326] flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform duration-300"
                >
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
            </div>

            <div className="flex flex-col">
              <span className="font-display tracking-[0.16em] text-lg sm:text-xl font-bold bg-gradient-to-r from-white via-cyan-100 to-cyan-300 bg-clip-text text-transparent">
                DEEP SEA
              </span>
              <span className="text-[10px] tracking-widest uppercase text-cyan-400/80 -mt-0.5 font-medium hidden sm:inline-block">
                Explore · Discover · Protect
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.name.toLowerCase();
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-cyan-300 font-semibold bg-cyan-950/40 border-b-2 border-cyan-400 shadow-[0_2px_12px_rgba(6,182,212,0.2)]'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Right Action Controls: Search Bar & Utility Toggles */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* Search Input Box */}
            <div className="relative">
              <div
                className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-full border transition-all duration-200 ${
                  isSearchFocused || searchQuery
                    ? 'w-32 sm:w-64 bg-[#051930] border-cyan-400/60 shadow-[0_0_15px_rgba(6,182,212,0.25)]'
                    : 'w-24 sm:w-48 bg-[#041427]/60 border-slate-700/50 hover:border-slate-600'
                }`}
              >
                <Search className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-cyan-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setTimeout(() => setIsSearchFocused(false), 250)}
                  className="w-full bg-transparent text-xs sm:text-sm text-slate-100 placeholder-slate-400 focus:outline-none"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-slate-400 hover:text-white p-0.5"
                    aria-label="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Instant Search Dropdown Results */}
              {isSearchFocused && searchQuery.trim() !== '' && (
                <div className="fixed sm:absolute left-4 right-4 sm:left-auto sm:right-0 mt-2 sm:w-80 rounded-2xl bg-[#031326]/95 backdrop-blur-xl border border-cyan-500/30 p-2 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-150 max-h-80 overflow-y-auto">
                  <div className="text-[11px] uppercase tracking-wider text-cyan-400/80 px-3 py-1 font-semibold">
                    Matching Creatures ({searchResults.length})
                  </div>
                  {searchResults.length === 0 ? (
                    <div className="px-3 py-4 text-xs text-slate-400 text-center">
                      No marine creatures found matching &ldquo;{searchQuery}&rdquo;.
                    </div>
                  ) : (
                    <div className="space-y-1">
                      {searchResults.map((species) => (
                        <button
                          key={species.id}
                          onClick={() => {
                            onSelectSpecies(species);
                            setSearchQuery('');
                            setIsSearchFocused(false);
                          }}
                          className="w-full flex items-center justify-between p-2 rounded-xl text-left hover:bg-cyan-950/50 transition-colors group"
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg overflow-hidden border border-cyan-500/20 shrink-0">
                              <MarineVisual
                                src={species.imageUrl}
                                alt={species.name}
                                speciesType={species.name}
                                sizeVariant="thumb"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <div className="text-xs font-semibold text-slate-100 group-hover:text-cyan-300">
                                {species.name}
                              </div>
                              <div className="text-[10px] text-slate-400 italic">
                                {species.scientificName}
                              </div>
                            </div>
                          </div>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800/40">
                            {species.category}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Ocean Soundscape Audio Toggle (Visible on sm screens or in mobile drawer) */}
            <button
              onClick={onToggleSound}
              title={soundEnabled ? 'Mute ocean acoustics' : 'Enable underwater creature acoustics'}
              aria-label={soundEnabled ? 'Mute ocean acoustics' : 'Enable underwater creature acoustics'}
              className={`hidden sm:flex p-2 rounded-full border transition-all ${
                soundEnabled
                  ? 'bg-cyan-950 text-cyan-300 border-cyan-500/50 shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                  : 'bg-slate-900/60 text-slate-400 border-slate-700/60 hover:text-slate-200'
              }`}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Accessibility Theme Mode Toggle */}
            <button
              onClick={onCycleTheme}
              title={`Active mode: ${themeMode.toUpperCase()} (Click to toggle Deep Ocean / Abyssal / Coastal)`}
              aria-label={`Theme mode: ${themeMode}`}
              className="p-2 rounded-full border border-slate-700/60 bg-slate-900/60 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 transition-all flex items-center justify-center"
            >
              {themeMode === 'abyss' ? (
                <Moon className="w-4 h-4 text-purple-400" />
              ) : themeMode === 'light' ? (
                <Sun className="w-4 h-4 text-amber-300" />
              ) : (
                <Compass className="w-4 h-4 text-cyan-400" />
              )}
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/50 focus:outline-none"
              aria-label="Open mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#030e20]/95 backdrop-blur-xl border-b border-cyan-500/20 px-4 pt-3 pb-6 animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="flex items-center justify-between px-3 py-3 rounded-xl text-base font-medium text-slate-200 hover:text-cyan-300 hover:bg-cyan-950/40 active:bg-cyan-950/70"
              >
                <span>{link.name}</span>
                <ArrowRight className="w-4 h-4 text-cyan-400/60" />
              </a>
            ))}
          </nav>

          <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-3 text-xs text-slate-400">
            <div className="flex items-center justify-between">
              <span>Theme: <strong className="text-cyan-300 uppercase">{themeMode}</strong></span>
              <button
                onClick={onCycleTheme}
                className="px-3 py-1.5 rounded-lg bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 active:scale-95"
              >
                Change Palette
              </button>
            </div>

            <div className="flex items-center justify-between">
              <span>Underwater Acoustics:</span>
              <button
                onClick={onToggleSound}
                className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  soundEnabled
                    ? 'bg-cyan-500 text-slate-950 border-cyan-400'
                    : 'bg-slate-900 border-slate-700 text-slate-300'
                }`}
              >
                {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                <span>{soundEnabled ? 'Sound ON' : 'Sound Muted'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
