import React from 'react'
import { rhythm } from '../utils/typography'
import PlaylistItem from './PlaylistItem'
import Switch from 'react-switch'

import style from './playlist.module.css'

class Playlist extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      autoplay: this.props.autoplay,
    }
  }

  toggleAutoplay = () => {
    if (this.props.onAutoplay) {
      this.props.onAutoplay(!this.state.autoplay)
    }
    this.setState({ autoplay: !this.state.autoplay })
  }

  render() {
    return (
      <div className={style.container}>
        <div className={style.autoplay}>
          Autoplay:{' '}
          <Switch
            onChange={this.toggleAutoplay}
            checked={this.state.autoplay}
            className={style.autoplayIcon}
            size={10}
            id="autoplay-switch"
            uncheckedIcon={false}
            checkedIcon={false}
            handleDiameter={20}
            height={14}
            width={30}
          />
        </div>
        <div className={style.list}>
          {this.props.items.map(item => {
            return (
              <PlaylistItem
                key={item.slug}
                title={item.title}
                slug={item.slug}
                isPlaying={item.isPlaying}
                duration={item.duration}
                isUpNext={item.isUpNext}
              />
            )
          })}
        </div>
      </div>
    )
  }
}

export default Playlist
