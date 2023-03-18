import {formatDistanceToNow} from 'date-fns'

import {Component} from 'react'

import './index.css'

import Cookies from 'js-cookie'

import ReactPlayer from 'react-player'

import {BiLike, BiDislike, BiListPlus} from 'react-icons/bi'

import {LikeButton} from './styledComponent'

import MoreContext from '../../context/MoreContext'

import Header from '../Header'
import DashBoard from '../DashBoard'

class SpecificVideo extends Component {
  state = {specificVideo: {}, like: false, dislike: false, save: false}

  componentDidMount() {
    this.getSpecificVideo()
  }

  getSpecificVideo = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    const formattedSpecificVideos = {
      name: data.video_details.channel.name,
      profileUrlName: data.video_details.channel.profile_image_url,
      subscriberCount: data.video_details.channel.subscriber_count,
      description: data.video_details.description,
      id: data.video_details.id,
      publishedAt: data.video_details.published_at,
      thumbnailUrl: data.video_details.thumbnail_url,
      title: data.video_details.title,
      videoUrl: data.video_details.video_url,
      viewCount: data.video_details.view_count,
    }
    console.log(formattedSpecificVideos)
    this.setState({specificVideo: formattedSpecificVideos})
  }

  onLiked = () => {
    const {like} = this.state
    this.setState({like: !like})
  }

  onDisliked = () => {
    const {dislike} = this.state
    this.setState({dislike: !dislike})
  }

  onSaved = () => {
    const {save} = this.state
    this.setState({save: !save})
  }

  render() {
    const {specificVideo, like, dislike, save} = this.state

    return (
      <>
        <Header />
        <MoreContext.Consumer>
          {value => {
            const {isDarkMode, addToSave} = value
            const videoContainerDarkMode = isDarkMode
              ? 'videos-container-dark-mode'
              : ''
            const darkModeContents = isDarkMode ? 'dark-mode-contents' : ''

            const darkModeIcons = isDarkMode ? 'dark-mode-icons' : ''

            const addToSavedVideos = () => {
              addToSave({...specificVideo})
            }

            const liked = like ? 'Active' : 'Not-active'

            const disliked = dislike ? 'Active' : 'Not-active'

            const saved = save ? 'Active' : 'Not-active'

            return (
              <div className="home-container">
                <DashBoard />
                <div className={`videos-container ${videoContainerDarkMode}`}>
                  <ReactPlayer
                    className="react-video-container"
                    url={specificVideo.videoUrl}
                    width="100%"
                    height="80%"
                  />
                  <p className={`channel-title-heading ${darkModeContents}`}>
                    {specificVideo.title}
                  </p>
                  <div className="share-like-container">
                    <div className="sub-views-and-date-container">
                      <p className={`view-and-date-text ${darkModeContents}`}>
                        {specificVideo.viewCount} views
                      </p>
                      <p className={`view-and-date-text ${darkModeContents}`}>
                        {specificVideo.publishedAt}
                      </p>
                    </div>
                    <div className="sub-share-like-container">
                      <LikeButton
                        type="button"
                        onClick={this.onLiked}
                        theme={liked}
                      >
                        <BiLike size={25} />
                        <p>Like</p>
                      </LikeButton>
                      <LikeButton
                        type="button"
                        onClick={this.onDisliked}
                        theme={disliked}
                      >
                        <BiDislike size={25} />
                        <p>Dislike</p>
                      </LikeButton>
                      <LikeButton
                        type="button"
                        theme={saved}
                        onClick={addToSavedVideos}
                      >
                        <BiListPlus size={25} />
                        <p>Save</p>
                      </LikeButton>
                    </div>
                  </div>
                  <hr />
                  <div className="comment-container">
                    <img
                      src={specificVideo.profileUrlName}
                      alt={specificVideo.name}
                      className="profile-image-size"
                    />
                    <div className="sub-comment-container">
                      <p
                        className={`channel-title-heading ${darkModeContents}`}
                      >
                        {specificVideo.name}
                      </p>
                      <p className={`view-and-date-text ${darkModeContents}`}>
                        {specificVideo.subscriberCount} subscribers
                      </p>
                      <p
                        className={`channel-title-heading ${darkModeContents}`}
                      >
                        {specificVideo.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )
          }}
        </MoreContext.Consumer>
      </>
    )
  }
}

export default SpecificVideo
