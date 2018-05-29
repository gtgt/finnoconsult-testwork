import React from 'react';
import { inject, observer } from 'mobx-react';

import Screen from '../containers/screens/Screen';

// import styles from './Form.scss';
import View from '../components/layout/View';

@inject('stores', 'actions') @observer
export default class Form extends Screen {

  static defaultProps = {
    pageTitle: 'I\'m a grid!',
  }

  render() {
    return (
      <View>
        Grid goes here
      </View>

    );
  }
}
