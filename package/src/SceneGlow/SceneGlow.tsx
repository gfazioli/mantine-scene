import React from 'react';
import {
  Box,
  getBaseValue,
  getSortedBreakpoints,
  getThemeColor,
  InlineStyles,
  keys,
  useMantineTheme,
  useRandomClassName,
  type MantineBreakpoint,
  type MantineColor,
  type StyleProp,
} from '@mantine/core';
import { useSceneContext } from '../Scene.context';
import classes from '../Scene.module.css';

export interface SceneGlowProps {
  /** Color of the glow blob — supports Mantine theme colors
   *  @default 'violet'
   */
  color?: MantineColor;

  /** Mantine color shade (0-9)
   *  @default undefined
   */
  shade?: number;

  /** Size of the blob in px — accepts a responsive object like `{ base: 200, md: 400 }`
   *  @default 400
   */
  size?: StyleProp<number>;

  /** Blur radius in px — accepts a responsive object like `{ base: 60, md: 120 }`
   *  @default 120
   */
  blur?: StyleProp<number>;

  /** Opacity (0-1)
   *  @default 0.5
   */
  opacity?: number;

  /** Top position (CSS value, e.g. '10%', '200px')
   *  @default '10%'
   */
  top?: string;

  /** Left position (CSS value, e.g. '20%', '100px')
   *  @default '50%'
   */
  left?: string;

  /** Enable floating animation
   *  @default true
   */
  animate?: boolean;

  /** Animation type variant
   *  @default 'float'
   */
  animationType?: 'float' | 'pulse' | 'breathe';

  /** Animation duration in seconds
   *  @default 8
   */
  duration?: number;

  /** Animation delay in seconds
   *  @default 0
   */
  delay?: number;

  /** Horizontal drift distance (CSS value)
   *  @default '30px'
   */
  driftX?: string;

  /** Vertical drift distance (CSS value)
   *  @default '20px'
   */
  driftY?: string;

  /** Additional className */
  className?: string;

  /** Additional inline styles */
  style?: React.CSSProperties;
}

/** Responsive CSS variables for size/blur via InlineStyles + media queries */
function SceneGlowMediaVariables({
  size,
  blur,
  selector,
}: {
  size: StyleProp<number>;
  blur: StyleProp<number>;
  selector: string;
}) {
  const theme = useMantineTheme();

  const baseStyles: Record<string, string> = {};
  const baseSize = getBaseValue(size);
  const baseBlur = getBaseValue(blur);
  if (baseSize !== undefined) {
    baseStyles['--scene-glow-size'] = `${baseSize}px`;
  }
  if (baseBlur !== undefined) {
    baseStyles['--scene-glow-blur'] = `${baseBlur}px`;
  }

  const queries = keys(theme.breakpoints).reduce<Record<string, Record<string, string>>>(
    (acc, breakpoint) => {
      acc[breakpoint] = {};
      if (typeof size === 'object' && size !== null && size[breakpoint] !== undefined) {
        acc[breakpoint]['--scene-glow-size'] = `${size[breakpoint]}px`;
      }
      if (typeof blur === 'object' && blur !== null && blur[breakpoint] !== undefined) {
        acc[breakpoint]['--scene-glow-blur'] = `${blur[breakpoint]}px`;
      }
      return acc;
    },
    {}
  );

  const sorted = getSortedBreakpoints(keys(queries), theme.breakpoints).filter(
    (bp) => keys(queries[bp.value]).length > 0
  );

  const media = sorted.map((bp) => ({
    query: `(min-width: ${theme.breakpoints[bp.value as MantineBreakpoint]})`,
    styles: queries[bp.value],
  }));

  return <InlineStyles styles={baseStyles} media={media} selector={selector} />;
}

export function SceneGlow({
  color = 'violet',
  shade,
  size = 400,
  blur = 120,
  opacity = 0.5,
  top = '10%',
  left = '50%',
  animate = true,
  animationType = 'float',
  duration = 8,
  delay = 0,
  driftX = '30px',
  driftY = '20px',
  className,
  style,
}: SceneGlowProps) {
  const { getStyles, mouse } = useSceneContext();
  const theme = useMantineTheme();
  const responsiveClassName = useRandomClassName();
  const resolvedColor =
    shade !== undefined ? getThemeColor(`${color}.${shade}`, theme) : getThemeColor(color, theme);

  const effectiveTop = mouse ? `${mouse.y}%` : top;
  const effectiveLeft = mouse ? `${mouse.x}%` : left;

  return (
    <>
      <SceneGlowMediaVariables size={size} blur={blur} selector={`.${responsiveClassName}`} />
      <Box
        {...getStyles('glow', {
          className:
            [responsiveClassName, animate && classes.glowAnimated, className]
              .filter(Boolean)
              .join(' ') || undefined,
          style: {
            '--scene-glow-opacity': String(opacity),
            '--scene-glow-duration': `${duration}s`,
            '--scene-glow-delay': `${delay}s`,
            '--scene-glow-drift-x': driftX,
            '--scene-glow-drift-y': driftY,
            top: effectiveTop,
            left: effectiveLeft,
            marginTop: 'calc(var(--scene-glow-size) / -2)',
            marginLeft: 'calc(var(--scene-glow-size) / -2)',
            background: `radial-gradient(circle, ${resolvedColor} 0%, transparent 70%)`,
            ...style,
          } as React.CSSProperties,
        })}
        data-animation-type={animate ? animationType : undefined}
      />
    </>
  );
}

SceneGlow.displayName = 'SceneGlow';
