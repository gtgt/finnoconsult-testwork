import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
// import { oneOrManyChildElements } from '../../../prop-types';

import styles from './TransferContainer.scss';
import DragBar from '../DragBar';
import { Image, View } from '../../ui';

import knob from './knob64.svg';

export default class TransferContainer extends React.Component {
  static propTypes = {
    // children: oneOrManyChildElements.isRequired,
    handleComponent: PropTypes.func,
    monitorComponent: PropTypes.func, //eslint-disable-line
    fromItem: PropTypes.shape({
      amount: PropTypes.number.isRequired,
    }).isRequired,
    toItem: PropTypes.shape({
      amount: PropTypes.number.isRequired,
    }).isRequired,
  };

  static defaultProps = {
  };

  state = {
    transferPercent: 0,
  }

  onDragStart() {
  }
  onDragEnd() {
  }
  onDragging({ percent }) {
    this.setState({ transferPercent: percent });
  }

  get currentTransferAmount() {
    return this.props.fromItem.amount * this.state.transferPercent;
  }

  get currentFromAmount() {
    return this.props.fromItem.amount - this.currentTransferAmount;
  }

  get currentToAmount() {
    return this.props.toItem.amount + this.currentTransferAmount;
  }

  get handle() {
    return this.props.handleComponent || <Image source={knob} className={styles.knob} />;
  }


  render() {
    // const { children, ...cleanProps } = this.props;
    return (
      <View
        auto
        className={classnames(styles.component, {
          [`${styles.dragging}`]: this.state.isDragging,
        })}
      >
        <this.props.monitorComponent
          {...this.props}
          // {...cleanProps}
          fromAmount={this.currentFromAmount}
          toAmount={this.currentToAmount}
          transferAmount={this.currentTransferAmount}
        />

        <View auto className={styles.dragContainer}>
          <View auto className={styles.dragContainerBackground}>
            <DragBar
              onDragging={(e, ui) => this.onDragging(e, ui)}
              onDragStart={e => this.onDragStart(e)}
              onDragEnd={e => this.onDragEnd(e)}
            >
              {this.handle}
            </DragBar>
          </View>
        </View>

        {/* {children} */}
      </View>
    );
  }
}
