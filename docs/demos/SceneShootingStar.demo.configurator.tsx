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
        <Scene.ShootingStar{{props}} />
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
        <Scene.ShootingStar {...props} />
      </Scene>
    </Box>
  );
}

export const shootingStarConfigurator: MantineDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  controls: [
    {
      type: 'number',
      prop: 'count',
      initialValue: 3,
      libraryValue: 3,
      step: 1,
      min: 1,
      max: 8,
    },
    {
      type: 'color',
      prop: 'color',
      initialValue: 'white',
      libraryValue: 'white',
    },
    {
      type: 'number',
      prop: 'trailLength',
      initialValue: 80,
      libraryValue: 80,
      step: 10,
      min: 20,
      max: 200,
    },
    {
      type: 'number',
      prop: 'angle',
      initialValue: 215,
      libraryValue: 215,
      step: 5,
      min: 0,
      max: 360,
    },
    {
      type: 'number',
      prop: 'speed',
      initialValue: 1,
      libraryValue: 1,
      step: 0.1,
      min: 0.3,
      max: 3,
    },
    {
      type: 'number',
      prop: 'minInterval',
      initialValue: 3,
      libraryValue: 3,
      step: 0.5,
      min: 0.5,
      max: 10,
    },
    {
      type: 'number',
      prop: 'maxInterval',
      initialValue: 8,
      libraryValue: 8,
      step: 0.5,
      min: 2,
      max: 20,
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
      initialValue: 0.8,
      libraryValue: 0.8,
      step: 0.05,
      min: 0,
      max: 1,
    },
  ],
};
