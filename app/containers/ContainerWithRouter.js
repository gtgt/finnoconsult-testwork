import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
// import { inject, observer } from 'mobx-react';

import { View } from '../components/layout';

import { oneOrManyChildElements } from '../prop-types';

@withRouter
// @inject('stores', 'actions') @observer
export default class ContainerWithRouter extends React.Component {
  static propTypes = {
    history: PropTypes.shape().isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
    // actions: PropTypes.shape({
    //   toggleNavbar: PropTypes.func.isRequired,
    // }).isRequired,

    // hideNavBar: PropTypes.bool,
    children: oneOrManyChildElements,
    onDragEndPath: PropTypes.func,
  }

  // componentDidMount() {
    // console.log('componentDidMount', this.constructor.name, this.props.actions);
    // if (this.props.actions && this.props.actions.toggleNavbar) {
      // console.log('toggle NAVBAR!', this.props.hideNavBar);
      // this.props.actions.toggleNavbar({ isVisible: !this.props.hideNavBar && true });
    // }
  // }

  onDragEnd({ from, to }) {
    console.log('REAL: onDragEnd', { from, to });
    if (this.props.onDragEndPath) { // TODO: should have been better to test it directly from pots, which is type of investment :)
      this.goTo(this.buildRoute({ postfix: this.props.onDragEndPath(from, to) }));
    }
  }

  get prefix() {
    const path = this.props.location.pathname.replace(/^\/+|\/+$/g, '').split('/');
    return `/${path.slice(0, path.length - 1).join('/')}/`;
  }

  get mainPath() {
    const path = this.props.location.pathname.replace(/^\/+|\/+$/g, '').split('/');
    return `/${path.slice(0, 1).join('/')}/`;
  }

  buildRoute({ func, postfix, subPath }) {
    if (func) return func(this.props.location.pathname);
    if (subPath) return `${this.mainPath}${subPath}`;
    return `${this.prefix}${postfix}`;
  }

  goTo(location) {
    this.routerHistory.push(location);
  }

  goBack(e) {
    this.routerHistory.goBack();
    if (e) {
      e.preventDefault();
      return false;
    }
    return true;
  }

  get routerHistory() {
    return this.props.history || this.context.router.history;
  }

  render() {
    // TODO: better configurable solution for better scalability over the function to be injested!
    const children = this.props.onDragEndPath ?
      React.Children.map(
        this.props.children, child => React.cloneElement(child, {
          // NOTE: here we can inject special methos for the interaction between this router and the child components
          onDragEnd: e => this.onDragEnd(e),
        }),
      )
      : this.props.children;
    return <View>{children}</View>;
  }

}
