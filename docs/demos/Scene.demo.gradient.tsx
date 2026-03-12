import React from 'react';
import { Scene } from '@gfazioli/mantine-scene';
import { Box, SimpleGrid, Text } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const code = `
import { Box, SimpleGrid, Text } from '@mantine/core';
import { Scene } from '@gfazioli/mantine-scene';

function Demo() {
  return (
    <SimpleGrid cols={3}>
      {(['radial', 'linear', 'conic'] as const).map((type) => (
        <Box key={type} pos="relative" h={180} bg="dark.9" style={{ borderRadius: 'var(--mantine-radius-md)', overflow: 'hidden' }}>
          <Scene>
            <Scene.Gradient
              type={type}
              colors={['rgba(120, 0, 255, 0.3) 0%', 'rgba(255, 0, 128, 0.2) 50%', 'transparent 100%']}
              angle={type === 'linear' ? 135 : undefined}
            />
          </Scene>
          <Box pos="relative" style={{ zIndex: 1 }} p="md">
            <Text c="white" fw={600} tt="capitalize">{type}</Text>
          </Box>
        </Box>
      ))}
    </SimpleGrid>
  );
}
`;

function Demo() {
  return (
    <SimpleGrid cols={3}>
      {(['radial', 'linear', 'conic'] as const).map((type) => (
        <Box
          key={type}
          pos="relative"
          h={180}
          bg="dark.9"
          style={{ borderRadius: 'var(--mantine-radius-md)', overflow: 'hidden' }}
        >
          <Scene>
            <Scene.Gradient
              type={type}
              colors={[
                'rgba(120, 0, 255, 0.3) 0%',
                'rgba(255, 0, 128, 0.2) 50%',
                'transparent 100%',
              ]}
              angle={type === 'linear' ? 135 : undefined}
            />
          </Scene>
          <Box pos="relative" style={{ zIndex: 1 }} p="md">
            <Text c="white" fw={600} tt="capitalize">
              {type}
            </Text>
          </Box>
        </Box>
      ))}
    </SimpleGrid>
  );
}

export const gradient: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  defaultExpanded: false,
};
