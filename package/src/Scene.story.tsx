import React, { useState } from 'react';
import { Box, Button, Code, Group, Paper, Stack, Text } from '@mantine/core';
import { Scene } from './Scene';

export default {
  title: 'Components/Scene',
};

export function Fullscreen() {
  return (
    <Scene fullscreen>
      <Scene.Gradient
        type="radial"
        position="center top"
        colors={['rgba(120, 0, 255, 0.12) 0%', 'rgba(255, 0, 128, 0.06) 40%', 'transparent 70%']}
      />
      <Scene.Glow
        color="rgba(120, 0, 255, 0.2)"
        size={600}
        blur={150}
        opacity={0.4}
        top="15%"
        left="25%"
      />
      <Scene.Glow
        color="rgba(255, 0, 128, 0.15)"
        size={500}
        blur={140}
        opacity={0.35}
        top="10%"
        left="75%"
        driftX="-40px"
        driftY="30px"
      />
      <Scene.Noise opacity={0.025} grain={0.7} />
    </Scene>
  );
}

export function Contained() {
  return (
    <Stack gap="xl" p="md">
      <Text fw={500}>Scene as contained box (Card-like)</Text>

      <Paper p={0} withBorder style={{ overflow: 'hidden' }}>
        <Box pos="relative" h={300}>
          <Scene>
            <Scene.Gradient
              type="linear"
              angle={135}
              colors={['rgba(120, 0, 255, 0.2) 0%', 'rgba(255, 0, 128, 0.15) 100%']}
            />
            <Scene.DotGrid color="rgba(255, 255, 255, 0.08)" spacing={20} />
            <Scene.Noise opacity={0.03} />
          </Scene>
          <Box pos="relative" style={{ zIndex: 1 }} p="xl">
            <Text size="xl" fw={700} c="white">
              Content on top of Scene
            </Text>
            <Text c="dimmed" mt="sm">
              The Scene acts as a decorative background layer
            </Text>
          </Box>
        </Box>
      </Paper>
    </Stack>
  );
}

export function GradientVariants() {
  return (
    <Stack gap="xl" p="md">
      <Text fw={500}>Gradient types</Text>

      {(['radial', 'linear', 'conic'] as const).map((type) => (
        <Paper key={type} p={0} withBorder style={{ overflow: 'hidden' }}>
          <Box pos="relative" h={200} bg="dark.9">
            <Scene>
              <Scene.Gradient
                type={type}
                colors={[
                  'rgba(120, 0, 255, 0.3) 0%',
                  'rgba(255, 0, 128, 0.2) 50%',
                  'transparent 100%',
                ]}
                angle={type === 'linear' ? 45 : undefined}
              />
            </Scene>
            <Box pos="relative" style={{ zIndex: 1 }} p="md">
              <Text c="white" tt="capitalize">
                {type}
              </Text>
            </Box>
          </Box>
        </Paper>
      ))}
    </Stack>
  );
}

export function GlowBlobs() {
  return (
    <Box pos="relative" h={400} bg="dark.9">
      <Scene>
        <Scene.Glow color="rgba(120, 0, 255, 0.3)" size={300} top="30%" left="20%" duration={8} />
        <Scene.Glow color="rgba(255, 0, 128, 0.25)" size={250} top="50%" left="70%" duration={10} />
        <Scene.Glow color="rgba(255, 200, 0, 0.2)" size={200} top="70%" left="40%" duration={12} />
      </Scene>
      <Box pos="relative" style={{ zIndex: 1 }} p="xl">
        <Text size="xl" fw={700} c="white">
          Animated Glow Blobs
        </Text>
      </Box>
    </Box>
  );
}

export function DotGridPattern() {
  return (
    <Stack gap="xl" p="md">
      <Box pos="relative" h={300} bg="dark.9">
        <Scene>
          <Scene.DotGrid color="rgba(255, 255, 255, 0.1)" dotSize={1} spacing={24} />
        </Scene>
        <Box pos="relative" style={{ zIndex: 1 }} p="xl">
          <Text c="white">Default dot grid</Text>
        </Box>
      </Box>

      <Box pos="relative" h={300} bg="dark.9">
        <Scene>
          <Scene.DotGrid color="rgba(100, 150, 255, 0.2)" dotSize={2} spacing={16} />
        </Scene>
        <Box pos="relative" style={{ zIndex: 1 }} p="xl">
          <Text c="white">Dense blue dots</Text>
        </Box>
      </Box>
    </Stack>
  );
}

export function MeshGradient() {
  return (
    <Box pos="relative" h={400} bg="dark.9">
      <Scene>
        <Scene.Mesh
          stops={[
            { color: 'rgba(120, 0, 255, 0.2)', position: '20% 20%', spread: 50 },
            { color: 'rgba(255, 0, 128, 0.15)', position: '80% 30%', spread: 45 },
            { color: 'rgba(0, 100, 255, 0.12)', position: '50% 80%', spread: 55 },
          ]}
        />
      </Scene>
      <Box pos="relative" style={{ zIndex: 1 }} p="xl">
        <Text size="xl" fw={700} c="white">
          Mesh Gradient
        </Text>
      </Box>
    </Box>
  );
}

export function NoiseTexture() {
  return (
    <Stack gap="xl" p="md">
      {[0.02, 0.05, 0.1].map((opacity) => (
        <Box key={opacity} pos="relative" h={200} bg="dark.9">
          <Scene>
            <Scene.Noise opacity={opacity} grain={0.65} />
          </Scene>
          <Box pos="relative" style={{ zIndex: 1 }} p="md">
            <Text c="white">Noise opacity: {opacity}</Text>
          </Box>
        </Box>
      ))}
    </Stack>
  );
}

export function CombinedEffects() {
  return (
    <Box pos="relative" h={500} bg="dark.9">
      <Scene>
        <Scene.DotGrid color="rgba(255, 255, 255, 0.05)" spacing={28} />
        <Scene.Mesh
          stops={[
            { color: 'rgba(0, 120, 255, 0.1)', position: '15% 20%', spread: 45 },
            { color: 'rgba(0, 200, 150, 0.08)', position: '85% 40%', spread: 40 },
            { color: 'rgba(80, 0, 200, 0.06)', position: '50% 80%', spread: 50 },
          ]}
        />
        <Scene.Gradient
          type="linear"
          angle={180}
          colors={['transparent 0%', 'rgba(0, 0, 0, 0.4) 100%']}
        />
        <Scene.Glow color="rgba(0, 150, 255, 0.15)" size={500} top="20%" left="30%" duration={10} />
        <Scene.Glow color="rgba(0, 200, 150, 0.1)" size={400} top="60%" left="70%" duration={14} />
        <Scene.Noise opacity={0.02} grain={0.65} />
      </Scene>
      <Box pos="relative" style={{ zIndex: 1 }} p="xl">
        <Text size="xl" fw={700} c="white">
          All effects combined
        </Text>
        <Text c="dimmed" mt="sm">
          DotGrid + Mesh + Gradient + Glow + Noise
        </Text>
      </Box>
    </Box>
  );
}

export function Rain() {
  return (
    <Stack gap="xl" p="md">
      <Text fw={500}>Scene.Rain — animated rain effect</Text>

      <Box pos="relative" h={300} bg="dark.9">
        <Scene>
          <Scene.Gradient
            type="linear"
            angle={180}
            colors={['rgba(20, 30, 60, 0.6) 0%', 'rgba(0, 0, 0, 0.8) 100%']}
          />
          <Scene.Rain count={80} color="blue" angle={15} opacity={0.6} />
        </Scene>
        <Box pos="relative" style={{ zIndex: 1 }} p="xl">
          <Text c="white">Default rain (angle 15°, blue)</Text>
        </Box>
      </Box>

      <Box pos="relative" h={300} bg="dark.9">
        <Scene>
          <Scene.Rain count={120} color="cyan" angle={-25} speed={1.5} splash splashCount={30} />
        </Scene>
        <Box pos="relative" style={{ zIndex: 1 }} p="xl">
          <Text c="white">Heavier rain with wind & splash (angle -25°)</Text>
        </Box>
      </Box>

      <Box pos="relative" h={300} bg="dark.9">
        <Scene>
          <Scene.Glow color="rgba(255, 255, 255, 0.4)" size={600} blur={200} top="20%" left="50%" />
          <Scene.Rain count={150} color="white" angle={10} thickness={1.5} splash />
        </Scene>
        <Box pos="relative" style={{ zIndex: 1 }} p="xl">
          <Text c="white">Lightning + rain combo (Rain + Glow)</Text>
        </Box>
      </Box>
    </Stack>
  );
}

export function Confetti() {
  const [bursts, setBursts] = useState(0);
  const [completed, setCompleted] = useState(0);

  return (
    <Stack gap="xl" p="md">
      <Text fw={500}>Scene.Confetti — celebratory animation</Text>

      <Box pos="relative" h={300} bg="dark.9">
        <Scene>
          <Scene.Confetti count={100} />
        </Scene>
        <Box pos="relative" style={{ zIndex: 1 }} p="xl">
          <Text c="white">Continuous mode (default)</Text>
        </Box>
      </Box>

      <Paper p="md" withBorder>
        <Group justify="space-between" mb="md">
          <Text fw={500}>Burst mode with onComplete</Text>
          <Group gap="xs">
            <Code>bursts triggered: {bursts}</Code>
            <Code>completed: {completed}</Code>
            <Button onClick={() => setBursts((n) => n + 1)}>Trigger burst</Button>
          </Group>
        </Group>

        <Box pos="relative" h={300} bg="dark.9">
          <Scene>
            {bursts > 0 && (
              <Scene.Confetti
                key={bursts}
                count={120}
                burst
                duration={3.5}
                onComplete={() => setCompleted((n) => n + 1)}
              />
            )}
          </Scene>
          <Box pos="relative" style={{ zIndex: 1 }} p="xl">
            <Text c="white">
              Click "Trigger burst" — onComplete fires when all confetti settles
            </Text>
          </Box>
        </Box>
      </Paper>

      <Box pos="relative" h={300} bg="dark.9">
        <Scene>
          <Scene.Confetti
            count={80}
            colors={['cyan', 'violet', 'pink']}
            shapes={['rectangle']}
            minSize={4}
            maxSize={8}
            flutter={120}
            duration={5}
          />
        </Scene>
        <Box pos="relative" style={{ zIndex: 1 }} p="xl">
          <Text c="white">Custom palette + rectangles only + wide flutter</Text>
        </Box>
      </Box>
    </Stack>
  );
}

export function LazyMode() {
  return (
    <Stack gap="xl" p="md">
      <Text fw={500}>
        Scene <Code>lazy</Code> prop — pauses animations when scrolled out of view
      </Text>
      <Text size="sm" c="dimmed">
        Open DevTools → Performance to verify the rAF loop / animations stop while the scene is
        off-screen. Scroll the page up/down to enter and leave the viewport.
      </Text>

      <Box h={1200} />

      <Paper p={0} withBorder style={{ overflow: 'hidden' }}>
        <Box pos="relative" h={400} bg="dark.9">
          <Scene lazy interactive>
            <Scene.Gradient
              type="radial"
              colors={['rgba(120, 0, 255, 0.3) 0%', 'transparent 70%']}
            />
            <Scene.Snow count={60} />
            <Scene.StarField count={120} />
            <Scene.Glow color="violet" size={400} blur={140} top="50%" left="50%" />
          </Scene>
          <Box pos="relative" style={{ zIndex: 1 }} p="xl">
            <Text c="white">lazy + interactive scene with Snow, StarField, Glow</Text>
            <Text c="dimmed" size="sm" mt="xs">
              Scroll out → animations pause, mouse rAF loop stops. Scroll in → they resume.
            </Text>
          </Box>
        </Box>
      </Paper>

      <Box h={1200} />
    </Stack>
  );
}

export function MousePositionCallback() {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  return (
    <Stack gap="xl" p="md">
      <Text fw={500}>
        Scene <Code>onMousePosition</Code> — coordinate external UI with cursor tracking
      </Text>

      <Group>
        <Code>x: {pos ? pos.x.toFixed(1) : '—'}</Code>
        <Code>y: {pos ? pos.y.toFixed(1) : '—'}</Code>
      </Group>

      <Paper p={0} withBorder style={{ overflow: 'hidden' }}>
        <Box pos="relative" h={400} bg="dark.9">
          <Scene interactive onMousePosition={setPos}>
            <Scene.Gradient
              type="radial"
              colors={['rgba(0, 200, 255, 0.2) 0%', 'transparent 70%']}
            />
            <Scene.Glow color="cyan" size={300} blur={120} top="50%" left="50%" />
          </Scene>
          <Box pos="relative" style={{ zIndex: 1 }} p="xl">
            <Text c="white">Move the cursor inside the scene</Text>
          </Box>
        </Box>
      </Paper>
    </Stack>
  );
}
