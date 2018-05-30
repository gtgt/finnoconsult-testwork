import React from 'react';
import { inject, observer } from 'mobx-react';

import Screen from '../containers/screens/Screen';

import { View } from '../components/layout';

@inject('stores', 'actions') @observer
export default class DragDemo extends Screen {

  static defaultProps = {
    pageTitle: 'DragDemo',
  }

  render() {
    return (
      <View>
        Drag or not to drag?
      </View>

    );
  }
}
