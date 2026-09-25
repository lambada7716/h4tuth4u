import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { UpcomingShows } from './components/UpcomingShows';
import { FeaturedArtist } from './components/FeaturedArtist';
import { AboutSection } from './components/AboutSection';
import { VenueSpecs } from './components/VenueSpecs';
import { BarSection } from './components/BarSection';
import { PrivateEvents } from './components/PrivateEvents';
import { FAQSection } from './components/FAQSection';
import { GallerySection } from './components/GallerySection';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';
import { TicketModal } from './components/TicketModal';
import { FullCalendarModal } from './components/FullCalendarModal';
import { MobileStickyBar } from './components/MobileStickyBar';
import { AgeVerificationModal } from './components/AgeVerificationModal';
import { Show, PastArtist } from './types/venue';
import { CurrencyProvider } from './context/CurrencyContext';
import { LanguageProvider } from './context/LanguageContext';

export default function App() {
  const [ticketModalOpen, setTicketModalOpen] = useState(false);
  const [calendarModalOpen, setCalendarModalOpen] = useState(false);
  const [policyModalOpen, setPolicyModalOpen] = useState(false);
  const [selectedShowForTickets, setSelectedShowForTickets] = useState<Show | null>(null);

  const handleOpenTickets = (show?: Show) => {
    setSelectedShowForTickets(show || null);
    setTicketModalOpen(true);
  };

  const handleNavigateSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <LanguageProvider>
      <CurrencyProvider>
        <div className="min-h-screen bg-black text-neutral-100 flex flex-col font-sans selection:bg-amber-500 selection:text-black">
        {/* 1. True Black Navbar */}
        <Navbar
          onOpenTickets={() => handleOpenTickets()}
          onNavigateSection={handleNavigateSection}
        />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 2. Full-Height Dark Hero with 12s Zoom Loop & Live Ticker */}
        <Hero
          onSeeAllShows={() => handleNavigateSection('shows')}
          onOpenTickets={() => handleOpenTickets()}
        />

        {/* 3. Upcoming Shows (Table format with amber horizontal hover reveal) */}
        <UpcomingShows
          onSelectShow={(show) => handleOpenTickets(show)}
          onOpenCalendar={() => setCalendarModalOpen(true)}
        />

        {/* 4. Featured Artist Section (Real-time live countdown timer & visual overlay) */}
        <FeaturedArtist
          onGetTickets={(show) => handleOpenTickets(show)}
        />

        {/* 5 & 6. About Section (Amber stats, venue story, and horizontal scroll of 8 past artist cards) */}
        <AboutSection />

        {/* 7. Venue Specs Section (4 photo tiles & detailed technical breakdown) */}
        <VenueSpecs />

        {/* 8. Bar Section "Z MUSIC POURS" (Craft cocktails, local drafts, signature Z MUSIC Sour highlighted) */}
        <BarSection />

        {/* 9. Private Events Section (Buyouts, album releases & inquiry form) */}
        <PrivateEvents />

        {/* 10. Venue FAQ Section (Accessibility, Jakarta parking, transit, recording policies, tickets) */}
        <FAQSection />

        {/* 11. 6-Photo Moody Gallery Grid with Lightbox */}
        <GallerySection />

        {/* 11. Email Newsletter Signup with Amber CTA */}
        <Newsletter />
      </main>

      {/* 12. True Black Footer */}
      <Footer
        onNavigateSection={handleNavigateSection}
        onOpenPolicies={() => setPolicyModalOpen(true)}
      />

      {/* Mobile Sticky "Buy Tickets" Bottom Bar (< md screens) */}
      <MobileStickyBar
        onOpenTickets={() => handleOpenTickets()}
        onSeeAllShows={() => handleNavigateSection('shows')}
      />

      {/* Interactive Ticket Checkout Modal */}
      {ticketModalOpen && (
        <TicketModal
          initialShow={selectedShowForTickets}
          onClose={() => setTicketModalOpen(false)}
        />
      )}

      {/* Full Upcoming Calendar Modal */}
      {calendarModalOpen && (
        <FullCalendarModal
          onClose={() => setCalendarModalOpen(false)}
          onSelectShow={(show) => handleOpenTickets(show)}
        />
      )}

      {/* Floating Age Verification & Venue Policy Modal (Triggers on first visit or via Footer) */}
      <AgeVerificationModal
        forceOpen={policyModalOpen}
        onClose={() => setPolicyModalOpen(false)}
      />
      </div>
      </CurrencyProvider>
    </LanguageProvider>
  );
}
