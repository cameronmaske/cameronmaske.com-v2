import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'

import SEO from '../components/SEO'
import Bio from '../components/Bio'
import { rhythm } from '../utils/typography'

class BlogIndex extends React.Component {
  render() {
    const siteUrl = get(this, 'props.data.site.siteMetadata.siteUrl')
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const posts = get(this, 'props.data.allMarkdownRemark.edges')
    return (
      <div>
        <SEO title={siteTitle} url={siteUrl} />
        <Bio />
        {posts.map(({ node }) => {
          const title = get(node, 'frontmatter.title') || node.fields.slug
          const intro = get(node, 'frontmatter.intro') || node.excerpt
          return (
            <div key={node.fields.slug}>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link style={{ boxShadow: 'none' }} to={node.fields.slug}>
                  {title}
                </Link>
              </h3>
              <small>
                {node.frontmatter.date} · {node.frontmatter.tags}
              </small>
              <p dangerouslySetInnerHTML={{ __html: intro }} />
            </div>
          )
        })}
        <div>
          <h3>Side Projects</h3>
          <ul class="unlisted">
            <li>
              <a href="https://closedlooplabs.com">Noise Blocker</a>
            </li>
            <li>
              <a href="https://tryoutglasses.com">Try Out Glasses</a>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt(pruneLength: 140)
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD MMMM, YYYY")
            title
            intro
            tags
          }
        }
      }
    }
  }
`
