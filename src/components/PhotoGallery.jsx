import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  CalendarHeart,
  Camera,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Film,
  Sparkles,
  X,
} from 'lucide-react';
import { HeartIcon, PinkBow, SparkleStar, StickerBadge } from './CuteDecorations';

function MissingPhotoPlaceholder({ item }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#FFF0F5] via-[#FFE4EC] to-[#F8BBD0]/55 p-4 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-dashed border-[#F48FB1] bg-white/85 text-[#E875A5] shadow-xs">
        <Camera className="h-7 w-7" />
      </div>
      <p className="mt-3 text-xs sm:text-sm font-bold text-[#B94F7C] font-heading">
        Foto Belum Tersedia
      </p>
      <p className="mt-1 max-w-[190px] text-[11px] leading-snug text-[#75465A]">
        Taruh{' '}
        <code className="rounded bg-white/80 px-1 py-0.5 text-[10px] text-[#B94F7C]">
          {item.filename}
        </code>{' '}
        di <span className="font-semibold">/public/images/memories/</span>
      </p>
    </div>
  );
}

function TapeStrip({ style = 'polka' }) {
  const styleClass =
    style === 'stripe'
      ? 'washi-stripe'
      : style === 'blush'
        ? 'washi-blush'
        : 'washi-polka';

  return (
    <div
      className={`washi-tape mx-auto -mt-6 mb-2 h-5 w-24 -rotate-2 rounded-[2px] ${styleClass}`}
      aria-hidden="true"
    />
  );
}

function ScrapbookFrameDecor({ frameStyle = 'classic' }) {
  if (frameStyle === 'ribbon') {
    return (
      <>
        <span
          className="pointer-events-none absolute top-0 left-0 z-10 h-6 w-6 bg-gradient-to-br from-[#F48FB1] to-[#F8BBD0] opacity-85"
          style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}
          aria-hidden="true"
        />
        <span
          className="pointer-events-none absolute bottom-0 right-0 z-10 h-6 w-6 bg-gradient-to-tl from-[#F48FB1] to-[#F8BBD0] opacity-85"
          style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }}
          aria-hidden="true"
        />
      </>
    );
  }

  if (frameStyle === 'lace') {
    return (
      <div
        className="pointer-events-none absolute inset-1 z-10 rounded-[3px] border border-dashed border-[#F48FB1]/70"
        aria-hidden="true"
      />
    );
  }

  if (frameStyle === 'stamp') {
    return (
      <div
        className="pointer-events-none absolute inset-1.5 z-10 rounded-[2px] border border-dotted border-[#E875A5]/65"
        aria-hidden="true"
      />
    );
  }

  return null;
}

/**
 * Strip Photobooth Pink yang menampilkan 3 foto tirai merah dan 1 klip animasi.
 */
function PhotoboothStrip({ photobooth, basePath, onOpenPhoto, onOpenVideo, missingMap, onImageError }) {
  if (!photobooth) return null;

  return (
    <motion.div
      initial={{ opacity: 0.9, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55 }}
      className="mb-12 sm:mb-14 rounded-[26px] border-2 border-white bg-gradient-to-br from-[#FFE4EC]/95 via-[#F8BBD0]/55 to-[#FFE4EC]/95 p-4 sm:p-6 shadow-[0_18px_42px_-12px_rgba(185,79,124,0.24)] relative overflow-hidden"
    >
      <div className="film-sprocket-row h-3.5 w-full opacity-95 mb-3" aria-hidden="true" />

      <div className="flex flex-wrap items-center justify-between gap-2 px-1 mb-4">
        <div className="inline-flex items-center gap-2">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#E875A5] shadow-xs" aria-hidden="true">
            <Film className="h-4 w-4" />
          </span>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-[#B94F7C] font-heading leading-tight">
              {photobooth.title}
            </h3>
            <p className="text-xs text-[#75465A]">{photobooth.subtitle}</p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold text-[#B94F7C] shadow-xs">
          <PinkBow className="w-5 h-3.5" />
          <span>{photobooth.badge || '4 Cuts'}</span>
        </div>
      </div>

      {/* Grid 4-Cut: 3 Foto + 1 Klip Live */}
      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
        {photobooth.frames.map((frame, idx) => {
          const isMissing = !frame.filename?.trim() || Boolean(missingMap[frame.id]);
          return (
            <motion.button
              key={frame.id}
              type="button"
              onClick={() => onOpenPhoto(frame)}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative rounded-xl border-2 border-white bg-white p-2 pb-3 text-left shadow-sm transition-shadow hover:shadow-md focus:outline-none focus-visible:ring-4 focus-visible:ring-[#F48FB1]/60"
            >
              <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg bg-[#FFF0F5]">
                {isMissing ? (
                  <MissingPhotoPlaceholder item={frame} />
                ) : (
                  <img
                    src={`${basePath}${frame.filename}`}
                    alt={frame.caption}
                    width="1280"
                    height="853"
                    onError={() => onImageError(frame.id)}
                    className="h-full w-full object-cover brightness-[1.02] saturate-[1.04] transition-transform duration-500 group-hover:scale-105"
                  />
                )}
                <span className="absolute top-1.5 left-1.5 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-bold text-[#B94F7C] shadow-xs">
                  0{idx + 1}
                </span>
              </div>
              <p className="mt-2 truncate text-center text-xs font-semibold text-[#75465A] font-serif-warm">
                {frame.caption}
              </p>
            </motion.button>
          );
        })}

        {photobooth.video && (
          <motion.button
            type="button"
            onClick={() => onOpenVideo(photobooth.video)}
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative rounded-xl border-2 border-white bg-white p-2 pb-3 text-left shadow-sm transition-shadow hover:shadow-md focus:outline-none focus-visible:ring-4 focus-visible:ring-[#F48FB1]/60"
          >
            <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg bg-[#FFF0F5]">
              <video
                src={`${basePath}${photobooth.video.filename}`}
                width="492"
                height="328"
                autoPlay
                loop
                muted
                playsInline
                aria-hidden="true"
                className="h-full w-full object-cover brightness-[1.02]"
              />
              <span className="absolute top-1.5 left-1.5 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-[#F48FB1] to-[#E875A5] px-2 py-0.5 text-[10px] font-bold text-white shadow-xs">
                <Sparkles className="h-2.5 w-2.5" />
                LIVE
              </span>
            </div>
            <p className="mt-2 truncate text-center text-xs font-semibold text-[#B94F7C] font-serif-warm">
              {photobooth.video.caption}
            </p>
          </motion.button>
        )}
      </div>

      <div className="film-sprocket-row h-3.5 w-full opacity-95 mt-4" aria-hidden="true" />
    </motion.div>
  );
}

/**
 * Galeri Foto Scrapbook Polaroid dengan variasi bingkai kustom,
 * layout flex-wrap terpusat (tanpa slot grid kosong), dan modal <dialog> native.
 */
export default function PhotoGallery({
  items = [],
  photobooth = null,
  basePath = '/images/memories/',
  initialVisible = 6,
  showMoreText = 'Lihat semua foto',
  showLessText = 'Tutup sebagian',
}) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);
  const [missingMap, setMissingMap] = useState({});
  const [showAll, setShowAll] = useState(false);

  const dialogRef = useRef(null);

  const visibleItems = showAll ? items : items.slice(0, initialVisible);
  const hasMore = items.length > initialVisible;

  const allPhotos = photobooth?.frames ? [...items, ...photobooth.frames] : items;
  const selectedItem = selectedIndex !== null ? allPhotos[selectedIndex] : null;
  const isModalOpen = Boolean(selectedItem || activeVideo);

  const markMissing = (id) => {
    setMissingMap((prev) => (prev[id] ? prev : { ...prev, [id]: true }));
  };

  const closeModal = useCallback(() => {
    setSelectedIndex(null);
    setActiveVideo(null);
  }, []);

  const openPhotoById = (id) => {
    const idx = allPhotos.findIndex((p) => p.id === id);
    if (idx >= 0) {
      setActiveVideo(null);
      setSelectedIndex(idx);
    }
  };

  const showPrev = useCallback(() => {
    setSelectedIndex((prev) => (prev === null ? null : (prev - 1 + allPhotos.length) % allPhotos.length));
  }, [allPhotos.length]);

  const showNext = useCallback(() => {
    setSelectedIndex((prev) => (prev === null ? null : (prev + 1) % allPhotos.length));
  }, [allPhotos.length]);

  // Sinkronkan native <dialog>.showModal() / .close() dengan state React
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isModalOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isModalOpen && dialog.open) {
      dialog.close();
    }
  }, [isModalOpen]);

  useEffect(() => {
    if (selectedIndex === null) return undefined;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, showPrev, showNext]);

  return (
    <>
      <PhotoboothStrip
        photobooth={photobooth}
        basePath={basePath}
        missingMap={missingMap}
        onImageError={markMissing}
        onOpenPhoto={(frame) => openPhotoById(frame.id)}
        onOpenVideo={(video) => {
          setSelectedIndex(null);
          setActiveVideo(video);
        }}
      />

      <div className="flex flex-wrap justify-center gap-8 sm:gap-9">
        {visibleItems.map((item, idx) => {
          const hasFilename = Boolean(item.filename && item.filename.trim());
          const imageSrc = `${basePath}${item.filename}`;
          const isMissing = !hasFilename || Boolean(missingMap[item.id]);
          const frameStyle = item.frameStyle || 'classic';

          const outerFrameClass =
            frameStyle === 'gingham'
              ? 'frame-gingham border-[#F8BBD0]'
              : frameStyle === 'lace'
                ? 'frame-lace bg-white border-[#F48FB1]/55'
                : 'bg-white border-[#FFE4EC]';

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0.92, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: Math.min(idx, 5) * 0.04 }}
              whileHover={{
                y: -6,
                rotate: 0,
                scale: 1.02,
                transition: { type: 'spring', stiffness: 260, damping: 18 },
              }}
              whileTap={{ scale: 0.98 }}
              style={{ rotate: `${item.rotation ?? (idx % 2 === 0 ? -2 : 2)}deg` }}
              className="group relative w-full sm:w-[calc(50%-1.125rem)] lg:w-[calc(33.333%-1.5rem)]"
            >
              <button
                type="button"
                onClick={() => openPhotoById(item.id)}
                className={`polaroid-card relative block w-full rounded-[6px] border p-3.5 pb-6 text-left focus:outline-none focus-visible:ring-4 focus-visible:ring-[#F48FB1]/50 ${outerFrameClass}`}
                aria-label={`Buka foto: ${item.caption}`}
              >
                <TapeStrip style={item.tapeStyle} />

                <div className="pointer-events-none absolute -top-3 -right-2 z-20 rotate-12 transition-transform duration-300 group-hover:scale-110">
                  <StickerBadge type={item.sticker || 'heart'} />
                </div>

                <div
                  className="pointer-events-none absolute -bottom-2 -left-2 z-20 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:-translate-y-1"
                  aria-hidden="true"
                >
                  <HeartIcon className="w-6 h-6 drop-shadow-xs" color="#E875A5" stroke="#FFFFFF" />
                </div>

                <div className="relative aspect-[4/4.2] w-full overflow-hidden rounded-[3px] border-2 border-white bg-[#FFF0F5] shadow-xs">
                  <ScrapbookFrameDecor frameStyle={frameStyle} />
                  {isMissing ? (
                    <MissingPhotoPlaceholder item={item} />
                  ) : (
                    <img
                      src={imageSrc}
                      alt={item.caption}
                      width="960"
                      height="1008"
                      onError={() => markMissing(item.id)}
                      style={{ objectPosition: item.focus || 'center' }}
                      className="h-full w-full object-cover brightness-[1.03] contrast-[1.01] saturate-[1.04] transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                </div>

                <div className="mt-4 px-1 text-center">
                  <p className="text-sm sm:text-base font-semibold text-[#75465A] font-serif-warm leading-snug">
                    {item.caption}
                  </p>
                  <div className="mt-2 flex items-center justify-center gap-1.5">
                    {item.date && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#FFF0F5] px-2.5 py-0.5 text-[11px] font-medium text-[#B94F7C]">
                        <CalendarHeart className="h-3 w-3 text-[#E875A5]" />
                        {item.date}
                      </span>
                    )}
                    {frameStyle === 'stamp' && (
                      <span className="inline-flex items-center gap-1 rounded-sm border border-dashed border-[#E875A5]/60 px-2 py-0.5 text-[10px] font-bold tracking-wider text-[#E875A5] uppercase">
                        <SparkleStar className="w-2.5 h-2.5" color="#E875A5" />
                        Cacaaa ♡
                      </span>
                    )}
                  </div>
                </div>
              </button>
            </motion.div>
          );
        })}
      </div>

      {hasMore && (
        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={() => setShowAll((prev) => !prev)}
            className="btn-kawaii inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm sm:text-base font-bold"
          >
            {showAll ? (
              <>
                <ChevronUp className="h-4 w-4" />
                <span>{showLessText}</span>
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4" />
                <span>
                  {showMoreText} (+{items.length - initialVisible} foto) 📸
                </span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Modal Lightbox Native <dialog> (focus trap, Esc, light-dismiss, overscroll containment) */}
      <dialog
        ref={dialogRef}
        {...{ closedby: 'any' }}
        onClose={closeModal}
        onClick={(e) => {
          if (e.target === dialogRef.current) {
            closeModal();
          }
        }}
        aria-label={selectedItem?.caption || activeVideo?.caption || 'Tampilan foto'}
        className="lightbox-dialog"
      >
        {selectedItem && (
          <div className="relative w-full rounded-3xl border-2 border-[#FFE4EC] bg-white p-4 sm:p-6 shadow-2xl">
            <button
              type="button"
              onClick={closeModal}
              aria-label="Tutup tampilan foto"
              className="touch-control absolute -top-3 -right-3 z-20 flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-[#F48FB1] to-[#E875A5] text-white shadow-md transition-transform hover:scale-105 active:scale-95"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative aspect-[4/4] max-h-[58dvh] w-full overflow-hidden rounded-2xl border border-[#FFE4EC] bg-[#FFF0F5]">
              {!selectedItem.filename?.trim() || missingMap[selectedItem.id] ? (
                <MissingPhotoPlaceholder item={selectedItem} />
              ) : (
                <img
                  src={`${basePath}${selectedItem.filename}`}
                  alt={selectedItem.caption}
                  onError={() => markMissing(selectedItem.id)}
                  className="h-full w-full object-contain bg-[#FFF8FA]"
                />
              )}
            </div>

            <div className="mt-4 text-center">
              {selectedItem.date && (
                <span className="mb-1.5 inline-flex items-center gap-1 rounded-full bg-[#FFE4EC] px-3 py-0.5 text-xs font-semibold text-[#B94F7C]">
                  <CalendarHeart className="h-3.5 w-3.5" />
                  {selectedItem.date}
                </span>
              )}
              <h3 className="text-lg sm:text-xl font-bold text-[#B94F7C] font-serif-warm">
                {selectedItem.caption}
              </h3>
              {selectedItem.description && (
                <p className="mt-1.5 text-sm leading-relaxed text-[#75465A]">
                  {selectedItem.description}
                </p>
              )}
            </div>

            {allPhotos.length > 1 && (
              <div className="mt-5 flex items-center justify-between border-t border-[#FFE4EC] pt-3.5">
                <button
                  type="button"
                  onClick={showPrev}
                  className="touch-control inline-flex items-center gap-1 rounded-full bg-[#FFF0F5] px-4 py-2 text-xs sm:text-sm font-bold text-[#B94F7C] hover:bg-[#FFE4EC] transition-colors"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>Sebelumnya</span>
                </button>

                <span className="text-xs font-semibold text-[#966379] font-ui">
                  {selectedIndex + 1} / {allPhotos.length}
                </span>

                <button
                  type="button"
                  onClick={showNext}
                  className="touch-control inline-flex items-center gap-1 rounded-full bg-[#FFF0F5] px-4 py-2 text-xs sm:text-sm font-bold text-[#B94F7C] hover:bg-[#FFE4EC] transition-colors"
                >
                  <span>Berikutnya</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        )}

        {activeVideo && (
          <div className="relative w-full rounded-3xl border-2 border-[#FFE4EC] bg-white p-4 sm:p-6 shadow-2xl">
            <button
              type="button"
              onClick={closeModal}
              aria-label="Tutup video"
              className="touch-control absolute -top-3 -right-3 z-20 flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-[#F48FB1] to-[#E875A5] text-white shadow-md transition-transform hover:scale-105 active:scale-95"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="overflow-hidden rounded-2xl border border-[#FFE4EC] bg-[#FFF0F5]">
              <video
                src={`${basePath}${activeVideo.filename}`}
                width="492"
                height="328"
                controls
                autoPlay
                loop
                playsInline
                className="max-h-[60dvh] w-full object-contain"
              />
            </div>

            <div className="mt-4 text-center">
              <h3 className="text-lg sm:text-xl font-bold text-[#B94F7C] font-serif-warm">
                {activeVideo.caption}
              </h3>
              {activeVideo.description && (
                <p className="mt-1 text-sm text-[#75465A]">{activeVideo.description}</p>
              )}
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
