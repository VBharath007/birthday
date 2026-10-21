'use client';

import Link from 'next/link';
import { Heart, Sparkles, Mail, Cake } from 'lucide-react';
import BirthdayLayout from '../components/BirthdayLayout';
import { unlockStep } from '../utils/progress';

export default function LetterPage() {
  return (
    <BirthdayLayout index={3}>
      <section className="relative mx-auto flex w-full max-w-3xl flex-col items-center text-center animate-fade-in py-4">
        {/* Eyebrow Tag */}
        <div className="inline-flex items-center gap-2 rounded-full border border-rose-300 bg-rose-100/90 px-4 py-1.5 text-xs font-bold tracking-wider text-rose-800 shadow-sm backdrop-blur-sm">
          <Mail size={14} className="text-rose-600" />
          <span>CHAPTER THREE · A NOTE FROM MY HEART</span>
          <Mail size={14} className="text-rose-600" />
        </div>

        {/* Parchment Love Letter Card */}
        <div className="relative mt-8 w-full max-w-xl rounded-3xl border-2 border-rose-200 bg-[#fffdf9] p-7 sm:p-12 text-left shadow-2xl shadow-rose-200/50 backdrop-blur-xl">
          {/* Golden Wax Seal Stamp */}
          <div className="absolute -top-6 right-8 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-rose-600 via-rose-500 to-pink-600 text-white shadow-lg shadow-rose-400/50 ring-4 ring-rose-100">
            <Heart size={20} fill="currentColor" className="animate-[heartbeat_2s_infinite]" />
          </div>

          {/* Letter Date Stamp */}
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-rose-700">
            <Sparkles size={12} className="text-amber-500" />
            <span>ON YOUR VERY SPECIAL DAY · WITH ALL MY LOVE</span>
          </div>

          {/* Salutation */}
          <h1 className="mt-4 font-display text-3xl sm:text-4xl font-bold tracking-tight text-stone-900">
            Dearest{' '}
            <span className="highlight-text italic">
              Kanmani,
            </span>
          </h1>

          {/* Letter Body */}
          <div className="mt-6 space-y-4 font-display text-base sm:text-lg leading-relaxed text-stone-800">
            <p>
              Some people walk into this world and quietly make everything around them more beautiful.
              You do that effortlessly, Kanmani. In a world full of noise, your calm smile feels like
              a soothing melody — <span className="font-semibold text-rose-900">un mugathil thondrum andha siru punnagaiye, en manadhin moththa kavalaiyaiyum marakka vaikkum perazhagu.</span>
            </p>
            <p>
              They say true poetry is not written on paper, but lived through the souls that touch our lives.
              Un amaidhiyaana paarvaiyilum, un unmaiyaana anbilum dhaan indha vaazhkaiyoda miga azhagana artham
              adangiyirukku. You don’t ever have to change or pretend for anyone — <span className="font-semibold text-rose-900">nee neeyaaga irukkum andha unmai dhaan, unakkaana migap-periya azhagu.</span>
            </p>
            <p>
              Whenever the path ahead feels tiring or uncertain, remember how deeply special and capable you are.
              Unakkul oru periya velichamum nambikkaiyum irukku, adhai indha ulagathil endha irulum maraikka mudiyaadhu.
              Whatever tomorrow brings, you will never have to face anything alone — <span className="font-semibold text-rose-900">un vetriyil magizhavum, un kaalgal thadumaarum nodiyil kai thaangavum, un nilalaai endrendrum naan iruppen.</span>
            </p>
            <p>
              Indha pirandha naalil, un idhayam aasaipadum ovvoru siru kanavum niraivara vendum. May laughter always dance
              upon your lips, and may peace wrap around your heart like a warm embrace. <span className="font-semibold text-rose-900">Un pirappu indha ulagathirkku oru sirappu... aanaal en vaazhvil kidaitha migap-periya pokkisham nee mattume.</span>
            </p>
            <p className="font-bold text-stone-900 pt-1">
              More than all the words ever spoken, you are truly the most precious chapter of my life. Today, tomorrow,
              and in every little moment that follows — I am always in your corner, celebrating you.
            </p>
          </div>

          {/* Romantic Handwritten Signature */}
          <div className="mt-8 border-t border-rose-200 pt-6">
            <p className="font-handwriting text-3xl sm:text-4xl text-rose-700 font-bold leading-normal">
              Endrendrum un anbudan Bharath💚, with all my heart
            </p>
            <div className="mt-2 flex items-center gap-2 font-display text-sm font-bold text-stone-800">
              <span>Happy Birthday, My Dear Kanmani 💚</span>
              <Heart size={14} fill="currentColor" className="text-rose-600 animate-pulse" />
            </div>
          </div>

          {/* Decorative Corner Foliage */}
          <span className="absolute bottom-4 right-5 text-rose-300 text-xl pointer-events-none">
            ❦
          </span>
        </div>

        {/* Next Chapter CTA */}
        <div className="mt-8 flex flex-col items-center gap-3">
          <Link
            href="/wish"
            onClick={() => unlockStep(4)}
            className="group relative inline-flex items-center justify-center gap-2 rounded-2xl btn-primary px-8 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <span>Make A Birthday Wish</span>
            <Cake size={16} className="text-white transition-transform group-hover:scale-110" />
          </Link>
          <span className="text-xs text-stone-700 font-semibold">Time to close your eyes &amp; make a wish 🎂✨</span>
        </div>
      </section>
    </BirthdayLayout>
  );
}
