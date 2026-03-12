import React, { useMemo } from 'react';
import { Box, getThemeColor, useMantineTheme, type MantineColor } from '@mantine/core';
import { mulberry32 } from '../prng';
import { useSceneContext } from '../Scene.context';
import classes from '../Scene.module.css';

export interface SceneSnowProps {
  /** Number of snowflakes (recommended max ~80)
   *  @default 50
   */
  count?: number;

  /** Snowflake color — supports Mantine theme colors
   *  @default 'white'
   */
  color?: MantineColor;

  /** Minimum snowflake size in px
   *  @default 2
   */
  minSize?: number;

  /** Maximum snowflake size in px
   *  @default 6
   */
  maxSize?: number;

  /** Speed factor (multiplier on duration)
   *  @default 1
   */
  speed?: number;

  /** Horizontal drift in px
   *  @default 30
   */
  drift?: number;

  /** Wind direction (-1 to 1): -1 = left, 0 = none, 1 = right
   *  @default 0
   */
  wind?: number;

  /** PRNG seed for deterministic flake positions
   *  @default 42
   */
  seed?: number;

  /** Overall opacity (0-1)
   *  @default 0.8
   */
  opacity?: number;

  /** Additional className */
  className?: string;

  /** Additional inline styles */
  style?: React.CSSProperties;
}

export function SceneSnow({
  count = 50,
  color = 'white',
  minSize = 2,
  maxSize = 6,
  speed = 1,
  drift = 30,
  wind = 0,
  seed = 42,
  opacity = 0.8,
  className,
  style,
}: SceneSnowProps) {
  const { getStyles } = useSceneContext();
  const theme = useMantineTheme();
  const resolvedColor = getThemeColor(color, theme);

  const flakes = useMemo(() => {
    const rng = mulberry32(seed);
    const cappedCount = Math.min(count, 80);
    return Array.from({ length: cappedCount }, (_, i) => {
      const size = minSize + rng() * (maxSize - minSize);
      const x = rng() * 100;
      const baseDuration = 6 + rng() * 8;
      const duration = baseDuration / speed;
      const delay = rng() * duration;
      const flakeDrift = drift + wind * 20 * (0.5 + rng());
      return { key: i, size, x, duration, delay, drift: flakeDrift };
    });
  }, [count, minSize, maxSize, speed, drift, wind, seed]);

  return (
    <Box
      {...getStyles('snow', {
        className,
        style: { ...style } as React.CSSProperties,
      })}
    >
      {flakes.map((flake) => (
        <Box
          key={flake.key}
          className={classes.snowFlake}
          style={
            {
              left: `${flake.x}%`,
              width: `${flake.size}px`,
              height: `${flake.size}px`,
              backgroundColor: resolvedColor,
              '--scene-snow-speed': `${flake.duration}s`,
              '--scene-snow-drift': `${flake.drift}px`,
              '--scene-snow-opacity': String(opacity),
              animationDelay: `${flake.delay}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </Box>
  );
}

SceneSnow.displayName = 'SceneSnow';
