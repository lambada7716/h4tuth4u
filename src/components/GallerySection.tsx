import React, { useState } from 'react';
import { Camera, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/venueData';
import { GalleryPhoto } from '../types/venue';

export const GallerySection: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);

  const openLightbox = (photo: GalleryPhoto) => {
    setSelectedPhoto(photo);
  };

  const closeLightbox = () => {
    setSelectedPhoto(null);
  };

  const nextPhoto = () => {
    if (!selectedPhoto) return;
    const currentIndex = GALLERY_ITEMS.findIndex((item) => item.id === selectedPhoto.id);
    const nextIndex = (currentIndex + 1) % GALLERY_ITEMS.length;
    setSelectedPhoto(GALLERY_ITEMS[nextIndex]);
  };

  const prevPhoto = () => {
    if (!selectedPhoto) return;
    const currentIndex = GALLERY_ITEMS.findIndex((item) => item.id === selectedPhoto.id);
    const prevIndex = (currentIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length;
    setSelectedPhoto(GALLERY_ITEMS[prevIndex]);
  };

  return (
    <section className="py-20 sm:py-28 bg-black text-white relative border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-500 mb-2">
              <Camera className="w-3.5 h-3.5" />
              <span>THE ATMOSPHERE ON 35MM &amp; DIGITAL</span>
            </div>
            <h2
              className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white"
              style={{ fontFamily: 'var(--font-display, "Barlow Condensed", sans-serif)' }}
            >
              VENUE ARCHIVE &amp; MOMENTS
            </h2>
          </div>

          <div className="text-xs font-mono text-neutral-400">
            <span>CURATED BY RESIDENT PHOTOGRAPHERS</span>
          </div>
        </div>

        {/* 6-Photo Moody Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY_ITEMS.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => openLightbox(item)}
              className="group relative border border-neutral-800 bg-neutral-950 overflow-hidden cursor-pointer hover:border-amber-500/80 transition-all duration-300"
            >
              {/* Graphic Representation Container */}
              <div className={`w-full aspect-[4/3] bg-gradient-to-br ${item.colorScheme} relative overflow-hidden flex items-center justify-center`}>
                {/* Visual patterns matching the photo subject */}
                {idx === 0 && (
                  <svg className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" viewBox="0 0 400 300">
                    <rect width="400" height="300" fill="#000" />
                    <circle cx="200" cy="100" r="140" fill="#F59E0B" opacity="0.6" />
                    <polygon points="200,60 50,300 350,300" fill="#DC2626" opacity="0.3" />
                    {/* Crowd silhouettes */}
                    <path d="M0,300 C40,240 80,260 120,220 C160,200 200,240 240,210 C280,230 320,200 360,240 C380,250 400,220 400,300 Z" fill="#050505" />
                    <line x1="200" y1="20" x2="200" y2="280" stroke="#fff" strokeWidth="2" opacity="0.7" />
                  </svg>
                )}

                {idx === 1 && (
                  <svg className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" viewBox="0 0 400 300">
                    <rect width="400" height="300" fill="#050505" />
                    <circle cx="150" cy="120" r="130" fill="#14B8A6" opacity="0.5" />
                    {/* Mixing console grid */}
                    <rect x="40" y="80" width="320" height="180" fill="#111" stroke="#222" />
                    {[70, 110, 150, 190, 230, 270, 310].map((fx, i) => (
                      <g key={i}>
                        <line x1={fx} y1="100" x2={fx} y2="240" stroke="#333" strokeWidth="2" />
                        <rect x={fx - 6} y={130 + (i % 4) * 20} width="12" height="18" fill="#F59E0B" rx="1" />
                        <circle cx={fx} cy="92" r="3" fill="#14B8A6" />
                      </g>
                    ))}
                  </svg>
                )}

                {idx === 2 && (
                  <svg className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" viewBox="0 0 400 300">
                    <rect width="400" height="300" fill="#040404" />
                    <radialGradient id="balcGrad" cx="50%" cy="30%" r="60%">
                      <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.8" />
                      <stop offset="70%" stopColor="#000" stopOpacity="1" />
                    </radialGradient>
                    <rect width="400" height="300" fill="url(#balcGrad)" />
                    {/* Mezzanine curve */}
                    <path d="M0,140 Q200,200 400,140" stroke="#444" strokeWidth="6" fill="none" />
                    <rect x="0" y="240" width="400" height="60" fill="#070707" />
                  </svg>
                )}

                {idx === 3 && (
                  <svg className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" viewBox="0 0 400 300">
                    <rect width="400" height="300" fill="#050505" />
                    <circle cx="200" cy="150" r="100" fill="#DC2626" opacity="0.6" />
                    {/* Vintage Tube Amp chassis */}
                    <rect x="80" y="70" width="240" height="170" fill="#141414" stroke="#444" strokeWidth="3" rx="2" />
                    <rect x="100" y="100" width="200" height="120" fill="#0d0d0d" stroke="#222" />
                    {/* Glowing vacuum tubes */}
                    <rect x="140" y="120" width="16" height="30" rx="6" fill="#F59E0B" opacity="0.9" />
                    <rect x="175" y="120" width="16" height="30" rx="6" fill="#F59E0B" opacity="0.9" />
                    <rect x="210" y="120" width="16" height="30" rx="6" fill="#F59E0B" opacity="0.9" />
                    <rect x="245" y="120" width="16" height="30" rx="6" fill="#F59E0B" opacity="0.9" />
                  </svg>
                )}

                {idx === 4 && (
                  <svg className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" viewBox="0 0 400 300">
                    <rect width="400" height="300" fill="#030303" />
                    <circle cx="220" cy="140" r="120" fill="#14B8A6" opacity="0.4" />
                    {/* Setlist paper on gaffer tape */}
                    <rect x="120" y="50" width="160" height="200" fill="#1a1a1a" stroke="#333" rx="2" transform="rotate(-4 200 150)" />
                    <line x1="140" y1="90" x2="250" y2="85" stroke="#F59E0B" strokeWidth="3" />
                    <line x1="140" y1="120" x2="230" y2="115" stroke="#999" strokeWidth="2" />
                    <line x1="140" y1="145" x2="245" y2="140" stroke="#999" strokeWidth="2" />
                    <line x1="140" y1="170" x2="220" y2="165" stroke="#999" strokeWidth="2" />
                    <line x1="140" y1="200" x2="255" y2="195" stroke="#DC2626" strokeWidth="3" />
                  </svg>
                )}

                {idx === 5 && (
                  <svg className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" viewBox="0 0 400 300">
                    <rect width="400" height="300" fill="#040404" />
                    <radialGradient id="barLastCall" cx="60%" cy="40%" r="50%">
                      <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.7" />
                      <stop offset="50%" stopColor="#DC2626" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#000" stopOpacity="1" />
                    </radialGradient>
                    <rect width="400" height="300" fill="url(#barLastCall)" />
                    {/* Cocktail glass with amber liquid */}
                    <polygon points="170,110 230,110 205,170 195,170" fill="#F59E0B" opacity="0.8" />
                    <line x1="200" y1="170" x2="200" y2="230" stroke="#fff" strokeWidth="3" />
                    <line x1="175" y1="230" x2="225" y2="230" stroke="#fff" strokeWidth="4" />
                  </svg>
                )}

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="p-3 bg-neutral-900/90 border border-neutral-700 text-white rounded-none flex items-center gap-2">
                    <Maximize2 className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-mono uppercase tracking-wider">Enlarge View</span>
                  </div>
                </div>

                {/* Badge */}
                <div className="absolute top-3 left-3 bg-black/85 border border-neutral-800 px-2 py-1 text-[10px] font-mono text-amber-400 tracking-wider">
                  {item.tag}
                </div>
              </div>

              {/* Photo Details */}
              <div className="p-4 bg-neutral-950">
                <h4
                  className="text-lg font-bold uppercase tracking-tight text-white group-hover:text-amber-400 transition-colors"
                  style={{ fontFamily: 'var(--font-display, "Barlow Condensed", sans-serif)' }}
                >
                  {item.title}
                </h4>
                <p className="text-xs text-neutral-400 mt-1">{item.subtitle}</p>
                <div className="mt-3 pt-2 border-t border-neutral-900 flex justify-between text-[11px] font-mono text-neutral-400">
                  <span>Photo: {item.photographer}</span>
                  <span className="text-amber-500">Z MUSIC ARCHIVE</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={closeLightbox}
        >
          <div
            className="relative max-w-4xl w-full bg-neutral-950 border border-neutral-800 p-6 sm:p-8 overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white bg-neutral-900 border border-neutral-800 cursor-pointer"
              aria-label="Close Lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Prev & Next Controls */}
            <button
              onClick={prevPhoto}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-neutral-300 hover:text-white bg-black/80 border border-neutral-800 cursor-pointer hidden sm:block"
              aria-label="Previous Photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextPhoto}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-neutral-300 hover:text-white bg-black/80 border border-neutral-800 cursor-pointer hidden sm:block"
              aria-label="Next Photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Large Preview Graphic */}
            <div className={`w-full aspect-video bg-gradient-to-br ${selectedPhoto.colorScheme} border border-neutral-800 flex items-center justify-center p-8`}>
              <div className="text-center">
                <span className="text-xs font-mono text-amber-400 uppercase tracking-widest block mb-2">
                  {selectedPhoto.tag} · ARCHIVE NEGATIVE #00{selectedPhoto.id.replace('g-', '')}
                </span>
                <h3
                  className="text-4xl sm:text-5xl font-black uppercase text-white tracking-tight"
                  style={{ fontFamily: 'var(--font-display, "Barlow Condensed", sans-serif)' }}
                >
                  {selectedPhoto.title}
                </h3>
                <p className="mt-3 text-sm sm:text-base text-neutral-300 max-w-lg mx-auto">
                  {selectedPhoto.subtitle}
                </p>
                <div className="mt-6 text-xs font-mono text-neutral-400">
                  Shot on 35mm Tri-X / Digital Leica by <strong className="text-white">{selectedPhoto.photographer}</strong>
                </div>
              </div>
            </div>

            {/* Footer Navigation Bar in Lightbox */}
            <div className="mt-4 flex items-center justify-between text-xs font-mono text-neutral-400 pt-2 border-t border-neutral-900">
              <div className="flex gap-2 sm:hidden">
                <button onClick={prevPhoto} className="px-3 py-1 bg-neutral-900 border border-neutral-800 text-white">
                  ← Prev
                </button>
                <button onClick={nextPhoto} className="px-3 py-1 bg-neutral-900 border border-neutral-800 text-white">
                  Next →
                </button>
              </div>
              <span className="hidden sm:inline">Use arrows or click background to dismiss</span>
              <span className="text-amber-500 font-bold">418 SOUNDWAVE AVE · JAKARTA, SYN</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
