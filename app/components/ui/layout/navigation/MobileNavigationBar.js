import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';
import Swipeable from 'react-swipeable';

import styles from './MobileNavigationBar.scss';

import { oneOrManyChildElements } from '../../../../prop-types';

@observer
export default class MobileNavigationBar extends Component {
  static propTypes = {
    isVisible: PropTypes.bool,
    className: PropTypes.string,
    title: PropTypes.string,
    /* eslint-disable */
    leftButton: PropTypes.func,
    /* eslint-enable */
    rightButton: PropTypes.func,
    onSwipedLeft: PropTypes.func,
    onSwipedRight: PropTypes.func,
    children: oneOrManyChildElements,

  }

  render() {
    const {
      title,
      isVisible,
      children,
    } = this.props;

    // TODO: handle via CSS
    if (!isVisible) return null;

    return (
      <Swipeable
        onSwipedLeft={() => this.props.onSwipedLeft && this.props.onSwipedLeft()}
        onSwipedRight={() => this.props.onSwipedRight && this.props.onSwipedRight()}
        className={`${styles.component} ${this.props.className}`}
      >
        <div className=" l-container l-container--horizontal l-container-grow">

          <div className={styles.leftButtonContainer}>
            <this.props.leftButton />
          </div>

          <div className={styles.titleContainer}>
            {title && (
              <h1 className={styles.title}>{title}</h1>
            )}
            {children}
          </div>

          {this.props.rightButton && (
            <div className={styles.rightButtonContainer}>
              <this.props.rightButton />
            </div>
          )}
        </div>
      </Swipeable>
    );
  }
}
