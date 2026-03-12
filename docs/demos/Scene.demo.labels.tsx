import { Scene } from '@gfazioli/mantine-scene';
import { Badge, Group, Stack } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const code = `
import { Badge, Group, Stack } from '@mantine/core';
import { Scene } from '@gfazioli/mantine-scene';

function Demo() {
  return (
    <Stack gap="lg">
      <Group>
        <Scene label="Power" />
        <Scene value={false} label="Standby" color="gray" />
      </Group>

      <Group>
        <Scene label="Online" labelPosition="left" color="green" />
        <Scene label="Active" labelPosition="right" color="blue" />
      </Group>

      <Group>
        <Scene
          label={<Badge size="sm" variant="light">Custom Label</Badge>}
          color="violet"
        />
      </Group>
    </Stack>
  );
}
`;

function Demo() {
  return (
    <Stack gap="lg">
      <Group>
        <Scene label="Power" />
        <Scene value={false} label="Standby" color="gray" />
      </Group>

      <Group>
        <Scene label="Online" labelPosition="left" color="green" />
        <Scene label="Active" labelPosition="right" color="blue" />
      </Group>

      <Group>
        <Scene
          label={
            <Badge size="sm" variant="light">
              Custom Label
            </Badge>
          }
          color="violet"
        />
      </Group>
    </Stack>
  );
}

export const labels: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  defaultExpanded: false,
};
