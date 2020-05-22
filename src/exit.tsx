import * as React from "react";

import { PortalValue, PortalContext } from "./context";

interface ExitPortalProps {
  name: string;
  children?: React.ReactNode;
}

export function ExitPortal(props: ExitPortalProps): JSX.Element | null {
  const portalValue: PortalValue | null = React.useContext(PortalContext);

  if (!portalValue) {
    throw new Error(`ExitPortal must be used inside a PortalProvider.`);
  }

  return (
    <React.Fragment>{portalValue.getPortal(props.name) || null}</React.Fragment>
  );
}
