import React from 'react';
import { Scene } from '@gfazioli/mantine-scene';
import { Box } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const code = `
import { Scene } from '@gfazioli/mantine-scene';
import { Box } from '@mantine/core';

function Demo() {
  return (
    <Box pos="relative" h={300} bg="dark.9" style={{ borderRadius: 'var(--mantine-radius-md)', overflow: 'hidden' }}>
      <Scene>
        <Scene.DotGrid{{props}} />
      </Scene>
    </Box>
  );
}
`;

function Wrapper(props: any) {
  return (
    <Box
      pos="relative"
      h={300}
      bg="dark.9"
      style={{ borderRadius: 'var(--mantine-radius-md)', overflow: 'hidden' }}
    >
      <Scene>
        <Scene.DotGrid {...props} />
      </Scene>
    </Box>
  );
}

export const dotGridConfigurator: MantineDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  controls: [
    {
      type: 'color',
      prop: 'color',
      initialValue: 'gray',
      libraryValue: 'gray',
    },
    {
      type: 'number',
      prop: 'dotSize',
      initialValue: 1,
      libraryValue: 1,
      step: 0.5,
      min: 0.5,
      max: 10,
    },
    {
      type: 'number',
      prop: 'spacing',
      initialValue: 24,
      libraryValue: 24,
      step: 2,
      min: 4,
      max: 80,
    },
    {
      type: 'number',
      prop: 'opacity',
      initialValue: 1,
      libraryValue: 1,
      step: 0.05,
      min: 0,
      max: 1,
    },
  ],
};
