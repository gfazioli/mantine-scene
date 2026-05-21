import { alpha, Box, getThemeColor, useMantineTheme, type MantineColor } from '@mantine/core';
import React, { useMemo } from 'react';
import { mulberry32 } from '../prng';
import { useSceneContext } from '../Scene.context';
import classes from '../Scene.module.css';

export type SceneBeamsDirection = 'horizontal' | 'vertical';

export interface SceneBeamsProps {
  /** Number of beams rendered.
   *  @default 5
   */
  count?: number;

  /** Minimum seconds for a beam's traversal across the scene.
   *  @default 4
   */
  minDuration?: number;

  /** Maximum seconds for a beam's traversal across the scene.
   *  @default 12
   */
  maxDuration?: number;

  /** Beam thickness in px (width for vertical beams, height for horizontal).
   *  @default 80
   */
  width?: number;

  /** Peak opacity at the bright moment of the sweep (0..1).
   *  @default 0.35
   */
  opacity?: number;

  /** Gaussian blur applied to every beam in px — softens the edges.
   *  @default 24
   */
  blur?: number;

  /** Corner radius applied to each beam — accepts a number in px or any CSS length. Pair with a small `width` to get pill / capsule beams, or set to `0` for hard-edged columns.
   *  @default 999
   */
  radius?: number | string;

  /** Colors cycled across beams — Mantine theme colors or any CSS colors. Pass a single color to paint every beam the same shade, or an array to cycle.
   *  @default ['blue', 'grape', 'cyan']
   */
  colors?: MantineColor | MantineColor[];

  /** Sweep axis. `'vertical'` paints columns that traverse left↔right; `'horizontal'` paints rows that traverse top↔bottom.
   *  @default 'vertical'
   */
  direction?: SceneBeamsDirection;

  /** Seed for deterministic positions / durations. Same seed → identical layout.
   *  @default 1
   */
  seed?: number;

  /** Additional className */
  className?: string;

  /** Additional inline styles */
  style?: React.CSSProperties;
}

const DEFAULT_COLORS: MantineColor[] = ['blue', 'grape', 'cyan'];

export function SceneBeams({
  count = 5,
  minDuration = 4,
  maxDuration = 12,
  width = 80,
  opacity = 0.35,
  blur = 24,
  radius = 999,
  colors,
  direction = 'vertical',
  seed = 1,
  className,
  style,
}: SceneBeamsProps) {
  const { getStyles } = useSceneContext();
  const theme = useMantineTheme();

  const resolvedColors = useMemo(() => {
    const normalized = Array.isArray(colors) ? colors : colors ? [colors] : [];
    const list = normalized.length > 0 ? normalized : DEFAULT_COLORS;
    return list.map((c) => alpha(getThemeColor(c, theme), opacity));
  }, [colors, theme, opacity]);

  const beams = useMemo(() => {
    const rng = mulberry32(seed);
    const cappedCount = Math.max(0, Math.min(count, 50));
    const spanDuration = Math.max(0.1, maxDuration - minDuration);
    return Array.from({ length: cappedCount }, (_, i) => ({
      key: i,
      color: resolvedColors[i % resolvedColors.length],
      duration: minDuration + rng() * spanDuration,
      delay: -(rng() * (minDuration + spanDuration)),
      offset: rng() * 100,
    }));
  }, [count, minDuration, maxDuration, seed, resolvedColors]);

  const resolvedRadius = typeof radius === 'number' ? `${radius}px` : radius;

  return (
    <Box
      {...getStyles('beams', {
        className,
        style: {
          '--scene-beam-width': `${width}px`,
          '--scene-beam-blur': `${blur}px`,
          '--scene-beam-radius': resolvedRadius,
          ...style,
        } as React.CSSProperties,
      })}
      mod={{ direction }}
    >
      {beams.map((b) => (
        <span
          key={b.key}
          className={classes.beam}
          style={{
            // Gradient runs along the beam's LONG axis so each beam fades in/out at
            // its tips — combined with `radius` this yields the pill/capsule look.
            // The narrow-edge blur is handled by `filter: blur(...)` on .beam.
            background: `linear-gradient(${direction === 'vertical' ? '180deg' : '90deg'}, transparent 0%, ${b.color} 50%, transparent 100%)`,
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
            ...(direction === 'vertical'
              ? { left: `${b.offset}%`, top: '-10%' }
              : { top: `${b.offset}%`, left: '-10%' }),
          }}
          aria-hidden="true"
        />
      ))}
    </Box>
  );
}

SceneBeams.displayName = 'SceneBeams';
