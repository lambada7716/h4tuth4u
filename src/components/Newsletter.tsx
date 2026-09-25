import React, { useState } from 'react';
import { Mail, Check, ArrowRight, Bell } from 'lucide-react';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [genrePreference, setGenrePreference] = useState('all');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubscribed(true);
  };

  return (
    <section className="py-16 sm:py-24 bg-neutral-950 border-b border-neutral-900 relative overflow-hidden">
      <div className="absolute -top-24 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-500 mb-3">
          <Bell className="w-3.5 h-3.5" />
          <span>EARLY TICKET PRESALES · SECRET SETS · ZERO SPAM</span>
        </div>

        <h2
          className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white"
          style={{ fontFamily: 'var(--font-display, "Barlow Condensed", sans-serif)' }}
        >
          GET ON THE GUESTLIST
        </h2>

        <p className="mt-3 text-sm sm:text-base text-neutral-400 max-w-xl mx-auto">
          Never miss a sold-out show. Receive weekly booking drops 24 hours before public on-sale, plus invites to private soundchecks and after-hours vinyl sessions.
        </p>

        {isSubscribed ? (
          <div className="mt-8 p-6 bg-neutral-900/90 border border-emerald-500/60 max-w-md mx-auto flex items-center justify-center gap-3">
            <Check className="w-5 h-5 text-emerald-400 stroke-[3]" />
            <div className="text-left">
              <span className="text-sm font-bold text-white block">You're on the list!</span>
              <span className="text-xs text-neutral-400">Check your inbox for this week's presale password.</span>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="mt-8 max-w-md mx-auto space-y-3">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Mail className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black border border-neutral-800 text-white placeholder-neutral-500 text-sm pl-10 pr-4 py-3.5 outline-none focus:border-amber-500"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-black font-extrabold uppercase tracking-wider text-sm transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 shrink-0 active:scale-95 glow-amber-pulse"
                style={{ fontFamily: 'var(--font-display, "Barlow Condensed", sans-serif)', fontSize: '16px' }}
              >
                <span>Join List</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>

            <div className="flex items-center justify-center gap-3 text-xs text-neutral-500 pt-2 font-mono">
              <span>Preferences:</span>
              <button
                type="button"
                onClick={() => setGenrePreference('all')}
                className={`cursor-pointer ${genrePreference === 'all' ? 'text-amber-400 underline font-bold' : 'hover:text-white'}`}
              >
                All Genres
              </button>
              <span>·</span>
              <button
                type="button"
                onClick={() => setGenrePreference('rock')}
                className={`cursor-pointer ${genrePreference === 'rock' ? 'text-amber-400 underline font-bold' : 'hover:text-white'}`}
              >
                Indie / Punk
              </button>
              <span>·</span>
              <button
                type="button"
                onClick={() => setGenrePreference('electronic')}
                className={`cursor-pointer ${genrePreference === 'electronic' ? 'text-amber-400 underline font-bold' : 'hover:text-white'}`}
              >
                Electronic / Synth
              </button>
            </div>
          </form>
        )}
        {/* Multi-Platform Social Media Engagement */}
        <div className="mt-10 pt-8 border-t border-neutral-900/80">
          <p className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-3.5">
            Follow us on socials
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 hover:border-amber-500/60 text-neutral-300 hover:text-white text-xs font-mono transition-all group"
            >
              <svg className="w-4 h-4 text-amber-500 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
              <span>Instagram</span>
              <span className="text-neutral-500 text-[11px]">@zmusicjakarta</span>
            </a>

            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 hover:border-teal-500/60 text-neutral-300 hover:text-white text-xs font-mono transition-all group"
            >
              <svg className="w-4 h-4 text-teal-400 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span>Twitter / X</span>
              <span className="text-neutral-500 text-[11px]">@zmusic_syn</span>
            </a>

            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 hover:border-red-500/60 text-neutral-300 hover:text-white text-xs font-mono transition-all group"
            >
              <svg className="w-4 h-4 text-red-500 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.86.12V9.32a6.34 6.34 0 0 0-6.62 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V9.82a8.27 8.27 0 0 0 5.19 1.83V8.2a4.84 4.84 0 0 1-2-1.51z" />
              </svg>
              <span>TikTok</span>
              <span className="text-neutral-500 text-[11px]">@zmusiclive</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
