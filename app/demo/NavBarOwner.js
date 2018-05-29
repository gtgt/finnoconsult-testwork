import React from 'react';
import { inject, observer } from 'mobx-react';

import Screen from '../containers/screens/Screen';

// import styles from './Form.scss';
import View from '../components/layout/View';
import NavigationBarContainer from '../containers/navigation/NavigationBarContainer';

@inject('stores', 'actions') @observer
export default class NavBarOwner extends Screen {

  static defaultProps = {
    pageNavBar: () => <NavigationBarContainer title="This is displayed as my own navbar ">&nbsp;?:-D</NavigationBarContainer>,
  }

  render() {
    return (
      <View>
        I should have my own navbar, up above
      </View>

    );
  }
}
