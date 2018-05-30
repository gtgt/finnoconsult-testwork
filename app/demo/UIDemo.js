import React from 'react';
import { inject, observer } from 'mobx-react';
// import { Link } from 'react-router-dom';

import Screen from '../containers/screens/Screen';

import { HorizontalLayout, VerticalLayout } from '../components/layout';

import View from '../components/ui/View';
import TextToggle from '../components/ui/TextToggle';
import ButtonGroup from '../components/ui/ButtonGroup';
import NumericStepper from '../components/ui/NumericStepper';

@inject('stores', 'actions') @observer
export default class UIDemo extends Screen {

  static defaultProps = {
    pageTitle: 'UI Elements demo',
  }

  state = {
    listType: 0,
    activeButtonIndex: 1,
    activeButtonIndex2: 0,
  }

  onChangedStepper(e) {
    console.log('onStepperChanged', e);
  }

  onChangedButtonGroup(e) {
    console.log('onChangeButtonGroup', e);
    this.setState({ activeButtonIndex: e });
  }

  onChangedButtonGroup2(e) {
    console.log('onChangeButtonGroup2', e);
    this.setState({ activeButtonIndex2: e });
  }

  onChangeTextToggle(e) {
    console.log('onChangeButtonGroup2', e);
    this.setState({ listType: e });
  }

  render() {
    return (
      <View>
        <b>Stepper</b>
        <hr />
        <HorizontalLayout>
          <NumericStepper
            initValue={500}
            stepValue={100}
            minValue={100}
            currency="EUR"
            title="Eur stepper"
            onChange={e => this.onChangedStepper(e)}
          />
          <NumericStepper
            initValue={25}
            stepValue={1}
            minValue={0}
            currency="&deg;C"
            title="Degree stepper"
            onChange={e => this.onChangedStepper(e)}
          />
          <NumericStepper
            initValue={-63}
            stepValue={1}
            minValue={-100}
            currency="&deg;F"
            title="Degree stepper 2"
            onChange={e => this.onChangedStepper(e)}
          />
        </HorizontalLayout>

        <br /><br />
        <b>ButtonGroup & Toggle</b>
        <hr />
        <VerticalLayout>
          <b>ButtonGroup</b>

          <ButtonGroup
            // className={styles.toggle}
            titles={['Button 1', 'Button 2', 'Button 3']}
            value={1 * this.state.activeButtonIndex}
            onClick={e => this.onChangedButtonGroup(e)}
          />
          <ButtonGroup
            // className={styles.toggle}
            titles={['Button 4', 'Button 5', 'Button 6', 'Button ...', 'Button N']}
            value={1 * this.state.activeButtonIndex2}
            onClick={e => this.onChangedButtonGroup2(e)}
          />
          {/* <ButtonGroup
            // className={styles.toggle}
            value={1 * this.state.activeButtonIndex2}
          >
            <Button className="o-button" onClick={() => this.onChangedButtonGroup2(0)}>Button 1</Button>
            <Button className="o-button" onClick={() => this.onChangedButtonGroup2(1)}>Button 2</Button>
            <Button className="o-button" onClick={() => this.onChangedButtonGroup2(2)}>Button 3</Button>
          </ButtonGroup> */}
          <br /><br />
          <b>TextToggle</b>

          <TextToggle
            // className={styles.toggle1}
            titles={['List', 'Grid']}
            value={1 * this.state.listType}
            onClick={e => this.onChangeTextToggle(e)}
          />
        </VerticalLayout>
      </View>
    );
  }
}
