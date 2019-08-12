import * as React from 'react';
import * as ReactDOM from 'react-dom';
import AppComponent from './components/app';

// tslint:disable-next-line:no-var-requires
require('./styles/main.scss');

ReactDOM.render(
  <div>
    <AppComponent />
  </div>,
  document.getElementById('root')
);
