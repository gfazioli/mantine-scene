import { Scene } from '@gfazioli/mantine-scene';
import { Paper, SimpleGrid, Stack, Text, Title } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const code = `
import { Group, Paper, SimpleGrid, Stack, Text, Title } from '@mantine/core';
import { Scene } from '@gfazioli/mantine-scene';

function Demo() {
  return (
    <Paper p="xl" withBorder>
      <Stack gap="lg">
        <Title order={3}>System Status Panel</Title>

        <SimpleGrid cols={2}>
          <Stack gap="md">
            <Text fw={500} size="sm">Network</Text>
            <Stack gap="xs">
              <Scene value label="Internet" color="green" labelPosition="left" />
              <Scene value label="LAN" color="green" labelPosition="left" />
              <Scene value={false} label="VPN" color="gray" labelPosition="left" />
            </Stack>
          </Stack>

          <Stack gap="md">
            <Text fw={500} size="sm">Services</Text>
            <Stack gap="xs">
              <Scene
                value
                label="Database"
                color="green"
                labelPosition="left"
                animate
                animationType="pulse"
              />
              <Scene value label="API Server" color="green" labelPosition="left" />
              <Scene value label="Cache" color="yellow" labelPosition="left" />
            </Stack>
          </Stack>

          <Stack gap="md">
            <Text fw={500} size="sm">Resources</Text>
            <Stack gap="xs">
              <Scene value label="CPU Load" color="green" labelPosition="left" />
              <Scene value label="Memory" color="yellow" labelPosition="left" />
              <Scene
                value
                label="Disk Space"
                color="red"
                labelPosition="left"
                animate
                animationType="flash"
              />
            </Stack>
          </Stack>

          <Stack gap="md">
            <Text fw={500} size="sm">Security</Text>
            <Stack gap="xs">
              <Scene value label="Firewall" color="green" labelPosition="left" />
              <Scene value label="SSL Cert" color="green" labelPosition="left" />
              <Scene value label="Auth Service" color="green" labelPosition="left" />
            </Stack>
          </Stack>
        </SimpleGrid>
      </Stack>
    </Paper>
  );
}
`;

function Demo() {
  return (
    <Paper p="xl" withBorder>
      <Stack gap="lg">
        <Title order={3}>System Status Panel</Title>

        <SimpleGrid cols={2}>
          <Stack gap="md">
            <Text fw={800}>Network</Text>
            <Paper withBorder p="md">
              <Stack gap="xs">
                <Scene label="Internet" color="green" labelPosition="left" justify="space-between" />
                <Scene label="LAN" color="green" labelPosition="left" justify="space-between" />
                <Scene
                  value={false}
                  label="VPN"
                  color="gray"
                  labelPosition="left"
                  justify="space-between"
                />
              </Stack>
            </Paper>
          </Stack>

          <Stack gap="md">
            <Text fw={800}>Services</Text>
            <Paper withBorder p="md">
              <Stack gap="xs">
                <Scene
                  value
                  label="Database"
                  color="green"
                  labelPosition="left"
                  animate
                  animationType="blink"
                  justify="space-between"
                />
                <Scene
                  label="API Server"
                  color="green"
                  labelPosition="left"
                  justify="space-between"
                />
                <Scene label="Cache" color="yellow" labelPosition="left" justify="space-between" />
              </Stack>
            </Paper>
          </Stack>

          <Stack gap="md">
            <Text fw={800}>Resources</Text>
            <Paper withBorder p="md">
              <Stack gap="xs">
                <Scene
                  label="CPU Load"
                  color="green"
                  labelPosition="left"
                  justify="space-between"
                  animate
                  animationType="glow"
                />
                <Scene label="Memory" color="yellow" labelPosition="left" justify="space-between" />
                <Scene
                  value
                  label="Disk Space"
                  color="red"
                  labelPosition="left"
                  animate
                  animationType="flash"
                  justify="space-between"
                />
              </Stack>
            </Paper>
          </Stack>

          <Stack gap="md">
            <Text fw={800}>Security</Text>
            <Paper withBorder p="md">
              <Stack gap="xs">
                <Scene label="Firewall" color="green" labelPosition="left" justify="space-between" />
                <Scene
                  label="SSL Cert"
                  color="green"
                  labelPosition="left"
                  justify="space-between"
                  value={false}
                />
                <Scene
                  label="Auth Service"
                  color="green"
                  labelPosition="left"
                  justify="space-between"
                />
              </Stack>
            </Paper>
          </Stack>
        </SimpleGrid>
      </Stack>
    </Paper>
  );
}

export const statusPanel: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  defaultExpanded: false,
};
