import * as React from 'react';
import { connect } from 'react-redux';
import * as styles from './body.m.scss';
import Request from '../../../models/request';
import { State } from '../../../stores/workspaceStore/store';
import * as actions from '../../../stores/workspaceStore/actions';
import { IRequestComponentProps } from '../view/requestView';

export interface IBodyProps {
  request: Request;
  onChange?(request: Request): void;
}

class Body extends React.Component<IBodyProps> {
  public render() {
    return (
      <div id={styles.main}>
        <textarea
          className={styles.editor}
          value={this.props.request.body}
          onChange={e => this.onBodyChange(e)}
          onKeyDown={e => this.onBodyKeyDown(e)}
        />
      </div>
    );
  }

  private onBodyChange(e: React.ChangeEvent<HTMLTextAreaElement>): void {
    this.updateBody(e.target.value);
  }

  private onBodyKeyDown(e: React.KeyboardEvent): void {
    if (e.keyCode === 9) {
      e.preventDefault();

      const input = e.target as HTMLTextAreaElement;

      const start = input.selectionStart;
      const end = input.selectionEnd;

      input.value = `${input.value.substr(0, start)}\t${input.value.substr(end)}`;
      input.selectionStart = input.selectionEnd = start + 1;
    }
  }

  private updateBody(newBody: string): void {
    if (this.props.onChange) {
      this.props.onChange({
        ...this.props.request,
        body: newBody
      });
    }
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
)(Body);
