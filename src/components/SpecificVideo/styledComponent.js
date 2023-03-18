import styled from 'styled-components'

export const LikeButton = styled.button`
  background-color: transparent;
  border-width: 0px;
  display: flex;
  align-items: center;
  color: ${props => (props.theme === 'Active' ? '#2563eb' : '#64748b')};
  cursor: pointer;
`

export const LIke = styled.button``
