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
        <Scene.StarField{{props}} />
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
        <Scene.StarField {...props} />
      </Scene>
    </Box>
  );
}

export const starFieldConfigurator: MantineDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  controls: [
    {
      type: 'number',
      prop: 'count',
      initialValue: 100,
      libraryValue: 100,
      step: 10,
      min: 10,
      max: 300,
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
      initialValue: 1,
      libraryValue: 1,
      step: 0.5,
      min: 0.5,
      max: 5,
    },
    {
      type: 'number',
      prop: 'maxSize',
      initialValue: 3,
      libraryValue: 3,
      step: 0.5,
      min: 1,
      max: 8,
    },
    {
      type: 'boolean',
      prop: 'twinkle',
      initialValue: true,
      libraryValue: true,
    },
    {
      type: 'number',
      prop: 'duration',
      initialValue: 3,
      libraryValue: 3,
      step: 0.5,
      min: 0.5,
      max: 10,
    },
    {
      type: 'number',
      prop: 'seed',
      initialValue: 42,
      libraryValue: 42,
      step: 1,
      min: 0,
      max: 200,
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
