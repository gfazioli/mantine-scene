import React from 'react';
import { Box, getThemeColor, useMantineTheme, type MantineColor } from '@mantine/core';
import { useSceneContext } from '../Scene.context';
import classes from '../Scene.module.css';

export interface SceneDotGridProps {
  /** Dot color — supports Mantine theme colors
   *  @default 'gray'
   */
  color?: MantineColor;

  /** Mantine color shade (0-9)
   *  @default undefined
   */
  shade?: number;

  /** Dot radius in px
   *  @default 1
   */
  dotSize?: number;

  /** Spacing between dots in px
   *  @default 24
   */
  spacing?: number;

  /** Stagger alternate rows by half the spacing
   *  @default false
   */
  stagger?: boolean;

  /** Fade mask at edges
   *  @default 'none'
   */
  fade?: 'none' | 'radial' | 'top' | 'bottom' | 'edges';

  /** Enable twinkle animation
   *  @default false
   */
  animate?: boolean;

  /** Animation duration in seconds
   *  @default 4
   */
  duration?: number;

  /** Overall opacity (0-1)
   *  @default 1
   */
  opacity?: number;

  /** Additional className */
  className?: string;

  /** Additional inline styles */
  style?: React.CSSProperties;
}

function getFadeMask(fade: string): string | undefined {
  switch (fade) {
    case 'radial':
      return 'radial-gradient(ellipse at center, black 40%, transparent 80%)';
    case 'top':
      return 'linear-gradient(to bottom, transparent 0%, black 30%)';
    case 'bottom':
      return 'linear-gradient(to bottom, black 70%, transparent 100%)';
    case 'edges':
      return 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)';
    default:
      return undefined;
  }
}

export function SceneDotGrid({
  color = 'gray',
  shade,
  dotSize = 1,
  spacing = 24,
  stagger = false,
  fade = 'none',
  animate = false,
  duration = 4,
  opacity = 1,
  className,
  style,
}: SceneDotGridProps) {
  const { getStyles } = useSceneContext();
  const theme = useMantineTheme();
  const resolvedColor =
    shade !== undefined ? getThemeColor(`${color}.${shade}`, theme) : getThemeColor(color, theme);

  const dotPattern = `radial-gradient(circle, ${resolvedColor} ${dotSize}px, transparent ${dotSize}px)`;

  let backgroundImage: string;
  let backgroundSize: string;
  let backgroundPosition: string | undefined;

  if (stagger) {
    backgroundImage = `${dotPattern}, ${dotPattern}`;
    backgroundSize = `${spacing}px ${spacing * 2}px, ${spacing}px ${spacing * 2}px`;
    backgroundPosition = `0 0, ${spacing / 2}px ${spacing}px`;
  } else {
    backgroundImage = dotPattern;
    backgroundSize = `${spacing}px ${spacing}px`;
    backgroundPosition = undefined;
  }

  const maskImage = getFadeMask(fade);

  return (
    <Box
      {...getStyles('dotGrid', {
        className:
          [animate && classes.dotGridAnimated, className].filter(Boolean).join(' ') || undefined,
        style: {
          backgroundImage,
          backgroundSize,
          backgroundPosition,
          opacity,
          maskImage,
          WebkitMaskImage: maskImage,
          '--scene-dotgrid-opacity': String(opacity),
          '--scene-dotgrid-duration': `${duration}s`,
          ...style,
        } as React.CSSProperties,
      })}
    />
  );
}

SceneDotGrid.displayName = 'SceneDotGrid';
