import React, { useState } from 'react';
import { X, Calendar as CalendarIcon, ChevronLeft, ChevronRight, Ticket, Filter } from 'lucide-react';
import { UPCOMING_SHOWS } from '../data/venueData';
import { Show } from '../types/venue';
import { useCurrency } from '../context/CurrencyContext';

interface FullCalendarModalProps {
  onClose: () => void;
  onSelectShow: (show: Show) => void;
}

export const FullCalendarModal: React.FC<FullCalendarModalProps> = ({ onClose, onSelectShow }) => {
  const { formatPrice } = useCurrency();
  const [selectedMonth, setSelectedMonth] = useState<'OCTOBER' | 'NOVEMBER'>('OCTOBER');

  const novemberShows: Show[] = [
    {
      id: 'nov-1',
      date: 'NOV 05',
      dayOfWeek: 'THU',
      fullDate: 'Thursday, November 5, 2026',
      artist: 'TYPHOON SOUND SYSTEM',
      support: 'Sub-Bass Collective',
      genre: 'Dub / Bass / Electronic',
      doorsTime: '7:30 PM',
      showTime: '8:30 PM',
      priceAdvance: 22,
      priceDoor: 26,
      vipPrice: 45,
      ageRestriction: '18+',
      status: 'available',
      description: 'Heavy sub-frequency sound system takeover pushing our 4x d&b B22 subwoofers to their limits.',
      imageTheme: 'teal-amber'
    },
    {
      id: 'nov-2',
      date: 'NOV 12',
      dayOfWeek: 'THU',
      fullDate: 'Thursday, November 12, 2026',
      artist: 'GRAVE DIGGER HYMNS',
      support: 'Ashen Pines',
      genre: 'Gothic Americana / Doom Folk',
      doorsTime: '7:00 PM',
      showTime: '8:00 PM',
      priceAdvance: 20,
      priceDoor: 24,
      vipPrice: 42,
      ageRestriction: 'All-Ages',
      status: 'available',
      description: 'Dark acoustic hymns and mourning strings in an intimate acoustic configuration.',
      imageTheme: 'amber-monochrome'
    },
    {
      id: 'nov-3',
      date: 'NOV 19',
      dayOfWeek: 'THU',
      fullDate: 'Thursday, November 19, 2026',
      artist: 'SLEEPWALKER GUILD',
      support: 'Chrome Reverie',
      genre: 'Dream Pop / Nu-Gaze',
      doorsTime: '7:30 PM',
      showTime: '8:30 PM',
      priceAdvance: 24,
      priceDoor: 28,
      vipPrice: 50,
      ageRestriction: 'All-Ages',
      status: 'low-tickets',
      description: 'Ethereal vocals with cascading shimmer delays and analog tape loop projections.',
      imageTheme: 'teal-amber'
    },
    {
      id: 'nov-4',
      date: 'NOV 27',
      dayOfWeek: 'FRI',
      fullDate: 'Friday, November 27, 2026',
      artist: 'POST-THANKSGIVING PUNK BASH',
      support: '5 Local Jakarta Bands',
      genre: 'Hardcore / Punk',
      doorsTime: '6:00 PM',
      showTime: '7:00 PM',
      priceAdvance: 15,
      priceDoor: 20,
      vipPrice: 35,
      ageRestriction: 'All-Ages',
      status: 'available',
      description: 'Annual local community showcase honoring emerging local bands. 100% of door proceeds to musicians.',
      imageTheme: 'red-amber'
    }
  ];

  const currentShows = selectedMonth === 'OCTOBER' ? UPCOMING_SHOWS : novemberShows;

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div
        className="relative max-w-4xl w-full bg-neutral-950 border border-neutral-800 p-6 sm:p-8 my-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-5 border-b border-neutral-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-amber-500">
              <CalendarIcon className="w-3.5 h-3.5" />
              <span>FULL SEASON CONCERT CALENDAR</span>
            </div>
            <h3
              className="text-3xl sm:text-4xl font-black uppercase text-white tracking-tight mt-1"
              style={{ fontFamily: 'var(--font-display, "Barlow Condensed", sans-serif)' }}
            >
              2026 SHOW SCHEDULE
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white bg-neutral-900 border border-neutral-800 cursor-pointer"
            aria-label="Close Calendar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Month Selector Tabs */}
        <div className="flex items-center gap-3 my-6">
          <button
            onClick={() => setSelectedMonth('OCTOBER')}
            className={`px-5 py-2 text-xs font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer ${
              selectedMonth === 'OCTOBER'
                ? 'bg-amber-500 text-black'
                : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
            }`}
          >
            October 2026 ({UPCOMING_SHOWS.length} Shows)
          </button>
          <button
            onClick={() => setSelectedMonth('NOVEMBER')}
            className={`px-5 py-2 text-xs font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer ${
              selectedMonth === 'NOVEMBER'
                ? 'bg-amber-500 text-black'
                : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
            }`}
          >
            November 2026 ({novemberShows.length} Shows)
          </button>
        </div>

        {/* Show listings */}
        <div className="divide-y divide-neutral-800 max-h-[60vh] overflow-y-auto pr-1">
          {currentShows.map((show) => (
            <div
              key={show.id}
              className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-neutral-900/50 px-3 transition-colors"
            >
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-xs uppercase text-amber-500 font-bold w-8">
                  {show.dayOfWeek}
                </span>
                <span className="font-mono text-xl font-black text-white w-20">
                  {show.date}
                </span>
                <div>
                  <h4 className="text-lg font-bold text-white tracking-tight">{show.artist}</h4>
                  <div className="text-xs text-neutral-400">
                    <span>{show.song ? `🎵 ${show.song}` : show.support}</span>
                    <span className="mx-2 text-neutral-600">·</span>
                    <span className="text-neutral-400">{show.genre}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 sm:shrink-0 justify-between sm:justify-end">
                <span className="text-xs font-mono text-neutral-400">
                  DOORS {show.doorsTime}
                </span>
                {show.status === 'sold-out' ? (
                  <span className="text-xs font-mono text-neutral-500 uppercase px-3 py-1.5 border border-neutral-800">
                    Sold Out
                  </span>
                ) : (
                  <button
                    onClick={() => {
                      onClose();
                      onSelectShow(show);
                    }}
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black font-bold uppercase tracking-wider text-xs transition-colors flex items-center gap-1.5"
                    style={{ fontFamily: 'var(--font-display, "Barlow Condensed", sans-serif)' }}
                  >
                    <Ticket className="w-3.5 h-3.5" />
                    <span>Get Tickets • {formatPrice(show.priceAdvance)}</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-neutral-800 flex items-center justify-between text-xs font-mono text-neutral-400">
          <span>Tickets also available in-person at box office 2 hours before show</span>
          <button onClick={onClose} className="text-white hover:text-amber-400 underline">
            Close Calendar
          </button>
        </div>
      </div>
    </div>
  );
};
