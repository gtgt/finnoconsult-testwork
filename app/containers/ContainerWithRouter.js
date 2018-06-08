import React from 'react';
import PropTypes from 'prop-types';

export default class DragContainerWithRouter extends React.Component {
  static propTypes = {
    history: PropTypes.shape().isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
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


}
