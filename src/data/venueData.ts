import { Show, PastArtist, DrinkItem, VenueTile, GalleryPhoto } from '../types/venue';

export const UPCOMING_SHOWS: Show[] = [
  {
    id: 'show-1',
    date: 'OCT 03',
    dayOfWeek: 'FRI',
    fullDate: 'Friday, October 3, 2026',
    artist: 'MAHALINI',
    song: 'SISA RASA + SIAL',
    genre: 'POP',
    doorsTime: '7:00 PM',
    showTime: '8:00 PM',
    priceAdvance: 22,
    priceDoor: 26,
    vipPrice: 45,
    ageRestriction: 'All-Ages',
    status: 'available',
    description: 'A wall of sound experience featuring lush distortion, hypnotic visuals, and quad-speaker spatial audio.',
    imageTheme: 'amber-teal',
    spotifyArtistId: '776P86JpM5QcfL2Y7G4d8n'
  },
  {
    id: 'show-2',
    date: 'OCT 07',
    dayOfWeek: 'TUE',
    fullDate: 'Tuesday, October 7, 2026',
    artist: 'BERNADYA',
    song: 'SATU BULAN',
    genre: 'pop',
    doorsTime: '7:30 PM',
    showTime: '8:30 PM',
    priceAdvance: 20,
    priceDoor: 24,
    vipPrice: 40,
    ageRestriction: '18+',
    status: 'low-tickets',
    description: 'Raw high-voltage punk direct from Bristol. Intense floor pit guaranteed. Custom ear protection available at coat check.',
    imageTheme: 'red-amber',
    spotifyArtistId: '318a4qNcvYw6nS9p6h21mC'
  },
  {
    id: 'show-3',
    date: 'OCT 09',
    dayOfWeek: 'THU',
    fullDate: 'Thursday, October 9, 2026',
    artist: 'RAISA',
    song: 'KALI KEDUA + JATUH HATI',
    genre: 'POP',
    doorsTime: '7:00 PM',
    showTime: '8:15 PM',
    priceAdvance: 28,
    priceDoor: 32,
    vipPrice: 55,
    ageRestriction: 'All-Ages',
    status: 'low-tickets',
    description: 'Headlining showcase with analog synthesizers, immersive laser choreography, and 120-minute uninterrupted set.',
    imageTheme: 'teal-amber',
    spotifyArtistId: '0hEurMDQu99nJRq8pTxO14'
  },
  {
    id: 'show-4',
    date: 'OCT 12',
    dayOfWeek: 'SUN',
    fullDate: 'Sunday, October 12, 2026',
    artist: 'ROSSA',
    song: 'TERLALU CINTA',
    genre: 'POP',
    doorsTime: '6:30 PM',
    showTime: '7:30 PM',
    priceAdvance: 24,
    priceDoor: 28,
    vipPrice: 48,
    ageRestriction: 'All-Ages',
    status: 'available',
    description: 'Haunting acoustic guitars, pedal steel, and four-part vocal harmony under warm amber incandescent stage lighting.',
    imageTheme: 'amber-monochrome',
    spotifyArtistId: '3Nrfpe0tUJi4K4DXYWgMUX'
  },
  {
    id: 'show-5',
    date: 'OCT 17',
    dayOfWeek: 'FRI',
    fullDate: 'Friday, October 17, 2026',
    artist: 'CHISYE',
    song: 'KEMESRAAN + ANDAI AKU BISA',
    genre: 'POP',
    doorsTime: '8:00 PM',
    showTime: '9:00 PM',
    priceAdvance: 25,
    priceDoor: 30,
    vipPrice: 50,
    ageRestriction: '21+',
    status: 'sold-out',
    description: 'Heavy bass frequencies, strobe assaults, and pounding 132 BPM club anthems lasting into late midnight.',
    imageTheme: 'red-teal',
    spotifyArtistId: '1sBk0AOH1aA3GqT7q2Qc6a'
  },
  {
    id: 'show-6',
    date: 'OCT 21',
    dayOfWeek: 'WED',
    fullDate: 'Wednesday, October 21, 2026',
    artist: 'TULUS',
    song: 'MONOCROM + HATI HATI DI JALAN',
    genre: 'POP',
    doorsTime: '7:00 PM',
    showTime: '8:00 PM',
    priceAdvance: 18,
    priceDoor: 22,
    vipPrice: 38,
    ageRestriction: 'All-Ages',
    status: 'available',
    description: 'Swirling vintage fuzz organs and dreamy psych hooks from Jakarta local independent darlings.',
    imageTheme: 'amber-teal',
    spotifyArtistId: '2auA2ZpknxP1fO2Wv2mX3M'
  },
  {
    id: 'show-7',
    date: 'OCT 25',
    dayOfWeek: 'SUN',
    fullDate: 'Sunday, October 25, 2026',
    artist: 'IWAN FALS',
    song: 'IBU + TIKUS TIKUS KANTOR',
    genre: 'POP',
    doorsTime: '6:30 PM',
    showTime: '7:30 PM',
    priceAdvance: 26,
    priceDoor: 30,
    vipPrice: 52,
    ageRestriction: 'All-Ages',
    status: 'available',
    description: '9-piece soul and blues ensemble featuring screaming horn section and Hammond B3 organ.',
    imageTheme: 'amber-red',
    spotifyArtistId: '4Z0Qj7Yl0K9dG7y6Z1d9rM'
  },
  {
    id: 'show-8',
    date: 'OCT 31',
    dayOfWeek: 'SAT',
    fullDate: 'Saturday, October 31, 2026',
    artist: 'HALLOWEEN MIDNIGHT RITUAL',
    support: 'Secret Headliner + Special Guests',
    genre: 'Psych Rock / Masquerade',
    doorsTime: '8:00 PM',
    showTime: '9:30 PM',
    priceAdvance: 35,
    priceDoor: 40,
    vipPrice: 70,
    ageRestriction: '18+',
    status: 'low-tickets',
    description: 'Annual venue costume masquerade with 3 stages, projection mapping, and secret midnight encore.',
    imageTheme: 'red-amber'
  }
];

export const PAST_ARTISTS: PastArtist[] = [
  {
    id: 'pa-1',
    name: 'TURNSTILE',
    year: '2023',
    genres: ['Hardcore', 'Alt Rock'],
    notableTrack: 'Blackout',
    quote: 'The energy inside Z MUSIC is unhinged. You feel the floor flexing with every drop.'
  },
  {
    id: 'pa-2',
    name: 'WET LEG',
    year: '2022',
    genres: ['Indie Rock', 'Post-Punk'],
    notableTrack: 'Chaise Longue',
    quote: 'Best sound on our entire North American club run. That 24-channel analog front-of-house punch is unmatched.'
  },
  {
    id: 'pa-3',
    name: 'CHVRCHES',
    year: '2021',
    genres: ['Synth-Pop', 'Electronic'],
    notableTrack: 'The Mother We Share',
    quote: 'Playing to 500 fans this close was pure electricity. An authentic independent cathedral.'
  },
  {
    id: 'pa-4',
    name: 'SIGUR RÓS',
    year: '2019',
    genres: ['Post-Rock', 'Ambient'],
    notableTrack: 'Svefn-g-englar',
    quote: 'Intimate, silent between crescendo waves, and deeply respectful listeners.'
  },
  {
    id: 'pa-5',
    name: 'FONTAINES D.C.',
    year: '2023',
    genres: ['Post-Punk', 'Indie'],
    notableTrack: 'Boys in the Better Land',
    quote: 'Sweat on the brickwork by the third song. Pure rock and roll room.'
  },
  {
    id: 'pa-6',
    name: 'IDLES',
    year: '2022',
    genres: ['Punk Rock', 'Post-Hardcore'],
    notableTrack: 'Colossus',
    quote: 'Z MUSIC treats bands like royalty and crowds like family. No corporate nonsense.'
  },
  {
    id: 'pa-7',
    name: 'JAPANESE BREAKFAST',
    year: '2021',
    genres: ['Indie Pop', 'Shoegaze'],
    notableTrack: 'Be Sweet',
    quote: 'The balcony sightlines and lighting rig make this feel like a miniature arena.'
  },
  {
    id: 'pa-8',
    name: 'KING GIZZARD',
    year: '2020',
    genres: ['Psychedelic Rock', 'Garage'],
    notableTrack: 'Rattlesnake',
    quote: 'A 3-hour marathon set where nobody wanted to leave. Iconic venue.'
  }
];

export const VENUE_TILES: VenueTile[] = [
  {
    id: 'vt-1',
    title: 'THE FLOOR & STAGE',
    subtitle: 'Unobstructed Sightlines',
    description: '28ft wide by 20ft deep hardwood stage with a 3.5ft elevation. Built with acoustic baffle walls and zero vertical support columns to ensure every spot in the room has an unobstructed view.',
    specs: ['28ft x 20ft Stage Dimensions', '3.5ft Stage Height', 'Floor Sightline 100% Column-Free', '500 Standing GA Capacity'],
    gradient: 'from-amber-950/70 via-black to-black',
    badge: 'STAGE & PIT'
  },
  {
    id: 'vt-2',
    title: 'BALCONY MEZZANINE',
    subtitle: 'VIP Elevated Deck',
    description: 'Wrap-around industrial steel mezzanine hovering above the floor. Features reserved table seating, personal cocktail attendants, and a dedicated express bar so you never miss a note in line.',
    specs: ['120 VIP Reserved Sightline Seats', 'Dedicated 2nd Floor Craft Bar', 'Acoustically Tuned Downfill PA', 'Private Restroom Access'],
    gradient: 'from-teal-950/70 via-black to-black',
    badge: 'BALCONY LOUNGE'
  },
  {
    id: 'vt-3',
    title: 'MAIN CONCOURSE BARS',
    subtitle: 'Speed & Craft Balance',
    description: 'Two 35-foot dual zinc bars flanking the hall. Outfitted with 16 quick-pour draft towers and premium craft spirits to keep wait times under 90 seconds even during sold-out peak intermissions.',
    specs: ['3 Fully Stocked Bars', '16 Draft Beer Taps', 'Digital Apple/Google Pay Tap', 'Free Filtered Water Stations'],
    gradient: 'from-amber-950/60 via-red-950/40 to-black',
    badge: '3 FULL BARS'
  },
  {
    id: 'vt-4',
    title: 'ARTIST GREEN ROOM',
    subtitle: 'Backstage Sanctuary',
    description: 'Air-conditioned artist wing with private en-suite bathroom, hot shower, commercial refrigeration, direct ground-level load-in ramp, and isolated soundproof tuning lounge.',
    specs: ['Direct Load-In Roll-Up Door', 'Private Restroom & Hot Shower', 'High-Speed Wi-Fi & Lounge', 'Backstage Security Escort'],
    gradient: 'from-red-950/70 via-black to-black',
    badge: 'BACKSTAGE WING'
  }
];

export const DRINK_MENU: DrinkItem[] = [
  {
    id: 'd-1',
    name: 'Z MUSIC SOUR',
    category: 'cocktail',
    tagline: 'Venue Signature House Special',
    ingredients: 'Small-batch Tennessee Bourbon, fresh squeezed lemon, smoked wildflower honey, egg white, layered with dark syrah red float & angostura mist',
    price: '$14.00',
    abv: '14.2% ABV',
    isSignature: true
  },
  {
    id: 'd-2',
    name: 'ELECTRIC OVERDRIVE',
    category: 'cocktail',
    tagline: 'High Voltage Mezcal Kick',
    ingredients: 'Oaxacan Mezcal, Blue Curaçao, charred jalapeño agave, fresh lime, Himalayan black salt rim',
    price: '$15.00',
    abv: '13.8% ABV'
  },
  {
    id: 'd-3',
    name: 'MIDNIGHT FUZZ',
    category: 'cocktail',
    tagline: 'Dark Spirit Classic',
    ingredients: 'Rye Whiskey, Averna Amaro, sweet vermouth, brandied cherry, smoked orange oil peel',
    price: '$14.00',
    abv: '15.5% ABV'
  },
  {
    id: 'd-4',
    name: 'JAKARTA GOLDEN LAGER',
    category: 'draft',
    tagline: 'Crisp & Refreshing Local Tap',
    ingredients: 'Brewed exclusively for Z MUSIC by Cumberland River Craft. Clean pilsner malt with noble German saaz hops',
    price: '$7.50',
    abv: '4.8% ABV'
  },
  {
    id: 'd-5',
    name: 'NEON WAVE HAZY IPA',
    category: 'draft',
    tagline: 'Tropical Juice Bomb',
    ingredients: 'Local Nashville/Jakarta brewery collab. Citra, Mosaic, and Galaxy dry-hopped for maximum stone fruit aroma',
    price: '$8.50',
    abv: '6.8% ABV'
  },
  {
    id: 'd-6',
    name: 'SMOKED VELVET PORTER',
    category: 'draft',
    tagline: 'Robust Malts & Cocoa',
    ingredients: 'Dark roasted barley, Madagascar bourbon vanilla beans, hints of espresso and smoked oak',
    price: '$8.00',
    abv: '6.2% ABV'
  },
  {
    id: 'd-7',
    name: 'ZERO DECIBEL SPRITZ',
    category: 'na',
    tagline: 'Zero-Proof Botanical Fizz',
    ingredients: 'Ghia non-alcoholic bitter aperitif, fresh grapefruit juice, thyme simple syrup, topped with sparkling topo chico',
    price: '$9.00',
    abv: '0.0% ABV'
  },
  {
    id: 'd-8',
    name: 'GINGER REVERB',
    category: 'na',
    tagline: 'Spicy Craft Cold Brew',
    ingredients: 'Fiery organic ginger brew, cold pressed lime, local blackberry shrub, cracked mint leaves',
    price: '$8.00',
    abv: '0.0% ABV'
  }
];

export const GALLERY_ITEMS: GalleryPhoto[] = [
  {
    id: 'g-1',
    title: 'THE SWEATY ENCORE',
    subtitle: 'Friday night crowd surge during guitar climax',
    tag: 'LIVE CONCERT',
    photographer: 'Marcus Vance',
    aspect: 'aspect-square md:aspect-[4/5]',
    colorScheme: 'from-amber-600/30 via-red-950/60 to-black'
  },
  {
    id: 'g-2',
    title: 'MIDAS AT 102 DECIBELS',
    subtitle: 'Front of house engineer dialling in vocal compression',
    tag: 'FOH AUDIO',
    photographer: 'Elena Rostova',
    aspect: 'aspect-video md:aspect-[16/10]',
    colorScheme: 'from-teal-600/30 via-neutral-950 to-black'
  },
  {
    id: 'g-3',
    title: 'BALCONY PERSPECTIVE',
    subtitle: '500 voices singing in unison under amber floodlights',
    tag: 'VENUE SIGHTLINE',
    photographer: 'Drew Calhoun',
    aspect: 'aspect-square md:aspect-[4/3]',
    colorScheme: 'from-amber-700/30 via-neutral-900 to-black'
  },
  {
    id: 'g-4',
    title: 'VALVE & STEEL',
    subtitle: 'Vintage 1968 Fender Twin Reverb amp glowing backstage',
    tag: 'BACKLINE',
    photographer: 'Marcus Vance',
    aspect: 'aspect-square md:aspect-[4/5]',
    colorScheme: 'from-red-600/30 via-neutral-950 to-black'
  },
  {
    id: 'g-5',
    title: 'GREEN ROOM SETLIST',
    subtitle: 'Pre-show tuning and hand-scrawled setlist paper',
    tag: 'BACKSTAGE',
    photographer: 'Elena Rostova',
    aspect: 'aspect-video md:aspect-[16/10]',
    colorScheme: 'from-teal-700/30 via-neutral-950 to-black'
  },
  {
    id: 'g-6',
    title: 'LAST CALL AT THE ZINC BAR',
    subtitle: 'Craft beer taps and vinyl spinning past 1:00 AM',
    tag: 'Z MUSIC POURS',
    photographer: 'Drew Calhoun',
    aspect: 'aspect-square md:aspect-[4/3]',
    colorScheme: 'from-amber-500/30 via-red-900/40 to-black'
  }
];

export const TICKER_ITEMS = [
  'OCT 03 // ECHOES OF OBLIVION',
  'OCT 07 // THE KINETIC RIOT [LOW TICKETS]',
  'OCT 09 // MANDRAKE ECHOES (HEADLINER SHOWCASE)',
  'OCT 12 // BLACKWOOD HYMNS',
  'OCT 17 // NEON CHASM [SOLD OUT]',
  'OCT 21 // THE CINDER VOX',
  'OCT 25 // IRON ROOTS ORCHESTRA',
  'OCT 31 // HALLOWEEN MIDNIGHT RITUAL [LOW TICKETS]',
  'NOV 06 // SLEEPWALKER GUILD',
  'NOV 14 // TYPHOON SOUND SYSTEM',
  'JAKARTA SYN PREMIER 500-CAP INDEPENDENT VENUE',
  'ALL-AGES WELCOME • CRAFT BARS ON BOTH FLOORS'
];
