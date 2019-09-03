import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './stores/workspaceStore/store';
import AppComponent from './components/app';

// tslint:disable-next-line:no-var-requires
require('./styles/main.scss');

ReactDOM.render(
  <div>
    <Provider store={store}>
      <AppComponent />
    </Provider>
  </div>,
  document.getElementById('root')
);
