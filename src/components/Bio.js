import React from 'react'
import { rhythm } from '../utils/typography'
import Link from 'gatsby-link'
import config from '../config'

require('./bio.scss')

const degreesToMouse = (mouseEvent, image) => {
  const rect = image.getBoundingClientRect()
  const left = rect.left + window.scrollX
  const top = rect.top + window.scrollY
  const x = mouseEvent.pageX - left - image.offsetWidth / 2
  const y = mouseEvent.pageY - top - image.offsetHeight / 2
  const rads = Math.atan2(y, x) + Math.PI
  const degree = rads / (Math.PI / 180)
  return degree
}

const lookingDirection = degrees => {
  if (degrees > 340 || degrees < 20) {
    return -1 // Left
  }
  if (degrees > 20 && degrees < 70) {
    return -8 // Up and Left
  }
  if (degrees > 70 && degrees < 110) {
    return -7 // Up
  }
  if (degrees > 110 && degrees < 160) {
    return -6 // Up and Right
  }
  if (degrees > 160 && degrees < 200) {
    return -5 // Right
  }
  if (degrees > 200 && degrees < 250) {
    return -4 // Down and Right
  }
  if (degrees > 250 && degrees < 290) {
    return -3 // Down
  }
  if (degrees > 290 && degrees < 340) {
    return -2 // Down and Left
  }
}

class Bio extends React.Component {
  constructor(props) {
    super(props)
    this.profileRef = React.createRef()
    this.state = {
      direction: null,
      hover: false,
    }
    // Hack, get us past the build stage.
    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', this.mouseMove)
    }
  }

  mouseMove = event => {
    if (this.profileRef.current) {
      const degrees = degreesToMouse(event, this.profileRef.current)
      const direction = lookingDirection(degrees)
      if (direction !== this.state.direction) {
        this.setState({
          direction,
        })
      }
    }
  }

  onHoverImage = () => {
    this.setState({
      hover: true,
    })
  }

  onBlurImage = () => {
    this.setState({
      hover: false,
    })
  }

  render() {
    let backgroundPosition
    if (this.state.direction && this.profileRef.current) {
      if (this.state.hover) {
        backgroundPosition = `0 0`
      } else {
        const width = this.profileRef.current.offsetWidth
        backgroundPosition = `0 ${this.state.direction * width}px`
      }
    }
    let content
    if (this.props.full) {
      content = (
        <p style={{ marginBottom: 0 }}>
          Written by <b>Cameron Maske</b>.<br />
          Are you a Python Developer? I'm working on a{' '}
          <Link to={config.courses.pytest.path}>
            course about testing with Python with pytest
          </Link>{' '}
          and if you have a spare 5 minutes, I would love to hear about your{' '}
          <a
            target="_blank"
            rel="noopener"
            href="https://goo.gl/forms/1CwGmWboTnjEzgFi1"
          >
            experiences
          </a>
          . <br />
          Want to get in touch? Feel free to drop me an{' '}
          <a target="_blank" rel="noopener" href="mailto:c@meronmaske.com">
            {' '}
            email
          </a>{' '}
          or over on{' '}
          <a
            target="_blank"
            rel="noopener"
            href="http://www.twitter.com/cameronmaske/"
          >
            twitter
          </a>
          .
        </p>
      )
    } else {
      content = (
        <p style={{ marginBottom: 0, textAlign: 'center' }}>
          Are you a Python Developer? I'm working on a{' '}
          <Link to={config.courses.pytest.path}>
            course about testing with pytest
          </Link>{' '}
          and if you have a spare 5 minutes, I would love to hear about your{' '}
          <a
            target="_blank"
            rel="noopener"
            href="https://goo.gl/forms/1CwGmWboTnjEzgFi1"
          >
            experiences
          </a>
          .
        </p>
      )
    }
    return (
      <div
        style={{
          display: 'flex',
          marginBottom: rhythm(1),
          alignItems: 'center',
          width: '100%',
        }}
      >
        <div
          ref={this.profileRef}
          className={'bio'}
          alt={`Cameron Maske`}
          onMouseEnter={this.onHoverImage}
          onMouseLeave={this.onBlurImage}
          style={{
            marginRight: rhythm(1 / 2),
            backgroundPosition: backgroundPosition,
          }}
        />
        {content}
      </div>
    )
  }
}

export default Bio
