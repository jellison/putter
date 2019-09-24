import * as React from 'react';
import * as styles from './app.m.scss';
import AppDataRepo from '../data/appDataRepository';
import WorkspaceView from './workspace/view/workspaceView';
import WorkspaceRepo from '../data/workspaceRepository';
import WorkspaceSelector from './workspace/selector/workspaceSelector';
import AppData from '../models/appData';
import { Dispatch, EventService, Event } from '../services/eventService';
import store from '../stores/workspaceStore';
import { observer } from 'mobx-react';

//
// Bootstrap setup
//

// tslint:disable-next-line:no-var-requires
require('jquery/dist/jquery.slim.js');
// tslint:disable-next-line:no-var-requires
require('bootstrap/dist/js/bootstrap.bundle.min.js');
// tslint:disable-next-line:no-var-requires
require('bootstrap/dist/css/bootstrap.css');

export interface IAppState {
  appData: AppData;
}

@observer
export default class AppComponent extends React.Component<{}, IAppState> {
  private eventService: EventService;

  constructor(props = {}) {
    super(props);

    this.eventService = new EventService();
    this.eventService.onDispatch(Dispatch.CloseWorkspace, () =>
      this.closeWorkspace()
    );

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
    if (store.workspace) {
      return (
        <div className={styles.main}>
          <WorkspaceView workspace={store.workspace} />
        </div>
      );
    } else {
      return (
        <div className={styles.main}>
          <WorkspaceSelector
            onWorkspaceSelected={f => this.onWorkspaceSelected(f)}
          />
        </div>
      );
    }
  }

  private async openWorkspace(filePath: string): Promise<void> {
    await WorkspaceRepo.get(filePath).then(ws => {
      store.workspace = ws;
      this.eventService.emit(Event.WorkspaceLoaded);
    });
  }

  private async closeWorkspace(): Promise<void> {
    store.workspace = null;
    this.state.appData.lastWorkspace = null;
    await this.saveAppData();
  }

  private async saveAppData() {
    await AppDataRepo.save(this.state.appData);
  }
}
