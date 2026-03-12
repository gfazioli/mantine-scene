import React from 'react';
import { render } from '@mantine-tests/core';
import { Scene } from './Scene';

describe('Scene', () => {
  it('renders without crashing', () => {
    const { container } = render(<Scene />);
    expect(container).toBeTruthy();
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Scene ref={ref} />);
    expect(ref.current).toBeTruthy();
  });

  it('applies fullscreen data attribute when fullscreen is true', () => {
    const { container } = render(<Scene fullscreen />);
    const root = container.querySelector('[data-fullscreen]');
    expect(root).toBeTruthy();
  });

  it('does not apply fullscreen data attribute by default', () => {
    const { container } = render(<Scene />);
    const root = container.querySelector('[data-fullscreen]');
    expect(root).toBeFalsy();
  });

  it('renders Gradient sub-component', () => {
    const { container } = render(
      <Scene>
        <Scene.Gradient colors={['red 0%', 'blue 100%']} />
      </Scene>
    );
    expect(container.querySelector('div div')).toBeTruthy();
  });

  it('renders DotGrid sub-component', () => {
    const { container } = render(
      <Scene>
        <Scene.DotGrid color="white" spacing={20} />
      </Scene>
    );
    expect(container.querySelector('div div')).toBeTruthy();
  });

  it('renders Glow sub-component', () => {
    const { container } = render(
      <Scene>
        <Scene.Glow color="purple" size={300} />
      </Scene>
    );
    expect(container.querySelector('div div')).toBeTruthy();
  });

  it('renders Mesh sub-component', () => {
    const { container } = render(
      <Scene>
        <Scene.Mesh stops={[{ color: 'red', position: '50% 50%' }]} />
      </Scene>
    );
    expect(container.querySelector('div div')).toBeTruthy();
  });

  it('renders Noise sub-component', () => {
    const { container } = render(
      <Scene>
        <Scene.Noise opacity={0.05} />
      </Scene>
    );
    expect(container.querySelector('div div')).toBeTruthy();
  });

  it('renders multiple sub-components together', () => {
    const { container } = render(
      <Scene>
        <Scene.Gradient />
        <Scene.Glow />
        <Scene.DotGrid />
        <Scene.Mesh />
        <Scene.Noise />
      </Scene>
    );
    const children = container.querySelector('[class]')?.children;
    expect(children?.length).toBe(5);
  });
});
