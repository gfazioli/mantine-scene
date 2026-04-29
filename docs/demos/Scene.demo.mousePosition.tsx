import React, { useState } from 'react';
import { Scene } from '@gfazioli/mantine-scene';
import { Box, Code, Group, Stack } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const code = `
import { useState } from 'react';
import { Scene } from '@gfazioli/mantine-scene';
import { Box, Code, Group, Stack } from '@mantine/core';

function Demo() {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  return (
    <Stack gap="md">
      <Group>
        <Code>x: {pos ? pos.x.toFixed(1) : '—'}</Code>
        <Code>y: {pos ? pos.y.toFixed(1) : '—'}</Code>
      </Group>

      <Box pos="relative" h={300} style={{ borderRadius: 'var(--mantine-radius-md)', overflow: 'hidden', background: 'var(--mantine-color-body)' }}>
        <Scene interactive onMousePosition={setPos}>
          <Scene.Gradient
            type="radial"
            colors={['rgba(0, 200, 255, 0.2) 0%', 'transparent 70%']}
          />
          <Scene.Glow color="cyan" size={300} blur={120} top="50%" left="50%" />
        </Scene>
      </Box>
    </Stack>
  );
}
`;

function Demo() {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  return (
    <Stack gap="md">
      <Group>
        <Code>x: {pos ? pos.x.toFixed(1) : '—'}</Code>
        <Code>y: {pos ? pos.y.toFixed(1) : '—'}</Code>
      </Group>

      <Box
        pos="relative"
        h={300}
        style={{
          borderRadius: 'var(--mantine-radius-md)',
          overflow: 'hidden',
          background: 'var(--mantine-color-body)',
        }}
      >
        <Scene interactive onMousePosition={setPos}>
          <Scene.Gradient type="radial" colors={['rgba(0, 200, 255, 0.2) 0%', 'transparent 70%']} />
          <Scene.Glow color="cyan" size={300} blur={120} top="50%" left="50%" />
        </Scene>
      </Box>
    </Stack>
  );
}

export const mousePosition: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  defaultExpanded: false,
};
