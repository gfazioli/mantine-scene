import React, { useMemo } from 'react';
import { Box, getThemeColor, useMantineTheme, type MantineColor } from '@mantine/core';
import { mulberry32 } from '../prng';
import { useSceneContext } from '../Scene.context';
import classes from '../Scene.module.css';

export type SceneWavesPosition = 'top' | 'bottom';

export type SceneWavesDirection = 'left' | 'right';

export interface SceneWavesProps {
  /** Number of stacked wave layers — more layers create stronger parallax depth. Capped at 8.
   *  @default 3
   */
  count?: number;

  /** Wave color(s). Pass a single Mantine color to derive shades automatically across layers, or an array of colors mapped per layer.
   *  @default 'blue'
   */
  colors?: MantineColor | MantineColor[];

  /** Maximum wave amplitude in px — each layer gets a randomized fraction of this value.
   *  @default 40
   */
  amplitude?: number;

  /** Approximate wavelength in px — lower values produce more crests per layer.
   *  @default 480
   */
  wavelength?: number;

  /** Total height of the wave area in px (defines the SVG viewBox height).
   *  @default 240
   */
  height?: number;

  /** Speed multiplier for the horizontal pan animation (higher = faster). Combined with `parallax`, this defines the base speed shared by all layers.
   *  @default 1
   */
  speed?: number;

  /** Pan direction. `'left'` (default) scrolls layers leftward, `'right'` scrolls them rightward.
   *  @default 'left'
   */
  direction?: SceneWavesDirection;

  /** Parallax intensity — how much foreground layers differ in speed from background ones. `0` flattens parallax (all layers move at the same speed), `1` is the default differential, larger values exaggerate it. Negative values invert the parallax (background layers move faster than foreground), producing a dreamlike depth effect. Recommended range: `[-1, 2]`.
   *  @default 1
   */
  parallax?: number;

  /** Anchor side. `'bottom'` (default) renders waves rising from the bottom edge; `'top'` flips them to fall from the top edge.
   *  @default 'bottom'
   */
  position?: SceneWavesPosition;

  /** Optional Gaussian blur in px applied to each layer — useful for dreamy/soft waves.
   *  @default 0
   */
  blur?: number;

  /** Overall opacity (0-1) applied to the entire wave stack.
   *  @default 0.7
   */
  opacity?: number;

  /** PRNG seed for deterministic layer parameters (amplitude, frequency, phase).
   *  @default 42
   */
  seed?: number;

  /** Additional className */
  className?: string;

  /** Additional inline styles */
  style?: React.CSSProperties;
}

const VIEW_WIDTH = 1440;

/**
 * Builds a closed SVG path that tiles seamlessly under `translateX(-50%)`.
 * The wave is sampled over `[0, 2 * width]`, with `x % width` keeping the pattern
 * periodic. Frequency is forced to an integer so the seam at `x = width` matches
 * the start at `x = 0`.
 */
function buildWavePath(
  width: number,
  height: number,
  baseline: number,
  amplitude: number,
  frequency: number,
  phase: number,
  position: SceneWavesPosition,
  resolution: number
): string {
  const totalWidth = width * 2;
  const segments = resolution * 2;
  const points: string[] = [];
  for (let i = 0; i <= segments; i++) {
    const x = (totalWidth * i) / segments;
    const xMod = x % width;
    const y = baseline + amplitude * Math.sin((2 * Math.PI * frequency * xMod) / width + phase);
    points.push(`${x.toFixed(2)} ${y.toFixed(2)}`);
  }
  const closeY = position === 'bottom' ? height : 0;
  const head = `M ${points[0]}`;
  const lines = points
    .slice(1)
    .map((p) => `L ${p}`)
    .join(' ');
  return `${head} ${lines} L ${totalWidth} ${closeY} L 0 ${closeY} Z`;
}

function resolveLayerColor(
  colors: MantineColor | MantineColor[],
  index: number,
  layerCount: number,
  theme: ReturnType<typeof useMantineTheme>
): string {
  if (Array.isArray(colors)) {
    return getThemeColor(colors[index % colors.length], theme);
  }
  // Single color: derive shades from light (back) to vivid (front).
  // Map index 0..layerCount-1 → shades 9..4 (back to front).
  const shadeRange = [9, 8, 7, 6, 5, 4, 3, 2];
  const shadeIndex = Math.min(shadeRange.length - 1, layerCount - 1 - index);
  const shade = shadeRange[shadeIndex] ?? 5;
  return getThemeColor(`${colors}.${shade}`, theme);
}

export function SceneWaves({
  count = 3,
  colors = 'blue',
  amplitude = 40,
  wavelength = 480,
  height = 240,
  speed = 1,
  direction = 'left',
  parallax = 1,
  position = 'bottom',
  blur = 0,
  opacity = 0.7,
  seed = 42,
  className,
  style,
}: SceneWavesProps) {
  const { getStyles } = useSceneContext();
  const theme = useMantineTheme();

  const layers = useMemo(() => {
    const rng = mulberry32(seed);
    const cappedCount = Math.max(1, Math.min(count, 8));
    const baseFrequency = Math.max(1, Math.round(VIEW_WIDTH / Math.max(40, wavelength)));
    return Array.from({ length: cappedCount }, (_, i) => {
      // Per-layer randomized parameters
      const layerAmp = amplitude * (0.5 + rng() * 0.6);
      // Frequency must be an integer so the path tiles seamlessly under translateX(-50%)
      const freqJitter = Math.round((rng() - 0.5) * 2);
      const layerFreq = Math.max(1, baseFrequency + freqJitter);
      const phase = rng() * Math.PI * 2;
      // Foreground layers (higher index) sit lower (or higher when position='top'),
      // creating a stacked parallax look.
      const layerOffset = (i / cappedCount) * (height * 0.45);
      const baseline = position === 'bottom' ? height - layerOffset : layerOffset;
      const fill = resolveLayerColor(colors, i, cappedCount, theme);
      // Speed differential controlled by `parallax`. Layer factor goes from -1 (back) to +1 (front).
      // The base speed (centre = 1) is shared by all layers; `parallax` widens (or inverts) the spread.
      const layerFactor = cappedCount === 1 ? 0 : (i / (cappedCount - 1)) * 2 - 1;
      const speedMultiplier = Math.max(0.05, 1 + 0.4 * parallax * layerFactor);
      const layerSpeed = speedMultiplier * Math.max(0.05, speed);
      const duration = 30 / layerSpeed;
      // Slight per-layer opacity variation
      const layerOpacity = 0.6 + (i / cappedCount) * 0.4;
      const path = buildWavePath(
        VIEW_WIDTH,
        height,
        baseline,
        layerAmp,
        layerFreq,
        phase,
        position,
        80
      );
      return { key: i, path, fill, duration, layerOpacity };
    });
  }, [count, colors, amplitude, wavelength, height, speed, parallax, position, seed, theme]);

  return (
    <Box
      {...getStyles('waves', {
        className,
        style: {
          height: `${height}px`,
          [position]: 0,
          opacity,
          ...style,
        } as React.CSSProperties,
      })}
    >
      {layers.map((layer) => (
        <svg
          key={layer.key}
          className={classes.wavesLayer}
          xmlns="http://www.w3.org/2000/svg"
          viewBox={`0 0 ${VIEW_WIDTH * 2} ${height}`}
          preserveAspectRatio="none"
          aria-hidden="true"
          style={
            {
              '--scene-waves-duration': `${layer.duration}s`,
              opacity: layer.layerOpacity,
              filter: blur > 0 ? `blur(${blur}px)` : undefined,
              animationDirection: direction === 'right' ? 'reverse' : 'normal',
            } as React.CSSProperties
          }
        >
          <path d={layer.path} fill={layer.fill} />
        </svg>
      ))}
    </Box>
  );
}

SceneWaves.displayName = 'SceneWaves';
