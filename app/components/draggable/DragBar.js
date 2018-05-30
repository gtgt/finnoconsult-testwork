import React from 'react';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';
import classnames from 'classnames';
import { oneOrManyChildElements } from '../../prop-types';

import styles from './DragBar.scss';

import line from './line.png';

export default class DragBar extends React.Component {
  static propTypes = {
    children: oneOrManyChildElements.isRequired,
    onDragStart: PropTypes.func,
    onDragEnd: PropTypes.func,
    onDragging: PropTypes.func,
    axis: PropTypes.string,
    formatFunction: PropTypes.func,
  };

  static defaultProps = {
  };


  state = {
    dragPercent: null,
  }

  onDragStart() {
    this.setState({ isDragging: true });
    if (this.props.onDragStart) this.props.onDragStart();
  }
  onDragEnd() {
    this.setState({ isDragging: false });
    if (this.props.onDragEnd) this.props.onDragEnd();
  }
  onDragging(e, ui) {
    let percent = parseFloat(ui[this.axis] / this.handleMaxPosition, 2).toFixed(2);
    if (percent <= 0) percent = 0;
    if (percent >= 1) percent = 1;
    this.setState({ dragPercent: percent });
    // console.log(this.constructor.name, 'onDragging', percent, ui[this.axis], this.handleMaxPosition, this.containerSize, this.handleSize, this.handlePosition);
    if (this.props.onDragging) this.props.onDragging({ percent });
  }

  defaultFormat({ percent }) {
    return {
      backgroundImage: `url(${line})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'left center',
      backgroundSize: `${percent}% 4px`,
    };
  }

  formatFunction({ percent }) {
    if (this.props.formatFunction) this.props.formatFunction({ percent: percent * 100 });
    return this.defaultFormat({ percent: percent * 100 });
  }

  axisMapping = {
    x: 'width',
    y: 'height',
  }

  get axis() {
    return this.props.axis || 'x';
  }

  get containerSize() {
    return parseInt(this.container.getBoundingClientRect()[this.axisMapping[this.axis]], 10);
  }

  get handleMaxPosition() {
    return parseInt(this.containerSize-this.handleSize, 10);
  }

  get handleSize() {
    return parseInt(this.handle.getBoundingClientRect()[this.axisMapping[this.axis]], 10);
  }

  get handlePosition() {
    return parseInt(this.handle.getBoundingClientRect()[this.axis], 10);
  }

  render() {
    return (
      <div
        ref={(e) => { this.container = e; }}
        className={classnames(styles.component, {
          [`${styles.dragging}`]: this.state.isDragging,
        })}
        style={this.formatFunction({ percent: this.state.dragPercent })}
      >
        <Draggable
          onStart={() => this.onDragStart()}
          onDrag={(e, ui) => this.onDragging(e, ui)}
          onStop={() => this.onDragEnd()}
          // position={this.state.current}
          // initialPosition={{ x: 0, y: 0 }}
          bounds="parent"
          axis={this.axis}
          handle={`.${styles.adjustHandle}`}
        >
          <button
            ref={(e) => { this.handle = e; }}
            className={classnames(styles.adjustHandle, {
              // [`${styles.dragging}`]: this.state.isDragging,
            })}
          >
            {this.props.children}
          </button>
        </Draggable>
      </div>
    );
  }
}
