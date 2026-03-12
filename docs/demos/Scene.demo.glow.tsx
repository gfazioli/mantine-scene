import React from 'react';
import { Scene } from '@gfazioli/mantine-scene';
import { Box, Text } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const code = `
import { Box, Text } from '@mantine/core';
import { Scene } from '@gfazioli/mantine-scene';

function Demo() {
  return (
    <Box pos="relative" h={350} bg="dark.9" style={{ borderRadius: 'var(--mantine-radius-md)', overflow: 'hidden' }}>
      <Scene>
        <Scene.Glow color="rgba(120, 0, 255, 0.3)" size={300} top="30%" left="20%" duration={8} />
        <Scene.Glow color="rgba(255, 0, 128, 0.25)" size={250} top="50%" left="70%" duration={10} />
        <Scene.Glow color="rgba(255, 200, 0, 0.2)" size={200} top="70%" left="40%" duration={12} />
      </Scene>
      <Box pos="relative" style={{ zIndex: 1 }} p="xl">
        <Text size="xl" fw={700} c="white">Animated Glow Blobs</Text>
        <Text c="dimmed" mt="sm">Each blob floats independently with configurable drift and duration</Text>
      </Box>
    </Box>
  );
}
`;

function Demo() {
  return (
    <Box
      pos="relative"
      h={350}
      bg="dark.9"
      style={{ borderRadius: 'var(--mantine-radius-md)', overflow: 'hidden' }}
    >
      <Scene>
        <Scene.Glow color="rgba(120, 0, 255, 0.3)" size={300} top="30%" left="20%" duration={8} />
        <Scene.Glow color="rgba(255, 0, 128, 0.25)" size={250} top="50%" left="70%" duration={10} />
        <Scene.Glow color="rgba(255, 200, 0, 0.2)" size={200} top="70%" left="40%" duration={12} />
      </Scene>
      <Box pos="relative" style={{ zIndex: 1 }} p="xl">
        <Text size="xl" fw={700} c="white">
          Animated Glow Blobs
        </Text>
        <Text c="dimmed" mt="sm">
          Each blob floats independently with configurable drift and duration
        </Text>
      </Box>
    </Box>
  );
}

export const glow: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  defaultExpanded: false,
};
