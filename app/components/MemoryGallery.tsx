'use client';

import { useState } from 'react';
import { ArrowLeft, ArrowRight, Heart, Maximize2, X } from 'lucide-react';

const memories = [
  {
    src: '/images/kanmani-1.jpeg',
    title: 'Your Beautiful Smile',
    caption: 'A thousand words cannot match the peace your simple smile brings to my heart.',
    tag: 'Pure Joy ✨',
  },
  {
    src: '/images/kanmani-2.jpeg',
    title: 'A Moment To Treasure',
    caption: 'Forget the whole world... simply looking at your innocent smile is my favourite sight.',
    tag: 'Sweetest Smile 🌙',
  },
  {
    src: '/images/kanmani-3.jpeg',
    title: 'Close To My Heart',
    caption: 'No matter how fast time flies, this precious moment will always remain golden.',
    tag: 'Forever Cherished 💚',
  },
  {
    src: '/images/kanmani-4.jpeg',
    title: 'Brighter Than Sunshine',
    caption: 'Whenever you are near, every worry in life simply fades away. Un sirippe podhum.',
    tag: 'Pure Sunshine 🌸',
  },
  {
    src: '/images/kanmani-5.jpeg',
    title: 'My Person, Always',
    caption: 'In a world of billions of people, my eyes and heart will always look for you.',
    tag: 'With All My Love ❤️',
  },
  {
    src: '/images/kanmani-6.jpeg',
    title: 'Laughing Together',
    caption: 'Just a few quiet moments laughing with you brings enough happiness for a lifetime.',
    tag: 'Golden Hours ☕',
  },
  {
    src: '/images/kanmani-7.jpeg',
    title: 'To Endless More Chapters',
    caption: 'May every upcoming birthday bring us many more beautiful memories together, Kanmani.',
    tag: 'Special Day 🎂',
  },
];

export default function MemoryGallery() {
  const [current, setCurrent] = useState(0);
  const [likes, setLikes] = useState<{ [key: number]: number }>({});
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const prev = () => setCurrent((prev) => (prev - 1 + memories.length) % memories.length);
  const next = () => setCurrent((prev) => (prev + 1) % memories.length);

  const triggerLike = (e: React.MouseEvent) => {
    setLikes((prev) => ({ ...prev, [current]: (prev[current] || 0) + 1 }));

    const newHearts = Array.from({ length: 4 }).map((_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 40,
      y: -Math.random() * 40 - 20,
    }));
    setHearts((prev) => [...prev, ...newHearts]);

    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => !newHearts.some((nh) => nh.id === h.id)));
    }, 1000);
  };

  const activePhoto = memories[current];

  return (
    <div className="relative mx-auto flex w-full max-w-xl flex-col items-center">
      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/90 p-4 backdrop-blur-md animate-fade-in"
          onClick={() => setIsLightboxOpen(false)}
        >
          <button
            onClick={() => setIsLightboxOpen(false)}
            aria-label="Close photo view"
            className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition hover:bg-white/40"
          >
            <X size={20} />
          </button>
          <div
            className="relative max-h-[85vh] max-w-2xl overflow-hidden rounded-2xl bg-white p-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activePhoto.src}
              alt={activePhoto.caption}
              className="max-h-[75vh] w-auto rounded-xl object-contain mx-auto"
            />
            <div className="mt-3 flex items-center justify-between px-2">
              <span className="font-display font-bold text-stone-900">{activePhoto.title}</span>
              <span className="text-xs font-bold text-rose-700 bg-rose-100 px-3 py-1 rounded-full">
                {current + 1} of {memories.length}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Main Polaroid Frame with interactive controls */}
      <div className="relative flex w-full items-center justify-center gap-2 sm:gap-4">
        {/* Previous Button */}
        <button
          onClick={prev}
          aria-label="Previous memory"
          className="group flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border-2 border-rose-300 bg-white text-stone-800 shadow-md transition hover:scale-110 hover:border-rose-500 hover:bg-rose-50 hover:text-rose-700 active:scale-95"
        >
          <ArrowLeft size={20} className="transition-transform group-hover:-translate-x-0.5" />
        </button>

        {/* The Polaroid Card */}
        <div className="relative w-full max-w-xs sm:max-w-sm rounded-3xl border-2 border-rose-200 bg-white p-4 pb-6 shadow-2xl shadow-rose-200/60 backdrop-blur-xl transition-all duration-300">
          {/* Top Washi Tape Decoration */}
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 h-6 w-24 bg-gradient-to-r from-rose-300 via-pink-300 to-amber-300 rounded-sm shadow-sm -rotate-1 border border-white" />

          {/* Photo Container with zoom overlay */}
          <div className="group/photo relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-stone-100 shadow-inner">
            <img
              src={activePhoto.src}
              alt={activePhoto.caption}
              className="h-full w-full object-cover transition-transform duration-500 group-hover/photo:scale-105"
            />

            {/* Click to view full size badge */}
            <button
              onClick={() => setIsLightboxOpen(true)}
              aria-label="View full size photo"
              className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md opacity-0 group-hover/photo:opacity-100 transition-opacity duration-200 hover:bg-black/80"
            >
              <Maximize2 size={15} />
            </button>

            {/* Photo Counter Pill */}
            <span className="absolute bottom-3 right-3 rounded-full bg-stone-900/80 px-2.5 py-0.5 text-[11px] font-bold text-white backdrop-blur-md">
              {String(current + 1).padStart(2, '0')} / {String(memories.length).padStart(2, '0')}
            </span>

            {/* Tag Badge */}
            <span className="absolute bottom-3 left-3 rounded-full bg-white/95 px-3 py-0.5 text-[11px] font-bold text-rose-700 backdrop-blur-md shadow-sm border border-rose-200">
              {activePhoto.tag}
            </span>
          </div>

          {/* Caption & Heart Reaction */}
          <div className="mt-4 flex items-center justify-between px-1">
            <div className="text-left">
              <h3 className="font-display text-base font-bold text-stone-900">
                {activePhoto.title}
              </h3>
              <p className="font-display text-xs sm:text-sm italic text-stone-700 font-semibold mt-0.5">
                &ldquo;{activePhoto.caption}&rdquo;
              </p>
            </div>

            {/* Heart Reaction Button with mini burst */}
            <div className="relative">
              <button
                onClick={triggerLike}
                aria-label="Like this memory"
                className="group flex items-center gap-1.5 rounded-full border border-rose-300 bg-rose-50 px-3 py-1.5 text-xs font-bold text-rose-700 shadow-sm transition hover:scale-105 hover:bg-rose-100 active:scale-95"
              >
                <Heart
                  size={14}
                  fill="currentColor"
                  className="text-rose-600 animate-[heartbeat_1.5s_infinite]"
                />
                <span>{likes[current] || 1}</span>
              </button>

              {/* Mini bursting hearts */}
              {hearts.map((h) => (
                <span
                  key={h.id}
                  style={{ transform: `translate(${h.x}px, ${h.y}px)` }}
                  className="pointer-events-none absolute left-3 top-1 text-rose-600 animate-[fade-float_0.8s_ease-out_forwards]"
                >
                  ❤️
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={next}
          aria-label="Next memory"
          className="group flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border-2 border-rose-300 bg-white text-stone-800 shadow-md transition hover:scale-110 hover:border-rose-500 hover:bg-rose-50 hover:text-rose-700 active:scale-95"
        >
          <ArrowRight size={20} className="transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>

      {/* Thumbnail Strip */}
      <div className="mt-6 flex w-full max-w-md items-center justify-center gap-2 overflow-x-auto px-2 py-2">
        {memories.map((item, idx) => (
          <button
            key={item.src}
            onClick={() => setCurrent(idx)}
            aria-label={`Jump to memory ${idx + 1}`}
            className={`group relative h-14 w-12 flex-shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-300 ${
              current === idx
                ? 'scale-105 border-rose-600 shadow-md shadow-rose-300'
                : 'border-stone-300 opacity-60 hover:opacity-100'
            }`}
          >
            <img src={item.src} alt="" className="h-full w-full object-cover" />
            {current === idx && (
              <span className="absolute inset-0 bg-rose-500/10 pointer-events-none" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
