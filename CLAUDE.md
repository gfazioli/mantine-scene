# CLAUDE.md

## Project
`@gfazioli/mantine-scene` — A Mantine component that renders animated, canvas-based decorative backgrounds (aurora, star fields, snow, mesh gradients, and more) with 10 built-in sub-scenes and mouse-tracking support.
This repo (`mantine-scene`) also serves as the **GitHub template** (`mantine-base-component`) used to bootstrap all 21 Mantine Extensions component repositories. Changes to shared files here (Shell, Footer, scripts, configs) must be propagated manually to all component repos.

## Commands
| Command | Purpose |
|---------|---------|
| `yarn build` | Build the npm package via Rollup |
| `yarn dev` | Start the Next.js docs dev server (port 9281) |
| `yarn test` | Full test suite (syncpack + prettier + typecheck + lint + jest) |
| `yarn jest` | Run only Jest unit tests |
| `yarn docgen` | Generate component API docs (docgen.json) |
| `yarn docs:build` | Build the Next.js docs site for production |
| `yarn docs:deploy` | Build and deploy docs to GitHub Pages |
| `yarn lint` | Run ESLint |
| `yarn prettier:write` | Format all files with Prettier |
| `yarn storybook` | Start Storybook dev server |
| `yarn clean` | Remove build artifacts |
| `yarn release:patch` | Bump patch version and deploy docs |
| `diny yolo` | AI-assisted commit (stage all, generate message, commit + push) |

> **Important**: After changing the public API, always run `yarn clean && yarn build` before `yarn test`.

## Architecture

### Workspace Layout
Yarn workspaces monorepo with two workspaces: `package/` (npm package) and `docs/` (Next.js 15 documentation site).

### Package Source (`package/src/`)
- `Scene.tsx` — Main component (Factory pattern, not polymorphic). Renders a container with layered sub-scene children, tracks mouse position via context, and manages canvas refs.
- `Scene.context.ts` — React context providing mouse position (`SceneMousePosition`) to sub-scenes via `useSceneContext`.
- `Scene.module.css` — CSS module with custom properties for all dynamic values.
- `use-responsive-value.ts` — Custom hook (`useResponsiveValue`) for responsive prop values; exports `ResponsiveValue` type.
- `prng.ts` — Deterministic pseudo-random number generator used by canvas-based sub-scenes for reproducible animations.
- `index.ts` — Public API barrel file exporting `Scene`, all prop types, context hook, and `ResponsiveValue`.
- 10 sub-scene directories, each self-contained with its own component and styles:
  - `SceneAurora/` — Animated aurora borealis effect
  - `SceneDotGrid/` — Dot grid pattern background
  - `SceneGlow/` — Glowing light effect
  - `SceneGradient/` — Gradient background
  - `SceneMesh/` — Mesh gradient with configurable stops (`SceneMeshStop`)
  - `SceneNoise/` — Noise texture overlay
  - `SceneShootingStar/` — Animated shooting stars
  - `SceneSnow/` — Falling snow particles (canvas-based)
  - `SceneStarField/` — Static star field (canvas-based)
  - `SceneStarWarp/` — Warp-speed star animation (canvas-based)

### Build Pipeline
Rollup bundles to dual ESM/CJS with `'use client'` banner. CSS modules hashed with `hash-css-selector` (prefix `me`). TypeScript declarations via `rollup-plugin-dts`. CSS split into `styles.css` and `styles.layer.css`.

## Component Details
- **Compound component pattern**: Sub-scenes are registered as static properties on `Scene` (e.g., `Scene.Aurora`, `Scene.Snow`, `Scene.StarWarp`). Each sub-scene is a standalone component that reads mouse position from `SceneProvider` context.
- **Canvas-based rendering**: `SceneSnow`, `SceneStarField`, and `SceneStarWarp` use HTML5 Canvas with `requestAnimationFrame` loops. The PRNG (`prng.ts`) ensures deterministic particle placement for consistent rendering across mounts.
- **Responsive hook**: `useResponsiveValue` allows any numeric prop to accept breakpoint-keyed objects (e.g., `{ base: 100, md: 200 }`), resolved at runtime via `ResponsiveValue<T>`.
- **Mouse tracking**: The root `Scene` component tracks mouse position and exposes it via context so sub-scenes (like `SceneGlow` and `SceneAurora`) can react to cursor movement.
- **Styles API names**: `root`, `gradient`, `dotGrid`, `glow`, `mesh`, `noise`, `shootingStar`, `starField`, `starWarp`, `snow`, `aurora`.

## Testing
Jest with `jsdom`, `esbuild-jest` transform, CSS mocked via `identity-obj-proxy`. Tests use `@mantine-tests/core` render helper.

## Ecosystem
This repo is part of the Mantine Extensions ecosystem, derived from the `mantine-base-component` template. See the workspace `CLAUDE.md` (in the parent directory) for:
- Development checklist (code -> test -> build -> docs -> release)
- Cross-cutting patterns (compound components, responsive CSS, GitHub sync)
- Update packages workflow
- Release process
