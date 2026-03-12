import React from 'react';
import { Box, getThemeColor, useMantineTheme, type MantineColor } from '@mantine/core';
import { useSceneContext } from '../Scene.context';
import classes from '../Scene.module.css';

export interface SceneGlowProps {
  /** Color of the glow blob — supports Mantine theme colors
   *  @default 'violet'
   */
  color?: MantineColor;

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

  /** Animation duration in seconds
   *  @default 8
   */
  duration?: number;

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
  size = 400,
  blur = 120,
  opacity = 0.5,
  top = '10%',
  left = '50%',
  animate = true,
  duration = 8,
  driftX = '30px',
  driftY = '20px',
  className,
  style,
}: SceneGlowProps) {
  const { getStyles } = useSceneContext();
  const theme = useMantineTheme();
  const resolvedColor = getThemeColor(color, theme);

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
          '--scene-glow-drift-x': driftX,
          '--scene-glow-drift-y': driftY,
          top,
          left,
          transform: 'translate(-50%, -50%)',
          background: `radial-gradient(circle, ${resolvedColor} 0%, transparent 70%)`,
          ...style,
        },
      })}
    />
  );
}

SceneGlow.displayName = 'SceneGlow';
