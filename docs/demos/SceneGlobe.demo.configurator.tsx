import { Scene } from '@gfazioli/mantine-scene';
import { Box } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';
import React from 'react';

const code = `
import { Scene } from '@gfazioli/mantine-scene';
import { Box } from '@mantine/core';

function Demo() {
  return (
    <Box pos="relative" h={500} style={{ borderRadius: 'var(--mantine-radius-md)', overflow: 'hidden', background: 'var(--mantine-color-dark-9)' }}>
      <Scene>
        <Scene.Globe{{props}} />
      </Scene>
    </Box>
  );
}
`;

function Wrapper(props: any) {
  return (
    <Box
      pos="relative"
      h={500}
      style={{
        borderRadius: 'var(--mantine-radius-md)',
        overflow: 'hidden',
        background: 'var(--mantine-color-dark-9)',
      }}
    >
      <Scene>
        <Scene.Globe {...props} />
      </Scene>
    </Box>
  );
}

export const globeConfigurator: MantineDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  controls: [
    {
      type: 'number',
      prop: 'size',
      initialValue: 400,
      libraryValue: 600,
      step: 50,
      min: 200,
      max: 800,
    },
    {
      type: 'color',
      prop: 'baseColor',
      initialValue: 'gray',
      libraryValue: 'gray.5',
    },
    {
      type: 'number',
      prop: 'mapBrightness',
      initialValue: 12,
      libraryValue: 12,
      step: 1,
      min: 1,
      max: 30,
    },
    {
      type: 'color',
      prop: 'glowColor',
      initialValue: 'blue',
      libraryValue: 'blue.5',
    },
    {
      type: 'color',
      prop: 'markerColor',
      initialValue: 'orange',
      libraryValue: 'orange.5',
    },
    {
      type: 'boolean',
      prop: 'autoRotate',
      initialValue: true,
      libraryValue: true,
    },
    {
      type: 'number',
      prop: 'autoRotateSpeed',
      initialValue: 0.005,
      libraryValue: 0.005,
      step: 0.001,
      min: 0,
      max: 0.05,
    },
    {
      type: 'boolean',
      prop: 'interactive',
      initialValue: true,
      libraryValue: true,
    },
    {
      type: 'number',
      prop: 'theta',
      initialValue: 0.3,
      libraryValue: 0.3,
      step: 0.05,
      min: -1,
      max: 1,
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
  ],
};
