import * as React from 'react';

import { Consumer, PortalValue } from './context';

interface EntrancePortalProps {
  name: string;
  children: React.ReactNode;
}

interface EntranceProps extends EntrancePortalProps {
  context: PortalValue;
}

class Entrance extends React.PureComponent<EntranceProps> {
  public componentDidMount() {
    const { name, children, context } = this.props;
    context.setPortal(name, children);
  }

  public componentWillReceiveProps(newProps: EntranceProps) {
    const oldProps = this.props;
    const { name, children, context } = newProps;

    // TODO do a deep equal examination
    if (oldProps.children !== newProps.children) {
      context.setPortal(name, children);
    }
  }

  public componentWillUnmount() {
    const { name, context } = this.props;
    context.setPortal(name, null);
  }

  public render(): null {
    return null;
  }
}

export class EntrancePortal extends React.PureComponent<EntrancePortalProps> {
  public render(): JSX.Element {
    return (
      <Consumer>
        {(portalContext: PortalValue | null): JSX.Element | null => {
          if (!portalContext) {
            return null;
          }

          return (
            <Entrance context={portalContext} name={this.props.name}>
              {this.props.children}
            </Entrance>
          );
        }}
      </Consumer>
    );
  }
}
