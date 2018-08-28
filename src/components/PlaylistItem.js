import React from 'react'
import { rhythm, scale } from '../utils/typography'
import Link from 'gatsby-link'
import style from './playlistItem.module.css'
import { Play, Loader } from 'react-feather'
import { formatDuration } from '../utils/duration'

class PlaylistItem extends React.Component {
  render() {
    let status = null
    let className = 'd-flex flex-column ' + style.container
    if (this.props.isPlaying) {
      status = <div className={style.status}>Now Playing</div>
      className = className + ' ' + style.playing
    }
    if (this.props.isUpNext) {
      status = <div className={style.status}>Up Next</div>
    }
    return (
      <div className={className}>
        {status}
        <Link
          className={'d-flex flex-row ' + style.wrapper}
          to={this.props.slug}
        >
          <div className={style.colPlay}>
            {this.props.isPlaying ? <Loader size={12} /> : <Play size={12} />}
          </div>
          <div className={style.colTitle + ' flex-column'}>
            <div className={style.title}>{this.props.title}</div>
            <div className={style.duration}>
              {formatDuration(this.props.duration)}
            </div>
          </div>
        </Link>
      </div>
    )
  }
}

export default PlaylistItem
