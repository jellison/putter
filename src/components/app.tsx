import * as React from 'react';
import { connect } from 'react-redux';
import * as styles from './app.m.scss';
import AppDataRepo from '../data/appDataRepository';
import Workspace from '../models/workspace';
import WorkspaceView from './workspace/view/workspaceView';
import WorkspaceRepo from '../data/workspaceRepository';
import WorkspaceSelector from './workspace/selector/workspaceSelector';
import AppData from '../models/appData';
import { Dispatch, EventService, Event } from '../services/eventService';
import { State } from '../stores/workspaceStore/store';
import * as actions from '../stores/workspaceStore/actions';

//
// Bootstrap setup
//

// tslint:disable-next-line:no-var-requires
require('jquery/dist/jquery.slim.js');
// tslint:disable-next-line:no-var-requires
require('bootstrap/dist/js/bootstrap.bundle.min.js');
// tslint:disable-next-line:no-var-requires
require('bootstrap/dist/css/bootstrap.css');

export interface IAppProps {
  workspace?: Workspace;
  setWorkspace?(workspace: Workspace): void;
}

export interface IAppState {
  appData: AppData;
}

class AppComponent extends React.Component<IAppProps, IAppState> {
  private eventService: EventService;

  constructor(props: IAppProps) {
    super(props);

    this.eventService = new EventService();
    this.eventService.onDispatch(Dispatch.CloseWorkspace, () => this.closeWorkspace());

    this.state = {
      appData: new AppData()
    };
  }

  public async componentDidMount(): Promise<void> {
    // todo: display loader while we're waiting
    const appData = await AppDataRepo.get();

    if (appData.lastWorkspace) {
      this.openWorkspace(appData.lastWorkspace);
    }

    this.setState({ appData });
  }

  public async onWorkspaceSelected(filePath: string): Promise<void> {
    await this.openWorkspace(filePath);

    if (filePath !== this.state.appData.lastWorkspace) {
      this.state.appData.lastWorkspace = filePath;
      await this.saveAppData();
    }
  }

  public render() {
    if (this.props.workspace) {
      return (
        <div className={styles.main}>
          <WorkspaceView />
        </div>
      );
    } else {
      return (
        <div className={styles.main}>
          <WorkspaceSelector onWorkspaceSelected={f => this.onWorkspaceSelected(f)} />
        </div>
      );
    }
  }

  private async openWorkspace(filePath: string): Promise<void> {
    await WorkspaceRepo.get(filePath).then(ws => {
      this.props.setWorkspace(ws);
      this.eventService.emit(Event.WorkspaceLoaded);
    });
  }

  private async closeWorkspace(): Promise<void> {
    this.props.setWorkspace(null);
    this.state.appData.lastWorkspace = null;
    await this.saveAppData();
  }

  private async saveAppData() {
    await AppDataRepo.save(this.state.appData);
  }
}

function mapStateToProps(state: State): IAppProps {
  return {
    workspace: state.workspace
  };
}

const mapDispatchToProps = {
  setWorkspace: actions.selectWorkspace
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppComponent);
