import * as React from 'react';
import * as styles from './requestView.m.scss';
import classnames from 'classnames';
import Request from '../../../models/request';
import Tabs from '../../../elements/tabs/tabs';
import Tab from '../../../elements/tabs/tab';
import Body from '../body/body';
import Headers from '../headers/headers';

export interface IRequestComponentProps {
  request?: Request;
  onChange?(request: Request): void;
}

export default class RequestView extends React.Component<
  IRequestComponentProps
> {
  public render() {
    if (!this.props.request) return null;

    return (
      <div id={styles.main}>
        <nav className={classnames(styles.header, 'navbar navbar-dark')}>
          <h5>{this.props.request.name}</h5>
        </nav>
        <div className={styles.editor}>
          <Tabs>
            <Tab name="Body">
              <Body
                request={this.props.request}
                onChange={e => this.onChange(e)}
              />
            </Tab>
            <Tab name="Query">Query Params Placeholder</Tab>
            <Tab name="Header">
              <Headers
                request={this.props.request}
                onChange={e => this.onChange(e)}
              />
            </Tab>
          </Tabs>
        </div>
      </div>
    );
  }

  private onChange(request: Request): void {
    if (this.props.onChange) {
      this.props.onChange(request);
    }
  }
}
