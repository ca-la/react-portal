import * as React from 'react';
import { TinyEmitter } from 'tiny-emitter';

interface PortalProviderProps {}

export interface PortalValue {
  subscribeToPortal: (name: string, callback: () => void) => void;
  unsubscribeFromPortal: (name: string, callback: () => void) => void;
  setPortal: (name: string, children: React.ReactNode) => void;
  getPortal: (name: string) => React.ReactNode | undefined;
}

const PortalContext = React.createContext<PortalValue | null>(null);

export class PortalProvider extends React.PureComponent<PortalProviderProps> {
  private emitter: TinyEmitter;
  private portals: Map<string, React.ReactNode>;

  constructor(props: PortalProviderProps) {
    super(props);

    this.emitter = new TinyEmitter();
    this.portals = new Map();
  }

  public componentWillUnmount(): void {
    this.portals.clear();
  }

  private subscribeToPortal = (name: string, callback: () => void): void => {
    this.emitter.on(name, callback);
  };

  private unsubscribeToPortal = (name: string, callback: () => void): void => {
    this.emitter.off(name, callback);
  };

  private setPortal = (name: string, children: React.ReactNode): void => {
    this.portals.set(name, children);
    this.emitter.emit(name, children);
  };

  private getPortal = (name: string): React.ReactNode | undefined => {
    return this.portals.get(name);
  };

  public render(): JSX.Element {
    return (
      <PortalContext.Provider
        value={{
          subscribeToPortal: this.subscribeToPortal,
          unsubscribeFromPortal: this.unsubscribeToPortal,
          setPortal: this.setPortal,
          getPortal: this.getPortal
        }}
      >
        {this.props.children}
      </PortalContext.Provider>
    );
  }
}

export const PortalConsumer = PortalContext.Consumer;
