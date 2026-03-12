import React from 'react';
import { Scene } from '@gfazioli/mantine-scene';
import { Box, Text } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const code = `
import { Box, Text } from '@mantine/core';
import { Scene } from '@gfazioli/mantine-scene';

function Demo() {
  return (
    <Box pos="relative" h={400} style={{ borderRadius: 'var(--mantine-radius-md)', overflow: 'hidden', background: 'var(--mantine-color-body)' }}>
      <Scene>
        <Scene.StarField count={80} twinkle duration={4} opacity={0.6} />
        <Scene.Gradient from="violet" fromOpacity={0.12} />
        <Scene.DotGrid color="gray" opacity={0.15} spacing={28} fade="edges" />
        <Scene.Mesh
          stops={[
            { color: 'blue', position: '15% 20%', spread: 45 },
            { color: 'teal', position: '85% 40%', spread: 40 },
            { color: 'violet', position: '50% 80%', spread: 50 },
          ]}
          opacity={0.3}
        />
        <Scene.Glow color="blue" size={500} opacity={0.2} top="20%" left="30%" duration={10} />
        <Scene.Glow color="teal" size={400} opacity={0.15} top="60%" left="70%" duration={14} />
        <Scene.ShootingStar count={2} opacity={0.4} />
        <Scene.Noise opacity={0.03} />
      </Scene>
      <Box pos="relative" style={{ zIndex: 1 }} p="xl">
        <Text size="xl" fw={700} c="white">All effects combined</Text>
        <Text c="dimmed" mt="sm">StarField + Gradient + DotGrid + Mesh + Glow + ShootingStar + Noise</Text>
      </Box>
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
        background: 'var(--mantine-color-body)',
      }}
    >
      <Scene>
        <Scene.StarField count={80} twinkle duration={4} opacity={0.6} />
        <Scene.Gradient from="violet" fromOpacity={0.12} />
        <Scene.DotGrid color="gray" opacity={0.15} spacing={28} fade="edges" />
        <Scene.Mesh
          stops={[
            { color: 'blue', position: '15% 20%', spread: 45 },
            { color: 'teal', position: '85% 40%', spread: 40 },
            { color: 'violet', position: '50% 80%', spread: 50 },
          ]}
          opacity={0.3}
        />
        <Scene.Glow color="blue" size={500} opacity={0.2} top="20%" left="30%" duration={10} />
        <Scene.Glow color="teal" size={400} opacity={0.15} top="60%" left="70%" duration={14} />
        <Scene.ShootingStar count={2} opacity={0.4} />
        <Scene.Noise opacity={0.03} />
      </Scene>
      <Box pos="relative" style={{ zIndex: 1 }} p="xl">
        <Text size="xl" fw={700} c="white">
          All effects combined
        </Text>
        <Text c="dimmed" mt="sm">
          StarField + Gradient + DotGrid + Mesh + Glow + ShootingStar + Noise
        </Text>
      </Box>
    </Box>
  );
}

export const combined: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  defaultExpanded: false,
};
