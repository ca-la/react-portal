import * as React from 'react';
import { cleanup, render } from '@testing-library/react';

import { PortalProvider } from './index';

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
});
