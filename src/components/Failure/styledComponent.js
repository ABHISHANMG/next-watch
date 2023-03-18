import styled from 'styled-components'

export const FailureContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`

export const Heading = styled.h1`
  color: ${props => (props.heading ? '#0f0f0f' : '#f9f9f9')};
  font-size: 30px;
  font-weight: bold;
  font-family: 'Roboto';
`

export const Paragraph = styled.p`
  color: ${props => (props.heading ? '#475569' : '#475569')};
  font-size: 20px;
  font-weight: bold;
  font-family: 'Roboto';
`
