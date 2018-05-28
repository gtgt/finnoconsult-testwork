// import React from 'react';
import View from './View';

// import { oneOrManyChildElements } from '../../prop-types';

const ScrollView = View.extend`
  border: double 3px black;
  overflow:auto;
  height: auto;
  overflow-x: hidden;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
`;

module.exports = ScrollView;
