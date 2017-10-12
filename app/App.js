import React from 'react';

import LayoutMode from './components/layout/LayoutMode';
import Authenticate from './containers/auth/Authenticate';
import DevTools from './components/devtools/Sidebar';

import './theme/app.global.scss';

export default function App() {
  const project = {
    name: ENV._PROJECT_NAME,
    version: ENV._PROJECT_VERSION,
  };
  console.warn('Starting project boilerplate', project.name, project.version);

  return (
    <Authenticate>
      <LayoutMode>
        <h1>{project.name} v{project.version}</h1>
        <DevTools />
      </LayoutMode>
    </Authenticate>
  );
}
