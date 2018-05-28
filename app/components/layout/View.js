// import React from 'react';
import styled, { css } from 'styled-components';

// import { oneOrManyChildElements } from '../../prop-types';

const View = styled.div`
  padding:0;
  margin:0;
  ${props => props.isHidden && css`
    display: none;
  `};
  ${props => props.center && css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `};
`;
  // display: flex;
// const View = props => (<div {...props}>{props.children}</div>);

// View.propTypes = {
//   children: oneOrManyChildElements,
// };

module.exports = View;
