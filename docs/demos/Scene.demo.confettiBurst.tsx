import React, { useState } from 'react';
import { Scene } from '@gfazioli/mantine-scene';
import { Box, Button, Group, Stack, Text } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const code = `
import { useState } from 'react';
import { Scene } from '@gfazioli/mantine-scene';
import { Box, Button, Group, Stack, Text } from '@mantine/core';

function Demo() {
  const [bursts, setBursts] = useState(0);
  const [completed, setCompleted] = useState(0);

  return (
    <Stack>
      <Group justify="space-between">
        <Group gap="xs">
          <Text size="sm">Triggered: {bursts}</Text>
          <Text size="sm">Completed: {completed}</Text>
        </Group>
        <Button onClick={() => setBursts((n) => n + 1)}>Trigger burst</Button>
      </Group>

      <Box pos="relative" h={280} style={{ borderRadius: 'var(--mantine-radius-md)', overflow: 'hidden', background: 'var(--mantine-color-body)' }}>
        <Scene>
          {bursts > 0 && (
            <Scene.Confetti
              key={bursts}
              count={120}
              burst
              origin="bottom"
              rise={400}
              duration={3.5}
              shapes={['rectangle', 'triangle', 'circle']}
              onComplete={() => setCompleted((n) => n + 1)}
            />
          )}
        </Scene>
      </Box>
    </Stack>
  );
}
`;

function Demo() {
  const [bursts, setBursts] = useState(0);
  const [completed, setCompleted] = useState(0);

  return (
    <Stack>
      <Group justify="space-between">
        <Group gap="xs">
          <Text size="sm">Triggered: {bursts}</Text>
          <Text size="sm">Completed: {completed}</Text>
        </Group>
        <Button onClick={() => setBursts((n) => n + 1)}>Trigger burst</Button>
      </Group>

      <Box
        pos="relative"
        h={280}
        style={{
          borderRadius: 'var(--mantine-radius-md)',
          overflow: 'hidden',
          background: 'var(--mantine-color-body)',
        }}
      >
        <Scene>
          {bursts > 0 && (
            <Scene.Confetti
              key={bursts}
              count={120}
              burst
              origin="bottom"
              rise={400}
              duration={3.5}
              shapes={['rectangle', 'triangle', 'circle']}
              onComplete={() => setCompleted((n) => n + 1)}
            />
          )}
        </Scene>
      </Box>
    </Stack>
  );
}

export const confettiBurst: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  defaultExpanded: false,
};
