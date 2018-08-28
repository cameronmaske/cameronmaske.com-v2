import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'

import SEO from '../components/SEO'
import VideoTabs from '../components/VideoTabs'
import YouTube from 'react-youtube'
import styles from './video.module.css'
import Playlist from '../components/Playlist'

class CourseVideoTemplate extends React.Component {
  constructor(props) {
    super(props)
    const autoplayPref = localStorage.getItem('autoplay')
    let autoplay = true
    if (autoplayPref) {
      autoplay = JSON.parse(autoplayPref)
    }
    console.log(`Autoplay: ${autoplay}`)
    this.state = {
      autoplay: autoplay,
    }
  }
  onAutoplay = value => {
    this.state = {
      autoplay: value,
    }
    localStorage.setItem('autoplay', JSON.stringify(value))
    console.log(`Setting autoplay: ${JSON.stringify(value)}`)
  }

  onVideoEnd = () => {
    if (this.state.autoplay) {
      console.log('Playing next...')
    }
  }

  render() {
    const siteUrl = get(this.props, 'data.site.siteMetadata.siteUrl')
    const video = this.props.data.markdownRemark
    const description = video.frontmatter.description || video.excerpt
    const { previous, next } = this.props.pathContext
    const title = `${video.frontmatter.title} · Cameron Maske`
    const youtubeOpts = {
      playerVars: {
        autoplay: this.state.autoplay,
        modestbranding: 0,
        rel: 0,
      },
    }
    const playlistItems = [
      {
        title: 'Setup And Run A Test With Pytest',
        isPlaying: true,
        slug: '/1/',
      },
      {
        title: 'Another',
        slug: '/2/',
        isUpNext: true,
      },
      {
        title: 'A third',
        slug: '/3/',
      },
      {
        title: 'A four',
        slug: '/4/',
      },
      {
        title: 'A five',
        slug: '/5/',
      },
      {
        title: 'A six',
        slug: '/6/',
      },
    ]
    return (
      <div>
        <SEO
          summaryImage={video.frontmatter.summary_image}
          title={title}
          description={description}
          twitterTitle={video.frontmatter.twitter}
          twitterDescription={video.frontmatter.twitter_description}
          date={video.frontmatter.date}
          modifiedDate={video.frontmatter.updated_date}
          article={true}
          url={siteUrl + this.props.location.pathname}
        />
        <div className="row mb-4">
          <div className="col-12 col-sm-12 col-md-12 col-lg-8">
            <YouTube
              videoId={video.frontmatter.youtubeId}
              containerClassName={styles.wrapper}
              opts={youtubeOpts}
              onEnd={this.onVideoEnd}
            />
          </div>
          <div className="col-12 col-sm-12 col-md-12 col-lg-4">
            <Playlist
              items={playlistItems}
              autoplay={this.state.autoplay}
              onAutoplay={this.onAutoplay}
            />
          </div>
        </div>

        <h1 itemProp="title">{video.frontmatter.title}</h1>
        <p>
          Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis
          suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?
        </p>
        <VideoTabs />
      </div>
    )
  }
}

export default CourseVideoTemplate

export const pageQuery = graphql`
  query CourseVideoBySlug($slug: String!) {
    site {
      siteMetadata {
        author
        siteUrl
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      frontmatter {
        title
        youtubeId
        youtube
      }
    }
  }
`
