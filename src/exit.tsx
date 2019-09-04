import * as React from 'react';

import { Consumer, PortalValue } from './context';

interface ExitPortalProps {
  name: string;
  children: React.ReactNode;
}

interface ExitProps extends ExitPortalProps {
  context: PortalValue;
}

class Exit extends React.PureComponent<ExitProps> {
  public componentDidMount() {
    const { name, context } = this.props;
    context.subscribeToPortal(name, this.forceUpdater);
  }

  public componentWillUnmount() {
    const { name, context } = this.props;
    context.unsubscribeFromPortal(name, this.forceUpdater);
  }

  public render(): JSX.Element {
    const { name, children, context } = this.props;
    const portalChildren = context.getPortal(name) || children;
    return portalChildren;
  }

  private forceUpdater = () => this.forceUpdate();
}

export class ExitPortal extends React.PureComponent<ExitPortalProps> {
  public render(): JSX.Element {
    return (
      <Consumer>
        {(portalContext: PortalValue | null): JSX.Element | null => {
          if (!portalContext) {
            return null;
          }

          return (
            <Exit context={portalContext} name={this.props.name}>
              {this.props.children}
            </Exit>
          );
        }}
      </Consumer>
    );
  }
}
