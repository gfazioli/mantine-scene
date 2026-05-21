import { generateDeclarations } from 'mantine-docgen-script';
import path from 'path';

const getComponentPath = (componentPath: string) =>
  path.join(process.cwd(), 'package/src', componentPath);

generateDeclarations({
  componentsPaths: [
    getComponentPath('Scene.tsx'),
    getComponentPath('SceneGradient/SceneGradient.tsx'),
    getComponentPath('SceneGlow/SceneGlow.tsx'),
    getComponentPath('SceneDotGrid/SceneDotGrid.tsx'),
    getComponentPath('SceneMesh/SceneMesh.tsx'),
    getComponentPath('SceneNoise/SceneNoise.tsx'),
    getComponentPath('SceneStarField/SceneStarField.tsx'),
    getComponentPath('SceneShootingStar/SceneShootingStar.tsx'),
    getComponentPath('SceneSnow/SceneSnow.tsx'),
    getComponentPath('SceneRain/SceneRain.tsx'),
    getComponentPath('SceneConfetti/SceneConfetti.tsx'),
    getComponentPath('SceneAurora/SceneAurora.tsx'),
    getComponentPath('SceneStarWarp/SceneStarWarp.tsx'),
    getComponentPath('SceneWaves/SceneWaves.tsx'),
    getComponentPath('SceneRadar/SceneRadar.tsx'),
    getComponentPath('SceneBeams/SceneBeams.tsx'),
    getComponentPath('SceneGlobe/SceneGlobe.tsx'),
  ],
  tsConfigPath: path.join(process.cwd(), 'tsconfig.json'),
  outputPath: path.join(process.cwd(), 'docs'),
});
