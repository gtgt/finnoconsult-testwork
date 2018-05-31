import { PropTypes } from 'react';
import { PropTypes as MobxPropTypes } from 'mobx-react';

export const oneOrManyChildElements = PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ])),
  PropTypes.element,
  // single text like string or number can also be a single child
  PropTypes.string,
  PropTypes.number,
  PropTypes.bool,
]);

export const functionOrStringText = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.func,
]);

export const numberOrStringText = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number,
]);


export const arrayOrMobXArray = PropTypes.oneOfType([
  MobxPropTypes.observableArray,
  PropTypes.arrayOf(PropTypes.shape()),
]);
