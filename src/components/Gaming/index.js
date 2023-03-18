import {Component} from 'react'

import Cookies from 'js-cookie'

import {SiYoutubegaming} from 'react-icons/si'

import Loader from 'react-loader-spinner'

import {
  TrendingHeader,
  HeadingTrendText,
  TrendIconContainer,
  UnorderedGamingContainer,
  FailureContainer,
  Heading,
  Paragraph,
} from './styledComponent'

import MoreContext from '../../context/MoreContext'

import Header from '../Header'

import DashBoard from '../DashBoard'

import GamingVideos from '../GamingVideos'

import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  failure: 'FAILURE',
  loading: 'LOADING',
  success: 'SUCCESS',
}

class Gaming extends Component {
  state = {
    gamingVideosList: [],
    apiStatus: apiConstants.initial,
    isLoading: false,
  }

  componentDidMount() {
    this.getGamingVideos()
  }

  getGamingVideos = async () => {
    this.setState({isLoading: true, apiStatus: apiConstants.loading})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/gaming'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const formattedData = data.videos.map(eachItem => ({
        id: eachItem.id,
        thumbnailUrl: eachItem.thumbnail_url,
        title: eachItem.title,
        viewCount: eachItem.view_count,
      }))

      this.setState({
        gamingVideosList: formattedData,
        apiStatus: apiConstants.success,
        isLoading: false,
      })
    } else {
      this.setState({apiStatus: apiConstants.success, isLoading: false})
    }
  }

  renderFailure = isDarkMode => {
    const failureImage = isDarkMode
      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
    return (
      <FailureContainer>
        <img src={failureImage} alt="failure" className="failure-image-size" />
        <Heading heading={isDarkMode}>Oops Something Went Wrong</Heading>
        <Paragraph heading={isDarkMode}>
          We are having some trouble to complete your request.Please try again
          later
        </Paragraph>
        <button className="retry-btn" type="button" onClick={this.onRetry}>
          Retry
        </button>
      </FailureContainer>
    )
  }

  renderLoader = isDarkMode => (
    <div className="loader-container" data-testid="loader">
      <Loader
        type="ThreeDots"
        color={isDarkMode ? '#ffffff' : '#000000'}
        height="50"
        width="50"
      />
    </div>
  )

  renderGamingVideos = isDarkMode => {
    const {gamingVideosList} = this.state
    const videoContainerDarkMode = isDarkMode
      ? 'videos-container-dark-mode'
      : ''
    return (
      <div className={`videos-container ${videoContainerDarkMode}`}>
        <TrendingHeader className="trending-header" bgHeaderTrend={isDarkMode}>
          <TrendIconContainer trendIcon={isDarkMode}>
            <SiYoutubegaming className="dash-icon-color" />
          </TrendIconContainer>
          <HeadingTrendText trendHeadText={isDarkMode}>Gaming</HeadingTrendText>
        </TrendingHeader>
        <ul className="gaming-videos-unordered-container">
          {gamingVideosList.map(eachItem => (
            <GamingVideos key={eachItem.id} gamingVideos={eachItem} />
          ))}
        </ul>
      </div>
    )
  }

  renderSwitchStatements = isDarkMode => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.loading:
        return this.renderLoader(isDarkMode)
      case apiConstants.success:
        return this.renderGamingVideos(isDarkMode)
      case apiConstants.failure:
        return this.renderFailure(isDarkMode)
      default:
        return null
    }
  }

  render() {
    const {gamingVideosList} = this.state
    console.log(gamingVideosList)
    return (
      <>
        <Header />
        <MoreContext.Consumer>
          {value => {
            const {isDarkMode} = value
            const videoContainerDarkMode = isDarkMode
              ? 'videos-container-dark-mode'
              : ''
            return (
              <div className="home-container">
                <DashBoard />
                {this.renderSwitchStatements(isDarkMode)}
              </div>
            )
          }}
        </MoreContext.Consumer>
      </>
    )
  }
}

export default Gaming
