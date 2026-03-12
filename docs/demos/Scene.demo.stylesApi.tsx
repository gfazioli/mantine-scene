import { Scene } from '@gfazioli/mantine-scene';
import { MantineDemo } from '@mantinex/demo';
import { SceneStylesApi } from '../styles-api/Scene.styles-api';

const code = `
import { Scene } from "@gfazioli/mantine-scene";
import { data } from './data';

function Demo() {
  return (
    <Scene{{props}} variant="3d" label="Example Label" size="xl" />
  );
}
`;

function Demo(props: any) {
  return <Scene {...props} variant="3d" label="Example Label" size="xl" />;
}

export const stylesApi: MantineDemo = {
  type: 'styles-api',
  data: SceneStylesApi,
  component: Demo,
  code,
  centered: true,
};
