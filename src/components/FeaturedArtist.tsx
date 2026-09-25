import React, { useState, useEffect, useRef } from 'react';
import {
  Clock,
  Ticket,
  Sparkles,
  Play,
  Pause,
  ExternalLink,
  Check,
  Copy,
  Music2,
  Volume2,
  VolumeX,
  Shuffle,
  Repeat,
  Heart,
  Disc3,
  Headphones,
  Loader2,
  SkipForward,
  SkipBack,
  ListMusic,
  CheckCircle2
} from 'lucide-react';
import { Show } from '../types/venue';
import { useCurrency } from '../context/CurrencyContext';
import { UPCOMING_SHOWS } from '../data/venueData';
import { fetchSpotifyArtistData, SpotifyArtistProfile, SpotifyTrack, SPOTIFY_ARTISTS } from '../data/spotifyData';
import { playMockAudioPreview, setMockAudioVolume, stopMockAudioPreview } from '../utils/audioPreview';
import { useLanguage } from '../context/LanguageContext';

interface FeaturedArtistProps {
  onGetTickets: (show: Show) => void;
}

export const FeaturedArtist: React.FC<FeaturedArtistProps> = ({ onGetTickets }) => {
  const { formatPrice } = useCurrency();
  const { language, t } = useLanguage();

  // Pick headline show from data or default to RAISA / Oct 09 show
  const headlineFromData = UPCOMING_SHOWS.find((s) => s.id === 'show-3') || UPCOMING_SHOWS[2];

  const featuredShow: Show = {
    id: headlineFromData?.id || 'show-featured',
    date: headlineFromData?.date || 'OCT 09',
    dayOfWeek: headlineFromData?.dayOfWeek || 'THU',
    fullDate: headlineFromData?.fullDate || 'Thursday, October 9, 2026',
    artist: headlineFromData?.artist || 'RAISA',
    support: headlineFromData?.support,
    song: headlineFromData?.song || 'KALI KEDUA + JATUH HATI',
    genre: headlineFromData?.genre || 'POP',
    doorsTime: headlineFromData?.doorsTime || '7:00 PM',
    showTime: headlineFromData?.showTime || '8:15 PM',
    priceAdvance: headlineFromData?.priceAdvance || 28,
    priceDoor: headlineFromData?.priceDoor || 32,
    vipPrice: headlineFromData?.vipPrice || 55,
    ageRestriction: headlineFromData?.ageRestriction || 'All-Ages',
    status: headlineFromData?.status || 'low-tickets',
    description: headlineFromData?.description || 'Exclusive headline showcase with full band live arrangement, immersive visuals, and 120-minute uninterrupted set.',
    imageTheme: headlineFromData?.imageTheme || 'teal-amber',
    spotifyArtistId: headlineFromData?.spotifyArtistId || '0hEurMDQu99nJRq8pTxO14'
  };

  // Active Spotify artist ID state, defaulted to featured act's ID
  const [activeSpotifyArtistId, setActiveSpotifyArtistId] = useState<string>(
    featuredShow.spotifyArtistId || '0hEurMDQu99nJRq8pTxO14'
  );

  // Dynamic Spotify artist profile state & loading state
  const [artistProfile, setArtistProfile] = useState<SpotifyArtistProfile>(
    SPOTIFY_ARTISTS[activeSpotifyArtistId] || SPOTIFY_ARTISTS['0hEurMDQu99nJRq8pTxO14']
  );
  const [isLoadingArtist, setIsLoadingArtist] = useState(false);

  // Player view mode: 'mock' (Custom interactive UI) or 'embed' (Official Spotify iframe)
  const [playerMode, setPlayerMode] = useState<'mock' | 'embed'>('mock');

  // Audio preview playback state
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSeconds, setPlaybackSeconds] = useState(0);
  const [previewDuration] = useState(30); // 30-second Spotify preview standard
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(true);
  const [likedTrackIds, setLikedTrackIds] = useState<Record<string, boolean>>({
    'raisa-1': true,
    'bernadya-1': true
  });
  const [isFollowing, setIsFollowing] = useState(false);

  const [copiedId, setCopiedId] = useState(false);
  const [showCustomIdInput, setShowCustomIdInput] = useState(false);
  const [customIdInput, setCustomIdInput] = useState('');

  // Ref for playback timer interval
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Live countdown timer state (calculating remaining time to target date)
  const [timeLeft, setTimeLeft] = useState({
    days: 14,
    hours: 8,
    minutes: 42,
    seconds: 19
  });

  // Countdown timer effect
  useEffect(() => {
    const targetTime = new Date('2026-10-09T20:00:00').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft((prev) => {
          let s = prev.seconds - 1;
          let m = prev.minutes;
          let h = prev.hours;
          let d = prev.days;
          if (s < 0) {
            s = 59;
            m -= 1;
          }
          if (m < 0) {
            m = 59;
            h -= 1;
          }
          if (h < 0) {
            h = 23;
            d -= 1;
          }
          if (d < 0) d = 14;
          return { days: d, hours: h, minutes: m, seconds: s };
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Fetch dynamic Spotify artist data whenever activeSpotifyArtistId changes
  useEffect(() => {
    let isCancelled = false;
    setIsLoadingArtist(true);

    // Stop current audio preview when switching artist
    stopMockAudioPreview();
    setIsPlaying(false);
    setPlaybackSeconds(0);
    if (timerRef.current) clearInterval(timerRef.current);

    fetchSpotifyArtistData(activeSpotifyArtistId)
      .then((data) => {
        if (!isCancelled) {
          setArtistProfile(data);
          setCurrentTrackIndex(0);
          setIsLoadingArtist(false);
        }
      })
      .catch((err) => {
        console.error('Failed to load Spotify artist data:', err);
        if (!isCancelled) {
          setIsLoadingArtist(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [activeSpotifyArtistId]);

  // Audio preview playback timer
  useEffect(() => {
    if (isPlaying) {
      const activeTrack = artistProfile.tracks[currentTrackIndex];
      const freqs = activeTrack?.noteFrequency || [261.63, 329.63, 392.0, 523.25];
      playMockAudioPreview(freqs, isMuted ? 0 : volume);

      timerRef.current = setInterval(() => {
        setPlaybackSeconds((prev) => {
          if (prev >= previewDuration) {
            // Track reached end of preview
            if (isRepeat) {
              return 0;
            } else {
              handleNextTrack();
              return 0;
            }
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      stopMockAudioPreview();
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      stopMockAudioPreview();
    };
  }, [isPlaying, currentTrackIndex, isRepeat, previewDuration]);

  // Handle volume changes
  useEffect(() => {
    setMockAudioVolume(isMuted ? 0 : volume);
  }, [volume, isMuted]);

  const activeTrack: SpotifyTrack | undefined = artistProfile.tracks[currentTrackIndex] || artistProfile.tracks[0];

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handlePlayTrack = (index: number) => {
    if (currentTrackIndex === index && isPlaying) {
      setIsPlaying(false);
    } else {
      setCurrentTrackIndex(index);
      setPlaybackSeconds(0);
      setIsPlaying(true);
    }
  };

  const handleNextTrack = () => {
    if (artistProfile.tracks.length === 0) return;
    setPlaybackSeconds(0);
    if (isShuffle) {
      const randomIndex = Math.floor(Math.random() * artistProfile.tracks.length);
      setCurrentTrackIndex(randomIndex);
    } else {
      setCurrentTrackIndex((prev) => (prev + 1) % artistProfile.tracks.length);
    }
  };

  const handlePrevTrack = () => {
    if (artistProfile.tracks.length === 0) return;
    setPlaybackSeconds(0);
    setCurrentTrackIndex((prev) => (prev - 1 + artistProfile.tracks.length) % artistProfile.tracks.length);
  };

  const handleToggleLike = (trackId: string) => {
    setLikedTrackIds((prev) => ({
      ...prev,
      [trackId]: !prev[trackId]
    }));
  };

  const handleCopyArtistId = () => {
    navigator.clipboard?.writeText(activeSpotifyArtistId);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handleApplyCustomId = (e: React.FormEvent) => {
    e.preventDefault();
    if (customIdInput.trim()) {
      setActiveSpotifyArtistId(customIdInput.trim());
      setShowCustomIdInput(false);
      setCustomIdInput('');
    }
  };

  const scrollToSpotify = () => {
    const el = document.getElementById('spotify-player-container');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  return (
    <section className="relative w-full bg-black py-20 sm:py-28 overflow-hidden border-b border-neutral-900">
      {/* Background Graphic & Light Spill */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-amber-500/20 rounded-full blur-[160px]" />
        <div className="absolute bottom-0 left-10 w-[500px] h-[500px] bg-teal-500/15 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="border border-neutral-800 bg-neutral-950/80 p-6 sm:p-10 lg:p-14 relative overflow-hidden shadow-2xl">
          {/* Subtle amber corner accent */}
          <div className="absolute top-0 left-0 w-24 h-1 bg-amber-500" />
          <div className="absolute top-0 left-0 w-1 h-24 bg-amber-500" />

          {/* Section Kicker */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>{t('featured_kicker')}</span>
              <span className="text-neutral-600">·</span>
              <span className="text-neutral-300">{t('featured_remaining')}</span>
            </div>

            {/* Quick Action Badges */}
            <div className="flex items-center gap-3">
              <button
                onClick={scrollToSpotify}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#1DB954]/10 hover:bg-[#1DB954]/20 border border-[#1DB954]/40 text-xs font-mono text-[#1ed760] transition-colors cursor-pointer"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.495 17.303c-.216.353-.674.467-1.027.251-2.812-1.718-6.352-2.106-10.523-1.152-.404.092-.806-.16-.898-.564-.092-.404.16-.806.564-.898 4.567-1.043 8.487-.604 11.633 1.336.353.216.467.674.251 1.027zm1.468-3.262c-.272.441-.853.582-1.294.31-3.219-1.978-8.125-2.55-11.93-1.394-.499.151-1.031-.132-1.182-.631-.151-.499.132-1.031.631-1.182 4.352-1.321 9.774-.68 13.465 1.593.441.272.582.853.31 1.294zm.126-3.41c-3.86-2.292-10.228-2.503-13.914-1.385-.593.18-1.22-.164-1.4-.757-.18-.593.164-1.22.757-1.4 4.24-1.287 11.27-1.042 15.696 1.583.534.317.708 1.011.391 1.545-.317.534-1.011.708-1.545.391z" />
                </svg>
                <span>{t('featured_listen_spotify')}</span>
              </button>

              <button
                onClick={handleTogglePlay}
                className={`inline-flex items-center gap-2 px-3 py-1.5 border text-xs font-mono transition-colors cursor-pointer ${
                  isPlaying
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                    : 'bg-neutral-900 hover:bg-neutral-800 border-neutral-800 text-neutral-300'
                }`}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-3.5 h-3.5 text-amber-400" />
                    <span>{t('featured_now_playing')}</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 text-neutral-400" />
                    <span>{t('featured_play_preview')}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Main Grid: Headline Artist Details & Live Stage Visual */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: Artist Details & Spotify Player Component */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-mono font-semibold tracking-wider uppercase">
                  {featuredShow.date} · {featuredShow.dayOfWeek}
                </span>
                <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
                  DOORS {featuredShow.doorsTime} · SHOW {featuredShow.showTime}
                </span>
                <span className="text-xs font-mono text-neutral-500">·</span>
                <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
                  {featuredShow.ageRestriction}
                </span>
              </div>

              {/* Artist Name & Tagline */}
              <h2
                className="mt-4 text-5xl sm:text-7xl lg:text-8xl font-black text-white tracking-tighter uppercase leading-[0.9]"
                style={{ fontFamily: 'var(--font-display, "Barlow Condensed", sans-serif)' }}
              >
                {featuredShow.artist}
              </h2>

              <div className="mt-2 text-sm sm:text-base font-mono text-amber-400/90 font-medium">
                {featuredShow.song ? `TOP SONGS: ${featuredShow.song}` : featuredShow.support ? `WITH SUPPORT FROM: ${featuredShow.support}` : ''}
              </div>

              <p className="mt-4 text-sm sm:text-base text-neutral-300 leading-relaxed max-w-xl">
                {featuredShow.description}
              </p>

              {/* Real-time Countdown Timer */}
              <div className="mt-6 pt-5 border-t border-neutral-800/80">
                <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-3 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-500" />
                  <span>{t('featured_doors_timer')}</span>
                </div>

                <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-md">
                  {[
                    { label: t('featured_days'), value: timeLeft.days },
                    { label: t('featured_hours'), value: timeLeft.hours },
                    { label: t('featured_minutes'), value: timeLeft.minutes },
                    { label: t('featured_seconds'), value: timeLeft.seconds }
                  ].map((unit, idx) => (
                    <div
                      key={idx}
                      className="bg-black/90 border border-neutral-800 p-3 sm:p-4 text-center rounded-none shadow-inner"
                    >
                      <div className="text-2xl sm:text-4xl font-mono font-black text-amber-400 tabular-nums">
                        {String(unit.value).padStart(2, '0')}
                      </div>
                      <div className="text-[10px] sm:text-xs font-mono text-neutral-400 tracking-wider mt-1">
                        {unit.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons: Get Tickets & Listen on Spotify */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onGetTickets(featuredShow)}
                  className="px-8 py-4 bg-amber-500 hover:bg-amber-400 text-black font-extrabold uppercase tracking-wider text-base rounded-none transition-all duration-150 glow-amber-pulse cursor-pointer flex items-center gap-2.5 active:scale-95"
                  style={{ fontFamily: 'var(--font-display, "Barlow Condensed", sans-serif)' }}
                >
                  <Ticket className="w-4 h-4 stroke-[2.5]" />
                  <span>{t('featured_get_tickets')} • {formatPrice(featuredShow.priceAdvance)} ADV / {formatPrice(featuredShow.vipPrice)} VIP</span>
                </button>

                <button
                  onClick={scrollToSpotify}
                  className="px-6 py-4 bg-neutral-900 hover:bg-neutral-800 text-white hover:text-[#1ed760] border border-neutral-700 hover:border-[#1DB954]/70 font-bold uppercase tracking-wider text-sm rounded-none transition-all duration-150 cursor-pointer flex items-center gap-2.5 group"
                  style={{ fontFamily: 'var(--font-display, "Barlow Condensed", sans-serif)' }}
                >
                  <svg className="w-4 h-4 text-[#1DB954] group-hover:scale-110 transition-transform fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.495 17.303c-.216.353-.674.467-1.027.251-2.812-1.718-6.352-2.106-10.523-1.152-.404.092-.806-.16-.898-.564-.092-.404.16-.806.564-.898 4.567-1.043 8.487-.604 11.633 1.336.353.216.467.674.251 1.027zm1.468-3.262c-.272.441-.853.582-1.294.31-3.219-1.978-8.125-2.55-11.93-1.394-.499.151-1.031-.132-1.182-.631-.151-.499.132-1.031.631-1.182 4.352-1.321 9.774-.68 13.465 1.593.441.272.582.853.31 1.294zm.126-3.41c-3.86-2.292-10.228-2.503-13.914-1.385-.593.18-1.22-.164-1.4-.757-.18-.593.164-1.22.757-1.4 4.24-1.287 11.27-1.042 15.696 1.583.534.317.708 1.011.391 1.545-.317.534-1.011.708-1.545.391z" />
                  </svg>
                  <span>{t('featured_listen_spotify')}</span>
                </button>
              </div>

              {/* ========================================================================= */}
              {/* SPOTIFY PLAYER COMPONENT (MOCK UI & DYNAMIC FETCH BASED ON ARTIST ID) */}
              {/* ========================================================================= */}
              <div
                id="spotify-player-container"
                className="mt-10 border border-neutral-800 bg-[#121212] relative overflow-hidden shadow-2xl transition-all"
              >
                {/* Spotify Ambient Gradient Spill */}
                <div
                  className={`absolute top-0 left-0 right-0 h-40 bg-gradient-to-b ${artistProfile.colorTheme} opacity-40 pointer-events-none transition-all duration-500`}
                />

                {/* Player Top Navigation & Mode Switcher */}
                <div className="relative z-10 px-4 sm:px-6 pt-5 pb-3 flex flex-wrap items-center justify-between gap-3 border-b border-neutral-800/80">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#1DB954] text-black flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(29,185,84,0.45)]">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.495 17.303c-.216.353-.674.467-1.027.251-2.812-1.718-6.352-2.106-10.523-1.152-.404.092-.806-.16-.898-.564-.092-.404.16-.806.564-.898 4.567-1.043 8.487-.604 11.633 1.336.353.216.467.674.251 1.027zm1.468-3.262c-.272.441-.853.582-1.294.31-3.219-1.978-8.125-2.55-11.93-1.394-.499.151-1.031-.132-1.182-.631-.151-.499.132-1.031.631-1.182 4.352-1.321 9.774-.68 13.465 1.593.441.272.582.853.31 1.294zm.126-3.41c-3.86-2.292-10.228-2.503-13.914-1.385-.593.18-1.22-.164-1.4-.757-.18-.593.164-1.22.757-1.4 4.24-1.287 11.27-1.042 15.696 1.583.534.317.708 1.011.391 1.545-.317.534-1.011.708-1.545.391z" />
                      </svg>
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold tracking-widest text-white uppercase">
                          SPOTIFY ARTIST PREVIEW
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 bg-[#1DB954]/20 text-[#1ed760] font-semibold border border-[#1DB954]/40">
                          30S AUDIO PREVIEW
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5 text-[11px] font-mono text-neutral-400">
                        <span>Artist ID:</span>
                        <code className="text-amber-400 font-bold bg-neutral-900/90 px-1 py-0.5 border border-neutral-800">
                          {activeSpotifyArtistId}
                        </code>
                        <button
                          onClick={handleCopyArtistId}
                          title="Copy Artist ID"
                          className="hover:text-white transition-colors cursor-pointer"
                        >
                          {copiedId ? (
                            <span className="text-emerald-400 text-[10px] flex items-center gap-0.5">
                              <Check className="w-3 h-3" /> Copied!
                            </span>
                          ) : (
                            <Copy className="w-3 h-3 text-neutral-500 hover:text-neutral-300" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Mode Tabs: Custom Mock Player vs Official Embed */}
                  <div className="flex items-center gap-2">
                    <div className="flex bg-black/60 p-0.5 border border-neutral-800">
                      <button
                        onClick={() => setPlayerMode('mock')}
                        className={`px-3 py-1 text-xs font-mono transition-colors cursor-pointer flex items-center gap-1.5 ${
                          playerMode === 'mock'
                            ? 'bg-[#1DB954] text-black font-bold shadow-sm'
                            : 'text-neutral-400 hover:text-white'
                        }`}
                      >
                        <ListMusic className="w-3.5 h-3.5" />
                        <span>Interactive Player</span>
                      </button>
                      <button
                        onClick={() => setPlayerMode('embed')}
                        className={`px-3 py-1 text-xs font-mono transition-colors cursor-pointer flex items-center gap-1.5 ${
                          playerMode === 'embed'
                            ? 'bg-neutral-800 text-white font-bold'
                            : 'text-neutral-400 hover:text-white'
                        }`}
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>Official Embed</span>
                      </button>
                    </div>

                    <a
                      href={`https://open.spotify.com/artist/${activeSpotifyArtistId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1.5 bg-[#1DB954]/15 hover:bg-[#1DB954]/30 text-[#1ed760] text-[11px] font-mono font-semibold border border-[#1DB954]/40 transition-colors flex items-center gap-1"
                      title="Open Artist Profile in Spotify App"
                    >
                      <span className="hidden sm:inline">Open App</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* Fetching Indicator Overlay */}
                {isLoadingArtist && (
                  <div className="px-6 py-8 flex flex-col items-center justify-center gap-2.5 bg-neutral-950/90 text-neutral-300">
                    <Loader2 className="w-6 h-6 animate-spin text-[#1DB954]" />
                    <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                      Fetching Spotify Artist Catalog for ID: {activeSpotifyArtistId}...
                    </span>
                  </div>
                )}

                {/* PLAYER MODE 1: INTERACTIVE MOCK SPOTIFY PLAYER */}
                {!isLoadingArtist && playerMode === 'mock' && (
                  <div className="relative z-10">
                    {/* Artist Hero / Header Row */}
                    <div className="p-4 sm:p-6 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 uppercase tracking-widest">
                          <CheckCircle2 className="w-4 h-4 text-[#1DB954]" />
                          <span className="text-white font-bold">Verified Artist</span>
                          <span>•</span>
                          <span className="text-neutral-300 font-semibold">{artistProfile.monthlyListeners} monthly listeners</span>
                        </div>

                        <h3
                          className="mt-1 text-3xl sm:text-5xl font-black text-white uppercase tracking-tight"
                          style={{ fontFamily: 'var(--font-display, "Barlow Condensed", sans-serif)' }}
                        >
                          {artistProfile.name}
                        </h3>

                        <div className="mt-1 flex flex-wrap items-center gap-1.5 text-[11px] font-mono text-neutral-400">
                          {artistProfile.genres.map((g, i) => (
                            <span key={i} className="px-2 py-0.5 bg-black/60 border border-neutral-800 text-neutral-300">
                              {g}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Main 'Listen Now' Preview Button & Follow Controls */}
                      <div className="flex items-center gap-3 shrink-0">
                        {/* THE PROMINENT 'LISTEN NOW' PREVIEW BUTTON */}
                        <button
                          onClick={handleTogglePlay}
                          className="px-6 py-3.5 bg-[#1DB954] hover:bg-[#1ed760] text-black font-extrabold uppercase tracking-wider text-sm rounded-full transition-all duration-150 cursor-pointer flex items-center gap-2 shadow-[0_4px_20px_rgba(29,185,84,0.4)] active:scale-95 group"
                          style={{ fontFamily: 'var(--font-display, "Barlow Condensed", sans-serif)' }}
                        >
                          {isPlaying ? (
                            <>
                              <Pause className="w-4 h-4 fill-current" />
                              <span>Pause Preview</span>
                            </>
                          ) : (
                            <>
                              <Play className="w-4 h-4 fill-current translate-x-0.5" />
                              <span>Listen Now</span>
                            </>
                          )}
                        </button>

                        <button
                          onClick={() => setIsFollowing(!isFollowing)}
                          className={`px-4 py-2.5 border text-xs font-mono uppercase tracking-wider rounded-full transition-colors cursor-pointer ${
                            isFollowing
                              ? 'bg-white/10 text-white border-white/40'
                              : 'bg-transparent text-neutral-300 hover:text-white border-neutral-700 hover:border-white'
                          }`}
                        >
                          {isFollowing ? 'Following' : 'Follow'}
                        </button>

                        <button
                          onClick={() => {
                            setIsShuffle(!isShuffle);
                            handleNextTrack();
                            setIsPlaying(true);
                          }}
                          title="Shuffle Play Tracklist"
                          className="p-2.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-800 transition-colors cursor-pointer"
                        >
                          <Shuffle className="w-4 h-4 text-[#1DB954]" />
                        </button>
                      </div>
                    </div>

                    {/* Popular Tracks Table Header */}
                    <div className="px-4 sm:px-6 pt-2">
                      <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2 pb-2 border-b border-neutral-800/80">
                        <span className="font-bold text-white flex items-center gap-1.5">
                          <Disc3 className="w-3.5 h-3.5 text-amber-500" /> Popular Tracks
                        </span>
                        <span className="text-[11px] text-neutral-500">Click track to preview live</span>
                      </div>

                      {/* Track List Items */}
                      <div className="space-y-1">
                        {artistProfile.tracks.map((track, idx) => {
                          const isCurrentActive = currentTrackIndex === idx;
                          const isThisPlaying = isCurrentActive && isPlaying;
                          const isLiked = !!likedTrackIds[track.id];

                          return (
                            <div
                              key={track.id}
                              onClick={() => handlePlayTrack(idx)}
                              className={`group flex items-center justify-between px-3 py-2.5 rounded-sm transition-all cursor-pointer ${
                                isCurrentActive
                                  ? 'bg-neutral-800/70 border-l-2 border-[#1DB954]'
                                  : 'hover:bg-neutral-900/80 border-l-2 border-transparent'
                              }`}
                            >
                              {/* Left: Track # or Play Button + Title */}
                              <div className="flex items-center gap-3 min-w-0">
                                <div className="w-6 text-center shrink-0">
                                  {isThisPlaying ? (
                                    <div className="flex items-end justify-center gap-0.5 h-3.5">
                                      <span className="w-1 bg-[#1DB954] h-full animate-pulse" />
                                      <span className="w-1 bg-[#1DB954] h-2/3 animate-pulse delay-75" />
                                      <span className="w-1 bg-[#1DB954] h-4/5 animate-pulse delay-150" />
                                    </div>
                                  ) : (
                                    <>
                                      <span className="text-xs font-mono text-neutral-500 group-hover:hidden">
                                        {idx + 1}
                                      </span>
                                      <Play className="w-3.5 h-3.5 text-white hidden group-hover:block mx-auto fill-current" />
                                    </>
                                  )}
                                </div>

                                <div className="min-w-0">
                                  <div
                                    className={`text-sm font-semibold truncate ${
                                      isCurrentActive ? 'text-[#1ed760]' : 'text-white group-hover:text-[#1ed760]'
                                    }`}
                                  >
                                    {track.title}
                                  </div>
                                  <div className="text-[11px] font-mono text-neutral-400 truncate">
                                    {track.album}
                                  </div>
                                </div>
                              </div>

                              {/* Right: Plays & Duration & Heart */}
                              <div className="flex items-center gap-4 shrink-0 text-xs font-mono">
                                <span className="hidden md:inline text-neutral-400 text-[11px] tabular-nums">
                                  {track.plays} plays
                                </span>

                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleToggleLike(track.id);
                                  }}
                                  className="text-neutral-500 hover:text-white transition-colors cursor-pointer"
                                >
                                  <Heart
                                    className={`w-3.5 h-3.5 ${
                                      isLiked ? 'text-[#1DB954] fill-[#1DB954]' : 'text-neutral-500 hover:text-neutral-300'
                                    }`}
                                  />
                                </button>

                                <span className="text-neutral-400 text-xs tabular-nums w-10 text-right">
                                  {track.duration}
                                </span>

                                {/* Preview Button on Row */}
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handlePlayTrack(idx);
                                  }}
                                  className={`px-2 py-0.5 text-[10px] uppercase font-mono transition-colors border ${
                                    isThisPlaying
                                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                                      : 'bg-neutral-900 group-hover:bg-[#1DB954]/20 text-neutral-400 group-hover:text-[#1ed760] border-neutral-800 group-hover:border-[#1DB954]/40'
                                  }`}
                                >
                                  {isThisPlaying ? 'Playing' : 'Preview'}
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Bottom Floating/Docked Audio Player Controls */}
                    <div className="mt-4 bg-[#181818] border-t border-neutral-800 p-3 sm:p-4">
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                        {/* Currently playing track info */}
                        <div className="flex items-center gap-3 w-full sm:w-1/3 min-w-0">
                          <div className="w-11 h-11 bg-black border border-neutral-700 flex items-center justify-center shrink-0 relative overflow-hidden">
                            <Disc3
                              className={`w-7 h-7 text-[#1DB954] ${
                                isPlaying ? 'animate-spin' : ''
                              }`}
                              style={{ animationDuration: '4s' }}
                            />
                            {isPlaying && (
                              <div className="absolute inset-0 bg-teal-500/10 animate-ping opacity-25" />
                            )}
                          </div>

                          <div className="min-w-0">
                            <div className="text-xs sm:text-sm font-bold text-white truncate">
                              {activeTrack?.title || 'Select Track'}
                            </div>
                            <div className="text-[11px] font-mono text-neutral-400 truncate">
                              {artistProfile.name} · {activeTrack?.album}
                            </div>
                          </div>

                          {activeTrack && (
                            <button
                              onClick={() => handleToggleLike(activeTrack.id)}
                              className="text-neutral-500 hover:text-white shrink-0 ml-1 cursor-pointer"
                            >
                              <Heart
                                className={`w-4 h-4 ${
                                  likedTrackIds[activeTrack.id]
                                    ? 'text-[#1DB954] fill-[#1DB954]'
                                    : 'text-neutral-500'
                                }`}
                              />
                            </button>
                          )}
                        </div>

                        {/* Player Buttons & Scrubber Bar */}
                        <div className="flex flex-col items-center gap-1.5 w-full sm:w-5/12">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => setIsShuffle(!isShuffle)}
                              className={`transition-colors cursor-pointer ${
                                isShuffle ? 'text-[#1DB954]' : 'text-neutral-500 hover:text-white'
                              }`}
                              title="Shuffle"
                            >
                              <Shuffle className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={handlePrevTrack}
                              className="text-neutral-300 hover:text-white transition-colors cursor-pointer"
                              title="Previous Track"
                            >
                              <SkipBack className="w-4 h-4" />
                            </button>

                            <button
                              onClick={handleTogglePlay}
                              className="w-8 h-8 rounded-full bg-white hover:bg-neutral-200 text-black flex items-center justify-center transition-transform active:scale-90 cursor-pointer shadow-md"
                              title={isPlaying ? 'Pause' : 'Play'}
                            >
                              {isPlaying ? (
                                <Pause className="w-4 h-4 fill-current" />
                              ) : (
                                <Play className="w-4 h-4 fill-current translate-x-0.5" />
                              )}
                            </button>

                            <button
                              onClick={handleNextTrack}
                              className="text-neutral-300 hover:text-white transition-colors cursor-pointer"
                              title="Next Track"
                            >
                              <SkipForward className="w-4 h-4" />
                            </button>

                            <button
                              onClick={() => setIsRepeat(!isRepeat)}
                              className={`transition-colors cursor-pointer ${
                                isRepeat ? 'text-[#1DB954]' : 'text-neutral-500 hover:text-white'
                              }`}
                              title="Repeat Preview"
                            >
                              <Repeat className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Progress Scrubber */}
                          <div className="w-full flex items-center gap-2 text-[10px] font-mono text-neutral-400">
                            <span className="tabular-nums w-7 text-right">
                              0:{String(playbackSeconds).padStart(2, '0')}
                            </span>
                            <div
                              onClick={(e) => {
                                const rect = e.currentTarget.getBoundingClientRect();
                                const clickX = e.clientX - rect.left;
                                const ratio = Math.max(0, Math.min(1, clickX / rect.width));
                                setPlaybackSeconds(Math.floor(ratio * previewDuration));
                              }}
                              className="flex-1 h-1.5 bg-neutral-700 rounded-full overflow-hidden cursor-pointer relative group"
                            >
                              <div
                                className="h-full bg-[#1DB954] group-hover:bg-[#1ed760] transition-all"
                                style={{ width: `${(playbackSeconds / previewDuration) * 100}%` }}
                              />
                            </div>
                            <span className="tabular-nums w-7">
                              0:{previewDuration}
                            </span>
                          </div>
                        </div>

                        {/* Right: Volume & Headphone Audio Notice */}
                        <div className="flex items-center justify-end gap-2 w-full sm:w-1/3 text-neutral-400">
                          <button
                            onClick={() => setIsMuted(!isMuted)}
                            className="hover:text-white transition-colors cursor-pointer"
                          >
                            {isMuted || volume === 0 ? (
                              <VolumeX className="w-4 h-4 text-neutral-500" />
                            ) : (
                              <Volume2 className="w-4 h-4" />
                            )}
                          </button>

                          <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.05"
                            value={isMuted ? 0 : volume}
                            onChange={(e) => {
                              setVolume(parseFloat(e.target.value));
                              if (isMuted) setIsMuted(false);
                            }}
                            className="w-16 h-1 bg-neutral-700 accent-[#1DB954] cursor-pointer"
                            title="Volume"
                          />

                          <div className="hidden lg:flex items-center gap-1 text-[10px] font-mono text-neutral-500 pl-1 border-l border-neutral-800">
                            <Headphones className="w-3 h-3 text-[#1DB954]" />
                            <span>Hi-Fi</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* PLAYER MODE 2: OFFICIAL SPOTIFY IFRAME EMBED */}
                {!isLoadingArtist && playerMode === 'embed' && (
                  <div className="p-4 sm:p-6 bg-black">
                    <iframe
                      key={activeSpotifyArtistId}
                      src={`https://open.spotify.com/embed/artist/${activeSpotifyArtistId}?utm_source=generator&theme=0`}
                      width="100%"
                      height="352"
                      frameBorder="0"
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                      title={`Spotify Embed - Artist ${activeSpotifyArtistId}`}
                      className="w-full block shadow-2xl"
                    />
                  </div>
                )}

                {/* Quick Artist Selectors & Custom ID Switcher Bar */}
                <div className="px-4 sm:px-6 py-3 bg-black border-t border-neutral-900 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[11px] text-neutral-400 mr-1 flex items-center gap-1">
                      <Music2 className="w-3 h-3 text-[#1DB954]" /> Dynamic Artist ID:
                    </span>
                    {[
                      { name: 'RAISA', id: '0hEurMDQu99nJRq8pTxO14' },
                      { name: 'BERNADYA', id: '318a4qNcvYw6nS9p6h21mC' },
                      { name: 'MAHALINI', id: '776P86JpM5QcfL2Y7G4d8n' },
                      { name: 'TULUS', id: '2auA2ZpknxP1fO2Wv2mX3M' },
                      { name: 'ROSSA', id: '4tZwfgrHOc3mvqYxwwnaCn' },
                      { name: 'CHRISYE', id: '4YgX9rZPvGg6X8p5vG9k12' },
                      { name: 'IWAN FALS', id: '1dfeR4HaWDbWqFHLkxsg1d' }
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setActiveSpotifyArtistId(item.id)}
                        className={`px-2 py-0.5 text-[10px] uppercase font-mono transition-colors border cursor-pointer ${
                          activeSpotifyArtistId === item.id
                            ? 'bg-[#1DB954]/20 text-[#1ed760] border-[#1DB954]/70 font-bold'
                            : 'bg-neutral-900/90 text-neutral-400 hover:text-white border-neutral-800'
                        }`}
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setShowCustomIdInput(!showCustomIdInput)}
                    className="text-[10px] text-neutral-400 hover:text-[#1ed760] transition-colors underline decoration-dotted cursor-pointer"
                  >
                    {showCustomIdInput ? 'Close Custom ID' : '+ Custom Spotify Artist ID'}
                  </button>
                </div>

                {/* Custom ID Input Form */}
                {showCustomIdInput && (
                  <form
                    onSubmit={handleApplyCustomId}
                    className="px-4 sm:px-6 py-2.5 bg-neutral-950 border-t border-neutral-900 flex items-center gap-2"
                  >
                    <input
                      type="text"
                      placeholder="Paste any Spotify Artist ID (e.g. 0hEurMDQu99nJRq8pTxO14)"
                      value={customIdInput}
                      onChange={(e) => setCustomIdInput(e.target.value)}
                      className="flex-1 bg-black border border-neutral-800 px-3 py-1.5 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-[#1DB954] font-mono"
                    />
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-[#1DB954] hover:bg-[#1ed760] text-black text-xs font-mono font-bold transition-colors cursor-pointer"
                    >
                      Fetch Catalog
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Right Column: Artist Visual Overlay with Live Stage Graphic */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/5] w-full overflow-hidden border border-neutral-800 bg-black group">
                {/* SVG Atmospheric Musician Graphic */}
                <svg
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  viewBox="0 0 600 750"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <radialGradient id="artistGlow" cx="45%" cy="35%" r="60%">
                      <stop offset="0%" stopColor="#14B8A6" stopOpacity="0.45" />
                      <stop offset="35%" stopColor="#F59E0B" stopOpacity="0.3" />
                      <stop offset="70%" stopColor="#DC2626" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="#000000" stopOpacity="1" />
                    </radialGradient>
                    <linearGradient id="laserBeam" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#14B8A6" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#14B8A6" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  <rect width="600" height="750" fill="#030303" />
                  <rect width="600" height="750" fill="url(#artistGlow)" />

                  {/* Stage Lasers */}
                  <line x1="50" y1="50" x2="550" y2="700" stroke="url(#laserBeam)" strokeWidth="3" opacity="0.6" />
                  <line x1="550" y1="80" x2="50" y2="650" stroke="#F59E0B" strokeWidth="2" opacity="0.5" />
                  <line x1="300" y1="0" x2="450" y2="750" stroke="#DC2626" strokeWidth="2" opacity="0.4" />

                  {/* Synthesizer Rack & Modular cables */}
                  <rect x="120" y="440" width="360" height="180" fill="#0a0a0a" stroke="#222" strokeWidth="2" />
                  {/* Glowing LED lights on synth rack */}
                  {[160, 200, 240, 280, 320, 360, 400, 440].map((x, i) => (
                    <circle
                      key={i}
                      cx={x}
                      cy={470}
                      r="4"
                      fill={i % 3 === 0 ? '#14B8A6' : i % 3 === 1 ? '#F59E0B' : '#DC2626'}
                      opacity="0.9"
                    />
                  ))}
                  {/* Rotary knobs */}
                  {[160, 200, 240, 280, 320, 360, 400, 440].map((x, i) => (
                    <circle key={`k-${i}`} cx={x} cy={510} r="7" fill="#1c1c1c" stroke="#333" />
                  ))}

                  {/* Performer Silhouette leaning into synthesizer keyboard */}
                  <path
                    d="M240,430 C230,360 250,280 290,240 C320,200 350,210 370,245 C385,270 380,310 395,350 C410,390 440,440 440,500 L160,500 Z"
                    fill="#050505"
                  />
                  {/* Head & headphones silhouette */}
                  <circle cx="320" cy="220" r="38" fill="#000" />
                  <path d="M285,200 C285,165 355,165 355,200" stroke="#F59E0B" strokeWidth="6" fill="none" />

                  {/* Stage smoke texture */}
                  <ellipse cx="300" cy="620" rx="260" ry="80" fill="#000000" opacity="0.9" />

                  {/* Dark Vignette Frame */}
                  <rect width="600" height="750" fill="none" stroke="#262626" strokeWidth="2" />
                </svg>

                {/* Overlaid Badge */}
                <div className="absolute top-4 right-4 bg-black/90 border border-amber-500/40 px-3 py-1.5 text-xs font-mono text-amber-400">
                  JAKARTA EXCLUSIVE
                </div>

                {/* Audio wave animation when active */}
                {isPlaying && (
                  <div className="absolute bottom-4 left-4 right-4 bg-black/95 border border-[#1DB954]/60 p-3 flex items-center justify-between shadow-[0_0_15px_rgba(29,185,84,0.2)]">
                    <div className="flex items-center gap-1.5">
                      {[12, 28, 16, 32, 20, 36, 14, 24, 30, 18, 22].map((height, i) => (
                        <div
                          key={i}
                          className="w-1 bg-[#1DB954] animate-pulse"
                          style={{
                            height: `${height}px`,
                            animationDelay: `${i * 90}ms`,
                            animationDuration: '500ms'
                          }}
                        />
                      ))}
                    </div>
                    <span className="text-[11px] font-mono text-[#1ed760] font-bold">
                      STREAMING: {activeTrack?.title || 'SAMPLE'}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
