import * as React from 'react';
import { cleanup, render } from '@testing-library/react';

import { PortalProvider, EntrancePortal } from './index';

describe('<PortalProvider />', () => {
  afterEach(cleanup);

  it('can render an app in the provider', () => {
    const SampleApp = (): JSX.Element => <div>Hello, World.</div>;
    const portalComponent = render(
      <PortalProvider>
        <SampleApp />
      </PortalProvider>
    );

    expect(portalComponent.getByText('Hello, World.')).toBeTruthy();
  });

  it('can contain an entrance portal with no exit', () => {
    const portalComponent = render(
      <PortalProvider>
        <div>
          Hello{' '}
          <EntrancePortal name='entrance-one'>
            <div>Entering the void.</div>
          </EntrancePortal>
          World
        </div>
      </PortalProvider>
    );

    expect(portalComponent.baseElement.textContent).toEqual('Hello World');
  });
});
