import AnimStore from './AnimStore';
import UIStore from './UIStore';
import FormStore from './FormStore';
import DragStore from './DragStore';
import AccountStore from './AccountStore';

export default (actions) => {
  const stores = {};
  Object.assign(stores, {
    anim: new AnimStore(stores, actions),
    ui: new UIStore(stores, actions),
    form: new FormStore(stores, actions),
    drag: new DragStore(stores, actions),
    account: new AccountStore(stores, actions),
  });
  // Initialize all stores
  Object.keys(stores).forEach((name) => {
    if (stores[name] && stores[name].initialize) stores[name].initialize();
  });
  return stores;
};
