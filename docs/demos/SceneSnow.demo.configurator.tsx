import React from 'react';
import { Scene } from '@gfazioli/mantine-scene';
import { Box } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const code = `
import { Scene } from '@gfazioli/mantine-scene';
import { Box } from '@mantine/core';

function Demo() {
  return (
    <Box pos="relative" h={300} style={{ borderRadius: 'var(--mantine-radius-md)', overflow: 'hidden', background: 'var(--mantine-color-body)' }}>
      <Scene>
        <Scene.Snow{{props}} />
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
      style={{
        borderRadius: 'var(--mantine-radius-md)',
        overflow: 'hidden',
        background: 'var(--mantine-color-body)',
      }}
    >
      <Scene>
        <Scene.Snow {...props} />
      </Scene>
    </Box>
  );
}

export const snowConfigurator: MantineDemo = {
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
      max: 80,
    },
    {
      type: 'color',
      prop: 'color',
      initialValue: 'gray',
      libraryValue: 'white',
    },
    {
      type: 'number',
      prop: 'minSize',
      initialValue: 2,
      libraryValue: 2,
      step: 1,
      min: 1,
      max: 8,
    },
    {
      type: 'number',
      prop: 'maxSize',
      initialValue: 6,
      libraryValue: 6,
      step: 1,
      min: 2,
      max: 12,
    },
    {
      type: 'number',
      prop: 'speed',
      initialValue: 1,
      libraryValue: 1,
      step: 0.1,
      min: 0.2,
      max: 3,
    },
    {
      type: 'number',
      prop: 'drift',
      initialValue: 30,
      libraryValue: 30,
      step: 5,
      min: 0,
      max: 100,
    },
    {
      type: 'number',
      prop: 'wind',
      initialValue: 0,
      libraryValue: 0,
      step: 0.1,
      min: -1,
      max: 1,
    },
    {
      type: 'number',
      prop: 'opacity',
      initialValue: 0.8,
      libraryValue: 0.8,
      step: 0.05,
      min: 0,
      max: 1,
    },
  ],
};
