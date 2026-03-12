import React, { useMemo } from 'react';
import { alpha, Box, getThemeColor, useMantineTheme, type MantineColor } from '@mantine/core';
import { useSceneContext } from '../Scene.context';
import classes from '../Scene.module.css';

export interface SceneAuroraProps {
  /** Colors for the aurora bands — supports Mantine theme colors
   *  @default ['green', 'teal', 'cyan']
   */
  colors?: MantineColor[];

  /** Number of aurora bands
   *  @default 3
   */
  bands?: number;

  /** Vertical position of the aurora
   *  @default 'top'
   */
  position?: 'top' | 'center' | 'bottom';

  /** Enable animation
   *  @default true
   */
  animate?: boolean;

  /** Animation duration in seconds
   *  @default 8
   */
  duration?: number;

  /** Overall opacity (0-1)
   *  @default 0.3
   */
  opacity?: number;

  /** Blur amount in px
   *  @default 60
   */
  blur?: number;

  /** Additional className */
  className?: string;

  /** Additional inline styles */
  style?: React.CSSProperties;
}

function getPositionTop(position: string, index: number, bands: number): string {
  const bandSpacing = 100 / (bands + 1);
  const offset = bandSpacing * (index + 1);

  switch (position) {
    case 'top':
      return `${offset * 0.4}%`;
    case 'center':
      return `${30 + offset * 0.4}%`;
    case 'bottom':
      return `${60 + offset * 0.3}%`;
    default:
      return `${offset * 0.4}%`;
  }
}

export function SceneAurora({
  colors = ['green', 'teal', 'cyan'],
  bands = 3,
  position = 'top',
  animate = true,
  duration = 8,
  opacity = 0.3,
  blur = 60,
  className,
  style,
}: SceneAuroraProps) {
  const { getStyles } = useSceneContext();
  const theme = useMantineTheme();

  const bandElements = useMemo(() => {
    return Array.from({ length: bands }, (_, i) => {
      const colorIndex = i % colors.length;
      const nextColorIndex = (i + 1) % colors.length;
      const resolvedColor = alpha(getThemeColor(colors[colorIndex], theme), 0.6);
      const resolvedNextColor = alpha(getThemeColor(colors[nextColorIndex], theme), 0.3);
      const top = getPositionTop(position, i, bands);
      const bandDelay = (i * duration) / bands;

      return {
        key: i,
        background: `linear-gradient(90deg, transparent 0%, ${resolvedColor} 30%, ${resolvedNextColor} 70%, transparent 100%)`,
        top,
        delay: bandDelay,
      };
    });
  }, [bands, colors, position, duration, theme]);

  return (
    <Box
      {...getStyles('aurora', {
        className,
        style: {
          '--scene-aurora-opacity': String(opacity),
          '--scene-aurora-blur': `${blur}px`,
          '--scene-aurora-duration': `${duration}s`,
          ...style,
        } as React.CSSProperties,
      })}
    >
      {bandElements.map((band) => (
        <Box
          key={band.key}
          className={
            [classes.auroraBand, animate && classes.auroraBandAnimated].filter(Boolean).join(' ') ||
            undefined
          }
          style={
            {
              top: band.top,
              background: band.background,
              '--scene-aurora-band-height': `${Math.max(15, 30 - band.key * 3)}%`,
              animationDelay: `${band.delay}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </Box>
  );
}

SceneAurora.displayName = 'SceneAurora';
