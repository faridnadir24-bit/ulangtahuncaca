import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import birthdayConfig from './data/birthdayConfig';
import MusicPlayer from './components/MusicPlayer';
import { ScrapbookDivider } from './components/CuteDecorations';
import OpeningSection from './sections/OpeningSection';
import HeroSection from './sections/HeroSection';
import MemoriesSection from './sections/MemoriesSection';
import LetterSection from './sections/LetterSection';
import CakeSection from './sections/CakeSection';
import WishesSection from './sections/WishesSection';
import FinalSection from './sections/FinalSection';

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [useFallback, setUseFallback] = useState(!birthdayConfig.music.youtubeId);
  const [fallbackError, setFallbackError] = useState(false);

  const ytIframeRef = useRef(null);
  const ytPlayerRef = useRef(null);
  const ytReadyRef = useRef(false);
  const pendingPlayRef = useRef(false);
  const hasEnteredRef = useRef(false);
  const fallbackAudioRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    hasEnteredRef.current = hasEntered;
  }, [hasEntered]);

  // Fallback progress bar hanya untuk browser tanpa CSS scroll-driven animation
  useEffect(() => {
    if (!hasEntered || typeof window === 'undefined') return undefined;
    if (window.CSS?.supports?.('animation-timeline', 'scroll()')) return undefined;

    const handleScroll = () => {
      const el = progressRef.current;
      if (!el) return;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const pct = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
      el.style.setProperty('--scroll-progress', String(pct));
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasEntered]);

  const ytEmbedUrl = useMemo(() => {
    const ytId = birthdayConfig.music.youtubeId;
    if (!ytId) return '';
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const params = new URLSearchParams({
      enablejsapi: '1',
      playsinline: '1',
      loop: '1',
      playlist: ytId,
      rel: '0',
      modestbranding: '1',
      autoplay: '0',
    });
    if (origin) {
      params.set('origin', origin);
      params.set('widget_referrer', origin);
    }
    return `https://www.youtube.com/embed/${ytId}?${params.toString()}`;
  }, []);

  const playFallbackAudio = useCallback(() => {
    const audio = fallbackAudioRef.current;
    if (!audio || fallbackError) return;
    audio.volume = (birthdayConfig.music.defaultVolume ?? 55) / 100;
    audio.muted = isMuted;
    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false));
  }, [fallbackError, isMuted]);

  const switchToFallback = useCallback(
    (shouldPlay = false) => {
      setUseFallback(true);
      if (shouldPlay) {
        setTimeout(() => {
          playFallbackAudio();
        }, 60);
      }
    },
    [playFallbackAudio],
  );

  // Pasang controller YT.Player pada elemen <iframe> yang sudah memiliki origin & referrerPolicy
  useEffect(() => {
    const ytId = birthdayConfig.music.youtubeId;
    if (!birthdayConfig.music.enabled || !ytId) return undefined;

    let cancelled = false;

    const attachYouTubeController = () => {
      if (cancelled || !ytIframeRef.current || !window.YT?.Player || ytPlayerRef.current) {
        return;
      }

      ytPlayerRef.current = new window.YT.Player(ytIframeRef.current, {
        events: {
          onReady: (event) => {
            if (cancelled) return;
            ytReadyRef.current = true;
            event.target.setVolume(birthdayConfig.music.defaultVolume ?? 55);
            if (pendingPlayRef.current) {
              pendingPlayRef.current = false;
              event.target.unMute();
              event.target.playVideo();
            }
          },
          onStateChange: (event) => {
            if (cancelled || !window.YT?.PlayerState) return;
            if (event.data === window.YT.PlayerState.PLAYING) {
              setIsPlaying(true);
            } else if (
              event.data === window.YT.PlayerState.PAUSED ||
              event.data === window.YT.PlayerState.ENDED
            ) {
              setIsPlaying(false);
            }
          },
          onError: () => {
            if (cancelled) return;
            switchToFallback(pendingPlayRef.current || hasEnteredRef.current);
            pendingPlayRef.current = false;
          },
        },
      });
    };

    if (window.YT?.Player) {
      attachYouTubeController();
    } else {
      const prevCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        prevCallback?.();
        attachYouTubeController();
      };

      const existingScript = document.querySelector(
        'script[src="https://www.youtube.com/iframe_api"]',
      );
      if (!existingScript) {
        const script = document.createElement('script');
        script.src = 'https://www.youtube.com/iframe_api';
        script.async = true;
        script.onerror = () => {
          if (!cancelled) {
            switchToFallback(pendingPlayRef.current || hasEnteredRef.current);
          }
        };
        document.head.appendChild(script);
      }
    }

    return () => {
      cancelled = true;
    };
  }, [switchToFallback]);

  // Sinkronkan mute ke audio fallback dan YouTube player
  useEffect(() => {
    const audio = fallbackAudioRef.current;
    if (audio) {
      audio.volume = (birthdayConfig.music.defaultVolume ?? 55) / 100;
      audio.muted = isMuted;
    }

    const player = ytPlayerRef.current;
    if (player && ytReadyRef.current && !useFallback) {
      try {
        if (isMuted) {
          player.mute();
        } else {
          player.unMute();
          player.setVolume(birthdayConfig.music.defaultVolume ?? 55);
        }
      } catch {
        // Abaikan bila player belum siap
      }
    }
  }, [isMuted, useFallback]);

  const startMusicFromGesture = () => {
    if (!birthdayConfig.music.enabled) return;

    if (!useFallback && birthdayConfig.music.youtubeId) {
      const player = ytPlayerRef.current;
      if (player && ytReadyRef.current) {
        try {
          player.unMute();
          player.setVolume(birthdayConfig.music.defaultVolume ?? 55);
          player.playVideo();
          setIsPlaying(true);
          return;
        } catch {
          switchToFallback(true);
          return;
        }
      }

      // Bila iframe API masih loading saat tombol diklik, kirim postMessage langsung + antrekan play
      try {
        ytIframeRef.current?.contentWindow?.postMessage(
          JSON.stringify({ event: 'command', func: 'unMute', args: [] }),
          '*',
        );
        ytIframeRef.current?.contentWindow?.postMessage(
          JSON.stringify({ event: 'command', func: 'playVideo', args: [] }),
          '*',
        );
      } catch {
        // Abaikan jika postMessage gagal
      }
      pendingPlayRef.current = true;
      return;
    }

    playFallbackAudio();
  };

  const togglePlay = () => {
    if (!useFallback && ytPlayerRef.current && ytReadyRef.current) {
      try {
        if (isPlaying) {
          ytPlayerRef.current.pauseVideo();
          setIsPlaying(false);
        } else {
          ytPlayerRef.current.unMute();
          ytPlayerRef.current.playVideo();
          setIsPlaying(true);
        }
        return;
      } catch {
        switchToFallback(true);
        return;
      }
    }

    const audio = fallbackAudioRef.current;
    if (!audio || fallbackError) return;
    if (audio.paused) {
      playFallbackAudio();
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  const handleOpenComplete = () => {
    setHasEntered(true);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const displayTitle = useFallback
    ? birthdayConfig.music.fallbackTitle
    : birthdayConfig.music.title;
  const displaySubtitle = useFallback
    ? birthdayConfig.music.fallbackSubtitle
    : birthdayConfig.music.subtitle;

  return (
    <div className="min-h-dvh bg-[#FFF0F5] text-[#75465A] selection:bg-[#F8BBD0] selection:text-[#75465A]">
      {/* IFrame YouTube dengan referrerPolicy & origin eksplisit (tidak autoplay sebelum interaksi) */}
      {birthdayConfig.music.enabled && birthdayConfig.music.youtubeId && !useFallback && (
        <div
          className={`fixed overflow-hidden rounded-2xl border-2 border-white bg-white shadow-xl transition-all duration-300 ${
            hasEntered && showVideo
              ? 'bottom-20 right-4 sm:bottom-24 sm:right-6 z-40 h-[126px] w-[224px] pointer-events-auto'
              : '-top-[320px] left-0 z-0 h-[118px] w-[210px] pointer-events-none'
          }`}
          aria-hidden={!showVideo}
        >
          <iframe
            ref={ytIframeRef}
            id="yt-birthday-player"
            src={ytEmbedUrl}
            title="Selamat Ulang Tahun - Rizky Febian"
            width="224"
            height="126"
            allow="autoplay; encrypted-media; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
            className="h-full w-full border-0"
          />
        </div>
      )}

      {/* Audio cadangan lokal bila YouTube gagal dimuat */}
      {birthdayConfig.music.enabled && (
        <audio
          ref={fallbackAudioRef}
          src={birthdayConfig.music.fallbackSrc}
          loop
          preload="auto"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onError={() => {
            setFallbackError(true);
            setIsPlaying(false);
          }}
        />
      )}

      <AnimatePresence mode="wait">
        {!hasEntered ? (
          <OpeningSection
            key="opening"
            config={birthdayConfig}
            onStartMusic={startMusicFromGesture}
            onOpenComplete={handleOpenComplete}
          />
        ) : (
          <motion.main
            key="birthday-home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.75, ease: 'easeOut' }}
            className="relative"
          >
            <div id="scroll-progress" ref={progressRef} aria-hidden="true" />
            <HeroSection config={birthdayConfig} />
            <ScrapbookDivider />
            <MemoriesSection config={birthdayConfig} />
            <ScrapbookDivider />
            <LetterSection config={birthdayConfig} />
            <ScrapbookDivider />
            <CakeSection config={birthdayConfig} />
            <ScrapbookDivider />
            <WishesSection config={birthdayConfig} />
            <FinalSection config={birthdayConfig} />

            {birthdayConfig.music.enabled && (
              <MusicPlayer
                isPlaying={isPlaying}
                hasError={useFallback && fallbackError}
                isMuted={isMuted}
                isUsingFallback={useFallback}
                showVideo={showVideo}
                title={displayTitle}
                subtitle={displaySubtitle}
                youtubeUrl={birthdayConfig.music.youtubeUrl}
                onTogglePlay={togglePlay}
                onToggleMute={toggleMute}
                onToggleVideo={() => setShowVideo((prev) => !prev)}
              />
            )}
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}
