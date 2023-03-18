import {Link} from 'react-router-dom'

import {formatDistanceToNow} from 'date-fns'

import MoreContext from '../../context/MoreContext'

import {TitleTrend, ParaTrend} from './styledComponent'

import './index.css'

const SavedVideos = props => {
  const {savedVideos} = props
  const {thumbnailUrl, id, title, publishedAt, name, viewCount} = savedVideos
  const publishedDate = formatDistanceToNow(new Date(publishedAt))
  return (
    <MoreContext.Consumer>
      {value => {
        const {isDarkMode} = value
        return (
          <li className="trend-list-container">
            <Link to={`/videos/${id}`} className="Link trend-list-container">
              <img src={thumbnailUrl} alt={name} className="saved-image-size" />
              <div>
                <TitleTrend title={isDarkMode}>{title}</TitleTrend>
                <ParaTrend name={isDarkMode}>{name}</ParaTrend>
                <div className="trend-dates-container">
                  <ParaTrend name={isDarkMode}>{viewCount} views</ParaTrend>
                  <ParaTrend name={isDarkMode}>{publishedDate}</ParaTrend>
                </div>
              </div>
            </Link>
          </li>
        )
      }}
    </MoreContext.Consumer>
  )
}
export default SavedVideos
