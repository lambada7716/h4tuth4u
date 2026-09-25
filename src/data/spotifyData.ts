export interface SpotifyTrack {
  id: string;
  title: string;
  album: string;
  plays: string;
  duration: string;
  durationSec: number;
  previewUrl?: string;
  noteFrequency?: number[];
  isExplicit?: boolean;
}

export interface SpotifyArtistProfile {
  id: string;
  name: string;
  verified: boolean;
  genres: string[];
  monthlyListeners: string;
  followers: string;
  headerTag: string;
  bio: string;
  colorTheme: string;
  tracks: SpotifyTrack[];
}

export const SPOTIFY_ARTISTS: Record<string, SpotifyArtistProfile> = {
  // RAISA
  '0hEurMDQu99nJRq8pTxO14': {
    id: '0hEurMDQu99nJRq8pTxO14',
    name: 'RAISA',
    verified: true,
    genres: ['Indonesian Pop', 'R&B', 'Soul'],
    monthlyListeners: '6,842,190',
    followers: '8,240,110',
    headerTag: 'TOP 5 INDONESIAN POP ARTIST',
    bio: 'Award-winning Indonesian singer-songwriter known for soulful vocal agility, intimate acoustic textures, and timeless pop ballads.',
    colorTheme: 'from-amber-600/30 to-teal-900/40',
    tracks: [
      {
        id: 'raisa-1',
        title: 'Kali Kedua',
        album: 'Handmade',
        plays: '198,420,114',
        duration: '3:58',
        durationSec: 238,
        noteFrequency: [261.63, 329.63, 392.00, 523.25]
      },
      {
        id: 'raisa-2',
        title: 'Jatuh Hati',
        album: 'Handmade',
        plays: '154,821,390',
        duration: '3:45',
        durationSec: 225,
        noteFrequency: [293.66, 369.99, 440.00, 587.33]
      },
      {
        id: 'raisa-3',
        title: 'Mantan Terindah',
        album: 'Heart to Heart',
        plays: '142,670,450',
        duration: '4:12',
        durationSec: 252,
        noteFrequency: [329.63, 392.00, 493.88, 659.25]
      },
      {
        id: 'raisa-4',
        title: 'Serba Salah',
        album: 'Raisa',
        plays: '118,910,230',
        duration: '4:02',
        durationSec: 242,
        noteFrequency: [349.23, 440.00, 523.25, 698.46]
      },
      {
        id: 'raisa-5',
        title: 'Bahasa Kalbu (Live with Andi Rianto)',
        album: 'Bahasa Kalbu (Single)',
        plays: '95,340,120',
        duration: '4:35',
        durationSec: 275,
        noteFrequency: [392.00, 493.88, 587.33, 783.99]
      }
    ]
  },

  // BERNADYA
  '318a4qNcvYw6nS9p6h21mC': {
    id: '318a4qNcvYw6nS9p6h21mC',
    name: 'BERNADYA',
    verified: true,
    genres: ['Indie Pop', 'Bedroom Pop', 'Acoustic Folk'],
    monthlyListeners: '13,290,440',
    followers: '4,890,200',
    headerTag: '#1 MOST STREAMED FEMALE ARTIST IN INDONESIA',
    bio: 'Chart-topping storyteller captivating Southeast Asia with raw melancholy, poignant lyricism, and modern acoustic arrangements.',
    colorTheme: 'from-blue-900/40 to-neutral-900',
    tracks: [
      {
        id: 'bernadya-1',
        title: 'Satu Bulan',
        album: 'Sialnya, Hidup Harus Tetap Berjalan',
        plays: '284,510,780',
        duration: '3:15',
        durationSec: 195,
        noteFrequency: [220.00, 277.18, 329.63, 440.00]
      },
      {
        id: 'bernadya-2',
        title: 'Kata Mereka Ini Berlebihan',
        album: 'Sialnya, Hidup Harus Tetap Berjalan',
        plays: '221,430,900',
        duration: '3:40',
        durationSec: 220,
        noteFrequency: [246.94, 311.13, 369.99, 493.88]
      },
      {
        id: 'bernadya-3',
        title: 'Kini Mereka Tahu',
        album: 'Sialnya, Hidup Harus Tetap Berjalan',
        plays: '189,320,150',
        duration: '4:06',
        durationSec: 246,
        noteFrequency: [261.63, 329.63, 392.00, 523.25]
      },
      {
        id: 'bernadya-4',
        title: 'Apa Mungkin',
        album: 'Terlintas',
        plays: '165,120,800',
        duration: '3:22',
        durationSec: 202,
        noteFrequency: [293.66, 369.99, 440.00, 587.33]
      },
      {
        id: 'bernadya-5',
        title: 'Untungnya, Hidup Harus Tetap Berjalan',
        album: 'Sialnya, Hidup Harus Tetap Berjalan',
        plays: '143,210,400',
        duration: '3:34',
        durationSec: 214,
        noteFrequency: [329.63, 415.30, 493.88, 659.25]
      }
    ]
  },

  // MAHALINI
  '776P86JpM5QcfL2Y7G4d8n': {
    id: '776P86JpM5QcfL2Y7G4d8n',
    name: 'MAHALINI',
    verified: true,
    genres: ['Indonesian Pop', 'Dramatic Ballad', 'Contemporary Pop'],
    monthlyListeners: '10,450,110',
    followers: '6,120,400',
    headerTag: 'MULTI-PLATINUM VOCAL POWERHOUSE',
    bio: 'One of the most expressive voices of modern Indonesian music, renowned for heart-wrenching emotional dynamics and viral anthems.',
    colorTheme: 'from-amber-900/30 to-purple-950/40',
    tracks: [
      {
        id: 'mahalini-1',
        title: 'Sial',
        album: 'FÁBULA',
        plays: '345,920,410',
        duration: '4:03',
        durationSec: 243,
        noteFrequency: [220.00, 261.63, 329.63, 440.00]
      },
      {
        id: 'mahalini-2',
        title: 'Sisa Rasa',
        album: 'FÁBULA',
        plays: '310,120,680',
        duration: '4:14',
        durationSec: 254,
        noteFrequency: [246.94, 293.66, 369.99, 493.88]
      },
      {
        id: 'mahalini-3',
        title: 'Kisah Sempurna',
        album: 'FÁBULA',
        plays: '215,840,190',
        duration: '4:36',
        durationSec: 276,
        noteFrequency: [261.63, 329.63, 392.00, 523.25]
      },
      {
        id: 'mahalini-4',
        title: 'Melawan Restu',
        album: 'Melawan Restu (Single)',
        plays: '198,240,110',
        duration: '3:39',
        durationSec: 219,
        noteFrequency: [293.66, 349.23, 440.00, 587.33]
      },
      {
        id: 'mahalini-5',
        title: 'Bohongi Hati',
        album: 'FÁBULA',
        plays: '142,760,200',
        duration: '4:21',
        durationSec: 261,
        noteFrequency: [329.63, 392.00, 493.88, 659.25]
      }
    ]
  },

  // TULUS
  '2auA2ZpknxP1fO2Wv2mX3M': {
    id: '2auA2ZpknxP1fO2Wv2mX3M',
    name: 'TULUS',
    verified: true,
    genres: ['Jazz Pop', 'Indie Soul', 'Acoustic'],
    monthlyListeners: '9,120,800',
    followers: '9,450,600',
    headerTag: 'INDONESIAN LEGENDARY SINGER-SONGWRITER',
    bio: 'Poetic maestro celebrated for rich baritone vocals, poignant brass arrangements, and iconic cultural records.',
    colorTheme: 'from-amber-700/20 to-neutral-900',
    tracks: [
      {
        id: 'tulus-1',
        title: 'Hati-Hati di Jalan',
        album: 'Manusia',
        plays: '412,300,940',
        duration: '4:02',
        durationSec: 242,
        noteFrequency: [261.63, 329.63, 392.00, 523.25]
      },
      {
        id: 'tulus-2',
        title: 'Monokrom',
        album: 'Monokrom',
        plays: '320,450,210',
        duration: '3:34',
        durationSec: 214,
        noteFrequency: [293.66, 369.99, 440.00, 587.33]
      },
      {
        id: 'tulus-3',
        title: 'Diri',
        album: 'Manusia',
        plays: '228,910,400',
        duration: '3:24',
        durationSec: 204,
        noteFrequency: [329.63, 392.00, 493.88, 659.25]
      },
      {
        id: 'tulus-4',
        title: 'Pamit',
        album: 'Monokrom',
        plays: '194,520,300',
        duration: '3:53',
        durationSec: 233,
        noteFrequency: [220.00, 277.18, 329.63, 440.00]
      },
      {
        id: 'tulus-5',
        title: 'Sepatu',
        album: 'Gajah',
        plays: '178,140,890',
        duration: '3:40',
        durationSec: 220,
        noteFrequency: [246.94, 311.13, 369.99, 493.88]
      }
    ]
  },

  // ROSSA
  '4tZwfgrHOc3mvqYxwwnaCn': {
    id: '4tZwfgrHOc3mvqYxwwnaCn',
    name: 'ROSSA',
    verified: true,
    genres: ['Pop Diva', 'Indonesian Ballad', 'Soundtrack Legend'],
    monthlyListeners: '5,610,000',
    followers: '5,820,300',
    headerTag: 'QUEEN OF INDONESIAN SOUNDTRACKS',
    bio: 'Legendary Indonesian pop diva with 25+ years of number-one chart toppers, emotional vibrato, and international renown.',
    colorTheme: 'from-rose-900/30 to-neutral-900',
    tracks: [
      {
        id: 'rossa-1',
        title: 'Terlalu Cinta',
        album: 'Yang Terpilih',
        plays: '192,420,500',
        duration: '4:08',
        durationSec: 248,
        noteFrequency: [261.63, 329.63, 392.00, 523.25]
      },
      {
        id: 'rossa-2',
        title: 'Hati Yang Kau Sakiti',
        album: 'Rossa',
        plays: '175,890,200',
        duration: '4:11',
        durationSec: 251,
        noteFrequency: [293.66, 369.99, 440.00, 587.33]
      },
      {
        id: 'rossa-3',
        title: 'Pudar',
        album: 'Kembali',
        plays: '134,120,400',
        duration: '3:10',
        durationSec: 190,
        noteFrequency: [329.63, 392.00, 493.88, 659.25]
      },
      {
        id: 'rossa-4',
        title: 'Ayat-Ayat Cinta',
        album: 'OST Ayat-Ayat Cinta',
        plays: '112,450,300',
        duration: '4:14',
        durationSec: 254,
        noteFrequency: [220.00, 277.18, 329.63, 440.00]
      },
      {
        id: 'rossa-5',
        title: 'Tegar',
        album: 'Tegar',
        plays: '98,720,100',
        duration: '3:50',
        durationSec: 230,
        noteFrequency: [246.94, 311.13, 369.99, 493.88]
      }
    ]
  },

  // CHRISYE
  '4YgX9rZPvGg6X8p5vG9k12': {
    id: '4YgX9rZPvGg6X8p5vG9k12',
    name: 'CHRISYE',
    verified: true,
    genres: ['Classic Indonesian Pop', 'Progressive Pop', 'Evergreen'],
    monthlyListeners: '4,180,900',
    followers: '3,920,400',
    headerTag: 'THE TIMELESS VOICE OF INDONESIA',
    bio: 'Pioneering icon whose smooth falsetto and landmark productions defined the golden era of Indonesian popular music.',
    colorTheme: 'from-amber-600/30 to-amber-950/40',
    tracks: [
      {
        id: 'chrisye-1',
        title: 'Kemesraan',
        album: 'Kemesraan',
        plays: '210,450,800',
        duration: '5:15',
        durationSec: 315,
        noteFrequency: [261.63, 329.63, 392.00, 523.25]
      },
      {
        id: 'chrisye-2',
        title: 'Andai Aku Bisa',
        album: 'Konser Tur 2001',
        plays: '185,210,400',
        duration: '4:42',
        durationSec: 282,
        noteFrequency: [293.66, 369.99, 440.00, 587.33]
      },
      {
        id: 'chrisye-3',
        title: 'Kala Cinta Menggoda',
        album: 'Kala Cinta Menggoda',
        plays: '162,890,300',
        duration: '5:32',
        durationSec: 332,
        noteFrequency: [329.63, 392.00, 493.88, 659.25]
      },
      {
        id: 'chrisye-4',
        title: 'Pergilah Kasih',
        album: 'Pergilah Kasih',
        plays: '148,720,100',
        duration: '4:46',
        durationSec: 286,
        noteFrequency: [220.00, 277.18, 329.63, 440.00]
      },
      {
        id: 'chrisye-5',
        title: 'Cintaku',
        album: 'Badai Pasti Berlalu',
        plays: '119,300,500',
        duration: '4:35',
        durationSec: 275,
        noteFrequency: [246.94, 311.13, 369.99, 493.88]
      }
    ]
  },

  // IWAN FALS
  '1dfeR4HaWDbWqFHLkxsg1d': {
    id: '1dfeR4HaWDbWqFHLkxsg1d',
    name: 'IWAN FALS',
    verified: true,
    genres: ['Folk Rock', 'Social Realism', 'Acoustic Protest'],
    monthlyListeners: '3,420,500',
    followers: '4,650,200',
    headerTag: 'CULTURAL FOLK HERO & ROCK LEGEND',
    bio: 'Revered voice of the people delivering gritty acoustic ballads and anthemic social commentary across four decades.',
    colorTheme: 'from-emerald-950/40 to-neutral-900',
    tracks: [
      {
        id: 'iwan-1',
        title: 'Ibu',
        album: '1910',
        plays: '178,340,900',
        duration: '4:05',
        durationSec: 245,
        noteFrequency: [220.00, 261.63, 329.63, 440.00]
      },
      {
        id: 'iwan-2',
        title: 'Tikus-Tikus Kantor',
        album: 'Wakil Rakyat',
        plays: '135,890,200',
        duration: '2:44',
        durationSec: 164,
        noteFrequency: [246.94, 293.66, 369.99, 493.88]
      },
      {
        id: 'iwan-3',
        title: 'Bongkar (with SWAMI)',
        album: 'SWAMI I',
        plays: '124,560,700',
        duration: '5:48',
        durationSec: 348,
        noteFrequency: [261.63, 329.63, 392.00, 523.25]
      },
      {
        id: 'iwan-4',
        title: 'Surat Buat Wakil Rakyat',
        album: 'Wakil Rakyat',
        plays: '112,800,400',
        duration: '2:40',
        durationSec: 160,
        noteFrequency: [293.66, 349.23, 440.00, 587.33]
      },
      {
        id: 'iwan-5',
        title: 'Yang Terlupakan',
        album: 'Sarjana Muda',
        plays: '109,240,600',
        duration: '4:58',
        durationSec: 298,
        noteFrequency: [329.63, 392.00, 493.88, 659.25]
      }
    ]
  }
};

/**
 * Dynamic fetcher simulating an API request to Spotify Web API
 * based on selected artist ID.
 */
export async function fetchSpotifyArtistData(artistId: string): Promise<SpotifyArtistProfile> {
  // Simulate network latency (280-350ms)
  await new Promise((resolve) => setTimeout(resolve, 320));

  const cleanId = artistId.trim();

  // If found in catalog, return curated data
  if (SPOTIFY_ARTISTS[cleanId]) {
    return SPOTIFY_ARTISTS[cleanId];
  }

  // Fallback: Generate dynamic mock data for any arbitrary Spotify Artist ID
  let charSum = 0;
  for (let i = 0; i < cleanId.length; i++) {
    charSum += cleanId.charCodeAt(i);
  }
  const monthlyStreams = ((charSum * 3819) % 8000000 + 1200000).toLocaleString('en-US');
  const followersCount = ((charSum * 2143) % 4500000 + 850000).toLocaleString('en-US');

  return {
    id: cleanId,
    name: `ARTIST REF #${cleanId.slice(0, 6).toUpperCase()}`,
    verified: true,
    genres: ['Live Electronic', 'Synth Pop', 'Modern Alternative'],
    monthlyListeners: monthlyStreams,
    followers: followersCount,
    headerTag: 'SPOTIFY VERIFIED SHOWCASE ACT',
    bio: `Live performer catalog dynamically synchronized for Spotify Artist ID: ${cleanId}. Full setlist and live audio arrangements programmed for Z MUSIC Jakarta.`,
    colorTheme: 'from-amber-600/25 to-teal-950/40',
    tracks: [
      {
        id: `${cleanId}-t1`,
        title: 'Live Anthem (Venue Mix)',
        album: 'Live at Z MUSIC Room 1',
        plays: ((charSum * 917) % 50000000 + 15000000).toLocaleString('en-US'),
        duration: '3:48',
        durationSec: 228,
        noteFrequency: [261.63, 329.63, 392.00, 523.25]
      },
      {
        id: `${cleanId}-t2`,
        title: 'Midnight Resonance',
        album: 'Signal Decay LP',
        plays: ((charSum * 623) % 40000000 + 8000000).toLocaleString('en-US'),
        duration: '4:15',
        durationSec: 255,
        noteFrequency: [293.66, 369.99, 440.00, 587.33]
      },
      {
        id: `${cleanId}-t3`,
        title: 'Acoustic Reprise',
        album: 'Unplugged Sessions',
        plays: ((charSum * 411) % 30000000 + 5000000).toLocaleString('en-US'),
        duration: '3:30',
        durationSec: 210,
        noteFrequency: [329.63, 392.00, 493.88, 659.25]
      },
      {
        id: `${cleanId}-t4`,
        title: 'Echoes in the Pit',
        album: 'Jakarta Tour Edition',
        plays: ((charSum * 289) % 25000000 + 3200000).toLocaleString('en-US'),
        duration: '4:02',
        durationSec: 242,
        noteFrequency: [349.23, 440.00, 523.25, 698.46]
      }
    ]
  };
}
