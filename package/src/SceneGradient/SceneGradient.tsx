import React from 'react';
import { alpha, Box, getThemeColor, useMantineTheme, type MantineColor } from '@mantine/core';
import { useSceneContext } from '../Scene.context';
import classes from '../Scene.module.css';

export interface SceneGradientProps {
  /** Gradient type
   *  @default 'radial'
   */
  type?: 'radial' | 'linear' | 'conic';

  /** CSS color stops, e.g. ['rgba(120,0,255,0.15) 0%', 'transparent 70%'] */
  colors?: string[];

  /** Start color — Mantine theme color (alternative to colors)
   *  @default undefined
   */
  from?: MantineColor;

  /** End color — Mantine theme color (alternative to colors)
   *  @default 'transparent'
   */
  to?: MantineColor;

  /** Opacity of the start color (0-1)
   *  @default 0.15
   */
  fromOpacity?: number;

  /** Opacity of the end color (0-1)
   *  @default 0
   */
  toOpacity?: number;

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

  /** Enable animation
   *  @default false
   */
  animate?: boolean;

  /** Animation duration in seconds
   *  @default 20
   */
  duration?: number;

  /** Animation type
   *  @default 'rotate'
   */
  animationType?: 'rotate' | 'pulse';

  /** Minimum opacity for pulse animation (0-1)
   *  @default 0.3
   */
  pulseMinOpacity?: number;

  /** Additional className */
  className?: string;

  /** Additional inline styles */
  style?: React.CSSProperties;
}

export function SceneGradient({
  type = 'radial',
  colors,
  from,
  to = 'transparent',
  fromOpacity = 0.15,
  toOpacity = 0,
  position = 'center top',
  angle = 180,
  opacity = 1,
  animate = false,
  duration = 20,
  animationType = 'rotate',
  pulseMinOpacity = 0.3,
  className,
  style,
}: SceneGradientProps) {
  const { getStyles } = useSceneContext();
  const theme = useMantineTheme();

  let resolvedColors: string[];

  if (from) {
    const resolvedFrom = getThemeColor(from, theme);
    const fromColor = alpha(resolvedFrom, fromOpacity);
    const toColor =
      to === 'transparent'
        ? alpha(resolvedFrom, toOpacity)
        : alpha(getThemeColor(to, theme), toOpacity);
    resolvedColors = [`${fromColor} 0%`, `${toColor} 70%`];
  } else {
    resolvedColors = colors || ['rgba(120, 0, 255, 0.15) 0%', 'transparent 70%'];
  }

  let background: string;

  switch (type) {
    case 'linear':
      background = `linear-gradient(${angle}deg, ${resolvedColors.join(', ')})`;
      break;
    case 'conic':
      background = `conic-gradient(from 0deg at ${position}, ${resolvedColors.join(', ')})`;
      break;
    case 'radial':
    default:
      background = `radial-gradient(ellipse at ${position}, ${resolvedColors.join(', ')})`;
      break;
  }

  return (
    <Box
      {...getStyles('gradient', {
        className:
          [animate && classes.gradientAnimated, className].filter(Boolean).join(' ') || undefined,
        style: {
          background,
          opacity,
          '--scene-gradient-duration': `${duration}s`,
          '--scene-gradient-opacity-from': String(pulseMinOpacity),
          '--scene-gradient-opacity-to': String(opacity),
          ...style,
        } as React.CSSProperties,
      })}
      data-animation-type={animate ? animationType : undefined}
    />
  );
}

SceneGradient.displayName = 'SceneGradient';
