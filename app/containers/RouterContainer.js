import React, { Component, PropTypes } from 'react';
import { Route, withRouter } from 'react-router-dom';

import Page from '../components/page/Page';
import NavigationBarScreen from './navigation/NavigationBarScreen';
import LinkContainer from './LinkContainer';
import Doors from '../components/opensezame/doors/Doors';

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
    const isHomeMatching = this.props.location.pathname.match(/^\/$/g) !== null;
    return (
      <div>
        <Route exact path="/*">
          <Page className="menu" isHomeLocation={isHomeMatching}>
            <Route component={LinkContainer} />
          </Page>
        </Route>
        <Route path="*/pages">
          <Page setScrollAnchor={e => this.setScrollAnchor(e)} isHomeLocation={isHomeMatching}>
            <Route component={NavigationBarScreen} />
            <Route
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
          </Page>
        </Route>

        <Route path="*/opensezame">
          <Page setScrollAnchor={e => this.setScrollAnchor(e)} isHomeLocation={isHomeMatching}>
            <Route component={NavigationBarScreen} />

            <Route path="*/opensezame" exact component={Doors} />
            <Route path="*/opensezame/beacons" exact component={Doors} />
            <Route path="*/opensezame/triggers" exact component={Doors} />
            <Route
              path="*/opensezame/doors"
              render={() => (
                <div>
                  <h1>
                    This is more specific, the Door related admin
                  </h1>
                  <Doors />
                </div>
              )}
            />
          </Page>
        </Route>
      </div>
    );
  }
}
