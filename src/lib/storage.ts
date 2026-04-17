const STORAGE_KEY = 'soundchange_completed';
const RESULT_KEY = 'soundchange_result';

export function isCompleted(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(STORAGE_KEY) === 'true';
}

export function markCompleted(): void {
  localStorage.setItem(STORAGE_KEY, 'true');
}

export function saveResult(result: string): void {
  localStorage.setItem(RESULT_KEY, result);
}

export function getSavedResult(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(RESULT_KEY);
}
