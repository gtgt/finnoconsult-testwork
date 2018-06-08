import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import ContainerWithRouter from '../../../../containers/ContainerWithRouter';
import Button from '../../button/Button';

import { oneOrManyChildElements } from '../../../../prop-types';

@withRouter
export default class NavigationButton extends ContainerWithRouter {
  static propTypes = {
    children: oneOrManyChildElements,
    to: PropTypes.string,
    onClick: PropTypes.func,
  }

  onClick(e) {
    if (this.props.onClick) this.props.onClick(e);
    else this.goTo(this.props.to);
  }

  render() {
    return (
      <Button {...this.props} onClick={e => this.onClick(e)}>
        {this.props.children}
      </Button>
    );
  }
}
