import React from 'react';
import {
  Box,
  BoxProps,
  createVarsResolver,
  getFontSize,
  getRadius,
  getSize,
  getThemeColor,
  PolymorphicFactory,
  polymorphicFactory,
  StylesApiProps,
  useProps,
  useStyles,
  type MantineColor,
  type MantineRadius,
  type MantineSize,
  type StyleProp,
} from '@mantine/core';
import classes from './Scene.module.css';

export type SceneVariant = 'flat' | '3d';

export type SceneAnimationType = 'pulse' | 'flash' | 'breathe' | 'blink' | 'glow' | 'none';

export type SceneStylesNames = 'root' | 'scene' | 'label' | 'light' | 'glow';

export type SceneCssVariables = {
  root:
    | '--scene-size'
    | '--scene-radius'
    | '--scene-color'
    | '--scene-intensity'
    | '--scene-animation-duration'
    | '--scene-glow-size'
    | '--scene-justify-content';
};

export interface SceneBaseProps {
  /** Scene color from theme */
  color?: MantineColor;

  /** Scene size */
  size?: MantineSize | (string & {}) | number;

  /** Border radius */
  radius?: MantineRadius | (string & {}) | number;

  /** Controls Scene on/off state */
  value?: boolean;

  /** Light intensity (0-100) */
  intensity?: number;

  /** Enable animation */
  animate?: boolean;

  /** Animation type; one of 'pulse', 'flash', 'breathe', 'blink', 'glow', or 'none' */
  animationType?: SceneAnimationType;

  /** Animation duration in seconds */
  animationDuration?: number;

  /** Label content */
  label?: React.ReactNode;

  /** Label position */
  labelPosition?: 'left' | 'right';

  /** `justify-content` CSS property */
  justify?: StyleProp<React.CSSProperties['justifyContent']>;
}

export interface SceneProps extends BoxProps, SceneBaseProps, StylesApiProps<SceneFactory> {}

export type SceneFactory = PolymorphicFactory<{
  props: SceneProps;
  defaultComponent: 'div';
  defaultRef: HTMLDivElement;
  stylesNames: SceneStylesNames;
  variant: SceneVariant;
  vars: SceneCssVariables;
}>;

const defaultProps: Partial<SceneProps> = {
  color: 'green',
  size: 'sm',
  radius: 'xl',
  value: true,
  variant: 'flat',
  intensity: 80,
  animate: false,
  animationType: 'none',
  animationDuration: 1.5,
  labelPosition: 'right',
};

const varsResolver = createVarsResolver<SceneFactory>(
  (theme, { size, radius, color, intensity, animationDuration, justify }) => {
    return {
      root: {
        '--scene-size': getSize(size, 'scene-size'),
        '--scene-radius': radius === undefined ? undefined : getRadius(radius),
        '--scene-color': getThemeColor(color, theme),
        '--scene-intensity': intensity !== undefined ? `${intensity / 100}` : '0.8',
        '--scene-animation-duration':
          animationDuration !== undefined ? `${animationDuration}s` : '1.5s',
        '--scene-glow-size': `calc(var(--scene-size) * 0.6)`,
        '--scene-justify-content': String(justify) || 'center',
      },
    };
  }
);

export const Scene = polymorphicFactory<SceneFactory>((_props, ref) => {
  const props = useProps('Scene', defaultProps, _props);
  const {
    size,
    radius,
    color,
    intensity,
    animationDuration,
    value,
    animate,
    animationType,
    variant,
    label,
    labelPosition,
    justify,

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
    <Box
      ref={ref}
      {...getStyles('root')}
      {...others}
      mod={[{ 'label-position': labelPosition }, mod]}
      __vars={{
        '--label-fz': getFontSize(size),
        '--label-lh': getSize(size, 'label-lh'),
      }}
    >
      <Box
        {...getStyles('scene')}
        variant={variant}
        data-value={value || undefined}
        data-animate={animate && value ? animationType : undefined}
      >
        <Box {...getStyles('glow')} />
        <Box {...getStyles('light')} />
      </Box>
      {label && <Box {...getStyles('label')}>{label}</Box>}
    </Box>
  );
});

Scene.classes = classes;
Scene.displayName = 'Scene';
