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
        <Scene.Gradient{{props}} />
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
        <Scene.Gradient {...props} />
      </Scene>
    </Box>
  );
}

export const gradientConfigurator: MantineDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  controls: [
    {
      type: 'select',
      prop: 'type',
      initialValue: 'radial',
      libraryValue: 'radial',
      data: [
        { value: 'radial', label: 'Radial' },
        { value: 'linear', label: 'Linear' },
        { value: 'conic', label: 'Conic' },
      ],
    },
    {
      type: 'color',
      prop: 'from',
      initialValue: 'violet',
      libraryValue: undefined,
    },
    {
      type: 'color',
      prop: 'to',
      initialValue: 'pink',
      libraryValue: undefined,
    },
    {
      type: 'number',
      prop: 'fromOpacity',
      initialValue: 0.15,
      libraryValue: 0.15,
      step: 0.05,
      min: 0,
      max: 1,
    },
    {
      type: 'number',
      prop: 'toOpacity',
      initialValue: 0,
      libraryValue: 0,
      step: 0.05,
      min: 0,
      max: 1,
    },
    {
      type: 'select',
      prop: 'position',
      initialValue: 'center top',
      libraryValue: 'center top',
      data: [
        { value: 'center top', label: 'Center Top' },
        { value: 'center center', label: 'Center Center' },
        { value: 'center bottom', label: 'Center Bottom' },
        { value: 'left top', label: 'Left Top' },
        { value: 'left center', label: 'Left Center' },
        { value: 'left bottom', label: 'Left Bottom' },
        { value: 'right top', label: 'Right Top' },
        { value: 'right center', label: 'Right Center' },
        { value: 'right bottom', label: 'Right Bottom' },
      ],
    },
    {
      type: 'number',
      prop: 'angle',
      initialValue: 180,
      libraryValue: 180,
      step: 15,
      min: 0,
      max: 360,
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
      type: 'boolean',
      prop: 'animate',
      initialValue: false,
      libraryValue: false,
    },
    {
      type: 'select',
      prop: 'animationType',
      initialValue: 'rotate',
      libraryValue: 'rotate',
      data: [
        { value: 'rotate', label: 'Rotate' },
        { value: 'pulse', label: 'Pulse' },
      ],
    },
    {
      type: 'number',
      prop: 'duration',
      initialValue: 20,
      libraryValue: 20,
      step: 1,
      min: 1,
      max: 60,
    },
    {
      type: 'number',
      prop: 'pulseMinOpacity',
      initialValue: 0.3,
      libraryValue: 0.3,
      step: 0.05,
      min: 0,
      max: 1,
    },
  ],
};
