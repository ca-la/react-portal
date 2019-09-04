import * as React from 'react';

import { PortalConsumer, PortalValue } from './context';

interface EntrancePortalProps {
  name: string;
  children?: React.ReactNode;
}

interface EntranceProps extends EntrancePortalProps {
  context: PortalValue;
}

class Entrance extends React.PureComponent<EntranceProps> {
  constructor(props: EntranceProps) {
    super(props);

    const { name, children, context } = this.props;
    context.setPortal(name, children);
  }

  public componentDidUpdate(oldProps: EntranceProps) {
    // TODO do a deep equal examination
    if (oldProps.children !== this.props.children) {
      this.props.context.setPortal(name, this.props.children);
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
      <PortalConsumer>
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
      </PortalConsumer>
    );
  }
}
