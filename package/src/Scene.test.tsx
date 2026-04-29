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

  it('has aria-hidden attribute', () => {
    const { container } = render(<Scene />);
    const root = container.querySelector('[aria-hidden="true"]');
    expect(root).toBeTruthy();
  });

  it('applies reduced-motion data attribute', () => {
    const { container } = render(<Scene reducedMotion="always" />);
    const root = container.querySelector('[data-reduced-motion="always"]');
    expect(root).toBeTruthy();
  });

  it('defaults reduced-motion to auto', () => {
    const { container } = render(<Scene />);
    const root = container.querySelector('[data-reduced-motion="auto"]');
    expect(root).toBeTruthy();
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

  it('renders StarField sub-component', () => {
    const { container } = render(
      <Scene>
        <Scene.StarField count={50} />
      </Scene>
    );
    expect(container.querySelector('div div')).toBeTruthy();
  });

  it('renders ShootingStar sub-component', () => {
    const { container } = render(
      <Scene>
        <Scene.ShootingStar count={2} />
      </Scene>
    );
    expect(container.querySelector('div div')).toBeTruthy();
  });

  it('renders Snow sub-component', () => {
    const { container } = render(
      <Scene>
        <Scene.Snow count={20} />
      </Scene>
    );
    expect(container.querySelector('div div')).toBeTruthy();
  });

  it('renders StarWarp sub-component', () => {
    const { container } = render(
      <Scene>
        <Scene.StarWarp count={20} />
      </Scene>
    );
    expect(container.querySelector('div div')).toBeTruthy();
  });

  it('renders Aurora sub-component', () => {
    const { container } = render(
      <Scene>
        <Scene.Aurora />
      </Scene>
    );
    expect(container.querySelector('div div')).toBeTruthy();
  });

  it('renders Rain sub-component', () => {
    const { container } = render(
      <Scene>
        <Scene.Rain count={10} />
      </Scene>
    );
    expect(container.querySelector('div div')).toBeTruthy();
  });

  it('renders Rain sub-component with splash', () => {
    const { container } = render(
      <Scene>
        <Scene.Rain count={10} splash splashCount={5} />
      </Scene>
    );
    expect(container.querySelector('div div')).toBeTruthy();
  });

  it('renders Confetti sub-component', () => {
    const { container } = render(
      <Scene>
        <Scene.Confetti count={10} />
      </Scene>
    );
    expect(container.querySelector('div div')).toBeTruthy();
  });

  it('renders Waves sub-component', () => {
    const { container } = render(
      <Scene>
        <Scene.Waves count={3} />
      </Scene>
    );
    // Waves renders one <svg> per layer
    const svgs = container.querySelectorAll('svg');
    expect(svgs.length).toBeGreaterThanOrEqual(3);
  });

  it('renders Waves with array of colors', () => {
    const { container } = render(
      <Scene>
        <Scene.Waves count={2} colors={['violet', 'pink']} position="top" />
      </Scene>
    );
    expect(container.querySelectorAll('svg').length).toBeGreaterThanOrEqual(2);
  });

  it('fires Confetti onComplete in burst mode', async () => {
    jest.useFakeTimers();
    const onComplete = jest.fn();
    render(
      <Scene>
        <Scene.Confetti count={5} burst duration={1} speed={1} seed={1} onComplete={onComplete} />
      </Scene>
    );
    jest.advanceTimersByTime(5000);
    expect(onComplete).toHaveBeenCalledTimes(1);
    jest.useRealTimers();
  });

  it('renders multiple sub-components together', () => {
    const { container } = render(
      <Scene>
        <Scene.Gradient />
        <Scene.Glow />
        <Scene.DotGrid />
        <Scene.Mesh />
        <Scene.Noise />
        <Scene.StarField />
        <Scene.ShootingStar />
        <Scene.StarWarp />
        <Scene.Snow />
        <Scene.Rain />
        <Scene.Confetti />
        <Scene.Waves count={2} />
        <Scene.Aurora />
      </Scene>
    );
    const root = container.querySelector('[class]');
    const layers = root?.querySelectorAll(':scope > div');
    expect(layers?.length).toBe(13);
  });
});
