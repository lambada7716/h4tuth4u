import React, { useState, useMemo } from 'react';
import {
  QrCode,
  Download,
  Check,
  ShieldCheck,
  Smartphone,
  Maximize2,
  Minimize2,
  Copy,
  Sparkles,
  MapPin,
  Clock,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { Show } from '../types/venue';
import { generateTicketQRMatrix } from '../utils/qrCodeGenerator';

interface DigitalPassCardProps {
  orderId: string;
  show: Show;
  attendeeName: string;
  attendeeEmail: string;
  ticketTier: 'ga' | 'vip';
  quantity: number;
  soundcheckAddon: boolean;
}

export const DigitalPassCard: React.FC<DigitalPassCardProps> = ({
  orderId,
  show,
  attendeeName,
  attendeeEmail,
  ticketTier,
  quantity,
  soundcheckAddon
}) => {
  const [isExpandedQR, setIsExpandedQR] = useState(false);
  const [scanStatus, setScanStatus] = useState<'idle' | 'scanning' | 'granted'>('idle');
  const [copiedToken, setCopiedToken] = useState(false);
  const [walletAdded, setWalletAdded] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  // Generate deterministic unique payload & QR matrix
  const passToken = useMemo(() => {
    const raw = `${orderId}-${show.id}-${ticketTier}-${attendeeName.replace(/\s+/g, '')}`;
    return `ZM-PASS#${orderId.replace('ZM-', '')}-${show.date.replace(' ', '')}-${ticketTier.toUpperCase()}`;
  }, [orderId, show, ticketTier, attendeeName]);

  const qrMatrix = useMemo(() => {
    return generateTicketQRMatrix(`${passToken}:${attendeeEmail}`, 25);
  }, [passToken, attendeeEmail]);

  const gateInfo = ticketTier === 'vip' ? 'GATE VIP · MEZZANINE FAST-TRACK' : 'GATE A · MAIN FLOOR PIT';
  const sectionInfo = ticketTier === 'vip' ? 'VIP BALCONY & LOUNGE' : 'GENERAL ADMISSION PIT';

  const handleSimulateScan = () => {
    setScanStatus('scanning');
    setTimeout(() => {
      setScanStatus('granted');
      setTimeout(() => setScanStatus('idle'), 4000);
    }, 900);
  };

  const handleCopyToken = () => {
    navigator.clipboard?.writeText(passToken);
    setCopiedToken(true);
    setTimeout(() => setCopiedToken(false), 2000);
  };

  const handleDownloadPass = () => {
    const ticketText = `=========================================
Z MUSIC JAKARTA - OFFICIAL DIGITAL PASS
=========================================
ORDER ID: ${orderId}
PASS TOKEN: ${passToken}
ARTIST: ${show.artist}
DATE: ${show.fullDate}
DOORS: ${show.doorsTime} | SHOW: ${show.showTime}
VENUE: Z MUSIC, 418 SOUNDWAVE AVE, JAKARTA
TIER: ${ticketTier.toUpperCase()} (${quantity} TICKET${quantity > 1 ? 'S' : ''})
SECTION: ${sectionInfo}
GATE: ${gateInfo}
ATTENDEE: ${attendeeName} (${attendeeEmail})
ADD-ONS: ${soundcheckAddon ? 'VIP Early Soundcheck Access (5:30 PM)' : 'None'}
STATUS: ACTIVE · VALID FOR VENUE ENTRY
=========================================
Present this digital pass or QR code at venue entry.`;

    const blob = new Blob([ticketText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ZMusic_DigitalPass_${orderId}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2500);
  };

  const handleSaveToWallet = () => {
    setWalletAdded(true);
    setTimeout(() => setWalletAdded(false), 3000);
  };

  return (
    <div className="w-full">
      {/* Expanded High-Brightness QR Modal for Gate Scanners */}
      {isExpandedQR && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4"
          onClick={() => setIsExpandedQR(false)}
        >
          <div
            className="bg-white p-6 sm:p-8 max-w-sm w-full text-black flex flex-col items-center shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsExpandedQR(false)}
              className="absolute top-2 right-2 text-neutral-600 hover:text-black p-2 font-mono text-xs uppercase"
            >
              Close [✕]
            </button>
            <div className="text-center mb-3">
              <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-neutral-600">
                HIGH CONTRAST ENTRY SCANNER
              </span>
              <h4 className="text-xl font-black uppercase tracking-tight">{show.artist}</h4>
              <p className="text-xs font-mono text-neutral-700">{orderId} · {attendeeName}</p>
            </div>

            {/* High-Res QR SVG */}
            <div className="p-3 bg-white border-2 border-black relative">
              <svg viewBox="0 0 25 25" className="w-64 h-64 shape-rendering-crispEdges">
                {qrMatrix.map((row, r) =>
                  row.map((cell, c) => (
                    cell ? <rect key={`${r}-${c}`} x={c} y={r} width="1" height="1" fill="#000000" /> : null
                  ))
                )}
              </svg>
            </div>

            <div className="mt-3 text-center">
              <code className="text-xs font-mono font-bold tracking-widest bg-neutral-100 px-2 py-1 border border-neutral-300">
                {passToken}
              </code>
              <p className="text-[11px] text-neutral-500 font-mono mt-2">
                Turn brightness to 100% and present to door staff.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Digital Pass Card UI */}
      <div className="relative bg-neutral-950 border border-neutral-800 text-left overflow-hidden shadow-2xl">
        {/* Ticket Top Banner */}
        <div className="bg-neutral-900 border-b border-neutral-800 px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-wider text-white uppercase">
              DIGITAL ENTRY PASS
            </span>
            <span className="text-neutral-600">·</span>
            <span className="text-[11px] font-mono text-emerald-400">ACTIVE</span>
          </div>

          <div className="px-2.5 py-0.5 bg-amber-500 text-black text-[11px] font-mono font-bold uppercase tracking-wider">
            {ticketTier === 'vip' ? 'VIP BALCONY PASS' : 'GA FLOOR STANDING'}
          </div>
        </div>

        {/* Concert Core Info & QR Split Grid */}
        <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Left Details (7 cols) */}
          <div className="md:col-span-7 space-y-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-amber-500 font-semibold mb-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>{show.fullDate}</span>
              </div>
              <h3
                className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight leading-none"
                style={{ fontFamily: 'var(--font-display, "Barlow Condensed", sans-serif)' }}
              >
                {show.artist}
              </h3>
              <p className="text-xs font-mono text-neutral-400 mt-1 flex items-center gap-2">
                <Clock className="w-3 h-3 text-neutral-500" />
                <span>DOORS {show.doorsTime} · SHOW {show.showTime}</span>
              </p>
            </div>

            {/* Entry Specification Matrix */}
            <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-3 border-t border-neutral-900">
              <div className="bg-black/80 border border-neutral-800/80 p-2.5">
                <span className="text-[10px] text-neutral-500 block uppercase">ASSIGNED GATE</span>
                <span className="text-white font-bold text-xs sm:text-sm">{gateInfo}</span>
              </div>

              <div className="bg-black/80 border border-neutral-800/80 p-2.5">
                <span className="text-[10px] text-neutral-500 block uppercase">SECTION / ACCESS</span>
                <span className="text-amber-400 font-bold text-xs sm:text-sm">{sectionInfo}</span>
              </div>
            </div>

            {/* Attendee & Add-on Details */}
            <div className="text-xs font-mono space-y-1 bg-neutral-900/50 p-2.5 border border-neutral-800/50">
              <div className="flex items-center justify-between text-neutral-300">
                <span>Attendee: <strong className="text-white">{attendeeName}</strong></span>
                <span className="text-amber-400 font-bold">{quantity} {quantity === 1 ? 'Guest' : 'Guests'}</span>
              </div>
              {soundcheckAddon && (
                <div className="text-teal-400 text-[11px] flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>VIP Early Soundcheck Access Included (5:30 PM Check-In)</span>
                </div>
              )}
            </div>

            {/* Security Token Bar */}
            <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 pt-1">
              <div className="flex items-center gap-1.5">
                <span>Token:</span>
                <code className="text-neutral-300 bg-neutral-900 px-1 py-0.5 border border-neutral-800">
                  {passToken}
                </code>
                <button
                  type="button"
                  onClick={handleCopyToken}
                  className="hover:text-white transition-colors cursor-pointer"
                  title="Copy pass token"
                >
                  {copiedToken ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-neutral-500" />}
                </button>
              </div>
              <span className="text-neutral-500">{orderId}</span>
            </div>
          </div>

          {/* Right: Unique QR Code Matrix & Scanner Simulation (5 cols) */}
          <div className="md:col-span-5 flex flex-col items-center justify-center p-3 bg-neutral-900/40 border border-neutral-800 relative">
            {/* Live Scan Status Overlay */}
            {scanStatus === 'scanning' && (
              <div className="absolute inset-0 bg-black/90 z-20 flex flex-col items-center justify-center text-center p-4">
                <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mb-2" />
                <span className="text-xs font-mono text-amber-400 font-bold tracking-wider uppercase">
                  READING QR CODE...
                </span>
                <span className="text-[10px] font-mono text-neutral-400">Verifying Door Token</span>
              </div>
            )}

            {scanStatus === 'granted' && (
              <div className="absolute inset-0 bg-emerald-950/95 z-20 flex flex-col items-center justify-center text-center p-4 border border-emerald-500/80">
                <div className="w-10 h-10 rounded-full bg-emerald-500 text-black flex items-center justify-center mb-2 shadow-lg">
                  <Check className="w-6 h-6 stroke-[3]" />
                </div>
                <span className="text-sm font-mono text-white font-black tracking-wider uppercase">
                  ENTRY GRANTED!
                </span>
                <span className="text-[11px] font-mono text-emerald-300 mt-1">
                  Welcome to Z MUSIC, {attendeeName}
                </span>
                <span className="text-[10px] font-mono text-emerald-400/80 mt-0.5">
                  Section: {sectionInfo}
                </span>
              </div>
            )}

            {/* QR Code Container with High-Contrast White Surface */}
            <div
              onClick={() => setIsExpandedQR(true)}
              className="bg-white p-3.5 relative shadow-inner cursor-pointer group"
              title="Click to expand high-brightness QR"
            >
              {/* Laser Scan Line Simulation Animation */}
              <div className="absolute left-0 right-0 h-0.5 bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.9)] animate-pulse top-1/2 -translate-y-1/2 pointer-events-none" />

              {/* Dynamic SVG QR Matrix */}
              <svg viewBox="0 0 25 25" className="w-36 h-36 sm:w-40 sm:h-40 shape-rendering-crispEdges">
                {qrMatrix.map((row, r) =>
                  row.map((cell, c) => (
                    cell ? <rect key={`${r}-${c}`} x={c} y={r} width="1" height="1" fill="#000000" /> : null
                  ))
                )}
              </svg>

              {/* Monogram Center Badge */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-7 h-7 bg-black text-amber-400 font-mono font-black text-xs flex items-center justify-center border border-white shadow-md">
                  Z
                </div>
              </div>

              {/* Hover overlay hint */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="bg-black/90 text-white text-[10px] font-mono px-2 py-1 flex items-center gap-1">
                  <Maximize2 className="w-3 h-3" /> Enlarge
                </span>
              </div>
            </div>

            <div className="mt-2.5 text-center">
              <span className="text-[10px] font-mono font-bold text-neutral-300 tracking-widest block uppercase">
                DOOR SCANNER READY
              </span>
              <span className="text-[9px] font-mono text-neutral-500 block">
                Tap code to enlarge for doorman
              </span>
            </div>

            {/* Test Scanner Button */}
            <button
              type="button"
              onClick={handleSimulateScan}
              disabled={scanStatus !== 'idle'}
              className="mt-3 px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-[11px] font-mono text-neutral-300 hover:text-white border border-neutral-700 hover:border-amber-500 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
              <span>Simulate Door Scan</span>
            </button>
          </div>
        </div>

        {/* Digital Pass Footer & Quick Action Bar */}
        <div className="bg-black border-t border-neutral-900 px-5 py-3.5 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2 text-[11px] text-neutral-400">
            <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span>Z MUSIC · 418 SOUNDWAVE AVE · JAKARTA</span>
          </div>

          {/* Quick Actions: Download & Wallet */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleDownloadPass}
              className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
              title="Download Pass as Text Ticket"
            >
              {downloaded ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-400">Saved</span>
                </>
              ) : (
                <>
                  <Download className="w-3 h-3 text-amber-500" />
                  <span>Download Pass</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleSaveToWallet}
              className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
              title="Save to Mobile Wallet"
            >
              {walletAdded ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-400">Added to Wallet</span>
                </>
              ) : (
                <>
                  <Smartphone className="w-3 h-3 text-[#1DB954]" />
                  <span>Save to Wallet</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
