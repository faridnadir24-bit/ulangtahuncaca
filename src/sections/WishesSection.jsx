import React from 'react';
import { motion } from 'framer-motion';
import BirthdayCard from '../components/BirthdayCard';
import { PastelFlower, SparkleStar } from '../components/CuteDecorations';

export default function WishesSection({ config }) {
  return (
    <section
      id="wishes"
      className="relative py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-b from-[#FFF0F5] via-[#FFE4EC]/40 to-[#FFF0F5]"
    >
      <div className="mx-auto max-w-5xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-xl text-center"
        >
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-1 text-xs font-bold text-[#E875A5] shadow-xs ring-1 ring-[#FFE4EC] font-ui">
            <PastelFlower className="w-4 h-4" />
            <span>{config.wishes.badge || 'Untuk Tahun Barumu'}</span>
            <SparkleStar className="w-3.5 h-3.5" color="#E875A5" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-[#B94F7C]">
            {config.wishes.title}
          </h2>
          <p className="mt-2.5 text-sm sm:text-base text-[#75465A]">
            {config.wishes.subtitle}
          </p>
        </motion.div>

        {/* Balanced 5-card grid (3 + 2 centered on desktop) */}
        <div className="mt-10 sm:mt-12 flex flex-wrap justify-center gap-6">
          {config.wishes.cards.map((card, index) => (
            <div
              key={card.number}
              className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
            >
              <BirthdayCard card={card} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
