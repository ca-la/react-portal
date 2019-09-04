import * as React from 'react';

import { PortalValue, PortalContext } from './context';

interface EntrancePortalProps {
  name: string;
  children?: React.ReactNode;
}

export function EntrancePortal(props: EntrancePortalProps): null {
  const portalValue: PortalValue | null = React.useContext(PortalContext);

  if (!portalValue) {
    throw new Error(`EntrancePortal must be used inside a PortalProvider.`);
  }

  React.useEffect((): (() => void) => {
    portalValue.setPortal(props.name, props.children);

    return function cleanup(): void {
      portalValue.setPortal(props.name, null);
    };
  }, [props.name, props.children]);

  return null;
}
