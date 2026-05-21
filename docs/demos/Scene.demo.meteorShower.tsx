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
        <Scene.ShootingStar
          count={20}
          speed={2}
          minInterval={0.2}
          maxInterval={1.5}
          trailLength={120}
          color="white"
        />
      </Scene>
    </Box>
  );
}
`;

function Demo() {
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
        <Scene.ShootingStar
          count={20}
          speed={2}
          minInterval={0.2}
          maxInterval={1.5}
          trailLength={120}
          color="white"
        />
      </Scene>
    </Box>
  );
}

export const meteorShower: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
};
