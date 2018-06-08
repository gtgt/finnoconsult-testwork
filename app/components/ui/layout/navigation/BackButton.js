import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import ContainerWithRouter from '../../../../containers/ContainerWithRouter';
import Button from '../../button/Button';

import { oneOrManyChildElements } from '../../../../prop-types';

@withRouter
export default class BackButton extends ContainerWithRouter {
  static propTypes = {
    children: oneOrManyChildElements,
    color: PropTypes.string,
    className: PropTypes.string,
  }

  static defaultProps = {
    color: '#009EE2',
  }

  defaultBackTemplate = () => (
    <svg className={this.props.className} width="19px" height="16px" viewBox="0 0 19 16" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <title>ico-back</title>
      <desc>ico-back</desc>
      <defs />
      <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="Versicherung-2-webview-detail" transform="translate(-13.000000, -34.000000)" fill={this.props.color}>
          <polygon id="arrow-right-16" transform="translate(22.500000, 41.999950) scale(-1, 1) translate(-22.500000, -41.999950) " points="24.435 33.9999 22.982 35.3299 28.314 40.9999 29.214 41.9999 28.373 42.9999 22.986 48.6619 24.43 49.9999 31.999 42.0449" />
        </g>
      </g>
    </svg>
  );

  render() {
    return (
      <Button {...this.props} onClick={() => this.goBack()}>
        {this.props.children || <this.defaultBackTemplate />}
      </Button>
    );
  }
}
