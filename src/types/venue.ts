export interface Show {
  id: string;
  date: string; // e.g. "OCT 03"
  dayOfWeek: string; // e.g. "FRI"
  fullDate: string; // e.g. "Friday, October 3, 2026"
  artist: string;
  support?: string;
  song?: string;
  genre: string;
  doorsTime: string; // e.g. "7:00 PM"
  showTime: string; // e.g. "8:30 PM"
  priceAdvance: number;
  priceDoor: number;
  vipPrice: number;
  ageRestriction: 'All-Ages' | '18+' | '21+';
  status: 'available' | 'low-tickets' | 'sold-out';
  description: string;
  imageTheme: string;
  spotifyArtistId?: string;
}

export interface PastArtist {
  id: string;
  name: string;
  year: string;
  genres: string[];
  notableTrack: string;
  quote?: string;
}

export interface DrinkItem {
  id: string;
  name: string;
  category: 'cocktail' | 'draft' | 'na';
  tagline: string;
  ingredients: string;
  price: string;
  abv?: string;
  isSignature?: boolean;
}

export interface VenueTile {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  specs: string[];
  gradient: string;
  badge: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  photographer: string;
  aspect: string;
  colorScheme: string;
}
