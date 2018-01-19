import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import Swipeable from 'react-swipeable';

import styles from './LinkList.scss';

const ListItem = props =>
  <li>
    {/* <Swipeable
      onSwipingRight={() => props.onSwipingRight && props.onSwipingRight(props.link)}
      onSwipingLeft={() => props.onSwipingLeft && props.onSwipingLeft(props.link)}
      // style={{ height: 'auto' }}
    > */}
    <Link to={props.route}>
      {props.image && (
        <div className={styles.image} style={{ backgroundImage: `url(${props.image})` }} />
      )}
      <h5>{props.title}</h5>
      <h6>{props.link}</h6>
      {props.description && (
        <p>{props.description}</p>
      )}
    </Link>
    {/* </Swipeable> */}
  </li>;
ListItem.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  link: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
  // onSwipingRight: PropTypes.func,
  // onSwipingLeft: PropTypes.func,
};


export default class LinkList extends React.Component {
  static propTypes = {
    list: PropTypes.arrayOf(PropTypes.shape(ListItem.propTypes)).isRequired,
    onSwipingRight: PropTypes.func,
    onSwipingLeft: PropTypes.func,
  };

  render() {
    return (
      <div className={styles.component}>
        <ul>
          {this.props.list.map((item, index) => (
            <ListItem
              key={index}
              image={item.image}
              title={item.title}
              description={item.description}
              link={item.link}
              route={item.route}
              onSwipingRight={link => this.props.onSwipingRight(link)}
              onSwipingLeft={link => this.props.onSwipingLeft(link)}
            />
          ))}
        </ul>
      </div>
    );
  }
}
