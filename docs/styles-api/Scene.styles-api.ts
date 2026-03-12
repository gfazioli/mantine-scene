import { SceneFactory } from '@gfazioli/mantine-scene';
import type { StylesApiData } from '../components/styles-api.types';

export const SceneStylesApi: StylesApiData<SceneFactory> = {
  selectors: {
    root: 'Root element — the container for all layers',
    gradient: 'Gradient layer element (Scene.Gradient)',
    dotGrid: 'Dot grid pattern layer element (Scene.DotGrid)',
    glow: 'Glow blob layer element (Scene.Glow)',
    mesh: 'Mesh gradient layer element (Scene.Mesh)',
    noise: 'Noise texture layer element (Scene.Noise)',
    starField: 'Star field layer element (Scene.StarField)',
    shootingStar: 'Shooting star layer element (Scene.ShootingStar)',
    snow: 'Snow layer element (Scene.Snow)',
    aurora: 'Aurora layer element (Scene.Aurora)',
  },

  vars: {
    root: {
      '--scene-z-index': 'Controls z-index when fullscreen is true',
    },
  },

  modifiers: [
    {
      modifier: 'data-fullscreen',
      selector: 'root',
      condition: '`fullscreen` prop is true',
    },
    {
      modifier: 'data-reduced-motion',
      selector: 'root',
      condition: '`reducedMotion` prop value (`auto`, `always`, or `never`)',
    },
  ],
};
