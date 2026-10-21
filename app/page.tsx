'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Heart, Sparkles, ArrowRight, Gift, PartyPopper } from 'lucide-react';
import BirthdayLayout from './components/BirthdayLayout';
import ConfettiEffect from './components/ConfettiEffect';
import { unlockStep } from './utils/progress';

const NO_PHRASES = [
  'No 🙈',
  'Yosichu sollu 🥺',
  'Nijamava No-va? 😭',
  'No click panna mudiyadhey 😜',
  'Aiyoyo... No sollatha! 🥺',
  'Try the pink button! 👉💚',
  'Unakku enna pidikkum nu theriyum! 🥰',
  'Kandippa Yes dhaan sollanum! ❤️',
  'Only Yes Allowed! 💕✨',
];

export default function BirthdayPage() {
  const router = useRouter();
  const [noPhraseIndex, setNoPhraseIndex] = useState(0);
  const [noOffset, setNoOffset] = useState({ x: 0, y: 0 });
  const [accepted, setAccepted] = useState(false);
  const [confettiBurstKey, setConfettiBurstKey] = useState(0);

  const moveNo = () => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
    // Scale factor: larger on desktop, balanced on mobile
    const scale = isMobile ? 0.95 : 1.4;

    // Wide variety of evasive offsets with a generous radius/range
    // These leap far out in multiple directions and never uncomfortably overlap the Yes button
    const baseOffsets = [
      { x: 135, y: -45 },
      { x: 170, y: 30 },
      { x: 115, y: 75 },
      { x: 150, y: -70 },
      { x: -35, y: -80 },  // leaps safely above the Yes button
      { x: -35, y: 80 },   // leaps safely below the Yes button
      { x: 200, y: 0 },    // leaps far out to the right
      { x: 85, y: -65 },
      { x: 165, y: 70 },
      { x: -145, y: -75 }, // leaps far top-left
      { x: -145, y: 75 },  // leaps far bottom-left
      { x: 185, y: -50 },  // leaps far top-right
      { x: 125, y: 50 },
    ];

    const offsets = baseOffsets.map((o) => ({
      x: Math.round(o.x * scale),
      y: Math.round(o.y * scale),
    }));

    let nextIdx = Math.floor(Math.random() * offsets.length);
    if (offsets[nextIdx].x === noOffset.x && offsets[nextIdx].y === noOffset.y) {
      nextIdx = (nextIdx + 1) % offsets.length;
    }

    setNoOffset(offsets[nextIdx]);
    setNoPhraseIndex((prev) => (prev + 1) % NO_PHRASES.length);
  };

  const playChimeSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 arpeggio
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.09);
        gain.gain.setValueAtTime(0.3, ctx.currentTime + i * 0.09);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.09 + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.09);
        osc.stop(ctx.currentTime + i * 0.09 + 0.36);
      });
    } catch {
      // Audio not permitted
    }
  };

  const handleYes = () => {
    playChimeSound();
    setConfettiBurstKey((prev) => prev + 1);
    setAccepted(true);
    // Unlock Chapter 1 (The Party)
    unlockStep(1);

    // Give a sweet moment to celebrate before transitioning
    setTimeout(() => {
      router.push('/celebration');
    }, 1800);
  };

  return (
    <BirthdayLayout index={0}>
      <ConfettiEffect key={confettiBurstKey} />

      <section className="relative mx-auto flex w-full max-w-2xl flex-col items-center text-center animate-fade-in py-3 sm:py-4">
        {/* Top Eyebrow Tag */}
        <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-rose-300 bg-rose-100/90 px-3 sm:px-4 py-1 text-[11px] sm:text-xs font-bold tracking-wider text-rose-800 shadow-sm backdrop-blur-sm">
          <PartyPopper size={13} className="text-rose-600" />
          <span>TODAY IS ALL YOURS · HAPPY BIRTHDAY</span>
          <PartyPopper size={13} className="text-rose-600" />
        </div>

        {/* Hero title */}
        <p className="mt-3 sm:mt-4 font-display text-base sm:text-lg italic text-stone-700 font-semibold">
          A special little story crafted just for
        </p>

        <h1 className="mt-1 font-display text-3xl sm:text-6xl md:text-7xl font-bold tracking-tight text-stone-900 leading-tight">
          Happy Birthday,{' '}
          <span className="relative inline-block highlight-text">
            Kanmani
            <span className="absolute -top-1 -right-3 sm:-top-2 sm:-right-4 text-amber-500 animate-spin-slow text-sm sm:text-base">
              ✨
            </span>
          </span>
        </h1>

        <p className="mx-auto mt-2.5 sm:mt-3 max-w-lg text-xs sm:text-base font-semibold leading-relaxed text-stone-700 px-2">
          One birthday. A million reasons to celebrate you.
          <br className="hidden sm:inline" /> And one tiny question before our little story begins…
        </p>

        {/* The Luxury "Do You Love Me?" Question Card */}
        <div className="relative mt-6 sm:mt-8 w-full max-w-lg rounded-3xl border-2 border-rose-200 bg-white p-5 sm:p-9 text-center shadow-2xl shadow-rose-200/70 backdrop-blur-2xl">
          {/* Decorative Corner Glow (Contained within card border) */}
          <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
            <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-gradient-to-br from-rose-200/50 to-pink-200/30 blur-2xl" />
            <div className="absolute -bottom-12 -left-12 h-32 w-32 rounded-full bg-gradient-to-tr from-amber-200/40 to-rose-200/20 blur-2xl" />
          </div>

          {/* Card Kicker */}
          <div className="flex items-center justify-center gap-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-widest text-rose-700">
            <Sparkles size={13} className="text-amber-500" />
            <span>ORU CHINNA KELVI · JUST ONE QUESTION</span>
            <Heart size={13} fill="currentColor" className="text-rose-600 animate-pulse" />
          </div>

          {/* Cute "Do You Love Me?" Question */}
          <h2 className="mt-3 sm:mt-4 font-display text-2xl sm:text-4xl font-bold tracking-tight text-stone-900 leading-snug">
            Kanmani... <br />
            Do you{' '}
            <em className="highlight-text font-bold not-italic">
              love me?
            </em>{' '}
            <span className="inline-block animate-bounce">🥺💚</span>
          </h2>

          <p className="mt-3 text-xs sm:text-sm text-stone-700 font-semibold leading-relaxed px-1">
            En idhayam un kooda irukkum ovvoru nodiyum romba pudhusaaga thudikkudhu.
            <br />
            happy memories &amp; all my infinite love unakku dhaan!
            <br />
            <span className="text-rose-600 italic font-bold">
              Un sirippu mattum podhum, en ulagame azhagaaga maara! ✨
            </span>
          </p>

          {/* Accepted Celebration State */}
          {accepted ? (
            <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-rose-100 via-pink-100 to-amber-100 border-2 border-rose-300 animate-fade-in shadow-inner">
              <div className="flex items-center justify-center gap-2 text-rose-800 font-display text-lg sm:text-xl font-bold">
                <Heart size={20} fill="currentColor" className="text-rose-600 animate-ping" />
                <span>Yay! I love you so much, Kanmani! 💚🥰</span>
              </div>
              <p className="mt-1 text-xs text-rose-700 font-semibold">
                Unlocking Chapter 1: The Birthday Party... 🎈✨
              </p>
            </div>
          ) : (
            /* Action Buttons Zone (Allows playful evasion with wider radius) */
            <div className="relative mt-6 sm:mt-8 flex min-h-[85px] sm:min-h-[95px] items-center justify-center gap-3 sm:gap-4">
              {/* Yes Button */}
              <button
                type="button"
                onClick={handleYes}
                className="group relative z-10 inline-flex items-center justify-center gap-2 rounded-2xl btn-primary px-5 sm:px-7 py-3 sm:py-3.5 text-xs sm:text-sm font-extrabold text-white shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 flex-shrink-0"
              >
                <Heart size={15} fill="currentColor" className="animate-pulse" />
                <span>Yes, I Love You! 💚🥰</span>
                <ArrowRight size={15} className="text-white transition-transform group-hover:translate-x-1" />
              </button>

              {/* Runaway No Button (High-radius evasion with smooth bounce) */}
              <button
                id="no-button"
                type="button"
                onMouseEnter={moveNo}
                onClick={moveNo}
                onTouchStart={(e) => {
                  e.preventDefault();
                  moveNo();
                }}
                style={{
                  transform: `translate3d(${noOffset.x}px, ${noOffset.y}px, 0)`,
                  transition: 'transform 0.24s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
                className="relative z-30 rounded-2xl border-2 border-stone-300 bg-stone-50 px-3.5 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-stone-800 shadow-lg transition hover:border-rose-400 hover:text-rose-700 hover:bg-rose-50 flex-shrink-0 select-none cursor-pointer"
              >
                {NO_PHRASES[noPhraseIndex]}
              </button>
            </div>
          )}

          {/* Bottom Card Doodle */}
          <div className="mt-6 flex items-center justify-center gap-1.5 text-xs text-stone-600 font-semibold">
            <Gift size={14} className="text-rose-600" />
            <span>A sweet love journey made just for you</span>
          </div>
        </div>

        {/* Under Card Note */}
        <p className="mt-6 flex items-center gap-1.5 text-xs text-stone-700 font-bold">
          <Sparkles size={14} className="text-amber-500 animate-pulse" />
          <span>Say &quot;Yes&quot; to unlock Chapter 1 &amp; reveal your surprise birthday gifts! 🎈✨</span>
        </p>
      </section>
    </BirthdayLayout>
  );
}
