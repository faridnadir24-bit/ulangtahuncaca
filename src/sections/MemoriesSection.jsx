import React from 'react';
import { motion } from 'framer-motion';
import PhotoGallery from '../components/PhotoGallery';
import { PastelFlower, PinkBow, SparkleStar } from '../components/CuteDecorations';

export default function MemoriesSection({ config }) {
  return (
    <section
      id="memories"
      className="relative py-16 sm:py-24 px-4 sm:px-6 scrapbook-dots"
    >
      <div className="mx-auto max-w-5xl rounded-[32px] border-2 border-white bg-[#FFF8FA]/95 p-6 sm:p-10 md:p-12 shadow-[0_20px_50px_-14px_rgba(185,79,124,0.18)] scrapbook-gingham relative overflow-hidden">
        {/* Decorative scrapbook accents */}
        <PinkBow className="pointer-events-none absolute top-4 left-4 w-12 h-8 opacity-75 -rotate-12" />
        <PastelFlower className="pointer-events-none absolute top-5 right-5 w-9 h-9 opacity-80" />

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 mx-auto max-w-xl text-center"
        >
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-1 text-xs font-bold text-[#E875A5] shadow-xs ring-1 ring-[#FFE4EC] font-ui">
            <SparkleStar className="w-3.5 h-3.5" color="#E875A5" />
            <span>{config.memories.badge || 'Polaroid Kenangan'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-[#B94F7C]">
            {config.memories.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base italic text-[#75465A] font-serif-warm">
            “{config.memories.subtitle}”
          </p>
        </motion.div>

        {/* Photobooth Strip + Polaroid Photo Grid */}
        <div className="relative z-10 mt-10 sm:mt-12">
          <PhotoGallery
            items={config.memories.items}
            photobooth={config.memories.photobooth}
            basePath={config.memories.basePath}
            initialVisible={config.memories.initialVisible ?? 6}
            showMoreText={config.memories.showMoreText}
            showLessText={config.memories.showLessText}
          />
        </div>
      </div>
    </section>
  );
}
