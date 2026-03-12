import React from 'react';
import { Box, getThemeColor, useMantineTheme, type MantineColor } from '@mantine/core';
import { useSceneContext } from '../Scene.context';

export interface SceneDotGridProps {
  /** Dot color — supports Mantine theme colors
   *  @default 'gray'
   */
  color?: MantineColor;

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

export function SceneDotGrid({
  color = 'gray',
  dotSize = 1,
  spacing = 24,
  opacity = 1,
  className,
  style,
}: SceneDotGridProps) {
  const { getStyles } = useSceneContext();
  const theme = useMantineTheme();
  const resolvedColor = getThemeColor(color, theme);

  const backgroundImage = `radial-gradient(circle, ${resolvedColor} ${dotSize}px, transparent ${dotSize}px)`;

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

SceneDotGrid.displayName = 'SceneDotGrid';
