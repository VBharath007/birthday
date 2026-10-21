'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowLeft, ArrowRight, Heart, Sparkles, Cake, Image as ImageIcon, Mail, PartyPopper, Lock, CheckCircle2 } from 'lucide-react';
import FloatingParticles from './FloatingParticles';
import MusicPlayer from './MusicPlayer';
import { getUnlockedStep } from '../utils/progress';

export const STORY_PAGES = [
  { href: '/', label: 'A Question ✨', icon: Sparkles, number: '01' },
  { href: '/celebration', label: 'The Party 🎉', icon: PartyPopper, number: '02' },
  { href: '/memories', label: 'Our Memories 📸', icon: ImageIcon, number: '03' },
  { href: '/letter', label: 'A Letter 💌', icon: Mail, number: '04' },
  { href: '/wish', label: 'Make A Wish 🎂', icon: Cake, number: '05' },
];

export default function BirthdayLayout({
  index,
  children,
}: {
  index: number;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [unlockedStep, setUnlockedStep] = useState<number>(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const updateProgress = () => {
      setUnlockedStep(getUnlockedStep());
    };

    updateProgress();
    window.addEventListener('birthday_progress_updated', updateProgress);
    window.addEventListener('storage', updateProgress);

    return () => {
      window.removeEventListener('birthday_progress_updated', updateProgress);
      window.removeEventListener('storage', updateProgress);
    };
  }, []);

  const showLockedToast = (chapterLabel: string) => {
    setToastMessage(`Kanmani, previous chapter-a mudichittu vaanga! "${chapterLabel}" unlock aagum 🔒✨`);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const isCurrentPageLocked = index > unlockedStep;

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-[#fff9f6] text-stone-800 selection:bg-rose-100 selection:text-rose-700">
      {/* Background dream gradients and glowing orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        <div className="absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-rose-200/40 via-pink-100/30 to-amber-100/20 blur-3xl animate-[pulse_10s_ease-in-out_infinite]" />
        <div className="absolute top-1/3 -right-32 h-[550px] w-[550px] rounded-full bg-gradient-to-bl from-amber-100/40 via-rose-100/30 to-purple-100/20 blur-3xl animate-[pulse_12s_ease-in-out_infinite_2s]" />
        <div className="absolute -bottom-32 left-1/4 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-pink-200/30 via-orange-100/30 to-rose-100/20 blur-3xl animate-[pulse_8s_ease-in-out_infinite_4s]" />
        {/* Subtle romantic paper texture */}
        <div className="absolute inset-0 opacity-[0.025] bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:20px_20px]" />
      </div>

      {/* Floating gentle hearts & gold sparkles canvas */}
      <FloatingParticles />

      {/* Floating Toast Notification for Locked Chapters */}
      {toastMessage && (
        <div className="fixed top-18 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-full border-2 border-rose-300 bg-white/95 px-5 py-2.5 text-xs sm:text-sm font-bold text-rose-800 shadow-2xl backdrop-blur-md animate-fade-in">
          <Lock size={15} className="text-rose-600 animate-bounce" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Floating Glass Header */}
      <header className="sticky top-0 z-40 w-full border-b border-rose-100/60 bg-white/70 backdrop-blur-xl transition-all">
        <div className="mx-auto flex h-14 sm:h-16 max-w-6xl items-center justify-between px-3 sm:px-6">
          {/* Logo / Dedication */}
          <Link
            href="/"
            className="group flex items-center gap-1.5 sm:gap-2 font-display text-base sm:text-xl font-medium tracking-tight text-stone-800 transition hover:text-rose-600"
          >
            <span className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full bg-rose-100/80 text-rose-500 shadow-sm transition group-hover:scale-110 group-hover:bg-rose-500 group-hover:text-white">
              <Heart size={13} className="animate-[heartbeat_1.5s_ease-in-out_infinite]" fill="currentColor" />
            </span>
            <span className="italic text-sm sm:text-base">
              for <span className="font-semibold not-italic text-rose-600">Kanmani</span>
            </span>
          </Link>

          {/* Sequential Chapter Navigation Pills (Desktop / Tablet) */}
          <nav className="hidden md:flex items-center gap-1.5 rounded-full border border-rose-100/80 bg-white/70 p-1 shadow-sm backdrop-blur-md">
            {STORY_PAGES.map((page, i) => {
              const Icon = page.icon;
              const isActive = index === i;
              const isUnlocked = i <= unlockedStep;

              if (isUnlocked) {
                return (
                  <Link
                    key={page.href}
                    href={page.href}
                    className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${
                      isActive
                        ? 'active-pill'
                        : 'text-stone-700 hover:bg-rose-100 hover:text-rose-700'
                    }`}
                  >
                    <Icon size={13} className={isActive ? 'text-white' : 'text-stone-500'} />
                    <span>{page.label}</span>
                  </Link>
                );
              }

              // Locked Chapter Pill
              return (
                <button
                  key={page.href}
                  type="button"
                  onClick={() => showLockedToast(page.label)}
                  title="Complete previous chapter to unlock! 🔒"
                  className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-stone-400 bg-stone-100/80 border border-stone-200/50 cursor-not-allowed opacity-60 hover:opacity-80 transition"
                >
                  <Lock size={12} className="text-stone-400" />
                  <span>{page.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right side: Music Player + Chapter Step Indicator */}
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="md:hidden text-[10px] font-bold tracking-wider text-rose-800 bg-rose-100 px-2 py-0.5 rounded-full border border-rose-300">
              {String(index + 1).padStart(2, '0')}/05
            </span>
            <MusicPlayer />
          </div>
        </div>

        {/* Mobile Horizontal Chapter Navigation Strip with Lock Support */}
        <div className="md:hidden flex items-center gap-1.5 overflow-x-auto no-scrollbar px-3 py-1.5 border-t border-rose-100/40 bg-white/50">
          {STORY_PAGES.map((page, i) => {
            const Icon = page.icon;
            const isActive = index === i;
            const isUnlocked = i <= unlockedStep;

            if (isUnlocked) {
              return (
                <Link
                  key={page.href}
                  href={page.href}
                  className={`flex flex-shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold transition-all ${
                    isActive
                      ? 'active-pill text-white shadow-sm'
                      : 'bg-white/80 text-stone-700 border border-stone-200'
                  }`}
                >
                  <Icon size={11} className={isActive ? 'text-white' : 'text-stone-500'} />
                  <span>{page.label}</span>
                </Link>
              );
            }

            // Mobile Locked Tab
            return (
              <button
                key={page.href}
                type="button"
                onClick={() => showLockedToast(page.label)}
                className="flex flex-shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold bg-stone-100/80 text-stone-400 border border-stone-200/50 cursor-not-allowed opacity-60"
              >
                <Lock size={10} className="text-stone-400" />
                <span>{page.label}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Page Content (or Locked Notice if user jumped ahead) */}
      <div className="relative z-10 flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center px-3 sm:px-6 py-6 sm:py-8">
        {isCurrentPageLocked ? (
          <div className="mx-auto my-12 flex max-w-md flex-col items-center justify-center p-6 sm:p-10 text-center rounded-3xl border-2 border-rose-200 bg-white/95 shadow-2xl shadow-rose-200/50 backdrop-blur-xl animate-fade-in">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-rose-100 text-rose-600 shadow-inner mb-4 animate-bounce">
              <Lock size={32} />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-rose-600">
              CHAPTER LOCKED 🔒
            </span>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold text-stone-900 leading-snug">
              First page-a mudichittu vaanga, Kanmani! 💚
            </h2>
            <p className="mt-2.5 text-xs sm:text-sm text-stone-700 font-semibold leading-relaxed">
              Indha katha-la ovvoru chapter-aiyum varisaikaga paartha dhaan romba special-aa irukkum!
              Munnaadi irukkura chapter-a complete pannunga. ✨
            </p>
            <Link
              href={STORY_PAGES[unlockedStep].href}
              className="mt-6 btn-primary rounded-2xl px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-lg transition hover:scale-105 active:scale-95"
            >
              Go to Chapter {STORY_PAGES[unlockedStep].number}: {STORY_PAGES[unlockedStep].label} 👉
            </Link>
          </div>
        ) : (
          children
        )}
      </div>

      {/* Floating Bottom Navigation Bar */}
      <footer className="sticky bottom-0 z-30 w-full border-t border-rose-200/80 bg-white/95 backdrop-blur-lg">
        <div className="mx-auto flex h-13 sm:h-14 max-w-4xl items-center justify-between px-3 sm:px-8">
          {/* Back button */}
          {index > 0 ? (
            <Link
              href={STORY_PAGES[index - 1].href}
              className="group inline-flex items-center gap-1 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-stone-800 transition hover:text-rose-700 min-w-0"
            >
              <ArrowLeft
                size={14}
                className="transition-transform group-hover:-translate-x-1 flex-shrink-0"
              />
              <span className="hidden sm:inline">{STORY_PAGES[index - 1].label}</span>
              <span className="sm:hidden">Prev</span>
            </Link>
          ) : (
            <span className="text-[11px] sm:text-xs text-rose-700 font-bold truncate max-w-[120px] sm:max-w-none">
              ✨ Kanmani
            </span>
          )}

          {/* Stepper Dots (Clickable only if unlocked) */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0 px-2">
            {STORY_PAGES.map((page, i) => {
              const isUnlocked = i <= unlockedStep;
              const isCurrent = index === i;

              if (isUnlocked) {
                return (
                  <Link
                    key={page.href}
                    href={page.href}
                    aria-label={`Go to ${page.label}`}
                    className={`transition-all duration-300 ${
                      isCurrent
                        ? 'h-2 w-6 sm:h-2.5 sm:w-8 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 shadow-md shadow-rose-300'
                        : 'h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-rose-300 hover:bg-rose-500'
                    }`}
                  />
                );
              }

              return (
                <button
                  key={page.href}
                  type="button"
                  onClick={() => showLockedToast(page.label)}
                  aria-label={`${page.label} is locked`}
                  className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-stone-300 cursor-not-allowed opacity-60"
                />
              );
            })}
          </div>

          {/* Next button (Accessible only if next chapter is unlocked) */}
          {index < STORY_PAGES.length - 1 ? (
            index < unlockedStep ? (
              <Link
                href={STORY_PAGES[index + 1].href}
                className="group inline-flex items-center gap-1 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-stone-900 transition hover:text-rose-700 min-w-0"
              >
                <span className="hidden sm:inline">{STORY_PAGES[index + 1].label}</span>
                <span className="sm:hidden">Next</span>
                <ArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-1 flex-shrink-0"
                />
              </Link>
            ) : (
              <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-stone-400 bg-stone-100 px-2.5 py-1 rounded-full border border-stone-200">
                <Lock size={11} className="text-stone-400" />
                <span className="hidden sm:inline">Complete Chapter to Unlock Next</span>
                <span className="sm:hidden">Locked 🔒</span>
              </span>
            )
          ) : (
            <Link
              href="/"
              className="group inline-flex items-center gap-1 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-rose-700 transition hover:text-rose-800 min-w-0"
            >
              <span>Restart</span>
              <ArrowRight
                size={14}
                className="transition-transform group-hover:translate-x-1 flex-shrink-0"
              />
            </Link>
          )}
        </div>
      </footer>
    </main>
  );
}
