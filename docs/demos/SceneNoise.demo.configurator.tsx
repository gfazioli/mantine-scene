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
      bg="dark.9"
      style={{ borderRadius: 'var(--mantine-radius-md)', overflow: 'hidden' }}
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
      initialValue: 0.03,
      libraryValue: 0.03,
      step: 0.01,
      min: 0,
      max: 0.5,
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
  ],
};
