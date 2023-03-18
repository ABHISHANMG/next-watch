import styled from 'styled-components'

export const NotFoundContainer = styled.div`
  background-color: ${props => (props.notFoundBg ? '#0f0f0f' : '#f9f9f9')}
  display: flex;
  justify-content: center;
  align-items: center;
  padding:20px;
`
export const HeadingNotFound = styled.h1`
  font-size: 25px;
  font-weight: bold;
  font-family: 'Roboto';
  text-align: center;
  color: ${props => (props.h1NotFound ? '#f9f9f9' : '#0f0f0f')};
`

export const ParaNotFound = styled.p`
  font-size: 18px;
  font-weight: normal;
  font-family: 'Roboto';
  text-align: center;

  color: ${props => (props.pNotFound ? '#475569' : '#1e293b')};
`
