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
        <Scene.DotGrid{{props}} />
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
        <Scene.DotGrid {...props} />
      </Scene>
    </Box>
  );
}

export const dotGridConfigurator: MantineDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  controls: [
    {
      type: 'color',
      prop: 'color',
      initialValue: 'blue',
      libraryValue: 'blue',
    },
    {
      type: 'number',
      prop: 'dotSize',
      initialValue: 1,
      libraryValue: 1,
      step: 0.5,
      min: 0.5,
      max: 10,
    },
    {
      type: 'number',
      prop: 'spacing',
      initialValue: 24,
      libraryValue: 24,
      step: 2,
      min: 4,
      max: 80,
    },
    {
      type: 'boolean',
      prop: 'stagger',
      initialValue: false,
      libraryValue: false,
    },
    {
      type: 'select',
      prop: 'fade',
      initialValue: 'none',
      libraryValue: 'none',
      data: [
        { value: 'none', label: 'None' },
        { value: 'radial', label: 'Radial' },
        { value: 'top', label: 'Top' },
        { value: 'bottom', label: 'Bottom' },
        { value: 'edges', label: 'Edges' },
      ],
    },
    {
      type: 'boolean',
      prop: 'animate',
      initialValue: false,
      libraryValue: false,
    },
    {
      type: 'number',
      prop: 'duration',
      initialValue: 4,
      libraryValue: 4,
      step: 1,
      min: 1,
      max: 20,
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
