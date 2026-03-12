import React from 'react';
import { Box } from '@mantine/core';
import { useSceneContext } from './Scene.context';
import classes from './Scene.module.css';

export interface GlowProps {
  /** CSS color for the glow blob
   *  @default 'rgba(120, 0, 255, 0.3)'
   */
  color?: string;

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

export function Glow({
  color = 'rgba(120, 0, 255, 0.3)',
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
}: GlowProps) {
  const { getStyles } = useSceneContext();

  return (
    <Box
      {...getStyles('glow', {
        className: `${animate ? classes.glowAnimated : ''}${className ? ` ${className}` : ''}`,
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
          background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
          ...style,
        },
      })}
    />
  );
}

Glow.displayName = 'Scene.Glow';
