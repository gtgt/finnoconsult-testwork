import React from 'react';
import { inject, observer } from 'mobx-react';
// import { Link } from 'react-router-dom';

import Screen from '../containers/screens/Screen';

import View from '../components/ui/View';
import { HorizontalLayout } from '../components/layout';

// import Button from '../components/ui/Button';
import NumericStepper from '../components/ui/NumericStepper';

@inject('stores', 'actions') @observer
export default class UIDemo extends Screen {

  static defaultProps = {
    pageTitle: 'UI Elements demo',
  }

  onStepperChanged(e) {
    console.log('onStepperChanged', e);
  }

  render() {
    return (
      <View>
        <HorizontalLayout>
          <NumericStepper
            initValue={500}
            stepValue={100}
            minValue={100}
            currency="EUR"
            title="Eur stepper"
            onChange={e => this.onStepperChanged(e)}
          />
          <NumericStepper
            initValue={25}
            stepValue={1}
            minValue={0}
            currency="&deg;C"
            title="Degree stepper"
            onChange={e => this.onStepperChanged(e)}
          />
          <NumericStepper
            initValue={-63}
            stepValue={1}
            minValue={-100}
            currency="&deg;F"
            title="Degree stepper 2"
            onChange={e => this.onStepperChanged(e)}
          />
        </HorizontalLayout>
      </View>
    );
  }
}
