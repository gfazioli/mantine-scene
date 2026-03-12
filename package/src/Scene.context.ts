import { createSafeContext, type GetStylesApi } from '@mantine/core';
import type { SceneFactory } from './Scene';

interface SceneContextValue {
  getStyles: GetStylesApi<SceneFactory>;
}

export const [SceneProvider, useSceneContext] = createSafeContext<SceneContextValue>(
  'Scene component was not found in tree'
);
