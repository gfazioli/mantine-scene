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
        <Scene.Mesh{{props}}
          stops={[
            { color: 'rgba(120, 0, 255, 0.15)', position: '20% 20%', spread: 50 },
            { color: 'rgba(255, 0, 128, 0.12)', position: '80% 30%', spread: 45 },
            { color: 'rgba(0, 100, 255, 0.1)', position: '50% 80%', spread: 55 },
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
      bg="dark.9"
      style={{ borderRadius: 'var(--mantine-radius-md)', overflow: 'hidden' }}
    >
      <Scene>
        <Scene.Mesh
          stops={[
            { color: 'rgba(120, 0, 255, 0.15)', position: '20% 20%', spread: 50 },
            { color: 'rgba(255, 0, 128, 0.12)', position: '80% 30%', spread: 45 },
            { color: 'rgba(0, 100, 255, 0.1)', position: '50% 80%', spread: 55 },
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
  ],
};
