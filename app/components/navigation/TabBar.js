import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';
import classnames from 'classnames';
// import Swipeable from 'react-swipeable';
import { oneOrManyChildElements } from '../../prop-types';

import View from '../ui/View';

import styles from './TabBar.scss';

@observer
export default class TabBar extends View {
  static propTypes = {
    isVisible: PropTypes.bool,
    className: PropTypes.string,
    /* eslint-disable */
    /* eslint-enable */
    children: oneOrManyChildElements,

  }

  render() {
    const {
      isVisible,
      children,
    } = this.props;

    // TODO: handle via CSS
    if (!isVisible) return null;

    return (
      <View
        className={classnames({
          [`${styles.component}`]: true,
        })}
      >
        {children}
      </View>
    );
  }
}
