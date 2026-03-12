import { SceneFactory } from '@gfazioli/mantine-scene';
import type { StylesApiData } from '../components/styles-api.types';

export const SceneStylesApi: StylesApiData<SceneFactory> = {
  selectors: {
    root: 'Root element',
    scene: 'Scene element',
    label: 'Label element',
    glow: 'Outer glow effect element',
    light: 'Inner light reflection element',
  },

  vars: {
    root: {
      '--scene-size': 'Controls Scene width and height',
      '--scene-radius': 'Controls border radius',
      '--scene-color': 'Controls Scene base color',
      '--scene-intensity': 'Controls brightness intensity (0-1)',
      '--scene-animation-duration': 'Controls animation duration',
      '--scene-glow-size': 'Controls outer glow size',
      '--scene-justify-content': 'Controls label and Scene alignment',
    },
  },

  modifiers: [
    {
      modifier: 'data-value',
      selector: 'root',
      condition: '`value` prop is true',
    },
    {
      modifier: 'data-animate',
      selector: 'root',
      value: 'pulse | flash | breathe | blink | glow',
      condition: '`animate` prop is true and `value` is true',
    },
    {
      modifier: 'data-variant',
      selector: 'root',
      value: 'flat | 3d',
      condition: 'Based on `variant` prop',
    },
  ],
};
