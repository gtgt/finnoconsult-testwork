import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
// import { createHistory, useBasename } from 'history'

import LayoutMode from './components/layout/LayoutMode';
import Authenticate from './containers/auth/Authenticate';
import DevTools from './components/devtools/Sidebar';

import RouterContainer from './containers/RouterContainer';

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
          <RouterContainer />
        </Router>
        <DevTools />
      </LayoutMode>
    </Authenticate>
  );
}
