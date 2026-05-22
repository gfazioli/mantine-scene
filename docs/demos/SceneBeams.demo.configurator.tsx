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
      <Scene lazy lazyThreshold={0.1}>
        <Scene.Beams{{props}} />
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
      <Scene lazy lazyThreshold={0.1}>
        <Scene.Beams {...props} />
      </Scene>
    </Box>
  );
}

export const beamsConfigurator: MantineDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  controls: [
    {
      type: 'select',
      prop: 'direction',
      initialValue: 'vertical',
      libraryValue: 'vertical',
      data: [
        { value: 'vertical', label: 'vertical' },
        { value: 'horizontal', label: 'horizontal' },
      ],
    },
    {
      type: 'color',
      prop: 'colors',
      initialValue: 'blue',
      libraryValue: 'blue',
    },
    {
      type: 'number',
      prop: 'count',
      initialValue: 5,
      libraryValue: 5,
      step: 1,
      min: 1,
      max: 30,
    },
    {
      type: 'number',
      prop: 'width',
      initialValue: 80,
      libraryValue: 80,
      step: 10,
      min: 10,
      max: 300,
    },
    {
      type: 'number',
      prop: 'blur',
      initialValue: 24,
      libraryValue: 24,
      step: 2,
      min: 0,
      max: 80,
    },
    {
      type: 'number',
      prop: 'radius',
      initialValue: 999,
      libraryValue: 999,
      step: 10,
      min: 0,
      max: 999,
    },
    {
      type: 'number',
      prop: 'opacity',
      initialValue: 0.35,
      libraryValue: 0.35,
      step: 0.05,
      min: 0,
      max: 1,
    },
    {
      type: 'number',
      prop: 'minDuration',
      initialValue: 4,
      libraryValue: 4,
      step: 0.5,
      min: 1,
      max: 20,
    },
    {
      type: 'number',
      prop: 'maxDuration',
      initialValue: 12,
      libraryValue: 12,
      step: 0.5,
      min: 1,
      max: 30,
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
