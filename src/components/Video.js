import React from 'react'
import { rhythm } from '../utils/typography'
import Link from 'gatsby-link'
import { Clock, Play, Lock } from 'react-feather'
import { formatDuration } from '../utils/duration'

import styles from './video.module.css'

class Video extends React.Component {
  render() {
    let containerClassName = [
      styles.container,
      'd-flex flex-row align-items-center',
    ]
    if (this.props.underConstruction) {
      containerClassName.push(styles.disabled)
    }
    return (
      <div
        style={{
          padding: rhythm(0.5),
          marginBottom: rhythm(0.5),
        }}
        disabled={this.props.underConstruction}
        className={containerClassName.join(' ')}
      >
        <div
          className="col align-self-center"
          style={{ width: '100px', flexGrow: 0 }}
        >
          {this.props.underConstruction ? (
            <Lock className={styles.play} size={rhythm(0.75)} />
          ) : (
            <Play className={styles.play} size={rhythm(0.75)} />
          )}
        </div>
        <div className="col align-self-center">
          <h4
            style={{
              marginTop: 0,
              marginBottom: 0,
              fontSize: rhythm(3 / 4),
              fontWeight: 'normal',
              textTransform: 'initial',
              letterSpacing: 0,
            }}
            className={styles.title}
          >
            {this.props.underConstruction ? (
              this.props.title
            ) : (
              <Link to={this.props.slug}>{this.props.title}</Link>
            )}
          </h4>
        </div>
        <div className="mr-auto">
          {this.props.underConstruction ? (
            <small />
          ) : (
            <small>
              <Clock style={{ verticalAlign: 'middle' }} />{' '}
              {formatDuration(this.props.duration)}
            </small>
          )}
        </div>
      </div>
    )
  }
}

export default Video
