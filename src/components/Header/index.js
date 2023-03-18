import {Link, withRouter, Redirect} from 'react-router-dom'

import Popup from 'reactjs-popup'

import {FaMoon} from 'react-icons/fa'

import {HiOutlineSun} from 'react-icons/hi'

import './index.css'
import Cookies from 'js-cookie'
import MoreContext from '../../context/MoreContext'

const Header = props => {
  const onClickLogOut = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <MoreContext.Consumer>
      {value => {
        const {isDarkMode, darkModeChange} = value

        const webSiteLogo = isDarkMode
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

        const headerDarkMode = isDarkMode ? 'header-dark-mode' : ''

        const popContainerDarkMode = isDarkMode ? 'pop-container-dark-mode' : ''

        const changeMode = () => {
          darkModeChange()
        }

        return (
          <div className={`header-container ${headerDarkMode}`}>
            <Link to="/">
              <img
                src={webSiteLogo}
                className="logo-image-size"
                alt="website logo"
              />
            </Link>
            <div className="desktop-header-container">
              <button
                className="mode-change-btn"
                type="button"
                data-testid="theme"
                onClick={changeMode}
              >
                {isDarkMode ? (
                  <HiOutlineSun className="mode-icon-size dark-mode-icon" />
                ) : (
                  <FaMoon className="mode-icon-size" />
                )}
              </button>

              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                className="profile-logo-image-size"
                alt="profile"
              />
              <div className="popup-container">
                <Popup
                  modal
                  trigger={
                    <button className="logout-btn" type="button">
                      Logout
                    </button>
                  }
                >
                  {close => (
                    <>
                      <div className={`pop-container ${popContainerDarkMode}`}>
                        <p>Are you sure, you want to logout</p>
                        <div className="pop-btn-container">
                          <button
                            type="button"
                            className="cancel-btn"
                            onClick={() => close()}
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            className="log-in-btn"
                            onClick={onClickLogOut}
                          >
                            Confirm
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </Popup>
              </div>
            </div>
          </div>
        )
      }}
    </MoreContext.Consumer>
  )
}
export default withRouter(Header)
