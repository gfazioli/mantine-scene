import { Scene } from '@gfazioli/mantine-scene';
import { Box } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';
import React from 'react';

const code = `
import { Scene } from '@gfazioli/mantine-scene';
import { Box } from '@mantine/core';

const cities = [
  { location: [41.9028, 12.4964] as [number, number], size: 0.08 },   // Rome
  { location: [40.7128, -74.006] as [number, number], size: 0.08 },   // New York
  { location: [35.6762, 139.6503] as [number, number], size: 0.08 },  // Tokyo
  { location: [37.7595, -122.4367] as [number, number], size: 0.08 }, // San Francisco
  { location: [-33.8688, 151.2093] as [number, number], size: 0.08 }, // Sydney
  { location: [51.5074, -0.1278] as [number, number], size: 0.08 },   // London
];

function Demo() {
  return (
    <Box pos="relative" h={500} style={{ borderRadius: 'var(--mantine-radius-md)', overflow: 'hidden', background: 'var(--mantine-color-dark-9)' }}>
      <Scene>
        <Scene.Globe
          size={400}
          markers={cities}
          markerColor="orange.5"
          baseColor="gray.7"
          glowColor="blue.5"
        />
      </Scene>
    </Box>
  );
}
`;

const cities = [
  { location: [41.9028, 12.4964] as [number, number], size: 0.08 },
  { location: [40.7128, -74.006] as [number, number], size: 0.08 },
  { location: [35.6762, 139.6503] as [number, number], size: 0.08 },
  { location: [37.7595, -122.4367] as [number, number], size: 0.08 },
  { location: [-33.8688, 151.2093] as [number, number], size: 0.08 },
  { location: [51.5074, -0.1278] as [number, number], size: 0.08 },
];

function Demo() {
  return (
    <Box
      pos="relative"
      h={500}
      style={{
        borderRadius: 'var(--mantine-radius-md)',
        overflow: 'hidden',
        background: 'var(--mantine-color-dark-9)',
      }}
    >
      <Scene>
        <Scene.Globe
          size={400}
          markers={cities}
          markerColor="orange.5"
          baseColor="gray.7"
          glowColor="blue.5"
        />
      </Scene>
    </Box>
  );
}

export const globeMarkers: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
};
