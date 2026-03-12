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
      {[0.02, 0.05, 0.1].map((opacity) => (
        <Box key={opacity} pos="relative" h={180} bg="dark.9" style={{ borderRadius: 'var(--mantine-radius-md)', overflow: 'hidden' }}>
          <Scene>
            <Scene.Noise opacity={opacity} grain={0.65} />
          </Scene>
          <Box pos="relative" style={{ zIndex: 1 }} p="md">
            <Text c="white" size="sm">opacity: {opacity}</Text>
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
      {[0.02, 0.05, 0.1].map((opacity) => (
        <Box
          key={opacity}
          pos="relative"
          h={180}
          bg="dark.9"
          style={{ borderRadius: 'var(--mantine-radius-md)', overflow: 'hidden' }}
        >
          <Scene>
            <Scene.Noise opacity={opacity} grain={0.65} />
          </Scene>
          <Box pos="relative" style={{ zIndex: 1 }} p="md">
            <Text c="white" size="sm">
              opacity: {opacity}
            </Text>
          </Box>
        </Box>
      ))}
    </SimpleGrid>
  );
}

export const noise: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  defaultExpanded: false,
};
