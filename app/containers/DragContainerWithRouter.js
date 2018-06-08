import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import ContainerWithRouter from './ContainerWithRouter';
import { View } from '../components/ui';

import { oneOrManyChildElements } from '../prop-types';

@withRouter
export default class DragContainerWithRouter extends ContainerWithRouter {
  static propTypes = {
    history: PropTypes.shape().isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,

    children: oneOrManyChildElements,
    onDragEndPath: PropTypes.func,
  }

  onDragEnd({ from, to }) {
    console.log('TODO: better soluition for onDragEnd(', { from, to }, ')');

    if (this.props.onDragEndPath) {
      this.goTo(this.buildRoute({ postfix: this.props.onDragEndPath(from, to) }));
    }
  }

  render() {
    // TODO: better configurable solution for better scalability over the function to be injested!
    const children = React.Children.map(
      this.props.children, child => React.cloneElement(child, {
        // NOTE: here we can inject special methos for the interaction between this router and the child components
        onDragEnd: e => this.onDragEnd(e),
        goTo: e => this.goTo(e),
        goBack: e => this.goBack(e),
      }),
    );
    return <View>{children}</View>;
  }

}
