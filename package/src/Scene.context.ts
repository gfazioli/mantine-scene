import { createSafeContext, type GetStylesApi } from '@mantine/core';
import type { SceneFactory } from './Scene';

export interface SceneMousePosition {
  /** Mouse X as percentage (0-100) relative to the Scene container */
  x: number;
  /** Mouse Y as percentage (0-100) relative to the Scene container */
  y: number;
}

interface SceneContextValue {
  getStyles: GetStylesApi<SceneFactory>;
  /** Mouse position when `interactive` is true, null otherwise */
  mouse: SceneMousePosition | null;
}

export const [SceneProvider, useSceneContext] = createSafeContext<SceneContextValue>(
  'Scene component was not found in tree'
);
