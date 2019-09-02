import * as React from 'react';
import * as styles from './headers.m.scss';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckSquare,
  faSquare,
  faTrashAlt
} from '@fortawesome/free-solid-svg-icons';
import Request from '../../../models/request';
import KeyValuePair from '../../../models/keyValuePair';

export interface IHeadersProps {
  request: Request;
  onChange?(request: Request): void;
}

export default class HeadersComponent extends React.Component<IHeadersProps> {
  private addPending?: string;
  private nodes: Map<string, React.RefObject<HTMLInputElement>> = new Map();

  public componentDidUpdate(prevProps: Readonly<IHeadersProps>): void {
    const headerAdded =
      prevProps.request.headers.length < this.props.request.headers.length;

    if (this.addPending && headerAdded) {
      this.findLastNode(this.addPending).focus();
      this.addPending = null;
    }
  }

  public render() {
    return (
      <div id={styles.main}>
        {this.props.request.headers.map((h, i) => (
          <div className={styles.entry}>
            <div className={styles.field}>
              <input
                type="text"
                className="form-control"
                placeholder="Header"
                value={h.key}
                onChange={e => this.onKeyChange(h, e)}
                ref={this.getRef('key' + i)}
              />
            </div>
            <div className={styles.field}>
              <input
                type="text"
                className="form-control"
                placeholder="Value"
                value={h.value}
                onChange={e => this.onValueChange(h, e)}
                ref={this.getRef('value' + i)}
              />
            </div>
            <div className={styles.controls}>
              <div className={styles.control}>
                <a onClick={() => this.onToggleEnabled(h)}>
                  <FontAwesomeIcon
                    icon={h.enabled === true ? faCheckSquare : faSquare}
                  />
                </a>
              </div>
              <div className={styles.control}>
                <a onClick={() => this.onDelete(h)}>
                  <FontAwesomeIcon icon={faTrashAlt} />
                </a>
              </div>
            </div>
          </div>
        ))}

        <div className={styles.entry}>
          <div className={styles.field}>
            <input
              type="text"
              className="form-control"
              placeholder="New Header"
              readOnly={true}
              onFocus={e => this.onNewKeyFocus(e)}
            />
          </div>
          <div className={styles.field}>
            <input
              type="text"
              className="form-control"
              placeholder="New Value"
              readOnly={true}
              onFocus={e => this.onNewValueFocus(e)}
            />
          </div>
          <div className={styles.controls} />
        </div>
      </div>
    );
  }

  private onKeyChange(
    header: KeyValuePair,
    event: React.ChangeEvent<HTMLInputElement>
  ): void {
    this.props.onChange(
      this.getModifiedRequest({
        ...header,
        key: event.target.value
      })
    );
  }

  private onValueChange(
    header: KeyValuePair,
    event: React.ChangeEvent<HTMLInputElement>
  ): void {
    this.props.onChange(
      this.getModifiedRequest({
        ...header,
        value: event.target.value
      })
    );
  }

  private onToggleEnabled(header: KeyValuePair) {
    this.props.onChange(
      this.getModifiedRequest({
        ...header,
        enabled: !header.enabled
      })
    );
  }

  private onDelete(header: KeyValuePair): void {
    this.props.onChange({
      ...this.props.request,
      headers: this.props.request.headers.filter(h => h.id !== header.id)
    });
  }

  private onNewKeyFocus(event: React.SyntheticEvent): void {
    event.preventDefault();
    this.addPending = 'key';
    this.insertNewHeader();
  }

  private onNewValueFocus(event: React.SyntheticEvent): void {
    event.preventDefault();
    this.addPending = 'value';
    this.insertNewHeader();
  }

  private insertNewHeader(): void {
    this.props.onChange({
      ...this.props.request,
      headers: [...this.props.request.headers, new KeyValuePair()]
    });
  }

  private findLastNode(type: string): HTMLInputElement {
    const key = Math.max(
      ...Array.from(this.nodes.keys())
        .filter(k => k.startsWith(type))
        .map(k => parseInt(k.match(/\d+/g)[0], 10))
    );

    const ref = this.nodes.get(type + key);

    return ref.current;
  }

  private getRef(name: string): React.Ref<HTMLInputElement> {
    const ref = React.createRef<HTMLInputElement>();

    this.nodes.set(name, ref);

    return ref;
  }

  private getModifiedRequest(header: KeyValuePair): Request {
    const currentIndex = this.props.request.headers.findIndex(
      h => h.id === header.id
    );

    const headers = [
      ...this.props.request.headers.filter(h => h.id !== header.id)
    ];

    // insert the modified header back at the current index
    headers.splice(currentIndex, 0, header);

    return {
      ...this.props.request,
      headers
    };
  }
}
