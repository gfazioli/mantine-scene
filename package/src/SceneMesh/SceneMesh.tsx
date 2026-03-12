import React from 'react';
import { Box, getThemeColor, useMantineTheme, type MantineColor } from '@mantine/core';
import { useSceneContext } from '../Scene.context';
import classes from '../Scene.module.css';

export interface SceneMeshStop {
  /** Color — supports Mantine theme colors */
  color: MantineColor;
  /** Position as 'x% y%' (e.g. '20% 30%') */
  position: string;
  /** Spread radius as percentage
   *  @default 50
   */
  spread?: number;
}

export interface SceneMeshProps {
  /** Array of color stops for the mesh */
  stops?: SceneMeshStop[];

  /** Overall opacity (0-1)
   *  @default 1
   */
  opacity?: number;

  /** Enable animated hue-rotate shift
   *  @default false
   */
  animate?: boolean;

  /** Animation duration in seconds
   *  @default 15
   */
  duration?: number;

  /** CSS mix-blend-mode
   *  @default 'normal'
   */
  blend?: React.CSSProperties['mixBlendMode'];

  /** Additional className */
  className?: string;

  /** Additional inline styles */
  style?: React.CSSProperties;
}

const defaultStops: SceneMeshStop[] = [
  { color: 'violet', position: '20% 20%', spread: 50 },
  { color: 'pink', position: '80% 30%', spread: 45 },
  { color: 'blue', position: '50% 80%', spread: 55 },
];

export function SceneMesh({
  stops = defaultStops,
  opacity = 1,
  animate = false,
  duration = 15,
  blend = 'normal',
  className,
  style,
}: SceneMeshProps) {
  const { getStyles } = useSceneContext();
  const theme = useMantineTheme();

  const background = stops
    .map(
      (stop) =>
        `radial-gradient(ellipse at ${stop.position}, ${getThemeColor(stop.color, theme)} 0%, transparent ${stop.spread ?? 50}%)`
    )
    .join(', ');

  return (
    <Box
      {...getStyles('mesh', {
        className:
          [animate && classes.meshAnimated, className].filter(Boolean).join(' ') || undefined,
        style: {
          background,
          opacity,
          mixBlendMode: blend,
          '--scene-mesh-duration': `${duration}s`,
          ...style,
        } as React.CSSProperties,
      })}
    />
  );
}

SceneMesh.displayName = 'SceneMesh';
