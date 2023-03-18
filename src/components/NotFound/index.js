import MoreContext from '../../context/MoreContext'

import {
  NotFoundContainer,
  ParaNotFound,
  HeadingNotFound,
} from './styledComponent'

import Header from '../Header'

import DashBoard from '../DashBoard'

import './index.css'

const NotFound = () => (
  <>
    <Header />
    <MoreContext.Consumer>
      {value => {
        const {isDarkMode} = value

        const videoContainerDarkMode = isDarkMode
          ? 'videos-container-dark-mode'
          : ''

        const notFoundDarkMode = isDarkMode
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'
        return (
          <>
            <div className="home-container">
              <DashBoard />
              <div className={`videos-container ${videoContainerDarkMode}`}>
                <NotFoundContainer notFoundBg={isDarkMode}>
                  <div className="not-found-image-container">
                    <img
                      src={notFoundDarkMode}
                      alt="not found"
                      className="not-found-image"
                    />
                  </div>
                  <HeadingNotFound h1NotFound={isDarkMode}>
                    Page Not Found
                  </HeadingNotFound>
                  <ParaNotFound pNotFound={isDarkMode}>
                    We are sorry, the page you requested could not be found.
                  </ParaNotFound>
                </NotFoundContainer>
              </div>
            </div>
          </>
        )
      }}
    </MoreContext.Consumer>
  </>
)

export default NotFound
