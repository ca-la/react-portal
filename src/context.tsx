import * as React from 'react';

interface PortalProviderProps {
  children?: React.ReactNode;
}

export interface PortalValue {
  setPortal: (name: string, children: React.ReactNode) => void;
  getPortal: (name: string) => React.ReactNode | undefined;
}

export const PortalContext = React.createContext<PortalValue | null>(null);

export function PortalProvider(props: PortalProviderProps): JSX.Element {
  const [portals, setPortals] = React.useState<Map<string, React.ReactNode>>(
    new Map()
  );

  const setPortal = React.useCallback(
    (name: string, children: React.ReactNode): void => {
      const newPortals = new Map(portals);
      newPortals.set(name, children);
      setPortals(newPortals);
    },
    [portals, setPortals]
  );
  const getPortal = React.useCallback(
    (name: string): React.ReactNode | undefined => {
      return portals.get(name);
    },
    [portals]
  );

  return (
    <PortalContext.Provider
      value={{
        setPortal,
        getPortal
      }}
    >
      {props.children}
    </PortalContext.Provider>
  );
}
