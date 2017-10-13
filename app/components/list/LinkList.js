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
    <Link to={props.link}>
      {props.image && (
        <div className={styles.image} style={{ backgroundImage: `url(${props.image})` }} />
      )}
      <h5>{props.title}</h5>
      {props.description && (
        <h6>{props.description}</h6>
      )}
    </Link>
    {/* </Swipeable> */}
  </li>;
ListItem.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  link: PropTypes.string.isRequired,
  // onSwipingRight: PropTypes.func,
  // onSwipingLeft: PropTypes.func,
};


export default class LinkList extends React.Component {
  static propTypes = {
    list: PropTypes.arrayOf(PropTypes.shape({
      image: PropTypes.string,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      link: PropTypes.string.isRequired,
    })).isRequired,
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
              onSwipingRight={link => this.props.onSwipingRight(link)}
              onSwipingLeft={link => this.props.onSwipingLeft(link)}
            />
          ))}
        </ul>
      </div>
    );
  }
}
