import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';

import actions from './actions';
import storeFactory from './stores';
import App from './App';

const stores = storeFactory(actions);

window.addEventListener('load', () => {
  window.app = {
    stores,
    actions,
    render() {
      render(
        <Provider stores={stores} actions={actions}>
          <App />
        </Provider>,
        document.getElementById('root'));
    },
  };

  window.app.render();
});
