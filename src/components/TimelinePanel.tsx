import { motion } from 'motion/react';
import type { Owner } from '../data/ownership';

type Props = { owner: Owner; index: number };

export function TimelinePanel({ owner, index }: Props) {
  const isReversed = index % 2 === 1;
  return (
    <motion.article
      initial={{ y: 40 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="container-gallery py-20 md:py-28 border-t border-ink/10 first:border-t-0"
    >
      <div className={`grid md:grid-cols-2 gap-12 items-center ${isReversed ? 'md:[&>*:first-child]:order-2' : ''}`}>
        <div className={owner.imageStyle === 'archival' ? 'sepia-[0.4] saturate-50' : ''}>
          <img
            src={owner.imagePath}
            alt={owner.imageAlt}
            className="w-full h-auto aspect-[4/3] object-cover"
            loading="lazy"
          />
        </div>
        <div>
          <p className="font-accent italic text-emporium-red text-base">{owner.years}</p>
          <p className="text-sm uppercase tracking-widest text-ink/60 mt-1">{owner.ownerNames}</p>
          <h2 className="font-display text-3xl md:text-4xl mt-4 leading-tight">{owner.headline}</h2>
          <p className="mt-6 text-base md:text-lg text-ink/80 leading-relaxed">{owner.body}</p>
          {owner.pullQuote && (
            <blockquote className="mt-8 border-l-2 border-emporium-red pl-6 font-display text-xl md:text-2xl italic text-ink/90">
              "{owner.pullQuote}"
            </blockquote>
          )}
        </div>
      </div>
    </motion.article>
  );
}
