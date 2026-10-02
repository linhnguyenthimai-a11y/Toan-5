import { UserProgress } from '../types/math';

const STORAGE_KEY = 'mathventure5_progress';

export const defaultProgress: UserProgress = {
  stars: 30, // Khởi đầu với 30 sao khích lệ tinh thần thám hiểm
  completedQuestIds: [],
  solvedReflectionIds: [],
  unlockedBadgeIds: ['explorer_bronze'],
  currentIsland: 'decimals',
};

export function loadUserProgress(): UserProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProgress;
    const parsed = JSON.parse(raw);
    return {
      ...defaultProgress,
      ...parsed,
    };
  } catch (e) {
    console.error('Failed to load progress', e);
    return defaultProgress;
  }
}

export function saveUserProgress(progress: UserProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save progress', e);
  }
}

export function resetUserProgress(): UserProgress {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Failed to reset progress', e);
  }
  return defaultProgress;
}
