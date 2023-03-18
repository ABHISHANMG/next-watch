import styled from 'styled-components'

export const SearchBar = styled.input`
  outline-width: 0px;
  border: 1px solid #475569;
  background-color: transparent;
  padding: 10px;
  caret-color: ${props => (props.searchBar ? '#ffffff' : '#000000')};
  color: ${props => (props.searchBar ? '#ffffff' : '#000000')};
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

export const AddBannerContainer = styled.div`
  background-image: url('https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png');
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 200px;
  padding: 10px;
  margin-bottom: 10px;
`
