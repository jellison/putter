import * as React from 'react';
import * as styles from './requestList.m.scss';
import classnames from 'classnames';
import Request from '../../../models/request';

export interface IRequestListProps {
  requests: Request[];
  selected?: Request;
  onSelected?(request: Request): void;
}

export default class RequestListComponent extends React.Component<
  IRequestListProps
> {
  public render() {
    return (
      <div id={styles.main}>
        <div className={classnames(styles.list, 'list-group')}>
          {this.props.requests.map(r => (
            <button
              key={r.id}
              className={classnames(
                styles.listItem,
                'list-group-item list-group-item-action',
                { [styles.active]: this.isSelected(r) }
              )}
              onClick={() => this.props.onSelected(r)}
            >
              {r.name}
            </button>
          ))}
        </div>
      </div>
    );
  }

  private isSelected(request: Request): boolean {
    if (!this.props.selected) return false;

    return request.id === this.props.selected.id;
  }
}
