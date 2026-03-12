import React, { useMemo } from 'react';
import { Box, getThemeColor, useMantineTheme, type MantineColor } from '@mantine/core';
import { mulberry32 } from '../prng';
import { useSceneContext } from '../Scene.context';
import classes from '../Scene.module.css';

export interface SceneStarFieldProps {
  /** Number of stars
   *  @default 100
   */
  count?: number;

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

  /** Twinkle animation duration in seconds
   *  @default 3
   */
  duration?: number;

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
}

function generateStars(count: number, seed: number, minSize: number, maxSize: number): StarData[] {
  const rng = mulberry32(seed);
  const stars: StarData[] = [];

  for (let i = 0; i < count; i++) {
    stars.push({
      x: rng() * 100,
      y: rng() * 100,
      size: minSize + rng() * (maxSize - minSize),
    });
  }

  return stars;
}

export function SceneStarField({
  count = 100,
  color = 'white',
  minSize = 1,
  maxSize = 3,
  twinkle = true,
  duration = 3,
  seed = 42,
  opacity = 1,
  className,
  style,
}: SceneStarFieldProps) {
  const { getStyles } = useSceneContext();
  const theme = useMantineTheme();
  const resolvedColor = getThemeColor(color, theme);

  const starsPerLayer = Math.ceil(count / 3);

  const layers = useMemo(
    () => [
      generateStars(starsPerLayer, seed, minSize, maxSize),
      generateStars(starsPerLayer, seed + 1000, minSize, maxSize),
      generateStars(starsPerLayer, seed + 2000, minSize, maxSize),
    ],
    [starsPerLayer, seed, minSize, maxSize]
  );

  const twinkleClasses = [
    classes.starFieldTwinkle1,
    classes.starFieldTwinkle2,
    classes.starFieldTwinkle3,
  ];

  return (
    <Box
      {...getStyles('starField', {
        className,
        style: {
          opacity,
          '--scene-starfield-duration': `${duration}s`,
          ...style,
        } as React.CSSProperties,
      })}
    >
      {layers.map((stars, layerIndex) => (
        <Box
          key={layerIndex}
          className={
            [classes.starFieldLayer, twinkle && twinkleClasses[layerIndex]]
              .filter(Boolean)
              .join(' ') || undefined
          }
        >
          {stars.map((star, starIndex) => (
            <Box
              key={starIndex}
              className={classes.starFieldDot}
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                backgroundColor: resolvedColor,
              }}
            />
          ))}
        </Box>
      ))}
    </Box>
  );
}

SceneStarField.displayName = 'SceneStarField';
