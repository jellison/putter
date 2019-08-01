import * as React from 'react';
import Drawer from '@material-ui/core/Drawer';
import { Divider } from '@material-ui/core';

import Request from '../../models/request';
import RequestComponent from '../request/request';
import RequestList from '../request/request-list';
import Workspace from '../../models/workspace';

import * as styles from './workspace.m.scss';

export interface IWorkspaceProps {
  workspace: Workspace;
}

export interface IWorkspaceState {
  selectedRequest?: Request;
}

export default class WorkspaceComponent extends React.Component<
  IWorkspaceProps,
  IWorkspaceState
> {
  constructor(props: IWorkspaceProps){
    super(props);
    this.state = {};
  }

  public componentDidMount(): void {
    this.selectDefaultRequest();
  }

  public componentDidUpdate(prevProps: Readonly<IWorkspaceProps>, prevState: Readonly<IWorkspaceState>, snapshot?: any): void {
    const changedWorkspace = this.props.workspace !== prevProps.workspace;

    if(changedWorkspace) {
      this.selectDefaultRequest();
    }
  }

  public render() {
    return (
      <div className={styles.workspace}>
        <Drawer className={styles.drawer} variant="permanent" anchor="left">
          <div />
          <Divider />
          <RequestList
            requests={this.props.workspace.requests}
            onSelected={e => this.onRequestSelected(e)}
            selected={this.state.selectedRequest}
          />
        </Drawer>
        <div className={styles.request}>
          <RequestComponent request={this.state.selectedRequest} />
        </div>
      </div>
    );
  }

  private onRequestSelected(request: Request): void {
    this.setState({ selectedRequest: request });
  }

  private selectDefaultRequest(): void {
    if(this.props.workspace.requests.length === 0) return;

    this.setState({ selectedRequest: this.props.workspace.requests[0]});
  }
}
