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
        <Scene.Aurora{{props}} />
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
        <Scene.Aurora {...props} />
      </Scene>
    </Box>
  );
}

export const auroraConfigurator: MantineDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  controls: [
    {
      type: 'number',
      prop: 'bands',
      initialValue: 3,
      libraryValue: 3,
      step: 1,
      min: 1,
      max: 6,
    },
    {
      type: 'select',
      prop: 'position',
      initialValue: 'top',
      libraryValue: 'top',
      data: [
        { value: 'top', label: 'Top' },
        { value: 'center', label: 'Center' },
        { value: 'bottom', label: 'Bottom' },
      ],
    },
    {
      type: 'boolean',
      prop: 'animate',
      initialValue: true,
      libraryValue: true,
    },
    {
      type: 'number',
      prop: 'duration',
      initialValue: 8,
      libraryValue: 8,
      step: 1,
      min: 1,
      max: 30,
    },
    {
      type: 'number',
      prop: 'opacity',
      initialValue: 0.3,
      libraryValue: 0.3,
      step: 0.05,
      min: 0,
      max: 1,
    },
    {
      type: 'number',
      prop: 'blur',
      initialValue: 60,
      libraryValue: 60,
      step: 5,
      min: 0,
      max: 150,
    },
  ],
};
