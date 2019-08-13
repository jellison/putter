import * as React from 'react';
import * as styles from './requestView.m.scss';
import classnames from 'classnames';
import Request from '../../../models/request';

export interface IRequestComponentProps {
  request?: Request;
}

export default class RequestView extends React.Component<
  IRequestComponentProps
> {
  public render() {
    if (this.props.request) {
      return (
        <div id={styles.main}>
          <nav className={classnames(styles.nav, 'navbar navbar-dark')}>
            <h5>{this.props.request.name}</h5>
          </nav>
          <div className={styles.editor}>
            <div className="container">
              <div className="row">
                <div className="col-md-12">{this.props.request.body}</div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return <div></div>;
  }
}
