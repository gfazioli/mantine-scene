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
        <Scene.Mesh
          stops={[
            { color: 'rgba(120, 0, 255, 0.2)', position: '20% 20%', spread: 50 },
            { color: 'rgba(255, 0, 128, 0.15)', position: '80% 30%', spread: 45 },
            { color: 'rgba(0, 100, 255, 0.12)', position: '50% 80%', spread: 55 },
          ]}
        />
      </Scene>
      <Box pos="relative" style={{ zIndex: 1 }} p="xl">
        <Text size="xl" fw={700} c="white">Mesh Gradient</Text>
        <Text c="dimmed" mt="sm">Multi-point gradient using overlapping radial stops</Text>
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
        <Text c="dimmed" mt="sm">
          Multi-point gradient using overlapping radial stops
        </Text>
      </Box>
    </Box>
  );
}

export const mesh: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  defaultExpanded: false,
};
