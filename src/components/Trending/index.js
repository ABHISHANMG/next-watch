import {Component} from 'react'

import Cookies from 'js-cookie'

import {
  AiFillHome,
  AiFillFire,
  AiFillSave,
  AiFillTwitterCircle,
  AiFillFacebook,
  AiFillLinkedin,
  AiOutlineSearch,
} from 'react-icons/ai'

import Loader from 'react-loader-spinner'

import {
  TrendingHeader,
  HeadingTrendText,
  TrendIconContainer,
  FailureContainer,
  Heading,
  Paragraph,
} from './styledComponent'

import MoreContext from '../../context/MoreContext'

import Header from '../Header'

import DashBoard from '../DashBoard'

import TrendingVideos from '../TrendingVideos'

import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  failure: 'FAILURE',
  loading: 'LOADING',
  success: 'SUCCESS',
}

class Trending extends Component {
  state = {
    trendingVideoList: [],
    apiStatus: apiConstants.initial,
    isLoading: false,
  }

  componentDidMount() {
    this.getTrending()
  }

  getTrending = async () => {
    this.setState({isLoading: true, apiStatus: apiConstants.loading})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/trending'
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
        publishedAt: eachItem.published_at,
        thumbnailUrl: eachItem.thumbnail_url,
        title: eachItem.title,
        viewCount: eachItem.view_count,
        name: eachItem.channel.name,
        profileImageUrl: eachItem.channel.profile_image_url,
      }))
      this.setState({
        trendingVideoList: formattedData,
        isLoading: false,
        apiStatus: apiConstants.success,
      })
    } else {
      this.setState({isLoading: false, apiStatus: apiConstants.failure})
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

  renderTrendingVideos = isDarkMode => {
    const {trendingVideoList} = this.state
    const videoContainerDarkMode = isDarkMode
      ? 'videos-container-dark-mode'
      : ''
    const darkModeContents = isDarkMode ? 'dark-mode-contents' : ''

    const darkModeIcons = isDarkMode ? 'dark-mode-icons' : ''

    return (
      <div className={`videos-container ${videoContainerDarkMode}`}>
        <TrendingHeader className="trending-header" bgHeaderTrend={isDarkMode}>
          <TrendIconContainer trendIcon={isDarkMode}>
            <AiFillFire className="dash-icon-color" />
          </TrendIconContainer>
          <HeadingTrendText trendHeadText={isDarkMode}>
            Trending
          </HeadingTrendText>
        </TrendingHeader>
        <ul className="trend-videos-unordered-container">
          {trendingVideoList.map(eachItem => (
            <TrendingVideos key={eachItem.id} trendingVideos={eachItem} />
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
        return this.renderTrendingVideos(isDarkMode)
      case apiConstants.failure:
        return this.renderFailure(isDarkMode)
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <MoreContext.Consumer>
          {value => {
            const {isDarkMode} = value

            return (
              <>
                <div className="home-container">
                  <DashBoard />
                  {this.renderSwitchStatements(isDarkMode)}
                </div>
              </>
            )
          }}
        </MoreContext.Consumer>
      </>
    )
  }
}

export default Trending
