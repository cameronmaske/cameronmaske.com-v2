import React from 'react'
import get from 'lodash/get'
import { push } from 'gatsby-link'
import Link from 'gatsby-link'

import SEO from '../components/SEO'
import VideoTabs from '../components/VideoTabs'
import YouTube from 'react-youtube'
import styles from './video.module.css'
import Playlist from '../components/Playlist'
import { rhythm } from '../utils/typography'
import Page from '../components/Page'
import Subheader from '../components/Subheader'

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
    let autoplayPref = false
    // Hacky, but gets passed build stage.
    if (typeof window !== 'undefined') {
      autoplayPref = localStorage.getItem('autoplay')
    }
    let autoplay = true
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
    const siteUrl = get(this.props, 'data.site.siteMetadata.siteUrl')
    const video = this.state.video
    const title = `${video.frontmatter.title} · Cameron Maske`
    const description = video.frontmatter.description

    const playlistItems = formatPlaylist(
      this.props.data.allMarkdownRemark.edges,
      video
    )

    const youtubeOpts = {
      playerVars: {
        autoplay: this.state.autoplay,
        modestbranding: 0,
        rel: 0,
      },
    }

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
              <YouTube
                videoId={video.frontmatter.youtubeId}
                containerClassName={styles.wrapper}
                opts={youtubeOpts}
                onEnd={this.onVideoEnd}
              />
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
          <Link to={'/'}>
            <h2 style={{ marginTop: 0 }}>Introduction To Pytest</h2>
          </Link>
          <p>{video.frontmatter.description}</p>
          <VideoTabs />
        </Page>
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
      fields {
        slug
      }
      frontmatter {
        title
        youtubeId
        youtube
        description
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
