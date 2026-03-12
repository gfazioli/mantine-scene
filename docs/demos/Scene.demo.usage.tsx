import React from 'react';
import { Scene } from '@gfazioli/mantine-scene';
import { Box, Text } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const code = `
import { Box, Text } from '@mantine/core';
import { Scene } from '@gfazioli/mantine-scene';

function Demo() {
  return (
    <Box pos="relative" h={300} style={{ borderRadius: 'var(--mantine-radius-md)', overflow: 'hidden', background: 'var(--mantine-color-body)' }}>
      <Scene>
        <Scene.Gradient from="violet" fromOpacity={0.15}{{props}} />
        <Scene.Glow color="violet" size={400} blur={120} opacity={0.3} top="20%" left="30%" />
        <Scene.DotGrid color="gray" opacity={0.3} spacing={24} />
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

function Wrapper({ showGlow, showDotGrid, showNoise, ...props }: any) {
  return (
    <Box
      pos="relative"
      h={300}
      style={{
        borderRadius: 'var(--mantine-radius-md)',
        overflow: 'hidden',
        background: 'var(--mantine-color-body)',
      }}
    >
      <Scene>
        <Scene.Gradient from="violet" fromOpacity={0.15} {...props} />
        {showGlow && (
          <Scene.Glow color="violet" size={400} blur={120} opacity={0.3} top="20%" left="30%" />
        )}
        {showDotGrid && <Scene.DotGrid color="gray" opacity={0.3} spacing={24} />}
        {showNoise && <Scene.Noise opacity={0.025} />}
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
  type: 'configurator',
  component: Wrapper,
  code,
  controls: [
    {
      type: 'boolean',
      prop: 'showGlow',
      initialValue: true,
      libraryValue: true,
    },
    {
      type: 'boolean',
      prop: 'showDotGrid',
      initialValue: true,
      libraryValue: true,
    },
    {
      type: 'boolean',
      prop: 'showNoise',
      initialValue: true,
      libraryValue: true,
    },
    {
      type: 'boolean',
      prop: 'fullscreen',
      initialValue: false,
      libraryValue: false,
    },
    {
      type: 'boolean',
      prop: 'interactive',
      initialValue: false,
      libraryValue: false,
    },
  ],
};
