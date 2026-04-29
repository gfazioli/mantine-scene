import React, { useMemo } from 'react';
import {
  Box,
  getThemeColor,
  useMantineTheme,
  type MantineColor,
  type StyleProp,
} from '@mantine/core';
import { mulberry32 } from '../prng';
import { useSceneContext } from '../Scene.context';
import { useResponsiveValue } from '../use-responsive-value';
import classes from '../Scene.module.css';

export interface SceneRainProps {
  /** Number of raindrops (recommended max ~150) — accepts a responsive object like `{ base: 40, md: 80 }`
   *  @default 60
   */
  count?: StyleProp<number>;

  /** Raindrop color — supports Mantine theme colors
   *  @default 'blue'
   */
  color?: MantineColor;

  /** Mantine color shade (0-9)
   *  @default undefined
   */
  shade?: number;

  /** Minimum streak length in px
   *  @default 8
   */
  minLength?: number;

  /** Maximum streak length in px
   *  @default 18
   */
  maxLength?: number;

  /** Streak thickness in px
   *  @default 1
   */
  thickness?: number;

  /** Speed factor (multiplier on duration — higher = faster)
   *  @default 1
   */
  speed?: number;

  /** Streak tilt in degrees (0 = vertical, positive leans right, negative leans left)
   *  @default 15
   */
  angle?: number;

  /** Overall opacity (0-1)
   *  @default 0.5
   */
  opacity?: number;

  /** Render splash droplets at the bottom edge
   *  @default false
   */
  splash?: boolean;

  /** Number of splash droplets when `splash` is true
   *  @default 20
   */
  splashCount?: number;

  /** Splash color (defaults to the same as `color`) */
  splashColor?: MantineColor;

  /** Base splash droplet size in px (the actual size is randomized between ~50% and 150% of this value).
   *  @default 8
   */
  splashSize?: number;

  /** Splash droplet opacity (0-1). Higher values produce a more visible, dramatic splash.
   *  @default 0.7
   */
  splashOpacity?: number;

  /** Splash ring thickness in px — controls how prominent the splash outline appears.
   *  @default 1.5
   */
  splashThickness?: number;

  /** PRNG seed for deterministic raindrop positions
   *  @default 42
   */
  seed?: number;

  /** Additional className */
  className?: string;

  /** Additional inline styles */
  style?: React.CSSProperties;
}

export function SceneRain({
  count: countProp = 60,
  color = 'blue',
  shade,
  minLength = 8,
  maxLength = 18,
  thickness = 1,
  speed = 1,
  angle = 15,
  opacity = 0.5,
  splash = false,
  splashCount = 20,
  splashColor,
  splashSize = 8,
  splashOpacity = 0.7,
  splashThickness = 1.5,
  seed = 42,
  className,
  style,
}: SceneRainProps) {
  const count = useResponsiveValue(countProp);
  const { getStyles } = useSceneContext();
  const theme = useMantineTheme();
  const resolvedColor =
    shade !== undefined ? getThemeColor(`${color}.${shade}`, theme) : getThemeColor(color, theme);
  const resolvedSplashColor = splashColor ? getThemeColor(splashColor, theme) : resolvedColor;

  // Guard against pathological inputs: negative counts would throw in Array.from,
  // and non-positive speed would produce Infinity/NaN durations and break CSS animations.
  const safeSpeed = Math.max(0.05, speed);

  const drops = useMemo(() => {
    const rng = mulberry32(seed);
    const cappedCount = Math.max(0, Math.min(count, 150));
    return Array.from({ length: cappedCount }, (_, i) => {
      const length = minLength + rng() * (maxLength - minLength);
      const x = rng() * 100;
      // Faster than snow — base 0.5s to 1.4s, modulated by speed
      const baseDuration = 0.5 + rng() * 0.9;
      const duration = baseDuration / safeSpeed;
      const delay = -(rng() * duration);
      return { key: i, length, x, duration, delay };
    });
  }, [count, minLength, maxLength, safeSpeed, seed]);

  const splashes = useMemo(() => {
    if (!splash) {
      return [];
    }
    const rng = mulberry32(seed + 9999);
    const cappedSplashCount = Math.max(0, Math.min(splashCount, 200));
    return Array.from({ length: cappedSplashCount }, (_, i) => {
      const x = rng() * 100;
      const baseDuration = 0.8 + rng() * 1.2;
      const duration = baseDuration / safeSpeed;
      const delay = -(rng() * duration);
      // Randomize between 50% and 150% of splashSize for visual variety
      const size = splashSize * (0.5 + rng());
      return { key: i, x, duration, delay, size };
    });
  }, [splash, splashCount, splashSize, safeSpeed, seed]);

  return (
    <Box
      {...getStyles('rain', {
        className,
        style: { ...style } as React.CSSProperties,
      })}
    >
      {drops.map((drop) => (
        <Box
          key={drop.key}
          className={classes.rainDrop}
          style={
            {
              left: `${drop.x}%`,
              width: `${thickness}px`,
              height: `${drop.length}px`,
              backgroundColor: resolvedColor,
              transform: `rotate(${angle}deg)`,
              '--scene-rain-speed': `${drop.duration}s`,
              '--scene-rain-opacity': String(opacity),
              animationDelay: `${drop.delay}s`,
            } as React.CSSProperties
          }
        />
      ))}
      {splashes.map((s) => (
        <Box
          key={`splash-${s.key}`}
          className={classes.rainSplash}
          style={
            {
              left: `${s.x}%`,
              width: `${s.size}px`,
              height: `${s.size * 0.45}px`,
              borderColor: resolvedSplashColor,
              borderWidth: `${splashThickness}px ${splashThickness}px 0`,
              '--scene-rain-splash-speed': `${s.duration}s`,
              '--scene-rain-splash-opacity': String(splashOpacity),
              animationDelay: `${s.delay}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </Box>
  );
}

SceneRain.displayName = 'SceneRain';
