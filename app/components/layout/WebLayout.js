import React from 'react';
import PropTypes from 'prop-types';

import View from './View';
import ScrollView from './ScrollView';

import { oneOrManyChildElements } from '../../prop-types';

import styles from './WebLayout.scss';

const WebLayout = props => (
  <View className={styles.component}>
    {props.navBar && <props.navBar />}
    {props.sideMenu && <props.sideMenu />}
    <ScrollView>
      {props.children}
    </ScrollView>
    {props.tabBar && <props.tabBar />}
  </View>
);

WebLayout.propTypes = {
  children: oneOrManyChildElements,
  navBar: PropTypes.func,
  tabBar: PropTypes.func,
  sideMenu: PropTypes.func,
};


module.exports = WebLayout;
