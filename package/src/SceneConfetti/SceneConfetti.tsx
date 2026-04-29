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

export type SceneConfettiShape = 'rectangle' | 'circle' | 'triangle';

export type SceneConfettiOrigin = 'top' | 'bottom';

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
   *  @default ['rectangle', 'circle', 'triangle']
   */
  shapes?: SceneConfettiShape[];

  /** Where the pieces originate from. `'top'` (default) lets them drift down with gravity. `'bottom'` shoots them upward in a parabolic arc and lets gravity bring them back — the classic "confetti cannon" look.
   *  @default 'top'
   */
  origin?: SceneConfettiOrigin;

  /** Maximum rise distance in px when `origin` is `'bottom'`. Each piece gets a randomized rise between ~60% and 100% of this value.
   *  @default 320
   */
  rise?: number;

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
const DEFAULT_SHAPES: SceneConfettiShape[] = ['rectangle', 'circle', 'triangle'];

const TRIANGLE_CLIP_PATH = 'polygon(50% 0%, 0% 100%, 100% 100%)';

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
  origin = 'top',
  rise = 320,
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
      // Per-piece rise variation (only used when origin='bottom')
      const pieceRise = rise * (0.6 + rng() * 0.4);
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
        rise: pieceRise,
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
    rise,
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

  const pieceClass = (() => {
    if (origin === 'bottom') {
      return burst ? classes.confettiPieceBurstUp : classes.confettiPieceUp;
    }
    return burst ? classes.confettiPieceBurst : classes.confettiPiece;
  })();

  const getShapeStyle = (shape: SceneConfettiShape, size: number): React.CSSProperties => {
    if (shape === 'circle') {
      return { height: `${size}px`, borderRadius: '50%' };
    }
    if (shape === 'triangle') {
      return { height: `${size}px`, clipPath: TRIANGLE_CLIP_PATH };
    }
    return { height: `${size * 0.4}px`, borderRadius: '1px' };
  };

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
          className={pieceClass}
          style={
            {
              left: `${piece.x}%`,
              width: `${piece.size}px`,
              backgroundColor: piece.color,
              opacity,
              '--scene-confetti-speed': `${piece.duration}s`,
              '--scene-confetti-drift': `${piece.drift}px`,
              '--scene-confetti-rotation': `${piece.rotation}deg`,
              '--scene-confetti-rise': `${piece.rise}px`,
              animationDelay: `${piece.delay}s`,
              ...getShapeStyle(piece.shape, piece.size),
            } as React.CSSProperties
          }
        />
      ))}
    </Box>
  );
}

SceneConfetti.displayName = 'SceneConfetti';
