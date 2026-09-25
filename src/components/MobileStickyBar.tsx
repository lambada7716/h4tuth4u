import React from 'react';
import { Ticket, Calendar } from 'lucide-react';

interface MobileStickyBarProps {
  onOpenTickets: () => void;
  onSeeAllShows: () => void;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({ onOpenTickets, onSeeAllShows }) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-black/95 border-t border-neutral-800 px-4 py-3 flex items-center justify-between gap-3 shadow-2xl backdrop-blur-md">
      <div className="flex flex-col">
        <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
          LIVE AT Z MUSIC
        </span>
        <span className="text-xs font-bold text-white uppercase" style={{ fontFamily: 'var(--font-display, "Barlow Condensed", sans-serif)', fontSize: '15px' }}>
          OCT 03: ECHOES OF OBLIVION
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onSeeAllShows}
          className="p-2.5 bg-neutral-900 border border-neutral-700 text-neutral-300 hover:text-white"
          aria-label="See Calendar"
        >
          <Calendar className="w-4 h-4" />
        </button>

        <button
          onClick={onOpenTickets}
          className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 active:scale-95 text-black font-extrabold uppercase tracking-wider text-xs flex items-center gap-1.5 glow-amber-pulse"
          style={{ fontFamily: 'var(--font-display, "Barlow Condensed", sans-serif)', fontSize: '15px' }}
        >
          <Ticket className="w-4 h-4 stroke-[2.5]" />
          <span>Buy Tickets</span>
        </button>
      </div>
    </div>
  );
};
