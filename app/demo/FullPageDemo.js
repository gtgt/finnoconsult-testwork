import React from 'react';
import { inject, observer } from 'mobx-react';

import Screen from '../containers/screens/Screen';
import {
  View,
  Image,
} from '../components/ui';

@inject('stores', 'actions') @observer
export default class FullPageDemo extends Screen {
  static defaultProps = {
    pageTitle: 'Full page, with floating navbar',
    layoutClassName: 'ResponsiveWebLayout_navBarFloatingOverPage',
  }

  render() {
    return (
      <View style={{ backgroundColor: 'lightblue' }}>
        <Image source="https://media.finnoconsult.at/2017/01/10-finnoblog-liftoff.hero.jpg" />
      </View>
    );
  }
}
