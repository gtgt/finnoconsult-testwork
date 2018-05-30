import React from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { oneOrManyChildElements } from '../../prop-types';

import DragStore from '../../stores/DragStore';

import styles from './DraggableIndicator.scss';

@inject('stores', 'actions') @observer
export default class DraggableIndicator extends React.Component {
  static propTypes = {
    children: oneOrManyChildElements,
    stores: PropTypes.shape({
      drag: PropTypes.instanceOf(DragStore).isRequired,
    }).isRequired,
  };

  static defaultProps = {
  };

  state = {
    // displayPath: false,
  // selectedFrom: null,
  // preSelectedTo: null,
  // dragStartPosition: {
  //   x: 0,
  //   y: 0,
  // },
    // canvasSize: {
    //   width: 500,
    //   height: 500,
    //   top: 0,
    //   left: 0,
    // },
  }

  componentDidMount() {
    // NOTE: dirty fix to wait for the real grid dimenstions after site build
    // FIXME: might need to apply with autorun:
    // setTimeout(() => {
    //   this.setCanvasDimensions();
    // }, 1000);
  }

  componentDidUpdate() {
    // TODO: switch canvas actions!
  }
  //
  // getCanvas() {
  //   return this.canvas.getContext('2d');
  // }
  //
  // setCanvasDimensions() {
  //   this.setState({
  //     canvasSize: this.grid.getBoundingClientRect(),
  //   });
  // }
  //
  // updateCanvas(ui) {
  //   const handle = ui.node.getBoundingClientRect();
  //   // const origHandleSize = ui.node.parentNode.getBoundingClientRect();
  //
  //   // console.log(origHandleSize);
  //   // console.log(handle);
  //   // console.log(this.state.canvasSize);
  //   this.clearCanvas();
  //   const ctx = this.getCanvas();
  //   ctx.beginPath();
  //   ctx.strokeStyle = styles.canvasLineColor;
  //   ctx.lineWidth=8;
  //
  //   let handleX = handle.width;
  //   let handleY = handle.height;
  //   // FIXME: handle size doesn't reflect the original size, just the handle's
  //   // this origHandleSize change is only required when .icon { width:100% enabled
  //   // handleX = origHandleSize.width;
  //   handleX += 0;
  //   handleY += 0;
  //
  //
  //   // TODO: calculate the handlesize radius based on the neg/pos sign of ui.x and ui.y
  //   const deltaDiag = Math.sqrt(((handle.left - this.state.dragStartPosition.x) ** 2) + ((handle.top - this.state.dragStartPosition.y) ** 2));
  //   const handleRadiusX = ((handle.left - this.state.dragStartPosition.x) * handleX) / deltaDiag;
  //   const handleRadiusY = ((handle.top - this.state.dragStartPosition.y) * handleY) / deltaDiag;
  //   // // console.log(`deltaDiag: ${deltaDiag}, handleRadiusX:${handleRadiusX}`);
  //   // console.log(`${handle.left} - ${this.state.dragStartPosition.x} > ${handleX}`);
  //   // console.log(`${handle.top} - ${this.state.dragStartPosition.y}) > ${handleY}`);
  //
  //   if (Math.abs(handle.left - this.state.dragStartPosition.x) > handleX || Math.abs(handle.top - this.state.dragStartPosition.y) > handleY) {
  //     // draw the line but only if the movement size is greater hand handle size
  //     ctx.moveTo(
  //       (this.state.dragStartPosition.x - this.state.canvasSize.left) + (handleX / 2) + (handleRadiusX / 2),
  //       (this.state.dragStartPosition.y - this.state.canvasSize.top) + (handleY / 2) + (handleRadiusY / 2),
  //     );
  //     ctx.lineTo(
  //       ((handle.left - this.state.canvasSize.left) + (handle.width / 2)) - (handleRadiusX / 2),
  //       ((handle.top - this.state.canvasSize.top) + (handle.width / 2)) - (handleRadiusY / 2),
  //     );
  //     ctx.stroke();
  //   }
  // }
  //
  // clearCanvas() {
  //   // this.setCanvasDimensions();
  //   this.getCanvas().clearRect(0, 0, this.state.canvasSize.width, this.state.canvasSize.height);
  // }

  render() {
    if (!this.props.stores.drag.showIndication) return null;

    const {
      getPosition: { x: currentX, y: currentY },
      getInitialPosition: { x: initialX, y: initialY },
      isDragging,
    } = this.props.stores.drag;

    if (!currentY) return null;

    const lineLength =
    // (true || currentY > initialY)
      // ?
      Math.sqrt(
        ((currentX - initialX) * (currentX - initialX))
        +
        ((currentY - initialY) * (currentY - initialY)),
      )
      // : 0
      ;
    // console.log('indicatorrender', currentX, currentY, initialX, initialY, lineLength);

    const rotate = ((Math.atan(
        ((currentX - initialX) / (currentY - initialY))
        // * (currentY > initialY ? 1 : -1)
        // * (currentX > initialX ? 1 : -1)
        ,
      ) * -180) / Math.PI)
      + (currentY < initialY ? 180 : 0)
    ;

    return (
      <div
        className={classnames(
          styles.component, {
            [`${styles.component}--active`]: isDragging,
          },
        )}
      >
        <div
          className={styles.indicator__from}
          style={{
            left: initialX,
            top: initialY,
          }}
        />

        <div
          className={styles.indicator__canvas}
          style={{
            left: initialX,
            top: initialY,
            // width: '3px',
            height: lineLength,
            transform: `rotate(${rotate}deg)`,
          }}
        />

        {/* <canvas
          className={classnames({
            [`${styles.indicator__canvas}`]: true,
            [`${styles.indicator__canvas}--active`]: this.state.displayPath,
          })}
          ref={(c) => { this.canvas = c; }}
          width={this.state.canvasSize.width}
          height={this.state.canvasSize.height}
        /> */}

        <div
          className={styles.indicator__to}
          style={{
            left: currentX,
            top: currentY,
          }}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}
