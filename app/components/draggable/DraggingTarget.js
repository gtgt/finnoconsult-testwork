import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import classnames from 'classnames';
import { numberOrStringText, oneOrManyChildElements } from '../../prop-types';

import DragStore from '../../stores/DragStore';

import styles from './DraggingTarget.scss';

@inject('stores', 'actions') @observer
export default class DraggingTarget extends React.Component {
  static propTypes = {
    children: oneOrManyChildElements,
    id: numberOrStringText.isRequired,
    onClick: PropTypes.func,
    className: PropTypes.string,
    style: PropTypes.shape(),
    actions: PropTypes.shape({
      registerTarget: PropTypes.func.isRequired,
      removeTarget: PropTypes.func.isRequired,
    }).isRequired,
    stores: PropTypes.shape({
      drag: PropTypes.instanceOf(DragStore).isRequired,
    }).isRequired,
  };

  static defaultProps = {
  };

  componentDidMount() {
    this.props.actions.registerTarget({ node: this.placeHolder });
  }

  componentDidUpdate() {
    // NOTE: as _removeTarget moves all items out, we need to reregister always...
    this.props.actions.registerTarget({ node: this.placeHolder });
  }

  componentWillUnmount() {
    this.props.actions.removeTarget({ node: this.placeHolder });
  }

  get uniqueId() {
    return `DraggingTarget${this.props.id}`;
  }

  render() {
    // console.log(this.props.stores.drag.selectedTargetName, ' === ', this.uniqueId);
    return (
      <div
        ref={(e) => { this.placeHolder = e; }}
        // style={{ width: 'auto', height: 'auto', border: this.props.stores.drag.selectedTargetName === this.uniqueId ? 'solid 1px orange' : 'none' }}
        className={classnames(styles.component, {
          [`${this.props.className}`]: this.props.className,
          [`${styles.inactive}`]: this.props.stores.drag.isDragging,
          [`${styles.active}`]: this.props.stores.drag.selectedTargetName === this.uniqueId,
        })}
        id={this.uniqueId}
        style={this.props.style || {}}
      >
        {/* // TODO: instead of this onClick handler would be better */}
        <button onClick={() => this.props.onClick && this.props.onClick({ to: this.props.id })}>
          {this.props.children}
        </button>
      </div>
    );
  }
}
