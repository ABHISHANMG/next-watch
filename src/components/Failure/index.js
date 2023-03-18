import MoreContext from '../../context/MoreContext'

import {FailureContainer, Heading, Paragraph} from './styledComponent'

import './index.css'

const Failure = () => (
  <MoreContext.Consumer>
    {value => {
      const {isDarkMore} = value
      const failureImage = isDarkMore
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
      return (
        <FailureContainer>
          <img
            src={failureImage}
            alt="failure"
            className="failure-image-size"
          />
          <Heading heading={isDarkMore}>Oops Something Went Wrong</Heading>
          <Paragraph heading={isDarkMore}>
            We are having some trouble to complete your request.Plase try again
            later
          </Paragraph>
          <button className="retry-btn" type="button">
            Retry
          </button>
        </FailureContainer>
      )
    }}
  </MoreContext.Consumer>
)

export default Failure
