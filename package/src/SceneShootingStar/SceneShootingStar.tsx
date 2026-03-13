import React, { useMemo } from 'react';
import { Box, getThemeColor, useMantineTheme, type MantineColor } from '@mantine/core';
import { mulberry32 } from '../prng';
import { useSceneContext } from '../Scene.context';
import classes from '../Scene.module.css';

export interface SceneShootingStarProps {
  /** Number of shooting star lanes
   *  @default 3
   */
  count?: number;

  /** Trail color — supports Mantine theme colors
   *  @default 'white'
   */
  color?: MantineColor;

  /** Trail length in px
   *  @default 80
   */
  trailLength?: number;

  /** Angle of the shooting star trajectory in degrees
   *  @default 215
   */
  angle?: number;

  /** Speed — animation duration in seconds
   *  @default 1
   */
  speed?: number;

  /** Minimum interval between shooting stars in seconds
   *  @default 3
   */
  minInterval?: number;

  /** Maximum interval between shooting stars in seconds
   *  @default 8
   */
  maxInterval?: number;

  /** PRNG seed for deterministic trail positions
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

export function SceneShootingStar({
  count = 3,
  color = 'white',
  trailLength = 80,
  angle = 215,
  speed = 1,
  minInterval = 3,
  maxInterval = 8,
  seed = 42,
  opacity = 0.8,
  className,
  style,
}: SceneShootingStarProps) {
  const { getStyles, fullscreen } = useSceneContext();
  const theme = useMantineTheme();
  const resolvedColor = getThemeColor(color, theme);

  const trails = useMemo(() => {
    const rad = (angle * Math.PI) / 180;
    const dx = Math.cos(rad);
    const dy = Math.sin(rad);

    // Stars enter from the container edges that face against the direction
    // of travel. For diagonal angles, two edges are entry edges, weighted
    // by the magnitude of each direction component.
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);
    const total = absDx + absDy || 1;

    const rng = mulberry32(seed);
    return Array.from({ length: count }, (_, i) => {
      const r = rng();
      let startX: number;
      let startY: number;

      if (r < absDx / total) {
        // Place on vertical entry edge (left or right)
        startX = dx > 0 ? -3 : 103;
        startY = rng() * 100;
      } else {
        // Place on horizontal entry edge (top or bottom)
        startX = rng() * 100;
        startY = dy > 0 ? -3 : 103;
      }

      const interval = minInterval + rng() * (maxInterval - minInterval);
      const activeDuration = 1 / speed;
      const totalDuration = activeDuration + interval;
      return {
        key: i,
        startX,
        startY,
        totalDuration,
        delay: rng() * interval,
      };
    });
  }, [count, speed, minInterval, maxInterval, angle, seed]);

  return (
    <Box
      {...getStyles('shootingStar', {
        className,
        style: { ...style },
      })}
    >
      {trails.map((trail) => (
        <Box
          key={trail.key}
          className={classes.shootingStarLane}
          style={{
            left: `${trail.startX}%`,
            top: `${trail.startY}%`,
            transform: `rotate(${angle}deg)`,
            opacity,
          }}
        >
          <Box
            component="span"
            className={fullscreen ? classes.shootingStarTrailFullscreen : classes.shootingStarTrail}
            style={
              {
                width: `${trailLength}px`,
                '--scene-shooting-height': '2px',
                '--scene-shooting-speed': `${trail.totalDuration}s`,
                background: `linear-gradient(90deg, transparent 0%, ${resolvedColor} 100%)`,
                animationDelay: `${trail.delay}s`,
              } as React.CSSProperties
            }
          />
        </Box>
      ))}
    </Box>
  );
}

SceneShootingStar.displayName = 'SceneShootingStar';
