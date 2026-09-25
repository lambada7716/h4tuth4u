import React from 'react';
import { ArrowDown, Flame, Calendar, Sparkles } from 'lucide-react';
import { TICKER_ITEMS } from '../data/venueData';
import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  onSeeAllShows: () => void;
  onOpenTickets: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onSeeAllShows, onOpenTickets }) => {
  const { language, t } = useLanguage();
  return (
    <section id="hero" className="relative min-h-screen w-full bg-black flex flex-col justify-between overflow-hidden pt-20 sm:pt-24">
      {/* Background Concert Crowd & Stage Environment with 12s scale loop */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Subtle scale zoom 12s loop */}
        <div
          className="absolute inset-0 w-full h-full transition-transform"
          style={{
            animation: 'heroCrowdZoom 12s ease-in-out infinite alternate',
          }}
        >
          {/* Rich SVG Stage & Crowd Scene with Backlights, Beams, and Silhouettes */}
          <svg
            className="w-full h-full object-cover"
            viewBox="0 0 1920 1080"
            preserveAspectRatio="xMidYMid slice"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Backlight Stage Flares */}
              <radialGradient id="centerAmberBloom" cx="50%" cy="38%" r="45%">
                <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.85" />
                <stop offset="25%" stopColor="#D97706" stopOpacity="0.45" />
                <stop offset="55%" stopColor="#B45309" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#000000" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="leftTealBeam" cx="30%" cy="30%" r="35%">
                <stop offset="0%" stopColor="#14B8A6" stopOpacity="0.5" />
                <stop offset="40%" stopColor="#0F766E" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#000000" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="rightRedBeam" cx="70%" cy="32%" r="35%">
                <stop offset="0%" stopColor="#DC2626" stopOpacity="0.55" />
                <stop offset="45%" stopColor="#991B1B" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#000000" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="scrimGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#000000" stopOpacity="0.85" />
                <stop offset="35%" stopColor="#000000" stopOpacity="0.45" />
                <stop offset="70%" stopColor="#000000" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#000000" stopOpacity="1" />
              </linearGradient>
            </defs>

            {/* Base Dark Atmosphere */}
            <rect width="1920" height="1080" fill="#040404" />

            {/* Ambient Lighting Cones */}
            <circle cx="960" cy="420" r="620" fill="url(#centerAmberBloom)" />
            <circle cx="520" cy="360" r="500" fill="url(#leftTealBeam)" />
            <circle cx="1400" cy="380" r="500" fill="url(#rightRedBeam)" />

            {/* High-powered stage spot beams slicing through haze */}
            <polygon points="960,180 300,1080 380,1080" fill="#F59E0B" opacity="0.12" />
            <polygon points="960,180 1620,1080 1540,1080" fill="#F59E0B" opacity="0.12" />
            <polygon points="720,160 100,1080 220,1080" fill="#14B8A6" opacity="0.09" />
            <polygon points="1200,160 1820,1080 1700,1080" fill="#DC2626" opacity="0.1" />
            <polygon points="960,170 780,1080 880,1080" fill="#FFFFFF" opacity="0.18" />
            <polygon points="960,170 1140,1080 1040,1080" fill="#FFFFFF" opacity="0.18" />

            {/* Stage Truss & Rigging Silhouette */}
            <rect x="0" y="140" width="1920" height="16" fill="#171717" />
            <rect x="0" y="170" width="1920" height="8" fill="#0A0A0A" />
            {/* Par can lights */}
            {[260, 480, 700, 920, 1000, 1220, 1440, 1660].map((x, i) => (
              <g key={i}>
                <rect x={x} y="156" width="30" height="24" fill="#262626" />
                <circle cx={x + 15} cy="180" r="10" fill={i % 2 === 0 ? "#F59E0B" : "#14B8A6"} opacity="0.9" />
              </g>
            ))}

            {/* Stage Floor and Performer Silhouette */}
            <rect x="400" y="600" width="1120" height="25" fill="#0d0d0d" />
            {/* Drum riser & Drum Kit silhouette */}
            <rect x="860" y="560" width="200" height="40" fill="#080808" />
            <circle cx="910" cy="510" r="30" fill="#000" />
            <circle cx="1010" cy="510" r="30" fill="#000" />
            <circle cx="960" cy="540" r="38" fill="#000" />
            {/* Lead Singer / Guitarist Silhouette */}
            <path
              d="M740,600 C740,550 750,510 765,490 C755,475 758,450 775,445 C790,445 795,465 790,485 C805,510 815,550 820,600 Z"
              fill="#000"
            />
            {/* Guitar neck silhouette */}
            <line x1="720" y1="520" x2="840" y2="570" stroke="#000" strokeWidth="9" />

            {/* Dense crowd hands raised and heads in silhouette (foreground & midground) */}
            <path
              d="M0,1080 L0,790 
                 C50,780 80,820 120,770 
                 C150,750 180,780 220,740 
                 C240,710 260,670 280,730 
                 C310,750 330,720 370,710 
                 C410,690 440,730 470,700 
                 C500,680 520,640 550,710 
                 C590,730 630,700 660,670 
                 C680,630 710,660 740,710 
                 C770,720 800,680 840,690 
                 C880,650 920,620 950,680 
                 C980,660 1020,630 1060,690 
                 C1100,720 1130,680 1170,690 
                 C1210,660 1240,640 1280,700 
                 C1320,720 1350,670 1390,700 
                 C1430,730 1470,680 1510,710 
                 C1540,660 1580,700 1620,730 
                 C1660,710 1700,740 1740,720 
                 C1780,690 1820,740 1860,730 
                 C1900,750 1920,770 1920,1080 Z"
              fill="#050505"
            />

            {/* Cheering hands and smartphones capturing the show */}
            <g fill="#020202">
              <path d="M280,730 Q270,650 285,630 Q295,650 290,730 Z" />
              <path d="M520,680 Q510,610 525,595 Q535,615 530,680 Z" />
              <path d="M960,680 Q945,590 965,580 Q975,600 970,680 Z" />
              <path d="M1240,700 Q1230,620 1245,600 Q1260,620 1250,700 Z" />
              <path d="M1520,710 Q1505,630 1525,615 Q1535,635 1530,710 Z" />
              {/* Phone screen glow */}
              <rect x="520" y="600" width="18" height="28" rx="2" fill="#14B8A6" opacity="0.75" />
              <rect x="1240" y="610" width="16" height="26" rx="2" fill="#F59E0B" opacity="0.8" />
              <rect x="960" y="585" width="18" height="30" rx="2" fill="#FFFFFF" opacity="0.9" />
            </g>

            {/* Pure Scrim Overlay for WCAG AA readability */}
            <rect width="1920" height="1080" fill="url(#scrimGradient)" />
          </svg>
        </div>

        {/* Ambient colored lighting gradient blurs */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-amber-500/15 rounded-full blur-[140px]" />
        <div className="absolute top-1/4 -left-32 w-[450px] h-[450px] bg-teal-500/10 rounded-full blur-[130px]" />
        <div className="absolute top-1/3 -right-32 w-[450px] h-[450px] bg-red-600/15 rounded-full blur-[130px]" />
      </div>

      <style>{`
        @keyframes heroCrowdZoom {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(1.07);
          }
        }
      `}</style>

      {/* Main Centered Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center my-auto flex flex-col items-center">
        {/* Unboxed editorial kicker */}
        <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold tracking-widest uppercase text-amber-400 mb-4 sm:mb-6">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping inline-block" />
          <span>{t('hero_kicker')}</span>
          <span aria-hidden="true" className="text-neutral-600">·</span>
          <span>{t('hero_capacity')}</span>
          <span aria-hidden="true" className="text-neutral-600">·</span>
          <span>JAKARTA, ID</span>
        </div>

        {/* Massive Condensed Headline */}
        <h1
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight text-white max-w-5xl leading-[0.88] select-none drop-shadow-[0_10px_35px_rgba(0,0,0,0.9)]"
          style={{
            fontFamily: 'var(--font-display, "Barlow Condensed", sans-serif)',
          }}
        >
          {t('hero_title_1')} <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500">
            {t('hero_title_2')}
          </span>
        </h1>

        {/* Concrete Value Subline */}
        <p className="mt-6 sm:mt-8 text-lg sm:text-xl md:text-2xl text-neutral-300 max-w-2xl font-normal leading-relaxed">
          {t('hero_subtitle')}
        </p>

        {/* Primary CTA Button with Amber Pulse */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={onSeeAllShows}
            className="w-full sm:w-auto px-8 py-4 bg-amber-500 text-black font-extrabold uppercase tracking-wider text-base sm:text-lg rounded-none transition-all duration-200 hover:bg-amber-400 glow-amber-pulse cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3"
            style={{ fontFamily: 'var(--font-display, "Barlow Condensed", sans-serif)' }}
          >
            <Calendar className="w-5 h-5 text-black stroke-[2.5]" />
            <span>{t('hero_cta_tickets')}</span>
          </button>

          <button
            onClick={onOpenTickets}
            className="w-full sm:w-auto px-7 py-4 bg-neutral-900/90 hover:bg-neutral-800 text-white font-bold uppercase tracking-wider text-base border border-neutral-700/80 rounded-none transition-all duration-200 hover:border-amber-500/50 cursor-pointer flex items-center justify-center gap-2.5"
            style={{ fontFamily: 'var(--font-display, "Barlow Condensed", sans-serif)' }}
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>{t('nav_tickets')}</span>
          </button>
        </div>

        {/* Quick Venue Proof Indicators */}
        <div className="mt-10 sm:mt-14 flex items-center gap-6 sm:gap-10 text-xs sm:text-sm text-neutral-400 font-mono">
          <div>
            <span className="text-white font-bold block text-sm sm:text-base">TONIGHT</span>
            <span className="text-amber-500">DOORS 7:00 PM</span>
          </div>
          <div className="h-6 w-px bg-neutral-800" />
          <div>
            <span className="text-white font-bold block text-sm sm:text-base">ACOUSTICS</span>
            <span className="text-teal-400">d&amp;b AUDIOTECHNIK</span>
          </div>
          <div className="h-6 w-px bg-neutral-800" />
          <div>
            <span className="text-white font-bold block text-sm sm:text-base">BARS</span>
            <span className="text-neutral-300">16 CRAFT DRAFTS</span>
          </div>
        </div>
      </div>

      {/* Bottom-Edge Scrolling Ticker */}
      <div className="relative z-20 w-full bg-neutral-950 border-t border-b border-neutral-900 py-3 overflow-hidden select-none">
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

        <div className="animate-ticker flex items-center gap-8 text-xs sm:text-sm font-bold tracking-wider uppercase text-neutral-300">
          {/* Ticker items looped twice for seamless infinite marquee */}
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, idx) => (
            <div key={idx} className="flex items-center gap-8 shrink-0">
              <span className={`hover:text-amber-400 transition-colors ${item.includes('SOLD OUT') ? 'text-red-500' : item.includes('LOW') ? 'text-amber-400' : 'text-neutral-200'}`}>
                {item}
              </span>
              <span className="text-amber-500 text-xs" aria-hidden="true">★</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
