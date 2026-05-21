import { Box, getThemeColor, useMantineTheme, type MantineColor } from '@mantine/core';
import React, { useMemo } from 'react';
import { useSceneContext } from '../Scene.context';
import classes from '../Scene.module.css';

export type SceneRadarShape = 'arc' | 'circle';

export type SceneRadarArcDirection = 'up' | 'down' | 'left' | 'right';

export interface SceneRadarProps {
  /** Origin of the waves expressed as 'x y' (any CSS length).
   *  @default '50% 100%'
   */
  origin?: string;

  /** Wave shape — `'arc'` clips one hemisphere (Wi-Fi icon look), `'circle'` keeps the full ring.
   *  @default 'arc'
   */
  shape?: SceneRadarShape;

  /** Which side the open hemisphere faces — only meaningful when `shape='arc'`.
   *  @default 'up'
   */
  arcDirection?: SceneRadarArcDirection;

  /** Number of concurrent waves stacked / emitted in rotation.
   *  @default 4
   */
  count?: number;

  /** Seconds between successive emissions. Each wave's `animation-delay` is `index * interval`.
   *  @default 1.5
   */
  interval?: number;

  /** Seconds for a single wave to travel from origin to `maxRadius`.
   *  @default 6
   */
  duration?: number;

  /** Maximum radius the ring grows to — accepts any CSS length (`'1200px'`, `'60vmax'`, …).
   *  @default '1400px'
   */
  maxRadius?: string;

  /** Ring color — Mantine theme color name or any CSS color.
   *  @default 'blue'
   */
  color?: MantineColor;

  /** Ring outline thickness in pixels.
   *  @default 2
   */
  strokeWidth?: number;

  /** Optional Gaussian blur applied to every ring in px — softens the rings for a dreamy look.
   *  @default 0
   */
  blur?: number;

  /** Brightness at the moment a wave finishes emerging (10% into its lifecycle). Decays linearly to 0 across the rest of the journey.
   *  @default 0.45
   */
  peakOpacity?: number;

  /** Additional className */
  className?: string;

  /** Additional inline styles */
  style?: React.CSSProperties;
}

function getShapeClassName(shape: SceneRadarShape, arcDirection: SceneRadarArcDirection): string | undefined {
  if (shape === 'circle') return undefined;
  switch (arcDirection) {
    case 'down':
      return classes.radarShapeArcDown;
    case 'left':
      return classes.radarShapeArcLeft;
    case 'right':
      return classes.radarShapeArcRight;
    case 'up':
    default:
      return classes.radarShapeArcUp;
  }
}

export function SceneRadar({
  origin = '50% 100%',
  shape = 'arc',
  arcDirection = 'up',
  count = 4,
  interval = 1.5,
  duration = 6,
  maxRadius = '1400px',
  color = 'blue',
  strokeWidth = 2,
  blur = 0,
  peakOpacity = 0.45,
  className,
  style,
}: SceneRadarProps) {
  const { getStyles } = useSceneContext();
  const theme = useMantineTheme();

  const [originX, originY] = useMemo(() => {
    const parts = origin.split(/\s+/);
    return [parts[0] ?? '50%', parts[1] ?? '50%'];
  }, [origin]);

  const resolvedColor = useMemo(() => getThemeColor(color, theme), [color, theme]);

  const shapeClassName = getShapeClassName(shape, arcDirection);

  const waveClassName = [classes.radarWave, classes.radarWaveAnimated, shapeClassName]
    .filter(Boolean)
    .join(' ');

  return (
    <Box
      {...getStyles('radar', {
        className,
        style: {
          '--scene-radar-origin-x': originX,
          '--scene-radar-origin-y': originY,
          '--scene-radar-max-radius': maxRadius,
          '--scene-radar-color': resolvedColor,
          '--scene-radar-stroke-width': `${strokeWidth}px`,
          '--scene-radar-duration': `${duration}s`,
          '--scene-radar-peak-opacity': String(peakOpacity),
          '--scene-radar-blur': blur > 0 ? `${blur}px` : '0',
          ...style,
        } as React.CSSProperties,
      })}
    >
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          className={waveClassName}
          style={{ animationDelay: `${i * interval}s` }}
          aria-hidden="true"
        />
      ))}
    </Box>
  );
}

SceneRadar.displayName = 'SceneRadar';
