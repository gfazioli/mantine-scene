import { Scene } from '@gfazioli/mantine-scene';
import { Anchor, Box, Container, Text, Title } from '@mantine/core';
import React from 'react';

export default function ConfettiStandalone() {
  return (
    <>
      <Scene fullscreen zIndex={0}>
        <Scene.Confetti count={120} speed={1.2} flutter={80} opacity={1} origin="top" />
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
            Scene.Confetti
          </Title>
          <Text c="dimmed" size="sm" mt={4}>
            Standalone view — continuous rain of confetti pieces falling from the top.
          </Text>
          <Anchor href="../" c="blue.4" size="sm" mt="md" style={{ display: 'inline-block' }}>
            &larr; Back to documentation
          </Anchor>
        </Container>
      </Box>
    </>
  );
}
