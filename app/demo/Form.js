import React from 'react';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';

import Screen from '../containers/screens/Screen';

import { Form } from '../components/layout';

import { TextInput, NumericInput, Button } from '../components/form';

@inject('stores', 'actions') @observer
export default class FormDemo extends Screen {

  static defaultProps = {
    pageTitle: 'FORM!',
  }

  state = {
    textInput: 'with half money',
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

        <Button className="o-button o-button--submit" onClick={() => console.log('submit')}>Submit form</Button>
      </Form>

    );
  }
}
