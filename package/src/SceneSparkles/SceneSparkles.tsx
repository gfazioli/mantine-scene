import { alpha, Box, getThemeColor, useMantineTheme, type MantineColor } from '@mantine/core';
import React, { useMemo } from 'react';
import { mulberry32 } from '../prng';
import { useSceneContext } from '../Scene.context';
import classes from '../Scene.module.css';

export interface SceneSparklesProps {
  /** Number of sparkle dots scattered. Capped at 500.
   *  @default 50
   */
  count?: number;

  /** Minimum dot diameter in px.
   *  @default 1
   */
  minSize?: number;

  /** Maximum dot diameter in px.
   *  @default 3
   */
  maxSize?: number;

  /** Minimum seconds for a twinkle cycle.
   *  @default 1.5
   */
  minDuration?: number;

  /** Maximum seconds for a twinkle cycle.
   *  @default 4
   */
  maxDuration?: number;

  /** Sparkle color — Mantine theme color or any CSS color.
   *  @default 'white'
   */
  color?: MantineColor;

  /** Peak opacity at the brightest moment of the twinkle (0..1).
   *  @default 0.9
   */
  opacity?: number;

  /** Density multiplier on `count` (0..1) — useful for responsive thinning without changing `count`.
   *  @default 1
   */
  density?: number;

  /** Seed for deterministic positions / sizes / phases. Same seed → identical layout.
   *  @default 1
   */
  seed?: number;

  /** Additional className */
  className?: string;

  /** Additional inline styles */
  style?: React.CSSProperties;
}

export function SceneSparkles({
  count = 50,
  minSize = 1,
  maxSize = 3,
  minDuration = 1.5,
  maxDuration = 4,
  color = 'white',
  opacity = 0.9,
  density = 1,
  seed = 1,
  className,
  style,
}: SceneSparklesProps) {
  const { getStyles } = useSceneContext();
  const theme = useMantineTheme();

  const resolvedColor = useMemo(() => getThemeColor(color, theme), [color, theme]);
  const sparkleColor = useMemo(() => alpha(resolvedColor, opacity), [resolvedColor, opacity]);

  const sparkles = useMemo(() => {
    const rng = mulberry32(seed);
    const safeDensity = Math.max(0, Math.min(1, density));
    const effectiveCount = Math.max(0, Math.min(Math.floor(count * safeDensity), 500));
    const spanSize = Math.max(0, maxSize - minSize);
    const spanDuration = Math.max(0.1, maxDuration - minDuration);
    return Array.from({ length: effectiveCount }, (_, i) => ({
      key: i,
      left: `${rng() * 100}%`,
      top: `${rng() * 100}%`,
      size: minSize + rng() * spanSize,
      duration: minDuration + rng() * spanDuration,
      // Negative delays start every sparkle at a different phase so the field
      // "breathes" rather than pulsing in sync.
      delay: -(rng() * (minDuration + spanDuration)),
    }));
  }, [count, density, minSize, maxSize, minDuration, maxDuration, seed]);

  return (
    <Box
      {...getStyles('sparkles', {
        className,
        style: {
          '--scene-sparkle-color': sparkleColor,
          ...style,
        } as React.CSSProperties,
      })}
    >
      {sparkles.map((s) => (
        <span
          key={s.key}
          className={classes.sparkle}
          style={{
            left: s.left,
            top: s.top,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
          }}
          aria-hidden="true"
        />
      ))}
    </Box>
  );
}

SceneSparkles.displayName = 'SceneSparkles';
