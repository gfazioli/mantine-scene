import React, { useEffect, useRef, useState } from 'react';
import { useMergedRef } from '@mantine/hooks';
import {
  Box,
  BoxProps,
  createVarsResolver,
  Factory,
  factory,
  StylesApiProps,
  useProps,
  useStyles,
} from '@mantine/core';
import { SceneProvider, type SceneMousePosition } from './Scene.context';
import { SceneAurora } from './SceneAurora/SceneAurora';
import { SceneDotGrid } from './SceneDotGrid/SceneDotGrid';
import { SceneGlow } from './SceneGlow/SceneGlow';
import { SceneGradient } from './SceneGradient/SceneGradient';
import { SceneMesh } from './SceneMesh/SceneMesh';
import { SceneNoise } from './SceneNoise/SceneNoise';
import { SceneShootingStar } from './SceneShootingStar/SceneShootingStar';
import { SceneSnow } from './SceneSnow/SceneSnow';
import { SceneStarField } from './SceneStarField/SceneStarField';
import { SceneStarWarp } from './SceneStarWarp/SceneStarWarp';
import classes from './Scene.module.css';

export type SceneStylesNames =
  | 'root'
  | 'gradient'
  | 'dotGrid'
  | 'glow'
  | 'mesh'
  | 'noise'
  | 'starField'
  | 'shootingStar'
  | 'snow'
  | 'aurora'
  | 'starWarp';

export type SceneCssVariables = {
  root: '--scene-z-index';
};

export interface SceneBaseProps {
  /** Whether the scene covers the full viewport (fixed position) or acts as a contained box
   *  @default false
   */
  fullscreen?: boolean;

  /** z-index when fullscreen is true
   *  @default 0
   */
  zIndex?: number;

  /** Controls animation behavior for prefers-reduced-motion: 'auto' respects system preference, 'always' disables all animations, 'never' keeps animations regardless
   *  @default 'auto'
   */
  reducedMotion?: 'auto' | 'always' | 'never';

  /** Enable mouse tracking — sub-components can react to the cursor position
   *  @default false
   */
  interactive?: boolean;

  /** Easing factor for interactive mouse tracking (0 to 1). Lower values result in slower, smoother following. Set to 1 for instant tracking (no easing).
   *  @default 0.12
   */
  interactiveEasing?: number;

  /** Scene content (compound sub-components: Scene.Gradient, Scene.Glow, etc.) */
  children?: React.ReactNode;
}

export interface SceneProps extends BoxProps, SceneBaseProps, StylesApiProps<SceneFactory> {}

export type SceneFactory = Factory<{
  props: SceneProps;
  ref: HTMLDivElement;
  stylesNames: SceneStylesNames;
  vars: SceneCssVariables;
  staticComponents: {
    Gradient: typeof SceneGradient;
    DotGrid: typeof SceneDotGrid;
    Glow: typeof SceneGlow;
    Mesh: typeof SceneMesh;
    Noise: typeof SceneNoise;
    StarField: typeof SceneStarField;
    ShootingStar: typeof SceneShootingStar;
    Snow: typeof SceneSnow;
    Aurora: typeof SceneAurora;
    StarWarp: typeof SceneStarWarp;
  };
}>;

const defaultProps: Partial<SceneProps> = {
  fullscreen: false,
  zIndex: 0,
  reducedMotion: 'auto',
  interactive: false,
  interactiveEasing: 0.12,
};

const varsResolver = createVarsResolver<SceneFactory>((_, { zIndex }) => ({
  root: {
    '--scene-z-index': zIndex !== undefined ? String(zIndex) : '0',
  },
}));

export const Scene = factory<SceneFactory>((_props) => {
  const { ref, ...restProps } = _props as typeof _props & { ref?: React.Ref<HTMLDivElement> };
  const props = useProps('Scene', defaultProps, restProps);
  const {
    fullscreen,
    zIndex,
    reducedMotion,
    interactive,
    interactiveEasing,
    children,

    classNames,
    style,
    styles,
    unstyled,
    vars,
    className,
    mod,
    ...others
  } = props;

  const getStyles = useStyles<SceneFactory>({
    name: 'Scene',
    props,
    classes,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver,
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState<SceneMousePosition | null>(null);
  const targetRef = useRef<SceneMousePosition>({ x: 50, y: 50 });
  const smoothRef = useRef<SceneMousePosition>({ x: 50, y: 50 });
  const hasReceivedInput = useRef(false);

  // Track raw cursor position on the full document
  useEffect(() => {
    if (!interactive) {
      return;
    }

    const onPointerMove = (e: PointerEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) {
        return;
      }

      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      // Clamp to 0-100 so the position stays meaningful even when mouse is outside
      targetRef.current = {
        x: Math.max(0, Math.min(100, x)),
        y: Math.max(0, Math.min(100, y)),
      };
      hasReceivedInput.current = true;
    };

    document.addEventListener('pointermove', onPointerMove, { passive: true });
    return () => document.removeEventListener('pointermove', onPointerMove);
  }, [interactive]);

  // LERP smoothing via requestAnimationFrame
  useEffect(() => {
    if (!interactive) {
      setMouse(null);
      hasReceivedInput.current = false;
      return;
    }

    const easing = interactiveEasing ?? 0.12;
    let frameId = 0;
    let active = true;

    const animate = () => {
      if (!active) {
        return;
      }

      if (!hasReceivedInput.current) {
        frameId = requestAnimationFrame(animate);
        return;
      }

      const prev = smoothRef.current;
      const target = targetRef.current;

      if (easing >= 1) {
        // Instant tracking — no easing
        smoothRef.current = target;
        setMouse({ ...target });
      } else {
        const dx = target.x - prev.x;
        const dy = target.y - prev.y;
        const nextX = Math.abs(dx) < 0.01 ? target.x : prev.x + dx * easing;
        const nextY = Math.abs(dy) < 0.01 ? target.y : prev.y + dy * easing;

        if (nextX !== prev.x || nextY !== prev.y) {
          smoothRef.current = { x: nextX, y: nextY };
          setMouse({ x: nextX, y: nextY });
        }
      }

      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    return () => {
      active = false;
      cancelAnimationFrame(frameId);
    };
  }, [interactive, interactiveEasing]);

  const mergeRefs = useMergedRef(ref as React.Ref<HTMLDivElement>, containerRef);

  return (
    <SceneProvider value={{ getStyles, mouse, fullscreen: !!fullscreen }}>
      <Box
        ref={mergeRefs}
        aria-hidden="true"
        {...getStyles('root')}
        {...others}
        mod={[{ fullscreen, 'reduced-motion': reducedMotion }, mod]}
      >
        {children}
      </Box>
    </SceneProvider>
  );
});

Scene.classes = classes;
Scene.displayName = 'Scene';
Scene.Gradient = SceneGradient;
Scene.DotGrid = SceneDotGrid;
Scene.Glow = SceneGlow;
Scene.Mesh = SceneMesh;
Scene.Noise = SceneNoise;
Scene.StarField = SceneStarField;
Scene.ShootingStar = SceneShootingStar;
Scene.Snow = SceneSnow;
Scene.Aurora = SceneAurora;
Scene.StarWarp = SceneStarWarp;

export type { SceneGradientProps } from './SceneGradient/SceneGradient';
export type { SceneDotGridProps } from './SceneDotGrid/SceneDotGrid';
export type { SceneGlowProps } from './SceneGlow/SceneGlow';
export type { SceneMeshProps, SceneMeshStop } from './SceneMesh/SceneMesh';
export type { SceneNoiseProps } from './SceneNoise/SceneNoise';
export type { SceneStarFieldProps } from './SceneStarField/SceneStarField';
export type { SceneShootingStarProps } from './SceneShootingStar/SceneShootingStar';
export type { SceneSnowProps } from './SceneSnow/SceneSnow';
export type { SceneAuroraProps } from './SceneAurora/SceneAurora';
export type { SceneStarWarpProps } from './SceneStarWarp/SceneStarWarp';
