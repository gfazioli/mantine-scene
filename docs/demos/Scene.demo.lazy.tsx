import React from 'react';
import { Scene } from '@gfazioli/mantine-scene';
import { Box, Stack, Text } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const code = `
import { Scene } from '@gfazioli/mantine-scene';
import { Box, Stack, Text } from '@mantine/core';

function Demo() {
  return (
    <Stack gap="md">
      <Text size="sm" c="dimmed">
        Scroll the page — when this scene leaves the viewport,
        all child animations and the mouse-tracking rAF loop pause.
        They resume automatically when it re-enters.
      </Text>

      <Box pos="relative" h={300} style={{ borderRadius: 'var(--mantine-radius-md)', overflow: 'hidden', background: 'var(--mantine-color-body)' }}>
        <Scene lazy>
          <Scene.Gradient
            type="radial"
            colors={['rgba(120, 0, 255, 0.3) 0%', 'transparent 70%']}
          />
          <Scene.StarField count={120} twinkle />
          <Scene.Glow color="violet" size={400} blur={140} top="50%" left="50%" />
        </Scene>
      </Box>
    </Stack>
  );
}
`;

function Demo() {
  return (
    <Stack gap="md">
      <Text size="sm" c="dimmed">
        Scroll the page — when this scene leaves the viewport, all child animations and the
        mouse-tracking rAF loop pause. They resume automatically when it re-enters.
      </Text>

      <Box
        pos="relative"
        h={300}
        style={{
          borderRadius: 'var(--mantine-radius-md)',
          overflow: 'hidden',
          background: 'var(--mantine-color-body)',
        }}
      >
        <Scene lazy>
          <Scene.Gradient type="radial" colors={['rgba(120, 0, 255, 0.3) 0%', 'transparent 70%']} />
          <Scene.StarField count={120} twinkle />
          <Scene.Glow color="violet" size={400} blur={140} top="50%" left="50%" />
        </Scene>
      </Box>
    </Stack>
  );
}

export const lazy: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  defaultExpanded: false,
};
