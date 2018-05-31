import React from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import AccountStore from '../stores/AccountStore';

import Screen from '../containers/screens/Screen';

import DragDemo from './DragDemo';
import { View } from '../components/layout';
import { Image } from '../components/ui';
import ContainerWithRouter from '../containers/ContainerWithRouter';

import images from './images.json';


const ItemComponent = props => (
  <View>
    <Image
      {...props}
      source={props.source || images[props.id]}
      caption={props.title}
    />
  </View>
);
ItemComponent.propTypes = {
  source: PropTypes.string,
  title: PropTypes.string,
  id: PropTypes.number.isRequired,
};


@inject('stores', 'actions') @observer
export default class DragDemoContainer extends Screen {
  static propTypes = {
    stores: PropTypes.shape({
      account: PropTypes.instanceOf(AccountStore).isRequired,
    }).isRequired,
  }

  static defaultProps = {
    pageTitle: 'Drag & Drop Demo',
  }

  render() {
    return (
      <ContainerWithRouter
        onDragEndPath={(from, to) => `transfer/${from}/${to}`}
      >
        <DragDemo
          items={this.props.stores.account.items}
          itemComponent={ItemComponent}
        />
      </ContainerWithRouter>
    );
  }
}
