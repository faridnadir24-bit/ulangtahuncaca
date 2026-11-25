import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
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

/**
 * Bangun URL embed YouTube dengan parameter mobile-friendly dan referrer/origin valid.
 */
function buildYtEmbedUrl(ytId) {
  if (!ytId) return '';
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const hasHttpOrigin = origin && origin.startsWith('http');
  const params = new URLSearchParams({
    enablejsapi: '1',
    playsinline: '1',
    loop: '1',
    playlist: ytId,
    rel: '0',
    modestbranding: '1',
    autoplay: '0',
  });
  if (hasHttpOrigin) {
    params.set('origin', origin);
    params.set('widget_referrer', origin);
  }
  return `https://www.youtube.com/embed/${ytId}?${params.toString()}`;
}

export default function App() {
  const ytCandidates = useMemo(() => {
    const primary = birthdayConfig.music.youtubeId;
    const backups = birthdayConfig.music.youtubeBackupIds || [];
    return [primary, ...backups].filter((id, idx, arr) => id && arr.indexOf(id) === idx);
  }, []);

  const hasPrimaryLocalAudio = Boolean(birthdayConfig.music.primaryAudioSrc);
  const hasYouTubeSource = ytCandidates.length > 0 && !hasPrimaryLocalAudio;

  const [hasEntered, setHasEntered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [needsDirectTap, setNeedsDirectTap] = useState(false);
  const [ytCandidateIdx, setYtCandidateIdx] = useState(0);
  const [retryNonce, setRetryNonce] = useState(0);
  const [ytErrorCode, setYtErrorCode] = useState(null);
  const [useFallback, setUseFallback] = useState(!hasYouTubeSource && !hasPrimaryLocalAudio);
  const [fallbackError, setFallbackError] = useState(false);

  const ytSlotRef = useRef(null);
  const ytPlayerRef = useRef(null);
  const ytReadyRef = useRef(false);
  const pendingPlayRef = useRef(false);
  const playCheckTimerRef = useRef(null);
  const hasEnteredRef = useRef(false);
  const isMutedRef = useRef(false);
  const fallbackAudioRef = useRef(null);
  const progressRef = useRef(null);

  const activeYtId = ytCandidates[ytCandidateIdx] || '';

  useEffect(() => {
    hasEnteredRef.current = hasEntered;
  }, [hasEntered]);

  useEffect(() => {
    isMutedRef.current = isMuted;
  }, [isMuted]);

  const clearPlayCheckTimer = useCallback(() => {
    if (playCheckTimerRef.current) {
      clearTimeout(playCheckTimerRef.current);
      playCheckTimerRef.current = null;
    }
  }, []);

  /**
   * Pastikan di browser HP (iOS Safari / mobile Chrome) jika pemutaran lintas-iframe
   * tertahan oleh kebijakan autoplay, mini video YouTube ditampilkan dengan prompt jelas
   * agar cukup 1 ketukan langsung — tanpa memutar audio piano secara diam-diam.
   */
  const scheduleMobilePlaybackCheck = useCallback(
    (delayMs = 1800) => {
      clearPlayCheckTimer();
      playCheckTimerRef.current = setTimeout(() => {
        const player = ytPlayerRef.current;
        const state = player?.getPlayerState?.();
        // 1 = PLAYING, 3 = BUFFERING
        if (state !== 1 && state !== 3) {
          setIsPlaying(false);
          setNeedsDirectTap(true);
          if (hasEnteredRef.current) {
            setShowVideo(true);
          }
        }
      }, delayMs);
    },
    [clearPlayCheckTimer],
  );

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

  const playLocalAudio = useCallback(() => {
    const audio = fallbackAudioRef.current;
    if (!audio || fallbackError) return;
    audio.volume = (birthdayConfig.music.defaultVolume ?? 55) / 100;
    audio.muted = isMutedRef.current;
    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false));
  }, [fallbackError]);

  const switchToFallback = useCallback(
    (shouldPlay = false) => {
      clearPlayCheckTimer();
      setNeedsDirectTap(false);
      setShowVideo(false);
      setUseFallback(true);
      if (shouldPlay) {
        setTimeout(() => {
          playLocalAudio();
        }, 60);
      }
    },
    [clearPlayCheckTimer, playLocalAudio],
  );

  // Pasang YouTube iframe secara terprogram setelah YT.Player API siap
  // agar bebas race-condition StrictMode maupun mobile slow-network.
  useEffect(() => {
    if (!birthdayConfig.music.enabled || !hasYouTubeSource || !activeYtId || useFallback) {
      return undefined;
    }

    let cancelled = false;
    const slot = ytSlotRef.current;
    ytReadyRef.current = false;

    const attachYouTubeController = () => {
      if (cancelled || !slot || !window.YT?.Player) {
        return;
      }

      try {
        ytPlayerRef.current?.destroy?.();
      } catch {
        // Abaikan jika player lama sudah dibersihkan
      }
      ytPlayerRef.current = null;
      slot.innerHTML = '';

      const iframe = document.createElement('iframe');
      iframe.id = 'yt-birthday-player';
      iframe.title = `${birthdayConfig.music.title} - ${birthdayConfig.music.subtitle}`;
      iframe.width = '224';
      iframe.height = '126';
      iframe.allow = 'autoplay; encrypted-media; picture-in-picture';
      iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
      iframe.setAttribute('playsinline', '');
      iframe.className = 'h-full w-full border-0';
      iframe.src = buildYtEmbedUrl(activeYtId);
      slot.appendChild(iframe);

      ytPlayerRef.current = new window.YT.Player(iframe, {
        events: {
          onReady: (event) => {
            if (cancelled) return;
            ytReadyRef.current = true;
            const vol = birthdayConfig.music.defaultVolume ?? 55;
            event.target.setVolume(vol);
            if (isMutedRef.current) {
              event.target.mute();
            } else {
              event.target.unMute();
            }
            if (pendingPlayRef.current) {
              pendingPlayRef.current = false;
              event.target.playVideo();
              scheduleMobilePlaybackCheck(1800);
            }
          },
          onStateChange: (event) => {
            if (cancelled || !window.YT?.PlayerState) return;
            if (event.data === window.YT.PlayerState.PLAYING) {
              clearPlayCheckTimer();
              setIsPlaying(true);
              setNeedsDirectTap(false);
            } else if (event.data === window.YT.PlayerState.BUFFERING) {
              clearPlayCheckTimer();
              scheduleMobilePlaybackCheck(5000);
            } else if (
              event.data === window.YT.PlayerState.PAUSED ||
              event.data === window.YT.PlayerState.ENDED
            ) {
              clearPlayCheckTimer();
              setIsPlaying(false);
            }
          },
          onError: (event) => {
            if (cancelled) return;
            clearPlayCheckTimer();
            const code = event?.data ?? 'ERR';
            // Coba video Rizky Febian cadangan dulu sebelum turun ke audio piano
            if (ytCandidateIdx + 1 < ytCandidates.length) {
              pendingPlayRef.current = pendingPlayRef.current || hasEnteredRef.current;
              setYtCandidateIdx((prev) => prev + 1);
              return;
            }
            setYtErrorCode(code);
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
            setYtErrorCode('API');
            switchToFallback(pendingPlayRef.current || hasEnteredRef.current);
          }
        };
        document.head.appendChild(script);
      }
    }

    return () => {
      cancelled = true;
      clearPlayCheckTimer();
      ytReadyRef.current = false;
      try {
        ytPlayerRef.current?.destroy?.();
      } catch {
        // Abaikan error saat unmount
      }
      ytPlayerRef.current = null;
      if (slot) {
        slot.innerHTML = '';
      }
    };
  }, [
    activeYtId,
    clearPlayCheckTimer,
    hasYouTubeSource,
    retryNonce,
    scheduleMobilePlaybackCheck,
    switchToFallback,
    useFallback,
    ytCandidateIdx,
    ytCandidates.length,
  ]);

  // Sinkronkan mute ke audio lokal maupun YouTube player
  useEffect(() => {
    const audio = fallbackAudioRef.current;
    if (audio) {
      audio.volume = (birthdayConfig.music.defaultVolume ?? 55) / 100;
      audio.muted = isMuted;
    }

    const player = ytPlayerRef.current;
    if (player && ytReadyRef.current && !useFallback && !hasPrimaryLocalAudio) {
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
  }, [hasPrimaryLocalAudio, isMuted, useFallback]);

  const startMusicFromGesture = () => {
    if (!birthdayConfig.music.enabled) return;

    if (hasPrimaryLocalAudio || useFallback) {
      playLocalAudio();
      return;
    }

    if (hasYouTubeSource) {
      const player = ytPlayerRef.current;
      if (player && ytReadyRef.current) {
        try {
          if (isMutedRef.current) {
            player.mute();
          } else {
            player.unMute();
            player.setVolume(birthdayConfig.music.defaultVolume ?? 55);
          }
          player.playVideo();
          scheduleMobilePlaybackCheck(2000);
          return;
        } catch {
          pendingPlayRef.current = true;
          scheduleMobilePlaybackCheck(2000);
          return;
        }
      }

      // YouTube masih memuat saat tombol diklik: antrekan & pantau status autoplay HP
      pendingPlayRef.current = true;
      scheduleMobilePlaybackCheck(2600);
    }
  };

  const togglePlay = () => {
    if (!birthdayConfig.music.enabled) return;

    // Jika YouTube masih aktif sebagai sumber utama, JANGAN pernah fallback ke piano dari sini
    if (hasYouTubeSource && !useFallback) {
      const player = ytPlayerRef.current;
      if (player && ytReadyRef.current) {
        try {
          if (isPlaying) {
            clearPlayCheckTimer();
            player.pauseVideo();
            setIsPlaying(false);
          } else {
            setNeedsDirectTap(false);
            if (isMutedRef.current) {
              player.mute();
            } else {
              player.unMute();
              player.setVolume(birthdayConfig.music.defaultVolume ?? 55);
            }
            player.playVideo();
            scheduleMobilePlaybackCheck(1500);
          }
          return;
        } catch {
          setShowVideo(true);
          setNeedsDirectTap(true);
          return;
        }
      }

      // Bila player YouTube masih loading di HP, buka mini-player dan minta ketuk video
      pendingPlayRef.current = true;
      setShowVideo(true);
      setNeedsDirectTap(true);
      return;
    }

    const audio = fallbackAudioRef.current;
    if (!audio || fallbackError) return;
    if (audio.paused) {
      playLocalAudio();
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  const handleRetryYouTube = () => {
    if (!hasYouTubeSource) return;
    const audio = fallbackAudioRef.current;
    if (audio && !audio.paused) {
      audio.pause();
    }
    setIsPlaying(false);
    setYtErrorCode(null);
    setYtCandidateIdx(0);
    setUseFallback(false);
    setShowVideo(true);
    setNeedsDirectTap(true);
    pendingPlayRef.current = true;
    setRetryNonce((prev) => prev + 1);
  };

  const handleOpenComplete = () => {
    setHasEntered(true);
    window.scrollTo({ top: 0, behavior: 'instant' });
    // Jika YouTube tertahan kebijakan autoplay saat transisi opening, buka mini player supaya terlihat
    if (hasYouTubeSource && !useFallback) {
      const state = ytPlayerRef.current?.getPlayerState?.();
      if (ytReadyRef.current && state !== 1 && state !== 3 && !pendingPlayRef.current) {
        scheduleMobilePlaybackCheck(800);
      }
    }
  };

  const displayTitle = useFallback
    ? birthdayConfig.music.fallbackTitle
    : birthdayConfig.music.title;
  const displaySubtitle = useFallback
    ? birthdayConfig.music.fallbackSubtitle
    : birthdayConfig.music.subtitle;

  const isVideoOverlayVisible =
    birthdayConfig.music.enabled && hasYouTubeSource && !useFallback && hasEntered && showVideo;

  useEffect(() => {
    const iframe = ytSlotRef.current?.querySelector('iframe');
    if (iframe) {
      iframe.tabIndex = isVideoOverlayVisible ? 0 : -1;
    }
  }, [isVideoOverlayVisible, ytCandidateIdx, retryNonce]);

  return (
    <div className="min-h-dvh bg-[#FFF0F5] text-[#75465A] selection:bg-[#F8BBD0] selection:text-[#75465A]">
      {/* IFrame YouTube disembunyikan rapi di luar viewport atas saat video tidak ditampilkan
          (hindari display:none/visibility:hidden agar YT.Player tetap aktif) */}
      {birthdayConfig.music.enabled && hasYouTubeSource && !useFallback && (
        <div
          className={`fixed transition-all duration-300 ${
            isVideoOverlayVisible
              ? 'bottom-20 right-4 sm:bottom-24 sm:right-6 z-40 w-[232px] pointer-events-auto'
              : '-top-[320px] left-0 z-0 w-[210px] pointer-events-none'
          }`}
          aria-hidden={!isVideoOverlayVisible}
        >
          {isVideoOverlayVisible && needsDirectTap && !isPlaying && (
            <div className="mb-1.5 flex items-center justify-between gap-2 rounded-full border border-white bg-[#FFF0F5]/95 px-3 py-1 text-[11px] font-bold text-[#B94F7C] shadow-md backdrop-blur-sm font-heading">
              <span className="truncate">Ketuk ▶ di video buat putar lagu</span>
              <button
                type="button"
                onClick={() => setShowVideo(false)}
                aria-label="Tutup jendela video"
                className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#FFE4EC] text-[#B94F7C] hover:bg-[#F8BBD0]"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}

          <div
            ref={ytSlotRef}
            className={`overflow-hidden rounded-2xl ${
              isVideoOverlayVisible
                ? 'h-[130px] w-[232px] border-2 border-white bg-white shadow-xl'
                : 'h-[118px] w-[210px] border-0 bg-transparent shadow-none'
            }`}
          />
        </div>
      )}

      {/* Audio lokal: lagu utama (jika primaryAudioSrc diisi) atau cadangan piano */}
      {birthdayConfig.music.enabled && (
        <audio
          ref={fallbackAudioRef}
          src={birthdayConfig.music.primaryAudioSrc || birthdayConfig.music.fallbackSrc}
          loop
          preload={useFallback || hasPrimaryLocalAudio ? 'auto' : 'none'}
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
            className="relative z-10 bg-[#FFF0F5]"
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
                hasError={(useFallback || hasPrimaryLocalAudio) && fallbackError}
                isMuted={isMuted}
                isUsingFallback={useFallback}
                showVideo={showVideo}
                needsDirectTap={needsDirectTap}
                ytErrorCode={ytErrorCode}
                hasYouTubeSource={hasYouTubeSource}
                title={displayTitle}
                subtitle={displaySubtitle}
                youtubeUrl={birthdayConfig.music.youtubeUrl}
                onTogglePlay={togglePlay}
                onToggleMute={toggleMute}
                onToggleVideo={() => setShowVideo((prev) => !prev)}
                onRetryYouTube={handleRetryYouTube}
              />
            )}
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}
