import {
  Box,
  getThemeColor,
  parseThemeColor,
  useMantineColorScheme,
  useMantineTheme,
  type MantineColor,
} from '@mantine/core';
import React, { useEffect, useRef } from 'react';
import { useSceneContext } from '../Scene.context';
import classes from '../Scene.module.css';

export interface SceneGlobeMarker {
  /** [latitude, longitude] in degrees. */
  location: [number, number];
  /** Marker dot size in cobe's normalised units. @default 0.05 */
  size?: number;
}

export interface SceneGlobeProps {
  /** Canvas size in px (square). Renders at `size × pixelRatio` for crisp HiDPI.
   *  @default 600
   */
  size?: number;

  /** Initial longitude rotation in radians.
   *  @default 0
   */
  phi?: number;

  /** Latitude tilt in radians. Positive values lean north.
   *  @default 0.3
   */
  theta?: number;

  /** When true, the globe spins on its vertical axis at `autoRotateSpeed`.
   *  @default true
   */
  autoRotate?: boolean;

  /** Radians added to `phi` on every animation frame.
   *  @default 0.005
   */
  autoRotateSpeed?: number;

  /** Enable pointer-drag rotation. Disables auto-rotate while dragging.
   *  @default true
   */
  interactive?: boolean;

  /** Map of markers ([lat, lng]) plotted on the surface. */
  markers?: SceneGlobeMarker[];

  /** Sphere base colour — Mantine theme color or any CSS color.
   *  @default 'gray.7'
   */
  baseColor?: MantineColor;

  /** Atmospheric glow colour around the sphere.
   *  @default 'blue.5'
   */
  glowColor?: MantineColor;

  /** Marker dot colour.
   *  @default 'orange.5'
   */
  markerColor?: MantineColor;

  /** Force dark/light theme. Defaults to auto-detection via `useMantineColorScheme`.
   *  @default 'auto'
   */
  dark?: 'auto' | boolean;

  /** Overall opacity (0..1).
   *  @default 0.9
   */
  opacity?: number;

  /** Additional className */
  className?: string;

  /** Additional inline styles */
  style?: React.CSSProperties;
}

// Parses any CSS-resolvable Mantine color into a normalised [r, g, b] tuple in 0..1.
// Returns `[1, 1, 1]` (white) on parse failure so cobe always receives a valid value.
function hexToRgbTuple(hex: string): [number, number, number] {
  const trimmed = hex.trim();
  // #rgb / #rgba / #rrggbb / #rrggbbaa
  const hexMatch = trimmed.match(/^#([0-9a-fA-F]{3,8})$/);
  if (hexMatch) {
    let hexBody = hexMatch[1];
    if (hexBody.length === 3 || hexBody.length === 4) {
      hexBody = hexBody
        .split('')
        .map((c) => c + c)
        .join('');
    }
    const r = parseInt(hexBody.slice(0, 2), 16) / 255;
    const g = parseInt(hexBody.slice(2, 4), 16) / 255;
    const b = parseInt(hexBody.slice(4, 6), 16) / 255;
    return [r, g, b];
  }
  // rgb(a)(...) / rgba percent — extract the first three numeric components.
  const rgbMatch = trimmed.match(/rgba?\(([^)]+)\)/);
  if (rgbMatch) {
    const parts = rgbMatch[1].split(/[,\s/]+/).filter(Boolean);
    if (parts.length >= 3) {
      const parseChannel = (s: string) => {
        if (s.endsWith('%')) {
          return Math.max(0, Math.min(1, parseFloat(s) / 100));
        }
        return Math.max(0, Math.min(1, parseFloat(s) / 255));
      };
      return [parseChannel(parts[0]), parseChannel(parts[1]), parseChannel(parts[2])];
    }
  }
  return [1, 1, 1];
}

function resolveColorTuple(
  color: MantineColor,
  theme: ReturnType<typeof useMantineTheme>
): [number, number, number] {
  try {
    // parseThemeColor returns { value: '#hex', ... } for palette refs; fall back to direct theme color.
    const parsed = parseThemeColor({ color, theme });
    const value = parsed?.value ?? getThemeColor(color, theme);
    return hexToRgbTuple(value);
  } catch {
    return hexToRgbTuple(getThemeColor(color, theme));
  }
}

export function SceneGlobe({
  size = 600,
  phi: phiInitial = 0,
  theta = 0.3,
  autoRotate = true,
  autoRotateSpeed = 0.005,
  interactive = true,
  markers,
  baseColor = 'gray.7',
  glowColor = 'blue.5',
  markerColor = 'orange.5',
  dark = 'auto',
  opacity = 0.9,
  className,
  style,
}: SceneGlobeProps) {
  const { getStyles } = useSceneContext();
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const phiRef = useRef(phiInitial);
  const pointerRef = useRef<{ startX: number; startPhi: number } | null>(null);
  const isDarkRef = useRef<boolean>(dark === 'auto' ? colorScheme === 'dark' : Boolean(dark));

  useEffect(() => {
    isDarkRef.current = dark === 'auto' ? colorScheme === 'dark' : Boolean(dark);
  }, [dark, colorScheme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const baseTuple = resolveColorTuple(baseColor, theme);
    const glowTuple = resolveColorTuple(glowColor, theme);
    const markerTuple = resolveColorTuple(markerColor, theme);
    const pxRatio = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
    const renderSize = size * pxRatio;

    let globe: { destroy: () => void } | null = null;
    let cancelled = false;

    import('cobe')
      .then((mod) => {
        if (cancelled || !canvasRef.current) {
          return;
        }
        const createGlobe = mod.default;
        // `onRender` is supported by cobe at runtime but missing from the public
        // type definitions, so we widen via `as any` to keep the surface honest.
        globe = createGlobe(canvasRef.current, {
          devicePixelRatio: pxRatio,
          width: renderSize,
          height: renderSize,
          phi: phiRef.current,
          theta,
          dark: isDarkRef.current ? 1 : 0,
          diffuse: 1.2,
          mapSamples: 16000,
          mapBrightness: 6,
          baseColor: baseTuple,
          markerColor: markerTuple,
          glowColor: glowTuple,
          markers: (markers ?? []).map((m) => ({
            location: m.location,
            size: m.size ?? 0.05,
          })),
          onRender: (state: Record<string, any>) => {
            state.phi = phiRef.current;
            if (autoRotate && !pointerRef.current) {
              phiRef.current += autoRotateSpeed;
            }
          },
        } as any);
      })
      .catch(() => {
        // cobe is an optional peer dependency. When missing, we silently
        // render the empty canvas — surfacing a console warning here would
        // pollute consumer logs for unrelated builds; the docs section
        // explains the install requirement instead.
      });

    return () => {
      cancelled = true;
      globe?.destroy();
    };
  }, [size, theta, autoRotate, autoRotateSpeed, baseColor, glowColor, markerColor, markers, theme]);

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!interactive) {
      return;
    }
    pointerRef.current = { startX: e.clientX, startPhi: phiRef.current };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!interactive || !pointerRef.current) {
      return;
    }
    const dx = e.clientX - pointerRef.current.startX;
    phiRef.current = pointerRef.current.startPhi + dx / 150;
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    pointerRef.current = null;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  return (
    <Box
      {...getStyles('globe', {
        className,
        style: {
          '--scene-globe-size': `${size}px`,
          opacity,
          ...style,
        } as React.CSSProperties,
      })}
    >
      <canvas
        ref={canvasRef}
        className={classes.globeCanvas}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          cursor: interactive ? 'grab' : 'default',
          pointerEvents: interactive ? 'auto' : 'none',
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        aria-hidden="true"
      />
    </Box>
  );
}

SceneGlobe.displayName = 'SceneGlobe';
