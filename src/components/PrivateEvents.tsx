import React, { useState } from 'react';
import { Building2, Music2, Disc3, Video, CheckCircle2, Send, Calendar, Users, DollarSign } from 'lucide-react';

export const PrivateEvents: React.FC = () => {
  const [eventType, setEventType] = useState('album-release');
  const [guestCount, setGuestCount] = useState(250);
  const [requestedDate, setRequestedDate] = useState('');
  const [includeBarPackage, setIncludeBarPackage] = useState(true);
  const [includeSoundEngineer, setIncludeSoundEngineer] = useState(true);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Dynamic estimate calculation based on venue standard rates
  const baseRate = eventType === 'corporate' ? 4500 : eventType === 'private-concert' ? 3800 : 3200;
  const staffingFee = includeSoundEngineer ? 750 : 0;
  const barEstimate = includeBarPackage ? guestCount * 22 : 0;
  const totalEstimate = baseRate + staffingFee + barEstimate;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !fullName) return;
    setSubmitted(true);
  };

  return (
    <section id="private-events" className="py-20 sm:py-28 bg-black text-white relative border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-500 mb-2">
            <Building2 className="w-3.5 h-3.5" />
            <span>FULL ROOM BUYOUTS &amp; PRODUCTION RENTALS</span>
          </div>
          <h2
            className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white"
            style={{ fontFamily: 'var(--font-display, "Barlow Condensed", sans-serif)' }}
          >
            PRIVATE EVENTS &amp; BUYOUTS
          </h2>
          <p className="mt-2 text-neutral-400 text-sm sm:text-base max-w-2xl">
            Host your private concert, corporate gala, record release party, or video production in an authentic 500-capacity room with full arena-grade production and dedicated hospitality.
          </p>
        </div>

        {/* 3 Core Event Types Bento */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          <div className="bg-neutral-950 border border-neutral-800 p-6 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 bg-neutral-900 border border-neutral-800 flex items-center justify-center text-amber-400 mb-4">
                <Music2 className="w-5 h-5" />
              </div>
              <h3
                className="text-2xl font-bold uppercase tracking-tight text-white"
                style={{ fontFamily: 'var(--font-display, "Barlow Condensed", sans-serif)' }}
              >
                PRIVATE CONCERTS
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 mt-2 leading-relaxed">
                Full run of the venue for touring rehearsals, secret fan club shows, or private headlining performances with your chosen lineup.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-neutral-900 text-xs font-mono text-neutral-400">
              Capacity: Up to 500 standing · 200 seated
            </div>
          </div>

          <div className="bg-neutral-950 border border-neutral-800 p-6 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 bg-neutral-900 border border-neutral-800 flex items-center justify-center text-teal-400 mb-4">
                <Disc3 className="w-5 h-5" />
              </div>
              <h3
                className="text-2xl font-bold uppercase tracking-tight text-white"
                style={{ fontFamily: 'var(--font-display, "Barlow Condensed", sans-serif)' }}
              >
                ALBUM RELEASES &amp; LISTENING
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 mt-2 leading-relaxed">
                Immersive playback through our d&amp;b audiotechnik PA system, merch pop-up stalls, vinyl pressings, and private VIP mezzanine lounge.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-neutral-900 text-xs font-mono text-neutral-400">
              Includes Green Room &amp; Merch Booths
            </div>
          </div>

          <div className="bg-neutral-950 border border-neutral-800 p-6 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 bg-neutral-900 border border-neutral-800 flex items-center justify-center text-red-500 mb-4">
                <Video className="w-5 h-5" />
              </div>
              <h3
                className="text-2xl font-bold uppercase tracking-tight text-white"
                style={{ fontFamily: 'var(--font-display, "Barlow Condensed", sans-serif)' }}
              >
                CORPORATE BUYOUTS &amp; FILMING
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 mt-2 leading-relaxed">
                Company summits, awards banquets, film/commercial shoots with 3-phase cam-lock power, high-speed fiber, and full lighting grid.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-neutral-900 text-xs font-mono text-neutral-400">
              Direct ground load-in · 400A 3-Phase Power
            </div>
          </div>
        </div>

        {/* Interactive Event Inquiry Form & Live Estimator */}
        <div className="border border-neutral-800 bg-neutral-950/90 p-6 sm:p-10 lg:p-12 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: Instant Estimate Calculator & Specs */}
            <div className="lg:col-span-5 bg-black/80 border border-neutral-800 p-6 sm:p-7">
              <span className="text-xs font-mono text-amber-500 uppercase tracking-widest block font-bold">
                ESTIMATED EVENT QUOTE
              </span>
              <div className="text-4xl sm:text-5xl font-mono font-black text-white mt-2 tabular-nums">
                ${totalEstimate.toLocaleString()}
              </div>
              <div className="text-xs text-neutral-400 mt-1 font-mono">
                * Based on {guestCount} guests + selected production tier
              </div>

              <div className="mt-6 space-y-3 pt-4 border-t border-neutral-800 text-xs font-mono text-neutral-300">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Venue Buyout Base:</span>
                  <span>${baseRate.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Audio/Lighting Crew:</span>
                  <span>{includeSoundEngineer ? '$750' : '$0 (Client FOH)'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Bar Package (Est.):</span>
                  <span>{includeBarPackage ? `$${barEstimate.toLocaleString()}` : 'Cash Bar'}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-neutral-900 font-bold text-amber-400">
                  <span>TOTAL ESTIMATE:</span>
                  <span>${totalEstimate.toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-6 p-3 bg-neutral-900/60 border border-neutral-800 text-[11px] font-mono text-neutral-400">
                Quotes are non-binding estimates. Final agreements include load-in window, security guard allocations, and sound level permits.
              </div>
            </div>

            {/* Right Column: Inquiry Form */}
            <div className="lg:col-span-7">
              {submitted ? (
                <div className="py-12 text-center bg-neutral-900/40 border border-emerald-500/40 p-8">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                  <h4
                    className="text-2xl sm:text-3xl font-bold uppercase text-white"
                    style={{ fontFamily: 'var(--font-display, "Barlow Condensed", sans-serif)' }}
                  >
                    INQUIRY RECEIVED
                  </h4>
                  <p className="mt-2 text-sm text-neutral-300 max-w-md mx-auto">
                    Thank you, <strong className="text-white">{fullName}</strong>. Our private events manager will contact you at <strong className="text-amber-400">{email}</strong> within 24 hours with venue availability and floor plan options.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFullName('');
                      setEmail('');
                      setNotes('');
                    }}
                    className="mt-6 px-5 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-xs font-mono uppercase text-white tracking-wider"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-neutral-400 uppercase mb-1.5">
                        Event Category
                      </label>
                      <select
                        value={eventType}
                        onChange={(e) => setEventType(e.target.value)}
                        className="w-full bg-neutral-900 border border-neutral-800 text-white text-sm px-3.5 py-2.5 outline-none focus:border-amber-500"
                      >
                        <option value="album-release">Album Release / Listening</option>
                        <option value="private-concert">Private Concert / Tour Rehearsal</option>
                        <option value="corporate">Corporate Buyout / Gala</option>
                        <option value="film-shoot">Film / Video Production</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-neutral-400 uppercase mb-1.5">
                        Target Date
                      </label>
                      <input
                        type="date"
                        value={requestedDate}
                        onChange={(e) => setRequestedDate(e.target.value)}
                        className="w-full bg-neutral-900 border border-neutral-800 text-white text-sm px-3.5 py-2.5 outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-mono text-neutral-400 mb-1.5">
                      <span>ESTIMATED ATTENDANCE: {guestCount} GUESTS</span>
                      <span className="text-neutral-500">MAX: 500</span>
                    </div>
                    <input
                      type="range"
                      min="50"
                      max="500"
                      step="25"
                      value={guestCount}
                      onChange={(e) => setGuestCount(Number(e.target.value))}
                      className="w-full accent-amber-500 bg-neutral-800 h-2 cursor-pointer"
                    />
                  </div>

                  {/* Production Toggles */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <label className="flex items-center gap-2.5 bg-neutral-900/80 border border-neutral-800 p-3 cursor-pointer select-none hover:border-neutral-700">
                      <input
                        type="checkbox"
                        checked={includeBarPackage}
                        onChange={(e) => setIncludeBarPackage(e.target.checked)}
                        className="accent-amber-500 w-4 h-4"
                      />
                      <span className="text-xs font-mono text-neutral-300">Open Bar Package (+$22/guest)</span>
                    </label>

                    <label className="flex items-center gap-2.5 bg-neutral-900/80 border border-neutral-800 p-3 cursor-pointer select-none hover:border-neutral-700">
                      <input
                        type="checkbox"
                        checked={includeSoundEngineer}
                        onChange={(e) => setIncludeSoundEngineer(e.target.checked)}
                        className="accent-amber-500 w-4 h-4"
                      />
                      <span className="text-xs font-mono text-neutral-300">House Audio Engineer (+$750)</span>
                    </label>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                    <div>
                      <label className="block text-xs font-mono text-neutral-400 uppercase mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rachel Adams"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full bg-neutral-900 border border-neutral-800 text-white text-sm px-3.5 py-2.5 outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-neutral-400 uppercase mb-1.5">
                        Contact Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="rachel@organization.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-neutral-900 border border-neutral-800 text-white text-sm px-3.5 py-2.5 outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-neutral-400 uppercase mb-1.5">
                      Event Details / Technical Needs
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Tell us about the artist, catering needs, stage setup, or recording requirements..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 text-white text-sm px-3.5 py-2.5 outline-none focus:border-amber-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-black font-extrabold uppercase tracking-wider text-base rounded-none transition-colors cursor-pointer flex items-center justify-center gap-2"
                    style={{ fontFamily: 'var(--font-display, "Barlow Condensed", sans-serif)' }}
                  >
                    <Send className="w-4 h-4 stroke-[2.5]" />
                    <span>Send Private Event Inquiry</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
