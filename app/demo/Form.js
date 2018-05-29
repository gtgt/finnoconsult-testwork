import React from 'react';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';

import Screen from '../containers/screens/Screen';

import FormLayout from '../components/layout/FormLayout';
import Button from '../components/ui/Button';

@inject('stores', 'actions') @observer
export default class FormDemo extends Screen {

  static defaultProps = {
    pageTitle: 'FORM!',
  }

  render() {
    return (
      <FormLayout>
        Link to:
        <Link to="./grid">Grid Demo »</Link>

        <label htmlFor="sampleInput">Label</label>
        <input id="sampleInput" value="TODO: React Input Component" onChange={e => console.log(e)} />

        <Button className="o-button o-button--submit" onClick={() => console.log('submit')}>Submit form</Button>
      </FormLayout>

    );
  }
}
