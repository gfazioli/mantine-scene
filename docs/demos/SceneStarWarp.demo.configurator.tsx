import React from 'react';
import { Scene } from '@gfazioli/mantine-scene';
import { Box } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const code = `
import { Scene } from '@gfazioli/mantine-scene';
import { Box } from '@mantine/core';

function Demo() {
  return (
    <Box pos="relative" h={400} style={{ borderRadius: 'var(--mantine-radius-md)', overflow: 'hidden', background: 'var(--mantine-color-body)' }}>
      <Scene>
        <Scene.StarWarp{{props}} />
      </Scene>
    </Box>
  );
}
`;

function Wrapper({ focalX, focalY, ...props }: any) {
  return (
    <Box
      pos="relative"
      h={400}
      style={{
        borderRadius: 'var(--mantine-radius-md)',
        overflow: 'hidden',
        background: 'var(--mantine-color-body)',
      }}
    >
      <Scene>
        <Scene.StarWarp focalX={`${focalX}%`} focalY={`${focalY}%`} {...props} />
      </Scene>
    </Box>
  );
}

export const starWarpConfigurator: MantineDemo = {
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
      max: 200,
    },
    {
      type: 'number',
      prop: 'speed',
      initialValue: 1,
      libraryValue: 1,
      step: 0.1,
      min: 0.2,
      max: 5,
    },
    {
      type: 'select',
      prop: 'direction',
      initialValue: 'out',
      libraryValue: 'out',
      data: [
        { value: 'out', label: 'Out (fly away)' },
        { value: 'in', label: 'In (fly toward)' },
      ],
    },
    {
      type: 'number',
      prop: 'focalX',
      initialValue: 50,
      libraryValue: 50,
      step: 5,
      min: 0,
      max: 100,
    },
    {
      type: 'number',
      prop: 'focalY',
      initialValue: 50,
      libraryValue: 50,
      step: 5,
      min: 0,
      max: 100,
    },
    {
      type: 'boolean',
      prop: 'trail',
      initialValue: true,
      libraryValue: true,
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
      type: 'number',
      prop: 'opacity',
      initialValue: 1,
      libraryValue: 1,
      step: 0.05,
      min: 0,
      max: 1,
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
  ],
};
