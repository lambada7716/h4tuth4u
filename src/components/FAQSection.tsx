import React, { useState, useMemo } from 'react';
import {
  HelpCircle,
  ChevronDown,
  Search,
  Accessibility,
  Car,
  Camera,
  Ticket,
  Wine,
  Mail,
  Phone,
  ShieldCheck,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface FAQItem {
  id: string;
  category: 'accessibility' | 'parking' | 'recording' | 'entry' | 'bar';
  question: { en: string; id: string };
  answer: { en: string; id: string };
  badge?: { en: string; id: string };
}

const FAQ_DATA: FAQItem[] = [
  // Accessibility
  {
    id: 'faq-1',
    category: 'accessibility',
    question: {
      en: 'Is Z MUSIC fully wheelchair and ADA accessible?',
      id: 'Apakah Z MUSIC ramah disabilitas dan pengguna kursi roda?'
    },
    answer: {
      en: 'Yes! Z MUSIC is built with zero-barrier accessibility. Our street-level main entrance on Soundwave Avenue features a smooth ramp directly to the main GA floor. We offer dedicated elevated wheelchair viewing platforms with clear, unobstructed sightlines to the stage, companion seating, an ADA-compliant elevator to the mezzanine balcony, and private accessible restrooms on both floors. Licensed service animals are always welcome.',
      id: 'Ya! Z MUSIC dibangun dengan aksesibilitas ramah disabilitas tanpa hambatan. Pintu masuk utama di Soundwave Avenue dilengkapi jalur landai (ramp) menuju lantai utama. Kami menyediakan area panggung khusus pengguna kursi roda dengan pemandangan panggung yang jelas tanpa halangan, tempat duduk pendamping, lift ramah disabilitas menuju balkon mezzanine, serta toilet khusus di kedua lantai.'
    },
    badge: {
      en: 'ACCESSIBILITY',
      id: 'AKSESIBILITAS'
    }
  },
  {
    id: 'faq-2',
    category: 'accessibility',
    question: {
      en: 'Do you offer sensory accommodations, quiet spaces, or ear protection?',
      id: 'Apakah venue menyediakan pelindung telinga atau ruang tenang?'
    },
    answer: {
      en: 'High-fidelity reusable earplugs and single-use foam earplugs are available at the box office and coat check free of charge. If you experience sensory overload from strobe lights or crowd density, notify any guest services staff member to access our quiet acoustic lounge located near the south vestibule. Audio levels are maintained to compliant acoustic safety thresholds.',
      id: 'Pelindung telinga (earplugs) berkualitas tinggi dan busa sekali pakai tersedia secara gratis di loket tiket dan penitipan barang. Jika Anda merasa kelelahan sensorik dari lampu panggung atau kerumunan penonton, silakan hubungi staf layanan kami untuk mengakses lounge akustik tenang di dekat pintu masuk selatan.'
    },
    badge: {
      en: 'GUEST COMFORT',
      id: 'KENYAMANAN'
    }
  },

  // Parking & Transit in Jakarta
  {
    id: 'faq-3',
    category: 'parking',
    question: {
      en: 'Where can I park in Jakarta, and is there on-site parking?',
      id: 'Di mana lokasi parkir di Jakarta dan apakah tersedia parkir di venue?'
    },
    answer: {
      en: 'Z MUSIC features an on-site secured parking pavilion accommodating 80 passenger cars and 150 motorcycles with 24-hour security guards. Car parking is Rp 30,000 flat rate during concert hours, and motorcycle parking is Rp 10,000 flat rate. Valet parking service is available directly at the front driveway porte-cochère for Rp 50,000 ($3 USD). Additional overflow parking is partnered with the adjacent Soundwave Business Center (2-minute walk).',
      id: 'Z MUSIC memiliki area parkir berpenjaga dengan kapasitas 80 mobil dan 150 sepeda motor dengan pengamanan 24 jam. Tarif parkir flat selama jam konser adalah Rp 30.000 untuk mobil dan Rp 10.000 untuk sepeda motor. Layanan parkir valet tersedia langsung di lobi depan seharga Rp 50.000. Tersedia juga parkir cadangan di Soundwave Business Center (2 menit jalan kaki).'
    },
    badge: {
      en: 'PARKING & VALET',
      id: 'PARKIR & VALET'
    }
  },
  {
    id: 'faq-4',
    category: 'parking',
    question: {
      en: 'What public transit options connect to Z MUSIC Jakarta?',
      id: 'Apa saja pilihan transportasi umum menuju Z MUSIC Jakarta?'
    },
    answer: {
      en: 'Z MUSIC is conveniently located near major transit corridors: (1) MRT Jakarta: Blok M / Senayan Station is a short 6-minute connection via feeder; (2) TransJakarta: Stop directly at "Soundwave Park" bus stop (Corridor 1 & 13) only 120 meters from our main gate; (3) Ride-Hailing: Designated Grab and Gojek pickup/drop-off shelters are located at Gate 1.',
      id: 'Z MUSIC berlokasi strategis dekat transportasi massal: (1) MRT Jakarta: Stasiun Blok M / Senayan berjarak 6 menit dengan shuttle/ojek; (2) TransJakarta: Halte "Soundwave Park" (Koridor 1 & 13) hanya berjarak 120 meter dari gerbang utama; (3) Taksi Online: Tersedia area penurunan dan penjemputan khusus Grab & Gojek di Gerbang 1.'
    },
    badge: {
      en: 'TRANSIT & MRT',
      id: 'TRANSIT & MRT'
    }
  },

  // Photo & Video Recording Policies
  {
    id: 'faq-5',
    category: 'recording',
    question: {
      en: 'What is the photo and video recording policy for concerts?',
      id: 'Bagaimana kebijakan membawa kamera dan perekaman video konser?'
    },
    answer: {
      en: 'Smartphone photography and short video clips for personal, non-commercial use are permitted and encouraged! However, professional cameras (DSLRs, mirrorless bodies with detachable lenses, cinema cameras, external microphones, and audio field recorders) require an official Z MUSIC Press Pass credential issued at least 48 hours prior to showtime.',
      id: 'Foto dan rekaman video pendek menggunakan smartphone untuk keperluan pribadi diperbolehkan! Namun, kamera profesional (DSLR, mirrorless dengan lensa lepas-pasang, kamera bioskop, mikrofon eksternal, dan perekam audio profesional) memerlukan ID Pers resmi Z MUSIC yang diajukan minimal 48 jam sebelum jadwal konser.'
    },
    badge: {
      en: 'CAMERA POLICY',
      id: 'ATURAN KAMERA'
    }
  },
  {
    id: 'faq-6',
    category: 'recording',
    question: {
      en: 'Are selfie sticks, tripods, or flash photography allowed?',
      id: 'Bolehkah membawa tongsis, tripod, atau menggunakan lampu flash?'
    },
    answer: {
      en: 'No. To ensure optimal sightlines and performer focus, selfie sticks, monopods, tripods, flash photography, and laser pointers are strictly prohibited. Handheld mobile phones held at head-height are welcome. Select headline artists may request "phone-free acoustic songs" — our hosts will notify you before the performance begins.',
      id: 'Tidak diperbolehkan. Demi kenyamanan pandangan penonton lain dan fokus musisi di panggung, penggunaan tongsis, monopod, tripod, lampu flash, dan sinar laser dilarang keras. Penonton dapat memegang ponsel setinggi kepala. Beberapa artis dapat meminta momen lagu akustik tanpa ponsel.'
    },
    badge: {
      en: 'PROHIBITED GEAR',
      id: 'PERALATAN DILARANG'
    }
  },

  // Entry & Tickets
  {
    id: 'faq-7',
    category: 'entry',
    question: {
      en: 'What bag sizes and items are prohibited at entry?',
      id: 'Berapa ukuran tas yang diperbolehkan dan barang apa saja yang dilarang?'
    },
    answer: {
      en: 'Small bags, clutches, and clear backpacks up to 12" x 12" x 6" (30cm x 30cm x 15cm) are permitted and subject to physical and magnetometer inspection. Large backpacks, luggage, outside food/alcohol, sharp objects, and weapons are strictly prohibited. A secure coat check is available in the lobby for Rp 15,000 ($1 USD) per item.',
      id: 'Tas kecil, tas selempang, dan ransel transparan dengan ukuran maksimal 30cm x 30cm x 15cm diperbolehkan dan wajib diperiksa petugas. Ransel besar, koper, makanan/minuman dari luar, benda tajam, dan senjata dilarang keras. Penitipan barang (coat check) tersedia di lobi seharga Rp 15.000 per barang.'
    },
    badge: {
      en: 'DOOR SECURITY',
      id: 'KEAMANAN PINTU'
    }
  },
  {
    id: 'faq-8',
    category: 'entry',
    question: {
      en: 'How does the Digital Pass and mobile ticket scanning work?',
      id: 'Bagaimana cara kerja Tiket Digital Pass dan pemindaian di pintu masuk?'
    },
    answer: {
      en: 'After purchasing on our box office modal, your unique Digital Pass is generated with a dynamic QR code. Present this QR code on your phone (or saved in Apple Wallet / Google Wallet) at the entry turnstile. Our scanners will confirm your name, gate assignment, and VIP/GA tier in less than 2 seconds.',
      id: 'Setelah melakukan pemesanan tiket, Tiket Digital Pass dengan kode QR unik Anda akan langsung diterbitkan. Cukup tunjukkan kode QR di layar ponsel Anda (atau simpan di Apple Wallet / Google Wallet) pada mesin pemindai gerbang masuk. Petugas akan memverifikasi nama, pintu gerbang, dan kategori tiket dalam 2 detik.'
    },
    badge: {
      en: 'DIGITAL PASS',
      id: 'PASS DIGITAL'
    }
  },

  // Bar & Amenities
  {
    id: 'faq-9',
    category: 'bar',
    question: {
      en: 'What are the age restrictions for shows and alcohol consumption?',
      id: 'Berapa batas usia penonton dan aturan konsumsi minuman beralkohol?'
    },
    answer: {
      en: 'Most concerts at Z MUSIC are All-Ages (unless explicitly designated 18+ or 21+ on the show calendar). However, alcohol service at our bars is strictly restricted to patrons aged 21 and above. A valid government photo ID (KTP, SIM, or Passport) is required to receive a 21+ wristband at the door. Non-alcoholic mocktails, cold brews, and sodas are available for all patrons.',
      id: 'Sebagian besar konser di Z MUSIC dapat dihadiri Semua Umur (kecuali tertera khusus 18+ atau 21+ pada jadwal). Namun, pemesanan minuman beralkohol hanya diperuntukkan bagi pengunjung berusia 21 tahun ke atas. Wajib menunjukkan kartu identitas resmi (KTP, SIM, atau Paspor) untuk mendapatkan gelang khusus 21+. Mocktail non-alkohol, kopi cold brew, dan soda tersedia untuk semua usia.'
    },
    badge: {
      en: 'BAR & WRISTBAND',
      id: 'GELANG & BAR'
    }
  },
  {
    id: 'faq-10',
    category: 'bar',
    question: {
      en: 'Can I bring outside food or drinks into the venue?',
      id: 'Bolehkah membawa makanan atau minuman dari luar ke dalam venue?'
    },
    answer: {
      en: 'Outside food, beverages, glass containers, and alcohol are strictly prohibited inside Z MUSIC. Free filtered water refill stations are located on both sides of the main floor bar. Reusable empty plastic or metal water bottles (up to 750ml) are permitted.',
      id: 'Makanan dan minuman dari luar, botol kaca, serta alkohol dari luar tidak diperbolehkan masuk ke dalam Z MUSIC. Stasiun pengisian air minum gratis tersedia di kedua sisi bar lantai utama. Botol minum (tumbler) kosong diperbolehkan dibawa masuk (maksimal 750ml).'
    },
    badge: {
      en: 'AMENITIES',
      id: 'FASILITAS'
    }
  }
];

export const FAQSection: React.FC = () => {
  const { language, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    'faq-1': true,
    'faq-3': true,
    'faq-5': true
  });

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const categories = [
    { id: 'all', label: t('faq_all'), icon: HelpCircle },
    { id: 'accessibility', label: t('faq_accessibility'), icon: Accessibility },
    { id: 'parking', label: t('faq_parking'), icon: Car },
    { id: 'recording', label: t('faq_photo'), icon: Camera },
    { id: 'entry', label: t('faq_tickets'), icon: Ticket },
    { id: 'bar', label: t('faq_bar'), icon: Wine }
  ];

  const filteredFAQs = useMemo(() => {
    return FAQ_DATA.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const questionText = item.question[language].toLowerCase();
      const answerText = item.answer[language].toLowerCase();
      const badgeText = item.badge ? item.badge[language].toLowerCase() : '';

      const matchesSearch =
        !q ||
        questionText.includes(q) ||
        answerText.includes(q) ||
        badgeText.includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery, language]);

  return (
    <section id="faq" className="py-20 sm:py-28 bg-black text-white relative border-b border-neutral-900 select-none">
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/3 left-0 w-96 h-96 bg-amber-500/20 rounded-full blur-[160px]" />
        <div className="absolute bottom-10 right-0 w-96 h-96 bg-teal-500/15 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-neutral-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-500 mb-2">
              <span className="w-1.5 h-1.5 bg-amber-500 inline-block" />
              <span>{t('faq_kicker')}</span>
            </div>
            <h2
              className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white"
              style={{ fontFamily: 'var(--font-display, "Barlow Condensed", sans-serif)' }}
            >
              {t('faq_title')}
            </h2>
            <p className="mt-3 text-neutral-400 text-sm sm:text-base max-w-2xl leading-relaxed">
              {t('faq_subtitle')}
            </p>
          </div>

          {/* Quick Stats Badge */}
          <div className="flex items-center gap-3 bg-neutral-950 border border-neutral-800 p-3 self-start md:self-auto shrink-0">
            <div className="w-10 h-10 bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div className="text-left font-mono">
              <span className="text-[10px] text-neutral-500 block uppercase">
                {language === 'id' ? 'Layanan Bantuan' : 'Box Office Assistance'}
              </span>
              <span className="text-sm font-bold text-white">concierge@zmusic.id</span>
            </div>
          </div>
        </div>

        {/* Search Bar Bar */}
        <div className="mb-8 border border-neutral-800 bg-neutral-950/80 p-4 sm:p-5 relative shadow-xl">
          <div className="relative flex items-center">
            <Search className="w-5 h-5 text-amber-500 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder={t('faq_search_placeholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black border border-neutral-800 focus:border-amber-500 text-white placeholder-neutral-500 text-sm sm:text-base pl-12 pr-28 py-3.5 outline-none font-sans transition-all focus:ring-1 focus:ring-amber-500/50"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-neutral-900 hover:bg-neutral-800 text-xs font-mono text-neutral-300 hover:text-white border border-neutral-800 transition-colors cursor-pointer"
              >
                {language === 'id' ? 'Hapus' : 'Clear'} ✕
              </button>
            )}
          </div>

          {/* Filter Categories Chips */}
          <div className="mt-4 pt-3 border-t border-neutral-900 flex flex-wrap items-center gap-2 text-xs font-mono">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1.5 uppercase font-mono tracking-wider transition-all cursor-pointer flex items-center gap-1.5 border ${
                    isActive
                      ? 'bg-amber-500 text-black border-amber-500 font-bold'
                      : 'bg-black text-neutral-400 hover:text-white border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {filteredFAQs.length === 0 ? (
            <div className="py-16 text-center border border-neutral-800 bg-neutral-950 p-8">
              <HelpCircle className="w-10 h-10 text-neutral-600 mx-auto mb-3" />
              <p className="text-base text-neutral-300 font-semibold">
                {language === 'id' ? 'Tidak ada panduan yang cocok.' : 'No FAQ items matched your query.'}
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
                className="mt-3 px-4 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-amber-500 text-xs font-mono uppercase tracking-wider border border-neutral-800 cursor-pointer"
              >
                {language === 'id' ? 'Reset Pencarian' : 'Reset Search'}
              </button>
            </div>
          ) : (
            filteredFAQs.map((item) => {
              const isOpen = !!openItems[item.id];
              return (
                <div
                  key={item.id}
                  className={`border transition-all duration-200 ${
                    isOpen
                      ? 'border-neutral-700 bg-neutral-950/90'
                      : 'border-neutral-800/80 bg-neutral-950/40 hover:border-neutral-700'
                  }`}
                >
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="w-full px-5 sm:px-6 py-4.5 flex items-center justify-between gap-4 text-left cursor-pointer focus:outline-none"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {item.badge && (
                        <span className="hidden sm:inline-block px-2 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[10px] font-mono tracking-wider shrink-0 uppercase font-semibold">
                          {item.badge[language]}
                        </span>
                      )}
                      <h4
                        className={`text-base sm:text-lg font-bold uppercase tracking-tight transition-colors ${
                          isOpen ? 'text-amber-400' : 'text-neutral-100'
                        }`}
                        style={{ fontFamily: 'var(--font-display, "Barlow Condensed", sans-serif)' }}
                      >
                        {item.question[language]}
                      </h4>
                    </div>

                    <div
                      className={`w-7 h-7 rounded-none bg-neutral-900 border border-neutral-800 flex items-center justify-center shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 bg-amber-500 text-black border-amber-500' : 'text-neutral-400'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4 stroke-[2.5]" />
                    </div>
                  </button>

                  {/* Accordion Content */}
                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-5 pt-1 border-t border-neutral-900/60 text-neutral-300 text-sm sm:text-base leading-relaxed animate-in fade-in-50 duration-150">
                      <p>{item.answer[language]}</p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Contact Concierge Support Card */}
        <div className="mt-12 bg-neutral-950 border border-neutral-800 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-24 h-1 bg-amber-500" />
          <div>
            <div className="text-xs font-mono text-amber-500 uppercase tracking-widest mb-1 font-bold">
              {language === 'id' ? 'BUTUH BANTUAN KHUSUS?' : 'STILL HAVE QUESTIONS?'}
            </div>
            <h3
              className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight"
              style={{ fontFamily: 'var(--font-display, "Barlow Condensed", sans-serif)' }}
            >
              {language === 'id' ? 'HUBUNGI TIM CONCIERGE KAMI' : 'CONTACT VENUE GUEST SERVICES'}
            </h3>
            <p className="text-neutral-400 text-xs sm:text-sm mt-1 max-w-xl">
              {language === 'id'
                ? 'Untuk pengaturan akses kursi roda, akreditasi pers konser, atau pertanyaan khusus, tim kami siap membantu Anda.'
                : 'For ADA wheelchair advance platform reservations, press credentials, or lost items, our team responds within 24 hours.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="mailto:concierge@zmusic.id"
              className="px-4 py-2.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 hover:border-amber-500 text-neutral-200 text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-colors"
            >
              <Mail className="w-4 h-4 text-amber-500" />
              <span>concierge@zmusic.id</span>
            </a>
            <a
              href="tel:+62215557890"
              className="px-4 py-2.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 hover:border-amber-500 text-neutral-200 text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-colors"
            >
              <Phone className="w-4 h-4 text-amber-500" />
              <span>+62 21 555 7890</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
