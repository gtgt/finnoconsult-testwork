import { PropTypes } from 'react';

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

export const numberOrStringText = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number,
]);
