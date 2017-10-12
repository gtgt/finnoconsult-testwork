import { action, observable, computed } from 'mobx';

import Store from './lib/Store';
import { advisors } from '../content';


export default class FormStore extends Store {

  @observable advisors = advisors;
  @observable data = {
  };

  constructor(...args) {
    super(...args);

    // Register action handlers
    this.actions.updateFormData.listen(this._updateFormData.bind(this));
  }

  // Computed getters


  @computed get getData() {
    return this.data;
  }


  // Actions

  // @action _setAdvisor({ value }) {
  //   this.data.advisor = value;
  // }

  @action _updateFormData(...data) {
    Object.assign(this.data, ...data);
  }

  // Helpers

}
