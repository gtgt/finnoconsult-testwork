import React from 'react';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';

import Screen from '../containers/screens/Screen';

import { TextInput, NumericInput, Button, Switch } from '../components/ui/input';
import { Form, HorizontalLayout, VerticalLayout } from '../components/ui/layout';
import { TextToggle, ButtonGroup, NumericStepper } from '../components/ui/button';

@inject('stores', 'actions') @observer
export default class FormDemo extends Screen {

  static defaultProps = {
    pageTitle: 'FORM!',
  }

  state = {
    textInput: 'with half money',

    listType: 0,
    activeButtonIndex: 1,
    activeButtonIndex2: 0,

    switched: true,
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

  onToggleSwitch() {
    console.log('onToggleSwitch - new state: ', !this.state.switched);
    this.setState({ switched: !this.state.switched });
  }

  render() {
    return (
      <Form>
        Link to:
        <Link to="./grid">Grid Demo »</Link>


        <label htmlFor="textInput">Market visit</label>
        <TextInput
          id="textInput"
          hint="how much money?"
          value={this.state.textInput}
          onChange={({ target: { value } }) => this.setState({ textInput: value })}
        />

        <label htmlFor="sampleInput">Money division:</label>
        <NumericInput
          id="sampleInput"
          label="Ft"
          type="number"
          max={180}
          value={100}
          onChange={e => console.log(e, 'forintnak', e/2, ' a fele!')}
          // closeButtonPosition={9}
        />

        <Switch onClick={() => this.onToggleSwitch()} on={this.state.switched} />

        <label htmlFor="Stepper">Stepper</label>
        <HorizontalLayout id="Stepper">
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

        <label htmlFor="ButtonGroup">ButtonGroup</label>
        <VerticalLayout id="ButtonGroup">
          <ButtonGroup
            // className={styles.toggle}
            titles={['Button 1', 'Button 2', 'Button 3']}
            value={1 * this.state.activeButtonIndex}
            onClick={e => this.onChangedButtonGroup(e)}
          />
          <ButtonGroup
            // className={styles.toggle}
            titles={['Button 4', 'Button 5', 'Button ...', 'Button N']}
            value={1 * this.state.activeButtonIndex2}
            onClick={e => this.onChangedButtonGroup2(e)}
          />
        </VerticalLayout>

        <label htmlFor="TextToggle">TextToggle</label>

        <TextToggle
          id="TextToggle"
          // className={styles.toggle1}
          titles={['List', 'Grid']}
          value={1 * this.state.listType}
          onClick={e => this.onChangeTextToggle(e)}
        />

        <Button className="o-button o-button--submit" onClick={() => console.log('submit')}>Submit form</Button>
      </Form>
    );
  }
}
