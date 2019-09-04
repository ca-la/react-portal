import * as React from 'react';
import { cleanup, render } from '@testing-library/react';

import { PortalProvider, EntrancePortal, ExitPortal } from './index';

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

  it('can contain an exit that is not connected to an entrance', () => {
    const portalComponent = render(
      <PortalProvider>
        <div>
          a{' '}
          <EntrancePortal name='entrance-one'>
            <div>Entering the void.</div>
          </EntrancePortal>
          b <ExitPortal name='entrance-two' />c
        </div>
      </PortalProvider>
    );

    expect(portalComponent.baseElement.textContent).toEqual('a b c');
  });

  it('can pass contents from an entrance to a matching exit', () => {
    const portalComponent = render(
      <PortalProvider>
        <div>
          a{' '}
          <EntrancePortal name='one'>
            <div>Inside the portal.</div>
          </EntrancePortal>
          b <ExitPortal name='one' />c
        </div>
      </PortalProvider>
    );

    expect(portalComponent.baseElement.textContent).toEqual(
      'a b Inside the portal.c'
    );
  });

  it('can pass contents from an entrance to a matching exit in any order', () => {
    const portalComponent = render(
      <PortalProvider>
        <div>
          <ExitPortal name='one' />a{' '}
          <EntrancePortal name='one'>
            <div>Inside the portal.</div>
          </EntrancePortal>
          b c
        </div>
      </PortalProvider>
    );

    expect(portalComponent.baseElement.textContent).toEqual(
      'Inside the portal.a b c'
    );
  });

  it('can pass contents from multiple entrances to the matching exit', () => {
    const portalComponent = render(
      <PortalProvider>
        <div>
          <ExitPortal name='one' />a{' '}
          <EntrancePortal name='one'>
            <div>Inside the portal. </div>
          </EntrancePortal>
          b <ExitPortal name='one' />c <ExitPortal name='one' />
        </div>
      </PortalProvider>
    );

    expect(portalComponent.baseElement.textContent).toEqual(
      'Inside the portal. a b Inside the portal. c Inside the portal. '
    );
  });

  it('can pass contents from a deeply nested entrance to a deeply nested exit', () => {
    const portalComponent = render(
      <PortalProvider>
        <div>
          <div>
            <span>This is interesting. </span>
            <EntrancePortal name='one'>
              <span>
                Wow. <div>Inside the portal. </div>
              </span>
            </EntrancePortal>
            <div>
              <button></button>
            </div>
          </div>
          <span>
            <table>
              <tbody>
                <tr>
                  <td>
                    <ExitPortal name='one' />
                  </td>
                </tr>
              </tbody>
            </table>
          </span>
        </div>
      </PortalProvider>
    );

    expect(portalComponent.baseElement.textContent).toEqual(
      'This is interesting. Wow. Inside the portal. '
    );
  });

  it('the last entrance renders to the exit', () => {
    const portalComponent = render(
      <PortalProvider>
        <div>
          <ExitPortal name='one' /> a{' '}
          <EntrancePortal name='one'>
            <div>1. Inside the portal</div>
          </EntrancePortal>
          b c
          <EntrancePortal name='one'>
            <div>2. Inside the portal</div>
          </EntrancePortal>
        </div>
      </PortalProvider>
    );

    expect(portalComponent.baseElement.textContent).toEqual(
      '2. Inside the portal a b c'
    );
  });

  it('the exit never renders its own children', () => {
    const portalComponent = render(
      <PortalProvider>
        <div>
          <ExitPortal name='one'>
            <div>I am an exit portal.</div>
          </ExitPortal>{' '}
          a{' '}
          <EntrancePortal name='one'>
            <div>Inside the portal.</div>
          </EntrancePortal>
          b c
        </div>
      </PortalProvider>
    );

    expect(portalComponent.baseElement.textContent).toEqual(
      'Inside the portal. a b c'
    );
  });
});
