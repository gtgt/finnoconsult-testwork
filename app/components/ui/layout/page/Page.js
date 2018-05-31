import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// import UIStore from '../../stores/UIStore';

import { oneOrManyChildElements } from '../../../../prop-types';
import styles from './Page.scss';

@withRouter
@inject('stores', 'actions') @observer
export default class Page extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: oneOrManyChildElements,
    // TODO: refactor setScrollAnchor to Layout*
    setScrollAnchor: PropTypes.func,
    // isHomeLocation: PropTypes.bool,
    // stores: PropTypes.shape({
    //   ui: PropTypes.instanceOf(UIStore).isRequired,
    // }).isRequired,
    actions: PropTypes.shape({
      // toggleNavbar: PropTypes.func.isRequired,
      setNavBarTitle: PropTypes.func.isRequired,
      setNavBarClassName: PropTypes.func.isRequired,
      setNavigationBarLeftLink: PropTypes.func.isRequired,
      setNavigationBarRightLink: PropTypes.func.isRequired,
      toggleNavbar: PropTypes.func.isRequired,
      setNavBarComponent: PropTypes.func.isRequired,
    }).isRequired,
    // location: PropTypes.shape({
    //   pathname: PropTypes.string.isRequired,
    // }).isRequired,
  };
  //

  state = {
    previousPage: null,
    previousPageCount: 0,
    previousCleanup: new Date(),
  }
  shouldComponentUpdate(nextProps, nextState) {
    // NOTE: BUGFIX: clicks within 500ms, prevents the cleanup, before pure text compoenents, which is the time defined for CSSTransition
    if (nextState.previousPage !== nextProps.location.pathname) {
      // console.log('cleaning up!', nextState.previousPageCount, nextState.previousCleanup, new Date() - this.state.previousCleanup);
      // cleaning up previous NavBar setting before applying a new routing, to be prepared for Pure Text Components
      const {
        setNavBarTitle,
        setNavBarClassName,
        setNavigationBarLeftLink,
        setNavigationBarRightLink,
        toggleNavbar,
        setNavBarComponent,
      } = this.props.actions;

      toggleNavbar({ isVisible: true });
      setNavBarComponent({ component: null });
      setNavBarTitle({ title: '' });
      setNavBarClassName({ className: '' });
      setNavigationBarLeftLink({ link: null });
      setNavigationBarRightLink({ link: null });


      this.setState(prevState => ({
        previousPage: nextProps.location.pathname,
        previousPageCount: prevState.previousPageCount+1,
        previousCleanup: new Date(),
      }));
    }
    return true;
  }

  // componentDidMount() {
  //   this.toggleMenu();
  // }
  //
  // componentDidUpdate() {
  //   this.toggleMenu();
  // }
  //
  // toggleMenu() {
  //   // if () {
  //   this.props.actions.toggleNavbar({ isVisible: this.props.isHomeLocation });
  //   // }
  // }

  render() {
    return (
      <div
        className={classnames({
          [`${styles.component}`]: true,
          [`${this.props.className}`]: this.props.className,
          // [`${styles.isMenuVisible}`]: this.props.stores.ui.isNavigationBarVisible,
        })}
        ref={e => this.props.setScrollAnchor && this.props.setScrollAnchor(e)}
      >
        {this.props.children}
      </div>

    );
  }
}
