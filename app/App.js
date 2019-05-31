import React from 'react';
import { BrowserRouter as Router, NavLink } from 'react-router-dom';
// import { createHistory, useBasename } from 'history'

import { LayoutMode } from './components/ui/layout';
import Authenticate from './containers/auth/Authenticate';
// TODO: make routable
/* import DevTools from './components/devtools/Sidebar'; */
import LinkContainer from './containers/LinkContainer';

import PageContainer from './containers/PageContainer';
import LayoutContainer from './containers/LayoutContainer';
import NavigationBarStoreWithButton from './containers/navigation/NavigationBarStoreWithButton';

import './theme/app.global.scss';
import StaticNavigationBar from './components/navigation/StaticNavigationBar';

export default function App() {
  const project = {
    name: ENV._PROJECT_NAME,
    version: ENV._PROJECT_VERSION,
  };
  console.warn('Starting project boilerplate', project.name, project.version);

  const basename = ENV.SUBFOLDER_LOCATION || '';
  // const history = useBasename(createHistory)({
  //   basename: ENV.SUBFOLDER_LOCATION,
  // });
  // <Router history={history}>
  return (
    <Authenticate>
      <LayoutMode>
        <Router basename={basename}>
          <LayoutContainer
            navBar={() =>
              <NavigationBarStoreWithButton title="TestWork" leftButton={() => <i className="material-icons">navigate_before</i>} rightButton={() => <i className="material-icons">navigate_next</i>} />
            }
            tabBar={() =>
              <StaticNavigationBar>
                <NavLink to="/testwork/inbox" className="NavLink">
                  <i className="material-icons">inbox</i>
                </NavLink>
                <NavLink to="/testwork/tabs" className="NavLink">
                  <i className="material-icons">dashboard</i>
                </NavLink>
                <NavLink to="/testwork/new_event" className="NavLink">
                  <i className="material-icons">event_available</i>
                </NavLink>
              </StaticNavigationBar>
            }
            sideMenu={LinkContainer}
          >
            <PageContainer />
          </LayoutContainer>
        </Router>
      </LayoutMode>
    </Authenticate>
  );
}
