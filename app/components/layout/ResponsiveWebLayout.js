import React from 'react';
import PropTypes from 'prop-types';

import View from './View';
import ScrollView from './ScrollView';

import { oneOrManyChildElements } from '../../prop-types';

import styles from './ResponsiveWebLayout.scss';

const WebLayout = props => (
  <View className={styles.component}>
    {props.navBar && <header><props.navBar /></header>}
    {props.sideMenu && <aside><props.sideMenu /></aside>}
    <ScrollView>
      {props.children}
    </ScrollView>
    {props.tabBar && <footer><props.tabBar /></footer>}
  </View>
);

WebLayout.propTypes = {
  children: oneOrManyChildElements,
  navBar: PropTypes.func,
  tabBar: PropTypes.func,
  sideMenu: PropTypes.func,
};


module.exports = WebLayout;
