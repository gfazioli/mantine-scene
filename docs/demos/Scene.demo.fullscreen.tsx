import React from 'react';
import { Scene } from '@gfazioli/mantine-scene';
import { Box, Text } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const code = `
import { Scene } from '@gfazioli/mantine-scene';

function Demo() {
  return (
    <Scene fullscreen>
      <Scene.Gradient
        type="radial"
        position="center top"
        colors={[
          'rgba(120, 0, 255, 0.12) 0%',
          'rgba(255, 0, 128, 0.06) 40%',
          'transparent 70%',
        ]}
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
      />
      <Scene.Noise opacity={0.025} grain={0.7} />
    </Scene>
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
        />
        <Scene.Noise opacity={0.025} grain={0.7} />
      </Scene>
      <Box pos="relative" style={{ zIndex: 1 }} p="xl">
        <Text c="white" fw={600}>
          Fullscreen preview (contained here for demo purposes)
        </Text>
        <Text c="dimmed" size="sm" mt="xs">
          In production, use the fullscreen prop to cover the entire viewport
        </Text>
      </Box>
    </Box>
  );
}

export const fullscreen: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  defaultExpanded: false,
};
