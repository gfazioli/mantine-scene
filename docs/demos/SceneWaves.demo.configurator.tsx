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
        <Scene.Waves{{props}} />
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
        <Scene.Waves {...props} />
      </Scene>
    </Box>
  );
}

export const wavesConfigurator: MantineDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  controls: [
    {
      type: 'number',
      prop: 'count',
      initialValue: 3,
      libraryValue: 3,
      step: 1,
      min: 1,
      max: 8,
    },
    {
      type: 'color',
      prop: 'colors',
      initialValue: 'blue',
      libraryValue: 'blue',
    },
    {
      type: 'number',
      prop: 'amplitude',
      initialValue: 40,
      libraryValue: 40,
      step: 5,
      min: 5,
      max: 200,
    },
    {
      type: 'number',
      prop: 'wavelength',
      initialValue: 480,
      libraryValue: 480,
      step: 40,
      min: 80,
      max: 1600,
    },
    {
      type: 'number',
      prop: 'height',
      initialValue: 200,
      libraryValue: 240,
      step: 20,
      min: 80,
      max: 400,
    },
    {
      type: 'number',
      prop: 'speed',
      initialValue: 1,
      libraryValue: 1,
      step: 0.1,
      min: 0.1,
      max: 5,
    },
    {
      type: 'segmented',
      prop: 'direction',
      initialValue: 'left',
      libraryValue: 'left',
      data: [
        { value: 'left', label: 'left' },
        { value: 'right', label: 'right' },
      ],
    },
    {
      type: 'number',
      prop: 'parallax',
      initialValue: 1,
      libraryValue: 1,
      step: 0.1,
      min: -1,
      max: 2,
    },
    {
      type: 'segmented',
      prop: 'position',
      initialValue: 'bottom',
      libraryValue: 'bottom',
      data: [
        { value: 'bottom', label: 'bottom' },
        { value: 'top', label: 'top' },
      ],
    },
    {
      type: 'number',
      prop: 'blur',
      initialValue: 0,
      libraryValue: 0,
      step: 1,
      min: 0,
      max: 30,
    },
    {
      type: 'number',
      prop: 'opacity',
      initialValue: 0.7,
      libraryValue: 0.7,
      step: 0.05,
      min: 0,
      max: 1,
    },
  ],
};
