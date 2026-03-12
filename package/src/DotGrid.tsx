import React from 'react';
import { Box } from '@mantine/core';
import { useSceneContext } from './Scene.context';

export interface DotGridProps {
  /** Dot color (CSS color)
   *  @default 'rgba(255, 255, 255, 0.15)'
   */
  color?: string;

  /** Dot radius in px
   *  @default 1
   */
  dotSize?: number;

  /** Spacing between dots in px
   *  @default 24
   */
  spacing?: number;

  /** Overall opacity (0-1)
   *  @default 1
   */
  opacity?: number;

  /** Additional className */
  className?: string;

  /** Additional inline styles */
  style?: React.CSSProperties;
}

export function DotGrid({
  color = 'rgba(255, 255, 255, 0.15)',
  dotSize = 1,
  spacing = 24,
  opacity = 1,
  className,
  style,
}: DotGridProps) {
  const { getStyles } = useSceneContext();

  const backgroundImage = `radial-gradient(circle, ${color} ${dotSize}px, transparent ${dotSize}px)`;

  return (
    <Box
      {...getStyles('dotGrid', {
        className,
        style: {
          backgroundImage,
          backgroundSize: `${spacing}px ${spacing}px`,
          opacity,
          ...style,
        },
      })}
    />
  );
}

DotGrid.displayName = 'Scene.DotGrid';
