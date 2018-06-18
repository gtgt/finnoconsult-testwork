import React from 'react';
import { inject, observer } from 'mobx-react';
// import { Link } from 'react-router-dom';

import Screen from '../containers/screens/Screen';

// import { TextInput, NumericInput, Button, Switch } from '../components/ui/input';
import TableView from '../components/ui/table/TableView';
import Section from '../components/ui/table/TableViewSection';
import Item from '../components/ui/table/TableViewCell';

import tmpIcon from '../components/ui/table/icon.png';

console.log(tmpIcon);

// import { TextToggle, ButtonGroup, NumericStepper } from '../components/ui/button';

@inject('stores', 'actions') @observer
export default class TableViewDemo extends Screen {

  static defaultProps = {
    pageTitle: 'TableViewDemo',
  }

  state = {
  }

  render() {
    return (
      <TableView
        isGrouped
      >
        <Section
          label="Header label"
          footerLabel="Footer label"
        >
          <Item
            label="Automatisch sparen?"
          />
          <Item
            label="Cell with badge"
            badge={5}
            rightArrow
          />
          <Item
            label="Cell with access label"
            accessoryLabel="alle"
            rightArrow
          />
          <Item
            label="Karten sofort sperren"
            rightArrow
            route="/demo/grid"
          />
          <Item
            label="Karten sofort sperren"
            rightArrow
            route="/demo/grid"
          />
          <Item
            icon={tmpIcon}
            label="Text 2"
          />
          <Item
            icon={tmpIcon}
            label="Text 2"
            switcher
            switchState
          />
          <Item
            icon={tmpIcon}
            label="Text 2"
            switcher
            switchState
          />
        </Section>
        <Section
          footerLabel="Footer label 2"
        >
          <Item
            label="Karten sofort sperren"
            rightArrow
          />
          <Item
            label="Karten sofort sperren"
            rightArrow
          />
          <Item
            label="Karten sofort sperren"
            rightArrow
          />
        </Section>

      </TableView>
    );
  }
}
