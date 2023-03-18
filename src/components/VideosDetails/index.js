import {formatDistanceToNow} from 'date-fns'

import {Link} from 'react-router-dom'

import './index.css'

const VideosDetails = props => {
  const {darkMode, videos} = props
  const {
    id,
    name,
    profileUrlName,
    thumbnailUrl,
    publishedAt,
    title,
    viewCount,
  } = videos
  const formattedDate = formatDistanceToNow(new Date(publishedAt))

  const darkModeContents = darkMode ? 'dark-mode-contents' : ''
  console.log(darkMode)

  return (
    <li className="list-video-details-container">
      <Link to={`/videos/${id}`} className="Link">
        <img
          src={thumbnailUrl}
          className="thumbnail-image-size"
          alt="video thumbnail"
        />
        <div className="video-description-container">
          <img
            src={profileUrlName}
            alt="channel logo"
            className="profile-image-size"
          />
          <div>
            <p className={`channel-title-heading ${darkModeContents}`}>
              {title}
            </p>
            <p className={`channel-title-heading ${darkModeContents}`}>
              {name}
            </p>
            <div className="views-and-date-container">
              <p className="view-and-date-text">{viewCount} views</p>
              <p className="view-and-date-text">{formattedDate}</p>
            </div>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default VideosDetails
