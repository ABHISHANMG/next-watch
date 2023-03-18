import styled from 'styled-components'

export const TitleTrend = styled.p`
  color: ${props => (props.title ? '#f9f9f9' : '#1e293b')};
  font-size: 20px;
  font-weight: Bold;
  font-family: 'Roboto';
`
export const ParaTrend = styled.p`
  color: ${props => (props.name ? '#94a3b8' : '#1e293b')};
  font-size: 15px;
  font-family: 'Roboto';
  margin-right: 10px;
`
