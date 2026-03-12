import React from 'react';
import { Scene } from '@gfazioli/mantine-scene';
import { Anchor, Box, Container, Text, Title } from '@mantine/core';

export default function FullscreenPage() {
  return (
    <>
      <Scene fullscreen zIndex={0}>
        <Scene.Gradient
          type="radial"
          position="center top"
          colors={['rgba(120, 0, 255, 0.15) 0%', 'rgba(255, 0, 128, 0.08) 40%', 'transparent 70%']}
        />
        <Scene.Gradient
          type="linear"
          angle={180}
          colors={['transparent 0%', 'rgba(0, 0, 0, 0.6) 100%']}
        />
        <Scene.StarField count={150} twinkle duration={4} opacity={0.8} />
        <Scene.ShootingStar count={3} trailLength={100} opacity={0.6} />
        <Scene.Aurora
          colors={['green', 'teal', 'cyan']}
          bands={3}
          opacity={0.15}
          blur={80}
          duration={12}
        />
        <Scene.Glow
          color="rgba(120, 0, 255, 0.25)"
          size={700}
          blur={160}
          opacity={0.4}
          top="10%"
          left="20%"
          duration={10}
        />
        <Scene.Glow
          color="rgba(255, 0, 128, 0.2)"
          size={500}
          blur={140}
          opacity={0.35}
          top="20%"
          left="75%"
          duration={14}
        />
        <Scene.Glow
          color="rgba(0, 200, 255, 0.15)"
          size={400}
          blur={120}
          opacity={0.3}
          top="60%"
          left="50%"
          duration={12}
        />
        <Scene.DotGrid color="rgba(255, 255, 255, 0.03)" spacing={30} dotSize={1} fade="edges" />
        <Scene.Mesh
          stops={[
            { color: 'rgba(120, 0, 255, 0.08)', position: '10% 20%' },
            { color: 'rgba(255, 0, 128, 0.06)', position: '80% 30%' },
            { color: 'rgba(0, 200, 255, 0.05)', position: '50% 80%' },
          ]}
          opacity={0.6}
        />
        <Scene.Noise opacity={0.03} grain={0.6} />
      </Scene>

      <Box
        style={{
          position: 'relative',
          zIndex: 1,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'auto',
        }}
      >
        <Container size="sm" ta="center">
          <Title order={1} c="white" fw={800} fz={48}>
            Mantine Scene
          </Title>
          <Text c="dimmed" size="xl" mt="md" maw={500} mx="auto">
            Composable decorative backgrounds for React applications built with Mantine
          </Text>
          <Text c="dimmed" size="sm" mt="xl">
            This page demonstrates <code>Scene</code> in fullscreen mode with all layers combined:
            gradients, glow blobs, star field, shooting stars, aurora, dot grid, mesh gradient, and
            noise texture.
          </Text>
          <Anchor href="." c="blue.4" size="sm" mt="lg" style={{ display: 'inline-block' }}>
            &larr; Back to documentation
          </Anchor>
        </Container>
      </Box>
    </>
  );
}
