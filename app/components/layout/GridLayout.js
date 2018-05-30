import styled, { css } from 'styled-components';

const GridLayout = styled.div`
   /* Grid Fallback */
  display: flex;
  flex-wrap: wrap;

  /* Supports Grid */
  display: grid;
  grid-gap: ${props => props.gap || '1em'};

  /* uses as many column as specified in 'column' props */
  ${props => props.columns && css`
    grid-template-columns: repeat(${props.columns}, auto);
    grid-auto-rows: minmax(${props.height || '150px'}, auto);
  `};

  /* in case 'column' props missing, uses responsive grid-cell-width  */
  ${props => !props.columns && css`
    grid-template-columns: repeat(auto-fill, minmax(${props.height || '200px'}, 1fr));
    grid-auto-rows: minmax(${props.height || '150px'}, auto);
  `};

  & > * {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    overflow: hidden;
  }
`;

module.exports = GridLayout;
