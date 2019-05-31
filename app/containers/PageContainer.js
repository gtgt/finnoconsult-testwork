import React, { Component, PropTypes } from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
// import { TransitionGroup, CSSTransition } from 'react-transition-group';

import Inbox from '../testwork/Inbox';
import Tabs from '../testwork/Tabs';
import NewEvent from '../testwork/NewEvent';

import { Page } from '../components/ui/layout/page';
import { DraggableIndicator } from '../components/draggable';

@withRouter
export default class PageContainer extends Component {
  static propTypes = {
    history: PropTypes.shape({
    }).isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
      search: PropTypes.string.isRequired,
    }).isRequired,
  }

  // componentDidMount()a {
  // }
  // componentDidUpdate(prevProps) {
  //   this.checkScrolling(prevProps);
  // }

  setScrollAnchor(e) {
    this.mainPage = e;
  }

  // checkScrolling(prevProps) {
  //   if (prevProps.location.pathname !== this.props.location.pathname && this.mainPage) {
  //     // console.log('routing occurred from ', this.props.location.pathname, 'to', prevProps.location.pathname, this.mainPage);
  //     this.mainPage.scrollIntoView(true);
  //     setTimeout(() => window.scrollTo(0, 0), 10);
  //   }
  // }

  get routerHistory() {
    return this.props.history;
  }

  render() {
    const isHomeMatching = this.props.location.pathname.match(/^\/$/g) !== null;
    return (
      <div>
        {/* TODO: */}
        {/* <ActionSheetContainer isOverlayVisible={isOverlayVisible} /> */}
        <DraggableIndicator />

        <Route
          path="*/testwork"
          render={({ location }) => (
            <Page setScrollAnchor={e => this.setScrollAnchor(e)} isHomeLocation={isHomeMatching}>
              {/* <TransitionGroup>
                 <CSSTransition key={location.key} classNames="pageTransition" timeout={500}> */}
              <Switch location={location}>
                <Route path="*/testwork/inbox" exact component={Inbox} />
                <Route path="*/testwork/tabs" exact component={Tabs} />
                <Route path="*/testwork/tabs/:index" exact component={Tabs} />
                <Route path="*/testwork/new_event" exact component={NewEvent} />
                <Route render={() => <div>Switch Default...</div>} />
              </Switch>
              {/* </CSSTransition>
              </TransitionGroup> */}
            </Page>
          )}
        />
      </div>
    );
  }
}
