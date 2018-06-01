import React from 'react';
import { inject, observer } from 'mobx-react';

import Screen from '../containers/screens/Screen';
import {
  View,
  Text,
  H1,
  H2,
  H3,
  H4,
  Heading,
} from '../components/ui';

@inject('stores', 'actions') @observer
export default class TextDemo extends Screen {
  static defaultProps = {
    pageTitle: 'Header variations',
  }

  render() {
    return (
      <View>
        <H1>Head</H1>
        <H2 border round style={{ width: '50%' }}>Neck</H2>
        <H3 hidden>Chest</H3>
        <H4 fullWidth border round>Stomach</H4>
        <Heading level={4}>Hip</Heading>
        <Heading h6 bold>Legs</Heading>
        <Text underline>On the ground</Text>
      </View>
    );
  }
}
