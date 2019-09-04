import * as React from 'react';

import { PortalValue, PortalContext } from './context';

interface ExitPortalProps {
  name: string;
  children?: React.ReactNode;
}

export function ExitPortal(props: ExitPortalProps): JSX.Element | null {
  const portalValue: PortalValue | null = React.useContext(PortalContext);

  // TODO: throw error?
  if (!portalValue) {
    return null;
  }

  return (
    <React.Fragment>{portalValue.getPortal(props.name) || null}</React.Fragment>
  );
}
