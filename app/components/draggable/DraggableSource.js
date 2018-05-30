import React from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';
import classnames from 'classnames';
import { numberOrStringText, oneOrManyChildElements } from '../../prop-types';

import DragStore from '../../stores/DragStore';

import styles from './DraggableSource.scss';

const _initLocation = {
  x: 0,
  y: 0,
};

@inject('stores', 'actions') @observer
export default class DraggableSource extends React.Component {
  static propTypes = {
    children: oneOrManyChildElements.isRequired,
    id: numberOrStringText,
    onDragEnd: PropTypes.func.isRequired,
    isActive: PropTypes.bool,
    isActiveAlways: PropTypes.bool,
    noIndication: PropTypes.bool,
    actions: PropTypes.shape({
      // setSource: PropTypes.func.isRequired,
      // cleanSource: PropTypes.func.isRequired,
      setSourcePosition: PropTypes.func.isRequired,
      cleanSourcePosition: PropTypes.func.isRequired,
      setIndication: PropTypes.func.isRequired,
      cleanIndication: PropTypes.func.isRequired,
    }).isRequired,
    stores: PropTypes.shape({
      drag: PropTypes.instanceOf(DragStore).isRequired,
    }).isRequired,
  };

  static defaultProps = {
    noIndication: false,
  };

  state = {
    original: _initLocation,
    isDragging: false,
    current: _initLocation,
  }

  onDragStart() {
    if (this.isActive) this.setState({ original: this.placeHolder.getBoundingClientRect(), isDragging: true });
    this.props.actions.setIndication({ show: !this.props.noIndication });
    // this.props.actions.setSource({ node: this.placeClone });
  }
  onDragEnd() {
    if (this.isActive) {
      const active = this.props.stores.drag.selectedTargetId;
      this.setState({ current: _initLocation, isDragging: false });
      this.props.actions.cleanSourcePosition();
      if (active !== null) this.props.onDragEnd({ from: this.props.id, to: active });
      this.props.actions.cleanIndication(!this.props.noIndication);
      // this.props.actions.cleanSource();
    }
  }
  onDragging(e, ui) {
    if (this.isActive) {
      // console.log(e, ui, ui.node.getBoundingClientRect(), e.touches);
      this.setState({ current: ui });
      this.props.actions.setSourcePosition({
        position: {
          x: (e.touches && e.touches[0] && (e.touches[0].clientX || e.touches[0].pageX)) || ui.node.getBoundingClientRect().x,
          y: (e.touches && e.touches[0] && (e.touches[0].clientY || e.touches[0].pageY)) || ui.node.getBoundingClientRect().y,
        },
      });
      // console.log('active:', this.props.stores.drag.selectedTargetName);
    }
  }

  get isActive() {
    return this.props.isActive || this.props.isActiveAlways;
  }

  render() {
    const children = {
      real: React.Children.map(this.props.children, child => React.cloneElement(child, {
        className: 'Account_component__withShadow',
        isActive: this.isActive,
      })),
      clone: React.Children.map(this.props.children, child => React.cloneElement(child, {
        className: 'Account_component--hidden',
        isActive: this.isActive,
      })),
    };

    return (
      <div
        ref={(e) => { this.placeHolder = e; }}
        className={classnames(styles.component, {
          [`${styles.dragging}`]: this.state.isDragging,
        })}
      >
        <div ref={(e) => { this.placeUser = e; }} className={styles.placeUser} >
          {children.real}
        </div>
        {this.isActive && (
          <Draggable
            onStart={() => this.onDragStart()}
            onDrag={(e, ui) => this.onDragging(e, ui)}
            onStop={() => this.onDragEnd()}
            position={this.state.current}
            initialPosition={{ x: 0, y: 0 }}
          >
            <div
              ref={(e) => { this.placeClone = e; }}
              className={classnames(styles.placeClone, {
                [`${styles.dragging}`]: this.props.stores.drag.isDragging,
              })}
            >
              {children.clone}
            </div>
          </Draggable>
        )}
      </div>
    );
  }
}
