import { ipcRenderer } from 'electron';

export enum Dispatch {
  CloseWorkspace
}

export enum Event {
  WorkspaceLoaded
}

export class EventService {
  private dispatchHandlers: Array<Array<() => void>> = [];
  private eventHandlers: Array<Array<() => void>> = [];

  constructor() {
    for (const dispatch of Object.values(Dispatch) as string[]) {
      ipcRenderer.on(dispatch, () => this.onDispatchInternal(dispatch));
    }

    for (const event of Object.values(Event)) {
      ipcRenderer.on(event, () => this.onEventInternal(event));
    }
  }

  public dispatch(dispatch: Dispatch) {
    ipcRenderer.send(Dispatch[dispatch]);
  }

  public emit(event: Event) {
    ipcRenderer.send(Event[event]);
  }

  public onDispatch(dispatch: Dispatch, handler: () => void) {
    if (!this.dispatchHandlers[dispatch]) this.dispatchHandlers[dispatch] = [];
    this.dispatchHandlers[dispatch].push(handler);
  }

  public onEvent(event: Event, handler: () => void) {
    if (!this.eventHandlers[event]) this.eventHandlers[event] = [];
    this.eventHandlers[event].push(handler);
  }

  private onDispatchInternal(dispatch: any) {
    this.invokeHandlers(this.dispatchHandlers[Dispatch[dispatch] as any]);
  }

  private onEventInternal(event: any) {
    this.invokeHandlers(this.eventHandlers[Event[event] as any]);
  }

  private invokeHandlers(handlers?: Array<() => void>) {
    if (handlers) handlers.map(h => h());
  }
}
