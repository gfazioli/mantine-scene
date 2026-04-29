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
        <Scene.Rain{{props}} />
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
        <Scene.Rain {...props} />
      </Scene>
    </Box>
  );
}

export const rainConfigurator: MantineDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  controls: [
    {
      type: 'number',
      prop: 'count',
      initialValue: 80,
      libraryValue: 60,
      step: 10,
      min: 10,
      max: 200,
    },
    {
      type: 'color',
      prop: 'color',
      initialValue: 'blue',
      libraryValue: 'blue',
    },
    {
      type: 'number',
      prop: 'angle',
      initialValue: 15,
      libraryValue: 15,
      step: 1,
      min: -45,
      max: 45,
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
      prop: 'minLength',
      initialValue: 8,
      libraryValue: 8,
      step: 1,
      min: 2,
      max: 30,
    },
    {
      type: 'number',
      prop: 'maxLength',
      initialValue: 18,
      libraryValue: 18,
      step: 1,
      min: 4,
      max: 40,
    },
    {
      type: 'number',
      prop: 'thickness',
      initialValue: 1,
      libraryValue: 1,
      step: 0.5,
      min: 0.5,
      max: 4,
    },
    {
      type: 'number',
      prop: 'opacity',
      initialValue: 0.5,
      libraryValue: 0.5,
      step: 0.05,
      min: 0,
      max: 1,
    },
    {
      type: 'boolean',
      prop: 'splash',
      initialValue: false,
      libraryValue: false,
    },
    {
      type: 'number',
      prop: 'splashCount',
      initialValue: 20,
      libraryValue: 20,
      step: 5,
      min: 0,
      max: 80,
    },
  ],
};
