import styled, { css } from 'styled-components';

const View = styled.div`
  padding:0;
  margin:0;
  transition: all 0.5 ease;
  ${props => props.hidden && css`
    display: none;
  `};
  ${props => props.bold && css`
    font-weight: bold;
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
  ${props => props.border && css`
    border: ${`solid 1px ${(props.border && props.border !== true) || 'lightgray'}`};
  `};
  ${props => props.round && css`
    border-radius: ${(props.round && props.round !== true) || '1em'};
  `};
  ${props => props.underline && css`
    text-decoration: underline;
  `};

`;

module.exports = View;
