import React, { createContext, useContext, useState, useEffect } from 'react';

export type LanguageType = 'en' | 'id';

export interface Translations {
  // Navigation
  nav_shows: string;
  nav_venue: string;
  nav_drinks: string;
  nav_faq: string;
  nav_private: string;
  nav_tickets: string;

  // Hero
  hero_kicker: string;
  hero_title_1: string;
  hero_title_2: string;
  hero_subtitle: string;
  hero_cta_tickets: string;
  hero_cta_venue: string;
  hero_capacity: string;
  hero_sound: string;

  // Upcoming Shows
  shows_kicker: string;
  shows_title: string;
  shows_search_placeholder: string;
  shows_filter_label: string;
  shows_all: string;
  shows_weekend: string;
  shows_all_ages: string;
  shows_low_tickets: string;
  shows_calendar_btn: string;
  shows_found: string;
  shows_quick_artists: string;
  shows_no_results: string;
  shows_reset: string;

  // Featured Artist
  featured_kicker: string;
  featured_remaining: string;
  featured_doors_timer: string;
  featured_days: string;
  featured_hours: string;
  featured_minutes: string;
  featured_seconds: string;
  featured_get_tickets: string;
  featured_listen_spotify: string;
  featured_now_playing: string;
  featured_play_preview: string;

  // FAQ
  faq_kicker: string;
  faq_title: string;
  faq_subtitle: string;
  faq_search_placeholder: string;
  faq_all: string;
  faq_accessibility: string;
  faq_parking: string;
  faq_photo: string;
  faq_tickets: string;
  faq_bar: string;

  // Digital Pass / Ticket
  ticket_box_office: string;
  ticket_select_tickets: string;
  ticket_order_confirmed: string;
  ticket_going_to_show: string;
  ticket_digital_pass_ready: string;
  ticket_download_pass: string;
  ticket_save_wallet: string;
  ticket_simulate_scan: string;
  ticket_entry_granted: string;

  // Footer
  footer_tagline: string;
  footer_rights: string;
}

export const TRANSLATIONS: Record<LanguageType, Translations> = {
  en: {
    nav_shows: 'Shows',
    nav_venue: 'The Venue',
    nav_drinks: 'Drinks & Bar',
    nav_faq: 'FAQ',
    nav_private: 'Private Events',
    nav_tickets: 'Buy Tickets',

    hero_kicker: 'JAKARTA INDEPENDENT MUSIC HALL',
    hero_title_1: 'RAW SOUND.',
    hero_title_2: 'INTIMATE ENERGY.',
    hero_subtitle: 'A purpose-built 650-capacity independent live room in Jakarta featuring analog-tuned acoustic treatments, d&b audiotechnik line arrays, and zero-barrier artist sightlines.',
    hero_cta_tickets: 'View Upcoming Shows',
    hero_cta_venue: 'Explore The Venue',
    hero_capacity: '650 CAPACITY',
    hero_sound: 'd&b AUDIOTECHNIK SOUND',

    shows_kicker: 'LIVE AT Z MUSIC JAKARTA',
    shows_title: 'UPCOMING SHOWS',
    shows_search_placeholder: 'Search schedule by artist name (e.g. Raisa, Bernadya, Mahalini, Tulus, Rossa...)',
    shows_filter_label: 'Schedule Filter:',
    shows_all: 'All Shows',
    shows_weekend: 'Weekend (Fri–Sun)',
    shows_all_ages: 'All-Ages',
    shows_low_tickets: 'Low Tickets',
    shows_calendar_btn: 'View Full Calendar',
    shows_found: 'shows found',
    shows_quick_artists: 'Quick Artists:',
    shows_no_results: 'No shows found matching your criteria.',
    shows_reset: 'Reset search',

    featured_kicker: 'FEATURED HEADLINER SHOWCASE',
    featured_remaining: 'ONLY 64 TICKETS REMAIN',
    featured_doors_timer: 'TIME UNTIL DOORS OPEN',
    featured_days: 'DAYS',
    featured_hours: 'HOURS',
    featured_minutes: 'MINUTES',
    featured_seconds: 'SECONDS',
    featured_get_tickets: 'Get Tickets',
    featured_listen_spotify: 'Listen on Spotify',
    featured_now_playing: 'Now Playing Preview',
    featured_play_preview: 'Play Audio Preview',

    faq_kicker: 'VENUE GUIDE & POLICIES',
    faq_title: 'FREQUENTLY ASKED QUESTIONS',
    faq_subtitle: 'Everything you need to know about venue accessibility, Jakarta parking/transit, recording rules, tickets, and door policies.',
    faq_search_placeholder: 'Search FAQ (e.g. wheelchair, valet parking, camera lenses, MRT)...',
    faq_all: 'All FAQs',
    faq_accessibility: 'Accessibility',
    faq_parking: 'Parking & Transit',
    faq_photo: 'Photo & Video',
    faq_tickets: 'Entry & Tickets',
    faq_bar: 'Bar & Amenities',

    ticket_box_office: 'OFFICIAL VENUE BOX OFFICE',
    ticket_select_tickets: 'SELECT TICKETS',
    ticket_order_confirmed: 'ORDER CONFIRMED · OFFICIAL DIGITAL PASS READY',
    ticket_going_to_show: "YOU'RE GOING TO THE SHOW!",
    ticket_digital_pass_ready: 'DIGITAL ENTRY PASS',
    ticket_download_pass: 'Download Pass',
    ticket_save_wallet: 'Save to Wallet',
    ticket_simulate_scan: 'Simulate Door Scan',
    ticket_entry_granted: 'ENTRY GRANTED!',

    footer_tagline: 'An uncompromising live room built by music lovers for Jakarta.',
    footer_rights: 'All rights reserved.'
  },

  id: {
    nav_shows: 'Jadwal Konser',
    nav_venue: 'Tentang Arena',
    nav_drinks: 'Menu Bar',
    nav_faq: 'Tanya Jawab (FAQ)',
    nav_private: 'Sewa Tempat',
    nav_tickets: 'Beli Tiket',

    hero_kicker: 'AULA MUSIK INDEPENDEN JAKARTA',
    hero_title_1: 'SUARA OTENTIK.',
    hero_title_2: 'ENERGI INTIM.',
    hero_subtitle: 'Venue konser independen berkapasitas 650 orang di Jakarta dengan tata suara akustik analog, tata suara d&b audiotechnik, dan sudut pandang panggung tanpa penghalang.',
    hero_cta_tickets: 'Lihat Jadwal Konser',
    hero_cta_venue: 'Jelajahi Venue',
    hero_capacity: 'KAPASITAS 650 PENONTON',
    hero_sound: 'SISTEM AUDIO d&b AUDIOTECHNIK',

    shows_kicker: 'LIVE DI Z MUSIC JAKARTA',
    shows_title: 'JADWAL KONSER MENDATANG',
    shows_search_placeholder: 'Cari jadwal berdasarkan nama artis (contoh: Raisa, Bernadya, Mahalini, Tulus, Rossa...)',
    shows_filter_label: 'Filter Jadwal:',
    shows_all: 'Semua Konser',
    shows_weekend: 'Akhir Pekan (Jum–Min)',
    shows_all_ages: 'Semua Umur',
    shows_low_tickets: 'Tiket Terbatas',
    shows_calendar_btn: 'Buka Kalender Lengkap',
    shows_found: 'konser ditemukan',
    shows_quick_artists: 'Artis Populer:',
    shows_no_results: 'Tidak ada jadwal konser yang cocok dengan pencarian Anda.',
    shows_reset: 'Reset pencarian',

    featured_kicker: 'SHOWCASE HEADLINER UTAMA',
    featured_remaining: 'TERSISA 64 TIKET LAGI',
    featured_doors_timer: 'WAKTU MENUJU PINTU DIBUKA',
    featured_days: 'HARI',
    featured_hours: 'JAM',
    featured_minutes: 'MENIT',
    featured_seconds: 'DETIK',
    featured_get_tickets: 'Beli Tiket Sekarang',
    featured_listen_spotify: 'Dengarkan di Spotify',
    featured_now_playing: 'Sedang Memutar Preview',
    featured_play_preview: 'Putar Sampel Lagu',

    faq_kicker: 'PANDUAN & ATURAN VENUE',
    faq_title: 'PERTANYAAN UMUM (FAQ)',
    faq_subtitle: 'Segala hal yang perlu Anda ketahui mengenai aksesibilitas disabilitas, parkir/transit Jakarta, aturan kamera, tiket, dan pintu masuk.',
    faq_search_placeholder: 'Cari panduan (contoh: kursi roda, parkir valet, kamera, MRT)...',
    faq_all: 'Semua FAQ',
    faq_accessibility: 'Aksesibilitas',
    faq_parking: 'Parkir & Transportasi',
    faq_photo: 'Foto & Kamera',
    faq_tickets: 'Tiket & Masuk',
    faq_bar: 'Bar & Fasilitas',

    ticket_box_office: 'BOX OFFICE RESMI VENUE',
    ticket_select_tickets: 'PILIH TIKET KONSER',
    ticket_order_confirmed: 'PESANAN TERKONFIRMASI · PASS DIGITAL RESMI SIAP',
    ticket_going_to_show: 'SELAMAT, TIKET ANDA SIAP!',
    ticket_digital_pass_ready: 'TIKET MASUK DIGITAL',
    ticket_download_pass: 'Unduh Tiket',
    ticket_save_wallet: 'Simpan ke Wallet',
    ticket_simulate_scan: 'Simulasi Pindai Pintu',
    ticket_entry_granted: 'AKSES DIIZINKAN!',

    footer_tagline: 'Ruang konser tanpa kompromi yang dibangun pecinta musik untuk Jakarta.',
    footer_rights: 'Hak cipta dilindungi undang-undang.'
  }
};

interface LanguageContextType {
  language: LanguageType;
  setLanguage: (lang: LanguageType) => void;
  toggleLanguage: () => void;
  changeLanguage: (lang: LanguageType) => void;
  t: (key: keyof Translations) => string;
  translations: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageType>('id'); // Default to Indonesian for Jakarta venue or user choice

  const changeLanguage = (lang: LanguageType) => {
    setLanguageState(lang);
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
    }
  };

  const setLanguage = (lang: LanguageType) => {
    changeLanguage(lang);
  };

  const toggleLanguage = () => {
    changeLanguage(language === 'en' ? 'id' : 'en');
  };

  const t = (key: keyof Translations): string => {
    return TRANSLATIONS[language][key] || TRANSLATIONS.en[key] || '';
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        changeLanguage,
        t,
        translations: TRANSLATIONS[language]
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
