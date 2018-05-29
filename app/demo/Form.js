import React from 'react';
import { inject, observer } from 'mobx-react';

import Screen from '../containers/screens/Screen';

// import styles from './Form.scss';
import View from '../components/layout/View';
import Button from '../components/ui/Button';

@inject('stores', 'actions') @observer
export default class Form extends Screen {

  static defaultProps = {
    pageTitle: 'FORM!',
  }

  render() {
    return (
      <View>
        <Button>Button</Button>
        <input />
      </View>

    );
  }
}
