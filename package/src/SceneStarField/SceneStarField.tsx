import {
  Box,
  getThemeColor,
  useMantineTheme,
  type MantineColor,
  type StyleProp,
} from '@mantine/core';
import React, { useMemo } from 'react';
import { mulberry32 } from '../prng';
import { useSceneContext } from '../Scene.context';
import { useResponsiveValue } from '../use-responsive-value';
import classes from '../Scene.module.css';

export interface SceneStarFieldProps {
  /** Number of stars — accepts a responsive object like `{ base: 50, md: 100 }`
   *  @default 100
   */
  count?: StyleProp<number>;

  /** Star color — supports Mantine theme colors
   *  @default 'white'
   */
  color?: MantineColor;

  /** Minimum star size in px
   *  @default 1
   */
  minSize?: number;

  /** Maximum star size in px
   *  @default 3
   */
  maxSize?: number;

  /** Enable twinkle animation
   *  @default true
   */
  twinkle?: boolean;

  /** Central twinkle animation duration in seconds. When `minDuration`/`maxDuration` are not provided, the per-star duration is randomized in `[duration * 0.5, duration * 1.5]` so every star breathes at its own pace.
   *  @default 3
   */
  duration?: number;

  /** Minimum per-star twinkle duration in seconds. Overrides the value derived from `duration`. */
  minDuration?: number;

  /** Maximum per-star twinkle duration in seconds. Overrides the value derived from `duration`. */
  maxDuration?: number;

  /** Density multiplier on `count` (0..1) — useful for responsive thinning without changing `count`.
   *  @default 1
   */
  density?: number;

  /** PRNG seed for deterministic star positions
   *  @default 42
   */
  seed?: number;

  /** Overall opacity (0-1)
   *  @default 1
   */
  opacity?: number;

  /** Additional className */
  className?: string;

  /** Additional inline styles */
  style?: React.CSSProperties;
}

interface StarData {
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

const MAX_STARS = 500;

function generateStars(
  count: number,
  seed: number,
  minSize: number,
  maxSize: number,
  minDuration: number,
  maxDuration: number
): StarData[] {
  const rng = mulberry32(seed);
  const spanSize = Math.max(0, maxSize - minSize);
  const spanDuration = Math.max(0.1, maxDuration - minDuration);
  const stars: StarData[] = [];

  for (let i = 0; i < count; i++) {
    stars.push({
      x: rng() * 100,
      y: rng() * 100,
      size: minSize + rng() * spanSize,
      duration: minDuration + rng() * spanDuration,
      // Negative animation-delay starts every star at a different phase so the
      // field "breathes" rather than pulsing in sync.
      delay: -(rng() * (minDuration + spanDuration)),
    });
  }

  return stars;
}

export function SceneStarField({
  count: countProp = 100,
  color = 'white',
  minSize = 1,
  maxSize = 3,
  twinkle = true,
  duration = 3,
  minDuration,
  maxDuration,
  density = 1,
  seed = 42,
  opacity = 1,
  className,
  style,
}: SceneStarFieldProps) {
  const count = useResponsiveValue(countProp);
  const { getStyles } = useSceneContext();
  const theme = useMantineTheme();
  const resolvedColor = getThemeColor(color, theme);

  // Derive the per-star duration range from `duration` when min/max aren't passed.
  // Legacy `duration={3}` now spreads stars across [1.5s, 4.5s] instead of locking
  // them to three sync groups — the field reads more "alive" without breaking API.
  const effectiveMinDuration = minDuration ?? duration * 0.5;
  const effectiveMaxDuration = maxDuration ?? duration * 1.5;

  const stars = useMemo(() => {
    const safeDensity = Math.max(0, Math.min(1, density));
    const effectiveCount = Math.max(0, Math.min(Math.floor(count * safeDensity), MAX_STARS));
    return generateStars(
      effectiveCount,
      seed,
      minSize,
      maxSize,
      effectiveMinDuration,
      effectiveMaxDuration
    );
  }, [count, density, seed, minSize, maxSize, effectiveMinDuration, effectiveMaxDuration]);

  return (
    <Box
      {...getStyles('starField', {
        className,
        style: {
          opacity,
          ...style,
        } as React.CSSProperties,
      })}
    >
      {stars.map((star, i) => (
        <Box
          key={i}
          className={twinkle ? classes.starFieldDotTwinkle : classes.starFieldDot}
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: resolvedColor,
            animationDuration: twinkle ? `${star.duration}s` : undefined,
            animationDelay: twinkle ? `${star.delay}s` : undefined,
          }}
        />
      ))}
    </Box>
  );
}

SceneStarField.displayName = 'SceneStarField';
