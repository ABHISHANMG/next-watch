import {Component} from 'react'

import {Redirect, Link} from 'react-router-dom'

import {
  AiFillHome,
  AiFillFire,
  AiFillSave,
  AiFillTwitterCircle,
  AiFillFacebook,
  AiFillLinkedin,
  AiOutlineSearch,
} from 'react-icons/ai'

import {SiYoutubegaming} from 'react-icons/si'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import './index.css'

import Header from '../Header'
import DashBoard from '../DashBoard'

import VideosDetails from '../VideosDetails'

import {
  SearchBar,
  FailureContainer,
  Heading,
  Paragraph,
  AddBannerContainer,
} from './styledComponent'

import MoreContext from '../../context/MoreContext'

const apiConstants = {
  initial: 'INITIAL',
  failure: 'FAILURE',
  loading: 'LOADING',
  success: 'SUCCESS',
}

class Home extends Component {
  state = {
    search: '',
    videosList: [],
    isLoading: false,
    apiStatus: apiConstants.initial,
    addBanner: true,
  }

  componentDidMount() {
    this.getVideos()
  }

  getVideos = async () => {
    const {search, isLoading} = this.state
    this.setState({isLoading: true, apiStatus: apiConstants.loading})
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/all?search=${search}`
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
        videosList: formattedData,
        isLoading: false,
        apiStatus: apiConstants.success,
      })
    } else {
      this.setState({isLoading: false, apiStatus: apiConstants.failure})
    }
  }

  onSearchInput = event => {
    this.setState({search: event.target.value})
  }

  onClickSearch = () => {
    this.getVideos()
  }

  onRetry = () => {
    this.getVideos()
  }

  removeAddBanner = () => {
    this.setState({addBanner: false})
  }

  renderVideos = isDarkMode => {
    const {videosList, addBanner} = this.state

    const darkModeLoginContainer = isDarkMode ? 'login-container-dark-mode' : ''

    const videoContainerDarkMode = isDarkMode
      ? 'videos-container-dark-mode'
      : ''

    const searchContainerDarkMode = isDarkMode
      ? 'search-container-dark-mode'
      : ''
    return (
      <div className={`videos-container ${videoContainerDarkMode}`}>
        {addBanner && (
          <AddBannerContainer
            className="add-banner-container"
            data-testid="banner"
          >
            <AddBannerContainer className="banner-top-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                className="logo-image-size"
                alt="nxt watch logo"
              />

              <button
                type="button"
                className="cross-btn"
                onClick={this.removeAddBanner}
                data-testid="close"
              >
                X
              </button>
            </AddBannerContainer>
            <Paragraph heading={isDarkMode}>
              Buy Nxt watch Premium prepaid plans with UPI
            </Paragraph>
            <div>
              <button className="get-it-now-btn" type="button">
                GET IT NOW
              </button>
            </div>
          </AddBannerContainer>
        )}
        <div className={`search-container ${searchContainerDarkMode}`}>
          <SearchBar
            searchBar={isDarkMode}
            className="search-bar"
            type="search"
            placeholder="Search"
            onChange={this.onSearchInput}
          />
          <button type="button" onClick={this.onClickSearch}>
            <AiOutlineSearch />
          </button>
        </div>
        {videosList.length === 0 ? (
          <div className="no-videos-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
              alt="no videos"
              className="failure-image-size"
            />
            <Heading heading={isDarkMode}>No search results found</Heading>
            <Paragraph heading={isDarkMode}>
              Try different key words or remove search filters
            </Paragraph>
            <button className="retry-btn" type="button" onClick={this.onRetry}>
              Retry
            </button>
          </div>
        ) : (
          <ul
            className="videos-unordered-container"
            data-testid="videoItemDetails"
          >
            {videosList.map(eachItem => (
              <VideosDetails
                key={eachItem.id}
                videos={eachItem}
                darkMode={isDarkMode}
              />
            ))}
          </ul>
        )}
      </div>
    )
  }

  renderFailure = isDarkMode => {
    const failureImage = isDarkMode
      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
    return (
      <FailureContainer>
        <img
          src={failureImage}
          alt="failure view"
          className="failure-image-size"
        />
        <Heading heading={isDarkMode}>Oops! Something Went Wrong</Heading>
        <Paragraph heading={isDarkMode}>
          We are having some trouble to complete your request. Please try again.
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

  renderSwitchStatements = isDarkMode => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.loading:
        return this.renderLoader(isDarkMode)
      case apiConstants.success:
        return this.renderVideos(isDarkMode)
      case apiConstants.failure:
        return this.renderFailure(isDarkMode)
      default:
        return null
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }

    return (
      <MoreContext.Consumer>
        {value => {
          const {isDarkMode} = value

          return (
            <>
              <Header />
              <div className="home-container">
                <DashBoard />
                {this.renderSwitchStatements(isDarkMode)}
              </div>
            </>
          )
        }}
      </MoreContext.Consumer>
    )
  }
}
export default Home
