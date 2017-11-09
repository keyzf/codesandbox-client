import styled from 'styled-components';

const Input = styled.input`
  transition: 0.3s ease border-color;
  background-color: rgba(0, 0, 0, 0.3);
  border: none;
  outline: none;
  border-radius: 4px;
  color: white;
  padding: 0.25em;
  width: ${({ block }) => (block ? '100%' : 'inherit')};
  box-sizing: border-box;

  border: 1px solid
    ${props =>
      props.error ? props.theme.red.clearer(0.5) : 'rgba(0, 0, 0, 0.1)'};

  &:focus {
    border-color: ${props => props.theme.secondary.clearer(0.6)};
  }
`;

export default Input;

export const TextArea = Input.withComponent('textarea');
