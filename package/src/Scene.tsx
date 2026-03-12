import React from 'react';
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
import { SceneProvider } from './Scene.context';
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
};

const varsResolver = createVarsResolver<SceneFactory>((_, { zIndex }) => ({
  root: {
    '--scene-z-index': zIndex !== undefined ? String(zIndex) : '0',
  },
}));

export const Scene = factory<SceneFactory>((_props, ref) => {
  const props = useProps('Scene', defaultProps, _props);
  const {
    fullscreen,
    zIndex,
    reducedMotion,
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

  return (
    <SceneProvider value={{ getStyles }}>
      <Box
        ref={ref}
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
