import React, { useMemo } from 'react';
import { Box } from '@mantine/core';
import { useSceneContext } from './Scene.context';

export interface NoiseProps {
  /** Opacity of the noise overlay (0-1)
   *  @default 0.03
   */
  opacity?: number;

  /** Grain size — base frequency for the noise (smaller = finer)
   *  @default 0.65
   */
  grain?: number;

  /** Additional className */
  className?: string;

  /** Additional inline styles */
  style?: React.CSSProperties;
}

export function Noise({ opacity = 0.03, grain = 0.65, className, style }: NoiseProps) {
  const { getStyles } = useSceneContext();

  const backgroundImage = useMemo(() => {
    const noiseSvg = `<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><filter id='n' x='0' y='0'><feTurbulence type='fractalNoise' baseFrequency='${grain}' numOctaves='4' stitchTiles='stitch'/></filter><rect width='300' height='300' filter='url(%23n)' opacity='1'/></svg>`;
    return `url("data:image/svg+xml,${encodeURIComponent(noiseSvg)}")`;
  }, [grain]);

  return (
    <Box
      {...getStyles('noise', {
        className,
        style: {
          backgroundImage,
          backgroundRepeat: 'repeat',
          opacity,
          ...style,
        },
      })}
    />
  );
}

Noise.displayName = 'Scene.Noise';
