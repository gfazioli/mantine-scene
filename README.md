# Mantine Scene Component

<img alt="Mantine Scene" src="https://github.com/gfazioli/mantine-scene/blob/master/logo.jpeg" />

<div align="center">

  [![NPM version](https://img.shields.io/npm/v/%40gfazioli%2Fmantine-scene?style=for-the-badge)](https://www.npmjs.com/package/@gfazioli/mantine-scene)
  [![NPM Downloads](https://img.shields.io/npm/dm/%40gfazioli%2Fmantine-scene?style=for-the-badge)](https://www.npmjs.com/package/@gfazioli/mantine-scene)
  [![NPM Downloads](https://img.shields.io/npm/dy/%40gfazioli%2Fmantine-scene?style=for-the-badge&label=%20&color=f90)](https://www.npmjs.com/package/@gfazioli/mantine-scene)
  ![NPM License](https://img.shields.io/npm/l/%40gfazioli%2Fmantine-scene?style=for-the-badge)

---

[<kbd> <br/> ❤️ If this component has been useful to you or your team, please consider becoming a sponsor <br/> </kbd>](https://github.com/sponsors/gfazioli?o=esc)

</div>

## Overview

This component is created on top of the [Mantine](https://mantine.dev/) library.
It requires **Mantine 9.x** and **React 19**.

[Mantine Scene](https://gfazioli.github.io/mantine-scene/) is a decorative background container that composes multiple visual layers to create rich, atmospheric backgrounds for your React applications. Place it behind your content and combine sub-components to build anything from subtle gradients to full starfield environments.

## Sub-components

| Component | Description |
|-----------|-------------|
| `Scene.Gradient` | Radial, linear, or conic gradient with optional rotate/pulse animation |
| `Scene.Glow` | Floating, animated glow blobs with float/pulse/breathe variants |
| `Scene.DotGrid` | Repeating dot pattern with stagger, fade masks, and twinkle animation |
| `Scene.Mesh` | Multi-stop radial gradient overlay simulating a mesh gradient |
| `Scene.Noise` | SVG-based film grain texture with configurable seed, type, and color tint |
| `Scene.StarField` | CSS-only star field with deterministic PRNG positioning and twinkle animation |
| `Scene.StarWarp` | Hyperspace warp-speed effect with configurable focal point and direction |
| `Scene.ShootingStar` | Animated shooting star trails at configurable angles and intervals |
| `Scene.Snow` | Falling snowflakes with horizontal drift and wind control |
| `Scene.Rain` | Angled rain streaks with optional bottom-edge splash effect |
| `Scene.Confetti` | Multi-shape confetti (rectangles, circles, triangles) with continuous or burst (`onComplete`) modes and configurable origin (`top`/`bottom`) |
| `Scene.Waves` | Parallax SVG wave layers with configurable direction, parallax intensity, and seamless horizontal panning |
| `Scene.Aurora` | Shimmering aurora borealis bands with wave animation |

## Features

- 🎨 **Theme Integration**: All color props accept Mantine theme colors (`MantineColor`)
- 🧩 **Composable**: Freely combine any number of sub-components — layer order follows DOM order
- ✨ **Rich Animations**: GPU-accelerated CSS animations (transform/opacity) with per-component controls
- 🖱️ **Interactive Mode**: Enable mouse tracking — Glow, Gradient, and StarWarp react to cursor position with configurable LERP easing. Use `onMousePosition` to pipe smoothed coordinates to external UI
- 💤 **Lazy Mode**: Optional `lazy` prop pauses every child animation and the internal rAF loop when the scene leaves the viewport (via `IntersectionObserver`) — zero React re-renders
- 📱 **Responsive Props**: Dimension props (`size`, `blur`, `spacing`) use Mantine's native `StyleProp<T>` with `InlineStyles` + media queries — zero re-renders on resize, same pattern as `SimpleGrid`
- ♿ **Accessibility**: `aria-hidden="true"` by default; respects `prefers-reduced-motion` with configurable `reducedMotion` prop
- 🖥️ **Fullscreen**: Set `fullscreen` to cover the entire viewport with `position: fixed`
- 🎨 **Styles API**: Full Mantine Styles API support for all sub-components
- 📦 **TypeScript**: Complete type safety with exported prop interfaces and factory types

> [!note]
>
> → [Demo and Documentation](https://gfazioli.github.io/mantine-scene/) → [More Mantine Components](https://mantine-extensions.vercel.app/)

## Installation

```sh
npm install @gfazioli/mantine-scene
```
or

```sh
yarn add @gfazioli/mantine-scene
```

After installation import package styles at the root of your application:

```tsx
import '@gfazioli/mantine-scene/styles.css';
```

## Usage

```tsx
import { Scene } from '@gfazioli/mantine-scene';
import { Box, Text } from '@mantine/core';

function Demo() {
  return (
    <Box pos="relative" h={400}>
      <Scene>
        <Scene.StarField count={{ base: 50, md: 100 }} twinkle />
        <Scene.Gradient from="violet" fromOpacity={0.15} />
        <Scene.Glow color="violet" size={400} blur={120} opacity={0.3} top="20%" left="30%" />
        <Scene.DotGrid color="gray" opacity={0.3} spacing={24} />
        <Scene.Noise opacity={0.025} />
      </Scene>
      <Box pos="relative" style={{ zIndex: 1 }} p="xl">
        <Text size="xl" fw={700} c="white">Your content here</Text>
      </Box>
    </Box>
  );
}
```

## Sponsor

<div align="center">

[<kbd> <br/> ❤️ If this component has been useful to you or your team, please consider becoming a sponsor <br/> </kbd>](https://github.com/sponsors/gfazioli?o=esc)

</div>

Your support helps me:

- Keep the project actively maintained with timely bug fixes and security updates
- Add new features, improve performance, and refine the developer experience
- Expand test coverage and documentation for smoother adoption
- Ensure long‑term sustainability without relying on ad hoc free time
- Prioritize community requests and roadmap items that matter most

Open source thrives when those who benefit can give back—even a small monthly contribution makes a real difference. Sponsorships help cover maintenance time, infrastructure, and the countless invisible tasks that keep a project healthy.

Your help truly matters.

💚 [Become a sponsor](https://github.com/sponsors/gfazioli?o=esc) today and help me keep this project reliable, up‑to‑date, and growing for everyone.

---

[![Star History Chart](https://api.star-history.com/svg?repos=gfazioli/mantine-scene&type=Timeline)](https://www.star-history.com/#gfazioli/mantine-scene&Timeline)
