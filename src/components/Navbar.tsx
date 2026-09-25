import React, { useState, useEffect } from 'react';
import { Menu, X, Ticket, MapPin, DollarSign, Globe } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  onOpenTickets: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenTickets, onNavigateSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { currency, toggleCurrency } = useCurrency();
  const { language, changeLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: t('nav_shows'), id: 'shows' },
    { label: 'Artists', id: 'artists' },
    { label: t('nav_venue'), id: 'venue' },
    { label: t('nav_drinks'), id: 'bar' },
    { label: t('nav_private'), id: 'private-events' },
    { label: t('nav_faq'), id: 'faq' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigateSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-black/95 backdrop-blur-md border-b border-neutral-800/80 shadow-2xl py-3.5'
          : 'bg-black/80 backdrop-blur-sm border-b border-neutral-900/60 py-4.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Zone 1: Brand Wordmark (Display Font, single element) */}
        <button
          onClick={() => handleLinkClick('hero')}
          className="group flex items-center gap-2.5 text-left focus:outline-none cursor-pointer"
          aria-label="Z MUSIC Home"
        >
          <div className="w-8 h-8 rounded-none bg-amber-500 flex items-center justify-center font-black text-black text-xl tracking-tighter transform group-hover:scale-105 transition-transform duration-200">
            Z
          </div>
          <span
            className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white transition-colors duration-200 group-hover:text-amber-400"
            style={{ fontFamily: 'var(--font-display, "Barlow Condensed", sans-serif)' }}
          >
            Z MUSIC
          </span>
        </button>

        {/* Zone 2: 4-6 Clean Text Nav Links */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-9 text-sm font-medium tracking-wide uppercase text-neutral-300">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className="relative py-1 hover:text-white transition-colors duration-150 group cursor-pointer"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-500 transition-all duration-200 group-hover:w-full" />
            </button>
          ))}
        </nav>

        {/* Zone 3: Primary Action, Language Switch & Currency Switch */}
        <div className="flex items-center gap-2">
          {/* Tombol Ganti Bahasa / Language Switcher */}
          <div className="flex items-center bg-neutral-900 border border-neutral-800 p-0.5 text-xs font-mono">
            <button
              type="button"
              onClick={() => changeLanguage('en')}
              className={`px-2 py-1 transition-colors cursor-pointer ${
                language === 'en'
                  ? 'bg-amber-500 text-black font-bold'
                  : 'text-neutral-400 hover:text-white'
              }`}
              title="Switch to English"
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => changeLanguage('id')}
              className={`px-2 py-1 transition-colors cursor-pointer ${
                language === 'id'
                  ? 'bg-amber-500 text-black font-bold'
                  : 'text-neutral-400 hover:text-white'
              }`}
              title="Ubah ke Bahasa Indonesia"
            >
              ID
            </button>
          </div>

          {/* Currency Toggle (USD <-> IDR with 1 USD = Rp 17.914) */}
          <button
            onClick={toggleCurrency}
            className="flex items-center gap-1 px-2.5 py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-amber-500/60 text-xs font-mono transition-colors cursor-pointer select-none"
            title={`Rate: 1 USD = Rp 17.914. Click to switch to ${currency === 'USD' ? 'IDR (Rupiah)' : 'USD ($)'}`}
            aria-label="Toggle currency between USD and IDR"
          >
            <span className={currency === 'USD' ? 'text-amber-400 font-bold' : 'text-neutral-500'}>USD</span>
            <span className="text-neutral-700">/</span>
            <span className={currency === 'IDR' ? 'text-amber-400 font-bold' : 'text-neutral-500'}>IDR</span>
          </button>

          <button
            onClick={onOpenTickets}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 text-black font-bold uppercase tracking-wider text-xs rounded-none transition-all duration-200 hover:bg-amber-400 hover:shadow-[0_0_24px_rgba(245,158,11,0.6)] cursor-pointer active:translate-y-0.5"
            style={{ fontFamily: 'var(--font-display, "Barlow Condensed", sans-serif)', fontSize: '15px' }}
          >
            <Ticket className="w-4 h-4 text-black stroke-[2.5]" />
            <span>{t('nav_tickets')}</span>
          </button>

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-neutral-300 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-amber-400" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-full bg-black/98 border-b border-neutral-800 px-6 py-6 shadow-2xl flex flex-col gap-5 animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className="text-left text-lg font-bold uppercase tracking-wider text-neutral-200 hover:text-amber-400 py-2 border-b border-neutral-900 transition-colors"
                style={{ fontFamily: 'var(--font-display, "Barlow Condensed", sans-serif)' }}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-3">
            {/* Mobile Language Switcher */}
            <div className="flex items-center justify-between py-2 border-b border-neutral-900 text-xs font-mono">
              <span className="text-neutral-400 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-amber-500" />
                <span>Bahasa / Language:</span>
              </span>
              <div className="flex items-center gap-1.5 bg-neutral-900 p-1 border border-neutral-800">
                <button
                  type="button"
                  onClick={() => changeLanguage('en')}
                  className={`px-3 py-1 font-bold ${language === 'en' ? 'bg-amber-500 text-black' : 'text-neutral-400 hover:text-white'}`}
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => changeLanguage('id')}
                  className={`px-3 py-1 font-bold ${language === 'id' ? 'bg-amber-500 text-black' : 'text-neutral-400 hover:text-white'}`}
                >
                  Indonesia
                </button>
              </div>
            </div>

            {/* Mobile Currency Switcher */}
            <div className="flex items-center justify-between py-2 border-b border-neutral-900 text-xs font-mono">
              <span className="text-neutral-400">Currency / Mata Uang:</span>
              <div className="flex items-center gap-1.5 bg-neutral-900 p-1 border border-neutral-800">
                <button
                  type="button"
                  onClick={() => toggleCurrency()}
                  className={`px-3 py-1 font-bold ${currency === 'USD' ? 'bg-amber-500 text-black' : 'text-neutral-400 hover:text-white'}`}
                >
                  USD ($)
                </button>
                <button
                  type="button"
                  onClick={() => toggleCurrency()}
                  className={`px-3 py-1 font-bold ${currency === 'IDR' ? 'bg-amber-500 text-black' : 'text-neutral-400 hover:text-white'}`}
                >
                  IDR (Rp)
                </button>
              </div>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTickets();
              }}
              className="w-full py-3 bg-amber-500 text-black font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-2 hover:bg-amber-400 active:scale-[0.99] transition-all"
              style={{ fontFamily: 'var(--font-display, "Barlow Condensed", sans-serif)', fontSize: '17px' }}
            >
              <Ticket className="w-4 h-4 stroke-[2.5]" />
              <span>{t('nav_tickets')}</span>
            </button>
            <div className="flex items-center gap-2 text-xs text-neutral-400 pt-1">
              <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>418 Soundwave Ave, Jakarta, SYN</span>
              <span className="text-neutral-600">·</span>
              <span className="text-amber-500 font-mono">500 Cap</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
