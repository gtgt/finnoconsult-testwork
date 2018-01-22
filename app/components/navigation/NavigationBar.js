import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';
import Swipeable from 'react-swipeable';

import { functionOrStringText } from '../../prop-types';

import styles from './NavigationBar.scss';
import Back from './Back';


@observer
export default class NavigationBar extends Component {
  static propTypes = {
    // isNavigationBarVisible: PropTypes.bool.isRequired,
    navigationBarClassName: PropTypes.string,
    navigationBarBackLink: functionOrStringText,
    title: PropTypes.string,
  }

  onBackClick() {
    const action = typeof (this.props.navigationBarBackLink) === 'function' ? this.props.navigationBarBackLink() : this.props.navigationBarBackLink;
    if (action) {
      // console.log('link text', action);
      this.context.router.history.push(action);
    } else {
      // console.log('link back');
      this.context.router.history.push('/');
    }
  }

  render() {
    const { title } = this.props;
    // const { isNavigationBarVisible, title } = this.props;

    // if (!isNavigationBarVisible) return null;

    return (
      <Swipeable
        onSwipingRight={() => this.onBackClick()}
        className={`${styles.component} ${this.props.navigationBarClassName}`}
        // style={{ width: '100%', height: '100%' }}
      >
        <div className=" l-container l-container--horizontal l-container-grow">

          <div className={styles.leftMenuContainer}>
            <button
              className="o-button o-button--cta"
              onClick={() => this.onBackClick()}
            >
              <Back className={styles.back} color={!this.props.navigationBarClassName ? styles.themeColorMain : styles.themeColorWhite} />
            </button>
          </div>

          {title && (
            <div className={styles.titleContainer}>
              <h1 className={styles.title}>{title}</h1>
            </div>
          )}
        </div>
      </Swipeable>
    );
  }
}


NavigationBar.contextTypes = {
  router: React.PropTypes.object,
};
