import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Award, Mic, Music, History } from 'lucide-react';
import { PAST_ARTISTS } from '../data/venueData';
import { PastArtist } from '../types/venue';

interface AboutSectionProps {
  onSelectArtistStory?: (artist: PastArtist) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onSelectArtistStory }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  return (
    <section id="artists" className="py-20 sm:py-28 bg-black text-white relative border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Kicker */}
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-500 mb-2">
          <History className="w-3.5 h-3.5" />
          <span>INDEPENDENT LEGACY</span>
        </div>

        <h2
          className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white mb-12"
          style={{ fontFamily: 'var(--font-display, "Barlow Condensed", sans-serif)' }}
        >
          ABOUT Z MUSIC
        </h2>

        {/* 2-Column Layout: Left Amber Stats | Right Venue Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start pb-16 border-b border-neutral-900">
          {/* Left: Amber Stats */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-neutral-950 border border-neutral-800 p-6 sm:p-7 relative group hover:border-amber-500/60 transition-colors">
              <div className="absolute top-0 left-0 w-8 h-1 bg-amber-500" />
              <div className="text-4xl sm:text-5xl font-mono font-black text-amber-400 tabular-nums">
                12
              </div>
              <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white mt-1">
                Years Open
              </div>
              <p className="text-xs text-neutral-400 mt-2 font-normal">
                Continuous independent ownership since 2014 without corporate sponsorship.
              </p>
            </div>

            <div className="bg-neutral-950 border border-neutral-800 p-6 sm:p-7 relative group hover:border-amber-500/60 transition-colors">
              <div className="absolute top-0 left-0 w-8 h-1 bg-amber-500" />
              <div className="text-4xl sm:text-5xl font-mono font-black text-amber-400 tabular-nums">
                500
              </div>
              <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white mt-1">
                Capacity
              </div>
              <p className="text-xs text-neutral-400 mt-2 font-normal">
                Intimate room size ensuring pure energy exchange between floor and stage.
              </p>
            </div>

            <div className="bg-neutral-950 border border-neutral-800 p-6 sm:p-7 relative group hover:border-amber-500/60 transition-colors">
              <div className="absolute top-0 left-0 w-8 h-1 bg-amber-500" />
              <div className="text-4xl sm:text-5xl font-mono font-black text-amber-400 tabular-nums">
                850+
              </div>
              <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white mt-1">
                Artists Hosted
              </div>
              <p className="text-xs text-neutral-400 mt-2 font-normal">
                From underground local demo cassettes to Grammy-nominated global tours.
              </p>
            </div>

            <div className="bg-neutral-950 border border-neutral-800 p-6 sm:p-7 relative group hover:border-amber-500/60 transition-colors">
              <div className="absolute top-0 left-0 w-8 h-1 bg-teal-500" />
              <div className="text-3xl sm:text-4xl font-mono font-black text-teal-400">
                ALL-AGES
              </div>
              <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white mt-1">
                Shows First
              </div>
              <p className="text-xs text-neutral-400 mt-2 font-normal">
                Committed to nurturing youth music culture and safe inclusive spaces.
              </p>
            </div>
          </div>

          {/* Right: 2-Paragraph Venue Story + Past Headliners List */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="space-y-6 text-neutral-300 text-base sm:text-lg leading-relaxed">
              <p>
                Founded in 2014 within a repurposed brick warehouse in the heart of Jakarta, SYN,
                <strong className="text-white font-semibold"> Z MUSIC</strong> was built by musicians with a single uncompromising mission: to restore the raw, electrifying intimacy of live performance that arena spectacles have forgotten. We installed an arena-grade d&amp;b audiotechnik line array inside an acoustically treated 500-capacity room, eliminating security barricades so performers and crowds stand face-to-face.
              </p>
              <p>
                Over the past decade, we have remained proudly independent — no ticketing monopolies, no corporate beverage mandates, and no VIP paywalls on the main floor. Whether hosting legendary international headliners or debuting the next generation of local Jakarta post-punk and electronic artists, our commitment to transparent artist hospitality and world-class sound never wavers.
              </p>
            </div>

            {/* Past Headliners Callout */}
            <div className="mt-8 pt-6 border-t border-neutral-800">
              <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-3">
                NOTABLE PAST HEADLINERS INCLUDE:
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-base sm:text-lg font-bold uppercase tracking-wide text-white">
                <span className="text-amber-400">Chvrches</span>
                <span className="text-neutral-600">·</span>
                <span className="text-amber-400">Sigur Rós</span>
                <span className="text-neutral-600">·</span>
                <span className="text-amber-400">Turnstile</span>
                <span className="text-neutral-600">·</span>
                <span className="text-amber-400">Wet Leg</span>
                <span className="text-neutral-600">·</span>
                <span className="text-neutral-300">Fontaines D.C.</span>
                <span className="text-neutral-600">·</span>
                <span className="text-neutral-300">IDLES</span>
                <span className="text-neutral-600">·</span>
                <span className="text-neutral-300">King Gizzard</span>
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal Scroll Row of 8 Past Artist Name Cards with Genre Tags */}
        <div className="mt-14">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3
                className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white"
                style={{ fontFamily: 'var(--font-display, "Barlow Condensed", sans-serif)' }}
              >
                HALL OF RESIDENTS &amp; PAST GUESTS
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                A selection of the 850+ groundbreaking artists who graced our stage
              </p>
            </div>

            {/* Scroll Navigation Buttons */}
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={scrollLeft}
                className="p-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={scrollRight}
                className="p-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Horizontal Card Row */}
          <div
            ref={scrollContainerRef}
            className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {PAST_ARTISTS.map((artist) => (
              <div
                key={artist.id}
                onClick={() => onSelectArtistStory && onSelectArtistStory(artist)}
                className="w-72 sm:w-80 shrink-0 bg-neutral-950 border border-neutral-800/90 p-5 sm:p-6 snap-start flex flex-col justify-between hover:border-amber-500/80 transition-all duration-200 group cursor-pointer relative"
              >
                {/* Year tag & unboxed indicator */}
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-neutral-500 mb-3">
                    <span className="text-amber-500 font-bold">{artist.year} HEADLINER</span>
                    <span className="text-neutral-400">SOLD OUT</span>
                  </div>

                  {/* Artist Name */}
                  <h4
                    className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white group-hover:text-amber-400 transition-colors"
                    style={{ fontFamily: 'var(--font-display, "Barlow Condensed", sans-serif)' }}
                  >
                    {artist.name}
                  </h4>

                  {/* Genre Tags (Clean unboxed metadata with subtle separators) */}
                  <div className="flex items-center gap-1.5 text-xs text-neutral-400 mt-2">
                    {artist.genres.map((genre, idx) => (
                      <React.Fragment key={idx}>
                        <span>{genre}</span>
                        {idx < artist.genres.length - 1 && <span className="text-neutral-600">·</span>}
                      </React.Fragment>
                    ))}
                  </div>

                  {/* Quote / Memory */}
                  {artist.quote && (
                    <blockquote className="mt-4 text-xs text-neutral-400 italic border-l border-amber-500/50 pl-3 py-0.5 leading-relaxed">
                      "{artist.quote}"
                    </blockquote>
                  )}
                </div>

                <div className="mt-5 pt-3 border-t border-neutral-900 flex items-center justify-between text-xs font-mono text-neutral-500">
                  <span>Track: {artist.notableTrack}</span>
                  <span className="text-amber-500 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
