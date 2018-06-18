import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import View from '../View';

import { numberOrStringText } from '../../../prop-types';

const Input = styled.input.attrs({
  type: 'text',
})`
`;
const Hint = styled.label`
  position: absolute;
  left: 0;
  top: 0;
`;

const TextInput = props => (
  <View style={{ position: 'relative' }}>
    {props.hint && !props.value && (
      <Hint>{props.hint}</Hint>
    )}
    {/* // TODO: might need internal state ? */}
    <Input
      {...props}
      onChange={e => props.onChange && props.onChange(e)}
    />
  </View>
);

TextInput.propTypes = {
  hint: PropTypes.string,
  value: numberOrStringText,
  onChange: PropTypes.func,
};


module.exports = TextInput;
