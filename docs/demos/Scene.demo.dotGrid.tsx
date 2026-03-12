import React from 'react';
import { Scene } from '@gfazioli/mantine-scene';
import { Box, SimpleGrid, Text } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const code = `
import { Box, SimpleGrid, Text } from '@mantine/core';
import { Scene } from '@gfazioli/mantine-scene';

function Demo() {
  return (
    <SimpleGrid cols={2}>
      <Box pos="relative" h={200} bg="dark.9" style={{ borderRadius: 'var(--mantine-radius-md)', overflow: 'hidden' }}>
        <Scene>
          <Scene.DotGrid color="rgba(255, 255, 255, 0.1)" dotSize={1} spacing={24} />
        </Scene>
        <Box pos="relative" style={{ zIndex: 1 }} p="md">
          <Text c="white" size="sm">Default dots</Text>
        </Box>
      </Box>
      <Box pos="relative" h={200} bg="dark.9" style={{ borderRadius: 'var(--mantine-radius-md)', overflow: 'hidden' }}>
        <Scene>
          <Scene.DotGrid color="rgba(100, 150, 255, 0.2)" dotSize={2} spacing={16} />
        </Scene>
        <Box pos="relative" style={{ zIndex: 1 }} p="md">
          <Text c="white" size="sm">Dense blue dots</Text>
        </Box>
      </Box>
    </SimpleGrid>
  );
}
`;

function Demo() {
  return (
    <SimpleGrid cols={2}>
      <Box
        pos="relative"
        h={200}
        bg="dark.9"
        style={{ borderRadius: 'var(--mantine-radius-md)', overflow: 'hidden' }}
      >
        <Scene>
          <Scene.DotGrid color="rgba(255, 255, 255, 0.1)" dotSize={1} spacing={24} />
        </Scene>
        <Box pos="relative" style={{ zIndex: 1 }} p="md">
          <Text c="white" size="sm">
            Default dots
          </Text>
        </Box>
      </Box>
      <Box
        pos="relative"
        h={200}
        bg="dark.9"
        style={{ borderRadius: 'var(--mantine-radius-md)', overflow: 'hidden' }}
      >
        <Scene>
          <Scene.DotGrid color="rgba(100, 150, 255, 0.2)" dotSize={2} spacing={16} />
        </Scene>
        <Box pos="relative" style={{ zIndex: 1 }} p="md">
          <Text c="white" size="sm">
            Dense blue dots
          </Text>
        </Box>
      </Box>
    </SimpleGrid>
  );
}

export const dotGrid: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  defaultExpanded: false,
};
