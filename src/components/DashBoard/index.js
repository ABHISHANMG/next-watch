import {
  AiFillHome,
  AiFillFire,
  AiFillSave,
  AiFillTwitterCircle,
  AiFillFacebook,
  AiFillLinkedin,
  AiOutlineSearch,
} from 'react-icons/ai'

import {BiListPlus} from 'react-icons/bi'

import {SiYoutubegaming} from 'react-icons/si'

import {Redirect, Link} from 'react-router-dom'

import {MenuTab, SocialContainer} from './styledComponent'

import MoreContext from '../../context/MoreContext'

import './index.css'

const dashButtons = {
  initial: 'INITIAL',
  home: 'HOME',
  trend: 'TREND',
  game: 'GAME',
  save: 'SAVED',
}

const DashBoard = () => (
  <MoreContext.Consumer>
    {value => {
      const {isDarkMode, dashButtonList, dashBtn, activeDash} = value
      const rightDarkBoard = isDarkMode ? 'dash-border-dark-mode' : ''

      const darkModeContents = isDarkMode ? 'dark-mode-contents' : ''

      const iconActive = '#ff0b37'

      return (
        <div className={`right-dash-container ${rightDarkBoard}`}>
          <ul className="dash-board-container">
            <Link to="/" className="dash-tab">
              <MenuTab
                className={`dash-tab ${darkModeContents}`}
                onClick={() => dashBtn(dashButtons.home)}
                isActive={activeDash === dashButtons.home}
                theme={isDarkMode}
                color={isDarkMode ? '#f9f9f9' : '#0f0f0f'}
                key="HOME"
                data-testid="home"
              >
                <AiFillHome
                  className="social-media-icon"
                  color={activeDash === dashButtons.home ? iconActive : ''}
                />
                Home
              </MenuTab>
            </Link>
            <Link to="/trending" className="dash-tab">
              <MenuTab
                className={`dash-tab ${darkModeContents}`}
                onClick={() => dashBtn(dashButtons.trend)}
                isActive={activeDash === dashButtons.trend}
                theme={isDarkMode}
                key="TREND"
                data-testid="trending"
              >
                <AiFillFire
                  className="social-media-icon"
                  color={activeDash === dashButtons.trend ? iconActive : ''}
                />
                Trending
              </MenuTab>
            </Link>
            <Link to="/gaming" className="dash-tab">
              <MenuTab
                className={`dash-tab ${darkModeContents}`}
                onClick={() => dashBtn(dashButtons.game)}
                isActive={activeDash === dashButtons.game}
                theme={isDarkMode}
                key="GAME"
              >
                <SiYoutubegaming
                  className="social-media-icon"
                  color={activeDash === dashButtons.game ? iconActive : ''}
                />
                Gaming
              </MenuTab>
            </Link>
            <Link to="/saved-videos" className="dash-tab">
              <MenuTab
                className={`dash-tab ${darkModeContents}`}
                onClick={() => dashBtn(dashButtons.save)}
                isActive={activeDash === dashButtons.save}
                theme={isDarkMode}
                key="SAVE"
              >
                <BiListPlus
                  className="social-media-icon"
                  color={activeDash === dashButtons.save ? iconActive : ''}
                />
                Saved
              </MenuTab>
            </Link>
          </ul>
          <SocialContainer
            className={`contact-us-container ${darkModeContents}`}
          >
            <p className={`contact-us-head ${darkModeContents}`}>CONTACT US</p>
            <div className="social-media-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                alt="facebook logo"
                className="social-media-icon"
              />
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                alt="twitter logo"
                className="social-media-icon"
              />
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                alt="linked in logo"
                className="social-media-icon"
              />
            </div>
            <p className={`contact-us-para ${darkModeContents}`}>
              Enjoy! Now to see your channels and recommendations!
            </p>
          </SocialContainer>
        </div>
      )
    }}
  </MoreContext.Consumer>
)

export default DashBoard
