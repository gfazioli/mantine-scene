import React, { useMemo } from 'react';
import { Box, getThemeColor, useMantineTheme, type MantineColor } from '@mantine/core';
import { mulberry32 } from '../prng';
import { useSceneContext } from '../Scene.context';
import { useResponsiveValue, type ResponsiveValue } from '../use-responsive-value';
import classes from '../Scene.module.css';

export interface SceneStarWarpProps {
  /** Number of stars (capped at 200) — accepts a responsive object like `{ base: 50, md: 100 }`
   *  @default 100
   */
  count?: ResponsiveValue<number>;

  /** Speed multiplier — higher = faster
   *  @default 1
   */
  speed?: number;

  /** Warp direction: 'out' = stars fly away from focal point, 'in' = stars fly toward it
   *  @default 'out'
   */
  direction?: 'in' | 'out';

  /** Focal point X position (CSS value)
   *  @default '50%'
   */
  focalX?: string;

  /** Focal point Y position (CSS value)
   *  @default '50%'
   */
  focalY?: string;

  /** Enable elongated trail effect on stars
   *  @default true
   */
  trail?: boolean;

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

  /** Overall opacity (0-1)
   *  @default 1
   */
  opacity?: number;

  /** PRNG seed for deterministic star positions
   *  @default 42
   */
  seed?: number;

  /** Additional className */
  className?: string;

  /** Additional inline styles */
  style?: React.CSSProperties;
}

export function SceneStarWarp({
  count: countProp = 100,
  speed = 1,
  direction = 'out',
  focalX = '50%',
  focalY = '50%',
  trail = true,
  color = 'white',
  minSize = 1,
  maxSize = 3,
  opacity = 1,
  seed = 42,
  className,
  style,
}: SceneStarWarpProps) {
  const count = useResponsiveValue(countProp);
  const { getStyles, mouse, fullscreen } = useSceneContext();
  const theme = useMantineTheme();
  const resolvedColor = getThemeColor(color, theme);

  // When interactive, mouse position overrides focalX/focalY
  const effectiveFocalX = mouse ? `${mouse.x}%` : focalX;
  const effectiveFocalY = mouse ? `${mouse.y}%` : focalY;

  const stars = useMemo(() => {
    const rng = mulberry32(seed);
    const cappedCount = Math.min(count, 200);
    return Array.from({ length: cappedCount }, (_, i) => {
      const angle = rng() * 360;
      const baseDuration = 1.5 + rng() * 3.5;
      const duration = baseDuration / speed;
      // Negative delay = start mid-animation, so stars are already distributed
      const delay = -(rng() * duration);
      const size = minSize + rng() * (maxSize - minSize);
      return { key: i, angle, duration, delay, size };
    });
  }, [count, speed, minSize, maxSize, seed]);

  const dotClass =
    direction === 'out'
      ? fullscreen
        ? classes.starWarpDotOutFullscreen
        : classes.starWarpDotOut
      : fullscreen
        ? classes.starWarpDotInFullscreen
        : classes.starWarpDotIn;

  return (
    <Box
      {...getStyles('starWarp', {
        className,
        style: {
          opacity,
          ...style,
        } as React.CSSProperties,
      })}
    >
      {stars.map((star) => (
        <Box
          key={star.key}
          className={classes.starWarpLane}
          style={{
            left: effectiveFocalX,
            top: effectiveFocalY,
            transform: `rotate(${star.angle}deg)`,
          }}
        >
          <Box
            component="span"
            className={dotClass}
            style={
              {
                width: trail ? `${star.size * 3}px` : `${star.size}px`,
                height: `${star.size}px`,
                backgroundColor: resolvedColor,
                '--scene-starwarp-speed': `${star.duration}s`,
                animationDelay: `${star.delay}s`,
              } as React.CSSProperties
            }
          />
        </Box>
      ))}
    </Box>
  );
}

SceneStarWarp.displayName = 'SceneStarWarp';
