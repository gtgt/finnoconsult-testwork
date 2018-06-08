import React from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import AccountStore from '../stores/AccountStore';

import Screen from '../containers/screens/Screen';

import { View, Button } from '../components/ui';
import { TransferMonitor, TransferContainer } from '../components/draggable';

import DragContainerWithRouter from '../containers/DragContainerWithRouter';
import mockImages from './mockImages';

// import images from './images.json';

@inject('stores', 'actions') @observer
export default class TransferDemoContainer extends Screen {
  static propTypes = {
    stores: PropTypes.shape({
      account: PropTypes.instanceOf(AccountStore).isRequired,
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        from: PropTypes.string,
        to: PropTypes.string,
      }),
    }),

  }
  static defaultProps = {
    pageTitle: 'Drag & Drop Demo for Transfer',
  }

  get fromItem() {
    return mockImages(this.props.stores.account.items.find(item => item.id === Number(this.props.match.params.from)));
  }

  get toItem() {
    return mockImages(this.props.stores.account.items.find(item => item.id === Number(this.props.match.params.to)));
  }


  onSubmit() {
    console.warn('// TODO: implement onSubmit in DragContainerWithRouter');
    this.goBack();
  }


  render() {
    return (
      <DragContainerWithRouter>
        <TransferContainer
          fromItem={this.fromItem}
          toItem={this.toItem}
          // handleComponent={ComponentName}
          monitorComponent={TransferMonitor}
        >
          <View center>
            <Button
              onClick={() => this.onSubmit()}
            >
              Fertig
            </Button>
          </View>
        </TransferContainer>
      </DragContainerWithRouter>
    );
  }
}
