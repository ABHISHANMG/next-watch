import {Link} from 'react-router-dom'

import MoreContext from '../../context/MoreContext'

import {TitleTrend, ParaTrend} from './styledComponent'

import './index.css'

const GamingVideos = props => {
  const {gamingVideos} = props
  const {id, thumbnailUrl, title, viewsCount} = gamingVideos
  return (
    <MoreContext.Consumer>
      {value => {
        const {isDarkMode} = value
        return (
          <li>
            <Link to={`/videos/${id}`} className="Link gaming-list-container">
              <img
                src={thumbnailUrl}
                alt="video thumbnail"
                className="gaming-image-size"
              />
              <div>
                <TitleTrend title={isDarkMode}>{title}</TitleTrend>
                <ParaTrend name={isDarkMode}>
                  {viewsCount} Watching Worldwide
                </ParaTrend>
              </div>
            </Link>
          </li>
        )
      }}
    </MoreContext.Consumer>
  )
}

export default GamingVideos
