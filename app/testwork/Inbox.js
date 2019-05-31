import React from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styled from 'styled-components';

import Screen from '../containers/screens/Screen';

// import { View } from '../components/ui';

import styles from './inbox.scss';

import data from './inbox.json';


const Box = styled.div`
  height: auto;
`;

const MailItemType = {
  from: PropTypes.string.isRequired,
  subject: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
};

class MailItem extends React.Component {
  static propTypes = Object.assign(MailItemType, {
    children: PropTypes.arrayOf(PropTypes.shape(MailItemType)),
  });


  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }
  onClick(e) {
    this.setState({ isOpen: !this.state.isOpen });
    e.stopPropagation();
  }
  render() {
    return (
      <Box
        className={styles.MailItem}
        onClick={clickedItem => this.onClick(clickedItem)}
      >
        <Box className={styles.from}>{this.props.from}</Box>
        <Box className={styles.subject}>{this.props.subject}</Box>
        <Box className={styles.body}>{this.props.body}</Box>
        {this.props.children.length ? (<Box
          className={classnames(
            styles.children, {
              [`${styles.children}--open`]: this.state.isOpen,
            },
          )}
        >
          <MailList list={this.props.children} />
        </Box>) : ''}
      </Box>
    );
  }
}

const MailList = props => (
  <Box className={styles.MailList}>
    {props.list.map(item => (
      <MailItem {...item} />
    ))}
  </Box>
);
MailList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape(MailItem.propTypes)).isRequired,
};

@inject('stores', 'actions') @observer
export default class Inbox extends Screen {

  static defaultProps = {
    pageTitle: 'Inbox',
  }

  get rootData() {
    return data.filter(mail => mail.id && mail.from && mail.subject && mail.body && mail.parent === undefined);
  }

  childData(parentId) {
    return data.filter(mail => mail.id && mail.from && mail.subject && mail.body && mail.parent === parentId);
  }

  transform(mail) {
    return Object.assign(mail, { key: mail.id, children: this.childData(mail.id).map(childMail => this.transform(childMail)) });
  }


  render() {
    return (
      <div className={styles.Inbox}>
        <MailList list={this.rootData.map(mail => this.transform(mail))} />
      </div>
    );
  }
}
