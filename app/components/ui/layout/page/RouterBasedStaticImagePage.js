import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

// import Screen from '../../../../containers/screens/Screen';

import getUrlParameter from '../../../../helpers/url-helper';

import { oneOrManyChildElements } from '../../../../prop-types';

import StaticImagePage from './StaticImagePage';

@inject('stores', 'actions') @observer
export default class RouterBasedStaticImagePage extends React.Component {
  static propTypes = {
    children: oneOrManyChildElements,
    match: PropTypes.shape({
      params: PropTypes.shape({
        image: PropTypes.string,
        title: PropTypes.string,
      }).isRequired,
    }).isRequired,
    imageRepository: PropTypes.shape(),
  }

  static defaultProps = {
    imageRepository: {
      bank: 'https://finnoconsult.at/img/bg-bank.jpg',
    },
  }


  get title() {
    return (getUrlParameter('title') && decodeURIComponent(getUrlParameter('title').value))
      || this.props.match.params.title;
  }

  get image() {
    return (getUrlParameter('image') && decodeURIComponent(getUrlParameter('image').value))
      || (this.props.match.params.image && this.props.imageRepository && this.props.imageRepository[this.props.match.params.image]);
  }

  get images() {
    return [
      {
        source: this.image,
        title: this.title,
      },
    ];
  }

  render() {
    return (
      <StaticImagePage
        pageTitle={this.title}
        images={this.images}
      >
        {this.props.children}
      </StaticImagePage>
    );
  }
}
