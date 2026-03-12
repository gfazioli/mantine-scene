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
import { DotGrid } from './DotGrid';
import { Glow } from './Glow';
import { Gradient } from './Gradient';
import { Mesh } from './Mesh';
import { Noise } from './Noise';
import { SceneProvider } from './Scene.context';
import classes from './Scene.module.css';

export type SceneStylesNames = 'root' | 'gradient' | 'dotGrid' | 'glow' | 'mesh' | 'noise';

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
    Gradient: typeof Gradient;
    DotGrid: typeof DotGrid;
    Glow: typeof Glow;
    Mesh: typeof Mesh;
    Noise: typeof Noise;
  };
}>;

const defaultProps: Partial<SceneProps> = {
  fullscreen: false,
  zIndex: 0,
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
      <Box ref={ref} {...getStyles('root')} {...others} mod={[{ fullscreen }, mod]}>
        {children}
      </Box>
    </SceneProvider>
  );
});

Scene.classes = classes;
Scene.displayName = 'Scene';
Scene.Gradient = Gradient;
Scene.DotGrid = DotGrid;
Scene.Glow = Glow;
Scene.Mesh = Mesh;
Scene.Noise = Noise;

export type { GradientProps } from './Gradient';
export type { DotGridProps } from './DotGrid';
export type { GlowProps } from './Glow';
export type { MeshProps, MeshStop } from './Mesh';
export type { NoiseProps } from './Noise';
