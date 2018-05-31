import React from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import UIStore from '../stores/UIStore';
import ActionSheet from '../components/layout/ActionSheet';

@withRouter
@inject('stores', 'actions') @observer
export default class LinkContainer extends React.Component {
  static propTypes = {
    history: PropTypes.shape().isRequired,
    stores: PropTypes.shape({
      ui: PropTypes.instanceOf(UIStore).isRequired,
    }).isRequired,
    // actions: PropTypes.shape({
    //   toggleOverlay: PropTypes.func.isRequired,
    // }).isRequired,
    isOverlayVisible: PropTypes.bool,
  }

  onNewInvestment() {
    this.routerHistory.push('/investment/zak-invest-intro');
    // this.props.actions.toggleOverlay({ isVisible: false });
  }

  onCancel() {
    this.routerHistory.goBack();
    // this.props.actions.toggleOverlay({ isVisible: false });
  }

  get routerHistory() {
    return this.props.history || this.context.router.history;
  }

  render() {
    return (
      <ActionSheet
        show={this.props.isOverlayVisible || this.props.stores.ui.isOverlayVisible}
        onCancel={e => this.onCancel(e)}
      >
        <button disabled>Neuer Topf</button>
        <button>Spartopf</button>
        <button onClick={e => this.onNewInvestment(e)}>Invest-Topf</button>
      </ActionSheet>
    );
  }
}
