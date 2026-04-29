import { Scene } from '@gfazioli/mantine-scene';
import { Box } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const code = `
import { Scene } from '@gfazioli/mantine-scene';
import { Box } from '@mantine/core';

function Demo() {
  return (
    <Box pos="relative" h={300} style={{ borderRadius: 'var(--mantine-radius-md)', overflow: 'hidden', background: 'var(--mantine-color-body)' }}>
      <Scene>
        <Scene.Confetti{{props}} />
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
      style={{
        borderRadius: 'var(--mantine-radius-md)',
        overflow: 'hidden',
        background: 'var(--mantine-color-body)',
      }}
    >
      <Scene>
        <Scene.Confetti {...props} />
      </Scene>
    </Box>
  );
}

export const confettiConfigurator: MantineDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  controls: [
    {
      type: 'number',
      prop: 'count',
      initialValue: 80,
      libraryValue: 80,
      step: 10,
      min: 10,
      max: 200,
    },
    {
      type: 'number',
      prop: 'duration',
      initialValue: 4,
      libraryValue: 4,
      step: 0.5,
      min: 1,
      max: 10,
    },
    {
      type: 'number',
      prop: 'speed',
      initialValue: 1,
      libraryValue: 1,
      step: 0.1,
      min: 0.2,
      max: 3,
    },
    {
      type: 'number',
      prop: 'minSize',
      initialValue: 6,
      libraryValue: 6,
      step: 1,
      min: 2,
      max: 20,
    },
    {
      type: 'number',
      prop: 'maxSize',
      initialValue: 12,
      libraryValue: 12,
      step: 1,
      min: 4,
      max: 30,
    },
    {
      type: 'number',
      prop: 'flutter',
      initialValue: 60,
      libraryValue: 60,
      step: 10,
      min: 0,
      max: 200,
    },
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
