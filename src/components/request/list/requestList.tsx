import * as React from 'react';
import { connect } from 'react-redux';
import * as styles from './requestList.m.scss';
import classnames from 'classnames';
import Request from '../../../models/request';
import { State } from '../../../stores/workspaceStore/store';
import * as actions from '../../../stores/workspaceStore/actions';

export interface IRequestListProps {
  requests: Request[];
  selectedRequest: Request;
  onSelected?(request: Request): void;
}

class RequestList extends React.Component<IRequestListProps> {
  public render() {
    return (
      <div id={styles.main}>
        <div className={classnames(styles.list, 'list-group')}>
          {this.props.requests.map(r => (
            <button
              key={r.id}
              className={classnames(styles.listItem, 'list-group-item list-group-item-action', {
                [styles.active]: this.isSelected(r)
              })}
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
    if (!this.props.selectedRequest) return false;

    return request.id === this.props.selectedRequest.id;
  }
}

function mapStateToProps(state: State): IRequestListProps {
  return {
    requests: state.workspace.requests,
    selectedRequest: state.selectedRequest
  };
}

const mapDispatchToProps = {
  onSelected: actions.selectRequest
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RequestList);
