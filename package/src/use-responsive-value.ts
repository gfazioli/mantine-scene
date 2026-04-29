import { useMatches, type MantineBreakpoint, type StyleProp } from '@mantine/core';

/**
 * Backwards-compatible alias for `StyleProp<T>` from `@mantine/core`.
 * Prefer `StyleProp<T>` directly in new code.
 *
 * @deprecated Use `StyleProp<T>` from `@mantine/core`.
 */
export type ResponsiveValue<T> = StyleProp<T>;

/**
 * Resolves a `StyleProp<T>` to its current value based on the viewport.
 * Reserved for JS-only props (e.g. canvas particle counts) that cannot be
 * expressed as CSS variables. CSS-derivable props should use the
 * `InlineStyles` + media queries pattern instead.
 */
export function useResponsiveValue<T>(value: StyleProp<T>): T {
  const isResponsiveObject = value !== null && typeof value === 'object' && !Array.isArray(value);

  const matchesInput = isResponsiveObject
    ? (value as Partial<Record<MantineBreakpoint | 'base', T>>)
    : ({ base: value } as Partial<Record<MantineBreakpoint | 'base', T>>);

  return useMatches(matchesInput);
}
