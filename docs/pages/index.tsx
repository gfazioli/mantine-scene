import { DocsTabs } from '../components/DocsTabs';
import { PageHeader } from '../components/PageHeader';
import { Shell } from '../components/Shell';
import { PACKAGE_DATA } from '../data';
import docgen from '../docgen.json';
import Docs from '../docs.mdx';

export default function HomePage() {
  return (
    <Shell>
      <PageHeader data={PACKAGE_DATA} />
      <DocsTabs
        docgen={docgen}
        componentsProps={[
          'Scene',
          'SceneGradient',
          'SceneGlow',
          'SceneDotGrid',
          'SceneMesh',
          'SceneNoise',
          'SceneStarField',
          'SceneShootingStar',
          'SceneSnow',
          'SceneRain',
          'SceneConfetti',
          'SceneAurora',
          'SceneStarWarp',
          'SceneWaves',
        ]}
        componentPrefix="Scene"
      >
        <Docs />
      </DocsTabs>
    </Shell>
  );
}
