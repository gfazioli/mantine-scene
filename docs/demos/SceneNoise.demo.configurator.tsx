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
        <Scene.Noise{{props}} />
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
        <Scene.Noise {...props} />
      </Scene>
    </Box>
  );
}

export const noiseConfigurator: MantineDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  controls: [
    {
      type: 'number',
      prop: 'opacity',
      initialValue: 0.15,
      libraryValue: 0.03,
      step: 0.01,
      min: 0,
      max: 1,
    },
    {
      type: 'number',
      prop: 'grain',
      initialValue: 0.65,
      libraryValue: 0.65,
      step: 0.05,
      min: 0.1,
      max: 2,
    },
    {
      type: 'number',
      prop: 'seed',
      initialValue: 0,
      libraryValue: 0,
      step: 1,
      min: 0,
      max: 100,
    },
    {
      type: 'select',
      prop: 'type',
      initialValue: 'fractalNoise',
      libraryValue: 'fractalNoise',
      data: [
        { value: 'fractalNoise', label: 'Fractal Noise' },
        { value: 'turbulence', label: 'Turbulence' },
      ],
    },
    {
      type: 'number',
      prop: 'octaves',
      initialValue: 4,
      libraryValue: 4,
      step: 1,
      min: 1,
      max: 8,
    },
    {
      type: 'color',
      prop: 'tint',
      initialValue: '',
      libraryValue: undefined,
    },
    {
      type: 'number',
      prop: 'tintOpacity',
      initialValue: 0.5,
      libraryValue: 0.5,
      step: 0.05,
      min: 0,
      max: 1,
    },
  ],
};
