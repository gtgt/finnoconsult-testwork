import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { oneOrManyChildElements } from '../../../prop-types';

import { View } from '../';

import styles from './Overlay.scss';

export default class Disclaimer extends React.Component {
  static propTypes = {
    children: oneOrManyChildElements.isRequired,
    show: PropTypes.bool,
  }

  render() {
    return (
      <View
        className={classnames(styles.component, {
          [`${styles.show}`]: this.props.show,
        })}
      >
        <View className={styles.content}>
          {this.props.children}
        </View>
      </View>
    );
  }
}
