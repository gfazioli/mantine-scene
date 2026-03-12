import React from 'react';
import { Scene } from '@gfazioli/mantine-scene';
import { Box } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';
import { SceneStylesApi } from '../styles-api/Scene.styles-api';

const code = `
import { Box } from '@mantine/core';
import { Scene } from '@gfazioli/mantine-scene';

function Demo() {
  return (
    <Box pos="relative" h={300} bg="dark.9" style={{ borderRadius: 'var(--mantine-radius-md)', overflow: 'hidden' }}>
      <Scene{{props}}>
        <Scene.Gradient colors={['rgba(120, 0, 255, 0.2) 0%', 'transparent 70%']} />
        <Scene.Glow color="rgba(120, 0, 255, 0.3)" size={300} top="30%" left="50%" />
        <Scene.DotGrid color="rgba(255, 255, 255, 0.08)" spacing={20} />
        <Scene.Noise opacity={0.03} />
      </Scene>
    </Box>
  );
}
`;

function Demo(props: any) {
  return (
    <Box
      pos="relative"
      h={300}
      bg="dark.9"
      style={{ borderRadius: 'var(--mantine-radius-md)', overflow: 'hidden' }}
    >
      <Scene {...props}>
        <Scene.Gradient colors={['rgba(120, 0, 255, 0.2) 0%', 'transparent 70%']} />
        <Scene.Glow color="rgba(120, 0, 255, 0.3)" size={300} top="30%" left="50%" />
        <Scene.DotGrid color="rgba(255, 255, 255, 0.08)" spacing={20} />
        <Scene.Noise opacity={0.03} />
      </Scene>
    </Box>
  );
}

export const stylesApi: MantineDemo = {
  type: 'styles-api',
  data: SceneStylesApi,
  component: Demo,
  code,
  centered: true,
};
