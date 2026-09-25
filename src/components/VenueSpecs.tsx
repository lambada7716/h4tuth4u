import React, { useState } from 'react';
import { Volume2, Lightbulb, Users, Wine, Download, FileText, Check, Layers, Sliders } from 'lucide-react';
import { VENUE_TILES } from '../data/venueData';

export const VenueSpecs: React.FC = () => {
  const [activeTileId, setActiveTileId] = useState(VENUE_TILES[0].id);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownloadRider = () => {
    setDownloadSuccess(true);
    // Generate text file download for technical rider
    const riderText = `======================================================
Z MUSIC - JAKARTA, SYN // TECHNICAL SPECIFICATION RIDER
500-Capacity Independent Live Music Venue
Address: 418 Soundwave Ave, Jakarta, SYN 37203
Booking & Production Contact: production@zmusicjakarta.com
======================================================

1. CAPACITY & ROOM LAYOUT
- Total Standing GA: 500
- Seated Cabaret / Showcase: 200
- Balcony Mezzanine: 120 Reserved VIP
- Stage Height: 3.5 ft (hardwood, column-free sightline)
- Stage Dimensions: 28 ft wide x 20 ft deep, 16 ft trim height

2. AUDIO RIG & FRONT OF HOUSE
- Console: Midas Heritage-D HD96-24 (24 motorized faders, 144 inputs)
- Mains: d&b audiotechnik V-Series Line Array (4 per side)
- Subwoofers: 4x d&b B22 Subwoofers (ground-stacked cardioid array)
- Fills: 2x d&b E8 front-fills & 2x balcony delay horns
- Monitors: 6x d&b M4 wedges on dedicated D20 channels + stereo drum sub
- Processing: Lake LM44 system controllers, SMAART V8 measurement

3. MICROPHONE & BACKLINE LOCKER
- Microphones: Shure SM58 (8), SM57 (8), Beta 52A (2), Beta 91A (1), Sennheiser e904 (4), Neumann KM184 pair
- DIs: Radial J48 Active (4), Radial JDI Passive (4), Radial ProD2 stereo (2)
- Bass: Ampeg SVT-CL Classic head + SVT-810E cabinet
- Guitar 1: Fender '65 Twin Reverb reissue (85W tube)
- Guitar 2: Marshall JCM900 100W Head + 1960A 4x12 cab
- Drums: DW Collector's Series Maple Kit (22" kick, 10/12/14/16 toms, snare, DW 9000 hardware)

4. LIGHTING & ATMOSPHERICS
- Console: MA Lighting grandMA3 onPC command wing
- Moving Heads: 8x Robe Pointe beam/spot fixtures
- Wash: 12x Chauvet Professional COLORado Batten 72
- Strobes: 4x Martin Atomic 3000 DMX LED
- Atmospheric: MDG Atmosphere ATMe haze generator (oil-based, odorless)

5. HOSPITALITY & LOAD-IN
- Private green room with en-suite shower and restroom
- Direct street-level ramp load-in door (no stairs)
- High-speed 1Gbps dedicated artist fiber connection
- Dedicated backstage runner & hospitality coordinator
======================================================`;

    const blob = new Blob([riderText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Z_MUSIC_Technical_Rider_Jakarta_SYN.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setTimeout(() => {
      setDownloadSuccess(false);
    }, 3500);
  };

  return (
    <section id="venue" className="py-20 sm:py-28 bg-black text-white relative border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-500 mb-2">
              <Layers className="w-3.5 h-3.5" />
              <span>THE ROOM &amp; SOUND ARCHITECTURE</span>
            </div>
            <h2
              className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white"
              style={{ fontFamily: 'var(--font-display, "Barlow Condensed", sans-serif)' }}
            >
              VENUE SPECIFICATIONS
            </h2>
          </div>

          {/* Download Technical Rider Button */}
          <button
            onClick={handleDownloadRider}
            className="self-start md:self-auto px-5 py-3 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 hover:border-amber-500/80 text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-all flex items-center gap-2.5 cursor-pointer"
            style={{ fontFamily: 'var(--font-display, "Barlow Condensed", sans-serif)' }}
          >
            {downloadSuccess ? (
              <>
                <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
                <span className="text-emerald-400">Rider Downloaded</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4 text-amber-400" />
                <span>Download Tech Rider (PDF / TXT)</span>
              </>
            )}
          </button>
        </div>

        {/* 5 Core Specs Bar as cleanly defined parameters */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4 mb-14">
          <div className="bg-neutral-950 border border-neutral-800 p-4">
            <span className="text-xs font-mono text-neutral-400 block">CAPACITY</span>
            <span className="text-xl sm:text-2xl font-black font-mono text-white mt-1 block">500 STANDING</span>
            <span className="text-xs text-neutral-400">200 seated layout</span>
          </div>

          <div className="bg-neutral-950 border border-neutral-800 p-4">
            <span className="text-xs font-mono text-neutral-400 block">BAR SERVICE</span>
            <span className="text-xl sm:text-2xl font-black font-mono text-amber-400 mt-1 block">3 BARS</span>
            <span className="text-xs text-neutral-400">Main hall, VIP, Patio</span>
          </div>

          <div className="bg-neutral-950 border border-neutral-800 p-4">
            <span className="text-xs font-mono text-neutral-400 block">FRONT OF HOUSE</span>
            <span className="text-xl sm:text-2xl font-black font-mono text-teal-400 mt-1 block">24-CH PA</span>
            <span className="text-xs text-neutral-400">d&amp;b audiotechnik array</span>
          </div>

          <div className="bg-neutral-950 border border-neutral-800 p-4">
            <span className="text-xs font-mono text-neutral-400 block">STAGE LIGHTING</span>
            <span className="text-xl sm:text-2xl font-black font-mono text-white mt-1 block">LED RIG</span>
            <span className="text-xs text-neutral-400">Moving heads + MDG haze</span>
          </div>

          <div className="col-span-2 md:col-span-1 bg-neutral-950 border border-neutral-800 p-4">
            <span className="text-xs font-mono text-neutral-400 block">BACKLINE</span>
            <span className="text-xl sm:text-2xl font-black font-mono text-red-500 mt-1 block">FULL GEAR</span>
            <span className="text-xs text-neutral-400">Ampeg, Fender, DW Kit</span>
          </div>
        </div>

        {/* 4 Photo Tiles Grid (Stage from floor, Balcony, Bar, Green Room) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {VENUE_TILES.map((tile) => {
            const isActive = activeTileId === tile.id;
            return (
              <div
                key={tile.id}
                onClick={() => setActiveTileId(tile.id)}
                className={`group border bg-neutral-950 flex flex-col justify-between overflow-hidden transition-all duration-300 cursor-pointer ${
                  isActive ? 'border-amber-500 shadow-xl' : 'border-neutral-800 hover:border-neutral-700'
                }`}
              >
                {/* Visual Graphic Representation for Tile */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-black">
                  {/* SVG scene specific to tile */}
                  {tile.id === 'vt-1' && (
                    /* Stage from Floor */
                    <svg className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" viewBox="0 0 400 300">
                      <rect width="400" height="300" fill="#050505" />
                      <radialGradient id="stageAmber" cx="50%" cy="40%" r="50%">
                        <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.7" />
                        <stop offset="60%" stopColor="#000000" stopOpacity="0.9" />
                      </radialGradient>
                      <circle cx="200" cy="120" r="160" fill="url(#stageAmber)" />
                      {/* Floor floorboards */}
                      <path d="M0,300 L200,180 L400,300" stroke="#1f1f1f" strokeWidth="2" fill="none" />
                      <line x1="100" y1="300" x2="200" y2="180" stroke="#171717" strokeWidth="2" />
                      <line x1="300" y1="300" x2="200" y2="180" stroke="#171717" strokeWidth="2" />
                      {/* Stage platform */}
                      <polygon points="50,180 350,180 380,210 20,210" fill="#111" stroke="#333" />
                      {/* Drum kit & mic stand */}
                      <line x1="200" y1="130" x2="200" y2="180" stroke="#fff" strokeWidth="2" />
                      <circle cx="200" cy="128" r="4" fill="#F59E0B" />
                    </svg>
                  )}

                  {tile.id === 'vt-2' && (
                    /* Balcony Mezzanine */
                    <svg className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" viewBox="0 0 400 300">
                      <rect width="400" height="300" fill="#040404" />
                      <radialGradient id="balconyTeal" cx="65%" cy="35%" r="60%">
                        <stop offset="0%" stopColor="#14B8A6" stopOpacity="0.6" />
                        <stop offset="80%" stopColor="#000000" stopOpacity="1" />
                      </radialGradient>
                      <circle cx="260" cy="110" r="170" fill="url(#balconyTeal)" />
                      {/* Curved Balcony railing */}
                      <path d="M0,170 Q200,230 400,170" stroke="#444" strokeWidth="4" fill="none" />
                      <path d="M0,210 Q200,270 400,210" stroke="#222" strokeWidth="12" fill="none" />
                      {/* Vertical balusters */}
                      {[40, 80, 120, 160, 200, 240, 280, 320, 360].map((bx, i) => (
                        <line key={i} x1={bx} y1="175" x2={bx} y2="215" stroke="#555" strokeWidth="2" />
                      ))}
                      {/* Overlook into floor stage */}
                      <circle cx="200" cy="80" r="25" fill="#F59E0B" opacity="0.8" />
                    </svg>
                  )}

                  {tile.id === 'vt-3' && (
                    /* Main Bar */
                    <svg className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" viewBox="0 0 400 300">
                      <rect width="400" height="300" fill="#050505" />
                      <radialGradient id="barGlow" cx="50%" cy="30%" r="50%">
                        <stop offset="0%" stopColor="#DC2626" stopOpacity="0.5" />
                        <stop offset="40%" stopColor="#F59E0B" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#000000" stopOpacity="1" />
                      </radialGradient>
                      <rect width="400" height="300" fill="url(#barGlow)" />
                      {/* Liquor Shelves */}
                      <line x1="40" y1="70" x2="360" y2="70" stroke="#444" strokeWidth="3" />
                      <line x1="40" y1="120" x2="360" y2="120" stroke="#444" strokeWidth="3" />
                      {/* Bottles glowing */}
                      {[60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((bx, i) => (
                        <rect key={i} x={bx} y={i % 2 === 0 ? "80" : "35"} width="14" height="32" fill={i % 3 === 0 ? "#F59E0B" : i % 3 === 1 ? "#DC2626" : "#14B8A6"} opacity="0.85" rx="1" />
                      ))}
                      {/* Zinc Counter */}
                      <polygon points="0,210 400,210 400,300 0,300" fill="#141414" stroke="#333" />
                      {/* Beer taps */}
                      <rect x="180" y="160" width="40" height="50" fill="#333" />
                      <line x1="190" y1="150" x2="190" y2="170" stroke="#F59E0B" strokeWidth="4" />
                      <line x1="210" y1="150" x2="210" y2="170" stroke="#F59E0B" strokeWidth="4" />
                    </svg>
                  )}

                  {tile.id === 'vt-4' && (
                    /* Green Room */
                    <svg className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" viewBox="0 0 400 300">
                      <rect width="400" height="300" fill="#050505" />
                      <radialGradient id="greenRoomGlow" cx="40%" cy="40%" r="55%">
                        <stop offset="0%" stopColor="#14B8A6" stopOpacity="0.4" />
                        <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#000000" stopOpacity="1" />
                      </radialGradient>
                      <rect width="400" height="300" fill="url(#greenRoomGlow)" />
                      {/* Leather couch silhouette */}
                      <rect x="70" y="170" width="260" height="60" rx="6" fill="#1f1f1f" stroke="#333" strokeWidth="2" />
                      <rect x="90" y="140" width="220" height="40" rx="4" fill="#181818" />
                      {/* Makeup mirror with globe bulbs */}
                      <rect x="140" y="40" width="120" height="80" fill="#0d0d0d" stroke="#555" strokeWidth="2" />
                      {[145, 175, 205, 235, 255].map((gx, i) => (
                        <circle key={i} cx={gx} cy="45" r="4" fill="#F59E0B" />
                      ))}
                      {/* Direct roll-up door lines */}
                      <line x1="330" y1="40" x2="380" y2="40" stroke="#222" strokeWidth="2" />
                      <line x1="330" y1="70" x2="380" y2="70" stroke="#222" strokeWidth="2" />
                      <line x1="330" y1="100" x2="380" y2="100" stroke="#222" strokeWidth="2" />
                    </svg>
                  )}

                  {/* Tile badge */}
                  <div className="absolute top-3 left-3 bg-black/90 border border-neutral-800 px-2.5 py-1 text-[11px] font-mono text-amber-400">
                    {tile.badge}
                  </div>
                </div>

                {/* Tile Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3
                      className="text-xl font-bold uppercase tracking-tight text-white group-hover:text-amber-400 transition-colors"
                      style={{ fontFamily: 'var(--font-display, "Barlow Condensed", sans-serif)' }}
                    >
                      {tile.title}
                    </h3>
                    <div className="text-xs text-amber-500 font-mono mt-0.5">{tile.subtitle}</div>
                    <p className="text-xs text-neutral-400 mt-2.5 leading-relaxed">{tile.description}</p>
                  </div>

                  {/* Specifications list */}
                  <div className="mt-4 pt-3 border-t border-neutral-900 space-y-1.5 text-[11px] font-mono text-neutral-300">
                    {tile.specs.map((spec, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-1.5">
                        <span className="text-amber-500 text-[10px]">■</span>
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
