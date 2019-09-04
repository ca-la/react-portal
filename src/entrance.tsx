import * as React from 'react';

import { PortalValue, PortalContext } from './context';

interface EntrancePortalProps {
  name: string;
  children?: React.ReactNode;
}

export function EntrancePortal(props: EntrancePortalProps): null {
  const portalValue: PortalValue | null = React.useContext(PortalContext);

  // TODO: throw error?
  if (!portalValue) {
    return null;
  }

  React.useEffect((): (() => void) => {
    portalValue.setPortal(props.name, props.children);

    return function cleanup(): void {
      portalValue.setPortal(props.name, null);
    };
  }, [props.name, props.children]);

  return null;
}
