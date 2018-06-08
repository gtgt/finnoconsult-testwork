import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
// import { createHistory, useBasename } from 'history'

import { LayoutMode } from './components/ui/layout';
import Authenticate from './containers/auth/Authenticate';
// TODO: make routable
import DevTools from './components/devtools/Sidebar';
import LinkContainer from './containers/LinkContainer';

import PageContainer from './containers/PageContainer';
import LayoutContainer from './containers/LayoutContainer';
import NavigationBarStoreWithButton from './containers/navigation/NavigationBarStoreWithButton';
import TabBarContainer from './components/navigation/TabBarContainer';

import getUrlParameter from './helpers/url-helper';

import links from './content/links';

import './theme/app.global.scss';

export default function App() {
  const project = {
    name: ENV._PROJECT_NAME,
    version: ENV._PROJECT_VERSION,
  };
  console.warn('Starting project boilerplate', project.name, project.version);

  const routerConfig = {
    get basename() {
      const autoConfig = getUrlParameter('router-auto-config-root');
      // console.log('autoConfig', autoConfig);
      if (autoConfig && (
        autoConfig.value === 'true' ||
        autoConfig.value === true ||
        (autoConfig.name && !autoConfig.value && autoConfig.name === autoConfig.param)
      )) {
        return window.location.pathname;
      }
      return ENV.SUBFOLDER_LOCATION || '';
    },
  };

  return (
    <Authenticate>
      <LayoutMode>
        <Router {...routerConfig}>
          <LayoutContainer
            headerMenu={() => <valami>TODO: Dummy header</valami>}
            navBar={() => <NavigationBarStoreWithButton />}
            //  rightButton={() => <span style={{ transform: 'rotate(90deg)' }}>:-)</span>}
            tabBar={() => <TabBarContainer items={links.links.tabBarLinks} />}
            sideMenu={LinkContainer}
          >
            <PageContainer />
          </LayoutContainer>
        </Router>
        <DevTools />
      </LayoutMode>
    </Authenticate>
  );
}
