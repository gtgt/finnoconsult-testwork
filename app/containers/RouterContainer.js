import React, { Component, PropTypes } from 'react';
import { Route, withRouter } from 'react-router-dom';
// import Swipeable from 'react-swipeable';

import Page from '../components/page/Page';
import NavigationBarScreen from './navigation/NavigationBarScreen';
import LinkContainer from './LinkContainer';

import { links } from '../content';

@withRouter
export default class RouterContainer extends Component {
  static propTypes = {
    history: PropTypes.shape({
    }).isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
      search: PropTypes.string.isRequired,
    }).isRequired,
  }

  componentDidMount() {
  }
  componentDidUpdate(prevProps) {
    this.checkScrolling(prevProps);
  }

  setScrollAnchor(e) {
    this.mainPage = e;
  }

  checkScrolling(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname && this.mainPage) {
      // console.log('routing occurred from ', this.props.location.pathname, 'to', prevProps.location.pathname, this.mainPage);
      this.mainPage.scrollIntoView(true);
      setTimeout(() => window.scrollTo(0, 0), 10);
    }
  }

  get routerHistory() {
    return this.props.history || this.context.router.history;
  }

  render() {
    return (
      <div>
        <Route exact path="/*">
          <Page className="menu" isHomeLocation={!this.props.location.pathname.match(/\/pages/g)}>
            <Route component={LinkContainer} />
          </Page>
        </Route>
        <Route path="*/pages">
          <Page setScrollAnchor={e => this.setScrollAnchor(e)} isHomeLocation={!this.props.location.pathname.match(/\/pages/g)}>
            {/* <Swipeable
              onSwipingRight={() => this.routerHistory.goBack()}
              className="iframe"
              style={{ width: '100%', height: '100%' }}
            > */}
            <Route component={NavigationBarScreen} />
            <Route
              path="*/pages"
              render={() => (
                <div>
                  <iframe
                    width="100%"
                    height="100%"
                    src={links.functions.getLink(links.items, this.props.location.search)}
                    // src={links.items.find(i => i.id === parseInt(this.props.location.search && this.props.location.search.match(/\?(\d+)/)[1], 10) || 0).link}
                  />
                </div>
              )}
            />
            {/* </Swipeable> */}

          </Page>
        </Route>
      </div>
    );
  }
}
