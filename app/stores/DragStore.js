import { action, observable, computed } from 'mobx';
// import PropTypes from 'prop-types';

import Store from './lib/Store';

export default class DragStore extends Store {

  @observable data = {};

  // @observable _source = null;
  @observable showIndication = true;
  @observable _initialPosition = {};
  @observable _position = {};
  @observable _targets = {};

  constructor(...args) {
    super(...args);

    // Register action handlers
    // this.actions.setSource.listen(this._setSource.bind(this));
    this.actions.setSourcePosition.listen(this._setSourcePosition.bind(this));
    this.actions.cleanSourcePosition.listen(this._cleanSourcePosition.bind(this));
    this.actions.registerTarget.listen(this._registerTarget.bind(this));
    this.actions.removeTarget.listen(this._removeTarget.bind(this));
    this.actions.setIndication.listen(this._setIndication.bind(this));
    this.actions.cleanIndication.listen(this._cleanIndication.bind(this));
    // this.actions.testTargets.listen(this._testTargets.bind(this));
  }

  // Computed getters

  @computed get isDragging() {
    return (this._position && this._position.x > 0 && this._position.y > 0);
    // 0
    // || this._source !== null
    // ||
  }

  isItemSelected({ targetItem, position }) {
    const rect = targetItem.getBoundingClientRect();
    const isSelected = rect.x <= position.x
      && rect.y <= position.y
      && rect.x + rect.width >= position.x
      && rect.y + rect.height >= position.y;
    // console.log('isItemSelected', isSelected, position.x, this._initialPosition.y, rect.x, rect.y, rect.width, rect.height);
    return isSelected;
  }

  debugTargetPositions() {
    // Object.keys(this._targets).forEach(id => console.debug(
    //   id,
    //   this._targets[id].getBoundingClientRect().x,
    //   this._targets[id].getBoundingClientRect().y,
    //   this._targets[id].getBoundingClientRect().width,
    //   this._targets[id].getBoundingClientRect().height,
    // ));
  }

  @computed get getInitialPosition() {
    return this._initialPosition;
  }

  @computed get getPosition() {
    return this._position;
  }

  @computed get selectedTargetName() {
    const position = this._position;
    // const position = (this._source && this._source.getBoundingClientRect()) || {};
    // TODO: wait for 10ms?
    // console.log('test', position);

    let init = false;
    const found = Object.keys(this._targets).find((id) => {
      if (!init && this.isItemSelected({ targetItem: this._targets[id], position: this._initialPosition })) init = true;
      const selected = !this.isItemSelected({ targetItem: this._targets[id], position: this._initialPosition })
        && this.isItemSelected({ targetItem: this._targets[id], position });
      // console.warn('selectedTargetName?',
      //   id,
      //   this.isItemSelected({ targetItem: this._targets[id], position: this._initialPosition }),
      //   this.isItemSelected({ targetItem: this._targets[id], position }),
      //   selected,
      //   (position.x),
      //   (position.y),
      //   (this._initialPosition.x),
      //   (this._initialPosition.y),
      //   Math.floor(position.x),
      //   Math.floor(position.y),
      //   Math.floor(this._initialPosition.x),
      //   Math.floor(this._initialPosition.y),
      // );
      this.debugTargetPositions();
      return selected;
    },
    );
    // console.log('selectedTargetName ==>> ', found, init);
    return found;
  }

  @computed get selectedTargetId() {
    // const match = this.selectedTargetName && this.selectedTargetName.match(/\w*(-?[\d+]).*/);
    // console.warn('match', this.selectedTargetName.replace(/[a-z\W]/ig, ''), parseInt(this.selectedTargetName.replace(/[a-z\W]/ig, ''), 10));
    const match = this.selectedTargetName && this.selectedTargetName.replace(/[a-z\W]/ig, '');
    // console.log('this.selectedTargetName', this.selectedTargetName, match, match && parseInt(match[1], 10), (match && parseInt(match[1], 10)) || null, match ? parseInt(match[1], 10) : null);
    return match ? parseInt(match, 10) : null;
  }
  // @computed get active() {
  //   return this._source !== null;
  // }

  // Actions

  // NOTE: not needed at all...
  // @action _setSource({ node }) {
  //   this._source = node;
  // }

  @action _setSourcePosition({ position }) {
    if (!this.isDragging) {
      this.debugTargetPositions();
      this._initialPosition = position;
    }
    this._position = position;
  }

  @action _cleanSourcePosition() {
    this._position = this._initialPosition = {};
    // console.log('_cleanSourcePosition', this.selectedTargetName, this.context.router.history);
  }

  // @action _cleanSource() {
  //   this._source = null;
  // }

  _generateHash({ node }) {
    return node && node.id;
  }

  @action _registerTarget({ node }) {
    // NOTE: if we are using draggablesource, the 1st item remain unchanged on dragging, which we need to register only
    if (!this.isDragging && !this._targets[this._generateHash({ node })]) {
      // console.warn('_registerTarget', node.id, this._generateHash({ node }));
      this._targets[this._generateHash({ node })] = node;
      // console.log(this._targets);
    }
  }
  @action _removeTarget() {
  // @action _removeTarget({ node }) {
    // console.log('removeTarget for', this._generateHash(node));
    // delete this._targets[this._generateHash(node)];
    this._targets = {};
  }


  @action _setIndication({ show }) {
    this.showIndication = show;
  }

  @action _cleanIndication() {
    this.showIndication = true;
  }

}

//
// DragStore.contextTypes = {
//   router: PropTypes.object,
// };
