import React, { useEffect, useState } from 'react';
import { Scene } from '@gfazioli/mantine-scene';
import { IconAdjustments, IconMoon, IconSun, IconX } from '@tabler/icons-react';
import {
  ActionIcon,
  Anchor,
  Box,
  Checkbox,
  ColorInput,
  Container,
  Group,
  NumberInput,
  Paper,
  ScrollArea,
  SegmentedControl,
  Slider,
  Stack,
  Text,
  Title,
  Tooltip,
  useComputedColorScheme,
  useMantineColorScheme,
} from '@mantine/core';

interface LayerConfig {
  enabled: boolean;
  [key: string]: any;
}

const defaultLayers: Record<string, LayerConfig> = {
  gradient: {
    enabled: true,
    type: 'radial' as const,
    from: '#7950f2',
    fromOpacity: 0.15,
    to: '#e64980',
    toOpacity: 0.08,
    animate: false,
    duration: 20,
  },
  glow: {
    enabled: true,
    color: '#7950f2',
    size: 600,
    blur: 160,
    opacity: 0.4,
    top: '20%',
    left: '30%',
    animate: true,
    duration: 10,
  },
  dotGrid: {
    enabled: false,
    color: '#868e96',
    opacity: 0.15,
    spacing: 28,
    dotSize: 1,
    fade: 'edges' as const,
    animate: false,
    duration: 4,
  },
  mesh: {
    enabled: false,
    opacity: 0.5,
    animate: false,
    duration: 15,
  },
  noise: {
    enabled: true,
    opacity: 0.03,
    grain: 0.65,
    seed: 0,
    type: 'fractalNoise' as const,
    octaves: 4,
  },
  starField: {
    enabled: true,
    count: 150,
    twinkle: true,
    duration: 4,
    opacity: 0.8,
    minSize: 1,
    maxSize: 3,
  },
  shootingStar: {
    enabled: true,
    count: 5,
    color: '#868e96',
    trailLength: 100,
    opacity: 0.6,
    speed: 1,
    angle: 150,
  },
  snow: {
    enabled: false,
    count: 50,
    opacity: 0.7,
    speed: 1,
    drift: 30,
    minSize: 2,
    maxSize: 6,
  },
  aurora: {
    enabled: true,
    bands: 3,
    opacity: 0.15,
    blur: 80,
    duration: 12,
    position: 'top' as const,
  },
  starWarp: {
    enabled: false,
    count: 100,
    speed: 1,
    direction: 'out' as const,
    trail: true,
    opacity: 0.8,
  },
  rain: {
    enabled: false,
    count: 80,
    color: '#4dabf7',
    angle: 15,
    speed: 1,
    minLength: 8,
    maxLength: 18,
    thickness: 1,
    opacity: 0.6,
    splash: false,
    splashCount: 20,
  },
  confetti: {
    enabled: false,
    count: 80,
    duration: 4,
    speed: 1,
    minSize: 6,
    maxSize: 12,
    flutter: 60,
    opacity: 1,
  },
};

const layerLabels: Record<string, string> = {
  gradient: 'Gradient',
  glow: 'Glow',
  dotGrid: 'Dot Grid',
  mesh: 'Mesh',
  noise: 'Noise',
  starField: 'Star Field',
  shootingStar: 'Shooting Star',
  snow: 'Snow',
  aurora: 'Aurora',
  starWarp: 'Star Warp',
  rain: 'Rain',
  confetti: 'Confetti',
};

const SWATCHES = [
  '#868e96',
  '#fa5252',
  '#e64980',
  '#be4bdb',
  '#7950f2',
  '#4c6ef5',
  '#228be6',
  '#15aabf',
  '#12b886',
  '#40c057',
  '#82c91e',
  '#fab005',
  '#fd7e14',
  '#ffffff',
];

function SliderField({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step?: number;
}) {
  return (
    <Box>
      <Group justify="space-between" mb={4}>
        <Text size="xs" c="dimmed">
          {label}
        </Text>
        <Text size="xs" c="dimmed">
          {step < 1 ? value.toFixed(2) : value}
        </Text>
      </Group>
      <Slider size="xs" min={min} max={max} step={step} value={value} onChange={onChange} />
    </Box>
  );
}

function GradientControls({
  config,
  onChange,
}: {
  config: LayerConfig;
  onChange: (c: LayerConfig) => void;
}) {
  return (
    <Stack gap="xs">
      <SegmentedControl
        size="xs"
        data={['linear', 'radial']}
        value={config.type}
        onChange={(v) => onChange({ ...config, type: v })}
      />
      <ColorInput
        size="xs"
        label="From"
        value={config.from}
        onChange={(v) => onChange({ ...config, from: v })}
        swatches={SWATCHES}
        swatchesPerRow={7}
      />
      <SliderField
        label="From Opacity"
        value={config.fromOpacity}
        onChange={(v) => onChange({ ...config, fromOpacity: v })}
        min={0}
        max={1}
        step={0.01}
      />
      <ColorInput
        size="xs"
        label="To"
        value={config.to}
        onChange={(v) => onChange({ ...config, to: v })}
        swatches={SWATCHES}
        swatchesPerRow={7}
      />
      <SliderField
        label="To Opacity"
        value={config.toOpacity}
        onChange={(v) => onChange({ ...config, toOpacity: v })}
        min={0}
        max={1}
        step={0.01}
      />
      <Checkbox
        size="xs"
        label="Animate"
        checked={config.animate}
        onChange={(e) => onChange({ ...config, animate: e.currentTarget.checked })}
      />
      {config.animate && (
        <SliderField
          label="Duration (s)"
          value={config.duration}
          onChange={(v) => onChange({ ...config, duration: v })}
          min={1}
          max={60}
        />
      )}
    </Stack>
  );
}

function GlowControls({
  config,
  onChange,
}: {
  config: LayerConfig;
  onChange: (c: LayerConfig) => void;
}) {
  return (
    <Stack gap="xs">
      <ColorInput
        size="xs"
        label="Color"
        value={config.color}
        onChange={(v) => onChange({ ...config, color: v })}
        swatches={SWATCHES}
        swatchesPerRow={7}
      />
      <SliderField
        label="Size"
        value={config.size}
        onChange={(v) => onChange({ ...config, size: v })}
        min={100}
        max={1200}
      />
      <SliderField
        label="Blur"
        value={config.blur}
        onChange={(v) => onChange({ ...config, blur: v })}
        min={20}
        max={300}
      />
      <SliderField
        label="Opacity"
        value={config.opacity}
        onChange={(v) => onChange({ ...config, opacity: v })}
        min={0}
        max={1}
        step={0.01}
      />
      <SliderField
        label="Top (%)"
        value={parseInt(config.top, 10) || 0}
        onChange={(v) => onChange({ ...config, top: `${v}%` })}
        min={0}
        max={100}
      />
      <SliderField
        label="Left (%)"
        value={parseInt(config.left, 10) || 0}
        onChange={(v) => onChange({ ...config, left: `${v}%` })}
        min={0}
        max={100}
      />
      <Checkbox
        size="xs"
        label="Animate"
        checked={config.animate}
        onChange={(e) => onChange({ ...config, animate: e.currentTarget.checked })}
      />
      {config.animate && (
        <SliderField
          label="Duration (s)"
          value={config.duration}
          onChange={(v) => onChange({ ...config, duration: v })}
          min={1}
          max={30}
        />
      )}
    </Stack>
  );
}

function DotGridControls({
  config,
  onChange,
}: {
  config: LayerConfig;
  onChange: (c: LayerConfig) => void;
}) {
  return (
    <Stack gap="xs">
      <ColorInput
        size="xs"
        label="Color"
        value={config.color}
        onChange={(v) => onChange({ ...config, color: v })}
        swatches={SWATCHES}
        swatchesPerRow={7}
      />
      <SliderField
        label="Opacity"
        value={config.opacity}
        onChange={(v) => onChange({ ...config, opacity: v })}
        min={0}
        max={1}
        step={0.01}
      />
      <SliderField
        label="Spacing"
        value={config.spacing}
        onChange={(v) => onChange({ ...config, spacing: v })}
        min={10}
        max={60}
      />
      <SliderField
        label="Dot Size"
        value={config.dotSize}
        onChange={(v) => onChange({ ...config, dotSize: v })}
        min={1}
        max={5}
      />
      <SegmentedControl
        size="xs"
        data={['none', 'radial', 'top', 'bottom', 'edges']}
        value={config.fade}
        onChange={(v) => onChange({ ...config, fade: v })}
      />
      <Checkbox
        size="xs"
        label="Animate"
        checked={config.animate}
        onChange={(e) => onChange({ ...config, animate: e.currentTarget.checked })}
      />
    </Stack>
  );
}

function NoiseControls({
  config,
  onChange,
}: {
  config: LayerConfig;
  onChange: (c: LayerConfig) => void;
}) {
  return (
    <Stack gap="xs">
      <SliderField
        label="Opacity"
        value={config.opacity}
        onChange={(v) => onChange({ ...config, opacity: v })}
        min={0}
        max={0.2}
        step={0.005}
      />
      <SliderField
        label="Grain"
        value={config.grain}
        onChange={(v) => onChange({ ...config, grain: v })}
        min={0.1}
        max={2}
        step={0.05}
      />
      <SegmentedControl
        size="xs"
        data={['fractalNoise', 'turbulence']}
        value={config.type}
        onChange={(v) => onChange({ ...config, type: v })}
      />
      <SliderField
        label="Octaves"
        value={config.octaves}
        onChange={(v) => onChange({ ...config, octaves: v })}
        min={1}
        max={8}
      />
      <NumberInput
        size="xs"
        label="Seed"
        value={config.seed}
        onChange={(v) => onChange({ ...config, seed: Number(v) || 0 })}
        min={0}
        max={999}
      />
    </Stack>
  );
}

function StarFieldControls({
  config,
  onChange,
}: {
  config: LayerConfig;
  onChange: (c: LayerConfig) => void;
}) {
  return (
    <Stack gap="xs">
      <SliderField
        label="Count"
        value={config.count}
        onChange={(v) => onChange({ ...config, count: v })}
        min={10}
        max={300}
      />
      <SliderField
        label="Opacity"
        value={config.opacity}
        onChange={(v) => onChange({ ...config, opacity: v })}
        min={0}
        max={1}
        step={0.01}
      />
      <SliderField
        label="Min Size"
        value={config.minSize}
        onChange={(v) => onChange({ ...config, minSize: v })}
        min={1}
        max={5}
      />
      <SliderField
        label="Max Size"
        value={config.maxSize}
        onChange={(v) => onChange({ ...config, maxSize: v })}
        min={1}
        max={8}
      />
      <Checkbox
        size="xs"
        label="Twinkle"
        checked={config.twinkle}
        onChange={(e) => onChange({ ...config, twinkle: e.currentTarget.checked })}
      />
      {config.twinkle && (
        <SliderField
          label="Duration (s)"
          value={config.duration}
          onChange={(v) => onChange({ ...config, duration: v })}
          min={1}
          max={10}
        />
      )}
    </Stack>
  );
}

function ShootingStarControls({
  config,
  onChange,
}: {
  config: LayerConfig;
  onChange: (c: LayerConfig) => void;
}) {
  return (
    <Stack gap="xs">
      <SliderField
        label="Count"
        value={config.count}
        onChange={(v) => onChange({ ...config, count: v })}
        min={1}
        max={20}
      />
      <ColorInput
        size="xs"
        label="Color"
        value={config.color}
        onChange={(v) => onChange({ ...config, color: v })}
        swatches={SWATCHES}
        swatchesPerRow={7}
      />
      <SliderField
        label="Speed"
        value={config.speed}
        onChange={(v) => onChange({ ...config, speed: v })}
        min={0.2}
        max={5}
        step={0.1}
      />
      <SliderField
        label="Trail Length"
        value={config.trailLength}
        onChange={(v) => onChange({ ...config, trailLength: v })}
        min={20}
        max={200}
      />
      <SliderField
        label="Angle (°)"
        value={config.angle}
        onChange={(v) => onChange({ ...config, angle: v })}
        min={0}
        max={360}
      />
      <SliderField
        label="Opacity"
        value={config.opacity}
        onChange={(v) => onChange({ ...config, opacity: v })}
        min={0}
        max={1}
        step={0.01}
      />
    </Stack>
  );
}

function SnowControls({
  config,
  onChange,
}: {
  config: LayerConfig;
  onChange: (c: LayerConfig) => void;
}) {
  return (
    <Stack gap="xs">
      <SliderField
        label="Count"
        value={config.count}
        onChange={(v) => onChange({ ...config, count: v })}
        min={10}
        max={80}
      />
      <SliderField
        label="Speed"
        value={config.speed}
        onChange={(v) => onChange({ ...config, speed: v })}
        min={0.2}
        max={3}
        step={0.1}
      />
      <SliderField
        label="Drift"
        value={config.drift}
        onChange={(v) => onChange({ ...config, drift: v })}
        min={0}
        max={80}
      />
      <SliderField
        label="Opacity"
        value={config.opacity}
        onChange={(v) => onChange({ ...config, opacity: v })}
        min={0}
        max={1}
        step={0.01}
      />
    </Stack>
  );
}

function AuroraControls({
  config,
  onChange,
}: {
  config: LayerConfig;
  onChange: (c: LayerConfig) => void;
}) {
  return (
    <Stack gap="xs">
      <SliderField
        label="Bands"
        value={config.bands}
        onChange={(v) => onChange({ ...config, bands: v })}
        min={1}
        max={6}
      />
      <SliderField
        label="Opacity"
        value={config.opacity}
        onChange={(v) => onChange({ ...config, opacity: v })}
        min={0}
        max={1}
        step={0.01}
      />
      <SliderField
        label="Blur"
        value={config.blur}
        onChange={(v) => onChange({ ...config, blur: v })}
        min={20}
        max={200}
      />
      <SliderField
        label="Duration (s)"
        value={config.duration}
        onChange={(v) => onChange({ ...config, duration: v })}
        min={2}
        max={30}
      />
      <SegmentedControl
        size="xs"
        data={['top', 'center', 'bottom']}
        value={config.position}
        onChange={(v) => onChange({ ...config, position: v })}
      />
    </Stack>
  );
}

function StarWarpControls({
  config,
  onChange,
}: {
  config: LayerConfig;
  onChange: (c: LayerConfig) => void;
}) {
  return (
    <Stack gap="xs">
      <SliderField
        label="Count"
        value={config.count}
        onChange={(v) => onChange({ ...config, count: v })}
        min={20}
        max={200}
      />
      <SliderField
        label="Speed"
        value={config.speed}
        onChange={(v) => onChange({ ...config, speed: v })}
        min={0.2}
        max={5}
        step={0.1}
      />
      <SegmentedControl
        size="xs"
        data={['in', 'out']}
        value={config.direction}
        onChange={(v) => onChange({ ...config, direction: v })}
      />
      <Checkbox
        size="xs"
        label="Trail"
        checked={config.trail}
        onChange={(e) => onChange({ ...config, trail: e.currentTarget.checked })}
      />
      <SliderField
        label="Opacity"
        value={config.opacity}
        onChange={(v) => onChange({ ...config, opacity: v })}
        min={0}
        max={1}
        step={0.01}
      />
    </Stack>
  );
}

function RainControls({
  config,
  onChange,
}: {
  config: LayerConfig;
  onChange: (c: LayerConfig) => void;
}) {
  return (
    <Stack gap="xs">
      <SliderField
        label="Count"
        value={config.count}
        onChange={(v) => onChange({ ...config, count: v })}
        min={10}
        max={200}
      />
      <ColorInput
        size="xs"
        label="Color"
        value={config.color}
        onChange={(v) => onChange({ ...config, color: v })}
        swatches={SWATCHES}
        swatchesPerRow={7}
      />
      <SliderField
        label="Angle (°)"
        value={config.angle}
        onChange={(v) => onChange({ ...config, angle: v })}
        min={-45}
        max={45}
      />
      <SliderField
        label="Speed"
        value={config.speed}
        onChange={(v) => onChange({ ...config, speed: v })}
        min={0.2}
        max={3}
        step={0.1}
      />
      <SliderField
        label="Min Length"
        value={config.minLength}
        onChange={(v) => onChange({ ...config, minLength: v })}
        min={2}
        max={30}
      />
      <SliderField
        label="Max Length"
        value={config.maxLength}
        onChange={(v) => onChange({ ...config, maxLength: v })}
        min={4}
        max={40}
      />
      <SliderField
        label="Thickness"
        value={config.thickness}
        onChange={(v) => onChange({ ...config, thickness: v })}
        min={0.5}
        max={4}
        step={0.5}
      />
      <SliderField
        label="Opacity"
        value={config.opacity}
        onChange={(v) => onChange({ ...config, opacity: v })}
        min={0}
        max={1}
        step={0.01}
      />
      <Checkbox
        size="xs"
        label="Splash"
        checked={config.splash}
        onChange={(e) => onChange({ ...config, splash: e.currentTarget.checked })}
      />
      {config.splash && (
        <SliderField
          label="Splash Count"
          value={config.splashCount}
          onChange={(v) => onChange({ ...config, splashCount: v })}
          min={0}
          max={80}
        />
      )}
    </Stack>
  );
}

function ConfettiControls({
  config,
  onChange,
}: {
  config: LayerConfig;
  onChange: (c: LayerConfig) => void;
}) {
  return (
    <Stack gap="xs">
      <SliderField
        label="Count"
        value={config.count}
        onChange={(v) => onChange({ ...config, count: v })}
        min={10}
        max={200}
      />
      <SliderField
        label="Duration (s)"
        value={config.duration}
        onChange={(v) => onChange({ ...config, duration: v })}
        min={1}
        max={10}
        step={0.5}
      />
      <SliderField
        label="Speed"
        value={config.speed}
        onChange={(v) => onChange({ ...config, speed: v })}
        min={0.2}
        max={3}
        step={0.1}
      />
      <SliderField
        label="Min Size"
        value={config.minSize}
        onChange={(v) => onChange({ ...config, minSize: v })}
        min={2}
        max={20}
      />
      <SliderField
        label="Max Size"
        value={config.maxSize}
        onChange={(v) => onChange({ ...config, maxSize: v })}
        min={4}
        max={30}
      />
      <SliderField
        label="Flutter"
        value={config.flutter}
        onChange={(v) => onChange({ ...config, flutter: v })}
        min={0}
        max={200}
      />
      <SliderField
        label="Opacity"
        value={config.opacity}
        onChange={(v) => onChange({ ...config, opacity: v })}
        min={0}
        max={1}
        step={0.01}
      />
    </Stack>
  );
}

function MeshControls({
  config,
  onChange,
}: {
  config: LayerConfig;
  onChange: (c: LayerConfig) => void;
}) {
  return (
    <Stack gap="xs">
      <SliderField
        label="Opacity"
        value={config.opacity}
        onChange={(v) => onChange({ ...config, opacity: v })}
        min={0}
        max={1}
        step={0.01}
      />
      <Checkbox
        size="xs"
        label="Animate"
        checked={config.animate}
        onChange={(e) => onChange({ ...config, animate: e.currentTarget.checked })}
      />
      {config.animate && (
        <SliderField
          label="Duration (s)"
          value={config.duration}
          onChange={(v) => onChange({ ...config, duration: v })}
          min={1}
          max={60}
        />
      )}
    </Stack>
  );
}

const controlsMap: Record<
  string,
  React.FC<{ config: LayerConfig; onChange: (c: LayerConfig) => void }>
> = {
  gradient: GradientControls,
  glow: GlowControls,
  dotGrid: DotGridControls,
  mesh: MeshControls,
  noise: NoiseControls,
  starField: StarFieldControls,
  shootingStar: ShootingStarControls,
  snow: SnowControls,
  aurora: AuroraControls,
  starWarp: StarWarpControls,
  rain: RainControls,
  confetti: ConfettiControls,
};

export default function FullscreenPage() {
  const { toggleColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('dark');
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const [layers, setLayers] = useState<Record<string, LayerConfig>>(() =>
    JSON.parse(JSON.stringify(defaultLayers))
  );
  const [panelOpen, setPanelOpen] = useState(true);
  const [expandedLayer, setExpandedLayer] = useState<string | null>(null);
  const [interactive, setInteractive] = useState(false);
  const [interactiveEasing, setInteractiveEasing] = useState(0.12);

  const updateLayer = (key: string, config: LayerConfig) => {
    setLayers((prev) => ({ ...prev, [key]: config }));
  };

  const toggleLayer = (key: string) => {
    setLayers((prev) => ({
      ...prev,
      [key]: { ...prev[key], enabled: !prev[key].enabled },
    }));
  };

  const g = layers.gradient;
  const gl = layers.glow;
  const dg = layers.dotGrid;
  const m = layers.mesh;
  const n = layers.noise;
  const sf = layers.starField;
  const ss = layers.shootingStar;
  const sn = layers.snow;
  const au = layers.aurora;
  const sw = layers.starWarp;
  const rn = layers.rain;
  const cf = layers.confetti;

  return (
    <>
      <Scene fullscreen zIndex={0} interactive={interactive} interactiveEasing={interactiveEasing}>
        {g.enabled && (
          <Scene.Gradient
            type={g.type}
            from={g.from}
            fromOpacity={g.fromOpacity}
            to={g.to}
            toOpacity={g.toOpacity}
            animate={g.animate}
            duration={g.duration}
          />
        )}
        {gl.enabled && (
          <Scene.Glow
            color={gl.color}
            size={gl.size}
            blur={gl.blur}
            opacity={gl.opacity}
            top={gl.top}
            left={gl.left}
            animate={gl.animate}
            duration={gl.duration}
          />
        )}
        {dg.enabled && (
          <Scene.DotGrid
            color={dg.color}
            opacity={dg.opacity}
            spacing={dg.spacing}
            dotSize={dg.dotSize}
            fade={dg.fade}
            animate={dg.animate}
            duration={dg.duration}
          />
        )}
        {m.enabled && (
          <Scene.Mesh
            stops={[
              { color: 'rgba(120, 0, 255, 0.08)', position: '10% 20%' },
              { color: 'rgba(255, 0, 128, 0.06)', position: '80% 30%' },
              { color: 'rgba(0, 200, 255, 0.05)', position: '50% 80%' },
            ]}
            opacity={m.opacity}
            animate={m.animate}
            duration={m.duration}
          />
        )}
        {n.enabled && (
          <Scene.Noise
            opacity={n.opacity}
            grain={n.grain}
            seed={n.seed}
            type={n.type}
            octaves={n.octaves}
          />
        )}
        {sf.enabled && (
          <Scene.StarField
            count={sf.count}
            twinkle={sf.twinkle}
            duration={sf.duration}
            opacity={sf.opacity}
            minSize={sf.minSize}
            maxSize={sf.maxSize}
          />
        )}
        {ss.enabled && (
          <Scene.ShootingStar
            count={ss.count}
            color={ss.color}
            trailLength={ss.trailLength}
            opacity={ss.opacity}
            speed={ss.speed}
            angle={ss.angle}
          />
        )}
        {sn.enabled && (
          <Scene.Snow count={sn.count} opacity={sn.opacity} speed={sn.speed} drift={sn.drift} />
        )}
        {au.enabled && (
          <Scene.Aurora
            bands={au.bands}
            opacity={au.opacity}
            blur={au.blur}
            duration={au.duration}
            position={au.position}
          />
        )}
        {sw.enabled && (
          <Scene.StarWarp
            count={sw.count}
            speed={sw.speed}
            direction={sw.direction}
            trail={sw.trail}
            opacity={sw.opacity}
          />
        )}
        {rn.enabled && (
          <Scene.Rain
            count={rn.count}
            color={rn.color}
            angle={rn.angle}
            speed={rn.speed}
            minLength={rn.minLength}
            maxLength={rn.maxLength}
            thickness={rn.thickness}
            opacity={rn.opacity}
            splash={rn.splash}
            splashCount={rn.splashCount}
          />
        )}
        {cf.enabled && (
          <Scene.Confetti
            count={cf.count}
            duration={cf.duration}
            speed={cf.speed}
            minSize={cf.minSize}
            maxSize={cf.maxSize}
            flutter={cf.flutter}
            opacity={cf.opacity}
          />
        )}
      </Scene>

      {/* Control Panel Toggle */}
      {!panelOpen && (
        <Tooltip label="Open controls">
          <ActionIcon
            variant="filled"
            color="dark"
            size="lg"
            onClick={() => setPanelOpen(true)}
            style={{
              position: 'fixed',
              top: 16,
              right: 16,
              zIndex: 1000,
              opacity: 0.8,
            }}
          >
            <IconAdjustments size={20} />
          </ActionIcon>
        </Tooltip>
      )}

      {/* Control Panel */}
      {panelOpen && (
        <Paper
          shadow="xl"
          radius="md"
          p="md"
          style={{
            position: 'fixed',
            top: 16,
            right: 16,
            zIndex: 1000,
            width: 280,
            maxHeight: 'calc(100vh - 32px)',
            background: 'var(--mantine-color-body)',
            opacity: 0.95,
            backdropFilter: 'blur(12px)',
            border: '1px solid var(--mantine-color-default-border)',
            display: 'flex',
            flexDirection: 'column',
            pointerEvents: 'auto',
          }}
        >
          <Group justify="space-between" mb="sm">
            <Text size="sm" fw={700}>
              Scene Playground
            </Text>
            <Group gap={4}>
              <Tooltip
                label={mounted && computedColorScheme === 'dark' ? 'Light mode' : 'Dark mode'}
              >
                <ActionIcon variant="subtle" color="gray" size="sm" onClick={toggleColorScheme}>
                  {mounted && computedColorScheme === 'dark' ? (
                    <IconSun size={14} />
                  ) : (
                    <IconMoon size={14} />
                  )}
                </ActionIcon>
              </Tooltip>
              <ActionIcon
                variant="subtle"
                color="gray"
                size="sm"
                onClick={() => setPanelOpen(false)}
              >
                <IconX size={14} />
              </ActionIcon>
            </Group>
          </Group>

          <Checkbox
            size="xs"
            label="Interactive (mouse tracking)"
            checked={interactive}
            onChange={(e) => setInteractive(e.currentTarget.checked)}
            mb={interactive ? 4 : 'sm'}
          />
          {interactive && (
            <Box mb="sm">
              <SliderField
                label="Easing"
                value={interactiveEasing}
                onChange={setInteractiveEasing}
                min={0.01}
                max={1}
                step={0.01}
              />
            </Box>
          )}

          <ScrollArea style={{ flex: 1 }} offsetScrollbars>
            <Stack gap={4}>
              {Object.keys(layerLabels).map((key) => {
                const isExpanded = expandedLayer === key;
                const Controls = controlsMap[key];
                return (
                  <Box key={key}>
                    <Group
                      gap="xs"
                      style={{ cursor: 'pointer' }}
                      onClick={() => setExpandedLayer(isExpanded ? null : key)}
                    >
                      <Checkbox
                        size="xs"
                        checked={layers[key].enabled}
                        onChange={(e) => {
                          e.stopPropagation();
                          toggleLayer(key);
                        }}
                        onClick={(e) => e.stopPropagation()}
                        styles={{ input: { cursor: 'pointer' } }}
                      />
                      <Text
                        size="xs"
                        fw={layers[key].enabled ? 600 : 400}
                        c={layers[key].enabled ? undefined : 'dimmed'}
                        style={{ flex: 1 }}
                      >
                        {layerLabels[key]}
                      </Text>
                      <Text size="xs" c="dimmed">
                        {isExpanded ? '▾' : '▸'}
                      </Text>
                    </Group>
                    {isExpanded && Controls && (
                      <Box
                        mt={6}
                        mb={8}
                        ml={28}
                        p="xs"
                        style={{
                          borderLeft: '2px solid var(--mantine-color-default-border)',
                        }}
                      >
                        <Controls config={layers[key]} onChange={(c) => updateLayer(key, c)} />
                      </Box>
                    )}
                  </Box>
                );
              })}
            </Stack>
          </ScrollArea>
        </Paper>
      )}

      {/* Center content */}
      <Box
        style={{
          position: 'relative',
          zIndex: 1,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'auto',
        }}
      >
        <Container size="sm" ta="center">
          <Title order={1} c="white" fw={800} fz={48}>
            Mantine Scene
          </Title>
          <Text c="dimmed" size="xl" mt="md" maw={500} mx="auto">
            Composable decorative backgrounds for React applications built with Mantine
          </Text>
          <Text c="dimmed" size="sm" mt="xl" maw={400} mx="auto">
            Use the control panel on the right to toggle layers, mix effects, and configure their
            properties in real time.
          </Text>
          <Anchor href="." c="blue.4" size="sm" mt="lg" style={{ display: 'inline-block' }}>
            &larr; Back to documentation
          </Anchor>
        </Container>
      </Box>
    </>
  );
}
