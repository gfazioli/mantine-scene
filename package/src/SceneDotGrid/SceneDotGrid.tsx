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

export interface SceneDotGridProps {
  /** Dot color — supports Mantine theme colors
   *  @default 'gray'
   */
  color?: MantineColor;

  /** Mantine color shade (0-9)
   *  @default undefined
   */
  shade?: number;

  /** Dot radius in px
   *  @default 1
   */
  dotSize?: number;

  /** Spacing between dots in px — accepts a responsive object like `{ base: 16, md: 24 }`
   *  @default 24
   */
  spacing?: StyleProp<number>;

  /** Stagger alternate rows by half the spacing
   *  @default false
   */
  stagger?: boolean;

  /** Fade mask at edges
   *  @default 'none'
   */
  fade?: 'none' | 'radial' | 'top' | 'bottom' | 'edges';

  /** Enable twinkle animation
   *  @default false
   */
  animate?: boolean;

  /** Animation duration in seconds
   *  @default 4
   */
  duration?: number;

  /** Overall opacity (0-1)
   *  @default 1
   */
  opacity?: number;

  /** Additional className */
  className?: string;

  /** Additional inline styles */
  style?: React.CSSProperties;
}

function getFadeMask(fade: string): string | undefined {
  switch (fade) {
    case 'radial':
      return 'radial-gradient(ellipse at center, black 40%, transparent 80%)';
    case 'top':
      return 'linear-gradient(to bottom, transparent 0%, black 30%)';
    case 'bottom':
      return 'linear-gradient(to bottom, black 70%, transparent 100%)';
    case 'edges':
      return 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)';
    default:
      return undefined;
  }
}

/** Responsive CSS variable for spacing via InlineStyles + media queries */
function SceneDotGridMediaVariables({
  spacing,
  selector,
}: {
  spacing: StyleProp<number>;
  selector: string;
}) {
  const theme = useMantineTheme();

  const baseStyles: Record<string, string> = {};
  const baseSpacing = getBaseValue(spacing);
  if (baseSpacing !== undefined) {
    baseStyles['--scene-dotgrid-spacing'] = `${baseSpacing}px`;
  }

  const queries = keys(theme.breakpoints).reduce<Record<string, Record<string, string>>>(
    (acc, breakpoint) => {
      acc[breakpoint] = {};
      if (typeof spacing === 'object' && spacing !== null && spacing[breakpoint] !== undefined) {
        acc[breakpoint]['--scene-dotgrid-spacing'] = `${spacing[breakpoint]}px`;
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

export function SceneDotGrid({
  color = 'gray',
  shade,
  dotSize = 1,
  spacing = 24,
  stagger = false,
  fade = 'none',
  animate = false,
  duration = 4,
  opacity = 1,
  className,
  style,
}: SceneDotGridProps) {
  const { getStyles } = useSceneContext();
  const theme = useMantineTheme();
  const responsiveClassName = useRandomClassName();
  const resolvedColor =
    shade !== undefined ? getThemeColor(`${color}.${shade}`, theme) : getThemeColor(color, theme);

  const dotPattern = `radial-gradient(circle, ${resolvedColor} ${dotSize}px, transparent ${dotSize}px)`;

  const spacingVar = 'var(--scene-dotgrid-spacing)';

  let backgroundImage: string;
  let backgroundSize: string;
  let backgroundPosition: string | undefined;

  if (stagger) {
    backgroundImage = `${dotPattern}, ${dotPattern}`;
    backgroundSize = `${spacingVar} calc(${spacingVar} * 2), ${spacingVar} calc(${spacingVar} * 2)`;
    backgroundPosition = `0 0, calc(${spacingVar} / 2) ${spacingVar}`;
  } else {
    backgroundImage = dotPattern;
    backgroundSize = `${spacingVar} ${spacingVar}`;
    backgroundPosition = undefined;
  }

  const maskImage = getFadeMask(fade);

  return (
    <>
      <SceneDotGridMediaVariables spacing={spacing} selector={`.${responsiveClassName}`} />
      <Box
        {...getStyles('dotGrid', {
          className:
            [responsiveClassName, animate && classes.dotGridAnimated, className]
              .filter(Boolean)
              .join(' ') || undefined,
          style: {
            backgroundImage,
            backgroundSize,
            backgroundPosition,
            opacity,
            maskImage,
            WebkitMaskImage: maskImage,
            '--scene-dotgrid-opacity': String(opacity),
            '--scene-dotgrid-duration': `${duration}s`,
            ...style,
          } as React.CSSProperties,
        })}
      />
    </>
  );
}

SceneDotGrid.displayName = 'SceneDotGrid';
