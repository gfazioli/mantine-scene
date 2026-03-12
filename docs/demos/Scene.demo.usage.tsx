import React from 'react';
import { Scene } from '@gfazioli/mantine-scene';
import { Box, Text } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const code = `
import { Box, Text } from '@mantine/core';
import { Scene } from '@gfazioli/mantine-scene';

function Demo() {
  return (
    <Box pos="relative" h={300} bg="dark.9" style={{ borderRadius: 'var(--mantine-radius-md)', overflow: 'hidden' }}>
      <Scene>
        <Scene.Gradient
          type="radial"
          position="center top"
          colors={['rgba(120, 0, 255, 0.15) 0%', 'rgba(255, 0, 128, 0.08) 50%', 'transparent 70%']}
        />
        <Scene.Glow color="rgba(120, 0, 255, 0.2)" size={400} blur={120} top="20%" left="30%" />
        <Scene.DotGrid color="rgba(255, 255, 255, 0.06)" spacing={24} />
        <Scene.Noise opacity={0.025} />
      </Scene>
      <Box pos="relative" style={{ zIndex: 1 }} p="xl">
        <Text size="xl" fw={700} c="white">Decorative background</Text>
        <Text c="dimmed" mt="sm">Scene renders behind your content</Text>
      </Box>
    </Box>
  );
}
`;

function Demo() {
  return (
    <Box
      pos="relative"
      h={300}
      bg="dark.9"
      style={{ borderRadius: 'var(--mantine-radius-md)', overflow: 'hidden' }}
    >
      <Scene>
        <Scene.Gradient
          type="radial"
          position="center top"
          colors={['rgba(120, 0, 255, 0.15) 0%', 'rgba(255, 0, 128, 0.08) 50%', 'transparent 70%']}
        />
        <Scene.Glow color="rgba(120, 0, 255, 0.2)" size={400} blur={120} top="20%" left="30%" />
        <Scene.DotGrid color="rgba(255, 255, 255, 0.06)" spacing={24} />
        <Scene.Noise opacity={0.025} />
      </Scene>
      <Box pos="relative" style={{ zIndex: 1 }} p="xl">
        <Text size="xl" fw={700} c="white">
          Decorative background
        </Text>
        <Text c="dimmed" mt="sm">
          Scene renders behind your content
        </Text>
      </Box>
    </Box>
  );
}

export const usage: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  defaultExpanded: true,
};
