import React from 'react';

import View from './View';

import { oneOrManyChildElements } from '../../prop-types';

import styles from './MobileLayout.scss';

console.log('styles.component', styles.component);

// TODO: rename:
const MobileLayout = props => (
  <View className={styles.component}>
    {props.children}
  </View>
);

MobileLayout.propTypes = {
  children: oneOrManyChildElements,
};


module.exports = MobileLayout;
