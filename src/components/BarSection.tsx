import React, { useState } from 'react';
import { Wine, Beer, Sparkles, Flame, Clock, Award } from 'lucide-react';
import { DRINK_MENU } from '../data/venueData';
import { DrinkItem } from '../types/venue';
import { useCurrency } from '../context/CurrencyContext';

export const BarSection: React.FC = () => {
  const { currency, formatPrice, ubahDollarKeRupiah } = useCurrency();
  const [activeCategory, setActiveCategory] = useState<'all' | 'cocktail' | 'draft' | 'na'>('all');

  const getDrinkPriceDisplay = (priceStr: string) => {
    const numeric = parseFloat(priceStr.replace(/[^0-9.]/g, ''));
    if (isNaN(numeric)) return priceStr;
    return currency === 'IDR' ? ubahDollarKeRupiah(numeric) : priceStr;
  };

  const filteredDrinks = DRINK_MENU.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  const signatureDrink = DRINK_MENU.find((d) => d.isSignature);

  return (
    <section id="bar" className="py-20 sm:py-28 bg-black text-white relative border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-500 mb-2">
              <Wine className="w-3.5 h-3.5" />
              <span>3 BARS · QUICK SERVICE · ZERO PRE-MIXES</span>
            </div>
            <h2
              className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white"
              style={{ fontFamily: 'var(--font-display, "Barlow Condensed", sans-serif)' }}
            >
              Z MUSIC POURS
            </h2>
          </div>

          {/* Happy hour notice */}
          <div className="bg-neutral-950 border border-neutral-800 px-4 py-3 flex items-center gap-3">
            <Clock className="w-4 h-4 text-amber-500 shrink-0" />
            <div className="text-xs font-mono">
              <span className="text-white font-bold block">HAPPY HOUR: 6:00 PM – 7:00 PM DOORS</span>
              <span className="text-neutral-400">$2 off all drafts and house spirits</span>
            </div>
          </div>
        </div>

        {/* Highlighted Signature Drink: "Z MUSIC Sour" */}
        {signatureDrink && (
          <div className="mb-14 bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 border border-amber-500/70 p-6 sm:p-8 lg:p-10 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute top-0 left-0 w-32 h-1 bg-amber-500" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-8">
                <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-widest mb-2 font-bold">
                  <Award className="w-4 h-4 text-amber-500" />
                  <span>OFFICIAL VENUE SIGNATURE COCKTAIL</span>
                </div>

                <h3
                  className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white"
                  style={{ fontFamily: 'var(--font-display, "Barlow Condensed", sans-serif)' }}
                >
                  {signatureDrink.name}
                </h3>

                <p className="mt-2 text-sm sm:text-base text-neutral-300 max-w-2xl leading-relaxed">
                  {signatureDrink.ingredients}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-400">
                  <span className="text-white font-bold">{signatureDrink.abv}</span>
                  <span className="text-neutral-600">·</span>
                  <span>SERVED AT ALL 3 BARS</span>
                  <span className="text-neutral-600">·</span>
                  <span>SMOKED WITH WHITE OAK CHIPS</span>
                </div>
              </div>

              <div className="lg:col-span-4 flex lg:justify-end items-center">
                <div className="bg-black/90 border border-amber-500/50 p-6 text-center w-full sm:w-auto min-w-[200px]">
                  <span className="text-xs font-mono text-neutral-400 uppercase block tracking-wider">PRICE</span>
                  <span className="text-3xl sm:text-4xl lg:text-5xl font-mono font-black text-amber-400 block mt-1 tabular-nums">
                    {getDrinkPriceDisplay(signatureDrink.price)}
                  </span>
                  <span className="text-[11px] font-mono text-teal-400 mt-2 block">
                    FAST-TAP EXPRESS SERVICE
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Category Filter Controls */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-amber-500 text-black'
                : 'bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-800'
            }`}
          >
            Full Bar Menu ({DRINK_MENU.length})
          </button>
          <button
            onClick={() => setActiveCategory('cocktail')}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
              activeCategory === 'cocktail'
                ? 'bg-amber-500 text-black'
                : 'bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-800'
            }`}
          >
            Craft Cocktails
          </button>
          <button
            onClick={() => setActiveCategory('draft')}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
              activeCategory === 'draft'
                ? 'bg-amber-500 text-black'
                : 'bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-800'
            }`}
          >
            Local Drafts (16 Taps)
          </button>
          <button
            onClick={() => setActiveCategory('na')}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
              activeCategory === 'na'
                ? 'bg-amber-500 text-black'
                : 'bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-800'
            }`}
          >
            Zero-Proof &amp; Non-Alcoholic
          </button>
        </div>

        {/* Drink Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDrinks.map((drink) => (
            <div
              key={drink.id}
              className={`bg-neutral-950 border p-6 flex flex-col justify-between transition-all duration-200 hover:bg-neutral-900/60 ${
                drink.isSignature ? 'border-amber-500/60' : 'border-neutral-800 hover:border-neutral-700'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-4">
                  <h4
                    className="text-xl font-bold uppercase tracking-tight text-white"
                    style={{ fontFamily: 'var(--font-display, "Barlow Condensed", sans-serif)' }}
                  >
                    {drink.name}
                  </h4>
                  <span className="text-base sm:text-lg font-mono font-black text-amber-400 shrink-0 tabular-nums">
                    {getDrinkPriceDisplay(drink.price)}
                  </span>
                </div>

                <div className="text-xs font-mono text-neutral-400 mt-1">
                  {drink.tagline}
                </div>

                <p className="mt-3 text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal">
                  {drink.ingredients}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-neutral-900 flex items-center justify-between text-xs font-mono text-neutral-400">
                <span className="text-neutral-500">{drink.abv || 'Cold Refreshment'}</span>
                <span className="text-amber-500 uppercase">{drink.category}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bar Ethos Note */}
        <div className="mt-12 p-5 bg-neutral-950/60 border border-neutral-800 text-center text-xs text-neutral-400 font-mono">
          <p>
            * All cups are 100% compostable plant fiber. Filtered cold water stations are free and unlimited on all levels. Please drink responsibly and utilize rideshare services.
          </p>
        </div>
      </div>
    </section>
  );
};
