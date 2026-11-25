import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ExternalLink, Music, Pause, Play, RotateCcw, Video, Volume2, VolumeX } from 'lucide-react';

/**
 * Pemutar musik melayang berwarna pink pastel dengan kontrol Play/Pause, Mute,
 * toggle mini-video YouTube, tombol coba ulang YouTube bila fallback aktif,
 * serta tautan ke video YouTube asli.
 */
export default function MusicPlayer({
  isPlaying,
  hasError,
  isMuted,
  isUsingFallback,
  showVideo = false,
  needsDirectTap = false,
  ytErrorCode = null,
  hasYouTubeSource = false,
  title,
  subtitle,
  youtubeUrl,
  onTogglePlay,
  onToggleMute,
  onToggleVideo,
  onRetryYouTube,
}) {
  const [expanded, setExpanded] = useState(false);

  const renderStatusText = () => {
    if (hasError) return 'Cek koneksi / YouTube';
    if (isUsingFallback) {
      if (!isPlaying) return 'Cadangan dijeda • Klik putar';
      if (isMuted) return 'Lagi di-mute';
      return ytErrorCode
        ? `${subtitle} (Cadangan • YT ${ytErrorCode})`
        : `${subtitle} (Cadangan)`;
    }
    if (needsDirectTap && !isPlaying) {
      return 'Ketuk ▶ di video atas ya';
    }
    if (isPlaying) {
      return isMuted ? 'Lagi di-mute' : subtitle;
    }
    return 'Lagi dijeda • Klik putar';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      style={{
        bottom: 'max(1rem, env(safe-area-inset-bottom, 0px))',
        right: 'max(1rem, env(safe-area-inset-right, 0px))',
      }}
      className="fixed z-40"
    >
      <div className="flex items-center gap-2 rounded-full border-2 border-white/90 bg-white/92 px-2.5 py-2 shadow-[0_10px_28px_-6px_rgba(185,79,124,0.3)] backdrop-blur-md">
        <button
          type="button"
          onClick={onTogglePlay}
          disabled={hasError}
          aria-label={
            hasError
              ? 'Lagu tidak tersedia'
              : isPlaying
                ? 'Jeda lagu'
                : 'Putar lagu'
          }
          className={`touch-control flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-transform active:scale-95 ${
            hasError
              ? 'bg-[#FFE4EC] text-[#B94F7C]/50 cursor-not-allowed'
              : 'bg-gradient-to-br from-[#F48FB1] to-[#E875A5] text-white shadow-sm hover:scale-105'
          }`}
        >
          {isPlaying && !hasError ? (
            <Pause className="h-4 w-4 fill-current" />
          ) : (
            <Play className="h-4 w-4 translate-x-[1px] fill-current" />
          )}
        </button>

        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          className="flex items-center gap-2 pr-1.5 text-left focus:outline-none"
          aria-label="Opsi pemutar lagu"
          aria-expanded={expanded}
        >
          <div className="flex h-4 items-end gap-[3px]" aria-hidden="true">
            {[0, 0.2, 0.4, 0.15].map((delay, idx) => (
              <span
                key={idx}
                style={{ animationDelay: `${delay}s` }}
                className={`w-[3px] rounded-full transition-all ${
                  isPlaying && !hasError && !isMuted
                    ? 'h-4 bg-[#E875A5] animate-eq-bar'
                    : 'h-1.5 bg-[#F8BBD0]'
                }`}
              />
            ))}
          </div>

          <div className="max-w-[152px] sm:max-w-[180px]">
            <p className="truncate text-xs font-bold text-[#B94F7C] font-heading leading-tight">
              {hasError ? 'Lagu Belum Siap' : title}
            </p>
            <p className="truncate text-[10px] text-[#966379] leading-tight">
              {renderStatusText()}
            </p>
          </div>
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, width: 0, scale: 0.7 }}
              animate={{ opacity: 1, width: 'auto', scale: 1 }}
              exit={{ opacity: 0, width: 0, scale: 0.7 }}
              className="flex items-center gap-1 overflow-hidden"
            >
              {!hasError && (
                <button
                  type="button"
                  onClick={onToggleMute}
                  aria-label={isMuted ? 'Nyalakan suara' : 'Bisukan suara'}
                  className="touch-control flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FFF0F5] text-[#B94F7C] hover:bg-[#FFE4EC] transition-colors"
                >
                  {isMuted ? (
                    <VolumeX className="h-4 w-4" />
                  ) : (
                    <Volume2 className="h-4 w-4" />
                  )}
                </button>
              )}

              {!isUsingFallback && onToggleVideo && (
                <button
                  type="button"
                  onClick={onToggleVideo}
                  aria-label={showVideo ? 'Sembunyikan video' : 'Tampilkan video YouTube'}
                  className={`touch-control flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors ${
                    showVideo
                      ? 'bg-[#E875A5] text-white'
                      : 'bg-[#FFF0F5] text-[#B94F7C] hover:bg-[#FFE4EC]'
                  }`}
                >
                  <Video className="h-3.5 w-3.5" />
                </button>
              )}

              {isUsingFallback && hasYouTubeSource && onRetryYouTube && (
                <button
                  type="button"
                  onClick={onRetryYouTube}
                  aria-label="Coba putar lagu Rizky Febian lagi"
                  title="Coba putar Rizky Febian lagi"
                  className="touch-control flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FFF0F5] text-[#B94F7C] hover:bg-[#FFE4EC] transition-colors"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                </button>
              )}

              {youtubeUrl && (
                <a
                  href={youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Buka lagu di YouTube"
                  className="touch-control flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FFF0F5] text-[#B94F7C] hover:bg-[#FFE4EC] transition-colors"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {!expanded && (
          <span
            className="hidden sm:flex h-7 w-7 items-center justify-center rounded-full bg-[#FFF0F5] text-[#E875A5]"
            aria-hidden="true"
          >
            <Music className="h-3.5 w-3.5" />
          </span>
        )}
      </div>
    </motion.div>
  );
}
