import { Scene } from '@gfazioli/mantine-scene';
import { Anchor, Box, Container, Text, Title } from '@mantine/core';
import React from 'react';

export default function StarWarpStandalone() {
  return (
    <>
      <Scene fullscreen zIndex={0} interactive>
        <Scene.StarWarp count={150} speed={1} direction="out" trail opacity={0.9} />
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
            Scene.StarWarp
          </Title>
          <Text c="dimmed" size="sm" mt={4}>
            Standalone view — move the cursor across the viewport to shift the focal point.
          </Text>
          <Anchor href="../" c="blue.4" size="sm" mt="md" style={{ display: 'inline-block' }}>
            &larr; Back to documentation
          </Anchor>
        </Container>
      </Box>
    </>
  );
}
