import React from 'react'
import SEO from '../../../components/SEO'
import { rhythm } from '../../../utils/typography'
import get from 'lodash/get'
import Video from '../../../components/Video'
import SignUpReminder from '../../../components/SignUpReminder'
import config from '../../../config'
import Layout from '../../../components/layouts/Layout'
import { formatDuration } from '../../../utils/duration'

class PytestCourseIndex extends React.Component {
  render() {
    const course = config.courses.pytest
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
      <Layout>
        <SEO
          title={course.title}
          url={url}
          description={course.meta_description}
          summaryImage={'/static/thumbnails/introduction-to-pytest.png'}
        />
        <h1>{course.title}</h1>
        <p>{course.description}</p>
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
      </Layout>
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
