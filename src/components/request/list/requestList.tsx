import * as React from 'react';
import * as styles from './requestList.m.scss';
import { inject, observer } from 'mobx-react';
import classnames from 'classnames';
import Request from '../../../models/request';
import RequestStore from '../../../stores/requestStore';

export interface IRequestListProps {
  store?: RequestStore;
}

@inject('store')
@observer
export default class RequestListComponent extends React.Component<
  IRequestListProps
> {
  public render() {
    return (
      <div id={styles.main}>
        <div className={classnames(styles.list, 'list-group')}>
          {this.props.store.requests.map(r => (
            <button
              key={r.id}
              className={classnames(
                styles.listItem,
                'list-group-item list-group-item-action',
                { [styles.active]: this.isSelected(r) }
              )}
              onClick={() => (this.props.store.request = r)}
            >
              {r.name}
            </button>
          ))}
        </div>
      </div>
    );
  }

  private isSelected(request: Request): boolean {
    if (!this.props.store.request) return false;

    return request.id === this.props.store.request.id;
  }
}
