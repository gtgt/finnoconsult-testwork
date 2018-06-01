import React from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import UIStore from '../stores/UIStore';
import { ActionSheet } from '../components/ui/layout';

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

  componentDidMount() {
    document.addEventListener('keydown', e => this.onKeyPress(e));
  }
  componentDidUpdate() {
    document.addEventListener('keydown', e => this.onKeyPress(e));
  }

  onNewInvestment() {
    this.routerHistory.push('/');
    // this.props.actions.toggleOverlay({ isVisible: false });
  }

  onCancel() {
    this.routerHistory.goBack();
    // this.props.actions.toggleOverlay({ isVisible: false });
  }

  onKeyPress(event) {
    if (event && event.keyCode === 27) {
      this.onCancel();
      document.removeEventListener('keydown', e => this.onKeyPress(e));
    }
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
        <button>Ain&apos;t doing no nothing</button>
        <button onClick={e => this.onNewInvestment(e)}>Go Home</button>
      </ActionSheet>
    );
  }
}
