import styled, { css } from 'styled-components';

const View = styled.div`
  padding:0;
  margin:0;
  ${props => props.hidden && css`
    display: none;
  `};
  ${props => props.center && css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `};
  ${props => props.fullWidth && css`
    width: 100%;
  `};
  ${props => props.fullHeight && css`
    height: 100%;
  `};
  ${props => (props.autoHeight || props.auto) && css`
    height: auto;
  `};
  ${props => props.height && css`
    height: ${props.height};
  `};
`;

module.exports = View;
