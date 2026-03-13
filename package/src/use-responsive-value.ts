import { useMatches, type MantineBreakpoint } from '@mantine/core';

/** A value that can be either a plain value or a responsive object keyed by breakpoint */
export type ResponsiveValue<T> = T | Partial<Record<MantineBreakpoint | 'base', T>>;

/**
 * Resolves a ResponsiveValue<T> to its current value based on the viewport.
 * If the value is a plain value, returns it directly.
 * If it's a responsive object (e.g. { base: 100, md: 200 }), uses Mantine's useMatches.
 */
export function useResponsiveValue<T>(value: ResponsiveValue<T>): T {
  const isResponsiveObject = value !== null && typeof value === 'object' && !Array.isArray(value);

  // useMatches must always be called (hooks can't be conditional),
  // so we pass either the responsive object or a dummy with just the base value.
  const matchesInput = isResponsiveObject
    ? (value as Partial<Record<MantineBreakpoint | 'base', T>>)
    : ({ base: value } as Partial<Record<MantineBreakpoint | 'base', T>>);

  return useMatches(matchesInput);
}
