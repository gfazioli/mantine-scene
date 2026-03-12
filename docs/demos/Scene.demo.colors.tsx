import { Scene } from '@gfazioli/mantine-scene';
import { Group } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const code = `
import { Group } from '@mantine/core';
import { Scene } from '@gfazioli/mantine-scene';

function Demo() {
  return (
    <Group>
      <Scene color="red" />
      <Scene color="green" />
      <Scene color="blue" />
      <Scene color="yellow" />
      <Scene color="orange" />
      <Scene color="cyan" />
      <Scene color="pink" />
      <Scene color="violet" />
    </Group>
  );
}
`;

export const colors: MantineDemo = {
  type: 'code',
  component: () => (
    <Group>
      <Scene color="red" />
      <Scene color="green" />
      <Scene color="blue" />
      <Scene color="yellow" />
      <Scene color="orange" />
      <Scene color="cyan" />
      <Scene color="pink" />
      <Scene color="violet" />
    </Group>
  ),
  code,
  defaultExpanded: false,
};
