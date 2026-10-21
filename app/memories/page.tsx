'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import BirthdayLayout from '../components/BirthdayLayout';
import MemoryGallery from '../components/MemoryGallery';
import { unlockStep } from '../utils/progress';

export default function MemoriesPage() {
  return (
    <BirthdayLayout index={2}>
      <section className="relative mx-auto flex w-full max-w-4xl flex-col items-center text-center animate-fade-in py-4">
        {/* Eyebrow Tag */}
        <div className="inline-flex items-center gap-2 rounded-full border border-rose-300 bg-rose-100/90 px-4 py-1.5 text-xs font-bold tracking-wider text-rose-800 shadow-sm backdrop-blur-sm">
          <Sparkles size={14} className="text-amber-500" />
          <span>CHAPTER TWO · LITTLE MOMENTS, FOREVER</span>
          <Sparkles size={14} className="text-amber-500" />
        </div>

        {/* Title */}
        <h1 className="mt-4 font-display text-4xl sm:text-6xl font-bold tracking-tight text-stone-900">
          A Few Of My{' '}
          <span className="highlight-text">
            Favourite Memories
          </span>
        </h1>

        <p className="mx-auto mt-2 max-w-lg text-sm sm:text-base font-semibold text-stone-700">
          Every picture holds a little piece of my heart in it.
          <br className="hidden sm:inline" /> Un punnagai mattume indha ulagathil naan rasitha perazhagu.
        </p>

        {/* Memory Gallery Component */}
        <div className="mt-6 w-full">
          <MemoryGallery />
        </div>

        {/* Next Chapter CTA */}
        <div className="mt-8 flex flex-col items-center gap-3">
          <Link
            href="/letter"
            onClick={() => unlockStep(3)}
            className="group relative inline-flex items-center justify-center gap-2 rounded-2xl btn-primary px-8 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <span>A Letter Written For You</span>
            <ArrowRight size={16} className="text-white transition-transform group-hover:translate-x-1" />
          </Link>
          <span className="text-xs text-stone-700 font-semibold">Written with lots of love, just for your eyes 💌</span>
        </div>
      </section>
    </BirthdayLayout>
  );
}
