'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import type { Faq as FaqItem } from '@/lib/types/faq';

function FaqCard({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: FaqItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
      className="cursor-pointer rounded-[1.625rem] border border-transparent bg-[#FAFAFA] pb-8 transition-colors hover:border-[#cccce7]"
      onClick={onToggle}
    >
      <div className="flex items-center justify-between gap-6 px-8 pt-8">
        <span className="text-lg font-semibold text-[#3d4048]">
          {index + 1}. {item.question}
        </span>
        <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-gradient-to-br from-[#7d64c5] to-[#5a4b99]">
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="flex"
          >
            <ChevronDown className="h-4 w-4 text-[#FAFAFA]" />
          </motion.span>
        </span>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="px-8 pt-4 py-4 text-left text-[#3D4048]">{item.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Faq({ faqs }: { faqs: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const midpoint = Math.ceil(faqs.length / 2);
  const columns: FaqItem[][] = [faqs.slice(0, midpoint), faqs.slice(midpoint)];

  return (
    <section className="px-6 py-20 md:py-28">
      <div className="mx-auto flex max-w-[1500px] flex-col gap-10">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[0.25fr_1fr] md:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3"
          >
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-linear-to-r from-[#7d64c5] to-[#5a4b99] opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-linear-to-r from-[#7d64c5] to-[#5a4b99]" />
            </span>
            <span className="text-lg font-medium text-heading">FAQ</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-left text-2xl leading-relaxed font-medium text-heading md:text-3xl lg:text-4xl"
          >
            Got Questions? We&apos;ve Got Answers! Frequently Asked Questions
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {columns.map((column, columnIndex) => (
            <div key={columnIndex} className="flex flex-col gap-4">
              {column.map((item, itemIndex) => {
                const flatIndex = columnIndex * midpoint + itemIndex;
                return (
                  <FaqCard
                    key={item.slug}
                    item={item}
                    index={flatIndex}
                    isOpen={openIndex === flatIndex}
                    onToggle={() => setOpenIndex(openIndex === flatIndex ? null : flatIndex)}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
