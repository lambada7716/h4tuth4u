import React, { useState } from 'react';
import { X, Ticket, Check, ShieldCheck, QrCode, Calendar, Clock, MapPin, Sparkles, AlertCircle, Download } from 'lucide-react';
import { Show } from '../types/venue';
import { UPCOMING_SHOWS } from '../data/venueData';
import { useCurrency } from '../context/CurrencyContext';
import { DigitalPassCard } from './DigitalPassCard';

interface TicketModalProps {
  initialShow?: Show | null;
  onClose: () => void;
}

export const TicketModal: React.FC<TicketModalProps> = ({ initialShow, onClose }) => {
  const { currency, toggleCurrency, formatPrice, ubahDollarKeRupiah, kursUSDkeIDR } = useCurrency();
  const [selectedShow, setSelectedShow] = useState<Show>(initialShow || UPCOMING_SHOWS[0]);
  const [ticketTier, setTicketTier] = useState<'ga' | 'vip'>('ga');
  const [soundcheckAddon, setSoundcheckAddon] = useState(false);
  const [quantity, setQuantity] = useState(2);
  const [attendeeName, setAttendeeName] = useState('');
  const [attendeeEmail, setAttendeeEmail] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');

  const basePrice = ticketTier === 'vip' ? selectedShow.vipPrice : selectedShow.priceAdvance;
  const addonPrice = soundcheckAddon ? 25 : 0;
  const subtotal = (basePrice + addonPrice) * quantity;
  const facilityFee = 2.5 * quantity;
  const total = subtotal + facilityFee;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!attendeeEmail || !attendeeName) return;

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setOrderId(`ZM-${Math.floor(100000 + Math.random() * 900000)}`);
      setOrderComplete(true);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div
        className="relative max-w-3xl w-full bg-neutral-950 border border-neutral-800 p-6 sm:p-8 my-auto shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle amber corner stroke */}
        <div className="absolute top-0 left-0 w-24 h-1 bg-amber-500" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white bg-neutral-900 border border-neutral-800 cursor-pointer"
          aria-label="Close Ticket Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {orderComplete ? (
          /* Confirmation Screen with Digital Pass */
          <div className="text-center py-4">
            <div className="w-12 h-12 bg-amber-500/20 border border-amber-500 rounded-full flex items-center justify-center mx-auto text-amber-400 mb-3">
              <Check className="w-6 h-6 stroke-[3]" />
            </div>

            <span className="text-xs font-mono text-amber-500 uppercase tracking-widest block font-bold">
              ORDER CONFIRMED · OFFICIAL DIGITAL PASS READY
            </span>

            <h3
              className="text-3xl sm:text-4xl font-black uppercase text-white tracking-tight mt-1"
              style={{ fontFamily: 'var(--font-display, "Barlow Condensed", sans-serif)' }}
            >
              YOU'RE GOING TO THE SHOW!
            </h3>

            <p className="mt-1 text-sm text-neutral-300">
              Confirmation and venue entry pass sent to <strong className="text-white">{attendeeEmail}</strong>. Order ID:{' '}
              <span className="text-amber-400 font-mono font-bold">{orderId}</span>
            </p>

            {/* Interactive Digital Pass Feature */}
            <div className="mt-6">
              <DigitalPassCard
                orderId={orderId}
                show={selectedShow}
                attendeeName={attendeeName}
                attendeeEmail={attendeeEmail}
                ticketTier={ticketTier}
                quantity={quantity}
                soundcheckAddon={soundcheckAddon}
              />
            </div>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-8 py-3 bg-amber-500 hover:bg-amber-400 text-black font-extrabold uppercase tracking-wider text-xs cursor-pointer transition-all active:scale-95 shadow-lg"
                style={{ fontFamily: 'var(--font-display, "Barlow Condensed", sans-serif)' }}
              >
                Done / Back to Website
              </button>
            </div>
          </div>
        ) : (
          /* Ticket Purchase Form */
          <div>
            <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-500 mb-1">
                  <Ticket className="w-3.5 h-3.5" />
                  <span>OFFICIAL VENUE BOX OFFICE</span>
                </div>
                <h3
                  className="text-3xl sm:text-4xl font-black uppercase text-white tracking-tight"
                  style={{ fontFamily: 'var(--font-display, "Barlow Condensed", sans-serif)' }}
                >
                  SELECT TICKETS
                </h3>
              </div>

              {/* Currency Selector */}
              <div className="flex items-center gap-1.5 bg-neutral-900 border border-neutral-800 p-1 self-start sm:self-auto text-xs font-mono">
                <span className="text-neutral-500 text-[11px] px-1.5">Mata Uang:</span>
                <button
                  type="button"
                  onClick={() => toggleCurrency()}
                  className={`px-2.5 py-1 font-bold cursor-pointer transition-colors ${
                    currency === 'USD' ? 'bg-amber-500 text-black' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  USD ($)
                </button>
                <button
                  type="button"
                  onClick={() => toggleCurrency()}
                  className={`px-2.5 py-1 font-bold cursor-pointer transition-colors ${
                    currency === 'IDR' ? 'bg-amber-500 text-black' : 'text-neutral-400 hover:text-white'
                  }`}
                  title="Kurs konversi: 1 USD = Rp 17.914"
                >
                  IDR (Rp)
                </button>
              </div>
            </div>

            {/* Show Selector Dropdown */}
            <div className="mb-6">
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                Choose Show:
              </label>
              <select
                value={selectedShow.id}
                onChange={(e) => {
                  const found = UPCOMING_SHOWS.find((s) => s.id === e.target.value);
                  if (found) setSelectedShow(found);
                }}
                className="w-full bg-neutral-900 border border-neutral-800 text-white text-sm p-3 outline-none focus:border-amber-500"
              >
                {UPCOMING_SHOWS.map((s) => (
                  <option key={s.id} value={s.id} disabled={s.status === 'sold-out'}>
                    {s.date} // {s.artist} {s.status === 'sold-out' ? '— [SOLD OUT]' : `— ${formatPrice(s.priceAdvance)}`}
                  </option>
                ))}
              </select>
            </div>

            {/* Selected Show Overview */}
            <div className="bg-black/80 border border-neutral-800 p-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-mono text-amber-400 block font-semibold">{selectedShow.fullDate}</span>
                <span className="text-xl font-bold text-white block mt-0.5">{selectedShow.artist}</span>
                <span className="text-xs text-neutral-400">
                  {selectedShow.song ? `Featured Track: ${selectedShow.song}` : selectedShow.support ? `Support: ${selectedShow.support}` : ''}
                </span>
              </div>
              <div className="text-left sm:text-right font-mono text-xs text-neutral-300">
                <div>DOORS: {selectedShow.doorsTime}</div>
                <div>SHOW: {selectedShow.showTime}</div>
                <div className="text-amber-500">{selectedShow.ageRestriction}</div>
              </div>
            </div>

            <form onSubmit={handleCheckout} className="space-y-5">
              {/* Ticket Tier Selection */}
              <div>
                <label className="block text-xs font-mono uppercase text-neutral-400 mb-2">
                  Select Admission Tier:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div
                    onClick={() => setTicketTier('ga')}
                    className={`p-4 border cursor-pointer transition-all ${
                      ticketTier === 'ga'
                        ? 'bg-neutral-900 border-amber-500'
                        : 'bg-neutral-950 border-neutral-800 hover:border-neutral-700'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-base font-bold text-white uppercase">GA Floor Standing</span>
                      <span className="text-base sm:text-lg font-mono font-bold text-amber-400">{formatPrice(selectedShow.priceAdvance)}</span>
                    </div>
                    <p className="text-xs text-neutral-400 mt-1">General floor access, direct stage sightline.</p>
                  </div>

                  <div
                    onClick={() => setTicketTier('vip')}
                    className={`p-4 border cursor-pointer transition-all ${
                      ticketTier === 'vip'
                        ? 'bg-neutral-900 border-amber-500'
                        : 'bg-neutral-950 border-neutral-800 hover:border-neutral-700'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-base font-bold text-white uppercase">VIP Balcony Mezzanine</span>
                      <span className="text-base sm:text-lg font-mono font-bold text-amber-400">{formatPrice(selectedShow.vipPrice)}</span>
                    </div>
                    <p className="text-xs text-neutral-400 mt-1">Reserved balcony view + private express bar.</p>
                  </div>
                </div>
              </div>

              {/* Soundcheck Addon */}
              <label className="flex items-center gap-3 p-3 bg-neutral-900/60 border border-neutral-800 cursor-pointer hover:border-neutral-700">
                <input
                  type="checkbox"
                  checked={soundcheckAddon}
                  onChange={(e) => setSoundcheckAddon(e.target.checked)}
                  className="accent-amber-500 w-4 h-4"
                />
                <div>
                  <div className="text-xs font-bold text-white uppercase">Add Soundcheck &amp; Early Entry Pass (+{formatPrice(25)}/ticket)</div>
                  <div className="text-[11px] text-neutral-400">Access 90 minutes before doors, meet the touring crew, first pick of tour merch.</div>
                </div>
              </label>

              {/* Quantity Selector */}
              <div className="flex items-center justify-between border-t border-b border-neutral-800 py-3">
                <span className="text-xs font-mono uppercase text-neutral-300">Ticket Quantity</span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 bg-neutral-900 border border-neutral-700 text-white flex items-center justify-center font-bold hover:bg-neutral-800"
                  >
                    -
                  </button>
                  <span className="font-mono text-base font-bold text-white w-6 text-center">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.min(8, quantity + 1))}
                    className="w-8 h-8 bg-neutral-900 border border-neutral-700 text-white flex items-center justify-center font-bold hover:bg-neutral-800"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Attendee Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-neutral-400 uppercase mb-1">
                    Your Name (Will match ID at door) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Jane Doe"
                    value={attendeeName}
                    onChange={(e) => setAttendeeName(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 text-white text-sm p-2.5 outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-400 uppercase mb-1">
                    Email for Tickets *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="jane@example.com"
                    value={attendeeEmail}
                    onChange={(e) => setAttendeeEmail(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 text-white text-sm p-2.5 outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-black border border-neutral-800 p-4 space-y-1.5 text-xs font-mono text-neutral-400">
                <div className="flex justify-between">
                  <span>{quantity}x {ticketTier === 'vip' ? 'VIP Balcony' : 'GA Floor'}:</span>
                  <span>{formatPrice(basePrice * quantity)}</span>
                </div>
                {soundcheckAddon && (
                  <div className="flex justify-between">
                    <span>{quantity}x Soundcheck Addon:</span>
                    <span>{formatPrice(addonPrice * quantity)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Venue Restoration Fee ({formatPrice(2.5)}/ea):</span>
                  <span>{formatPrice(facilityFee)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-neutral-800 text-white font-bold text-sm">
                  <span>TOTAL CHARGE:</span>
                  <span className="text-amber-400 text-base">{formatPrice(total)}</span>
                </div>
                {currency === 'IDR' && (
                  <div className="pt-1 text-[11px] text-neutral-500 flex items-center justify-between">
                    <span>Kurs acuan: 1 USD = Rp 17.914</span>
                    <span>Equiv. ${total.toFixed(2)} USD</span>
                  </div>
                )}
              </div>

              {/* Submit Checkout Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 bg-amber-500 hover:bg-amber-400 disabled:bg-neutral-800 text-black font-extrabold uppercase tracking-wider text-base rounded-none transition-all cursor-pointer flex items-center justify-center gap-2 glow-amber-pulse"
                style={{ fontFamily: 'var(--font-display, "Barlow Condensed", sans-serif)' }}
              >
                {isProcessing ? (
                  <span>Authorizing Ticket Purchase...</span>
                ) : (
                  <>
                    <Ticket className="w-5 h-5 stroke-[2.5]" />
                    <span>Complete Order • {formatPrice(total)}</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] font-mono text-neutral-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Verified Independent Ticketing · 100% Guaranteed Entry</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
