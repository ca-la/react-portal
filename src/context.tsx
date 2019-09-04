import * as React from 'react';
import * as Emitter from 'tiny-emitter';

interface PortalProviderProps {}

// TODO: tighten types
export interface PortalValue {
  subscribeToPortal: Function;
  unsubscribeFromPortal: Function;
  setPortal: Function;
  getPortal: Function;
}

const PortalContext = React.createContext<PortalValue | null>(null);

export class Provider extends React.PureComponent<PortalProviderProps> {
  private emitter: Emitter.TinyEmitter | null = null;
  private portals: Map<string, any[]> = new Map();

  constructor(props: PortalProviderProps) {
    super(props);

    this.emitter = new Emitter.TinyEmitter();
    this.portals = new Map();
  }

  public componentWillUnmount(): void {
    this.emitter = null;
    this.portals.clear();
  }

  private subscribeToPortal = (name: string, callback: Function): void => {
    if (this.emitter) {
      this.emitter.on(name, callback);
    }
  };

  private unsubscribeToPortal = (name: string, callback: Function): void => {
    if (this.emitter) {
      this.emitter.off(name, callback);
    }
  };

  private setPortal = (name: string, ...args: any[]): void => {
    this.portals.set(name, args);
    if (this.emitter) {
      this.emitter.emit(name, args);
    }
  };

  private getPortal = (name: string): any[] | undefined => {
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

export const Consumer = PortalContext.Consumer;
