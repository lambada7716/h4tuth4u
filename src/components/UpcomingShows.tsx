import React, { useState, useMemo } from 'react';
import { Search, Calendar, Ticket, AlertCircle, CheckCircle2, ChevronRight, SlidersHorizontal } from 'lucide-react';
import { Show } from '../types/venue';
import { UPCOMING_SHOWS } from '../data/venueData';
import { useCurrency } from '../context/CurrencyContext';
import { useLanguage } from '../context/LanguageContext';

interface UpcomingShowsProps {
  onSelectShow: (show: Show) => void;
  onOpenCalendar: () => void;
}

export const UpcomingShows: React.FC<UpcomingShowsProps> = ({ onSelectShow, onOpenCalendar }) => {
  const { formatPrice } = useCurrency();
  const { language, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMode, setFilterMode] = useState<'all' | 'weekend' | 'all-ages' | 'selling-fast'>('all');

  // Filter shows based on query and filter buttons
  const filteredShows = useMemo(() => {
    return UPCOMING_SHOWS.filter((show) => {
      const matchesSearch =
        show.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (show.support && show.support.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (show.song && show.song.toLowerCase().includes(searchQuery.toLowerCase())) ||
        show.genre.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      if (filterMode === 'weekend') {
        return show.dayOfWeek === 'FRI' || show.dayOfWeek === 'SAT' || show.dayOfWeek === 'SUN';
      }
      if (filterMode === 'all-ages') {
        return show.ageRestriction === 'All-Ages';
      }
      if (filterMode === 'selling-fast') {
        return show.status === 'low-tickets';
      }
      return true;
    });
  }, [searchQuery, filterMode]);

  return (
    <section id="shows" className="py-20 sm:py-28 bg-black text-white relative border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-6 border-b border-neutral-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-500 mb-2">
              <span className="w-1.5 h-1.5 bg-amber-500 inline-block" />
              <span>{t('shows_kicker')}</span>
            </div>
            <h2
              className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white"
              style={{ fontFamily: 'var(--font-display, "Barlow Condensed", sans-serif)' }}
            >
              {t('shows_title')}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {/* View Full Calendar Modal Button */}
            <button
              onClick={onOpenCalendar}
              className="px-5 py-3 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 hover:border-amber-500 text-neutral-200 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              style={{ fontFamily: 'var(--font-display, "Barlow Condensed", sans-serif)' }}
            >
              <Calendar className="w-4 h-4 text-amber-500" />
              <span>{t('shows_calendar_btn')}</span>
            </button>
          </div>
        </div>

        {/* Dedicated Artist Search Bar & Quick Filter Controls */}
        <div className="mb-8 border border-neutral-800 bg-neutral-950/80 p-4 sm:p-5 relative shadow-xl">
          {/* Subtle amber corner accent */}
          <div className="absolute top-0 left-0 w-8 h-1 bg-amber-500" />
          <div className="absolute top-0 left-0 w-1 h-8 bg-amber-500" />

          {/* Search Input Bar */}
          <div className="relative flex items-center">
            <Search className="w-5 h-5 text-amber-500 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder={t('shows_search_placeholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black border border-neutral-800 focus:border-amber-500 text-white placeholder-neutral-500 text-sm sm:text-base pl-12 pr-28 py-3.5 outline-none font-sans transition-all focus:ring-1 focus:ring-amber-500/50"
            />
            {searchQuery ? (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-neutral-900 hover:bg-neutral-800 text-xs font-mono text-neutral-300 hover:text-white border border-neutral-800 transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>{language === 'id' ? 'Hapus' : 'Clear'}</span>
                <span className="text-neutral-500 text-xs">✕</span>
              </button>
            ) : (
              <span className="hidden sm:inline-block absolute right-4 top-1/2 -translate-y-1/2 text-[11px] font-mono text-neutral-500 uppercase tracking-wider">
                {language === 'id' ? 'Filter Artis' : 'Filter by Artist'}
              </span>
            )}
          </div>

          {/* Quick Artist Chips & Secondary Filters */}
          <div className="mt-4 pt-3 border-t border-neutral-900 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs font-mono">
            {/* Quick Artist Suggestion Chips */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-neutral-400 mr-1 flex items-center gap-1">
                <span>{t('shows_quick_artists')}</span>
              </span>
              {['RAISA', 'BERNADYA', 'MAHALINI', 'TULUS', 'ROSSA', 'CHRISYE', 'IWAN FALS'].map((artistName) => {
                const isActive = searchQuery.toLowerCase().trim() === artistName.toLowerCase();
                return (
                  <button
                    key={artistName}
                    onClick={() => {
                      if (isActive) {
                        setSearchQuery('');
                      } else {
                        setSearchQuery(artistName);
                      }
                    }}
                    className={`px-2.5 py-1 text-[11px] uppercase font-mono tracking-wider transition-all cursor-pointer border ${
                      isActive
                        ? 'bg-amber-500 text-black border-amber-500 font-bold'
                        : 'bg-black text-neutral-400 hover:text-white border-neutral-800 hover:border-neutral-700'
                    }`}
                  >
                    {artistName}
                  </button>
                );
              })}
            </div>

            {/* Results Counter / Filter Mode Tag */}
            <div className="flex items-center gap-2 text-[11px] text-neutral-400 shrink-0">
              <span className="text-amber-400 font-bold">
                {filteredShows.length} {t('shows_found')}
              </span>
              {searchQuery && (
                <span className="text-neutral-500">
                  matching &ldquo;<span className="text-neutral-300 font-medium">{searchQuery}</span>&rdquo;
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Filter Segmented Controls */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <div className="flex items-center gap-1.5 text-xs text-neutral-400 mr-2">
            <SlidersHorizontal className="w-3.5 h-3.5 text-neutral-500" />
            <span>{t('shows_filter_label')}</span>
          </div>
          <button
            onClick={() => setFilterMode('all')}
            className={`px-3.5 py-1.5 text-xs uppercase font-bold tracking-wider transition-colors cursor-pointer ${
              filterMode === 'all'
                ? 'bg-amber-500 text-black'
                : 'bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-800'
            }`}
          >
            {t('shows_all')} ({UPCOMING_SHOWS.length})
          </button>
          <button
            onClick={() => setFilterMode('weekend')}
            className={`px-3.5 py-1.5 text-xs uppercase font-bold tracking-wider transition-colors cursor-pointer ${
              filterMode === 'weekend'
                ? 'bg-amber-500 text-black'
                : 'bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-800'
            }`}
          >
            {t('shows_weekend')}
          </button>
          <button
            onClick={() => setFilterMode('all-ages')}
            className={`px-3.5 py-1.5 text-xs uppercase font-bold tracking-wider transition-colors cursor-pointer ${
              filterMode === 'all-ages'
                ? 'bg-amber-500 text-black'
                : 'bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-800'
            }`}
          >
            {t('shows_all_ages')}
          </button>
          <button
            onClick={() => setFilterMode('selling-fast')}
            className={`px-3.5 py-1.5 text-xs uppercase font-bold tracking-wider transition-colors cursor-pointer ${
              filterMode === 'selling-fast'
                ? 'bg-amber-500 text-black'
                : 'bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-800'
            }`}
          >
            {t('shows_low_tickets')}
          </button>
        </div>

        {/* Desktop Table View (>= 768px) */}
        <div className="hidden md:block w-full overflow-hidden border border-neutral-800 bg-neutral-950/60">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-neutral-950 border-b border-neutral-800 text-xs font-mono uppercase tracking-wider text-neutral-400 select-none">
            <div className="col-span-2">DATE</div>
            <div className="col-span-4">ARTIST / GENRE</div>
            <div className="col-span-3">SUPPORT</div>
            <div className="col-span-2">DOORS / SHOW</div>
            <div className="col-span-1 text-right">TICKETS</div>
          </div>

          {/* Table Rows with Amber Horizontal Hover Reveal */}
          <div className="divide-y divide-neutral-900">
            {filteredShows.length === 0 ? (
              <div className="py-16 text-center text-neutral-400">
                <AlertCircle className="w-8 h-8 text-neutral-600 mx-auto mb-2" />
                <p className="text-base font-medium">No shows found matching your criteria.</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setFilterMode('all');
                  }}
                  className="mt-3 text-xs text-amber-500 hover:underline uppercase font-bold"
                >
                  Reset filters
                </button>
              </div>
            ) : (
              filteredShows.map((show, idx) => {
                const isSoldOut = show.status === 'sold-out';
                const isLow = show.status === 'low-tickets';

                return (
                  <div
                    key={show.id}
                    onClick={() => onSelectShow(show)}
                    className="group relative grid grid-cols-12 gap-4 px-6 py-5 items-center transition-all duration-200 hover:bg-neutral-900/90 cursor-pointer"
                  >
                    {/* Amber Horizontal Hover Reveal Indicator on left edge */}
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

                    {/* Column 1: Date in Tabular Mono */}
                    <div className="col-span-2 flex items-baseline gap-3">
                      <span className="font-mono text-xs uppercase tracking-wider text-amber-500 font-bold">
                        {show.dayOfWeek}
                      </span>
                      <span className="font-mono text-xl lg:text-2xl font-black text-white tabular-nums tracking-tight">
                        {show.date}
                      </span>
                    </div>

                    {/* Column 2: Artist & Genre (Show titles clean medium sans) */}
                    <div className="col-span-4">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg lg:text-xl font-bold tracking-tight text-white group-hover:text-amber-400 transition-colors">
                          {show.artist}
                        </h3>
                        {isLow && (
                          <span className="text-[11px] font-mono text-amber-400 tracking-wide">
                            [Low Tix]
                          </span>
                        )}
                        {isSoldOut && (
                          <span className="text-[11px] font-mono text-red-500 tracking-wide">
                            [Sold Out]
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-neutral-400 font-normal mt-0.5 flex items-center gap-2">
                        <span>{show.genre}</span>
                        <span className="text-neutral-700">·</span>
                        <span className="text-neutral-400">{show.ageRestriction}</span>
                      </div>
                    </div>

                    {/* Column 3: Support / Songs */}
                    <div className="col-span-3 text-sm text-neutral-300 truncate">
                      {show.song ? (
                        <span className="text-amber-400/90 font-mono text-xs font-medium">
                          🎵 {show.song}
                        </span>
                      ) : (
                        show.support || 'Special Guests'
                      )}
                    </div>

                    {/* Column 4: Doors / Show */}
                    <div className="col-span-2 text-xs font-mono text-neutral-300">
                      <div>
                        <span className="text-neutral-500">DOORS: </span>
                        <span>{show.doorsTime}</span>
                      </div>
                      <div className="mt-0.5">
                        <span className="text-neutral-500">SHOW: </span>
                        <span className="text-white font-semibold">{show.showTime}</span>
                      </div>
                    </div>

                    {/* Column 5: Tickets Action */}
                    <div className="col-span-1 text-right">
                      {isSoldOut ? (
                        <span className="inline-block px-3 py-1.5 text-xs font-mono text-neutral-500 border border-neutral-800 uppercase tracking-wider">
                          Sold Out
                        </span>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectShow(show);
                          }}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-neutral-900 group-hover:bg-amber-500 text-neutral-200 group-hover:text-black text-xs font-bold uppercase tracking-wider border border-neutral-700 group-hover:border-amber-500 transition-all duration-150 cursor-pointer shadow-sm"
                          style={{ fontFamily: 'var(--font-display, "Barlow Condensed", sans-serif)' }}
                        >
                          <span>{formatPrice(show.priceAdvance)}</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Mobile Vertical Show Listings (< 768px) */}
        <div className="md:hidden flex flex-col divide-y divide-neutral-800 border border-neutral-800 bg-neutral-950">
          {filteredShows.length === 0 ? (
            <div className="py-12 text-center text-neutral-400">
              <p className="text-sm">No shows found.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setFilterMode('all');
                }}
                className="mt-2 text-xs text-amber-500"
              >
                Reset filters
              </button>
            </div>
          ) : (
            filteredShows.map((show) => {
              const isSoldOut = show.status === 'sold-out';
              const isLow = show.status === 'low-tickets';

              return (
                <div
                  key={show.id}
                  onClick={() => onSelectShow(show)}
                  className="p-4 sm:p-5 relative active:bg-neutral-900 flex flex-col gap-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-2 font-mono">
                      <span className="text-amber-500 font-bold text-xs uppercase">{show.dayOfWeek}</span>
                      <span className="text-xl font-black text-white">{show.date}</span>
                      <span className="text-neutral-500 text-xs">·</span>
                      <span className="text-xs text-neutral-400">{show.doorsTime} DOORS</span>
                    </div>

                    {isSoldOut ? (
                      <span className="text-xs font-mono text-red-500 uppercase font-bold">SOLD OUT</span>
                    ) : isLow ? (
                      <span className="text-xs font-mono text-amber-400 uppercase font-bold">LOW TIX</span>
                    ) : (
                      <span className="text-xs font-mono text-neutral-400">{formatPrice(show.priceAdvance)} ADV</span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white tracking-tight">{show.artist}</h3>
                    <p className="text-sm text-neutral-400 mt-0.5">
                      {show.song ? (
                        <span className="text-amber-400 font-mono text-xs">🎵 {show.song}</span>
                      ) : (
                        show.support
                      )}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-neutral-400 mt-1">
                      <span>{show.genre}</span>
                      <span className="text-neutral-700">·</span>
                      <span>{show.ageRestriction}</span>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-xs text-neutral-400 font-mono">SHOW AT {show.showTime}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectShow(show);
                      }}
                      disabled={isSoldOut}
                      className={`px-4 py-2 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                        isSoldOut
                          ? 'bg-neutral-900 text-neutral-600 cursor-not-allowed'
                          : 'bg-amber-500 text-black hover:bg-amber-400 active:scale-95'
                      }`}
                      style={{ fontFamily: 'var(--font-display, "Barlow Condensed", sans-serif)' }}
                    >
                      <Ticket className="w-3.5 h-3.5" />
                      <span>{isSoldOut ? 'Sold Out' : `Get Tickets • ${formatPrice(show.priceAdvance)}`}</span>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Bottom CTA for full schedule */}
        <div className="mt-8 text-center">
          <button
            onClick={onOpenCalendar}
            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-amber-500 hover:text-amber-400 transition-colors cursor-pointer group py-2"
          >
            <span>Browse Full Fall / Winter Season (24+ Dates)</span>
            <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
