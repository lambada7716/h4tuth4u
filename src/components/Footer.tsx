import React from 'react';
import { MapPin, Phone, Mail, Clock, ShieldCheck, HeartHandshake, Disc } from 'lucide-react';
import { SocialFooter } from './SocialFooter';

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
  onOpenPolicies?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateSection, onOpenPolicies }) => {
  return (
    <footer className="bg-black text-neutral-400 border-t border-neutral-900 pt-16 pb-24 md:pb-16 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-neutral-900">
          {/* Brand & Ethos */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-amber-500 flex items-center justify-center font-black text-black text-xl tracking-tighter">
                Z
              </div>
              <span
                className="text-3xl font-black uppercase tracking-tight text-white"
                style={{ fontFamily: 'var(--font-display, "Barlow Condensed", sans-serif)' }}
              >
                Z MUSIC
              </span>
            </div>

            <p className="text-sm text-neutral-400 leading-relaxed max-w-sm">
              An independent 500-capacity live music venue and cultural space in Jakarta, SYN. Dedicated to authentic performance, crystal acoustics, and uncompromised artist hospitality since 2014.
            </p>

            <div className="mt-6 flex items-center gap-4 text-xs font-mono text-neutral-500">
              <span className="text-amber-400 font-bold">500 CAPACITY</span>
              <span>·</span>
              <span>NO BARRICADES</span>
              <span>·</span>
              <span>ALL-AGES SHOWS</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4
              className="text-lg font-bold uppercase tracking-wider text-white mb-4"
              style={{ fontFamily: 'var(--font-display, "Barlow Condensed", sans-serif)' }}
            >
              EXPLORE
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => onNavigateSection('shows')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Upcoming Shows
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('artists')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Resident Artists
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('venue')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Venue Specifications
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('bar')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Z MUSIC Pours (Bar)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('private-events')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Private Buyouts
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('faq')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left flex items-center gap-1.5"
                >
                  <span>Attendee FAQ</span>
                  <span className="text-[10px] font-mono px-1 bg-amber-500/20 text-amber-400 border border-amber-500/30">INFO</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Location & Box Office Hours */}
          <div className="lg:col-span-3">
            <h4
              className="text-lg font-bold uppercase tracking-wider text-white mb-4"
              style={{ fontFamily: 'var(--font-display, "Barlow Condensed", sans-serif)' }}
            >
              LOCATION &amp; HOURS
            </h4>
            <div className="space-y-3 text-xs sm:text-sm font-mono text-neutral-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>418 Soundwave Ave<br />Jakarta, SYN 37203</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-white">Show Nights: Doors 6:30 PM</span>
                  <span className="text-neutral-500">Box Office: Tue–Sat 12 PM – 6 PM</span>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-neutral-500 shrink-0" />
                <span>(615) 555-0194</span>
              </div>
            </div>
          </div>

          {/* Venue Policies */}
          <div className="lg:col-span-3">
            <h4
              className="text-lg font-bold uppercase tracking-wider text-white mb-4"
              style={{ fontFamily: 'var(--font-display, "Barlow Condensed", sans-serif)' }}
            >
              VENUE POLICIES
            </h4>
            <div className="space-y-2 text-xs text-neutral-400">
              <p>
                <strong className="text-neutral-200">Bag Policy:</strong> Small clutches and clear bags up to 12"x12" permitted. Coat check available.
              </p>
              <p>
                <strong className="text-neutral-200">Ear Protection:</strong> Complimentary high-fidelity earplugs provided free at all bars and box office.
              </p>
              <p>
                <strong className="text-neutral-200">Accessibility:</strong> Fully ADA compliant. Ground-floor elevator access to VIP Balcony.
              </p>

              {onOpenPolicies && (
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={onOpenPolicies}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-amber-500/50 hover:border-amber-400 text-amber-400 text-xs font-mono font-bold transition-colors cursor-pointer"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Review Age &amp; Entry Policies</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Social Media Footer Section for Community Engagement */}
        <SocialFooter />

        {/* Bottom Bar: Copyright & Independent Manifesto */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
          <div>
            &copy; 2014–{new Date().getFullYear()} Z MUSIC VENUE LLC. ALL RIGHTS RESERVED.
          </div>

          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={onOpenPolicies}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              Age &amp; Venue Rules
            </button>
            <span>·</span>
            <span className="hover:text-neutral-300 transition-colors cursor-pointer">Privacy &amp; Terms</span>
            <span>·</span>
            <span className="hover:text-amber-400 transition-colors cursor-pointer">Artist Booking</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
