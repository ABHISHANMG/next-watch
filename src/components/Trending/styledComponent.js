import styled from 'styled-components'

export const loginContainer = styled.div`
  background-color: ${props => (props.loginBg ? '#0f0f0f' : '#f9f9f9')};
  background-size: cover;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`

export const ChannelTextContent = styled.p`
  color: ${props => (props.contentText ? '#f9f9f9' : '#1e293b')}
  font-size: 15px;
  font-family: "Roboto";
  font-weight: 500;
  margin-left: 10px;
`

export const TrendingHeader = styled.div`
  background-color: ${props => (props.bgHeaderTrend ? '#212121' : '#f1f5f9')};
  padding: 15px;
  display: flex;
  align-items: center;
`

export const HeadingTrendText = styled.h1`
  color: ${props => (props.trendHeadText ? '#f9f9f9' : '#212121')};
  font-size: 30px;
  font-weight: Bold;
  font-family: 'Roboto';
  margin-left: 15px;
`
export const TrendIconContainer = styled.div`
  background-color: ${props => (props.trendIcon ? '#000000' : '#e2e8f0')};
  height: 60px;
  width: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
`
export const FailureContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 30px;
`

export const Heading = styled.h1`
  color: ${props => (props.heading ? '#f9f9f9' : '#0f0f0f')};
  font-size: 25px;
  font-weight: bold;
  font-family: 'Roboto';
`

export const Paragraph = styled.p`
  color: ${props => (props.heading ? '#475569' : '#475569')};
  font-size: 15px;
  font-family: 'Roboto';
`
