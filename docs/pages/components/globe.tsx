import { Scene } from '@gfazioli/mantine-scene';
import { Anchor, Box, Container, Text, Title } from '@mantine/core';
import React from 'react';

const CITIES: { location: [number, number]; size: number }[] = [
  { location: [41.9028, 12.4964], size: 0.07 },
  { location: [40.7128, -74.006], size: 0.07 },
  { location: [35.6762, 139.6503], size: 0.07 },
  { location: [37.7595, -122.4367], size: 0.07 },
  { location: [-33.8688, 151.2093], size: 0.07 },
  { location: [51.5074, -0.1278], size: 0.07 },
];

const ARCS = [
  { from: CITIES[0].location, to: CITIES[1].location },
  { from: CITIES[1].location, to: CITIES[3].location },
  { from: CITIES[3].location, to: CITIES[2].location },
  { from: CITIES[2].location, to: CITIES[4].location },
  { from: CITIES[5].location, to: CITIES[0].location },
];

export default function GlobeStandalone() {
  return (
    <>
      <Scene fullscreen zIndex={0} interactive>
        <Scene.Globe
          size={Math.min(typeof window !== 'undefined' ? window.innerHeight * 0.85 : 700, 800)}
          markers={CITIES}
          arcs={ARCS}
          arcColor="cyan.4"
          arcHeight={0.35}
          baseColor="gray.7"
          glowColor="blue.5"
          markerColor="orange.5"
          mapSamples={16000}
          mapBrightness={6}
          diffuse={3}
          dark={1}
          autoRotate
          autoRotateSpeed={0.005}
          interactive
          inertia
          followCursor
        />
      </Scene>

      <Box
        style={{
          position: 'relative',
          zIndex: 1,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: 32,
          pointerEvents: 'none',
        }}
      >
        <Container size="sm" style={{ pointerEvents: 'auto' }}>
          <Title order={2} c="white" fw={700} fz={28}>
            Scene.Globe
          </Title>
          <Text c="dimmed" size="sm" mt={4}>
            Standalone view — drag to rotate, move the cursor to bias the spin, release for inertia.
          </Text>
          <Anchor href="../" c="blue.4" size="sm" mt="md" style={{ display: 'inline-block' }}>
            &larr; Back to documentation
          </Anchor>
        </Container>
      </Box>
    </>
  );
}
