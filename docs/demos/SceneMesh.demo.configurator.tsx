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
        <Scene.Mesh{{props}}
          stops={[
            { color: 'violet', position: '20% 20%', spread: 50 },
            { color: 'pink', position: '80% 30%', spread: 45 },
            { color: 'blue', position: '50% 80%', spread: 55 },
          ]}
        />
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
        <Scene.Mesh
          stops={[
            { color: 'violet', position: '20% 20%', spread: 50 },
            { color: 'pink', position: '80% 30%', spread: 45 },
            { color: 'blue', position: '50% 80%', spread: 55 },
          ]}
          {...props}
        />
      </Scene>
    </Box>
  );
}

export const meshConfigurator: MantineDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  controls: [
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
      type: 'number',
      prop: 'duration',
      initialValue: 15,
      libraryValue: 15,
      step: 1,
      min: 1,
      max: 60,
    },
    {
      type: 'select',
      prop: 'blend',
      initialValue: 'normal',
      libraryValue: 'normal',
      data: [
        { value: 'normal', label: 'Normal' },
        { value: 'screen', label: 'Screen' },
        { value: 'overlay', label: 'Overlay' },
        { value: 'multiply', label: 'Multiply' },
        { value: 'soft-light', label: 'Soft Light' },
      ],
    },
  ],
};
