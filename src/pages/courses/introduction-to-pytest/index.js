import React from 'react'
import SEO from '../../../components/SEO'
import { rhythm } from '../../../utils/typography'
import get from 'lodash/get'
import humanizeDuration from 'humanize-duration'
import Video from '../../../components/Video'
import SignUpReminder from '../../../components/SignUpReminder'

const shortEnglishHumanizer = humanizeDuration.humanizer({
  language: 'shortEn',
  languages: {
    shortEn: {
      y: () => 'y',
      mo: () => 'mo',
      w: () => 'w',
      d: () => 'd',
      h: () => 'h',
      m: () => 'm',
      s: () => 's',
      ms: () => 'ms',
    },
  },
})

const formatDuration = seconds => {
  return shortEnglishHumanizer(seconds * 1000, {
    conjunction: ' ',
    serialComma: false,
  }).replace(/ /g, '')
}

class PytestCourseIndex extends React.Component {
  render() {
    const title = 'Getting Started With Pytest Course'
    const siteUrl = get(this, 'props.data.site.siteMetadata.siteUrl')
    const videos = get(this, 'props.data.allMarkdownRemark.edges')
    const url = siteUrl + this.props.location.pathname
    const publishedVideos = videos.filter(
      ({ node }) => !!node.frontmatter.youtubeId
    )
    const totalDuration = publishedVideos.reduce((acc, { node }) => {
      return node.frontmatter.duration + acc
    }, 0)
    return (
      <div>
        <SEO title={title} url={url} />
        <h1>Introduction To Pytest</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </p>
        <small>
          {publishedVideos.length} lessons - {formatDuration(totalDuration)}
        </small>
        <div style={{ marginTop: rhythm(1 / 2) }}>
          {videos.map(({ node }) => {
            return (
              <Video
                key={node.fields.slug}
                duration={node.frontmatter.duration}
                slug={node.fields.slug}
                title={node.frontmatter.title}
                description={node.frontmatter.description}
                underConstruction={!node.frontmatter.youtubeId}
              />
            )
          })}
        </div>
        <SignUpReminder />
      </div>
    )
  }
}

export default PytestCourseIndex

export const pageQuery = graphql`
  query PytestCourseQuery {
    site {
      siteMetadata {
        siteUrl
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
