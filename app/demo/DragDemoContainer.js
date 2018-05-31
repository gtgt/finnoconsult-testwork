import React from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import AccountStore from '../stores/AccountStore';

import Screen from '../containers/screens/Screen';

import DragDemo from './DragDemo';
import { View, Image } from '../components/ui';
import ContainerWithRouter from '../containers/ContainerWithRouter';

import mockImages from './mockImages';

const ItemComponent = props => (
  <View>
    <Image
      {...props}
      source={props.source}
      caption={props.title}
    />
  </View>
);
ItemComponent.propTypes = {
  source: PropTypes.string,
  title: PropTypes.string,
};


@inject('stores', 'actions') @observer
export default class DragDemoContainer extends Screen {
  static propTypes = {
    stores: PropTypes.shape({
      account: PropTypes.instanceOf(AccountStore).isRequired,
    }).isRequired,
  }

  static defaultProps = {
    pageTitle: 'Drag & Drop Demo for selecting',
  }

  get items() {
    return this.props.stores.account.items.map(item => mockImages(item));
  }

  render() {
    return (
      // TODO: onDragEndPath?
      <ContainerWithRouter
        onDragEndPath={(from, to) => `transfer/${from}/${to}`}
      >
        <DragDemo
          items={this.items}
          itemComponent={ItemComponent}
        />
      </ContainerWithRouter>
    );
  }
}
