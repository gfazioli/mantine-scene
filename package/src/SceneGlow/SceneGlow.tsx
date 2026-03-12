import React from 'react';
import { Box, getThemeColor, useMantineTheme, type MantineColor } from '@mantine/core';
import { useSceneContext } from '../Scene.context';
import classes from '../Scene.module.css';

export interface SceneGlowProps {
  /** Color of the glow blob — supports Mantine theme colors
   *  @default 'violet'
   */
  color?: MantineColor;

  /** Mantine color shade (0-9)
   *  @default undefined
   */
  shade?: number;

  /** Size of the blob in px
   *  @default 400
   */
  size?: number;

  /** Blur radius in px
   *  @default 120
   */
  blur?: number;

  /** Opacity (0-1)
   *  @default 0.5
   */
  opacity?: number;

  /** Top position (CSS value, e.g. '10%', '200px')
   *  @default '10%'
   */
  top?: string;

  /** Left position (CSS value, e.g. '20%', '100px')
   *  @default '50%'
   */
  left?: string;

  /** Enable floating animation
   *  @default true
   */
  animate?: boolean;

  /** Animation type variant
   *  @default 'float'
   */
  animationType?: 'float' | 'pulse' | 'breathe';

  /** Animation duration in seconds
   *  @default 8
   */
  duration?: number;

  /** Animation delay in seconds
   *  @default 0
   */
  delay?: number;

  /** Horizontal drift distance (CSS value)
   *  @default '30px'
   */
  driftX?: string;

  /** Vertical drift distance (CSS value)
   *  @default '20px'
   */
  driftY?: string;

  /** Additional className */
  className?: string;

  /** Additional inline styles */
  style?: React.CSSProperties;
}

export function SceneGlow({
  color = 'violet',
  shade,
  size = 400,
  blur = 120,
  opacity = 0.5,
  top = '10%',
  left = '50%',
  animate = true,
  animationType = 'float',
  duration = 8,
  delay = 0,
  driftX = '30px',
  driftY = '20px',
  className,
  style,
}: SceneGlowProps) {
  const { getStyles } = useSceneContext();
  const theme = useMantineTheme();
  const resolvedColor =
    shade !== undefined ? getThemeColor(`${color}.${shade}`, theme) : getThemeColor(color, theme);

  return (
    <Box
      {...getStyles('glow', {
        className:
          [animate && classes.glowAnimated, className].filter(Boolean).join(' ') || undefined,
        style: {
          '--scene-glow-size': `${size}px`,
          '--scene-glow-blur': `${blur}px`,
          '--scene-glow-opacity': String(opacity),
          '--scene-glow-duration': `${duration}s`,
          '--scene-glow-delay': `${delay}s`,
          '--scene-glow-drift-x': driftX,
          '--scene-glow-drift-y': driftY,
          top,
          left,
          marginTop: `${-size / 2}px`,
          marginLeft: `${-size / 2}px`,
          background: `radial-gradient(circle, ${resolvedColor} 0%, transparent 70%)`,
          ...style,
        } as React.CSSProperties,
      })}
      data-animation-type={animate ? animationType : undefined}
    />
  );
}

SceneGlow.displayName = 'SceneGlow';
