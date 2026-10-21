'use client';

const STORAGE_KEY = 'birthday_unlocked_step';

export function getUnlockedStep(): number {
  if (typeof window === 'undefined') return 0;
  try {
    const val = localStorage.getItem(STORAGE_KEY);
    return val !== null ? parseInt(val, 10) : 0;
  } catch {
    return 0;
  }
}

export function unlockStep(stepNumber: number): void {
  if (typeof window === 'undefined') return;
  try {
    const current = getUnlockedStep();
    if (stepNumber > current) {
      localStorage.setItem(STORAGE_KEY, String(stepNumber));
      window.dispatchEvent(new Event('birthday_progress_updated'));
    }
  } catch (err) {
    console.error('Failed to update progress in localStorage:', err);
  }
}

export function resetProgress(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, '0');
    window.dispatchEvent(new Event('birthday_progress_updated'));
  } catch (err) {
    console.error('Failed to reset progress:', err);
  }
}
