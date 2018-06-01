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


import './theme/app.global.scss';

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
            headerMenu={() => <valami>TODO: Dummy header</valami>}
            navBar={() => <NavigationBarStoreWithButton rightButton={() => <span style={{ transform: 'rotate(90deg)' }}>:-)</span>} />}
            tabBar={() => <div> TODO: Footer</div>}
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
