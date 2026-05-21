import { Scene } from '@gfazioli/mantine-scene';
import { Box } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';
import React from 'react';

const code = `
import { Scene } from '@gfazioli/mantine-scene';
import { Box } from '@mantine/core';

function Demo() {
  return (
    <Box pos="relative" h={400} style={{ borderRadius: 'var(--mantine-radius-md)', overflow: 'hidden', background: 'var(--mantine-color-dark-9)' }}>
      <Scene>
        <Scene.Sparkles{{props}} />
      </Scene>
    </Box>
  );
}
`;

function Wrapper(props: any) {
  return (
    <Box
      pos="relative"
      h={400}
      style={{
        borderRadius: 'var(--mantine-radius-md)',
        overflow: 'hidden',
        background: 'var(--mantine-color-dark-9)',
      }}
    >
      <Scene>
        <Scene.Sparkles {...props} />
      </Scene>
    </Box>
  );
}

export const sparklesConfigurator: MantineDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  controls: [
    {
      type: 'number',
      prop: 'count',
      initialValue: 50,
      libraryValue: 50,
      step: 5,
      min: 5,
      max: 300,
    },
    {
      type: 'color',
      prop: 'color',
      initialValue: 'white',
      libraryValue: 'white',
    },
    {
      type: 'number',
      prop: 'minSize',
      initialValue: 1,
      libraryValue: 1,
      step: 1,
      min: 1,
      max: 10,
    },
    {
      type: 'number',
      prop: 'maxSize',
      initialValue: 3,
      libraryValue: 3,
      step: 1,
      min: 1,
      max: 15,
    },
    {
      type: 'number',
      prop: 'minDuration',
      initialValue: 1.5,
      libraryValue: 1.5,
      step: 0.1,
      min: 0.3,
      max: 10,
    },
    {
      type: 'number',
      prop: 'maxDuration',
      initialValue: 4,
      libraryValue: 4,
      step: 0.1,
      min: 0.5,
      max: 15,
    },
    {
      type: 'number',
      prop: 'opacity',
      initialValue: 0.9,
      libraryValue: 0.9,
      step: 0.05,
      min: 0,
      max: 1,
    },
    {
      type: 'number',
      prop: 'density',
      initialValue: 1,
      libraryValue: 1,
      step: 0.05,
      min: 0,
      max: 1,
    },
    {
      type: 'number',
      prop: 'seed',
      initialValue: 1,
      libraryValue: 1,
      step: 1,
      min: 1,
      max: 100,
    },
  ],
};
