import * as React from "react";

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

type PortalAction = {
  type: "portals/SET";
  name: string;
  children: React.ReactNode;
};

function portalReducer(state: PortalMap, action: PortalAction): PortalMap {
  switch (action.type) {
    case "portals/SET": {
      return {
        ...state,
        [action.name]: action.children,
      };
    }

    default:
      return state;
  }
}

export const PortalContext = React.createContext<PortalValue | null>(null);

export function PortalProvider(props: PortalProviderProps): JSX.Element {
  const [portalState, portalDispatch] = React.useReducer<
    React.Reducer<PortalMap, PortalAction>
  >(portalReducer, {});

  const setPortal = React.useCallback(
    (name: string, children: React.ReactNode): void => {
      portalDispatch({ type: "portals/SET", name, children });
    },
    [portalDispatch]
  );
  const getPortal = React.useCallback(
    (name: string): React.ReactNode | undefined => {
      return portalState[name];
    },
    [portalState]
  );

  return (
    <PortalContext.Provider
      value={{
        setPortal,
        getPortal,
      }}
    >
      {props.children}
    </PortalContext.Provider>
  );
}
