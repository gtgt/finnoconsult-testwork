import React from 'react';
import PropTypes from 'prop-types';

import { ScrollView, View } from '../';

import { oneOrManyChildElements } from '../../../prop-types';

import styles from './ResponsiveWebLayout.scss';

const MainView = ScrollView.withComponent('main');

export default class WebLayout extends React.Component {
  static propTypes = {
    children: oneOrManyChildElements,
    headerMenu: PropTypes.func,
    navBar: PropTypes.func,
    tabBar: PropTypes.func,
    sideMenu: PropTypes.func,
    className: PropTypes.string,
  };

  render() {
    return (
      <View className={`${this.props.className} ${styles.component}`}>
        {this.props.headerMenu && <header><this.props.headerMenu /></header>}
        {this.props.navBar && <nav><this.props.navBar /></nav>}
        {this.props.sideMenu && <aside><this.props.sideMenu /></aside>}
        <MainView>
          {this.props.children}
        </MainView>
        {this.props.tabBar && <footer><this.props.tabBar /></footer>}
      </View>
    );
  }
}
