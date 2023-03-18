import {Component} from 'react'

import {
  AiFillHome,
  AiFillFire,
  AiFillSave,
  AiFillTwitterCircle,
  AiFillFacebook,
  AiFillLinkedin,
  AiOutlineSearch,
} from 'react-icons/ai'

import {
  TrendingHeader,
  HeadingTrendText,
  TrendIconContainer,
  HeadingNotFound,
  ParaNotFound,
} from './styledComponents'

import MoreContext from '../../context/MoreContext'

import Header from '../Header'

import DashBoard from '../DashBoard'

import SavedVideos from '../savedVideos'

import './index.css'

class Saved extends Component {
  render() {
    return (
      <>
        <Header />
        <MoreContext.Consumer>
          {value => {
            const {savedVideoList, isDarkMode} = value

            const videoContainerDarkMode = isDarkMode
              ? 'videos-container-dark-mode'
              : ''
            return (
              <div className="home-container">
                <DashBoard />
                <div className={`videos-container ${videoContainerDarkMode}`}>
                  <TrendingHeader
                    className="trending-header"
                    bgHeaderTrend={isDarkMode}
                  >
                    <TrendIconContainer trendIcon={isDarkMode}>
                      <AiFillSave className="dash-icon-color" />
                    </TrendIconContainer>
                    <HeadingTrendText trendHeadText={isDarkMode}>
                      Saved Videos
                    </HeadingTrendText>
                  </TrendingHeader>

                  {savedVideoList.length === 0 ? (
                    <div className="no-saved-videos-container">
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                        alt="No Saved Videos view image URL"
                        className="not-found-image"
                      />
                      <HeadingNotFound h1NotFound={isDarkMode}>
                        No saved videos found
                      </HeadingNotFound>
                      <ParaNotFound pNotFound={isDarkMode}>
                        Save your videos by clicking a button
                      </ParaNotFound>
                    </div>
                  ) : (
                    <ul className="trend-videos-unordered-container">
                      {savedVideoList.map(eachItem => (
                        <SavedVideos key={eachItem.id} savedVideos={eachItem} />
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )
          }}
        </MoreContext.Consumer>
      </>
    )
  }
}

export default Saved
