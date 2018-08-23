import React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import get from 'lodash/get'
import Disqus from 'disqus-react'

import Bio from '../components/Bio'
import SEO from '../components/SEO'
import { rhythm, scale } from '../utils/typography'

class BlogPostTemplate extends React.Component {
  render() {
    const siteUrl = get(this.props, 'data.site.siteMetadata.siteUrl')
    const post = this.props.data.markdownRemark
    const description = post.description || post.excerpt
    const { previous, next } = this.props.pathContext

    return (
      <div>
        <SEO
          summaryImage={post.frontmatter.summary_image}
          title={post.frontmatter.title}
          description={description}
          twitterTitle={post.frontmatter.twitter}
          twitterDescription={post.frontmatter.twitter_description}
          article={true}
        />
        <h1>{post.frontmatter.title}</h1>
        <p
          style={{
            ...scale(-1 / 5),
            display: 'block',
            marginBottom: rhythm(1),
            marginTop: rhythm(-1),
          }}
        >
          {post.frontmatter.date}
        </p>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <Bio />
        <ul
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            listStyle: 'none',
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>

        <Disqus.DiscussionEmbed shortname={'cameronmaske'} />
      </div>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        summary_image
        description
        twitter_description
        twitter_title
      }
    }
  }
`
