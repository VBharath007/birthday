'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Crown, Heart, Sparkles, PartyPopper, Gift, X, CheckCircle2 } from 'lucide-react';
import BirthdayLayout from '../components/BirthdayLayout';
import ConfettiEffect from '../components/ConfettiEffect';
import { unlockStep } from '../utils/progress';

type BalloonPalette = {
  light: string;
  main: string;
  deep: string;
  dark: string;
  shadow: string;
  glow: string;
  stringColor: string;
};

type BirthdayGift = {
  id: number;
  icon: string;
  balloonName: string;
  title: string;
  description: string;
  badge: string;
  colors: BalloonPalette;
  animationClass: string;
  floatOffset: string;
};

const GIFTS: BirthdayGift[] = [
  {
    id: 1,
    icon: '🍫',
    balloonName: 'Un Sirippu',
    title: 'Un Sirippukku Oru Kavidhai ✨',
    description:
      'Nee sirikkum andha oru nodiyil, en kavalai ellam marandhu pogum. Indha ulagathil un sirippai vida azhagaana vishayam vera edhuvume illa. Un mugathil eppodhume indha siru punnagai irukkanum... adhai paarkave aayul muzhudhum un koodave naan iruppen.',
    badge: 'ANBIN PARISU · GIFT 01 🎁',
    colors: {
      light: '#ff9ebb',
      main: '#f43f5e',
      deep: '#be123c',
      dark: '#881337',
      shadow: 'rgba(225, 29, 72, 0.45)',
      glow: 'rgba(244, 63, 94, 0.55)',
      stringColor: '#e11d48',
    },
    animationClass: 'animate-balloon-1',
    floatOffset: 'sm:translate-y-0',
  },
  {
    id: 2,
    icon: '👑',
    balloonName: 'Dear Comrade',
    title: 'Dear Comrade, Nee Dhaan En Raani 👑',
    description:
      'Thozhiye... un amaidhiyaana paarvaiyilum, anbaana pechilum dhaan en ulagamae adangiyirukku. Indha ulagathil aayiram azhagugal irukkalaam... aanaal en vaazhvil un anbukku eedey illa. You will forever be my Queen, my Dear Comrade.',
    badge: 'DEAR COMRADE · GIFT 02 🎁',
    colors: {
      light: '#fef08a',
      main: '#f59e0b',
      deep: '#d97706',
      dark: '#78350f',
      shadow: 'rgba(245, 158, 11, 0.45)',
      glow: 'rgba(245, 158, 11, 0.55)',
      stringColor: '#d97706',
    },
    animationClass: 'animate-balloon-2',
    floatOffset: 'sm:-translate-y-4',
  },
  {
    id: 3,
    icon: '🌙',
    balloonName: 'Nilaavin Kural',
    title: 'Nilaavin Nizhalil Un Kural 🌙',
    description:
      'Kodi natchathirangal paarthu rasikka, un melliya kural ketka manadhum inikka... Unnodu amaidhiyaai pesum ovvoru nodiyumae, en aayul muzhudhumaana periya pokkishamae! Un kathai-galaiyum, un chinna chinna sirippaiyum rasithukonde en kaalam muzhudhum kaathiruppen. Unnodu irukkum ovvoru nodiyum en manadhirkku oru periya nimmathi.',
    badge: 'AMAIDHIYIN PARISU · GIFT 03 🎁',
    colors: {
      light: '#fbcfe8',
      main: '#ec4899',
      deep: '#db2777',
      dark: '#831843',
      shadow: 'rgba(236, 72, 153, 0.45)',
      glow: 'rgba(236, 72, 153, 0.55)',
      stringColor: '#db2777',
    },
    animationClass: 'animate-balloon-3',
    floatOffset: 'sm:translate-y-1',
  },
  {
    id: 4,
    icon: '🧸',
    balloonName: 'En Thozhi',
    title: 'Endrendrum Unnodu Oru Thozhanaai 🧸',
    description:
      'Un sandhoshatthil pangu pottukolla aayiram per irukkalaam... aanaal un kannil oru chinna thuli varutham vandhaalum, adhai thudaikka mudhal aalaaga naan nirpen. Enna aanalum sari, naan eppodhum un pakkam dhaan iruppen... un koodave.',
    badge: 'UNMAIYAANA THUNAI · GIFT 04 🎁',
    colors: {
      light: '#e9d5ff',
      main: '#a855f7',
      deep: '#9333ea',
      dark: '#581c87',
      shadow: 'rgba(147, 51, 234, 0.45)',
      glow: 'rgba(168, 85, 247, 0.55)',
      stringColor: '#9333ea',
    },
    animationClass: 'animate-balloon-4',
    floatOffset: 'sm:-translate-y-3',
  },
  {
    id: 5,
    icon: '✨',
    balloonName: 'Un Kanavugal',
    title: 'Nee Kaanum Kanavugal Niraivara... ✨',
    description:
      'Nee manadhukullae ninaikkum ovvoru siru aasaiyum, kanavum kandippa niraivara vendum. Un vazhiyelam pookkal poothu kulunga vendum. Un vetriyilum un magizhchiyilum eppodhum koodave iruppen. En idhayathin vendudhal idhu mattum dhaan, Kanmani.',
    badge: 'NATCHATHIRA VENDUDHAL · GIFT 05 🎁',
    colors: {
      light: '#fed7aa',
      main: '#f97316',
      deep: '#ea580c',
      dark: '#7c2d12',
      shadow: 'rgba(249, 115, 22, 0.45)',
      glow: 'rgba(249, 115, 22, 0.55)',
      stringColor: '#ea580c',
    },
    animationClass: 'animate-balloon-5',
    floatOffset: 'sm:translate-y-0',
  },
];

export default function CelebrationPage() {
  const [poppedBalloons, setPoppedBalloons] = useState<number[]>([]);
  const [poppingId, setPoppingId] = useState<number | null>(null);
  const [activeGift, setActiveGift] = useState<BirthdayGift | null>(null);
  const [confettiBurstKey, setConfettiBurstKey] = useState(0);

  // Synthesized realistic latex balloon pop sound
  const playPopSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(460, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + 0.1);

      gain.gain.setValueAtTime(0.4, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.11);
    } catch {
      // Audio not permitted or unavailable
    }
  };

  const handleBalloonClick = (gift: BirthdayGift) => {
    if (!poppedBalloons.includes(gift.id)) {
      playPopSound();
      setPoppingId(gift.id);

      setTimeout(() => {
        setPoppedBalloons((prev) => [...prev, gift.id]);
        setConfettiBurstKey((prev) => prev + 1);
        setActiveGift(gift);
        setPoppingId(null);
        // Unlocks Chapter 2 (Memories) once user interacts with celebration
        unlockStep(2);
      }, 260);
    } else {
      setActiveGift(gift);
    }
  };

  return (
    <BirthdayLayout index={1}>
      <ConfettiEffect key={confettiBurstKey} />

      {/* Surprise Gift Reveal Modal */}
      {activeGift && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/80 p-3 sm:p-4 backdrop-blur-md animate-fade-in"
          onClick={() => setActiveGift(null)}
        >
          <div
            className="relative w-full max-w-sm sm:max-w-md max-h-[88vh] overflow-y-auto rounded-3xl border-2 border-rose-300 bg-white p-5 sm:p-8 text-center shadow-2xl shadow-rose-500/40 animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setActiveGift(null)}
              className="absolute top-3.5 right-3.5 flex h-8 w-8 items-center justify-center rounded-full bg-stone-100 text-stone-600 hover:bg-rose-100 hover:text-rose-700 transition"
              aria-label="Close surprise"
            >
              <X size={18} />
            </button>

            {/* Surprise Header Badge */}
            <div className="inline-flex items-center gap-1.5 rounded-full bg-rose-100 px-3 py-0.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-rose-800">
              <Sparkles size={12} className="text-amber-500" />
              <span>{activeGift.badge}</span>
            </div>

            {/* Gift Icon Animated */}
            <div className="my-3 sm:my-5 flex justify-center">
              <div className="flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-3xl bg-gradient-to-tr from-rose-100 via-pink-100 to-amber-100 text-4xl sm:text-5xl shadow-inner border border-rose-200 animate-bounce">
                {activeGift.icon}
              </div>
            </div>

            {/* Gift Title */}
            <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-stone-900 leading-snug">
              {activeGift.title}
            </h3>

            {/* Gift Description */}
            <p className="mt-2.5 sm:mt-3 text-xs sm:text-base font-semibold leading-relaxed text-stone-800 italic px-1">
              &ldquo;{activeGift.description}&rdquo;
            </p>

            {/* Button */}
            <div className="mt-5 sm:mt-6 flex justify-center">
              <button
                onClick={() => setActiveGift(null)}
                className="btn-primary rounded-2xl px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-white shadow-lg transition hover:scale-105 active:scale-95"
              >
                Collect Gift &amp; Pop More! 🎁
              </button>
            </div>
          </div>
        </div>
      )}

      <section className="relative mx-auto flex w-full max-w-5xl flex-col items-center text-center animate-fade-in py-2 sm:py-4">
        {/* Top Eyebrow Tag */}
        <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-rose-300 bg-rose-100/90 px-3 sm:px-4 py-1 text-[11px] sm:text-xs font-bold tracking-wider text-rose-800 shadow-sm backdrop-blur-sm">
          <PartyPopper size={13} className="text-rose-600" />
          <span>CHAPTER ONE · THE CELEBRATION</span>
          <PartyPopper size={13} className="text-rose-600" />
        </div>

        {/* Hero Title */}
        <h1 className="mt-3 sm:mt-5 font-display text-3xl sm:text-6xl md:text-7xl font-bold tracking-tight text-stone-900 leading-tight">
          Happy Birthday,{' '}
          <span className="highlight-text">
            Kanmani!
          </span>
          <br />
          <span className="text-stone-900">Today is all about you.</span>
        </h1>

        <p className="mx-auto mt-2.5 sm:mt-4 max-w-lg text-xs sm:text-base font-semibold leading-relaxed text-stone-700 px-2">
          Today, the entire world gets a little brighter, sweeter, and more beautiful
          simply because you are in it.
        </p>

        {/* Balloon Pop Hint */}
        <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-100 via-rose-100 to-amber-100 border-2 border-rose-300 px-4 py-2 text-xs font-bold text-stone-900 shadow-sm">
          <Gift size={16} className="text-rose-600 animate-bounce" />
          <span>Tap each floating balloon to pop it &amp; unlock your surprise gifts! 🎈✨</span>
        </div>

        {/* 5 Authentic 3D Floating Helium Balloons */}
        <div className="mt-8 sm:mt-10 flex flex-wrap items-end justify-center gap-4 sm:gap-6 md:gap-7 px-2">
          {GIFTS.map((g) => {
            const isPopped = poppedBalloons.includes(g.id);
            const isPopping = poppingId === g.id;

            return (
              <div
                key={g.id}
                className={`transition-transform duration-500 ${g.floatOffset}`}
              >
                <button
                  type="button"
                  onClick={() => handleBalloonClick(g)}
                  aria-label={`Balloon ${g.id}: ${g.balloonName}`}
                  className="group relative flex flex-col items-center focus:outline-none transition-all duration-300 hover:-translate-y-2 active:scale-95"
                >
                  {!isPopped ? (
                    /* Unpopped 3D Realistic Helium Balloon */
                    <div
                      className={`relative flex flex-col items-center ${
                        isPopping ? 'animate-balloon-pop' : g.animationClass
                      }`}
                    >
                      {/* Realistic 3D Balloon SVG */}
                      <div
                        className="relative w-28 sm:w-34 md:w-36 transition-transform duration-300 group-hover:scale-105"
                        style={{
                          filter: `drop-shadow(0 18px 24px ${g.colors.shadow})`,
                        }}
                      >
                        <svg
                          viewBox="0 0 140 230"
                          className="w-full h-auto overflow-visible select-none pointer-events-none"
                        >
                          <defs>
                            {/* 3D Spherical Radial Gradient */}
                            <radialGradient
                              id={`balloon-grad-${g.id}`}
                              cx="34%"
                              cy="28%"
                              r="70%"
                              fx="26%"
                              fy="22%"
                            >
                              <stop offset="0%" stopColor={g.colors.light} />
                              <stop offset="32%" stopColor={g.colors.main} />
                              <stop offset="72%" stopColor={g.colors.deep} />
                              <stop offset="100%" stopColor={g.colors.dark} />
                            </radialGradient>

                            {/* Tied Knot Gradient */}
                            <linearGradient
                              id={`knot-grad-${g.id}`}
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop offset="0%" stopColor={g.colors.deep} />
                              <stop offset="100%" stopColor={g.colors.dark} />
                            </linearGradient>

                            {/* Specular White Gloss Gradient */}
                            <linearGradient
                              id={`gloss-${g.id}`}
                              x1="0"
                              y1="0"
                              x2="1"
                              y2="1"
                            >
                              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
                              <stop offset="45%" stopColor="#ffffff" stopOpacity="0.3" />
                              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                            </linearGradient>
                          </defs>

                          {/* 1. Natural Teardrop Balloon Body */}
                          <path
                            d="M 70 8 C 108 8, 134 38, 134 78 C 134 122, 104 150, 77 160 L 63 160 C 36 150, 6 122, 6 78 C 6 38, 32 8, 70 8 Z"
                            fill={`url(#balloon-grad-${g.id})`}
                          />

                          {/* 2. Tied Knot with Puckered Flare */}
                          <path
                            d="M 64 159 L 76 159 L 83 173 C 83 177, 77 179, 70 179 C 63 179, 57 177, 57 173 Z"
                            fill={`url(#knot-grad-${g.id})`}
                          />
                          {/* Knot crease */}
                          <path
                            d="M 66 160 C 69 162, 72 162, 74 160"
                            fill="none"
                            stroke="rgba(0,0,0,0.3)"
                            strokeWidth="1.2"
                          />

                          {/* 3. Fluttering Ribbon Bow Tails at Knot */}
                          <path
                            d="M 70 179 Q 60 187, 58 198"
                            fill="none"
                            stroke={g.colors.stringColor}
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            opacity="0.85"
                          />
                          <path
                            d="M 70 179 Q 80 186, 82 197"
                            fill="none"
                            stroke={g.colors.stringColor}
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            opacity="0.85"
                          />

                          {/* 4. Curled Satin Ribbon String */}
                          <path
                            d="M 70 179 C 64 191, 78 200, 69 210 C 61 219, 77 228, 70 238"
                            fill="none"
                            stroke={g.colors.stringColor}
                            strokeWidth="2"
                            strokeLinecap="round"
                            opacity="0.85"
                            className="animate-ribbon"
                          />

                          {/* 5. 3D Specular Curved Gloss Highlight */}
                          <ellipse
                            cx="42"
                            cy="50"
                            rx="13"
                            ry="30"
                            transform="rotate(-30 42 50)"
                            fill={`url(#gloss-${g.id})`}
                          />

                          {/* 6. Sharp Pin-Point Glints */}
                          <circle cx="34" cy="32" r="4.5" fill="#ffffff" opacity="0.95" />
                          <circle cx="48" cy="24" r="2.5" fill="#ffffff" opacity="0.8" />

                          {/* 7. Soft Edge Sheen on Right */}
                          <ellipse
                            cx="102"
                            cy="40"
                            rx="6"
                            ry="16"
                            transform="rotate(22 102 40)"
                            fill="#ffffff"
                            opacity="0.22"
                          />

                          {/* 8. Bottom Ambient Bounce Light */}
                          <path
                            d="M 88 144 C 114 128, 126 104, 128 78"
                            fill="none"
                            stroke="#ffffff"
                            strokeWidth="3"
                            strokeLinecap="round"
                            opacity="0.28"
                          />
                        </svg>

                        {/* Centered Front Content on Balloon */}
                        <div className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center w-[85%] pointer-events-none select-none text-center">
                          {/* Floating Emoji */}
                          <span className="text-2xl sm:text-3xl filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)] transition-transform duration-300 group-hover:scale-110">
                            {g.icon}
                          </span>
                          {/* Clean Frosted Badge */}
                          <div className="mt-1 px-2.5 py-0.5 rounded-full bg-white/25 backdrop-blur-md border border-white/50 shadow-sm transition-transform duration-300 group-hover:scale-105">
                            <span className="block text-[11px] sm:text-xs font-black text-white tracking-wide whitespace-nowrap drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
                              {g.balloonName}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Interactive Button Below */}
                      <span className="mt-1 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:shadow-md bg-white/95 border border-rose-200 text-stone-800 group-hover:border-rose-400 group-hover:text-rose-600">
                        <Sparkles size={11} className="text-amber-500 animate-spin-slow" />
                        <span>Pop Me! 🎈</span>
                      </span>
                    </div>
                  ) : (
                    /* Popped State - Luxurious Opened Gift Pedestal */
                    <div className="relative flex h-[190px] w-28 sm:w-34 flex-col items-center justify-between p-3 rounded-3xl border-2 border-rose-300 bg-gradient-to-b from-rose-50 via-white to-amber-50/70 shadow-lg shadow-rose-200/50 transition-all duration-300 group-hover:scale-105">
                      {/* Top Unlocked Badge */}
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 border border-emerald-300 px-2 py-0.5 text-[10px] font-bold text-emerald-800 shadow-xs">
                        <CheckCircle2 size={10} className="text-emerald-600" /> Unlocked
                      </span>

                      {/* Glowing Gift Stand */}
                      <div className="relative my-auto flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-rose-100 via-pink-100 to-amber-100 shadow-md border border-rose-200 text-3xl sm:text-4xl animate-bounce">
                        {g.icon}
                      </div>

                      {/* Details */}
                      <div className="text-center w-full">
                        <span className="block text-[11px] font-bold text-stone-900 truncate">
                          {g.balloonName}
                        </span>
                        <span className="mt-0.5 inline-flex items-center gap-1 text-[10px] font-bold text-rose-600 group-hover:underline">
                          View Gift 🎁
                        </span>
                      </div>
                    </div>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Gift Progress Tracker */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 bg-white/90 px-5 py-2.5 rounded-2xl border-2 border-rose-200 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-bold text-stone-800">
            <Gift size={16} className="text-rose-600" />
            <span>
              Surprise Gifts Unlocked: <span className="text-rose-600 font-extrabold">{poppedBalloons.length}</span> / 5
            </span>
          </div>

          {/* 5 Visual Mini Progress Tokens */}
          <div className="flex items-center gap-1.5">
            {GIFTS.map((g) => {
              const unlocked = poppedBalloons.includes(g.id);
              return (
                <div
                  key={g.id}
                  title={g.balloonName}
                  className={`flex h-6 w-6 items-center justify-center rounded-full text-xs transition-all duration-300 ${
                    unlocked
                      ? 'bg-rose-500 text-white shadow-sm scale-110'
                      : 'bg-stone-200 text-stone-400'
                  }`}
                >
                  {unlocked ? g.icon : '🎈'}
                </div>
              );
            })}
          </div>
        </div>

        {/* 3 High-Contrast Glass Stat Cards with Soulful Poetry */}
        <div className="mt-8 grid w-full max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
          {/* Card 1: Dear Comrade */}
          <div className="rounded-2xl border-2 border-rose-200 bg-white p-5 shadow-lg shadow-rose-100/50 backdrop-blur-xl transition hover:-translate-y-1">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700 shadow-sm">
              <Crown size={22} />
            </div>
            <strong className="mt-3 block font-display text-xl sm:text-2xl font-bold text-stone-900">
              Dear Comrade
            </strong>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-700">
              Uyirin Thozhi · En Raani
            </span>
            <p className="mt-1 text-xs text-stone-800 font-semibold italic leading-relaxed">
              &ldquo;Vaanam engum kodi natchathiram irundhaalum, en vaazhvil velicham thandha ore nilaavu nee mattume.&rdquo;
            </p>
          </div>

          {/* Card 2: Un Sirippin Mayakkam */}
          <div className="rounded-2xl border-2 border-rose-200 bg-white p-5 shadow-lg shadow-rose-100/50 backdrop-blur-xl transition hover:-translate-y-1">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-rose-100 text-rose-700 shadow-sm">
              <Heart size={22} fill="currentColor" />
            </div>
            <strong className="mt-3 block font-display text-xl sm:text-2xl font-bold text-stone-900">
              Un Sirippin Mayakkam
            </strong>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-700">
              Aazhamaana Anbu
            </span>
            <p className="mt-1 text-xs text-stone-800 font-semibold italic leading-relaxed">
              &ldquo;Aayiram kavidhaigal ezhudha thevaiyillai... un punnagaiye en aayul muzhudhirkumana perazhagu.&rdquo;
            </p>
          </div>

          {/* Card 3: Endrendrum Unnodu */}
          <div className="rounded-2xl border-2 border-rose-200 bg-white p-5 shadow-lg shadow-rose-100/50 backdrop-blur-xl transition hover:-translate-y-1">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-pink-100 text-pink-700 shadow-sm">
              <Sparkles size={22} />
            </div>
            <strong className="mt-3 block font-display text-xl sm:text-2xl font-bold text-stone-900">
              Endrendrum Unnodu
            </strong>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-700">
              Thunaiyaana Nizhal
            </span>
            <p className="mt-1 text-xs text-stone-800 font-semibold italic leading-relaxed">
              &ldquo;Kaalam kadandhu ponalum, un sirippai kaakkum un anbin thozhanaaga naan eppodhum iruppen.&rdquo;
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-8 flex flex-col items-center gap-3">
          <Link
            href="/memories"
            onClick={() => unlockStep(2)}
            className="group relative inline-flex items-center justify-center gap-2 rounded-2xl btn-primary px-8 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <span>Open Our Memories</span>
            <ArrowRight size={16} className="text-white transition-transform group-hover:translate-x-1" />
          </Link>
          <span className="text-xs text-stone-700 font-semibold">Chapter 2 has beautiful photos of us ✨</span>
        </div>
      </section>
    </BirthdayLayout>
  );
}
