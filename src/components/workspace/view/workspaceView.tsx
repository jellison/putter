import * as React from 'react';
import * as styles from './workspaceView.m.scss';
import { observer, Provider } from 'mobx-react';
import RequestView from '../../request/view/requestView';
import RequestList from '../../request/list/requestList';
import RequestStore from '../../../stores/requestStore';
import Workspace from '../../../models/workspace';

export interface IWorkspaceProps {
  workspace: Workspace;
}

export interface IWorkspaceState {
  requestStore: RequestStore;
}

@observer
export default class WorkspaceView extends React.Component<IWorkspaceProps, IWorkspaceState> {
  constructor(props: IWorkspaceProps) {
    super(props);
    this.state = { requestStore: this.getStore(props.workspace) };
  }

  public componentDidUpdate(prevProps: Readonly<IWorkspaceProps>): void {
    const changedWorkspace = this.props.workspace !== prevProps.workspace;

    if (changedWorkspace) {
      this.setState({
        requestStore: this.getStore(this.props.workspace)
      });
    }
  }

  public render() {
    return (
      <Provider store={this.state.requestStore}>
        <div id={styles.main} className="container-fluid">
          <div className="row no-gutters">
            <nav className="col-md-2">
              <RequestList />
            </nav>
            <main className="col-md-10">
              <RequestView />
            </main>
          </div>
        </div>
      </Provider>
    );
  }

  private getStore(workspace: Workspace): RequestStore {
    const store = new RequestStore();

    store.requests = workspace.requests;
    if (workspace.requests.length > 0) {
      store.request = workspace.requests[0];
    }

    return store;
  }
}
