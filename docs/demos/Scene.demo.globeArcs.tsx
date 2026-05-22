import { Scene } from '@gfazioli/mantine-scene';
import { Box } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';
import React from 'react';

const code = `
import { Scene } from '@gfazioli/mantine-scene';
import { Box } from '@mantine/core';

// Flight network — every city is both a marker and the endpoint of arcs.
const ROM: [number, number] = [41.9028, 12.4964];
const NYC: [number, number] = [40.7128, -74.006];
const TYO: [number, number] = [35.6762, 139.6503];
const SFO: [number, number] = [37.7595, -122.4367];
const SYD: [number, number] = [-33.8688, 151.2093];
const LHR: [number, number] = [51.5074, -0.1278];

function Demo() {
  return (
    <Box pos="relative" h={500} style={{ borderRadius: 'var(--mantine-radius-md)', overflow: 'hidden', background: 'var(--mantine-color-dark-9)' }}>
      <Scene lazy lazyThreshold={0.1}>
        <Scene.Globe
          size={400}
          markers={[ROM, NYC, TYO, SFO, SYD, LHR].map((location) => ({ location, size: 0.06 }))}
          arcs={[
            { from: ROM, to: NYC },
            { from: NYC, to: SFO },
            { from: SFO, to: TYO },
            { from: TYO, to: SYD },
            { from: LHR, to: ROM },
            { from: LHR, to: NYC },
          ]}
          arcColor="cyan.4"
          arcHeight={0.35}
          arcWidth={0.6}
          markerColor="orange.5"
        />
      </Scene>
    </Box>
  );
}
`;

const ROM: [number, number] = [41.9028, 12.4964];
const NYC: [number, number] = [40.7128, -74.006];
const TYO: [number, number] = [35.6762, 139.6503];
const SFO: [number, number] = [37.7595, -122.4367];
const SYD: [number, number] = [-33.8688, 151.2093];
const LHR: [number, number] = [51.5074, -0.1278];

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
      <Scene lazy lazyThreshold={0.1}>
        <Scene.Globe
          size={400}
          markers={[ROM, NYC, TYO, SFO, SYD, LHR].map((location) => ({ location, size: 0.06 }))}
          arcs={[
            { from: ROM, to: NYC },
            { from: NYC, to: SFO },
            { from: SFO, to: TYO },
            { from: TYO, to: SYD },
            { from: LHR, to: ROM },
            { from: LHR, to: NYC },
          ]}
          arcColor="cyan.4"
          arcHeight={0.35}
          arcWidth={0.6}
          markerColor="orange.5"
        />
      </Scene>
    </Box>
  );
}

export const globeArcs: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
};
