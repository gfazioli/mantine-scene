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
  const { dark, ...rest } = props;
  // The configurator's select control returns strings; cobe wants 0/1.
  const resolvedDark = dark === '1' ? 1 : 0;
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
        <Scene.Globe {...rest} dark={resolvedDark} />
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
      initialValue: 350,
      libraryValue: 600,
      step: 25,
      min: 200,
      max: 500,
    },
    {
      type: 'color',
      prop: 'baseColor',
      initialValue: 'gray',
      libraryValue: 'gray.5',
    },
    {
      type: 'number',
      prop: 'mapSamples',
      initialValue: 16000,
      libraryValue: 16000,
      step: 2000,
      min: 4000,
      max: 32000,
    },
    {
      type: 'number',
      prop: 'mapBrightness',
      initialValue: 6,
      libraryValue: 6,
      step: 1,
      min: 1,
      max: 30,
    },
    {
      type: 'number',
      prop: 'diffuse',
      initialValue: 3,
      libraryValue: 3,
      step: 0.2,
      min: 0,
      max: 8,
    },
    {
      type: 'select',
      prop: 'dark',
      initialValue: '1',
      libraryValue: '1',
      data: [
        { value: '0', label: '0 — clean silhouette' },
        { value: '1', label: '1 — visible night side' },
      ],
    },
    {
      type: 'color',
      prop: 'glowColor',
      initialValue: 'blue',
      libraryValue: 'blue.5',
    },
    {
      type: 'number',
      prop: 'glowIntensity',
      initialValue: 1,
      libraryValue: 1,
      step: 0.05,
      min: 0,
      max: 1,
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
      prop: 'inertia',
      initialValue: 0.92,
      libraryValue: 0.92,
      step: 0.01,
      min: 0,
      max: 0.99,
    },
    {
      type: 'select',
      prop: 'dragAxis',
      initialValue: 'x',
      libraryValue: 'x',
      data: [
        { value: 'x', label: 'x (longitude)' },
        { value: 'y', label: 'y (latitude)' },
        { value: 'both', label: 'both (2D drag)' },
      ],
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
      prop: 'scale',
      initialValue: 1,
      libraryValue: 1,
      step: 0.1,
      min: 0.3,
      max: 2.5,
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
