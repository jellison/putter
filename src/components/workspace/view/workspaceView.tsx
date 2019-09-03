import * as React from 'react';
import Request from '../../../models/request';
import RequestView from '../../request/view/requestView';
import RequestList from '../../request/list/requestList';
import Workspace from '../../../models/workspace';

import * as styles from './workspaceView.m.scss';

export interface IWorkspaceProps {
  workspace: Workspace;
}

export interface IWorkspaceState {
  selectedRequest?: Request;
}

export default class WorkspaceView extends React.Component<IWorkspaceProps, IWorkspaceState> {
  constructor(props: IWorkspaceProps) {
    super(props);
    this.state = {};
  }

  public componentDidMount(): void {
    this.selectDefaultRequest();
  }

  public componentDidUpdate(prevProps: Readonly<IWorkspaceProps>): void {
    const changedWorkspace = this.props.workspace !== prevProps.workspace;

    if (changedWorkspace) {
      this.selectDefaultRequest();
    }
  }

  public render() {
    return (
      <div id={styles.main} className="container-fluid">
        <div className="row no-gutters">
          <nav className="col-md-2">
            <RequestList
              requests={this.props.workspace.requests}
              onSelected={e => this.onRequestSelected(e)}
              selected={this.state.selectedRequest}
            />
          </nav>
          <main className="col-md-10">
            <RequestView request={this.state.selectedRequest} onChange={e => this.onRequestChanged(e)} />
          </main>
        </div>
      </div>
    );
  }

  private onRequestChanged(request: Request): void {
    this.setState({ selectedRequest: request });
  }

  private onRequestSelected(request: Request): void {
    this.setState({ selectedRequest: request });
  }

  private selectDefaultRequest(): void {
    if (this.props.workspace.requests.length === 0) return;

    this.setState({ selectedRequest: this.props.workspace.requests[0] });
  }
}
