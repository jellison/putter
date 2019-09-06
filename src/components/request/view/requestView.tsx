import * as React from 'react';
import { connect } from 'react-redux';
import * as styles from './requestView.m.scss';
import classnames from 'classnames';
import Request from '../../../models/request';
import Tabs from '../../../elements/tabs/tabs';
import Tab from '../../../elements/tabs/tab';
import Body from '../body/body';
import { State } from '../../../stores/workspaceStore/store';
import * as actions from '../../../stores/workspaceStore/actions';

export interface IRequestComponentProps {
  request?: Request;
  onChange?(request: Request): void;
}

class RequestView extends React.Component<IRequestComponentProps> {
  public render() {
    if (!this.props.request) return null;

    return (
      <div id={styles.main}>
        <nav className={classnames(styles.header, 'navbar navbar-dark')}>
          <h5>{this.props.request.name}</h5>
        </nav>
        <div className={styles.editor}>
          <Tabs>
            <Tab name="Body">
              <Body />
            </Tab>
            <Tab name="Query">Query Params Placeholder</Tab>
            <Tab name="Header">Headers Placeholder</Tab>
          </Tabs>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: State): IRequestComponentProps {
  return {
    request: state.selectedRequest
  };
}

const mapDispatchToProps = {
  onChange: actions.updateRequest
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RequestView);
