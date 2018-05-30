import View from './View';

const ScrollView = View.extend`
  overflow:auto;
  height: auto;
  overflow-x: hidden;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
`;

module.exports = ScrollView;
