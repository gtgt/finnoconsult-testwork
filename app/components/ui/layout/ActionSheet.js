import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { oneOrManyChildElements } from '../../../prop-types';

import { View } from '..';
import Overlay from './Overlay';

import styles from './ActionSheet.scss';

export default class Disclaimer extends React.Component {
  static propTypes = {
    children: oneOrManyChildElements,
    onCancel: PropTypes.func.isRequired,
    show: PropTypes.bool,
  }

  onCancel() {
    this.props.onCancel();
  }

  // onConfirm() {
  //   this.props.onConfirm();
  // }

  render() {
    return (
      <Overlay show={this.props.show}>
        <View
          className={classnames(styles.component, {
            [`${styles.show}`]: this.props.show,
          })}
        >
          <View className={styles.contentContainer}>
            {this.props.children}
          </View>

          {/* {!this.props.children && (
            <View className={styles.contentContainer}>
              <button onClick={e => this.onConfirm(e)} className={styles.cancel}>Yes</button>
              <button onClick={e => this.onCancel(e)} className={styles.cancel}>No</button>
            </View>
          )} */}

          <View className={styles.contentContainer}>
            <button onClick={e => this.onCancel(e)} className={styles.cancel}>Abbrechen</button>
          </View>
        </View>
      </Overlay>
    );
  }
}
