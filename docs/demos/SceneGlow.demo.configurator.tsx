import React from 'react';
import { Scene } from '@gfazioli/mantine-scene';
import { Box } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const code = `
import { Scene } from '@gfazioli/mantine-scene';
import { Box } from '@mantine/core';

function Demo() {
  return (
    <Box pos="relative" h={350} style={{ borderRadius: 'var(--mantine-radius-md)', overflow: 'hidden', background: 'var(--mantine-color-body)' }}>
      <Scene>
        <Scene.Glow{{props}} />
      </Scene>
    </Box>
  );
}
`;

function Wrapper({ top, left, driftX, driftY, ...props }: any) {
  return (
    <Box
      pos="relative"
      h={350}
      style={{
        borderRadius: 'var(--mantine-radius-md)',
        overflow: 'hidden',
        background: 'var(--mantine-color-body)',
      }}
    >
      <Scene>
        <Scene.Glow
          top={`${top}%`}
          left={`${left}%`}
          driftX={`${driftX}px`}
          driftY={`${driftY}px`}
          {...props}
        />
      </Scene>
    </Box>
  );
}

export const glowConfigurator: MantineDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  controls: [
    {
      type: 'color',
      prop: 'color',
      initialValue: 'violet',
      libraryValue: 'violet',
    },
    {
      type: 'number',
      prop: 'size',
      initialValue: 400,
      libraryValue: 400,
      step: 50,
      min: 50,
      max: 800,
    },
    {
      type: 'number',
      prop: 'blur',
      initialValue: 120,
      libraryValue: 120,
      step: 10,
      min: 0,
      max: 300,
    },
    {
      type: 'number',
      prop: 'opacity',
      initialValue: 0.5,
      libraryValue: 0.5,
      step: 0.05,
      min: 0,
      max: 1,
    },
    {
      type: 'number',
      prop: 'top',
      initialValue: 50,
      libraryValue: 10,
      step: 1,
      min: 0,
      max: 100,
    },
    {
      type: 'number',
      prop: 'left',
      initialValue: 50,
      libraryValue: 50,
      step: 1,
      min: 0,
      max: 100,
    },
    {
      type: 'boolean',
      prop: 'animate',
      initialValue: true,
      libraryValue: true,
    },
    {
      type: 'select',
      prop: 'animationType',
      initialValue: 'float',
      libraryValue: 'float',
      data: [
        { value: 'float', label: 'Float' },
        { value: 'pulse', label: 'Pulse' },
        { value: 'breathe', label: 'Breathe' },
      ],
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
      prop: 'delay',
      initialValue: 0,
      libraryValue: 0,
      step: 0.5,
      min: 0,
      max: 10,
    },
    {
      type: 'number',
      prop: 'driftX',
      initialValue: 30,
      libraryValue: 30,
      step: 5,
      min: 0,
      max: 100,
    },
    {
      type: 'number',
      prop: 'driftY',
      initialValue: 20,
      libraryValue: 20,
      step: 5,
      min: 0,
      max: 100,
    },
  ],
};
