import React, { useState, useEffect, useRef } from 'react';

interface MarineVisualProps {
  src: string;
  alt: string;
  className?: string;
  speciesType?: string;
  priority?: boolean; // For hero section images that should load immediately
  sizeVariant?: 'thumb' | 'card' | 'showcase' | 'hero';
}

/**
 * Optimizes Unsplash or web image URLs by adjusting dimensions and quality
 * based on device resolution and container size to drastically save bandwidth.
 */
function getOptimizedImageUrl(url: string, variant: 'thumb' | 'card' | 'showcase' | 'hero'): string {
  if (!url) return '';
  if (!url.includes('unsplash.com')) return url;

  try {
    const base = url.split('?')[0];
    switch (variant) {
      case 'thumb':
        return `${base}?auto=format&fit=crop&w=160&h=160&q=70`;
      case 'card':
        return `${base}?auto=format&fit=crop&w=640&q=75`;
      case 'showcase':
        return `${base}?auto=format&fit=crop&w=1080&q=80`;
      case 'hero':
        return `${base}?auto=format&fit=crop&w=1800&q=85`;
      default:
        return `${base}?auto=format&fit=crop&w=800&q=75`;
    }
  } catch {
    return url;
  }
}

export const MarineVisual: React.FC<MarineVisualProps> = ({
  src,
  alt,
  className = '',
  speciesType = 'whale',
  priority = false,
  sizeVariant = 'card'
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const containerRef = useRef<HTMLDivElement>(null);

  // IntersectionObserver for genuine lazy-loading when element approaches viewport
  useEffect(() => {
    if (priority || isInView) return;

    const el = containerRef.current;
    if (!el) return;

    if (!('IntersectionObserver' in window)) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '250px 0px', // Preload slightly before scrolling into view
        threshold: 0.01
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [priority, isInView]);

  const optimizedSrc = getOptimizedImageUrl(src, sizeVariant);

  // High-fidelity SVG anatomical silhouette fallback if network fails
  const renderFallbackSvg = () => {
    return (
      <div className={`relative w-full h-full flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#04162e] via-[#092244] to-[#020b18] ${className}`}>
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_20%,_rgba(56,189,248,0.4)_0%,_transparent_60%)]" />
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-cyan-400/10 to-transparent" />

        <svg
          viewBox="0 0 200 120"
          className="w-3/5 h-3/5 text-cyan-300/80 drop-shadow-[0_0_15px_rgba(6,182,212,0.4)] animate-float-slow"
          fill="currentColor"
        >
          {speciesType.toLowerCase().includes('whale') ? (
            <path d="M 20 60 C 40 40, 90 35, 140 45 C 165 50, 185 40, 195 30 C 190 55, 175 65, 155 65 C 130 65, 110 75, 80 75 C 50 75, 30 70, 20 60 Z M 100 68 C 115 80, 125 90, 110 92 C 100 90, 95 80, 90 70 Z" />
          ) : speciesType.toLowerCase().includes('shark') ? (
            <path d="M 15 60 C 40 45, 80 40, 140 48 C 160 52, 180 35, 192 25 C 185 50, 170 65, 150 68 C 120 72, 90 70, 60 68 C 40 68, 25 64, 15 60 Z M 95 44 L 115 15 L 125 44 Z M 70 68 L 60 90 L 85 70 Z" />
          ) : speciesType.toLowerCase().includes('octopus') ? (
            <g>
              <ellipse cx="100" cy="40" rx="30" ry="25" />
              <path d="M 75 55 C 60 75, 40 85, 30 100 C 40 105, 55 95, 80 65 Z" />
              <path d="M 85 60 C 75 85, 60 100, 55 112 C 68 112, 85 95, 92 65 Z" />
              <path d="M 115 60 C 125 85, 140 100, 145 112 C 132 112, 115 95, 108 65 Z" />
              <path d="M 125 55 C 140 75, 160 85, 170 100 C 160 105, 145 95, 120 65 Z" />
            </g>
          ) : speciesType.toLowerCase().includes('turtle') ? (
            <g>
              <ellipse cx="100" cy="60" rx="35" ry="25" />
              <circle cx="145" cy="60" r="10" />
              <path d="M 115 45 C 130 25, 150 15, 160 20 C 150 35, 130 45, 115 50 Z" />
              <path d="M 115 75 C 130 95, 150 105, 160 100 C 150 85, 130 75, 115 70 Z" />
              <path d="M 75 48 C 65 35, 55 35, 50 40 C 58 48, 68 52, 75 52 Z" />
              <path d="M 75 72 C 65 85, 55 85, 50 80 C 58 72, 68 68, 75 68 Z" />
            </g>
          ) : (
            <path d="M 100 15 C 130 40, 175 60, 185 70 C 155 75, 125 80, 105 105 L 100 115 L 95 105 C 75 80, 45 75, 15 70 C 25 60, 70 40, 100 15 Z" />
          )}
        </svg>

        <div className="absolute bottom-3 left-4 right-4 text-center z-10">
          <p className="text-xs uppercase tracking-widest text-cyan-300/90 font-medium truncate">{alt}</p>
        </div>
      </div>
    );
  };

  if (hasError) {
    return renderFallbackSvg();
  }

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden bg-[#041326] ${className}`}
    >
      {/* Sleek Skeleton Shimmer Loader */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-[#031326] via-[#06203f] to-[#031326] animate-pulse flex items-center justify-center">
          <div className="w-6 h-6 rounded-full border border-cyan-500/20 border-t-cyan-400 animate-spin opacity-50" />
        </div>
      )}

      {/* Actual Image Tag loaded only when in view */}
      {isInView && (
        <img
          src={optimizedSrc}
          alt={alt}
          referrerPolicy="no-referrer"
          decoding="async"
          loading={priority ? 'eager' : 'lazy'}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover transition-all duration-700 ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105 blur-sm'
          }`}
        />
      )}
    </div>
  );
};
