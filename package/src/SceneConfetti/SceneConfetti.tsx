import React, { useEffect, useMemo, useRef } from 'react';
import {
  Box,
  getThemeColor,
  useMantineTheme,
  type MantineColor,
  type StyleProp,
} from '@mantine/core';
import { mulberry32 } from '../prng';
import { useSceneContext } from '../Scene.context';
import { useResponsiveValue } from '../use-responsive-value';
import classes from '../Scene.module.css';

export type SceneConfettiShape = 'rectangle' | 'circle';

export interface SceneConfettiProps {
  /** Number of confetti pieces (recommended max ~200) — accepts a responsive object like `{ base: 60, md: 120 }`
   *  @default 80
   */
  count?: StyleProp<number>;

  /** Color palette — each piece is randomly assigned one of these colors. Accepts Mantine theme colors.
   *  @default ['red', 'orange', 'yellow', 'green', 'blue', 'violet', 'pink']
   */
  colors?: MantineColor[];

  /** Shape variants used for the pieces (each piece picks one at random)
   *  @default ['rectangle', 'circle']
   */
  shapes?: SceneConfettiShape[];

  /** Minimum piece size in px
   *  @default 6
   */
  minSize?: number;

  /** Maximum piece size in px
   *  @default 12
   */
  maxSize?: number;

  /** Animation duration in seconds (per piece — actual durations are jittered around this)
   *  @default 4
   */
  duration?: number;

  /** Speed factor (multiplier on duration — higher = faster)
   *  @default 1
   */
  speed?: number;

  /** Horizontal flutter range in px (back-and-forth sway during fall)
   *  @default 60
   */
  flutter?: number;

  /** When true, runs once and stops (single burst). When false, loops continuously.
   *  @default false
   */
  burst?: boolean;

  /** Called once the burst has finished settling (ignored when `burst` is false) */
  onComplete?: () => void;

  /** Overall opacity (0-1)
   *  @default 1
   */
  opacity?: number;

  /** PRNG seed for deterministic confetti distribution
   *  @default 42
   */
  seed?: number;

  /** Additional className */
  className?: string;

  /** Additional inline styles */
  style?: React.CSSProperties;
}

const DEFAULT_COLORS: MantineColor[] = [
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'violet',
  'pink',
];
const DEFAULT_SHAPES: SceneConfettiShape[] = ['rectangle', 'circle'];

export function SceneConfetti({
  count: countProp = 80,
  colors = DEFAULT_COLORS,
  shapes = DEFAULT_SHAPES,
  minSize = 6,
  maxSize = 12,
  duration = 4,
  speed = 1,
  flutter = 60,
  burst = false,
  onComplete,
  opacity = 1,
  seed = 42,
  className,
  style,
}: SceneConfettiProps) {
  const count = useResponsiveValue(countProp);
  const { getStyles } = useSceneContext();
  const theme = useMantineTheme();

  const resolvedColors = useMemo(
    () => (colors.length > 0 ? colors : DEFAULT_COLORS).map((c) => getThemeColor(c, theme)),
    [colors, theme]
  );
  const resolvedShapes = shapes.length > 0 ? shapes : DEFAULT_SHAPES;

  const pieces = useMemo(() => {
    const rng = mulberry32(seed);
    const cappedCount = Math.min(count, 200);
    return Array.from({ length: cappedCount }, (_, i) => {
      const size = minSize + rng() * (maxSize - minSize);
      const x = rng() * 100;
      const baseDuration = duration * (0.7 + rng() * 0.6);
      const pieceDuration = baseDuration / speed;
      const delay = burst ? rng() * 0.3 : -(rng() * pieceDuration);
      const colorIndex = Math.floor(rng() * resolvedColors.length) % resolvedColors.length;
      const shapeIndex = Math.floor(rng() * resolvedShapes.length) % resolvedShapes.length;
      const drift = (rng() - 0.5) * flutter * 2;
      const rotation = (rng() - 0.5) * 720;
      return {
        key: i,
        size,
        x,
        duration: pieceDuration,
        delay,
        color: resolvedColors[colorIndex],
        shape: resolvedShapes[shapeIndex],
        drift,
        rotation,
      };
    });
  }, [
    count,
    minSize,
    maxSize,
    duration,
    speed,
    flutter,
    seed,
    burst,
    resolvedColors,
    resolvedShapes,
  ]);

  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Burst completion — fire onComplete after the longest (duration + delay) elapses
  useEffect(() => {
    if (!burst) {
      return;
    }
    if (pieces.length === 0) {
      onCompleteRef.current?.();
      return;
    }
    const longest = pieces.reduce((max, p) => Math.max(max, p.delay + p.duration), 0);
    const timer = window.setTimeout(() => onCompleteRef.current?.(), longest * 1000);
    return () => window.clearTimeout(timer);
  }, [burst, pieces]);

  return (
    <Box
      {...getStyles('confetti', {
        className,
        style: { ...style } as React.CSSProperties,
      })}
    >
      {pieces.map((piece) => (
        <Box
          key={piece.key}
          className={burst ? classes.confettiPieceBurst : classes.confettiPiece}
          style={
            {
              left: `${piece.x}%`,
              width: `${piece.size}px`,
              height: `${piece.shape === 'circle' ? piece.size : piece.size * 0.4}px`,
              backgroundColor: piece.color,
              borderRadius: piece.shape === 'circle' ? '50%' : '1px',
              opacity,
              '--scene-confetti-speed': `${piece.duration}s`,
              '--scene-confetti-drift': `${piece.drift}px`,
              '--scene-confetti-rotation': `${piece.rotation}deg`,
              animationDelay: `${piece.delay}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </Box>
  );
}

SceneConfetti.displayName = 'SceneConfetti';
