import React from 'react';
import { Box } from '@mantine/core';
import { useSceneContext } from '../Scene.context';

export interface SceneMeshStop {
  /** CSS color */
  color: string;
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

  /** Additional className */
  className?: string;

  /** Additional inline styles */
  style?: React.CSSProperties;
}

const defaultStops: SceneMeshStop[] = [
  { color: 'rgba(120, 0, 255, 0.15)', position: '20% 20%', spread: 50 },
  { color: 'rgba(255, 0, 128, 0.12)', position: '80% 30%', spread: 45 },
  { color: 'rgba(0, 100, 255, 0.1)', position: '50% 80%', spread: 55 },
];

export function SceneMesh({ stops = defaultStops, opacity = 1, className, style }: SceneMeshProps) {
  const { getStyles } = useSceneContext();

  const background = stops
    .map(
      (stop) =>
        `radial-gradient(ellipse at ${stop.position}, ${stop.color} 0%, transparent ${stop.spread ?? 50}%)`
    )
    .join(', ');

  return <Box {...getStyles('mesh', { className, style: { background, opacity, ...style } })} />;
}

SceneMesh.displayName = 'SceneMesh';
