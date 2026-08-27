import type { Task } from '../types.ts';

function isErrnoException(err: unknown): err is NodeJS.ErrnoException {
  return err instanceof Error && typeof (err as NodeJS.ErrnoException).code === 'string';
}

function nextId(tasks: readonly Task[]): string {
  const max = tasks.reduce((m, t) => Math.max(m, Number(t.id)), 0);
  return String(max + 1);
}

function nowISO(): string {
  return new Date().toISOString();
}

export { isErrnoException, nextId, nowISO };
