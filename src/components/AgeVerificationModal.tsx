import React, { useState, useEffect } from 'react';
import { ShieldCheck, AlertTriangle, Beer, Music, Volume2, Check, X, Info, ExternalLink } from 'lucide-react';

interface AgeVerificationModalProps {
  forceOpen?: boolean;
  onClose?: () => void;
}

const STORAGE_KEY = 'zmusic_age_verified';
const STORAGE_AGE_CATEGORY = 'zmusic_visitor_tier';

export const AgeVerificationModal: React.FC<AgeVerificationModalProps> = ({
  forceOpen = false,
  onClose
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [agreedToConduct, setAgreedToConduct] = useState(true);
  const [activeTab, setActiveTab] = useState<'verify' | 'policies'>('verify');
  const [verificationFeedback, setVerificationFeedback] = useState<string | null>(null);

  useEffect(() => {
    if (forceOpen) {
      setIsOpen(true);
      return;
    }

    try {
      const verified = localStorage.getItem(STORAGE_KEY);
      if (!verified) {
        // Delay slightly for smooth entrance after page loads
        const timer = setTimeout(() => {
          setIsOpen(true);
        }, 700);
        return () => clearTimeout(timer);
      }
    } catch {
      // If local storage is disabled, show modal
      setIsOpen(true);
    }
  }, [forceOpen]);

  const handleVerify = (tier: '21+' | '18+' | 'all-ages') => {
    try {
      localStorage.setItem(STORAGE_KEY, 'true');
      localStorage.setItem(STORAGE_AGE_CATEGORY, tier);
    } catch {
      // ignore localstorage error in restricted environments
    }

    setVerificationFeedback(
      tier === '21+'
        ? 'Verified 21+ · Full Bar & All Shows Access Granted'
        : tier === '18+'
        ? 'Verified 18+ · Floor Pit & 18+ Shows Access Granted'
        : 'Acknowledged · All-Ages Access & Youth Safety Guidelines Active'
    );

    setTimeout(() => {
      setIsOpen(false);
      setVerificationFeedback(null);
      if (onClose) onClose();
    }, 900);
  };

  const handleDismiss = () => {
    try {
      localStorage.setItem(STORAGE_KEY, 'true');
    } catch {
      // ignore
    }
    setIsOpen(false);
    if (onClose) onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      {/* Floating Card Container */}
      <div 
        className="w-full max-w-lg bg-neutral-950 border border-amber-500/40 shadow-[0_0_50px_rgba(245,158,11,0.15)] relative overflow-hidden flex flex-col max-h-[92vh]"
        style={{ animation: 'scaleUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)' }}
      >
        {/* Amber Accent Top Bar with Industrial Warning Stripe */}
        <div className="h-1.5 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600" />

        {/* Header */}
        <div className="p-5 sm:p-6 pb-4 border-b border-neutral-900 bg-black/50 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <ShieldCheck className="w-6 h-6 stroke-[2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-amber-500">
                  ADMISSION &amp; VENUE POLICY
                </span>
                <span className="px-1.5 py-0.5 text-[9px] font-mono bg-neutral-800 text-neutral-400 uppercase">
                  JAKARTA, SYN
                </span>
              </div>
              <h2
                className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight leading-none mt-1"
                style={{ fontFamily: 'var(--font-display, "Barlow Condensed", sans-serif)' }}
              >
                AGE VERIFICATION &amp; ENTRY RULES
              </h2>
            </div>
          </div>

          {/* Dismiss button if user just reviewing */}
          <button
            onClick={handleDismiss}
            className="text-neutral-500 hover:text-white transition-colors p-1"
            title="Dismiss"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-neutral-900 bg-neutral-900/40 text-xs font-mono">
          <button
            type="button"
            onClick={() => setActiveTab('verify')}
            className={`flex-1 py-2.5 px-4 text-center font-bold tracking-wider transition-colors uppercase ${
              activeTab === 'verify'
                ? 'bg-neutral-950 text-amber-400 border-b-2 border-amber-500'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Age Confirmation
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('policies')}
            className={`flex-1 py-2.5 px-4 text-center font-bold tracking-wider transition-colors uppercase ${
              activeTab === 'policies'
                ? 'bg-neutral-950 text-amber-400 border-b-2 border-amber-500'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            House Rules &amp; Safety
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
          {verificationFeedback ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 flex items-center justify-center animate-bounce">
                <Check className="w-6 h-6 stroke-[3]" />
              </div>
              <h3 className="text-lg font-bold text-white font-mono">
                {verificationFeedback}
              </h3>
              <p className="text-xs text-neutral-400 font-mono">
                Welcome to Z MUSIC. Loading experience...
              </p>
            </div>
          ) : activeTab === 'verify' ? (
            <>
              <p className="text-sm text-neutral-300 leading-relaxed">
                Z MUSIC is an independent 500-capacity live music venue hosting <strong className="text-white">All-Ages, 18+, and 21+</strong> events. Please verify your age status to ensure compliance with our admission guidelines and craft bar licensing.
              </p>

              {/* Policy Badges Preview */}
              <div className="grid grid-cols-3 gap-2.5 pt-1">
                <div className="p-2.5 bg-neutral-900/60 border border-neutral-800 text-center">
                  <Music className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                  <span className="text-[11px] font-bold text-white block uppercase">All-Ages</span>
                  <span className="text-[10px] text-neutral-400 block font-mono">Valid Photo ID</span>
                </div>
                <div className="p-2.5 bg-neutral-900/60 border border-neutral-800 text-center">
                  <Beer className="w-4 h-4 text-teal-400 mx-auto mb-1" />
                  <span className="text-[11px] font-bold text-white block uppercase">21+ Bar</span>
                  <span className="text-[10px] text-neutral-400 block font-mono">Wristband Req.</span>
                </div>
                <div className="p-2.5 bg-neutral-900/60 border border-neutral-800 text-center">
                  <Volume2 className="w-4 h-4 text-red-400 mx-auto mb-1" />
                  <span className="text-[11px] font-bold text-white block uppercase">105dB Room</span>
                  <span className="text-[10px] text-neutral-400 block font-mono">Free Earplugs</span>
                </div>
              </div>

              {/* Mandatory Checklist / Acknowledgment */}
              <div className="p-3 bg-black/60 border border-neutral-800/90 text-xs text-neutral-300 space-y-2">
                <label className="flex items-start gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={agreedToConduct}
                    onChange={(e) => setAgreedToConduct(e.target.checked)}
                    className="mt-0.5 accent-amber-500 rounded cursor-pointer"
                  />
                  <span className="text-[11px] leading-tight text-neutral-300">
                    I acknowledge that physical government photo ID is mandatory at the door, and I agree to Z MUSIC's strict anti-harassment and crowd safety rules.
                  </span>
                </label>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-1">
                {/* 21+ Button */}
                <button
                  type="button"
                  disabled={!agreedToConduct}
                  onClick={() => handleVerify('21+')}
                  className={`w-full py-3 px-4 font-black uppercase tracking-wider text-sm transition-all duration-150 flex items-center justify-between cursor-pointer ${
                    agreedToConduct
                      ? 'bg-amber-500 hover:bg-amber-400 text-black shadow-lg shadow-amber-500/20 active:scale-[0.99]'
                      : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                  }`}
                  style={{ fontFamily: 'var(--font-display, "Barlow Condensed", sans-serif)', fontSize: '17px' }}
                >
                  <span>I AM 21+ (FULL BAR &amp; ALL SHOWS)</span>
                  <Beer className="w-4 h-4" />
                </button>

                {/* 18+ Button */}
                <button
                  type="button"
                  disabled={!agreedToConduct}
                  onClick={() => handleVerify('18+')}
                  className={`w-full py-2.5 px-4 font-bold uppercase tracking-wider text-xs font-mono transition-all duration-150 border border-neutral-700 hover:border-neutral-500 text-white hover:bg-neutral-900 flex items-center justify-between cursor-pointer ${
                    !agreedToConduct ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <span>I AM 18–20 YEARS OLD (18+ &amp; ALL-AGES SHOWS)</span>
                  <Check className="w-3.5 h-3.5 text-neutral-400" />
                </button>

                {/* Under 18 Button */}
                <button
                  type="button"
                  disabled={!agreedToConduct}
                  onClick={() => handleVerify('all-ages')}
                  className={`w-full py-2 px-4 text-xs font-mono text-neutral-400 hover:text-amber-400 text-center transition-colors cursor-pointer ${
                    !agreedToConduct ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  I am under 18 — Enter for All-Ages events with Youth ID policy →
                </button>
              </div>
            </>
          ) : (
            /* Policies Tab */
            <div className="space-y-3.5 text-xs text-neutral-300">
              <div className="p-3 bg-neutral-900/60 border-l-2 border-amber-500">
                <h4 className="font-bold text-white uppercase text-xs mb-1 font-mono flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                  1. Identification Requirements
                </h4>
                <p className="text-neutral-400 text-[11px] leading-relaxed">
                  Every attendee must present a physical, non-expired government-issued ID (Passport, Driver's License, KTP, or State ID). Photos on phones or photocopies are strictly not accepted under local licensing laws.
                </p>
              </div>

              <div className="p-3 bg-neutral-900/60 border-l-2 border-teal-500">
                <h4 className="font-bold text-white uppercase text-xs mb-1 font-mono flex items-center gap-1.5">
                  <Beer className="w-3.5 h-3.5 text-teal-400" />
                  2. Alcohol &amp; Bar Service (21+)
                </h4>
                <p className="text-neutral-400 text-[11px] leading-relaxed">
                  Attendees 21+ will receive a tamper-proof wristband upon ID scan at the front doors. Bar staff reserve the right to re-check identification at any time. Underage drinking or passing drinks to minors results in immediate ejection and permanent ban.
                </p>
              </div>

              <div className="p-3 bg-neutral-900/60 border-l-2 border-rose-500">
                <h4 className="font-bold text-white uppercase text-xs mb-1 font-mono flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                  3. Safe Space &amp; Crowd Conduct
                </h4>
                <p className="text-neutral-400 text-[11px] leading-relaxed">
                  Z MUSIC is an inclusive safe space. Harassment, unwanted touching, hate speech, or stage jumping without performer consent will result in immediate removal without refund. Contact any staff member or bartender for discreet assistance.
                </p>
              </div>

              <div className="p-3 bg-neutral-900/60 border-l-2 border-blue-500">
                <h4 className="font-bold text-white uppercase text-xs mb-1 font-mono flex items-center gap-1.5">
                  <Volume2 className="w-3.5 h-3.5 text-blue-400" />
                  4. High Decibels &amp; Ear Protection
                </h4>
                <p className="text-neutral-400 text-[11px] leading-relaxed">
                  Performances regularly exceed 100 dB SPL. High-fidelity reusable and foam earplugs are provided complimentary at coat check and box office.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setActiveTab('verify')}
                className="w-full py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white font-mono uppercase text-xs font-bold border border-neutral-700 transition-colors"
              >
                Back to Age Confirmation
              </button>
            </div>
          )}
        </div>

        {/* Footer Note */}
        <div className="p-3 bg-black border-t border-neutral-900 flex items-center justify-between text-[10px] font-mono text-neutral-500">
          <span>Z MUSIC VENUE · JAKARTA, SYN</span>
          <span className="text-amber-500/80">PREMIER 500-CAP INDEPENDENT SPACE</span>
        </div>
      </div>
    </div>
  );
};
