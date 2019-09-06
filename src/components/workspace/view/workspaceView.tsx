import * as React from 'react';
import { connect } from 'react-redux';
import Request from '../../../models/request';
import RequestView from '../../request/view/requestView';
import RequestList from '../../request/list/requestList';
import Workspace from '../../../models/workspace';
import * as styles from './workspaceView.m.scss';
import { State } from '../../../stores/workspaceStore/store';
import * as actions from '../../../stores/workspaceStore/actions';

export interface IWorkspaceProps {
  workspace: Workspace;
  setSelectedRequest?(request: Request): void;
}

class WorkspaceView extends React.Component<IWorkspaceProps> {
  constructor(props: IWorkspaceProps) {
    super(props);
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
            <RequestList />
          </nav>
          <main className="col-md-10">
            <RequestView />
          </main>
        </div>
      </div>
    );
  }

  private selectDefaultRequest(): void {
    if (this.props.workspace.requests.length > 0) {
      this.props.setSelectedRequest(this.props.workspace.requests[0]);
    }
  }
}

function mapStateToProps(state: State): IWorkspaceProps {
  return {
    workspace: state.workspace
  };
}

const mapDispatchToProps = {
  setSelectedRequest: actions.selectRequest
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkspaceView);
