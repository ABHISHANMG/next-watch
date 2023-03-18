import {Component} from 'react'

import Cookies from 'js-cookie'

import {Route, Switch, Redirect} from 'react-router-dom'

import MoreContext from './context/MoreContext'

import Login from './components/Login'

import Home from './components/Home'

import SpecificVideo from './components/SpecificVideo'

import Trending from './components/Trending'

import Gaming from './components/Gaming'

import Saved from './components/Saved'

import NotFound from './components/NotFound'

import ProtectedRoute from './components/ProjectedRoute'

import './App.css'

const dashButtons = [
  {initial: 'INITIAL'},
  {home: 'HOME'},
  {trend: 'TREND'},
  {game: 'GAME'},
  {saved: 'SAVED'},
]

class App extends Component {
  state = {
    isDarkMode: false,
    savedVideoList: [],
    dashButtonList: dashButtons,
    activeDash: dashButtons[0].initial,
  }

  darkModeChange = () => {
    const {isDarkMode} = this.state
    this.setState({isDarkMode: !isDarkMode})
  }

  addToSave = specificVideo => {
    console.log(specificVideo)
    const {savedVideoList} = this.state
    const updateSavedVideos = [...savedVideoList, specificVideo]
    this.setState({savedVideoList: updateSavedVideos})
  }

  dashClick = value => {
    this.setState({activeDash: value})
  }

  render() {
    const {isDarkMode, savedVideoList, dashButtonList, activeDash} = this.state
    console.log(savedVideoList)
    const backGroundColor = isDarkMode
      ? 'login-container-dark-mode'
      : 'login-container-light'
    return (
      <div className={backGroundColor}>
        <MoreContext.Provider
          value={{
            isDarkMode,
            darkModeChange: this.darkModeChange,
            addToSave: this.addToSave,
            savedVideoList,
            dashButtonList,
            dashBtn: this.dashClick,
            activeDash,
          }}
        >
          <Switch>
            <Route exact path="/login" component={Login} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute
              exact
              path="/videos/:id"
              component={SpecificVideo}
            />
            <ProtectedRoute exact path="/trending" component={Trending} />
            <ProtectedRoute exact path="/gaming" component={Gaming} />
            <ProtectedRoute exact path="/saved-videos" component={Saved} />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="/not-found" />
          </Switch>
        </MoreContext.Provider>
      </div>
    )
  }
}
export default App
