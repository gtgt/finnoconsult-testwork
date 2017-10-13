import React from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import LinkList from '../components/list/LinkList';

import { links } from '../content';

@withRouter
@inject('stores', 'actions') @observer
export default class LinkContainer extends React.Component {
  static propTypes = {
    history: PropTypes.shape().isRequired,
  }

  onSwipe(link) {
    this.routerHistory.push(link);
  }

  get routerHistory() {
    return this.props.history || this.context.router.history;
  }

  render() {
    return (
      <LinkList
        list={links.items.map(item => Object.assign({}, item, { link: `./pages?${item.id}` }))}
        onSwipingRight={link => this.onSwipe(link)}
        onSwipingLeft={link => this.onSwipe(link)}
      />
    );
  }
}
