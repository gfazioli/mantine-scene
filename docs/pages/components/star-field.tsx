import { Scene } from '@gfazioli/mantine-scene';
import { Anchor, Box, Container, Text, Title } from '@mantine/core';
import React from 'react';

export default function StarFieldStandalone() {
  return (
    <>
      <Scene fullscreen zIndex={0}>
        <Scene.StarField
          count={{ base: 200, md: 350 }}
          twinkle
          duration={3}
          minSize={1}
          maxSize={3}
          opacity={1}
        />
        <Scene.ShootingStar count={4} color="white" trailLength={120} speed={1.4} opacity={0.7} />
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
            Scene.StarField
          </Title>
          <Text c="dimmed" size="sm" mt={4}>
            Standalone view — dense star field with breathing twinkle and occasional shooting stars.
          </Text>
          <Anchor href="../" c="blue.4" size="sm" mt="md" style={{ display: 'inline-block' }}>
            &larr; Back to documentation
          </Anchor>
        </Container>
      </Box>
    </>
  );
}
