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
      <Scene>
        <Scene.Radar{{props}} />
      </Scene>
    </Box>
  );
}
`;

function Wrapper(props: any) {
  const { origin, ...rest } = props;
  const resolvedOrigin = origin === 'auto' ? undefined : origin;
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
      <Scene>
        <Scene.Radar {...rest} origin={resolvedOrigin} />
      </Scene>
    </Box>
  );
}

export const radarConfigurator: MantineDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  controls: [
    {
      type: 'select',
      prop: 'shape',
      initialValue: 'arc',
      libraryValue: 'arc',
      data: [
        { value: 'arc', label: 'arc (Wi-Fi)' },
        { value: 'circle', label: 'circle (radar)' },
      ],
    },
    {
      type: 'select',
      prop: 'arcDirection',
      initialValue: 'up',
      libraryValue: 'up',
      data: [
        { value: 'up', label: 'up' },
        { value: 'down', label: 'down' },
        { value: 'left', label: 'left' },
        { value: 'right', label: 'right' },
      ],
    },
    {
      type: 'select',
      prop: 'origin',
      initialValue: 'auto',
      libraryValue: 'auto',
      data: [
        { value: 'auto', label: 'auto (matches arc direction)' },
        { value: '50% 100%', label: 'bottom center' },
        { value: '50% 0%', label: 'top center' },
        { value: '0% 50%', label: 'left center' },
        { value: '100% 50%', label: 'right center' },
        { value: '50% 50%', label: 'center' },
        { value: '0% 100%', label: 'bottom left' },
        { value: '100% 100%', label: 'bottom right' },
      ],
    },
    {
      type: 'color',
      prop: 'color',
      initialValue: 'orange',
      libraryValue: 'blue',
    },
    {
      type: 'number',
      prop: 'count',
      initialValue: 4,
      libraryValue: 4,
      step: 1,
      min: 1,
      max: 10,
    },
    {
      type: 'number',
      prop: 'interval',
      initialValue: 1.5,
      libraryValue: 1.5,
      step: 0.1,
      min: 0.2,
      max: 5,
    },
    {
      type: 'number',
      prop: 'duration',
      initialValue: 6,
      libraryValue: 6,
      step: 0.5,
      min: 1,
      max: 20,
    },
    {
      type: 'number',
      prop: 'strokeWidth',
      initialValue: 2,
      libraryValue: 2,
      step: 1,
      min: 1,
      max: 10,
    },
    {
      type: 'number',
      prop: 'blur',
      initialValue: 0,
      libraryValue: 0,
      step: 1,
      min: 0,
      max: 30,
    },
    {
      type: 'number',
      prop: 'peakOpacity',
      initialValue: 0.6,
      libraryValue: 0.45,
      step: 0.05,
      min: 0,
      max: 1,
    },
  ],
};
