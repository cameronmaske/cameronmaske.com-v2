import React from 'react'
import get from 'lodash/get'
import { push } from 'gatsby-link'
import Link from 'gatsby-link'

import SEO from '../components/SEO'
import YouTube from 'react-youtube'
import styles from './video.module.css'
import Playlist from '../components/Playlist'
import { rhythm } from '../utils/typography'
import Page from '../components/Page'
import config from '../config'
import BlankLayout from '../components/layouts/BlankLayout'

// TODO
// import VideoTabs from '../components/VideoTabs'

const formatPlaylist = (edges, video) => {
  return edges
    .filter(({ node }) => node.frontmatter.youtubeId)
    .map(({ node }) => {
      return {
        title: node.frontmatter.title,
        slug: node.fields.slug,
        duration: node.frontmatter.duration,
        isPlaying: video.fields.slug == node.fields.slug,
        isUpNext: false,
      }
    })
    .reduce((acc, playlistItem, index) => {
      if (index > 0 && acc[index - 1].isPlaying) {
        playlistItem.isUpNext = true
      }
      return [...acc, playlistItem]
    }, [])
}

class CourseVideoTemplate extends React.Component {
  constructor(props) {
    super(props)
    // Turn off autoplay if javascript disabled.
    let autoplayPref = false
    let autoplay = false
    // Hacky, but gets passed build stage.
    if (typeof window !== 'undefined') {
      autoplay = true
      autoplayPref = localStorage.getItem('autoplay')
    }
    if (autoplayPref) {
      autoplay = JSON.parse(autoplayPref)
    }
    console.log(`Autoplay: ${autoplay}`)
    const video = this.props.data.markdownRemark

    this.state = {
      autoplay: autoplay,
      video: video,
      playlist: formatPlaylist(this.props.data.allMarkdownRemark.edges, video),
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
      const nextVideo = this.state.playlist.find(item => item.isUpNext)
      if (nextVideo) {
        push(nextVideo.slug)
      }
    }
  }

  render() {
    const course = config.courses.pytest
    const siteUrl = get(this.props, 'data.site.siteMetadata.siteUrl')
    const video = this.state.video
    const title = `${video.frontmatter.title} · ${course.title}`
    const description = video.frontmatter.description
    const youtubeOpts = {
      playerVars: {
        autoplay: this.state.autoplay,
        modestbranding: 0,
        rel: 0,
      },
    }

    const windowCheck = typeof window !== 'undefined'
    return (
      <BlankLayout>
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
          video={{
            name: video.frontmatter.title,
            description: video.frontmatter.description,
            thumbnailUrl: [video.frontmatter.thumbnailUrl],
            uploadDate: video.frontmatter.uploadDate,
            duration: video.frontmatter.duration8601,
            embedUrl: video.frontmatter.embedUrl,
          }}
        />
        <div className={styles.videoLayout}>
          <div
            className="row mb-4"
            style={{
              marginLeft: 'auto',
              marginRight: 'auto',
              maxWidth: rhythm(41),
              padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
            }}
          >
            <div className="col-12 col-sm-12 col-md-12 col-lg-8">
              {windowCheck ? (
                <YouTube
                  videoId={video.frontmatter.youtubeId}
                  containerClassName={styles.wrapper}
                  opts={youtubeOpts}
                  onEnd={this.onVideoEnd}
                />
              ) : null}
              <noscript>
                <div className={styles.wrapper}>
                  <iframe
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${
                      video.frontmatter.youtubeId
                    }`}
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    allowfullscreen
                  />
                </div>
              </noscript>
            </div>
            <div className="col-12 col-sm-12 col-md-12 col-lg-4">
              <Playlist
                items={this.state.playlist}
                autoplay={this.state.autoplay}
                onAutoplay={this.onAutoplay}
              />
            </div>
          </div>
        </div>
        <Page>
          <h1 itemProp="title" style={{ marginTop: 0 }}>
            {video.frontmatter.title}
          </h1>
          <Link to={course.path}>
            <h2 style={{ marginTop: 0 }}>{course.title}</h2>
          </Link>
          <p>{video.frontmatter.description}</p>
        </Page>
      </BlankLayout>
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
      fields {
        slug
      }
      frontmatter {
        title
        youtubeId
        description
        thumbnailUrl
        embedUrl
        uploadDate
        duration8601
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___order], order: ASC }
      filter: { fileAbsolutePath: { regex: "/(courses)/" } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            duration
            youtubeId
          }
        }
      }
    }
  }
`
