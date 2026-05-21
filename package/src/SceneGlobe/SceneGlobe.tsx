import { Box, useMantineColorScheme, useMantineTheme, type MantineColor } from '@mantine/core';
import React, { useEffect, useRef } from 'react';
import { useSceneContext } from '../Scene.context';
import classes from '../Scene.module.css';

export interface SceneGlobeMarker {
  /** [latitude, longitude] in degrees. */
  location: [number, number];
  /** Marker dot size in cobe's normalised units. @default 0.05 */
  size?: number;
  /** Optional per-marker colour override — falls back to the globe's `markerColor`. */
  color?: MantineColor;
}

export interface SceneGlobeArc {
  /** Start point [latitude, longitude] in degrees. */
  from: [number, number];
  /** End point [latitude, longitude] in degrees. */
  to: [number, number];
  /** Optional per-arc colour override — falls back to the globe's `arcColor`. */
  color?: MantineColor;
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

  /** Atmospheric glow colour around the sphere. The alpha channel is ignored by cobe — use `glowIntensity` to fade or disable the glow instead.
   *  @default 'blue.5'
   */
  glowColor?: MantineColor;

  /** Glow strength multiplier (0..1). `0` disables the glow entirely; `1` is the natural intensity of `glowColor`. Use this instead of alpha — cobe's WebGL shader doesn't read the alpha channel of the colour tuples.
   *  @default 1
   */
  glowIntensity?: number;

  /** Colour used for the optional `markers` dots (lat/lng points).
   *  @default 'orange.5'
   */
  markerColor?: MantineColor;

  /** Cobe's `dark` flag — `1` increases visibility of the night side of the planet, `0` fades it out (cleaner planet silhouette). Set to `'auto'` to mirror the Mantine color scheme.
   *  @default 0
   */
  dark?: 'auto' | boolean | 0 | 1;

  /** How many dots make up the continents — higher = denser, more "solid" looking map. Values above ~32000 can introduce sampling artifacts in cobe's shader, so keep it in `[4000, 32000]` for clean rendering.
   *  @default 16000
   */
  mapSamples?: number;

  /** How bright the continent dots are against `baseColor`. Increase if the planet looks empty on dark themes.
   *  @default 12
   */
  mapBrightness?: number;

  /** Light diffusion across the sphere — controls how much the lit hemisphere bleeds into the dark side.
   *  @default 3
   */
  diffuse?: number;

  /** Ambient brightness of the texture *underneath* the lit continents. Raise for a fuller, less contrasty planet.
   *  @default 0
   */
  mapBaseBrightness?: number;

  /** Arcs (curved lines) drawn between two locations — perfect for flight paths / network topologies. */
  arcs?: SceneGlobeArc[];

  /** Default arc colour — overridden per-arc by `arc.color`.
   *  @default 'blue.4'
   */
  arcColor?: MantineColor;

  /** Arc stroke thickness multiplier.
   *  @default 0.5
   */
  arcWidth?: number;

  /** Peak height of each arc above the surface (in cobe's normalised units).
   *  @default 0.3
   */
  arcHeight?: number;

  /** How far each marker dot pops out of the surface (cobe units).
   *  @default 0.05
   */
  markerElevation?: number;

  /** Canvas-relative offset `[x, y]` in cobe units — shift the sphere off-centre. Useful for "half globe" hero layouts.
   *  @default [0, 0]
   */
  offset?: [number, number];

  /** Scale multiplier for the sphere — values >1 zoom in, <1 zoom out.
   *  @default 1
   */
  scale?: number;

  /** Initial focus point [latitude, longitude] — the sphere is oriented so this point faces the viewer. Overrides `phi` / `theta` when set. */
  focus?: [number, number];

  /** Continue spinning with momentum after the user releases a drag. Pass a number in `[0, 1)` to set the per-frame decay factor manually — `0.85` snaps fast, `0.97` glides for a long time, `0.92` (default) feels natural. `true` = `0.92`, `false` disables inertia.
   *  @default true
   */
  inertia?: boolean | number;

  /** Which axes respond to pointer drag. `'x'` = longitude only (default), `'y'` = latitude only, `'both'` = drag in 2D.
   *  @default 'x'
   */
  dragAxis?: 'x' | 'y' | 'both';

  /** When the parent `Scene` has `interactive=true`, rotate the globe to follow the cursor instead of (or in addition to) auto-rotation. Drag still wins while the pointer is down.
   *  @default false
   */
  followCursor?: boolean;

  /** Overall opacity (0..1).
   *  @default 1
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
  glowIntensity = 1,
  markerColor = 'orange.5',
  dark = 1,
  mapSamples = 16000,
  mapBrightness = 6,
  diffuse = 3,
  mapBaseBrightness = 0,
  arcs,
  arcColor = 'blue.4',
  arcWidth = 0.5,
  arcHeight = 0.3,
  markerElevation = 0.05,
  offset = [0, 0],
  scale = 1,
  focus,
  inertia = true,
  dragAxis = 'x',
  followCursor = false,
  opacity = 1,
  className,
  style,
}: SceneGlobeProps) {
  const { getStyles, mouse } = useSceneContext();
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // focus overrides the initial phi/theta — point the requested lat/lng at the viewer.
  // theta = lat (radians); phi is the negative longitude so positive lng faces forward.
  const focusedPhi = focus ? -(focus[1] * Math.PI) / 180 : phiInitial;
  const focusedTheta = focus ? (focus[0] * Math.PI) / 180 : theta;

  const phiRef = useRef(focusedPhi);
  const thetaRef = useRef(focusedTheta);
  // Ring buffer of recent (timestamp, phi, theta) samples for stable velocity estimation.
  type PointerSample = { t: number; phi: number; theta: number };
  const pointerRef = useRef<{
    startX: number;
    startY: number;
    startPhi: number;
    startTheta: number;
    samples: PointerSample[];
  } | null>(null);
  // Per-frame velocity — single source of truth so inertia and autoRotate
  // blend smoothly instead of "stopping then jumping back". When the user
  // releases a drag, we seed this with the gesture velocity; on every frame
  // it lerps toward the target velocity (autoRotateSpeed when on, else 0).
  const vPhiRef = useRef(autoRotate ? autoRotateSpeed : 0);
  const vThetaRef = useRef(0);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);
  useEffect(() => {
    mouseRef.current = mouse;
  }, [mouse]);
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
  // When `focus` is set, the initial theta is derived from focus.lat and we don't fight the user's slider.
  useEffect(() => {
    if (!focus) {
      thetaRef.current = theta;
    }
  }, [theta, focus]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const baseTuple = resolveColorTuple(baseColor, theme);
    const glowBase = resolveColorTuple(glowColor, theme);
    // Scale glowColor by `glowIntensity` to fake an alpha channel — cobe ignores
    // the 4th element of the tuple. Multiplying the RGB by 0..1 fades the glow.
    const intensity = Math.max(0, Math.min(1, glowIntensity));
    const glowTuple: [number, number, number] = [
      glowBase[0] * intensity,
      glowBase[1] * intensity,
      glowBase[2] * intensity,
    ];
    const markerTuple = resolveColorTuple(markerColor, theme);
    const arcTuple = resolveColorTuple(arcColor, theme);
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
          mapBaseBrightness,
          baseColor: baseTuple,
          markerColor: markerTuple,
          glowColor: glowTuple,
          arcColor: arcTuple,
          arcWidth,
          arcHeight,
          markerElevation,
          offset,
          scale,
          markers: (markers ?? []).map((m) => ({
            location: m.location,
            size: m.size ?? 0.05,
            color: m.color ? resolveColorTuple(m.color, theme) : undefined,
          })),
          arcs: (arcs ?? []).map((a) => ({
            from: a.from,
            to: a.to,
            color: a.color ? resolveColorTuple(a.color, theme) : undefined,
          })),
        } as any) as { update: (opts: Record<string, any>) => void; destroy: () => void };

        const clampTheta = (t: number) =>
          Math.max(-Math.PI / 2 + 0.05, Math.min(Math.PI / 2 - 0.05, t));

        const tick = () => {
          if (!globe || cancelled) {
            return;
          }

          if (pointerRef.current) {
            // Drag in progress. Phi/theta are updated by handlePointerMove.
            // Track velocity *live* from the rolling sample window so the
            // moment the user releases we already have an accurate vPhi/vTheta
            // — no separate handlePointerUp calculation, no "0 then ramp" feel.
            const samples = pointerRef.current.samples;
            if (samples.length >= 2) {
              const first = samples[0];
              const last = samples[samples.length - 1];
              const dt = Math.max(1, last.t - first.t);
              vPhiRef.current = ((last.phi - first.phi) / dt) * 16;
              vThetaRef.current = ((last.theta - first.theta) / dt) * 16;
            }
          } else if (followCursor && mouseRef.current) {
            // Cursor-driven rotation when Scene.interactive is on. mouse.x/y are 0-100.
            const targetPhi = ((mouseRef.current.x - 50) / 50) * Math.PI;
            const targetTheta = clampTheta(((mouseRef.current.y - 50) / 100) * Math.PI * 0.8);
            phiRef.current += (targetPhi - phiRef.current) * 0.05;
            thetaRef.current = clampTheta(
              thetaRef.current + (targetTheta - thetaRef.current) * 0.05
            );
          } else {
            // Single integrator: vPhiRef lerps toward the autoRotate target each
            // frame, so a release-velocity seed decays smoothly into the steady
            // auto-rotation instead of stopping at zero and then jumping back.
            const targetVPhi = autoRotate ? autoRotateSpeed : 0;
            const decay =
              inertia === false
                ? 0
                : typeof inertia === 'number'
                  ? Math.max(0, Math.min(0.999, inertia))
                  : 0.92;
            vPhiRef.current = targetVPhi + (vPhiRef.current - targetVPhi) * decay;
            vThetaRef.current *= decay;
            phiRef.current += vPhiRef.current;
            thetaRef.current = clampTheta(thetaRef.current + vThetaRef.current);
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
    glowIntensity,
    markerColor,
    arcColor,
    markers,
    arcs,
    theme,
    mapSamples,
    mapBrightness,
    mapBaseBrightness,
    diffuse,
    arcWidth,
    arcHeight,
    markerElevation,
    offset,
    scale,
    inertia,
    followCursor,
  ]);

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!interactive) {
      return;
    }
    // Zero current velocity so previous inertia doesn't fight the drag.
    vPhiRef.current = 0;
    vThetaRef.current = 0;
    const now = performance.now();
    pointerRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startPhi: phiRef.current,
      startTheta: thetaRef.current,
      samples: [{ t: now, phi: phiRef.current, theta: thetaRef.current }],
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!interactive || !pointerRef.current) {
      return;
    }
    const p = pointerRef.current;
    const dx = e.clientX - p.startX;
    const dy = e.clientY - p.startY;
    const allowX = dragAxis !== 'y';
    const allowY = dragAxis !== 'x';
    const nextPhi = allowX ? p.startPhi + dx / 150 : p.startPhi;
    const nextTheta = allowY
      ? Math.max(-Math.PI / 2 + 0.05, Math.min(Math.PI / 2 - 0.05, p.startTheta + dy / 200))
      : p.startTheta;

    phiRef.current = nextPhi;
    thetaRef.current = nextTheta;

    // Tight rolling window (~60ms) so live velocity reflects very recent
    // motion. A wider window over-averages and masks late-gesture velocity
    // changes (e.g. user pausing before release).
    const now = performance.now();
    p.samples.push({ t: now, phi: nextPhi, theta: nextTheta });
    const cutoff = now - 60;
    while (p.samples.length > 2 && p.samples[0].t < cutoff) {
      p.samples.shift();
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    // No special-case velocity capture here — the rAF loop already tracks
    // it live during drag, so `vPhiRef`/`vThetaRef` carry the most recent
    // motion forward into the integrator the moment the pointer is released.
    if (inertia === false) {
      vPhiRef.current = 0;
      vThetaRef.current = 0;
    }
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
          cursor: interactive ? (pointerRef.current ? 'grabbing' : 'grab') : 'default',
          pointerEvents: interactive ? 'auto' : 'none',
          touchAction: dragAxis === 'both' ? 'none' : 'pan-y',
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
