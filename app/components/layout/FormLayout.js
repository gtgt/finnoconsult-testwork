import View from './View';

const FormLayout = View.extend`
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-rows: auto;
  grid-gap: 10px;
  height: auto;

  & > button.o-button--submit {
    padding: 10px;
    width: 80%;
    grid-column: 1 / 3;
  }
`;

module.exports = FormLayout;
