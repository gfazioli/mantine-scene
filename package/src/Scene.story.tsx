import React from 'react';
import { Box, Paper, Stack, Text } from '@mantine/core';
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
