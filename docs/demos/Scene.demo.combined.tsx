import React from 'react';
import { Scene } from '@gfazioli/mantine-scene';
import { Box, Text } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const code = `
import { Box, Text } from '@mantine/core';
import { Scene } from '@gfazioli/mantine-scene';

function Demo() {
  return (
    <Box pos="relative" h={400} bg="dark.9" style={{ borderRadius: 'var(--mantine-radius-md)', overflow: 'hidden' }}>
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
        <Text size="xl" fw={700} c="white">All effects combined</Text>
        <Text c="dimmed" mt="sm">DotGrid + Mesh + Gradient + Glow + Noise</Text>
      </Box>
    </Box>
  );
}
`;

function Demo() {
  return (
    <Box
      pos="relative"
      h={400}
      bg="dark.9"
      style={{ borderRadius: 'var(--mantine-radius-md)', overflow: 'hidden' }}
    >
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

export const combined: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  defaultExpanded: false,
};
