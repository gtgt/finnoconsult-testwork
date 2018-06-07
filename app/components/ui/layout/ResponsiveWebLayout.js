import React from 'react';
import PropTypes from 'prop-types';

import { ScrollView, View } from '../';

import { oneOrManyChildElements } from '../../../prop-types';

import styles from './ResponsiveWebLayout.scss';

const MainView = ScrollView.withComponent('main');

const WebLayout = props => (
  <View className={`${props.className} ${styles.component}`}>
    {props.headerMenu && <header><props.headerMenu /></header>}
    {props.navBar && <nav><props.navBar /></nav>}
    {props.sideMenu && <aside><props.sideMenu /></aside>}
    <MainView>
      {props.children}
    </MainView>
    {props.tabBar && <footer><props.tabBar /></footer>}
  </View>
);

WebLayout.propTypes = {
  children: oneOrManyChildElements,
  headerMenu: PropTypes.func,
  navBar: PropTypes.func,
  tabBar: PropTypes.func,
  sideMenu: PropTypes.func,
  className: PropTypes.string,
};


module.exports = WebLayout;
