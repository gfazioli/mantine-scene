import React from 'react';
import { Scene } from '@gfazioli/mantine-scene';
import { Badge, Box, Group, Text, useMatches } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const code = `
import { Badge, Box, Group, Text } from '@mantine/core';
import { useMatches } from '@mantine/core';
import { Scene } from '@gfazioli/mantine-scene';

function Demo() {
  const breakpoint = useMatches({
    base: 'base',
    xs: 'xs',
    sm: 'sm',
    md: 'md',
    lg: 'lg',
    xl: 'xl',
  });

  return (
    <Box pos="relative" h={300} style={{ borderRadius: 'var(--mantine-radius-md)', overflow: 'hidden', background: 'var(--mantine-color-body)' }}>
      <Scene>
        <Scene.StarField
          count={{ base: 20, sm: 50, md: 100 }}
          twinkle
          opacity={0.7}
        />
        <Scene.Glow
          color="violet"
          size={{ base: 150, sm: 250, md: 400 }}
          blur={{ base: 40, sm: 80, md: 120 }}
          opacity={0.4}
          top="30%"
          left="40%"
        />
        <Scene.DotGrid
          color="gray"
          spacing={{ base: 14, sm: 20, md: 28 }}
          opacity={0.2}
          fade="radial"
        />
        <Scene.Noise opacity={0.02} />
      </Scene>
      <Box pos="relative" style={{ zIndex: 1 }} p="xl">
        <Group>
          <Text size="lg" fw={700} c="white">Responsive props</Text>
          <Badge variant="filled" color="violet" size="lg">{breakpoint}</Badge>
        </Group>
        <Text c="dimmed" mt="xs" size="sm">
          Resize the browser to see stars, glow, and dot spacing adapt
        </Text>
      </Box>
    </Box>
  );
}
`;

function Demo() {
  const breakpoint = useMatches({
    base: 'base',
    xs: 'xs',
    sm: 'sm',
    md: 'md',
    lg: 'lg',
    xl: 'xl',
  });

  return (
    <Box
      pos="relative"
      h={300}
      style={{
        borderRadius: 'var(--mantine-radius-md)',
        overflow: 'hidden',
        background: 'var(--mantine-color-body)',
      }}
    >
      <Scene>
        <Scene.StarField count={{ base: 20, sm: 50, md: 100 }} twinkle opacity={0.7} />
        <Scene.Glow
          color="violet"
          size={{ base: 150, sm: 250, md: 400 }}
          blur={{ base: 40, sm: 80, md: 120 }}
          opacity={0.4}
          top="30%"
          left="40%"
        />
        <Scene.DotGrid
          color="gray"
          spacing={{ base: 14, sm: 20, md: 28 }}
          opacity={0.2}
          fade="radial"
        />
        <Scene.Noise opacity={0.02} />
      </Scene>
      <Box pos="relative" style={{ zIndex: 1 }} p="xl">
        <Group>
          <Text size="lg" fw={700} c="white">
            Responsive props
          </Text>
          <Badge variant="filled" color="violet" size="lg">
            {breakpoint}
          </Badge>
        </Group>
        <Text c="dimmed" mt="xs" size="sm">
          Resize the browser to see stars, glow, and dot spacing adapt
        </Text>
      </Box>
    </Box>
  );
}

export const responsive: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  defaultExpanded: false,
};
