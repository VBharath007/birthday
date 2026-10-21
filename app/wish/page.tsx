import { Sparkles, Heart } from 'lucide-react';
import BirthdayLayout from '../components/BirthdayLayout';
import BirthdayCake from '../components/BirthdayCake';

export default function WishPage() {
  return (
    <BirthdayLayout index={4}>
      <section className="relative mx-auto flex w-full max-w-3xl flex-col items-center text-center animate-fade-in py-4">
        {/* Eyebrow Tag */}
        <div className="inline-flex items-center gap-2 rounded-full border border-rose-300 bg-rose-100/90 px-4 py-1.5 text-xs font-bold tracking-wider text-rose-800 shadow-sm backdrop-blur-sm">
          <Sparkles size={14} className="text-amber-500" />
          <span>CHAPTER FOUR · THE GRAND FINALE</span>
          <Sparkles size={14} className="text-amber-500" />
        </div>

        {/* Title */}
        <h1 className="mt-4 font-display text-4xl sm:text-6xl font-bold tracking-tight text-stone-900">
          Close Your Eyes &amp;{' '}
          <span className="highlight-text">
            Make A Wish,
          </span>
          <br />
          <span>Birthday Queen.</span>
        </h1>

        <p className="mx-auto mt-2 max-w-lg text-sm sm:text-base font-semibold text-stone-700">
          Your next beautiful chapter starts right now.
          <br className="hidden sm:inline" /> Make a secret wish and blow out the candles!
        </p>

        {/* Interactive Cake */}
        <div className="mt-4 w-full">
          <BirthdayCake />
        </div>

        {/* Final Signoff */}
        <p className="mt-10 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-rose-800">
          <Heart size={14} fill="currentColor" className="text-rose-600 animate-pulse" />
          <span>CELEBRATING OUR DEAR KANMANI · HAPPY BIRTHDAY</span>
          <Heart size={14} fill="currentColor" className="text-rose-600 animate-pulse" />
        </p>
      </section>
    </BirthdayLayout>
  );
}
