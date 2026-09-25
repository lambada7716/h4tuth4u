import React, { useState } from 'react';
import { ExternalLink, Check, Copy, Share2, Sparkles } from 'lucide-react';

interface SocialChannel {
  id: string;
  name: string;
  handle: string;
  followers: string;
  description: string;
  url: string;
  accentColor: string;
  hoverGlow: string;
  icon: (className?: string) => React.ReactNode;
}

export const SocialFooter: React.FC = () => {
  const [copiedHandle, setCopiedHandle] = useState<string | null>(null);

  const handleCopy = (handle: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard?.writeText(handle);
    setCopiedHandle(handle);
    setTimeout(() => {
      setCopiedHandle(null);
    }, 2000);
  };

  const socialChannels: SocialChannel[] = [
    {
      id: 'instagram',
      name: 'Instagram',
      handle: '@zmusicjakarta',
      followers: '42.8K',
      description: 'Nightly crowd shots, analog 35mm archive, and setlists.',
      url: 'https://instagram.com',
      accentColor: 'text-amber-400 group-hover:text-amber-300',
      hoverGlow: 'group-hover:border-amber-500/80 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.2)]',
      icon: (className = 'w-5 h-5') => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      )
    },
    {
      id: 'twitter',
      name: 'Twitter / X',
      handle: '@zmusic_syn',
      followers: '19.4K',
      description: 'Day-of-show set times, secret guest drops, and low-ticket alerts.',
      url: 'https://twitter.com',
      accentColor: 'text-teal-400 group-hover:text-teal-300',
      hoverGlow: 'group-hover:border-teal-500/80 group-hover:shadow-[0_0_20px_rgba(20,184,166,0.2)]',
      icon: (className = 'w-5 h-5') => (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      )
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      handle: '@zmusiclive',
      followers: '31.2K',
      description: 'Sweaty encore pits, soundcheck clips, and behind-the-bar recipes.',
      url: 'https://tiktok.com',
      accentColor: 'text-red-400 group-hover:text-red-300',
      hoverGlow: 'group-hover:border-red-500/80 group-hover:shadow-[0_0_20px_rgba(220,38,38,0.2)]',
      icon: (className = 'w-5 h-5') => (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.86.12V9.32a6.34 6.34 0 0 0-6.62 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V9.82a8.27 8.27 0 0 0 5.19 1.83V8.2a4.84 4.84 0 0 1-2-1.51z" />
        </svg>
      )
    }
  ];

  return (
    <div className="py-10 border-b border-neutral-900 bg-black/60">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-500 mb-1.5 font-bold">
            <Share2 className="w-3.5 h-3.5" />
            <span>COMMUNITY &amp; LIVE BROADCASTS</span>
          </div>
          <h3
            className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white"
            style={{ fontFamily: 'var(--font-display, "Barlow Condensed", sans-serif)' }}
          >
            CONNECT WITH Z MUSIC
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-xl">
            Tag <strong className="text-white">#ZMusicJakarta</strong> or <strong className="text-amber-400">@zmusicjakarta</strong> in your concert photos &amp; reels. Fan captures are projected on the main hall screens before headliners take the stage.
          </p>
        </div>

        {/* Community Tag Callout */}
        <div className="bg-neutral-950 border border-neutral-800 p-3.5 flex items-center gap-3 shrink-0">
          <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
          <div className="text-xs font-mono">
            <span className="text-neutral-400 block">OFFICIAL COMMUNITY HASHTAG:</span>
            <span className="text-white font-bold tracking-wider">#ZMUSICJAKARTA</span>
          </div>
        </div>
      </div>

      {/* 3 Social Media Platform Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {socialChannels.map((channel) => (
          <a
            key={channel.id}
            href={channel.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`group bg-neutral-950 border border-neutral-800/90 p-5 transition-all duration-200 ${channel.hoverGlow} flex flex-col justify-between block relative`}
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 bg-neutral-900 border border-neutral-800 text-white group-hover:scale-105 transition-transform duration-200`}>
                    {channel.icon('w-5 h-5')}
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white uppercase tracking-wider group-hover:text-amber-400 transition-colors" style={{ fontFamily: 'var(--font-display, "Barlow Condensed", sans-serif)' }}>
                      {channel.name}
                    </h4>
                    <span className="text-xs font-mono text-neutral-400 block -mt-0.5">
                      {channel.handle}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-mono text-neutral-500 block">AUDIENCE</span>
                  <span className={`text-sm font-mono font-bold tabular-nums ${channel.accentColor}`}>
                    {channel.followers}
                  </span>
                </div>
              </div>

              <p className="text-xs text-neutral-400 mt-3 leading-relaxed">
                {channel.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-neutral-900/80 flex items-center justify-between text-xs font-mono text-neutral-400">
              <button
                type="button"
                onClick={(e) => handleCopy(channel.handle, e)}
                className="hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer text-[11px]"
                title="Copy Handle"
              >
                {copiedHandle === channel.handle ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-bold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 text-neutral-500" />
                    <span>Copy Handle</span>
                  </>
                )}
              </button>

              <span className="flex items-center gap-1 text-[11px] text-amber-500 group-hover:translate-x-0.5 transition-transform">
                <span>Follow</span>
                <ExternalLink className="w-3 h-3" />
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
