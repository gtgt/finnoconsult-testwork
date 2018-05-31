import React from 'react';
import PropTypes from 'prop-types';

import { ScrollView, View } from '../ui';

import { oneOrManyChildElements } from '../../prop-types';

import styles from './ResponsiveWebLayout.scss';

const WebLayout = props => (
  <View className={styles.component}>
    {props.headerMenu && <header><props.headerMenu /></header>}
    {props.navBar && <nav><props.navBar /></nav>}
    {props.sideMenu && <aside><props.sideMenu /></aside>}
    <ScrollView>
      {props.children}
    </ScrollView>
    {props.tabBar && <footer><props.tabBar /></footer>}
  </View>
);

WebLayout.propTypes = {
  children: oneOrManyChildElements,
  headerMenu: PropTypes.func,
  navBar: PropTypes.func,
  tabBar: PropTypes.func,
  sideMenu: PropTypes.func,
};


module.exports = WebLayout;
