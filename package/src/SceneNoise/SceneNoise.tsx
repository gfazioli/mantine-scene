import React, { useMemo } from 'react';
import { alpha, Box, getThemeColor, useMantineTheme, type MantineColor } from '@mantine/core';
import { useSceneContext } from '../Scene.context';

export interface SceneNoiseProps {
  /** Opacity of the noise overlay (0-1)
   *  @default 0.03
   */
  opacity?: number;

  /** Grain size — base frequency for the noise (smaller = finer)
   *  @default 0.65
   */
  grain?: number;

  /** Seed for feTurbulence
   *  @default 0
   */
  seed?: number;

  /** Type of SVG noise
   *  @default 'fractalNoise'
   */
  type?: 'fractalNoise' | 'turbulence';

  /** Number of octaves for the noise
   *  @default 4
   */
  octaves?: number;

  /** Tint color overlay — supports Mantine theme colors
   *  @default undefined
   */
  tint?: MantineColor;

  /** Opacity of the tint overlay (0-1)
   *  @default 0.5
   */
  tintOpacity?: number;

  /** Additional className */
  className?: string;

  /** Additional inline styles */
  style?: React.CSSProperties;
}

export function SceneNoise({
  opacity = 0.03,
  grain = 0.65,
  seed = 0,
  type = 'fractalNoise',
  octaves = 4,
  tint,
  tintOpacity = 0.5,
  className,
  style,
}: SceneNoiseProps) {
  const { getStyles } = useSceneContext();
  const theme = useMantineTheme();

  const backgroundImage = useMemo(() => {
    const noiseSvg = `<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><filter id='n' x='0' y='0'><feTurbulence type='${type}' baseFrequency='${grain}' numOctaves='${octaves}' seed='${seed}' stitchTiles='stitch'/></filter><rect width='300' height='300' filter='url(%23n)' opacity='1'/></svg>`;
    return `url("data:image/svg+xml,${encodeURIComponent(noiseSvg)}")`;
  }, [grain, seed, type, octaves]);

  const tintColor = useMemo(
    () => (tint && tint.length > 0 ? alpha(getThemeColor(tint, theme), tintOpacity) : undefined),
    [tint, tintOpacity, theme]
  );

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
    >
      {tintColor && (
        <Box
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: tintColor,
            mixBlendMode: 'overlay',
          }}
        />
      )}
    </Box>
  );
}

SceneNoise.displayName = 'SceneNoise';
