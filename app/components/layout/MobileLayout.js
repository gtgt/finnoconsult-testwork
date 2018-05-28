import React from 'react';
import PropTypes from 'prop-types';

import View from './View';
import ScrollView from './ScrollView';

import { oneOrManyChildElements } from '../../prop-types';

import styles from './MobileLayout.scss';

console.log('styles.component', styles.component);

// TODO: rename:
const MobileLayout = props => (
  <View className={styles.component}>
    {props.navBar && <props.navBar />}
    <View isHidden>
      {props.sideMenu && <props.sideMenu />}
    </View>
    <ScrollView center>
      {props.children}
    </ScrollView>
    {props.tabBar && <props.tabBar />}
  </View>
);

MobileLayout.propTypes = {
  children: oneOrManyChildElements,
  navBar: PropTypes.func,
  tabBar: PropTypes.func,
  sideMenu: PropTypes.func,
};


module.exports = MobileLayout;
