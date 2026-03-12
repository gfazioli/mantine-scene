import React from 'react';
import { Scene } from '@gfazioli/mantine-scene';
import { Box } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const code = `
import { Scene } from '@gfazioli/mantine-scene';
import { Box } from '@mantine/core';

function Demo() {
  return (
    <Box pos="relative" h={300} bg="dark.9" style={{ borderRadius: 'var(--mantine-radius-md)', overflow: 'hidden' }}>
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
      bg="dark.9"
      style={{ borderRadius: 'var(--mantine-radius-md)', overflow: 'hidden' }}
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
  ],
};
