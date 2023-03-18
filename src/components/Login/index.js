import {Component} from 'react'

import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import MoreContext from '../../context/MoreContext'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showPassword: false,
    isError: false,
    errorMsg: '',
    isDarkMode: false,
  }

  onShowPassword = () => {
    const {showPassword} = this.state
    this.setState({showPassword: !showPassword})
  }

  onUsername = event => {
    this.setState({username: event.target.value})
  }

  onPassword = event => {
    this.setState({password: event.target.value})
  }

  onSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    this.setState({isError: false, errorMsg: ''})
    history.replace('/')
  }

  onFailure = errorMsg => {
    this.setState({isError: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    console.log('submit')
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(response.ok)
    if (response.ok) {
      this.onSuccess(data.jwt_token)
    } else {
      this.onFailure(data.error_msg)
      console.log(data.error_msg)
    }
    this.setState({username: '', password: ''})
  }

  render() {
    const {showPassword, errorMsg, username, password, isError} = this.state
    const inputType = showPassword ? 'text' : 'password'

    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <MoreContext.Consumer>
        {value => {
          const {isDarkMode} = value

          const darkModeLoginContainer = isDarkMode
            ? 'login-container-dark-mode'
            : ''

          const darkModeLoginForm = isDarkMode
            ? 'login-form-container-dark-mode'
            : ''

          const webSiteLogo = isDarkMode
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

          const labelDarkMode = isDarkMode ? 'label-dark-mode' : ''
          const inputDarkMode = isDarkMode ? 'input-dark-mode' : ''

          return (
            <div className={`login-container ${darkModeLoginContainer}`}>
              <div className={`login-form-container ${darkModeLoginForm}`}>
                <div className="logo-image-container">
                  <img
                    src={webSiteLogo}
                    className="logo-image-size"
                    alt="website logo"
                  />
                </div>
                <form onSubmit={this.onSubmitForm}>
                  <label htmlFor="username" className={labelDarkMode}>
                    USERNAME
                  </label>
                  <br />
                  <input
                    id="username"
                    type="text"
                    placeholder="Username"
                    onChange={this.onUsername}
                    value={username}
                    className={inputDarkMode}
                  />
                  <br />
                  <label htmlFor="password" className={labelDarkMode}>
                    PASSWORD
                  </label>
                  <br />
                  <input
                    id="password"
                    type={inputType}
                    placeholder="Password"
                    onChange={this.onPassword}
                    value={password}
                    className={inputDarkMode}
                  />
                  <input
                    type="checkbox"
                    id="show"
                    onClick={this.onShowPassword}
                    className={inputDarkMode}
                  />
                  <label htmlFor="show" className={labelDarkMode}>
                    Show Password
                  </label>
                  <button className="log-in-btn" type="submit">
                    Login
                  </button>
                  {isError && <p className="error-msg">*{errorMsg}</p>}
                </form>
              </div>
            </div>
          )
        }}
      </MoreContext.Consumer>
    )
  }
}

export default Login
