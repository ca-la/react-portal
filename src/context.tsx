import * as React from 'react';

interface PortalProviderProps {
  children?: React.ReactNode;
}

export interface PortalValue {
  setPortal: (name: string, children: React.ReactNode) => void;
  getPortal: (name: string) => React.ReactNode | undefined;
}

interface PortalMap {
  [name: string]: React.ReactNode;
}

export const PortalContext = React.createContext<PortalValue | null>(null);

export function PortalProvider(props: PortalProviderProps): JSX.Element {
  const [portals, setPortals] = React.useState<PortalMap>({});

  const setPortal = React.useCallback(
    (name: string, children: React.ReactNode): void => {
      setPortals({ ...portals, [name]: children });
    },
    [portals, setPortals]
  );
  const getPortal = React.useCallback(
    (name: string): React.ReactNode | undefined => {
      return portals[name];
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
