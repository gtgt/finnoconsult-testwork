import React from 'react';
import PropTypes from 'prop-types';

import View from './View';

const Heading1 = View.withComponent('h1').extend`
  margin: 0 auto;
  padding: 1em 0 2em 0;
`;
const Heading2 = Heading1.withComponent('h2').extend`
  padding: 0.5em 0 1em 0;
`;
const Heading3 = View.withComponent('h3').extend`
  padding: 0;
`;
const Heading4 = View.withComponent('h4').extend`
`;
const Heading5 = View.withComponent('h5').extend`
`;
const Heading6 = View.withComponent('h6').extend`
`;

const _Heading = (props) => {
  if (props.h1 || props.level === 1) return <Heading1 {...props} />;
  if (props.h2 || props.level === 2) return <Heading2 {...props} />;
  if (props.h3 || props.level === 3) return <Heading3 {...props} />;
  if (props.h4 || props.level === 4) return <Heading4 {...props} />;
  if (props.h5 || props.level === 5) return <Heading5 {...props} />;
  if (props.h6 || props.level === 6) return <Heading6 {...props} />;
  return null;
};
_Heading.propTypes = {
  h1: PropTypes.bool,
  h2: PropTypes.bool,
  h3: PropTypes.bool,
  h4: PropTypes.bool,
  h5: PropTypes.bool,
  h6: PropTypes.bool,
  level: PropTypes.number,
};

export const H1 = Heading1;
export const H2 = Heading2;
export const H3 = Heading3;
export const H4 = Heading4;
export const H5 = Heading5;
export const H6 = Heading6;
export const Heading = _Heading;
