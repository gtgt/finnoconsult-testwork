import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { numberOrStringText, oneOrManyChildElements } from '../../prop-types';


import styles from './Image.scss';

const ImgTag = props => (
  <figure>
    <img
      id={(props.id && 1) ? `img-${props.id}` : 'f'}
      src={props.source}
      alt={props.title}
      style={props.style || {}}
      useMap={props.usemap}
      className={`${props.className || styles.default} ${props.default && styles.default}`}
    />
    {props.caption && (<figcaption>{props.caption}</figcaption>)}
  </figure>
);
ImgTag.propTypes = {
  id: numberOrStringText,
  source: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  caption: PropTypes.string,
  style: PropTypes.shape(),
  usemap: PropTypes.string,
  className: PropTypes.string,
  default: PropTypes.bool,
};

export default class Image extends React.Component {
  static propTypes = {
    children: oneOrManyChildElements,
    link: PropTypes.string,
    source: PropTypes.string,
  }
  static defaultProps = {
    title: '',
  }

  render() {
    if (!this.props.source) return null;

    if (this.props.link) {
      return (
        <Link to={this.props.link}>
          <ImgTag {...this.props} />
          {this.props.children}
        </Link>
      );
    }

    if (this.props.children) {
      return (
        <span>
          <ImgTag {...this.props} />
          {this.props.children}
        </span>
      );
    }

    return <ImgTag {...this.props} />;
  }
}
