import React from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Screen from '../containers/screens/Screen';

// import styles from './Form.scss';
import { View } from '../components/ui';
import NavigationBarContainer from '../containers/navigation/NavigationBarContainer';
import MobileNavigationBar from '../components/navigation/MobileNavigationBar';
import Button from '../components/ui/button/Button';
import { HorizontalLayout, VerticalLayout } from '../components/ui/layout';

import styles from './NewEvent.scss';
import { oneOrManyChildElements } from '../prop-types';
import { TextInput } from '../components/ui/input';


const FormRow = props => (
  <VerticalLayout className={styles.FormRow}>
    <HorizontalLayout className={styles.details}>
      <label className={styles.label} htmlFor="textInput">Market visit</label>
      <var className={styles.value}>{props.value || ' '}</var>
    </HorizontalLayout>
    <div className={classnames(styles.form, { [`${styles.visible}`]: props.visible })}>
      {props.children}
    </div>
  </VerticalLayout>
);
FormRow.propTypes = {
  value: PropTypes.string,
  visible: PropTypes.bool,
  children: oneOrManyChildElements,
};
FormRow.defaultProps = {
  value: '',
  visible: true,
};

@inject('stores', 'actions') @observer
export default class NewEvent extends Screen {

  static defaultProps = {
    pageNavBar: () => <NavigationBarContainer
      navigationBar={MobileNavigationBar}
      isVisible
      title="New Event"
      leftButton={() => <Button>Cancel</Button>}
      rightButton={() => <p>&nbsp;</p>}
    />,
  };
  constructor(props) {
    super(props);
    this.state = {
      textInput: '',
    };
  }
  render() {
    return (
      <View>
        <VerticalLayout className={styles.Form}>
          <FormRow value={this.state.textInput}>
            <TextInput
              id="textInput"
              placeholder="how much money?"
              value={this.state.textInput}
              onChange={({ target: { value } }) => this.setState({ textInput: value })}
            />
          </FormRow>
        </VerticalLayout>
      </View>

    );
  }
}
