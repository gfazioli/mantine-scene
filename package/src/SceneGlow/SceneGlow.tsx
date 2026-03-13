import React from 'react';
import { Box, getThemeColor, useMantineTheme, type MantineColor } from '@mantine/core';
import { useSceneContext } from '../Scene.context';
import { useResponsiveValue, type ResponsiveValue } from '../use-responsive-value';
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

  /** Size of the blob in px — accepts a responsive object like `{ base: 200, md: 400 }`
   *  @default 400
   */
  size?: ResponsiveValue<number>;

  /** Blur radius in px — accepts a responsive object like `{ base: 60, md: 120 }`
   *  @default 120
   */
  blur?: ResponsiveValue<number>;

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
  size: sizeProp = 400,
  blur: blurProp = 120,
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
  const size = useResponsiveValue(sizeProp);
  const blur = useResponsiveValue(blurProp);
  const { getStyles, mouse } = useSceneContext();
  const theme = useMantineTheme();
  const resolvedColor =
    shade !== undefined ? getThemeColor(`${color}.${shade}`, theme) : getThemeColor(color, theme);

  // When interactive, mouse position overrides top/left
  const effectiveTop = mouse ? `${mouse.y}%` : top;
  const effectiveLeft = mouse ? `${mouse.x}%` : left;

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
          top: effectiveTop,
          left: effectiveLeft,
          marginTop: 'calc(var(--scene-glow-size) / -2)',
          marginLeft: 'calc(var(--scene-glow-size) / -2)',
          background: `radial-gradient(circle, ${resolvedColor} 0%, transparent 70%)`,
          ...style,
        } as React.CSSProperties,
      })}
      data-animation-type={animate ? animationType : undefined}
    />
  );
}

SceneGlow.displayName = 'SceneGlow';
