import { alpha, Box, getThemeColor, useMantineTheme, type MantineColor } from '@mantine/core';
import React, { useMemo } from 'react';
import { mulberry32 } from '../prng';
import { useSceneContext } from '../Scene.context';
import classes from '../Scene.module.css';

export interface SceneMeteorsProps {
  /** Number of meteor streaks rendered.
   *  @default 20
   */
  count?: number;

  /** Minimum seconds for a single streak's full traversal.
   *  @default 2
   */
  minDuration?: number;

  /** Maximum seconds for a single streak's full traversal.
   *  @default 6
   */
  maxDuration?: number;

  /** Minimum delay before a streak first appears (seconds).
   *  @default 0
   */
  minDelay?: number;

  /** Maximum delay before a streak first appears (seconds).
   *  @default 4
   */
  maxDelay?: number;

  /** Streak direction in degrees. `215` produces the classic top-right → bottom-left rain.
   *  @default 215
   */
  angle?: number;

  /** Base streak length in px.
   *  @default 80
   */
  size?: number;

  /** Meteor color — Mantine theme color or any CSS color.
   *  @default 'white'
   */
  color?: MantineColor;

  /** Peak opacity of the streak gradient (0..1).
   *  @default 0.7
   */
  opacity?: number;

  /** Seed for deterministic positions / durations. Same seed → identical layout.
   *  @default 1
   */
  seed?: number;

  /** Additional className */
  className?: string;

  /** Additional inline styles */
  style?: React.CSSProperties;
}

export function SceneMeteors({
  count = 20,
  minDuration = 2,
  maxDuration = 6,
  minDelay = 0,
  maxDelay = 4,
  angle = 215,
  size = 80,
  color = 'white',
  opacity = 0.7,
  seed = 1,
  className,
  style,
}: SceneMeteorsProps) {
  const { getStyles } = useSceneContext();
  const theme = useMantineTheme();

  const resolvedColor = useMemo(() => getThemeColor(color, theme), [color, theme]);
  const streakColor = useMemo(() => alpha(resolvedColor, opacity), [resolvedColor, opacity]);

  const meteors = useMemo(() => {
    const rng = mulberry32(seed);
    const cappedCount = Math.max(0, Math.min(count, 200));
    const spanDuration = Math.max(0.1, maxDuration - minDuration);
    const spanDelay = Math.max(0, maxDelay - minDelay);
    return Array.from({ length: cappedCount }, (_, i) => ({
      key: i,
      // Start positions distributed across the upper-right edge so streaks come from offscreen
      left: `${rng() * 120 - 10}%`,
      top: `${rng() * 40 - 30}%`,
      duration: minDuration + rng() * spanDuration,
      delay: minDelay + rng() * spanDelay,
    }));
  }, [count, minDuration, maxDuration, minDelay, maxDelay, seed]);

  return (
    <Box
      {...getStyles('meteors', {
        className,
        style: {
          '--scene-meteor-angle': `${angle}deg`,
          '--scene-meteor-size': `${size}px`,
          '--scene-meteor-color': streakColor,
          ...style,
        } as React.CSSProperties,
      })}
    >
      {meteors.map((m) => (
        <span
          key={m.key}
          className={classes.meteor}
          style={{
            left: m.left,
            top: m.top,
            animationDuration: `${m.duration}s`,
            animationDelay: `${m.delay}s`,
          }}
          aria-hidden="true"
        />
      ))}
    </Box>
  );
}

SceneMeteors.displayName = 'SceneMeteors';
