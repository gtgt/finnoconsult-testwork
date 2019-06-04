/* eslint-disable react/no-find-dom-node */
import React from 'react';
import ReactDOM from 'react-dom';
import { Route } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import AccountStore from '../stores/AccountStore';
import Screen from '../containers/screens/Screen';
import { oneOrManyChildElements } from '../prop-types';

import { View, Button, Text, Image } from '../components/ui';
import { VerticalLayout, AnimatedGrid as Grid } from '../components/ui/layout';
import { ButtonGroup } from '../components/ui/button';
import ContainerWithRouter from '../containers/ContainerWithRouter';
import { icons } from './assets';

import styles from './Tabs.scss';
import buttonGroupStyles from '../components/ui/button/ButtonGroup.scss';
import LinkList from '../components/list/LinkList';

const Tile = props => (
  <VerticalLayout className={styles.Tile}>
    <Image className={classnames(styles.icon, { [`${styles.circleIcon}`]: props.circleIcon })} source={icons[props.icon]} />
    <span className={styles.value}>{props.children}</span>
    <p className={styles.description}>{props.description}</p>
  </VerticalLayout>
);
Tile.propTypes = {
  icon: PropTypes.string,
  children: oneOrManyChildElements,
  description: PropTypes.string,
  circleIcon: PropTypes.bool,
};
Tile.defaultProps = {
  icon: 'unknown',
  description: ' ',
  circleIcon: false,
};

const tabs = [
  {
    navTitle: '13`339.20',
    tabTitle: 'Guthaben',
    content: () => (
      <VerticalLayout>
        <Image className={styles.brn} source="https://cdn.mos.cms.futurecdn.net/dc1099acdb5b67dbc5942593daa83ca6-768-80.jpg" />
        <Grid columns={2} gap="2px" style={{ gridAutoRows: 'minmax(auto, 50%)' }}>
          <Tile icon="coins" description="Leben">6`134.20</Tile>
          <Tile icon="lock" description="Moatliche Ausgaben">1`205.00</Tile>
          <Tile icon="piggybank" description="Piggy bank">9`032.20</Tile>
          <Tile icon="cc" description="Credit card fee">1`312.99</Tile>
        </Grid>
      </VerticalLayout>
    ),
  },
  {
    navTitle: '458.00',
    tabTitle: 'Gemeinsame Töpfe',
    content: () => (
      <VerticalLayout>
        <Grid columns={2} gap="2px" style={{ gridAutoRows: 'minmax(auto, 50%)' }}>
          <Tile icon="avatar1" circleIcon description="WG2">-49.00</Tile>
          <Tile icon="avatar2" circleIcon description="Charsharing">-155.00</Tile>
          <Tile icon="avatar3" circleIcon description="Urlaub">-900.00</Tile>
          <Tile icon="plus">Geteilter Topf</Tile>
        </Grid>
      </VerticalLayout>
    ),
  },
  {
    navTitle: '50.00',
    tabTitle: 'Mobile Payment',
    content: () => (
      <div>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <LinkList
          list={[
            { title: 'Gutenhaben Aufladen', image: 'https://image.flaticon.com/icons/svg/61/61483.svg', link: '?1' },
            { title: 'Bewegungen', image: 'https://image.flaticon.com/icons/svg/151/151917.svg', link: '?2' },
            { title: 'Kontakt', image: 'https://image.flaticon.com/icons/svg/9/9243.svg', link: '?3' },
          ]}
        />
      </div>
    ),
  },
  {
    navTitle: '2`000.00',
    tabTitle: 'Vorsorge',
    content: () => (
      <div>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <LinkList
          list={[
            { title: 'Einzahlen', image: 'https://image.flaticon.com/icons/svg/1822/1822902.svg', link: '?1' },
            { title: 'Bewegungen', image: 'https://image.flaticon.com/icons/svg/151/151917.svg', link: '?2' },
            { title: 'Information & FAQ', image: 'https://image.flaticon.com/icons/svg/1/1176.svg', link: '?3' },
          ]}
        />
      </div>
    ),
  },
];

function TabContent({ match }) {
  return (
    <VerticalLayout className={styles.TabContent}>
      {tabs[match.params.index * 1].content()}
    </VerticalLayout>
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
    this.tabBar = null;
    this.buttonRefs = [];
    this.state.activeNavTitle = this.navTitle(this.state.activeTabIndex);
    this.highlightedIndex = this.state.activeTabIndex;
  }
  get tabTitles() {
    return tabs.map(tab => tab.tabTitle);
  }
  navTitle(index) {
    return tabs[index].navTitle;
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
            {tabs.map((tab, index) => (
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
