import { observable, computed, action } from 'mobx';

// import Store from './lib/Store';

export default class AccountStore {
  // extends Store

  // FIXME: getclient size instead of this hardcoded setting (which anyway is in _variable.css as well)
  @observable containerHeight = 410;
  @observable itemHeight = 60;
  @observable handleHeight = 50;

  // slide3:
  @observable handleHeight3 = 90;
  @observable handleBarHeight3 = 16;
  @observable handleMarginTop = 160;

  @observable adjustedFrom = -1; // TODO: set back to -1
  @observable adjustedTo = -1; // TODO: set back to -1
  @observable adjustedAmount = 0;

  currency = 'CHF';

  iconFolderWhite='/icons/white/';
  iconFolderBlue='/icons/blue/';

  // NOTE/FIXME: every item has the id the same as the index id, which might not be the same in live
  @observable items = [
    {
      id: 0,
      icon: `${this.iconFolderWhite}Coins.svg`,
      selectedIcon: `${this.iconFolderBlue}Coins.svg`,
      selectedClass: 'selectedItem1',
      title: 'Ausgaben',
      className: 'special',
      amount: 10234.51,
      active: true,
    },
    {
      id: 1,
      icon: `${this.iconFolderWhite}Card.svg`,
      selectedIcon: `${this.iconFolderBlue}Card.svg`,
      title: 'Leben',
      amount: 7900,
      active: true,
    },
    {
      id: 2,
      icon: `${this.iconFolderWhite}Plane.svg`,
      selectedIcon: `${this.iconFolderBlue}Plane.svg`,
      title: 'Reisen',
      amount: 10000,
      active: false,
    },
    {
      id: 3,
      icon: `${this.iconFolderWhite}savings.svg`,
      selectedIcon: `${this.iconFolderBlue}savings.svg`,
      title: 'Sparen',
      amount: 10000,
      active: true,
    },
    {
      id: 4,
      icon: `${this.iconFolderWhite}camera.svg`,
      selectedIcon: `${this.iconFolderBlue}camera.svg`,
      title: 'Macbook',
      amount: 1800,
      active: true,
    },
    // {
    //   id: 5,
    //   icon: `${this.iconFolderWhite}camera.svg`,
    //   selectedIcon: `${this.iconFolderBlue}camera.svg`,
    //   title: 'Rent',
    //   amount: 100.3,
    //   active: false,
    // },
    // {
    //   id: 6,
    //   icon: `${this.iconFolderWhite}camera.svg`,
    //   selectedIcon: `${this.iconFolderBlue}camera.svg`,
    //   title: 'DVD',
    //   amount: 100.3,
    //   active: false,
    // },
    // {
    //   id: 7,
    //   icon: `${this.iconFolderWhite}camera.svg`,
    //   selectedIcon: `${this.iconFolderBlue}camera.svg`,
    //   title: 'TV',
    //   amount: 100.3,
    //   active: false,
    // },
    // {
    //   id: 8,
    //   icon: `${this.iconFolderWhite}camera.svg`,
    //   selectedIcon: `${this.iconFolderBlue}camera.svg`,
    //   title: 'Laptop',
    //   amount: 100.3,
    //   active: false,
    // },
    // {
    //   id: 9,
    //   icon: `${this.iconFolderWhite}camera.svg`,
    //   selectedIcon: `${this.iconFolderBlue}camera.svg`,
    //   title: 'Car',
    //   amount: 100.3,
    //   active: false,
    // },
    {
      id: 10,
      icon: `${this.iconFolderBlue}ico-plus.svg`,
      selectedIcon: `${this.iconFolderBlue}ico-plus.svg`,
      title: 'Kategorie hinzufügen',
      amount: 0,
      active: false,
      // className: 'nodrag',
      nodrag: true,
    },
  ];

  @computed get getTotal() {
    return this.items.reduce((a, b) => a + b.amount, 0);
  }

  @computed get getActiveTotal() {
    return this.items.filter(item => item.active).reduce((a, b) => a + b.amount, 0);
  }

  @computed get getSlide1ItemNetSize() {
    const items = this.getActiveItems;
    const availableHeight = this.containerHeight - (items.length * this.itemHeight);
    const units = availableHeight / (items[this.getSlide1AdjustedFrom].amount + items[this.getSlide1AdjustedTo].amount);
    const positions = [];
    items.filter(item => item.active).map((item, index) => {
      positions[index] = (index === this.getSlide1AdjustedFrom || index === this.getSlide1AdjustedTo) ? (items[index].amount * units) : 0;
      return true;
    });
    // console.log(positions);
    return positions;
  }

  @computed get getActiveItems() {
    return this.items.filter(item => item.active);
  }

  @computed get getSlide1AdjustedFrom() {
    return (this.adjustedFrom >= 0) ? this.adjustedFrom : 0;
  }

  @computed get getSlide1AdjustedTo() {
    return (this.adjustedTo >= 0) ? this.adjustedTo : 1;
  }

  @action get2Items(a, b) {
    return this.items.filter(item => item.id === a || item.id === b);
  }

  @action getRealItemIndex(i) {
    return this.items.findIndex(item => item.id === i);
  }
  @action getItem(i) {
    return this.items.find(item => item.id === i);
  }

  @action getItemPixelHeight(index) {
    // console.log(`getItemPixelHeight ${index} ${this.getSlide1ItemNetSize[index]} + ${this.itemHeight}`);
    return this.getSlide1ItemNetSize[index] + this.itemHeight;
  }

  @action selectAdjustedItems({ from }) {
    // FIXME quick and dirty hack if we have the ids same as array index, and considers its a sorted array
    // const smallerItems = this.getActiveItems.filter(elem => elem.id < from);
    // const prevItem = smallerItems.reverse().keys()[0];
    // const nextItem = this.getActiveItems.findIndex(elem => elem.id > from);
    // if (prevItem) {
    //   this.adjustedFrom = prevItem;
    //   this.adjustedTo = from;
    // } else {
    //   this.adjustedFrom = from;
    //   this.adjustedTo = nextItem;
    // }

    const fromIndex = this.getActiveItems.findIndex(elem => elem.id === from);
    if (fromIndex === 0) {
      this.adjustedFrom = fromIndex;
      this.adjustedTo = fromIndex + 1;
    } else {
      this.adjustedFrom = fromIndex - 1;
      this.adjustedTo = fromIndex;
    }
    // console.log(this.getActiveItems.keys());
    console.log(` (${from}) => fromIndex: ${fromIndex} => ${this.adjustedFrom} to: ${this.adjustedTo}`);
  }

  @action moveSlide1AmountBetweenActiveItems({ value }) {
    let adjustment = value;
    adjustment = (adjustment / (this.getSlide1ItemNetSize[this.getSlide1AdjustedFrom] + this.getSlide1ItemNetSize[this.getSlide1AdjustedTo])) * (this.getActiveItems[this.getSlide1AdjustedFrom].amount + this.getActiveItems[this.getSlide1AdjustedTo].amount);
    // console.log(`c: ${value}, => ${adjustment}`);
    this.getActiveItems[this.getSlide1AdjustedFrom].amount = Math.abs(this.getActiveItems[this.getSlide1AdjustedFrom].amount + adjustment);
    this.getActiveItems[this.getSlide1AdjustedTo].amount = Math.abs(this.getActiveItems[this.getSlide1AdjustedTo].amount - adjustment);
    // adjustment = (adjustment / this.containerHeight) * (this.getActiveItems[this.getSlide1AdjustedFrom].amount + this.getActiveItems[this.getSlide1AdjustedTo].amount);
    // console.log(`c: ${this.containerHeight}, ${value}, => ${adjustment}`);
    // this.getActiveItems[this.getSlide1AdjustedFrom].amount = this.getActiveItems[this.getSlide1AdjustedFrom].amount + adjustment;
    // this.getActiveItems[this.getSlide1AdjustedTo].amount = this.getActiveItems[this.getSlide1AdjustedTo].amount - adjustment;
  }

  // @action addAmount(index, amount) {
  //   console.log(`FIXME: addAmount ${index} ${amount}`);
  //   this.items[index].amount += amount;
  // }

  // constructor(...args) {
  //   super(...args);
  //
  //   // Register action handlers
  //   this.actions.setMaxSlides.listen(this._setMaxSlides.bind(this));
  // }

  // _setMaxSlides({ maxSlides }) {
  //   this.maxSlides = maxSlides;
  // }

}
