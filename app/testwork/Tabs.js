/* eslint-disable react/no-find-dom-node */
import React from 'react';
import ReactDOM from 'react-dom';
import { Route } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import AccountStore from '../stores/AccountStore';
import Screen from '../containers/screens/Screen';

import { View, Button, Text } from '../components/ui';
import { ButtonGroup } from '../components/ui/button';
import ContainerWithRouter from '../containers/ContainerWithRouter';

import styles from './Tabs.scss';
import buttonGroupStyles from '../components/ui/button/ButtonGroup.scss';

function TabContent({ match }) {
  return (
    <div className={styles.TabContent}>
      <h3>{match.params.index}</h3>
    </div>
  );
}
TabContent.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      index: PropTypes.string,
    }),
  }),
};


@inject('stores', 'actions') @observer
export default class Tabs extends Screen {
  static propTypes = {
    stores: PropTypes.shape({
      account: PropTypes.instanceOf(AccountStore).isRequired,
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        index: PropTypes.string,
      }),
    }),
  };
  static defaultProps = {
    pageTitle: 'Tabs',
  };
  constructor(props) {
    super(props);
    this.state = {
      activeTabIndex: props.match.params.index ? props.match.params.index * 1 : 0,
    };
    this.tabs = [
      { navTitle: '13`339.20', tabTitle: 'Guthaben' },
      { navTitle: '458.00', tabTitle: 'Gemeinsame Töpfe' },
      { navTitle: '50.00', tabTitle: 'Mobile Payment' },
      { navTitle: '2`000.00', tabTitle: 'Vorsorge' },
    ];
    this.tabBar = null;
    this.buttonRefs = [];
    this.state.activeNavTitle = this.navTitle(this.state.activeTabIndex);
    this.highlightedIndex = this.state.activeTabIndex;
  }
  get tabTitles() {
    return this.tabs.map(tab => tab.tabTitle);
  }
  navTitle(index) {
    return this.tabs[index].navTitle;
  }

  getButton(index) {
    return this.buttonRefs.length >= index -1 ? this.buttonRefs[index] : null;
  }

  setActiveButton(index) {
    const button = this.getButton(index);
    if (button) {
      this.setState({ activeTabIndex: index });
      const tabBarElement = ReactDOM.findDOMNode(this.tabBar);
      const buttonElement = ReactDOM.findDOMNode(button);
      tabBarElement.scrollLeft = buttonElement.offsetLeft - ((tabBarElement.offsetWidth - buttonElement.offsetWidth) / 2);
    }
  }

  render() {
    return (
      <ContainerWithRouter>
        <View center>
          <Text className={styles.NavTitle}>
            {this.state.activeNavTitle}
          </Text>
          <ButtonGroup ref={(e) => { this.tabBar = e; }} value={this.state.activeTabIndex} className={styles.TabBar}>
            {this.tabs.map((tab, index) => (
              <Button
                key={index}
                ref={(e) => { this.buttonRefs.push(e); }}
                link={`/testwork/tabs/${index}`}
                className={classnames(styles.tab, {
                  [`${buttonGroupStyles.toggle}`]: true,
                  [`${buttonGroupStyles.isActive}`]: index === this.state.activeTabIndex,
                })}
              >
                {tab.tabTitle}
              </Button>
            ))}
          </ButtonGroup>
          <Route path={this.props.match.path} exact component={TabContent} />
        </View>
      </ContainerWithRouter>
    );
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.index !== this.props.match.params.index) {
      this.setActiveButton(this.props.match.params.index * 1);
    }
  }
}
