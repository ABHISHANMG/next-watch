import styled from 'styled-components'

export const MenuTab = styled.li`
  background-color: ${props => (props.isActive ? '#94a3b8' : '')};
  display: flex;
  font-size: 20px;
  font-weight: 700;
  text-decoration: none;
  margin-top: 5px;
  margin-bottom: 5px;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 10px;
`
export const SocialContainer = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
`
