import { Box, useMantineColorScheme, useMantineTheme, type MantineColor } from '@mantine/core';
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

  /** Sphere base colour — the colour of the continents. Mantine theme color or any CSS color.
   *  @default 'gray.5'
   */
  baseColor?: MantineColor;

  /** Atmospheric glow colour around the sphere.
   *  @default 'blue.5'
   */
  glowColor?: MantineColor;

  /** Colour used for the optional `markers` dots (lat/lng points).
   *  @default 'orange.5'
   */
  markerColor?: MantineColor;

  /** Cobe's `dark` flag — `1` increases visibility of the night side of the planet, `0` fades it out (cleaner planet silhouette). Set to `'auto'` to mirror the Mantine color scheme.
   *  @default 0
   */
  dark?: 'auto' | boolean | 0 | 1;

  /** How much detail / how many dots make up the continents — higher = denser map.
   *  @default 16000
   */
  mapSamples?: number;

  /** How bright the continent dots are against `baseColor`. Increase if the planet looks empty on dark themes.
   *  @default 12
   */
  mapBrightness?: number;

  /** Light diffusion across the sphere — controls how much the lit hemisphere bleeds into the dark side.
   *  @default 1.2
   */
  diffuse?: number;

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

// cobe needs literal RGB tuples in 0..1 — Mantine 9's `parseThemeColor` /
// `getThemeColor` resolve palette refs to CSS variables (`var(--mantine-color-gray-6)`),
// which we can't parse offline. Resolve via direct `theme.colors[palette][shade]`
// lookup instead, falling back to the raw string for standalone CSS colors.
function resolveColorTuple(
  color: MantineColor,
  theme: ReturnType<typeof useMantineTheme>
): [number, number, number] {
  if (!color) {
    return [1, 1, 1];
  }

  // Already a CSS color literal (hex / rgb / rgba) — parse directly.
  if (color.startsWith('#') || color.startsWith('rgb')) {
    return hexToRgbTuple(color);
  }

  // Palette ref like 'gray.7' or bare palette like 'gray' (defaults to shade 6).
  const [palette, shadeStr] = color.split('.');
  const shade = shadeStr !== undefined ? parseInt(shadeStr, 10) : 6;
  const swatch = theme.colors?.[palette]?.[shade];
  if (swatch) {
    return hexToRgbTuple(swatch);
  }

  // Unknown palette — give up and return mid-gray so cobe still renders something.
  return [0.5, 0.5, 0.5];
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
  dark = 1,
  mapSamples = 16000,
  mapBrightness = 6,
  diffuse = 3,
  opacity = 1,
  className,
  style,
}: SceneGlobeProps) {
  const { getStyles } = useSceneContext();
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const phiRef = useRef(phiInitial);
  const thetaRef = useRef(theta);
  const pointerRef = useRef<{ startX: number; startPhi: number } | null>(null);
  const resolveDark = (d: typeof dark, scheme: typeof colorScheme): 0 | 1 => {
    if (d === 'auto') {
      return scheme === 'dark' ? 1 : 0;
    }
    return d ? 1 : 0;
  };
  const isDarkRef = useRef<0 | 1>(resolveDark(dark, colorScheme));

  useEffect(() => {
    isDarkRef.current = resolveDark(dark, colorScheme);
  }, [dark, colorScheme]);

  // Keep theta tracking the prop so live slider changes apply without recreating the globe.
  useEffect(() => {
    thetaRef.current = theta;
  }, [theta]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const baseTuple = resolveColorTuple(baseColor, theme);
    const glowTuple = resolveColorTuple(glowColor, theme);
    const markerTuple = resolveColorTuple(markerColor, theme);
    // cobe expects `width` / `height` in pixels at the SAME resolution as
    // `devicePixelRatio` — see the official demo. On Retina (pxRatio=2), we
    // pass size*2 to cobe and let canvas.style.* downscale to `size` px.
    const pxRatio = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 2) : 1;
    const renderSize = size * pxRatio;

    let globe: { update: (opts: Record<string, any>) => void; destroy: () => void } | null = null;
    let raf = 0;
    let cancelled = false;

    import('cobe')
      .then((mod) => {
        if (cancelled || !canvasRef.current) {
          return;
        }
        const createGlobe = mod.default;
        // cobe v2 dropped the `onRender` callback — the returned `globe.update`
        // is what drives the animation. We run our own rAF loop and feed phi/theta
        // each frame, including auto-rotate increments when no pointer drag.
        globe = createGlobe(canvasRef.current, {
          devicePixelRatio: pxRatio,
          width: renderSize,
          height: renderSize,
          phi: phiRef.current,
          theta: thetaRef.current,
          dark: isDarkRef.current,
          diffuse,
          mapSamples,
          mapBrightness,
          baseColor: baseTuple,
          markerColor: markerTuple,
          glowColor: glowTuple,
          markers: (markers ?? []).map((m) => ({
            location: m.location,
            size: m.size ?? 0.05,
          })),
        } as any) as { update: (opts: Record<string, any>) => void; destroy: () => void };

        const tick = () => {
          if (!globe || cancelled) {
            return;
          }
          if (autoRotate && !pointerRef.current) {
            phiRef.current += autoRotateSpeed;
          }
          globe.update({ phi: phiRef.current, theta: thetaRef.current });
          raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      })
      .catch(() => {
        // cobe is an optional peer dependency. When missing, we silently
        // render the empty canvas — the docs section explains the install
        // requirement instead.
      });

    return () => {
      cancelled = true;
      if (raf) {
        cancelAnimationFrame(raf);
      }
      globe?.destroy();
    };
    // theta is intentionally NOT in the deps — it's tracked through `thetaRef` so
    // dragging the slider doesn't tear down the cobe instance on every change.
  }, [
    size,
    autoRotate,
    autoRotateSpeed,
    baseColor,
    glowColor,
    markerColor,
    markers,
    theme,
    mapSamples,
    mapBrightness,
    diffuse,
  ]);

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
        // Setting the intrinsic `width`/`height` attributes (not just the style)
        // ensures cobe's internal coordinate system matches what we display.
        width={size}
        height={size}
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
