import * as React from 'react';
import * as styles from './requestView.m.scss';
import { inject, observer } from 'mobx-react';
import classnames from 'classnames';
import Tabs from '../../../elements/tabs/tabs';
import Tab from '../../../elements/tabs/tab';
import Body from '../body/body';
import Headers from '../headers/headers';
import RequestStore from '../../../stores/requestStore';

export interface IRequestComponentProps {
  store?: RequestStore;
}

@inject('store')
@observer
export default class RequestView extends React.Component<
  IRequestComponentProps
> {
  public render() {
    if (!this.props.store.request) return null;

    return (
      <div id={styles.main}>
        <nav className={classnames(styles.header, 'navbar navbar-dark')}>
          <h5>{this.props.store.request.name}</h5>
        </nav>
        <div className={styles.editor}>
          <Tabs>
            <Tab name="Body">
              <Body />
            </Tab>
            <Tab name="Query">Query Params Placeholder</Tab>
            <Tab name="Header">
              <Headers />
            </Tab>
          </Tabs>
        </div>
      </div>
    );
  }
}
