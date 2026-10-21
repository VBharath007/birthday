'use client';

import { useState } from 'react';
import { Heart, RotateCcw, PartyPopper } from 'lucide-react';
import Fireworks from './Fireworks';
import ConfettiEffect from './ConfettiEffect';

export default function BirthdayCake() {
  const [candlesLit, setCandlesLit] = useState(true);
  const [wished, setWished] = useState(false);

  const blowCandles = () => {
    setCandlesLit(false);
    setWished(true);
  };

  const relightCandles = () => {
    setCandlesLit(true);
    setWished(false);
  };

  return (
    <div className="relative mx-auto flex w-full max-w-md flex-col items-center">
      {/* Celebration Fireworks & Confetti when wish is made! */}
      {wished && (
        <>
          <Fireworks active={true} />
          <ConfettiEffect autoTrigger={true} />
        </>
      )}

      {/* The Illustrated Birthday Cake */}
      <div className="relative mt-4 flex flex-col items-center">
        {/* 3 Candles */}
        <div className="flex items-end justify-center gap-6 sm:gap-8 z-10 -mb-2">
          {[0, 1, 2].map((idx) => (
            <div key={idx} className="relative flex flex-col items-center">
              {/* Flickering Flame */}
              {candlesLit ? (
                <div className="relative mb-1 flex items-center justify-center">
                  {/* Outer golden glow halo */}
                  <div className="absolute h-8 w-6 rounded-full bg-amber-400/40 blur-md animate-pulse" />
                  {/* Inner dancing flame */}
                  <div
                    className="h-5 w-3 rounded-[50%_50%_20%_20%_/_70%_70%_30%_30%] bg-gradient-to-t from-orange-500 via-amber-400 to-yellow-200 shadow-md shadow-amber-300 animate-[flicker_1.2s_ease-in-out_infinite_alternate]"
                    style={{ animationDelay: `${idx * 0.25}s` }}
                  />
                </div>
              ) : (
                /* Smoke puff when blown out */
                <div className="mb-1 flex h-5 w-3 items-center justify-center">
                  <span className="text-xs text-stone-400 animate-[fade-float_1.5s_ease-out_forwards]">
                    💨
                  </span>
                </div>
              )}

              {/* Candle Wick */}
              <div className="h-1.5 w-0.5 bg-stone-700" />

              {/* Candle Body (Pastel striped) */}
              <div
                className={`h-10 w-3 rounded-t-sm shadow-sm ${
                  idx === 1
                    ? 'bg-gradient-to-b from-rose-300 via-pink-200 to-rose-300'
                    : idx === 0
                    ? 'bg-gradient-to-b from-amber-200 via-yellow-100 to-amber-200'
                    : 'bg-gradient-to-b from-purple-200 via-pink-100 to-purple-200'
                }`}
              />
            </div>
          ))}
        </div>

        {/* Top Cake Tier */}
        <div className="relative z-0 h-14 w-44 sm:w-52 rounded-2xl bg-gradient-to-b from-rose-100 via-pink-50 to-rose-100 border border-rose-200/80 shadow-md flex items-center justify-center overflow-hidden">
          {/* Frosting drips */}
          <div className="absolute top-0 inset-x-0 h-3 bg-rose-400/80 rounded-b-xl" />
          <div className="flex items-center gap-2 text-rose-500 text-xs font-bold">
            <span>✨</span>
            <span className="font-display italic text-stone-800">Kanmani</span>
            <span>✨</span>
          </div>
        </div>

        {/* Bottom Cake Tier */}
        <div className="relative -mt-2 h-18 w-56 sm:w-64 rounded-2xl bg-gradient-to-b from-white via-rose-50 to-pink-100 border border-rose-200/90 shadow-xl flex items-center justify-center overflow-hidden">
          {/* Decorative frosting rosettes */}
          <div className="absolute top-0 inset-x-0 flex justify-around text-rose-400 text-xs">
            <span>🧁</span>
            <span>🌸</span>
            <span>🍓</span>
            <span>🌸</span>
            <span>🧁</span>
          </div>
          <span className="font-display text-xs text-rose-700 font-bold tracking-widest uppercase mt-3">
            Happy Birthday Kanmani
          </span>
        </div>

        {/* Cake Stand */}
        <div className="h-3 w-64 sm:w-72 -mt-0.5 rounded-full bg-gradient-to-r from-stone-200 via-white to-stone-200 shadow-md border border-stone-200" />
      </div>

      {/* Wish Action Button or Success Card */}
      <div className="mt-8 w-full">
        {candlesLit ? (
          <button
            onClick={blowCandles}
            className="group relative mx-auto flex items-center justify-center gap-2.5 rounded-2xl btn-primary px-8 py-4 text-base font-bold text-white transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <span>Blow out the candles &amp; make a wish!</span>
            <span className="text-xl transition-transform group-hover:scale-125">🌬️🎂</span>
          </button>
        ) : (
          <div className="rounded-3xl border-2 border-rose-200 bg-white p-6 sm:p-8 text-center shadow-2xl shadow-rose-200/60 backdrop-blur-2xl animate-fade-in">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-rose-600 shadow-sm animate-bounce">
              <PartyPopper size={24} />
            </div>

            <h3 className="mt-3 font-display text-2xl sm:text-3xl font-bold text-stone-900 leading-snug">
              Your Wish Has Been Sent To The Stars! ✨
            </h3>

            <p className="mt-3 text-sm sm:text-base leading-relaxed text-stone-800 font-semibold italic">
              &ldquo;May this upcoming year shower you with boundless laughter, peaceful days, radiant
              happiness, and every little thing your heart desires. Happy Birthday, Kanmani!&rdquo;
            </p>

            <div className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-800 bg-rose-100 px-4 py-2 rounded-full border border-rose-300">
              <Heart size={14} fill="currentColor" className="text-rose-600 animate-pulse" />
              <span>Happy Birthday, My Dear Kanmani!</span>
              <Heart size={14} fill="currentColor" className="text-rose-600 animate-pulse" />
            </div>

            <div className="mt-6 flex justify-center">
              <button
                onClick={relightCandles}
                className="inline-flex items-center gap-2 rounded-full border-2 border-stone-300 bg-white px-5 py-2.5 text-xs font-bold text-stone-800 shadow-sm transition hover:border-rose-400 hover:text-rose-700 hover:bg-rose-50"
              >
                <RotateCcw size={13} />
                <span>Relight Candles 🕯️</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
