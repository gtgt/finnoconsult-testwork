/* eslint-disable react/no-find-dom-node,react/forbid-prop-types */
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import classnames from 'classnames';
import { inject, observer } from 'mobx-react';

import Screen from '../containers/screens/Screen';

import styles from './inbox.scss';
import data from './inbox.json';


const Box = styled.div`
  height: ${props => (
    isNaN(props.height) ? 'auto' : `${props.height}px`
  )}
`;

const MailItemType = {
  from: PropTypes.string.isRequired,
  subject: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
};

class MailItem extends React.Component {
  static propTypes = Object.assign(MailItemType, {
    children: PropTypes.arrayOf(PropTypes.shape(MailItemType)),
    zIndex: PropTypes.number,
  });

  static defaultProps = {
    zIndex: null,
  };


  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      childrenHeight: 0,
    };
    this.childrenHeight = null;
  }
  onClick = (e) => {
    this.setState({ isOpen: !this.state.isOpen });
    e.stopPropagation();
  };
  measureChildren = (childrenContainer) => {
    if (childrenContainer && !this.childrenHeight) {
      const element = ReactDOM.findDOMNode(childrenContainer);
      this.setState({ childrenHeight: element.offsetHeight });
    }
  };

  render() {
    return (
      <Box className={classnames(styles.MailItem, { [`${styles.MailItem}--hasChildren`]: this.props.children.length, [`${styles.MailItem}--open`]: this.state.isOpen })} onClick={this.onClick} style={{ zIndex: this.props.zIndex }}>
        <Box className={styles.from}>{this.props.from}</Box>
        <Box className={styles.subject}>{this.props.subject}</Box>
        <Box className={styles.body}>{this.props.body}</Box>
        {this.props.children.length && (this.state.isOpen || this.state.childrenHeight) ? (
          <Box height={this.state.childrenHeight} className={classnames(styles.children, { [`${styles.children}--closed`]: !this.state.isOpen })}>
            <MailList onMount={this.measureChildren} list={this.props.children} />
          </Box>
        ) : null}
      </Box>
    );
  }
}

const MailList = props => (
  <Box ref={props.onMount} className={styles.MailList}>
    {props.list.map((item, index) => (
      <MailItem zIndex={props.list.length - index} {...item} />
    ))}
  </Box>
);
MailList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape(MailItem.propTypes)).isRequired,
  onMount: PropTypes.func,
};
MailList.defaultProps = {
  show: true,
};

@inject('stores', 'actions') @observer
export default class Inbox extends Screen {

  static defaultProps = {
    pageTitle: 'Inbox',
  };

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
