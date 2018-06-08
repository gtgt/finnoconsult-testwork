import React from 'react';
import { inject, observer } from 'mobx-react';

import Screen from '../containers/screens/Screen';
import {
  View,
  AppearingView,
  Text,
  Button,
  H1,
  H2,
  H3,
  H4,
  Heading,
} from '../components/ui';

import {
  NavigationButton,
  BackButton,
} from '../components/ui/layout/navigation';

@inject('stores', 'actions') @observer
export default class TextDemo extends Screen {
  static defaultProps = {
    pageTitle: 'Header variations',
  }

  state = {
    vulcanoErupt: false,
  }

  get getNavBarLeftButton() {
    return <Button onClick={() => this.startVulcanoEruption()}>Go Magma!</Button>;
  }

  get getNavBarRightButton() {
    return (
      <View>
        <BackButton />
        <BackButton>Back</BackButton>
        |
        <Button onClick={() => this.onClick('NoWhere')}>NoWhere</Button>
        |
        <NavigationButton to="right">Right</NavigationButton>
      </View>
    );
  }

  onClick(from) {
    console.log('clicked by button:', from);
  }

  startVulcanoEruption() {
    this.setState({ vulcanoErupt: true });
    this.onClick('Go Magma!');
  }

  toggleVulcanoEruption() {
    this.setState({ vulcanoErupt: !this.state.vulcanoErupt });
  }

  render() {
    return (
      <View>
        <AppearingView active={!this.state.vulcanoErupt} transitionDelay={0}>
          <H1 border style={{ borderRadius: '100%', margin: '0px auto', width: '20%' }}>Head</H1>
          <H2 border round style={{ width: '50%' }}>Neck</H2>
          <H3 hidden>Chest</H3>
          <H4 fullWidth border round>Stomach</H4>
          <Heading level={4} style={{ textAlign: 'center' }}>Hip</Heading>
          <Heading h6 bold style={{ textAlign: 'center', margin: '0px auto', width: '20%', borderLeft: 'solid 10px black', borderRight: 'solid 10px black' }}>Legs</Heading>
          <Text underline>On the ground</Text>
        </AppearingView>

        <AppearingView active={this.state.vulcanoErupt} transitionDelay={0.1} transitionDuration={1.5} transformOrigin="bottom center" style={{ color: 'red' }}>
          And suddenly the Vulcano starts to erupt, with giant explosion and outbursting it&apos;s magma to everything
        </AppearingView>

        <Text>
          Under the ground
        </Text>


        <AppearingView active>
          <p>...And under the ground slowly the magma is moving</p>
          <Button onClick={() => this.toggleVulcanoEruption()}>Toggle the Vulcano!</Button>
        </AppearingView>


      </View>
    );
  }
}
