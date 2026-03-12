import React from 'react';
import { Box } from '@mantine/core';
import { useSceneContext } from './Scene.context';

export interface GradientProps {
  /** Gradient type
   *  @default 'radial'
   */
  type?: 'radial' | 'linear' | 'conic';

  /** CSS color stops, e.g. ['rgba(120,0,255,0.15) 0%', 'transparent 70%'] */
  colors?: string[];

  /** Position for radial/conic gradient (e.g. 'center top', '50% 30%')
   *  @default 'center top'
   */
  position?: string;

  /** Angle for linear gradient in degrees
   *  @default 180
   */
  angle?: number;

  /** Overall opacity (0-1)
   *  @default 1
   */
  opacity?: number;

  /** Additional className */
  className?: string;

  /** Additional inline styles */
  style?: React.CSSProperties;
}

export function Gradient({
  type = 'radial',
  colors = ['rgba(120, 0, 255, 0.15) 0%', 'transparent 70%'],
  position = 'center top',
  angle = 180,
  opacity = 1,
  className,
  style,
}: GradientProps) {
  const { getStyles } = useSceneContext();

  let background: string;

  switch (type) {
    case 'linear':
      background = `linear-gradient(${angle}deg, ${colors.join(', ')})`;
      break;
    case 'conic':
      background = `conic-gradient(from 0deg at ${position}, ${colors.join(', ')})`;
      break;
    case 'radial':
    default:
      background = `radial-gradient(ellipse at ${position}, ${colors.join(', ')})`;
      break;
  }

  return (
    <Box {...getStyles('gradient', { className, style: { background, opacity, ...style } })} />
  );
}

Gradient.displayName = 'Scene.Gradient';
